import { useState, useEffect } from 'react';
import { db } from '../Firebase';
import { doc, getDoc, updateDoc, getDocs, collection, where, query } from 'firebase/firestore';
import '../pages/Perfil.css';
import { auth } from '../Firebase';
import Swal from 'sweetalert2';
import Header from "../components/Header";

export default function Perfil() {
  const [perfilUsuario, setPerfilUsuario] = useState(null);
  const [nuevaFoto, setNuevaFoto] = useState('');
  const [mostrarCuadroTexto, setMostrarCuadroTexto] = useState(false);
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
  const [userId, setUserId] = useState('');
  const [membresias, setMembresias] = useState([]);

  useEffect(() => {
    const obtenerPerfilUsuario = async () => {
      try {
        const user = auth.currentUser;

        if (user) {
          const docRef = doc(db, 'Estudiante', user.uid);
          const docSnap = await getDoc(docRef);
          setUserId(user.uid);

          if (docSnap.exists()) {
            setPerfilUsuario(docSnap.data());
          } else {
            console.log('No se encontró un perfil de usuario con el ID especificado.');
          }
        } else {
          console.log('No se ha iniciado sesión.');
        }
      } catch (error) {
        console.error('Error al obtener el perfil de usuario:', error);
      }
    };

    obtenerPerfilUsuario();
  }, []);

  useEffect(() => {
    if (perfilUsuario) {
      setNombre(perfilUsuario.nombre);
      setApellido(perfilUsuario.apellido);
      setTelefono(perfilUsuario.telefono);
      setCorreo(perfilUsuario.email);

      if (perfilUsuario.suscripciones && perfilUsuario.suscripciones.length > 0) {
        const obtenerMembresias = async () => {
          const membresiasPromesas = perfilUsuario.suscripciones.map(async (clubId) => {
            const docRef = doc(db, "Agrupaciones", clubId);
            console.log(clubId)
            const docSnap = await getDoc(docRef);
            return docSnap.exists() ? {...docSnap.data(), id: docSnap.id} : null;
          });
          const membresiasResueltas = await Promise.all(membresiasPromesas);
          setMembresias(membresiasResueltas.filter(m => m !== null));
        }; 

        obtenerMembresias();
      }

    }

  }, [perfilUsuario]);

  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [telefono, setTelefono] = useState('');
  const [correo, setCorreo] = useState('');

  const handleChangeFoto = () => {
    setMostrarCuadroTexto(true);
    setMostrarConfirmacion(false);
  };

  const handleAceptar = async () => {
    if (nuevaFoto === '') {
      console.error('La URL de la foto está vacía. Por favor, ingresa una URL válida.');
      return;
    }
  
    const img = new Image();
    img.src = nuevaFoto;
  
    img.onerror = function () {
      console.error('La URL de la foto no es válida. Por favor, ingresa una URL de imagen válida.');
    };
  
    img.onload = async function () {
      try {
        const docRef = doc(db, 'Estudiante', userId);
        await updateDoc(docRef, { fdp: nuevaFoto });
        setPerfilUsuario({ ...perfilUsuario, fdp: nuevaFoto });
        setNuevaFoto('');
        setMostrarCuadroTexto(false);
      } catch (error) {
        console.error('Error al actualizar la foto de perfil:', error);
      }
    };
  };

  const handleCancelar1 = () => {
    setNuevaFoto('');
    setMostrarCuadroTexto(false);
    setMostrarConfirmacion(false);
    // Restablecer los valores del perfil
    if (perfilUsuario) {
      setNombre(perfilUsuario.nombre);
      setApellido(perfilUsuario.apellido);
      setTelefono(perfilUsuario.telefono);
      setCorreo(perfilUsuario.email);
    }
  };

  const handleCancelar = () => {
    setNuevaFoto('');
    setMostrarCuadroTexto(false);
    setMostrarConfirmacion(false);
  };

  const handleEliminarFoto = () => {
    setMostrarConfirmacion(true);
    setMostrarCuadroTexto(false);
  };

  const handleAceptarEliminar = async () => {
    try {
      const docRef = doc(db, 'Estudiante', userId);
      await updateDoc(docRef, {
        fdp:
          'https://www.cenieh.es/sites/default/files/default_images/Foto%20perfil%20anonimo_0.png',
      });
      setPerfilUsuario({
        ...perfilUsuario,
        fdp:
          'https://www.cenieh.es/sites/default/files/default_images/Foto%20perfil%20anonimo_0.png',
      });
      setMostrarConfirmacion(false);
    } catch (error) {
      console.error('Error al eliminar la foto de perfil:', error);
    }
  };

  if (!perfilUsuario) {
    return <div>Cargando perfil de usuario...</div>;
  }
  

  const handleChangeNombre = (e) => {
    setNombre(e.target.value);
  };
  
  const handleChangeApellido = (e) => {
    setApellido(e.target.value);
  };
  
  const handleChangeTelefono = (e) => {
    setTelefono(e.target.value);
  };
  
  const handleChangeCorreo = (e) => {
    setCorreo(e.target.value);
  };

  const handleActualizarPerfil = async () => {
    try {

      const isValidEmail = correo && correo.endsWith("@correo.unimet.edu.ve");

          if (!isValidEmail) {
            Swal.fire({
              title: '¡Error!',
              text: 'Solo se permiten correos UNIMET',
              icon: 'error',
              confirmButtonText: 'OK'
            })
            return; // salir si no es correo unimet
          }

          //verificamos que no exista una cuenta registrada a ese correo unimet:
          const querySnapshot = await getDocs(query(collection(db, 'Estudiante'), where('email', '==', correo)));
          console.log(querySnapshot.empty);
          console.log(querySnapshot.docs.map((doc) => doc.data()));

          const filteredDocs = querySnapshot.docs.filter(doc => doc.id !== userId);

          if (filteredDocs.length !== 0) {
            Swal.fire({
              title: '¡Error!',
              text: 'Correo ya registrado',
              icon: 'error',
              confirmButtonText: 'OK'
            });
            return;
          }      

      const docRef = doc(db, 'Estudiante', userId);
      console.log(userId)
      await updateDoc(docRef, {
        nombre,
        apellido,
        telefono,
        email: correo,
      });
      setPerfilUsuario({
        ...perfilUsuario,
        nombre,
        apellido,
        telefono,
        email: correo,
      });
      // Restablecer los valores originales
      setNombre(perfilUsuario.nombre);
      setApellido(perfilUsuario.apellido);
      setTelefono(perfilUsuario.telefono);
      setCorreo(perfilUsuario.email);
    } catch (error) {
      console.error('Error al actualizar el perfil:', error);
    }
  };

  return (
     <div>
      <Header/>
      <div className="perfil-container">
        <section className="left-section">
          <div className="profile-picture">
            <img src={perfilUsuario.fdp}/>
          </div>
          <div className="c2">
          <h2>{nombre} {apellido}</h2>
          <button className="b1" onClick={handleChangeFoto}>Cambiar Foto</button>
          {mostrarCuadroTexto && (
            <div className="cambiar-foto">
              <input
                type="text"
                value={nuevaFoto}
                onChange={(e) => setNuevaFoto(e.target.value)}
              />
              <div className="Aceptar-Cancelar">
                <button onClick={handleAceptar}>Aceptar</button>
                <button onClick={handleCancelar}>Cancelar</button>
              </div>
            </div>
          )}
          <button className="b1" onClick={handleEliminarFoto}>Eliminar Foto</button>
          {mostrarConfirmacion && (
            <div className="eliminar-foto">
              <p className="confirmacion-texto">¿Estás seguro que deseas eliminar tu foto de perfil?</p>
              <div className="Aceptar-Cancelar">
                <button onClick={handleAceptarEliminar}>Aceptar</button>
                <button onClick={handleCancelar}>Cancelar</button>
              </div>
            </div>
          )}
          </div>
        </section>
        <section className="right-section">
          <div className="div-right-section">
          <h1>Perfil</h1>
          {perfilUsuario ? (
            <>
            <div className="formulario-perfil">
            <div className='input'>
                <p>Nombre</p>
                <input type="text" value={nombre} onChange={handleChangeNombre} className="text-input"/>
              </div>
              <div className='input'>
                <p>Apellido</p>
                <input type="text" value={apellido} onChange={handleChangeApellido} className="text-input"/>
              </div>
              <div className='input'>
                <p>Telefono</p>
                <input type="text" value={telefono} onChange={handleChangeTelefono} className="text-input"/>
              </div>
              <div className='input'>
                <p>Correo</p>
                <input type="text" value={correo} onChange={handleChangeCorreo} className="text-input"/>
              </div>
              <div className="botones-formulario">
              <button onClick={handleActualizarPerfil}>Actualizar perfil</button>
              <button onClick={handleCancelar1}>Cancelar</button>
              </div>
              </div>
            </>
          ) : (
            <p>Cargando perfil de usuario...</p>
          )}
            <>
            <div>
              <h2>Tus Grupos</h2>
              <ul>
                {membresias.map(club => (
                  <li key={club.id}>{club.nombre}</li>
                ))}
              </ul>
              </div>
            </>
          </div>
        </section>
      </div>
      </div>
  );
}

