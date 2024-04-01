
import Logo from '../assets/LogoOpenG.png'
import Swal from 'sweetalert2';
import {setDoc, doc, collection, deleteDoc, query, where} from "firebase/firestore";
import { db } from "../Firebase";
import "./AdminDashBoard.css"
import { useState, useEffect } from 'react';
import { getDocs } from 'firebase/firestore';


export default function AdminDashBoard(){
    const [showPopup, setShowPopup] = useState(false);

    const handleShowPopup = () => {
      setShowPopup(true);
    };
  
    const handleClose = () => {
      setShowPopup(false);
    };


        const [selectedOption, setSelectedOption] = useState('');
        const [selectedOption1, setSelectedOption1] = useState('');

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };
  
    const handleOptionChange1 = (event) => {
        setSelectedOption1(event.target.value);
    };
  
    const UnimetLogo = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfUjUIUOUr2zEwuhLh4Q_qziqXtIHwEyyMEwRXsK34aQ&s"
    
    const [groupName, setGroupName] = useState("")
    const [mission, setMission] = useState("")
    const [vision, setVision] = useState("")
    const [contactEmail, setContactEmail] = useState("")
    const [groupType, setGroupeType] = useState("")
    const [description, setDescription] = useState("")

    //*handles
    const handleName = (e) =>{setGroupName(e.target.value)}
    const handleMission = (e ) =>{setMission(e.target.value)}
    const handleVision = (e)=> {setVision(e.target.value)} 
    const handleContactEmail = (e) =>{setContactEmail(e.target.value)}
    const handleGroupType = (e) =>{setGroupeType(e.target.value)}
    const handleDescription = (e) =>{setDescription(e.target.value)}

    const [newName, setNewName] = useState("")
    const [newMission, setNewMission] = useState("")
    const [newVision, setNewVision] = useState("")
    const [newContact, setNewContact] = useState("")
    const [newType, setNewType] = useState("")
    const [newDescription, setNewDescription] = useState("")
    
    //*handles
    const handleNewName = (e) =>{setNewName(e.target.value)}
    const handleNewMission = (e ) =>{setNewMission(e.target.value)}
    const handleNewVision = (e)=> {setNewVision(e.target.value)} 
    const handleNewContact = (e) =>{setNewContact(e.target.value)}
    const handleNewType = (e) =>{setNewType(e.target.value)}
    const handleNewDescription = (e) =>{setNewDescription(e.target.value)}
    
    const [groups, setGroups] = useState([]);
    //FUNCIONES COMBOBOX
    const [selectagru,setselectagru] = useState('');
    
    async function eliminarDocumentoFirestore(nombre) {
        console.log(nombre)
         
        try {
            const collectionRef = collection(db, "Agrupaciones");
        
            // Create a query based on the provided name
            const querySnapshot = await getDocs(
              query(collectionRef, where("nombre", "==", nombre))
            );
        
            if (querySnapshot.size > 0) {
              // Get the first document object from the query results
              const doc = querySnapshot.docs[0];
        
              //update doc
              await updateDoc(doc.ref, {
                nombre: "Nuevo nombre",

              });
            
            } else {
              console.log(`No se encontró ningún documento con nombre: ${nombre}`);
              Swal.fire({
                title: '¡Error!',
                text: `No se encontro ningun grupo con nombre: ${nombre}`,
                icon: 'error',
                confirmButtonText: 'OK'
            })
            }
          } catch (error) {
            console.error('Error al eliminar el documento:', error);
            Swal.fire({
                title: '¡Error!',
                text: 'Error al eliminar grupo',
                icon: 'error',
                confirmButtonText: 'OK'
            })
          }
        

    }



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

      //funcion handle create
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

            try {
                const collectionRef = collection(db, "Agrupaciones");
            
                // Create a query to check if a document with the same name already exists
                const querySnapshot = await getDocs(
                  query(collectionRef, where("nombre", "==", groupName))
                );
            
                if (querySnapshot.size > 0) {
                  // Document already exists
                  console.log(`Ya existe un documento con nombre: ${groupName}`);
                  Swal.fire({
                    title: '¡Error!',
                    text: `Ya existe un grupo con nombre:  ${groupName}`,
                    icon: 'error',
                    confirmButtonText: 'OK'
                    })
                  return;
                }
            
                // Create a new document with the provided data
                const currentState = active==true? "activo":"desactivo"

                // Crea una referencia al nuevo documento dentro de la colección
                const docRef = doc(collectionRef);

                // Establece los datos del documento
                await setDoc(docRef, {
                afiliados: [],
                comentarios: [],
                contacto: contactEmail,
                descripcion: description,
                estado: "activo",
                foto: 'https://cdn-icons-png.flaticon.com/512/25/25437.png',
                mision: mission,
                vision: vision,
                nombre: groupName,
                tipoDeGrupo: groupType,
                });

                Swal.fire({
                    title: 'Listo',
                    text: 'Grupo Creado',
                    icon: 'success',
                    confirmButtonText: 'OK'
                })
            } catch (error) {
                console.error('Error al crear el documento:', error);
                Swal.fire({
                    title: '¡Error!',
                    text: 'Error al crear el grupo',
                    icon: 'error',
                    confirmButtonText: 'OK'
                    })
            }
    }

    const createGroup = (e) =>{
        e.preventDefault()
        handleCreateGroup(groupName, mission, vision, contactEmail, groupType, selectedOption, description)
    }


