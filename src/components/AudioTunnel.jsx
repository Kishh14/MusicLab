import { useEffect, useRef } from "react";
import { useSocket } from "../context/SocketContext";

const AudioTunnel = () => {
  const { socket } = useSocket();

  const audioContextRef = useRef();
  const audioQueuesRef = useRef({});

  useEffect(() => {
    if (!socket) return;

    audioContextRef.current = new (window.AudioContext ||
      window.webkitAudioContext)();

    window.addEventListener("click", () => {
      audioContextRef.current.resume();
    });

    socket.on("audioStream", async (audioData, userId) => {
      const audioBlob = new Blob([audioData]);
      const arrayBuffer = await audioBlob.arrayBuffer();
      const audioBuffer = await audioContextRef.current.decodeAudioData(
        arrayBuffer
      );

      if (!audioQueuesRef.current[userId]) {
        audioQueuesRef.current[userId] = [];
      }

      audioQueuesRef.current[userId].push({
        buffer: audioBuffer,
        startTime: audioContextRef.current.currentTime,
      });

      playAudioQueue(userId);
    });

    return () => {
      socket.off("audioStream");
    };
  }, [socket]);

  const playAudioQueue = (userId) => {
    while (
      audioQueuesRef.current[userId] &&
      audioQueuesRef.current[userId].length
    ) {
      const audioSource = audioContextRef.current.createBufferSource();
      audioSource.buffer = audioQueuesRef.current[userId][0].buffer;
      audioSource.connect(audioContextRef.current.destination);
      audioSource.start(audioQueuesRef.current[userId][0].startTime);

      audioQueuesRef.current[userId].shift();
    }
  };

  return <></>;
};

export default AudioTunnel;
