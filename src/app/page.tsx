"use client"
import { useEffect, useState } from "react";
import Hero from "./component/Hero";
import  RevealBento  from "./component/Marquee";
import Slide from "./component/Slide";
import Lenis from "lenis";
import Header from "./component/Header";
import { Raleway } from "next/font/google";
import { Middle, Middle2 } from "./component/Middle";
import { Footer } from "./component/Footer";
import { Side } from "./component/ui/Side";
import Image from "next/image";

const font = Raleway({
  subsets : ["latin"]
})

export default function Home() {
  const [ isSideOpen, setIsSideOpen ] = useState(false);

  useEffect(()=>{
    const lenis = new Lenis();
    function raf(time : any){
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
  }, [])

  return (
    <div className={`relative min-h-screen overflow-hidden ${font.className}`}>
      <Header setIsSideOpen={setIsSideOpen} />   
      <Image src="/mainImage/pingMeF.jpg" alt="Hero_section_image" className="absolute z-0" width={2000} height={2000} />   
      {isSideOpen && <Side setIsSideOpen={setIsSideOpen} />} 
      <Hero />
      <RevealBento />
      <Middle />
      <Slide/>
      <Middle2 />
      <Footer />
    </div>
  );
}