// funcion handle edit
    const handleEditGroup = async (nombre, newName, newMission, newVision, newContact, newType, newActive, newDescription) =>{
        console.log("se esta ejcutnado 2")

        try {
            const collectionRef = collection(db, "Agrupaciones");
        
            // Create a query based on the provided name
            const querySnapshot = await getDocs(
              query(collectionRef, where("nombre", "==", nombre))
            );
        
            if (querySnapshot.size > 0) {
              // Get the first document object from the query results
              const doc = querySnapshot.docs[0];

              // Create a new document with the provided data
              const currentState1 = newActive==true? "activo":"desactivo"
        
              await updateDoc(doc.ref,{
                contacto: newContact,
                descripcion: newDescription,
                estado: "desactivo",
                mision: newMission,
                vision: newVision,
                nombre: newName,
                tipoDeGrupo: newType,
              });

              Swal.fire({
                title: 'Listo!',
                text: `${nombre} editado exitosamente`,
                icon: 'success',
                confirmButtonText: 'OK'
            })

            } else {
              console.log(`No se encontró ningún documento con nombre: ${nombre}`);
              Swal.fire({
                title: '¡Error!',
                text: `No se encontro ningun grupo con nombre: ${nombre}`,
                icon: 'error',
                confirmButtonText: 'OK'
            })
            }
          } catch (error) {
            console.error('Error al eliminar el documento:', error);
            Swal.fire({
                title: '¡Error!',
                text: 'Error al eliminar grupo',
                icon: 'error',
                confirmButtonText: 'OK'
            })
          }

    }


    async function editGroup(nombre){

            console.log("se esta ejecutando");
            handleEditGroup(nombre, newName, newMission, newVision, newContact, newType, selectedOption1, newDescription);
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
                    <input type="radio" name="isActive" id="active" value="activo" onChange={handleOptionChange} checked={selectedOption === 'activo'} required/>
                    <label htmlFor='active'>Activo</label>
                </div>
                <div className="radioContainer">
                    <input type="radio" name="isActive" id="notActive" value="desactivo" onChange={handleOptionChange} checked={selectedOption === 'desactivo'}/>
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
            <button type="submit" value="Crear agrupación" id='createG' >Crear grupo</button>
        </form>
        <hr className="line" />
        <div className="ModifySeccion">
                    {/*COMBO BOXXXXXDX*/}
        <select value={selectagru} onChange={handleChange}>
                        {groups.map((group) => (
                            <option key={group.nombre} value={group.nombre} >
                            {group.nombre}
                            </option>
                               
                        ))}
                        
                        </select>
            <div className='buttonsContainer'>
                <button className="UpdateButton" onClick={handleShowPopup}>Editar</button>

                <button className="DeleteButton" onClick={() => eliminarDocumentoFirestore(selectagru)}>Eliminar</button>
                </div>
                <br></br>
                <div>
                {showPopup && (
                    <div className="popup">
                    <form action="" className="EditGroupForm" onSubmit={() => editGroup(selectagru)}>
                        <p>Nombre</p>
                        <input type='text' value={newName} onChange={handleNewName} required></input>
                        <p>Descripción</p>
                        <input type='text' required value={newDescription} onChange={handleNewDescription}></input>
                        <p>Contacto</p>
                        <input type='text' value={newContact} onChange={handleNewContact} required></input>
                        <p>Misión</p>
                        <input type='text' required value={newMission} onChange={handleNewMission}></input>
                        <p>Visión</p>
                        <input type='text' required value={newVision} onChange={handleNewVision}></input>
                        <p>Tipo</p>
                        <input type='text' value={newType} onChange={handleNewType} required></input>
                        <div>
                <p>Estado:</p>
                <div className='radioContainer'>
                    <input type="radio" name="isActive" id="active" value="activo" onChange={handleOptionChange1} checked={selectedOption1 === 'activo'}/>
                    <label htmlFor='active'>Activo</label>
                </div>
                <div className="radioContainer">
                    <input type="radio" name="isActive" id="notActive" value="desactivo" onChange={handleOptionChange1} checked={selectedOption1 === 'desactivo'}/>
                    <label htmlFor='notActive'>Desactivo</label>
                </div>
            </div>
            <button type="submit" value="Editar Agrupacion" id='editG' >Editar Agrupación</button>
                    </form>
                
                    <button onClick={handleClose}>Cancelar</button>
                    </div>
                )}
                </div>

        </div>


      
    </div>

    </>
    )
}
