import '../App.css';

import { CssBaseline, Link, Typography } from '@material-ui/core';

import Design from '../components/Design';
import Head from 'next/head'
import React from 'react'
import { ThemeProvider } from '@material-ui/core/styles';
import { theme } from '../theme';

export default function MyApp(props) {
  const { Component, pageProps } = props;

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

    return <ThemeProvider theme={theme}>
      <CssBaseline />
      <Design />
      <Head>
          <title>Random Daily Drive - Spotify® Playlist Generator</title>
      </Head>
      <Component {...pageProps} />

      <footer>
        <Typography variant="body2" display="block">
          Made with ❤️ by <Link target="_blank" href="https://f-bit.software" color="secondary">f-bit software</Link>
        </Typography>
        <Typography variant="body2" display="block">
          Fork me on <Link target="_blank" href="https://github.com/Fensterbank/random-daily-drive" color="secondary">Github</Link>
        </Typography>
      </footer>
    </ThemeProvider>
}
