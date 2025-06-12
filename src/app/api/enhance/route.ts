import { NextResponse } from 'next/server';
import { enhanceImage } from '@/lib/gemini';
import 'cross-fetch/polyfill';

export const maxDuration = 60; // Set maximum duration to 300 seconds
export const dynamic = 'force-dynamic'; // Disable static optimization

if (!globalThis.fetch) {
  // @ts-ignore
  globalThis.fetch = require('cross-fetch');
}

export async function POST(req: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    
    // Check if API key is configured
    if (!apiKey) {
      console.error('Gemini API key is not configured');
      return NextResponse.json(
        { error: 'Server configuration error - Missing API key' },
        { status: 500 }
      );
    }

    const { imageUrl } = await req.json();

    // Validate the request
    if (!imageUrl) {
      return NextResponse.json(
        { error: 'Image data is required' },
        { status: 400 }
      );
    }

    try {
      // If imageUrl is already a base64 string, use it directly
      if (imageUrl.startsWith('data:image/')) {
        const enhancedImage = await enhanceImage(imageUrl);
        if (!enhancedImage) {
          throw new Error('Failed to enhance image - No output received');
        }
        return NextResponse.json({
          status: 'success',
          output: enhancedImage
        });
      }

      // If it's a URL, fetch and convert to base64
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 30000);

      try {
        const imageResponse = await fetch(imageUrl, {
          signal: controller.signal,
          headers: {
            'Accept': 'image/*'
          }
        });
        clearTimeout(timeout);

        if (!imageResponse.ok) {
          throw new Error(`Failed to fetch image: ${imageResponse.statusText}`);
        }

        const contentType = imageResponse.headers.get('content-type');
        if (!contentType?.startsWith('image/')) {
          throw new Error('Invalid content type: URL does not point to an image');
        }

        const imageBuffer = await imageResponse.arrayBuffer();
        const base64Image = `data:${contentType};base64,${Buffer.from(imageBuffer).toString('base64')}`;

        // Enhance the image using Gemini
        const enhancedImage = await enhanceImage(base64Image);
        if (!enhancedImage) {
          throw new Error('Failed to enhance image - No output received');
        }

        return NextResponse.json({
          status: 'success',
          output: enhancedImage
        });
      } catch (fetchError: any) {
        if (fetchError?.name === 'AbortError') {
          throw new Error('Image fetch timeout');
        }
        throw fetchError;
      } finally {
        clearTimeout(timeout);
      }
    } catch (error: any) {
      console.error('Image processing error:', error);
      
      // Handle specific Gemini API errors
      if (error?.message?.includes('model not found')) {
        return NextResponse.json(
          { 
            error: 'Service temporarily unavailable',
            details: 'The image enhancement service is currently unavailable. Please try again later.'
          },
          { status: 503 }
        );
      }
      
      return NextResponse.json(
        { 
          error: 'Failed to process image',
          details: error instanceof Error ? error.message : 'Unknown error'
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Image enhancement error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to enhance image',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 