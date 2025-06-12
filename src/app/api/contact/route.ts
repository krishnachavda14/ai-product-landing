import { NextResponse } from 'next/server';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    // Validate the data
    if (!name || !email || !message) {
      console.warn('Missing required fields:', { name, email, message });
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailRegex.test(email)) {
      console.warn('Invalid email format:', email);
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    console.log('Attempting to store contact submission:', { name, email });

    try {
      // Store in Firestore with server timestamp
      const docRef = await addDoc(collection(db, 'contacts'), {
        name,
        email,
        message,
        createdAt: serverTimestamp(),
        status: 'new',
      });

      console.log('Successfully stored contact submission with ID:', docRef.id);

      return NextResponse.json(
        { message: 'Message sent successfully', id: docRef.id },
        { status: 200 }
      );
    } catch (firestoreError: any) {
      // Check specifically for Firestore API not enabled error
      if (firestoreError?.message?.includes('PERMISSION_DENIED') && 
          firestoreError?.message?.includes('Cloud Firestore API has not been used')) {
        console.error('Firestore API not enabled:', firestoreError);
        return NextResponse.json(
          { 
            error: 'Service temporarily unavailable',
            details: 'The service is being initialized. Please try again in a few minutes.'
          },
          { status: 503 }
        );
      }
      throw firestoreError; // Re-throw other Firestore errors
    }
  } catch (error) {
    // Log the detailed error
    console.error('Contact form error:', error);
    
    // Check if it's a Firebase-specific error
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    
    return NextResponse.json(
      { 
        error: 'Failed to send message',
        details: errorMessage
      },
      { status: 500 }
    );
  }
} 