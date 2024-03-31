import { useState } from 'react'
import Logo from '../assets/LogoOpenG.png'

export default function AdminDashBoard(){
    //*varianble declaration
    const [adminEmail, setAdminEmail] = useState("")
    const [adminPassword, setAdminPassword]  = useState("");

    const [groupName, setGroupName] = useState("")
    const [mission, setMission] = useState("")
    const [vision, setVision] = useState("")
    const [contactEmail, setContactEmail] = useState("")
    const [groupType, setGroupeType] = useState("")
    const [active, setActive] = useState(false)

    //*handles
    const handleAdminEmail = (e)=>{setAdminEmail(e.target.value)}
    const handleAdminPassword = (e)=> {setAdminPassword(e.target.value);}

    const handleName = (e) =>{setGroupName(e.target.value)}
    const handleMission = (e ) =>{setMission(e.target.value)}
    const handleVision = (e)=> {setVision(e.target.value)} 
    const handleContactEmail = (e) =>{setContactEmail(e.target.value)}
    const handleGroupType = (e) =>{setGroupeType(e.target.value)}
    const handleActive = (e) =>{setActive(e.target.checked)}
    const handleCreateGroup = () =>{}

    const UnimetLogo = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfUjUIUOUr2zEwuhLh4Q_qziqXtIHwEyyMEwRXsK34aQ&s"
    return (
    <>
    <div className="DashboardHeader">
        <img src={Logo} alt="not found" id="OpenGroUP" height={150} width={300}/>
        <img src={UnimetLogo} alt="not found" id='UnimetLogo'/>
    </div>
    <div className="AdminInfoSeccion">
        <input type="text" className="Email" value={adminEmail} onChange={handleAdminEmail} placeholder='admin email'/>
        <input type="password" className="Password" value={adminPassword} placeholder="*******" onChange={handleAdminPassword} />
        <button className="AndminInfoChange">Actualizar datos</button>
    </div>

    <div className="GroupsSection">
        
        <form action="" className="CreateGroupForm">
            <p>Nombre de la Agrupación</p>
            <input type="text" value={groupName} onChange={handleName} required/>

            <p>Misión y Visión</p>
            <input type="text" placeholder='Misión' required value={mission} onChange={handleMission} />
            <input type="text" placeholder='Visión' required value={vision} onChange={handleVision} />
            <p>Estado:</p>
            <input type="radio" name="isActive" id="active" value={true} onChange={handleActive} checked={active===true}/>
            <label htmlFor='active'>Activo</label>
            <input type="radio" name="isActive" id="notActive" value={false} onChange={handleActive} checked={active===false}/>
            <label htmlFor='notActive'>Desactivo</label>

            <p>Correo de contacto</p>
            <input type="text" value={contactEmail} onChange={handleContactEmail} required/>

            <p>Tipo de agrupación</p>
            <input type="text" value={groupType} onChange={handleGroupType} required/>

            <p>Selecione imagen(es)</p>
            <input type="file" name="" id="" required/>

            <button className='Submit' onClick={handleCreateGroup}>Crear agrupación</button>
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
