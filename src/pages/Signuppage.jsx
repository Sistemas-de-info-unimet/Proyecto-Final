import "./Signuppage.css"
export default function Signuppage() {
    return (
        <div className="container">
  <div className="card1">
    <div className="image-container">
      <img src="imagen.jpg" alt="Imagen de fondo"></img>
      <div className="text-container">
        <h2>¿Aún no tienes cuenta?</h2>
        <p>Crea tu cuenta en pocos pasos:</p>
        <button type="button">Crear cuenta</button>
      </div>
    </div>
    <div className="form-container">
      <h1>Registro</h1>
      <form>
        <label className="nombre">Nombre</label>
        <input type="text" id="nombre" name="nombre" required></input>
        <label className="apellido">Apellido</label>
        <input type="text" id="apellido" name="apellido" required></input>
        <label className="email">Correo electrónico</label>
        <input type="email" id="email" name="email" required></input>
        <label className="telefono">Teléfono</label>
        <input type="tel" id="telefono" name="telefono" required></input>
        <label className="password">Contraseña</label>
        <input type="password" id="password" name="password" required></input>
        <button type="submit">Registrarse</button>
        <div className="social-login">
          <button type="button">Registrarse con Google</button>
          <button type="button">Registrarse con Facebook</button>
        </div>
        <div className="links">
          <p><a href="#">Ya estás registrado? Inicia sesión</a></p>
          <p><a href="#">¿Eres administrador Inicia sesión como administrador</a></p>
        </div>
      </form>
    </div>
  </div>
</div>
    );

}