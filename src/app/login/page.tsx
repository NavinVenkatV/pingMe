"use client";

import Image from "next/image";
import Link from "next/link";
import React  from "react";
import { signIn } from "next-auth/react";
import { FaGoogle } from "react-icons/fa";
// import { FaGithub } from "react-icons/fa";


function Page() {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
  };

  return (
    <div className="text-white flex justify-center items-center w-screen m-0 p-0 h-screen overflow-hidden">
      <div className="bg-black py-10 px-10 md:px-16 mx-auto mb-20 overflow-hidden rounded-2xl border border-blue-500 shadow-lg shadow-blue-500  max-w-md">
        <div className="text-center flex flex-col w-full  justify-center">
          <Link href="/"
          className="text-center flex justify-center">
            <Image src="/l2.png" alt="logo" width={130} height={100} />
          </Link>
          <div className="text-center  mt-4 text-2xl md:text-4xl text-blue-700 flex justify-center">Welcome back!</div>
        </div>
        <form onSubmit={handleSubmit} className="mt-10  mb-10 h-full w-[200px] md:w-[300px]">
          <div
          onClick={()=>{
            signIn("google")
          }}
           className="mt-10 b shadow-lg flex justify-center gap-3  hover:shadow-blue-500 text-center px-3 py-2 rounded-full text-black hover:scale-110 transition-all duration-700 ease-in-out cursor-pointer focus:border-1 focus:border-white bg-gradient-to-br from-blue-500 to-blue-100">
            <div className="flex flex-col justify-center">
              <FaGoogle/>
            </div>
            <div className="font-semibold">
             Google
            </div>
          </div>

          {/* <div
          onClick={()=>{
            signIn("github")
          }}
           className="mt-10 b shadow-lg flex justify-center gap-3  hover:shadow-blue-500 text-center px-3 py-2 rounded-full text-black hover:scale-110 transition-all duration-700 ease-in-out cursor-pointer focus:border-1 focus:border-white bg-gradient-to-br from-blue-500 to-blue-100">
            <div className="flex flex-col justify-center">
              <FaGithub/>
            </div>
            <div className="font-semibold">
             GitHub
            </div>
          </div> */}

        </form>
      </div>
    </div>
  );
}

export default Page;
