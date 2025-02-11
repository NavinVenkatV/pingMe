"use client";

import { useRouter } from "next/navigation";

interface NameType {
    name: string;
    onSignIn?: () => void;
    link?: string;
}

export const Button = ({ name, onSignIn }: NameType) => {
    const router = useRouter(); 

    return (
        <button 
            className="px-2 py-1 bg-blue-500 hover:bg-blue-700 rounded-xl text-white transition duration-300 relative z-10" 
            onClick={onSignIn}
        >
            {name}
        </button>
    );
};
