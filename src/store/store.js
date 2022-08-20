import { configureStore } from '@reduxjs/toolkit'
import { notesSlice } from './Notes/notesSlice'
import { trashSlice } from './Trash/trashSlice'

export const store = configureStore({
  reducer: {
    notes: notesSlice.reducer,
    trash: trashSlice.reducer,
  },
})