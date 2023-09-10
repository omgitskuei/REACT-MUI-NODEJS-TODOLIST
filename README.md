# REACT-MUI-NODEJS-TODOLIST
React, Google Material UI, Node.js, RESTful API Todo List

Documentation for Practical Test
This documentation assumes the reader is developing on Windows.
This project uses the following tech stack:
NVM, Node.js
NPM
HTML, CSS, JS, React, Google Material UI (MUI)
Node.js
MongoDB


Installations & Setup
Github
Create a repository on github and clone the project into the local project folder

For this project where there’s only one dev, it is ok to commit straight to main. Remember to commit often.
NVM & Node.js
Use NVM to version manage Node.js.
Navigate to https://github.com/coreybutler/nvm-windows#readme and install NVM to manage NPM versions. Click “Download Now!”. 

It will redirect the user to the “Latest release” page - click on and download “nvm-setup.exe”.

Click through the downloaded installer. Open Windows terminal and enter “nvm --v”, this should return the version number like “1.1.11”.

Open Windows terminal, enter “nvm install lts” to install the long-term support version of npm. At the time of this documentation, it’s Version 18.17.1. Enter “nvm use 18.17.1” to use this version of npm.
nvm install lts
nvm use 18.17.1
nvm on

Check to see if the Node version has successfully swapped to 18.17.1 by entering this command into terminal “node -v”.



VSCode
Download VSCode here https://code.visualstudio.com/download, download the user installer x86 Windows. Follow the steps of the installer wizard.

Open VSCode and open a VSCode terminal using the top menu bar.

Create a folder in the local computer’s file system somewhere to store the project. Use the terminal and “cd” and “mkdir” commands or use the file system. The screenshot uses “app” for folder name. 
Init Project Package.JSON
Use “npm init” in VSCode terminal to create a new project’s package.json file inside the app folder. There will be prompts like package name. Enter to use the default value inside the () brackets.
package name: app
version: 1
description: A React, Google MUI, Node.js task/todo list app
entry point: App.js
test command artillery run test.yml
git repository: https:// github.com/omgitskuei/REACT-MUI-NODEJS-TODOLIST.git
keywords: todolist
author: Omgitskuei
license: GPL-3.0

The resulting package.json should look like below:


Load testing tool Artillery
Create a file named test.yml inside the app folder, next to the package.json, with the following contents:


Install the load testing tool artillery with npm with Windows terminal. Make sure to do this globally with the “-g” tag.

Later, run test by entering “artillery run test.yml” into VSCode terminal.

Google Material UI (MUI)
Navigate to https://mui.com/material-ui/getting-started/installation/ and follow the installation steps.
Open VSCode terminal, enter “npm install @mui/material @emotion/react @emotion/styled” to install MUI. It has peer dependencies: react and react-dom. MUI uses Roboto font so also install that “npm install @fontsource/roboto”. MUI also provides icons that this project can use so install that “npm install @mui/icons-material” too.
npm install @mui/material @emotion/react @emotion/styled @mui/icons-material
npm install @fontsource/roboto
This will also install react and react-dom because they are peer dependencies.
Icons used in this project have been sourced from MUI. A full catalog of available icons is available at https://mui.com/material-ui/material-icons/. 
For this project, the following icons are needed:
AddIcon
EditIcon
RemoveIcon
ClearIcon
PlaylistAddIcon
EditNoteIcon
PlaylistRemoveIcon
For this project, the following components may be needed:
Paper
Stack
List
ListSubheader
ListItemButton
ListItemIcon
ListItemText
Collapse
ExpandLess
ExpandMore

Init React project
In the project folder, enter vscode terminal commands:
npm i react-redux @reduxjs/toolkit redux-persist react-dropzone dotenv formik yup
npx create-react-app client



MUI components snippets to include in the project
// Icons for adding/editing/deleting tasks in a list
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import RemoveIcon from '@mui/icons-material/Remove';
import ClearIcon from '@mui/icons-material/Clear'; // Clear all tasks

// Icons for adding/editing/deleting lists
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import EditNoteIcon from '@mui/icons-material/EditNote';
import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove';

