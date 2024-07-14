import { FC } from "react";
import { useAppStore } from "../store";
import { CheckmarkOutline, ErrorOutline, Undefined, Queued } from '@carbon/icons-react';
import { Typography } from "@material-ui/core";
import { PuffLoader } from "react-spinners";
import classNames from "classnames";

interface ActionItemProps {
  text: string;
  actionKey: string;
}

export enum ACTION {
  fetchUser = 'fetch-user',
  getExistingPlaylist = 'get-existing-playlist',
  emptyExistingPlaylist = 'empty-existing-playlist',
  createEmptyPlaylist = 'create-empty-playlist',
  getTracks = 'get-tracks',
  getDDPodcasts = 'get-dd-podcasts',
  getRecommendations = 'get-recommendations',
  addTracks = 'add-tracks',
}


const Item: FC<ActionItemProps> = ({ text, actionKey }) => {
  const storeAction = useAppStore(state => state.actions[actionKey])
  const getIcon = () => {
    if (!storeAction) return <Queued size="24" />
    switch (storeAction.status) {
      case 'running':
        return <PuffLoader size='24' color='#1db954' loading />
      case 'completed':
        return <CheckmarkOutline size="24" />
      case 'failed':
        return <ErrorOutline size="24" />
      case 'skipped':
        return <Undefined size="24" />

    }
  }

  return <div className={classNames('flex items-center space-x-2', {
    'text-gray-500': storeAction?.status === 'skipped',
    'text-green-700': storeAction?.status === 'completed',
    'text-red-700': storeAction?.status === 'failed'
  })}>
    {getIcon()}
    <p className="m-0 flex flex-col">
      <Typography>{text}</Typography>
      {storeAction?.error && <Typography variant="caption" color="error">Error {storeAction.error.message}</Typography>}
      {storeAction?.meta && <Typography variant="caption">{storeAction.meta}</Typography>}
    </p>
  </div>
}

export const Progress: FC = () => {
  return <div className="flex flex-col space-y-1 mb-4">
    <Item text='Fetch Spotify User ID' actionKey={ACTION.fetchUser} />
    <Item text='Get existing playlist' actionKey={ACTION.getExistingPlaylist} />
    <Item text='Empty existing playlist' actionKey={ACTION.emptyExistingPlaylist} />
    <Item text='Create empty playlist' actionKey={ACTION.createEmptyPlaylist} />
    <Item text='Get all favorite tracks' actionKey={ACTION.getTracks} />
    <Item text='Get Daily Drive podcasts' actionKey={ACTION.getDDPodcasts} />
    <Item text='Get recommendations for each favorite track' actionKey={ACTION.getRecommendations} />
    <Item text='Add tracks to playlist' actionKey={ACTION.addTracks} />
  </div>
}