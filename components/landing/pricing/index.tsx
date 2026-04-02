'use client'
import React, { useState } from "react";

const plans = [
    {
        name: "Basic",
        monthly: 3299,
        yearly: 2399,
        features: [
            "1000 answers",
            "Limited customization",
            "Train AI with your data",
            "Unlimited chatbots",
        ],
        popular: false,
    },
    {
        name: "Pro",
        monthly: 4999,
        yearly: 3999,
        features: [
            "4000 messages",
            "Full customization",
            "Train AI with all data",
            "Analytics & charts",
            "Priority support",
        ],
        popular: true,
    },
];

const Pricing = () => {
    const [isYearly, setIsYearly] = useState(false);

    return (
        <section className="w-full py-24 px-6 md:px-16">

            {/* Header */}
            <div className="max-w-3xl mx-auto text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-semibold">
                    Simple Pricing
                </h2>

                {/* Toggle */}
                <div className="mt-8 flex items-center justify-center gap-4">
                    <span className={!isYearly ? "text-white" : "text-zinc-500"}>
                        Monthly
                    </span>

                    <button
                        onClick={() => setIsYearly(!isYearly)}
                        className="w-14 h-7 flex items-center bg-zinc-800 rounded-full p-1"
                    >
                        <div
                            className={`w-5 h-5 bg-white rounded-full transition ${isYearly ? "translate-x-7" : ""
                                }`}
                        />
                    </button>

                    <span className={isYearly ? "text-white" : "text-zinc-500"}>
                        Yearly
                    </span>
                </div>
            </div>

            {/* Cards */}
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">

                {plans.map((plan, i) => {
                    const price = isYearly ? plan.yearly : plan.monthly;

                    return (
                        <div
                            key={i}
                            className={`rounded-2xl p-8 flex flex-col justify-between border ${plan.popular
                                    ? "border-purple-500/40"
                                    : "border-zinc-800"
                                } bg-[#0a0a0f] relative`}
                        >

                            {/* Popular badge */}
                            {plan.popular && (
                                <div className="absolute top-4 right-4 text-xs px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full">
                                    Popular
                                </div>
                            )}

                            <div>
                                <h3 className="text-xl font-medium">{plan.name}</h3>

                                <div className="mt-4 text-4xl font-semibold">
                                    ¥{price}
                                    <span className="text-lg text-zinc-400"> /month</span>
                                </div>

                                <p className="text-zinc-400 text-sm mt-2">
                                    {isYearly ? "Billed yearly" : "Billed monthly"}
                                </p>

                                <ul className="mt-6 space-y-3 text-sm text-zinc-300">
                                    {plan.features.map((feature, idx) => (
                                        <li key={idx}>✔ {feature}</li>
                                    ))}
                                </ul>
                            </div>

                            <button
                                className={`mt-8 w-full py-3 rounded-xl transition ${plan.popular
                                        ? "bg-white text-black hover:bg-zinc-200"
                                        : "bg-zinc-800 hover:bg-zinc-700"
                                    }`}
                            >
                                {plan.popular ? "Upgrade to Pro" : "Get Started"}
                            </button>
                        </div>
                    );
                })}

            </div>
        </section>
    );
};

export default Pricing;