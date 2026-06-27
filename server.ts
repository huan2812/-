/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

// Set up body parsers with generous limits for base64 image uploads
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Initialize Google GenAI if key is present
let ai: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  try {
    ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
    console.log("Gemini API Client initialized successfully.");
  } catch (error) {
    console.error("Failed to initialize Gemini API Client:", error);
  }
} else {
  console.log("No GEMINI_API_KEY found in environment. Server will run in simulation mode.");
}

// REST API Routes
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", mode: ai ? "live" : "simulation" });
});

// Marine Debris Image Identification Route
app.post("/api/identify", async (req: express.Request, res: express.Response) => {
  const { image, location = "未知海岸" } = req.body;

  if (!image) {
    res.status(400).json({ error: "Missing image parameter" });
    return;
  }

  // Handle case where API is in simulation mode or API key is missing
  if (!ai) {
    console.log("Running in simulation mode (no API key).");
    // Generate a realistic simulated result based on random selection or simple cues
    setTimeout(() => {
      res.json(generateSimulatedResult(location));
    }, 1500);
    return;
  }

  try {
    // Extract base64 details
    const matches = image.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    let mimeType = "image/jpeg";
    let base64Data = image;

    if (matches && matches.length === 3) {
      mimeType = matches[1];
      base64Data = matches[2];
    }

    const imagePart = {
      inlineData: {
        mimeType: mimeType,
        data: base64Data,
      },
    };

    const textPart = {
      text: "You are an expert marine biologist and environmental scientist specializing in marine debris / ocean plastic pollution identification. " +
            "Analyze this photo taken on a beach or in the ocean. Detect any visible trash or marine litter (such as plastic bottles, caps, styrofoam, tin cans, glass bottles, nets, ropes, packaging, or other marine debris). " +
            "For each detected item, determine its location in the image and estimate its weight. " +
            "Please return the results in a structured JSON format following the specified schema.",
    };

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: { parts: [imagePart, textPart] },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            items: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { 
                    type: Type.STRING, 
                    description: "繁體中文名稱 (e.g. '寶特瓶', '保麗龍盒', '鋁罐', '碎玻璃')" 
                  },
                  category: { 
                    type: Type.STRING, 
                    enum: ["塑膠類", "金屬類", "玻璃類", "其他"], 
                    description: "與名稱對應的分類" 
                  },
                  confidence: { 
                    type: Type.INTEGER, 
                    description: "辨識信心指數 0-100" 
                  },
                  weightGrams: { 
                    type: Type.INTEGER, 
                    description: "預估該物品的大致重量（克），如寶特瓶為 25-30，易開罐約 15 克" 
                  },
                  boundingBox: {
                    type: Type.ARRAY,
                    items: { type: Type.INTEGER },
                    description: "物品在影像中的邊界框座標，依序為 [ymin, xmin, ymax, xmax]，數值範圍 0-100（代表在圖片中的百分比位置）"
                  }
                },
                required: ["name", "category", "confidence", "weightGrams"]
              }
            },
            environmentalImpact: { 
              type: Type.STRING, 
              description: "對海洋生態環境影響之繁體中文詳細分析，約 80-120 字" 
            },
            cleanupAction: { 
              type: Type.STRING, 
              description: "淨灘與處理該廢棄物時的繁體中文具體建議與處置指南，約 80-120 字" 
            }
          },
          required: ["items", "environmentalImpact", "cleanupAction"]
        }
      }
    });

    const textResult = response.text;
    if (!textResult) {
      throw new Error("Empty response from Gemini API");
    }

    const resultData = JSON.parse(textResult.trim());
    res.json({
      ...resultData,
      location,
      timestamp: new Date().toLocaleString("zh-TW", { timeZone: "Asia/Taipei" })
    });

  } catch (error: any) {
    console.error("Gemini API Error:", error);
    // Return a beautiful simulated fallback so the experience remains smooth
    res.status(500).json({ 
      error: "Gemini API Identification failed. Falling back to simulation.",
      details: error.message,
      ...(generateSimulatedResult(location))
    });
  }
});

