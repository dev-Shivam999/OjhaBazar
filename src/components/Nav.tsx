"use client";

import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Nav = () => {
    const { data: session } = useSession();  
    const router = useRouter();

    const handleAuth = async () => {
        if (session?.user) {
            await signOut();
        } else {
            await signIn();
        }
    };

    return (
        <nav className="flex items-center justify-between px-4 py-2 bg-gray-100 shadow-md">
          
            <Link href="/">
                <h1 className="text-3xl text-black font-bold cursor-pointer">Shop</h1>
            </Link>

            <div className="flex gap-4">
               
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={() => (session?.user ? router.push("/cart") : signIn())}
                >
                    Cart
                </button>

               
                <button
                    className="bg-red-500 text-white px-4 py-2 rounded"
                    onClick={handleAuth}
                >
                    {session?.user ? "Logout" : "Login"}
                </button>
            </div>
        </nav>
    );
};

export default Nav;
