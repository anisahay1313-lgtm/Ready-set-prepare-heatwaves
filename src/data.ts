/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  TrackerItem,
  HouseholdProfile,
  ScoreReport,
  CategoryScore,
  DiagnosticResult,
  TailoredAlert,
  OutageCategory
} from './types';

export const CIRCUMSTANCE_OPTIONS = [
  'I live alone',
  'I am over 65',
  'I have limited mobility',
  'I have health conditions affected by extreme heat',
  'I rely on medication requiring temperature control',
  'I care for someone vulnerable or with chronic illness',
  'None of the above'
];

export const CATEGORY_METADATA: Record<OutageCategory, { label: string; icon: string }> = {
  hydration: { label: 'Hydration', icon: 'Droplets' },
  cooling_environment: { label: 'Cooling environment', icon: 'Wind' },
  health_safety: { label: 'Health and safety', icon: 'Heart' }
};

export const TRACKER_ITEMS: TrackerItem[] = [
  // ================= DAY 1: THE HEAT BEGINS TO BUILD =================
  // 1. Hydration
  {
    id: 'adequate_stored_water',
    day: 1,
    category: 'hydration',
    categoryLabel: 'Hydration',
    title: 'Adequate stored water',
    description: 'Secure at least 2 to 3 litres of drinking water per person, per day, stored in a cool place.',
    whyItMatters: 'During extreme heat, your body loses significantly more fluid. Having a stored supply ensures hydration if high-demand water pressure drops, or if you are too unwell to fetch water. Avoid sugary, caffeinated, or alcoholic drinks as they accelerate dehydration.',
    guidance: 'British Red Cross emergency preparedness guidance advises storing clean drinking water in sealed containers in a cool, dark cupboard away from direct sunlight. Sip water regularly throughout the day and avoid alcohol, excess caffeine, or very sugary drinks that worsen fluid loss.',
    points: 8,
    cost: 'Low cost (£)',
    quickWin: true,
    priorityHouseholdNeed: true
  },
  {
    id: 'hydration_checking_routine',
    day: 1,
    category: 'hydration',
    categoryLabel: 'Hydration',
    title: 'Regular hydration checks',
    description: 'Monitor hydration signs: dark pee, dry mouth, headaches, or feeling tired/lightheaded.',
    whyItMatters: 'Drink water continuously throughout the day rather than waiting until you feel thirsty. Keep an eye on children and older household members, as their thirst signal is much weaker.',
    guidance: 'British Red Cross recommends checking hydration signs across your household several times a day. Pale straw-coloured urine shows healthy hydration, whereas dark urine, dry mouth, dizziness, or tiredness require immediate rest in a cool room with regular sips of water.',
    points: 7,
    cost: 'Free',
    quickWin: true
  },
  // 2. Cooling environment
  {
    id: 'sun_facing_blinds',
    day: 1,
    category: 'cooling_environment',
    categoryLabel: 'Cooling environment',
    title: 'Sun-facing blinds & curtains',
    description: 'Keep curtains, blinds, and shutters fully closed on windows facing the sun during peak hours.',
    whyItMatters: 'Preventing heat from entering is far easier than cooling down a hot room. Close south and west-facing curtains to block direct solar radiation and reduce heat buildup.',
    guidance: 'British Red Cross advises drawing curtains, blinds, or shutters across sun-facing windows before temperatures climb each morning. Focus especially on south- and west-facing glass to designate at least one shaded, cooler refuge room in your home.',
    points: 8,
    cost: 'Free',
    quickWin: true
  },
  {
    id: 'loose_light_apparel',
    day: 1,
    category: 'cooling_environment',
    categoryLabel: 'Cooling environment',
    title: 'Loose, light apparel',
    description: 'Wear loose-fitting, light-coloured clothing made of natural fabrics like cotton or linen.',
    whyItMatters: 'Tight or synthetic clothing traps warm air and moisture next to the skin, slowing sweat evaporation and making your body work harder to keep cool.',
    guidance: 'British Red Cross advises choosing loose, breathable, light-coloured cotton or linen garments indoors and outdoors so air circulates freely over your skin. When going outside, add a wide-brimmed hat and UV sunglasses.',
    points: 7,
    cost: 'Free',
    quickWin: true
  },
  // 3. Health and safety
  {
    id: 'heat_exhaustion_protocol',
    day: 1,
    category: 'health_safety',
    categoryLabel: 'Health and safety',
    title: 'Knowledge of how to spot and treat heat exhaustion',
    description: 'Recognise symptoms (headaches, heavy sweating, dizziness, cramps) and how to cool someone down.',
    whyItMatters: 'If someone shows heat exhaustion, immediately move them to a cool place, have them lie down with feet raised, give plenty of water, and cool their skin with wet sponges or cold packs in armpits/neck.',
    guidance: 'British Red Cross first aid guidance states: move the person to a cool place, help them lie down with legs slightly raised, give plenty of water or oral rehydration drink, and cool their skin using cool wet sponges, misting, or wrapped cold packs around the neck and armpits. They should begin to feel better within 30 minutes.',
    points: 8,
    cost: 'Free',
    quickWin: true,
    priorityHouseholdNeed: true
  },
  {
    id: 'avoid_peak_heat_activity',
    day: 1,
    category: 'health_safety',
    categoryLabel: 'Health and safety',
    title: 'Avoid peak-heat activity',
    description: 'Schedule essential tasks, walks, or physical exertion for early morning or late evening.',
    whyItMatters: 'The sun is at its most intense between 11 AM and 3 PM. Avoid strenuous activity or exercise during these hours. If you must go outside, seek shade, wear a hat, and apply sunscreen.',
    guidance: 'British Red Cross advises staying out of the sun during peak heat between 11 AM and 3 PM. Reschedule shopping, dog walking, exercise, and outdoor chores for early morning or late evening, stay in the shade, apply sunscreen, and carry water.',
    points: 7,
    cost: 'Free',
    quickWin: true
  },

  // ================= DAY 2: SYSTEMS BEGIN TO STRAIN =================
  // 1. Cooling environment
  {
    id: 'strategic_window_management',
    day: 2,
    category: 'cooling_environment',
    categoryLabel: 'Cooling environment',
    title: 'Strategic window management',
    description: 'Keep windows closed when it is hotter outside, and open them at night to create cross-breezes.',
    whyItMatters: 'Opening windows during a heatwave lets hot air continuously enter your home. Only open windows when the outdoor air is cooler than your indoor air, typically late evening and early morning.',
    guidance: 'British Red Cross advises keeping windows and blinds shut whenever outdoor air is hotter than indoor rooms. Once night-time or early-morning outdoor temperatures drop below indoor levels, open secure windows on opposite sides of your home to flush out trapped heat.',
    points: 8,
    cost: 'Free',
    quickWin: true
  },
  {
    id: 'fan_and_ice_convection',
    day: 2,
    category: 'cooling_environment',
    categoryLabel: 'Cooling environment',
    title: 'Place ice or a damp towel in front of a fan',
    description: 'Position a large bowl of ice or a damp cold towel in front of a fan to circulate cool air.',
    whyItMatters: 'Fans do not cool the air; they only move it around. Placing a bowl of ice or ice packs directly in front of the fan creates a chilled, evaporating breeze that lowers room temperatures.',
    guidance: 'British Red Cross recommends placing a shallow bowl of ice cubes or frozen water bottles safely in front of an electric fan to cool the airflow in rooms below 35°C, ensuring water containers stay completely clear of plugs, trailing leads, and electrical sockets.',
    points: 8,
    cost: 'Low cost (£)',
    quickWin: true
  },
  {
    id: 'pre_bed_lukewarm_showers',
    day: 2,
    category: 'cooling_environment',
    categoryLabel: 'Cooling environment',
    title: 'Ways to cool down before bed',
    description: 'Take lukewarm (not freezing) showers and use light, breathable cotton bedding at night.',
    whyItMatters: 'Freezing-cold showers cause your blood vessels to constrict, trapping core heat and actually making you feel hotter. Lukewarm showers safely lower your core temperature for better sleep.',
    guidance: 'British Red Cross advises cooling down before bedtime with a lukewarm or cool shower, bath, or damp cloth over wrists, feet, and neck. Replace thick duvets with a single light cotton sheet and sleep in the coolest room in your home.',
    points: 7,
    cost: 'Free',
    quickWin: true
  },
  // 2. Hydration
  {
    id: 'rehydration_supplements',
    day: 2,
    category: 'hydration',
    categoryLabel: 'Hydration',
    title: 'Rehydration supplements',
    description: 'Keep hydration salts or electrolyte powder ready to restore essential mineral balances.',
    whyItMatters: 'Sweating rapidly depletes mineral salts alongside water. If someone is sweating heavily, rehydration salts help replenish those electrolytes, preventing muscle cramps and severe fatigue.',
    guidance: 'British Red Cross first aid guidance recommends keeping oral rehydration sachets in your household first aid kit to replace lost body salts and fluids during prolonged sweating or heat exhaustion. Always mix strictly with safe drinking water according to packet directions.',
    points: 8,
    cost: 'Low cost (£)',
    quickWin: true,
    priorityHouseholdNeed: true
  },

  // ================= DAY 3+: EXTREME HEAT PEAKS ACROSS THE UK =================
  // Health and safety
  {
    id: 'heatstroke_red_lines',
    day: 3,
    category: 'health_safety',
    categoryLabel: 'Health and safety',
    title: 'Knowledge of heatstroke emergency signs (999)',
    description: 'Identify heatstroke as an emergency (confusion, high temperature, fit, loss of consciousness).',
    whyItMatters: 'Heatstroke is a medical emergency. If a person is confused, has a temperature, is not responding, or remains hot but stops sweating, call 999 immediately. Keep them cool while waiting for the ambulance.',
    guidance: 'British Red Cross first aid guidance states: call 999 immediately if someone shows signs of heatstroke—confusion, slurred speech, hot dry or red skin, seizures (fits), loss of responsiveness, or no improvement after 30 minutes of cooling. Cool them rapidly using water, damp towels, or wrapped ice packs while waiting for paramedics.',
    points: 9,
    cost: 'Free',
    quickWin: true,
    priorityHouseholdNeed: true
  },
  {
    id: 'thermosensitive_medication',
    day: 3,
    category: 'health_safety',
    categoryLabel: 'Health and safety',
    title: 'Thermosensitive medication care',
    description: 'Keep medication stored below 25°C or in a refrigerator, keeping it out of direct sunlight.',
    whyItMatters: 'Many common medicines (including inhalers, insulin, and blood pressure pills) lose their potency or degrade when exposed to heat above 25°C. Check labels and consult a pharmacist.',
    guidance: 'British Red Cross advises checking storage limits on all regular medicines during extreme heat. Move room-temperature medicines out of hot bedrooms, kitchens, or sunny windowsills into a cool, dark cupboard below 25°C, store fridge-only medicines properly, and ask a local pharmacist for advice if rooms overheat.',
    points: 8,
    cost: 'Free',
    quickWin: true,
    priorityHouseholdNeed: true
  },
  {
    id: 'daily_neighbour_checks',
    day: 3,
    category: 'health_safety',
    categoryLabel: 'Health and safety',
    title: 'Daily vulnerable neighbour checks',
    description: 'Have a plan to check on isolated, elderly, or unwell friends and neighbours at least once a day.',
    whyItMatters: 'Older people (especially over 75), infants, and those with chronic health conditions struggle to regulate body temperature. A quick daily call can identify early dehydration or heat exhaustion before it becomes critical.',
    guidance: 'British Red Cross encourages daily phone or doorstep check-ins with older relatives, neighbours living alone, and anyone with chronic illness or limited mobility—and arranging a mutual daily check-in for yourself if you live alone.',
    points: 8,
    cost: 'Free',
    quickWin: true
  }
];