import * as React from 'react';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function ResponsiveStack() {
  return (
	<div>
  	<Stack
    	direction={{ xs: 'column', sm: 'row' }}
    	spacing={{ xs: 1, sm: 1}}
  	>
    	<Item>Item 1</Item> // menu
    	<Item>Item 2</Item> // task list
  	</Stack>
	</div>
  );
}


// Components used in structuring the app’s menu of task lists
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
export default function Menu() {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
	setOpen(!open);
  };

  return (
	<List
  	sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
  	component="nav"
  	aria-labelledby="nested-list-subheader"
  	subheader={
    	<ListSubheader component="div" id="nested-list-subheader">
      	Task Lists
    	</ListSubheader>
  	}
	>
  	<ListItemButton onClick={handleClick}>
    	<ListItemIcon>
      	<PlaylistAddIcon />
    	</ListItemIcon>
    	<ListItemText primary="Inbox" />
    	{open ? <ExpandLess /> : <ExpandMore />}
  	</ListItemButton>
  	<Collapse in={open} timeout="auto" unmountOnExit>
    	<List component="div" disablePadding>
      	<ListItemButton sx={{ pl: 4 }}>
        	<ListItemIcon>
          	<EditNoteIcon />
        	</ListItemIcon>
        	<ListItemText primary="Starred" />
      	</ListItemButton>
    	</List>
  	</Collapse>
	</List>
  );
}

