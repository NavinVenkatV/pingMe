"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const { data: session } = useSession(); // Correct way to access session

  return (
    <div className="w-full px-10 py-3  flex justify-between items-center overflow-hidden z-50 
      bg-[rgba(17,17,29,0.8)] backdrop-blur-lg shadow-md">
      <img src="l2.png" alt="logo" width={130} height={100} />
      <div className="flex flex-col justify-center items-center">
        <div className="flex gap-2">
          <a href="https://github.com/NavinVenkatV/pingMe..git"
            className="px-2 py-1 bg-blue-500 hover:bg-blue-700 rounded-xl text-white transition duration-300 relative z-10"
          >
            GitHub
          </a>
          {session ? "" : <Button name="LogIn" onSignIn={signIn} />}
          {session && <Button name="LogOut" onSignIn={async()=>{
            await signOut();
            window.location.href = "/";
          }} /> }
          {session && <span className="text-white text-xl">Welcome {session.user?.name} </span>}
        </div>
      </div>
    </div>
  );
}
