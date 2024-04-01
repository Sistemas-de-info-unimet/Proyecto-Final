import { useState } from 'react'
import Logo from '../assets/LogoOpenG.png'
import Swal from 'sweetalert2';
import {setDoc, doc, collection} from "firebase/firestore";
import { db } from "../Firebase";
import "./AdminDashBoard.css"


export default function AdminDashBoard(){

    const UnimetLogo = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfUjUIUOUr2zEwuhLh4Q_qziqXtIHwEyyMEwRXsK34aQ&s"
    
    const [groupName, setGroupName] = useState("")
    const [mission, setMission] = useState("")
    const [vision, setVision] = useState("")
    const [contactEmail, setContactEmail] = useState("")
    const [groupType, setGroupeType] = useState("")
    const [active, setActive] = useState(false)
    const [description, setDescription] = useState("")
    const [photo, setPhoto] = useState("")

    const [search, setSearch] = useState("")

    //*handles
    const handleName = (e) =>{setGroupName(e.target.value)}
    const handleMission = (e ) =>{setMission(e.target.value)}
    const handleVision = (e)=> {setVision(e.target.value)} 
    const handleContactEmail = (e) =>{setContactEmail(e.target.value)}
    const handleGroupType = (e) =>{setGroupeType(e.target.value)}
    const handleActive = (e) =>{setActive(e.target.checked)}
    const handleDescription = (e) =>{setDescription(e.target.value)}
    const handlePhoto = (e) =>{setPhoto(e.target.value)}

    async function validateImageUrl(url) {
        // Expresión regular para URLs de imágenes
        const regex = /(http|https):\/\/[a-zA-Z0-9-\.]+\.[a-zA-Z]{2,7}(:[0-9]{1,5})?(\/.*)?\.(jpg|jpeg|png|gif|bmp|svg)/;
      
        // Validar la URL con la expresión regular
        const isValidUrl = regex.test(url);
      
        // Si la URL es válida, realizar una solicitud HTTP para verificar que la imagen existe
        if (isValidUrl) {
          try {
            const response = await fetch(url, {
              method: "HEAD",
            });
            return response.status === 200;
          } catch (error) {
            // Manejar el error de la solicitud HTTP
            console.error("Error al verificar la URL de la imagen:", error);
            return false;
          }
        }
      
        // La URL no es válida o la imagen no existe
        return false;
      }

      function validateEmail(email) {
        const regex = /^[\w-.]+@unimet\.edu\.ve$/; 
        return regex.test(email);
      }

    const handleCreateGroup = async (groupName, mission, vision, contactEmail, groupType, active, description, photo) =>{
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

            //validamos foto
            const isValidUrl = validateImageUrl(photo);
            if (!isValidUrl) {
                // Mostrar un mensaje de error al usuario
                console.error("La URL de la imagen no es válida");
                return;
            }


            const currentState = active==true? "activo":"desactivo"
            // Crea una referencia a la colección "Agrupaciones"
            const collectionRef = collection(db, "Agrupaciones");

            // Crea una referencia al nuevo documento dentro de la colección
            const docRef = doc(collectionRef);

            // Establece los datos del documento
            await setDoc(docRef, {
            afiliados: [],
            comentarios: [],
            contacto: contactEmail,
            descripcion: description,
            estado: currentState,
            foto: 'https://cdn-icons-png.flaticon.com/512/25/25437.png',
            mision: mission,
            vision: vision,
            name: groupName,
            tipoDeGrupo: groupType,
            });

    }
    const handleSearch = (e) =>{setSearch(e.target.value)}

    const createGroup = (e) =>{
        e.preventDefault()
        handleCreateGroup(groupName, mission, vision, contactEmail, groupType, active, description)
    }
    
    
    return (
    <>
    <div className="DashboardHeader">
        <img src={Logo} alt="not found" />
        <img src={UnimetLogo} alt="not found" />
    </div>
   
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
            </div>

            <button type="submit" value="Crear agrupación" id='createG' />
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
