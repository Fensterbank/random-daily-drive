import { Button, Typography } from '@material-ui/core';
import { FC, useState } from 'react';

import { generateDailyDrive } from '../utils/spotify';

enum PROGRESS {
  unset = 'unset',
  creating = 'creating',
  finished = 'finished',
};

interface GeneratorProps {
  blocks: number,
  blockSize: number;
  name: string;
}

const Generator: FC<GeneratorProps> = ({ blocks, blockSize, name }) => {
  const [progress, setProgress] = useState(PROGRESS.unset);

  const onGenerateClick = async () => {
    setProgress(PROGRESS.creating);
    await generateDailyDrive(name, blocks, blockSize);
    setProgress(PROGRESS.finished);
  }

  return (<div className="generator">
    <Button disabled={progress === PROGRESS.creating} color="primary" variant="contained" type="button" onClick={onGenerateClick}>
      {(progress === PROGRESS.finished) ? 'Regenerate Playlist' : 'Generate Playlist'}
    </Button>
    {progress === PROGRESS.finished && <Typography variant="body2">Playlist has been generated.<br />You can find it in your Spotify.</Typography>}
  </div>)
}

export default Generator;
