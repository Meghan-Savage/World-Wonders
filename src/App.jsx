import {useState} from "react";
import LoginForm from "./components/LoginForm";
import RegistrationForm from "./components/RegistrationForm";
import Login from "./components/Login";
//import { createBrowserRouter, RouterProvider, } from "react-router-dom";

//import {createUserWithEmailAndPassword, signInWithEmailAndPassword, 
  //onAuthStateChanged,  signOut,}  from "firebase/auth";
//import { auth } from "./firebase-config";
 

//const router = createBrowserRouter([
  //{
    //path: "/",
    //element: <Login />,
    //children: [
      //{
        //path: "signin",
        //element: <LoginForm />,
      //},
      //{
       // path: "signup",
        //element: <RegistrationForm />,
      
      //}]
  //},
  
 
//]);


function App() {

  //const [registerEmail, setRegisterEmail] = useState("");
  //const [registerPassword, setRegisterPassword] = useState("");
  //const [loginEmail, setLoginEmail] = useState("");
  //const [loginPassword, setLoginPassword] = useState("");

  //const [user, setUser] = useState({});

  //onAuthStateChanged(auth, (currentUser) => {
    //setUser(currentUser);
  //});

  //const register = async () => {
    //try {
      //const user = await createUserWithEmailAndPassword(
        //auth,
        //registerEmail,
        //registerPassword
      //);
      //console.log(user);
    //} catch (error) {
      //console.log(error.message);
    //}
  //};

  //const login = async () => {
    //try {
      //const user = await signInWithEmailAndPassword(
        //auth,
        //loginEmail,
        //loginPassword
      //);
      //console.log(user);
    //} catch (error) {
     // console.log(error.message);
    //}
  //};

  //const logout = async () => {
    //await signOut(auth);
  //};

  //return (
   // <RouterProvider router={router} />
  //)
};

export default App;


