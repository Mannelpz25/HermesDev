import {
	Drawer,
	Button,
	Toolbar,
	Typography,
	Divider,
	TextField,
	Grid,
	SpeedDial,
	SpeedDialAction,
	Fade,
} from "@mui/material";
import {
	CancelOutlined,
	NoteAltOutlined,
	SaveOutlined,
} from "@mui/icons-material";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import { useEffect, useState } from "react";
import { useForm } from "../../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import { startNewNote, startSaveNote } from "../../store/Notes/thunks";
import { setActiveNote } from "../../store/Notes/notesSlice";

const colors = [
	{ color: "#A43118", name: "Rojo" },
	{ color: "#E58F1B", name: "Naranja" },
	{ color: "#ECC918", name: "Amarillo" },
	{ color: "#1EA413", name: "Verde" },
	{ color: "#13A48E", name: "Verde azulado" },
	{ color: "#148BBE", name: "Azul" },
	{ color: "#0F517C", name: "Azul oscuro" },
	{ color: "#5222B9", name: "Morado" },
	{ color: "#B71ABC", name: "Rosa" },
	{ color: "#9C671F", name: "Marron" },
	{ color: "#95928C", name: "Gris" },
];

export const NotePane = () => {
	const dispatch = useDispatch();
	const {
		activeNote: note,
		messageSaved,
		isSaving,
		activeWorkspace,
	} = useSelector((state) => state.notes);
	const { body, title, date, id, workspace, onInputChange, formState } =
		useForm(note);
	const [isOpen, setIsOpen] = useState(false);

	const onClickNewNote = (color) => (event) => {
		dispatch(startNewNote(color, activeWorkspace.id));
	};

	useEffect(() => {
		if (note !== null) setIsOpen(true);
	}, [note]);
	const [direction, setDirection] = useState("left");

	const handleResize = () => {
		window.innerWidth > 610 ? setDirection("left") : setDirection("up");
	};
	useEffect(() => {
		window.addEventListener("resize", handleResize);
	}, []);

	useEffect(() => {
		dispatch(setActiveNote(formState));
	}, [formState]);

	const handleChange = (event) => {
		onInputChange(event);
	};
	const changeColorNote = (color) => (event) => {
		dispatch(setActiveNote({ title, body, id, date, color, workspace }));
	};

	const onSaveNote = () => {
		dispatch(startSaveNote());
		setIsOpen(false);
	};
	const onCancel = () => {
		dispatch(setActiveNote(null));
		setIsOpen(false);
	};

	return (
		<>
			<Drawer
				anchor={"right"}
				open={isOpen}
				onClose={onCancel}
				variant="temporary"
				sx={{
					display: { xs: "block" },
					"& .MuiDrawer-paper": {
						boxSizing: "border-box",
						width: {
							xs: `calc(85%)`,
							sm: `calc(50%)`,
							md: `calc(35%)`,
						},
						bgcolor: "WhiteSmoke",
					},
				}}
			>
				<Fade in={isOpen} timeout={4500}>
					<SpeedDial
						ariaLabel="SpeedDial basic example"
						direction="down"
						open={true}
						sx={{
							display: isOpen ? "block" : "none",
							position: "fixed",
							bottom: 2,
							right: {
								xs: `calc(85%)`,
								sm: `calc(50%)`,
								md: `calc(35%)`,
							},

							"& .MuiFab-primary": {
								opacity: 0,
								"&:hover": {
									opacity: 0,
								},
							},
						}}
					>
						{colors.map((action) => (
							<SpeedDialAction
								key={action.name}
								sx={{
									minHeight: 30,
									maxHeight: 30,
									maxWidth: 30,
									bgcolor: action.color,
									"&:hover": {
										backgroundColor: action.color,
										opacity: 0.3,
									},
								}}
								tooltipTitle={action.name}
								onClick={changeColorNote(action.color)}
							/>
						))}
					</SpeedDial>
				</Fade>

				<Grid
					container
					sx={{
						height: 80,
						p: 2,
						alignItems: "center",
						bgcolor: note ? note.color : "white",
					}}
				>
					<NoteAltOutlined
						sx={{ color: "white", marginRight: 2, fontSize: 50 }}
					/>
					<Typography
						color="white"
						textAlign="right"
						sx={{ fontSize: `calc(100% * ${1.7})` }}
					>
						Datos de la nota
					</Typography>
				</Grid>
				<Divider />
				<Grid container>
					<TextField
						fullWidth
						placeholder="Añade un título..."
						label="Título"
						variant="outlined"
						name="title"
						value={title ? title : ""}
						onChange={handleChange}
						sx={{
							display: "block",
							mx: 3,
							my: 2,
							"& label.Mui-focused": {
								color: "#424242",
							},
							"& .MuiOutlinedInput-root": {
								"& fieldset": {
									borderColor: "LightGray",
								},
								"&:hover fieldset": {
									borderColor: "#9e9e9e",
								},
								"&.Mui-focused fieldset": {
									borderColor: "#424242",
								},
							},
						}}
					/>
					<TextField
						fullWidth
						id="outlined-multiline-static"
						placeholder="Añade una nota..."
						multiline
						rows={window.innerHeight / 25 - 10}
						name="body"
						value={body ? body : ""}
						onChange={handleChange}
						sx={{
							display: "block",
							mx: 3,
							"& label.Mui-focused": {
								color: "#424242",
							},
							"& .MuiOutlinedInput-root": {
								"& fieldset": {
									borderColor: "LightGray",
								},
								"&:hover fieldset": {
									borderColor: "#9e9e9e",
								},
								"&.Mui-focused fieldset": {
									borderColor: "#424242",
								},
							},
						}}
					/>
				</Grid>
				<Toolbar>
					<Grid
						container
						justifyContent="center"
						alignItems="center"
						spacing={1}
					>
						<Grid item xs={6}>
							<Button
								onClick={onSaveNote}
								fullWidth
								variant="contained"
								sx={{
									my: 2,
									bgcolor: "#F7B318",
									"&:hover": { bgcolor: "#F7B318", opacity: 0.8 },
								}}
							>
								<Typography color="white" fontSize={15} marginRight={1}>
									Guardar
								</Typography>
								<SaveOutlined sx={{ fontSize: 25 }} />
							</Button>
						</Grid>
						<Grid item xs={6}>
							<Button
								onClick={onCancel}
								fullWidth
								variant="contained"
								color="error"
								sx={{
									my: 2,
									bgcolor: "#B22222",
									"&:hover": { bgcolor: "#B22222", opacity: 0.8 },
								}}
							>
								<Typography color="white" fontSize={15} marginRight={1}>
									Cancelar
								</Typography>
								<CancelOutlined sx={{ fontSize: 25 }} />
							</Button>
						</Grid>
					</Grid>
				</Toolbar>
			</Drawer>
			<SpeedDial
				ariaLabel="SpeedDial basic example"
				direction={direction}
				sx={{
					position: "fixed",
					bottom: 16,
					right: 16,
					"& .MuiFab-primary": {
						backgroundColor: "#145858",
						"&:hover": {
							backgroundColor: "#145858",
							opacity: 0.5,
						},
					},
				}}
				icon={<SpeedDialIcon sx={{ color: "#f7B318" }} />}
			>
				{colors.map((action) => (
					<SpeedDialAction
						key={action.name}
						sx={{
							minHeight: 30,
							maxHeight: 30,
							maxWidth: 30,
							bgcolor: action.color,
							"&:hover": {
								backgroundColor: action.color,
								opacity: 0.3,
							},
						}}
						tooltipTitle={action.name}
						onClick={onClickNewNote(action.color)}
					/>
				))}
			</SpeedDial>
		</>
	);
};
