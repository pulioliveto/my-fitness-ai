"use client"

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function Dashboard() {
  const [user, setUser] = useState(null)
  
  useEffect(() => {
    // Obtener datos del usuario
    const getUserData = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }
    
    getUserData()
  }, [])
  
  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.href = '/'
  }
  
  return (
    <div className="min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      {user && (
        <div className="bg-white p-4 rounded-lg shadow">
          <p>Bienvenido, {user.email}</p>
          <button 
            onClick={handleLogout}
            className="px-4 py-2 mt-4 bg-red-600 text-white rounded"
          >
            Cerrar sesión
          </button>
        </div>
      )}
    </div>
  )
}