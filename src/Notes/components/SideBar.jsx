import {
	Drawer,
	Box,
	Divider,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
} from "@mui/material";
import {
	StickyNote2Outlined,
	Workspaces,
	Label,
	Help,
	DeleteSweep,
} from "@mui/icons-material";
import {useState } from "react";
import { useDispatch } from "react-redux";
import { setActiveWorkspace } from "../../store/Notes/notesSlice";
import { setActiveTrash } from "../../store/Trash/trashSlice";
import { FloatMenu } from "./FloatMenu";
import { openMenu } from "../../store/UI/thunks";

export const SideBar = ({ drawerWidth = 280 }) => {
	const dispatch = useDispatch();	
	const [anchorEl, setAnchorEl] = useState(null);
	const onClickButton = (event) => {
		setAnchorEl(event.currentTarget);
		dispatch(openMenu());
	};
	
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
			<FloatMenu anchorEl={anchorEl}/>	
		</>
	);
};
