import { useState } from "react";
import { useMemo } from "react";
import { Delete, ExpandMore } from "@mui/icons-material";
import {
	Collapse,
	IconButton,
	Card,
	CardContent,
	Typography,
	CardActions,
	Button,
	CardHeader,
	CardActionArea,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { startDeletingNote } from "../../store/Notes/thunks";
import { startDeletingNote as startDeletingNoteTrash } from "../../store/Trash/thunks";
import { setActiveNote } from "../../store/Notes/notesSlice";
import { setActiveNote as setActiveNoteTrash } from "../../store/Trash/trashSlice";

export const NoteCard = ({ title, body, color, id, date, workspace }) => {
	const [expanded, setExpanded] = useState(false);
	const dispatch = useDispatch();
	const { activeNote: note, isSaving } = useSelector((state) => state.notes);
	const { activeTrash, activeNote: noteTrash } = useSelector(
		(state) => state.trash
	);

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	const shortBody = useMemo(() => {
		return body.length > 120 ? body.substring(0, 120) + "..." : body;
	}, [body]);
	const onEdit = () => {
		dispatch(setActiveNote({ title, body, id, date, color, workspace }));
	};

	const onDelete = () => {
		dispatch(setActiveNote({ title, body, id, date, color, workspace }));
		dispatch(startDeletingNote());
	};
	const onDeleteTrash = () => {
		dispatch(setActiveNoteTrash({ title, body, id, date, color, workspace }));
		dispatch(startDeletingNoteTrash());
	};

	return (
		<Card
			sx={{
				bgcolor: color,
				minHeight: 250,
				minWidth: 180,
				maxWidth: 265,
				m: 1,
			}}
		>
			<CardHeader
				action={
					<IconButton aria-label="Delete" onClick={activeTrash ? onDeleteTrash : onDelete}>
						<Delete />
					</IconButton>
				}
				sx={{
					"& .MuiCardHeader-title": {
						color: "WhiteSmoke	",
					},
				}}
				title={title}
			/>
			<CardActionArea
				onClick={onEdit}
				sx={{
					minHeight: body.length > 120 ? 140 : 185,
					display: "flex",
					justifyContent: "flex-start",
				}}
			>
				<CardContent sx={{ px: 2, py: 1, alignSelf: "flex-start" }}>
					<Typography
						paragraph
						sx={{
							m: 0,
							color: shortBody.length === 0 ? "DarkGray" : "WhiteSmoke	",
							textAlign: "left",
						}}
					>
						{expanded
							? body
							: shortBody.length === 0
							? "Nota vacía ..."
							: shortBody}
					</Typography>
				</CardContent>
				<Collapse in={expanded} timeout="auto" unmountOnExit />
			</CardActionArea>
			<CardActions
				sx={{
					m: 0,
					display: body.length > 120 ? "inline" : "none",
				}}
			>
				<IconButton
					onClick={handleExpandClick}
					aria-label="show more"
					sx={{
						visibility: body.length > 120 ? "visible" : "hidden",
						transform: !expanded ? "rotate(0deg)" : "rotate(180deg)",
						marginLeft: "auto",
					}}
				>
					<ExpandMore />
				</IconButton>
			</CardActions>
		</Card>
	);
};
