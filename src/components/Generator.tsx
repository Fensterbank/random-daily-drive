import { Button, Typography } from '@material-ui/core';
import { FC } from 'react';

import { GeneratorProps } from '../types';
import { generateDailyDrive } from '../utils/spotify';
import { useAppStore } from '../store';
import { PROGRESS } from '../const';
import { Progress } from './Progress';

const Generator: FC<GeneratorProps> = ({ blocks, blockSize, name, withPodcasts }) => {
  const setProcessing = useAppStore(state => state.setProcessing)
  const processing = useAppStore(state => state.processing)
  const resetActions = useAppStore(state => state.resetActions)

  const onGenerateClick = async () => {
    resetActions()
    setProcessing(PROGRESS.creating)
    await generateDailyDrive(name, blocks, blockSize, withPodcasts)
    setProcessing(PROGRESS.finished)
  }

  return (<div className="mt-4">
    {processing !== PROGRESS.unset && <Progress />}
    <Button id="submit" disabled={processing === PROGRESS.creating} color="primary" variant="contained" type="button" onClick={onGenerateClick}>
      {(processing === PROGRESS.finished) ? 'Regenerate Playlist' : 'Generate Playlist'}
    </Button>
    {processing === PROGRESS.finished && <Typography variant="body2">Playlist has been generated.<br />You can find it in your Spotify.</Typography>}
  </div>)
}

export default Generator;
