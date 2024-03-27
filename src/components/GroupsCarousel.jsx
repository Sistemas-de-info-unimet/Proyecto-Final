import { useState, useEffect } from 'react';
import { db } from '../Firebase'; 
import { collection, query, where, getDocs } from 'firebase/firestore';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

function GroupsCarousel() {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const fetchGroups = async () => {
      const q = query(collection(db, "Agrupaciones"), where("estado", "==", "activo"));
      const querySnapshot = await getDocs(q);
      const groupData = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      }));
      setGroups(groupData);
    };

    fetchGroups();
  }, []);

  return (
    <div className="slide-container">
      <Slide>
        {groups.map((group) => (
          <div key={group.id} className="each-slide" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <img src={group.foto} alt={group.nombre} style={{ maxWidth: '100%', maxHeight: '300px' }} />
            <h2>{group.nombre}</h2>
            <p>{group.descripcion}</p>
            <button style={{ padding: '10px 20px', marginTop: '10px' }}>Ver más</button>
          </div>
        ))}
      </Slide>
    </div>
  );
}

export default GroupsCarousel;
