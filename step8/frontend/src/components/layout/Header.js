import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Typography from "@material-ui/core/Typography";
import StorefrontIcon from "@material-ui/icons/Storefront";
import { useStore } from "context/StoreProvider";
import { showEvents, hideEvents } from "context/web3Actions";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	title: {
		flexGrow: 1,
	},
	icon: {
		marginRight: theme.spacing(2),
	},
}));

const Header = () => {
	const classes = useStyles();

	const [state, dispatch] = useStore();
	const [showEventsStatus, setShowEventsStatus] = useState(false);

	useEffect(() => {
		if (showEventsStatus) {
			showEvents(state, dispatch);
		} else {
			hideEvents(state, dispatch);
		}
		// eslint-disable-next-line
	}, [showEventsStatus]);

	const handleChange = (event) => {
		setShowEventsStatus(event.target.checked);
	};

	return (
		<div className={classes.root}>
			<AppBar position="static">
				<Toolbar>
					<StorefrontIcon edge="start" className={classes.icon} />
					<Typography variant="h6" className={classes.title}>
						ChainList
					</Typography>
					<FormGroup>
						<FormControlLabel
							control={<Switch color="secondary" onChange={handleChange} />}
							label="Show Events"
						/>
					</FormGroup>
				</Toolbar>
			</AppBar>
		</div>
	);
};

export default Header;
