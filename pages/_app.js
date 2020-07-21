import { Box } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import App from "next/app";
import dynamic from "next/dynamic";
import Head from "next/head";
import React from "react";

import "../src/nprogress.css";
import Footer from "../components/Footer";
import GamesReducer from "../utils/pageWrappers/GamesReducer";
import theme from "../src/theme";

const LoaderBar = dynamic(
  () => {
    return import("../components/LoaderBar");
  },
  { ssr: false }
);

// TODO: custom 404 page

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
            <Footer />
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
