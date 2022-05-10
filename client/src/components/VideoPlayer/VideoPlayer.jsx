import "./videoPlayer.scss";

import React, { useCallback, useEffect, useState } from "react";
import ShakaPlayer from "shaka-player-react";

const VideoPlayer = ({ data }) => {
  const ref = React.useRef(null);
  const [video, setVideo] = useState();

  const videoHandler = useCallback(() => {
    if (video) {
      video.play();
      video.style.setProperty("opacity", "1", "important");

      video.onended = (event) => {
        video.style.setProperty("opacity", "0");
        const timeout = setTimeout(() => {
          videoHandler();
        }, 15000);
        return () => clearTimeout(timeout);
      };
    }
  }, [video]);

  React.useEffect(() => {
    window.getShakaInst = () => ref.current;
  }, []);

  useEffect(() => {
    setVideo(document.getElementById("videoBanner"));

    const timeout = setTimeout(() => {
      videoHandler();
    }, 10000);
    return () => clearTimeout(timeout);
  }, [videoHandler]);

  return (
    <div>
      <ShakaPlayer
        id="videoBanner"
        ref={ref}
        src={data.manifest}
        muted={data.muted}
        chromeless={data.chromeless}
      />
    </div>
  );
};

export default VideoPlayer;
