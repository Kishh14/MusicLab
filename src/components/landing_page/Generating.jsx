import { loading } from "../../assets";

const Generating = ({ className }) => {
  return (
    <div
      className={`flex items-center h-[3.5rem] px-6 bg-n-8/80 rounded-[1.7rem] justify-center ${
        className || ""
      } text-base`}
    >
      Virtual Music Studio
    </div>
  );
};

export default Generating;
