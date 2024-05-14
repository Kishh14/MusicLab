import React, { useEffect, useState } from "react";
import { FaRegPlayCircle } from "react-icons/fa";
import { FaRegCirclePause } from "react-icons/fa6";
import { useRef } from "react";

const InitialPlayer = () => {
  const [isDrum1Playing, setIsDrum1Playing] = useState(false);
  const [isDrum2Playing, setIsDrum2Playing] = useState(false);
  const [isDrum3Playing, setIsDrum3Playing] = useState(false);
  const [isDrum4Playing, setIsDrum4Playing] = useState(false);

  const [isBass1Playing, setIsBass1Playing] = useState(false);
  const [isBass2Playing, setIsBass2Playing] = useState(false);
  const [isBass3Playing, setIsBass3Playing] = useState(false);
  const [isBass4Playing, setIsBass4Playing] = useState(false);

  const [isChords1Playing, setIsChords1Playing] = useState(false);
  const [isChords2Playing, setIsChords2Playing] = useState(false);
  const [isChords3Playing, setIsChords3Playing] = useState(false);
  const [isChords4Playing, setIsChords4Playing] = useState(false);

  const [isMelody1Playing, setIsMelody1Playing] = useState(false);
  const [isMelody2Playing, setIsMelody2Playing] = useState(false);
  const [isMelody3Playing, setIsMelody3Playing] = useState(false);
  const [isMelody4Playing, setIsMelody4Playing] = useState(false);
  const columnLabels = ["Drums", "Bass", "Chords", "Melodies"];

  const drum1AudioRef = useRef(null);
  const drum2AudioRef = useRef(null);
  const drum3AudioRef = useRef(null);
  const drum4AudioRef = useRef(null);

  const bass1AudioRef = useRef(null);
  const bass2AudioRef = useRef(null);
  const bass3AudioRef = useRef(null);
  const bass4AudioRef = useRef(null);

  const chords1AudioRef = useRef(null);
  const chords2AudioRef = useRef(null);
  const chords3AudioRef = useRef(null);
  const chords4AudioRef = useRef(null);

  const melody1AudioRef = useRef(null);
  const melody2AudioRef = useRef(null);
  const melody3AudioRef = useRef(null);
  const melody4AudioRef = useRef(null);

  // Drum Methods
  const drum1Toggle = (audioRef) => {
    if (isDrum2Playing || isDrum3Playing || isDrum4Playing) {
      drum2AudioRef.current.pause();
      drum3AudioRef.current.pause();
      drum4AudioRef.current.pause();
      setIsDrum2Playing(false);
      setIsDrum3Playing(false);
      setIsDrum4Playing(false);
    }
    if (!isDrum1Playing) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  };
  const drum2Toggle = (audioRef) => {
    if (isDrum1Playing || isDrum3Playing || isDrum4Playing) {
      drum1AudioRef.current.pause();
      drum3AudioRef.current.pause();
      drum4AudioRef.current.pause();
      setIsDrum1Playing(false);
      setIsDrum3Playing(false);
      setIsDrum4Playing(false);
    }
    if (!isDrum2Playing) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  };
  const drum3Toggle = (audioRef) => {
    if (isDrum1Playing || isDrum2Playing || isDrum4Playing) {
      drum1AudioRef.current.pause();
      drum2AudioRef.current.pause();
      drum4AudioRef.current.pause();
      setIsDrum1Playing(false);
      setIsDrum2Playing(false);
      setIsDrum4Playing(false);
    }
    if (!isDrum3Playing) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  };
  const drum4Toggle = (audioRef) => {
    if (isDrum1Playing || isDrum2Playing || isDrum3Playing) {
      drum1AudioRef.current.pause();
      drum2AudioRef.current.pause();
      drum3AudioRef.current.pause();
      setIsDrum1Playing(false);
      setIsDrum2Playing(false);
      setIsDrum3Playing(false);
    }
    if (!isDrum4Playing) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  };

  // Bass Methods
  const bass1Toggle = (audioRef) => {
    if (isBass2Playing || isBass3Playing || isBass4Playing) {
      bass2AudioRef.current.pause();
      bass3AudioRef.current.pause();
      bass4AudioRef.current.pause();
      setIsBass2Playing(false);
      setIsBass3Playing(false);
      setIsBass4Playing(false);
    }
    if (!isBass1Playing) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  };
  const bass2Toggle = (audioRef) => {
    if (isBass1Playing || isBass3Playing || isBass4Playing) {
      bass1AudioRef.current.pause();
      bass3AudioRef.current.pause();
      bass4AudioRef.current.pause();
      setIsBass1Playing(false);
      setIsBass3Playing(false);
      setIsBass4Playing(false);
    }
    if (!isBass2Playing) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  };
  const bass3Toggle = (audioRef) => {
    if (isBass1Playing || isBass2Playing || isBass4Playing) {
      bass1AudioRef.current.pause();
      bass2AudioRef.current.pause();
      bass4AudioRef.current.pause();
      setIsBass1Playing(false);
      setIsBass2Playing(false);
      setIsBass4Playing(false);
    }
    if (!isBass3Playing) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  };
  const bass4Toggle = (audioRef) => {
    if (isBass1Playing || isBass2Playing || isBass3Playing) {
      bass1AudioRef.current.pause();
      bass2AudioRef.current.pause();
      bass3AudioRef.current.pause();
      setIsBass1Playing(false);
      setIsBass2Playing(false);
      setIsBass3Playing(false);
    }
    if (!isBass4Playing) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  };

  // Chords Methods
  const chords1Toggle = (audioRef) => {
    if (isChords2Playing || isChords3Playing || isChords4Playing) {
      chords2AudioRef.current.pause();
      chords3AudioRef.current.pause();
      chords4AudioRef.current.pause();
      setIsChords2Playing(false);
      setIsChords3Playing(false);
      setIsChords4Playing(false);
    }
    if (!isChords1Playing) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  };
  const chords2Toggle = (audioRef) => {
    if (isChords1Playing || isChords3Playing || isChords4Playing) {
      chords1AudioRef.current.pause();
      chords3AudioRef.current.pause();
      chords4AudioRef.current.pause();
      setIsChords1Playing(false);
      setIsChords3Playing(false);
      setIsChords4Playing(false);
    }
    if (!isChords2Playing) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  };
  const chords3Toggle = (audioRef) => {
    if (isChords1Playing || isChords2Playing || isChords4Playing) {
      chords1AudioRef.current.pause();
      chords2AudioRef.current.pause();
      chords4AudioRef.current.pause();
      setIsChords1Playing(false);
      setIsChords2Playing(false);
      setIsChords4Playing(false);
    }
    if (!isChords3Playing) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  };
  const chords4Toggle = (audioRef) => {
    if (isChords1Playing || isChords2Playing || isChords3Playing) {
      chords1AudioRef.current.pause();
      chords2AudioRef.current.pause();
      chords3AudioRef.current.pause();
      setIsChords1Playing(false);
      setIsChords2Playing(false);
      setIsChords3Playing(false);
    }
    if (!isChords4Playing) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  };

  // Melody Methods
  const melody1Toggle = (audioRef) => {
    if (isMelody2Playing || isMelody3Playing || isMelody4Playing) {
      melody2AudioRef.current.pause();
      melody3AudioRef.current.pause();
      melody4AudioRef.current.pause();
      setIsMelody2Playing(false);
      setIsMelody3Playing(false);
      setIsMelody4Playing(false);
    }
    if (!isMelody1Playing) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  };
  const melody2Toggle = (audioRef) => {
    if (isMelody1Playing || isMelody3Playing || isMelody4Playing) {
      melody1AudioRef.current.pause();
      melody3AudioRef.current.pause();
      melody4AudioRef.current.pause();
      setIsMelody1Playing(false);
      setIsMelody3Playing(false);
      setIsMelody4Playing(false);
    }
    if (!isMelody2Playing) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  };
  const melody3Toggle = (audioRef) => {
    if (isMelody1Playing || isMelody2Playing || isMelody4Playing) {
      melody1AudioRef.current.pause();
      melody2AudioRef.current.pause();
      melody4AudioRef.current.pause();
      setIsMelody1Playing(false);
      setIsMelody2Playing(false);
      setIsMelody4Playing(false);
    }
    if (!isMelody3Playing) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  };
  const melody4Toggle = (audioRef) => {
    if (isMelody1Playing || isMelody2Playing || isMelody3Playing) {
      melody1AudioRef.current.pause();
      melody2AudioRef.current.pause();
      melody3AudioRef.current.pause();
      setIsMelody1Playing(false);
      setIsMelody2Playing(false);
      setIsMelody3Playing(false);
    }
    if (!isMelody4Playing) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  };

  return (
    <div
      className="flex flex-row items-center justify-center"
    >
      {/* Left side for Header */}
      <div className="flex-grow-0 flex-shrink-0 w-2/4">
        <section className="text px-2 py-5 ml-10 text-white">
          <p className="text-1">
            Here's the basics of music making. No prior
            experience or equipment is required; you'll do everything right here
            in your browser. <br /> <br />
            To get started, check out the boxes in the right.
            Each one contains a small piece of music. Click a box to turn it on
            or off. Try to play a different drum, bass, chords, and melodies.
          </p>
          <p className="text-1 mt-6">
            After Playing with these boxes for a while, you will discover
            certain combinations that you like. Many types of music are created
            in exactly this way-by mixing and matching small musical ideas to
            make interesting combinations, and then changing those combinations
            over a time.{" "}
          </p>
        </section>
      </div>

      {/* Player (Grid) */}
      <div className="flex flex-col items-center   w-2/4">
        <div className="grid grid-cols-4 gap-1 p-4">
          {/* Render labels for each column */}
          {columnLabels.map((label, columnIndex) => (
            <div key={columnIndex} className="text-center">
              <p className="text-sm font-bold text-white">{label}</p>
            </div>
          ))}

          {/* Drum-1 */}
          <div
            className={`w-24 h-24 border border-gray-300 cursor-pointer flex items-center justify-center ${
              isDrum1Playing ? "bg-blue-500 border-0" : "bg-gray-200"
            }`}
          >
            {isDrum1Playing ? (
              <FaRegCirclePause
                onClick={() => {
                  drum1Toggle(drum1AudioRef);
                  setIsDrum1Playing(!isDrum1Playing);
                }}
                style={{ color: "black", fontSize: "40px" }}
              />
            ) : (
              <FaRegPlayCircle
                onClick={() => {
                  drum1Toggle(drum1AudioRef);
                  setIsDrum1Playing(!isDrum1Playing);
                }}
                style={{ color: "black", fontSize: "40px" }}
              />
            )}
            <audio ref={drum1AudioRef} src="./Sounds/Drum-01.mp3" loop />
          </div>
          {/* Bass-1 */}
          <div
            className={`w-24 h-24 border border-gray-300 cursor-pointer flex items-center justify-center ${
              isBass1Playing ? "bg-blue-500 border-0" : "bg-gray-200"
            }`}
          >
            {isBass1Playing ? (
              <FaRegCirclePause
                onClick={() => {
                  bass1Toggle(bass1AudioRef);
                  setIsBass1Playing(!isBass1Playing);
                }}
                style={{ color: "black", fontSize: "40px" }}
              />
            ) : (
              <FaRegPlayCircle
                onClick={() => {
                  bass1Toggle(bass1AudioRef);
                  setIsBass1Playing(!isBass1Playing);
                }}
                style={{ color: "black", fontSize: "40px" }}
              />
            )}
            <audio ref={bass1AudioRef} src="./Sounds/Bass-01.mp3" loop />
          </div>
          {/* Chords-1 */}
          <div
            className={`w-24 h-24 border border-gray-300 cursor-pointer flex items-center justify-center ${
              isChords1Playing ? "bg-blue-500 border-0" : "bg-gray-200"
            }`}
          >
            {isChords1Playing ? (
              <FaRegCirclePause
                onClick={() => {
                  chords1Toggle(chords1AudioRef);
                  setIsChords1Playing(!isChords1Playing);
                }}
                style={{ color: "black", fontSize: "40px" }}
              />
            ) : (
              <FaRegPlayCircle
                onClick={() => {
                  chords1Toggle(chords1AudioRef);
                  setIsChords1Playing(!isChords1Playing);
                }}
                style={{ color: "black", fontSize: "40px" }}
              />
            )}
            <audio ref={chords1AudioRef} src="./Sounds/Chords-01.mp3" loop />
          </div>
          {/* Melody-1 */}
          <div
            className={`w-24 h-24 border border-gray-300 cursor-pointer flex items-center justify-center ${
              isMelody1Playing ? "bg-blue-500 border-0" : "bg-gray-200"
            }`}
          >
            {isMelody1Playing ? (
              <FaRegCirclePause
                onClick={() => {
                  melody1Toggle(melody1AudioRef);
                  setIsMelody1Playing(!isMelody1Playing);
                }}
                style={{ color: "black", fontSize: "40px" }}
              />
            ) : (
              <FaRegPlayCircle
                onClick={() => {
                  melody1Toggle(melody1AudioRef);
                  setIsMelody1Playing(!isMelody1Playing);
                }}
                style={{ color: "black", fontSize: "40px" }}
              />
            )}
            <audio ref={melody1AudioRef} src="./Sounds/Melody-01.mp3" loop />
          </div>

          {/* Drum-2 */}
          <div
            className={`w-24 h-24 border border-gray-300 cursor-pointer flex items-center justify-center ${
              isDrum2Playing ? "bg-blue-500 border-0" : "bg-gray-200"
            }`}
          >
            {isDrum2Playing ? (
              <FaRegCirclePause
                onClick={() => {
                  drum2Toggle(drum2AudioRef);
                  setIsDrum2Playing(!isDrum2Playing);
                }}
                style={{ color: "black", fontSize: "40px" }}
              />
            ) : (
              <FaRegPlayCircle
                onClick={() => {
                  drum2Toggle(drum2AudioRef);
                  setIsDrum2Playing(!isDrum2Playing);
                }}
                style={{ color: "black", fontSize: "40px" }}
              />
            )}
            <audio ref={drum2AudioRef} src="./Sounds/Drum-02.mp3" loop />
          </div>
          {/* Bass-2 */}
          <div
            className={`w-24 h-24 border border-gray-300 cursor-pointer flex items-center justify-center ${
              isBass2Playing ? "bg-blue-500 border-0" : "bg-gray-200"
            }`}
          >
            {isBass2Playing ? (
              <FaRegCirclePause
                onClick={() => {
                  bass2Toggle(bass2AudioRef);
                  setIsBass2Playing(!isBass2Playing);
                }}
                style={{ color: "black", fontSize: "40px" }}
              />
            ) : (
              <FaRegPlayCircle
                onClick={() => {
                  bass2Toggle(bass2AudioRef);
                  setIsBass2Playing(!isBass2Playing);
                }}
                style={{ color: "black", fontSize: "40px" }}
              />
            )}
            <audio ref={bass2AudioRef} src="./Sounds/Bass-02.mp3" loop />
          </div>
          {/* Chords-2 */}
          <div
            className={`w-24 h-24 border border-gray-300 cursor-pointer flex items-center justify-center ${
              isChords2Playing ? "bg-blue-500 border-0" : "bg-gray-200"
            }`}
          >
            {isChords2Playing ? (
              <FaRegCirclePause
                onClick={() => {
                  chords2Toggle(chords2AudioRef);
                  setIsChords2Playing(!isChords2Playing);
                }}
                style={{ color: "black", fontSize: "40px" }}
              />
            ) : (
              <FaRegPlayCircle
                onClick={() => {
                  chords2Toggle(chords2AudioRef);
                  setIsChords2Playing(!isChords2Playing);
                }}
                style={{ color: "black", fontSize: "40px" }}
              />
            )}
            <audio ref={chords2AudioRef} src="./Sounds/Chords-02.mp3" loop />
          </div>
          {/* Melody-2 */}
          <div
            className={`w-24 h-24 border border-gray-300 cursor-pointer flex items-center justify-center ${
              isMelody2Playing ? "bg-blue-500 border-0" : "bg-gray-200"
            }`}
          >
            {isMelody2Playing ? (
              <FaRegCirclePause
                onClick={() => {
                  melody2Toggle(melody2AudioRef);
                  setIsMelody2Playing(!isMelody2Playing);
                }}
                style={{ color: "black", fontSize: "40px" }}
              />
            ) : (
              <FaRegPlayCircle
                onClick={() => {
                  melody2Toggle(melody2AudioRef);
                  setIsMelody2Playing(!isMelody2Playing);
                }}
                style={{ color: "black", fontSize: "40px" }}
              />
            )}
            <audio ref={melody2AudioRef} src="./Sounds/Melody-02.mp3" loop />
          </div>

          {/* Drum-3 */}
          <div
            className={`w-24 h-24 border border-gray-300 cursor-pointer flex items-center justify-center ${
              isDrum3Playing ? "bg-blue-500 border-0" : "bg-gray-200"
            }`}
          >
            {isDrum3Playing ? (
              <FaRegCirclePause
                onClick={() => {
                  drum3Toggle(drum3AudioRef);
                  setIsDrum3Playing(!isDrum3Playing);
                }}
                style={{ color: "black", fontSize: "40px" }}
              />
            ) : (
              <FaRegPlayCircle
                onClick={() => {
                  drum3Toggle(drum3AudioRef);
                  setIsDrum3Playing(!isDrum3Playing);
                }}
                style={{ color: "black", fontSize: "40px" }}
              />
            )}
            <audio ref={drum3AudioRef} src="./Sounds/Drum-03.mp3" loop />
          </div>
          {/* Bass-3 */}
          <div
            className={`w-24 h-24 border border-gray-300 cursor-pointer flex items-center justify-center ${
              isBass3Playing ? "bg-blue-500 border-0" : "bg-gray-200"
            }`}
          >
            {isBass3Playing ? (
              <FaRegCirclePause
                onClick={() => {
                  bass3Toggle(bass3AudioRef);
                  setIsBass3Playing(!isBass3Playing);
                }}
                style={{ color: "black", fontSize: "40px" }}
              />
            ) : (
              <FaRegPlayCircle
                onClick={() => {
                  bass3Toggle(bass3AudioRef);
                  setIsBass3Playing(!isBass3Playing);
                }}
                style={{ color: "black", fontSize: "40px" }}
              />
            )}
            <audio ref={bass3AudioRef} src="./Sounds/Bass-03.mp3" loop />
          </div>
          {/* Chords-3 */}
          <div
            className={`w-24 h-24 border border-gray-300 cursor-pointer flex items-center justify-center ${
              isChords3Playing ? "bg-blue-500 border-0" : "bg-gray-200"
            }`}
          >
            {isChords3Playing ? (
              <FaRegCirclePause
                onClick={() => {
                  chords3Toggle(chords3AudioRef);
                  setIsChords3Playing(!isChords3Playing);
                }}
                style={{ color: "black", fontSize: "40px" }}
              />
            ) : (
              <FaRegPlayCircle
                onClick={() => {
                  chords3Toggle(chords3AudioRef);
                  setIsChords3Playing(!isChords3Playing);
                }}
                style={{ color: "black", fontSize: "40px" }}
              />
            )}
            <audio ref={chords3AudioRef} src="./Sounds/Chords-03.mp3" loop />
          </div>
          {/* Melody-3 */}
          <div
            className={`w-24 h-24 border border-gray-300 cursor-pointer flex items-center justify-center ${
              isMelody3Playing ? "bg-blue-500 border-0" : "bg-gray-200"
            }`}
          >
            {isMelody3Playing ? (
              <FaRegCirclePause
                onClick={() => {
                  melody3Toggle(melody3AudioRef);
                  setIsMelody3Playing(!isMelody3Playing);
                }}
                style={{ color: "black", fontSize: "40px" }}
              />
            ) : (
              <FaRegPlayCircle
                onClick={() => {
                  melody3Toggle(melody3AudioRef);
                  setIsMelody3Playing(!isMelody3Playing);
                }}
                style={{ color: "black", fontSize: "40px" }}
              />
            )}
            <audio ref={melody3AudioRef} src="./Sounds/Melody-03.mp3" loop />
          </div>

          {/* Drum-4 */}
          <div
            className={`w-24 h-24 border border-gray-300 cursor-pointer flex items-center justify-center ${
              isDrum4Playing ? "bg-blue-500 border-0" : "bg-gray-200"
            }`}
          >
            {isDrum4Playing ? (
              <FaRegCirclePause
                onClick={() => {
                  drum4Toggle(drum4AudioRef);
                  setIsDrum4Playing(!isDrum4Playing);
                }}
                style={{ color: "black", fontSize: "40px" }}
              />
            ) : (
              <FaRegPlayCircle
                onClick={() => {
                  drum4Toggle(drum4AudioRef);
                  setIsDrum4Playing(!isDrum4Playing);
                }}
                style={{ color: "black", fontSize: "40px" }}
              />
            )}
            <audio ref={drum4AudioRef} src="./Sounds/Drum-04.mp3" loop />
          </div>
          {/* Bass-4 */}
          <div
            className={`w-24 h-24 border border-gray-300 cursor-pointer flex items-center justify-center ${
              isBass4Playing ? "bg-blue-500 border-0" : "bg-gray-200"
            }`}
          >
            {isBass4Playing ? (
              <FaRegCirclePause
                onClick={() => {
                  bass4Toggle(bass4AudioRef);
                  setIsBass4Playing(!isBass4Playing);
                }}
                style={{ color: "black", fontSize: "40px" }}
              />
            ) : (
              <FaRegPlayCircle
                onClick={() => {
                  bass4Toggle(bass4AudioRef);
                  setIsBass4Playing(!isBass4Playing);
                }}
                style={{ color: "black", fontSize: "40px" }}
              />
            )}
            <audio ref={bass4AudioRef} src="./Sounds/Bass-04.mp3" loop />
          </div>
          {/* Chords-4 */}
          <div
            className={`w-24 h-24 border border-gray-300 cursor-pointer flex items-center justify-center ${
              isChords4Playing ? "bg-blue-500 border-0" : "bg-gray-200"
            }`}
          >
            {isChords4Playing ? (
              <FaRegCirclePause
                onClick={() => {
                  chords4Toggle(chords4AudioRef);
                  setIsChords4Playing(!isChords4Playing);
                }}
                style={{ color: "black", fontSize: "40px" }}
              />
            ) : (
              <FaRegPlayCircle
                onClick={() => {
                  chords4Toggle(chords4AudioRef);
                  setIsChords4Playing(!isChords4Playing);
                }}
                style={{ color: "black", fontSize: "40px" }}
              />
            )}
            <audio ref={chords4AudioRef} src="./Sounds/Chords-04.mp3" loop />
          </div>
          {/* Melody-4 */}
          <div
            className={`w-24 h-24 border border-gray-300 cursor-pointer flex items-center justify-center ${
              isMelody4Playing ? "bg-blue-500 border-0" : "bg-gray-200"
            }`}
          >
            {isMelody4Playing ? (
              <FaRegCirclePause
                onClick={() => {
                  melody4Toggle(melody4AudioRef);
                  setIsMelody4Playing(!isMelody4Playing);
                }}
                style={{ color: "black", fontSize: "40px" }}
              />
            ) : (
              <FaRegPlayCircle
                onClick={() => {
                  melody4Toggle(melody4AudioRef);
                  setIsMelody4Playing(!isMelody4Playing);
                }}
                style={{ color: "black", fontSize: "40px" }}
              />
            )}
            <audio ref={melody4AudioRef} src="./Sounds/Melody-04.mp3" loop />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InitialPlayer;
