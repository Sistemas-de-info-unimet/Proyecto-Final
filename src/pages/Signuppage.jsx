import "./Signuppage.css";
import React, {useState} from "react";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup  } from "firebase/auth";
import { auth } from "../Firebase";
import { db } from "../Firebase";
import {doc, setDoc} from "firebase/firestore";
import FacebookLogin from "react-facebook-login/dist/facebook-login.esm";


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
      alert("El correo electrónico no es válido");
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
  
    //ESTO NO ES HOME//
    window.location.href = "/";
  
    } catch (error) {
      console.log(error);
      window.alert("Error. Opciones: 1)Correo inválido. 2)Correo en uso. 3)Contraseña menor a 6 caracteres.");
      
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
            alert("Solo se permiten correos electrónicos que terminen en @correo.unimet.edu.ve");
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
          window.location.href = "/"; 

        } catch (error) {
          console.log(error);
        }
    };
  
  // REGISTRAR CON FACEBOOK
  const RegisterWithFacebook = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
  
    const handleFacebookLogin = (response) => {
      setLoading(true);
  
      const { accessToken, userID } = response;
      const credential = FacebookAuthProvider.credential(accessToken);
  
      // Obtener el correo electrónico del usuario
      const email = response.email;
  
      // Validar el correo electrónico
      const isValidEmail = email && email.endsWith("@correo.unimet.edu.ve");
  
      if (!isValidEmail) {
        setError("Solo se permiten correos electrónicos que terminen en @correo.unimet.edu.ve");
        setLoading(false);
        return; // Salir de la función si el correo electrónico no es válido
      }
  
      auth
        .signInWithCredential(credential)
        .then((userCredential) => {
          // Registrar usuario en Firestore
          const uid = user.uid;
          const nombre = user.displayName;
          const email = user.email;
          const apellido = "";
          const telefono = "";
          const usuariosRef = doc(db, "estudiantes", uid);
          setDoc(usuariosRef, {
            nombre,
            apellido,
            telefono,
            email,
            fdp: "https://www.cenieh.es/sites/default/files/default_images/Foto%20perfil%20anonimo_0.png",
            suscripciones: [],
          });
  
          // Redirigir a la página de inicio
          window.location.href = "/";
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
    };
  
    return (
      <div>
        {loading && <p>Cargando...</p>}
        {error && <p>{error}</p>}
        <FacebookLogin
          appId="YOUR_FACEBOOK_APP_ID"
          autoLoad={false}
          fields="name,email,picture"
          callback={handleFacebookLogin}
        />
      </div>
    );
  };
  
  return (
        <div className="container">
  <div className="card1">
    <div className="image-container">
      <img src="imagen.jpg" alt="Imagen de fondo"></img>
      <div className="text-container">
        <h2>¿Aún no tienes cuenta?</h2>
        <p>Crea tu cuenta en pocos pasos:</p>
        <button type="button">Crear cuenta</button>
      </div>
    </div>
    <div className="form-container">
      <h1>Registro</h1>
      <form  onSubmit = {signUp}>
        <label className="nombre">Nombre</label>
        <input type="text" id="nombre" name="nombre" required value = {name} onChange = {(e) => setName(e.target.value)}></input>
        <label className="apellido">Apellido</label>
        <input type="text" id="apellido" name="apellido" required value = {lastname} onChange = {(e) => setLastname(e.target.value)}></input>
        <label className="email">Correo electrónico</label>
        <input type="email" id="email" name="email" required value = {email} onChange = {(e) => setEmail(e.target.value)}></input>
        <label className="telefono">Teléfono</label>
        <input type="tel" id="telefono" name="telefono" required value = {tlf} onChange = {(e) => setTlf(e.target.value)}></input>
        <label className="password">Contraseña</label>
        <input type="password" id="password" name="password" required value = {password} onChange = {(e) => setPassword(e.target.value)}></input>
        <button type="submit">Registrarse</button>
        <div className="social-login">
          <button type="button" onClick={registerWithGoogle}>Registrarse con Google</button>
          <button type="button" onClick = {RegisterWithFacebook}>Registrarse con Facebook</button>
        </div>
        <div className="links">
          <p><a href="#">Ya estás registrado? Inicia sesión</a></p>
          <p><a href="#">¿Eres administrador? Inicia sesión como administrador</a></p>
        </div>
      </form>
    </div>
  </div>
</div>
    );

}
