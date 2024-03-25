import "./Loginpage.css"
export default function Loginpage() {
    return (
        <div className="container">
        <div className="form-container">
          <form>
            <h1>Iniciar sesión</h1>
            <label className="email">Correo electrónico</label>
            <input type="email" id="email" name="email" required></input>
            <label className="password">Contraseña</label>
            <input type="password" id="password" name="password" required></input>
            <button type="submit">Iniciar sesión</button>
          </form>
        </div>
        {/* <div className="image-container">
          <img src="https://www.unimet.edu.ve/wp-content/uploads/2023/09/Ingenieria-de-Sistemas.jpg" alt="Imagen de fondo"></img>
          <div className="text-container">
            <h2>¿Aún no tienes cuenta?</h2>
            <p>Crea tu cuenta en pocos pasos:</p>
            <button type="button">Crear cuenta</button>
          </div>
      </div> */}
      </div>
    );

}

