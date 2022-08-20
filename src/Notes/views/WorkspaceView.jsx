import { Grid } from "@mui/material";
import { NoteCard } from "../components/NoteCard";
import { useSelector } from "react-redux";
import { NotePane } from "../components/NotePane";

export const WorkspaceView = () => {
	const { notes, activeWorkspace } = useSelector((state) => state.notes);

	const notesByWorkspace = notes.filter(
		(note) => note.workspace === activeWorkspace.id
	);
	return (
		<>
			<NotePane workspace={activeWorkspace} />
			<Grid
				container
				sx={{ ml: `calc(${60}px)`, width: `calc(100% - ${60}px)` }}
			>
				{notesByWorkspace.map((note) => (
					<Grid item key={note.id}>
						<NoteCard {...note} />
					</Grid>
				))}
			</Grid>
		</>
	);
};
