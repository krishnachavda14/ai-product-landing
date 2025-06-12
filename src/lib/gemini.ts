import 'isomorphic-fetch';
import { GoogleGenerativeAI, Part } from '@google/generative-ai';
import { geminiModel } from './gemini-config';
import 'cross-fetch/polyfill';

// Initialize the Gemini API with error handling
const initGemini = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not configured');
  }
  return new GoogleGenerativeAI(apiKey);
};

const genAI = initGemini();

export const enhanceImage = async (imageData: string) => {
  try {
    // Validate input image size (Gemini has a 4MB limit)
    const base64Data = imageData.replace(/^data:image\/(png|jpeg|jpg);base64,/, '');
    const binaryData = Buffer.from(base64Data, 'base64');
    
    if (binaryData.length > 4 * 1024 * 1024) {
      throw new Error('Image size exceeds 4MB limit. Please use a smaller image.');
    }

    // Create FileObject for Gemini
    const imagePart: Part = {
      inlineData: {
        data: Buffer.from(binaryData).toString('base64'),
        mimeType: "image/jpeg"
      }
    };

    // Add timeout to prevent hanging
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Request timeout')), 30000);
    });

    const prompt = `Enhance this image:
    - Improve resolution and sharpness
    - Optimize colors and contrast
    - Reduce noise
    - Keep it natural-looking
    
    Return the enhanced image as a base64 string only, no text.`;

    const resultPromise = geminiModel.generateContent([
      {
        role: "user",
        parts: [
          { text: prompt },
          imagePart
        ]
      }
    ]);

    // Race between the actual request and timeout
    const result = await Promise.race([resultPromise, timeoutPromise]);
    const response = await (result as any).response;
    let enhancedImageBase64 = response.text().trim();
    
    // Clean up the response
    enhancedImageBase64 = enhancedImageBase64
      .replace(/```.*?\n|\n```|^"|"$/g, '') // Remove code blocks and quotes
      .replace(/^data:image\/[a-z]+;base64,/i, '') // Remove any existing data URL prefix
      .trim();
    
    // Validate the base64 string
    try {
      Buffer.from(enhancedImageBase64, 'base64'); // This will throw if invalid base64
    } catch (e) {
      throw new Error('Invalid response format from the model');
    }
    
    // Add data URL prefix
    return `data:image/jpeg;base64,${enhancedImageBase64}`;
  } catch (error: any) {
    console.error('Image enhancement error:', error);
    
    // Handle specific error cases
    if (error?.message?.includes('model not found')) {
      throw new Error('The image enhancement service is currently unavailable. Please try again later.');
    } else if (error?.message?.includes('PERMISSION_DENIED')) {
      throw new Error('API key is invalid or has insufficient permissions.');
    } else if (error?.message?.includes('RESOURCE_EXHAUSTED')) {
      throw new Error('API quota exceeded. Please try again later.');
    } else if (error?.message?.includes('invalid_request')) {
      throw new Error('Invalid request format. Please check your image format and try again.');
    }
    
    throw error;
  }
}; 