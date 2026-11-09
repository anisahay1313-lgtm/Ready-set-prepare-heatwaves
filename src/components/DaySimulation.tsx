/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronDown,
  ChevronUp,
  Droplet,
  Info,
  Thermometer,
  RotateCcw
} from 'lucide-react';
import { HouseholdProfile, OutageCategory } from '../types';
import { getActiveTrackerItems, DAY_NARRATIVES, CATEGORY_METADATA } from '../data';

interface DaySimulationProps {
  day: 1 | 2 | 3;
  householdProfile: HouseholdProfile;
  checkedItemIds: string[];
  onToggleItem: (id: string) => void;
  onNext: () => void;
  onPrev: () => void;
  onReset: () => void;
}

export const DaySimulation: React.FC<DaySimulationProps> = ({
  day,
  householdProfile,
  checkedItemIds,
  onToggleItem,
  onNext,
  onPrev,
  onReset
}) => {
  const narrative = DAY_NARRATIVES[day];
  const activeItems = getActiveTrackerItems(householdProfile);
  const dayItems = activeItems.filter(item => item.day === day);
  const checkedInDayCount = dayItems.filter(item => checkedItemIds.includes(item.id)).length;

  // Strict scroll to top on step transition
  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };
    scrollToTop();
    const frameId = requestAnimationFrame(scrollToTop);
    const timer = setTimeout(scrollToTop, 25);
    return () => {
      cancelAnimationFrame(frameId);
      clearTimeout(timer);
    };
  }, [day]);

  // Track expanded "Why it matters" items - closed by default
  const [expandedWhy, setExpandedWhy] = useState<Record<string, boolean>>({});

  const toggleWhy = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedWhy(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handlePrevClick = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    onPrev();
  };

  const handleNextClick = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    onNext();
  };

  // Group items by category in the sequence they appear for this day
  const categoriesInDay = Array.from(new Set(dayItems.map(i => i.category))) as OutageCategory[];

  const totalLitres = householdProfile.size * 9; // 3L daily x 3 days

  return (
    <div className="flex flex-col pb-28 max-w-md mx-auto px-4 pt-2">
      {/* Top Navigation & Day Progress */}
      <div className="flex items-center justify-between mb-3 gap-2">
        <button
          onClick={handlePrevClick}
          className="min-h-[44px] text-xs font-black text-zinc-950 hover:text-[#991B1B] flex items-center gap-1 cursor-pointer py-2 px-3 rounded-lg bg-white border border-zinc-300 hover:border-zinc-400 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-black transition-colors shadow-2xs"
          type="button"
          aria-label={day === 1 ? 'Go back to Household Profile' : `Go back to Day ${day - 1}`}
        >
          <ArrowLeft className="w-3.5 h-3.5 text-zinc-950" aria-hidden="true" />
          <span>{day === 1 ? 'Profile' : `Day ${day - 1}`}</span>
        </button>

        <div className="flex items-center gap-1 text-xs font-black text-zinc-950 uppercase tracking-wider" aria-live="polite">
          <span>{day === 3 ? 'DAY 3+' : `DAY ${day} OF 3`}</span>
          <span>·</span>
          <span className="text-[#991B1B]">{checkedInDayCount}/{dayItems.length} READY</span>
        </div>

        <button
          onClick={onReset}
          className="min-h-[44px] text-xs font-black text-zinc-950 hover:text-[#991B1B] flex items-center gap-1 cursor-pointer py-2 px-3 rounded-lg bg-white hover:bg-zinc-50 border border-zinc-300 hover:border-zinc-400 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-black transition-colors shadow-2xs"
          type="button"
          title="Reset assessment and start over"
          aria-label="Reset assessment and start over"
        >
          <RotateCcw className="w-3.5 h-3.5 text-zinc-950" aria-hidden="true" />
          <span>Reset</span>
        </button>
      </div>

      {/* Narrative Scenario Box */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        key={`day-narrative-${day}`}
        className="bg-[#EAF7EE] rounded-3xl border-2 border-[#B7E7C4] p-5 shadow-xs mb-3.5 overflow-hidden relative"
      >
        <div className="flex items-center justify-between mb-3">
          <span className="px-3 py-1 rounded-full bg-[#00703C] text-white font-black text-[11px] tracking-wider uppercase flex items-center gap-1.5 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-white inline-block" aria-hidden="true" />
            {narrative.badge}
          </span>
          <span className="text-xs font-bold text-zinc-950 flex items-center gap-1 bg-white px-2.5 py-1 rounded-full border border-[#B7E7C4] shadow-2xs">
            <Thermometer className="w-3.5 h-3.5 text-[#991B1B]" aria-hidden="true" />
            <span>{narrative.forecast}</span>
          </span>
        </div>

        <h2 className="font-display font-black text-xl text-zinc-950 tracking-tight leading-snug mb-2">
          {narrative.title}
        </h2>

        <p className="text-xs sm:text-[13px] text-zinc-950 leading-relaxed mb-3.5 font-normal">
          {narrative.story}
        </p>

        <div className="pt-2.5 border-t border-[#B7E7C4] text-xs font-bold text-black">
          <span>{narrative.instruction}</span>
        </div>
      </motion.div>

      {/* Water Requirement Notification (Shown on Day 1 & Day 2 as in screenshots) */}
      {(day === 1 || day === 2) && (
        <div className="p-3 bg-[#EBF4FF] border border-[#BFDBFE] rounded-2xl flex items-center gap-2.5 text-zinc-950 text-xs mb-4 shadow-2xs">
          <Droplet className="w-4 h-4 text-blue-700 shrink-0" aria-hidden="true" />
          <div className="leading-snug text-zinc-950 text-[11px] sm:text-xs">
            <strong className="font-black text-blue-950">Water requirement:</strong> Requires{' '}
            <strong className="text-blue-950 font-black">{totalLitres} litres</strong> of drinking water for your{' '}
            {householdProfile.size} household member{householdProfile.size > 1 ? 's' : ''} (3 days).
          </div>
        </div>
      )}

      {/* Checklist Sections by Category */}
      <div className="space-y-6">
        {categoriesInDay.map(categoryKey => {
          const categoryMeta = CATEGORY_METADATA[categoryKey];
          const itemsInCategory = dayItems.filter(i => i.category === categoryKey);

          return (
            <div key={categoryKey} className="space-y-2.5">
              {/* Category Header with Red Bar */}
              <div className="flex items-center justify-between px-1">
                <h3 className="font-display font-black text-xs text-zinc-950 flex items-center gap-1.5">
                  <span className="w-1.5 h-3.5 bg-[#B91C1C] rounded-full inline-block" aria-hidden="true" />
                  <span>{categoryMeta.label}</span>
                </h3>
                <span className="text-xs font-bold text-zinc-950">
                  {itemsInCategory.filter(i => checkedItemIds.includes(i.id)).length}/{itemsInCategory.length} ready
                </span>
              </div>

              {/* Items in Category */}
              <div className="space-y-3">
                {itemsInCategory.map(item => {
                  const isChecked = checkedItemIds.includes(item.id);
                  const isWhyExpanded = Boolean(expandedWhy[item.id]);

                  return (
                    <motion.div
                      key={item.id}
                      layout
                      role="checkbox"
                      aria-checked={isChecked}
                      aria-label={`${item.title}. ${item.description}`}
                      tabIndex={0}
                      onClick={() => onToggleItem(item.id)}
                      onKeyDown={(e) => {
                        if (e.key === ' ' || e.key === 'Enter') {
                          e.preventDefault();
                          onToggleItem(item.id);
                        }
                      }}
                      className={`p-4 rounded-2xl border-2 transition-all cursor-pointer relative focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-black focus-visible:ring-offset-2 ${
                        isChecked
                          ? 'bg-[#EAF7EE]/70 border-[#00703C] shadow-2xs'
                          : 'bg-white border-zinc-300 hover:border-zinc-400'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        {/* Checkbox */}
                        <div
                          className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                            isChecked
                              ? 'bg-[#00703C] border-[#00703C] text-white shadow-2xs'
                              : 'border-zinc-500 bg-white'
                          }`}
                          aria-hidden="true"
                        >
                          {isChecked && <Check className="w-4 h-4 stroke-[3px]" />}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-display font-black text-sm text-zinc-950 leading-snug mb-1">
                            {item.title}
                          </h4>

                          <p className="text-xs text-zinc-950 leading-relaxed mb-2 font-normal">
                            {item.description}
                          </p>

                          {/* Item-specific water calculation banner for adequate_stored_water */}
                          {item.id === 'adequate_stored_water' && (
                            <div className="p-2.5 bg-[#EBF4FF] border border-[#BFDBFE] rounded-xl flex items-center gap-2 text-blue-950 text-xs mb-2">
                              <Droplet className="w-3.5 h-3.5 text-blue-700 shrink-0" aria-hidden="true" />
                              <span className="font-bold text-[11px] sm:text-xs">
                                Required: {totalLitres}L stored for {householdProfile.size} {householdProfile.size === 1 ? 'person' : 'people'} (3L per person daily for 3 days).
                              </span>
                            </div>
                          )}

                          {/* Expandable Why It Matters Toggle */}
                          <div className="mt-1">
                            <button
                              onClick={(e) => toggleWhy(item.id, e)}
                              className="min-h-[44px] inline-flex items-center gap-1.5 text-xs font-bold text-[#991B1B] hover:text-[#7F1D1D] focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-black rounded-lg py-1 px-1 -ml-1 cursor-pointer transition-colors"
                              type="button"
                              aria-expanded={isWhyExpanded}
                              aria-controls={`why-panel-${item.id}`}
                              aria-label={`${isWhyExpanded ? 'Hide' : 'Show'} why ${item.title} matters`}
                            >
                              <Info className="w-4 h-4" aria-hidden="true" />
                              <span className="underline underline-offset-2">{isWhyExpanded ? 'Hide why it matters' : 'Why it matters'}</span>
                              {isWhyExpanded ? (
                                <ChevronUp className="w-4 h-4" aria-hidden="true" />
                              ) : (
                                <ChevronDown className="w-4 h-4" aria-hidden="true" />
                              )}
                            </button>

                            <AnimatePresence>
                              {isWhyExpanded && (
                                <motion.div
                                  id={`why-panel-${item.id}`}
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: 'auto' }}
                                  exit={{ opacity: 0, height: 0 }}
                                  transition={{ duration: 0.2 }}
                                  className="overflow-hidden"
                                >
                                  <div className="p-3.5 bg-white border border-zinc-200 rounded-xl mt-2 text-xs text-zinc-950 leading-relaxed shadow-2xs">
                                    <div className="font-bold text-zinc-950 mb-1">
                                      Why it matters
                                    </div>
                                    <p className="text-zinc-950 leading-relaxed mb-3">
                                      {item.whyItMatters}
                                    </p>

                                    {item.guidance && (
                                      <div className="pt-2.5 border-t border-zinc-200">
                                        <div className="font-bold text-[#991B1B] flex items-center gap-1.5 mb-1">
                                          <span className="font-black text-sm leading-none" aria-hidden="true">+</span>
                                          <span>British Red Cross guidance</span>
                                        </div>
                                        <p className="text-zinc-950 leading-relaxed">
                                          {item.guidance}
                                        </p>
                                      </div>
                                    )}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Action Bar */}
      <div className="mt-8 pt-4 border-t border-zinc-200 flex items-center justify-between gap-3">
        <button
          onClick={handlePrevClick}
          className="min-h-[48px] py-3.5 px-5 bg-white border-2 border-zinc-400 hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-black text-zinc-950 font-black text-xs rounded-xl transition-colors cursor-pointer"
          type="button"
          aria-label={day === 1 ? 'Back to Household Profile' : `Back to Day ${day - 1}`}
        >
          Back
        </button>

        <button
          onClick={handleNextClick}
          className="flex-1 min-h-[48px] py-3.5 px-4 bg-[#B91C1C] hover:bg-[#991B1B] focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-black text-white font-black text-xs sm:text-sm rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer group"
          type="button"
          aria-label={
            day === 1
              ? 'Continue to Day 2'
              : day === 2
              ? 'Continue to Day 3'
              : 'View results and resilience plan'
          }
        >
          <span>
            {day === 1
              ? 'Continue to Day 2 →'
              : day === 2
              ? 'Continue to Day 3 →'
              : 'View results & resilience plan →'}
          </span>
        </button>
      </div>
    </div>
  );
};
