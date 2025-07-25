"use client"

import { memo, useState } from "react"
import { motion, useReducedMotion, Variants } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Scale, Ruler, AlertCircle, type LucideIcon } from "lucide-react"
import { z } from "zod"

/* ---------------------------------- */
/*  Constantes & tipos fuera del comp */
/* ---------------------------------- */

const WEIGHT_MIN = 30
const WEIGHT_MAX = 300
const HEIGHT_MIN = 100
const HEIGHT_MAX = 250

const containerVariants: Variants = {
  hidden: { opacity: 0, x: 100 },
  show: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -100 },
}

const floatTransition = {
  duration: 12,
  repeat: Infinity,
  ease: "easeInOut",
}

type Errors = { weight?: string; height?: string }

const UserDataSchema = z.object({
  weight: z
    .number({ invalid_type_error: "Ingresa un número válido" })
    .min(WEIGHT_MIN, `El peso debe estar entre ${WEIGHT_MIN} y ${WEIGHT_MAX} kg`)
    .max(WEIGHT_MAX, `El peso debe estar entre ${WEIGHT_MIN} y ${WEIGHT_MAX} kg`),
  height: z
    .number({ invalid_type_error: "Ingresa un número válido" })
    .min(HEIGHT_MIN, `La altura debe estar entre ${HEIGHT_MIN} y ${HEIGHT_MAX} cm`)
    .max(HEIGHT_MAX, `La altura debe estar entre ${HEIGHT_MIN} y ${HEIGHT_MAX} cm`),
})

export interface UserDataStepProps {
  onNext: (data: { weight: number; height: number }) => void
  onBack: () => void
}

/* ---------------------------------- */
/*       Validación desacoplada       */
/* ---------------------------------- */

function validateUserData(weight: string, height: string): { data?: { weight: number; height: number }; errors: Errors } {
  const weightNum = Number.parseFloat(weight)
  const heightNum = Number.parseFloat(height)

  const parsed = UserDataSchema.safeParse({ weight: weightNum, height: heightNum })

  if (!parsed.success) {
    const errors: Errors = {}
    parsed.error.issues.forEach((issue) => {
      if (issue.path[0] === "weight") errors.weight = issue.message
      if (issue.path[0] === "height") errors.height = issue.message
    })
    return { errors }
  }

  return { data: parsed.data, errors: {} }
}

/* ---------------------------------- */
/*            Componente              */
/* ---------------------------------- */

function UserDataStepComponent({ onNext, onBack }: UserDataStepProps) {
  const [weight, setWeight] = useState("")
  const [height, setHeight] = useState("")
  const [errors, setErrors] = useState<Errors>({})
  const reduceMotion = useReducedMotion()

  const handleSubmit = () => {
    const { data, errors } = validateUserData(weight, height)
    setErrors(errors)
    if (data) onNext(data)
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
          className="absolute top-32 left-16"
          animate={reduceMotion ? {} : { rotate: 360, scale: [1, 1.2, 1] }}
          transition={{ ...floatTransition }}
        >
          <Scale className="w-10 h-10 text-blue-400/15" />
        </motion.div>

        <motion.div
          className="absolute bottom-32 right-20"
          animate={reduceMotion ? {} : { rotate: -360, y: [-15, 15, -15] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
          <Ruler className="w-8 h-8 text-purple-400/15" />
        </motion.div>
      </div>

      <div className="relative z-10 max-w-md mx-auto w-full">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: reduceMotion ? 0 : 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
          className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl"
          animate={reduceMotion ? {} : { rotate: [0, 10, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          >
            <Scale className="w-8 h-8 text-white" />
          </motion.div>

          <h2 className="text-3xl md:text-4xl font-bold mb-4">Datos básicos</h2>
          <p className="text-gray-300 text-lg">Necesitamos algunos datos para personalizar tu experiencia</p>
        </motion.div>

        {/* Formulario */}
        <motion.div
          className="space-y-8"
          initial={{ opacity: 0, y: reduceMotion ? 0 : 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Field
            id="weight"
            label="Peso (kg)"
            icon={Scale}
            iconColor="text-blue-400"
            value={weight}
            onChange={setWeight}
            error={errors.weight}
            placeholder="Ej: 70"
            focusColor="focus:border-blue-400"
          />

          <Field
            id="height"
            label="Altura (cm)"
            icon={Ruler}
            iconColor="text-purple-400"
            value={height}
            onChange={setHeight}
            error={errors.height}
            placeholder="Ej: 175"
            focusColor="focus:border-purple-400"
          />
        </motion.div>

        {/* Navegación */}
        <motion.div
          className="flex gap-4 mt-12"
          initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <motion.div whileHover={reduceMotion ? {} : { scale: 1.05 }} whileTap={reduceMotion ? {} : { scale: 0.95 }} className="flex-1">
            <Button
              onClick={onBack}
              variant="outline"
              size="lg"
              className="w-full border-white/30 text-white hover:bg-white/10 py-3 rounded-xl backdrop-blur-sm bg-transparent"
            >
              Atrás
            </Button>
          </motion.div>

          <motion.div whileHover={reduceMotion ? {} : { scale: 1.05 }} whileTap={reduceMotion ? {} : { scale: 0.95 }} className="flex-1">
            <Button
              onClick={handleSubmit}
              size="lg"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-xl shadow-xl"
            >
              Siguiente
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default memo(UserDataStepComponent)

/* ---------------------------------- */
/*      Sub-componente: Field         */
/* ---------------------------------- */

interface FieldProps {
  id: string
  label: string
  icon: LucideIcon
  iconColor: string
  value: string
  onChange: (v: string) => void
  error?: string
  placeholder?: string
  focusColor?: string
}

function Field({
  id,
  label,
  icon: Icon,
  iconColor,
  value,
  onChange,
  error,
  placeholder,
  focusColor = "focus:border-blue-400",
}: FieldProps) {
  const reduceMotion = useReducedMotion()

  return (
    <div className="space-y-3">
      <Label htmlFor={id} className="text-white text-lg font-medium flex items-center">
        <Icon className={`w-5 h-5 mr-2 ${iconColor}`} />
        {label}
      </Label>
      <motion.div whileFocus={reduceMotion ? {} : { scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
        <Input
          id={id}
          type="number"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`bg-white/10 border-white/20 text-white placeholder:text-gray-400 text-lg py-3 rounded-xl backdrop-blur-sm focus:bg-white/15 ${focusColor}`}
          inputMode="decimal"
        />
      </motion.div>
      {error && (
        <motion.div
          className="flex items-center text-red-400 text-sm"
          initial={{ opacity: 0, x: reduceMotion ? 0 : -10 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <AlertCircle className="w-4 h-4 mr-1" />
          {error}
        </motion.div>
      )}
    </div>
  )
}
