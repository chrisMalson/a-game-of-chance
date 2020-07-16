import React from "react";
import App from "next/app";
import Head from "next/head";
import { Box } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import dynamic from "next/dynamic";

import theme from "../src/theme";
import "../src/nprogress.css";
import GamesReducer from "../utils/pageWrappers/GamesReducer";

const LoaderBar = dynamic(
  () => {
    return import("../components/LoaderBar");
  },
  { ssr: false }
);

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
      <Box>
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
          <GamesReducer>
            <LoaderBar />
            <Component {...pageProps} />
          </GamesReducer>
        </ThemeProvider>
      </Box>
    );
  }
}

MyApp.getServerSideProps = async (ctx) => {
  const props = await App.getInitialProps(ctx);

  return { ...props };
};
