/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { DebrisRecord, LeaderboardEntry, CategoryStat } from "./types";

export const PRESET_DETECTIONS = [
  {
    id: "preset-1",
    name: "沙灘上的塑膠瓶",
    imageUrl: "https://images.unsplash.com/photo-1618477388954-7852f32655ec?auto=format&fit=crop&w=800&q=80",
    description: "常見的 PET 寶特瓶，通常是由海浪沖刷上岸。",
    items: [
      {
        id: "p1-1",
        name: "寶特瓶",
        category: "塑膠類" as const,
        confidence: 96,
        weightGrams: 28,
        boundingBox: [28, 30, 85, 75] as [number, number, number, number],
      }
    ],
    environmentalImpact: "塑膠寶特瓶在海洋中需要長達 450 年才能分解，並會碎裂成微塑膠，被魚類等海洋生物誤食後，將經由食物鏈累積危害人體健康。",
    cleanupAction: "建議使用可重複使用的環保杯代替一次性寶特瓶。回收此類資源應清洗乾淨後丟入塑膠類資源回收桶。"
  },
  {
    id: "preset-2",
    name: "礁石間的保麗龍盒",
    imageUrl: "https://images.unsplash.com/photo-1548345680-f5475ea5df84?auto=format&fit=crop&w=800&q=80",
    description: "破碎的發泡聚苯乙烯（保麗龍）包裝箱，重量輕易碎裂。",
    items: [
      {
        id: "p2-1",
        name: "保麗龍箱碎片",
        category: "塑膠類" as const,
        confidence: 92,
        weightGrams: 35,
        boundingBox: [15, 20, 75, 80] as [number, number, number, number],
      }
    ],
    environmentalImpact: "保麗龍極易破碎成細小微粒，吸附海洋中的持久性有機污染物（POPs），是嚴重的毒性微塑膠來源。",
    cleanupAction: "海洋保麗龍污染多源自漁業或餐飲包裝。應推廣環保漁具與可回收保冷箱，撿拾時需小心收集防範其進一步碎裂飛散。"
  },
  {
    id: "preset-3",
    name: "沙灘上的廢棄飲料罐",
    imageUrl: "https://images.unsplash.com/photo-1526951521990-620dc14c214b?auto=format&fit=crop&w=800&q=80",
    description: "已被部分掩埋的鋁製易開罐，邊緣有些微鏽蝕。",
    items: [
      {
        id: "p3-1",
        name: "鋁罐",
        category: "金屬類" as const,
        confidence: 98,
        weightGrams: 15,
        boundingBox: [40, 35, 70, 65] as [number, number, number, number],
      }
    ],
    environmentalImpact: "金屬罐雖然分解速度較塑膠快（約80-100年），但若生鏽可能產生銳利邊緣割傷沙灘遊客與野生動物，且金屬塗層會釋放微量重金屬污染土壤與水質。",
    cleanupAction: "鋁罐具極高回收價值。淨灘時應戴手套小心夾取避免割傷，並投入金屬類資源回收。"
  },
  {
    id: "preset-4",
    name: "海岸邊的廢棄玻璃瓶",
    imageUrl: "https://images.unsplash.com/photo-1605600611284-176899741aad?auto=format&fit=crop&w=800&q=80",
    description: "綠色碎玻璃啤酒瓶，躺在濕潤的沙灘上。",
    items: [
      {
        id: "p4-1",
        name: "玻璃瓶",
        category: "玻璃類" as const,
        confidence: 94,
        weightGrams: 320,
        boundingBox: [20, 25, 85, 80] as [number, number, number, number],
      }
    ],
    environmentalImpact: "玻璃雖然化學性質穩定且無毒，但破碎的玻璃極具危險性，是沙灘上最容易割傷人員與海洋哺乳動物的危險因子。其自然磨損至碎砂需上百萬年。",
    cleanupAction: "碎玻璃撿拾極需小心。請使用夾子將其放入堅固的容器中，切勿隨意丟入普通垃圾袋以防刺穿。"
  }
];

export const MOCK_HISTORY_RECORDS: DebrisRecord[] = [
  {
    id: "rec-1",
    imageUrl: "https://images.unsplash.com/photo-1618477388954-7852f32655ec?auto=format&fit=crop&w=150&q=80",
    timestamp: "2026/06/25 10:30",
    location: "東北角龍洞灣",
    totalWeightGrams: 120,
    items: [
      { id: "item-1-1", name: "寶特瓶", category: "塑膠類", confidence: 95, weightGrams: 28 },
      { id: "item-1-2", name: "塑膠瓶蓋", category: "塑膠類", confidence: 91, weightGrams: 2 },
      { id: "item-1-3", name: "廢棄塑膠袋", category: "塑膠類", confidence: 85, weightGrams: 90 },
    ],
    environmentalImpact: "本批廢棄物以塑膠製品為主，均為高環境荷爾蒙、高殘留之海洋廢棄物。在陽光曝曬下容易碎裂成大量微塑膠。",
    cleanupAction: "已分類收集，塑膠製品皆投入資源回收桶，並進行沙灘表面微小塑膠碎屑之過濾過篩。"
  },
  {
    id: "rec-2",
    imageUrl: "https://images.unsplash.com/photo-1548345680-f5475ea5df84?auto=format&fit=crop&w=150&q=80",
    timestamp: "2026/06/24 09:45",
    location: "澎湖白沙赤崁沙灘",
    totalWeightGrams: 35,
    items: [
      { id: "item-2-1", name: "保麗龍盒", category: "塑膠類", confidence: 92, weightGrams: 35 }
    ],
    environmentalImpact: "保麗龍箱碎片常伴隨漁業養殖或保冷箱廢棄。極易遭海鳥及魚類誤食，造成消化道阻塞致死。",
    cleanupAction: "已妥善裝袋。因保麗龍體積大重量輕，已通知當地環保局清潔隊清運，並宣導在地漁民減少保麗龍浮標之使用。"
  },
  {
    id: "rec-3",
    imageUrl: "https://images.unsplash.com/photo-1526951521990-620dc14c214b?auto=format&fit=crop&w=150&q=80",
    timestamp: "2026/06/22 14:15",
    location: "新北貢寮福隆沙灘",
    totalWeightGrams: 380,
    items: [
      { id: "item-3-1", name: "玻璃啤酒瓶", category: "玻璃類", confidence: 98, weightGrams: 320 },
      { id: "item-3-2", name: "鐵製易開罐", category: "金屬類", confidence: 96, weightGrams: 60 }
    ],
    environmentalImpact: "遊客野餐遊憩後所留之廢棄瓶罐。玻璃瓶在浪潮擊碎後會形成鋒利碎玻璃，極度威脅戲水遊客與海龜等生物安全。",
    cleanupAction: "碎玻璃與金屬罐已分裝於硬質防穿刺塑料桶內，運送至垃圾分類站。此類瓶罐均為100%可回收高價值資源。"
  },
  {
    id: "rec-4",
    imageUrl: "https://images.unsplash.com/photo-1605600611284-176899741aad?auto=format&fit=crop&w=150&q=80",
    timestamp: "2026/06/18 16:00",
    location: "花蓮七星潭",
    totalWeightGrams: 2850,
    items: [
      { id: "item-4-1", name: "廢棄尼龍漁網", category: "其他", confidence: 93, weightGrams: 2500 },
      { id: "item-4-2", name: "塑膠浮球", category: "塑膠類", confidence: 90, weightGrams: 350 }
    ],
    environmentalImpact: "俗稱「幽靈漁網」的廢棄漁具。會在海中持續無休止地進行「幽靈捕魚」，纏繞並殺害無數珊瑚、海豚、鯨魚及海龜。",
    cleanupAction: "漁網體積與重量龐大且與漂流木纏繞，淨灘小組耗時40分鐘合力鋸開拉起，已暫置於漁港廢棄漁網專用回收區。"
  }
];

export const MOCK_LEADERBOARD: LeaderboardEntry[] = [
  { rank: 1, name: "藍色海洋守護小組", avatar: "🐳", points: 3450, pieces: 420, weightKg: 124.5 },
  { rank: 2, name: "淨灘超人-阿明", avatar: "🦸‍♂️", points: 2820, pieces: 312, weightKg: 89.2 },
  { rank: 3, name: "綠色浪潮 Volunteer", avatar: "🌊", points: 2150, pieces: 245, weightKg: 64.8 },
  { rank: 4, name: "海洋巡邏隊-陳科長", avatar: "👮", points: 1840, pieces: 198, weightKg: 52.3 },
  { rank: 5, name: "您 ( yanglh.ms22 )", avatar: "🧑‍💻", points: 1450, pieces: 156, weightKg: 38.7, isCurrentUser: true },
  { rank: 6, name: "環保小尖兵 莉莉", avatar: "👧", points: 1120, pieces: 110, weightKg: 24.1 },
  { rank: 7, name: "愛地球減塑生活", avatar: "🌱", points: 950, pieces: 88, weightKg: 19.5 }
];

export const MOCK_CATEGORY_STATS: CategoryStat[] = [
  { name: "塑膠類", percentage: 72, color: "bg-blue-500", count: 184 },
  { name: "金屬類", percentage: 14, color: "bg-emerald-500", count: 36 },
  { name: "玻璃類", percentage: 8, color: "bg-amber-500", count: 20 },
  { name: "其他", percentage: 6, color: "bg-indigo-500", count: 16 }
];
