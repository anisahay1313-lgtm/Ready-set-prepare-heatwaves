/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { Plus, Minus, Check, ArrowRight, Shield, Droplets, Wind, Heart } from 'lucide-react';
import { HouseholdProfile } from '../types';
import { CIRCUMSTANCE_OPTIONS } from '../data';

interface Page1ProfileProps {
  householdProfile: HouseholdProfile;
  onChangeHouseholdProfile: (profile: HouseholdProfile) => void;
  onStartSimulation: () => void;
}

export const Page1Profile: React.FC<Page1ProfileProps> = ({
  householdProfile,
  onChangeHouseholdProfile,
  onStartSimulation
}) => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  const handleSetSize = (newSize: number) => {
    onChangeHouseholdProfile({
      ...householdProfile,
      size: Math.max(1, Math.min(12, newSize))
    });
  };

  const handleToggleCircumstance = (opt: string) => {
    if (opt === 'None of the above') {
      onChangeHouseholdProfile({
        ...householdProfile,
        circumstances: []
      });
      return;
    }

    const current = householdProfile.circumstances.filter(c => c !== 'None of the above');
    const exists = current.includes(opt);
    const updated = exists ? current.filter(c => c !== opt) : [...current, opt];

    onChangeHouseholdProfile({
      ...householdProfile,
      circumstances: updated
    });
  };

  const isNoneSelected = householdProfile.circumstances.length === 0;

  return (
    <div className="flex flex-col pb-24 max-w-md mx-auto px-4 pt-2">
      {/* Hero Badge */}
      <div className="flex items-center gap-2 mb-2">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-[#EE2A24] font-black text-xs uppercase tracking-wider">
          <Shield className="w-3.5 h-3.5 fill-[#EE2A24]" />
          British Red Cross resilience tracker
        </span>
      </div>

      {/* Hero Image */}
      <div className="w-full rounded-2xl overflow-hidden mb-4 relative border border-zinc-200 shadow-xs bg-[#FAF5EB]">
        <img
          src="/assets/illustrations/heatwaves.png"
          alt="Woman staying cool and hydrated with a water bottle during an extreme heatwave"
          className="w-full h-auto aspect-[262/180] object-cover object-center block"
        />
        <div className="absolute bottom-2.5 right-2.5 px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-xs text-white text-[11px] font-black tracking-wide shadow-xs">
          3-day heatwave simulation
        </div>
      </div>

      {/* Main Title & Action-Oriented CTA */}
      <div className="mb-4">
        <h1 className="font-display font-black text-2xl sm:text-3xl text-zinc-950 tracking-tight leading-tight">
          Ready, set, prepare: heatwaves
          <span className="block text-lg sm:text-xl font-extrabold text-zinc-900 mt-1">
            Test your household preparedness
          </span>
        </h1>

        <div className="mt-3 p-4 rounded-2xl bg-red-50/90 border-2 border-red-200">
          <p className="font-black text-base text-[#EE2A24] leading-snug">
            Are you prepared for 3 days?
          </p>
          <p className="font-bold text-xs sm:text-[13px] text-zinc-950 mt-1 leading-relaxed">
            See if your household can manage 3 days of extreme heat, stuffy homes, and tropical nights.
          </p>
        </div>
      </div>

      {/* Heatwave Scenario Box */}
      <div className="bg-[#EAF7EE] rounded-2xl border-2 border-[#B7E7C4] p-4 shadow-xs mb-5">
        <div className="flex items-center gap-2 mb-2.5">
          <span className="px-2.5 py-0.5 rounded-full bg-[#188038] text-white text-[10px] font-black uppercase tracking-wider">
            Heatwave scenario
          </span>
          <span className="text-xs font-black text-zinc-950">
            Extreme heat & stifling nights
          </span>
        </div>

        <p className="text-xs sm:text-[13px] text-zinc-950 font-bold leading-relaxed mb-3">
          An extreme heatwave places sustained pressure on your household across three vital areas:
        </p>

        <div className="space-y-2 mb-3">
          <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-[#B7E7C4] text-xs shadow-2xs">
            <Droplets className="w-4 h-4 text-sky-700 shrink-0 mt-0.5" />
            <div>
              <span className="font-black text-zinc-950">Hydration:</span>
              <span className="text-zinc-900 font-semibold ml-1">drinking water reserves, fluid replenishment, and early dehydration checks</span>
            </div>
          </div>

          <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-[#B7E7C4] text-xs shadow-2xs">
            <Wind className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
            <div>
              <span className="font-black text-zinc-950">Cooling environment:</span>
              <span className="text-zinc-900 font-semibold ml-1">blocking solar radiation, managing airflow, and night ventilation</span>
            </div>
          </div>

          <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-[#B7E7C4] text-xs shadow-2xs">
            <Heart className="w-4 h-4 text-rose-700 shrink-0 mt-0.5" />
            <div>
              <span className="font-black text-zinc-950">Health and safety:</span>
              <span className="text-zinc-900 font-semibold ml-1">heat exhaustion response, emergency red lines, and caring for vulnerable people</span>
            </div>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-white border border-[#B7E7C4] text-xs text-zinc-950 leading-relaxed font-bold shadow-2xs">
          Because modern UK homes are built to retain heat, indoor rooms can absorb warmth like storage heaters and remain dangerously hot overnight even after peak daytime heat passes.
        </div>
      </div>

      <div className="mb-4">
        <p className="font-black text-xs text-zinc-950 uppercase tracking-wider mb-1">
          Test your household
        </p>
        <p className="text-xs text-zinc-900 font-semibold">
          How prepared is your home for multi-day extreme heat?
        </p>
      </div>

      {/* Household Size Counter */}
      <div className="bg-white rounded-2xl border-2 border-zinc-200 p-4 shadow-xs mb-4">
        <div className="flex items-center justify-between">
          <div>
            <label className="block text-xs font-black text-zinc-950 uppercase tracking-wider">
              Household size
            </label>
            <p className="text-xs text-zinc-900 font-medium mt-0.5 leading-snug">
              This calculates your critical water needs (minimum {householdProfile.size * 9} litres for 3 days).
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => handleSetSize(householdProfile.size - 1)}
              disabled={householdProfile.size <= 1}
              className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-full border-2 border-zinc-400 bg-white text-zinc-950 flex items-center justify-center hover:border-black hover:bg-zinc-50 disabled:opacity-30 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-black"
              type="button"
              aria-label="Decrease household members by 1"
            >
              <Minus className="w-4 h-4 stroke-[3px]" aria-hidden="true" />
            </button>
            <span className="font-display font-black text-xl text-zinc-950 min-w-5 text-center" aria-live="polite">
              {householdProfile.size}
            </span>
            <button
              onClick={() => handleSetSize(householdProfile.size + 1)}
              disabled={householdProfile.size >= 12}
              className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-full border-2 border-zinc-400 bg-white text-zinc-950 flex items-center justify-center hover:border-black hover:bg-zinc-50 disabled:opacity-30 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-black"
              type="button"
              aria-label="Increase household members by 1"
            >
              <Plus className="w-4 h-4 stroke-[3px]" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      {/* Household Profile Checkboxes */}
      <div className="bg-white rounded-2xl border-2 border-zinc-200 p-4 shadow-xs mb-5">
        <div className="mb-2">
          <label className="block text-xs font-black text-zinc-950 uppercase tracking-wider">
            Household profile
          </label>
          <p className="text-xs text-zinc-950 font-medium mt-0.5 leading-snug">
            Extreme heat affects households differently. Select any circumstances that apply to you to receive tailored guidance:
          </p>
        </div>

        <div className="space-y-2 mt-3">
          {CIRCUMSTANCE_OPTIONS.map((circ) => {
            const isNone = circ === 'None of the above';
            const isSelected = isNone ? isNoneSelected : householdProfile.circumstances.includes(circ);

            return (
              <div
                key={circ}
                role="checkbox"
                aria-checked={isSelected}
                aria-label={circ}
                tabIndex={0}
                onClick={() => handleToggleCircumstance(circ)}
                onKeyDown={(e) => {
                  if (e.key === ' ' || e.key === 'Enter') {
                    e.preventDefault();
                    handleToggleCircumstance(circ);
                  }
                }}
                className={`min-h-[44px] flex items-start gap-3 p-3.5 rounded-xl border-2 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-black ${
                  isSelected
                    ? isNone
                      ? 'bg-zinc-100 border-zinc-900 text-zinc-950 font-bold'
                      : 'bg-red-50/90 border-[#991B1B] text-zinc-950 shadow-xs'
                    : 'bg-white border-zinc-300 hover:border-zinc-500 text-zinc-950 font-medium'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                    isSelected
                      ? isNone
                        ? 'bg-zinc-950 border-zinc-950 text-white'
                        : 'bg-[#991B1B] border-[#991B1B] text-white'
                      : 'border-zinc-500 bg-white'
                  }`}
                  aria-hidden="true"
                >
                  {isSelected && <Check className="w-3.5 h-3.5 stroke-[3px]" />}
                </div>

                <div className="flex-1">
                  <span className="text-xs font-bold leading-tight block text-zinc-950">
                    {circ}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* British Red Cross Guidance Notice */}
      <div className="p-4 bg-red-50 rounded-2xl border-2 border-red-300 text-xs text-zinc-950 mb-6 flex items-start gap-3">
        <div className="w-5 h-5 rounded-full bg-[#991B1B] text-white flex items-center justify-center shrink-0 mt-0.5" aria-hidden="true">
          <Heart className="w-3 h-3 fill-white" />
        </div>
        <p className="text-xs leading-relaxed text-zinc-950 font-semibold">
          <strong className="text-zinc-950 font-black">British Red Cross guidance:</strong> The advice given throughout aligns with British Red Cross emergency preparedness guidelines.
        </p>
      </div>

      {/* Continue to Day 1 Button */}
      <button
        onClick={onStartSimulation}
        className="w-full min-h-[48px] py-4 px-4 bg-[#B91C1C] hover:bg-[#991B1B] text-white font-black text-sm rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer group focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-black"
        type="button"
        aria-label="Begin Day 1: The heat begins to build"
      >
        <span>Begin Day 1: The heat begins to build</span>
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
      </button>
    </div>
  );
};
