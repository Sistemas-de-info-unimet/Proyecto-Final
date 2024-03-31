import { useState } from 'react'
import Logo from '../assets/LogoOpenG.png'
import Swal from 'sweetalert2';
import {setDoc, doc} from "firebase/firestore";
import { db } from "../Firebase";
import "./AdminDashBoard.css"


export default function AdminDashBoard(){

    const UnimetLogo = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfUjUIUOUr2zEwuhLh4Q_qziqXtIHwEyyMEwRXsK34aQ&s"
    
    //*varianble declaration
    const [adminEmail, setAdminEmail] = useState("")
    const [adminPassword, setAdminPassword]  = useState("");

    const [groupName, setGroupName] = useState("")
    const [mission, setMission] = useState("")
    const [vision, setVision] = useState("")
    const [contactEmail, setContactEmail] = useState("")
    const [groupType, setGroupeType] = useState("")
    const [active, setActive] = useState(false)
    const [description, setDescription] = useState("")

    const [search, setSearch] = useState("")

    //*handles
    const handleAdminEmail = (e)=>{setAdminEmail(e.target.value)}
    const handleAdminPassword = (e)=> {setAdminPassword(e.target.value);}

    const handleName = (e) =>{setGroupName(e.target.value)}
    const handleMission = (e ) =>{setMission(e.target.value)}
    const handleVision = (e)=> {setVision(e.target.value)} 
    const handleContactEmail = (e) =>{setContactEmail(e.target.value)}
    const handleGroupType = (e) =>{setGroupeType(e.target.value)}
    const handleActive = (e) =>{setActive(e.target.checked)}
    const handleDescription = (e) =>{setDescription(e.target.value)}

    const handleCreateGroup = async (groupName, mission, vision, contactEmail, groupType, active, description) =>{
        const isValidEmail = validateEmail(contactEmail)
        if (!isValidEmail){
            Swal.fire({
                title: '¡Error!',
                text: 'El correo electrónico ingresado no es válido',
                icon: 'error',
                confirmButtonText: 'OK'
            })
            return;
        }
        try{
            const currentState = active==true? "activo":"desactivo"
            await setDoc(doc(db,"Agrupaciones",),
            {
                afiliados:[],
                comentarios:[],
                contacto:contactEmail,
                descripcion:description,
                estado:currentState,
                //Todo foto
                mision:mission,
                vision:vision,
                name: groupName,
                tipoDeGrupo:groupType
            })
        }catch(e){
        }

    }
    const handleSearch = (e) =>{setSearch(e.target.value)}

    const createGroup = (e) =>{
        e.preventDefault()
        handleCreateGroup(groupName, mission, vision, contactEmail, groupType, active, description)
    }
    
    function validateEmail(email) {
        const regex = /^[\w-.]+@correo\.unimet\.edu\.ve$/;
        return regex.test(email);
    }
    
    return (
    <>
    <div className="DashboardHeader">
        <img src={Logo} alt="not found" />
        <img src={UnimetLogo} alt="not found" />
    </div>
    <div className="AdminInfoSeccion">
        <p>Información de admin</p>
        <div className='conainerAdminImput'>
            <input type="password" className="Password" value={adminPassword} placeholder="*******" onChange={handleAdminPassword} />
            <input type="text" className="Email" value={adminEmail} onChange={handleAdminEmail} placeholder='admin email'/>
        </div>
        <button className="AndminInfoChange">Actualizar datos</button>
    </div>
    <hr className="line" />
    <div className="GroupsSection">
        
        <form action="" className="CreateGroupForm" onSubmit={createGroup}>
            <div className="groupContainer">
            <div>
                <p>Nombre de la Agrupación</p>
                <input type="text" value={groupName} onChange={handleName} required/>
            </div>
            <div>
                <p>Misión y Visión</p>
                <input type="text" placeholder='Misión' required value={mission} onChange={handleMission} />
                <input type="text" placeholder='Visión' required value={vision} onChange={handleVision} />
            </div>
            <div>
                <p>Descripción</p>
                <input type="text" required value={description} onChange={handleDescription} />
            </div>
            <div>
                <p>Estado:</p>
                <div className='radioContainer'>
                    <input type="radio" name="isActive" id="active" value={true} onChange={handleActive} checked={active===true}/>
                    <label htmlFor='active'>Activo</label>
                </div>
                <div className="radioContainer">
                    <input type="radio" name="isActive" id="notActive" value={false} onChange={handleActive} checked={active===false}/>
                    <label htmlFor='notActive'>Desactivo</label>
                </div>
            </div>
            <div>
                <p>Correo de contacto</p>
                <input type="text" value={contactEmail} onChange={handleContactEmail} required/>
            </div>
            <div>
                <p>Tipo de agrupación</p>
                <input type="text" value={groupType} onChange={handleGroupType} required/>
            </div>
            <div>
                <p>Selecione imagen(es)</p>
                <input type="file" required accept="image/png, image/gif, image/jpeg"/>
            </div>
            </div>

            <input type="submit" value="Crear agrupación" id='createG' />
        </form>
        <hr className="line" />
        <div className="ModifySeccion">
            <input type="text" placeholder='Ingrese grupo para  buscar...' value={search} onChange={handleSearch} id="modify"/>
            <div className='buttonsContainer'>
                <button className="UpdateButton">Editar</button>
                <button className="DeleteButton">Eliminar</button>
            </div>
        </div>
    </div>

    </>
    )
}
