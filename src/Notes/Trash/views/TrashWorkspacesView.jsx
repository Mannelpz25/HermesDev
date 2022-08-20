import { Grid, MenuItem, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { Circle } from "@mui/icons-material";

export const TrashWorkspacesView = () => {
	const { workspaces } = useSelector((state) => state.trash);

	return (
		<>
             <Grid
				container
				sx={{ width: `calc(100% - ${60}px)`, justifyContent: "flex-start"}}
			>
                {workspaces.map((workspace) => (
                    <MenuItem key={workspace.id} >
                        <ListItemIcon>
                            <Circle sx={{ fontSize: 15, ml: 0.5 }} />
                        </ListItemIcon>
                        <ListItemText ><Typography variant="h5">{workspace.name}</Typography></ListItemText>
                    </MenuItem>
                ))}                
            </Grid>
			
		</>
	);
};
