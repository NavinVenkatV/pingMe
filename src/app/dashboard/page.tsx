"use client";

import axios from "axios";
import Header from "../component/Header";
import { useSession } from "next-auth/react";
import { Raleway } from "next/font/google";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Footer } from "../component/Footer";
import { Button } from "../component/ui/button";
import { BsTrash3Fill } from "react-icons/bs";
import { Spinner } from "../component/ui/spinner";
import Slide from "../component/Slide";
import { AddedUrl } from "../component/ui/AddedUrl";



const font = Raleway({ subsets: ["latin"] });

export default function Dashboard() {
    const [url, setUrl] = useState("");
    const { data: session, status } = useSession();
    const router = useRouter();
    const intervals = useRef<Record<string, NodeJS.Timeout | number>>({});
    const [urls, setUrls] = useState<{ url: string; status: string }[]>([]);
    const [ loading, setLoading ] = useState(false)

    function Random(){
        const no = Math.random();
        return no;
    }

    useEffect(() => {
        if (status !== "loading" && status === "unauthenticated") {
            router.push("/");
        }
    }, [session]);

    // useEffect(() => {
    //     if (!session?.user?.id) return;

    //     const fetchUrls = async () => {
    //         try {
    //             let userId = session.user.id;
    //             const res = await axios.get('/api/getUrl', { params: { userId } });

    //             if (res?.data?.urls) {
    //                 setUrls(res.data.urls);
    //             }
    //         } catch (e) {
    //             console.log("Could not fetch URLs: ", e);
    //         }
    //     };

    //     fetchUrls();
    // }, [session]);

    useEffect(() => {
        return () => {
            Object.values(intervals.current).forEach(clearInterval);
        };
    }, []);

    const handleSubmit = async () => {
        if (!url) return alert("Please enter a URL");

        try {
            if(urls.some((u) => u.url === url)){
                alert("Website us already under Monitoring!")
                return;
            }
            setLoading(true)
            const userId = session?.user?.id;
            if (!userId) return;

            await axios.post("/api/url", { url, userId : Number(userId) });
            setUrls(prevUrls => [...prevUrls, { url, status: "Processing.." }]);
            setLoading(false)
            setUrl(""); // Clear input

            const interval = setInterval(async () => {
                try {
                    const res = await axios.get("/api/url", { params: { url } });
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
            alert("Something went wrong!");
        }
    };

    const handleDelete = async (deleteUrl: string) => {
        try {
            const userId = session?.user?.id;
            if (!userId) return;

            await axios.delete("/api/url", { data: { url: deleteUrl, userID : Number(userId) } });

            setUrls(prevUrls => prevUrls.filter(u => u.url !== deleteUrl));

            // ✅ Clear Interval
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
            {loading && <div className="= z-50 w-full flex justify-center items-center mt-4 fixed"><AddedUrl/></div>}
            <Header />
            <div className="w-screen min-h-screen flex justify-center p-5">
                <div className="flex flex-col items-center justify-center w-full max-w-[700px] px-5 rounded-lg">
                    <div className="text-xl sm:text-2xl md:text-3xl lg:text-5xl text-center text-slate-400 mt-5">
                        pingMe - Your Website Monitoring Solution
                    </div>
                    <div className="mt-10 w-full flex justify-center items-center gap-2">
                        <div className="md:flex items-center justify-center gap-2 w-full">
                            <input
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                type="text"
                                placeholder="Enter Your URL"
                                className="rounded-xl w-[300px] bg-black px-3 py-3 focus:outline-none"
                            />
                            <div className="flex items-center justify-center mt-3 md:mt-0">
                                <button onClick={handleSubmit} className="px-3 py-2 bg-blue-500 text-white flex flex-col justify-center rounded-2xl hover:bg-blue-700 transition-all duration-300 ">{loading ? <Spinner/> : "Add Url"}</button>
                            </div>
                        </div>
                    </div>

                    {urls.length > 0 && (
                        <div className="mt-5 w-[500px] md:w-[800px] lg:w-[1200px]">
                            {urls.map(({ url: itemUrl, status }) => (
                                <div key={Random()} className="bg-neutral-700 text-white p-3 mt-2 rounded-xl md:flex justify-between">
                                    <div className="flex flex-col items-center justify-center">{itemUrl}</div>
                                    <div className="flex gap-5">
                                        <div className="flex flex-col items-center justify-center">Current Status: {status}</div>
                                        <button
                                            className="px-2 py-2 bg-red-500 rounded-xl hover:text-2xl flex flex-col items-center justify-center transition-all duration-300"
                                            onClick={() => handleDelete(itemUrl)}
                                        >
                                            <BsTrash3Fill />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <Slide/>
            <Footer />
        </div>
    );
}
