import * as React from "react";
import Button from "@mui/material/Button";
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';


function handleClick() {
    alert("User clicked Login button");
  }

export default function LoginButton() {
    return (
        <Button variant="contained" onClick={handleClick}>
          <LoginOutlinedIcon /> 
        </Button>
    );
  }
  