import "./Loginpage.css"
export default function Loginpage() {
    return (
<div className="container">
  <div className="card">
    <div className="image-container">
      <img src="imagen.jpg" alt="Imagen de fondo"></img>
      <div className="text-container">
        <h2>¿Aún no tienes cuenta?</h2>
        <p>Crea tu cuenta en pocos pasos:</p>
        <button type="button">Crear cuenta</button>
      </div> 
    </div>
    <div className="form-container">
      <h1>Iniciar sesión</h1>
      <form>
        <label className="email">Correo electrónico</label>
        <input type="email" id="email" name="email" required></input>
        <label className="password">Contraseña</label>
        <input type="password" id="password" name="password" required></input>
        <button type="submit">Iniciar sesión</button>
      </form>
      <div className="social-login">
        <button type="button">Iniciar sesión con Google</button>
        <button type="button">Iniciar sesión con Facebook</button>
      </div>
      <p className="admin-link">¿Eres administrador? <a href="#">Inicia sesión aquí</a></p>
    </div>
  </div>
</div>
    );

}

