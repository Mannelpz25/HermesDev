import { createSlice } from "@reduxjs/toolkit";

export const trashSlice = createSlice({
	name: "trash",
	initialState: {
		activeTrash: false,		
        activeNote: null,
		activeWorkspace: null,
		workspaces: [
			{
				id: "2",
				name: "Prueba",
			},
			{
				id: "4",
				name: "Trabajo",
			},
		],
		notes: [
			{
				id: "2",
				title: "Nota Borrada",
				body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum simply dummy text of the printing",
				date: 51487,
				color: "#95928C",
				workspace: "1",
			},
			{
				id: "3",
				title: "Nota Borrada",
				body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum simply dummy text of the printing",
				date: 51487,
				color: "#95928C",
				workspace: "1",
			},
			{
				id: "4",
				title: "Nota Borrada",
				body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum simply dummy text of the printing",
				date: 51487,
				color: "#95928C",
				workspace: "1",
			},
			{
				id: "5",
				title: "Nota Borrada",
				body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum simply dummy text of the printing",
				date: 51487,
				color: "#95928C",
				workspace: "1",
			},
			{
				id: "6",
				title: "Nota Borrada",
				body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum simply dummy text of the printing",
				date: 51487,
				color: "#95928C",
				workspace: "1",
			},
			{
				id: "7",
				title: "Nota Borrada",
				body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum simply dummy text of the printing",
				date: 51487,
				color: "#95928C",
				workspace: "1",
			},
		],		
	},
	reducers: {
		addNewNote: (state, action) => {
			state.notes.push(action.payload);
			state.isSaving = false;
		},
		setActiveTrash: (state, action) => {
			state.activeTrash = action.payload;
		},
		setActiveNote: (state, action) => {
			state.activeNote = action.payload;
		},
		deleteNoteById: (state, action) => {
			state.notes = state.notes.filter((note) => note.id !== action.payload);
			state.activeNote = null;
		},
	},
});

// Action creators are generated for each case reducer function
export const {
	addNewNote,
	setActiveTrash,
	setActiveNote,
	deleteNoteById,
} = trashSlice.actions;
