/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type OutageCategory = 
  | 'hydration'
  | 'cooling_environment'
  | 'health_safety';

export type CostTier = 'Free' | 'Low cost (£)' | 'Moderate cost (££)' | 'Higher cost (£££)';

export interface TrackerItem {
  id: string;
  day: 1 | 2 | 3;
  category: OutageCategory;
  categoryLabel: string;
  title: string;
  description: string;
  whyItMatters: string;
  guidance?: string;
  points: number;
  cost: CostTier;
  quickWin: boolean;
  priorityHouseholdNeed?: boolean;
}

export interface HouseholdProfile {
  size: number;
  circumstances: string[];
}

export interface CategoryScore {
  category: OutageCategory;
  label: string;
  checked: number;
  total: number;
  percentage: number;
}

export interface DiagnosticResult {
  title: string;
  badgeColor: string;
  description: string;
  level: 'action_needed' | 'moderate' | 'strong';
}

export interface TailoredAlert {
  type: string;
  message: string;
  actionText: string;
  actionId?: string;
}

export interface ScoreReport {
  score: number;
  totalPoints: number;
  maxPoints: number;
  daysResilience: number;
  daysLabel: string;
  daysSummary: string;
  diagnostic: DiagnosticResult;
  categories: CategoryScore[];
  strengths: TrackerItem[];
  gaps: TrackerItem[];
  highestImpactGap?: TrackerItem;
  tailoredAlerts: TailoredAlert[];
}