export function getActiveTrackerItems(_profile?: HouseholdProfile): TrackerItem[] {
  return TRACKER_ITEMS;
}

export const DAY_NARRATIVES = {
  1: {
    badge: 'DAY 1',
    forecast: '32°C Forecast',
    title: 'The heat begins to build',
    story: 'The Met Office issues an Amber Extreme Heat Warning for your area. Temperatures climb to 32°C. Modern UK homes, built to retain heat, begin absorbing warmth like storage heaters. Indoors, the air feels stuffy, and you start looking for immediate ways to stay cool. Your decisions today determine how much heat gets trapped in your walls for the coming days.',
    instruction: 'If this was your household, what would you do or have in place?'
  },
  2: {
    badge: 'DAY 2',
    forecast: '35°C Forecast',
    title: 'Systems begin to strain',
    story: 'A sweltering, stifling night offers no relief, with overnight temperatures staying above 20°C. Now on day two, the mercury hits 35°C. The brick walls of your home are fully saturated with heat, radiating warm air indoors. Sleep is disrupted, and dehydration and physical fatigue are setting in. Tiredness lowers your ability to cope, making medication safety and body temperature regulation critical concerns.',
    instruction: 'If this was your household, what would you do or have in place?'
  },
  3: {
    badge: 'DAY 3+',
    forecast: '38°C Forecast',
    title: 'Extreme heat peaks across the UK',
    story: 'The heatwave reaches its peak at an unprecedented 38°C. Dehydration levels are critical, and local NHS services are reporting a surge in 999 calls. Any pre-existing health conditions in your household are highly stressed. Heat exhaustion can transition to life-threatening heatstroke rapidly, making recognizing early symptoms a matter of life and death.',
    instruction: 'If this was your household, what would you do or have in place?'
  }
};

