'use client'
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { AlertCircle, Bot, ChevronDown, MessageCircle, Send } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
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
                        content: data.metadata.welcome_message || "hi! How can i help you how can i help you, today in tasukaai",
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
    }, [])

    const handleSend = async () => {

    }

    const handleSectionClick = (sectionName: string) => {
        setActiveSection(sectionName);
        const userMsg = { role: "user", content: sectionName, section: null };
        setMessages((prev) => [...prev, userMsg]);
        setInput("");
        setIsTyping(true);

        setTimeout(() => {
            setIsTyping(false);
            const aiMsg = {
                role: "assistant",
                content: `You can ask me any question related to ${sectionName}`,
                section: sectionName
            };
            setMessages((prev) => [...prev, aiMsg])
        }, 800);

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
                        <div className=' w-8 h-8 rounded-full flex items-center justify-center shrink-0 border border-white/5  overflow-hidden'>
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
                    className='p-2 text-zinc-400 hover:text-white  rounded-lg transition-colors cursor-pointer'
                    aria-label='Minimize Chat'
                >
                    <ChevronDown className='w-5 h-5' />
                </button>
            </div>
            <div className='flex-1 min-h-0 overflow-y-auto bg-zinc-950/30 p-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent '>
                <div className="space-y-6 pb-4">
                    {messages.map((msg, i) => (
                        <div
                            key={i}
                            className={cn(
                                "flex w-full",
                                msg.role === "user" ? "justify-end" : "justify-start"
                            )}
                        >
                            <div
                                className={cn(
                                    "flex max-w-[85%] gap-3 items-start",
                                    msg.role === "user" ? "flex-row-reverse" : "flex-row"
                                )}
                            >
                                {/* Assistant Avatar */}
                                {msg.role !== "user" && (
                                    <div className="flex items-center gap-2 shrink-0">
                                        <div className="relative">
                                            <div className="w-9 h-9 rounded-full overflow-hidden">
                                                <Image
                                                    src="https://images.unsplash.com/photo-1654110455429-cf322b40a906?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZSUyMHBpY3R1cmV8ZW58MHx8MHx8fDA%3D"
                                                    alt="profile"
                                                    width={32}
                                                    height={32}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>

                                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border border-[#0A0A0E]" />
                                        </div>
                                    </div>
                                )}

                                {/* Message Bubble */}
                                <div className="space-y-1">
                                    {msg.role !== "user" && (
                                        <div className="text-[11px] text-zinc-400 px-1">
                                            Support
                                        </div>
                                    )}

                                    <div
                                        className={cn(
                                            "px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm wrap-break-words",
                                            msg.role === "user"
                                                ? "bg-zinc-800 text-zinc-100 rounded-br-sm"
                                                : "bg-white text-zinc-900 rounded-bl-sm"
                                        )}
                                    >
                                        {msg.content}
                                    </div>

                                    {msg.isWelcome && sections.length > 0 && (
                                        <div className='animate-in fade-in slide-in-from-top-1 duration-300'>
                                            {sections.map((section) => (
                                                <button
                                                    key={section.id}
                                                    onClick={() => handleSectionClick(section.name)}
                                                    className='px-3 py-1.5 rounded-full border border-zinc-700 bg-zinc-800/50 hover:bg-zinc-700 hover:border-zinc-600 text-zinc-300 text-xs font-medium transation-all'
                                                >
                                                    {section.name}
                                                </button>
                                            ))}
                                        </div>
                                    )}

                                </div>
                            </div>
                        </div>
                    ))}
                    {isTyping && (
                        <div className='flex w-full justify-start'>
                            <div className='flex max-w-[85%] gap-3 flex-row'>
                                <div className="relative">
                                    <div className="w-9 h-9 rounded-full overflow-hidden">
                                        <Image
                                            src="https://images.unsplash.com/photo-1654110455429-cf322b40a906?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZSUyMHBpY3R1cmV8ZW58MHx8MHx8fDA%3D"
                                            alt="profile"
                                            width={32}
                                            height={32}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border border-[#0A0A0E]" />
                                </div>
                                <div className='p-4 rounded-2xl bg-white text-zinc-900 rounded-tl-sm shadow-sm flex items-center gap-1'>


                                    <div className="px-4 py-3 bg-white rounded-2xl flex gap-1">
                                        <div className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce" />
                                        <div className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce delay-100" />
                                        <div className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce delay-200" />
                                    </div>

                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={scrollViewportRef} />
                </div>
            </div>
            <div className='p-4 bg-[#0a0a0e] border-t border-white/5 shrink-0 z-20'>
                <div className='relative'>
                    <Textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        disabled={!activeSection}
                        placeholder={
                            activeSection ? "Type a Message..." : "Select a topic Above..."
                        }
                        className='min-h-12.5 max-h-30 pr-12 outline-none text-white/500 bg-zinc-900/50 border-white/10 resize-none rounded-xl disabled:opacity-50 disabled:cursor-not-allowed placeholder:text-zinc-600 focus:ring-1 focus:ring-white/20'
                    />
                    <Button
                        size="icon"
                        onClick={handleSend}
                        disabled={!activeSection || !input.trim()}
                        className="absolute right-2 bottom-2 h-8 w-8"
                        style={activeSection && input.trim() ? { backgroundColor: primaryColor } : {}}
                    >
                        <Send className="w-4 h-4 text-white" />
                    </Button>
                </div>
                <div className='mt-2 text-center'>
                    <Link href={"/"}
                        className='text-[10px] text-zinc-600 font-medium hover:text-zinc-500 transition-colors' target='_blank'
                    >
                        Power By TasukeAi.
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Page