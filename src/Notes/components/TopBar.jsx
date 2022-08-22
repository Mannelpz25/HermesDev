import {
	Avatar,
	MenuItem,
	Divider,
	Grid,
	IconButton,
	Toolbar,
	Tooltip,
	Menu,
	Box,
	Typography,
	Modal,
	TextField,
	Button,
} from "@mui/material";
import { Settings, Logout, Delete, Workspaces, SaveOutlined,
	CancelOutlined, DeleteSweep } from "@mui/icons-material";
import { useForm } from "../../hooks/useForm";
import ListItemIcon from "@mui/material/ListItemIcon";
import { useEffect, useState } from "react";
import { useDispatch , useSelector } from "react-redux";
import { startDeletingWorkspace, startSaveWorkSpace } from "../../store/Notes/thunks";
import { setActiveWorkspace } from "../../store/Notes/notesSlice";

const userName = "Manuel López";

export const TopBar = ({ drawerWidth = 280 }) => {
	const dispatch = useDispatch();
	const { activeWorkspace, workspaces } = useSelector((state) => state.notes);
	const { activeTrash } = useSelector(
		(state) => state.trash
	);
	const { name, onInputChange, formState } = useForm(activeWorkspace);
	const [openModal, setOpenModal] = useState(false);
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	const handleChange = (event) => {
		onInputChange(event);
	};
	const handleOpenModal = () => {
		setOpenModal(true);
	};

	const onSaveWorkspace = () => {
		dispatch(startSaveWorkSpace());
		setOpenModal(false);
	};
	const onCancel = () => {
		dispatch(setActiveWorkspace(workspaces.find((workspace) => workspace.id === activeWorkspace.id)));
		setOpenModal(false);
	};
	useEffect(() => {
		dispatch(setActiveWorkspace(formState));
	}, [formState]);

	const onDelete = () => {
		dispatch(startDeletingWorkspace());
		setOpenModal(false);
	};
	return (
		<Box
			sx={{
				width: `calc(100% - ${drawerWidth}px)`,
				ml: `${drawerWidth}px`,
			}}
		>
			<Toolbar
				sx={{
					m: 0,
					bgcolor: "#D3D3D3",
					minHeight: {
						xs: 60,
						md: 60,
					},
				}}
			>
				<Grid container justifyContent="space-between" alignItems="center">
					<Grid item >
						<Toolbar onClick={activeTrash ? null : activeWorkspace?.name ==='Sin Asignar' ? null : handleOpenModal} sx={{
							m: 0,
							minHeight: {
								xs: 60,
								md: 60,
							},
						}}>
							<DeleteSweep sx={{
									display: (activeTrash ? "block" : "none"),
									color: "gray",
									minWidth: 24,
								}}/>
							<Workspaces sx={{
									display: (!!activeWorkspace ? "block" : "none"),
									color: "gray",
									minWidth: 24,
								}}/>
							<Typography
								color="DimGray"
								sx={{ fontSize: `calc(100% * ${1.4})`, ml: 1 }}
							>
								{!!activeWorkspace ? activeWorkspace.name : activeTrash ? "Papelera": ""}
							</Typography>
						</Toolbar>
					</Grid>
					<Grid item>
						<Tooltip title={userName}>
							<IconButton
								onClick={handleClick}
								size="small"
								sx={{ ml: 2 }}
								aria-controls={open ? "account-menu" : undefined}
								aria-haspopup="true"
								aria-expanded={open ? "true" : undefined}
							>
								<Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
							</IconButton>
						</Tooltip>
					</Grid>
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
			<Modal
				open={openModal}
				onClose={onCancel}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box
					sx={{
						position: "absolute",
						top: "50%",
						left: "50%",
						transform: "translate(-50%, -50%)",
						width: 400,
						bgcolor: "background.paper",
						border: "2px solid #000",
						boxShadow: 24,
						p: 4,
					}}
				>
					<Typography id="modal-modal-title" variant="h6" component="h2">
						Editar espacio de trabajo
					</Typography>
					<TextField
						fullWidth
						placeholder="Añade un nombre..."
						label="Nombre"
						variant="outlined"
						name="name"
						value={name ? name : ""}
						onChange={handleChange}
						sx={{
							display: "block",

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
					<Toolbar>
						<Grid
							container
							justifyContent="center"
							alignItems="center"
							spacing={1}
						>
							<Grid item xs={6}>
								<Button
									onClick={onSaveWorkspace}
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
									onClick={onDelete}
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
										Borrar
									</Typography>
									<Delete sx={{ fontSize: 25 }} />
								</Button>
							</Grid>
						</Grid>
					</Toolbar>
				</Box>
			</Modal>
		</Box>
	);
};
