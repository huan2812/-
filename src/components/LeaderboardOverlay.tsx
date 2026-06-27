/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { Trophy, Medal, X, Sparkles, Star, Heart, Flame } from "lucide-react";
import { MOCK_LEADERBOARD } from "../data";

interface LeaderboardOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LeaderboardOverlay({ isOpen, onClose }: LeaderboardOverlayProps) {
  if (!isOpen) return null;

  // Find user rank to show highlight metrics
  const currentUser = MOCK_LEADERBOARD.find(u => u.isCurrentUser);

  return (
    <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 220 }}
        className="bg-white w-full max-w-md rounded-[32px] overflow-hidden shadow-2xl flex flex-col max-h-[85vh]"
      >
        
        {/* Glorious Gradient Header */}
        <div className="bg-gradient-to-r from-blue-700 via-indigo-800 to-indigo-900 text-white p-6 relative overflow-hidden flex-shrink-0">
          
          {/* Decorative absolute icons */}
          <div className="absolute -top-3 -right-3 opacity-10 rotate-12">
            <Trophy size={140} />
          </div>

          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all"
          >
            <X size={18} />
          </button>

          <div className="space-y-1 relative z-10">
            <div className="inline-flex items-center gap-1 bg-amber-400 text-slate-950 font-black text-[10px] py-1 px-2.5 rounded-full shadow-md animate-pulse">
              <Sparkles size={10} /> 環保先鋒
            </div>
            <h2 className="text-xl font-black tracking-widest mt-1">環保英雄排行榜</h2>
            <p className="text-[10px] text-sky-200/80 font-medium">
              凝聚眾人之力，還原蔚藍海洋。排行每週日更新。
            </p>
          </div>

          {/* Quick User summary if present */}
          {currentUser && (
            <div className="mt-4 bg-white/10 rounded-2xl p-3 border border-white/10 flex items-center justify-between text-xs font-semibold">
              <div className="flex items-center space-x-2">
                <span className="text-xl">🏆</span>
                <div>
                  <p className="text-[10px] text-sky-200">您的當前排名</p>
                  <p className="text-white text-xs">第 {currentUser.rank} 名 · {currentUser.name.replace("您 ( ", "").replace(" )", "")}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-sky-200 font-bold">累積積分</p>
                <p className="text-amber-300 font-mono font-black">{currentUser.points} Pts</p>
              </div>
            </div>
          )}

        </div>

        {/* Scrollable Leaderboard Items (matches Screen 1 Leaderboard list concept) */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          
          <div className="flex text-[10px] text-gray-400 font-extrabold uppercase px-3 pb-1 tracking-wider">
            <span className="w-10">排行</span>
            <span className="flex-1">守護者</span>
            <span className="w-16 text-right">清理(件)</span>
            <span className="w-16 text-right">重量(kg)</span>
            <span className="w-16 text-right">積分</span>
          </div>

          <div className="space-y-1.5">
            {MOCK_LEADERBOARD.map((user) => {
              const isTop3 = user.rank <= 3;
              const isUser = user.isCurrentUser;
              
              return (
                <div 
                  key={user.rank}
                  className={`flex items-center py-2.5 px-3 rounded-2xl text-xs font-semibold transition-all border ${
                    isUser 
                      ? "bg-sky-50 border-sky-200 shadow-3xs" 
                      : "bg-white border-sky-50 hover:border-sky-100"
                  }`}
                >
                  
                  {/* Rank bubble / Medal */}
                  <div className="w-10 flex items-center">
                    {user.rank === 1 && <Medal className="text-amber-500" size={20} />}
                    {user.rank === 2 && <Medal className="text-slate-400" size={20} />}
                    {user.rank === 3 && <Medal className="text-amber-700" size={20} />}
                    {!isTop3 && (
                      <span className="font-mono text-gray-400 font-black pl-1.5">
                        {user.rank}
                      </span>
                    )}
                  </div>

                  {/* Avatar and Name */}
                  <div className="flex-1 flex items-center space-x-2.5 truncate">
                    <span className="text-xl filter drop-shadow-3xs select-none">{user.avatar}</span>
                    <span className={`truncate text-gray-800 ${isUser ? "text-blue-700 font-black" : "font-extrabold"}`}>
                      {user.name}
                    </span>
                    {user.rank === 1 && <Flame size={12} className="text-red-500 animate-pulse flex-shrink-0" />}
                  </div>

                  {/* Pieces cleaned */}
                  <div className="w-16 text-right font-mono text-gray-600 font-bold">
                    {user.pieces}
                  </div>

                  {/* Weight cleaned */}
                  <div className="w-16 text-right font-mono text-gray-600 font-bold">
                    {user.weightKg.toFixed(1)}
                  </div>

                  {/* Points score */}
                  <div className={`w-16 text-right font-mono font-black ${
                    isUser ? "text-blue-600" : isTop3 ? "text-indigo-600" : "text-gray-700"
                  }`}>
                    {user.points}
                  </div>

                </div>
              );
            })}
          </div>

        </div>

        {/* Modal bottom motivator */}
        <div className="bg-slate-50 border-t border-sky-50 p-4.5 text-center flex-shrink-0 rounded-b-[32px]">
          <p className="text-[11px] text-gray-500 leading-relaxed font-semibold flex items-center justify-center gap-1.5">
            ❤️ 只要開始辨識並回收垃圾，您也能登上排行榜！
          </p>
        </div>

      </motion.div>
    </div>
  );
}
