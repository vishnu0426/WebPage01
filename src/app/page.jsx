"use client";

import { useEffect, useState } from "react";
import Hero from "../components/Hero";
import Features from "../components/Features";
import LiveDemo from "../components/LiveDemo";
import Architecture from "../components/Architecture";
import Pricing from "../components/Pricing";
import CustomCursor from "../components/CustomCursor";
import NeuralBackground from "../components/NeuralBackground";
import Navigation from "../components/Navigation";


export default function HomePage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative bg-black min-h-screen overflow-x-hidden">
      <CustomCursor />
      <NeuralBackground />
      <Navigation />

      <main className="relative z-10">
        <Hero />
        <Features />
        <Architecture />
        <LiveDemo />

        <Pricing />
      </main>
    </div>
  );
}
