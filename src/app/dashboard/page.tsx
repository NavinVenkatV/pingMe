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
import { BsTrash3Fill } from "react-icons/bs";

const font = Raleway({
    subsets: ["latin"],
});

export default function Dashboard() {
    const [url, setUrl] = useState("");
    const { data: session, status } = useSession();
    const [success, setsSuccess] = useState(false);
    const [ time, setTime ] = useState();
    const [ deleteUrl, setdeleteUrl ] = useState()
    const [ result, setResult ] = useState("");
    const router = useRouter();
    let interval : NodeJS.Timeout | null = null;

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
            
            console.log(url)
            console.log(userId)
            const res = await axios.post("/api/url", {
                url, 
                userId : JSON.parse(userId)
            });
            setsSuccess(true)
            alert(res.data.msg);

        } catch (error) {
            console.error("Error while adding website:", error);
            alert("Something went wrong!");
        }
    };
    const handleSubmit2 = async ()=>{
        try{
            const userId = session?.user?.id
            const res = axios.delete('/api/url',{
                data : {
                    url, 
                    userId : JSON.parse(userId)
                }
            })
            if(interval ){
                clearInterval(interval)
                setsSuccess(false)
            }
        }catch(e){
            alert("")
        }
    }
    useEffect(() => {
        if (success) {
             interval = setInterval(async () => {
                try {
                    const res = await axios.get("/api/url", { params: { url } });
                    setResult(res.data.msg);
                } catch (error) {
                    setResult("Error retrieving website status!");
                    console.error("Error fetching status:", error);
                }
            }, 5000 );

        }
    }, [success, url]);

    return (
        <div className={`overflow-hidden pb-3 text-white ${font.className}`}>
            <Header />
            <div className="w-screen min-h-screen flex justify-center p-5">
                <div className="flex flex-col items-center justify-center w-full max-w-[700px] px-5 rounded-lg">
                    <div className="rounded-2xl md:flex gap-4">
                        <img src="chatGpt/e1.webp" width={300} height={300} alt="" className="rounded-2xl"/>
                        <div className="flex flex-col items-center justify-center">
                            <div className="flex items-center justify-center">
                                <div>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Debitis, praesentium! Sint assumenda perspiciatis dolorem nobis, sed eligendi quisquam repellat ipsam.
                                </div>
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
                                <Button name="Add Url" onSignIn={handleSubmit}/>
                                </div>
                            </div>
                        </div>
                    </div>
                
                    {success && <div className="w-[700px] h-auto bg-neutral-700 text-white p-3 mt-5 rounded-xl">
                        <div className="w-full flex justify-between">
                            <div className="flex flex-col items-center justify-center">{url}</div>
                            <div className="flex gap-5">
                                <div className="flex flex-col items-center justify-center">Current Status : {result}</div>
                                <button className="px-2 py-2 bg-red-500 rounded-xl hover:text-2xl transition-all duration-300" onClick={handleSubmit2}><BsTrash3Fill/></button>
                            </div>
                        </div>
                        </div>}
                </div>
            </div>
            <Footer />
        </div>

    );
}
