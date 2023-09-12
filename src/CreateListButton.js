import * as React from "react";
import Button from "@mui/material/Button";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";


function handleClick() {
    console.log("User clicked Create list button");
  }

export default function CreateListButton() {
    return (
        <Button variant="contained" noLinkStyle onClick={handleClick}>
          <PlaylistAddIcon /> 
        </Button>
    );
  }
  