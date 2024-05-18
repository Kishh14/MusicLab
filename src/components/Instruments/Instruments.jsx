import * as Tone from "tone";

import DrumKit from "./DrumKit/DrumKit";
import Piano from "./Piano/Piano";
import InitialPlayer from "./InitialPlayer/InitialPlayer";

import { sounds } from "./Sounds";
import { useEffect, useState } from "react";
import { useSocket } from "../../context/SocketContext";
import { LuPlay } from "react-icons/lu";

// Instrument Sounds
const { synth, boom, hiHat, kick, openHat, snare } = sounds;

const Instruments = () => {
  const [isInstruments, setIsInstruments] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recorder] = useState(new Tone.Recorder());
  const [recordedNotes, setRecordedNotes] = useState([]);
  const [recordedAudioBlob, setRecordedAudioBlob] = useState(null);
  const [isPianoActivated, setIsPianoActivated] = useState(false);
  const [isDrumkitActivated, setIsDrumkitActivated] = useState(false);

  const { socket } = useSocket();

  // Media Methods
  const startRecording = () => {
    if (isPianoActivated || isDrumkitActivated) {
      setIsRecording(true);
      synth.connect(recorder);
      boom.connect(recorder);
      hiHat.connect(recorder);
      kick.connect(recorder);
      openHat.connect(recorder);
      snare.connect(recorder);
      recorder.start();
    } else {
      alert("Activate any of the instrument then start recording!!");
    }
  };

  useEffect(() => {
    if (!socket) return;

    socket.on("music", (instrument, key) => {
      if (instrument === "piano") {
        synth.triggerAttackRelease(key, "8n");
      }
    });

    return () => {
      socket.off("music");
    };
  }, [socket]);

  const stopRecording = async () => {
    setIsRecording(false);
    const recording = await recorder.stop();
    setRecordedAudioBlob(recording);
  };

  const playRecording = async () => {
    if (recordedAudioBlob) {
      const audio = document.createElement("audio");
      const url = URL.createObjectURL(recordedAudioBlob);
      audio.src = url;
      audio.play();
    } else {
      console.warn("No recording available to play");
      alert("No recording available to play");
    }
  };

  const downloadRecording = () => {
    if (recordedAudioBlob) {
      const url = URL.createObjectURL(recordedAudioBlob);
      const anchor = document.createElement("a");
      anchor.download = "MusicLab.mp3";
      anchor.href = url;
      anchor.click();
      // setTimeout(() => {
      //   window.location.reload();
      // }, 1000);
    } else {
      console.warn("No recording available to downalod");
      alert("No recording available to download");
    }
  };

  return (
    <section
      className="w-full h-screen instruments"
      style={{ background: "#111827", overflowY: "scroll" }}
    >
      {/* TODO: Add the functionality to publish recorded audio in the discover page */}
      {/* Header */}
      <section className="border-b border-gray-700 pt-7 pb-5 px-10 flex justify-between">
        <h1 style={{ fontSize: "19px" }}>
          <button className="button" data-text="">
            <span className="actual-text">&nbsp;virtual instruments&nbsp;</span>
            <span aria-hidden="true" className="hover-text">
              virtual instruments
            </span>
          </button>
        </h1>

        {/* Actions */}
        <div className="flex gap-4 items-center">
          {/* Record Button */}
          {isInstruments && (
            <button
              className="flex items-center gap-2 border rounded-md px-2 py-1 border-blue-900 hover:bg-blue-900 transition"
              onClick={() => {
                startRecording();
              }}
              id="record-button"
            >
              <div className="">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 512 512"
                >
                  <path d="M384,138a117.93,117.93,0,0,0-91.84,192H219.84A118,118,0,1,0,128,374H384a118,118,0,0,0,0-236ZM54,256a74,74,0,1,1,74,74A74.09,74.09,0,0,1,54,256Zm330,74a74,74,0,1,1,74-74A74.09,74.09,0,0,1,384,330Z" />
                </svg>
              </div>
              <div className="text-white">
                {recordedAudioBlob ? "Record Again" : "Record"}
              </div>
            </button>
          )}

          {/* Stop Button */}
          {isRecording && (
            <button
              className="flex items-center gap-2 border rounded-md px-2 py-1 border-blue-900 hover:bg-blue-900 transition"
              onClick={() => {
                stopRecording();
              }}
              id="stop-recording-button"
            >
              <div className="">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-stop-circle"
                  viewBox="0 0 16 16"
                >
                  {" "}
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />{" "}
                  <path d="M5 6.5A1.5 1.5 0 0 1 6.5 5h3A1.5 1.5 0 0 1 11 6.5v3A1.5 1.5 0 0 1 9.5 11h-3A1.5 1.5 0 0 1 5 9.5v-3z" />{" "}
                </svg>
              </div>
              <div className="">Stop</div>
            </button>
          )}

          {/* Play Button */}
          {recordedAudioBlob && (
            <button
              className="flex items-center gap-2 border rounded-md px-2 py-1 border-blue-900 hover:bg-blue-900 transition"
              onClick={() => {
                playRecording();
              }}
              id="play-recording-button"
            >
              <div className="">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-play-circle-fill"
                  viewBox="0 0 16 16"
                >
                  {" "}
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z" />{" "}
                </svg>
              </div>
              <div className="">Play</div>
            </button>
          )}

          {/* Download Button */}
          {recordedAudioBlob && (
            <button
              className="flex items-center gap-2 border rounded-md px-2 py-1 border-blue-900 hover:bg-blue-900 transition"
              onClick={downloadRecording}
            >
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  role="img"
                  width="16"
                  height="16"
                  fill="currentColor"
                  preserveAspectRatio="xMidYMid meet"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 15V3m0 12l-4-4m4 4l4-4M2 17l.621 2.485A2 2 0 0 0 4.561 21h14.878a2 2 0 0 0 1.94-1.515L22 17"
                  ></path>
                </svg>
              </div>
              <div className="">Download</div>
            </button>
          )}
        </div>
      </section>

      {/* InitialPlayer */}
      {!isInstruments && (
        <section className="px-2 pt-5 ml-10 mt-14">
          <h1 className="text-2xl font-bold">Know a bit about making music</h1>
          <InitialPlayer />
          <button
            className="mt-10 mr-20 py-3 px-8 bg-primary text-primary-foreground rounded"
            onClick={() => setIsInstruments(true)}
          >
            <LuPlay className="inline-block mr-2" />
            Play Instruments
          </button>
        </section>
      )}

      {/* Instruments */}
      {/* Piano */}
      {isInstruments && (
        <section className="p-6">
          <Piano
            isPianoActivated={isPianoActivated}
            setIsPianoActivated={setIsPianoActivated}
            synth={synth}
            isRecording={isRecording}
            recordedNotes={recordedNotes}
            setRecordedNotes={setRecordedNotes}
          />
        </section>
      )}

      {/* DrumKit */}
      {isInstruments && (
        <section className="p-6">
          <DrumKit
            isRecording={isRecording}
            setRecordedNotes={setRecordedNotes}
            recordedNotes={recordedNotes}
            isDrumkitActivated={isDrumkitActivated}
            setIsDrumkitActivated={setIsDrumkitActivated}
            boom={boom}
            hiHat={hiHat}
            kick={kick}
            openHat={openHat}
            snare={snare}
          />
        </section>
      )}
    </section>
  );
};

export default Instruments;
