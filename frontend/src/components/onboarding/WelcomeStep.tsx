"use client"

import { memo } from "react"
import { motion, useReducedMotion, Variants } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Dumbbell, Sparkles, Target, Zap, type LucideIcon } from "lucide-react"

interface WelcomeStepProps {
  userName: string
  onNext: () => void
}

/* ---------------------------------- */
/*  Constantes fuera del componente   */
/* ---------------------------------- */

const FEATURES: { icon: LucideIcon; text: string; color: string }[] = [
  { icon: Target, text: "Objetivos claros", color: "text-blue-400" },
  { icon: Dumbbell, text: "Rutinas adaptadas", color: "text-purple-400" },
  { icon: Zap, text: "Resultados rápidos", color: "text-pink-400" },
] as const

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -50 },
}

const iconFloatTransition = {
  duration: 8,
  repeat: Infinity,
  ease: "easeInOut",
}

const mainIconTransition = {
  duration: 4,
  repeat: Infinity,
  ease: "easeInOut",
}

/* ---------------------------------- */
/*       Sub-componente opcional      */
/* ---------------------------------- */

const FloatingBgIcons = memo(function FloatingBgIcons() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute top-20 left-20"
        animate={{ rotate: 360, y: [-10, 10, -10] }}
        transition={{ ...iconFloatTransition }}
      >
        <Dumbbell className="w-8 h-8 text-blue-400/20" />
      </motion.div>

      <motion.div
        className="absolute top-32 right-32"
        animate={{ rotate: -360, y: [10, -10, 10] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      >
        <Target className="w-6 h-6 text-purple-400/20" />
      </motion.div>

      <motion.div
        className="absolute bottom-40 left-40"
        animate={{ rotate: 360, x: [-5, 5, -5] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <Zap className="w-7 h-7 text-pink-400/20" />
      </motion.div>
    </div>
  )
})

/* ---------------------------------- */
/*           Componente main          */
/* ---------------------------------- */

function WelcomeStepComponent({ userName, onNext }: WelcomeStepProps) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      className="relative flex flex-col items-center justify-center min-h-screen text-center text-white px-4"
      variants={containerVariants}
      initial="hidden"
      animate="show"
      exit="exit"
      transition={{ duration: 0.6 }}
    >
      <FloatingBgIcons />

      <motion.div
        className="relative z-10 max-w-2xl mx-auto"
        initial={{ scale: reduceMotion ? 1 : 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {/* Icono principal animado */}
        <motion.div
          className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl"
          animate={
            reduceMotion
              ? {}
              : {
                  rotate: [0, 5, -5, 0],
                  scale: [1, 1.05, 1],
                }
          }
          transition={mainIconTransition}
        >
          <Sparkles className="w-12 h-12 text-white" />
        </motion.div>

        {/* Saludo */}
        <motion.h1
          className="text-4xl md:text-6xl font-bold mb-6"
          initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          ¡Hola{" "}
          <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            {userName}
          </span>
          !
        </motion.h1>

        {/* Texto motivador */}
        <motion.p
          className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed"
          initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Configura tu perfil para recibir{" "}
          <span className="text-blue-400 font-semibold">planes personalizados</span>{" "}
          que se adapten perfectamente a ti
        </motion.p>

        {/* Features */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12"
          initial={{ opacity: 0, y: reduceMotion ? 0 : 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {FEATURES.map((feature, index) => (
            <motion.div
              key={feature.text}
              className="flex flex-col items-center p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10"
              initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
              whileHover={reduceMotion ? {} : { scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
            >
              <feature.icon className={`w-6 h-6 ${feature.color} mb-2`} />
              <span className="text-sm font-medium">{feature.text}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <motion.div whileHover={reduceMotion ? {} : { scale: 1.05 }} whileTap={reduceMotion ? {} : { scale: 0.95 }}>
            <Button
              onClick={onNext}
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-12 py-4 text-xl font-semibold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <motion.span
                className="flex items-center"
                animate={reduceMotion ? {} : { x: [0, 2, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Comenzar
                <Sparkles className="w-5 h-5 ml-2" />
              </motion.span>
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default memo(WelcomeStepComponent)
