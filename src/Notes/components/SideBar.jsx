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
        <Box sx={{display: "flex", backgroundColor: 'tertiary.main', justifyContent: "center", height: 60}}>
            <StickyNote2Outlined sx={{ alignSelf: 'center', color: "white", fontSize: 25}} />
        </Box>
        <Divider/>
        <List >
          <ListItem disablePadding >
            <ListItemButton >
                <ListItemIcon sx={{
                    color:'white',
                    minWidth: 24
                    }}>
                    <Workspaces/>
                </ListItemIcon>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding >
            <ListItemButton >
                <ListItemIcon sx={{
                    color:'white',
                    minWidth: 24
                    }}>
                    <Label/>
                </ListItemIcon>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding >
            <ListItemButton >
                <ListItemIcon sx={{
                    color:'white',
                    minWidth: 24
                    }}>
                    <DeleteSweep/>
                </ListItemIcon>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding >
            <ListItemButton >
                <ListItemIcon sx={{
                    color:'white',
                    minWidth: 24
                    }}>
                    <Help/>
                </ListItemIcon>
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </>
  )
}
