import * as React from "react";

// Icons for adding/editing/deleting tasks in a list
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import RemoveIcon from "@mui/icons-material/Remove";
import ClearIcon from "@mui/icons-material/Clear"; // Clear all tasks

// Icons for adding/editing/deleting lists
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import EditNoteIcon from "@mui/icons-material/EditNote";
import PlaylistRemoveIcon from "@mui/icons-material/PlaylistRemove";

function handleClick() {
    alert("You clicked me!");
  }

export default function Task() {
    return (
      <div>
        <AddIcon onClick={handleClick} />
        <EditIcon />
        <RemoveIcon />
        <ClearIcon />
  
        <PlaylistAddIcon />
        <EditNoteIcon />
        <PlaylistRemoveIcon />
      </div>
    );
  }
  