// Static marketing content for SpikeBulls.
// Products, testimonials, and pricing are now served from the backend API.
// This file only holds copy that doesn't need to be admin-editable.

export const BRAND = {
  name: "SpikeBulls",
  tagline: "Premium Forex Trading Technology",
  email: "spikebulls108@gmail.com",
  social: {
    twitter: "#",
    youtube: "#",
    telegram: "https://t.me/SpikeBulls_FX"
  }
};

export const NAV_LINKS = [
  { label: "Products", href: "#products" },
  { label: "Features", href: "#features" },
  { label: "Performance", href: "#performance" },
  { label: "Pricing", href: "/pricing" },
  { label: "FAQ", href: "/faq" }
];

export const TRUST_BADGES = [
  { label: "MetaTrader 5", sub: "Certified" },
  { label: "TradingView", sub: "Compatible" },
  { label: "FIX API", sub: "Supported" },
  { label: "Windows / Mac", sub: "Cross-platform" },
  { label: "VPS Ready", sub: "24/7 Uptime" }
];

export const TRUST_STATS = [
  { value: "12,400+", label: "Active Traders" },
  { value: "$1.8B", label: "Volume Analyzed" },
  { value: "68.4%", label: "Avg. Win Rate" },
  { value: "42ms", label: "Avg. Signal Latency" }
];

export const MOCK_PRODUCTS = [
  {
    id: "indicator-subscription",
    name: "SpikeBulls Indicator Subscription",
    slug: "indicator-subscription",
    category: "indicator",
    short_description: "Professional non-repainting MT5 indicator subscription for forex and gold traders.",
    description: "SpikeBulls Indicator Subscription provides access to our advanced MT5 trading indicator system built around structured market behavior, trend confirmation, and non-repainting signal logic. The indicator is designed for traders who want cleaner entries, disciplined execution, and reliable chart-based analysis for Forex and XAUUSD trading. Built using advanced TMA-based logic, the indicator focuses on: signal confirmation, trend direction, alternating signal filtering, non-repainting execution, and structured market entries.",
    price: 29.0,
    features: [
      "MT5 Compatible",
      "Non-Repainting Signal System",
      "Buy & Sell Confirmation Signals",
      "Strong + Confirmation Signals",
      "Multi-Timeframe Compatible",
      "Gold (XAUUSD) Optimized",
      "Structured Entry Detection",
      "Clean Chart Interface",
      "Continuous Updates",
      "Manual Activation Support"
    ],
    platforms: ["MetaTrader 5", "Windows", "VPS"],
    images: [
      "https://images.unsplash.com/photo-1689732888407-310424e3a372?crop=entropy&cs=srgb&fm=jpg&q=85",
    ],
    delivery_type: "membership",
    subscription_tiers: [
      {
        name: "1 Month",
        price: 29.0,
        license_duration_days: 30,
      },
      {
        name: "6 Months",
        price: 69.0,
        compare_at_price: 174.0,
        license_duration_days: 180,
        highlight: true,
        badge: "Best Value",
      },
      {
        name: "1 Year",
        price: 299.0,
        compare_at_price: 348.0,
        license_duration_days: 365,
      },
    ],
    accent: "blue",
    highlight: false,
    status: "active",
  },
  {
    id: "algorithm-subscription",
    name: "SpikeBulls Algorithm Subscription",
    slug: "algorithm-subscription",
    category: "algo",
    short_description: "Advanced MT5 automation subscription powered by structured non-repainting signal logic.",
    description: "SpikeBulls Algorithm Subscription gives traders access to our automated MTS execution system built around the SpikeBulls Indicator framework. The algorithm uses structured signal processing, trend confirmation, alternating signal control, and disciplined execution rules to support automated trading workflows.",
    price: 79.0,
    features: [
      "MT5 Expert Advisor System",
      "Automated Trade Execution",
      "Non-Repainting Signal Logic",
      "One-Trade Protection System",
      "Opposite Signal Exit Logic",
      "VPS Friendly",
      "Gold & Forex Compatible",
      "Structured Risk Logic",
      "Automated Signal Handling",
      "Continuous Updates",
      "Subscription-Based Access"
    ],
    platforms: ["MetaTrader 5", "VPS", "Cloud"],
    images: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=srgb&fm=jpg&q=85",
    ],
    delivery_type: "membership",
    subscription_tiers: [
      {
        name: "1 Month",
        price: 79.0,
        license_duration_days: 30,
      },
      {
        name: "6 Months",
        price: 199.0,
        compare_at_price: 474.0,
        license_duration_days: 180,
        highlight: true,
        badge: "Best Value",
      },
      {
        name: "1 Year",
        price: 299.0,
        compare_at_price: 948.0,
        license_duration_days: 365,
      },
    ],
    accent: "violet",
    highlight: false,
    status: "active",
  },
];

