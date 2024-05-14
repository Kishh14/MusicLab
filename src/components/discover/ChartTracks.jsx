import React, { useEffect } from "react";

import CardSong from "./CardTracks/CardSong";
import "../discover/CardTracks/CardSong.css";

const ChartTracks = ({
  imageData,
  error,
  loading,
  tracks,
  setIsPlaying,
  isPlaying,
  songUrl,
  setSongUrl,
  setUsername,
  setSongName,
  setSongImage,
  audioEl,
  playAudio,
  songName,
  username,
  songImage,
}) => {
  useEffect(() => {
    setSongUrl();

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

    console.log(imageData);
  }, []);

  const playSong = () => {
    playAudio();
    setIsPlaying(true);
    setSongName(songName);
    setUsername(userName);
    setSongImage(imageData?.urls.full);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1 className="text-3xl">Top Songs</h1>
      <section className="top-songs-container">
        {tracks?.map((track, index) => (
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
          // <CardSong
          //   isPlaying={isPlaying}
          //   setIsPlaying={setIsPlaying}
          //   songUrl={songUrl}
          //   setSongUrl={setSongUrl}
          //   key={index}
          //   userName={track.userName}
          //   songName={track.songName}
          //   audioUrl={track.audioUrl}
          //   imageData={imageData[index % imageData.length]}
          //   setUsername={setUsername}
          //   setSongName={setSongName}
          //   setSongImage={setSongImage}
          //   audioEl={audioEl}
          //   playAudio={playAudio}
          // />
        ))}
      </section>
    </div>
  );
};

export default ChartTracks;
