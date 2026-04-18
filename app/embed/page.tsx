'use client'
import { AlertCircle, MessageCircle } from 'lucide-react';
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
                className='w-14 h-14 rounded-full flex items-center justify-center'
                style={{ backgroundColor: primaryColor }}
            >
                <MessageCircle className='w-8 h-8' />
            </button>
        )
    }
    return (
        <div>

        </div>
    );
}

export default Page