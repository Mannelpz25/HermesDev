/* import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config"; */
import {
    addNewNote,
	setActiveTrash,
	setActiveNote,
	deleteNoteById,
} from "./trashSlice";

export const startDeletingNote = (files = []) => {
	return (dispatch, getState) => {
		//uid
		const { activeNote: note } = getState().trash;
		/* const docRef = doc( FirebaseDB,`${uid}/journal/notes/${note.id}` ) ;
        await deleteDoc(docRef);     */

		dispatch(deleteNoteById(note.id));
	};
};
export const startSaveNote = () => {
	return (dispatch, getState) => {
		//uid
		const { activeNote} = getState().trash;		
		dispatch(addNewNote(activeNote));		

		/*  const noteToFireStore = { ...note };
        delete noteToFireStore.id;
        const docRef = doc( FirebaseDB,`${uid}/journal/notes/${note.id}` ) ; */

		/* await setDoc(docRef, noteToFireStore, {merge: true}) */
	};
};
