
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyCgypmoLS2uaGESAaHLSWUAbCFmdtQLwdk",
  authDomain: "world-wonders-inceptionu.firebaseapp.com",
  projectId: "world-wonders-inceptionu",
  storageBucket: "world-wonders-inceptionu.appspot.com",
  messagingSenderId: "741891750091",
  appId: "1:741891750091:web:33eb7ea287ad8ae062434e",
  measurementId: "G-5VFSVY33LR"
};


const app = initializeApp(firebaseConfig);

//const auth = getAuth(app);

export const auth = getAuth(app);
