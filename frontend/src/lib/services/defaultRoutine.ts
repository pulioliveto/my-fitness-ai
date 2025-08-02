import type { GenerateRoutineRequest, GeneratedRoutine } from '@/types/routine';

/**
 * Genera una rutina predeterminada basada en los datos del usuario
 * Este archivo es temporal y puede eliminarse cuando la API de OpenAI esté disponible
 */
export function getDefaultRoutine(userData: GenerateRoutineRequest): GeneratedRoutine {
  // Adaptar según el objetivo principal
  const mainGoal = userData.fitness_goals[0] || "gain_muscle";
  const gender = userData.gender || "neutral";
  const level = userData.activity_level || "moderate";
  
  return {
    weeklyPlan: [
      {
        day: "Lunes",
        focus: mainGoal === "gain_muscle" ? "Pecho y Tríceps" : 
               mainGoal === "lose_weight" ? "Full Body HIIT" : "Resistencia Superior",
        exercises: [
          {
            name: gender === "female" ? "Press de banca con mancuernas" : "Press de banca",
            sets: level === "beginner" ? 3 : level === "moderate" ? 4 : 5,
            reps: mainGoal === "gain_muscle" ? "8-10" : "12-15",
            rest: mainGoal === "gain_muscle" ? "90 segundos" : "60 segundos",
            muscleGroup: "Pecho",
            description: "Mantén los codos a 45 grados del cuerpo y baja controladamente."
          },
          {
            name: "Fondos asistidos",
            sets: level === "beginner" ? 2 : 3,
            reps: "8-12",
            rest: "90 segundos",
            muscleGroup: "Tríceps",
            description: "Si eres principiante, usa máquina de asistencia."
          },
          {
            name: "Flexiones",
            sets: 3,
            reps: "Hasta el fallo",
            rest: "60 segundos",
            muscleGroup: "Pecho/Tríceps",
            description: "Adapta la variante a tu nivel."
          }
        ],
        notes: "Enfócate en la técnica correcta y no en el peso."
      },
      {
        day: "Miércoles",
        focus: mainGoal === "gain_muscle" ? "Espalda y Bíceps" : 
               mainGoal === "lose_weight" ? "Cardio y Core" : "Resistencia Media",
        exercises: [
          {
            name: "Dominadas asistidas",
            sets: level === "beginner" ? 3 : 4,
            reps: "6-8",
            rest: "90 segundos",
            muscleGroup: "Espalda",
            description: "Usa banda elástica si eres principiante."
          },
          {
            name: "Remo con mancuerna",
            sets: 3,
            reps: "10-12",
            rest: "60 segundos",
            muscleGroup: "Espalda",
            description: "Mantén la espalda recta durante todo el movimiento."
          },
          {
            name: "Curl de bíceps",
            sets: 3,
            reps: "12",
            rest: "60 segundos",
            muscleGroup: "Bíceps",
            description: "Evita balancear el cuerpo."
          }
        ]
      },
      {
        day: "Viernes",
        focus: mainGoal === "gain_muscle" ? "Piernas y Hombros" : 
               mainGoal === "lose_weight" ? "Circuito Quema Grasa" : "Resistencia Inferior",
        exercises: [
          {
            name: "Sentadillas",
            sets: level === "beginner" ? 3 : 4,
            reps: mainGoal === "gain_muscle" ? "8-10" : "15-20",
            rest: "90 segundos",
            muscleGroup: "Piernas",
            description: "Baja hasta que tus muslos estén paralelos al suelo."
          },
          {
            name: "Peso muerto rumano",
            sets: level === "beginner" ? 3 : 4,
            reps: "10-12",
            rest: "90 segundos",
            muscleGroup: "Isquiotibiales/Glúteos",
            description: "Mantén la espalda recta y baja controladamente."
          },
          {
            name: "Press de hombro",
            sets: 3,
            reps: "10-12",
            rest: "60 segundos",
            muscleGroup: "Hombros",
            description: "No arquees la espalda durante el movimiento."
          }
        ]
      }
    ],
    nutritionTips: [
      {
        title: mainGoal === "gain_muscle" ? "Proteína suficiente" : "Control de calorías",
        description: mainGoal === "gain_muscle" ? 
          "Consume 1.6-2g de proteína por kg de peso corporal para facilitar la recuperación muscular." : 
          "Mantén un déficit calórico moderado de 300-500 calorías para perder grasa gradualmente."
      },
      {
        title: "Hidratación",
        description: "Bebe al menos 2-3 litros de agua diariamente, aumentando la cantidad los días de entrenamiento."
      },
      {
        title: "Timing de comidas",
        description: "Consume proteínas y carbohidratos dentro de los 30-60 minutos posteriores al entrenamiento."
      },
      {
        title: "Alimentos integrales",
        description: "Prioriza alimentos no procesados como carnes magras, pescado, huevos, vegetales, frutas y granos enteros."
      }
    ],
    beginnerTips: [
      {
        title: "Técnica primero",
        description: "Enfócate en dominar la técnica correcta antes de aumentar el peso o la intensidad."
      },
      {
        title: "Progresión gradual",
        description: "Aumenta el peso o las repeticiones gradualmente cada 1-2 semanas."
      },
      {
        title: "Consistencia",
        description: "La regularidad es más importante que la intensidad. Es mejor entrenar moderadamente 3 veces por semana que intensamente solo cuando te sientas motivado."
      }
    ]
  };
}