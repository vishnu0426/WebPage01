"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

const features = [
  {
    id: "voice-intelligence",
    title: "Multi-Modal Voice Intelligence",
    description: "Audio waveform converts into structured intent nodes. Shows understanding beyond transcription.",
    color: "from-cyan-500 to-blue-500",
    animation: "waveform-to-nodes"
  },
  {
    id: "custom-configuration",
    title: "Custom Agent Configuration",
    description: "Customize models, voices, and create bespoke agents tailored to your specific business requirements.",
    color: "from-fuchsia-500 to-pink-500",
    animation: "custom-configuration"
  },
  {
    id: "decision-graph",
    title: "Decision Graph Reasoning",
    description: "Abstract node graph forms dynamically. Paths change based on simulated conditions.",
    color: "from-purple-500 to-indigo-500",
    animation: "dynamic-graph"
  },
  {
    id: "call-routing",
    title: "Skill-Based Call Routing",
    description: "Signals route intelligently to agents or AI. Priority visibly overrides flow.",
    color: "from-blue-500 to-teal-500",
    animation: "intelligent-routing"
  },
  {
    id: "priority-queues",
    title: "Priority Queues & Callbacks",
    description: "FIFO stacks with VIP elevation. Callback timelines animate forward in time.",
    color: "from-amber-500 to-orange-500",
    animation: "vip-elevation"
  },
  {
    id: "warm-transfers",
    title: "Warm Transfers with Context",
    description: "Conversation memory packet moves seamlessly. No reset, no repetition.",
    color: "from-emerald-500 to-teal-500",
    animation: "memory-packet"
  },
  {
    id: "sentiment-detection",
    title: "Real-Time Sentiment Detection",
    description: "System shifts tone visually. Emotion spectrum subtly reacts.",
    color: "from-rose-500 to-pink-500",
    animation: "sentiment-shift"
  },
  {
    id: "pii-detection",
    title: "PII Detection & Compliance",
    description: "Sensitive data masked in real time. Secure signal encryption visuals.",
    color: "from-cyan-400 to-indigo-600",
    animation: "pii-masking"
  },
  {
    id: "failover-reliability",
    title: "Failover & Reliability",
    description: "Signals reroute automatically. No interruption, no failure state.",
    color: "from-emerald-400 to-cyan-500",
    animation: "auto-reroute"
  },
  {
    id: "live-transcription",
    title: "Live Streaming Transcription",
    description: "Real-time audio-to-text conversion with millisecond latency. Visualizing the flow of spoken words into data.",
    color: "from-blue-400 to-indigo-600",
    animation: "live-text-flow"
  },
  {
    id: "mcp-support",
    title: "MCP Supported",
    description: "Model Context Protocol integration for seamless tool use and knowledge retrieval. Expanding AI capabilities.",
    color: "from-orange-400 to-rose-500",
    animation: "mcp-nodes"
  }
];

interface FeatureAnimationProps {
  type: string;
  active: boolean;
}

