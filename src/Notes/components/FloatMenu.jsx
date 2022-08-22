import { useForm } from "../../hooks/useForm";
import {
	Modal,
	Menu,
	MenuItem,
	MenuList,
	Toolbar,
	Grid,
	Button,
	Box,
	TextField,
	Typography,
	Divider,
	ListItemIcon,
	ListItemText,
} from "@mui/material";
import { useEffect, useState } from "react";
import { MenuOption } from "./MenuOption";
import {
	AddCircleOutline,
	SaveOutlined,
	CancelOutlined,
} from "@mui/icons-material";
import { setActiveWorkspace } from "../../store/Notes/notesSlice";
import { startNewWorkspace, startSaveWorkSpace } from "../../store/Notes/thunks";

import { useDispatch, useSelector } from "react-redux";
import { closeMenu } from "../../store/UI/thunks";


export const FloatMenu = ({anchorEl}) => {
    const dispatch = useDispatch();
    const { isMenuOpen} = useSelector(
		(state) => state.ui
	);
	const { activeWorkspace, workspaces, tags, workspaceDefault} = useSelector(
		(state) => state.notes
	);

	const [openModal, setOpenModal] = useState(false);

	const onClose = () => {
		dispatch(closeMenu());
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
    const { name, onInputChange, formState } = useForm(activeWorkspace);
    const handleChange = (event) => {
		onInputChange(event);
	};
    
	useEffect(() => {
		dispatch(setActiveWorkspace(formState));
	}, [formState]);
  

  return (
    <>
        <Menu
				anchorEl={anchorEl}
				open={isMenuOpen}
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
					<MenuOption
						key={workspaceDefault.id}
						type={"workspaces"}
						{...workspaceDefault}
					/>
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
  )
}
