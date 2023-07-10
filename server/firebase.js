import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCgypmoLS2uaGESAaHLSWUAbCFmdtQLwdk",
  authDomain: "world-wonders-inceptionu.firebaseapp.com",
  projectId: "world-wonders-inceptionu",
  storageBucket: "world-wonders-inceptionu.appspot.com",
  messagingSenderId: "741891750091",
  appId: "1:741891750091:web:33eb7ea287ad8ae062434e",
  measurementId: "G-5VFSVY33LR",
};

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
export const storage = firebase.storage();
