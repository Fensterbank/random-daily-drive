import * as queryString from 'query-string';

import { Button, Container, FormControlLabel, FormGroup, FormHelperText, Grid, Switch, TextField, Typography, useMediaQuery } from '@material-ui/core';

import Generator from '../components/Generator';
import { clamp } from 'lodash';
import clsx from 'clsx';
import { setAccessToken } from '../utils/spotify';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function Home() {

  const [hash, setHash] = useState<any>(null);
  const [blocks, setBlocks] = useState(6);
  const [blockSize, setBlockSize] = useState(4);
  const [name, setName] = useState('Random Daily Drive');
  const [withPodcasts, setWithPodcasts] = useState(true);

  const isXS = useMediaQuery((theme: any) => theme.breakpoints.down('xs'));
  const hideImage = useMediaQuery('(max-width:800px)') && !isXS;

  const setNumberValue = (id: string, value: string) => {
    const n = clamp(parseInt(value), 2, 8);
    if (id === 'blocks')
      setBlocks(n);
    else if (blockSize)
      setBlockSize(n);
  }

  const onButtonClick = () => {
    const state = uuidv4();
    window.localStorage.setItem('state', state);
    const url = `https://accounts.spotify.com/authorize?client_id=${process.env.CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URI}&scope=playlist-read-private%20playlist-modify-private%20user-library-read&response_type=token&state=${state}`;
    window.location.href = url;
  }


  if (hash == null && typeof window !== 'undefined') {
    const hash = queryString.parse(window.location.hash);
    window.location.hash = '';
    const state = window.localStorage.getItem('state');

    if (hash.state === state) {
      setHash(hash);
      setAccessToken(hash.access_token as string);
    }
  }

  const isAuthenticated = hash != null;

  return (
    <>
      <main>
        <Container maxWidth="lg">
          <Typography variant="h4" component="h1" color="primary" gutterBottom>
            »Random Daily Drive« playlist generator for Spotify<sub>®</sub>
          </Typography>

          <Grid container spacing={5}>
            {!hideImage && <Grid item sm={4} xs={12}>
              <img className={clsx('theme-image', {
                'small': isXS,
              })} src="/img/player.png" />
            </Grid>}
            <Grid item sm={hideImage ? 12 : 8} xs={12}>
              <Typography variant="body1" gutterBottom>
                Are you tired of having always the same songs in your Daily Drive playlist?<br />
                This is a small web application for Spotify<sub>®</sub> trying a different approach:
                <ol>
                  <li>Collect all news and podcasts from your real Daily Drive playlist (autogenerated from Spotify).</li>
                  <li>Randomly select <b>{blocks}</b> tracks from all your saved tracks.</li>
                  <li>For each selected track get <b>{blockSize - 1}</b> similiar tracks using Spotify's recommendation api.</li>
                  <li>This results in <b>{blocks}</b> blocks with one podcast and <b>{blockSize}</b> similar songs each.</li>
                  <li>The <b>{blocks * blockSize}</b> songs are saved in a playlist named »{name}«. If the playlist already exists, all songs are replaced.</li>
                </ol>
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={7}>
                  <TextField label="Playlist Name" fullWidth value={name} onChange={(e) => setName(e.target.value)} />
                </Grid>
                <Grid item xs={12} sm={5}>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={withPodcasts}
                          onChange={(event) => setWithPodcasts(event.target.checked)}
                          color="primary"
                        />
                      }
                      label="With Podcasts"
                    />
                    <FormHelperText>Include news and podcasts from your official Daily Drive</FormHelperText>
                  </FormGroup>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField type="number" label="Block Amount" fullWidth helperText={`${blocks} of your favorite tracks will be chosen randomly`} value={blocks} onChange={(e) => setNumberValue('blocks', e.target.value)} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField type="number" label="Songs Per Block" fullWidth helperText={`Each block consists of a saved song and ${blockSize - 1} recommended songs.`} value={blockSize} onChange={(e) => setNumberValue('blockSize', e.target.value)} />
                </Grid>
              </Grid>
              {!isAuthenticated &&
                <>
                  <Button id="submit" color="primary" variant="contained" type="button" onClick={onButtonClick}>Authenticate with Spotify</Button>
                  <Typography variant="caption" display="block" gutterBottom>
                    When you authenticate the app, Spotify<sub>®</sub> generates an access token which is valid for an hour.<br />
                All work and communication is done in the browser and nothing is stored anywhere.
              </Typography>
                </>
              }
              {isAuthenticated && <Generator blocks={blocks} blockSize={blockSize} name={name} withPodcasts={withPodcasts} />}
            </Grid>
          </Grid>
        </Container>
      </main>
    </>
  )
}
