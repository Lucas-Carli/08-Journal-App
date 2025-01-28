import { collection, getDocs } from "firebase/firestore/lite";
import { FirebaseDB } from "../firebase/config";


export const loadNotes = async (uid = '') => {

    if (!uid) throw new Error('El UID del usuario no existe');

    const collectionRef = collection(FirebaseDB, `${uid}/journal/notes`);
    /* Con la colección ya apuntada, puedo traer la info a traves de getDocs */
    const docs = await getDocs(collectionRef);

    const notes = [] ;
    docs.forEach(doc => {
        notes.push({ id: doc.id, ...doc.data() });
    });

    // console.log(notes);
    return notes;
};


