"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface FinalCTASectionProps {
  onGetStarted: () => void;
}

export const FinalCTASection = ({ onGetStarted }: FinalCTASectionProps) => (
  <motion.section
    className="py-20 px-4 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 1 }}
    viewport={{ once: true }}
  >
    <div className="max-w-4xl mx-auto text-center text-white">
      <motion.h2
        className="text-4xl md:text-6xl font-bold mb-6"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        Comienza gratis y obtén tu plan de entrenamiento
      </motion.h2>

      <motion.p
        className="text-xl md:text-2xl mb-8 text-blue-100 leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
      >
        Únete a miles de personas que ya transformaron su vida con IA
      </motion.p>

      <motion.div
        className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        viewport={{ once: true }}
      >
        <Button
          onClick={onGetStarted}
          size="lg"
          className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300"
        >
          Empezar gratis ahora
        </Button>
      </motion.div>

      <motion.div
        className="flex flex-wrap justify-center gap-6 text-sm text-blue-200"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        viewport={{ once: true }}
      >
        {["✓ Sin tarjeta de crédito", "✓ Cancela cuando quieras", "✓ Soporte 24/7"].map((text, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
            viewport={{ once: true }}
          >
            {text}
          </motion.span>
        ))}
      </motion.div>
    </div>
  </motion.section>
);
