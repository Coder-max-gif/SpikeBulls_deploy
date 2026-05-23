import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function PricingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/products", { replace: true });
  }, [navigate]);

  return null;
}
