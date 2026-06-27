/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface DebrisItem {
  id: string;
  name: string; // e.g., 塑膠瓶, 保麗龍盒, 鐵罐, 玻璃瓶
  category: "塑膠類" | "金屬類" | "玻璃類" | "其他";
  confidence: number; // Percentage, e.g., 95
  weightGrams: number; // Estimated weight
  boundingBox?: [number, number, number, number]; // [ymin, xmin, ymax, xmax] as percentage (0-100)
}

export interface DebrisRecord {
  id: string;
  imageUrl: string;
  timestamp: string; // e.g., "2024/05/22 10:30"
  items: DebrisItem[];
  totalWeightGrams: number;
  location: string;
  environmentalImpact?: string; // AI generated text about impact
  cleanupAction?: string; // AI suggestion
}

export interface LeaderboardEntry {
  rank: number;
  name: string;
  avatar: string;
  points: number;
  pieces: number;
  weightKg: number;
  isCurrentUser?: boolean;
}

export interface CategoryStat {
  name: "塑膠類" | "金屬類" | "玻璃類" | "其他";
  percentage: number;
  color: string;
  count: number;
}
