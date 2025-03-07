"use client"

import { signIn, signOut, useSession } from "next-auth/react"
import { FC } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Role } from "@prisma/client";

const Login: FC = () => {
    const { data: session, status } = useSession();
    const router = useRouter();

    const handleSignIn = async () => {
       await signIn("google");
    };


    useEffect(() => {
        console.log(session?.user.role);
    
        if (session) {
          if (session.user.role === Role.AGENCY) {
            router.push("/agency/dashboard");
          }
          if (session.user.role === Role.GUARD) {
            router.push("/guard/dashboard");
          }
          if (session.user.role === Role.POLICE) {
            router.push("/police/dashboard");
          }
          if (session.user.role === Role.USER) {
            router.push("/user/dashboard");
          }
        }
      }, [session]);

    return (<>
        {!session && (
            <>
                <div className="relative hidden md:items-center md:justify-center md:inline-flex group">
                    <div className="absolute transition-all duration-200 rounded-full -inset-px bg-gradient-to-r from-cyan-500 to-purple-500 group-hover:shadow-lg group-hover:shadow-cyan-500/50"></div>
                    <button
                        onClick={handleSignIn}
                        className="relative inline-flex items-center justify-center px-6 py-2 text-base font-normal text-white bg-black border border-transparent rounded-full"
                    >
                        Login
                    </button>
                </div>
            </>
        )}</>)
};

export default Login;