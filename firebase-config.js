import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getDatabase, set, ref } from "firebase/database";
import { createContext, useContext } from "react";

const firebaseConfig = {
  apiKey: "AIzaSyC_HsiA2gNkK7k1-JJiSmYmeh1XrxwVWQI",
  authDomain: "music-player-879be.firebaseapp.com",
  projectId: "music-player-879be",
  storageBucket: "music-player-879be.appspot.com",
  messagingSenderId: "781107832924",
  appId: "1:781107832924:web:f1d778b72f29389cb61e99",
  measurementId: "G-22DB33YK8W",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
const database = getDatabase(app);
const FirebaseContext = createContext(null);

export const useFirebase = () => useContext(FirebaseContext);

const putData = (key, data) => set(ref(database, key), data);

export { database };
