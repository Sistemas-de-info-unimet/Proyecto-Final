import React, { useState } from 'react';
import { db, auth } from '../Firebase';
import { arrayUnion, updateDoc, doc } from 'firebase/firestore';

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
  };
  return (
    <div>
      <textarea value={comment} onChange={handleCommentChange} placeholder="Escribe tu comentario aquí..."></textarea>
        <button onClick={handleCommentSubmit} style={{
            boxShadow: '0 4px #c1a23c',
            color: '#5e4800',
            backgroundColor: '#ffd95e',
            textTransform: 'uppercase',
            padding: '10px 20px',
            borderRadius: '5px',
            transition: 'all .2s ease',
            fontWeight: '900',
            cursor: 'pointer',
            letterSpacing: '1px',
      }}>Enviar</button>
    </div>
  );
};

export default AddComment;