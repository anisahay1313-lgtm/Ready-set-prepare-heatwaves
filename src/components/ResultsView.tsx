/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import {
  RotateCcw,
  Heart,
  ExternalLink,
  Copy,
  Check,
  Droplets,
  Wind,
  ShieldCheck,
  ClipboardList,
  Volume2,
  Share2,
  Sprout
} from 'lucide-react';
import { HouseholdProfile, ScoreReport, OutageCategory } from '../types';
import { OFFICIAL_RESOURCES, ONWARD_SHARE_URL, getActiveTrackerItems } from '../data';

interface ResultsViewProps {
  scoreReport: ScoreReport;
  householdProfile: HouseholdProfile;
  checkedItemIds: string[];
  onToggleItem: (id: string) => void;
  onRestart: () => void;
  onOpenShare: () => void;
}

const CATEGORY_ICONS: Record<OutageCategory, React.ComponentType<{ className?: string }>> = {
  hydration: Droplets,
  cooling_environment: Wind,
  health_safety: Heart
};

export const ResultsView: React.FC<ResultsViewProps> = ({
  scoreReport,
  householdProfile,
  checkedItemIds,
  onRestart
}) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [socialToast, setSocialToast] = useState<string | null>(null);

  // Guarantee navigation brings the user to the absolute top of the page
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
  }, []);

  const totalProvisions = getActiveTrackerItems(householdProfile).length;

  const day1Items = getActiveTrackerItems(householdProfile).filter(i => i.day === 1);
  const day2Items = getActiveTrackerItems(householdProfile).filter(i => i.day === 2);
  const day3Items = getActiveTrackerItems(householdProfile).filter(i => i.day === 3);

  const day1ReadyCount = day1Items.filter(i => checkedItemIds.includes(i.id)).length;
  const day2ReadyCount = day2Items.filter(i => checkedItemIds.includes(i.id)).length;
  const day3ReadyCount = day3Items.filter(i => checkedItemIds.includes(i.id)).length;

  const shareText = `I completed Ready, set, prepare: heatwaves by the British Red Cross. Our household is prepared for ${scoreReport.daysLabel} of a 3-day extreme heatwave. Check your household resilience: ${ONWARD_SHARE_URL}`;

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(ONWARD_SHARE_URL).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      });
    }
  };

  const handleSocialClick = (platformName: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareText);
      setSocialToast(`Message copied to clipboard! Paste it into your ${platformName} post.`);
      setTimeout(() => setSocialToast(null), 4000);
    }
  };

  return (
    <div className="flex flex-col pb-28 max-w-md mx-auto px-4 pt-2">
      {/* Top Header Title */}
      <div className="flex items-center justify-between mb-4">
        <span className="font-display font-extrabold text-sm text-zinc-950 tracking-tight flex items-center gap-1.5">
          <ClipboardList className="w-4 h-4 text-[#EE2A24]" />
          Preparedness results
        </span>
        <span className="text-xs font-black uppercase tracking-wider text-zinc-900 bg-white px-2.5 py-1 rounded-lg border border-zinc-200">
          {scoreReport.strengths.length} OF {totalProvisions} READY
        </span>
      </div>

      {/* 1. HOUSEHOLD PREPAREDNESS CAPACITY (HERO CARD WITH RED ACCENT TOP) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-3xl border-2 border-zinc-200 border-t-4 border-t-[#EE2A24] p-5 sm:p-6 shadow-xs mb-5 text-center relative overflow-hidden"
      >
        {/* Trophy Graphic */}
        <div className="flex items-center justify-center mb-2">
          <img
            src="/assets/illustrations/trophy.png"
            alt="Achievement trophy"
            className="w-24 sm:w-28 h-auto object-contain"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/assets/aistudio/image_1ca5e48f.png';
            }}
          />
        </div>

        {/* Circular Capacity Gauge */}
        <div className="my-3 flex flex-col items-center justify-center">
          <div className="relative w-44 h-44 sm:w-48 sm:h-48 flex items-center justify-center">
            {/* SVG Circular Progress Track */}
            <svg className="w-full h-full -rotate-90" viewBox="0 0 160 160">
              <circle
                cx="80"
                cy="80"
                r="64"
                className="stroke-zinc-100"
                strokeWidth="13"
                fill="transparent"
              />
              <motion.circle
                cx="80"
                cy="80"
                r="64"
                stroke="#00703C"
                strokeWidth="13"
                strokeLinecap="round"
                fill="transparent"
                strokeDasharray={402.12}
                initial={{ strokeDashoffset: 402.12 }}
                animate={{
                  strokeDashoffset:
                    402.12 -
                    (402.12 * Math.min(100, Math.max(0, (scoreReport.daysResilience / 3) * 100))) / 100
                }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              />
            </svg>

            {/* Metric Inside Circle */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-2">
              <div className="flex items-baseline justify-center">
                <span className="font-display font-black text-4xl sm:text-5xl text-zinc-950 tracking-tight">
                  {scoreReport.daysResilience}
                </span>
                <span className="text-xl sm:text-2xl font-black text-zinc-950 ml-1">
                  / 3 Days
                </span>
              </div>
              <span className="text-xs sm:text-sm font-bold text-zinc-900 mt-0.5">
                Overall score
              </span>
            </div>
          </div>

          {/* Household Ready Status Underneath Circle */}
          <div className="flex items-center justify-center gap-2 mt-3">
            <Sprout className="w-5 h-5 sm:w-6 sm:h-6 text-[#00703C] stroke-[2.25] shrink-0" />
            <span className="font-display font-black text-xl sm:text-2xl text-zinc-950 tracking-tight leading-tight">
              {scoreReport.daysResilience >= 2.5
                ? 'Household Ready'
                : scoreReport.daysResilience >= 1.0
                ? 'Building Resilience'
                : 'Action Needed'}
            </span>
          </div>

          <div className="mt-1 font-bold text-sm sm:text-base text-zinc-950">
            {scoreReport.strengths.length} of {totalProvisions} provisions ready
          </div>
        </div>

        {/* Diagnostic Status Card (Light Green Card with White Rounded Icon Box) */}
        <div className="mt-4 p-4 sm:p-5 rounded-2xl bg-[#EAF7EE] border-2 border-[#B7E7C4] flex items-center gap-3.5 text-left shadow-2xs">
          <div className="w-12 h-12 rounded-2xl bg-white border border-[#B7E7C4] flex items-center justify-center shrink-0 shadow-2xs">
            <ShieldCheck className="w-6 h-6 text-[#00703C]" />
          </div>
          <div>
            <h4 className="font-display font-black text-sm sm:text-base text-zinc-950 leading-tight">
              {scoreReport.diagnostic.title}
            </h4>
            <p className="text-xs sm:text-[13px] text-zinc-950 font-semibold leading-snug mt-1">
              {scoreReport.diagnostic.description}
            </p>
          </div>
        </div>

        {/* Copy for Household and Critical Water Need */}
        <div className="mt-4 pt-3.5 border-t border-zinc-200 flex items-center justify-center gap-2 text-xs sm:text-sm text-zinc-950 font-bold">
          <span>Household: <strong className="font-black text-black">{householdProfile.size} {householdProfile.size === 1 ? 'person' : 'people'}</strong></span>
          <span className="text-zinc-950 font-black">•</span>
          <span>Critical water need: <strong className="font-black text-black">{householdProfile.size * 6} litres</strong></span>
        </div>
      </motion.div>

      {/* 2. PREPAREDNESS BY CATEGORY */}
      <div className="bg-white rounded-3xl border border-zinc-200 p-5 shadow-2xs mb-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-md bg-[#FEF3C7] text-[#78350F] font-black text-[10px] uppercase tracking-wider">
              BREAKDOWN
            </span>
            <h3 className="font-display font-black text-xs text-zinc-950">
              Preparedness by category
            </h3>
          </div>
          <span className="text-xs font-bold text-zinc-950">
            {scoreReport.strengths.length} of {totalProvisions}
          </span>
        </div>

        <div className="space-y-4">
          {scoreReport.categories.map((cat) => {
            const Icon = CATEGORY_ICONS[cat.category] || Heart;
            const isComplete = cat.percentage === 100;

            return (
              <div key={cat.category} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-zinc-950 flex items-center gap-1.5">
                    <Icon className="w-3.5 h-3.5 text-zinc-900" />
                    <span>{cat.label}</span>
                  </span>
                  <span className="font-bold text-zinc-950">
                    {cat.checked}/{cat.total}{' '}
                    <span className={`text-xs ${isComplete ? 'text-[#00703C] font-black' : 'text-zinc-950 font-bold'}`}>
                      ({cat.percentage}%)
                    </span>
                  </span>
                </div>

                <div 
                  className="h-2.5 w-full bg-zinc-200 rounded-full overflow-hidden"
                  role="progressbar"
                  aria-label={`${cat.label} progress`}
                  aria-valuenow={cat.percentage}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${cat.percentage}%` }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className={`h-full rounded-full ${
                      isComplete
                        ? 'bg-[#00703C]'
                        : 'bg-[#B45309]'
                    }`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. SIGNPOSTED RESOURCES - BRITISH RED CROSS SUPPORT */}
      <div className="bg-white rounded-3xl border border-red-200 p-5 shadow-2xs mb-5">
        <div className="mb-3.5">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[#991B1B] font-black text-base leading-none" aria-hidden="true">✚</span>
            <h3 className="font-display font-black text-xs text-zinc-950">
              British Red Cross support
            </h3>
          </div>

          <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-0.5 rounded-md bg-red-50 text-[#991B1B] font-bold text-[10px] border border-red-200">
              Official guidance
            </span>
          </div>

          <p className="text-xs text-zinc-900 font-medium leading-snug">
            Free guides, priority network assistance, and national extreme heat helplines:
          </p>
        </div>

        {/* 5 Signposted Resource Cards */}
        <div className="space-y-2.5">
          {OFFICIAL_RESOURCES.map((res, i) => (
            <a
              key={i}
              href={res.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-3.5 rounded-2xl border border-red-200 bg-white hover:bg-red-50/50 hover:border-[#991B1B] focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 transition-all group cursor-pointer shadow-2xs"
              aria-label={`${res.title} (opens in a new tab)`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <span className="block text-[10px] font-black text-[#991B1B] uppercase tracking-wider mb-0.5">
                    {res.tag}
                  </span>
                  <h4 className="text-xs font-black text-zinc-950 group-hover:text-[#991B1B] group-hover:underline underline-offset-2 transition-colors leading-tight flex items-center gap-1">
                    <span>{res.title}</span>
                  </h4>
                  <p className="text-[11px] text-zinc-900 font-normal mt-1 leading-snug">
                    {res.description}
                  </p>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-[#991B1B] shrink-0 mt-0.5 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* 4. SPREAD THE WORD */}
      <div className="bg-[#FEF6E0] rounded-3xl border-2 border-[#FDE68A] p-5 shadow-2xs mb-5">
        <div className="flex items-center gap-2.5 mb-2.5 flex-wrap">
          <div className="bg-white border-2 border-[#FCE89A] px-2.5 py-1 rounded-xl flex items-center gap-1.5 shadow-2xs">
            <Share2 className="w-3.5 h-3.5 text-[#92400E]" aria-hidden="true" />
            <span className="text-[11px] font-black text-[#92400E] tracking-wider uppercase">
              SPREAD THE WORD
            </span>
          </div>
          <span className="text-xs font-black text-black tracking-wider uppercase">
            HELP OTHERS GET PREPARED
          </span>
        </div>

        <h4 className="font-display font-black text-base sm:text-lg text-zinc-950 leading-snug mb-1">
          Small actions. Stronger communities.
        </h4>
        <p className="text-xs sm:text-[13px] text-zinc-900 font-normal mb-4 leading-relaxed">
          Share your results and encourage friends, family and neighbours to test their preparedness too.
        </p>

        {/* Social Share Icons */}
        <div className="grid grid-cols-5 gap-2 mb-4">
          {/* WhatsApp */}
          <a
            href={`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => handleSocialClick('WhatsApp')}
            className="flex flex-col items-center group cursor-pointer focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-zinc-950 rounded-2xl"
            aria-label="Share your results on WhatsApp"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#25D366] hover:bg-[#20ba5a] flex items-center justify-center transition-transform group-hover:scale-105 shadow-2xs">
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.742.949 3.71 1.449 5.711 1.45h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 00-3.48-8.413z" />
              </svg>
            </div>
            <span className="text-[11px] font-bold text-zinc-950 mt-1.5">WhatsApp</span>
          </a>

          {/* Facebook */}
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(ONWARD_SHARE_URL)}&quote=${encodeURIComponent(shareText)}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => handleSocialClick('Facebook')}
            className="flex flex-col items-center group cursor-pointer focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-zinc-950 rounded-2xl"
            aria-label="Share your results on Facebook"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#1877F2] hover:bg-[#166fe5] flex items-center justify-center transition-transform group-hover:scale-105 shadow-2xs">
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white" aria-hidden="true">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </div>
            <span className="text-[11px] font-bold text-zinc-950 mt-1.5">Facebook</span>
          </a>

          {/* X */}
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
              `Our household has prepared for ${scoreReport.daysLabel} of a 3-day heatwave on the @BritishRedCross Resilience Tracker! Check your home: ${ONWARD_SHARE_URL}`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => handleSocialClick('X')}
            className="flex flex-col items-center group cursor-pointer focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-zinc-950 rounded-2xl"
            aria-label="Share your results on X (formerly Twitter)"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#000000] hover:bg-zinc-800 flex items-center justify-center transition-transform group-hover:scale-105 shadow-2xs">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </div>
            <span className="text-[11px] font-bold text-zinc-950 mt-1.5">X</span>
          </a>

          {/* LinkedIn */}
          <a
            href={`https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(shareText)}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => handleSocialClick('LinkedIn')}
            className="flex flex-col items-center group cursor-pointer focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-zinc-950 rounded-2xl"
            aria-label="Share your results on LinkedIn"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#0A66C2] hover:bg-[#0855a3] flex items-center justify-center transition-transform group-hover:scale-105 shadow-2xs">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white" aria-hidden="true">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </div>
            <span className="text-[11px] font-bold text-zinc-950 mt-1.5">LinkedIn</span>
          </a>

          {/* Email */}
          <a
            href={`mailto:?subject=${encodeURIComponent('Check your household preparedness for heatwaves')}&body=${encodeURIComponent(
              `Hi,\n\nI just tested our household on the British Red Cross Heatwave Resilience Tracker and we are prepared for ${scoreReport.daysLabel} of a 3-day extreme heatwave.\n\nIt takes 2 minutes and helps you prepare your home for hot summer days without high costs:\n${ONWARD_SHARE_URL}\n\nStay safe!`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => handleSocialClick('Email')}
            className="flex flex-col items-center group cursor-pointer focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-zinc-950 rounded-2xl"
            aria-label="Share your results via Email"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#4B5563] hover:bg-[#374151] flex items-center justify-center transition-transform group-hover:scale-105 shadow-2xs">
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-white stroke-2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </div>
            <span className="text-[11px] font-bold text-zinc-950 mt-1.5">Email</span>
          </a>
        </div>

        {socialToast && (
          <div className="mb-3 p-2.5 bg-white border border-[#FDE68A] rounded-xl text-xs font-bold text-[#78350F] flex items-center justify-center gap-1.5 shadow-2xs" role="status" aria-live="polite">
            <Check className="w-3.5 h-3.5 text-[#00703C] stroke-[3px]" aria-hidden="true" />
            <span>{socialToast}</span>
          </div>
        )}

        {/* Copy Tracker Link Button */}
        <button
          onClick={handleCopyLink}
          className="w-full min-h-[48px] py-3.5 px-4 bg-[#FFB81C] hover:bg-[#F0A910] text-black font-black text-xs sm:text-sm rounded-xl transition-all shadow-2xs flex items-center justify-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-zinc-950 focus-visible:ring-offset-2"
          type="button"
          aria-label="Copy tracker website link to clipboard"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-black stroke-[3px]" aria-hidden="true" />
              <span>Link copied to clipboard</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 text-black stroke-[2.25]" aria-hidden="true" />
              <span>Copy tracker link</span>
            </>
          )}
        </button>
      </div>

      {/* 5. USER TESTING SURVEY */}
      <div className="bg-[#FFF5F5] rounded-3xl border border-[#FCA5A5] p-5 shadow-2xs mb-5">
        <div className="flex items-center gap-1.5 mb-1 text-[#991B1B]">
          <Heart className="w-3.5 h-3.5 fill-[#991B1B]" aria-hidden="true" />
          <h3 className="font-bold text-xs">
            Help improve community preparedness
          </h3>
        </div>
        <p className="text-xs text-zinc-900 font-medium mb-4 leading-relaxed">
          Your feedback directly helps the British Red Cross refine practical, reassuring resilience tools for households across the UK.
        </p>

        <a
          href="https://forms.cloud.microsoft/e/M2BG66Kzr6"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full min-h-[48px] py-3.5 px-4 bg-[#B91C1C] hover:bg-[#991B1B] text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-2xs flex items-center justify-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-zinc-950 focus-visible:ring-offset-2"
          aria-label="Complete British Red Cross user testing survey (opens in a new tab)"
        >
          <span>Complete user testing survey</span>
          <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
        </a>
      </div>

      {/* 6. RESET BUTTON */}
      <div className="mt-2 mb-6">
        <button
          onClick={onRestart}
          className="w-full min-h-[48px] py-3.5 px-4 bg-white hover:bg-zinc-100 border-2 border-zinc-400 text-zinc-950 font-bold text-xs sm:text-sm rounded-xl transition-all shadow-2xs flex items-center justify-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-zinc-950 focus-visible:ring-offset-2"
          type="button"
          aria-label="Reset heatwave assessment and start over"
        >
          <RotateCcw className="w-4 h-4 text-zinc-950" aria-hidden="true" />
          <span>Reset assessment</span>
        </button>
      </div>
    </div>
  );
};
