"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Mic } from "lucide-react";

const demoScenarios = [
  {
    title: "Customer Support",
    description: "Handle complex customer inquiries with intelligent routing",
    transcript: [
      {
        speaker: "Customer",
        text: "I need help with my recent order",
        time: 0,
      },
      {
        speaker: "AGNOJARVIS",
        text: "I can help you with that. Let me pull up your order history.",
        time: 1000,
      },
      {
        speaker: "AGNOJARVIS",
        text: "I see you ordered item #4532 on January 2nd. How can I assist?",
        time: 3000,
      },
      { speaker: "Customer", text: "The item arrived damaged", time: 5000 },
      {
        speaker: "AGNOJARVIS",
        text: "I understand. I'm initiating a replacement order and connecting you with our returns specialist.",
        time: 6500,
      },
      {
        speaker: "AGNOJARVIS",
        text: "Your replacement order #4533 has been created. Is there anything else I can help you with today?",
        time: 8500,
      },
      { speaker: "Customer", text: "No, that's all. Thank you!", time: 10500 },
      {
        speaker: "AGNOJARVIS",
        text: "You're welcome! Have a great day.",
        time: 12000,
      },
    ],
  },
  {
    title: "Sales Inquiry",
    description: "Qualify leads and schedule meetings automatically",
    transcript: [
      {
        speaker: "Prospect",
        text: "I'm interested in your enterprise plan",
        time: 0,
      },
      {
        speaker: "AGNOJARVIS",
        text: "Great! Our enterprise plan offers advanced features. What's your team size?",
        time: 1500,
      },
      { speaker: "Prospect", text: "We have about 200 agents", time: 3500 },
      {
        speaker: "AGNOJARVIS",
        text: "Perfect. I'm scheduling a demo with our enterprise specialist. Would Tuesday at 2 PM work?",
        time: 5000,
      },
      { speaker: "Prospect", text: "Yes, that works for me.", time: 7000 },
      {
        speaker: "AGNOJARVIS",
        text: "Excellent. I've sent a calendar invite to your email. We look forward to speaking with you then!",
        time: 8500,
      },
    ],
  },
  {
    title: "Technical Support",
    description: "Diagnose issues and route to appropriate technical teams",
    transcript: [
      { speaker: "User", text: "My dashboard won't load", time: 0 },
      {
        speaker: "AGNOJARVIS",
        text: "Let me run a diagnostic check. Are you seeing any error messages?",
        time: 1500,
      },
      { speaker: "User", text: "It just shows a blank screen", time: 3500 },
      {
        speaker: "AGNOJARVIS",
        text: "I've detected a cache issue. Clearing now... The issue should be resolved. Can you try refreshing?",
        time: 5000,
      },
      { speaker: "User", text: "It's working now! Thanks.", time: 7500 },
      {
        speaker: "AGNOJARVIS",
        text: "Glad to hear it! Let me know if you need anything else.",
        time: 9000,
      },
    ],
  },
];

