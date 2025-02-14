import { GiBlackHandShield } from "react-icons/gi";
import { Links } from "./ui/Link";
import { Logo } from "./ui/Logo";
import { TiSocialLinkedin, TiSocialTwitter } from "react-icons/ti";
import { FaInstagram, FaGithub } from "react-icons/fa";
import Link from "next/link";


export const Footer = () => {
    return (
        <div className="w-screen px-10 text-slate-400">
            <div className="flex items-center justify-center md:justify-start">
                <Logo/>
            </div>
            <div className="md:flex md:justify-between">
                <div className="w-[400px]">
                    <div className="hidden lg:block">
                        Ship higher-quality software faster. Be the hero of your engineering teams.
                    </div>
                </div>
                <div className="flex gap-3 items-center justify-center">
                    <div className="hidden md:block">
                    <div className="flex flex-col w-full h-full items-center justify-center">(+91) 636930-1474</div>
                    </div>
                    <div className="hidden md:block">
                    <div className="w-full h-full flex flex-col items-center justify-center">pingMeBuisness@gmail.com</div>
                    </div>
                    <Link href="linkedin.com/in/navin-venkat-38bb28279" className="flex flex-col items-center justify-center">
                        <TiSocialLinkedin />
                    </Link>
                    <Link href="https://x.com/nav_venk"  className="flex flex-col items-center justify-center">
                        <TiSocialTwitter />
                    </Link>
                    <Link href="https://www.instagram.com/navin.pinkman/" className="flex flex-col items-center justify-center">
                        <FaInstagram />
                    </Link>
                    <Link href="https://github.com/NavinVenkatV/pingMe..git" className="flex flex-col items-center justify-center">
                        <FaGithub />
                    </Link>
                </div>
            </div>
            <div className="md:flex justify-between mt-3 text-xs md:text-sm">
                <div className="flex items-center justify-center gap-2 ">
                    <Links name="Terms of Use" href="/" />
                    <Links name="Privacy Policy" href="/" />
                </div>
                <div className="flex items-center justify-center gap-2 mt-3 md:mt-0">
                    @2025 pingMe, Inc
                    <div className="flex justify-center items-center">
                        <GiBlackHandShield />
                    </div>
                </div>
            </div>
        </div>
    )
}