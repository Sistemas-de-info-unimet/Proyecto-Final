import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../Firebase';
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove, collection, query, where, getDocs } from 'firebase/firestore';
import { useAuth } from '../contexts/AuthContext'; 
import { auth } from '../Firebase';
import Card from "../components/Card";
import AddComment from './AddComment';
import Header from './Header';
import Footer from './Footer';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js"; // Importa PayPalScriptProvider y PayPalButtons
import './GrupoDetails.css'; 

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
        nuevasSuscripciones = perfilUsuario.suscripciones.filter(mId => mId !== id);
        await updateDoc(userDocRef, { suscripciones: arrayRemove(id) });
        await updateDoc(doc(db, 'Agrupaciones', id), {
          afiliados: arrayRemove(currentUser.displayName)
        });
        
      } else {

        nuevasSuscripciones = perfilUsuario ? [...perfilUsuario.suscripciones, id] : [id];
        await updateDoc(userDocRef, { suscripciones: arrayUnion(id) });
        await updateDoc(doc(db, 'Agrupaciones', id), {
          afiliados: arrayUnion(currentUser.displayName)
        });
      }

      setPerfilUsuario(prevPerfilUsuario => ({
        ...prevPerfilUsuario,
        suscripciones: nuevasSuscripciones
      }));
    } catch (error) {
      console.error('Error al manejar la suscripción:', error);
    }
  };

  return (
    <>
      <Header />
      <PayPalScriptProvider options={{ "client-id": "ARHow9A_vOoStwsK8GMcMtN9z7KoOujFs_3Sc0zM3TFkXWGguNwsBJSdF6F3bA6aGGWxpn16XHf0r0Ej" }}>
        <div>

          {agrupacion && (
            <>
              <div className='banner'>
                <h1 className='h1'>{agrupacion.nombre}</h1>
                <div className='section-1'>
                  <div className='simple-div'>
                      <h2>Sé parte de la Agrupación</h2>
                      <button onClick={handleSuscripcion} className='button'>
                        {perfilUsuario && perfilUsuario.suscripciones && perfilUsuario.suscripciones.includes(id)
                          ? 'Retirarse'
                          : 'Unirse'}
                      </button>
                    </div>
                    <div className='photo-container'>
                    <img src={agrupacion.foto} className='GroupPhoto'/>
                    </div>
                  <div className='simple-div'>
                  <h2>Colaborar con la Agrupación</h2>
                  <PayPalButtons className='paypal'
                    createOrder={(data, actions) => {
                      return actions.order.create({
                        purchase_units: [
                          {
                            amount: {
                              value: '1.00',
                            },
                          },
                        ],
                      });
                    }}
                    onApprove={(data, actions) => {
                      return actions.order.capture().then(function(details) {
                        alert('Transaction completed by ' + details.payer.name.given_name);
                      });
                    }}
                  />
                  </div>
                  </div>
                  </div>
              <div className='card-container'>
                <Card icon="https://cdn-icons-png.flaticon.com/128/9254/9254538.png" title="Descripción" text={agrupacion.descripcion} />
                <Card icon="https://cdn-icons-png.flaticon.com/128/9254/9254638.png" title="Misión" text={agrupacion.mision} />
                <Card icon="https://cdn-icons-png.flaticon.com/128/4055/4055993.png" title="Visión" text={agrupacion.vision} />
              </div>
              <div>
                <div className='section-2'>
                <div className='simple-div-2'>
                  <h2 className='h2-d'>Participantes:</h2>
                  <ul>
                    {agrupacion.afiliados.map((nombre, index) => (
                      <li key={index}>{nombre}</li>
                    ))}
                  </ul>
                </div>
                <div className='simple-div-2'>
                <h2 className='h2-d'>Comentarios:</h2>
                <ul>
                {agrupacion.comentarios.map((content, index) => (
                <li key={index}>{content.comment}, por {content.nombre}</li>
              ))}
                </ul>
                <AddComment id={id}/>
                </div>
              </div>
              </div>
            </>
          )}
        </div>
      </PayPalScriptProvider>
      <Footer/>
    </>
  );
}

export default GrupoDetails;

