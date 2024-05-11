import SideBar from "../components/sidebar/SideBar";
import SmallDevicesError from "../components/ui/SmallDevicesError";
import Instruments from "../components/Instruments/Instruments";
import AudioChat from "../components/AudioChat";

export default function Home() {
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

      <AudioChat />
    </>
  );
}
