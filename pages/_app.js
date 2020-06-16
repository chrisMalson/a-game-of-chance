import React, { useReducer, useEffect } from "react";
import App from "next/app";
import Head from "next/head";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "../src/theme";
import firebase from "../src/firebase";

// imports by me, not Next.js
import GamesContext from "../components/GamesContext";
import gameListReducer from "../reducers/gameList";
import Header from "../components/Header";

// wrap reducer around context provider for global state
// necessary for hooks to work with next's class-based app component
const ReducerWrapper = ({ children }) => {
  const [games, dispatch] = useReducer(gameListReducer, []);
  const database = firebase.database();

  console.log(children.props.AuthUserInfo);

  useEffect(() => {
    if (localStorage.getItem("games")) {
      const storedGames = JSON.parse(localStorage.getItem("games"));
      dispatch({ type: "BUILD_STORED_LIST", storedGames });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("games", JSON.stringify(games));
  }, [games]);

  return (
    <GamesContext.Provider value={{ games, dispatch }}>
      <Header />
      {children}
    </GamesContext.Provider>
  );
};

export default class MyApp extends App {
  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }

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

MyApp.getServerSideProps = async (ctx) => {
  const props = await App.getInitialProps(ctx);

  console.log(props.pageProps.AuthUserInfo.AuthUser);

  return { ...props };
};
