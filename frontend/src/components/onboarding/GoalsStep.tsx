"use client"

import { memo, useState, KeyboardEvent, useEffect } from "react"
import { motion, useReducedMotion, Variants } from "framer-motion"
import { Button } from "@/components/ui/button"
import { TrendingDown, Dumbbell, Target, Zap, type LucideIcon } from "lucide-react"
import { z } from "zod"

/* ---------------------------------- */
/*           Tipos & Zod              */
/* ---------------------------------- */

export const GoalSchema = z.enum(["lose_weight", "gain_muscle", "stay_fit"])
export type GoalId = z.infer<typeof GoalSchema>

interface GoalsStepProps {
  onComplete: (goal: GoalId) => void
  onPrevious: () => void
  onChange: (goals: GoalId[]) => void
  selectedGoals: GoalId[]
}

/* ---------------------------------- */
/*       Constantes / Config          */
/* ---------------------------------- */

interface GoalOption {
  id: GoalId
  title: string
  description: string
  icon: LucideIcon
  color: string
  bgColor: string
  borderColor: string
  hoverColor: string
}

const GOALS: GoalOption[] = [
  {
    id: "lose_weight",
    title: "Perder peso",
    description: "Quiero reducir mi peso corporal y mejorar mi composición",
    icon: TrendingDown,
    color: "from-red-500 to-pink-500",
    bgColor: "bg-red-500/10",
    borderColor: "border-red-400/30",
    hoverColor: "hover:bg-red-500/20",
  },
  {
    id: "gain_muscle",
    title: "Ganar músculo",
    description: "Quiero aumentar mi masa muscular y fuerza",
    icon: Dumbbell,
    color: "from-blue-500 to-purple-500",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-400/30",
    hoverColor: "hover:bg-blue-500/20",
  },
  {
    id: "stay_fit",
    title: "Mantenerme en forma",
    description: "Quiero mantener mi estado físico actual y estar saludable",
    icon: Target,
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

function GoalsStepComponent({ onComplete, onPrevious, onChange, selectedGoals }: GoalsStepProps) {
  // Inicializar con el primer objetivo seleccionado de selectedGoals si existe
  const [selectedGoal, setSelectedGoal] = useState<GoalId | null>(
    selectedGoals && selectedGoals.length > 0 ? selectedGoals[0] : null
  )
  const reduceMotion = useReducedMotion()

  // Cuando cambia la selección, notificar al padre
  useEffect(() => {
    if (selectedGoal) {
      onChange([selectedGoal])
    }
  }, [selectedGoal, onChange])

  const handleNext = () => {
    if (!selectedGoal) return
    onComplete(selectedGoal)
  }

  const handleKeySelect = (e: KeyboardEvent<HTMLDivElement>, id: GoalId) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      setSelectedGoal(id)
    }
  }

  return (
    <motion.div
      className="relative flex flex-col items-center justify-center min-h-screen text-white px-4"
      variants={containerVariants}
      initial="hidden"
      animate="show"
      exit="exit"
      transition={{ duration: 0.6 }}
    >
      {/* Elementos flotantes */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 right-20"
          animate={
            reduceMotion
              ? {}
              : {
                  rotate: 360,
                  y: [-20, 20, -20],
                }
          }
          transition={{ duration: 15, repeat: Infinity }}
        >
          <Target className="w-12 h-12 text-green-400/10" />
        </motion.div>

        <motion.div
          className="absolute bottom-20 left-20"
          animate={
            reduceMotion
              ? {}
              : {
                  rotate: -360,
                  x: [-15, 15, -15],
                }
          }
          transition={{ duration: 12, repeat: Infinity }}
        >
          <Zap className="w-10 h-10 text-purple-400/10" />
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
            className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl"
            animate={reduceMotion ? {} : { rotate: [0, 15, -15, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <Target className="w-8 h-8 text-white" />
          </motion.div>

          <h2 className="text-3xl md:text-4xl font-bold mb-4">¿Cuál es tu objetivo?</h2>
          <p className="text-gray-300 text-lg">Selecciona tu meta principal para personalizar tu plan</p>
        </motion.div>

        {/* Opciones */}
        <motion.div
          className="space-y-4 mb-12"
          initial={{ opacity: 0, y: reduceMotion ? 0 : 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {GOALS.map((goal, index) => {
            const isSelected = selectedGoal === goal.id
            return (
              <motion.div
                key={goal.id}
                role="radio"
                aria-checked={isSelected}
                tabIndex={0}
                onKeyDown={(e) => handleKeySelect(e, goal.id)}
                className={`relative p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 backdrop-blur-sm outline-none ${
                  isSelected
                    ? `${goal.bgColor} ${goal.borderColor.replace("/30", "")} shadow-xl`
                    : `bg-white/5 border-white/10 ${goal.hoverColor}`
                }`}
                initial={{ opacity: 0, x: reduceMotion ? 0 : -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                whileHover={reduceMotion ? {} : { scale: 1.02, y: -2 }}
                whileTap={reduceMotion ? {} : { scale: 0.98 }}
                onClick={() => setSelectedGoal(goal.id)}
              >
                <div className="flex items-center space-x-4">
                  <motion.div
                    className={`w-12 h-12 bg-gradient-to-br ${goal.color} rounded-xl flex items-center justify-center shadow-lg`}
                    animate={isSelected && !reduceMotion ? { rotate: [0, 10, -10, 0] } : {}}
                    transition={{ duration: 0.6 }}
                  >
                    <goal.icon className="w-6 h-6 text-white" />
                  </motion.div>

                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-1">{goal.title}</h3>
                    <p className="text-gray-300 text-sm">{goal.description}</p>
                  </div>

                  {/* Radio visual */}
                  <motion.div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
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
          <motion.div whileHover={reduceMotion ? {} : { scale: 1.05 }} whileTap={reduceMotion ? {} : { scale: 0.95 }} className="flex-1">
            <Button
              onClick={onPrevious}
              variant="outline"
              size="lg"
              className="w-full border-white/30 text-white hover:bg-white/10 py-3 rounded-xl backdrop-blur-sm bg-transparent"
            >
              Atrás
            </Button>
          </motion.div>

          <motion.div whileHover={reduceMotion ? {} : { scale: 1.05 }} whileTap={reduceMotion ? {} : { scale: 0.95 }} className="flex-1">
            <Button
              onClick={handleNext}
              disabled={!selectedGoal}
              size="lg"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-xl shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Siguiente
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default memo(GoalsStepComponent)
