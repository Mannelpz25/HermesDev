import { createSlice } from "@reduxjs/toolkit";

export const notesSlice = createSlice({
	name: "notes",
	initialState: {
		isSaving: false,
		isLoadingNotes: true,
		messageSaved: "",
        activeNote: null,
		activeWorkspace: null,
		activeTag: null,
		tags: [
			{
				id: "1",
				name: "Prueba",
			},
		],
		workspaces: [
			{
				id: "1",
				name: "Personal",
			},
		],
		notes: [
			{
				id: "1",
				title: "Titulo",
				body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum simply dummy text of the printing",
				date: 12345,
				color: "#95928C",
				workspace: "1",
			},
		],		
	},
	reducers: {
		savingNewNote: (state) => {
			state.isSaving = true;
		},
		addNewNote: (state, action) => {
			state.notes.push(action.payload);
			state.isSaving = false;
		},
		addNewWorkspace: (state, action) => {
			state.workspaces.push(action.payload);
			state.isSaving = false;
		},
		setActiveNote: (state, action) => {
			state.activeNote = action.payload;
			state.messageSaved = "";
		},
		setActiveWorkspace: (state, action) => {
			state.activeWorkspace = action.payload;
			state.messageSaved = "";
		},
		setActiveTag: (state, action) => {
			state.activeTag = action.payload;
			state.messageSaved = "";
		},
		setNotes: (state, action) => {
			state.notes = action.payload;
		},
		setSaving: (state) => {
			state.isSaving = true;
			state.messageSaved = "";
		},
		updateNote: (state, action) => {
			state.isSaving = false;
			state.notes = state.notes.map((note) => {
				if (note.id === action.payload.id) {
					return action.payload;
				}
				return note;
			});

			state.messageSaved = `${action.payload.title}, actualizada correctamente`;
		},
        updateWorkspace: (state, action) => {
			state.isSaving = false;
			state.workspaces = state.workspaces.map((workspace) => {
				if (workspace.id === action.payload.id) {
					return action.payload;
				}
				return note;
			});

			state.messageSaved = `${action.payload.title}, actualizada correctamente`;
		},
		clearNotesLogout: (state) => {
			state.isSaving = false;
			state.messageSaved = "";
			state.notes = [];
			state.activeNote = null;
		},
		deleteNoteById: (state, action) => {
			state.notes = state.notes.filter((note) => note.id !== action.payload);
			state.activeNote = null;
			state.isSaving = false;
		},
        deleteNoteByWorkspace: (state, action) => {
			state.notes = state.notes.filter((note) => note.workspace !== action.payload);
			state.activeNote = null;
            state.activeWorkspace = null;
			state.isSaving = false;
		},
        deleteWorkspaceById: (state, action) => {
			state.workspaces = state.workspaces.filter((workspace) => workspace.id !== action.payload);
			state.activeWorkspace = null;
			state.isSaving = false;
		},
	},
});

// Action creators are generated for each case reducer function
export const {
	addNewNote,
	addNewWorkspace,
	setActiveNote,
	setActiveWorkspace,
	setActiveTag,
	setNotes,
	setSaving,
	updateNote,
    updateWorkspace,
	deleteNoteById,
    deleteNoteByWorkspace,
    deleteWorkspaceById,
	savingNewNote,
	clearNotesLogout,
} = notesSlice.actions;
