import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Copyright from "../../src/Copyright";
import TextField from "@mui/material/TextField";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "../../src/Link";
import Stack from "@mui/material/Stack";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import BackspaceOutlinedIcon from "@mui/icons-material/BackspaceOutlined";
import Button from "@mui/material/Button";
import { useState } from "react";

export default function NewList() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleChangeName = (event) => {
    setName(event.target.value);
  };
  const handleChangeDescription = (event) => {
    setDescription(event.target.value);
  };

  const handleSave = () => {
    alert(`${name}, ${description}`);
    alert("User clicked Save button");
  }

  const handleClear = () => {
    alert(`${name}, ${description}`);
    setName("");
    setDescription("");
    alert("User clicked Clear button");
  }

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        {/* Title */}
        <Typography variant="h4" component="h1" gutterBottom>
          Creating a new list
        </Typography>
        {/* Breadcrumbs */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 1, sm: 1 }}
        >
          <p>Breadcrumbs~</p>
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/">
              User
            </Link>
            <Link underline="hover" color="inherit" href="/lists">
              User's lists
            </Link>
            <Typography color="text.primary">New list</Typography>
          </Breadcrumbs>
        </Stack>

        <Stack
          direction={{ xs: "column", sm: "column" }}
          sx={{ mt: 3, mb: 3 }}
          spacing={{ xs: 1, sm: 1 }}
        >
          <TextField
            id="outlined-helperText"
            label="List Name"
            placeholder="Enter a name for the list"
            helperText="*Required"
            onChange={handleChangeName}
            value={name}
            inputProps={{ maxLength: 15 }}
          />
          <TextField
            id="outlined-multiline-static"
            label="List Description"
            multiline
            rows={3}
            placeholder="Enter a description for the list"
            onChange={handleChangeDescription}
            value={description}
            inputProps={{ maxLength: 25 }}
          />
        </Stack>
        {/* Bottom row of buttons (Save, Clear) */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 1, sm: 1 }}
        >
          <Link underline="hover" color="inherit" href="/lists">
            <Button variant="contained" noLinkStyle onClick={handleSave}>
              <SaveOutlinedIcon />
            </Button>
          </Link>
          {/* <Link underline="hover" color="inherit" href=""> */}
            <Button
              variant="contained"
              noLinkStyle
              onClick={handleClear}
            >
              <BackspaceOutlinedIcon />
            </Button>
          {/* </Link> */}
        </Stack>
        <Copyright />
      </Box>
    </Container>
  );
}
