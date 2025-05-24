
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Github, Mail, MessageCircle, ExternalLink } from "lucide-react";

export const ContactSection = () => {
  return (
    <section id="contact" className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Get Started
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Ready to build your own J.A.R.V.I.S? Get the source code and start customizing your AI assistant today.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <Card className="bg-gray-900/50 border-gray-700 hover:border-cyan-500/50 transition-all duration-300 hover:scale-105">
              <CardHeader>
                <CardTitle className="flex items-center text-cyan-400">
                  <Github className="w-6 h-6 mr-3" />
                  Source Code
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 mb-4">
                  Access the complete J.A.R.V.I.S source code, including setup instructions and documentation.
                </p>
                <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 w-full">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View on GitHub
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-700 hover:border-cyan-500/50 transition-all duration-300 hover:scale-105">
              <CardHeader>
                <CardTitle className="flex items-center text-cyan-400">
                  <MessageCircle className="w-6 h-6 mr-3" />
                  Community
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 mb-4">
                  Join our community of developers building AI assistants and share your implementations.
                </p>
                <Button variant="outline" className="border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-black w-full">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Join Discord
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="p-6 bg-gray-900/30 rounded-lg border border-gray-700">
              <div className="text-3xl font-bold text-cyan-400 mb-2">100%</div>
              <div className="text-gray-400">Open Source</div>
            </div>
            <div className="p-6 bg-gray-900/30 rounded-lg border border-gray-700">
              <div className="text-3xl font-bold text-cyan-400 mb-2">Python</div>
              <div className="text-gray-400">Built with</div>
            </div>
            <div className="p-6 bg-gray-900/30 rounded-lg border border-gray-700">
              <div className="text-3xl font-bold text-cyan-400 mb-2">AI</div>
              <div className="text-gray-400">Powered</div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-20 pt-12 border-t border-gray-700">
        <div className="container mx-auto px-6 text-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-4">
            J.A.R.V.I.S
          </div>
          <p className="text-gray-400 mb-6">
            Just A Rather Very Intelligent System - Your AI Assistant
          </p>
          <div className="flex justify-center space-x-6">
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-cyan-400">
              <Github className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-cyan-400">
              <Mail className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-cyan-400">
              <MessageCircle className="w-5 h-5" />
            </Button>
          </div>
          <div className="mt-6 pt-6 border-t border-gray-800 text-gray-500 text-sm">
            © 2024 J.A.R.V.I.S AI Assistant. Built with ❤️ and AI.
          </div>
        </div>
      </footer>
    </section>
  );
};
