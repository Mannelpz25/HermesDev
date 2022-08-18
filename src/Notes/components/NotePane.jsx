import { IconButton,Drawer, Button, Toolbar, Typography, Divider, TextField, Grid, SpeedDial, SpeedDialAction } from "@mui/material"
import { CancelOutlined , NoteAltOutlined, SaveOutlined } from "@mui/icons-material"
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import { useEffect, useState } from 'react';
import { useForm } from "../../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import { startDeletingNote, startNewNote, startSaveNote, } from "../../store/Notes/thunks"
import { setActiveNote } from "../../store/Notes/notesSlice";


const colors = [
    { color: "#A43118", name: 'Rojo' },
    { color: "#E58F1B", name: 'Naranja' },    
    { color: "#ECC918", name: 'Amarillo' },
    { color: "#1EA413", name: 'Verde' },
    { color: "#13A48E", name: 'Verde azulado' },
    { color: "#148BBE", name: 'Azul' },
    { color: "#0F517C", name: 'Azul oscuro' },
    { color: "#5222B9", name: 'Morado' },
    { color: "#B71ABC", name: 'Rosa' },
    { color: "#9C671F", name: 'Marron' },
    { color: "#95928C", name: 'Gris' },
  ];

export const NotePane = ({drawerWidth = 350}) => {
    const dispatch = useDispatch();
    const{activeNote:note, messageSaved, isSaving} = useSelector( state => state.notes);
    const{body, title, date, onInputChange, formState} = useForm(note);
   
    const [isOpen, setIsOpen] = useState(false);
    const onClickNewNote = (open, color) => (event) =>  {
        setIsOpen(open);
        if(open)
            dispatch (startNewNote(color));
      }
    const noteColor = "gray"
    
    useEffect(() => {
        dispatch(setActiveNote(formState));
          
    }, [formState]);
    
    const handleChange = (event) => {
        onInputChange(event);
    };   

    const onSaveNote = () => {
        dispatch(startSaveNote());
        setIsOpen(false);
    }
    const onCancel = () => {
        dispatch(setActiveNote(null));
        setIsOpen(false);
    }
    
  return (
    <>
      <Drawer
        anchor={'right'}
        open={isOpen}
        onClose={onClickNewNote()}
        variant="temporary"
        PaperProps={{sx:{ backgroundColor: noteColor}}}
        sx={{
          display: {xs: 'block'},
          '& .MuiDrawer-paper': {boxSizing: 'border-box',width: drawerWidth}          
        }}
      >
        <Grid container sx={{ height: 80, p: 2, alignItems: "center", bgcolor: "#424242"  }}>
            <NoteAltOutlined sx={{color: "white", marginRight: 4, fontSize:50 }} />
            <Typography color="white" variant="h4" textAlign="right">
                Nueva Nota
            </Typography>
        </Grid>
        <Divider/>
        <Grid container>
            <TextField 
            fullWidth 
            placeholder="Añade un título..." 
            label="Título" 
            variant="outlined" 
            name= "title"
            value={title}
            onChange={handleChange}
            sx={{
                display: "block", 
                mx: 3,
                my: 2,
                '& label.Mui-focused': {
                    color: '#424242',
                },
                '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: '#fafafa',
                    },
                    '&:hover fieldset': {
                      borderColor: '#9e9e9e',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#424242',
                    },
                  },
                }}/>
            <TextField 
            fullWidth 
            id="outlined-multiline-static" 
            placeholder="Añade una nota..." 
            multiline 
            rows={16}
            name= "body"
            value={body}
            onChange={handleChange}
            sx={{
                display: "block", 
                mx: 3,
                '& label.Mui-focused': {
                    color: '#424242',
                },
                '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: '#fafafa',
                    },
                    '&:hover fieldset': {
                      borderColor: '#9e9e9e',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#424242',
                    },
                  },
                }}/>
        </Grid>
        <Toolbar>            
            <Grid  container  justifyContent='center' alignItems='center' spacing={3}>  
                <Grid item>
                    <Button  onClick={onSaveNote}  fullWidth variant="contained" color='primary' sx={{my:2}}  >  
                        <Typography color='white' fontSize={15}  marginRight={1}>Guardar</Typography>                   
                        <SaveOutlined sx={{fontSize:25 }} />
                    </Button>
                </Grid>                        
                <Grid item>
                    <Button  onClick={onCancel}  fullWidth  variant="contained" color='error' sx={{my:2}}  >  
                        <Typography color='white' fontSize={15}  marginRight={1}>Cancelar</Typography>                   
                        <CancelOutlined sx={{fontSize:25 }} />
                    </Button>
                </Grid>
                
            </Grid>
        </Toolbar>      
        </Drawer>
        <SpeedDial
            ariaLabel="SpeedDial basic example"
            direction = "left"
            sx={{ position: 'absolute', 
                bottom: 16, 
                right: 16, 
                '& .MuiFab-primary': { 
                    backgroundColor: 'gold', 
                    color: 'blue',
                    '&:hover': {
                        backgroundColor: 'gold',
                        opacity: 0.5
                    }
                },
            }}
            icon={<SpeedDialIcon/>}
            >
            {colors.map((action) => (
                <SpeedDialAction
                key={action.name}
                sx={{bgcolor: action.color,                    
                        '&:hover': {
                          backgroundColor: action.color,
                          opacity: 0.3
                        },                    
                }}
                
                tooltipTitle={action.name}
                onClick={onClickNewNote(true, action.color)} 
                />
            ))}
        </SpeedDial>
      {/* <IconButton
            size='large'
            onClick={onClickNewNote(true)} 
            sx={{
            color:'white',
            backgroundColor:'error.main',
            ':hover': {backgroundColor: 'error.main', opacity: 0.9},
            position: 'fixed',
            right: 50,
            bottom: 50
            }}
        >
            <NoteAddOutlined />
        </IconButton> */}
    </>
  )
}