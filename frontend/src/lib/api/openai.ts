import OpenAI from 'openai';

// Evitamos exponer la API key en el cliente
// Solo se utilizará en el servidor (API routes)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default openai;