const FeatureAnimation = ({ type, active }: FeatureAnimationProps) => {
  const randomValues = useMemo(() => {
    return [...Array(8)].map(() => ({
      x: 100 + Math.random() * 200,
      y: 50 + Math.random() * 200,
      dx: (Math.random() - 0.5) * 50,
      dy: (Math.random() - 0.5) * 50,
    }));
  }, []);

  if (type === "waveform-to-nodes") {
    return (
      <div className="relative w-full h-full flex items-center justify-center">
        <AnimatePresence mode="wait">
          {!active ? (
            <motion.div
              key="waveform"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-1 h-32"
            >
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ height: [20, 80, 20] }}
                  transition={{ duration: 1, repeat: Infinity, delay: i * 0.05 }}
                  className="w-1 bg-cyan-500 rounded-full"
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="nodes"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="relative w-full h-full"
            >
              <svg viewBox="0 0 400 300" className="w-full h-full">
                <motion.circle
                  cx={200} cy={150} r={40}
                  fill="none" stroke="#06b6d4" strokeWidth="2"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                />
                {[0, 72, 144, 216, 288].map((angle, i) => {
                  const x = 200 + Math.cos((angle * Math.PI) / 180) * 100;
                  const y = 150 + Math.sin((angle * Math.PI) / 180) * 100;
                  return (
                    <g key={i}>
                      <motion.line
                        x1={200} y1={150} x2={x} y2={y}
                        stroke="#06b6d4" strokeWidth="1" strokeDasharray="5,5"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ delay: 0.5 + i * 0.1 }}
                      />
                      <motion.circle
                        cx={x} cy={y} r={15}
                        fill="#06b6d4"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 1 + i * 0.1 }}
                      />
                    </g>
                  );
                })}
              </svg>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  if (type === "dynamic-graph") {
    return (
      <div className="relative w-full h-full flex items-center justify-center">
        <svg viewBox="0 0 400 300" className="w-full h-full">
          {randomValues.map((val, i) => (
            <motion.circle
              key={i}
              cx={val.x} cy={val.y} r={8}
              fill="#8b5cf6"
              animate={{
                cx: [val.x, val.x + val.dx, val.x],
                cy: [val.y, val.y + val.dy, val.y],
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}
          <motion.path
            d="M 100 150 Q 200 50 300 150"
            fill="none" stroke="#8b5cf6" strokeWidth="2"
            animate={{ d: ["M 100 150 Q 200 50 300 150", "M 100 150 Q 200 250 300 150", "M 100 150 Q 200 50 300 150"] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
        </svg>
      </div>
    );
  }

  if (type === "custom-configuration") {
    return (
      <div className="relative w-full h-full flex items-center justify-center">
        <svg viewBox="0 0 400 300" className="w-full h-full">
          {/* Central Core */}
          <motion.circle
            cx="200" cy="150" r="30"
            fill="none" stroke="#d946ef" strokeWidth="2"
            animate={{ r: [30, 35, 30], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <circle cx="200" cy="150" r="15" fill="#d946ef" />

          {/* Orbiting Nodes */}
          {[0, 120, 240].map((angle, i) => (
            <motion.g
              key={i}
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear", delay: i * -3 }}
              style={{ originX: "200px", originY: "150px" }}
            >
              <motion.circle
                cx="200" cy="50" r="10"
                fill="#e879f9"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.line
                x1="200" y1="65" x2="200" y2="120"
                stroke="#d946ef" strokeWidth="1" strokeDasharray="4,4"
              />
            </motion.g>
          ))}

          {/* Incoming Data Particles */}
          {[...Array(6)].map((_, i) => (
            <motion.circle
              key={`particle-${i}`}
              r="2" fill="#fff"
              initial={{ cx: 200 + Math.cos(i * 60 * Math.PI / 180) * 150, cy: 150 + Math.sin(i * 60 * Math.PI / 180) * 150, opacity: 0 }}
              animate={{
                cx: 200,
                cy: 150,
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeIn"
              }}
            />
          ))}
        </svg>
      </div>
    );
  }

  if (type === "intelligent-routing") {
    return (
      <div className="relative w-full h-full">
        <svg viewBox="0 0 400 300" className="w-full h-full">
          <rect x="50" y="125" width="60" height="50" rx="10" fill="#3b82f6" fillOpacity="0.2" stroke="#3b82f6" />
          <rect x="290" y="50" width="60" height="50" rx="10" fill="#10b981" fillOpacity="0.2" stroke="#10b981" />
          <rect x="290" y="200" width="60" height="50" rx="10" fill="#3b82f6" fillOpacity="0.2" stroke="#3b82f6" />

          {[...Array(5)].map((_, i) => (
            <motion.circle
              key={i}
              r="4"
              fill="#3b82f6"
              initial={{ cx: 80, cy: 150, opacity: 0 }}
              animate={{
                cx: [80, 200, 320],
                cy: [150, 150, i % 2 === 0 ? 75 : 225],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.4,
                ease: "linear"
              }}
            />
          ))}
        </svg>
      </div>
    );
  }

  if (type === "vip-elevation") {
    return (
      <div className="relative w-full h-full flex items-end justify-center pb-10">
        <div className="flex flex-col-reverse gap-2">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="w-40 h-8 bg-gray-800 border border-white/10 rounded-lg flex items-center px-4"
              animate={active && i === 3 ? {
                y: [-100, 0],
                backgroundColor: ["#f59e0b", "#1f2937"],
                borderColor: ["#f59e0b", "rgba(255,255,255,0.1)"]
              } : { y: 0 }}
            >
              <div className="w-2 h-2 rounded-full bg-gray-600 mr-2" />
              <div className="w-20 h-2 bg-gray-700 rounded" />
            </motion.div>
          ))}
          <motion.div
            className="w-40 h-8 bg-amber-500 rounded-lg flex items-center px-4 shadow-lg shadow-amber-500/20"
            initial={{ y: 200, opacity: 0 }}
            animate={active ? { y: 0, opacity: 1 } : { y: 200, opacity: 0 }}
            transition={{ type: "spring", damping: 15 }}
          >
            <div className="w-2 h-2 rounded-full bg-white mr-2" />
            <div className="w-20 h-2 bg-white/50 rounded" />
            <div className="ml-auto text-[10px] font-bold text-white">VIP</div>
          </motion.div>
        </div>
      </div>
    );
  }

  if (type === "memory-packet") {
    return (
      <div className="relative w-full h-full flex items-center justify-center">
        <svg viewBox="0 0 400 300" className="w-full h-full">
          <circle cx="100" cy="150" r="30" fill="none" stroke="#10b981" strokeWidth="2" />
          <circle cx="300" cy="150" r="30" fill="none" stroke="#10b981" strokeWidth="2" />
          <motion.g
            animate={{ x: [0, 200, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <rect x="85" y="135" width="30" height="30" rx="5" fill="#10b981" />
            <motion.circle
              r="40" cx="100" cy="150"
              fill="url(#glow)"
              animate={{ opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.g>
          <defs>
            <radialGradient id="glow">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>
        </svg>
      </div>
    );
  }

  if (type === "sentiment-shift") {
    return (
      <div className="relative w-full h-full flex items-center justify-center">
        <motion.div
          className="w-64 h-64 rounded-full blur-3xl opacity-30"
          animate={{
            backgroundColor: active ? ["#3b82f6", "#f43f5e", "#3b82f6"] : "#3b82f6",
            scale: active ? [1, 1.2, 1] : 1
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <svg viewBox="0 0 200 100" className="w-48">
            <motion.path
              d="M 20 50 Q 100 50 180 50"
              fill="none"
              stroke="white"
              strokeWidth="4"
              strokeLinecap="round"
              animate={{
                d: active
                  ? ["M 20 70 Q 100 20 180 70", "M 20 30 Q 100 80 180 30", "M 20 70 Q 100 20 180 70"]
                  : "M 20 50 Q 100 50 180 50"
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </svg>
        </div>
      </div>
    );
  }

  if (type === "pii-masking") {
    return (
      <div className="relative w-full h-full flex flex-col items-center justify-center gap-4 px-10">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="w-full h-12 bg-gray-900 border border-white/5 rounded-lg flex items-center px-4 font-mono text-sm">
            <span className="text-gray-500 mr-4">0{i + 1}</span>
            <span className="text-gray-300">CONFIDENTIAL_DATA: </span>
            <motion.div
              className="ml-2 h-6 bg-cyan-500/20 rounded px-2 flex items-center"
              animate={active ? {
                backgroundColor: ["rgba(6,182,212,0.2)", "rgba(6,182,212,0.8)", "rgba(6,182,212,0.2)"]
              } : { backgroundColor: "rgba(6,182,212,0.2)" }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <motion.span
                animate={active ? { opacity: [1, 0, 1] } : { opacity: 1 }}
                transition={{ duration: 0.1, repeat: Infinity, repeatDelay: 0.5 }}
              >
                {active ? "••••••••••••" : "USER_ID_8829"}
              </motion.span>
            </motion.div>
          </div>
        ))}
      </div>
    );
  }

  if (type === "auto-reroute") {
    return (
      <div className="relative w-full h-full">
        <svg viewBox="0 0 400 300" className="w-full h-full">
          <motion.path
            d="M 50 150 L 350 150"
            stroke="#10b981"
            strokeWidth="2"
            strokeDasharray="10,10"
            animate={active ? { opacity: [1, 0, 1], stroke: ["#10b981", "#ef4444", "#10b981"] } : { opacity: 1, stroke: "#10b981" }}
          />
          <AnimatePresence>
            {active && (
              <motion.path
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                exit={{ opacity: 0 }}
                d="M 50 150 Q 200 50 350 150"
                stroke="#06b6d4"
                strokeWidth="3"
                fill="none"
              />
            )}
          </AnimatePresence>
          <circle cx="50" cy="150" r="10" fill="#10b981" />
          <circle cx="350" cy="150" r="10" fill="#10b981" />
        </svg>
      </div>
    );
  }

  if (type === "live-text-flow") {
    return (
      <div className="relative w-full h-full flex flex-col items-center justify-center gap-2 px-10">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: [0, 1, 0], x: [0, 40] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
            className="w-full h-4 bg-blue-500/20 rounded-full overflow-hidden"
          >
            <motion.div
              className="h-full bg-blue-500"
              animate={{ width: ["0%", "100%"] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
            />
          </motion.div>
        ))}
      </div>
    );
  }

  if (type === "mcp-nodes") {
    return (
      <div className="relative w-full h-full flex items-center justify-center">
        <svg viewBox="0 0 400 300" className="w-full h-full">
          <motion.rect
            x="175" y="125" width="50" height="50" rx="10"
            fill="none" stroke="#f43f5e" strokeWidth="2"
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          />
          {[0, 90, 180, 270].map((angle, i) => {
            const x = 200 + Math.cos((angle * Math.PI) / 180) * 80;
            const y = 150 + Math.sin((angle * Math.PI) / 180) * 80;
            return (
              <g key={i}>
                <motion.line
                  x1={200} y1={150} x2={x} y2={y}
                  stroke="#f43f5e" strokeWidth="1"
                  animate={{ opacity: [0.2, 1, 0.2] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                />
                <motion.circle
                  cx={x} cy={y} r={10}
                  fill="#f43f5e"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                />
              </g>
            );
          })}
        </svg>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex items-center justify-center bg-gray-900/50 rounded-3xl border border-white/5">
      <div className="text-gray-500 font-mono">ANIMATION: {type}</div>
    </div>
  );
};

interface FeatureBlockProps {
  feature: {
    id: string;
    title: string;
    description: string;
    color: string;
    animation: string;
  };
  index: number;
  progress: any; // progress from framer-motion useScroll
}

const FeatureBlock = ({ feature, index, progress }: FeatureBlockProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);
  const x = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [index % 2 === 0 ? -100 : 100, 0, 0, index % 2 === 0 ? -100 : 100]);

  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    return scrollYProgress.onChange(v => {
      setIsActive(v > 0.3 && v < 0.7);
    });
  }, [scrollYProgress]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, scale, x }}
      className="min-h-screen flex items-center justify-center py-20"
    >
      <div className={`max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
        <div className={index % 2 !== 0 ? 'lg:order-2' : ''}>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className={`inline-block px-4 py-1 rounded-full bg-gradient-to-r ${feature.color} text-white text-sm font-bold tracking-wider uppercase`}>
              Feature 0{index + 1}
            </div>
            <h2 className="text-5xl lg:text-7xl font-bold text-white leading-tight">
              {feature.title}
            </h2>
            <p className="text-xl text-gray-400 leading-relaxed max-w-xl">
              {feature.description}
            </p>
          </motion.div>
        </div>

        <div className={`relative aspect-square w-full max-w-xl mx-auto ${index % 2 !== 0 ? 'lg:order-1' : ''}`}>
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl backdrop-blur-3xl border border-white/10 shadow-2xl" />
          <div className="absolute inset-0 p-8">
            <FeatureAnimation type={feature.animation} active={isActive} />
          </div>

          {/* Decorative elements */}
          <div className={`absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br ${feature.color} opacity-20 blur-3xl rounded-full`} />
          <div className={`absolute -bottom-10 -left-10 w-40 h-40 bg-gradient-to-br ${feature.color} opacity-10 blur-3xl rounded-full`} />
        </div>
      </div>
    </motion.div>
  );
};

export default function Features(): React.JSX.Element {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <section ref={containerRef} id="features" className="relative bg-black">
      {/* Sticky background elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(13,20,35,1)_0%,rgba(0,0,0,1)_100%)]" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10">
        {/* Intro Section */}
        <div className="h-screen flex flex-col items-center justify-center text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-6xl md:text-8xl font-bold mb-8 bg-gradient-to-r from-white via-gray-400 to-gray-600 bg-clip-text text-transparent">
              Intelligent Capabilities
            </h2>
            <p className="text-xl md:text-2xl text-gray-500 max-w-3xl mx-auto font-light tracking-wide">
              Experience the future of enterprise communication through
              motion-first system intelligence.
            </p>
          </motion.div>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute bottom-10"
          >
            <div className="w-px h-20 bg-gradient-to-b from-transparent via-gray-700 to-transparent" />
          </motion.div>
        </div>

        {/* Feature Blocks */}
        {features.map((feature, index) => (
          <FeatureBlock
            key={feature.id}
            feature={feature}
            index={index}
            progress={scrollYProgress}
          />
        ))}

        {/* Outro / Transition to Architecture */}
        <div className="h-[50vh] flex items-center justify-center">
          <div className="w-px h-full bg-gradient-to-b from-gray-800 to-transparent" />
        </div>
      </div>
    </section>
  );
}
