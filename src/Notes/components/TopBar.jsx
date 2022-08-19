import { Avatar, MenuItem, Divider, Grid, IconButton, Toolbar, Tooltip, Menu, Box } from "@mui/material"
import { PersonAdd, Settings , Logout  } from "@mui/icons-material"

import ListItemIcon from '@mui/material/ListItemIcon';
import React from 'react'

const userName = "Manuel López"

export const TopBar = ({drawerWidth = 280}) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

     return (
        <Box         
            sx={{
                width: {sm: `calc(100% - ${drawerWidth}px)` },
                ml:  {sm: `${drawerWidth}px`},
                
            }}
        >
            <Toolbar sx={{alignSelf: "flex-end",height: 10, m: 0,bgcolor: "#D3D3D3"}}>            
                <Grid  container   justifyContent='flex-end' alignItems='center'> 
                <Tooltip title={userName}>              
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
                    </IconButton>
                </Tooltip>
                </Grid>
            
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                elevation: 0,
                sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                    },
                    '&:before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                    },
                },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                
                <MenuItem>
                <Avatar /> My account
                </MenuItem>
                <Divider />
                
                <MenuItem>
                <ListItemIcon>
                    <Settings fontSize="small" />
                </ListItemIcon>
                Settings
                </MenuItem>
                <MenuItem>
                <ListItemIcon>
                    <Logout fontSize="small" />
                </ListItemIcon>
                Logout
                </MenuItem>
            </Menu>
        </Toolbar>
        </Box>
    
  )
}
