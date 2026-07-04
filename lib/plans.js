// Shared plan definitions — single source of truth for subscription & payment pages

export const PLANS = [
  {
    id: 'free',
    tier: 0,
    name: 'FREE',
    tagline: 'Discover RK AI.',
    price: '₹0',
    period: '/mo',
    storageLabel: '50 MB',
    color: '#64748b',
    glowColor: '#64748b',
    accentColor: '#94a3b8',
    badge: null,
    quote: '"Your journey into the future starts here."',
    storage: '50 MB',
    slots: null,
    discount: null,
    type: 'active',

    desktopFeatures: [
      'Unlimited Local AI Chat',
      'Offline Voice Assistant',
      'Offline Speech-to-Text & Text-to-Speech',
      'Unlimited Ollama Models',
      'Local Coding Assistant',
      'Music Playback & Controls',
      'Basic Helping Tools',
      'Wake Word Support',
      'Basic File Search',
      'Privacy First (No Cloud Required)'
    ],

    homeFeatures: [
      'Voice Assistant',
      'Music Playback',
      'Basic Smart Home Controls',
      'Wake Word',
      'Local Device Automation',
      'Works Completely Offline'
    ],

    sharedFeatures: [
      '50 MB Cloud Storage',
      'Community Support'
    ]
  },
  {
    id: 'pro',
    tier: 1,
    name: 'PRO',
    tagline: 'Your Everyday AI.',
    price: '₹599',
    period: '/mo',
    storageLabel: '500 MB',
    color: '#10b981',
    glowColor: '#10b981',
    accentColor: '#34d399',
    badge: 'POPULAR',
    quote: '"Replace multiple AI tools with one intelligent assistant."',
    storage: '500 MB',
    slots: null,
    discount: null,
    type: 'active',

    desktopFeatures: [
      'Everything in FREE',
      'Fast Cloud AI',
      'Deep Web Research',
      'AI Coding Assistant',
      'AI Image Generation',
      'AI Video Generation',
      'Cloud Memory',
      'Browser Assistance',
      'Document Understanding',
      'PDF Analysis',
      'Email Writing',
      'Presentation Generation',
      'Notes & Summaries'
    ],

    homeFeatures: [
      'Everything in FREE',
      'Faster Voice Responses',
      'Multi-device Sync',
      'Advanced Automations',
      'Cloud Intelligence',
      'Better Voice Quality'
    ],

    sharedFeatures: [
      '500 MB Cloud Storage',
      '1,000,000 Monthly Tokens',
      '100 AI Images / Month',
      '10 AI Videos / Month'
    ]
  },
  {
    id: 'elite',
    tier: 2,
    name: 'ELITE',
    tagline: 'AI That Works With You.',
    price: '₹1499',
    period: '/mo',
    storageLabel: '5 GB',
    color: '#8b5cf6',
    glowColor: '#8b5cf6',
    accentColor: '#a78bfa',
    badge: 'RECOMMENDED',
    quote: '"Spend less time clicking and more time creating."',
    storage: '5 GB',
    slots: null,
    discount: null,
    type: 'active',

    desktopFeatures: [
      'Everything in PRO',
      'Screen Understanding',
      'Smart File Management',
      'Browser Automation',
      'Limited Computer Control',
      'VS Code Integration',
      'Autonomous Research',
      'Project Generator',
      'Multi-step Workflows',
      'Advanced Memory',
      'Workspace Understanding',
      'Automatic File Organization',
      'AI Report Generation'
    ],

    homeFeatures: [
      'Everything in PRO',
      'Personalized AI',
      'Family Profiles',
      'Advanced Home Automation',
      'Presence Detection',
      'Routine Learning',
      'Smart Notifications'
    ],

    sharedFeatures: [
      '5 GB Cloud Storage',
      '5,000,000 Monthly Tokens',
      '300 AI Images / Month',
      '50 AI Videos / Month',
      'Priority Queue'
    ]
  },
  {
    id: 'quantum',
    tier: 3,
    name: 'QUANTUM',
    tagline: 'Your Second Brain.',
    price: '₹2999',
    period: '/mo',
    storageLabel: '50 GB',
    color: '#f43f5e',
    glowColor: '#f43f5e',
    accentColor: '#fb7185',
    badge: 'ULTIMATE',
    quote: '"Don\'t just use AI. Let it work for you."',
    storage: '50 GB',
    slots: null,
    discount: null,
    type: 'active',

    desktopFeatures: [
      'Everything in ELITE',
      'Full Computer Control',
      'Autonomous Task Execution',
      'Multi-Agent Workflows',
      'Live Screen Understanding',
      'Advanced Voice Conversations',
      'Full IDE Control',
      'Advanced Browser Agent',
      'Long-Term Memory',
      'Project Planning',
      'Self Verification',
      'Background Task Execution',
      'AI Workspace',
      'AI Project Manager',
      'AI Research Assistant',
      'AI Debugging Assistant'
    ],

    homeFeatures: [
      'Everything in ELITE',
      'Complete Smart Home Brain',
      'Offline AI Hub',
      'Camera Intelligence',
      'Predictive Automations',
      'Security Monitoring',
      'Whole Home Intelligence',
      'Local AI Server Support'
    ],

    sharedFeatures: [
      '50 GB Cloud Storage',
      '15,000,000 Monthly Tokens',
      '750 AI Images / Month',
      '100 AI Videos / Month',
      '200 Live AI Minutes / Month',
      'Highest Priority Queue',
      'Early Access to Beta Features'
    ]
  }
];

export const TIER_INDEX_TO_PLAN = { 0: 'free', 1: 'pro', 2: 'elite', 3: 'quantum' };
