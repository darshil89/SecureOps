"use client"

import { signOut } from "next-auth/react"
import { useSession } from "next-auth/react"
export default function Logout() {
    const session = useSession()

    const handleSignOut = async () => {
        await signOut()
    }

    return (
        <>
            {session && (
                <>
                <div className="relative hidden md:items-center md:justify-center md:inline-flex group">
                    <div className="absolute transition-all duration-200 rounded-full -inset-px bg-gradient-to-r from-cyan-500 to-purple-500 group-hover:shadow-lg group-hover:shadow-cyan-500/50"></div>
                    <button
                        onClick={handleSignOut}
                        className="relative inline-flex items-center justify-center px-6 py-2 text-base font-normal text-white bg-black border border-transparent rounded-full"
                    >
                        Logout
                    </button>
                </div>
            </>
            )}
        </>
    )
}