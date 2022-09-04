import React from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import Header from "components/layout/Header";
import Hero from "components/layout/Hero";
import Articles from "components/articles/Articles";
import theme from "components/layout/theme";


const App = () => {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Header />
			<Hero />
			<Articles />
		</ThemeProvider>
	);
};

export default App;
