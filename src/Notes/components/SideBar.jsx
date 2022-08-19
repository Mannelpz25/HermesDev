import { IconButton, Grid,Drawer,Box, Toolbar, Typography, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText  } from "@mui/material"
import { Menu,StickyNote2Outlined, Workspaces, Label, Help, DeleteSweep } from "@mui/icons-material"
import { useState } from 'react';



export const SideBar = ({drawerWidth = 280}) => {
  

  return (
    <>
     
      <Drawer
        anchor={'left'}
        variant="permanent"
        ModalProps={{
            keepMounted: true,
        }}
        PaperProps={{sx:{ backgroundColor: 'primary.main'}}}
        sx={{
            flexShrink: 0,
          display: {xs: 'block'},
          '& .MuiDrawer-paper': {boxSizing: 'border-box',width: drawerWidth}          
        }}
      >
        <Box sx={{display: "flex", backgroundColor: 'tertiary.main', justifyContent: "center", height: 63}}>
            <StickyNote2Outlined sx={{ alignSelf: 'center', color: "white", fontSize: 25}} />
          {/* <Typography color="white" noWrap component='div'>
            Hermes
          </Typography> */}
        </Box>
        <Divider/>
        <List >
          <ListItem disablePadding >
            <ListItemButton >
                <ListItemIcon sx={{
                    color:'white',
                    }}>
                    <Workspaces/>
                </ListItemIcon>
                <Grid container sx={{
                    color:'white',
                    }}>
                    {/* <ListItemText primary={ "Workspaces" }/> */}
                </Grid>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding >
            <ListItemButton >
                <ListItemIcon sx={{
                    color:'white',
                    }}>
                    <Label/>
                </ListItemIcon>
                <Grid container sx={{
                    color:'white',
                    }}>
                    {/* <ListItemText primary={ "Tags" }/> */}
                </Grid>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding >
            <ListItemButton >
                <ListItemIcon sx={{
                    color:'white',
                    }}>
                    <DeleteSweep/>
                </ListItemIcon>
                <Grid container sx={{
                    color:'white',
                    }}>
                    {/* <ListItemText primary={ "Trash" }/> */}
                </Grid>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding >
            <ListItemButton >
                <ListItemIcon sx={{
                    color:'white',
                    }}>
                    <Help/>
                </ListItemIcon>
                <Grid container sx={{
                    color:'white',
                    }}>
                    {/* <ListItemText primary={ "Help" }/> */}
                </Grid>
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </>
  )
}
