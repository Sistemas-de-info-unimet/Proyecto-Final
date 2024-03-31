import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../Firebase';
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { useAuth } from '../contexts/AuthContext'; 
import { auth } from '../Firebase';

function GrupoDetails() {
  const [perfilUsuario, setPerfilUsuario] = useState(null);
  const { id } = useParams(); 
  const [agrupacion, setAgrupacion] = useState(null);
  const [afiliados, setAfiliados] = useState([]);
  const navigate = useNavigate();
  const { currentUser, updateCurrentUserSuscripciones } = useAuth();
  const [userId, setUserId] = useState('');
  const user = auth.currentUser;

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
    const obtenerPerfilUsuario = async () => {
      try {
        

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
    obtenerDatosagrupacion();
  }, [id, navigate]);

  const handleSuscripcion = async () => {
    try {
      const userDocRef = doc(db, 'Estudiante', currentUser.uid);
      let nuevasSuscripciones;

      if (perfilUsuario && perfilUsuario.suscripciones && perfilUsuario.suscripciones.includes(id)) {
        // Si el estudiante ya está suscrito, se remueve la agrupación de sus suscripciones
        nuevasSuscripciones = perfilUsuario.suscripciones.filter(mId => mId !== id);
        await updateDoc(userDocRef, { suscripciones: arrayRemove(id) });

        // Se remueve al usuario de la lista de afiliados
        await updateDoc(doc(db, 'Agrupaciones', id), {
          afiliados: arrayRemove(currentUser.uid)});
      } else {
        // Si el estudiante no está suscrito, se agrega la agrupación a sus suscripciones
        nuevasSuscripciones = perfilUsuario ? [...perfilUsuario.suscripciones, id] : [id];
        await updateDoc(userDocRef, { suscripciones: arrayUnion(id) });
        await updateDoc(doc(db, 'Agrupaciones', id), {
          afiliados: arrayUnion(currentUser.uid)
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
    console.log(agrupacion),
    console.log(currentUser.uid),
    <div className="container">
      {agrupacion && (
        <>
          <div>

            <h1>{agrupacion.nombre}</h1>
            <p>{agrupacion.descripcion}</p>
            
          <div>
          <div>
                <h3>MISION:</h3>
                <p>{agrupacion.mision}</p>
              </div>
              <div>
                <h3>VISION:</h3>
                <p>{agrupacion.vision}</p>
              </div>
              <button onClick={handleSuscripcion}>
  {perfilUsuario.suscripciones.includes(id) ? 'Retirarse' : 'Unirse'}
</button>
              {afiliados.map((afiliado, index) => (
                <div key={index} className="card-afiliado">
                  <h2>{afiliado.nombre}</h2>

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