export const FEATURES = [
  {
    icon: "Activity",
    title: "Signal Clarity",
    desc: "No noise, no lag. Clean entry & exit signals validated across multiple confluences before they ever reach your chart."
  },
  {
    icon: "TrendingUp",
    title: "Trend Detection",
    desc: "A proprietary multi-timeframe engine that maps macro structure to micro execution with institutional precision."
  },
  {
    icon: "ShieldCheck",
    title: "Risk Management",
    desc: "Built-in position sizing, drawdown caps, and volatility-adjusted stops keep capital protected at all times."
  },
  {
    icon: "Cpu",
    title: "Automation Support",
    desc: "Deploy on VPS, run 24/5, and let the algo handle every entry, exit, and trail without human intervention."
  },
  {
    icon: "Zap",
    title: "Real-Time Analysis",
    desc: "Tick-level processing with 42ms average signal latency. The market moves fast — you move faster."
  },
  {
    icon: "LineChart",
    title: "Adaptive Logic",
    desc: "Strategy parameters self-tune to current volatility regime, so performance stays consistent across conditions."
  }
];

export const PERFORMANCE_METRICS = [
  { label: "Net Profit (12M)", value: "+184.2%", trend: "up" },
  { label: "Max Drawdown", value: "-9.4%", trend: "down" },
  { label: "Sharpe Ratio", value: "2.71", trend: "up" },
  { label: "Profit Factor", value: "3.18", trend: "up" },
  { label: "Win Rate", value: "68.4%", trend: "up" },
  { label: "Avg R:R", value: "1 : 2.4", trend: "up" }
];

export const EQUITY_CURVE = [
  100, 102, 101, 105, 108, 112, 110, 116, 121, 119, 125, 131,
  128, 134, 140, 138, 145, 152, 149, 158, 166, 162, 171, 178,
  176, 184, 192, 188, 198, 206, 212, 209, 219, 227, 234, 241,
  238, 248, 256, 263, 270, 268, 278, 284
];

export const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Choose Your Product",
    desc: "Pick the MT5 Indicator Subscription for manual precision, or the Algorithm Subscription for full automation."
  },
  {
    step: "02",
    title: "Complete Payment",
    desc: "Send payment via Binance to the provided address, then click 'I Have Paid' on the checkout page. Our team will verify your payment manually."
  },
  {
    step: "03",
    title: "Activate & Install",
    desc: "Receive your license key via email, install the product on your MT5 terminal, and start trading with your chosen subscription."
  }
];

export const TESTIMONIALS = [
  {
    name: "Marcus Chen",
    role: "Prop Firm Trader, Singapore",
    quote:
      "The MT5 Indicator changed how I read structure. I cut my chart time in half and my win rate climbed from 54% to 67% in three months.",
    rating: 5
  },
  {
    name: "Sofia Almeida",
    role: "Portfolio Manager",
    quote:
      "The Algo Strategy runs on our VPS and handles drawdown better than half the systems we've built in-house. Genuinely institutional quality.",
    rating: 5
  },
  {
    name: "James O'Connor",
    role: "Full-Time FX Trader",
    quote:
      "Clean signals, no repaint, no nonsense. The risk calculator alone is worth the price. This is what professional tooling looks like.",
    rating: 5
  },
  {
    name: "Priya Raman",
    role: "Quant Researcher",
    quote:
      "I stress-tested the strategy across 8 years of tick data. The Sharpe is real, the drawdown is contained. Few retail products survive that test.",
    rating: 5
  }
];

