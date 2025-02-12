import { Button } from "./ui/button";

export default function Hero() {
    return (
        <div className="w-screen h-full flex justify-center text-white relative z-10 ">
            
            <div className="flex flex-col justify-start mt-20 md:mt-12 md:justify-center text-center items-center w-full max-w-[700px]">
                <div className="flex flex-col justify-center text-center items-center">
                    <img src="l2.png" alt="title" className="mb-3 md:mb-12" width={150} height={150} />
                    <div className="lg:text-7xl text-3xl md:text-5xl font-bold">Radically Better Observability Stack</div>
                    <div className="text-gray-500 mt-3 md:mt-7 text-sm md:text-xl w-[300px] md:w-[500px]">Ship higher-quality software faster. Be the hero of your engineering teams.</div>
                </div>
                <div className="flex mt-8 px-5 w-full justify-center">
                    <div className="md:flex mt-3 gap-3 px-3">
                        <input type="text" placeholder="Your work Email" className="px-3 py-2 w-[300px] rounded-xl text-black bg-slate-700 transition-colors focus:border-red-300 focus:outline-0" />
                        <button className="px-2 py-1 bg-blue-500 hover:bg-blue-700 rounded-xl w-[300px] md:w-auto mt-3 md:mt-0 text-white transition duration-300 relative z-10 flex justify-center items-center" 
                        >Join Now</button>
                    </div>
                </div>
                <div className="mt-7 text-sm text-gray-500">Start monitoring for free or <span><a href="/" className="underline text-gray-400">book a demo</a></span></div>
            </div>
        </div>
    )
}