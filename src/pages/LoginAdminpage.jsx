import "./LoginAdminpage.css"
export default function LoginAdminpage() {
    return (
<div className="container">
  <div className="card3">
    <div className="image-container3">
      <img className="imgprin3" src="https://i.pinimg.com/736x/92/53/e0/9253e0bf8a4ed9ee822171963e082f9f.jpg" alt="Imagen de fondo"></img>
    </div>
    <div className="form-container">
      <h1 className="tit3">Iniciar sesión como Admin.</h1>
      <form>
        <label className="email">Correo electrónico</label>
        <input placeholder=" hola@tuemail.com" type="email" id="email" name="email" required ></input>
        <label className="password">Contraseña</label>
        <input placeholder="***************" type="password" id="password" name="password" required></input>
        <label className="identificador">Identificador</label>
        <input placeholder="AD2E230DAXC8AD1" type="text" id="identificador" name="identificador" required></input>
        <label className="llave">Llave</label>
        <input placeholder="***************" type="password" id="llave" name="llave" required></input>
        <div className="cont-bt">
        <button className="bot-iniciars" type="submit">Iniciar sesión</button>
        </div>
      </form>
      <div className="preg">
      <br></br>
      <br></br>
      <p  className="admin-link">¿Eres estudiante? <a  className="admin-link" href="/">Inicia sesión aquí</a></p>
      </div>
    </div>
  </div>
</div>
    );
    }