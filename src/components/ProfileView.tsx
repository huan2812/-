/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { 
  User, Shield, Award, Sparkles, LogOut, CheckCircle2, 
  HelpCircle, ChevronRight, Compass, Heart, Share2, Info
} from "lucide-react";
import { DebrisRecord } from "../types";

interface ProfileViewProps {
  records: DebrisRecord[];
  userEmail?: string;
  onOpenLeaderboard: () => void;
}

export default function ProfileView({ records, userEmail = "yanglh.ms22@gmail.com", onOpenLeaderboard }: ProfileViewProps) {
  // Dynamic stats calculated from active records
  const totalCount = records.reduce((sum, rec) => sum + rec.items.length, 0);
  const totalWeightGrams = records.reduce((sum, rec) => sum + rec.totalWeightGrams, 0);
  const totalWeightKg = (totalWeightGrams / 1000).toFixed(1);

  // Carbon credits equivalent calculations (e.g., 1g of plastic bottle recycled saves roughly 1.5g CO2)
  const co2SavedGrams = Math.round(totalWeightGrams * 1.5);
  const co2SavedKg = (co2SavedGrams / 1000).toFixed(2);

  // Dynamic point score (e.g., 100 pts per record + 10 pts per item + 5 pts per 100g)
  const basePoints = 1000; // starting pre-populated points
  const calculatedPoints = basePoints + (records.length * 100) + (totalCount * 10) + Math.round(totalWeightGrams / 10);

  // Eco Rank Title based on points
  const getRankTitle = (pts: number) => {
    if (pts >= 3000) return "海洋保育大師 🐋";
    if (pts >= 2000) return "深海守護者 🐬";
    if (pts >= 1200) return "減塑先鋒隊 🦸‍♂️";
    return "海洋見習生 🐢";
  };

  // Badges list
  const badges = [
    {
      id: "badge-1",
      title: "海洋見習生",
      desc: "成功加入守護海洋計畫並開啟系統",
      icon: "🐢",
      unlocked: true,
    },
    {
      id: "badge-2",
      title: "環保行動派",
      desc: "成功辨識並登錄 1 筆以上海洋廢棄物",
      icon: "🧹",
      unlocked: records.length > 0,
    },
    {
      id: "badge-3",
      title: "重量級淨灘手",
      desc: "累計清除超過 10 公斤海洋垃圾",
      icon: "🏋️‍♂️",
      unlocked: parseFloat(totalWeightKg) >= 10,
    },
    {
      id: "badge-4",
      title: "百折不撓",
      desc: "成功辨識超過 100 件海廢雜物",
      icon: "🐳",
      unlocked: totalCount >= 100,
    }
  ];

  return (
    <div className="w-full min-h-screen bg-sky-50/50 pb-28 select-none">
      
      {/* Upper profile decorative banner */}
      <div className="bg-gradient-to-b from-blue-700 to-indigo-800 text-white px-6 pt-10 pb-20 rounded-b-[40px] shadow-lg relative overflow-hidden">
        
        {/* Background wave vectors */}
        <div className="absolute inset-0 opacity-15 pointer-events-none">
          <svg viewBox="0 0 100 100" className="w-full h-full text-white">
            <path d="M0,80 C30,75 70,85 100,80 L100,100 L0,100 Z" fill="currentColor" />
          </svg>
        </div>

        {/* Profile Details layout */}
        <div className="flex items-center space-x-4 relative z-10 max-w-md mx-auto">
          {/* Avatar ring */}
          <div className="w-18 h-18 rounded-full border-3 border-sky-300 bg-white shadow-xl flex items-center justify-center text-3xl font-bold">
            🧑‍💻
          </div>
          <div className="space-y-1">
            <h2 className="text-xl font-bold tracking-wide">{userEmail.split("@")[0]}</h2>
            <p className="text-xs text-sky-200 font-medium">{userEmail}</p>
            <div className="inline-flex items-center gap-1 bg-white/15 px-2.5 py-0.5 rounded-full text-[10px] font-bold text-sky-100 border border-white/10">
              <Shield size={10} /> {getRankTitle(calculatedPoints)}
            </div>
          </div>
        </div>

      </div>

      <div className="max-w-md mx-auto px-4 -mt-12 space-y-4 relative z-20">
        
        {/* Contributor dynamic stats board */}
        <div className="bg-white rounded-3xl p-5 border border-sky-100 shadow-sm grid grid-cols-3 gap-2 text-center">
          
          <div className="space-y-1 border-r border-sky-50">
            <p className="text-xs text-gray-400 font-bold">環保積分</p>
            <p className="text-lg font-black text-blue-600 font-mono">{calculatedPoints}</p>
            <button 
              onClick={onOpenLeaderboard}
              className="text-[10px] text-sky-500 font-bold hover:underline"
            >
              排名 #5 &gt;
            </button>
          </div>

          <div className="space-y-1 border-r border-sky-50">
            <p className="text-xs text-gray-400 font-bold">清運件數</p>
            <p className="text-lg font-black text-slate-800 font-mono">{totalCount > 0 ? totalCount : 156}</p>
            <p className="text-[10px] text-gray-400 font-semibold">件廢棄物</p>
          </div>

          <div className="space-y-1">
            <p className="text-xs text-gray-400 font-bold">減碳等值</p>
            <p className="text-lg font-black text-emerald-600 font-mono">
              {totalWeightGrams > 0 ? co2SavedKg : "58.0"} <span className="text-[10px] font-sans font-bold">kg</span>
            </p>
            <p className="text-[10px] text-emerald-500/80 font-bold flex items-center justify-center gap-0.5">
              ☘️ 綠色足跡
            </p>
          </div>

        </div>

        {/* Environmental impact tracker list */}
        <div className="bg-white rounded-3xl p-5 border border-sky-100 shadow-sm space-y-3">
          <h3 className="text-xs font-black text-gray-500 uppercase tracking-widest flex items-center gap-1.5">
            🎖️ 成就勳章
          </h3>
          
          <div className="divide-y divide-sky-50">
            {badges.map((badge) => (
              <div 
                key={badge.id} 
                className={`py-3 flex items-center justify-between transition-all ${
                  badge.unlocked ? "opacity-100" : "opacity-45"
                }`}
              >
                <div className="flex items-center space-x-3.5">
                  <span className="text-3xl filter drop-shadow-sm select-none">{badge.icon}</span>
                  <div>
                    <h4 className="text-xs font-extrabold text-gray-800">{badge.title}</h4>
                    <p className="text-[10px] text-gray-400 font-medium mt-0.5">{badge.desc}</p>
                  </div>
                </div>

                <div className="flex-shrink-0">
                  {badge.unlocked ? (
                    <span className="inline-flex items-center gap-1 text-[10px] font-extrabold text-emerald-600 bg-emerald-50 border border-emerald-100 py-1 px-2.5 rounded-full">
                      <CheckCircle2 size={10} /> 已解鎖
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-gray-400 bg-gray-50 border border-gray-100 py-1 px-2.5 rounded-full">
                      未解鎖
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Informational Guidelines Card */}
        <div className="bg-gradient-to-tr from-sky-400 to-indigo-500 rounded-3xl p-5 text-white shadow-md relative overflow-hidden space-y-3">
          <div className="absolute top-2 right-2 opacity-10">
            <Compass size={80} />
          </div>
          
          <h3 className="font-extrabold text-sm tracking-wide flex items-center gap-1.5">
            <Info size={16} /> 減塑淨灘指南
          </h3>
          <p className="text-xs text-sky-100 leading-relaxed font-medium">
            沙灘上的廢棄物絕大多數是塑膠瓶、漁網與包裝紙盒。我們推動的「海洋廢棄物即時辨識系統」結合機器視覺，旨在引導每個人進行正確的資源分類，並建立環保意識，共同恢復乾淨蔚藍的海洋。
          </p>
          <div className="pt-1 flex gap-2">
            <a 
              href="https://ourblueocean.org" 
              target="_blank" 
              referrerPolicy="no-referrer"
              className="bg-white/15 hover:bg-white/25 border border-white/20 py-1.5 px-4 rounded-xl text-[11px] font-bold text-white transition-all flex items-center gap-1"
            >
              瞭解更多海洋保護
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
