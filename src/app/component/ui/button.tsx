"use client";


interface NameType {
    name: string;
    onSignIn?: () => void;
    link?: string;
}

export const Button = ({ name, onSignIn }: NameType) => {

    return (
        <button 
            className="px-2 py-1 w-full bg-blue-500 hover:bg-blue-700 rounded-xl text-white transition duration-300 relative z-10 flex justify-center items-center" 
            onClick={onSignIn}
        >
            {name}
        </button>
    );
};
