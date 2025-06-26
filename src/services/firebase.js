
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';


const firebaseConfig = {
  apiKey: "AIzaSyAbKaUVFDUWgFcUZEMomLG5nDicG1SIr8g",
  authDomain: "unicedup.firebaseapp.com",
  databaseURL: "https://unicedup-default-rtdb.firebaseio.com",
  projectId: "unicedup",
  storageBucket: "unicedup.firebasestorage.app",
  messagingSenderId: "877231460681",
  appId: "1:877231460681:web:ae2cd51a6c53793c470a98",
  measurementId: "G-9TNXHNGWRS"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const database = getDatabase(app);

export default app;
