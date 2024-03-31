import { useState, useEffect } from 'react';
import { db } from '../Firebase';
import { collection, query, getDocs, where } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

function SearchBar() {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSearchResults = async () => {
            if (searchTerm.trim() === '') {
                setSearchResults([]);
                return;
            }

            const agrupacionesRef = collection(db, "Agrupaciones");
            const q1 = query(agrupacionesRef, where("nombre", ">=", searchTerm), where("nombre", "<=", searchTerm + '\uf8ff'));
            const q2 = query(agrupacionesRef, where("tipoDeGrupo", ">=", searchTerm), where("tipoDeGrupo", "<=", searchTerm + '\uf8ff'));

            const [querySnapshot1, querySnapshot2] = await Promise.all([getDocs(q1), getDocs(q2)]);
            const results1 = querySnapshot1.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            const results2 = querySnapshot2.docs.map(doc => ({ id: doc.id, ...doc.data() }));

            const combinedResults = [...results1, ...results2];
            const uniqueResults = combinedResults.filter((result, index, self) =>
                index === self.findIndex((r) => (r.id === result.id))
            );

            setSearchResults(uniqueResults);
        };

        fetchSearchResults();
    }, [searchTerm]);

    const handleClick = (groupId) => {
        navigate(`/grupo/${groupId}`); // FALTA CONECTAR A LAS RUTAS DE GRUPO POR GROUP ID
    };

    
    return (
        <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: "center", flexDirection: 'column', padding: '20px', width: '100%', backgroundColor: '#ff7f00' }}>
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar Agrupaciones..."
                style={{ padding: '10px', width: '300px', margin: '0 auto', borderRadius: '5px', border: '1px solid #ddd' }}
            />
            <div style={{ position: 'absolute', top: '60px', width: '300px', backgroundColor: '#fff', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '5px', padding: '10px', display: searchTerm ? 'block' : 'none' }}>
            {searchResults.length > 0 ? (
                    searchResults.map((result) => (
                        <div key={result.id} onClick={() => handleClick(result.id)} style={{ cursor: 'pointer', /* otros estilos para tus resultados */ }}>
                            <h4>{result.nombre}</h4>
                            <p>{result.tipoDeGrupo}</p>
                        </div>
                    ))
                ) : (
                    <p>No se encontraron resultados</p>
                )}
            </div>
        </div>
    );
}

export default SearchBar;
