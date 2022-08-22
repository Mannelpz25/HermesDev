/* import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config"; */
import {
	addNewWorkspace,
	addNewNote,
	setActiveNote,
	setWorkspaceActiveNote,
	savingNewNote,
	setNotes,
	setSaving,
	updateNote,
    updateWorkspace,
	deleteNoteById,
    deleteNoteByWorkspace,
	setActiveWorkspace,
    deleteWorkspaceById,
} from "./notesSlice";
import {
    addNewNote as addNewNoteTrash,
} from "../Trash/trashSlice";

export const startNewNote = (color, workspace) => {
	return async (dispatch, getState) => {
		//uid
		dispatch(savingNewNote());

		const newNote = {
			title: "",
			body: "",
			date: new Date().getTime(),
			color,
			workspace,
		};
		/* const newDoc = doc( collection( FirebaseDB, `${uid}/journal/notes` ) ); */
		/* await setDoc(newDoc, newNote); */

		newNote.id = new Date().getTime();
		//dispatch

		dispatch(setActiveNote(newNote));
	};
};

export const startLoadingNotes = () => {
	return async (dispatch, getState) => {
		//uid
		const { uid } = getState().auth;
		/* const notes = await loadNotes(uid); */
		dispatch(setNotes(notes));
	};
};

export const startSaveNote = () => {
	return (dispatch, getState) => {
		dispatch(setSaving());
		//uid
		const { activeNote, notes } = getState().notes;
		const isNewNote = notes.filter((note) => note.id == activeNote.id);
		if (isNewNote.length) {
			dispatch(updateNote(activeNote));
		} else {
			dispatch(addNewNote(activeNote));
		}

		/*  const noteToFireStore = { ...note };
        delete noteToFireStore.id;
        const docRef = doc( FirebaseDB,`${uid}/journal/notes/${note.id}` ) ; */

		/* await setDoc(docRef, noteToFireStore, {merge: true}) */
	};
};


export const startDeletingNote = (files = []) => {
	return (dispatch, getState) => {
		dispatch(setSaving());
		//uid
		const { activeNote: note } = getState().notes;
		/* const docRef = doc( FirebaseDB,`${uid}/journal/notes/${note.id}` ) ;
        await deleteDoc(docRef);     */

		dispatch(deleteNoteById(note.id));
        dispatch(addNewNoteTrash(note));
	};
};

export const startNewWorkspace = () => {
	return (dispatch, getState) => {
		const newWorkspace = {
			name: "",
		};
		/* const newDoc = doc( collection( FirebaseDB, `${uid}/journal/notes` ) ); */
		/* await setDoc(newDoc, newNote); */

		newWorkspace.id = new Date().getTime();
		//dispatch

		dispatch(setActiveWorkspace(newWorkspace));
		dispatch(setSaving());
		//uid

		/*  const noteToFireStore = { ...note };
        delete noteToFireStore.id;
        const docRef = doc( FirebaseDB,`${uid}/journal/notes/${note.id}` ) ; */

		/* await setDoc(docRef, noteToFireStore, {merge: true}) */
	};
};

export const startSaveWorkSpace = () => {
	return (dispatch, getState) => {
		dispatch(setSaving());
		//uid

        const { activeWorkspace, workspaces } = getState().notes;
		const isNewWorkspace = workspaces.filter((note) => note.id == activeWorkspace.id);
		if (isNewWorkspace.length) {
			dispatch(updateWorkspace(activeWorkspace));
		} else {
			dispatch(addNewWorkspace(activeWorkspace));
		}

		/*  const noteToFireStore = { ...note };
        delete noteToFireStore.id;
        const docRef = doc( FirebaseDB,`${uid}/journal/notes/${note.id}` ) ; */

		/* await setDoc(docRef, noteToFireStore, {merge: true}) */
	};
};


export const startDeletingWorkspace = (files = []) => {
	return (dispatch, getState) => {
		dispatch(setSaving());
		//uid
		const { activeWorkspace: workspace } = getState().notes;
		/* const docRef = doc( FirebaseDB,`${uid}/journal/notes/${note.id}` ) ;
        await deleteDoc(docRef);     */
		dispatch(deleteWorkspaceById(workspace.id));
        dispatch(deleteNoteByWorkspace(workspace.id))
	};
};
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
