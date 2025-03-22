"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { z } from "zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

// Define schemas
const EmailSchema = z.string().email({ message: "Invalid email address" });
const PasswordSchema = z.string().min(8, { message: "Min 8 character required" });

function Page() {
  const [ error, setError ] = useState("")
  const [mail, setMail] = useState("");
  const [pass, setPass] = useState("");
  const [mailError, setMailError] = useState<string | null>(null);
  const [passError, setPassError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(!mail || !pass){
        setError("Enter all the Details!")
        return;
    }else{
        setError("")
    }

    // Validate email
    const mailParse = EmailSchema.safeParse(mail);
    if (!mailParse.success) {
      setMailError(mailParse.error.errors[0].message);
    } else {
      setMailError(null);
    }

    // Validate password
    const passParse = PasswordSchema.safeParse(pass);
    if (!passParse.success) {
      setPassError(passParse.error.errors[0].message);
    } else {
      setPassError(null);
    }

    try{
        const res = await signIn("credentials",{
            username : mail,
            password : pass,
        })
        if(res?.ok){
            router.push('/dashboard')
        }
        if(res?.error){
            setError(error)
            alert(error)
        }
    }catch(e){
        alert("Something went wrong")
        console.log(e)
    }
  };

  return (
    <div className="text-white flex justify-center items-center w-screen h-screen overflow-hidden">
      <div className="bg-black py-10 px-10 md:px-16 rounded-2xl border border-blue-500 shadow-lg shadow-blue-500 mx-auto max-w-md">
        <div className="text-center flex justify-center">
          <Link href="/">
            <Image src="/l2.png" alt="logo" width={130} height={100} />
          </Link>
        </div>
        <form onSubmit={handleSubmit} className="mt-10">
          <div className="flex flex-col gap-2">
            {error && (
                <div className="py-2 text-center text-red-500">
                    {error}
                </div>
            )}
            <label htmlFor="email" className="text-xl">
              Email
            </label>
            {mailError && (
              <div className="mt-2 text-sm text-red-500">
                {mailError}
              </div>
            )}
            <input
              onChange={(e) => setMail(e.target.value)}
              value={mail}
              className="px-3 py-2 rounded-xl focus:outline-none hover:shadow-lg hover:shadow-blue-500 transition-all duration-700 ease-in-out bg-neutral-200 text-black"
              type="text"
              placeholder="thalaajith@gmail.com"
              id="email"
            />
          </div>
          
          <div className="flex flex-col gap-2 mt-5">
            <label htmlFor="password" className="text-xl">
              Password
            </label>
            {passError && (
              <div className="mt-2 text-sm text-red-500">
                {passError}
              </div>
            )}
            <input
              onChange={(e) => setPass(e.target.value)}
              value={pass}
              className="px-3 py-2 rounded-xl focus:outline-none hover:shadow-lg hover:shadow-blue-500 transition-all duration-700 ease-in-out bg-neutral-200 text-black"
              type="password"
              placeholder="••••••••"
              id="password"
            />
          </div>
          
          <div className="flex flex-col gap-2 mt-10 mb-9">
            <button
              type="submit"
              className="px-4 py-2 rounded-full hover:shadow-lg hover:scale-95 bg-white text-black hover:shadow-blue-500 transition-all duration-700 ease-in-out"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Page;