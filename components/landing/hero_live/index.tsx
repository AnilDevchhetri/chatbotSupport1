"use client";

import React, { useEffect, useState } from "react";
import { Send, User } from "lucide-react";
import Image from "next/image";

type Message = {
    type: "user" | "bot";
    text: string;
};

const chatFlow: Message[] = [
    { type: "user", text: "Hey, how does your pricing work?" },
    { type: "bot", text: "Great question! We offer flexible plans based on usage." },
    { type: "user", text: "Do you have a free trial?" },
    { type: "bot", text: "Yes! You can try it free for 14 days 🚀" },
    { type: "user", text: "Can I cancel anytime?" },
    { type: "bot", text: "Absolutely, no long-term contracts required." },
];

const HeroLive = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputText, setInputText] = useState("");
    const [botTyping, setBotTyping] = useState(false);
    const [botText, setBotText] = useState("");

    useEffect(() => {
        startLoop();
    }, []);

    const delay = (ms: number) =>
        new Promise((res) => setTimeout(res, ms));

    const typeUser = async (text: string) => {
        setInputText("");
        for (let i = 0; i < text.length; i++) {
            setInputText((prev) => prev + text[i]);
            await delay(25);
        }
    };

    const sendUser = async (text: string) => {
        await delay(400);
        setMessages((prev) => [...prev, { type: "user", text }]);
        setInputText("");
    };

    const typeBot = async (text: string) => {
        setBotTyping(true);
        await delay(1000);
        setBotTyping(false);

        let temp = "";
        for (let i = 0; i < text.length; i++) {
            temp += text[i];
            setBotText(temp);
            await delay(20);
        }

        setMessages((prev) => [...prev, { type: "bot", text }]);
        setBotText("");
    };

    const startLoop = async () => {
        while (true) {
            setMessages([]);

            for (const msg of chatFlow) {
                if (msg.type === "user") {
                    await typeUser(msg.text);
                    await sendUser(msg.text);
                } else {
                    await typeBot(msg.text);
                }
            }

            await delay(2500); // wait before restart
        }
    };

    return (
        <section className="py-24 px-6">
            <div className="max-w-3xl mx-auto">
                <div className="rounded-2xl p-2 bg-[#0a0a0e] ring-1 ring-white/10 shadow-2xl">
                    <div className="flex flex-col h-[550px] rounded-xl overflow-hidden bg-[#0a0a0e]">

                        {/* 🔝 TOP BAR */}
                        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-white/5 backdrop-blur-md">
                            <div className="flex items-center gap-2">
                                <div className="w-7 h-7 rounded-md bg-indigo-500 flex items-center justify-center text-white text-sm font-bold">
                                    T
                                </div>
                                <span className="text-white font-medium">TasukeAI</span>
                            </div>
                        </div>

                        {/* 💬 CHAT */}
                        <div className="flex-1 p-6 space-y-6 overflow-y-auto">

                            {/* Messages */}
                            {messages.map((msg, idx) => (
                                <div
                                    key={idx}
                                    className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"
                                        }`}
                                >
                                    <div className="flex gap-3 max-w-[75%]">

                                        {msg.type === "bot" && (
                                            <Image
                                                src="https://images.unsplash.com/photo-1654110455429-cf322b40a906"
                                                alt="bot"
                                                width={32}
                                                height={32}
                                                className="rounded-full"
                                            />
                                        )}

                                        <div
                                            className={`p-3 rounded-2xl text-sm ${msg.type === "user"
                                                ? "bg-zinc-800 text-white rounded-tr-sm"
                                                : "bg-white text-black rounded-tl-sm"
                                                }`}
                                        >
                                            {msg.text}
                                        </div>

                                        {msg.type === "user" && (
                                            <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center">
                                                <User className="w-4 h-4 text-zinc-400" />
                                            </div>
                                        )}

                                    </div>
                                </div>
                            ))}

                            {/* 🤖 BOT THINKING */}
                            {botTyping && (
                                <div className="flex justify-start gap-3">
                                    <Image
                                        src="https://images.unsplash.com/photo-1654110455429-cf322b40a906"
                                        alt="bot"
                                        width={32}
                                        height={32}
                                        className="rounded-full"
                                    />
                                    <div className="bg-white text-black px-4 py-2 rounded-2xl text-sm">
                                        thinking...
                                    </div>
                                </div>
                            )}

                            {/* 🤖 BOT TYPING */}
                            {botText && (
                                <div className="flex justify-start gap-3">
                                    <Image
                                        src="https://images.unsplash.com/photo-1654110455429-cf322b40a906"
                                        alt="bot"
                                        width={32}
                                        height={32}
                                        className="rounded-full"
                                    />
                                    <div className="bg-white text-black px-4 py-2 rounded-2xl text-sm">
                                        {botText}
                                        <span className="animate-pulse">|</span>
                                    </div>
                                </div>
                            )}

                        </div>

                        {/* ⌨️ INPUT */}
                        <div className="p-4 border-t border-white/10">
                            <div className="flex items-center gap-3 bg-zinc-900 px-4 py-3 rounded-xl border border-white/10">

                                <span className="text-zinc-400 flex-1">
                                    {inputText || "Type a message"}
                                </span>

                                <button className="h-8 w-8 bg-zinc-800 rounded-lg flex items-center justify-center">
                                    <Send className="w-4 h-4 text-white" />
                                </button>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroLive;