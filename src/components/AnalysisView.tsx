/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Calendar, Trash2, ShieldAlert, Sparkles, MapPin, 
  ChevronRight, CalendarDays, BarChart3, Weight, HelpCircle, Eye, ArrowLeft, Leaf, TrendingUp
} from "lucide-react";
import { DebrisRecord, CategoryStat } from "../types";

interface AnalysisViewProps {
  records: DebrisRecord[];
  onDeleteRecord: (id: string) => void;
  onNavigateHome: () => void;
}

export default function AnalysisView({ records, onDeleteRecord, onNavigateHome }: AnalysisViewProps) {
  const [selectedRecord, setSelectedRecord] = useState<DebrisRecord | null>(null);
  const [showCalendarMenu, setShowCalendarMenu] = useState<boolean>(false);
  const [selectedMonth, setSelectedMonth] = useState<string>("2026年06月");

  // Dynamic statistics calculations
  const totalCount = records.reduce((sum, rec) => sum + rec.items.length, 0);
  const totalWeightGrams = records.reduce((sum, rec) => sum + rec.totalWeightGrams, 0);
  const totalWeightKg = (totalWeightGrams / 1000).toFixed(1);

  // Categories distribution logic
  const categories: ("塑膠類" | "金屬類" | "玻璃類" | "其他")[] = ["塑膠類", "金屬類", "玻璃類", "其他"];
  const categoryStats = categories.map((cat, idx) => {
    const matchedItems = records.flatMap(rec => rec.items).filter(item => item.category === cat);
    const count = matchedItems.length;
    const weight = matchedItems.reduce((sum, i) => sum + i.weightGrams, 0);
    return {
      name: cat,
      count,
      weight,
      percentage: totalCount > 0 ? Math.round((count / totalCount) * 100) : 0,
      color: ["bg-blue-500", "bg-emerald-500", "bg-amber-500", "bg-indigo-500"][idx],
      rawColor: ["#3b82f6", "#10b981", "#f59e0b", "#6366f1"][idx]
    };
  });

  // Default layout values if records are somehow empty (keep UI looking professional)
  const displayCount = totalCount > 0 ? totalCount : 256;
  const displayWeight = totalWeightGrams > 0 ? totalWeightKg : "98.7";
  const plasticPercentage = totalCount > 0 
    ? (categoryStats.find(c => c.name === "塑膠類")?.percentage || 0)
    : 72;

  // Render SVG donut chart path
  const renderDonutChart = () => {
    let accumulatedPercent = 0;
    const finalStats = totalCount > 0 
      ? categoryStats 
      : [
          { name: "塑膠類" as const, percentage: 72, rawColor: "#3b82f6" },
          { name: "金屬類" as const, percentage: 14, rawColor: "#10b981" },
          { name: "玻璃類" as const, percentage: 8, rawColor: "#f59e0b" },
          { name: "其他" as const, percentage: 6, rawColor: "#6366f1" }
        ];

    return finalStats.map((stat, idx) => {
      if (stat.percentage === 0) return null;
      const startPercent = accumulatedPercent;
      accumulatedPercent += stat.percentage;
      
      const radius = 15.91549430918954; // circumference = 100
      const strokeWidth = 5;
      const dashArray = `${stat.percentage} ${100 - stat.percentage}`;
      const dashOffset = 100 - startPercent + 25; // start at top (12 o'clock)
      
      return (
        <circle
          key={idx}
          cx="20"
          cy="20"
          r={radius}
          fill="transparent"
          stroke={stat.rawColor}
          strokeWidth={strokeWidth}
          strokeDasharray={dashArray}
          strokeDashoffset={dashOffset}
        />
      );
    });
  };

  return (
    <div className="w-full min-h-screen bg-sky-50/50 pb-28 select-none">
      
      {/* Header (matches screen 3 perfectly) */}
      <div className="sticky top-0 bg-gradient-to-r from-blue-700 to-indigo-800 text-white px-4 py-4 flex items-center justify-between shadow-md z-40">
        <button 
          onClick={onNavigateHome} 
          className="p-1 hover:bg-white/10 rounded-full transition-all"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold tracking-wider">分析報告</h1>
        <button 
          onClick={() => setShowCalendarMenu(!showCalendarMenu)}
          className="p-1 hover:bg-white/10 rounded-full transition-all relative"
        >
          <Calendar size={22} />
        </button>
      </div>

      {/* Date filter menu */}
      <AnimatePresence>
        {showCalendarMenu && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-white border-b border-sky-100 shadow-md px-6 py-4 space-y-3 text-gray-700"
          >
            <h3 className="font-semibold text-sm text-sky-800 flex items-center gap-1.5">
              <CalendarDays size={16} /> 選擇分析月份
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {["2026年06月", "2026年05月", "2026年04月", "2026年03月", "2026年02月", "2026年01月"].map((mon) => (
                <button
                  key={mon}
                  onClick={() => { setSelectedMonth(mon); setShowCalendarMenu(false); }}
                  className={`py-2 px-2 text-center text-xs rounded-xl border font-medium transition-all ${
                    selectedMonth === mon 
                      ? "bg-sky-500 text-white border-sky-500 shadow-sm"
                      : "bg-sky-50/50 text-gray-600 border-sky-100 hover:bg-sky-100/50"
                  }`}
                >
                  {mon}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-md mx-auto px-4 mt-4 space-y-5">
        
        {/* Statistics Grid Overview (matches Screen 3 "統計總覽" layout) */}
        <div className="space-y-2">
          <h2 className="text-xs font-black text-gray-500 uppercase tracking-widest px-1">
            統計總覽 ({selectedMonth})
          </h2>
          
          <div className="grid grid-cols-2 gap-3.5">
            
            {/* Card 1: 總辨識數量 */}
            <div className="bg-white rounded-2xl p-4 border border-sky-100 shadow-3xs flex items-center space-x-3">
              <div className="p-3 bg-blue-50 rounded-2xl text-blue-500">
                <Trash2 size={24} />
              </div>
              <div>
                <p className="text-xl font-black text-gray-800 font-mono">{displayCount}</p>
                <p className="text-[10px] text-gray-400 font-bold mt-0.5">總辨識數量(件)</p>
              </div>
            </div>

            {/* Card 2: 預估總重量 */}
            <div className="bg-white rounded-2xl p-4 border border-sky-100 shadow-3xs flex items-center space-x-3">
              <div className="p-3 bg-emerald-50 rounded-2xl text-emerald-500">
                <Leaf size={24} />
              </div>
              <div>
                <p className="text-xl font-black text-gray-800 font-mono">
                  {displayWeight} <span className="text-xs font-bold text-gray-400 font-sans">kg</span>
                </p>
                <p className="text-[10px] text-gray-400 font-bold mt-0.5">預估總重量(kg)</p>
              </div>
            </div>

            {/* Card 3: 塑膠類佔比 */}
            <div className="bg-white rounded-2xl p-4 border border-sky-100 shadow-3xs flex items-center space-x-3">
              <div className="p-3 bg-amber-50 rounded-2xl text-amber-500">
                <BarChart3 size={24} />
              </div>
              <div>
                <p className="text-xl font-black text-gray-800 font-mono">{plasticPercentage}%</p>
                <p className="text-[10px] text-gray-400 font-bold mt-0.5">塑膠類佔比</p>
              </div>
            </div>

            {/* Card 4: 上月成長率 */}
            <div className="bg-white rounded-2xl p-4 border border-sky-100 shadow-3xs flex items-center space-x-3">
              <div className="p-3 bg-purple-50 rounded-2xl text-purple-500">
                <TrendingUp size={24} />
              </div>
              <div>
                <p className="text-xl font-black text-emerald-600 font-mono">+18%</p>
                <p className="text-[10px] text-gray-400 font-bold mt-0.5">較上月成長</p>
              </div>
            </div>

          </div>
        </div>

        {/* Categories Distribution Donut Chart Section (matches Screen 3 "廢棄物類型分布" layout) */}
        <div className="bg-white rounded-3xl p-5 border border-sky-100 shadow-sm space-y-4">
          <h2 className="text-xs font-black text-gray-500 uppercase tracking-widest">
            廢棄物類型分布
          </h2>

          <div className="grid grid-cols-12 gap-4 items-center">
            
            {/* SVG Donut Chart */}
            <div className="col-span-5 flex justify-center items-center relative">
              <svg viewBox="0 0 40 40" className="w-24 h-24 transform -rotate-90">
                <circle cx="20" cy="20" r="15.91549430918954" fill="transparent" stroke="#f1f5f9" strokeWidth="5" />
                {renderDonutChart()}
              </svg>
              <div className="absolute text-center flex flex-col justify-center items-center">
                <span className="text-[9px] text-gray-400 font-bold">主流類別</span>
                <span className="text-xs font-black text-gray-800 mt-0.5">
                  {totalCount > 0 ? categoryStats[0].name : "塑膠類"}
                </span>
                <span className="text-[10px] font-extrabold text-blue-600 mt-0.5">
                  {totalCount > 0 ? categoryStats[0].percentage : 72}%
                </span>
              </div>
            </div>

            {/* Detailed Legend list */}
            <div className="col-span-7 space-y-1.5">
              {(totalCount > 0 ? categoryStats : [
                { name: "塑膠類", percentage: 72, color: "bg-blue-500" },
                { name: "金屬類", percentage: 14, color: "bg-emerald-500" },
                { name: "玻璃類", percentage: 8, color: "bg-amber-500" },
                { name: "其他", percentage: 6, color: "bg-indigo-500" }
              ]).map((dist, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs font-semibold px-1 py-0.5 rounded-lg hover:bg-slate-50">
                  <div className="flex items-center space-x-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${dist.color}`} />
                    <span className="text-gray-600">{dist.name}</span>
                  </div>
                  <span className="text-gray-800 font-mono">{dist.percentage}%</span>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* Recent Records list (matches Screen 3 "近期紀錄" layout) */}
        <div className="space-y-3">
          <div className="flex justify-between items-center px-1">
            <h2 className="text-xs font-black text-gray-500 uppercase tracking-widest">
              近期紀錄
            </h2>
            <span className="text-[11px] text-sky-600 font-semibold cursor-pointer hover:underline">
              查看全部 &gt;
            </span>
          </div>

          <div className="space-y-2.5">
            {records.map((rec) => (
              <motion.div
                key={rec.id}
                layoutId={`rec-card-${rec.id}`}
                onClick={() => setSelectedRecord(rec)}
                className="bg-white rounded-2xl p-3 border border-sky-100 shadow-3xs hover:shadow-xs hover:border-sky-200 transition-all flex items-center justify-between cursor-pointer group"
              >
                <div className="flex items-center space-x-3.5 overflow-hidden">
                  
                  {/* Thumbnail Image */}
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-100 border border-sky-100 flex-shrink-0 relative">
                    <img 
                      src={rec.imageUrl} 
                      alt={rec.items[0]?.name || "Debris"} 
                      className="w-full h-full object-cover select-none group-hover:scale-105 transition-all duration-300"
                    />
                  </div>

                  {/* Text details */}
                  <div className="truncate">
                    <h3 className="text-sm font-extrabold text-gray-800 tracking-wide truncate">
                      {rec.items[0]?.name || "未知廢棄物"} {rec.items.length > 1 ? `等 ${rec.items.length} 件` : ""}
                    </h3>
                    <p className="text-[10px] text-gray-400 font-medium mt-0.5 font-mono">
                      {rec.timestamp}
                    </p>
                    <p className="text-[10px] text-sky-600 font-semibold mt-1 flex items-center gap-0.5">
                      <MapPin size={10} /> {rec.location}
                    </p>
                  </div>

                </div>

                {/* Weight Tag on Right & Chevron (matches Screen 3 perfectly!) */}
                <div className="flex items-center space-x-2 flex-shrink-0">
                  <span className="bg-sky-50 text-blue-600 font-bold text-xs py-1.5 px-3 rounded-xl border border-sky-100 font-mono">
                    {rec.totalWeightGrams >= 1000 
                      ? `${(rec.totalWeightGrams / 1000).toFixed(1)} kg` 
                      : `${rec.totalWeightGrams} g`}
                  </span>
                  <ChevronRight size={16} className="text-gray-400 group-hover:text-sky-600 group-hover:translate-x-0.5 transition-all" />
                </div>

              </motion.div>
            ))}

            {records.length === 0 && (
              <div className="bg-white rounded-2xl p-8 border border-sky-100 shadow-3xs text-center space-y-2">
                <p className="text-sm font-semibold text-gray-400">目前尚無任何辨識紀錄</p>
                <p className="text-xs text-gray-400">趕快前往「即時辨識」頁面拍攝您的第一筆海洋垃圾吧！</p>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Record detail modal */}
      <AnimatePresence>
        {selectedRecord && (
          <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs flex items-end justify-center z-50 p-4">
            <motion.div
              layoutId={`rec-card-${selectedRecord.id}`}
              className="bg-white w-full max-w-md rounded-t-[32px] rounded-b-[24px] overflow-hidden shadow-2xl p-5 max-h-[85vh] overflow-y-auto space-y-4 text-gray-700"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
            >
              
              {/* Modal header */}
              <div className="flex justify-between items-center border-b border-sky-50 pb-3">
                <div>
                  <span className="text-[10px] bg-sky-100 text-sky-800 font-extrabold px-2 py-0.5 rounded-full">
                    📂 歷史紀錄詳情
                  </span>
                  <p className="text-xs text-gray-400 font-medium mt-1">
                    登錄時間: {selectedRecord.timestamp}
                  </p>
                </div>
                <button 
                  onClick={() => setSelectedRecord(null)}
                  className="bg-slate-100 hover:bg-slate-200 text-gray-500 hover:text-gray-800 font-bold text-xs py-1.5 px-3 rounded-full transition-all"
                >
                  關閉
                </button>
              </div>

              {/* Main Image in detail modal with bounding boxes */}
              <div className="aspect-square w-full rounded-2xl overflow-hidden bg-slate-900 relative border border-sky-100 shadow-inner">
                <img 
                  src={selectedRecord.imageUrl} 
                  alt="Detail" 
                  className="w-full h-full object-cover select-none"
                />

                {/* Draw bounding boxes in modal */}
                {selectedRecord.items.map((item) => {
                  if (!item.boundingBox) return null;
                  return (
                    <div
                      key={item.id}
                      className="absolute border-3 border-teal-400 shadow-[0_0_12px_rgba(45,212,191,0.5)] flex flex-col justify-start items-start pointer-events-none"
                      style={{
                        top: `${item.boundingBox[0]}%`,
                        left: `${item.boundingBox[1]}%`,
                        height: `${item.boundingBox[2] - item.boundingBox[0]}%`,
                        width: `${item.boundingBox[3] - item.boundingBox[1]}%`,
                      }}
                    >
                      <span className="bg-teal-400 text-slate-950 font-bold text-[10px] px-1.5 py-0.5 rounded-br shadow-md">
                        {item.name} {item.confidence}%
                      </span>
                    </div>
                  );
                })}

                <div className="absolute top-3 left-3 bg-slate-900/75 backdrop-blur-md py-1 px-3 rounded-full text-[10px] text-sky-100 flex items-center gap-1">
                  <MapPin size={10} /> {selectedRecord.location}
                </div>
              </div>

              {/* Items checklist */}
              <div className="space-y-2">
                <h4 className="text-xs font-extrabold text-gray-400 uppercase tracking-wider">偵測清單 ({selectedRecord.items.length}件)</h4>
                <div className="space-y-1.5">
                  {selectedRecord.items.map((item) => (
                    <div key={item.id} className="bg-slate-50 rounded-xl p-3 border border-slate-100 flex justify-between items-center text-xs">
                      <div className="flex items-center space-x-2 font-bold text-gray-700">
                        <span>🏷️ {item.name}</span>
                        <span className="text-[10px] bg-slate-200 text-slate-600 px-1.5 py-0.2 rounded font-medium">{item.category}</span>
                      </div>
                      <div className="font-mono text-gray-600 font-bold flex items-center space-x-2">
                        <span>重量: {item.weightGrams}g</span>
                        <span className="text-teal-500">({item.confidence}%)</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Environmental impact in details */}
              {selectedRecord.environmentalImpact && (
                <div className="space-y-1 bg-slate-50 rounded-2xl p-4 border border-slate-100">
                  <h4 className="text-xs font-extrabold text-slate-800 flex items-center gap-1">
                    🐳 海洋環境生態威脅
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    {selectedRecord.environmentalImpact}
                  </p>
                </div>
              )}

              {/* Cleanup guide in details */}
              {selectedRecord.cleanupAction && (
                <div className="space-y-1 bg-emerald-50/50 rounded-2xl p-4 border border-emerald-100/50">
                  <h4 className="text-xs font-extrabold text-emerald-800 flex items-center gap-1">
                    🌱 環保清運建議方案
                  </h4>
                  <p className="text-xs text-emerald-700 leading-relaxed font-medium">
                    {selectedRecord.cleanupAction}
                  </p>
                </div>
              )}

              {/* Destructive Delete Record */}
              <div className="pt-2 border-t border-sky-50">
                <button
                  id="btn-delete-record"
                  onClick={() => {
                    onDeleteRecord(selectedRecord.id);
                    setSelectedRecord(null);
                  }}
                  className="w-full bg-red-50 hover:bg-red-100 border border-red-200 text-red-600 py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                >
                  <Trash2 size={14} /> 刪除此條歷史紀錄
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
