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
	IconButton,
	Tooltip,
	Menu,
	MenuItem,
	ListItemIcon
} from "@mui/material";
import {
	CancelOutlined,
	NoteAltOutlined,
	SaveOutlined,
	ChangeCircle,
	Circle,
	HorizontalRule
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
		workspaces,
		workspaceDefault,
	} = useSelector((state) => state.notes);
	const { body, title, date, id, workspace, onInputChange, formState } =
		useForm(note);
	const [isOpen, setIsOpen] = useState(false);

	const onClickNewNote = (color) => (event) => {
		dispatch(startNewNote(color, activeWorkspace.id));
	};
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
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
	const onChangeWorkspace= () => {
		
	}

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
					<Grid item xs={2}>
						<NoteAltOutlined
							sx={{ color: "white", marginRight: 0, fontSize: 50 }}
						/>
					</Grid>
					<Grid item xs={8}>
						<Typography
							color="white"
							textAlign="left"
							sx={{ fontSize: `calc(100% * ${1.7})` }}
						>
							Datos de la nota
						</Typography>
					</Grid>
					<Grid item xs={2}>
						<Fade in={isOpen} timeout={4500}>
							<Tooltip title="Cambiar espacio de trabajo">
								<IconButton
									onClick={handleClick}									
									variant="contained"
									sx={{
										my: 0,
										bgcolor: note ? note.color : "white",
										"&:hover": { bgcolor: note ? note.color : "white", opacity: 0.8 },
									}}
								>
									<ChangeCircle sx={{ fontSize: 35 }} />
								</IconButton>
							</Tooltip>
							</Fade>
					</Grid>
					
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
				<Menu
					anchorEl={anchorEl}
					id="account-menu"
					open={open}
					onClose={handleClose}
					onClick={handleClose}
					PaperProps={{
						elevation: 0,
						sx: {
							overflow: "visible",
							filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
							mt: 1.5,
							"& .MuiAvatar-root": {
								width: 32,
								height: 32,
								ml: -0.5,
								mr: 1,
							},
							"&:before": {
								content: '""',
								display: "block",
								position: "absolute",
								top: 0,
								right: 14,
								width: 10,
								height: 10,
								bgcolor: "background.paper",
								transform: "translateY(-50%) rotate(45deg)",
								zIndex: 0,
							},
						},
					}}
					transformOrigin={{ horizontal: "right", vertical: "top" }}
					anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
				>
					{workspaces.map((workspace) => (
							<MenuItem disabled={activeWorkspace.id === workspace.id ? true : false} onClick={onChangeWorkspace()} key={workspace.id}>
								<ListItemIcon>
									<Circle fontSize="small" />
								</ListItemIcon>
								{workspace.name}
							</MenuItem>))
					}
					<Divider/>
					<MenuItem disabled={activeWorkspace.id === workspaceDefault.id ? true : false}  onClick={onChangeWorkspace()} name="workspace"
						value={workspaceDefault.id} key={workspaceDefault.id}>
						<ListItemIcon>
							<HorizontalRule fontSize="small" />
						</ListItemIcon>
						{workspaceDefault.name}
					</MenuItem>
				</Menu>
				
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
