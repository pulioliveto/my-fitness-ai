"use client"

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import WelcomeStep from '@/components/onboarding/WelcomeStep'
import UserDataStep from '@/components/onboarding/UserDataStep'
import GoalsStep, { type GoalId } from '@/components/onboarding/GoalsStep'
import ActivityLevelStep from '@/components/onboarding/ActivityLevelStep'
import { AnimatePresence } from 'framer-motion'

export default function OnboardingPage() {
  const [step, setStep] = useState(0)
  const [userData, setUserData] = useState({
    height: '',
    weight: '',
    age: '',
    gender: '',
    goals: [] as GoalId[],
    activityLevel: ''
  })
  const [userName, setUserName] = useState('')
  const router = useRouter()
  
  // Verificar si el usuario está autenticado
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        router.push('/login')
      }
    }
    
    checkAuth()
  }, [router])
  
  // Obtener el nombre del usuario al cargar la página
  useEffect(() => {
    const getUserName = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (user) {
        // Intentar obtener el nombre del usuario de diferentes fuentes
        const name = user.user_metadata?.full_name || 
                    user.user_metadata?.name ||
                    user.email?.split('@')[0] ||
                    'amigo'
                    
        setUserName(name)
      }
    }
    
    getUserName()
  }, [])
  
  // Avanzar al siguiente paso
  const handleNext = () => {
    setStep(prev => prev + 1)
  }
  
  // Volver al paso anterior
  const handlePrevious = () => {
    setStep(prev => prev - 1)
  }
  
  // Completar onboarding con el objetivo final
  const handleComplete = async (activityLevel: string) => {
    try {
      console.log("Iniciando guardado con nivel:", activityLevel);
      console.log("Estado actual userData:", userData);
      
      // Obtener sesión
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError) {
        console.error("Error obteniendo sesión:", sessionError);
        return;
      }
      
      if (!session) {
        console.error("No hay sesión activa");
        return;
      }
      
      // Crear un objeto con tipos explícitos para evitar problemas
      const profileData = {
        user_id: session.user.id,
        fitness_goals: userData.goals, // Asegurando que sea un array
        activity_level: activityLevel, // El valor seleccionado
        height: userData.height ? parseFloat(userData.height) : null,
        weight: userData.weight ? parseFloat(userData.weight) : null,
        age: userData.age ? parseInt(userData.age) : null,
        gender: userData.gender || null,
        has_completed_onboarding: true
      };
      
      console.log("Datos a guardar:", JSON.stringify(profileData));
      
      // Intenta un enfoque más simple: primero verifica si el perfil existe
      const { data: existingProfile, error: checkError } = await supabase
        .from('user_profiles')
        .select('id')
        .eq('user_id', session.user.id)
        .single();
        
      if (checkError && checkError.code !== 'PGRST116') { // PGRST116 = no results found
        console.error("Error verificando perfil existente:", checkError);
      }
      
      // Decide si hacer update o insert
      let result;
      if (existingProfile) {
        console.log("Actualizando perfil existente");
        result = await supabase
          .from('user_profiles')
          .update(profileData)
          .eq('user_id', session.user.id);
      } else {
        console.log("Creando nuevo perfil");
        result = await supabase
          .from('user_profiles')
          .insert(profileData);
      }
      
      if (result.error) {
        console.error("Error en operación de BD:", result.error);
        throw result.error;
      }
      
      console.log("Perfil guardado exitosamente");
      router.push('/generating-routine');
    } catch (error) {
      console.error("Error completo:", error);
      // Mostrar mensaje al usuario
      alert("Hubo un problema al guardar tus datos. Por favor intenta nuevamente.");
    }
  }
  
  // Usar useCallback para evitar recreaciones de la función
  const handleGoalsChange = useCallback((goals: GoalId[]) => {
    setUserData(prev => ({ ...prev, goals }))
  }, []);
  
  const handleActivityLevelChange = useCallback((activityLevel: string) => {
    setUserData(prev => ({ ...prev, activityLevel }))
  }, []);
  
  return (
    <div className="min-h-screen bg-black">
      <AnimatePresence mode="wait">
        {step === 0 && (
          <WelcomeStep 
            key="welcome"
            userName={userName}  // Aquí pasamos el nombre
            onNext={handleNext} 
          />
        )}
        
        {step === 1 && (
          <UserDataStep 
            key="userData"
            onNext={handleNext}
            onPrevious={handlePrevious}
            onChange={(data) => setUserData(prev => ({ ...prev, ...data }))}
            userData={userData}
          />
        )}
        
        {step === 2 && (
          <GoalsStep 
            key="goals"
            onComplete={handleNext}
            onPrevious={handlePrevious}
            onChange={handleGoalsChange} // Usa la función con useCallback
            selectedGoals={userData.goals}
          />
        )}
        {step === 3 && (
          <ActivityLevelStep 
            key="activityLevel"
            onComplete={handleComplete}
            onPrevious={handlePrevious}
            onChange={handleActivityLevelChange} // Usa la función con useCallback
            selectedActivityLevel={userData.activityLevel}
          />
        )}
      </AnimatePresence>
    </div>
  )
}