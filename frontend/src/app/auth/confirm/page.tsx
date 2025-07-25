"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default function ConfirmAuth() {
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const supabase = createClientComponentClient()
  
  useEffect(() => {
    async function exchangeCode() {
      try {
        const params = new URLSearchParams(window.location.search)
        const code = params.get('code')
        
        if (!code) {
          router.push('/login')
          return
        }
        
        // Intercambiar el código por una sesión
        await supabase.auth.exchangeCodeForSession(code)
        
        // Verificar si el usuario ha completado el onboarding
        const { data: { user } } = await supabase.auth.getUser()
        
        if (user) {
          // Consultar perfil del usuario
          const { data: profile } = await supabase
            .from('user_profiles')
            .select('has_completed_onboarding')
            .eq('user_id', user.id)
            .single()
          
          // Si no existe perfil, crear uno nuevo
          if (!profile) {
            await supabase.from('user_profiles').insert({
              user_id: user.id,
              has_completed_onboarding: false
            })
          }
          
          // Redirigir según el estado del onboarding
          if (profile?.has_completed_onboarding) {
            router.push('/dashboard')
          } else {
            router.push('/onboarding')
          }
        } else {
          router.push('/login')
        }
      } catch (error) {
        console.error('Error en el intercambio de código:', error)
        router.push('/login')
      }
    }
    
    exchangeCode()
  }, [router, supabase])
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Confirmando tu inicio de sesión</h1>
        <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin mx-auto"></div>
      </div>
    </div>
  )
}