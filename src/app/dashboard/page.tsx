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



const font = Raleway({ subsets: ["latin"] });

export default function Dashboard() {
    const [url, setUrl] = useState("");
    const { data: session, status } = useSession();
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
    }, [session]);
    
    // useEffect(() => {
    //     async function fetchUrls() {
    //         try {
    //             if (!session?.user?.id) return;
    
    //             const res = await axios.get("/api/getUrl", { 
    //                 params: { userId: Number(session?.user?.id) } 
    //             });
    
    //             if (!res.data.urls || !Array.isArray(res.data.urls)) return;
                
    //             const fetchedUrls = res.data.urls.map(({ url }: { url: string }) => ({ url, status: "Loading..." }));
    //             setUrls(fetchedUrls);
    
    //             fetchedUrls.forEach(({ url } : {
    //                 url : string
    //             }) => {
    //                 if (!intervals.current[url]) { // Avoid multiple intervals for the same URL
    //                     const interval = setInterval(async () => {
    //                         try {
    //                             const statusRes = await axios.get("/api/url", { params: { url } });
    //                             setUrls(prevUrls =>
    //                                 prevUrls.map(u =>
    //                                     u.url === url ? { ...u, status: statusRes.data.msg } : u
    //                                 )
    //                             );
    //                         } catch (error) {
    //                             console.error("Error fetching status:", error);
    //                         }
    //                     }, 5000);
    
    //                     intervals.current[url] = interval;
    //                 }
    //             });
    //         } catch (error) {
    //             console.error("Error fetching URLs:", error);
    //             setUrls([]);
    //         }
    //     }
    
    //     fetchUrls();
    
    //     return () => {
    //         Object.values(intervals.current).forEach(clearInterval); 
    //     };
    // }, [session?.user?.id]);




    const handleSubmit = async () => {
        if (!url) return alert("Please enter a URL");

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
            alert(error);
        }
    };

    const handleDelete = async (deleteUrl: string) => {
        try {
            const userId = session?.user?.id;
            if (!userId) return;

            const res = await axios.delete("/api/url", { data: { url: deleteUrl, userID: Number(userId) } });
            alert(JSON.stringify(res.data.msg));

            setUrls(prevUrls => prevUrls.filter(u => u.url !== deleteUrl));

            if (intervals.current[deleteUrl]) {
                clearInterval(intervals.current[deleteUrl]);
                delete intervals.current[deleteUrl];
            }
        } catch (error) {
            console.error("Error deleting website:", error);
            alert("Failed to delete URL!");
        }
    };

    return (
        <div className={`overflow-hidden pb-3 text-white ${font.className} relative z-0`}>
            {gifloading && <div className="= z-50 w-full flex justify-center items-center mt-4 fixed px-2">
                <div className="w-[350px] h-[350px] p-4 text-neutral-700 bg-white rounded-2xl">
                    <Image width={500} height={500} src="/gif/minions.gif" alt="Funny gif" className="rounded-xl" />
                    <div className="mt-3 text-center te">Successfully Added your Website to pingMe</div>
                    <button onClick={() => {
                        setGifloading(false)
                    }} className="w-full rounded-xl px-3 py-2 bg-blue-500 text-black mt-4 hover:bg-blue-700 transition-all duration-300">Close</button>
                </div></div>}
            <Header setIsSideOpen={setIsSideOpen} />
            {isSideOpen && <Side setIsSideOpen={setIsSideOpen} />}
            <div className="w-screen min-h-screen flex justify-center p-5">
                <div className="flex flex-col items-center justify-center w-full max-w-[700px] px-5 rounded-lg">
                    <Image width={500} height={500} src="/gif/leo.gif" alt="Hero fig" className="rounded-xl" />
                    <div className="text-xl sm:text-2xl md:text-3xl lg:text-5xl text-center text-slate-400 mt-5">
                        pingMe - Your Website Monitoring Solution
                    </div>
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
                                <button onClick={handleSubmit} className="px-3 py-2 bg-blue-500 text-white flex flex-col justify-center rounded-2xl hover:bg-blue-700 transition-all duration-300 ">{loading ? <Spinner /> : "Add Url"}</button>
                            </div>
                        </div>
                    </div>

                    {urls.length > 0 && (
                        <div className="mt-5 px-auto lg:w-[900px] w-auto">
                            {urls.map(({ url: itemUrl, status }) => (
                                <div key={Random()} className="bg-[rgba(17,17,29,0.8)] text-white p-3 mt-2 rounded-xl md:flex justify-between">
                                    <div className="flex flex-col text-sm md:text-xl items-center justify-center text-blue-500 font-bold">{itemUrl}</div>
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
                        </div>
                    )}
                </div>
            </div>
            <Slide />
            <Footer />
        </div>
    );
}
