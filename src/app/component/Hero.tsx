import { Button } from "./ui/button";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Hero() {
    const { data : session } = useSession();
    const router = useRouter();
    return (
        <div className="w-screen h-full flex justify-center text-white relative z-10 ">

            <div className="flex flex-col justify-start mt-20 md:mt-12 md:justify-center text-center items-center w-full max-w-[700px]">
                <div className="flex flex-col justify-center text-center items-center">
                    <img src="l2.png" alt="title" className="mb-3 md:mb-12" width={150} height={150} />
                    <div className="lg:text-7xl text-3xl md:text-5xl font-bold">Radically Better Observability Stack</div>
                    <div className="text-gray-500 mt-3 md:mt-7 text-sm md:text-xl w-[300px] md:w-[500px]">Ship higher-quality software faster. Be the hero of your engineering teams.</div>
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
                            <span className="inline-flex hover:text-2xl transition-all duration-300 h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-xl font-medium text-white backdrop-blur-3xl">
                                Let&apos;s pingMe
                            </span>
                        </button>
                    </div>
                </div>
                <div className="mt-7 text-sm text-gray-500">Start monitoring for free or <span><a href="/" className="underline text-gray-400">book a demo</a></span></div>
            </div>
        </div>
    )
}