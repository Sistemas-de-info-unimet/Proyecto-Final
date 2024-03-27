import React from 'react'

export const AdminDashBoard = () => {
    return (
        <>
        <div className="Header">
            <img src="" alt="not found" className="OpenGroupUP"/>
            <img src="" alt="not found" className="UniLogo" />
            <h1>UNIMET</h1>
            <h1>OpenGroupUP</h1>
        </div>
        <div className="AdminInfo">
            <input type="text" className="Email" placeholder="Ingrese Correo"/>
            <input type="password" className="Password" placeholder="Ingrese contraseña"/>
            <button className="AndminInfoChange">Actualizar datos</button>
        </div>
        <div className="GroupsSection">
            <button className="CreateGroup">Crear nuevo Grupo</button>
            <div class="ModifySeccion">
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
