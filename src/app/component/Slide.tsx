"use client"

import { MotionValue, useScroll, useTransform } from "framer-motion"
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
                <Slider  left={'-80%'} progress={scrollYProgress} direction="left"/>
                <Slider  left={'-60%'} progress={scrollYProgress} direction="right"/>
                {/* <Slider img='/b3.webp' left={'-75%'} progress={scrollYProgress} direction="left"/> */}
            </div>
        </div>
    )
}

function Slider({ left, progress, direction } : { left : string, progress : MotionValue<number>, direction : string}) {
    const dir = direction === "left" ? -1 : 1;
    const x = useTransform(progress, [0, 1], [-250 * dir, 250 * dir])
    return (
        <motion.div 
        className="flex whitespace-nowrap relative"
        style={{left : left, x}}>
            <Phrase  />
            <Phrase  />
            <Phrase />
            <Phrase />
            <Phrase  />
        </motion.div>
    )
}

function Phrase() {
    return (
        <div className="flex gap-5 items-center px-2 md:px-5 lg:px-10  text-slate-400">
            <div className="text-[5vw]">Never Miss a Downtime Again!!!</div>
            {/* <span className="relative h-[5vw] aspect-[4/2] rounded-full overflow-hidden">
                <Image style={{ objectFit: "cover" }} src={src} alt="image" fill />
            </span> */}
        </div>
    )
}