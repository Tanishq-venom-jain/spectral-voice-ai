
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowDown, Mic, Brain, Zap } from "lucide-react";
import { GeometricShapes } from "./GeometricShapes";

export const HeroSection = () => {
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const fullText = "Just A Rather Very Intelligent System";

  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setCurrentText(prev => prev + fullText[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, fullText]);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative">
      <GeometricShapes />
      
      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Main Title */}
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-scale-in">
            J.A.R.V.I.S
          </h1>
          
          {/* Subtitle with typing effect */}
          <div className="text-xl md:text-2xl text-gray-300 mb-8 h-8">
            <span className="font-mono">{currentText}</span>
            <span className="animate-pulse">|</span>
          </div>
          
          {/* Description */}
          <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Experience the future of AI assistance with advanced voice recognition, 
            natural language processing, and intelligent automation powered by Google's Gemini AI.
          </p>
          
          {/* Feature Icons */}
          <div className="flex justify-center space-x-8 mb-12">
            <div className="flex flex-col items-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300">
                <Mic className="w-8 h-8 text-white" />
              </div>
              <span className="text-sm text-gray-400">Voice Control</span>
            </div>
            <div className="flex flex-col items-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <span className="text-sm text-gray-400">AI Intelligence</span>
            </div>
            <div className="flex flex-col items-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <span className="text-sm text-gray-400">Real-time Response</span>
            </div>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-8 py-3 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/25">
              Experience J.A.R.V.I.S
            </Button>
            <Button variant="outline" className="border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-black px-8 py-3 rounded-full transition-all duration-300 hover:scale-105">
              View Documentation
            </Button>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ArrowDown className="w-6 h-6 text-cyan-400" />
      </div>
    </section>
  );
};
