import * as React from "react";
import Button from "@mui/material/Button";
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';


function handleClick() {
    alert("User clicked Logout button");
  }

export default function LoginButton() {
    return (
        <Button variant="contained" onClick={handleClick}>
          <LogoutOutlinedIcon /> 
          { 'Logout' }
        </Button>
    );
  }
  