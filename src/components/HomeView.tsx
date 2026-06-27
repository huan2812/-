/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { Camera, Folder, Trophy, Droplets, Trash2, ArrowUpRight } from "lucide-react";

interface HomeViewProps {
  onNavigate: (tab: string) => void;
  onOpenLeaderboard: () => void;
}

export default function HomeView({ onNavigate, onOpenLeaderboard }: HomeViewProps) {
  // Bubbles elements for animation
  const bubbles = Array.from({ length: 15 });

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-b from-sky-400 via-blue-500 to-indigo-800 text-white overflow-hidden pb-20 select-none">
      
      {/* Decorative Floating Bubbles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {bubbles.map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/15 backdrop-blur-2xs"
            style={{
              width: Math.random() * 24 + 8 + "px",
              height: Math.random() * 24 + 8 + "px",
              left: Math.random() * 100 + "%",
              bottom: "-5%",
            }}
            animate={{
              y: ["100%", "-110%"],
              x: [0, Math.sin(i) * 30, 0],
              opacity: [0, 0.7, 0],
            }}
            transition={{
              duration: Math.random() * 12 + 8,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Floating trash items decoration at the bottom */}
      <div className="absolute bottom-10 inset-x-0 h-32 pointer-events-none opacity-20">
        <motion.div 
          className="absolute left-[10%] bottom-[20%]"
          animate={{ y: [0, -10, 0], rotate: [0, 15, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
        >
          <Trash2 size={40} className="text-white/60" />
        </motion.div>
        <motion.div 
          className="absolute right-[15%] bottom-[30%]"
          animate={{ y: [0, -15, 0], rotate: [0, -20, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        >
          <Droplets size={32} className="text-white/60" />
        </motion.div>
      </div>

      {/* Main Content Container */}
      <div className="max-w-md mx-auto px-6 pt-12 flex flex-col items-center justify-between min-h-screen relative z-10">
        
        {/* Header Title Section */}
        <div className="text-center w-full mt-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-wider leading-snug drop-shadow-lg text-white">
              海洋廢棄物
            </h1>
            <h2 className="text-2xl md:text-3xl font-bold tracking-widest mt-1 drop-shadow-md text-sky-100">
              即時辨識與分析系統
            </h2>
            <div className="w-16 h-1.5 bg-sky-300 rounded-full mx-auto mt-4 shadow-sm" />
          </motion.div>
        </div>

        {/* Beautiful Custom Circular Ocean Wave Graphic (matching Screen 1) */}
        <motion.div
          className="my-8 relative w-56 h-56 md:w-64 md:h-64 flex items-center justify-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 80 }}
        >
          {/* Outer glowing ring */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-sky-400 to-indigo-500 opacity-30 blur-md animate-pulse" />
          
          {/* Inner ring */}
          <div className="absolute inset-3 rounded-full border-4 border-dashed border-sky-200/50 animate-spin" style={{ animationDuration: "40s" }} />
          
          {/* Primary Circle Canvas */}
          <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-full bg-sky-900/40 border-4 border-white/80 overflow-hidden flex items-center justify-center shadow-2xl backdrop-blur-xs">
            {/* SVG Wave and Debris Graphic */}
            <svg viewBox="0 0 100 100" className="w-full h-full absolute inset-0 text-sky-300">
              {/* Back waves */}
              <path d="M0,60 C30,55 70,65 100,60 L100,100 L0,100 Z" fill="#1e40af" opacity="0.6" />
              
              {/* Floating trash silhouettes in the waves */}
              {/* Bottle silhouette */}
              <g transform="translate(30, 48) rotate(-15) scale(0.12)" fill="#93c5fd" opacity="0.8">
                <path d="M50,10 L70,10 L70,25 C75,25 80,30 80,35 L80,120 C80,125 75,130 70,130 L30,130 C25,130 20,125 20,120 L20,35 C20,30 25,25 30,25 L30,10 Z" />
                <rect x="40" y="0" width="20" height="10" rx="2" />
              </g>

              {/* Plastic bag silhouette */}
              <g transform="translate(62, 52) rotate(20) scale(0.1)" fill="#e0f2fe" opacity="0.7">
                <path d="M10,30 C10,10 30,10 40,25 C45,10 65,10 65,30 L75,120 L5,120 Z" />
                <ellipse cx="37" cy="65" rx="10" ry="15" fill="#1e40af" />
              </g>

              {/* Cup silhouette */}
              <g transform="translate(18, 65) rotate(45) scale(0.1)" fill="#7dd3fc" opacity="0.7">
                <path d="M10,10 L90,10 L75,100 L25,100 Z" />
                <rect x="20" y="0" width="60" height="10" rx="3" />
              </g>

              {/* Front wave */}
              <path d="M0,68 C40,78 60,58 100,68 L100,100 L0,100 Z" fill="#0369a1" />
              <path d="M0,74 C30,70 70,82 100,74 L100,100 L0,100 Z" fill="#0e7490" opacity="0.8" />
            </svg>
            
            {/* Small fish silhouette animating */}
            <motion.div 
              className="absolute left-6 top-28 text-sky-200/40 pointer-events-none"
              animate={{ x: [-20, 200], y: [0, -10, 0] }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            >
              🐟
            </motion.div>
          </div>
        </motion.div>

        {/* Buttons List Panel (matches screen 1 perfectly) */}
        <div className="w-full space-y-4 mb-10">
          
          {/* Button 1: 新建辨識 (New Detection) */}
          <motion.button
            id="btn-new-detection"
            className="w-full bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-600 hover:to-indigo-600 border border-white/20 rounded-2xl py-4.5 px-6 flex items-center justify-between shadow-lg text-left transition-all active:scale-[0.98] group"
            onClick={() => onNavigate("detect")}
            whileHover={{ y: -2 }}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-white/15 rounded-xl group-hover:bg-white/25 transition-all">
                <Camera size={26} className="text-sky-100" />
              </div>
              <div>
                <div className="text-lg font-bold tracking-wider">新建辨識</div>
                <div className="text-xs text-sky-200/80 mt-0.5">New Detection</div>
              </div>
            </div>
            <ArrowUpRight size={20} className="text-sky-200/60 group-hover:text-white transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </motion.button>

          {/* Button 2: 歷史紀錄 (History Records) */}
          <motion.button
            id="btn-history-records"
            className="w-full bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 border border-white/20 rounded-2xl py-4.5 px-6 flex items-center justify-between shadow-lg text-left transition-all active:scale-[0.98] group"
            onClick={() => onNavigate("analysis")}
            whileHover={{ y: -2 }}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-white/15 rounded-xl group-hover:bg-white/25 transition-all">
                <Folder size={26} className="text-emerald-100" />
              </div>
              <div>
                <div className="text-lg font-bold tracking-wider">歷史紀錄</div>
                <div className="text-xs text-emerald-200/80 mt-0.5">History Records</div>
              </div>
            </div>
            <ArrowUpRight size={20} className="text-emerald-200/60 group-hover:text-white transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </motion.button>

          {/* Button 3: 排行榜 (Leaderboard) */}
          <motion.button
            id="btn-leaderboard"
            className="w-full bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-500 hover:to-blue-600 border border-white/20 rounded-2xl py-4.5 px-6 flex items-center justify-between shadow-lg text-left transition-all active:scale-[0.98] group"
            onClick={onOpenLeaderboard}
            whileHover={{ y: -2 }}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-white/15 rounded-xl group-hover:bg-white/25 transition-all">
                <Trophy size={26} className="text-cyan-100" />
              </div>
              <div>
                <div className="text-lg font-bold tracking-wider">排行榜</div>
                <div className="text-xs text-cyan-200/80 mt-0.5">Leaderboard</div>
              </div>
            </div>
            <ArrowUpRight size={20} className="text-cyan-200/60 group-hover:text-white transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </motion.button>

        </div>

        {/* Small bottom footer */}
        <div className="text-center text-xs text-sky-200/50 mb-4 font-mono">
          © 2026 守護海洋系統 · v1.2.0
        </div>

      </div>
    </div>
  );
}
