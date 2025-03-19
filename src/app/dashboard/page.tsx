"use client";

import axios from "axios";
import Header from "../component/Header";
import { useSession } from "next-auth/react";
import { Raleway } from "next/font/google";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Footer } from "../component/Footer";
import { BsTrash3Fill } from "react-icons/bs";
import { Spinner } from "../component/ui/spinner";
import Slide from "../component/Slide";
import { Side } from "../component/ui/Side";
import Image from "next/image";
import { motion } from "framer-motion";
import Testimonials from "../component/ui/testimonials";



const font = Raleway({ subsets: ["latin"] });

export default function Dashboard() {
    const [url, setUrl] = useState("");
    const { data: session, status } = useSession();
    const [ error, setError ] = useState(false)
    const router = useRouter();
    const intervals = useRef<Record<string, NodeJS.Timeout | number>>({});
    const [urls, setUrls] = useState<{ url: string; status: string }[]>([]);
    const [loading, setLoading] = useState(false)
    const [gifloading, setGifloading] = useState(false)
    const [isSideOpen, setIsSideOpen] = useState(false);

    function Random() {
        const no = Math.random();
        return no;
    }

    useEffect(() => {
        if (status !== "loading" && status === "unauthenticated") {
            router.push("/");
        }
    }, [status]);
    
    useEffect(() => {
        async function fetchUrls() {
            try {
                if (!session?.user?.id) return;

                const res = await axios.get("/api/getUrl", { 
                    params: { userId: Number(session?.user?.id) } 
                });

                if (!res.data.urls || !Array.isArray(res.data.urls)) return;
                
                const fetchedUrls = res.data.urls.map(({ url }: { url: string }) => ({ url, status: "Loading..." }));
                setUrls(fetchedUrls);

                fetchedUrls.forEach(({ url } : { url : string }) => {
                    if (!intervals.current[url]) {
                        const interval = setInterval(async () => {
                            try {
                                const statusRes = await axios.get("/api/url", { 
                                    params: { paramUrl: url } // Updated to match handleSubmit parameter name
                                });
                                setUrls(prevUrls =>
                                    prevUrls.map(u =>
                                        u.url === url ? { ...u, status: statusRes.data.msg } : u
                                    )
                                );
                            } catch (error) {
                                console.error("Error fetching status:", error);
                            }
                        }, 5000);

                        intervals.current[url] = interval;
                    }
                });
            } catch (error) {
                console.error("Error fetching URLs:", error);
                setUrls([]);
            }
        }

        fetchUrls();

        return () => {
            Object.values(intervals.current).forEach(clearInterval); 
        };
    }, [session?.user?.id]);




    const handleSubmit = async () => {
        if (!url) return alert("Please enter a URL");
        if(!url.startsWith("https://") || !url.endsWith("/")) {
            setError(true);
            return;
        }

        try {
            if (urls.some((u) => u.url === url)) {
                alert("Website us already under Monitoring!")
                return;
            }
            setLoading(true)
            const userId = session?.user?.id;
            if (!userId) return;

            await axios.post("/api/url", {
                url : url,
                userId : JSON.parse(userId)
            });
            setUrls(prevUrls => [...prevUrls, { url, status: "Processing.." }]);
            setLoading(false)
            setGifloading(true)
            const paramUrl = url;
            setUrl("");
            const interval = setInterval(async () => {
                try {
                    const res = await axios.get("/api/url", { params:{paramUrl} });
                    setUrls(prevUrls =>
                        prevUrls.map(u =>
                            u.url === url ? { ...u, status: res.data.msg } : u
                        )
                    );
                } catch (error) {
                    console.error("Error fetching status:", error);
                }
            }, 5000);

            intervals.current[url] = interval; // Store reference
        } catch (error) {
            console.error("Error while adding website:", error);
        }
    };

    const handleDelete = async (deleteUrl: string) => {
        try {
            const userId = session?.user?.id;
            if (!userId) return;

            await axios.delete("/api/url", { data: { url: deleteUrl, userID: Number(userId) } });

            setUrls(prevUrls => prevUrls.filter(u => u.url !== deleteUrl));

            if (intervals.current[deleteUrl]) {
                clearInterval(intervals.current[deleteUrl]);
                delete intervals.current[deleteUrl];
            }
        } catch (error) {
            console.error("Error deleting website:", error);
        }
    };

    return (
        <div className={`overflow-hidden pb-3 text-white ${font.className} `}>
            {gifloading &&
             <motion.div
             initial={{ opacity: 0, z: 50 }}
             animate={{ opacity: 1, z: 0 }}
             transition={{ duration: 0.5, ease: "easeInOut" }}  
             exit={{ opacity: 0, z: -50 }}
              className="= z-50 w-full flex justify-center items-center mt-4 fixed px-2">
                <div className="w-[350px] h-[350px] p-4 text-neutral-700 bg-white rounded-2xl">
                    <Image width={500} height={500} src="/gif/minions.gif" alt="Funny gif" className="rounded-xl" />
                    <div className="mt-3 text-center te">Successfully Added your Website to pingMe</div>
                    <button onClick={() => {
                        setGifloading(false)
                    }} className="w-full rounded-xl px-3 py-2 bg-[rgb(118,48,128)] hover:bg-[rgb(74,18,75)] text-white mt-4 transition-all duration-300">Close</button>
                </div>
            </motion.div>}
            {/* <video src="/mainImage/4.mp4" autoPlay loop  muted className="absolute z-0 w-full h-full object-cover"></video> */}
            {/* <Image src='/mainImage/1.png' alt="Hero fig" className="absolute z-0 w-full max-h-[1500px]  object-cover" width={1600} height={1200}/> */}
            <video src="/video/bgvid.mp4" autoPlay loop muted  className="absolute z-0 h-[150vh] lg:h-auto"></video>

            <Header setIsSideOpen={setIsSideOpen} />
            {isSideOpen && <Side setIsSideOpen={setIsSideOpen} />}
            <div className="w-screen min-h-screen relative z-10 flex justify-center p-5">
                <div className="flex flex-col items-center justify-center w-full max-w-[700px] px-5 rounded-lg">
                    <Image width={500} height={500} src="/gif/leo.gif" alt="Hero fig" className="rounded-xl" />
                    <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                     className="text-xl sm:text-2xl md:text-3xl lg:text-5xl text-center text-slate-400 mt-5">
                        pingMe - Your Website Monitoring Solution
                    </motion.div>
                    <div className="text-white text-xs md:text-lg w-full text-center">Note: You will recieve Mail at the time of your Website downtime!</div>
                    <div className="mt-10 w-full flex justify-center items-center gap-2">
                        <div className="md:flex items-center justify-center gap-2 w-full">
                            <div className="flex items-center justify-center text-center">
                                <input
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                    type="text"
                                    placeholder="Enter Your URL"
                                    className="rounded-xl w-[300px] bg-black px-3 py-3 focus:outline-none"
                                />
                            </div>
                            <div className="flex items-center justify-center mt-3 md:mt-0">
                                <button onClick={handleSubmit} className="px-3 py-2 text-white flex flex-col justify-center rounded-2xl bg-blue-500 hover:bg-blue-900 hover:scale-110 transition-all duration-300 ">{loading ? <Spinner /> : "Add Url"}</button>
                            </div>
                        </div>
                    </div>
                    {error && <div className="mt-2 text-center text-sm text-slate-400">Please Enter a Valid Url (eg: https://navinvenkat.xyz/)</div>}


                    {urls.length > 0 && (
                        <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                         className="mt-5 px-auto lg:w-[900px] w-auto">
                            {urls.map(({ url: itemUrl, status }) => (
                                <div key={Random()} className="bg-[rgba(17,17,29,0.8)] text-white p-3 mt-2 rounded-xl md:flex justify-between">
                                    <div className="flex flex-col text-sm md:text-xl items-center justify-center text-pink-500 font-bold">{itemUrl}</div>
                                    <div className="md:flex gap-5">
                                        <div className="flex md:flex-col text-center pl-3 items-center justify-center">Current Status: {status}</div>
                                        <div className="flex justify-center items-center">
                                            <button
                                                className="px-2 py-2 mt-4 md:mt-0 bg-red-500 rounded-xl hover:text-2xl flex md:flex-col items-center justify-center transition-all duration-300"
                                                onClick={() => handleDelete(itemUrl)}
                                            >
                                                <BsTrash3Fill />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    )}
                </div>
            </div>
            <div className="mt-20">
                <Slide />
            </div>
            
            <div className="flex flex-wrap justify-center lg:gap-10 px-3 py-10">
        <Testimonials title="What Our Users Say" description="Discover how PingMe has helped businesses maintain uptime and reliability." />
        <Testimonials title="Customer Reviews" description="Real feedback from our satisfied users who trust PingMe for website monitoring." />
        <Testimonials title="Trusted by Businesses" description="From startups to enterprises, PingMe ensures uninterrupted service and performance." />
        <Testimonials title="Why People Love PingMe" description="See why users rely on PingMe for instant alerts and detailed analytics." />
        <Testimonials title="Real Feedback from Users" description="Honest reviews from people who trust PingMe to keep their websites running smoothly." />

      </div>
            <Footer />
        </div>
    );
}
