import { useState } from 'react'
import Logo from '../assets/LogoOpenG.png'
import Swal from 'sweetalert2';
import {setDoc, doc} from "firebase/firestore";
import { db } from "../Firebase";

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
        
        <form action="" className="CreateGroupForm" onSubmit={createGroup}>
            <p>Nombre de la Agrupación</p>
            <input type="text" value={groupName} onChange={handleName} required/>

            <p>Misión y Visión</p>
            <input type="text" placeholder='Misión' required value={mission} onChange={handleMission} />
            <input type="text" placeholder='Visión' required value={vision} onChange={handleVision} />
            <p>Descripción</p>

            <input type="text" required value={description} onChange={handleDescription} />
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
            <input type="file" required/>

            <input type="submit" value="Crear agrupación" />
        </form>

        <div className="ModifySeccion">
            <input type="text" placeholder='Ingrese grupo para  buscar...' value={search} onChange={handleSearch}/>
            <div>
                <button className="UpdateButton">Editar</button>
                <button className="DeleteButton">Eliminar</button>
            </div>
        </div>
    </div>

    </>
    )
}
