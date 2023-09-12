import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "../src/Link";
import Copyright from "../src/Copyright";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import Stack from "@mui/material/Stack";

export default function Index() {
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        {/* Title */}
        <Typography variant="h4" component="h1" gutterBottom>
          {'Hi,'} <PersonOutlineOutlinedIcon fontSize="large"/> {'user!'}
        </Typography>
        {/* Breadcrumbs */}
        <Stack direction={{ xs: "column", sm: "row" }} spacing={{ xs: 1, sm: 1 }}>
          <p>Breadcrumbs~</p>
          <Breadcrumbs aria-label="breadcrumb">
            <Typography color="text.primary">
              User</Typography>
          </Breadcrumbs>
        </Stack>
        {/* Welcome message */}
        <Typography sx={{ mt: 2, mb: 3 }} color="text.secondary">
          <p>{'Welcome to REACT-MUI-NEXTJS-TODOLIST app, by Omgitskuei'}</p>
          <p>{'See the source at: '}</p>
          <p>{'https://github.com/omgitskuei/REACT-MUI-NODEJS-TODOLIST'}</p>
          
        </Typography>
        {/* Login/Logout */}

        {/* Statistics */}

        {/* Create new list */}
        <Link href="/lists" color="secondary">
          Your lists
        </Link>
        <Copyright />
      </Box>
    </Container>
  );
}
