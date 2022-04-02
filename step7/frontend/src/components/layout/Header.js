import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import StorefrontIcon from "@material-ui/icons/Storefront";

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

	return (
		<div className={classes.root}>
			<AppBar position="static">
				<Toolbar>
					<StorefrontIcon edge="start" className={classes.icon} />
					<Typography variant="h6" className={classes.title}>
						ChainList
					</Typography>
				</Toolbar>
			</AppBar>
		</div>
	);
};

export default Header;
