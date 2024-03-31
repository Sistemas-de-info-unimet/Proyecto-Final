import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../Firebase';
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove, collection, query, where, getDocs } from 'firebase/firestore';
import { useAuth } from '../contexts/AuthContext'; 
import { auth } from '../Firebase';

function GrupoDetails() {
  const [perfilUsuario, setPerfilUsuario] = useState(null);
  const { id } = useParams(); 
  const [agrupacion, setAgrupacion] = useState(null);
  const [participantes, setParticipantes] = useState([]);
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const user = auth.currentUser;

  useEffect(() => {
    const obtenerDatosAgrupacion = async () => {
      try {
        const docRef = doc(db, 'Agrupaciones', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setAgrupacion(docSnap.data());
          setParticipantes(docSnap.data().afiliados); // Establecer afiliados en el estado
          const participantesPromesas = docSnap.data().afiliados.map(async (afiliadoId) => {
            const afiliadoDocRef = doc(db, 'Estudiante', afiliadoId);
            const afiliadoDocSnap = await getDoc(afiliadoDocRef);
            return afiliadoDocSnap.exists() ? afiliadoDocSnap.data().nombre : null;
          });
          const participantesNombres = await Promise.all(participantesPromesas);
          setParticipantes(participantesNombres.filter(nombre => nombre !== null));
        } else {
          navigate('/');
        }
      } catch (error) {
        console.error('Error al obtener datos de la agrupación:', error);
      }
    };

    const obtenerPerfilUsuario = async () => {
      try {
        if (user) {
          const docRef = doc(db, 'Estudiante', user.uid);
          const docSnap = await getDoc(docRef);
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
    obtenerDatosAgrupacion();
  }, [id, navigate]);

  const handleSuscripcion = async () => {
    try {
      const userDocRef = doc(db, 'Estudiante', currentUser.uid);
      let nuevasSuscripciones;

      if (perfilUsuario && perfilUsuario.suscripciones && perfilUsuario.suscripciones.includes(id)) {
        // Si el estudiante ya está suscrito, se remueve la agrupación de sus suscripciones
        nuevasSuscripciones = perfilUsuario.suscripciones.filter(mId => mId !== id);
        await updateDoc(userDocRef, { suscripciones: arrayRemove(id) });
        await updateDoc(doc(db, 'Agrupaciones', id), {
          afiliados: arrayRemove(currentUser.displayName)
        });
        
      } else {
        // Si el estudiante no está suscrito, se agrega la agrupación a sus suscripciones
        nuevasSuscripciones = perfilUsuario ? [...perfilUsuario.suscripciones, id] : [id];
        await updateDoc(userDocRef, { suscripciones: arrayUnion(id) });
        await updateDoc(doc(db, 'Agrupaciones', id), {
          afiliados: arrayUnion(currentUser.displayName)
        });
      }

      // Actualizar el estado local con las nuevas suscripciones
      setPerfilUsuario(prevPerfilUsuario => ({
        ...prevPerfilUsuario,
        suscripciones: nuevasSuscripciones
      }));
    } catch (error) {
      console.error('Error al manejar la suscripción:', error);
    }
  };

  return (

    <div className="container">
      {agrupacion && (
        <>
          <div>
            <h1>{agrupacion.nombre}</h1>
            <p>{agrupacion.descripcion}</p>
          </div>
          <div>
            <h3>MISION:</h3>
            <p>{agrupacion.mision}</p>
          </div>
          <div>
            <h3>VISION:</h3>
            <p>{agrupacion.vision}</p>
          </div>
          <button onClick={handleSuscripcion}>
            {perfilUsuario && perfilUsuario.suscripciones && perfilUsuario.suscripciones.includes(id)
              ? 'Retirarse'
              : 'Unirse'}
          </button>
          <div>
            <h3>PARTICIPANTES:</h3>
            <ul>
              {agrupacion.afiliados.map((nombre, index) => (
                <li key={index}>{nombre}</li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}

export default GrupoDetails;
