import {
	Modal,
	Menu,
	MenuItem,
	MenuList,
	Toolbar,
	Grid,
	Button,
	Drawer,
	Box,
	TextField,
	Typography,
	Divider,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
} from "@mui/material";
import {
	StickyNote2Outlined,
	Workspaces,
	Label,
	Help,
	DeleteSweep,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MenuOption } from "./MenuOption";
import {
	AddCircleOutline,
	SaveOutlined,
	CancelOutlined,
} from "@mui/icons-material";
import { useForm } from "../../hooks/useForm";
import { setActiveWorkspace } from "../../store/Notes/notesSlice";
import {
	startNewWorkspace,
	startSaveWorkSpace,
} from "../../store/Notes/thunks";
import { setActiveTrash } from "../../store/Trash/trashSlice";

export const SideBar = ({ drawerWidth = 280 }) => {
	const dispatch = useDispatch();
	const { activeWorkspace, workspaces, tags } = useSelector(
		(state) => state.notes
	);
	const { activeTrash } = useSelector(
		(state) => state.trash
	);
	const { name, onInputChange, formState } = useForm(activeWorkspace);
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	const [openModal, setOpenModal] = useState(false);
	const onClickButton = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const onClose = () => {
		setAnchorEl(null);
	};
	const handleChange = (event) => {
		onInputChange(event);
	};
	const handleOpenModal = () => {
		setOpenModal(true);
		dispatch(startNewWorkspace());
	};

	const onSaveWorkspace = () => {
		dispatch(startSaveWorkSpace());
		setOpenModal(false);
	};
	const onCancel = () => {
		dispatch(setActiveWorkspace(null));
		setOpenModal(false);
	};
	useEffect(() => {
		dispatch(setActiveWorkspace(formState));
	}, [formState]);
	const onOpenTrash = (event) => {
		dispatch(setActiveTrash(true));
		dispatch(setActiveWorkspace(null));
	};

	return (
		<>
			<Drawer
				anchor={"left"}
				variant="permanent"
				ModalProps={{
					keepMounted: true,
				}}
				PaperProps={{ sx: { backgroundColor: "primary.main" } }}
				sx={{
					flexShrink: 0,
					display: { xs: "block" },
					"& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
				}}
			>
				<Box
					sx={{
						display: "flex",
						backgroundColor: "tertiary.main",
						justifyContent: "center",
						height: 60,
					}}
				>
					<StickyNote2Outlined
						sx={{ alignSelf: "center", color: "white", fontSize: 25 }}
					/>
				</Box>
				<Divider />
				<List disablePadding>
					<ListItem disablePadding>
						<ListItemButton
							id="workspaces"
							sx={{ minHeight: 50 }}
							onClick={onClickButton}
						>
							<ListItemIcon
								sx={{
									color: "white",
									minWidth: 24,
								}}
							>
								<Workspaces />
							</ListItemIcon>
						</ListItemButton>
					</ListItem>
					<ListItem disablePadding>
						<ListItemButton
							id="tags"
							sx={{ minHeight: 50 }}
							onClick={onClickButton}
						>
							<ListItemIcon
								sx={{
									color: "white",
									minWidth: 24,
								}}
							>
								<Label />
							</ListItemIcon>
						</ListItemButton>
					</ListItem>
					<ListItem disablePadding>
						<ListItemButton onClick={onOpenTrash} sx={{ minHeight: 50 }}>
							<ListItemIcon
								sx={{
									color: "white",
									minWidth: 24,
								}}
							>
								<DeleteSweep />
							</ListItemIcon>
						</ListItemButton>
					</ListItem>
					<ListItem disablePadding>
						<ListItemButton sx={{ minHeight: 50 }}>
							<ListItemIcon
								sx={{
									color: "white",
									minWidth: 24,
								}}
							>
								<Help />
							</ListItemIcon>
						</ListItemButton>
					</ListItem>
				</List>
			</Drawer>
			<Menu
				anchorEl={anchorEl}
				open={open}
				onClose={onClose}
				sx={{
					display: anchorEl ? "block" : "none",
				}}
				PaperProps={{
					elevation: 5,
				}}
				anchorOrigin={{
					vertical: "top",
					horizontal: "right",
				}}
				transformOrigin={{
					vertical: "top",
					horizontal: "left",
				}}
			>
				<MenuList disablePadding sx={{ minWidth: 200 }}>
					{anchorEl?.id === "workspaces" ? (
						workspaces.map((workspace) => (
							<MenuOption
								key={workspace.id}
								type={anchorEl.id}
								{...workspace}
							/>
						))
					) : anchorEl?.id === "tags" ? (
						tags.map((tag) => (
							<MenuOption key={tag.id} type={anchorEl.id} {...tag} />
						))
					) : (
						<div />
					)}
					<Divider />
					<MenuItem onClick={handleOpenModal}>
						<ListItemIcon>
							<AddCircleOutline fontSize="small" />
						</ListItemIcon>
						<ListItemText>Añadir</ListItemText>
					</MenuItem>
				</MenuList>
			</Menu>
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
						Añadir espacio de trabajo
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
				</Box>
			</Modal>
		</>
	);
};
