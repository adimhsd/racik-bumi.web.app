import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported, logEvent } from "firebase/analytics";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

let app = null;
let analytics = null;

export async function initFirebase() {
  if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
    console.warn("[Racik Bumi] Firebase env belum terisi. Salin .env.example ke .env.");
    return { app: null, analytics: null };
  }

  try {
    app = initializeApp(firebaseConfig);
    const analyticsSupported = await isSupported();
    if (analyticsSupported && firebaseConfig.measurementId) {
      analytics = getAnalytics(app);
    }
  } catch (error) {
    console.warn("[Racik Bumi] Gagal menginisialisasi Firebase:", error);
  }

  return { app, analytics };
}

export function trackEvent(eventName, params = {}) {
  if (!analytics) return;
  try {
    logEvent(analytics, eventName, params);
  } catch {
    // Abaikan error analitik agar pengalaman pengguna tetap lancar
  }
}

export const storeConfig = {
  whatsappNumber: (import.meta.env.VITE_WHATSAPP_NUMBER || "628568755799").replace(/\D/g, ""),
  whatsappDisplay: import.meta.env.VITE_WHATSAPP_DISPLAY || "+62 856-8755-799",
  instagramHandle: import.meta.env.VITE_INSTAGRAM_HANDLE || "racikbumi.id",
  storeAddress:
    import.meta.env.VITE_STORE_ADDRESS ||
    "Pondok Mutiara, Kel. Gegunung, Kec. Sumber, Kab. Cirebon (dekat area Pondok Pesantren Al-Bahjah)",
  mapsShareUrl: import.meta.env.VITE_MAPS_SHARE_URL || "https://share.google/aTZx1Duw1MrZKUpSN"
};
