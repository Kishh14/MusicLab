import { useState } from "react";
import * as Tone from 'tone';
import DrumKit from "./DrumKit/DrumKit";
import Piano from "./Piano/Piano";

const Instruments = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [recorder] = useState(new Tone.Recorder());
    const [recordedNotes, setRecordedNotes] = useState([]);
    const [recordedAudioBlob, setRecordedAudioBlob] = useState(null);
    const [isPianoActivated, setIsPianoActivated] = useState(false);
    const [isDrumkitActivated, setIsDrumkitActivated] = useState(false);

    // Piano Sound
    const [synth] = useState(new Tone.Synth().toDestination());

    // Drum Sounds
    const [boom] = useState(new Tone.Synth({
        oscillator: {
            type: "sine",
        },
        envelope: {
            attack: 0.01,
            decay: 0.4,
            sustain: 0,
            release: 0.2,
        },
    }).toDestination());
    const [hiHat] = useState(new Tone.MetalSynth({
        envelope: {
            attack: 0.04,
            decay: 0.4,
            sustain: 0.1,
            release: 0.2,
        },
        pitchDecay: 0.5,
        reverse: false,
    }).toDestination())
    const [kick] = useState(new Tone.MembraneSynth({ polyphony: 4 }).toDestination())
    const [openHat] = useState(new Tone.Synth({
        oscillator: {
            type: "triangle",
        },
        envelope: {
            attack: 0.005,
            decay: 0.05,
            sustain: 0,
            release: 0.02,
        },
    }).toDestination());
    const [snare] = useState(new Tone.Synth({
        oscillator: {
            type: "sine",
        },
        envelope: {
            attack: 0.01,
            decay: 0.4,
            sustain: 0,
            release: 0.2,
        },
    }).toDestination());

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
            alert("Activate and play any of the instrument then start recording!!")
        }
    };
    const stopRecording = async () => {
        setIsRecording(false);
        const recording = await recorder.stop();
        setRecordedAudioBlob(recording);
    };
    const playRecording = async () => {
        if (recordedAudioBlob) {
            const audio = document.createElement('audio');
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
            }, 1000)
        } else {
            console.warn("No recording available to downalod");
            alert("No recording available to download")
        }
    }

    return (
        <section className="w-screen h-screen instruments" style={{ background: '#111827', overflowY: 'scroll' }}>
            {/* Header */}
            <section className="border-b border-gray-700 pt-7 pb-5 px-10 flex justify-between">
                <h1 style={{ fontSize: '19px' }}>
                    <button class="button" data-text="">
                        <span class="actual-text">&nbsp;virtual instruments&nbsp;</span>
                        <span aria-hidden="true" class="hover-text">virtual instruments</span>
                    </button>
                </h1>

                {/* Actions */}
                <div className="flex gap-4">
                    {/* Record Button */}
                    <button class="Btn" onClick={startRecording}>
                        <div class="sign"><svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><title>ionicons-v5-p</title><path d="M384,138a117.93,117.93,0,0,0-91.84,192H219.84A118,118,0,1,0,128,374H384a118,118,0,0,0,0-236ZM54,256a74,74,0,1,1,74,74A74.09,74.09,0,0,1,54,256Zm330,74a74,74,0,1,1,74-74A74.09,74.09,0,0,1,384,330Z" /></svg>
                        </div>
                        <div class="text">Record</div>
                    </button>
                    {/* Stop Button */}
                    {isRecording && <button class="Btn" onClick={stopRecording}>
                        <div class="sign"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-stop-circle" viewBox="0 0 16 16"> <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" /> <path d="M5 6.5A1.5 1.5 0 0 1 6.5 5h3A1.5 1.5 0 0 1 11 6.5v3A1.5 1.5 0 0 1 9.5 11h-3A1.5 1.5 0 0 1 5 9.5v-3z" /> </svg>
                        </div>
                        <div class="text">Stop</div>
                    </button>}
                    {/* Play Button */}
                    {recordedAudioBlob && <button class="Btn" onClick={playRecording}>
                        <div class="sign"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-circle-fill" viewBox="0 0 16 16"> <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z" /> </svg>
                        </div>
                        <div class="text">Play</div>
                    </button>}
                    {/* Download Button */}
                    {recordedAudioBlob && <div class="download-button" onClick={downloadRecording}>
                        <div class="button-wrapper">
                            <div class="download-text">Download</div>
                            <span class="icon">
                                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="2em" height="2em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15V3m0 12l-4-4m4 4l4-4M2 17l.621 2.485A2 2 0 0 0 4.561 21h14.878a2 2 0 0 0 1.94-1.515L22 17"></path></svg>
                            </span>
                        </div>
                    </div>}
                </div>
            </section>

            {/* Instruments */}
            {/* Piano */}
            <section className="p-6">
                <Piano isPianoActivated={isPianoActivated} setIsPianoActivated={setIsPianoActivated} synth={synth} isRecording={isRecording} recordedNotes={recordedNotes} setRecordedNotes={setRecordedNotes} />
            </section>

            {/* DrumKit */}
            <section className="p-6">
                <DrumKit isDrumkitActivated={isDrumkitActivated} setIsDrumkitActivated={setIsDrumkitActivated} boom={boom} hiHat={hiHat} kick={kick} openHat={openHat} snare={snare} />
            </section>
        </section>
    )
}

export default Instruments;