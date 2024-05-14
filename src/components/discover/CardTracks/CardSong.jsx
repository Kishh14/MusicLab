import React, { useEffect, useState, useRef } from "react";
import "./CardSong.css";

const CardSong = ({
  userName,
  songName,
  audioUrl,
  imageData,
  setIsPlaying,
  isPlaying,
  songUrl,
  setSongUrl,
  setUsername,
  setSongName,
  setSongImage,
  audioEl,
  playAudio,
}) => {
  useEffect(() => {
    setSongUrl(audioUrl);

    // audioEl.addEventListener("playing", () => {
    //   console.log("Hey, the audio is playing!");
    //   setIsPlaying(true);
    //   setSongName(songName);
    //   setUsername(userName);
    //   setSongImage(imageData?.urls.full);
    // });
    // audioEl.addEventListener("pause", () => {
    //   console.log("The audio is paused.");
    //   setIsPlaying(false);
    // });
    // audioEl.addEventListener("ended", () => {
    //   console.log("The audio has ended.");
    //   setIsPlaying(false);
    // });
  }, []);

  const playSong = () => {
    playAudio();
    setIsPlaying(true);
    setSongName(songName);
    setUsername(userName);
    setSongImage(imageData?.urls.full);
  };

  return (
    <div className="container-song">
      <div className="cover-container">
        <img src={imageData?.urls.full} alt={songName} />
      </div>
      <div className="info-container">
        <span>{songName}</span>
        <div className="contributors">
          <p key={userName} className="track-artist">
            {userName}
          </p>
        </div>
      </div>
      <div className="icon-controller">
        <button className="" onClick={playSong}>
          Play
        </button>
        <br />
      </div>
    </div>
  );
};

export default CardSong;
