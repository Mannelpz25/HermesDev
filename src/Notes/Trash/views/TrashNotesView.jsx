import { Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { NoteCard } from "../../components/NoteCard";

export const TrashNotesView = () => {
	const { notes } = useSelector((state) => state.trash);

	return (
		<>
             <Grid
				container
				sx={{ width: `calc(100% - ${60}px)`, justifyContent: "flex-start"}}
			>
                {notes.map((note) => (
                    <Grid item key={note.id}>
                        <NoteCard {...note} />
                    </Grid>
                ))}                
            </Grid>
			
		</>
	);
};
