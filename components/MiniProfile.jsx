import React from "react";
import { useSession, signOut } from "next-auth/react";

const MiniProfile = () => {

  const { data: session } = useSession();


  return (
    <div className="flex items-center text-white justify-between mt-14 pl-10">
      <img
        src={session?.user?.image}
        alt=""
        className="rounded-full border p-[2px] w-16 h-16"
      />
      <div className="flex-1 mx-4">
        <h2 className="font-bold">Piotrek</h2>
        <h3 className="text-sm text-gray-300">Welcome to payIntel.</h3>
      </div>

      <button onClick={signOut} className="text-rose-500 text-sm font-semibold">Sign Out</button>
    </div>
  );
};

export default MiniProfile;
