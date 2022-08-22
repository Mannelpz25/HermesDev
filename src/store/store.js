import { configureStore } from '@reduxjs/toolkit'
import { notesSlice } from './Notes/notesSlice'
import { trashSlice } from './Trash/trashSlice'
import { uiSlice } from './UI/uiSlice'

export const store = configureStore({
  reducer: {
    notes: notesSlice.reducer,
    trash: trashSlice.reducer,
    ui: uiSlice.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  })
})