import { GoogleGenerativeAI } from '@google/generative-ai';
import 'cross-fetch/polyfill';

if (!globalThis.fetch) {
  // @ts-ignore
  globalThis.fetch = require('cross-fetch');
}

const initGemini = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not configured in environment variables');
  }
  return new GoogleGenerativeAI(apiKey);
};

export const genAI = initGemini();

// Use the gemini-1.5-flash model as recommended
export const geminiModel = genAI.getGenerativeModel({ 
  model: "gemini-1.5-flash",
  generationConfig: {
    maxOutputTokens: 2048,
    temperature: 0.4,
  }
}); 