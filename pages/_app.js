import "../App.css";

import { CssBaseline } from "@material-ui/core";

import Head from "next/head";
import React from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import { theme } from "../theme";

export default function MyApp(props) {
  const { Component, pageProps } = props;

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Head>
        <title>Music+Podcast Spotify® Playlist Generator</title>
      </Head>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
