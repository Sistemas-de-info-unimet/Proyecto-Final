import { useState } from 'react';

function SearchBar() {
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: "center", flexDirection: 'column', padding: '20px', width: '100%', backgroundColor: '#ff7f00' }}>
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar..."
                style={{ padding: '10px', width: '300px', margin: '0 auto', borderRadius: '5px', border: '1px solid #ddd' }}
            />
            {/* Contenedor para resultados de búsqueda (futuro uso) */}
            <div style={{ position: 'absolute', top: '60px', width: '300px', backgroundColor: '#fff', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '5px', padding: '10px', display: searchTerm ? 'block' : 'none' }}>
                {/* Resultados de búsqueda irán aquí */}
                {/* Este es solo un marcador de posición */}
                <p>Resultados para "{searchTerm}"</p>
            </div>
        </div>
    );
}

export default SearchBar;
