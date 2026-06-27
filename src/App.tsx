/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { Home, Camera, BarChart3, User, Trophy } from "lucide-react";
import HomeView from "./components/HomeView";
import DetectView from "./components/DetectView";
import AnalysisView from "./components/AnalysisView";
import ProfileView from "./components/ProfileView";
import LeaderboardOverlay from "./components/LeaderboardOverlay";
import { DebrisRecord } from "./types";
import { MOCK_HISTORY_RECORDS } from "./data";

export default function App() {
  // Bottom Tab State: "home" | "detect" | "analysis" | "profile"
  const [activeTab, setActiveTab] = useState<string>("home");
  
  // Leaderboard modal overlay state
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState<boolean>(false);
  
  // Records State - Persisted in LocalStorage with preloaded mock historical records!
  const [records, setRecords] = useState<DebrisRecord[]>(() => {
    const saved = localStorage.getItem("marine_debris_records_v1");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse saved records:", e);
      }
    }
    return MOCK_HISTORY_RECORDS;
  });

  // Sync to LocalStorage on changes
  useEffect(() => {
    localStorage.setItem("marine_debris_records_v1", JSON.stringify(records));
  }, [records]);

  // Handle Adding new record
  const handleAddRecord = (record: DebrisRecord) => {
    setRecords((prev) => [record, ...prev]);
  };

  // Handle Deleting record
  const handleDeleteRecord = (id: string) => {
    setRecords((prev) => prev.filter((r) => r.id !== id));
  };

  // Helper to switch tab
  const handleNavigate = (tab: string) => {
    setActiveTab(tab);
  };

  // Trigger Leaderboard from home screen button or profile ranking
  const handleOpenLeaderboard = () => {
    setIsLeaderboardOpen(true);
  };

  return (
    <div className="w-full min-h-screen bg-sky-50/20 font-sans relative">
      
      {/* App main view routers */}
      <main className="w-full min-h-screen">
        {activeTab === "home" && (
          <HomeView 
            onNavigate={handleNavigate} 
            onOpenLeaderboard={handleOpenLeaderboard} 
          />
        )}
        {activeTab === "detect" && (
          <DetectView 
            onAddRecord={handleAddRecord} 
            onNavigateHome={() => handleNavigate("home")} 
          />
        )}
        {activeTab === "analysis" && (
          <AnalysisView 
            records={records} 
            onDeleteRecord={handleDeleteRecord} 
            onNavigateHome={() => handleNavigate("home")} 
          />
        )}
        {activeTab === "profile" && (
          <ProfileView 
            records={records} 
            onOpenLeaderboard={handleOpenLeaderboard} 
          />
        )}
      </main>

      {/* Floating Leaderboard Overlay */}
      <LeaderboardOverlay 
        isOpen={isLeaderboardOpen} 
        onClose={() => setIsLeaderboardOpen(false)} 
      />

      {/* Persistent Elegant Bottom Navigation (matches Screen 2 & 3 navigation perfectly!) */}
      <nav className="fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-sky-100 py-3.5 px-6 flex justify-around items-center shadow-[0_-4px_16px_rgba(3,105,161,0.08)] z-30 select-none">
        
        {/* Tab 1: 首頁 (Home) */}
        <button
          id="nav-tab-home"
          onClick={() => handleNavigate("home")}
          className={`flex flex-col items-center space-y-1 transition-all ${
            activeTab === "home" ? "text-blue-600 scale-105" : "text-gray-400 hover:text-gray-600"
          }`}
        >
          <Home size={22} className={activeTab === "home" ? "stroke-[2.5px]" : "stroke-[2px]"} />
          <span className="text-[10px] font-bold tracking-wider">首頁</span>
        </button>

        {/* Tab 2: 辨識 (Detect) */}
        <button
          id="nav-tab-detect"
          onClick={() => handleNavigate("detect")}
          className={`flex flex-col items-center space-y-1 transition-all ${
            activeTab === "detect" ? "text-blue-600 scale-105" : "text-gray-400 hover:text-gray-600"
          }`}
        >
          <Camera size={22} className={activeTab === "detect" ? "stroke-[2.5px]" : "stroke-[2px]"} />
          <span className="text-[10px] font-bold tracking-wider">辨識</span>
        </button>

        {/* Tab 3: 分析 (Analysis) */}
        <button
          id="nav-tab-analysis"
          onClick={() => handleNavigate("analysis")}
          className={`flex flex-col items-center space-y-1 transition-all ${
            activeTab === "analysis" ? "text-blue-600 scale-105" : "text-gray-400 hover:text-gray-600"
          }`}
        >
          <BarChart3 size={22} className={activeTab === "analysis" ? "stroke-[2.5px]" : "stroke-[2px]"} />
          <span className="text-[10px] font-bold tracking-wider">分析</span>
        </button>

        {/* Tab 4: 我的 (Profile) */}
        <button
          id="nav-tab-profile"
          onClick={() => handleNavigate("profile")}
          className={`flex flex-col items-center space-y-1 transition-all ${
            activeTab === "profile" ? "text-blue-600 scale-105" : "text-gray-400 hover:text-gray-600"
          }`}
        >
          <User size={22} className={activeTab === "profile" ? "stroke-[2.5px]" : "stroke-[2px]"} />
          <span className="text-[10px] font-bold tracking-wider">我的</span>
        </button>

      </nav>

    </div>
  );
}
