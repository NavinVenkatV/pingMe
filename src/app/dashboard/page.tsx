"use client"

import axios from "axios";
// import { getServerSession } from "next-auth";
import Header from "../component/Header";
import { Button } from "../component/ui/button";
import { useSession } from "next-auth/react";
import { Raleway } from "next/font/google";
import { useState } from "react";
const font = Raleway({
    subsets : ["latin"]
})


export default function Dashboard() {
    const [url, setUrl] = useState("")
    const {data : session} = useSession();

    const handleSubmit = async ()=>{
        try{
            await axios.post('/api/url',{
                url,
                userId : session?.user?.id
            }, { method : "POST"})
            
            alert("Url added for monitoring")
        }catch(e){
            console.log("Error while adding website", e)
            alert("Something went wrong!")
        }
    }

    return (
        <div className={`text-white overflow-hidden ${font.className}`}>
            <Header />
            {session &&
                <div className="w-screen h-[90vh] flex justify-center">
                    <div className="flex flex-col justify-center">
                        <div>
                            <div className="text-5xl">PingMe - Keep Your Website Alive & Healthy!</div>
                            <div className="text-center mt-7">
                                <input onChange={(e)=>{
                                    setUrl(e.target.value)
                                }} type="text" placeholder="Enter you website url" className="w-[500px] rounded-lg mr-14 px-3 py-2 text-black bg-neutral-700 focus:outline-none"/>
                                <Button name="pingMe" onSignIn={handleSubmit}/>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}