
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Play } from "lucide-react";
import { toast } from "sonner";

export const CodeDemo = () => {
  const [activeTab, setActiveTab] = useState("main");

  const codeBlocks = {
    main: `# J.A.R.V.I.S - AI Assistant
import google.generativeai as genai
import pyttsx3
import speech_recognition as sr
import tkinter as tk
from tkinter import simpledialog

# ========== GEMINI SETUP ==========
genai.configure(api_key="YOUR_API_KEY")
model = genai.GenerativeModel(model_name="models/gemini-2.0-flash")

# ========== VOICE SETUP ==========
engine = pyttsx3.init()
recognizer = sr.Recognizer()

def speak(text):
    print("Jarvis:", text)
    engine.say(text)
    engine.runAndWait()

def listen():
    with sr.Microphone() as source:
        print("Listening...")
        audio = recognizer.listen(source)
        try:
            query = recognizer.recognize_google(audio)
            print("You:", query)
            return query
        except sr.UnknownValueError:
            speak("Sorry, I didn't catch that.")
            return ""
        except sr.RequestError:
            speak("Speech service unavailable.")
            return ""`,
    gui: `# ========== GUI TO EDIT PROMPT ==========
def edit_prompt(initial_prompt):
    root = tk.Tk()
    root.withdraw()
    prompt = simpledialog.askstring(
        "Edit Prompt", 
        "Modify your prompt or click OK to continue:", 
        initialvalue=initial_prompt
    )
    root.destroy()
    return prompt`,
    ai: `# ========== SEND PROMPT TO GEMINI ==========
def send_prompt_to_gemini(prompt):
    try:
        response = model.generate_content(prompt)
        return response.text.strip() if response.text else "No response from Gemini."
    except Exception as e:
        return f"Error: {str(e)}"

# ========== MAIN LOOP ==========
speak("Jarvis with Gemini is ready. Say something!")

while True:
    query = listen()
    if not query:
        continue
    if "exit" in query.lower() or "stop" in query.lower():
        speak("Goodbye.")
        break

    final_prompt = edit_prompt(query)
    if not final_prompt:
        speak("Prompt cancelled. Please try again.")
        continue

    response = send_prompt_to_gemini(final_prompt)
    speak(response)`
  };

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    toast("Code copied to clipboard!");
  };

  return (
    <section id="demo" className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Source Code
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Explore the Python implementation behind J.A.R.V.I.S with modular, clean code architecture.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Tab Navigation */}
          <div className="flex flex-wrap gap-2 mb-6">
            {Object.keys(codeBlocks).map((tab) => (
              <Button
                key={tab}
                onClick={() => setActiveTab(tab)}
                variant={activeTab === tab ? "default" : "outline"}
                className={`capitalize ${
                  activeTab === tab 
                    ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white" 
                    : "border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-black"
                }`}
              >
                {tab === "main" ? "Core System" : tab === "gui" ? "GUI Interface" : "AI Integration"}
              </Button>
            ))}
          </div>

          {/* Code Display */}
          <div className="relative bg-gray-900/80 backdrop-blur-sm rounded-lg border border-gray-700 overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="ml-4 text-gray-400 text-sm">jarvis.py</span>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => copyToClipboard(codeBlocks[activeTab as keyof typeof codeBlocks])}
                  className="text-gray-400 hover:text-cyan-400"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copy
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-gray-400 hover:text-green-400"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Run
                </Button>
              </div>
            </div>
            
            <pre className="p-6 text-sm text-gray-300 overflow-x-auto leading-relaxed">
              <code className="language-python">
                {codeBlocks[activeTab as keyof typeof codeBlocks]}
              </code>
            </pre>
          </div>

          {/* Installation Instructions */}
          <div className="mt-8 p-6 bg-gray-900/50 rounded-lg border border-gray-700">
            <h3 className="text-xl font-semibold text-cyan-400 mb-4">Installation & Setup</h3>
            <div className="space-y-2 text-gray-300">
              <p>1. Install required dependencies:</p>
              <pre className="bg-black/50 p-3 rounded text-cyan-400 font-mono text-sm">
                pip install google-generativeai pyttsx3 speechrecognition
              </pre>
              <p>2. Set up your Google AI API key</p>
              <p>3. Run the script and start talking to J.A.R.V.I.S!</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
