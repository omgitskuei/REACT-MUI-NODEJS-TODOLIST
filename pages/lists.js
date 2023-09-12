import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
// import ProTip from "../src/examples/ProTip";
import Link from "../src/Link";
// import AllIcons from "../src/AllIcons";
import CreateListButton from "../src/CreateListButton";
// import AddIcon from "@mui/icons-material/Add";
// import EditIcon from "@mui/icons-material/Edit";
// import RemoveIcon from "@mui/icons-material/Remove";
// import ClearIcon from "@mui/icons-material/Clear"; // Clear all tasks
// import Task from "../src/Task";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Copyright from "../src/Copyright";

import Stack from "@mui/material/Stack";
import CurrentLists from "../src/CurrentLists";
import ChecklistRtlOutlinedIcon from "@mui/icons-material/ChecklistRtlOutlined";
import RuleOutlinedIcon from "@mui/icons-material/RuleOutlined";

// import EditNoteIcon from "@mui/icons-material/EditNote";
// import PlaylistRemoveIcon from "@mui/icons-material/PlaylistRemove";

import { useState } from "react";

export default function lists() {
  const [isComplete, setIsComplete] = useState(false);


  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        {/* Title */}
        <Typography variant="h4" component="h1" gutterBottom>
          User's lists
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
            <Typography color="text.primary">User's lists</Typography>
          </Breadcrumbs>
        </Stack>
        {/* Complete/Incomplete tasks message */}
        {isComplete ? (
          <Typography sx={{ mt: 3, mb: 3 }} color="text.secondary">
            <ChecklistRtlOutlinedIcon sx={{ mr: 1, verticalAlign: "middle" }} />
            {"Looks like you have completed all tasks! Good on you."}
          </Typography>
        ) : (
          <Typography sx={{ mt: 3, mb: 3 }} color="text.secondary">
            <RuleOutlinedIcon sx={{ mr: 1, verticalAlign: "middle" }} />
            {"Looks like you have incomplete tasks! Better get to it."}
          </Typography>
        )}

        {/* Existing Lists */}
        <CurrentLists />
        {/* Create list */}
        <Link underline="hover" color="inherit" href="/lists/new">
          <CreateListButton />
        </Link>
        {/* <Link underline="hover" color="inherit" href="/lists/new">
          <DeleteListButton/>
        </Link> */}

        <Copyright />
      </Box>
    </Container>
  );
}
