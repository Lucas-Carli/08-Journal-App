import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from '../../firebase/config';
import { addNewEmptyNote, deleteNoteById, savingNewNote, setActiveNote, setNotes, setPhotosToActiveNote, setSaving, updateNote } from "./";
import { loadNotes } from "../../helpers/loadNotes";
import { fileUpload } from "../../helpers/fileUpload";


export const startNewNote = () => {
  return async (dispatch, getState) => {

    dispatch(savingNewNote());

    const { uid } = getState().auth;

    const newNote = {
      title: '',
      body: '',
      imageUrls: [],
      date: new Date().getTime()
    };

    const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`))

    await setDoc(newDoc, newNote);

    newNote.id = newDoc.id;

    //! dispatch -> Al ejecutar este dispatch se crea una nueva nota, con id de Firebase
    dispatch(addNewEmptyNote(newNote));
    dispatch(setActiveNote(newNote));

  }
}

export const startLoadingNotes = () => {
  return async (dispatch, getState) => {

    const { uid } = getState().auth;
    if (!uid) throw new Error("The UID of user don't exist");

    const notes = await loadNotes(uid);

    dispatch(setNotes(notes));
  }
}

export const startSaveNote = () => {
  return async (dispatch, getState) => {

    dispatch(setSaving());

    const { uid } = getState().auth;
    const { active: note } = getState().journal;

    const noteToFireStore = { ...note };
    delete noteToFireStore.id;

    // Referencia al documento 
    const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);
    // Para que impacte en la base de datos 
    await setDoc(docRef, noteToFireStore, { merge: true });

    dispatch(updateNote(note));
  }
}

export const startUploadingFiles = (files = []) => {
  return async (dispatch) => {

    dispatch(setSaving());

    // await fileUpload(files[0]);
    const fileUploadPromises = [];
    for (const file of files) {
      fileUploadPromises.push(fileUpload(file))
    }

    const photosUrls = await Promise.all(fileUploadPromises);
    // console.log(photosUrls);
    dispatch(setPhotosToActiveNote(photosUrls));

  }
}

export const startDeletingNote = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    const { active: note } = getState().journal;

    /* Ybicación y acción de eliminado en Firebase */
    const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);
    await deleteDoc(docRef);

    /* Eliminación el Local */
    dispatch(deleteNoteById(note.id));

  }
}
