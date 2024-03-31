import "./LoginAdminpage.css"
import React, {useState} from "react";
import { signInWithEmailAndPassword} from "firebase/auth";
import { auth } from "../Firebase";
import {doc, getDoc, setDoc} from "firebase/firestore";
import { db } from "../Firebase";
import Swal from 'sweetalert2';


export default function LoginAdminpage() {


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [id, setId] = useState('');
  const [key, setkey] = useState('');

  const signInAdmin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
      console.log(userCredential);

      //verificamos que exista un documento en la coleccion Administrador de firebase con el id dado
      // y verificamos que la key proporcionada sea valida
      
      getDoc(doc(db, "Administrador", id))
      .then((adminDoc) => {
          if (!adminDoc.exists()) {
            Swal.fire({
              title: '¡Error!',
              text: 'ID de Administrador no registrado',
              icon: 'error',
              confirmButtonText: 'OK'})
            return
          } else{
            const keyDoc = adminDoc.data().key;

            if (key !== keyDoc){
              Swal.fire({
                title: '¡Error!',
                text: 'key invalido',
                icon: 'error',
                confirmButtonText: 'OK'})
              return
            }

            window.location.href = "/AdminLogin";
          }
      })
      .catch((error) => {
        console.log(error)
      });

    }).catch((error) => {
      console.log(error)
      Swal.fire({
          title: '¡Error!',
          text: 'Correo no registrado o contraseña inválida.',
          icon: 'error',
          confirmButtonText: 'OK'
      })    
    });

  }

return (
<div className="container">
  <div className="card3">
    <div className="image-container3">
      <img className="imgprin3" src="https://i.pinimg.com/736x/92/53/e0/9253e0bf8a4ed9ee822171963e082f9f.jpg" alt="Imagen de fondo"></img>
    </div>
    <div className="form-container">
      <h1 className="tit3">Iniciar sesión como Admin.</h1>
      <form onSubmit = {signInAdmin}>
        <label className="email">Correo electrónico</label>
        <input placeholder=" hola@tuemail.com" type="email" id="email" name="email" required value = {email} onChange = {(e) => setEmail(e.target.value)} ></input>
        <label className="password">Contraseña</label>
        <input placeholder="***************" type="password" id="password" name="password" required value = {password} onChange = {(e) => setPassword(e.target.value)}></input>
        <label className="identificador">Identificador</label>
        <input placeholder="AD2E230DAXC8AD1" type="text" id="identificador" name="identificador" required value = {id} onChange = {(e) => setId(e.target.value)}></input>
        <label className="llave">Llave</label>
        <input placeholder="***************" type="password" id="llave" name="llave" required value = {key} onChange = {(e) => setkey(e.target.value)}></input>
        <div className="cont-bt">
        <button className="bot-iniciars" type="submit">Iniciar sesión</button>
        </div>
      </form>
      <div className="preg">
      <br></br>
      <br></br>
      <p  className="admin-link">¿Eres estudiante? <a  className="admin-link" href="/">Inicia sesión aquí</a></p>
      </div>
    </div>
  </div>
</div>
    );
    }