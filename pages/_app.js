import React, { useReducer } from "react";
import App from "next/app";
import Head from "next/head";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "../src/theme";

// imports by me, not Next.js
import MyContext from "../components/MyContext";
import gameListReducer from "../reducers/gameList";

// wrap reducer around context provider for global state
// necessary for hooks to work with next's class-based app component
const ReducerWrapper = ({ children }) => {
  const [games, dispatch] = useReducer(gameListReducer, []);

  return (
    <MyContext.Provider value={{ games, dispatch }}>
      {children}
    </MyContext.Provider>
  );
};

export default class MyApp extends App {
  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }

    // in the future, will populate games list from local storage / database
  }

  // will need ComponentDidUpdate call here later to save game list to local storage / database

  render() {
    const { Component, pageProps } = this.props;

    return (
      <>
        <Head>
          <title>A Game of Chance</title>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width"
          />
        </Head>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <ReducerWrapper>
            <Component {...pageProps} />
          </ReducerWrapper>
        </ThemeProvider>
      </>
    );
  }
}
