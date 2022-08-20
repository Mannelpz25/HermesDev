import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Grid, Box, Divider, Tabs, Tab  } from "@mui/material";
import { TrashNotesView } from '../views/TrashNotesView';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { useState } from "react";
import { TrashWorkspacesView } from '../views/TrashWorkspacesView';

export const TrashPage= () => {
	const [value, setValue] = useState("1");
    const handleChange = (event, newValue) => {
    setValue(newValue);
	}
	return (
		<>
			<TabContext value={value}>
            <Box sx={{ display: "flex", width: `calc(100% - ${60}px)`,	ml: `${60}px`,}}>
                

            <TabList  onChange={handleChange} aria-label="basic tabs example">
                <Tab label="Espacios de trabajo" value="1" />
                <Tab label="Notas" value="2"  />
            </TabList>
			</Box>
            
			<Divider />
			
            
			<Box sx={{ width: `calc(100%)`, p: 0}}>
                <TabPanel value="1" sx={{ pr: 0}} >
					<Grid
						container
						spacing={0}
						direction="column"
						alignItems="center"
						justifyContent="flex-start"
						sx={{
							width: `calc(100%)`,
							minHeight: `calc(100vh - ${200}px)`,
						}}
					>
						<TrashWorkspacesView/>
					</Grid>
                </TabPanel>
                <TabPanel value="2" sx={{ pr: 0}}>
					<Grid
						container
						spacing={0}
						direction="column"
						alignItems="center"
						justifyContent="flex-start"
						sx={{
							width: `calc(100%)`,
							minHeight: `calc(100vh - ${200}px)`,
						}}
					>
						<TrashNotesView/>
					</Grid>
                </TabPanel>
            </Box>
            </TabContext>
		
		</>
	);
};
