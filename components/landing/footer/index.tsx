import React from "react";

const Footer = () => {
    return (
        <footer className="w-full border-t border-zinc-800 mt-24 px-6 md:px-16 py-12 bg-[#050509]">

            <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10">

                {/* LEFT - Brand */}
                <div>
                    <h2 className="text-xl font-semibold tracking-tight">
                        TasukeAI
                    </h2>
                    <p className="text-sm text-zinc-400 mt-3 max-w-sm">
                        AI-powered support that helps you answer customer questions instantly
                        with empathy and precision.
                    </p>
                </div>

                {/* CENTER - Links */}
                <div className="grid grid-cols-2 gap-6 text-sm">
                    <div>
                        <h3 className="text-zinc-300 mb-3">Product</h3>
                        <ul className="space-y-2 text-zinc-400">
                            <li className="hover:text-white cursor-pointer">Features</li>
                            <li className="hover:text-white cursor-pointer">Pricing</li>
                            <li className="hover:text-white cursor-pointer">Integrations</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-zinc-300 mb-3">Company</h3>
                        <ul className="space-y-2 text-zinc-400">
                            <li className="hover:text-white cursor-pointer">About</li>
                            <li className="hover:text-white cursor-pointer">Contact</li>
                            <li className="hover:text-white cursor-pointer">Privacy</li>
                        </ul>
                    </div>
                </div>

                {/* RIGHT - CTA */}
                <div className="flex flex-col justify-between">
                    <div>
                        <h3 className="text-zinc-300 mb-3">Get Started</h3>
                        <p className="text-sm text-zinc-400">
                            Start building your AI assistant today.
                        </p>
                    </div>

                    <button className="mt-6 w-full md:w-auto px-5 py-2.5 rounded-lg bg-white text-black text-sm font-medium hover:bg-zinc-200 transition">
                        Create Chatbot
                    </button>
                </div>
            </div>

            {/* Bottom */}
            <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-zinc-800 flex flex-col md:flex-row justify-between items-center text-xs text-zinc-500">
                <p>© {new Date().getFullYear()} TasukeAI. All rights reserved.</p>

                <div className="flex gap-4 mt-4 md:mt-0">
                    <span className="hover:text-white cursor-pointer">Terms</span>
                    <span className="hover:text-white cursor-pointer">Privacy</span>
                </div>
            </div>

        </footer>
    );
};

export default Footer;