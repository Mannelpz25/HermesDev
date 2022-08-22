import DescriptionIcon from '@mui/icons-material/Description';
import { Grid, Typography } from "@mui/material";

export const NothingNotes = () => {
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
				<DescriptionIcon sx={{ fontSize: 100, color: "gray" }} />
			</Grid>
			<Grid item xs={12}>
				<Typography color="gray" variant="h5">
					Sin notas creadas
				</Typography>
			</Grid>
		</Grid>
	);
};