"use client";

import axios from "axios";
import Header from "../component/Header";
import { Button } from "../component/ui/button";
import { useSession } from "next-auth/react";
import { Raleway } from "next/font/google";
import { useEffect, useState } from "react";
import { Box } from "../component/ui/box";
import { useRouter } from "next/navigation";

const font = Raleway({
    subsets: ["latin"],
});

export default function Dashboard() {
    const [url, setUrl] = useState("");
    const { data: session, status } = useSession();
    const [ success, setsSuccess ] = useState(false);
    const router = useRouter();

    useEffect(()=>{
        if(status === "unauthenticated"){
            router.push('/')
        }
    },[status])

    const handleSubmit = async () => {
        try {
            console.log("Submitting URL:", url);
            console.log("User ID:", session?.user?.id);
            const userId = session?.user?.id
            const payLoad = {
                url : url,
                userId : JSON.parse(userId)
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
        <div className={`text-white overflow-hidden ${font.className}`}>
            <Header />
            
                <div className="w-screen h-[90vh] flex justify-center">
                    <div className="flex flex-col justify-center">
                        <div>
                            <div className="text-5xl">PingMe - Keep Your Website Alive & Healthy!</div>
                            <div className="text-center mt-7">
                                <input
                                    onChange={(e) => setUrl(e.target.value)}
                                    value={url}
                                    type="text"
                                    placeholder="Enter your website URL"
                                    className="w-[500px] rounded-lg mr-14 px-3 py-2 text-black bg-neutral-700 focus:outline-none"
                                />
                                {/* <Button name="pingMe" onSignIn={handleSubmit} /> */}
                                <button className="px-2 py-1 bg-blue-500 hover:bg-blue-700 rounded-xl text-white transition duration-300 relative z-10"
                                    onClick={handleSubmit}>Add Url</button>
                            </div>
                        </div>
                        {success && <div>
                            <Box url={url} status={success}/>
                        </div>}
                    </div>
                </div>
           
        </div>
    );
}
