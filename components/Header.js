import React from "react";
import Image from "next/image";
import {
  SearchIcon,
  PlusCircleIcon,
  UserGroupIcon,
  HeartIcon,
  PaperAirplaneIcon,
  MenuIcon,
} from "@heroicons/react/outline";
import { useSession, signIn, signOut } from "next-auth/react";
import { HomeIcon } from "@heroicons/react/solid";
import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modal-atom";

const Header = () => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useRecoilState(modalState);
  return (
    <div className="shadow-sm bg-white border-b sticky top-0 z-50">
      <div className="flex justify-between items-center max-w-4xl mx-5 lg:mx-auto">
        <div className="relative hidden lg:inline-grid h-10 w-24">
          <Image
            src={"https://links.papareact.com/ocw"}
            layout="fill"
            objectFit="contain"
          />
        </div>

        <div className="relative h-7 w-7 lg:hidden flex-shrink-0">
          <Image
            src={"https://links.papareact.com/jjm"}
            layout="fill"
            objectFit="contain"
          />
        </div>
        {/* Middle */}
        <div className="max-w-xs">
          <div className="relative ml-1 p-3 rounded-md">
            <div className="absolute flex items-center inset-y-0 pointer-events-none pl-3">
              <SearchIcon className="w-4 h-4 text-gray-500" />
            </div>
            <input
              type="text"
              placeholder="Search"
              className="bg-gray-50 block w-full pl-10 sm:text-sm border-gray-300 rounded-md focus:ring-black focus:border-black h-8 text-sm"
            />
          </div>
        </div>
        {/* Rigth */}
        <div className="flex items-center space-x-3">
          <HomeIcon className="navBtn" />
          {session ? (
            <>
              <MenuIcon className="h-6 w-6 md:hidden cursor-pointer" />
              <div className="relative navBtn">
                <PaperAirplaneIcon className="navBtn rotate-45" />
                <div className="absolute bottom-2 left-2 bg-red-500 text-white flex justify-center items-center rounded-full text-sm w-5 h-5 animate-pulse">
                  3
                </div>
              </div>
              <PlusCircleIcon
                onClick={() => setIsOpen(true)}
                className="navBtn"
              />
              <UserGroupIcon className="navBtn" />
              <HeartIcon className="navBtn" />

              <div>
                <img
                  onClick={signOut}
                  src={session.user.image}
                  alt="Profile pic"
                  className="w-7 h-7 rounded-full cursor-pointer"
                />
              </div>
            </>
          ) : (
            <button onClick={signIn}>Sign in</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
