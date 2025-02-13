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
    <div className="relative min-h-screen">
      {/* Main Content */}
      <Header setIsSideOpen={setIsSideOpen} />
      
      {/* Sidebar (Rendered at Root Level) */}
      {isSideOpen && <Side setIsSideOpen={setIsSideOpen} />} 

      {/* Other Components */}
      <Hero />
      <RevealBento />
      <Middle />
      <Middle2 />
      <Footer />
    </div>
  );
}
