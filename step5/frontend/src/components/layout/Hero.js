import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import JazzIcon, { jsNumberForAddress } from "react-jazzicon";
import { useStore } from "context/StoreProvider";

const useStyles = makeStyles((theme) => ({
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
    },
}));

const Hero = () => {
    const classes = useStyles();
    const [state] = useStore();

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

                {state.provider === null && (
                    <Typography align="center" color="error" variant="h5">
                        Unable to connect to Metamask! Please install the extension from the
                        official Metamask.io website.
                    </Typography>
                )}

                {state.provider !== null && (
                    <Typography align="center" color="inherit" variant="h5">
                        The active Ethereum network is {state.name}
                    </Typography>
                )}

                {state.provider !== null && !state.allowed && (
                    <Typography align="center" color="error" variant="h5">
                        ChainList doesn't support this network! Please switch Metamask to a
                        test network.
                    </Typography>
                )}
                {!state.address && state.allowed && (
                    <div className={classes.heroButtons}>
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
                {state.address !== null && state.allowed && (
                    <Grid container spacing={1} justifyContent="center" direction="row">
                        <Grid item>
                            <JazzIcon
                                diameter={30}
                                seed={jsNumberForAddress(state.address)}
                            />
                        </Grid>
                        <Grid item>
                            <Typography align="center" color="inherit" variant="h6">
                                {state.address}
                            </Typography>
                        </Grid>
                    </Grid>
                )}
            </Container>
        </div>
    );
};

export default Hero;