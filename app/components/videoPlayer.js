"use client";

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
const ReactPlayer = dynamic(() => import('react-player/lazy'), { ssr: false });

const VideoPlayer = ({url}) => {
  const [currentTime, setCurrentTime] = useState(0);

  const handleProgress = ({ playedSeconds }) => {
    console.log(playedSeconds);
  };

  return (
    <ReactPlayer
      url={url}
      controls
      onProgress={handleProgress}
      config={{
        hlsOptions: {
          // Additional hls.js options if needed
        },
      }}
      playing={true}
      width="100%"
      height="100%"
    />
  );
};

export default VideoPlayer;