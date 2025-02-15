"use client";
import React, { useEffect } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Role } from "@prisma/client";

const HeroSection: React.FC = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleSignIn = async () => {
    await signIn("google");
  };

  useEffect(() => {
    console.log(session?.user.role);

    if (session) {
      if (session.user.role === Role.AGENCY) {
        router.push("/agency/guards");
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
  return (
    <section className="relative max-w-screen-xl mx-auto py-4 px-4 md:px-8">
      <div className="absolute top-0 left-0 w-full h-full bg-white opacity-40"></div>
      <div className="relative z-10 gap-5 items-center lg:flex">
        <div className="flex-1 max-w-lg py-5 sm:mx-auto sm:text-center lg:max-w-max lg:text-left">
          <h3 className="text-3xl text-gray-800 font-semibold md:text-4xl">
            Real-time security intelligence{" "}
            <span className="text-indigo-600">at your fingertips</span>
          </h3>
          <p className="text-gray-500 leading-relaxed mt-3">
            Every Guard, Every Shift, Every Incident: Instantly Visible,
            Instantly Actionable.
          </p>
          <button
            className="mt-5 px-4 py-2 text-indigo-600 font-medium bg-indigo-50 rounded-full inline-flex items-center"
            onClick={handleSignIn}
          >
            Try it out
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 ml-1 duration-150"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </button>
        </div>
        <div className="flex-1 mt-5 mx-auto sm:w-9/12 lg:mt-0 lg:w-auto">
          <img
            src="https://i.postimg.cc/kgd4WhyS/container.png"
            alt="Hero Image"
            className="w-full"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
