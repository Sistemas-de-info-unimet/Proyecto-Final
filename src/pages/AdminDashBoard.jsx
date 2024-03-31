import React from 'react'

export const AdminDashBoard = () => {
    return (
        <>
        <div className="DashboardHeader">
            <img src="" alt="not found" />
            <img src="" alt="not found" />
        </div>
        <div className="AdminInfoSeccion">
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
