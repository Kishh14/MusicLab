import React from "react";

import CardSong from "./CardTracks/CardSong";

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
  playAudio
}) => {
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
          <CardSong
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            songUrl={songUrl}
            setSongUrl={setSongUrl}
            key={index}
            userName={track.userName}
            songName={track.songName}
            audioUrl={track.audioUrl}
            imageData={imageData[index % imageData.length]}
            setUsername={setUsername}
            setSongName={setSongName}
            setSongImage={setSongImage}
            audioEl={audioEl}
            playAudio={playAudio}
          />
        ))}
      </section>
    </div>
  );
};

export default ChartTracks;
