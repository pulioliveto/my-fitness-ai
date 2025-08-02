import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import type { GeneratedRoutine, UserProfile } from '@/types/routine';

export async function generateRoutineForUser(): Promise<GeneratedRoutine | null> {
  const supabase = createClientComponentClient();
  
  try {
    console.log("1. Iniciando generación/recuperación de rutina...");
    
    // 1. Obtener el usuario actual
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      console.error("No se encontró usuario autenticado");
      return null;
    }
    
    console.log("2. Usuario autenticado:", user.id);
    
    // 2. NUEVO: Verificar si ya existe una rutina para este usuario
    console.log("2.1 Verificando si ya existe una rutina guardada...");
    const { data: existingRoutine, error: routineError } = await supabase
      .from('user_routines')
      .select('routine_data')
      .eq('user_id', user.id)
      .maybeSingle();
      
    if (routineError) {
      console.error("Error verificando rutina existente:", {
        message: routineError.message,
        code: routineError.code,
        details: routineError.details,
        hint: routineError.hint
      });
      // Continuar con el flujo normal si hay error
    } else if (existingRoutine && existingRoutine.routine_data) {
      // Si existe una rutina guardada, usarla en lugar de generar una nueva
      console.log("✅ 2.2 Rutina existente encontrada, usando datos guardados");
      return existingRoutine.routine_data;
    } else {
      console.log("2.2 No se encontró rutina existente, generando nueva");
    }
    
    // 3. Obtener perfil del usuario
    const { data: profile, error: profileError } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('user_id', user.id)
      .single();
      
    if (profileError) {
      console.error("Error obteniendo perfil:", profileError);
      return null;
    }
    
    if (!profile) {
      console.error("No se encontró el perfil del usuario");
      return null;
    }
    
    console.log("3. Perfil encontrado:", profile);
    
    // Asegurar que los datos mínimos necesarios existan
    if (!profile.fitness_goals || !profile.activity_level) {
      console.error("Perfil incompleto: faltan fitness_goals o activity_level");
      return null;
    }
    
    // 4. Llamar a nuestra API para generar la rutina
    console.log("4. Llamando a API de rutina...");
    const response = await fetch('/api/routine', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        height: profile.height || null,
        weight: profile.weight || null,
        age: profile.age || null,
        gender: profile.gender || null,
        fitness_goals: Array.isArray(profile.fitness_goals) ? profile.fitness_goals : ["gain_muscle"],
        activity_level: profile.activity_level || "moderate"
      }),
    });
    
    console.log("5. Respuesta API status:", response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Error en API: ${response.status}`, errorText);
      throw new Error(`Error al generar rutina: ${response.status} - ${errorText}`);
    }
    
    const data = await response.json();
    console.log("6. Datos recibidos:", data);
    
    // 5. Guardar o actualizar la rutina en Supabase
    console.log("7. Guardando en Supabase...");
    let operation;
    
    if (existingRoutine) {
      console.log("Actualizando rutina existente");
      operation = supabase
        .from('user_routines')
        .update({
          routine_data: data.routine
          // Elimina updated_at si no existe en tu tabla
        })
        .eq('user_id', user.id);
    } else {
      console.log("Creando nueva rutina");
      operation = supabase
        .from('user_routines')
        .insert({
          user_id: user.id,
          routine_data: data.routine,
          created_at: new Date().toISOString()
          // Elimina updated_at si no existe en tu tabla
        });
    }
    
    // Ejecutar la operación
    const { error: saveError } = await operation;
      
    if (saveError) {
      console.error('8. Error detallado al guardar rutina:', {
        code: saveError.code,
        message: saveError.message,
        details: saveError.details
      });
      throw new Error(`Error al guardar rutina: ${saveError.message}`);
    }
    
    console.log("✅ Rutina generada y guardada correctamente");
    return data.routine;
  } catch (error) {
    console.error('Error en generación de rutina:', error);
    return null;
  }
}

export async function saveRoutineToSupabase(userId: string, routine: GeneratedRoutine) {
  const supabase = createClientComponentClient();
  
  const { error } = await supabase
    .from('user_routines')
    .insert({
      user_id: userId,
      routine_data: routine,
      created_at: new Date().toISOString()
    });
    
  if (error) {
    throw new Error(`Error al guardar rutina: ${error.message}`);
  }
  
  return true;
}