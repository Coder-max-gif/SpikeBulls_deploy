"""Manual seed CLI for SpikeBulls.

Usage:
    python -m seed_cli            # idempotent seed (creates admin/products/testimonials if missing)
    python -m seed_cli --reset    # WIPE products + testimonials + email_outbox, then re-seed
    python -m seed_cli --wipe-all # WIPE EVERYTHING including users, orders, licenses, leads (DESTRUCTIVE)
"""
import argparse
import asyncio
import logging

from core.database import close_db, ensure_indexes, get_db
from services.seed import seed_database

logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")
logger = logging.getLogger("seed")


async def reset_catalog() -> None:
    db = get_db()
    for col in ("products", "testimonials", "email_outbox"):
        await db[col].drop()
    logger.warning("[reset] Dropped products, testimonials, email_outbox.")


async def wipe_all() -> None:
    db = get_db()
    for col in (
        "users",
        "products",
        "testimonials",
        "orders",
        "licenses",
        "contact_submissions",
        "email_outbox",
    ):
        await db[col].drop()
    logger.warning("[wipe] Dropped ALL collections. You now have an empty database.")


async def run(reset: bool, wipe: bool) -> None:
    await ensure_indexes()
    if wipe:
        await wipe_all()
    elif reset:
        await reset_catalog()
    await seed_database()
    logger.info("[done] Seed complete.")
    await close_db()


def main() -> None:
    parser = argparse.ArgumentParser(description="SpikeBulls database seed CLI")
    parser.add_argument("--reset", action="store_true", help="Drop catalog before reseeding")
    parser.add_argument("--wipe-all", action="store_true", help="DESTRUCTIVE: drop every collection then reseed")
    args = parser.parse_args()
    if args.wipe_all:
        confirm = input("This will DELETE every collection. Type 'wipe' to continue: ")
        if confirm.strip().lower() != "wipe":
            print("Aborted.")
            return
    asyncio.run(run(reset=args.reset, wipe=args.wipe_all))


if __name__ == "__main__":
    main()
