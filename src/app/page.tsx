"use client"
import { useEffect } from "react";
import Hero from "./component/Hero";
import  RevealBento  from "./component/Marquee";
import Slide from "./component/Slide";
import Lenis from "lenis";
import Header from "./component/Header";
import { Raleway } from "next/font/google";
import { Middle, Middle2 } from "./component/Middle";
import { Footer } from "./component/Footer";

const font = Raleway({
  subsets : ["latin"]
})

export default function Home() {

  useEffect(()=>{
    const lenis = new Lenis();
    function raf(time : any){
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
  }, [])

  return (
    <div className={`overflow-hidden relative pb-3 ${font.className}`}>
      <img src="mainImage/pingMef.jpg" alt="bgimg" className="absolute inset-0 z-0"/>
      <Header/>
      <Hero/>
      <RevealBento/>
      <Middle/>
      <Slide/>
      <Middle2/>
      <Footer/>
    </div>
  );
}
