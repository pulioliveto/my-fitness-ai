"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface FloatingElementProps {
  icon: LucideIcon;
  size?: number;
  className?: string;
  delay?: number;
  x: string;
  y: string;
}

export const FloatingElement = ({
  icon: Icon,
  size = 24,
  className = "",
  delay = 0,
  x,
  y,
}: FloatingElementProps) => (
  <motion.div
    className={`absolute ${className}`}
    style={{ left: x, top: y }}
    initial={{ opacity: 0, scale: 0 }}
    animate={{
      opacity: [0.1, 0.3, 0.1],
      scale: [1, 1.2, 1],
      rotate: [0, 360],
      y: [-20, 20, -20],
      x: [-10, 10, -10],
    }}
    transition={{
      duration: Math.random() * 10 + 15,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
    whileHover={{ scale: 1.5, opacity: 0.6 }}
  >
    <Icon size={size} className="text-blue-400/30" />
  </motion.div>
);