// Simulate results generator
function generateSimulatedResult(location: string) {
  const options = [
    {
      items: [
        {
          id: "sim-1",
          name: "塑膠瓶",
          category: "塑膠類" as const,
          confidence: 94,
          weightGrams: 28,
          boundingBox: [35, 25, 75, 70] as [number, number, number, number],
        }
      ],
      environmentalImpact: "塑膠寶特瓶是海洋廢棄物的大宗，需要長達 450 年才能完全分解。在陽光與海浪的作用下，它會碎裂成難以清除的微塑膠，經由食物鏈累積危害所有海洋生命，甚至是人類餐桌上的海鮮。",
      cleanupAction: "此類 PET 塑膠容器具有高回收價值。在淨灘時，應將其清洗乾淨、壓扁，然後投入「塑膠類」資源回收。請避免使用一次性塑膠瓶，出門自備環保保溫杯。"
    },
    {
      items: [
        {
          id: "sim-2",
          name: "保麗龍盒碎片",
          category: "塑膠類" as const,
          confidence: 89,
          weightGrams: 42,
          boundingBox: [20, 15, 65, 80] as [number, number, number, number],
        }
      ],
      environmentalImpact: "保麗龍箱碎片重量輕，容易隨風飄散、並在海岸線磨損成數百萬個微粒。保麗龍極易吸附海中的有害毒素與有機污染物，被海洋鳥類及幼魚誤食後會產生致死性的毒物累積。",
      cleanupAction: "淨灘撿拾保麗龍時應特別小心，因為它十分脆弱，容易在夾取時二次碎裂。請使用網袋或大塑膠袋集中，切勿使其隨風飛散，隨後交由地方清潔隊進行清運。"
    },
    {
      items: [
        {
          id: "sim-3",
          name: "鋁製飲料罐",
          category: "金屬類" as const,
          confidence: 96,
          weightGrams: 15,
          boundingBox: [45, 30, 75, 65] as [number, number, number, number],
        }
      ],
      environmentalImpact: "金屬罐雖然能被海水逐漸鏽蝕分解，但分解過程仍需約 80 至 100 年。生鏽、銳利的罐口邊緣極易割傷海灘上的野生動物與赤腳行走的遊客，其表面防腐塗層也會逐漸釋放微量金屬化合物污染土壤。",
      cleanupAction: "鋁罐是極具回收價值的金屬資源。請配戴防割手套將其撿起，排除內部積水與泥沙後壓扁，投入「金屬類」資源回收，以支持高效率的金屬循環再利用。"
    },
    {
      items: [
        {
          id: "sim-4",
          name: "碎玻璃瓶",
          category: "玻璃類" as const,
          confidence: 91,
          weightGrams: 340,
          boundingBox: [15, 20, 80, 80] as [number, number, number, number],
        }
      ],
      environmentalImpact: "玻璃的化學性質雖無毒，但碎裂的玻璃卻是沙灘上最危險的物理性殺手。破碎的瓶口和尖銳碎塊對赤腳遊客、海洋哺乳動物（如海豹、海獅）和海龜的四肢、鰭足有嚴重的割傷威脅。",
      cleanupAction: "清理碎玻璃必須配戴防刺穿厚手套。使用夾子將其小心夾起，放入不易被刺穿的硬質紙箱或塑料容器中，標明「碎玻璃危險」後投入資源回收或垃圾車，切勿隨意丟入軟質塑膠袋中。"
    }
  ];

  const selected = options[Math.floor(Math.random() * options.length)];
  return {
    ...selected,
    location,
    timestamp: new Date().toLocaleString("zh-TW", { timeZone: "Asia/Taipei" })
  };
}

async function startServer() {
  // Vite Middleware for development mode
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite development middleware mounted.");
  } else {
    // Serve production static assets
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("Serving static build from /dist.");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Marine Debris App running at http://localhost:${PORT}`);
  });
}

startServer();
