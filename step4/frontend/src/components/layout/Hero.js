import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
	heroContent: {
		backgroundColor: theme.palette.background.paper,
		padding: theme.spacing(8, 0, 6),
	},
}));

const Hero = () => {
	const classes = useStyles();

	return (
		<div className={classes.heroContent}>
			<Container maxWidth="sm">
				<Typography
					variant="h2"
					align="center"
					color="textPrimary"
					gutterBottom
				>
					ChainList
				</Typography>
				<Typography variant="h4" align="center" color="textSecondary" paragraph>
					Sell and buy articles over the Ethereum blockchain.
				</Typography>
			</Container>
		</div>
	);
};

export default Hero;
