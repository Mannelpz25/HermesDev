import { createSlice } from '@reduxjs/toolkit'

export const notesSlice = createSlice({
  name: 'notes',
  initialState: {
    isSaving: false,
    isLoadingNotes: true,
    messageSaved: '',
    notes: [
        {
            id: '1',
            title:'Titulo',
            body: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
            date: 12345,
        }
    ],
    activeNote: null
    /* activeNote: {
        id:'',
        title:'',
        body: '',
        date: 12345,
        imageURLs: [] //https://foto1.jpg, //https://foto1.jpg, //https://foto1.jpg,

    } */
  },
  reducers: {
    savingNewNote: (state) => {
        state.isSaving = true;
    },
    addNewEmptyNote:( state, action) => {
        state.notes.push(action.payload);
        state.isSaving = false;
    },
    setactiveNote: (state, action) => {
        state.activeNote = action.payload;        
        state.messageSaved = '';
    },
    setNotes: (state, action) => {
        state.notes = action.payload;        
    },
    setSaving: (state) => {
        state.isSaving = true;
        state.messageSaved = '';
    },
    updateNote: (state, action) => {
        state.isSaving = false;
        state.notes = state.notes.map( note => {
            if(note.id === action.payload.id){
                return action.payload
            }
            return note;
        } )

        state.messageSaved = `${action.payload.title}, actualizada correctamente`;
    },
    setPhotosToActiveNote: (state, action) => {
        state.activeNote.imageURLs = [...state.activeNote.imageURLs, ...action.payload];
        state.isSaving = false;
    },
    clearNotesLogout: (state) => {
        state.isSaving= false;
        state.messageSaved= '';
        state.notes= [];
        state.activeNote= null;
    },
    deleteNoteById: (state, action) => {
        state.notes = state.notes.filter( note => note.id !== action.payload);
        state.activeNote= null;
        state.isSaving = false;
    }
    
  },
})

// Action creators are generated for each case reducer function
export const { 
    addNewEmptyNote,
    setactiveNote,
    setNotes,
    setSaving,
    updateNote,
    deleteNoteById, 
    savingNewNote,
    setPhotosToactiveNote,
    clearNotesLogout,
} = notesSlice.actions
