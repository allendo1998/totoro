"use client";

import React from 'react';
import dynamic from 'next/dynamic';
const ReactPlayer = dynamic(() => import('react-player/lazy'), { ssr: false });

const VideoPlayer = ({url, id, number}) => {
  return (
    <ReactPlayer
      url={url}
      controls
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