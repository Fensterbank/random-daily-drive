import { useEffect, useState } from 'react';

import { GeneratorProps } from '../types';
import useDebounce from './useDebounce';

export default () => {
  const [blocks, setBlocks] = useState(6);
  const [blockSize, setBlockSize] = useState(4);
  const [name, setName] = useState('Random Daily Drive');
  const [withPodcasts, setWithPodcasts] = useState(true);

  const [settingsString, setSettingsString] = useState(null);
  const debouncedSettings = useDebounce(settingsString, 500);

  // load the settings from local storage after mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const settings: GeneratorProps | null = JSON.parse(window.localStorage.getItem('settings'));
      if (settings) {
        setBlocks(settings.blocks);
        setBlockSize(settings.blockSize);
        setName(settings.name);
        setWithPodcasts(settings.withPodcasts);
      }
    }
  }, []);

  // on any change update the settings json strings for debouncing
  useEffect(() => {
    setSettingsString(JSON.stringify({
      blocks,
      blockSize,
      name,
      withPodcasts
    }));
  }, [blocks, blockSize, name, withPodcasts]);

  // save settings to local storage after debounce timeout
  useEffect(() => window.localStorage.setItem('settings', debouncedSettings), [debouncedSettings]);

  return {
    blocks,
    blockSize,
    name,
    withPodcasts,
    setBlocks,
    setBlockSize,
    setName,
    setWithPodcasts
  }
}
