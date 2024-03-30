"use client";

import React from "react";
import dynamic from 'next/dynamic';
const ReactPlayer = dynamic(() => import('react-player/lazy'), { ssr: false });

const VideoPlayer = ({url}) => {
  return (
      <ReactPlayer
        width="100%"
        height="100%"
        url={url}
        controls={true}
        light={false}
        pip={true}
      />
  );
};

export default VideoPlayer;