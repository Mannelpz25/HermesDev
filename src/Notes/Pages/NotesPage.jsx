import React from 'react'
import { Grid, Typography, IconButton } from '@mui/material'
import { NoteCard } from '../components/NoteCard';
import { NoteAddOutlined } from '@mui/icons-material'
import { useSelector, useDispatch} from "react-redux"


export const NotesPage = () => {    
    const dispatch = useDispatch();
    const{notes,activeNote, messageSaved, isSaving} = useSelector( state => state.notes);
   
    return (
    <>
        <Typography variant='h3'>Notes Page</Typography>
        <Grid container>
            {
                notes.map(note =>(
                    <Grid item>
                        <NoteCard {...note}/>   
                    </Grid>
                ))
            }
        </Grid>
        <IconButton
            size='large'
            sx={{
            color:'white',
            backgroundColor:'error.main',
            ':hover': {backgroundColor: 'error.main', opacity: 0.9},
            position: 'fixed',
            right: 50,
            bottom: 50
            }}
        >
            <NoteAddOutlined sx={{fontSize: 35}}/>
        </IconButton>
    </>
  )
}
