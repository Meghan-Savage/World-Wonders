import React, { createContext } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

console.log(
  "import.meta.env.FIREBASE_API_KEY",
  import.meta.env.FIREBASE_API_KEY
);

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: "world-wonders-inceptionu",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: "741891750091",
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: "G-5VFSVY33LR",
};

console.log("firebaseConfig", firebaseConfig);

const app = initializeApp(firebaseConfig);
console.log("APP", app);

const auth = getAuth(app);
console.log("auth", auth);

const db = getFirestore(app);
console.log("db", db);
const storage = getStorage(app);
console.log("storage", storage);

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
