'use client'
import { cn } from '@/lib/utils';
import { AlertCircle, Bot, ChevronDown, MessageCircle } from 'lucide-react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'

interface ChatBotMetadata {
    id: string;
    color: string;
    welcome_message: string;
}
interface Section {
    id: string;
    name: string;
    source_id: string[]
}

const Page = () => {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const [metadata, setMetadata] = useState<ChatBotMetadata | null>(null);
    const [sections, setSections] = useState<Section[]>([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    const [messages, setMessages] = useState<any[]>([]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [activeSection, setActiveSection] = useState<string | null>(null);
    const scrollViewportRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        document.body.style.backgroundColor = "transparent";
        document.documentElement.style.backgroundColor = "transparent";

        if (typeof window !== undefined) {
            window.parent.postMessage(
                {
                    type: "resize",
                    width: "60px",
                    height: "60px",
                    borderRadius: "30px"
                },
                "*"
            )
        }
    }, [])
    const toggleOpen = () => {
        const newState = !isOpen;
        setIsOpen(newState);
        if (newState) {
            window.parent.postMessage(
                {
                    type: "resize",
                    width: "380px",
                    height: "520px",
                    borderRadius: "12px"
                },
                "*"
            )
        } else {
            window.parent.postMessage(
                {
                    type: "resize",
                    width: "60px",
                    height: "60px",
                    borderRadius: "30px"
                },
                "*"
            )
        }
    }

    useEffect(() => {
        if (!token) {
            setError("Missing session token");
            setLoading(false);
            return;
        }
        const fetchConfig = async () => {
            try {
                const res = await fetch(`/api/widget/config?token=${token}`);
                if (!res.ok) throw new Error("Failed to load widget configuration");

                const data = await res.json();
                setMetadata(data.metadata);
                setSections(data.sections || []);
                setMessages([
                    {
                        role: "assistant",
                        content: data.metadata.welcome_message || "hi! How can i help you",
                        isWelcome: true,
                        section: null
                    }
                ])
            } catch (error) {
                console.error(error);
                setError("Unable to laod chat. Please try agian later");
            } finally {
                setLoading(false);
            }
        }
        fetchConfig();
    }, [])


    useEffect(() => {
        if (scrollViewportRef.current) {
            scrollViewportRef.current?.scrollIntoView({ behavior: "smooth" })
        }
    })

    const handleSend = async () => {

    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    }

    const primaryColor = metadata?.color || "#4f46e5";
    if (loading) return null;
    if (error && isOpen) {
        return (
            <div className='flex flex-col items-center justify-center h-full '>
                <AlertCircle className='w-10 h-10 mb-2' />
                <p>{error}</p>
            </div>
        )
    }
    if (!isOpen) {
        return (
            <button onClick={toggleOpen}
                className='w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:brightness-110 transition-all text-white'
                style={{ backgroundColor: primaryColor }}
            >

                <MessageCircle className='w-8 h-8' />
            </button>
        )
    }
    return (
        <div className='flex flex-col h-screen bg-[#0A0A0E] overflow-hidden rounded-xl border border-white/10 shadow-2xl '>
            <div className='h-14 border-b border-white/5 flex items-cneter justify-between px-4 bg-[#0E0E12] shadow-sm shrink-0 z-20'>
                <div className='flex items-center gap-3 '>
                    <div className='relative'>
                        <div className=' w-8 h-8 rounded-full flex items-center justify-center overflow-hidden'>
                            <Image src="https://images.unsplash.com/photo-1654110455429-cf322b40a906?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZSUyMHBpY3R1cmV8ZW58MHx8MHx8fDA%3D" alt="profile" width={20} height={20} className="w-full h-full object-cover" />
                        </div>
                        <div className='absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full  '>
                        </div>
                    </div>
                    <div>
                        <h1 className='text-sm font-semibold text-white landing-none'>
                            Support
                        </h1>
                        <span className='text-[11px] text-emerald-400 font-medium'>Online</span>
                    </div>
                </div>
                <button
                    onClick={toggleOpen}
                    className='p-2 text-zinc-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors'
                    aria-label='Minimize Chat'
                >
                    <ChevronDown className='w-5 h-5' />
                </button>
            </div>
            <div className='flex-1 min-h-0 overflow-y-auto bg-zinc-950/30 p-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent '>
                <div className='space-y-6 pb-4'>
                    {messages.map((msg, i) => (
                        <div key={i}
                            className={cn(
                                "flex w-full flex-col",
                                msg.role === "user" ? "items-end" : "items-start"
                            )}
                        >
                            <div className={cn(
                                "flex max-w-[85%] gap=3",
                                msg.role === "user" ? "flex-row-reverse" : "flex-row"
                            )}>
                                {msg.role !== "user" && (
                                    <div className="flex items-center gap-2">
                                        <div className="relative">
                                            <div className="w-8 h-8 rounded-full flex items-center justify-center overflow-hidden">
                                                <Image
                                                    src="https://images.unsplash.com/photo-1654110455429-cf322b40a906?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZSUyMHBpY3R1cmV8ZW58MHx8MHx8fDA%3D"
                                                    alt="profile"
                                                    width={20}
                                                    height={20}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>

                                            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full"></div>
                                        </div>

                                        <div>
                                            <h1 className="text-sm font-semibold text-white leading-none">
                                                Support
                                            </h1>
                                            <span className="text-[11px] text-emerald-400 font-medium">
                                                Online
                                            </span>
                                        </div>
                                        <div className='absolute -bottom-0.5 -right-0.5 w-3 h-3'>

                                        </div>
                                    </div>
                                )}
                                <div className='space-y-2'>
                                    <div className={
                                        cn("p-3.5 rounded-2xl text-sm leading-relaxed shadow-sm", msg.role === "user"
                                            ? "bg-zinc-800 text-zinc-100 rounded-tr-sm"
                                            : "bg-white text-zinc-900 rounded-tl-sm"
                                        )
                                    }>
                                        {msg.content}
                                    </div>
                                </div>

                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Page