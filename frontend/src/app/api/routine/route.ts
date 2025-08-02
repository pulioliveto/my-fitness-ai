import { NextResponse } from 'next/server';
import openai from '@/lib/api/openai';
import type { GenerateRoutineRequest, GenerateRoutineResponse } from '@/types/routine';
// Importar la función desde el archivo que ya creaste
import { getDefaultRoutine } from '@/lib/services/defaultRoutine';

export async function POST(request: Request) {
  const isDevelopment = process.env.NEXT_PUBLIC_DEVELOPMENT_MODE === 'true';
  console.log(`🚀 API: Iniciando generación de rutina ${isDevelopment ? 'en modo desarrollo' : 'con OpenAI'}`);
  
  try {
    // 1. PRIMERO: Extraer datos del request
    const userData: GenerateRoutineRequest = await request.json();
    console.log("📊 API: Datos recibidos:", JSON.stringify(userData));
    
    // 2. Validar y corregir datos
    if (!userData.fitness_goals || !Array.isArray(userData.fitness_goals) || userData.fitness_goals.length === 0) {
      console.log("⚠️ API: Corrigiendo fitness_goals vacío o inválido");
      userData.fitness_goals = ["gain_muscle"]; 
    }
    
    if (!userData.activity_level) {
      console.log("⚠️ API: Asignando activity_level predeterminado");
      userData.activity_level = "moderate";
    }
    
    console.log("🔧 API: Datos validados:", JSON.stringify(userData));
    
    // 3. DESPUÉS: Verificar modo desarrollo
    if(isDevelopment) {
      console.log("🔧 API: Modo desarrollo activado, usando rutina por defecto");
      // Ahora userData ya está definida y se puede usar
      const defaultRoutine = getDefaultRoutine(userData);
      return NextResponse.json({ routine: defaultRoutine, source: "development" }, { status: 200 });
    }
    
    // Verificar API key
    if (!process.env.OPENAI_API_KEY) {
      console.error("❌ API: No se encontró la API key de OpenAI");
      return NextResponse.json(
        { error: 'Error de configuración: API key de OpenAI no encontrada' },
        { status: 500 }
      );
    }
    
    console.log("🔑 API: API key de OpenAI configurada correctamente");
    
    // Construir prompt para OpenAI
    const prompt = `
      Genera una rutina de ejercicios personalizada basada en los siguientes datos:
      - Altura: ${userData.height || 'No especificada'} cm
      - Peso: ${userData.weight || 'No especificado'} kg
      - Edad: ${userData.age || 'No especificada'} años
      - Género: ${userData.gender || 'No especificado'}
      - Objetivos: ${userData.fitness_goals.join(', ')}
      - Nivel de actividad: ${userData.activity_level}
      
      IMPORTANTE:
      - ADAPTA LA RUTINA ESPECÍFICAMENTE PARA ${userData.gender === 'male' ? 'UN HOMBRE' : userData.gender === 'female' ? 'UNA MUJER' : 'UNA PERSONA'}.
      - ENFOCA EL PLAN EN LOS OBJETIVOS: ${userData.fitness_goals.join(', ')}.
      - AJUSTA LA INTENSIDAD SEGÚN EL NIVEL DE ACTIVIDAD: ${userData.activity_level}.
      
      Si el objetivo es ganar músculo: incluye ejercicios compuestos, series de 8-12 repeticiones, y enfatiza la progresión de peso.
      Si el objetivo es perder peso: incluye circuitos, cardio HIIT, y ejercicios que quemen más calorías.
      Si el objetivo es mejorar resistencia: incluye series más largas, descansos más cortos y ejercicios funcionales.
      
      Para nivel principiante: menos volumen, más explicaciones técnicas.
      Para nivel intermedio: volumen moderado, variación de ejercicios.
      Para nivel avanzado: mayor volumen, técnicas avanzadas como supersets o dropsets.
      
      Proporciona un plan de entrenamiento semanal detallado con:
      1. Ejercicios específicos para cada día (3-5 días por semana)
      2. Series y repeticiones para cada ejercicio
      3. Descanso recomendado entre series
      4. Consejos de nutrición básicos (5 consejos) ajustados al objetivo principal
      5. Recomendaciones para el nivel de experiencia indicado (3 consejos)
      
      Formato la respuesta en JSON con estas secciones:
      - weeklyPlan (array de objetos día)
      - nutritionTips (array de objetos consejo)
      - beginnerTips (array de objetos consejo)
    `;
    
    // Antes de llamar a OpenAI
    console.log("🤖 API: Llamando a OpenAI...");
    
    // Hacer petición a OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { 
          role: "system", 
          content: "Eres un entrenador personal experto especializado en crear planes de fitness personalizados. Responde solo en español y en el formato JSON solicitado." 
        },
        { role: "user", content: prompt }
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
    });
    
    console.log("✅ API: Respuesta recibida de OpenAI");
    
    // Extraer y validar la respuesta
    const responseContent = completion.choices[0].message.content;
    
    if (!responseContent) {
      console.error("❌ API: OpenAI devolvió respuesta vacía");
      throw new Error('La API de OpenAI no devolvió contenido');
    }
    
    console.log("🔍 API: Parseando respuesta JSON...");
    const routineData = JSON.parse(responseContent);
    console.log("✅ API: Rutina generada y parseada correctamente");
    
    // Devolver la respuesta formateada
    const response: GenerateRoutineResponse = {
      routine: routineData
    };
    
    return NextResponse.json(response);
  } catch (error: any) {
    console.error('❌ API Error:', error);
    
    // En caso de error, también usar la rutina predeterminada como respaldo
    console.log("⚠️ API: Error capturado, usando rutina predeterminada como respaldo");
    
    try {
      const userData = { fitness_goals: ["gain_muscle"], activity_level: "moderate" };
      const defaultRoutine = getDefaultRoutine(userData);
      
      return NextResponse.json({
        routine: defaultRoutine
      });
    } catch (fallbackError) {
      console.error('💥 Error crítico:', fallbackError);
      
      return NextResponse.json(
        { error: `Error al generar la rutina: ${error.message}` },
        { status: 500 }
      );
    }
  }
}

