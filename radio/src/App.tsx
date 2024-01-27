import { useEffect, useState } from "react";
import * as queryString from "query-string";
import { clamp } from "lodash";
import { v4 as uuidv4 } from "uuid";
import { ThemeProvider } from "@material-ui/core/styles";
import {
  CssBaseline,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";

import Generator from "./components/Generator";
import useGeneratorSettings from "./hooks/useGeneratorSettings";

import { theme } from "../theme";
import "./App.css";

export default function Home() {
  const [hash, setHash] = useState<any>(null);
  const {
    name,
    setName,
    blockSize,
    setBlockSize,
    maximumDuration,
    setMaximumDuration,
    accessToken,
    setAccessToken,
  } = useGeneratorSettings();

  useEffect(() => {
    const hash = queryString.parse(window.location.hash);
    const state = window.localStorage.getItem("state");
    if (hash !== null && typeof window !== "undefined") {
      window.history.pushState(null, "", window.location.href.split("#")[0]);

      if (hash.state === state) {
        setHash(hash);
        setAccessToken(hash.access_token as string);
      }
    }

    // TODO: Keep access token to prevent relogging.
  }, []);

  const sanitizeAndSetBlockSize = (value: string) => {
    const sanitized = clamp(parseInt(value) || 0, 2, 10);
    setBlockSize(sanitized);
  };

  const sanitizeAndSetMaximumDuration = (value: string) => {
    const sanitized = clamp(parseInt(value) || 0, 1, 240);
    setMaximumDuration(sanitized);
  };

  const onAuthenticate = () => {
    const state = uuidv4();
    window.localStorage.setItem("state", state);
    const url = `https://accounts.spotify.com/authorize?client_id=${
      import.meta.env.VITE_CLIENT_ID
    }&redirect_uri=${
      import.meta.env.VITE_REDIRECT_URI
    }&scope=playlist-read-private%20playlist-modify-private%20user-library-read%20user-read-playback-position%20user-top-read&response_type=token&state=${state}`;
    window.location.href = url;
  };

  const isAuthenticated = hash !== null;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>
        <Container maxWidth="md">
          <Typography variant="h4" color="primary">
            Music+Podcast playlist generator
          </Typography>
          <Grid container>
            <Grid item xs={12}>
              <Typography component="div" variant="body1" gutterBottom>
                <ol>
                  <li>
                    Collects all music tracks from your Daily Drive playlist.
                  </li>
                  <li>
                    Creates blocks each made of <b>1</b> podcast from your saved
                    podcasts and <b>{blockSize}</b> song(s) from the Daily Drive
                    playlist.
                  </li>
                  <li>
                    Songs and podcasts will be saved in a playlist named{" "}
                    <b>{name}</b>. Content will be replaced if the playlist
                    already exists.
                  </li>
                </ol>
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Playlist name"
                    fullWidth
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    type="number"
                    label="Songs per block"
                    fullWidth
                    value={blockSize}
                    onChange={(e) => sanitizeAndSetBlockSize(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    type="number"
                    label="Maximum episode duration "
                    helperText="minutes"
                    fullWidth
                    value={maximumDuration}
                    onChange={(e) =>
                      sanitizeAndSetMaximumDuration(e.target.value)
                    }
                  />
                </Grid>
              </Grid>
              {!isAuthenticated && (
                <>
                  <Button
                    id="submit"
                    color="primary"
                    variant="contained"
                    type="button"
                    onClick={onAuthenticate}
                  >
                    Authenticate with Spotify
                  </Button>
                  <Typography variant="caption" display="block" gutterBottom>
                    When you authenticate, Spotify<sub>®</sub> generates an
                    access token which is valid for an hour.
                  </Typography>
                </>
              )}
              {isAuthenticated && (
                <Generator
                  name={name}
                  blockSize={blockSize}
                  maximumDuration={maximumDuration}
                  accessToken={accessToken}
                />
              )}
            </Grid>
          </Grid>
        </Container>
      </main>
    </ThemeProvider>
  );
}
