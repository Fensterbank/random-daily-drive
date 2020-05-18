import { Button, Typography } from '@material-ui/core';
import { FC, useState } from 'react';

import { GeneratorProps } from '../types';
import { generateDailyDrive } from '../utils/spotify';

enum PROGRESS {
  unset = 'unset',
  creating = 'creating',
  finished = 'finished',
};

const Generator: FC<GeneratorProps> = ({ blocks, blockSize, name, withPodcasts }) => {
  const [progress, setProgress] = useState(PROGRESS.unset);

  const onGenerateClick = async () => {
    setProgress(PROGRESS.creating);
    await generateDailyDrive(name, blocks, blockSize, withPodcasts);
    setProgress(PROGRESS.finished);
  }

  return (<div className="generator">
    <Button id="submit" disabled={progress === PROGRESS.creating} color="primary" variant="contained" type="button" onClick={onGenerateClick}>
      {(progress === PROGRESS.finished) ? 'Regenerate Playlist' : 'Generate Playlist'}
    </Button>
    {progress === PROGRESS.finished && <Typography variant="body2">Playlist has been generated.<br />You can find it in your Spotify.</Typography>}
  </div>)
}

export default Generator;
