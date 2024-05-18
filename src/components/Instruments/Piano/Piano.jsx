import React, { useEffect, useState } from "react";
import * as Tone from "tone";
import {
  howToPlayPianoTour,
  playHBDSongInPiano,
} from "../../Tours";
import { useSocket } from "../../../context/SocketContext";

import "./Piano.css";
import { TfiHelpAlt } from "react-icons/tfi";

const Piano = ({
  isPianoActivated,
  setIsPianoActivated,
  synth,
  isRecording,
  recordedNotes,
  setRecordedNotes,
}) => {
  const { socket } = useSocket();
  const [showPianoHelp, setShowPianoHelp] = useState(false);

  // Play Piano Note
  const playNote = (note) => {
    if (isPianoActivated) {
      synth.triggerAttackRelease(note, "8n");
      socket.emit("music", "piano", note);
      if (isRecording) {
        setRecordedNotes([...recordedNotes, { note, startTime: Date.now() }]);
      }
    }
  };

  // C4
  const C4Key = document.querySelector(".C4-key");
  const playC4 = () => {
    playNote("C4");
    if (isPianoActivated) {
      C4Key.classList.add("active");

      if (isRecording) {
        setRecordedNotes([
          ...recordedNotes,
          { note: "C4", startTime: Date.now() },
        ]);
      }
    }
    setTimeout(() => C4Key.classList.remove("active"), 200);
  };

  // Db4
  const Db4Key = document.querySelector(".Db4-key");
  const playDb4 = () => {
    playNote("Db4");
    if (isPianoActivated) {
      Db4Key.classList.add("active");

      if (isRecording) {
        setRecordedNotes([
          ...recordedNotes,
          { note: "Db4", startTime: Date.now() },
        ]);
      }
    }
    setTimeout(() => Db4Key.classList.remove("active"), 200);
  };

  // D4
  const D4Key = document.querySelector(".D4-key");
  const playD4 = () => {
    playNote("D4");
    if (isPianoActivated) {
      D4Key.classList.add("active");

      if (isRecording) {
        setRecordedNotes([
          ...recordedNotes,
          { note: "D4", startTime: Date.now() },
        ]);
      }
    }
    setTimeout(() => D4Key.classList.remove("active"), 200);
  };

  // Eb4
  const Eb4Key = document.querySelector(".Eb4-key");
  const playEb4 = () => {
    playNote("Eb4");
    if (isPianoActivated) {
      Eb4Key.classList.add("active");

      if (isRecording) {
        setRecordedNotes([
          ...recordedNotes,
          { note: "Eb4", startTime: Date.now() },
        ]);
      }
    }
    setTimeout(() => Eb4Key.classList.remove("active"), 200);
  };

  // E4
  const E4Key = document.querySelector(".E4-key");
  const playE4 = () => {
    playNote("E4");
    if (isPianoActivated) {
      E4Key.classList.add("active");

      if (isRecording) {
        setRecordedNotes([
          ...recordedNotes,
          { note: "E4", startTime: Date.now() },
        ]);
      }
    }
    setTimeout(() => E4Key.classList.remove("active"), 200);
  };

  // F4
  const F4Key = document.querySelector(".F4-key");
  const playF4 = () => {
    playNote("F4");
    if (isPianoActivated) {
      F4Key.classList.add("active");

      if (isRecording) {
        setRecordedNotes([
          ...recordedNotes,
          { note: "F4", startTime: Date.now() },
        ]);
      }
    }
    setTimeout(() => F4Key.classList.remove("active"), 200);
  };

  // Gb4
  const Gb4Key = document.querySelector(".Gb4-key");
  const playGb4 = () => {
    playNote("Gb4");
    if (isPianoActivated) {
      Gb4Key.classList.add("active");

      if (isRecording) {
        setRecordedNotes([
          ...recordedNotes,
          { note: "Gb4", startTime: Date.now() },
        ]);
      }
    }
    setTimeout(() => Gb4Key.classList.remove("active"), 200);
  };

  // G4
  const G4Key = document.querySelector(".G4-key");
  const playG4 = () => {
    playNote("G4");
    if (isPianoActivated) {
      G4Key.classList.add("active");

      if (isRecording) {
        setRecordedNotes([
          ...recordedNotes,
          { note: "G4", startTime: Date.now() },
        ]);
      }
    }
    setTimeout(() => G4Key.classList.remove("active"), 200);
  };

  // Ab4
  const Ab4Key = document.querySelector(".Ab4-key");
  const playAb4 = () => {
    playNote("Ab4");
    if (isPianoActivated) {
      Ab4Key.classList.add("active");

      if (isRecording) {
        setRecordedNotes([
          ...recordedNotes,
          { note: "Ab4", startTime: Date.now() },
        ]);
      }
    }
    setTimeout(() => Ab4Key.classList.remove("active"), 200);
  };

  // A4
  const A4Key = document.querySelector(".A4-key");
  const playA4 = () => {
    playNote("A4");
    if (isPianoActivated) {
      A4Key.classList.add("active");

      if (isRecording) {
        setRecordedNotes([
          ...recordedNotes,
          { note: "A4", startTime: Date.now() },
        ]);
      }
    }
    setTimeout(() => A4Key.classList.remove("active"), 200);
  };

  // Bb4
  const Bb4Key = document.querySelector(".Bb4-key");
  const playBb4 = () => {
    playNote("Bb4");
    if (isPianoActivated) {
      Bb4Key.classList.add("active");

      if (isRecording) {
        setRecordedNotes([
          ...recordedNotes,
          { note: "Bb4", startTime: Date.now() },
        ]);
      }
    }
    setTimeout(() => Bb4Key.classList.remove("active"), 200);
  };

  // B4
  const B4Key = document.querySelector(".B4-key");
  const playB4 = () => {
    playNote("B4");
    if (isPianoActivated) {
      B4Key.classList.add("active");

      if (isRecording) {
        setRecordedNotes([
          ...recordedNotes,
          { note: "B4", startTime: Date.now() },
        ]);
      }
    }
    setTimeout(() => B4Key.classList.remove("active"), 200);
  };

  // C5
  const C5Key = document.querySelector(".C5-key");
  const playC5 = () => {
    playNote("C5");
    if (isPianoActivated) {
      C5Key.classList.add("active");

      if (isRecording) {
        setRecordedNotes([
          ...recordedNotes,
          { note: "C5", startTime: Date.now() },
        ]);
      }
    }
    setTimeout(() => C5Key.classList.remove("active"), 200);
  };

  // Db5
  const Db5Key = document.querySelector(".Db5-key");
  const playDb5 = () => {
    playNote("Db5");
    if (isPianoActivated) {
      Db5Key.classList.add("active");

      if (isRecording) {
        setRecordedNotes([
          ...recordedNotes,
          { note: "Db5", startTime: Date.now() },
        ]);
      }
    }
    setTimeout(() => Db5Key.classList.remove("active"), 200);
  };

  // D5
  const D5Key = document.querySelector(".D5-key");
  const playD5 = () => {
    playNote("D5");
    if (isPianoActivated) {
      D5Key.classList.add("active");

      if (isRecording) {
        setRecordedNotes([
          ...recordedNotes,
          { note: "D5", startTime: Date.now() },
        ]);
      }
    }
    setTimeout(() => D5Key.classList.remove("active"), 200);
  };

  // Eb5
  const Eb5Key = document.querySelector(".Eb5-key");
  const playEb5 = () => {
    playNote("Eb5");
    if (isPianoActivated) {
      Eb5Key.classList.add("active");

      if (isRecording) {
        setRecordedNotes([
          ...recordedNotes,
          { note: "Eb5", startTime: Date.now() },
        ]);
      }
    }
    setTimeout(() => Eb5Key.classList.remove("active"), 200);
  };

  // E5
  const E5Key = document.querySelector(".E5-key");
  const playE5 = () => {
    playNote("E5");
    if (isPianoActivated) {
      E5Key.classList.add("active");

      if (isRecording) {
        setRecordedNotes([
          ...recordedNotes,
          { note: "E5", startTime: Date.now() },
        ]);
      }
    }
    setTimeout(() => E5Key.classList.remove("active"), 200);
  };

  // Play Piano using Keyboard
  useEffect(() => {
    const handleKeyPress = (event) => {
      // Press Q
      if (event.key.toUpperCase() === "Q") {
        playC4();
        playHBDSongInPiano().moveNext();
      }

      // Press 2
      if (event.key === "2") {
        playDb4();
      }

      // Press W
      if (event.key.toUpperCase() === "W") {
        playD4();
        playHBDSongInPiano().moveNext();
      }

      // Press 3
      if (event.key === "3") {
        playEb4();
      }

      // Press E
      if (event.key.toUpperCase() === "E") {
        playE4();
        playHBDSongInPiano().moveNext();
      }

      // Press R
      if (event.key.toUpperCase() === "R") {
        playF4();
        playHBDSongInPiano().moveNext();
      }

      // Press 5
      if (event.key === "5") {
        playGb4();
      }

      // Press T
      if (event.key.toUpperCase() === "T") {
        playG4();
        playHBDSongInPiano().moveNext();
      }

      // Press 6
      if (event.key === "6") {
        playAb4();
      }

      // Press Y
      if (event.key.toUpperCase() === "Y") {
        playA4();
        playHBDSongInPiano().moveNext();
      }

      // Press 7
      if (event.key === "7") {
        playBb4();
        playHBDSongInPiano().moveNext();
      }

      // Press U
      if (event.key.toUpperCase() === "U") {
        playB4();
      }

      // Press I
      if (event.key.toUpperCase() === "I") {
        playC5();
        playHBDSongInPiano().moveNext();
      }

      // Press 9
      if (event.key === "9") {
        playDb5();
      }

      // Press O
      if (event.key.toUpperCase() === "O") {
        playD5();
      }

      // Press 0
      if (event.key === "0") {
        playEb5();
      }

      // Press P
      if (event.key.toUpperCase() === "P") {
        playE5();
      }
    };
    if (isPianoActivated) {
      document.addEventListener("keydown", handleKeyPress);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [isPianoActivated]);

  return (
    <>
      <section className="piano-container">
        <div className="flex items-center justify-between">
          <div className="voltage-button">
            <button
              onClick={() => {
                setIsPianoActivated(!isPianoActivated);
                howToPlayPianoTour().moveNext();
              }}
              id="activate-button"
            >
              {isPianoActivated ? "Deactivate" : "Activate"}
            </button>
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              viewBox="0 0 234.6 61.3"
              preserveAspectRatio="none"
              xmlSpace="preserve"
            >
              <filter id="glow">
                <feGaussianBlur
                  className="blur"
                  result="coloredBlur"
                  stdDeviation="2"
                ></feGaussianBlur>
                <feTurbulence
                  type="fractalNoise"
                  baseFrequency="0.075"
                  result="turbulence"
                ></feTurbulence>
                <feDisplacementMap
                  in="SourceGraphic"
                  in2="turbulence"
                  scale="30"
                  xChannelSelector="R"
                  yChannelSelector="G"
                  result="displace"
                ></feDisplacementMap>
                <feMerge>
                  <feMergeNode in="coloredBlur"></feMergeNode>
                  <feMergeNode in="coloredBlur"></feMergeNode>
                  <feMergeNode in="coloredBlur"></feMergeNode>
                  <feMergeNode in="displace"></feMergeNode>
                  <feMergeNode in="SourceGraphic"></feMergeNode>
                </feMerge>
              </filter>
              <path
                className="voltage line-1"
                d="m216.3 51.2c-3.7 0-3.7-1.1-7.3-1.1-3.7 0-3.7 6.8-7.3 6.8-3.7 0-3.7-4.6-7.3-4.6-3.7 0-3.7 3.6-7.3 3.6-3.7 0-3.7-0.9-7.3-0.9-3.7 0-3.7-2.7-7.3-2.7-3.7 0-3.7 7.8-7.3 7.8-3.7 0-3.7-4.9-7.3-4.9-3.7 0-3.7-7.8-7.3-7.8-3.7 0-3.7-1.1-7.3-1.1-3.7 0-3.7 3.1-7.3 3.1-3.7 0-3.7 10.9-7.3 10.9-3.7 0-3.7-12.5-7.3-12.5-3.7 0-3.7 4.6-7.3 4.6-3.7 0-3.7 4.5-7.3 4.5-3.7 0-3.7 3.6-7.3 3.6-3.7 0-3.7-10-7.3-10-3.7 0-3.7-0.4-7.3-0.4-3.7 0-3.7 2.3-7.3 2.3-3.7 0-3.7 7.1-7.3 7.1-3.7 0-3.7-11.2-7.3-11.2-3.7 0-3.7 3.5-7.3 3.5-3.7 0-3.7 3.6-7.3 3.6-3.7 0-3.7-2.9-7.3-2.9-3.7 0-3.7 8.4-7.3 8.4-3.7 0-3.7-14.6-7.3-14.6-3.7 0-3.7 5.8-7.3 5.8-2.2 0-3.8-0.4-5.5-1.5-1.8-1.1-1.8-2.9-2.9-4.8-1-1.8 1.9-2.7 1.9-4.8 0-3.4-2.1-3.4-2.1-6.8s-9.9-3.4-9.9-6.8 8-3.4 8-6.8c0-2.2 2.1-2.4 3.1-4.2 1.1-1.8 0.2-3.9 2-5 1.8-1 3.1-7.9 5.3-7.9 3.7 0 3.7 0.9 7.3 0.9 3.7 0 3.7 6.7 7.3 6.7 3.7 0 3.7-1.8 7.3-1.8 3.7 0 3.7-0.6 7.3-0.6 3.7 0 3.7-7.8 7.3-7.8h7.3c3.7 0 3.7 4.7 7.3 4.7 3.7 0 3.7-1.1 7.3-1.1 3.7 0 3.7 11.6 7.3 11.6 3.7 0 3.7-2.6 7.3-2.6 3.7 0 3.7-12.9 7.3-12.9 3.7 0 3.7 10.9 7.3 10.9 3.7 0 3.7 1.3 7.3 1.3 3.7 0 3.7-8.7 7.3-8.7 3.7 0 3.7 11.5 7.3 11.5 3.7 0 3.7-1.4 7.3-1.4 3.7 0 3.7-2.6 7.3-2.6 3.7 0 3.7-5.8 7.3-5.8 3.7 0 3.7-1.3 7.3-1.3 3.7 0 3.7 6.6 7.3 6.6s3.7-9.3 7.3-9.3c3.7 0 3.7 0.2 7.3 0.2 3.7 0 3.7 8.5 7.3 8.5 3.7 0 3.7 0.2 7.3 0.2 3.7 0 3.7-1.5 7.3-1.5 3.7 0 3.7 1.6 7.3 1.6s3.7-5.1 7.3-5.1c2.2 0 0.6 9.6 2.4 10.7s4.1-2 5.1-0.1c1 1.8 10.3 2.2 10.3 4.3 0 3.4-10.7 3.4-10.7 6.8s1.2 3.4 1.2 6.8 1.9 3.4 1.9 6.8c0 2.2 7.2 7.7 6.2 9.5-1.1 1.8-12.3-6.5-14.1-5.5-1.7 0.9-0.1 6.2-2.2 6.2z"
                fill="transparent"
                stroke="#fff"
              ></path>
              <path
                className="voltage line-2"
                d="m216.3 52.1c-3 0-3-0.5-6-0.5s-3 3-6 3-3-2-6-2-3 1.6-6 1.6-3-0.4-6-0.4-3-1.2-6-1.2-3 3.4-6 3.4-3-2.2-6-2.2-3-3.4-6-3.4-3-0.5-6-0.5-3 1.4-6 1.4-3 4.8-6 4.8-3-5.5-6-5.5-3 2-6 2-3 2-6 2-3 1.6-6 1.6-3-4.4-6-4.4-3-0.2-6-0.2-3 1-6 1-3 3.1-6 3.1-3-4.9-6-4.9-3 1.5-6 1.5-3 1.6-6 1.6-3-1.3-6-1.3-3 3.7-6 3.7-3-6.4-6-6.4-3 2.5-6 2.5h-6c-3 0-3-0.6-6-0.6s-3-1.4-6-1.4-3 0.9-6 0.9-3 4.3-6 4.3-3-3.5-6-3.5c-2.2 0-3.4-1.3-5.2-2.3-1.8-1.1-3.6-1.5-4.6-3.3s-4.4-3.5-4.4-5.7c0-3.4 0.4-3.4 0.4-6.8s2.9-3.4 2.9-6.8-0.8-3.4-0.8-6.8c0-2.2 0.3-4.2 1.3-5.9 1.1-1.8 0.8-6.2 2.6-7.3 1.8-1 5.5-2 7.7-2 3 0 3 2 6 2s3-0.5 6-0.5 3 5.1 6 5.1 3-1.1 6-1.1 3-5.6 6-5.6 3 4.8 6 4.8 3 0.6 6 0.6 3-3.8 6-3.8 3 5.1 6 5.1 3-0.6 6-0.6 3-1.2 6-1.2 3-2.6 6-2.6 3-0.6 6-0.6 3 2.9 6 2.9 3-4.1 6-4.1 3 0.1 6 0.1 3 3.7 6 3.7 3 0.1 6 0.1 3-0.6 6-0.6 3 0.7 6 0.7 3-2.2 6-2.2 3 4.4 6 4.4 3-1.7 6-1.7 3-4 6-4 3 4.7 6 4.7 3-0.5 6-0.5 3-0.8 6-0.8 3-3.8 6-3.8 3 6.3 6 6.3 3-4.8 6-4.8 3 1.9 6 1.9 3-1.9 6-1.9 3 1.3 6 1.3c2.2 0 5-0.5 6.7 0.5 1.8 1.1 2.4 4 3.5 5.8 1 1.8 0.3 3.7 0.3 5.9 0 3.4 3.4 3.4 3.4 6.8s-3.3 3.4-3.3 6.8 4 3.4 4 6.8c0 2.2-6 2.7-7 4.4-1.1 1.8 1.1 6.7-0.7 7.7-1.6 0.8-4.7-1.1-6.8-1.1z"
                fill="transparent"
                stroke="#fff"
              ></path>
            </svg>
            <div className="dots">
              <div className="dot dot-1"></div>
              <div className="dot dot-2"></div>
              <div className="dot dot-3"></div>
              <div className="dot dot-4"></div>
              <div className="dot dot-5"></div>
            </div>
          </div>

          <button style={{ margin: "0px 0 15px 0" }}>
            <div className="relative inline-block text-left">
              <TfiHelpAlt
                style={{ fontSize: "21px" }}
                onClick={() => {
                  setShowPianoHelp(!showPianoHelp);
                }}
              />
              {showPianoHelp && (
                <div
                  className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="menu-button"
                  tabIndex="-1"
                >
                  <div className="py-1" role="none">
                    <a
                      onClick={() => {
                        howToPlayPianoTour().drive();
                        setShowPianoHelp(!showPianoHelp);
                      }}
                      className="text-gray-700 block px-4 py-2 text-sm"
                      role="menuitem"
                      tabIndex="-1"
                      id="menu-item-1"
                    >
                      How to play piano?
                    </a>
                    <a
                      onClick={() => {
                        playHBDSongInPiano().drive();
                        setShowPianoHelp(!showPianoHelp);
                      }}
                      className="text-gray-700 block px-4 py-2 text-sm"
                      role="menuitem"
                      tabIndex="-1"
                      id="menu-item-0"
                    >
                      Learn to play Happy Birthday Song
                    </a>
                  </div>
                </div>
              )}
            </div>
          </button>
        </div>

        <div className="flex justify-center">
          <div className="piano" id="piano">
            <button
              className="white-key C4-key"
              onClick={() => {
                playC4();
                playHBDSongInPiano().moveNext();
              }}
              id="piano-q-note"
            >
              Q
            </button>
            <button
              className="black-key Db4-key"
              id="piano-2-note"
              onClick={() => {
                playDb4();
                howToPlayPianoTour().moveNext();
              }}
            >
              2
            </button>
            <button
              className="white-key D4-key"
              onClick={() => {
                playD4();
                playHBDSongInPiano().moveNext();
              }}
              id="piano-w-note"
            >
              W
            </button>
            <button className="black-key Eb4-key" onClick={playEb4}>
              3
            </button>
            <button
              className="white-key E4-key"
              onClick={() => {
                playE4();
                playHBDSongInPiano().moveNext();
              }}
              id="piano-e-note"
            >
              E
            </button>
            <button
              className="white-key F4-key"
              onClick={() => {
                playF4();
                playHBDSongInPiano().moveNext();
              }}
              id="piano-r-note"
            >
              R
            </button>
            <button
              className="black-key Gb4-key"
              onClick={() => {
                playGb4();
              }}
              id="piano-5-note"
            >
              5
            </button>
            <button
              className="white-key G4-key"
              onClick={() => {
                playG4();
                playHBDSongInPiano().moveNext();
              }}
              id="piano-t-note"
            >
              T
            </button>
            <button
              className="black-key Ab4-key"
              onClick={() => {
                playAb4();
              }}
              id="piano-6-note"
            >
              6
            </button>
            <button className="white-key A4-key" onClick={playA4}>
              Y
            </button>
            <button
              className="black-key Bb4-key"
              onClick={() => {
                playBb4();
                playHBDSongInPiano().moveNext();
              }}
              id="piano-7-note"
            >
              7
            </button>
            <button className="white-key B4-key" onClick={playB4}>
              U
            </button>
            <button
              className="white-key C5-key"
              onClick={() => {
                playC5();
                playHBDSongInPiano().moveNext();
              }}
              id="piano-i-note"
            >
              I
            </button>
            <button className="black-key Db5-key" onClick={playDb5}>
              9
            </button>
            <button className="white-key D5-key" onClick={playD5}>
              O
            </button>
            <button className="black-key Eb5-key" onClick={playEb5}>
              0
            </button>
            <button className="white-key E5-key" onClick={playE5}>
              P
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Piano;
