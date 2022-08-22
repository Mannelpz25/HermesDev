import { Grid, Box, } from "@mui/material";
import { TrashNotesView } from '../views/TrashNotesView';
import { useState } from "react";

export const TrashPage= () => {
	const [value, setValue] = useState("1");
    const handleChange = (event, newValue) => {
    setValue(newValue);
	}
	return (
		<>
            <Box sx={{ display: "flex", width: `calc(100% - ${60}px)`,	ml: `${60}px`,}}>
				<TrashNotesView/>
			</Box>   
		</>
	);
};