export const PRICING_PLANS = [
  {
    id: "indicator-subscription",
    name: "Indicator Subscription",
    price: 29,
    period: "monthly",
    description: "Professional non-repainting MT5 indicator subscription for forex and gold traders.",
    features: [
      "MT5 Compatible",
      "Non-Repainting Signal System",
      "Buy & Sell Confirmation Signals",
      "Gold (XAUUSD) Optimized",
      "Manual Activation Support"
    ],
    cta: "Get Indicator",
    highlight: false,
    accent: "blue"
  },
  {
    id: "algorithm-subscription",
    name: "Algorithm Subscription",
    price: 79,
    period: "monthly",
    description: "Advanced MT5 automation subscription powered by structured non-repainting signal logic.",
    features: [
      "MT5 Expert Advisor System",
      "Automated Trade Execution",
      "VPS Friendly",
      "Gold & Forex Compatible",
      "Subscription-Based Access"
    ],
    cta: "Get Algorithm",
    highlight: true,
    badge: "Most Popular",
    accent: "violet"
  }
];

export const FAQS = [
  {
    q: "How does manual Binance payment work?",
    a: "After selecting a product, you'll receive our Binance payment details. Send the exact amount to the provided address. Once you've sent payment, click 'I Have Paid' on the checkout page. Our team will verify your payment manually, and your license will be activated and delivered via email."
  },
  {
    q: "How long does activation take?",
    a: "Payment verification and license activation are done manually. We aim to process all verifications within 24 hours, but typically much faster. You'll receive an email with your license details as soon as your payment is confirmed."
  },
  {
    q: "Do your products repaint?",
    a: "No. Every signal generated by the MT5 Indicator is locked once a candle closes. The Algo Strategy executes only on confirmed conditions — no future-leaking, no repainting."
  },
  {
    q: "What markets and timeframes are supported?",
    a: "FX majors and minors, and gold (XAUUSD) are optimized. Timeframes from M5 to D1 are fully supported. M1 is available but not recommended."
  },
  {
    q: "Do I need a VPS to run the products?",
    a: "For the Algo Subscription, a VPS is strongly recommended to keep your MT5 terminal online 24/5 with stable latency. For the Indicator Subscription, a VPS is optional but useful if you want to run MT5 continuously."
  },
  {
    q: "Will the products work on MT5 and VPS?",
    a: "Yes. Both the Indicator Subscription and Algorithm Subscription are fully compatible with MetaTrader 5 (MT5) and can be run on a VPS for 24/7 operation."
  },
  {
    q: "Is this financial advice?",
    a: "No. Our products are educational and technical tools only. We do not provide financial advice, investment recommendations, or trading signals as a service. All trading carries risk, past performance does not guarantee future results, and you are solely responsible for your own decisions."
  }
];

export const FOOTER_LINKS = {
  Product: [
    { label: "Indicator", href: "/products/indicator-subscription" },
    { label: "Algorithm", href: "/products/algorithm-subscription" },
    { label: "All Products", href: "/products" },
    { label: "Pricing", href: "/pricing" }
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Performance", href: "/performance" },
    { label: "Contact", href: "/contact" }
  ],
  Support: [
    { label: "FAQ", href: "/faq" },
    { label: "Setup Guide", href: "/setup-guide" }
  ],
  Legal: [
    { label: "Terms", href: "/terms" },
    { label: "Privacy", href: "/privacy" },
    { label: "Risk Disclosure", href: "/risk-disclosure" },
    { label: "Refund Policy", href: "/refund-policy" }
  ]
};

export const PREVIEW_IMAGES = {
  hero: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?crop=entropy&cs=srgb&fm=jpg&q=85",
  dashboard: "https://images.unsplash.com/photo-1621264448270-9ef00e88a935?crop=entropy&cs=srgb&fm=jpg&q=85",
  candles1: "https://images.unsplash.com/photo-1689732888407-310424e3a372?crop=entropy&cs=srgb&fm=jpg&q=85",
  candles2: "https://images.unsplash.com/photo-1639754390580-2e7437267698?crop=entropy&cs=srgb&fm=jpg&q=85",
  analytics1: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=srgb&fm=jpg&q=85",
  analytics2: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?crop=entropy&cs=srgb&fm=jpg&q=85"
};
