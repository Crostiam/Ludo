import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, onValue } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyAM_rP5k7PAuBq8_Xkin23X9NYW5qolJsM",
  authDomain: "ludo-14af4.firebaseapp.com",
  databaseURL: "https://ludo-14af4-default-rtdb.firebaseio.com",
  projectId: "ludo-14af4",
  storageBucket: "ludo-14af4.firebasestorage.app",
  messagingSenderId: "1097419329945",
  appId: "1:1097419329945:web:a517052b14f71639ea0308",
  measurementId: "G-7B6RCVKXXK"
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export { ref, set, onValue };
