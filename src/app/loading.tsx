import Image from "next/image";

export default function Home(){
    return (<div className="w-screen h-screen flex justify-center items-center bg-black">
        <Image src="/gif/loading.gif" alt="Loading..." width={250} height={250}/>
    </div>        
    )
}