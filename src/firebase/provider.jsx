import React, { createContext } from "react";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { setPersistence, browserSessionPersistence } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCgypmoLS2uaGESAaHLSWUAbCFmdtQLwdk",

  authDomain: "world-wonders-inceptionu.firebaseapp.com",

  projectId: "world-wonders-inceptionu",

  storageBucket: "world-wonders-inceptionu.appspot.com",

  messagingSenderId: "741891750091",

  appId: "1:741891750091:web:33eb7ea287ad8ae062434e",

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
