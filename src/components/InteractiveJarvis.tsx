
import { useState, useRef } from "react";
import { Mic, MicOff, Volume2, Youtube, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

// ========== CONFIGURE GEMINI ==========
const apiKey = "AIzaSyAL8hSIbTugM5rIr8GF-hDDoWcuL9mo9Sg";

// Declare speech recognition for TypeScript
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

export const InteractiveJarvis = () => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [response, setResponse] = useState("");
  const recognitionRef = useRef<any>(null);

  // ========== TEXT-TO-SPEECH ==========
  const speak = (text: string) => {
    setIsSpeaking(true);
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.onend = () => setIsSpeaking(false);
    speechSynthesis.speak(utterance);
    console.log("Jarvis:", text);
  };

  // ========== BROWSER AUTOMATION FUNCTIONS ==========
  const openYoutube = () => {
    window.open('https://www.youtube.com', '_blank');
    speak("Opening YouTube for you.");
  };

  const searchYoutube = (query: string) => {
    const searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
    window.open(searchUrl, '_blank');
    speak(`Searching YouTube for ${query}`);
  };

  const openWebsite = (url: string) => {
    if (!url.startsWith('http')) {
      url = 'https://' + url;
    }
    window.open(url, '_blank');
    speak(`Opening ${url}`);
  };

  const googleSearch = (query: string) => {
    const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
    window.open(searchUrl, '_blank');
    speak(`Searching Google for ${query}`);
  };

  const openSocialMedia = (platform: string) => {
    const platforms: { [key: string]: string } = {
      'facebook': 'https://www.facebook.com',
      'twitter': 'https://www.twitter.com',
      'instagram': 'https://www.instagram.com',
      'linkedin': 'https://www.linkedin.com',
      'tiktok': 'https://www.tiktok.com',
      'reddit': 'https://www.reddit.com'
    };
    
    if (platforms[platform.toLowerCase()]) {
      window.open(platforms[platform.toLowerCase()], '_blank');
      speak(`Opening ${platform}`);
    } else {
      speak(`Sorry, I don't know how to open ${platform}`);
    }
  };

  // ========== COMMAND PROCESSING ==========
  const processCommand = async (command: string) => {
    const lowerCommand = command.toLowerCase();
    
    // YouTube commands
    if (lowerCommand.includes('open youtube') || lowerCommand.includes('youtube')) {
      openYoutube();
      return;
    }
    
    if (lowerCommand.includes('search youtube for') || lowerCommand.includes('youtube search')) {
      const searchQuery = command.replace(/.*?(?:search youtube for|youtube search)/i, '').trim();
      if (searchQuery) {
        searchYoutube(searchQuery);
        return;
      }
    }
    
    // Google search commands
    if (lowerCommand.includes('google search') || lowerCommand.includes('search google for')) {
      const searchQuery = command.replace(/.*?(?:google search|search google for)/i, '').trim();
      if (searchQuery) {
        googleSearch(searchQuery);
        return;
      }
    }
    
    // Website opening commands
    if (lowerCommand.includes('open website') || lowerCommand.includes('go to')) {
      const url = command.replace(/.*?(?:open website|go to)/i, '').trim();
      if (url) {
        openWebsite(url);
        return;
      }
    }
    
    // Social media commands
    if (lowerCommand.includes('open facebook')) {
      openSocialMedia('facebook');
      return;
    }
    if (lowerCommand.includes('open twitter')) {
      openSocialMedia('twitter');
      return;
    }
    if (lowerCommand.includes('open instagram')) {
      openSocialMedia('instagram');
      return;
    }
    if (lowerCommand.includes('open linkedin')) {
      openSocialMedia('linkedin');
      return;
    }
    if (lowerCommand.includes('open tiktok')) {
      openSocialMedia('tiktok');
      return;
    }
    if (lowerCommand.includes('open reddit')) {
      openSocialMedia('reddit');
      return;
    }
    
    // Time and date commands
    if (lowerCommand.includes('what time') || lowerCommand.includes('current time')) {
      const now = new Date();
      const timeString = now.toLocaleTimeString();
      speak(`The current time is ${timeString}`);
      setResponse(`Current time: ${timeString}`);
      return;
    }
    
    if (lowerCommand.includes('what date') || lowerCommand.includes('today\'s date')) {
      const now = new Date();
      const dateString = now.toLocaleDateString();
      speak(`Today's date is ${dateString}`);
      setResponse(`Today's date: ${dateString}`);
      return;
    }
    
    // If no specific command matched, use Gemini AI
    await handleQuery(command);
  };

  // ========== SPEECH-TO-TEXT ==========
  const startListening = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      speak("Sorry, speech recognition is not supported in this browser.");
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    
    recognitionRef.current.lang = 'en-US';
    recognitionRef.current.interimResults = false;
    recognitionRef.current.maxAlternatives = 1;

    recognitionRef.current.onstart = () => {
      setIsListening(true);
      setTranscript("Listening...");
    };

    recognitionRef.current.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      console.log("You:", transcript);
      setTranscript(transcript);
      setIsListening(false);
      
      if (transcript.toLowerCase().includes("exit") || transcript.toLowerCase().includes("stop")) {
        speak("Goodbye.");
        return;
      }
      
      processCommand(transcript);
    };

    recognitionRef.current.onerror = (event: any) => {
      console.error("Speech recognition error:", event.error);
      speak("Sorry, I didn't catch that.");
      setIsListening(false);
      setTranscript("");
    };

    recognitionRef.current.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current.start();
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  // ========== GEMINI REQUEST ==========
  const sendPromptToGemini = async (prompt: string) => {
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }]
        })
      });

      const data = await response.json();
      return data.candidates?.[0]?.content?.parts?.[0]?.text || "No response from Gemini.";
    } catch (error: any) {
      return `Error: ${error.message}`;
    }
  };

  // ========== HANDLE QUERY ==========
  const handleQuery = async (query: string) => {
    try {
      setResponse("Processing...");
      const aiResponse = await sendPromptToGemini(query);
      setResponse(aiResponse);
      speak(aiResponse);
    } catch (error: any) {
      const errorMsg = `Error: ${error.message}`;
      setResponse(errorMsg);
      speak(errorMsg);
    }
  };

  const handleManualInput = () => {
    const userInput = prompt("Enter your command for J.A.R.V.I.S:");
    if (userInput) {
      setTranscript(userInput);
      processCommand(userInput);
    }
  };

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Interactive J.A.R.V.I.S with Browser Control
        </h2>
        
        <div className="max-w-2xl mx-auto bg-gray-900/50 rounded-lg p-8 backdrop-blur-sm border border-cyan-500/20">
          <div className="mb-6">
            <div className="flex justify-center space-x-4 mb-6">
              <Button
                onClick={isListening ? stopListening : startListening}
                className={`px-8 py-4 rounded-full transition-all duration-300 ${
                  isListening 
                    ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
                    : 'bg-cyan-500 hover:bg-cyan-600'
                }`}
                disabled={isSpeaking}
              >
                {isListening ? <MicOff size={24} /> : <Mic size={24} />}
                <span className="ml-2">
                  {isListening ? 'Stop Listening' : 'Start Voice Command'}
                </span>
              </Button>
              
              <Button
                onClick={handleManualInput}
                variant="outline"
                className="px-6 py-4 border-cyan-500 text-cyan-400 hover:bg-cyan-500/10"
                disabled={isSpeaking || isListening}
              >
                Type Command
              </Button>
            </div>

            {isSpeaking && (
              <div className="flex items-center justify-center mb-4">
                <Volume2 className="text-cyan-400 animate-pulse mr-2" />
                <span className="text-cyan-400">J.A.R.V.I.S is speaking...</span>
              </div>
            )}
          </div>

          {transcript && (
            <div className="mb-6 p-4 bg-blue-900/30 rounded-lg border-l-4 border-blue-500">
              <h3 className="text-blue-400 font-semibold mb-2">You said:</h3>
              <p className="text-white">{transcript}</p>
            </div>
          )}

          {response && (
            <div className="p-4 bg-cyan-900/30 rounded-lg border-l-4 border-cyan-500">
              <h3 className="text-cyan-400 font-semibold mb-2">J.A.R.V.I.S responds:</h3>
              <p className="text-white">{response}</p>
            </div>
          )}

          <div className="mt-6 text-sm text-gray-400 space-y-2">
            <div className="flex items-center justify-center mb-4 space-x-4">
              <Youtube className="text-red-500" size={20} />
              <Globe className="text-green-500" size={20} />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-left">
              <div>
                <p className="text-cyan-400 font-semibold">YouTube Commands:</p>
                <p>• "Open YouTube"</p>
                <p>• "Search YouTube for [topic]"</p>
              </div>
              <div>
                <p className="text-cyan-400 font-semibold">Browser Commands:</p>
                <p>• "Google search [query]"</p>
                <p>• "Open website [url]"</p>
              </div>
              <div>
                <p className="text-cyan-400 font-semibold">Social Media:</p>
                <p>• "Open Facebook/Twitter/Instagram"</p>
                <p>• "Open LinkedIn/TikTok/Reddit"</p>
              </div>
              <div>
                <p className="text-cyan-400 font-semibold">Info Commands:</p>
                <p>• "What time is it?"</p>
                <p>• "What's today's date?"</p>
              </div>
            </div>
            
            <p className="mt-4 text-center">Say "exit" or "stop" to end the conversation.</p>
          </div>
        </div>
      </div>
    </section>
  );
};
