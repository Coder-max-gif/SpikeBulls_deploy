import logging
import secrets
from datetime import datetime, timezone

from core.config import settings
from core.database import get_db
from core.security import hash_password
from models.product import Product
from models.user import UserInDB
from models.contact import Testimonial

logger = logging.getLogger(__name__)


SEED_PRODUCTS: list[dict] = [
    {
        "name": "SpikeBulls Indicator Subscription",
        "slug": "indicator-subscription",
        "category": "indicator",
        "short_description": "Professional non-repainting MT5 indicator subscription for forex and gold traders.",
        "description": "SpikeBulls Indicator Subscription provides access to our advanced MT5 trading indicator system built around structured market behavior, trend confirmation, and non-repainting signal logic. The indicator is designed for traders who want cleaner entries, disciplined execution, and reliable chart-based analysis for Forex and XAUUSD trading. Built using advanced TMA-based logic, the indicator focuses on: signal confirmation, trend direction, alternating signal filtering, non-repainting execution, and structured market entries.",
        "price": 29.0,
        "features": [
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
        "platforms": ["MetaTrader 5", "Windows", "VPS"],
        "images": [
            "https://images.unsplash.com/photo-1689732888407-310424e3a372?crop=entropy&cs=srgb&fm=jpg&q=85",
        ],
        "delivery_type": "membership",
        "subscription_tiers": [
            {
                "name": "1 Month",
                "price": 29.0,
                "license_duration_days": 30,
            },
            {
                "name": "6 Months",
                "price": 69.0,
                "compare_at_price": 174.0,
                "license_duration_days": 180,
                "highlight": True,
                "badge": "Best Value",
            },
            {
                "name": "1 Year",
                "price": 299.0,
                "compare_at_price": 348.0,
                "license_duration_days": 365,
            },
        ],
        "accent": "blue",
        "highlight": False,
        "status": "active",
    },
    {
        "name": "SpikeBulls Algorithm Subscription",
        "slug": "algorithm-subscription",
        "category": "algo",
        "short_description": "Advanced MT5 automation subscription powered by structured non-repainting signal logic.",
        "description": "SpikeBulls Algorithm Subscription gives traders access to our automated MTS execution system built around the SpikeBulls Indicator framework. The algorithm uses structured signal processing, trend confirmation, alternating signal control, and disciplined execution rules to support automated trading workflows.",
        "price": 79.0,
        "features": [
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
        "platforms": ["MetaTrader 5", "VPS", "Cloud"],
        "images": [
            "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=srgb&fm=jpg&q=85"
        ],
        "delivery_type": "membership",
        "subscription_tiers": [
            {
                "name": "1 Month",
                "price": 79.0,
                "license_duration_days": 30,
            },
            {
                "name": "6 Months",
                "price": 199.0,
                "compare_at_price": 474.0,
                "license_duration_days": 180,
                "highlight": True,
                "badge": "Best Value",
            },
            {
                "name": "1 Year",
                "price": 299.0,
                "compare_at_price": 948.0,
                "license_duration_days": 365,
            },
        ],
        "accent": "violet",
        "highlight": False,
        "status": "active",
    },
]


SEED_TESTIMONIALS: list[dict] = [
    {
        "name": "Marcus Chen",
        "role": "Prop Firm Trader, Singapore",
        "quote": "The MT5 Indicator changed how I read structure. I cut my chart time in half and my win rate climbed from 54% to 67% in three months.",
        "rating": 5,
    },
    {
        "name": "Sofia Almeida",
        "role": "Portfolio Manager",
        "quote": "The Algo Strategy runs on our VPS and handles drawdown better than half the systems we've built in-house. Genuinely institutional quality.",
        "rating": 5,
    },
    {
        "name": "James O'Connor",
        "role": "Full-Time FX Trader",
        "quote": "Clean signals, no repaint, no nonsense. The risk calculator alone is worth the price. This is what professional tooling looks like.",
        "rating": 5,
    },
    {
        "name": "Priya Raman",
        "role": "Quant Researcher",
        "quote": "I stress-tested the strategy across 8 years of tick data. The Sharpe is real, the drawdown is contained. Few retail products survive that test.",
        "rating": 5,
    },
]


async def seed_database() -> None:
    db = get_db()

    # --- Admin user ---
    admin = await db.users.find_one({"role": "admin"})
    if not admin:
        password = settings.ADMIN_PASSWORD or secrets.token_urlsafe(12)
        user = UserInDB(
            email=settings.ADMIN_EMAIL,
            name="SpikeBulls Admin",
            password_hash=hash_password(password),
            role="admin",
            email_verified=True,
        )
        await db.users.insert_one(user.model_dump())
        logger.info(
            "[SEED] Admin user created \u2014 email=%s password=%s (change after first login)",
            settings.ADMIN_EMAIL,
            password,
        )

    # --- Products ---
    existing_slugs = {
        doc["slug"] async for doc in db.products.find({}, {"slug": 1})
    }
    for entry in SEED_PRODUCTS:
        if entry["slug"] in existing_slugs:
            continue
        product = Product(**entry)
        await db.products.insert_one(product.model_dump())
    logger.info("[SEED] Products ensured (%d total in catalog).", await db.products.count_documents({}))

    # --- Testimonials ---
    if await db.testimonials.count_documents({}) == 0:
        for entry in SEED_TESTIMONIALS:
            t = Testimonial(**entry)
            await db.testimonials.insert_one(t.model_dump())
        logger.info("[SEED] Testimonials seeded.")


def generate_license_key() -> str:
    raw = secrets.token_hex(10).upper()
    return f"SPB-{raw[0:4]}-{raw[4:8]}-{raw[8:12]}-{raw[12:16]}-{raw[16:20]}"
