import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "../src/Link";
import Copyright from "../src/Copyright";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import Stack from "@mui/material/Stack";
import LoginButton from '../src/LoginButton';
import LogoutButton from '../src/LogoutButton';

// import Connected from '../pages/api/connected.jsx'


// import DemoParents from '../src/examples/DemoParent';

export default function Index() {
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        {/* Title */}
        <Typography variant="h4" component="h1" gutterBottom>
          {'Hi,'} <PersonOutlineOutlinedIcon fontSize="large"/> {'user!'}
        </Typography>
        {/* Breadcrumbs */}
        <Stack direction={{ xs: "row", sm: "row" }} spacing={{ xs: 1, sm: 1 }}>
          {'Breadcrumbs~ '}
          <Breadcrumbs aria-label="breadcrumb">
            <Typography color="text.primary">
              User</Typography>
          </Breadcrumbs>
        </Stack>
        {/* Welcome message */}
        <Typography sx={{ mt: 2, mb: 1 }} color="text.secondary">
          {'Welcome to REACT-MUI-NEXTJS-TODOLIST app, by Omgitskuei'}
        </Typography>
        <Typography sx={{ mt: 1, mb: 1 }} color="text.secondary">
          {'See the source at:'}
        </Typography>
        <Typography sx={{ mt: 1, mb: 3 }} color="text.secondary">
          {'https://github.com/omgitskuei/REACT-MUI-NODEJS-TODOLIST'}
        </Typography>
        {/* Display connection status to MongoDB */}
        {/* <Connected /> */}
        {/* Login/Logout */}
        <Link underline="hover" sx={{ mt: 2, mb: 1 }} color="inherit" href="#">
          <LoginButton />
        </Link>
        <Link underline="hover" sx={{ mt: 2, mb: 1 }} color="inherit" href="#">
          <LogoutButton />
        </Link>
        {/* <DemoParents /> */}
        
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
