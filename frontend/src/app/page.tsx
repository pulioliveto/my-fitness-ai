"use client";

import {
  HeroSection,
  FeaturesSection,
  AppPreviewSection,
  FinalCTASection,
} from "@/components/landing";

export default function Page() {
  const handleGetStarted = () => {
    window.location.href = "/login"; // o usa next/navigation: router.push('/login')
  };

  return (
    <div className="min-h-screen bg-black">
      <HeroSection onGetStarted={handleGetStarted} />
      <FeaturesSection />
      <AppPreviewSection />
      <FinalCTASection onGetStarted={handleGetStarted} />
    </div>
  );
}
