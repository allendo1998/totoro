"use client";

import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/video.css";
import { MediaPlayer, MediaProvider, MediaPlayerInstance } from "@vidstack/react";
import {
  defaultLayoutIcons,
  DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default";
import { useEffect, useState } from "react";

const VideoPlayer = ({ url, title, id, number }) => {
  const [watchTime, setWatchTime] = useState(0);
  

  useEffect(() => {
    const isTime = localStorage.getItem(`${id}~${number}`);
    if (isTime) {
      console.log('found time which is: ' + isTime);
      setWatchTime(isTime);
    }
  }, []);

  function updateTime(time) {
    localStorage.setItem(`${id}~${number}`, time);
  }

  return (
    <MediaPlayer
      title={title}
      src={url}
      load="visible"
      onTimeUpdate={(time) => {updateTime(time.currentTime); setWatchTime(time.currentTime)}}
      currentTime={watchTime}
    >
      <MediaProvider />
      <DefaultVideoLayout icons={defaultLayoutIcons} />
    </MediaPlayer>
  );
};

export default VideoPlayer;