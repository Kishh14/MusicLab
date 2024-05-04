import React from "react";

/**
 * @type { React.FC<import('../../types/user').User> }
 */

const Avatar = ({ profile_img, username }) => {
  return (
    <div className="flex-shrink-0 flex flex-col items-center">
      <img src={profile_img} alt="Avatar" className="w-12 h-12 rounded-full" />
      <p className="mt-1 text-sm font-semibold">{username}</p>
    </div>
  );
};

export default Avatar;
