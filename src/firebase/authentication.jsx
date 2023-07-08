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
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user); // Update the user state with the authenticated user
    });

    return () => unsubscribe(); // to shut down onAuthStateChanged listener
  }, [auth]);

  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const loggedInUser = userCredential.user;
      setUser(loggedInUser); // Update the user state with the logged-in user
      console.log("Logged in!!");
    } catch (ex) {
      console.log("Login failed!");
    }
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null); // Clear the user state when logged out
  };

  const authContextValue = { user, login, logout };

  return (
    <AuthContext.Provider value={authContextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};
