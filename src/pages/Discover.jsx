import React, { useEffect, useState } from "react";
import PopularGenres from "../components/discover/PopularGenres/PopularGenres";
import Navbar from "../components/discover/Navbar/Navbar";
import "../components/discover/Discover.css";
import "../components/discover/CardTracks/CardSong.css";
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
  const [songName, setSongName] = useState();
  const [songImage, setSongImage] = useState();
  const [songElID, setSongElID] = useState();
  const [username, setUsername] = useState();
  const [isMobile, setIsMobile] = useState();

  useEffect(() => {
    if (window.innerWidth < 450) {
      setIsMobile(true);
    }
  }, [window.innerWidth]);

  const audioEl = document.createElement("audio");
  const currentAudioEl = document.getElementById(songElID);
  currentAudioEl?.addEventListener("ended", () => {
    setIsPlaying(false);
  });

  const playAudio = (AudioElId) => {
    if (AudioElId && !isPlaying) {
      const audioEl = document.getElementById(AudioElId);
      audioEl.play();
      setIsPlaying(true);
      setSongElID(AudioElId);
      audioEl.addEventListener("loadedmetadata", () => {
        setSongDuration(audioEl.duration);
      });
    } else {
      shufflePlay();
    }
  };

  const shufflePlay = () => {
    if (!isPlaying) {
      const randomIndex = Math.floor(Math.random() * tracks.length);
      const randomSong = tracks[randomIndex];
      setSongImage(imageData[randomIndex]?.urls?.full);
      setUsername(randomSong.userName);
      setSongName(randomSong.songName);
      playAudio(randomSong.songName);
    } else {
      alert("A song is already playing!");
      return;
    }
  };

  const loopSong = () => {
    const audioEl = document.getElementById(songElID);
    audioEl.loop = true;
    console.log(audioEl);
  };

  // Fetching Data from Firebase
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
        console.log("tracksData", tracksData);
        setLoading(false);
      },
      (error) => {
        setError(error.message);
        setLoading(false);
      }
    );
  }, []);

  // Fetching images from Unsplash
  useEffect(() => {
    const queries = [
      "airplane, rose, skyscapper",
      "nature, landscape, city, music, travel, fashion",
    ];
    const access_key = "p99v6inZ1kCvsBEdSeV783T_oCjfIiI35dTS1ABiSdQ";
    const fetchImages = async (page) => {
      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${queries}&client_id=${access_key}&page=${page}`
      );
      const data = await response.json();
      return data.results;
    };

    const fetchAllImages = async () => {
      const images = [];
      for (let page = 1; page <= 10; page++) {
        const pageImages = await fetchImages(page);
        images.push(...pageImages);
      }
      setImageData(images);
    };

    fetchAllImages();
  }, [isModalOpen]);

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div className="container-right">
        <div className="nav-wrapper">
          <div className="nav-left">
            <Navbar openModal={openModal} />
          </div>
        </div>

        <UploadPage isOpen={isModalOpen} onClose={closeModal} />

        <div>
          <div style={{ padding: "0% 0% 6% 8%", marginTop: "5%" }}>
            <h1
              className="text-3xl"
              style={{ width: `${isMobile ? "100%" : "70%"}` }}
            >
              Explore the Sounds of Our Community: <br /> Listen to User-Created
              Music
            </h1>
            <br />
            <p style={{ width: `${isMobile ? "100%" : "70%"}` }}>
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
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
                songName={songName}
                username={username}
                songImage={songImage}
                playAudio={playAudio}
                songElID={songElID}
                shufflePlay={shufflePlay}
                songDuration={songDuration}
                loopSong={loopSong}
              />
            </div>

            <div className="popular-right">
              <div>
                <h1 className="text-3xl">Top Songs</h1>
                <section className="top-songs-container">
                  {tracks?.map((track, index) => (
                    <div className="container-song" key={index}>
                      <audio src={track.audioUrl} id={track.songName}></audio>
                      <div className="cover-container">
                        <img
                          src={imageData[index]?.urls?.full}
                          alt={track.songName}
                        />
                      </div>
                      <div className="info-container">
                        <span>
                          {isMobile
                            ? `${
                                track.songName.length > 12
                                  ? track.songName.slice(0, 12) + "..."
                                  : track.songName
                              }`
                            : track.songName.length > 38
                            ? track.songName.slice(0, 38) + "..."
                            : track.songName}
                        </span>
                        <div className="contributors">
                          <p key={track.userName} className="track-artist">
                            {track.userName}
                          </p>
                        </div>
                      </div>
                      <div className="icon-controller">
                        <button
                          className=""
                          onClick={() => {
                            playAudio(track.songName);
                            if (!isPlaying) {
                              setSongImage(imageData[index]?.urls?.full);
                              setSongName(track.songName);
                              setUsername(track.userName);
                            }
                          }}
                        >
                          Play
                        </button>
                        <br />
                      </div>
                    </div>
                  ))}
                </section>
              </div>
            </div>
          </div>
          {/* <ChartArtists /> */}
        </div>
      </div>
    </>
  );
};

export default Discover;
