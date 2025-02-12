"use client";

import axios from "axios";
import Header from "../component/Header";
import { useSession } from "next-auth/react";
import { Raleway } from "next/font/google";
import { useEffect, useState } from "react";
import { Box } from "../component/ui/box";
import { useRouter } from "next/navigation";
import { Footer } from "../component/Footer";
import { Grid } from "../component/ui/Grid";
import { Button } from "../component/ui/button";
const font = Raleway({
    subsets: ["latin"],
});

export default function Dashboard() {
    const [url, setUrl] = useState("");
    const { data: session, status } = useSession();
    const [success, setsSuccess] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push('/')
        }
    }, [status])

    const handleSubmit = async () => {
        try {
            console.log("Submitting URL:", url);
            console.log("User ID:", session?.user?.id);
            const userId = session?.user?.id
            const payLoad = {
                url: url,
                userId: JSON.parse(userId)
            }
            console.log(url)
            console.log(userId)
            const res = await axios.post("/api/url", payLoad);
            setsSuccess(true)
            alert(res.data.msg);

        } catch (error) {
            console.error("Error while adding website:", error);
            alert("Something went wrong!");
        }
    };

    return (
        <div className={`overflow-hidden pb-3 text-white ${font.className}`}>
            <Header />
            <div className="w-screen min-h-screen flex justify-center p-5">
                <div className="flex flex-col items-center justify-center w-full max-w-[700px] px-5 rounded-lg">
                    <div className="rounded-2xl md:flex gap-4">
                        <img src="chatGpt/e1.webp" width={300} height={300} alt="" className="rounded-2xl"/>
                        <div className="flex flex-col items-center justify-center">
                            <div className="flex items-center justify-center">
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Debitis, praesentium! Sint assumenda perspiciatis dolorem nobis, sed eligendi quisquam repellat ipsam.
                            </div>
                            <div className="grid grid-cols-2 gap-3 mt-3">
                                <div className="border border-1 p-2 rounded-xl text-neutral-400">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Itaque, ullam.</div>
                                <div className="border border-1 p-2 rounded-xl text-blue-400">Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime, saepe.</div>
                            </div>
                        </div>
                    </div>
                    <div className="text-xl sm:text-2xl md:text-3xl lg:text-5xl text-center text-slate-400 mt-5">
                        pingMe - Your Website Monitoring Solution
                    </div>
                    <div className="mt-10 w-full flex  justify-center items-center gap-2">
                        <div>
                            <div className="md:flex items-center gap-2 w-full">
                                <input onChange={(e)=>{
                                    setUrl(e.target.value)
                                }} type="text" placeholder="Enter Your Url" className="rounded-xl w-[300px]  bg-black px-3 py-3 focus:outline-none" />
                                <div className="flex items-center justify-center mt-3 md:mt-0">
                                <Button name="Add Url" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>

    );
}
