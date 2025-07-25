"use client"

import { memo, useState, KeyboardEvent } from "react"
import { motion, useReducedMotion, Variants } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  Armchair,
  Footprints as Walk,
  Zap,
  Activity,
  type LucideIcon,
} from "lucide-react"
import { z } from "zod"

/* ---------------------------------- */
/*           Tipos & Zod              */
/* ---------------------------------- */

export const ActivityLevelSchema = z.enum(["sedentary", "moderate", "active"])
export type ActivityLevel = z.infer<typeof ActivityLevelSchema>

interface ActivityLevelStepProps {
  onNext: (level: ActivityLevel) => void
  onBack: () => void
}

/* ---------------------------------- */
/*       Constantes / Config          */
/* ---------------------------------- */

interface ActivityLevelOption {
  id: ActivityLevel
  title: string
  description: string
  details: string
  icon: LucideIcon
  color: string
  bgColor: string
  borderColor: string
  hoverColor: string
}

const ACTIVITY_LEVELS: ActivityLevelOption[] = [
  {
    id: "sedentary",
    title: "Sedentario",
    description: "Poco o ningún ejercicio, trabajo de oficina",
    details: "0-1 días de ejercicio por semana",
    icon: Armchair,
    color: "from-gray-500 to-slate-500",
    bgColor: "bg-gray-500/10",
    borderColor: "border-gray-400/30",
    hoverColor: "hover:bg-gray-500/20",
  },
  {
    id: "moderate",
    title: "Moderado",
    description: "Ejercicio ligero o deportes 1-3 días por semana",
    details: "Caminatas, ejercicio ocasional",
    icon: Walk,
    color: "from-yellow-500 to-orange-500",
    bgColor: "bg-yellow-500/10",
    borderColor: "border-yellow-400/30",
    hoverColor: "hover:bg-yellow-500/20",
  },
  {
    id: "active",
    title: "Activo",
    description: "Ejercicio moderado 3-5 días por semana",
    details: "Gimnasio regular, deportes, entrenamientos",
    icon: Zap,
    color: "from-green-500 to-emerald-500",
    bgColor: "bg-green-500/10",
    borderColor: "border-green-400/30",
    hoverColor: "hover:bg-green-500/20",
  },
] as const

const containerVariants: Variants = {
  hidden: { opacity: 0, x: 100 },
  show: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -100 },
}

/* ---------------------------------- */
/*            Componente              */
/* ---------------------------------- */

function ActivityLevelStepComponent({ onNext, onBack }: ActivityLevelStepProps) {
  const [selectedLevel, setSelectedLevel] = useState<ActivityLevel | null>(null)
  const reduceMotion = useReducedMotion()

  const handleFinish = () => {
    if (!selectedLevel) return
    const parsed = ActivityLevelSchema.safeParse(selectedLevel)
    if (parsed.success) onNext(parsed.data)
  }

  const handleKeySelect = (e: KeyboardEvent<HTMLDivElement>, id: ActivityLevel) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      setSelectedLevel(id)
    }
  }

  return (
    <motion.div
      className="relative flex flex-col items-center justify-center min-h-[100dvh] text-white px-4"
      variants={containerVariants}
      initial="hidden"
      animate="show"
      exit="exit"
      transition={{ duration: 0.6 }}
    >
      {/* Elementos flotantes */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-32 left-32"
          animate={
            reduceMotion ? {} : { rotate: 360, scale: [1, 1.3, 1] }
          }
          transition={{ duration: 10, repeat: Infinity }}
        >
          <Activity className="w-8 h-8 text-green-400/15" />
        </motion.div>

        <motion.div
          className="absolute bottom-40 right-24"
          animate={
            reduceMotion ? {} : { rotate: -360, y: [-10, 10, -10] }
          }
          transition={{ duration: 8, repeat: Infinity }}
        >
          <Zap className="w-10 h-10 text-yellow-400/15" />
        </motion.div>
      </div>

      <div className="relative z-10 max-w-2xl mx-auto w-full">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: reduceMotion ? 0 : 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl"
            animate={reduceMotion ? {} : { rotate: [0, 20, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <Activity className="w-8 h-8 text-white" />
          </motion.div>

          <h2 className="text-3xl md:text-4xl font-bold mb-4">Nivel de actividad</h2>
          <p className="text-gray-300 text-lg">¿Qué tan activo eres actualmente?</p>
        </motion.div>

        {/* Opciones de nivel de actividad */}
        <motion.div
          role="radiogroup"
          aria-label="Nivel de actividad"
          className="space-y-4 mb-12"
          initial={{ opacity: 0, y: reduceMotion ? 0 : 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {ACTIVITY_LEVELS.map((level, index) => {
            const isSelected = selectedLevel === level.id

            const baseClasses =
              "relative p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 backdrop-blur-sm outline-none"
            const stateClasses = isSelected
              ? `${level.bgColor} ${level.borderColor.replace("/30", "")} shadow-xl`
              : `bg-white/5 border-white/10 ${level.hoverColor}`

            return (
              <motion.div
                key={level.id}
                role="radio"
                aria-checked={isSelected}
                tabIndex={0}
                onKeyDown={(e) => handleKeySelect(e, level.id)}
                className={`${baseClasses} ${stateClasses}`}
                initial={{ opacity: 0, x: reduceMotion ? 0 : -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                whileHover={reduceMotion ? {} : { scale: 1.02, y: -2 }}
                whileTap={reduceMotion ? {} : { scale: 0.98 }}
                onClick={() => setSelectedLevel(level.id)}
              >
                <div className="flex items-start space-x-4">
                  <motion.div
                    className={`w-12 h-12 bg-gradient-to-br ${level.color} rounded-xl flex items-center justify-center shadow-lg flex-shrink-0`}
                    animate={isSelected && !reduceMotion ? { rotate: [0, 15, -15, 0] } : {}}
                    transition={{ duration: 0.6 }}
                  >
                    <level.icon className="w-6 h-6 text-white" />
                  </motion.div>

                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-1">{level.title}</h3>
                    <p className="text-gray-300 text-sm mb-2">{level.description}</p>
                    <p className="text-gray-400 text-xs">{level.details}</p>
                  </div>

                  {/* Radio button visual */}
                  <motion.div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                      isSelected ? "border-white bg-white" : "border-white/30"
                    }`}
                    animate={isSelected && !reduceMotion ? { scale: [1, 1.2, 1] } : {}}
                    transition={{ duration: 0.3 }}
                  >
                    {isSelected && (
                      <motion.div
                        className="w-3 h-3 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.2 }}
                      />
                    )}
                  </motion.div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Navegación */}
        <motion.div
          className="flex gap-4"
          initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <motion.div
            whileHover={reduceMotion ? {} : { scale: 1.05 }}
            whileTap={reduceMotion ? {} : { scale: 0.95 }}
            className="flex-1"
          >
          <Button
            onClick={onBack}
            variant="outline"
            size="lg"
            className="w-full border-white/30 text-white hover:bg-white/10 py-3 rounded-xl backdrop-blur-sm bg-transparent"
          >
            Atrás
          </Button>
          </motion.div>

          <motion.div
            whileHover={reduceMotion ? {} : { scale: 1.05 }}
            whileTap={reduceMotion ? {} : { scale: 0.95 }}
            className="flex-1"
          >
            <Button
              onClick={handleFinish}
              disabled={!selectedLevel}
              size="lg"
              className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white py-3 rounded-xl shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Finalizar
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default memo(ActivityLevelStepComponent)