import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'lastName', headerName: 'Last name', width: 130 },
  {
	field: 'age',
	headerName: 'Age',
	type: 'number',
	width: 90,
  },
  {
	field: 'fullName',
	headerName: 'Full name',
	description: 'This column has a value getter and is not sortable.',
	sortable: false,
	width: 160,
	valueGetter: (params) =>
  	`${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

export default function DataTable() {
  return (
	<div style={{ height: 400, width: '100%' }}>
  	<DataGrid
    	rows={rows}
    	columns={columns}
    	initialState={{
      	pagination: {
        	paginationModel: { page: 0, pageSize: 5 },
      	},
    	}}
    	pageSizeOptions={[5, 10]}
    	checkboxSelection
  	/>
	</div>
  );
}


import * as React from 'react';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

export default function ActionAlerts() {
  return (
	<Stack sx={{ width: '100%' }} spacing={2}>
  	<Alert
    	action={
      	<Button color="inherit" size="small">
        	UNDO
      	</Button>
    	}
  	>
    	This is a success alert — check it out!
  	</Alert>
	</Stack>
  );
}
<Alert
  action={
	<Button color="inherit" size="small">
  	UNDO
	</Button>
  }
>





import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function AlertDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
	setOpen(true);
  };

  const handleClose = () => {
	setOpen(false);
  };

  return (
	<div>
  	<Button variant="outlined" onClick={handleClickOpen}>
    	Open alert dialog
  	</Button>
  	<Dialog
    	open={open}
    	onClose={handleClose}
    	aria-labelledby="alert-dialog-title"
    	aria-describedby="alert-dialog-description"
  	>
    	<DialogTitle id="alert-dialog-title">
      	{"Use Google's location service?"}
    	</DialogTitle>
    	<DialogContent>
      	<DialogContentText id="alert-dialog-description">
        	Let Google help apps determine location. This means sending anonymous
        	location data to Google, even when no apps are running.
      	</DialogContentText>
    	</DialogContent>
    	<DialogActions>
      	<Button onClick={handleClose}>Disagree</Button>
      	<Button onClick={handleClose} autoFocus>
        	Agree
      	</Button>
    	</DialogActions>
  	</Dialog>
	</div>
  );
}

import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

export default function Variants() {
  return (
	<Stack spacing={1}>
  	<Skeleton variant="rounded" width={210} height={60} />
	</Stack>
  );
}


import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

export default function SimpleSnackbar() {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
	setOpen(true);
  };

  const handleClose = (event, reason) => {
	if (reason === 'clickaway') {
  	return;
	}

	setOpen(false);
  };

  const action = (
	<React.Fragment>
  	<Button color="secondary" size="small" onClick={handleClose}>
    	UNDO
  	</Button>
  	<IconButton
    	size="small"
    	aria-label="close"
    	color="inherit"
    	onClick={handleClose}
  	>
    	<CloseIcon fontSize="small" />
  	</IconButton>
	</React.Fragment>
  );

  return (
	<div>
  	<Button onClick={handleClick}>Open simple snackbar</Button>
  	<Snackbar
    	open={open}
    	autoHideDuration={6000}
    	onClose={handleClose}
    	message="Note archived"
    	action={action}
  	/>
	</div>
  );

React
React is a dependency of MUI so it should be installed already but go ahead and check just in case by entering “npm i react” and “npm install react react-dom”
npm i react
npm install react react-dom

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import * as React from 'react';
import Button from '@mui/material/Button';
export default function ButtonUsage() {
  return <Button variant="contained">Hello world</Button>;
}

import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';
<DeleteTwoToneIcon />
<DeleteForeverTwoToneIcon />

import * as React from 'react';
import Box from '@mui/material/Box';

import Icon from '@mdi/react';
import { mdiPlus } from '@mdi/js';
<Icon path={mdiPlus} size={1} />

import Icon from '@mdi/react';
import { mdiMinus } from '@mdi/js';
<Icon path={mdiMinus} size={1} />

import Icon from '@mdi/react';
import { mdiClose } from '@mdi/js';
<Icon path={mdiClose} size={1} />

import Icon from '@mdi/react';
import { mdiNuke } from '@mdi/js';
<Icon path={mdiNuke} size={1} />

import Icon from '@mdi/react';
import { mdiPencil } from '@mdi/js';
<Icon path={mdiPencil} size={1} />


import Icon from '@mdi/react';
import { mdiSortAlphabeticalAscending } from '@mdi/js';
<Icon path={mdiSortAlphabeticalAscending} size={1} />

import Icon from '@mdi/react';
import { mdiSortAlphabeticalDescending } from '@mdi/js';
<Icon path={mdiSortAlphabeticalDescending} size={1} />

import Icon from '@mdi/react';
import { mdiSortBoolAscendingVariant } from '@mdi/js';
<Icon path={mdiSortBoolAscendingVariant} size={1} />

import Icon from '@mdi/react';
import { mdiSortBoolDescendingVariant } from '@mdi/js';
<Icon path={mdiSortBoolDescendingVariant} size={1} />

import Icon from '@mdi/react';
import { mdiSortCalendarAscending } from '@mdi/js';
<Icon path={mdiSortCalendarAscending} size={1} />

import Icon from '@mdi/react';
import { mdiSortCalendarDescending } from '@mdi/js';
<Icon path={mdiSortCalendarDescending} size={1} />

import Icon from '@mdi/react';
import { mdiSort } from '@mdi/js';
<Icon path={mdiSort} size={1} />
import Icon from '@mdi/react';
import { mdiSortAscending } from '@mdi/js';
<Icon path={mdiSortAscending} size={1} />

import Icon from '@mdi/react';
import { mdiSortDescending } from '@mdi/js';
<Icon path={mdiSortDescending} size={1} />

import Icon from '@mdi/react';
import { mdiCheckboxBlankCircleOutline } from '@mdi/js';
<Icon path={mdiCheckboxBlankCircleOutline} size={1} />

import Icon from '@mdi/react';
import { mdiCheckboxMarkedCircleOutline } from '@mdi/js';
<Icon path={mdiCheckboxMarkedCircleOutline} size={1} />

import SvgIcon from '@mui/material/SvgIcon';
import { createSvgIcon } from '@mui/material/utils';
function HomeIcon(props) {
  return (
	<SvgIcon {...props}>
  	<path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
	</SvgIcon>
  );
}
const PlusIcon = createSvgIcon(
  // credit: plus icon from https://heroicons.com/
  <svg
	xmlns="http://www.w3.org/2000/svg"
	fill="none"
	viewBox="0 0 24 24"
	strokeWidth={1.5}
	stroke="currentColor"
  >
	<path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
  </svg>,
  'Plus',
);

export default function SvgIconsColor() {
  return (
	<Box
  	sx={{
    	'& > :not(style)': {
      	m: 2,
    	},
  	}}
	>
  	<HomeIcon />
  	<PlusIcon />
	</Box>
  );
}
