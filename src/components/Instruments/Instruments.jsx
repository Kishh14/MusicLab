import * as Tone from "tone";
import DrumKit from "./DrumKit/DrumKit";
import Piano from "./Piano/Piano";
import { sounds } from "./Sounds";
import "../../index.css";
import { useEffect, useState } from "react";
import { useSocket } from "../../context/SocketContext";
import { InviteLinkModel } from "../InviteLinkModel";
import InitialPlayer from "./InitialPlayer/InitialPlayer";
import { InitialTour, howToRecord } from "../Tours";

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
      alert("Activate and play any of the instrument then start recording!!");
    }
  };

  useEffect(() => {
    if (!socket) return;

    socket.on("music", (instrument, key) => {
      if (instrument === "piano") {
        synth.triggerAttackRelease(key, "8n");
      } else if (instrument === "drumkit") {
        if (key === "boom") {
          boom.triggerAttackRelease("C2", "8n");
        } else if (key === "hiHat") {
          hiHat.triggerAttackRelease("32n");
        } else if (key === "kick") {
          kick.triggerAttackRelease("C2", "8n");
        } else if (key === "openHat") {
          openHat.triggerAttackRelease("C2", "8n");
        } else if (key === "snare") {
          snare.triggerAttackRelease("C2", "8n");
        }
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
      setTimeout(() => {
        window.location.reload();
      }, 1000);
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
        {/* FIXME: Fix the css of these buttons */}
        <div className="flex gap-4 items-center">
          {/* Invite Link Button */}
          <InviteLinkModel />

          {/* Record Button */}
          {isInstruments && (
            <button
              className="Btn"
              onClick={() => {
                startRecording();
                howToRecord().moveNext();
              }}
              id="record-button"
            >
              <div className="sign">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="512"
                  height="512"
                  viewBox="0 0 512 512"
                >
                  <title>ionicons-v5-p</title>
                  <path d="M384,138a117.93,117.93,0,0,0-91.84,192H219.84A118,118,0,1,0,128,374H384a118,118,0,0,0,0-236ZM54,256a74,74,0,1,1,74,74A74.09,74.09,0,0,1,54,256Zm330,74a74,74,0,1,1,74-74A74.09,74.09,0,0,1,384,330Z" />
                </svg>
              </div>
              <div className="rsp-text text-white">Record</div>
            </button>
          )}

          {/* Stop Button */}
          {isRecording && (
            <button
              className="Btn"
              onClick={() => {
                stopRecording();
                howToRecord().moveNext();
              }}
              id="stop-recording-button"
            >
              <div className="sign">
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
              <div className="rsp-text">Stop</div>
            </button>
          )}

          {/* Play Button */}
          {recordedAudioBlob && (
            <button
              className="Btn"
              onClick={() => {
                playRecording();
                howToRecord().moveNext();
              }}
              id="play-recording-button"
            >
              <div className="sign">
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
              <div className="rsp-text">Play</div>
            </button>
          )}

          {/* Download Button */}
          {recordedAudioBlob && (
            <div className="download-button" onClick={downloadRecording}>
              <div className="button-wrapper">
                <div className="download-text">Download</div>
                <span className="icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    role="img"
                    width="2em"
                    height="2em"
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
                </span>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* InitialPlayer */}
      {!isInstruments && (
        <section className="px-2 pt-5 ml-10 mt-14">
          <h1 className="text-2xl font-bold">Know a bit about making music</h1>
          <InitialPlayer />
          <button
            className="mt-10 text-right border border-black mr-20 p-3 hover:bg-black"
            onClick={() => setIsInstruments(true)}
          >
            Proceed to Instruments
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
