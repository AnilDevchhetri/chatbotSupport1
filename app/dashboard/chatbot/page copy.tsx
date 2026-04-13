'use client'
import React, { useEffect, useRef, useState } from 'react'
import ChatSimulator from "@/components/dashboard/chatbot/chatSimulator"
import { ScrollArea } from '@/components/ui/scroll-area';
import AppearanceConfig from '@/components/dashboard/chatbot/appearanceConfig';
import EmbedCodeConfig from '@/components/dashboard/chatbot/embedCodeConfig';

interface ChatBotMetadata {
    id: string;
    user_email: string;
    color: string;
    welcome_message: string;
    created_at: string;
    source_ids: string[];
}

const ChatbotPage = () => {
    const [metadata, setMetadata] = useState<ChatBotMetadata | null>(null);
    const [sections, setSections] = useState<Section[]>([]);
    const [loading, setLoading] = useState(true);

    const [messages, setMessages] = useState<any[]>([]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [activeSection, setActiveSection] = useState<string | null>(null);
    const scrollViewportRef = useRef<HTMLDivElement>(null);

    const [primaryColor, setPrimaryColor] = useState("#4f46e5");
    const [welcomeMessage, setWeelcomeMessage] = useState("");
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        const fetchdata = async () => {
            try {
                const metaRes = await fetch("/api/chatbot/metadata/fetch");
                const metaData = await metaRes.json();
                setMetadata(metaData)
                if (metaData) {
                    setPrimaryColor(metaData.color || "#4f46e5")
                    setWeelcomeMessage(metaData.welcome_message || "Hi, How can i Help you");

                    setMessages([
                        {
                            role: "assistant",
                            content: metaData.welcome_message || "Hi, How can i Help you",
                            isWelcome: true,
                            section: null
                        }
                    ]);
                }
                const sectionsRes = await fetch("/api/section/fetch");
                if (sectionsRes.ok) {
                    const sectionData = await sectionsRes.json();
                    setSections(sectionData);
                }
            } catch (error) {
                console.log("error fetcing data", error)

            } finally {
                setLoading(false);
            }
        }
        fetchdata();
    }, [])


    useEffect(() => {
        if (scrollViewportRef.current) {
            scrollViewportRef.current.scrollIntoView({ behavior: 'smooth' })
        }
    }, [messages, isTyping])

    const handleSend = async () => {

    }
    const handleKeyDown = async (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    }
    const handleSectionClick = async (sectionName: string) => {
        setActiveSection(sectionName);
        const userMsg = { role: "user", content: sectionName, section: null }
        setMessages((prev) => [...prev, userMsg]);
        setInput("");
        setIsTyping(true);
        setTimeout(() => {
            setIsTyping(false);
            const aiMsg = {
                role: "assistant",
                'content': `You can ask me any queston related to "${sectionName}"`,
                section: sectionName
            }
            setMessages((prev) => [...prev, aiMsg])
        }, 800)
    }
    const handleReset = async () => {
        setActiveSection(null);
        setMessages([
            {
                role: "assistant",
                content: welcomeMessage,
                isWelcome: true,
                section: null
            }
        ])
    }


    const handleSave = async () => {

    }
    const hasChanges = metadata ? (primaryColor !== (metadata.color || "#4f46e5") || welcomeMessage !== (metadata.welcome_message || "Hi, How can i Help you")) : false
    return (
        <div className='p-6 md:p-8 max-w-400 mx-auto animate-in fade-in duration-500 h-[calc(100vh-64px)] flex flex-col gap-6'>
            <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4'>
                <div>
                    <h1 className='text-2xl font-semibold text-white tracking-tight'>
                        Chatbot Playground
                    </h1>
                    <p className='text-sm text-zince-400 mt-1'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, repellendus. Soluta, perferendis!
                    </p>
                </div>
            </div>
            <div className='grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-0 flex-1'>
                <div className='lg:col-span-7 flex flex-col min-h-0 h-full'>
                    <div className="flex-1 min-h-0">
                        <ChatSimulator
                            messages={messages}
                            primaryColor={primaryColor}
                            sections={sections}
                            input={input}
                            setInput={setInput}
                            handleSend={handleSend}
                            handleKeyDown={handleKeyDown}
                            handleSectionClick={handleSectionClick}
                            activeSection={activeSection}
                            isTyping={isTyping}
                            handleReset={handleReset}
                            scrollRef={scrollViewportRef}
                        />
                    </div>
                </div>
                <div className='lg:col-span-5 flex flex-col min-h-0'>
                    <ScrollArea className='flex-1 pr-4'>
                        <div className='space-y-6 pb-8'>
                            <AppearanceConfig
                                primaryColor={primaryColor}
                                setPrimaryColor={setPrimaryColor}
                                welcomeMessage={welcomeMessage}
                                setWelcomeMessage={setWeelcomeMessage}
                                handleSave={handleSave}
                                isSaving={isSaving}
                                hasChanges={hasChanges}
                            />
                            <EmbedCodeConfig
                                chatbotId={metadata?.id}
                            />
                        </div>
                    </ScrollArea>
                </div>
            </div>

        </div>
    )
}

export default ChatbotPage