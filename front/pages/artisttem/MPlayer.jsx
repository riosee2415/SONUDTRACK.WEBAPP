import React, { useState } from "react";
import ReactAudioPlayer from "react-audio-player";

const MPlayer = ({ url }) => {
  const [playUrl, setPlayUrl] = useState(url);

  return <ReactAudioPlayer src={playUrl} autoPlay={true} controls />;
};

export default MPlayer;
