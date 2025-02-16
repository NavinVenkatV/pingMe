"use client";


interface NameType {
    name: string;
    onSignIn?: () => void;
    link?: string;
}

export const Button = ({ name, onSignIn }: NameType) => {

    return (
        <button 
            className="px-2 py-1 w-full bg-[rgb(118,48,128)] hover:bg-[rgb(74,18,75)] rounded-xl text-white transition duration-300 relative z-10 flex justify-center items-center" 
            onClick={onSignIn}
        >
            {name}
        </button>
    );
};
