import React, { createContext } from "react";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage, } from "firebase/storage";
import { setPersistence, browserSessionPersistence } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: "world-wonders-inceptionu",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: "741891750091",
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: "G-5VFSVY33LR",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
// Set the persistence to 'session' when initializing the app
setPersistence(auth, browserSessionPersistence);



const db = getFirestore(app);
const storage = getStorage(app);

export const FirebaseContext = createContext();

const FirebaseProvider = (props) => {
  const firebaseValues = {
    app,
    auth,
    db,
    storage,
  };

  return (
    <FirebaseContext.Provider value={firebaseValues}>
      {props.children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseProvider;
