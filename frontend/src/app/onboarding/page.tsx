"use client"

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import WelcomeStep from '@/components/onboarding/WelcomeStep'
import UserDataStep from '@/components/onboarding/UserDataStep'
import GoalsStep, { type GoalId } from '@/components/onboarding/GoalsStep'
import { AnimatePresence } from 'framer-motion'

export default function OnboardingPage() {
  const [step, setStep] = useState(0)
  const [userData, setUserData] = useState({
    height: '',
    weight: '',
    age: '',
    gender: '',
    goals: [] as GoalId[]
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
  const handleComplete = async (goal: GoalId) => {
    try {
      // Obtener sesión activa
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        console.error("No hay sesión activa");
        return;
      }
      
      const user = session.user;
      
      // Usar datos validados
      const profileData = {
        user_id: user.id,
        has_completed_onboarding: true,
        // Valores NULL explícitos para campos vacíos
        height: userData.height ? parseFloat(userData.height) : null,
        weight: userData.weight ? parseFloat(userData.weight) : null,
        age: userData.age ? parseInt(userData.age) : null,
        gender: userData.gender || null,
        fitness_goals: [goal]
      };
      
      // Intentar un enfoque diferente: primero UPDATE, luego INSERT si falla
      const { error: updateError } = await supabase
        .from('user_profiles')
        .update(profileData)
        .eq('user_id', user.id);
        
      // Si UPDATE falla (porque no existe), intenta INSERT
      if (updateError) {
        console.log("Error en update, intentando insert:", updateError);
        const { error: insertError } = await supabase
          .from('user_profiles')
          .insert(profileData);
          
        if (insertError) {
          console.error("Error en insert:", insertError);
          throw insertError;
        }
      }
      
      router.push('/dashboard');
    } catch (error) {
      console.error("Error capturado:", error);
    }
  }
  
  // Usar useCallback para evitar recreaciones de la función
  const handleGoalsChange = useCallback((goals: GoalId[]) => {
    setUserData(prev => ({ ...prev, goals }))
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
            onComplete={handleComplete}
            onPrevious={handlePrevious}
            onChange={handleGoalsChange} // Usa la función con useCallback
            selectedGoals={userData.goals}
          />
        )}
      </AnimatePresence>
    </div>
  )
}