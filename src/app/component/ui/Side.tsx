"use client"

import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "./button";
import { useRouter } from "next/navigation";

interface SideProps {
  setIsSideOpen: (isOpen: boolean) => void;
}

export const Side = ({ setIsSideOpen }: SideProps) => {
  const router = useRouter();
  const { data: session } = useSession();
  const imgUrl = session?.user?.image || "";

  return (
    <div className="fixed top-3 right-0 w-[200px] h-auto bg-white shadow-lg rounded-xl p-4 z-50">
      {/* Close Button */}
      <div className="flex justify-end">
        <button 
          onClick={() => setIsSideOpen(false)} 
          className="text-black hover:text-xl transition-all duration-300"
        >
          ✖
        </button>
      </div>
      <div className="mt-4">
            <Button name="Home" onSignIn={()=>{
              router.push('/')
            }}/>
      </div>

      <div className="mt-2">
        <a href="https://github.com/NavinVenkatV/pingMe..git"
          className="px-2 py-1 bg-blue-500 hover:bg-blue-700 rounded-xl text-white transition duration-300 flex justify-center items-center"
        >
          GitHub
        </a>
      </div>

      <div className="w-full flex items-center justify-center mt-3">
        {!session ? (
          <Button name="LogIn" onSignIn={signIn} />
        ) : (
          <Button 
            name="LogOut" 
            onSignIn={async () => {
              await signOut();
            }} 
          />
        )}
      </div>

      {session?.user?.image && (
        <div className="mt-3 flex justify-center">
          <img src={imgUrl} alt="Profile" className="w-9 h-9 rounded-full cursor-pointer" />
        </div>
      )}
    </div>
  );
};
