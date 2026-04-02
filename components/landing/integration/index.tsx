'use client'
import React from "react";

const steps = [
    {
        title: "Login / Register",
        desc: "Create your account to get started instantly.",
    },
    {
        title: "Create Chatbot",
        desc: "Set up your AI assistant in a few clicks.",
    },
    {
        title: "Train with your data",
        desc: "Upload docs or connect your business data.",
    },
    {
        title: "Copy & Embed Script",
        desc: "Paste the code into your website and go live.",
    },
];

const scriptCode = `<script>
  window.chatbotConfig = {
    id: "YOUR_BOT_ID"
  };
</script>
<script src="https://yourdomain.com/chatbot.js"></script>`;

const Integration = () => {
    const copyToClipboard = () => {
        navigator.clipboard.writeText(scriptCode);
        alert("Copied!");
    };

    return (
        <section className="w-full py-24 px-6 md:px-16">

            <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start">

                {/* LEFT SIDE */}
                <div>
                    <h2 className="text-4xl md:text-5xl font-semibold tracking-tight">
                        Add AI to your website in minutes
                    </h2>

                    <p className="text-zinc-400 mt-6 text-lg leading-relaxed">
                        Go from idea to live AI assistant in just a few simple steps.
                        No coding required — just plug and play.
                    </p>

                    {/* Code Box */}
                    <div className="mt-10 border border-zinc-800 rounded-2xl p-5 bg-[#0a0a0f]">
                        <div className="flex justify-between mb-3">
                            <span className="text-xs text-zinc-500">Embed Script</span>
                            <button
                                onClick={copyToClipboard}
                                className="text-xs px-3 py-1 rounded-md bg-zinc-800 hover:bg-zinc-700 transition"
                            >
                                Copy
                            </button>
                        </div>

                        <pre className="text-xs text-zinc-300 whitespace-pre-wrap">
                            <code>{scriptCode}</code>
                        </pre>
                    </div>
                </div>

                {/* RIGHT SIDE - TIMELINE */}
                <div className="relative">

                    {/* Vertical line */}
                    <div className="absolute left-4 top-0 bottom-0 w-[2px] bg-zinc-800" />

                    <div className="space-y-10">
                        {steps.map((step, i) => (
                            <div key={i} className="relative flex items-start gap-6 group">

                                {/* Dot */}
                                <div className="relative z-10 w-8 h-8 flex items-center justify-center rounded-full bg-zinc-900 border border-zinc-700 group-hover:border-purple-500 transition">
                                    <span className="text-xs text-zinc-300">{i + 1}</span>
                                </div>

                                {/* Content */}
                                <div>
                                    <h3 className="text-lg font-medium">
                                        {step.title}
                                    </h3>
                                    <p className="text-sm text-zinc-400 mt-1">
                                        {step.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

            {/* Bottom note */}
            <p className="text-center text-zinc-500 text-sm mt-16">
                Paste this before your {"</body>"} tag and your chatbot is live 🚀
            </p>
        </section>
    );
};

export default Integration;