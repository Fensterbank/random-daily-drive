import { useEffect, useState } from "react";

import useDebounce from "./useDebounce";

export default () => {
  const [name, setName] = useState(new Date().toISOString().split("T")[0]);
  const [blockSize, setBlockSize] = useState(3);
  const [maximumDuration, setMaximumDuration] = useState(30);
  const [accessToken, setAccessToken] = useState(null);
  const [stop, setStop] = useState(false);

  const [settingsString, setSettingsString] = useState(null);
  const debouncedSettings = useDebounce(settingsString, 500);

  // load the settings from local storage after mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const settings: null = JSON.parse(
        window.localStorage.getItem("settings")
      );
      if (settings) {
        setBlockSize(settings.blockSize);
        setMaximumDuration(settings.maximumDuration);
      }
    }
  }, []);

  // on any change update the settings json strings for debouncing
  useEffect(() => {
    setSettingsString(
      JSON.stringify({
        name,
        blockSize,
        maximumDuration,
      })
    );
  }, [name, blockSize, maximumDuration]);

  // save settings to local storage after debounce timeout
  useEffect(
    () => window.localStorage.setItem("settings", debouncedSettings),
    [debouncedSettings]
  );

  return {
    name,
    setName,
    blockSize,
    setBlockSize,
    maximumDuration,
    setMaximumDuration,
    accessToken,
    setAccessToken,
  };
};
