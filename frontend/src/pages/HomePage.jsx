import React from "react";
import Hero from "../components/Hero";
import TrustDashboard from "../components/TrustDashboard";
import PricingPreview from "../components/PricingPreview";
import HowItWorks from "../components/HowItWorks";
import Testimonials from "../components/Testimonials";
import FAQ from "../components/FAQ";
import FinalCTA from "../components/FinalCTA";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <TrustDashboard />
      <PricingPreview />
      <HowItWorks />
      <Testimonials />
      <FAQ limit={5} />
      <FinalCTA />
    </main>
  );
}
