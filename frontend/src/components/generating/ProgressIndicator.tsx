"use client"
//Componente de indicador de progreso
import { motion } from 'framer-motion';

interface ProgressIndicatorProps {
  progress: number;
  status: string;
}

export default function ProgressIndicator({ progress, status }: ProgressIndicatorProps) {
  return (
    <div className="w-full">
      <p className="text-gray-300 mb-2 text-center">
        {status}
      </p>
      
      <div className="w-full bg-gray-800 rounded-full h-2.5 mb-6">
        <motion.div 
          className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 h-2.5 rounded-full"
          initial={{ width: "0%" }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
      
      <p className="text-sm text-gray-400 text-center">
        {progress < 100 ? 'Generando...' : '¡Completado!'}
      </p>
    </div>
  );
}