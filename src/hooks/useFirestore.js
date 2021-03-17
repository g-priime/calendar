import { useState, useEffect } from "react";
import { projectFirestore } from "../firebase";

import { useAuth } from "../contexts/AuthContext";

const useFirestore = (collection) => {
  const [docs, setDocs] = useState([]);

  const { currentUser } = useAuth();

  useEffect(() => {
    const unsub = projectFirestore
      .collection(collection)
      .orderBy("createdAt", "desc")
      .onSnapshot((snap) => {
        let documents = [];
        snap.forEach((doc) => {
          if (doc.data().email === currentUser.email) {
            documents.push({ ...doc.data(), id: doc.id });
          }
        });

        setDocs(documents);
      });

    return () => unsub();
  }, [collection]);

  return { docs };
};

export default useFirestore;
