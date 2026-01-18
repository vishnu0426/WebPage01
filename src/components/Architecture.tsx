"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const layers = [
    {
        id: "voice-input",
        title: "Voice Input",
        subsystems: ["ASR", "VAD", "Noise Cancellation"],
        description: "High-fidelity audio capture and real-time transcription.",
        color: "from-cyan-500 to-blue-500"
    },
    {
        id: "reasoning-layer",
        title: "Reasoning Layer",
        subsystems: ["Intent Analysis", "Context Memory", "Decision Graph"],
        description: "Multi-modal reasoning engine that understands intent and context.",
        color: "from-purple-500 to-indigo-500"
    },
    {
        id: "services-layer",
        title: "Services Layer",
        subsystems: ["CRM Sync", "Knowledge Base", "Tool Execution"],
        description: "Seamless integration with enterprise tools and data sources.",
        color: "from-blue-500 to-teal-500"
    },
    {
        id: "execution-layer",
        title: "Execution Layer",
        subsystems: ["Voice Synthesis", "Action Dispatch", "API Gateway"],
        description: "Human-like response generation and automated task execution.",
        color: "from-emerald-500 to-cyan-500"
    }
];

interface LayerProps {
    layer: {
        id: string;
        title: string;
        description: string;
        color: string;
        subsystems: string[];
    };
    index: number;
    total: number;
}

const Layer = ({ layer, index, total }: LayerProps) => {
    return (
        <div className="relative h-[60vh] flex items-center justify-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 50 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: false, amount: 0.5 }}
                transition={{ duration: 0.8 }}
                className="relative group w-full max-w-4xl"
            >
                {/* Layer Plate */}
                <div className="relative p-12 rounded-3xl bg-gradient-to-br from-white/5 to-transparent backdrop-blur-2xl border border-white/10 shadow-2xl overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br ${layer.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className={`inline-block px-4 py-1 rounded-full bg-gradient-to-r ${layer.color} text-white text-xs font-bold tracking-widest uppercase mb-6`}>
                                Layer 0{index + 1}
                            </div>
                            <h3 className="text-4xl font-bold text-white mb-4">{layer.title}</h3>
                            <p className="text-gray-400 leading-relaxed mb-8">{layer.description}</p>

                            <div className="flex flex-wrap gap-3">
                                {layer.subsystems.map((sub, i) => (
                                    <span key={i} className="px-3 py-1 rounded-md bg-white/5 border border-white/10 text-gray-300 text-sm">
                                        {sub}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="relative aspect-video bg-black/40 rounded-2xl border border-white/5 flex items-center justify-center overflow-hidden">
                            {/* Abstract visualization of the layer */}
                            <div className="absolute inset-0 opacity-20">
                                <svg width="100%" height="100%">
                                    <pattern id={`grid-${index}`} width="20" height="20" patternUnits="userSpaceOnUse">
                                        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="white" strokeWidth="0.5" />
                                    </pattern>
                                    <rect width="100%" height="100%" fill={`url(#grid-${index})`} />
                                </svg>
                            </div>
                            <motion.div
                                animate={{
                                    scale: [1, 1.1, 1],
                                    rotate: [0, 5, 0]
                                }}
                                transition={{ duration: 10, repeat: Infinity }}
                                className={`w-32 h-32 rounded-full bg-gradient-to-br ${layer.color} opacity-20 blur-2xl`}
                            />
                            <div className="relative z-10 text-white font-mono text-xs opacity-50">
                                SYSTEM_LAYER::{layer.id.toUpperCase()}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Connector Line */}
                {index < total - 1 && (
                    <div className="absolute left-1/2 -bottom-[30vh] w-px h-[30vh] bg-gradient-to-b from-white/20 to-transparent" />
                )}
            </motion.div>
        </div>
    );
};

export default function Architecture(): React.JSX.Element {
    const containerRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Signal animation
    const signalY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    return (
        <section ref={containerRef} id="architecture" className="relative bg-black py-32 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 relative">
                <div className="text-center mb-32">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent"
                    >
                        System Architecture
                    </motion.h2>
                    <div className="space-y-4">
                        <p className="text-2xl text-white font-light">Built like infrastructure.</p>
                        <p className="text-2xl text-gray-500 font-light">Designed like intelligence.</p>
                    </div>
                </div>

                {/* Vertical Signal Track */}
                <div className="absolute left-1/2 top-[500px] bottom-32 w-px bg-white/5 -translate-x-1/2 pointer-events-none">
                    <motion.div
                        style={{ top: signalY }}
                        className="absolute left-1/2 -translate-x-1/2 w-2 h-20 bg-gradient-to-b from-cyan-500 to-transparent blur-sm"
                    />
                    <motion.div
                        style={{ top: signalY }}
                        className="absolute left-1/2 -translate-x-1/2 w-1 h-10 bg-cyan-400"
                    />
                </div>

                <div className="space-y-32">
                    {layers.map((layer, index) => (
                        <Layer key={layer.id} layer={layer} index={index} total={layers.length} />
                    ))}
                </div>
            </div>
        </section>
    );
}
