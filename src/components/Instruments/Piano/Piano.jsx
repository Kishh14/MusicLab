import React, { useEffect, useState } from 'react';

import './Piano.css'
import { TfiHelpAlt } from "react-icons/tfi";

const Piano = () => {
    const [isPianoActivated, setIsPianoActivated] = useState(false);

    const C4 = new Audio("sounds/piano/C4.mp3");
    const Db4 = new Audio("sounds/piano/Db4.mp3");
    const D4 = new Audio("sounds/piano/D4.mp3");
    const Eb4 = new Audio("sounds/piano/Eb4.mp3");
    const E4 = new Audio("sounds/piano/E4.mp3");
    const F4 = new Audio("sounds/piano/F4.mp3");
    const Gb4 = new Audio("sounds/piano/Gb4.mp3");
    const G4 = new Audio("sounds/piano/G4.mp3");
    const Ab4 = new Audio("sounds/piano/Ab4.mp3");
    const A4 = new Audio("sounds/piano/A4.mp3");
    const Bb4 = new Audio("sounds/piano/Bb4.mp3");
    const B4 = new Audio("sounds/piano/B4.mp3");
    const C5 = new Audio("sounds/piano/C5.mp3");
    const Db5 = new Audio("sounds/piano/Db5.mp3");
    const D5 = new Audio("sounds/piano/D5.mp3");
    const Eb5 = new Audio("sounds/piano/Eb5.mp3");
    const E5 = new Audio("sounds/piano/E5.mp3");


    const playSound = audio => {
        const clone = audio.cloneNode();
        if (isPianoActivated) {
            clone.play();
        }
        setTimeout(() => (clone.volume = 0.8), 400);
        setTimeout(() => (clone.volume = 0.6), 800);
        setTimeout(() => (clone.volume = 0.4), 1200);
        setTimeout(() => (clone.volume = 0.2), 1600);
        setTimeout(() => (clone.volume = 0), 2000);
    };

    // C4
    const C4Key = document.querySelector(".C4-key");
    const playC4 = () => {
        playSound(C4);
        if (isPianoActivated) {
            C4Key.classList.add("active");

            // const recordingObj = {
            //     instrument: 'Piano',
            //     note: 'C4',
            // timeStamp: Date.now() // You can still play the audio files, just use the timestamp to know for how much duration the audio is played and play the audio again for the same duration.
            // }
            // setRecordingData(prevState => [...prevState, recordingObj]);
        }
        setTimeout(() => C4Key.classList.remove("active"), 200);
    };

    // Db4
    const Db4Key = document.querySelector(".Db4-key");
    const playDb4 = () => {
        playSound(Db4);
        if (isPianoActivated) {
            Db4Key.classList.add("active");
        }
        setTimeout(() => Db4Key.classList.remove("active"), 200);
    };

    // D4
    const D4Key = document.querySelector(".D4-key");
    const playD4 = () => {
        playSound(D4);
        if (isPianoActivated) {
            D4Key.classList.add("active");
        }
        setTimeout(() => D4Key.classList.remove("active"), 200);
    };

    // Eb4
    const Eb4Key = document.querySelector(".Eb4-key");
    const playEb4 = () => {
        playSound(Eb4);
        if (isPianoActivated) {
            Eb4Key.classList.add("active");
        }
        setTimeout(() => Eb4Key.classList.remove("active"), 200);
    };

    // E4
    const E4Key = document.querySelector(".E4-key");
    const playE4 = () => {
        playSound(E4);
        if (isPianoActivated) {
            E4Key.classList.add("active");
        }
        setTimeout(() => E4Key.classList.remove("active"), 200);
    };

    // F4
    const F4Key = document.querySelector(".F4-key");
    const playF4 = () => {
        playSound(F4);
        if (isPianoActivated) {
            F4Key.classList.add("active");
        }
        setTimeout(() => F4Key.classList.remove("active"), 200);
    };

    // Gb4
    const Gb4Key = document.querySelector(".Gb4-key");
    const playGb4 = () => {
        playSound(Gb4);
        if (isPianoActivated) {
            Gb4Key.classList.add("active");
        }
        setTimeout(() => Gb4Key.classList.remove("active"), 200);
    };

    // G4
    const G4Key = document.querySelector(".G4-key");
    const playG4 = () => {
        playSound(G4);
        if (isPianoActivated) {
            G4Key.classList.add("active");
        }
        setTimeout(() => G4Key.classList.remove("active"), 200);
    };

    // Ab4
    const Ab4Key = document.querySelector(".Ab4-key");
    const playAb4 = () => {
        playSound(Ab4);
        if (isPianoActivated) {
            Ab4Key.classList.add("active");
        }
        setTimeout(() => Ab4Key.classList.remove("active"), 200);
    };

    // A4
    const A4Key = document.querySelector(".A4-key");
    const playA4 = () => {
        playSound(A4);
        if (isPianoActivated) {
            A4Key.classList.add("active");
        }
        setTimeout(() => A4Key.classList.remove("active"), 200);
    };

    // Bb4
    const Bb4Key = document.querySelector(".Bb4-key");
    const playBb4 = () => {
        playSound(Bb4);
        if (isPianoActivated) {
            Bb4Key.classList.add("active");
        }
        setTimeout(() => Bb4Key.classList.remove("active"), 200);
    };

    // B4
    const B4Key = document.querySelector(".B4-key");
    const playB4 = () => {
        playSound(B4);
        if (isPianoActivated) {
            B4Key.classList.add("active");
        }
        setTimeout(() => B4Key.classList.remove("active"), 200);
    };

    // C5
    const C5Key = document.querySelector(".C5-key");
    const playC5 = () => {
        playSound(C5);
        if (isPianoActivated) {
            C5Key.classList.add("active");
        }
        setTimeout(() => C5Key.classList.remove("active"), 200);
    };

    // Db5
    const Db5Key = document.querySelector(".Db5-key");
    const playDb5 = () => {
        playSound(Db5);
        if (isPianoActivated) {
            Db5Key.classList.add("active");
        }
        setTimeout(() => Db5Key.classList.remove("active"), 200);
    };

    // D5
    const D5Key = document.querySelector(".D5-key");
    const playD5 = () => {
        playSound(D5);
        if (isPianoActivated) {
            D5Key.classList.add("active");
        }
        setTimeout(() => D5Key.classList.remove("active"), 200);
    };

    // Eb5
    const Eb5Key = document.querySelector(".Eb5-key");
    const playEb5 = () => {
        playSound(Eb5);
        if (isPianoActivated) {
            Eb5Key.classList.add("active");
        }
        setTimeout(() => Eb5Key.classList.remove("active"), 200);
    };

    // E5
    const E5Key = document.querySelector(".E5-key");
    const playE5 = () => {
        playSound(E5);
        if (isPianoActivated) {
            E5Key.classList.add("active");
        }
        setTimeout(() => E5Key.classList.remove("active"), 200);
    };


    useEffect(() => {
        const handleKeyPress = (event) => {
            // Press Q
            if (event.key.toUpperCase() === 'Q') return playC4();

            // Press 2
            if (event.key === '2') return playDb4();

            // Press W
            if (event.key.toUpperCase() === 'W') return playD4();

            // Press 3
            if (event.key === '3') return playEb4();

            // Press E
            if (event.key.toUpperCase() === 'E') return playE4();

            // Press R
            if (event.key.toUpperCase() === 'R') return playF4();

            // Press 5
            if (event.key === '5') return playGb4();

            // Press T
            if (event.key.toUpperCase() === 'T') return playG4();

            // Press 6
            if (event.key === '6') return playAb4();

            // Press Y
            if (event.key.toUpperCase() === 'Y') return playA4();

            // Press 7
            if (event.key === '7') return playBb4();

            // Press U
            if (event.key.toUpperCase() === 'U') return playB4();

            // Press I
            if (event.key.toUpperCase() === 'I') return playC5();

            // Press 9
            if (event.key === '9') return playDb5();

            // Press O
            if (event.key.toUpperCase() === 'O') return playD5();

            // Press 0 
            if (event.key === '0') return playEb5();

            // Press P
            if (event.key.toUpperCase() === 'P') return playE5();
        };
        if (isPianoActivated) {
            document.addEventListener('keydown', handleKeyPress);
        }

        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, [isPianoActivated]);

    return (
        <>
            <section className="piano-container">
                <div className="flex items-center justify-between">
                    {/* <button className='shadow__btn my-4' onClick={() => setIsPianoActivated(!isPianoActivated)}>{isPianoActivated ? 'Deactivate' : 'Activate'}</button> */}
                    {/* <button className='shadow__btn my-4'>Full Screen</button> */}
                    <div className="voltage-button">
                        <button onClick={() => setIsPianoActivated(!isPianoActivated)}>{isPianoActivated ? 'Deactivate' : 'Activate'}</button>
                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 234.6 61.3" preserveAspectRatio="none" xmlSpace="preserve">

                            <filter id="glow">
                                <feGaussianBlur className="blur" result="coloredBlur" stdDeviation="2"></feGaussianBlur>
                                <feTurbulence type="fractalNoise" baseFrequency="0.075" result="turbulence"></feTurbulence>
                                <feDisplacementMap in="SourceGraphic" in2="turbulence" scale="30" xChannelSelector="R" yChannelSelector="G" result="displace"></feDisplacementMap>
                                <feMerge>
                                    <feMergeNode in="coloredBlur"></feMergeNode>
                                    <feMergeNode in="coloredBlur"></feMergeNode>
                                    <feMergeNode in="coloredBlur"></feMergeNode>
                                    <feMergeNode in="displace"></feMergeNode>
                                    <feMergeNode in="SourceGraphic"></feMergeNode>
                                </feMerge>
                            </filter>
                            <path className="voltage line-1" d="m216.3 51.2c-3.7 0-3.7-1.1-7.3-1.1-3.7 0-3.7 6.8-7.3 6.8-3.7 0-3.7-4.6-7.3-4.6-3.7 0-3.7 3.6-7.3 3.6-3.7 0-3.7-0.9-7.3-0.9-3.7 0-3.7-2.7-7.3-2.7-3.7 0-3.7 7.8-7.3 7.8-3.7 0-3.7-4.9-7.3-4.9-3.7 0-3.7-7.8-7.3-7.8-3.7 0-3.7-1.1-7.3-1.1-3.7 0-3.7 3.1-7.3 3.1-3.7 0-3.7 10.9-7.3 10.9-3.7 0-3.7-12.5-7.3-12.5-3.7 0-3.7 4.6-7.3 4.6-3.7 0-3.7 4.5-7.3 4.5-3.7 0-3.7 3.6-7.3 3.6-3.7 0-3.7-10-7.3-10-3.7 0-3.7-0.4-7.3-0.4-3.7 0-3.7 2.3-7.3 2.3-3.7 0-3.7 7.1-7.3 7.1-3.7 0-3.7-11.2-7.3-11.2-3.7 0-3.7 3.5-7.3 3.5-3.7 0-3.7 3.6-7.3 3.6-3.7 0-3.7-2.9-7.3-2.9-3.7 0-3.7 8.4-7.3 8.4-3.7 0-3.7-14.6-7.3-14.6-3.7 0-3.7 5.8-7.3 5.8-2.2 0-3.8-0.4-5.5-1.5-1.8-1.1-1.8-2.9-2.9-4.8-1-1.8 1.9-2.7 1.9-4.8 0-3.4-2.1-3.4-2.1-6.8s-9.9-3.4-9.9-6.8 8-3.4 8-6.8c0-2.2 2.1-2.4 3.1-4.2 1.1-1.8 0.2-3.9 2-5 1.8-1 3.1-7.9 5.3-7.9 3.7 0 3.7 0.9 7.3 0.9 3.7 0 3.7 6.7 7.3 6.7 3.7 0 3.7-1.8 7.3-1.8 3.7 0 3.7-0.6 7.3-0.6 3.7 0 3.7-7.8 7.3-7.8h7.3c3.7 0 3.7 4.7 7.3 4.7 3.7 0 3.7-1.1 7.3-1.1 3.7 0 3.7 11.6 7.3 11.6 3.7 0 3.7-2.6 7.3-2.6 3.7 0 3.7-12.9 7.3-12.9 3.7 0 3.7 10.9 7.3 10.9 3.7 0 3.7 1.3 7.3 1.3 3.7 0 3.7-8.7 7.3-8.7 3.7 0 3.7 11.5 7.3 11.5 3.7 0 3.7-1.4 7.3-1.4 3.7 0 3.7-2.6 7.3-2.6 3.7 0 3.7-5.8 7.3-5.8 3.7 0 3.7-1.3 7.3-1.3 3.7 0 3.7 6.6 7.3 6.6s3.7-9.3 7.3-9.3c3.7 0 3.7 0.2 7.3 0.2 3.7 0 3.7 8.5 7.3 8.5 3.7 0 3.7 0.2 7.3 0.2 3.7 0 3.7-1.5 7.3-1.5 3.7 0 3.7 1.6 7.3 1.6s3.7-5.1 7.3-5.1c2.2 0 0.6 9.6 2.4 10.7s4.1-2 5.1-0.1c1 1.8 10.3 2.2 10.3 4.3 0 3.4-10.7 3.4-10.7 6.8s1.2 3.4 1.2 6.8 1.9 3.4 1.9 6.8c0 2.2 7.2 7.7 6.2 9.5-1.1 1.8-12.3-6.5-14.1-5.5-1.7 0.9-0.1 6.2-2.2 6.2z" fill="transparent" stroke="#fff"></path>
                            <path className="voltage line-2" d="m216.3 52.1c-3 0-3-0.5-6-0.5s-3 3-6 3-3-2-6-2-3 1.6-6 1.6-3-0.4-6-0.4-3-1.2-6-1.2-3 3.4-6 3.4-3-2.2-6-2.2-3-3.4-6-3.4-3-0.5-6-0.5-3 1.4-6 1.4-3 4.8-6 4.8-3-5.5-6-5.5-3 2-6 2-3 2-6 2-3 1.6-6 1.6-3-4.4-6-4.4-3-0.2-6-0.2-3 1-6 1-3 3.1-6 3.1-3-4.9-6-4.9-3 1.5-6 1.5-3 1.6-6 1.6-3-1.3-6-1.3-3 3.7-6 3.7-3-6.4-6-6.4-3 2.5-6 2.5h-6c-3 0-3-0.6-6-0.6s-3-1.4-6-1.4-3 0.9-6 0.9-3 4.3-6 4.3-3-3.5-6-3.5c-2.2 0-3.4-1.3-5.2-2.3-1.8-1.1-3.6-1.5-4.6-3.3s-4.4-3.5-4.4-5.7c0-3.4 0.4-3.4 0.4-6.8s2.9-3.4 2.9-6.8-0.8-3.4-0.8-6.8c0-2.2 0.3-4.2 1.3-5.9 1.1-1.8 0.8-6.2 2.6-7.3 1.8-1 5.5-2 7.7-2 3 0 3 2 6 2s3-0.5 6-0.5 3 5.1 6 5.1 3-1.1 6-1.1 3-5.6 6-5.6 3 4.8 6 4.8 3 0.6 6 0.6 3-3.8 6-3.8 3 5.1 6 5.1 3-0.6 6-0.6 3-1.2 6-1.2 3-2.6 6-2.6 3-0.6 6-0.6 3 2.9 6 2.9 3-4.1 6-4.1 3 0.1 6 0.1 3 3.7 6 3.7 3 0.1 6 0.1 3-0.6 6-0.6 3 0.7 6 0.7 3-2.2 6-2.2 3 4.4 6 4.4 3-1.7 6-1.7 3-4 6-4 3 4.7 6 4.7 3-0.5 6-0.5 3-0.8 6-0.8 3-3.8 6-3.8 3 6.3 6 6.3 3-4.8 6-4.8 3 1.9 6 1.9 3-1.9 6-1.9 3 1.3 6 1.3c2.2 0 5-0.5 6.7 0.5 1.8 1.1 2.4 4 3.5 5.8 1 1.8 0.3 3.7 0.3 5.9 0 3.4 3.4 3.4 3.4 6.8s-3.3 3.4-3.3 6.8 4 3.4 4 6.8c0 2.2-6 2.7-7 4.4-1.1 1.8 1.1 6.7-0.7 7.7-1.6 0.8-4.7-1.1-6.8-1.1z" fill="transparent" stroke="#fff"></path>
                        </svg>
                        <div className="dots">
                            <div className="dot dot-1"></div>
                            <div className="dot dot-2"></div>
                            <div className="dot dot-3"></div>
                            <div className="dot dot-4"></div>
                            <div className="dot dot-5"></div>
                        </div>
                    </div>

                    <button style={{ margin: '0px 0 15px 0' }}><TfiHelpAlt style={{ fontSize: '21px' }} /></button>
                </div>

                <div className={`piano`} id='piano'>
                    <button className="white-key C4-key" onClick={playC4}>Q</button>
                    <button className="black-key Db4-key" onClick={playDb4}>2</button>
                    <button className="white-key D4-key" onClick={playD4}>W</button>
                    <button className="black-key Eb4-key" onClick={playEb4}>3</button>
                    <button className="white-key E4-key" onClick={playE4}>E</button>
                    <button className="white-key F4-key" onClick={playF4}>R</button>
                    <button className="black-key Gb4-key" onClick={playGb4}>5</button>
                    <button className="white-key G4-key" onClick={playG4}>T</button>
                    <button className="black-key Ab4-key" onClick={playAb4}>6</button>
                    <button className="white-key A4-key" onClick={playA4}>Y</button>
                    <button className="black-key Bb4-key" onClick={playBb4}>7</button>
                    <button className="white-key B4-key" onClick={playB4}>U</button>
                    <button className="white-key C5-key" onClick={playC5}>I</button>
                    <button className="black-key Db5-key" onClick={playDb5}>9</button>
                    <button className="white-key D5-key" onClick={playD5}>O</button>
                    <button className="black-key Eb5-key" onClick={playEb5}>0</button>
                    <button className="white-key E5-key" onClick={playE5}>P</button>
                </div>
            </section>
        </>
    )
}

export default Piano;