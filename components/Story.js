import React from "react";

const Story = ({ profile }) => {
  return (
    <div className="hover:scale-110 transition-all duration-150 ease-in-out transform">
      <img
        className="w-14 h-14 rounded-full p-[1.5px] border-2 border-red-500 object-contain cursor-pointer"
        src={profile.avatar}
        alt={profile.username}
      />
      <p className="w-14 truncate text-sm text-center">{profile.username}</p>
    </div>
  );
};

export default Story;
