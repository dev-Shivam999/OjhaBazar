"use client";

import React, { useEffect, useRef, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Nav = () => {
    const { data: session } = useSession();
    const router = useRouter();
    const [search, setSearch] = useState("");
    const [result, setResult] = useState([])
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (search.trim().length > 0) {
            if (timerRef.current) clearTimeout(timerRef.current);
            timerRef.current = setTimeout(async () => {
                try {
                    const response = await fetch(`/api/search?query=${search}`);
                    const result = await response.json();
                    setResult(result.products);
                } catch (error) {
                    console.error("Search error:", error);
                }
            }, 500);
        }

        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, [search]);

    const handleAuth = async () => {
        if (session?.user) {
            await signOut();
        } else {
            await signIn();
        }
    };

    return (
        <nav className="flex relative justify-between items-center px-4 py-2 bg-gray-100 shadow-md">
            <Link href="/">
                <h1 className="text-3xl text-black font-bold cursor-pointer">Shop</h1>
            </Link>

            <div>
                <input
                    type="search"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border-[2px] border-black rounded-xl outline-none bg-transparent text-black p-1"
                />
                <button>🔍</button>
            </div>

           {
                result.length > 0 && search.length > 0 &&
                <ul className="absolute top-[90%] bg-white text-black p-4 rounded-md  left-1/2 -translate-x-1/2">
                    {
                            result.map((data: any) => <li className=""><Link href={`/product/${data.id}`}>{data.title}</Link></li>)
                    }
                </ul>
           }

            <div className="flex gap-4">
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={() => (session?.user ? router.push("/cart") : signIn())}
                >
                    Cart
                </button>

                <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={handleAuth}>
                    {session?.user ? "Logout" : "Login"}
                </button>
            </div>
        </nav>
    );
};

export default Nav;
