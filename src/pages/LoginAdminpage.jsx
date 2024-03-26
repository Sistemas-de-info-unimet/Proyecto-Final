import "./LoginAdminpage.css"
export default function LoginAdminpage() {
    return (
<div className="container">
  <div className="card3">
    <div className="image-container">
      <img src="imagen.jpg" alt="Imagen de fondo"></img>
      <div className="text-container">
        <h2>Inicio de sesión - Administración</h2>
        <p>Accede al panel de administración</p>
      </div>
    </div>
    <div className="form-container">
      <h1>Iniciar sesión como Admin</h1>
      <form>
        <label className="email">Correo electrónico</label>
        <input type="email" id="email" name="email" required></input>
        <label className="password">Contraseña</label>
        <input type="password" id="password" name="password" required></input>
        <label className="identificador">Identificador</label>
        <input type="text" id="identificador" name="identificador" required></input>
        <label className="llave">Llave</label>
        <input type="password" id="llave" name="llave" required></input>
        <button type="submit">Iniciar sesión</button>
      </form>
      <p><a href="#">¿Eres estudiante? Inicia sesión aquí</a></p>
    </div>
  </div>
</div>
    );
    }