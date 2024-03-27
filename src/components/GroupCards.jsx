import { useState, useEffect } from 'react';
import { db } from '../Firebase';
import { collection, getDocs } from 'firebase/firestore';

const GroupCards = () => {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const fetchGroups = async () => {
      const querySnapshot = await getDocs(collection(db, "Agrupaciones"));
      const groupsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setGroups(groupsData);
    };

    fetchGroups();
  }, []);

  return (
    <div style={{ 
      display: 'flex', 
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '20px', 
      padding: '20px', 
    }}>
      {groups.map((group) => (
        <div key={group.id} style={{ 
          flex: '1', 
          minWidth: '300px',
          maxWidth: '300px',
          minHeight: '500px',
          maxHeight: '500px',
          boxShadow: '0 2px 5px rgba(0,0,0,0.2)' 
        }}>
          <img src={group.foto} alt={group.nombre} style={{ 
            width: '100%', 
            height: '200px', 
            objectFit: 'cover' 
          }} />
          <div style={{ padding: '10px' }}>
            <h3>{group.nombre}</h3>
            <p>{group.tipoDeGrupo}</p>
            <p>{group.descripcion}</p>
            <button style={{ padding: '10px', marginTop: '10px', backgroundColor: '#ff7f00' }}>Ver más</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GroupCards;