export function calculateScore(checkedIds: string[], profile?: HouseholdProfile): ScoreReport {
  const activeItems = getActiveTrackerItems(profile);
  const strengths = activeItems.filter(item => checkedIds.includes(item.id));
  const gaps = activeItems.filter(item => !checkedIds.includes(item.id));

  const totalPoints = strengths.reduce((sum, item) => sum + item.points, 0);
  const maxPoints = activeItems.reduce((sum, item) => sum + item.points, 0);
  const score = maxPoints > 0 ? Math.min(100, Math.round((totalPoints / maxPoints) * 100)) : 0;

  // Estimated Coping Capacity in Days (0 to 3.0 Days)
  let daysResilience = 0;
  let daysLabel = '0 Days';
  let daysSummary = 'No measures selected yet. Tick what you would do or have in place to estimate resilience.';

  if (checkedIds.length === 0) {
    daysResilience = 0;
    daysLabel = '0 Days';
    daysSummary = 'No measures selected yet. Tick what you would do or have in place to estimate resilience.';
  } else if (checkedIds.length === activeItems.length) {
    daysResilience = 3.0;
    daysLabel = '3+ Days';
    daysSummary = 'Full 3-day coping capacity achieved across hydration, cooling, and heat safety.';
  } else if (score >= 80) {
    daysResilience = Math.round((2.0 + ((score - 80) / 20) * 0.9) * 10) / 10;
    daysLabel = `${daysResilience} Days`;
    daysSummary = 'Strong multi-day heat resilience; minor gaps during peak daytime temperatures.';
  } else if (score >= 40) {
    daysResilience = Math.round((1.0 + ((score - 40) / 40) * 0.9) * 10) / 10;
    daysLabel = `${daysResilience} Days`;
    daysSummary = 'Copes with initial warmth; will face severe strain as heat accumulates in walls by Day 2.';
  } else {
    daysResilience = Math.max(0.5, Math.round(((score / 40) * 0.9) * 10) / 10);
    daysLabel = `${daysResilience} Day`;
    daysSummary = 'Initial emergency buffer only; critical gaps in hydration, room cooling, or medication care.';
  }

  // Category breakdown
  const categoryKeys: OutageCategory[] = [
    'hydration',
    'cooling_environment',
    'health_safety'
  ];

  const categories: CategoryScore[] = categoryKeys.map(cat => {
    const items = activeItems.filter(i => i.category === cat);
    const checked = items.filter(i => checkedIds.includes(i.id)).length;
    const total = items.length;
    return {
      category: cat,
      label: CATEGORY_METADATA[cat].label,
      checked,
      total,
      percentage: total > 0 ? Math.round((checked / total) * 100) : 0
    };
  });

  // Diagnostic Messaging (Sentence Case)
  let diagnostic: DiagnosticResult;
  if (checkedIds.length >= 10) {
    diagnostic = {
      title: 'Strong household heat resilience',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      description: 'Your household is well prepared with robust provisions across hydration, indoor cooling, and health safeguards to cope safely through multi-day extreme heat.',
      level: 'strong'
    };
  } else if (checkedIds.length >= 5) {
    diagnostic = {
      title: 'Moderate preparedness — clear opportunities',
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
      description: 'You have good foundational cooling and hydration habits in place, but sustained high temperatures will test your household. A few targeted actions will keep your living spaces comfortable.',
      level: 'moderate'
    };
  } else {
    diagnostic = {
      title: 'Significant preparedness gaps',
      badgeColor: 'bg-red-100 text-[#EE2A24] border-red-300',
      description: 'Your household currently lacks vital buffers for sustained extreme heat and sweltering nights. Starting with simple, low-effort actions will rapidly secure your home.',
      level: 'action_needed'
    };
  }

  // Tailored alerts based on household profile
  const tailoredAlerts: TailoredAlert[] = [];
  if (profile) {
    const circs = profile.circumstances || [];

    if (circs.some(c => c.toLowerCase().includes('medication'))) {
      tailoredAlerts.push({
        type: 'Medication safety',
        message: 'Medicines like insulin, inhalers, and liquid antibiotics can lose effectiveness above 25°C.',
        actionText: 'Keep room-temperature medicines in a cool, shaded cupboard and store fridge-only supplies safely.',
        actionId: 'thermosensitive_medication'
      });
    }

    if (circs.some(c => c.toLowerCase().includes('care for someone'))) {
      tailoredAlerts.push({
        type: 'Carer support',
        message: 'Ensure proactive hydration schedules and regular cooling checks for anyone you look after.',
        actionText: 'Set a timer to offer water and check for heat exhaustion symptoms every few hours.',
        actionId: 'heat_exhaustion_protocol'
      });
    }

    if (circs.some(c => c.toLowerCase().includes('live alone') || c.toLowerCase().includes('over 65'))) {
      tailoredAlerts.push({
        type: 'Neighbour & community connection',
        message: 'Living alone during extreme heat increases vulnerability if you start feeling faint or confused.',
        actionText: 'Arrange a morning and evening phone check-in with a trusted friend, relative, or neighbour.',
        actionId: 'daily_neighbour_checks'
      });
    }

    if (circs.some(c => c.toLowerCase().includes('health conditions'))) {
      tailoredAlerts.push({
        type: 'Health condition monitoring',
        message: 'Cardiovascular and respiratory conditions are placed under heavy strain as core body temperature rises.',
        actionText: 'Stay in the coolest room, avoid midday activity, and consult NHS 111 if symptoms worsen.',
        actionId: 'avoid_peak_heat_activity'
      });
    }
  }

  let highestImpactGap: TrackerItem | undefined;
  const storedWater = gaps.find(i => i.id === 'adequate_stored_water');
  if (storedWater) {
    highestImpactGap = storedWater;
  } else {
    highestImpactGap = gaps.find(i => i.points >= 8) || gaps[0];
  }

  return {
    score,
    totalPoints,
    maxPoints,
    daysResilience,
    daysLabel,
    daysSummary,
    diagnostic,
    categories,
    strengths,
    gaps,
    highestImpactGap,
    tailoredAlerts
  };
}

