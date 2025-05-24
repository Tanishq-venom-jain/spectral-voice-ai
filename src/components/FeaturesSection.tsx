
import { Mic, Brain, MessageSquare, Settings, Zap, Shield } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const FeaturesSection = () => {
  const features = [
    {
      icon: <Mic className="w-8 h-8" />,
      title: "Advanced Voice Recognition",
      description: "State-of-the-art speech recognition using Google's Speech API for accurate voice commands.",
      gradient: "from-cyan-500 to-blue-500"
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Gemini AI Integration",
      description: "Powered by Google's Gemini 2.0 Flash for intelligent responses and complex reasoning.",
      gradient: "from-blue-500 to-purple-500"
    },
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: "Natural Conversations",
      description: "Engage in natural, context-aware conversations with human-like responses.",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: <Settings className="w-8 h-8" />,
      title: "Customizable Prompts",
      description: "Edit and refine prompts through an intuitive GUI interface for better results.",
      gradient: "from-pink-500 to-red-500"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Real-time Processing",
      description: "Lightning-fast response times with efficient voice-to-text and AI processing.",
      gradient: "from-red-500 to-orange-500"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure & Private",
      description: "Your conversations are processed securely with privacy-focused architecture.",
      gradient: "from-orange-500 to-cyan-500"
    }
  ];

  return (
    <section id="features" className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Advanced Features
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Experience the next generation of AI assistance with cutting-edge technology and intuitive design.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="bg-gray-900/50 border-gray-700 hover:border-cyan-500/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/10 backdrop-blur-sm group"
            >
              <CardHeader>
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <div className="text-white">
                    {feature.icon}
                  </div>
                </div>
                <CardTitle className="text-xl text-white group-hover:text-cyan-400 transition-colors duration-300">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-400 leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
