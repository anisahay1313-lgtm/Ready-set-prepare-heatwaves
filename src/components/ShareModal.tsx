/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, Copy, Check, Share2, MessageCircle, Send, Mail } from 'lucide-react';
import { ONWARD_SHARE_URL } from '../data';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  daysLabel: string;
}

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, daysLabel }) => {
  const [copied, setCopied] = useState<boolean>(false);

  if (!isOpen) return null;

  const shareText = `I completed Ready, set, prepare: heatwaves by the British Red Cross with a coping capacity of ${daysLabel} of a 3-day heatwave. Test how ready your home is for extreme heat and tropical nights: ${ONWARD_SHARE_URL}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(ONWARD_SHARE_URL).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border-2 border-zinc-200 relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-900 hover:text-black p-1 rounded-full cursor-pointer"
          type="button"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-12 h-12 rounded-2xl bg-red-50 text-[#EE2A24] flex items-center justify-center mb-3 border border-red-200">
          <Share2 className="w-6 h-6" />
        </div>

        <h3 className="font-display font-black text-xl text-zinc-950 leading-tight mb-1">
          Share resilience tracker
        </h3>
        <p className="text-xs text-zinc-900 font-semibold leading-relaxed mb-4">
          Encourage friends, family, and neighbours to test their household resilience against prolonged extreme heat and sweltering nights.
        </p>

        {/* Link Copy Box */}
        <div className="p-3 bg-zinc-50 border-2 border-zinc-200 rounded-xl mb-4 flex items-center justify-between gap-2">
          <span className="text-xs font-mono font-bold text-zinc-900 truncate flex-1">
            {ONWARD_SHARE_URL}
          </span>
          <button
            onClick={handleCopy}
            className="px-3 py-1.5 bg-zinc-900 hover:bg-black text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shrink-0 transition-colors cursor-pointer"
            type="button"
          >
            {copied ? <Check className="w-3.5 h-3.5 stroke-[3px]" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>

        {/* Share Buttons */}
        <div className="space-y-2.5">
          <a
            href={`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 px-4 bg-[#25D366] hover:bg-[#20bd5a] text-white font-black text-xs rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer text-center"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Share on WhatsApp</span>
          </a>

          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(ONWARD_SHARE_URL)}&quote=${encodeURIComponent(shareText)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 px-4 bg-[#1877F2] hover:bg-[#1565cc] text-white font-black text-xs rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer text-center"
          >
            <span>Share on Facebook</span>
          </a>

          <a
            href={`https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(shareText)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 px-4 bg-[#0A66C2] hover:bg-[#084e96] text-white font-black text-xs rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer text-center"
          >
            <span>Share on LinkedIn</span>
          </a>

          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
              `Our household has prepared for ${daysLabel} of a 3-day heatwave on the @BritishRedCross Resilience Tracker! Check your home: ${ONWARD_SHARE_URL}`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 px-4 bg-zinc-950 hover:bg-black text-white font-black text-xs rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer text-center"
          >
            <Send className="w-4 h-4" />
            <span>Share on X</span>
          </a>

          <a
            href={`mailto:?subject=${encodeURIComponent('Check your household preparedness for heatwaves')}&body=${encodeURIComponent(
              `Hi,\n\nI just tested our household on the British Red Cross Heatwave Resilience Tracker and we are prepared for ${daysLabel} of a 3-day extreme heatwave.\n\nIt takes 2 minutes and helps you prepare your home for hot summer days without high costs:\n${ONWARD_SHARE_URL}\n\nStay safe!`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 px-4 bg-white hover:bg-zinc-50 border-2 border-zinc-300 text-zinc-950 font-black text-xs rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer text-center"
          >
            <Mail className="w-4 h-4" />
            <span>Share via email</span>
          </a>
        </div>
      </motion.div>
    </div>
  );
};
