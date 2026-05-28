import uuid
from datetime import datetime, timezone
from typing import Literal, Optional

from pydantic import BaseModel, Field


OrderStatus = Literal["pending", "active", "rejected", "fulfilled", "failed", "refunded", "cancelled"]


class OrderItem(BaseModel):
    product_id: str
    name: str
    price: float
    quantity: int = 1


class Order(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: str
    user_email: str
    
    # Customer details for manual payment
    customer_name: Optional[str] = None
    customer_phone: Optional[str] = None
    customer_address: Optional[str] = None
    mt5_account_number: Optional[str] = None
    
    items: list[OrderItem]
    subtotal: float
    total: float
    currency: str = "USD"
    subscription_duration: Optional[int] = None  # in days
    
    status: OrderStatus = "pending"
    payment_provider: str = "binance"  # default to binance for manual workflow
    
    # Manual payment fields
    payment_proof_url: Optional[str] = None
    binance_transaction_id: Optional[str] = None
    payment_notes: Optional[str] = None
    
    # Subscription lifecycle
    activated_at: Optional[datetime] = None
    subscription_expires_at: Optional[datetime] = None
    
    stripe_session_id: Optional[str] = None
    stripe_payment_intent: Optional[str] = None
    license_ids: list[str] = Field(default_factory=list)
    simulated: bool = False
    
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class CheckoutCreate(BaseModel):
    product_ids: list[str] = Field(min_length=1)
    customer_name: Optional[str] = None
    customer_phone: Optional[str] = None
    customer_address: Optional[str] = None
    mt5_account_number: Optional[str] = None
    subscription_duration: Optional[int] = None  # in days (30, 180, 365)


class ManualPaymentSubmit(BaseModel):
    order_id: str
    payment_proof_url: Optional[str] = None
    binance_transaction_id: Optional[str] = None
    payment_notes: Optional[str] = None
    customer_phone: Optional[str] = None

