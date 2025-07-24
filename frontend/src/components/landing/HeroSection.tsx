"use client";

import { motion } from "framer-motion";
import { Dumbbell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { STATS } from "@/config/landing/stats";
import { BackgroundParticles } from "./BackgroundParticles";

interface HeroSectionProps {
  onGetStarted: () => void;
}

export const HeroSection = ({ onGetStarted }: HeroSectionProps) => (
  <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
    <BackgroundParticles />

    <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/60" />

    <motion.div
      className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <motion.div
        className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-8 border border-white/20"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.15)" }}
      >
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }}>
          <Dumbbell className="w-5 h-5 text-blue-400" />
        </motion.div>
        <span className="text-sm font-medium">Powered by AI</span>
      </motion.div>

      <motion.h1
        className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.4 }}
      >
        Tu entrenador fitness con{" "}
        <motion.span
          className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
          animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          style={{ backgroundSize: "200% 200%" }}
        >
          IA
        </motion.span>
      </motion.h1>

      <motion.p
        className="text-xl md:text-2xl mb-8 text-gray-300 max-w-2xl mx-auto leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.6 }}
      >
        Rutinas y alimentación personalizadas que se adaptan a ti
      </motion.p>

      <motion.div
        className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.8 }}
      >
        <Button
          onClick={onGetStarted}
          size="lg"
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/20"
        >
          <Dumbbell className="w-5 h-5 mr-2" />
          Comenzar ahora
        </Button>

        <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg rounded-full backdrop-blur-sm bg-transparent">
          Ver demo
        </Button>
      </motion.div>

      <motion.div
        className="flex flex-wrap justify-center gap-8 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
      >
        {STATS.map((s, i) => (
          <div
            key={i}
            className="flex items-center gap-2 bg-white/5 backdrop-blur-sm rounded-full px-4 py-2"
          >
            <s.icon className={`w-4 h-4 ${s.color}`} />
            <span>{s.text}</span>
          </div>
        ))}
      </motion.div>
    </motion.div>
  </section>
);
