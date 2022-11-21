import React, { useState } from "react";
import { HiHome, HiAcademicCap, HiMenu, HiPlusCircle } from "react-icons/hi";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modalAtom";

const Header = () => {
  const { data: session } = useSession();
  const [open, setOpen] = useRecoilState(modalState);
  const router = useRouter();

  return (
    <div className="shadow-sm">
      <header className="flex justify-between max-w-6xl p-4 mx-auto sticky top-0 z-50">
        {/* left */}
        <div onClick={() => router.push("/")}>
          <h1 className="font-bold text-4xl text-white cursor-pointer">
            payIntel<span className="text-red-600 text-5xl">.</span>
          </h1>
        </div>

        {/* center */}
        {session ? (
          <div className="flex items-center justify-end space-x-4">
            <HiHome
              onClick={() => router.push("/")}
              className="navBtn text-white"
            />
            <HiAcademicCap className="navBtn text-white" />
            <HiPlusCircle
              onClick={() => setOpen(true)}
              className="navBtn text-white"
            />
            <HiMenu className="hidden navBtn text-white" />
            <img
              onClick={signOut}
              src={session?.user?.image}
              className="h-12 w-12 rounded-full cursor-pointer hover:scale-110 transition transform duration-200 ease-out"
            />
          </div>
        ) : (
          <button className="text-white font-bold" onClick={signIn}>
            Sign in
          </button>
        )}
        {/* right */}
      </header>
    </div>
  );
};

export default Header;
