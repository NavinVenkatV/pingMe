"use client"
import { useEffect, useState } from "react";
import Hero from "./component/Hero";
import RevealBento from "./component/Marquee";

import Slide from "./component/Slide";
import Lenis from "lenis";
import Header from "./component/Header";
import { Raleway } from "next/font/google";
import { Middle, Middle2 } from "./component/Middle";
import { Footer } from "./component/Footer";
import { Side } from "./component/ui/Side";
import Testimonials from "./component/ui/testimonials";

const font = Raleway({
  subsets: ["latin"]
})

export default function Home() {
  const [isSideOpen, setIsSideOpen] = useState(false);

  useEffect(() => {
    const lenis = new Lenis();
    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
  }, [])

  return (
    <div className={`relative w-full h-full bg-black overflow-hidden ${font.className}`}>
      <img src="/grai.png" alt="" className="fixed top-0 left-0 w-screen h-screen object-cover" />
      <div className="relative z-10">
      <div className="px-10 mt-5">
      <Header setIsSideOpen={setIsSideOpen} />
      </div>
        {isSideOpen && <Side setIsSideOpen={setIsSideOpen} />}
        <Hero />
        <RevealBento />
        <Middle />
        <Slide />
        <Middle2 />
        <div className="flex flex-wrap bg-black justify-center gap-10 px-3 py-10">
          <Testimonials title="What Our Users Say" description="Discover how PingMe has helped businesses maintain uptime and reliability." />
          <Testimonials title="Customer Reviews" description="Real feedback from our satisfied users who trust PingMe for website monitoring." />
          <Testimonials title="Trusted by Businesses" description="From startups to enterprises, PingMe ensures uninterrupted service and performance." />
          <Testimonials title="Why People Love PingMe" description="See why users rely on PingMe for instant alerts and detailed analytics." />
          <Testimonials title="Real Feedback from Users" description="Honest reviews from people who trust PingMe to keep their websites running smoothly." />
        </div>
        <Footer />
      </div>
    </div>
  );
}
