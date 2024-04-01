
import Logo from '../assets/LogoOpenG.png'
import Swal from 'sweetalert2';
import {setDoc, doc, collection} from "firebase/firestore";
import { db } from "../Firebase";
import "./AdminDashBoard.css"
import { useState, useEffect } from 'react';
import { getDocs } from 'firebase/firestore';


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
    
    const [groups, setGroups] = useState([]);
    //FUNCIONES COMBOBOX
    const [selectagru,setselectagru] = useState('');

    const handleChange = (e) => {
        setselectagru(e.target.value);

    
      };

      useEffect(() => {
        const fetchGroups = async () => {
          const querySnapshot = await getDocs(collection(db, "Agrupaciones"));
          const groupsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setGroups(groupsData);
        };
    
        fetchGroups();
      }, []);
    //FIN FUNCIONES COMBOBOX

    const handleCreateGroup = async (groupName, mission, vision, contactEmail, groupType, active, description, photo) =>{

        
        const [groups, setGroups] = useState([]);
        //FUNCIONES COMBOBOX
        const [selectagru,setselectagru] = useState('');
    
        const handleChange = (e) => {
            setselectagru(e.target.value);
    
        
          };
    
          useEffect(() => {
            const fetchGroups = async () => {
              const querySnapshot = await getDocs(collection(db, "Agrupaciones"));
              const groupsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
              setGroups(groupsData);
            };
        
            fetchGroups();
          }, []);
        //FIN FUNCIONES COMBOBOX


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
            foto: photo,
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
    
    function validateEmail(email) {
        const regex = /^[\w-.]+@unimet\.edu\.ve$/; 
        return regex.test(email);
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
            <div>
                <p>Selecione imagen(es)</p>
                <input type="text" value={photo} onChange={handlePhoto} required/>
            </div>
            </div>

            <button type="submit" value="Crear agrupación" id='createG' />
        </form>
        <hr className="line" />
        <div className="ModifySeccion">
                    {/*COMBO BOXXXXXDX*/}
        <select value={selectagru} onChange={handleChange}>
                        {groups.map((group) => (
                            <option key={group.nombre} value={group.nombre}>
                            {group.nombre}
                            </option>
                        ))}
                        </select>
            {/*COMBO BOXXXXXDX*/}
            <div className='buttonsContainer'>
                <button className="UpdateButton">Editar</button>
                <button className="DeleteButton">Eliminar</button>
            </div>
        </div>
    </div>

    </>
    )
}
