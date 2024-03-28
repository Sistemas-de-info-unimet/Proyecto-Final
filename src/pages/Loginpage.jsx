import "./Loginpage.css"
import { useNavigate } from 'react-router-dom';
import React, {useState} from "react";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../Firebase";
import {doc, getDoc} from "firebase/firestore";
import { db } from "../Firebase";

export default function Loginpage() {
    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate("/SignUp")
    }

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const signIn = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
            console.log(userCredential)
            window.location.href = "/Home";
        }).catch((error) => {
            console.log(error)
            window.alert("Error. Opciones: 1)Correo no registrado. 2)Contraseña inválida.");
        });
    }


  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userDoc = await getDoc(doc(db, "Estudiante", user.uid));

      if (userDoc.exists()) {
        // Usuario ya está registrado en Firestore, redireccionar a home
        window.location.href = "/Home";
      } else {
        // El correo electrónico no está registrado en Firestore, mostrar error
        window.alert("Error: El correo electrónico no está registrado.");
      }
    } catch (error) {
      console.log(error);
    }
  };



return (
<div className="container">
  <div className="card2">
    <div className="image-container2">
      <img className="imgprin" src="https://cruz-diez.com/media/af2dgdl0/chromostructure-dinduction-chromatique-unimet.jpg?width=1600&height=1200&rnd=133342375582930000" alt="Imagen de fondo"></img>
      <div className="text-container">
        <h2 className="aun-ntc">¿Aún no tienes cuenta?</h2>
        <br></br>
        <p className="parrafo-img">Crea tu cuenta en pocos pasos:</p>
        <button className="bt-crearc" onClick={handleButtonClick} type="button">Crear cuenta</button>
      </div> 
    </div>
    <div className="form-container">
      <h1 className="tit2">Iniciar Sesión</h1>
      <form onSubmit = {signIn}>
        <label className="email">Email</label>
        <input placeholder=" hola@tuemail.com" type="email" id="email" name="email" required value = {email} onChange = {(e) => setEmail(e.target.value)}></input>
        <label className="password">Contraseña</label>
        <input placeholder="***************" type="password" id="password" name="password" required value = {password} onChange = {(e) => setPassword(e.target.value)}></input>
        <div className="cont-bot">
        <button className="bot-iniciars" type="submit">Iniciar sesión</button>
        </div>
        <div className="txt-inicias">        
            <br></br>
            <br></br>
            <p className="iniciacon">Inicia sesión con:</p>
        </div>
      </form>
      <div className="social-login">
        <button className="bt-img" type="button" onClick={signInWithGoogle}>
            <img src="./images/icono_google.png" alt="Google"></img>
        </button>
        <button className="bt-img" type="button">
            <img src="./images/icono_facebook.png" alt="Facebook"></img>
        </button>
      </div>
      <div className="preg">
      <p className="admin-link">¿Eres administrador? <a className="linkpagadmin" href="/AdminLogin">Inicia sesión aquí</a></p>
      </div>
    </div>
  </div>
</div>
    );

}

