import React, { useEffect } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import Header from "components/layout/Header";
import Hero from "components/layout/Hero";
import Events from "components/layout/Events";
import Articles from "components/articles/Articles";
import { useStore } from "context/StoreProvider";
import {
	setupWeb3,
	getMarketplace,
	getMyArticles,
	addAllListeners,
} from "context/web3Actions";
import theme from "components/layout/theme";

const App = () => {
	const [state, dispatch] = useStore();

	useEffect(() => {
		setupWeb3(state, dispatch);
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		if (state.connected) {
			addAllListeners(state, dispatch);
		}
		// eslint-disable-next-line
	}, [state.connected, state.account]);

	useEffect(() => {
		if (state.refreshTimeStamp) {
			if (state.marketplace) {
				getMarketplace(state, dispatch);
			} else {
				getMyArticles(state, dispatch);
			}
		}
		// eslint-disable-next-line
	}, [state.refreshTimeStamp]);

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Header />
			<Hero />
			{state.allowed && <Articles />}
			<Events />
		</ThemeProvider>
	);
};

export default App;
