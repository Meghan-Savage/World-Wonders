import React, { useContext, useEffect, useState, createContext } from "react";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { FirebaseContext } from "./provider";

export const AuthContext = createContext();

export const AuthProvider = (props) => {
  const fbContext = useContext(FirebaseContext);
  const [user, setUser] = useState(null);

  const auth = fbContext.auth;
  const db = fbContext.db;

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {});
    return unsub; // to shut down onAuthStateChanged listener
  }, [auth]);

  const login = async (email, password) => {
    try {
      let userCred = await signInWithEmailAndPassword(auth, email, password);
      if (userCred) {
        console.log("Logged in!!", userCred.user);
      } else {
        console.log("Login failed!");
      }
    } catch (ex) {
      console.log("AUTH FAILURE!", ex);
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  const authContextValue = { user, login, logout }; // Create the context value object

  return (
    <AuthContext.Provider value={authContextValue}>
      {" "}
      {/* Pass the context value */}
      {props.children}
    </AuthContext.Provider>
  );
};
