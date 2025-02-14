
"use client";
import React from "react";

interface Stat {
    data: string;
    title: string;
}

const StatsSection: React.FC = () => {
    const stats: Stat[] = [
        {
            data: "$350B+",
            title: "Security Market by 2030"
        },
        {
            data: "70%",
            title: "Surge in Smart Security Demand "
        },
        {
            data: "$10B",
            title: "Lost Annually Due to Inefficiencies"
        },
        {
            data: "25%",
            title: "Guards Misallocated or Underutilized"
        },
    ];

    return (
        <section className="py-14 bg-zinc-100">
            <div className="max-w-screen-xl mx-auto px-4 text-gray-600 gap-x-12 items-start justify-between lg:flex md:px-8">
                <div className="sm:hidden lg:block lg:max-w-xl">
                    <img 
                        src="https://images.unsplash.com/photo-1622675363311-3e1904dc1885?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" 
                        className="rounded-lg" 
                        alt="Statistics Image" 
                    />
                </div>
                <div className="mt-6 gap-12 sm:mt-0 md:flex lg:block">
                    <div className="max-w-2xl">
                        <h3 className="text-gray-800 text-3xl font-semibold sm:text-4xl">
                            Interesting Question: Why SecureOps?
                        </h3>
                        <p className="mt-3 max-w-xl">
                        Real-time tracking, automated attendance, and smart deployment reduce inefficiencies.
                        </p>
                    </div>
                    <div className="flex-none mt-6 md:mt-0 lg:mt-6">
                        <ul className="inline-grid gap-y-8 gap-x-14 grid-cols-2">
                            {stats.map((item, idx) => (
                                <li key={idx}>
                                    <h4 className="text-4xl text-indigo-600 font-semibold">{item.data}</h4>
                                    <p className="mt-3 font-medium">{item.title}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default StatsSection;
