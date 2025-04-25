"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { signIn } from "next-auth/react";
import { FaGoogle } from "react-icons/fa";

function Page() {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      {/* Left half - Login Component */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-black">
        <div className="bg-black py-10 px-10 md:px-16 rounded-2xl border-neutral-600 border">
          <div className="text-center flex flex-col w-full justify-center">
            <Link href="/" className="text-center flex justify-center">
              <Image src="/l2.png" alt="logo" width={130} height={100} />
            </Link>
          </div>
          <form onSubmit={handleSubmit} className="mt-10 mb-10 h-full w-[200px] md:w-[300px]">
            <div
              onClick={() => {
                signIn("google");
              }}
              className="mt-10 shadow-lg flex justify-center gap-3 bg-white hover:bg-neutral-300 text-center px-3 py-2 text-black transition-all duration-300 ease-in-out cursor-pointer"
            >
              <div className="flex flex-col justify-center">
                <FaGoogle />
              </div>
              <div className="font-semibold">Google</div>
            </div>
          </form>
        </div>
      </div>

      {/* Right half - Full Image (hidden on mobile) */}
      <div className="hidden md:block w-1/2 h-full">
        <img
          src="/inter.png"
          alt="Login illustration"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}

export default Page;
