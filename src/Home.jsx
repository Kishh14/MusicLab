import { useEffect } from "react";
import SideBar from "./components/sidebar/SideBar";
import { useSocket } from "./context/SocketContext";
import SmallDevicesError from './components/ui/SmallDevicesError';
import Instruments from './components/Instruments/Instruments';

export default function Home() {
  const { socket } = useSocket();

  useEffect(() => {
    if (socket === null) return;

    socket.on("audioStream", (audioData) => {
      var newData = audioData.split(";");
      newData[0] = "data:audio/ogg;";
      newData = newData[0] + newData[1];

      var audio = new Audio(newData);
      if (!audio || document.hidden) {
        return;
      }
      audio.play();
    });

    return () => {
      socket.off("audioStream");
    };
  }, [socket]);

  return (
    <>
      {/* Small Devices Error */}
      <SmallDevicesError />

      <main className="flex">
        {/* sideBar */}
        <SideBar />

        {/* Instruments */}
        <Instruments />
      </main>
    </>
  );
}
