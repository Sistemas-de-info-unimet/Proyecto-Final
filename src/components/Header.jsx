import { useAuth } from '../contexts/AuthContext'; // Ajusta la ruta de importación según tu estructura
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../Firebase'; // Asegúrate de que esta ruta sea correcta
import Logo from '../assets/LogoOpenG.png';

function Header() {
    const { currentUser, updateCurrentUser } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await signOut(auth);
            updateCurrentUser(null);
            navigate('/Home');
        } catch (error) {
            console.error("Error al cerrar sesión:", error.message);
        }
    };

    return (
        <header className='Header-cont' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 20px', backgroundColor: '#ff7f00', flexWrap: "wrap"}}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: "center" }}>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfUjUIUOUr2zEwuhLh4Q_qziqXtIHwEyyMEwRXsK34aQ&s" alt="Logo 1" style={{ marginRight: '10px', maxHeight: "80px" }} />
                <img onClick={() => navigate('/Home')} src={Logo} alt="Logo 2" style={{ maxHeight: "70px" , cursor: 'pointer'}}/>
            </div>
            <div>
                {currentUser ? (
                    <>
                        <button onClick={() => navigate('/Profile')} style={{ padding: '10px 20px', cursor: 'pointer', marginRight: '10px', backgroundColor:"#FDEBDA", color: "#ff7f00"}}>
                            Mi Perfil
                        </button>
                        <button onClick={handleLogout} style={{ padding: '10px 20px', cursor: 'pointer', backgroundColor:"#FDEBDA", color: "#ff7f00"}}>
                            Cerrar Sesión
                        </button>
                    </>
                ) : (
                    <button onClick={() => navigate('/')} style={{ padding: '10px 20px', cursor: 'pointer', backgroundColor:"#FDEBDA", color: "#ff7f00"}}>
                        Inicio de sesión / Registro
                    </button>
                )}
            </div>
        </header>
    );
}

export default Header;