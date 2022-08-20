import { useSelector } from "react-redux";
import { NotesLayout } from "../layout/NotesLayout";
import { TrashPage } from "../Trash/Pages/TrashPage";
import { NothingSelectedView } from "../views/NothingSelectedView";
import { WorkspaceView } from "../views/workspaceView";

export const NotesPage = () => {
	const { activeWorkspace } = useSelector((state) => state.notes);
	const { activeTrash } = useSelector((state) => state.trash);

	return (
		<NotesLayout>
			{!!activeWorkspace ? <WorkspaceView /> : activeTrash? <TrashPage/> :<NothingSelectedView />}			
		</NotesLayout>
	);
};
