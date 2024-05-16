import Split from "react-split";

import SideBar from "../components/sidebar/SideBar";
import SmallDevicesError from "../components/ui/SmallDevicesError";
import Instruments from "../components/Instruments/Instruments";
import AudioTunnel from "../components/AudioTunnel";

export default function Home() {
  return (
    <>
      {/* Small Devices Error */}
      <SmallDevicesError />

      {/* Split Layout */}
      <Split
        className="split bg-gray-800"
        gutterSize={5}
        minSize={400}
        sizes={[30, 80]}
      >
        <div>
          <SideBar />
        </div>
        <div>
          <Instruments />
        </div>
      </Split>

      <AudioTunnel />
    </>
  );
}
