import { useState } from 'react';
import { db, auth } from '../Firebase';
import { arrayUnion, updateDoc, doc } from 'firebase/firestore';
import './AddComment.css';
import Swal from 'sweetalert2'; 

const AddComment = ({id}) => {
  const [comment, setComment] = useState('');

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleCommentSubmit = async () => {
    const user = auth.currentUser
      await updateDoc(doc(db, "Agrupaciones", id), {
        comentarios: arrayUnion({
          nombre: user.displayName,
          comment: comment,
        }),
      });
    Swal.fire({title:'Comentario Enviado', text:"Comentario Enviado Exitosamente!", icon: 'success', confirmButtonText: 'OK'})
  };
  return (
    <div className='comment-box'>
      <textarea value={comment} onChange={handleCommentChange} placeholder="Escribe tu comentario aquí..."></textarea>
      <button onClick={handleCommentSubmit}>Enviar</button>
    </div>
  );
};

export default AddComment;