export const OFFICIAL_RESOURCES = [
  {
    tag: 'British Red Cross guide',
    title: 'How to stay safe in a heatwave',
    description: 'Official British Red Cross UK guidance on keeping yourself, your home, and vulnerable loved ones cool.',
    url: 'https://www.redcross.org.uk/get-help/prepare-for-emergencies/heatwaves-uk'
  },
  {
    tag: 'British Red Cross first aid',
    title: 'First aid for heat exhaustion and heatstroke',
    description: 'Practical British Red Cross first aid instructions to spot early warning signs, cool someone down safely, and when to seek urgent emergency care.',
    url: 'https://www.redcross.org.uk/first-aid/learn-first-aid/heat-exhaustion'
  },
  {
    tag: 'British Red Cross checklist',
    title: 'Prepare your household for emergencies',
    description: 'Step-by-step British Red Cross household preparedness guidance on water storage, emergency kits, and keeping your household secure.',
    url: 'https://www.redcross.org.uk/get-help/prepare-for-emergencies'
  },
  {
    tag: 'Free utility support',
    title: 'Free Priority Services Register (PSR)',
    description: 'Free priority support from UK water and energy suppliers for older adults, families with young children, and households with medical conditions.',
    url: 'https://www.thepsr.co.uk/'
  },
  {
    tag: 'Medical & emergency advice',
    title: 'NHS 111 & emergency 999 guidance',
    description: 'Contact NHS 111 for urgent health advice on dehydration or heat exhaustion, or dial 999 immediately if someone displays life-threatening heatstroke symptoms.',
    url: 'https://111.nhs.uk/'
  }
];

export const ONWARD_SHARE_URL = 'https://heatwave-resilience-tracker.ai.studio';
