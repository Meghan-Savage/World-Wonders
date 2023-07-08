import React, { createContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getFunctions, httpsCallable } from "firebase/functions";

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
setPersistence(auth, browserSessionPersistence);

export const db = getFirestore(app);
const storage = getStorage(app);
const functions = getFunctions(app, "us-central1");

export const FirebaseContext = createContext();

const FirebaseProvider = (props) => {
  const [createCheckoutSessionFn, setCreateCheckoutSessionFn] = useState(null);

  useEffect(() => {
    const getCreateCheckoutSession = async () => {
      try {
        const createCheckoutSession = httpsCallable(
          functions,
          "createCheckoutSession"
        );
        setCreateCheckoutSessionFn(() => createCheckoutSession);
      } catch (error) {
        console.error("Error retrieving createCheckoutSession:", error);
      }
    };

    getCreateCheckoutSession();
  }, []);

  const firebaseValues = {
    app,
    auth,
    db,
    storage,
    createCheckoutSession: createCheckoutSessionFn,
  };

  return (
    <FirebaseContext.Provider value={firebaseValues}>
      {props.children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseProvider;
