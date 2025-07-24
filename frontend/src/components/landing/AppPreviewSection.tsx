"use client";

import { motion } from "framer-motion";
import { MOCKUPS } from "@/config/landing/mockups";

export const AppPreviewSection = () => (
  <section className="py-20 px-4 bg-white">
    <div className="max-w-6xl mx-auto">
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Así funciona tu entrenador IA</h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Una experiencia simple y poderosa en la palma de tu mano
        </p>
      </motion.div>

      <motion.div
        className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-8 md:p-12 shadow-2xl"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="grid md:grid-cols-3 gap-8 items-center">
          {MOCKUPS.map((mockup, index) => (
          <motion.div
            key={index}
            className="bg-black rounded-3xl p-2 shadow-xl"
            initial={{ opacity: 0, y: 50, rotate: mockup.rotation * 2 }}
            whileInView={{ opacity: 1, y: 0, rotate: mockup.rotation }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            whileHover={{ rotate: 0, scale: 1.05 }}
            viewport={{ once: true }}
          >
            <div className="bg-white rounded-2xl p-6 h-96">
              <div className="text-center space-y-4">
                <motion.div
                  className={`w-12 h-12 bg-gradient-to-br ${mockup.color} rounded-full mx-auto flex items-center justify-center shadow-lg`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <mockup.icon className="w-6 h-6 text-white" />
                </motion.div>
                <h3 className="font-bold text-gray-900">{mockup.title}</h3>
                <div className="space-y-2">
                  <motion.div
                    className="h-2 bg-gray-200 rounded"
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                  />
                  <motion.div
                    className="h-2 bg-gray-200 rounded w-3/4"
                    initial={{ width: 0 }}
                    whileInView={{ width: "75%" }}
                    transition={{ duration: 1, delay: 0.7 + index * 0.1 }}
                  />
                  <motion.div
                    className={`h-2 rounded w-1/2 ${mockup.barColor}`}
                    initial={{ width: 0 }}
                    whileInView={{ width: "50%" }}
                    transition={{ duration: 1, delay: 0.9 + index * 0.1 }}
                  />
                </div>
                <img
                  src={`/placeholder.svg?height=200&width=150&text=${mockup.title.replace(" ", "+")}`}
                  alt={`${mockup.title} de la app`}
                  className="w-full h-32 object-cover rounded-lg"
                />
              </div>
            </div>
          </motion.div>
        ))}
        </div>
      </motion.div>
    </div>
  </section>
);
