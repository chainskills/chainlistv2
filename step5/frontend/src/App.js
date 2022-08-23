import React, { useEffect } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import Header from "components/layout/Header";
import Hero from "components/layout/Hero";
import Articles from "components/articles/Articles";
import { useStore } from "context/StoreProvider";
import { setupWeb3, getArticle } from "context/web3Actions";
import theme from "components/layout/theme";

const App = () => {
  const [state, dispatch] = useStore();

  useEffect(() => {
    setupWeb3(state, dispatch);
    // eslint-disable-next-line
  }, []);

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
    </ThemeProvider>
  );
};

export default App;
