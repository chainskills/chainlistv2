import React from "react";
import { Container, Box, Typography, Grid, Button } from "@mui/material";
import JazzIcon, { jsNumberForAddress } from "react-jazzicon";
import { useStore } from "context/StoreProvider";

const Hero = () => {
	const [state] = useStore();

	return (
		<Box
			sx={{
				backgroundColor: "background.paper",
				pt: 12,
				pb: 6,
			}}
		>
			<Container maxWidth="sm">
				<Typography
					component="h1"
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

				{state.provider === null && (
					<Typography align="center" color="error" variant="h5">
						Unable to connect to Metamask! Please install the extension from the
						official Metamask.io website.
					</Typography>
				)}

				{state.provider !== null && (
					<Typography
						align="center"
						color="inherit"
						variant="h5"
						sx={{ pb: 2 }}
					>
						The active Ethereum network is {state.networkName}
					</Typography>
				)}

				{state.provider !== null && !state.allowed && (
					<Typography align="center" color="error" variant="h5">
						ChainList doesn't support this network! Please switch Metamask to a
						test network.
					</Typography>
				)}
				{!state.account && state.allowed && (
					<div>
						<Grid container spacing={2} justifyContent="center">
							<Grid item>
								{state.provider !== null && (
									<Button
										variant="contained"
										color="primary"
										onClick={() =>
											window.ethereum
												.request({ method: "eth_requestAccounts" })
												.catch((err) => {
													if (err.code === 4001) {
														// EIP-1193 userRejectedRequest error
														// If this happens, the user rejected the connection request.
														console.log("Please connect to MetaMask.");
													} else {
														console.error(err);
													}
												})
										}
									>
										Connect
									</Button>
								)}
							</Grid>
						</Grid>
					</div>
				)}
				{state.account !== null && state.allowed && (
					<Grid container spacing={1} justifyContent="center" direction="row">
						<Grid item>
							<JazzIcon
								diameter={30}
								seed={jsNumberForAddress(state.account)}
							/>
						</Grid>
						<Grid item>
							<Typography align="center" color="inherit" variant="h6">
								{state.account}
							</Typography>
						</Grid>
					</Grid>
				)}
			</Container>
		</Box>
	);
};

export default Hero;
