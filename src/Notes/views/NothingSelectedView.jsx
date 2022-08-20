import WorkspacesIcon from "@mui/icons-material/Workspaces";
import { Grid, Typography } from "@mui/material";

export const NothingSelectedView = () => {
	return (
		<Grid
			container
			spacing={0}
			direction="column"
			alignItems="center"
			justifyContent="center"
			sx={{
				ml: `calc(${60}px)`,
				width: `calc(100% - ${60}px)`,
				minHeight: `calc(100vh - ${95}px)`,
			}}
		>
			<Grid item xs={12}>
				<WorkspacesIcon sx={{ fontSize: 100, color: "gray" }} />
			</Grid>
			<Grid item xs={12}>
				<Typography color="gray" variant="h5">
					Selecciona o crea un espacio de trabajo
				</Typography>
			</Grid>
		</Grid>
	);
};
