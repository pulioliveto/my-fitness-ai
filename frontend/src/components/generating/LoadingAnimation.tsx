"use client"
//Componente de animación durante carga
import { motion } from 'framer-motion';
import { Zap, Dumbbell, Brain } from 'lucide-react';

export default function LoadingAnimation() {
  return (
    <motion.div 
      className="mb-8 relative"
      animate={{ 
        rotate: [0, 180, 360],
        scale: [1, 1.1, 1]
      }}
      transition={{ 
        duration: 3, 
        repeat: Infinity,
        ease: "linear" 
      }}
    >
      <div className="w-24 h-24 mx-auto relative">
        <Dumbbell className="w-16 h-16 absolute top-4 left-4 text-blue-500" />
        <Brain className="w-12 h-12 absolute bottom-0 right-0 text-purple-500" />
        <Zap className="w-10 h-10 absolute top-0 right-4 text-yellow-500" />
      </div>
    </motion.div>
  );
}