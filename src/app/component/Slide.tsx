"use client"

import { useScroll, useTransform } from "framer-motion"
import  {useRef}  from "react";
import {motion} from "framer-motion"

export default function Slide() {
    
    const containerRef = useRef<HTMLDivElement>(null); 

    const { scrollYProgress } = useScroll({
        target : containerRef,
        offset : ['start end', 'end start']
    })
    
    return (
        <div className="overflow-hiddeen my-5 md:my-10 lg:my-44">
            <div ref={containerRef}>
                <Slider img='/b1.webp' left={'-80%'} progress={scrollYProgress} direction="left"/>
                <Slider img='/b2.webp' left={'-60%'} progress={scrollYProgress} direction="right"/>
                {/* <Slider img='/b3.webp' left={'-75%'} progress={scrollYProgress} direction="left"/> */}
            </div>
        </div>
    )
}

function Slider({ img, left, progress, direction }: any) {
    const dir = direction === "left" ? -1 : 1;
    const x = useTransform(progress, [0, 1], [-250 * dir, 250 * dir])
    return (
        <motion.div 
        className="flex whitespace-nowrap relative"
        style={{left : left, x}}>
            <Phrase src={img} />
            <Phrase src={img} />
            <Phrase src={img} />
            <Phrase src={img} />
            <Phrase src={img} />
        </motion.div>
    )
}

function Phrase({ src }: any) {
    return (
        <div className="flex gap-5 items-center px-2 md:px-5 lg:px-10  text-slate-400">
            <div className="text-[5vw]">Never Miss a Downtime Again!!!</div>
            {/* <span className="relative h-[5vw] aspect-[4/2] rounded-full overflow-hidden">
                <Image style={{ objectFit: "cover" }} src={src} alt="image" fill />
            </span> */}
        </div>
    )
}