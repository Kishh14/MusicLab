import React, { Component, useEffect, useRef, useState } from "react";
import PopularGenres from "../components/discover/PopularGenres/PopularGenres";
import ChartTracks from "../components/discover/ChartTracks";
import ChartArtists from "../components/discover/ChartArtists";
import Navbar from "../components/discover/Navbar/Navbar";
import "../components/discover/Discover.css";
import UploadPage from "../components/discover/Uploadpage/UploadPage";

import { database } from "../../firebase-config";
import { ref as databaseRef, onValue } from "firebase/database";

const Discover = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageData, setImageData] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songDuration, setSongDuration] = useState();
  const [songUrl, setSongUrl] = useState();
  const [songName, setSongName] = useState();
  const [songImage, setSongImage] = useState();
  const [username, setUsername] = useState();

  const audioEl = document.getElementById("audioEl");

  const playAudio = () => {
    audioEl.play();
  };
  const pauseAudio = () => {
    audioEl.pause();
  };

  useEffect(() => {
    const dbRef = databaseRef(database, "audio");

    onValue(
      dbRef,
      (snapshot) => {
        const tracksData = [];
        snapshot.forEach((childSnapshot) => {
          tracksData.push(childSnapshot.val());
        });
        setTracks(tracksData);
        setLoading(false);
      },
      (error) => {
        setError(error.message);
        setLoading(false);
      }
    );

    // Fetching image from Unsplash
    const queries = ["airplane, buildings, rose, skyscapper"];
    const access_key = "p99v6inZ1kCvsBEdSeV783T_oCjfIiI35dTS1ABiSdQ";
    const response = fetch(
      `https://api.unsplash.com/search/photos?query=${queries}&client_id=${access_key}`
    );
    response
      .then((res) => res.json())
      .then((data) => {
        setImageData(data.results);
      });
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      {/* FIXME: The song source is not being changed upon playing other songs */}
      {/* FIXME: The UI is taking much more height than needed */}
      <div className="container-right">
        <div className="nav-wrapper">
          <div className="nav-left">
            <Navbar openModal={openModal} />
          </div>
        </div>

        <UploadPage isOpen={isModalOpen} onClose={closeModal} />

        <div>
          <div className="mt-20" style={{ padding: "0% 0% 6% 8%" }}>
            <h1 className="text-3xl" style={{ width: "70%" }}>
              Explore the Sounds of Our Community: <br /> Listen to User-Created
              Music
            </h1>
            <br />
            <p style={{ width: "80%" }}>
              Dive into a world of creativity and talent with our curated
              collection of user-generated music. From catchy pop tunes to
              soulful ballads. Let your ears be captivated by the unique voices
              and perspectives that come alive through these original
              compositions.
            </p>
          </div>
          <div className="home-divide">
            <div className="popular-left">
              <PopularGenres
                songUrl={songUrl}
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
                songName={songName}
                username={username}
                songImage={songImage}
                audioEl={audioEl}
                playAudio={playAudio}
                pauseAudio={pauseAudio}
              />
            </div>
            <div className="popular-right">
              <ChartTracks
                tracks={tracks}
                loading={loading}
                error={error}
                imageData={imageData}
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
                songDuration={songDuration}
                songUrl={songUrl}
                setSongUrl={setSongUrl}
                setUsername={setUsername}
                setSongName={setSongName}
                setSongImage={setSongImage}
                audioEl={audioEl}
                playAudio={playAudio}
              />
            </div>
          </div>
          {/* <ChartArtists /> */}
        </div>
        <audio src={songUrl} id="audioEl"></audio>
      </div>
    </>
  );
};

export default Discover;
