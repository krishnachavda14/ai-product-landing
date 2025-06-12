import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDKrGk3vLbWkI2n1OWZzd8H3TFn0xdf8jI",
  authDomain: "ai-product-landing.firebaseapp.com",
  projectId: "ai-product-landing",
  storageBucket: "ai-product-landing.firebasestorage.app",
  messagingSenderId: "684308680914",
  appId: "1:684308680914:web:f6a9f1f8ec4c958c2d5d0b",
  measurementId: "G-2Q9QXTLN6Y"
};

// Initialize Firebase only if it hasn't been initialized
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize Firestore with memory-only persistence
const db = getFirestore(app);

export { db }; 