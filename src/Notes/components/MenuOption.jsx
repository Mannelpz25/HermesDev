import { MenuItem, ListItemIcon, ListItemText } from "@mui/material";
import { Circle } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { setActiveWorkspace, setActiveTag } from "../../store/Notes/notesSlice";
import { setActiveTrash } from "../../store/Trash/trashSlice";

export const MenuOption = ({ id, name, type }) => {
  const dispatch = useDispatch();

  const onClickItem = () => {
    if (type === "workspaces") {
      dispatch(setActiveWorkspace({ id, name }));
      dispatch(setActiveTag(null));
      dispatch(setActiveTrash(false));
    } else {
      dispatch(setActiveTag({ id, name }));
      dispatch(setActiveWorkspace(null));
    }
  };

  return (
    <>
      <MenuItem onClick={onClickItem}>
        <ListItemIcon>
          <Circle sx={{ fontSize: 10, ml: 0.5 }} />
        </ListItemIcon>
        <ListItemText>{name}</ListItemText>
      </MenuItem>
    </>
  );
};
