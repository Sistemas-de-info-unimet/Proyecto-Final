import Logo from '../assets/LogoOpenG.png'

export default function AdminDashBoard(){
    []
    return (
        <>
        <div className="DashboardHeader">
            <img src={Logo} alt="not found" />
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfUjUIUOUr2zEwuhLh4Q_qziqXtIHwEyyMEwRXsK34aQ&s" alt="not found" />
        </div>
        <div className="AdminInfoSeccion">
            <input type="text" className="Email" placeholder="Ingrese Correo"/>
            <input type="password" className="Password" placeholder="Ingrese contraseña"/>
            <button className="AndminInfoChange">Actualizar datos</button>
        </div>
        <div className="GroupsSection">
            <button className="CreateGroup">Crear nuevo Grupo</button>
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
