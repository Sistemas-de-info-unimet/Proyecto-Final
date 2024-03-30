import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../Firebase';
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { useAuth } from '../contexts/AuthContext'; 

function GrupoDetails() {
  const { id } = useParams(); 
  const [agrupacion, setAgrupacion] = useState(null);
  const [afiliados, setAfiliados] = useState([]);
  const navigate = useNavigate();
  const { currentUser, updateCurrentUserSuscripciones } = useAuth();

  useEffect(() => {
    const obtenerDatosagrupacion = async () => {
      // Obtener información del agrupacion
      const docRef = doc(db, "Agrupaciones", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setAgrupacion(docSnap.data());
        const afiliadosPromesas = docSnap.data().afiliados.map(async (afiliadoId) => {
          const afiliadoRef = doc(db, "Afiliado", afiliadoId);
          const afiliadoSnap = await getDoc(afiliadoRef);
          return afiliadoSnap.exists() ? afiliadoSnap.data() : null;
        });
        const afiliados = await Promise.all(afiliadosPromesas);
        setAfiliados(afiliados.filter(afiliado => afiliado !== null));
      } else {
        navigate('/'); 
      }
    };

    obtenerDatosagrupacion();
  }, [id, navigate]);

  const toggleAfiliacion = async () => {
    if (!currentUser || !currentUser.docId) return;
  
    const userDocRef = doc(db, "Estudiantes", currentUser.docId);
    let nuevasSuscripciones;
  
    if (currentUser.suscripciones.includes(id)) {
      nuevasSuscripciones = currentUser.suscripciones.filter(mId => mId !== id);
      await updateDoc(userDocRef, {
        Suscripciones: arrayRemove(id)
      });
    } else {
      nuevasSuscripciones = [...currentUser.suscripciones, id];
      await updateDoc(userDocRef, {
        Suscripciones: arrayUnion(id)
      });
    }
    updateCurrentUserSuscripciones(nuevasSuscripciones);
  };

  return (
    <div className="container">
      {agrupacion && (
        <>
          <div>
            <h1>{agrupacion.nombre}</h1>
            <p>{agrupacion.descripcion}</p>
            <button onClick={toggleAfiliacion}>
              {currentUser.Suscripciones.includes(id) ? 'Retirarse' : 'Afiliarse'}
            </button>
          <div>
              {videoafiliados.map((afiliado, index) => (
                <div key={index} className="card-afiliado">
                  <h2>{afiliado.titulo}</h2>
                  <p>Género: {afiliado.genero}</p>
                  <p>{afiliado.descripcion}</p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}


export default GrupoDetails;