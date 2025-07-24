"use client"
import { supabase } from '@/lib/supabaseClient'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Component() {
   const loginWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
    })
  }
    const handleGoogleLogin = async () => {
        try {
        await loginWithGoogle()
        } catch (error) {
        console.error('Error during Google login:', error)
        }
    }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <Card className="w-full max-w-md shadow-xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="text-center space-y-4 pb-8">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
            <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
          </div>
          <div className="space-y-2">
            <CardTitle className="text-2xl font-bold text-gray-900">Bienvenido</CardTitle>
            <CardDescription className="text-gray-600">
              Inicia sesión con tu cuenta de Google para continuar
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <Button
            onClick={handleGoogleLogin}
            className="w-full h-12 bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 shadow-sm transition-all duration-200 hover:shadow-md"
            variant="outline"
          >
            <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continuar con Google
          </Button>

          <div className="text-center">
            <p className="text-xs text-gray-500 leading-relaxed">
              Al continuar, aceptas nuestros{" "}
              <a href="#" className="text-blue-600 hover:underline">
                Términos de Servicio
              </a>{" "}
              y{" "}
              <a href="#" className="text-blue-600 hover:underline">
                Política de Privacidad
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
