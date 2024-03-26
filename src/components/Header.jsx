import { useState } from 'react';
import Logo from '../assets/LogoOpenG.png';

function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    // FALTA AGREGAR TODA LA LOGICA RELACIONA AL LOGIN CON USE AUTH
    return (
        <header className='Header-cont' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 20px', backgroundColor: '#ff7f00', flexWrap: "wrap"}}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: "center" }}>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfUjUIUOUr2zEwuhLh4Q_qziqXtIHwEyyMEwRXsK34aQ&s" alt="Logo 1" style={{ marginRight: '10px', maxHeight: "80px" }} />
            <img src={Logo} alt="Logo 2" style={{ maxHeight: "70px" }}/>
        </div>
        <div>
        {isLoggedIn && (
            <button style={{ padding: '10px 20px', cursor: 'pointer', marginRight: '10px', backgroundColor:"#FDEBDA", color: "#ff7f00"}}>
                Mi Perfil
            </button>
            )}
            <button onClick={() => setIsLoggedIn(!isLoggedIn)} style={{ padding: '10px 20px', cursor: 'pointer', backgroundColor:"#FDEBDA", color: "#ff7f00"}}>
            {isLoggedIn ? 'Cerrar Sesión' : 'Inicio de sesión / Registro'}
            </button>
        </div>
        </header>
  );
}

export default Header;
