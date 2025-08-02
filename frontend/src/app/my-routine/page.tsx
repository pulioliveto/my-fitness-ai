"use client"

import { useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import type { GeneratedRoutine } from '@/types/routine'
import { Dumbbell, Clock, Info, ArrowLeft } from 'lucide-react'

export default function MyRoutinePage() {
  const [routine, setRoutine] = useState<GeneratedRoutine | null>(null)
  const [loading, setLoading] = useState(true)
  const [userProfile, setUserProfile] = useState<any>(null)
  const supabase = createClientComponentClient()
  const router = useRouter()
  
  useEffect(() => {
    async function loadRoutineAndProfile() {
      try {
        // Obtener usuario actual
        const { data: { user } } = await supabase.auth.getUser()
        
        if (!user) {
          router.push('/login')
          return
        }
        
        // Obtener el perfil del usuario
        const { data: profile } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('user_id', user.id)
          .single()
          
        if (profile) {
          setUserProfile(profile)
        }
        
        // Obtener la rutina más reciente del usuario
        const { data, error } = await supabase
          .from('user_routines')
          .select('routine_data')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(1)
          .single()
          
        if (error) {
          console.error('Error al cargar rutina:', error)
          return
        }
        
        if (data) {
          console.log("⚠️ Estructura de datos recibida:", JSON.stringify(data, null, 2));
          
          // Función adaptadora para transformar datos en español a inglés
          function adaptRoutineData(rawData: any): GeneratedRoutine {
            if (!rawData || !rawData.routine_data) return null;
            
            const routineData = rawData.routine_data;
            
            // Transformar el plan semanal
            const weeklyPlan = routineData.weeklyPlan?.map((day: any) => ({
              day: day.dia || day.day || "", // Usar día español o inglés si existe
              focus: day.focus || day.enfoque || "Entrenamiento general", // Valor por defecto
              exercises: (day.ejercicios || day.exercises || []).map((exercise: any) => ({
                name: exercise.nombre || exercise.name || "",
                sets: exercise.series || exercise.sets || 0,
                reps: exercise.repeticiones || exercise.reps || "",
                rest: exercise.descanso_segundos ? `${exercise.descanso_segundos} segundos` : 
                      exercise.descanso || exercise.rest || "",
                muscleGroup: exercise.grupoMuscular || exercise.muscleGroup || "General",
                description: exercise.descripcion || exercise.description || ""
              })),
              notes: day.notas || day.notes || ""
            })) || [];
            
            // Transformar consejos de nutrición
            const nutritionTips = (routineData.nutritionTips || []).map((tip: any) => ({
              title: tip.titulo || tip.title || "Consejo de nutrición",
              description: tip.consejo || tip.descripcion || tip.description || ""
            }));
            
            // Transformar consejos para principiantes
            const beginnerTips = (routineData.beginnerTips || []).map((tip: any) => ({
              title: tip.titulo || tip.title || "Consejo útil",
              description: tip.consejo || tip.descripcion || tip.description || ""
            }));
            
            return {
              weeklyPlan,
              nutritionTips,
              beginnerTips
            };
          }
          
          // Usar el adaptador antes de establecer los datos
          const adaptedRoutine = adaptRoutineData(data);
          console.log("✅ Datos adaptados:", adaptedRoutine);
          setRoutine(adaptedRoutine);
        }
      } catch (error) {
        console.error('Error:', error)
      } finally {
        setLoading(false)
      }
    }
    
    loadRoutineAndProfile()
  }, [supabase, router])
  
  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <Dumbbell className="h-12 w-12 text-blue-500 mb-4" />
          <p className="text-white text-xl">Cargando tu rutina personalizada...</p>
        </div>
      </div>
    )
  }
  
  if (!routine) {
    return (
      <div className="min-h-screen bg-black p-4">
        <div className="max-w-4xl mx-auto text-white">
          <div className="flex items-center mb-8">
            <button 
              onClick={() => router.push('/dashboard')} 
              className="mr-4 p-2 rounded-full bg-gray-800 hover:bg-gray-700"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <h1 className="text-3xl font-bold">Mi Rutina</h1>
          </div>
          
          <div className="bg-gray-900 p-6 rounded-lg text-center">
            <Info className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-xl font-medium mb-4">No se encontró ninguna rutina</h2>
            <p className="mb-6">Aún no tienes una rutina personalizada generada.</p>
            <button 
              onClick={() => router.push('/generating-routine')}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-md font-medium"
            >
              Generar mi rutina personalizada
            </button>
          </div>
        </div>
      </div>
    )
  }
  
  // Determinar la etiqueta según el objetivo principal
  const getGoalTag = () => {
    if (!userProfile?.fitness_goals?.length) return null;
    
    const mainGoal = userProfile.fitness_goals[0];
    
    const goalColors: {[key: string]: {bg: string, text: string}} = {
      'gain_muscle': {bg: 'bg-blue-900', text: 'text-blue-200'},
      'lose_weight': {bg: 'bg-green-900', text: 'text-green-200'},
      'improve_fitness': {bg: 'bg-purple-900', text: 'text-purple-200'},
      'build_strength': {bg: 'bg-red-900', text: 'text-red-200'},
      'increase_endurance': {bg: 'bg-yellow-900', text: 'text-yellow-200'}
    };
    
    const goalNames: {[key: string]: string} = {
      'gain_muscle': 'Ganar Músculo',
      'lose_weight': 'Perder Peso',
      'improve_fitness': 'Mejorar Condición',
      'build_strength': 'Aumentar Fuerza',
      'increase_endurance': 'Aumentar Resistencia'
    };
    
    const colors = goalColors[mainGoal] || {bg: 'bg-gray-900', text: 'text-gray-200'};
    
    return (
      <span className={`${colors.bg} ${colors.text} text-sm px-3 py-1 rounded-full`}>
        {goalNames[mainGoal] || mainGoal}
      </span>
    );
  };
  
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-5xl mx-auto p-4">
        {/* Header con navegación */}
        <div className="flex items-center mb-6">
          <button 
            onClick={() => router.push('/dashboard')} 
            className="mr-4 p-2 rounded-full bg-gray-800 hover:bg-gray-700"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-3xl font-bold">Mi Rutina Personalizada</h1>
            <div className="flex items-center mt-2 space-x-3">
              {getGoalTag()}
              <span className="text-sm text-gray-400">
                {userProfile?.activity_level && (
                  <>Nivel: {userProfile.activity_level}</>
                )}
              </span>
            </div>
          </div>
        </div>
        
        {/* Plan Semanal */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Dumbbell className="h-6 w-6 mr-2 text-blue-500" />
            Plan Semanal
          </h2>
          <div className="space-y-6">
            {routine?.weeklyPlan ? (
              routine.weeklyPlan.map((day, index) => (
                <div key={index} className="bg-gray-900 p-5 rounded-lg shadow-lg">
                  <h3 className="text-xl font-medium mb-4 border-b border-gray-700 pb-2">
                    {day.day} - <span className="text-blue-400">{day.focus}</span>
                  </h3>
                  <div className="space-y-4">
                    {day.exercises.map((exercise, exIndex) => (
                      <div key={exIndex} className="bg-gray-800 p-4 rounded-lg">
                        <h4 className="font-medium text-lg">{exercise.name}</h4>
                        <div className="grid grid-cols-3 gap-2 mt-2 text-sm">
                          <div className="bg-gray-700 p-2 rounded text-center">
                            <span className="block text-gray-400">Series</span>
                            <span className="font-medium">{exercise.sets}</span>
                          </div>
                          <div className="bg-gray-700 p-2 rounded text-center">
                            <span className="block text-gray-400">Reps</span>
                            <span className="font-medium">{exercise.reps}</span>
                          </div>
                          <div className="bg-gray-700 p-2 rounded text-center">
                            <span className="block text-gray-400">Descanso</span>
                            <span className="font-medium">{exercise.rest}</span>
                          </div>
                        </div>
                        {exercise.description && (
                          <p className="text-gray-400 text-sm mt-3 bg-gray-850 p-2 rounded">
                            {exercise.description}
                          </p>
                        )}
                        <div className="text-xs text-gray-500 mt-2">
                          Grupo muscular: {exercise.muscleGroup}
                        </div>
                      </div>
                    ))}
                  </div>
                  {day.notes && (
                    <div className="mt-4 text-sm bg-blue-900/30 border border-blue-800 p-3 rounded">
                      <span className="font-medium text-blue-400">Nota:</span> {day.notes}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="bg-gray-900 p-5 rounded-lg">
                <p className="text-center text-red-400">No se pudo cargar el plan semanal</p>
                <div className="mt-4 flex justify-center">
                  <button 
                    onClick={() => router.push('/generating-routine')} 
                    className="px-4 py-2 bg-blue-600 rounded"
                  >
                    Regenerar rutina
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Consejos en Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Consejos de nutrición */}
          <div>
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <Clock className="h-6 w-6 mr-2 text-green-500" />
              Consejos de Nutrición
            </h2>
            <div className="space-y-4">
              {routine?.nutritionTips ? (
                routine.nutritionTips.map((tip, index) => (
                  <div key={index} className="bg-gray-800 p-4 rounded-lg">
                    <h4 className="font-medium text-green-400">{tip.title}</h4>
                    <p className="text-gray-300 text-sm mt-1">{tip.description}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-400">No hay consejos de nutrición disponibles</p>
              )}
            </div>
          </div>
          
          {/* Consejos para principiantes */}
          <div>
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <Info className="h-6 w-6 mr-2 text-yellow-500" />
              Consejos {userProfile?.activity_level === 'Principiante' ? 'para Principiantes' : 'Útiles'}
            </h2>
            <div className="space-y-4">
              {routine?.beginnerTips ? (
                routine.beginnerTips.map((tip, index) => (
                  <div key={index} className="bg-gray-800 p-4 rounded-lg">
                    <h4 className="font-medium text-yellow-400">{tip.title}</h4>
                    <p className="text-gray-300 text-sm mt-1">{tip.description}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-400">No hay consejos disponibles</p>
              )}
            </div>
          </div>
        </div>
        
        {/* Botones de acción */}
        <div className="flex flex-wrap justify-center gap-4 mt-10 mb-8">
          <button 
            onClick={() => window.print()} 
            className="px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-md font-medium"
          >
            Imprimir rutina
          </button>
          <button 
            onClick={() => router.push('/generating-routine')} 
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-md font-medium"
          >
            Generar nueva rutina
          </button>
        </div>
      </div>
    </div>
  )
}