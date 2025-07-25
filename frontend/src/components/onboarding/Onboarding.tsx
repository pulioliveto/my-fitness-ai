"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import WelcomeStep from "./WelcomeStep"
import UserDataStep from "./UserDataStep"
import GoalsStep from "./GoalsStep"
import ActivityLevelStep from "./ActivityLevelStep"

interface OnboardingProps {
  userName: string
  onComplete: (data: OnboardingData) => void
}

export interface OnboardingData {
  weight: number
  height: number
  goal: string
  activityLevel: string
}

export default function Onboarding({ userName, onComplete }: OnboardingProps) {
  const steps = ["welcome", "userData", "goals", "activityLevel"] as const
  const [currentStep, setCurrentStep] = useState<number>(0)
  const [onboardingData, setOnboardingData] = useState<Partial<OnboardingData>>({})

  const handleNext = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
  const handleBack = () => setCurrentStep((prev) => Math.max(prev - 1, 0))

  const updateData = (data: Partial<OnboardingData>) =>
    setOnboardingData((prev) => ({ ...prev, ...data }))

  const handleUserData = (data: { weight: number; height: number }) => {
    updateData(data)
    handleNext()
  }

  const handleGoal = (goal: string) => {
    updateData({ goal })
    handleNext()
  }

  const handleActivityLevel = (activityLevel: string) => {
    const finalData = { ...onboardingData, activityLevel } as OnboardingData
    setOnboardingData(finalData)
    onComplete(finalData)
  }

  const stepComponents = [
    <WelcomeStep key="welcome" userName={userName} onNext={handleNext} />,
    <UserDataStep key="userData" onNext={handleUserData} onBack={handleBack} />,
    <GoalsStep key="goals" onNext={handleGoal} onBack={handleBack} />,
    <ActivityLevelStep key="activityLevel" onNext={handleActivityLevel} onBack={handleBack} />,
  ]

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Efectos de fondo */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.05, 0.1, 0.05] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.1, 0.05, 0.1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>

      {/* Indicador de progreso */}
      <motion.div
        className="fixed top-8 left-1/2 -translate-x-1/2 z-50"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex space-x-2 bg-white/10 backdrop-blur-sm rounded-full p-2">
          {steps.map((_, index) => (
            <motion.div
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index <= currentStep ? "bg-blue-400" : "bg-white/20"
              }`}
              animate={index === currentStep ? { scale: [1, 1.3, 1] } : {}}
              transition={{ duration: 0.6 }}
            />
          ))}
        </div>
      </motion.div>

      {/* Contenido dinámico de los pasos */}
      <AnimatePresence mode="wait">{stepComponents[currentStep]}</AnimatePresence>
    </div>
  )
}
