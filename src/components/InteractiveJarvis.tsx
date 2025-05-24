
import { useState, useRef } from "react";
import { Mic, MicOff, Volume2 } from "lucide-react";
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
      
      handleQuery(transcript);
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
      // Using fetch since we need to install the Google Generative AI package
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
    const userInput = prompt("Enter your question for J.A.R.V.I.S:");
    if (userInput) {
      setTranscript(userInput);
      handleQuery(userInput);
    }
  };

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Interactive J.A.R.V.I.S
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
                Type Message
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

          <div className="mt-6 text-sm text-gray-400">
            <p>Click "Start Voice Command" to speak with J.A.R.V.I.S or use "Type Message" to enter text.</p>
            <p className="mt-2">Say "exit" or "stop" to end the conversation.</p>
          </div>
        </div>
      </div>
    </section>
  );
};
