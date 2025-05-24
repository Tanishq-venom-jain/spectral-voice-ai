
import { useState, useEffect } from "react";
import { HeroSection } from "@/components/HeroSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { VoiceVisualizer } from "@/components/VoiceVisualizer";
import { FloatingParticles } from "@/components/FloatingParticles";
import { Navigation } from "@/components/Navigation";
import { CodeDemo } from "@/components/CodeDemo";
import { ContactSection } from "@/components/ContactSection";

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white relative overflow-x-hidden">
      <FloatingParticles />
      <Navigation />
      
      <div className={`transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <HeroSection />
        <VoiceVisualizer />
        <FeaturesSection />
        <CodeDemo />
        <ContactSection />
      </div>
      
      {/* Gradient overlays for depth */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-cyan-900/20 pointer-events-none" />
      <div className="fixed inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
    </div>
  );
};

export default Index;
