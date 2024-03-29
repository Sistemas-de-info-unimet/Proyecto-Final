import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../Firebase';
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { useAuth } from '../contexts/AuthContext'; 

function GrupoDetails() {
  const { id } = useParams(); 
  const [grupo, setGrupo] = useState(null);
  const [comentarios, setComentarios] = useState([]);
  const [miembros, setMiembros] = useState([]);
  const navigate = useNavigate();
  const { currentUser, updateCurrentUserMembresias } = useAuth();

  useEffect(() => {
    const obtenerDatosGrupo = async () => {
      // Obtener información del grupo
      const docRef = doc(db, "grupos", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setGrupo(docSnap.data());
        const comentariosPromesas = docSnap.data().comentarios.map(async (comentarioId) => {
          const comentarioRef = doc(db, "comentarios", comentarioId);
          const comentarioSnap = await getDoc(comentarioRef);
          return comentarioSnap.exists() ? comentarioSnap.data() : null;
        });
        const comentarios = await Promise.all(comentariosPromesas);
        setComentarios(comentarios.filter(comentario => comentario !== null));
  
        // Obtener miembros del grupo
        const miembrosPromesas = docSnap.data().miembros.map(async (miembroId) => {
          const miembroRef = doc(db, "usuarios", miembroId);
          const miembroSnap = await getDoc(miembroRef);
          return miembroSnap.exists() ? miembroSnap.data() : null;
        });
        const miembros = await Promise.all(miembrosPromesas);
        setMiembros(miembros.filter(miembro => miembro !== null));
      } else {
        navigate('/'); 
      }
    };
  
    obtenerDatosGrupo();
  }, [id, navigate]);
}
export default GrupoDetails;