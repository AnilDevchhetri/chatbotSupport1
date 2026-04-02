import React from "react";
import {
    Globe,
    Cloud,
    Code2,
    Database,
    Cpu,
} from "lucide-react";

const companies = [
    { name: "Company One", icon: Globe },
    { name: "Company Two", icon: Cloud },
    { name: "Company Three", icon: Code2 },
    { name: "Company Four", icon: Database },
    { name: "Company Five", icon: Cpu },
];

const SocialProof = () => {
    return (
        <section className="py-12 border-y border-white/5 bg-black/20">
            <div className="max-w-6xl mx-auto px-6 text-center">

                {/* Heading */}
                <p className="text-xs font-medium text-zinc-500 uppercase tracking-widest mb-10">
                    Trusted by teams worldwide
                </p>

                {/* Logos */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 items-center">
                    {companies.map((company, index) => {
                        const Icon = company.icon;
                        return (
                            <div
                                key={index}
                                className="flex items-center justify-center gap-2 text-zinc-500 hover:text-white transition duration-300 opacity-70 hover:opacity-100"
                            >
                                <Icon className="w-5 h-5" />
                                <span className="text-sm font-medium">
                                    {company.name}
                                </span>
                            </div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
};

export default SocialProof;