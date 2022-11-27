import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DialogBox from './dialog';

export default function ButtonAppBar(props) {
	

	const handleClickOpen = () => {
		props.setFocusKey(-1);
		props.setOpen(true);
	}

	const handleCancel = () => {
		props.setOpen(false);
		console.log("cancelling");
	}


	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">
				<Toolbar>
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						<IconButton
							size="large"
							edge="start"
							color="inherit"
							aria-label="menu"
							sx={{ mr: 2 }}
						>
							<MenuIcon />
						</IconButton>
						FRAMEWORKS
					</Typography>
					<Button variant='contained' color="primary" startIcon={<AddCircleIcon />} onClick={handleClickOpen}>
						Add
					</Button>
					<DialogBox focusKey={props.focusKey} open={props.open} rows={props.rows} setRows={props.setRows} cancel={handleCancel} />
				</Toolbar>
			</AppBar>
		</Box>
	);
}