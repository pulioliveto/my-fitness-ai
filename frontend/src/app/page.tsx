"use client";
import { useRouter } from "next/navigation";
import {
  HeroSection,
  FeaturesSection,
  AppPreviewSection,
  FinalCTASection,
} from "@/components/landing";

export default function Page() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push("/login");
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
