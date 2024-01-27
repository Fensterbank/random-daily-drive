import { useState } from "react";
import { Button, Typography, Grid } from "@material-ui/core";

import { generateDailyDrive } from "../process/spotify";

enum PROGRESS {
  unset = "unset",
  started = "started",
  finished = "finished",
}

type GeneratorProps = {
  name: string;
  blockSize: number;
  maximumDuration: number;
  accessToken: string | null;
};

const Generator = ({
  name,
  blockSize,
  maximumDuration,
  accessToken,
}: GeneratorProps) => {
  const [started, setStarted] = useState(PROGRESS.unset);
  const [logs, setLogs] = useState<string[]>([]);

  const appendMessage = (message: string | null) => {
    if (!message) {
      setLogs([]);
    } else {
      setLogs((prevLogs) => [message, ...prevLogs]);
    }
  };

  const onGenerateClick = async () => {
    setStarted(PROGRESS.started);
    await generateDailyDrive(
      name,
      blockSize,
      maximumDuration,
      accessToken,
      appendMessage
    );
    setStarted(PROGRESS.finished);
  };

  return (
    <div className="generator">
      <Button
        id="submit"
        disabled={started === PROGRESS.started}
        color="primary"
        variant="contained"
        type="button"
        onClick={onGenerateClick}
      >
        {started === PROGRESS.finished
          ? "Regenerate Playlist"
          : "Generate Playlist"}
      </Button>
      {}
      {started === PROGRESS.started && (
        <Typography variant="body2">
          Hang tight, the playlist is being created...
        </Typography>
      )}
      {started === PROGRESS.finished && (
        <Typography variant="body2">Done!</Typography>
      )}
      {logs.length > 0 && (
        <Grid>
          --
          {logs.map((message, index) => (
            <Typography key={index} variant="body2">
              {message}
            </Typography>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default Generator;
