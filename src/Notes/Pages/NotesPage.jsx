import React from 'react'
import { Grid, Typography, IconButton } from '@mui/material'
import { NoteCard } from '../components/NoteCard';
import { useSelector} from "react-redux"
import { NotePane } from '../components/NotePane';
import { NotesLayout } from '../layout/NotesLayout';


export const NotesPage = () => {    
   
    const{notes} = useSelector( state => state.notes);
    
  
    
    return (
    <NotesLayout>
        
        <NotePane />
        <Grid container sx={{ml: `calc(${60}px)` , mr: 0}}>
            {
                notes.map(note =>(
                    <Grid item key={ note.id}>
                        <NoteCard {...note}/>   
                    </Grid>
                ))
            }
        </Grid>
        
    </NotesLayout>
  )
}
