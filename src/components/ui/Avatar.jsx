import React from "react";
import { MinidenticonImg } from "./MinidenticonImg";

/**
 * @type { React.FC<import('../../types/user').User> }
 */

const Avatar = ({ userId, username, isMicOn }) => {
  return (
    <div
      className="flex-shrink-0 flex flex-col items-center w-20 group"
      title={username}
    >
      <div className="relative">
        {/* <img src={profile_img} alt="Avatar" className="size-12 rounded-full" /> */}

        <MinidenticonImg
          userId={userId}
          username={username}
          className="size-12 rounded-full bg-white"
        />

        {isMicOn != undefined && (
          <div
            className={
              "size-3 rounded-full border-2 absolute bottom-0 right-0 " +
              (isMicOn ? "bg-green-500" : "bg-red-500")
            }
          ></div>
        )}
      </div>

      <p className="mt-1 text-sm text-center font-semibold truncate w-full group-hover:w-auto">
        {username}
      </p>
    </div>
  );
};

export default Avatar;