export default function LiveDemo(): React.JSX.Element {
  const [activeScenario, setActiveScenario] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTranscriptIndex, setCurrentTranscriptIndex] = useState(0);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const waveformRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
    };
    loadVoices();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  const speak = (text: string, onEnd?: () => void) => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;

      const preferredVoice = voices.find(v =>
        v.name.includes('Google US English') ||
        v.name.includes('Female') ||
        v.name.includes('Samantha') ||
        v.name.includes('Victoria')
      ) || voices[0];

      if (preferredVoice) utterance.voice = preferredVoice;

      utterance.onend = () => {
        if (onEnd) onEnd();
      };

      window.speechSynthesis.speak(utterance);
    } else {
      // Fallback if speech synthesis is not supported or disabled
      if (onEnd) setTimeout(onEnd, 2000);
    }
  };

  useEffect(() => {
    const scenario = demoScenarios[activeScenario];
    const currentItem = scenario.transcript[currentTranscriptIndex];

    const proceedToNext = () => {
      const nextIndex = currentTranscriptIndex + 1;
      if (nextIndex < scenario.transcript.length) {
        setTimeout(() => {
          setCurrentTranscriptIndex(nextIndex);
        }, 1000);
      } else {
        setTimeout(() => {
          setIsPlaying(false);
        }, 2000);
      }
    };

    if (isPlaying && currentItem) {
      if (currentItem.speaker === "AGNOJARVIS") {
        speak(currentItem.text, proceedToNext);
      } else {
        const readingDelay = Math.max(1500, currentItem.text.length * 50);
        setTimeout(proceedToNext, readingDelay);
      }
    } else if (!isPlaying) {
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    }
  }, [isPlaying, currentTranscriptIndex, activeScenario]);

  const handlePlayPause = () => {
    if (!isPlaying) {
      setCurrentTranscriptIndex(0);
    }
    setIsPlaying(!isPlaying);
  };

  const WaveformBar = ({ index, isPlaying }: { index: number; isPlaying: boolean }) => {
    return (
      <motion.div
        animate={isPlaying ? {
          height: ["30%", "80%", "40%", "90%", "30%"],
        } : {
          height: "30%"
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          delay: index * 0.05,
          ease: "easeInOut"
        }}
        className="w-1 bg-gradient-to-t from-purple-600 to-blue-500 rounded-full"
      />
    );
  };

  return (
    <section id="demo" className="relative py-32 px-6 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/10 to-black" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            See AGNOJARVIS in Action
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Experience real-time AI decision making and intelligent call
            handling
          </p>
        </motion.div>

        {/* Scenario Selector */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {demoScenarios.map((scenario, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setActiveScenario(index);
                setIsPlaying(false);
                setCurrentTranscriptIndex(0);
              }}
              className={`px-6 py-3 rounded-full font-medium transition-all ${activeScenario === index
                ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/50"
                : "bg-gray-800/50 text-gray-400 hover:bg-gray-700/50"
                }`}
            >
              {scenario.title}
            </motion.button>
          ))}
        </div>

        {/* Demo Interface */}
        <motion.div
          layout
          className="max-w-4xl mx-auto bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl"
        >
          {/* Waveform Visualization */}
          <div className="mb-8 p-8 bg-black/40 rounded-2xl">
            <div className="flex items-center justify-center gap-1 h-32">
              {[...Array(50)].map((_, index) => (
                <WaveformBar key={index} index={index} isPlaying={isPlaying} />
              ))}
            </div>

            <div className="flex items-center justify-center gap-4 mt-6">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handlePlayPause}
                className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center shadow-lg shadow-purple-500/50"
              >
                {isPlaying ? (
                  <Pause className="w-6 h-6 text-white" />
                ) : (
                  <Play className="w-6 h-6 text-white ml-1" />
                )}
              </motion.button>

              <div className="flex items-center gap-2 text-gray-400">
                <Mic className="w-5 h-5" />
                <span className="text-sm font-medium">
                  {isPlaying ? "Listening..." : "Ready"}
                </span>
              </div>
            </div>
          </div>

          {/* Transcript */}
          <div className="space-y-4 max-h-96 overflow-y-auto">
            <AnimatePresence>
              {demoScenarios[activeScenario].transcript
                .slice(0, currentTranscriptIndex + 1)
                .map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.5 }}
                    className={`flex ${item.speaker === "AGNOJARVIS"
                      ? "justify-end"
                      : "justify-start"
                      }`}
                  >
                    <div
                      className={`max-w-md px-6 py-4 rounded-2xl ${item.speaker === "AGNOJARVIS"
                        ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                        : "bg-gray-800 text-gray-200"
                        }`}
                    >
                      <div className="text-xs font-semibold mb-1 opacity-70">
                        {item.speaker}
                      </div>
                      <div className="text-sm">{item.text}</div>
                    </div>
                  </motion.div>
                ))}
            </AnimatePresence>
          </div>

          {/* Scenario Info */}
          <motion.div
            layout
            className="mt-8 p-6 bg-purple-900/20 border border-purple-500/30 rounded-xl"
          >
            <h3 className="text-xl font-bold text-white mb-2">
              {demoScenarios[activeScenario].title}
            </h3>
            <p className="text-gray-400">
              {demoScenarios[activeScenario].description}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
