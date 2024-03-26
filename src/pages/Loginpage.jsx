import "./Loginpage.css"
import { useNavigate } from 'react-router-dom';

export default function Loginpage() {
    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate("/SignUp")
    }

    return (
<div className="container">
  <div className="card2">
    <div className="image-container2">
      <img className="imgprin" src="https://cruz-diez.com/media/af2dgdl0/chromostructure-dinduction-chromatique-unimet.jpg?width=1600&height=1200&rnd=133342375582930000" alt="Imagen de fondo"></img>
      <div className="text-container">
        <h2 className="aun-ntc">¿Aún no tienes cuenta?</h2>
        <br></br>
        <p className="parrafo-img">Crea tu cuenta en pocos pasos:</p>
        <button className="bt-crearc" onClick={handleButtonClick} type="button">Crear cuenta</button>
      </div> 
    </div>
    <div className="form-container">
      <h1 className="tit2">Iniciar Sesión</h1>
      <form>
        <label className="email">Email</label>
        <input placeholder=" hola@tuemail.com" type="email" id="email" name="email" required></input>
        <label className="password">Contraseña</label>
        <input placeholder="***************" type="password" id="password" name="password" required></input>
        <div className="cont-bot">
        <button className="bot-iniciars" type="submit">Iniciar sesión</button>
        </div>
        <div className="txt-inicias">        
            <br></br>
            <br></br>
            <p className="iniciacon">Inicia sesión con:</p>
        </div>
      </form>
      <div className="social-login">
        <button className="bt-img" type="button">
            <img src="./images/icono_google.png" alt="Google"></img>
        </button>
        <button className="bt-img" type="button">
            <img src="./images/icono_facebook.png" alt="Facebook"></img>
        </button>
      </div>
      <div className="preg">
      <p className="admin-link">¿Eres administrador? <a className="linkpagadmin" href="/LogInAdmin">Inicia sesión aquí</a></p>
      </div>
    </div>
  </div>
</div>
    );

}

