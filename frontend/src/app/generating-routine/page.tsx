"use client"

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LoadingAnimation from '@/components/generating/LoadingAnimation';
import ProgressIndicator from '@/components/generating/ProgressIndicator';
import { generateRoutineForUser } from '@/lib/services/routineService';

export default function GeneratingRoutinePage() {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("Analizando tus objetivos...");
  const router = useRouter();
  
  useEffect(() => {
    let isMounted = true;
    
    // Función para simular progreso visual
    const simulateProgress = () => {
      const interval = setInterval(() => {
        if (!isMounted) {
          clearInterval(interval);
          return;
        }
        
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 1;
        });
      }, 100);
      
      return interval;
    };
    
    // Iniciar simulación de progreso
    const progressInterval = simulateProgress();
    
    // Función para generar rutina real
    const generateRoutine = async () => {
      try {
        // Esperar a que el progreso visual llegue al 30%
        await new Promise(resolve => {
          const checkProgress = setInterval(() => {
            if (!isMounted) {
              clearInterval(checkProgress);
              resolve(null);
              return;
            }
            
            if (progress >= 30) {
              clearInterval(checkProgress);
              resolve(null);
            }
          }, 100);
        });
        
        if (!isMounted) return;
        
        // Generar rutina real
        await generateRoutineForUser();
        
        // Esperar a que el progreso visual llegue al 100%
        await new Promise(resolve => {
          const finalizeProgress = setInterval(() => {
            if (!isMounted) {
              clearInterval(finalizeProgress);
              resolve(null);
              return;
            }
            
            if (progress >= 100) {
              clearInterval(finalizeProgress);
              resolve(null);
            }
          }, 100);
        });
        
        if (!isMounted) return;
        
        // PUNTO CLAVE: Cambiar la redirección aquí
        setTimeout(() => {
          if (isMounted) {
            router.push('/my-routine');
          }
        }, 1000);
      } catch (error) {
        console.error("Error generando rutina:", error);
        
        // En caso de error, también redirigir a my-routine
        setTimeout(() => {
          if (isMounted) {
            router.push('/my-routine');
          }
        }, 3000);
      }
    };
    
    // Iniciar generación real
    generateRoutine();
    
    // Limpieza
    return () => {
      isMounted = false;
      clearInterval(progressInterval);
    };
  }, [progress, router]);
  
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white p-4">
      <div className="max-w-md w-full text-center">
        <LoadingAnimation />
        
        <h1 className="text-3xl font-bold mb-4">
          Generando tu rutina personalizada
        </h1>
        
        <ProgressIndicator progress={progress} status={status} />
        
        <p className="text-sm text-gray-400 mt-8">
          Estamos usando IA para crear la rutina perfecta para tus objetivos
        </p>
      </div>
    </div>
  );
}