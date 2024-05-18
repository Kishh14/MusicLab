import { useEffect } from "react";
import * as Tone from "tone";

// Images
import rideCymbalLeft from "../../../assets/Instruments/DrumKit/ride-cymbal-left.png";
import rideCymbalRight from "../../../assets/Instruments/DrumKit/ride-cymbal-right.png";
import tomDrum from "../../../assets/Instruments/DrumKit/tom-drum.png";
import highHat from "../../../assets/Instruments/DrumKit/highhats.png";
import highHatRight from "../../../assets/Instruments/DrumKit/highhats-right.png";
import bassDrum from "../../../assets/Instruments/DrumKit/bass-drum.png";
import snareDrum from "../../../assets/Instruments/DrumKit/snare-drum.png";

import { useSocket } from "../../../context/SocketContext";

// Icon
import { TfiHelpAlt } from "react-icons/tfi";
import { howToPlayDrumKit } from "../../Tours";

function DrumKit({
  isDrumkitActivated,
  setIsDrumkitActivated,
  boom,
  hiHat,
  kick,
  openHat,
  snare,
  isRecording,
  setRecordedNotes,
  recordedNotes,
}) {
  const { socket } = useSocket();

  // Play DrumKit
  function play(sound) {
    if (isDrumkitActivated) {
      if (sound === "rideCymbalLeft") {
        Tone.start().then(() => {
          openHat.triggerAttackRelease("D4", "8n");
          socket.emit("music", "drum", "rideCymbalLeft");
          howToPlayDrumKit().moveNext();
        });
        if (isRecording) {
          setRecordedNotes([
            ...recordedNotes,
            { note: "openhat", startTime: Date.now() },
          ]);
        }
      }
      if (sound === "tomDrumLeft") {
        Tone.start().then(() => {
          kick.triggerAttackRelease("C2", "8n");
          socket.emit("music", "drum", "tomDrumLeft");
          howToPlayDrumKit().moveNext();
        });
        if (isRecording) {
          setRecordedNotes([
            ...recordedNotes,
            { note: "kick", startTime: Date.now() },
          ]);
        }
      }
      if (sound === "tomDrumRight") {
        Tone.start().then(() => {
          kick.triggerAttackRelease("C2", "8n");
          socket.emit("music", "drum", "tomDrumRight");
          howToPlayDrumKit().moveNext();
        });
        if (isRecording) {
          setRecordedNotes([
            ...recordedNotes,
            { note: "kick", startTime: Date.now() },
          ]);
        }
      }
      if (sound === "rideCymbalRight") {
        Tone.start().then(() => {
          openHat.triggerAttackRelease("A4", "8n");
          socket.emit("music", "drum", "rideCymbalRight");
          howToPlayDrumKit().moveNext();
        });
        if (isRecording) {
          setRecordedNotes([
            ...recordedNotes,
            { note: "openhat", startTime: Date.now() },
          ]);
        }
      }
      if (sound === "highHat") {
        Tone.start().then(() => {
          hiHat.triggerAttackRelease("C4", "8n");
          socket.emit("music", "drum", "highHat");
          howToPlayDrumKit().moveNext();
        });
        if (isRecording) {
          setRecordedNotes([
            ...recordedNotes,
            { note: "hihat", startTime: Date.now() },
          ]);
        }
      }
      if (sound === "bassDrum") {
        Tone.start().then(() => {
          boom.triggerAttackRelease("C2", "8n");
          socket.emit("music", "drum", "bassDrum");
          howToPlayDrumKit().moveNext();
        });
        if (isRecording) {
          setRecordedNotes([
            ...recordedNotes,
            { note: "boom", startTime: Date.now() },
          ]);
        }
      }
      if (sound === "highHatRight") {
        Tone.start().then(() => {
          hiHat.triggerAttackRelease("D4", "8n");
          socket.emit("music", "drum", "highHatRight");
          howToPlayDrumKit().moveNext();
        });
        if (isRecording) {
          setRecordedNotes([
            ...recordedNotes,
            { note: "hihat", startTime: Date.now() },
          ]);
        }
      }
      if (sound === "snareDrumLeft") {
        Tone.start().then(() => {
          snare.triggerAttackRelease("C2", "8n");
          socket.emit("music", "drum", "snareDrumLeft");
          howToPlayDrumKit().moveNext();
        });
        if (isRecording) {
          setRecordedNotes([
            ...recordedNotes,
            { note: "snare", startTime: Date.now() },
          ]);
        }
      }
      if (sound === "snareDrumRight") {
        Tone.start().then(() => {
          snare.triggerAttackRelease("C2", "8n");
          socket.emit("music", "drum", "snareDrumRight");
          howToPlayDrumKit().moveNext();
        });
        if (isRecording) {
          setRecordedNotes([
            ...recordedNotes,
            { note: "snare", startTime: Date.now() },
          ]);
        }
      }
    }
  }

  useEffect(() => {
    if (!socket) return;

    socket.on("music", (instrument, sound) => {
      if (instrument === "drum") {
        play(sound);
      }
    });
  }, [socket]);

  // Play DrumKit by Keyboard
  useEffect(() => {
    const handleKeyPress = (event) => {
      // Press B
      if (event.key.toUpperCase() === "B") {
        play("bassDrum");
      }

      // Press M
      if (event.key.toUpperCase() === "M") {
        play("bassDrum");
      }

      // Press Z
      if (event.key.toUpperCase() === "Z") {
        play("highHat");
      }

      // Press K
      if (event.key.toUpperCase() === "K") {
        play("highHat");
      }

      // Press L
      if (event.key.toUpperCase() === "L") {
        play("highHatRight");
      }

      // Press A
      if (event.key.toUpperCase() === "A") {
        play("rideCymbalLeft");
      }

      // Press X
      if (event.key.toUpperCase() === "X") {
        play("snareDrumLeft");
      }

      // Press N
      if (event.key.toUpperCase() === "N") {
        play("snareDrumRight");
      }

      // Press S
      if (event.key.toUpperCase() === "S") {
        play("tomDrumLeft");
      }
    };

    if (isDrumkitActivated) {
      document.addEventListener("keydown", handleKeyPress);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [isDrumkitActivated]);

  return (
    <div
      className="py-5 bg-black rounded-lg"
      style={{ position: "relative", height: "550px" }}
    >
      <div className="flex justify-between">
        <div className="voltage-button" style={{ margin: "10px 0 0 25px" }}>
          <button onClick={() => setIsDrumkitActivated(!isDrumkitActivated)} id="drum-activate-button">
            {isDrumkitActivated ? "Deactivate" : "Activate"}
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

        <button
          style={{ margin: "0px 25px 15px 0px" }}
          onClick={() => howToPlayDrumKit().drive()}
        >
          <TfiHelpAlt style={{ fontSize: "21px" }} />
        </button>
      </div>

      {/* DrumKit */}
      <div className="flex justify-center">
        <img
          onClick={() => play("rideCymbalLeft")}
          src={rideCymbalLeft}
          alt=""
          style={{ width: "170px" }}
          id="rideCymbalLeft"
        />
        <img
          onClick={() => play("tomDrumLeft")}
          src={tomDrum}
          alt=""
          style={{ width: "135px", objectFit: "contain" }}
          id="tomDrumLeft"
        />
        <img
          onClick={() => play("tomDrumRight")}
          src={tomDrum}
          alt=""
          style={{ width: "135px", objectFit: "contain" }}
          id="tomDrumRight"
        />
        <img
          onClick={() => play("rideCymbalRight")}
          src={rideCymbalRight}
          alt=""
          style={{ width: "170px" }}
          id="rideCymbalRight"
        />
      </div>
      <div className="flex justify-center">
        <img
          onClick={() => play("highHat")}
          src={highHat}
          className=""
          alt=""
          id="highHat"
          style={{
            width: "150px",
            position: "absolute",
            top: "30%",
            left: "24%",
          }}
        />
        <img
          onClick={() => play("bassDrum")}
          src={bassDrum}
          className="bassDrum"
          alt=""
          style={{ width: "220px", position: "absolute", top: "35%" }}
          id="bassDrum"
        />
        <img
          onClick={() => play("highHatRight")}
          src={highHatRight}
          className=""
          alt=""
          id="highHatRight"
          style={{
            width: "150px",
            position: "absolute",
            top: "30%",
            left: "60%",
          }}
        />
      </div>
      <div className="flex justify-center">
        <img
          onClick={() => play("snareDrumLeft")}
          src={snareDrum}
          className=""
          id="snareDrumLeft"
          alt=""
          style={{
            width: "144px",
            position: "absolute",
            top: "55%",
            left: "30%",
          }}
        />
        <img
          onClick={() => play("snareDrumRight")}
          src={snareDrum}
          className=""
          id="snareDrumRight"
          alt=""
          style={{
            width: "144px",
            position: "absolute",
            top: "55%",
            left: "56%",
          }}
        />
      </div>
    </div>
  );
}

export default DrumKit;
