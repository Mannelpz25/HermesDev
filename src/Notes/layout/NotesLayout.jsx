import { Box, Divider } from "@mui/material"
import { SideBar } from "../components/SideBar";
import { TopBar } from "../components/TopBar";




export const NotesLayout = ({children}) => {
  return (
    <>              
        <Box  sx={{display: 'flex', m: 0, p:0}}>                      
            <TopBar drawerWidth={60}/>
        </Box>
        <SideBar drawerWidth={60}/>  
        <Divider/>
        
        <Box
            sx={{p:2}}
        >          
          {children}
        </Box>
    </>
  )
}