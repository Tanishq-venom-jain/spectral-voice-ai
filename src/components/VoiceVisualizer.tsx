
import { useState, useEffect } from "react";

export const VoiceVisualizer = () => {
  const [bars, setBars] = useState<number[]>(Array(20).fill(0));
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isActive) {
        setBars(prev => prev.map(() => Math.random() * 100 + 20));
      } else {
        setBars(prev => prev.map(bar => Math.max(0, bar - 5)));
      }
    }, 100);

    return () => clearInterval(interval);
  }, [isActive]);

  useEffect(() => {
    const toggleInterval = setInterval(() => {
      setIsActive(prev => !prev);
    }, 3000);

    return () => clearInterval(toggleInterval);
  }, []);

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Voice Recognition Active
        </h2>
        
        <div className="flex justify-center items-end space-x-2 h-32 mb-8">
          {bars.map((height, index) => (
            <div
              key={index}
              className="bg-gradient-to-t from-cyan-500 to-blue-500 rounded-t transition-all duration-100"
              style={{
                width: '8px',
                height: `${height}px`,
                boxShadow: `0 0 10px rgba(34, 211, 238, 0.5)`
              }}
            />
          ))}
        </div>
        
        <p className="text-gray-400 text-lg">
          {isActive ? "Listening for voice commands..." : "Waiting for activation..."}
        </p>
      </div>
    </section>
  );
};
