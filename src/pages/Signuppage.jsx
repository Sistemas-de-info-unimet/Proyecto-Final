import "./Signuppage.css";
import React, {useState} from "react";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, FacebookAuthProvider } from "firebase/auth";
import { auth } from "../Firebase";
import { db } from "../Firebase";
import {doc, setDoc} from "firebase/firestore";
import Swal from 'sweetalert2';


export default function Signuppage() {

  //funcion que valida que el correo termine en @correo.unimet.edu.ve
  function validateEmail(email) {
    const regex = /^[\w-\.]+@correo\.unimet\.edu\.ve$/;
    return regex.test(email);
  }

    
  //funcion llamada por signUp despues de submit. esta funcion crea el usuario en firestore y te dirige a la pagina principal
  const handleSubmit = async (nombre, apellido, telefono, email, contra) => {

    const emailIsValid = validateEmail(email);

    if (!emailIsValid) {
      Swal.fire({
        title: '¡Error!',
        text: 'El correo electrónico ingresado no es válido',
        icon: 'error',
        confirmButtonText: 'OK'
      })
      return;
    }

    try {

      const userCredential = await createUserWithEmailAndPassword(auth, email, contra);

      const uid = userCredential.user.uid;
  
      const usuariosRef = doc(db, "Estudiante", uid);
      await setDoc(usuariosRef, {
      nombre,
      apellido,
      telefono,
      email,
      fdp : "https://www.cenieh.es/sites/default/files/default_images/Foto%20perfil%20anonimo_0.png",
      suscripciones: [],
      contra,
    });
  

    window.location.href = "/Home";
  
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: '¡Error!',
        text: 'Correo en uso o contraseña menor a 6 caracteres.',
        icon: 'error',
        confirmButtonText: 'OK'
      })

      
    }

  };
  

    // se setean las variables del usuario
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [lastname,setLastname] = useState('');
    const [tlf, setTlf] = useState('');

    //se llama a la funcion signUp que es llamada al hacer submit y a su vez llama a la funcion handlesubmit, que al final es la que crea al usuario en firestore
    const signUp = (e) => {
        e.preventDefault();
        handleSubmit(name,lastname,tlf,email,password)
    }


    //registrarse con google 
    const registerWithGoogle = async () => {
        try {
          const provider = new GoogleAuthProvider();
          const result = await signInWithPopup(auth, provider);
          const user = result.user;
          console.log(user); 

          // Validar que el correo sea unimet
          const isValidEmail = user.email && user.email.endsWith("@correo.unimet.edu.ve");

          if (!isValidEmail) {
            Swal.fire({
              title: '¡Error!',
              text: 'Solo se permiten correos UNIMET',
              icon: 'error',
              confirmButtonText: 'OK'
            })
            return; // salir si no es correo unimet
          }


          const uid = user.uid;
          const nombre = user.displayName;
          const email = user.email;
          const apellido = "";
          const telefono = "";
          const usuariosRef = doc(db, "Estudiante", uid);
          await setDoc(usuariosRef, {
          nombre,
          apellido,
          telefono,
          email,
          fdp: "https://www.cenieh.es/sites/default/files/default_images/Foto%20perfil%20anonimo_0.png",
          suscripciones: [],
          });
          window.location.href = "/Home"; 

        } catch (error) {
          console.log(error);
        }
    };
  
  // REGISTRAR CON FACEBOOK
  
  // const registerWithFacebook = async () => {
  //   try {
  //     // Crea un proveedor de Facebook
  //     const provider = new FacebookAuthProvider();
  
  //     // Inicia sesión con Facebook
  //     const result = await signInWithPopup(auth, provider);
  
  //     // Obtiene el usuario de la respuesta
  //     const user = result.user;
  
  //     // Valida que el correo sea UNIMET
  //     const isValidEmail = user.email && user.email.endsWith("@correo.unimet.edu.ve");
  
  //     if (!isValidEmail) {
  //       alert("Solo se permiten correos UNIMET");
  //       return; // Salir si no es correo UNIMET
  //     }
  
  //     // Obtiene el ID del usuario, nombre, correo electrónico
  //     const uid = user.uid;
  //     const nombre = user.displayName;
  //     const email = user.email;
  
  //     // Inicializa variables para apellido y teléfono
  //     const apellido = "";
  //     const telefono = "";
  
  //     // Crea una referencia al documento del usuario en Firebase
  //     const usuariosRef = doc(db, "Estudiante", uid);
  
  //     // Establece los datos del usuario en el documento
  //     await setDoc(usuariosRef, {
  //       nombre,
  //       apellido,
  //       telefono,
  //       email,
  //       fdp: "https://www.cenieh.es/sites/default/files/default_images/Foto%20perfil%20anonimo_0.png",
  //       suscripciones: [],
  //     });
  
  //     // Redirige a la página principal
  //     window.location.href = "/Home";
  
  //   } catch (error) {
  //     alert("Correo ya registrado");
  //     console.log(error);
  //   }
  // };
  
  return (
        <div className="container">
  <div className="card1">
    <div className="image-container2">
      <img className="imgprin" src="https://runrun.es/wp-content/uploads/2016/09/UNIMET6.jpg" alt="Imagen de fondo"></img>
    </div>
    <div className="form-container">
      <h1 className="tit2">Registro</h1>
      <form  onSubmit = {signUp}>
        <label className="nombre">Nombre</label>
        <input placeholder=" Tu nombre aquí" type="text" id="nombre" name="nombre" required value = {name} onChange = {(e) => setName(e.target.value)}></input>
        <label className="apellido">Apellido</label>
        <input placeholder=" Tu apellido aquí" type="text" id="apellido" name="apellido" required value = {lastname} onChange = {(e) => setLastname(e.target.value)}></input>
        <label className="email">Correo electrónico</label>
        <input placeholder=" hola@tuemail.com" type="email" id="email" name="email" required value = {email} onChange = {(e) => setEmail(e.target.value)}></input>
        <label className="telefono">Teléfono</label>
        <input placeholder=" +58-414-555-5555" type="tel" id="telefono" name="telefono" required value = {tlf} onChange = {(e) => setTlf(e.target.value)}></input>
        <label className="password">Contraseña</label>
        <input placeholder="***************" type="password" id="password" name="password" required value = {password} onChange = {(e) => setPassword(e.target.value)}></input>
        <div className="cont-bot">
        <button className="bot-iniciars" type="submit">Registrarse</button>
        </div>
        <div className="txt-inicias">        
            <br></br>
            <br></br>
            <p className="iniciacon">Inicia sesión con:</p>
        </div>
        <div className="social-login">
          <button className="bt-img" type="button" onClick={registerWithGoogle}>
            <img src="./images/icono_google.png" alt="Google"></img>
          </button>
          <button className="bt-img" type="button">
            <img src="./images/icono_facebook.png" alt="Facebook"></img>
          </button>
        </div>
        
        <div className="links">
          <p className="admin-link">Ya estás registrado? <a className="admin-link" href="/">Inicia sesión</a></p>
          <p className="admin-link">¿Eres administrador? <a className="admin-link" href="/AdminLogin">Inicia sesión como administrador</a></p>
        </div>
      </form>
    </div>
  </div>
</div>
    );

}
