import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/styles";
import { createTheme } from "@material-ui/core/styles";
import Header from "./components/layout/Header";
import Hero from "./components/layout/Hero";

const theme = createTheme({
	palette: {
		type: "light",
	},
});

const App = () => {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Header />
			<Hero />
		</ThemeProvider>
	);
};

export default App;
