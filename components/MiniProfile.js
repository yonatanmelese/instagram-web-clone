import React from "react";
import { useSession, signOut } from "next-auth/react";

const MiniProfile = () => {
  const { data: session } = useSession();
  return (
    <div className="flex items-center justify-between mt-14 ">
      <img
        className="w-16 h-16 object-cover rounded-full border p-[2px]"
        src={session?.user?.image}
        alt={session?.user?.name}
      />
      <div className="flex-1 mx-4">
        <h2 className="font-bold">{session?.user?.username}</h2>
        <h3 className="text-sm text-gray-400">Welcome to instagram.</h3>
      </div>
      <button className="text-blue-500" onClick={signOut}>
        Sign Out
      </button>
    </div>
  );
};

export default MiniProfile;
