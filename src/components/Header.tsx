"use client";

import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Header() {
    const { data: session } = useSession();

    return (
        <header className="bg-gray-100 text-gray-800 shadow py-3 px-4 flex justify-between items-center">
            <nav className="flex gap-4 items-center">
                <Link href="/" className="hidden font-semibold text-lg hover:text-blue-600 md:block">
                    💰 BudgetApp
                </Link>
                <Link href="/" className="hover:text-blue-600 text-sm">Home</Link>
                <Link href="/dashboard" className="hover:text-blue-600 text-sm">Dashboard</Link>
            </nav>

            <div>
                {session?.user ? (
                    <button
                        onClick={() => signOut()}
                        className="text-sm bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                    >
                        Wyloguj
                    </button>
                ) : (
                    <button
                        onClick={() => signIn()}
                        className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                    >
                        Zaloguj
                    </button>
                )}
            </div>
        </header>
    );
}
