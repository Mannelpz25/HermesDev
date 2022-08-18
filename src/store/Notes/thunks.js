/* import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config"; */
import { addNewNote, setActiveNote, savingNewNote, setNotes,setSaving,updateNote ,deleteNoteById } from "./notesSlice";


export const startNewNote = (color) => {
    return async ( dispatch, getState ) => {
        //uid
        dispatch(savingNewNote());
        

        const newNote ={
            title: '',
            body: '',
            date: new Date().getTime(), 
            color
        }
        /* const newDoc = doc( collection( FirebaseDB, `${uid}/journal/notes` ) ); */
        /* await setDoc(newDoc, newNote); */

        newNote.id = new Date().getTime();
        //dispatch
        dispatch(setActiveNote(newNote));
    }
}

export const startLoadingNotes = () => {
    return async ( dispatch, getState ) => {
        //uid        
        const { uid } = getState().auth;        
        /* const notes = await loadNotes(uid); */
        dispatch( setNotes(notes));

    }
}

export const startSaveNote = () => {
    return  ( dispatch, getState ) => {
        dispatch(setSaving());
        //uid       
        const {activeNote:note} = getState().notes;
        
       /*  const noteToFireStore = { ...note };
        delete noteToFireStore.id;
        const docRef = doc( FirebaseDB,`${uid}/journal/notes/${note.id}` ) ; */

        /* await setDoc(docRef, noteToFireStore, {merge: true}) */
        dispatch(addNewNote(note));
        

    }
}

/* export const startUploadingFiles = (files = []) => {
    return async ( dispatch ) => {
        dispatch(setSaving());
        const fileUploadPromises = [];
        for (const file of files) {
            fileUploadPromises.push(fileUpload(file))            
        } 
        const photosUrls = await Promise.all(fileUploadPromises);

        dispatch(setPhotosToActiveNote(photosUrls));


    }
} */

export const startDeletingNote = (files = []) => {
    return async ( dispatch, getState ) => {
        dispatch(setSaving());
        //uid        
        const { uid } = getState().auth;        
        const {activeNote:note} = getState().notes;  
        /* const docRef = doc( FirebaseDB,`${uid}/journal/notes/${note.id}` ) ;
        await deleteDoc(docRef);     */

        dispatch(deleteNoteById(note.id));


    }
}