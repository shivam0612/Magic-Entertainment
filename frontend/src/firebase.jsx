import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getMessaging } from 'firebase/messaging';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAJpWb0ENyZLywhdfYTQLgsU7kGMIkolSA",
  authDomain: "magicentertainment-1.firebaseapp.com",
  projectId: "magicentertainment-1",
  storageBucket: "magicentertainment-1.appspot.com",
  messagingSenderId: "226539778652",
  appId: "1:226539778652:web:7b8c5846ee8be5a7c62c99",
  measurementId: "G-QERTP62NCR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = initializeFirestore(app, {
  experimentalForceLongPolling: true,
}); const messaging = getMessaging(app);

export { database, messaging };
