import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function Hero() {
    const { data : session } = useSession();
    const router = useRouter();
    return (
        <div className="w-screen h-full flex justify-center text-white relative z-10 ">

            <div className="flex flex-col justify-start mt-20 md:mt-12 md:justify-center text-center items-center w-full max-w-[700px]">
                <div className="flex flex-col justify-center text-center items-center">
                    <Image src="/l2.png" alt="title" className="mb-3 md:mb-12" width={150} height={150} />
                    <motion.div
                    initial={{ z: 20, opacity:0 }}
                    animate={{ z: 0, opacity:1 }}
                    transition={{duration: 1, ease: "easeInOut" }}
                     className="lg:text-7xl text-3xl md:text-5xl font-bold">Never Miss a <span className="">Downtime Again!!!</span></motion.div>
                    <motion.div
                     initial={{ z: 50, opacity:0 }}
                     animate={{ z: 0, opacity:1 }}
                     transition={{duration: 1.5, ease: "easeInOut" }}
                     className="text-neutral-400 mt-3 md:mt-7 text-sm md:text-xl w-[300px] md:w-[500px]"> PingMe is a tool that helps you monitor your website and get notified when it goes down. </motion.div>
                </div>
                <div className="flex mt-8 px-5 w-full justify-center">
                    <div className=" mt-3 gap-3 px-3 w-[200px] md:w-[250px] lg:w-[300px]">
                        <button onClick={()=>{
                            if(session){
                                router.push('/dashboard')
                            }else{
                                signIn();
                            }
                        }} className="relative w-full inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                            <span className="inline-flex  transition-all duration-300 h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-xl font-medium text-white backdrop-blur-3xl">
                                Let&apos;s pingMe
                            </span>
                        </button>
                    </div>
                </div>
                <div className="mt-7 text-sm text-white">Start monitoring for free or <span><Link href="/" className="underline text-blue-500">book a demo</Link></span></div>
            </div>
        </div>
    )
}