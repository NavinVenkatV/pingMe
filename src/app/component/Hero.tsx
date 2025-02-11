import { Button } from "./ui/button";

export default function Hero() {
    return (
        <div className="w-screen h-screen flex justify-center text-white relative z-10">
            <div className="flex flex-col justify-center text-center items-center w-full max-w-[700px]">
                <div className="flex flex-col justify-center text-center items-center">
                    <img src="l2.png" alt="title" className="mb-12" width={150} height={150} />
                    <div className="text-7xl font-bold">Radically Better Observability Stack</div>
                    <div className="text-gray-500 mt-7 text-xl w-[500px]">Ship higher-quality software faster. Be the hero of your engineering teams.</div>
                </div>
                <div className="flex mt-8  w-full justify-center">
                    <div className="flex gap-3">
                        <input type="text" placeholder="Your work Email" className="px-3 py-2 w-[320px] rounded-xl text-black bg-slate-700 transition-colors focus:border-red-300 focus:outline-0" />
                        <Button name="Join Now"/>
                    </div>
                </div>
                <div className="mt-7 text-sm text-gray-500">Start monitoring for free or <span><a href="/" className="underline text-gray-400">book a demo</a></span></div>
            </div>
        </div>
    )
}