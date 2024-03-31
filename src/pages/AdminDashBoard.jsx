import Logo from '../assets/LogoOpenG.png'

export default function AdminDashBoard(){
    return (
        <>
        <div className="DashboardHeader">
            <img src={Logo} alt="not found" />
            <img src="" alt="not found" />
        </div>

        <div className="AdminInfoSeccion">
            <input type="text" className="Email" placeholder="Ingrese Correo"/>
            <input type="password" className="Password" placeholder="Ingrese contraseña"/>
            <button className="AndminInfoChange">Actualizar datos</button>
        </div>

        <div className="GroupsSection">
            
            <form action="" className="CreateGroupForm">
                <p>Nombre de la Agrupación</p>
                <input type="text" placeholder='Nombre' />
                <p>Misión y Visión</p>
                <input type="text" placeholder='Misión' />
                <input type="text" placeholder='Visión' />

                <p>Estado:</p>
                <input type="radio" name="isActive" id="active" value="Activo"/>
                <label htmlFor='active'>Activo</label>
                <input type="radio" name="isActive" id="notActive" value="Desactivo"/>
                <label htmlFor='notActive'>Desactivo</label>


                <button className="CreateGroup">Crear nuevo Grupo</button>
            </form>

            <div className="ModifySeccion">
                <input type="text" placeholder='Ingrese grupo para  buscar...'/>
                <div>
                    <button className="UpdateButton">Editar</button>
                    <button className="DeleteButton">Eliminar</button>
                </div>
            </div>
        </div>

        </>
    )
}
