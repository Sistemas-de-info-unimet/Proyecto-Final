import { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '../Firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const q = query(collection(db, "usuarios"), where("email", "==", user.email));
        const querySnapshot = await getDocs(q);
        const userData = querySnapshot.docs[0] ? querySnapshot.docs[0].data() : null;
        const userId = querySnapshot.docs[0] ? querySnapshot.docs[0].id : null;
        
        setCurrentUser({
          ...user,
          ...userData,
          docId: userId 
        });
      } else {
        setCurrentUser(null);
      }
    });

    return unsubscribe;
  }, []);

  const updateCurrentUser = (user) => {
    setCurrentUser(user);
  };

  const value = {
  currentUser,
  updateCurrentUser,
  };
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};