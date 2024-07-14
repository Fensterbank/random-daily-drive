import { useEffect, useState } from 'react';

import { GeneratorProps } from '../types';
import { useDebounce } from 'ahooks';

export default () => {
  const [blocks, setBlocks] = useState(6);
  const [blockSize, setBlockSize] = useState(4);
  const [name, setName] = useState('Random Daily Drive');
  const [withPodcasts, setWithPodcasts] = useState(true);

  const [settingsString, setSettingsString] = useState<string|null>(null);
  const debouncedSettings = useDebounce(settingsString, { wait: 500 });

  // load the settings from local storage after mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const s = window.localStorage.getItem('settings')
      const settings: GeneratorProps | null = s ? JSON.parse(s) : null
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
  useEffect(() => debouncedSettings ? window.localStorage.setItem('settings', debouncedSettings as string) : undefined, [debouncedSettings]);

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
