import React, { useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/styles";
import { createTheme } from "@material-ui/core/styles";
import Header from "components/layout/Header";
import Hero from "components/layout/Hero";
import Events from "components/layout/Events";
import Articles from "components/articles/Articles";
import { useStore } from "context/StoreProvider";
import { setupWeb3, getArticle, addAllListeners } from "context/web3Actions";

const theme = createTheme({
	palette: {
		type: "light",
	},
});

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
			getArticle(state, dispatch);
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
