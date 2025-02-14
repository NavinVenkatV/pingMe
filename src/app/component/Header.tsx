"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

interface typess {
  setIsSideOpen: (isSideOpen: boolean) => void;
}

export default function Header({ setIsSideOpen }: typess) {
  const router = useRouter();
  const { data: session } = useSession();

  const imgUrl = session?.user?.image;
  const firstLetter = session?.user?.email?.charAt(0).toUpperCase();

  return (
    <div className="w-full px-5 md:px-10 py-3 flex justify-between items-center overflow-hidden relative 
      bg-[rgba(17,17,29,0.8)] backdrop-blur-lg shadow-md">
      <Link href="/"><Image src="/l2.png" alt="logo" width={130} height={100} /></Link>

      <div className="flex flex-col justify-center items-center">
        <div className="flex gap-2">

          <div className="flex flex-col items-center justify-center md:hidden relative">
            <button
              onClick={() => setIsSideOpen(true)}
              className="flex flex-col justify-between w-6 h-5 cursor-pointer"
            >
              <span className="block w-6 h-1 bg-white rounded"></span>
              <span className="block w-6 h-1 bg-white rounded"></span>
              <span className="block w-6 h-1 bg-white rounded"></span>
            </button>
          </div>
          <div className="hidden md:block">
            <Button name="Home" onSignIn={() => {
              router.push('/')
            }} />
          </div>
          <div className="hidden md:block">
            <Link href="https://github.com/NavinVenkatV/pingMe..git"
              className="px-2 py-1 bg-blue-500 hover:bg-blue-700 rounded-xl text-white transition duration-300 relative z-10 flex justify-center items-center"
            >
              GitHub
            </Link>
          </div>

          <div className="hidden md:block">
            {!session && <Button name="LogIn" onSignIn={signIn} />}
            {session && (
              <Button
                name="LogOut"
                onSignIn={async () => {
                  await signOut();
                  router.push("/");
                }}
              />
            )}
          </div>

          {session && (
            <div className="hidden md:block">
              {session?.user?.image ? (
                imgUrl ? ( 
                  <Image
                    width={40} 
                    height={40}
                    src={imgUrl}
                    alt="Profile"
                    className="w-9 h-9 rounded-full cursor-pointer text-white flex flex-col justify-center items-center"
                  />
                ) : (
                  <span className="w-9 h-9 bg-white text-black flex justify-center items-center rounded-full">
                    {firstLetter}
                  </span>
                )
              ) : (
                <span className="w-9 h-9 bg-white text-black flex justify-center items-center rounded-full">
                  {firstLetter}
                </span>
              )}
            </div>
          )}


        </div>
      </div>
    </div>
  );
}
