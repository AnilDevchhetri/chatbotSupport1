'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { conversation } from '@/db/schema';
import { cn } from '@/lib/utils';
import { Loader2, MessageSquare, MoreHorizontal, Search, Send, User } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react'

interface Conversation {
    id: string;
    user: string;
    lastMessage: string;
    time: string;
    email?: string;
    visitor_ip: string;
}

interface Message {
    id: string;
    role: "user" | "assistant";
    content: string;
    created_at: string;
}

const ConversationsPage = () => {
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [currentMessages, setCurrentMessages] = useState<Message[]>([])
    const [isLoadingList, setIsLoadingList] = useState(true);
    const [isLoadingMessages, setIsLoadingMessages] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const [replyContent, setReplyContent] = useState("");
    const [isSending, setIsSending] = useState(false);

    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchConversations = async () => {
            try {
                const res = await fetch("/api/conversations");
                const data = await res.json();
                setConversations(data.conversations || []);

            } catch (error) {
                console.error("Failed to fetch Covnersations", error);
            } finally {
                setIsLoadingList(false);
            }
        }
        fetchConversations();
    }, [])

    useEffect(() => {
        if (!selectedId) return;
        const fetchMessages = async () => {
            setIsLoadingMessages(true);
            try {
                const res = await fetch(`/api/conversations/${selectedId}/messages`);
                const data = await res.json();
                setCurrentMessages(data.messages || []);
            } catch (error) {
                console.error("Failed to fetch messages", error);
            } finally {
                setIsLoadingMessages(false);
            }
        }
        fetchMessages();
    }, [selectedId])

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [currentMessages, isLoadingMessages])

    const handleReplySend = async () => {
        if (!replyContent.trim() || !selectedId) return;
        setIsSending(true);
        try {
            const res = await fetch(`/api/conversations/${selectedId}/reply`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ content: replyContent })
            });
            if (res.ok) {
                const newMsg: Message = {
                    id: crypto.randomUUID(),
                    role: "assistant",
                    content: replyContent,
                    created_at: new Date().toISOString()
                }
                setCurrentMessages((prev) => [...prev, newMsg]);
                setReplyContent("");
            }

            setConversations((prev) =>
                prev.map((c) =>
                    c.id === selectedId
                        ? { ...c, lastMessage: replyContent, time: "Just now" }
                        : c
                )
            )

        } catch (error) {
            console.error("Failed to send reply", error);

        } finally {
            setIsSending(false);
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleReplySend();
        }
    }


    const filteredConversations = conversations.filter((c) =>
        c.user?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.lastMessage?.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const selectedConv = conversations?.find((c) => c.id === selectedId);


    return (
        <div className="flex h-[calc(100vh-64px)] overflow-hidden bg-black animate-in fade-in duration-500">

            {/* LEFT SIDE */}
            <div className="w-87.5 md:w-100 shrink-0 flex flex-col border-r border-white/5 bg-[#050509]">

                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-white/5">
                    <h1 className="font-semibold text-white">Inbox</h1>
                    <div className="text-xs text-zinc-500">
                        {filteredConversations.length} Conversations
                    </div>
                </div>

                {/* Search */}
                <div className="p-4 pt-3 border-b border-white/5">
                    <div className="relative">
                        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />

                        <Input
                            placeholder="Search..."
                            className="pl-9 bg-[#0A0A0E] border-white/10 text-sm"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                {/* Conversation List */}
                <div className="flex-1 min-h-0 overflow-hidden">
                    <ScrollArea className="h-full">
                        <div className="flex flex-col">

                            {isLoadingList ? (
                                <div className="flex items-center justify-center py-10">
                                    <Loader2 className="w-6 h-6 animate-spin text-zinc-400" />
                                </div>
                            ) : filteredConversations.length === 0 ? (
                                <div className="text-center py-10 text-zinc-500 text-sm">
                                    No Conversation found
                                </div>
                            ) : (
                                filteredConversations.map((conversation) => (
                                    <button
                                        key={conversation.id}
                                        onClick={() => setSelectedId(conversation.id)}
                                        className={cn(
                                            "flex flex-col gap-2 p-4 text-left transition-colors border-b border-white/5 hover:bg-white/5 w-full",
                                            selectedId === conversation.id
                                                ? "bg-white/5 border-l-2 border-l-indigo-500"
                                                : "border-l-2 border-l-transparent"
                                        )}
                                    >
                                        <div className="flex w-full flex-col gap-1">
                                            <div className="flex items-center justify-between gap-2">
                                                <span
                                                    className={cn(
                                                        "font-medium text-sm truncate max-w-[160px]",
                                                        selectedId === conversation.id
                                                            ? "text-white"
                                                            : "text-zinc-300"
                                                    )}
                                                >
                                                    {conversation.user}
                                                </span>

                                                <span className="text-[10px] text-zinc-500 shrink-0">
                                                    {conversation.time}
                                                </span>
                                            </div>

                                            <span className="text-xs text-zinc-500 truncate w-full">
                                                {conversation.lastMessage}
                                            </span>
                                        </div>
                                    </button>
                                ))
                            )}

                        </div>
                    </ScrollArea>
                </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="flex-1 min-w-0 flex flex-col bg-[#0a0a0e] overflow-hidden">

                {selectedConv ? (
                    <>
                        {/* Header */}
                        <div className="h-16 shrink-0 border-b border-white/5 flex items-center justify-between px-6 bg-[#0e0e12]">

                            <div className="flex items-center gap-3 min-w-0">
                                <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center shrink-0">
                                    <User className="w-4 h-4 text-zinc-400" />
                                </div>

                                <div className="min-w-0">
                                    <div className="flex items-center gap-2">
                                        <h2 className="font-medium text-white text-sm truncate">
                                            {selectedConv.user}
                                        </h2>

                                        {selectedConv.visitor_ip && (
                                            <span className="text-xs text-zinc-600 bg-zinc-900 px-3 py-0.5 rounded truncate">
                                                {selectedConv.visitor_ip}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <Button
                                variant={"ghost"}
                                size={"icon"}
                                className="h-8 w-8 text-zinc-400 shrink-0"
                            >
                                <MoreHorizontal className="w-4 h-4" />
                            </Button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 min-h-0 overflow-hidden">
                            <ScrollArea className="h-full">
                                <div className="p-6">

                                    {isLoadingMessages ? (
                                        <div className="flex items-center justify-center p-10">
                                            <Loader2 className="w-6 h-6 animate-spin text-zinc-500" />
                                        </div>
                                    ) : (
                                        <div className="max-w-3xl mx-auto space-y-6">

                                            {currentMessages.map((msg) => (
                                                <div
                                                    key={msg.id}
                                                    className={cn(
                                                        "flex w-full gap-3",
                                                        msg.role === "user"
                                                            ? "flex-row-reverse"
                                                            : "flex-row"
                                                    )}
                                                >
                                                    {/* Avatar */}
                                                    <div
                                                        className={cn(
                                                            "w-8 h-8 rounded-full flex items-center justify-center shrink-0 border border-white/5 overflow-hidden",
                                                            msg.role === "user"
                                                                ? "bg-zinc-800"
                                                                : "bg-indigo-600"
                                                        )}
                                                    >
                                                        {msg.role === "user" ? (
                                                            <User className="w-4 h-4 text-zinc-400" />
                                                        ) : (
                                                            <Image
                                                                src="https://images.unsplash.com/photo-1654110455429-cf322b40a906?fm=jpg&q=60&w=3000&auto=format&fit=crop"
                                                                alt="profile"
                                                                width={32}
                                                                height={32}
                                                                className="w-full h-full object-cover"
                                                            />
                                                        )}
                                                    </div>

                                                    {/* Message */}
                                                    <div
                                                        className={cn(
                                                            "flex flex-col gap-1 max-w-[70%]",
                                                            msg.role === "user"
                                                                ? "items-end"
                                                                : "items-start"
                                                        )}
                                                    >
                                                        <div
                                                            className={cn(
                                                                "p-3 rounded-lg text-sm leading-relaxed break-words",
                                                                msg.role === "user"
                                                                    ? "bg-zinc-800 text-zinc-200"
                                                                    : "bg-[#050509] border border-white/10 text-zinc-300"
                                                            )}
                                                        >
                                                            {msg.content}
                                                        </div>

                                                        <span className="text-[10px] text-zinc-600 px-1">
                                                            {msg.created_at
                                                                ? new Date(msg.created_at).toLocaleTimeString([], {
                                                                    hour: "2-digit",
                                                                    minute: "2-digit",
                                                                })
                                                                : ""}
                                                        </span>
                                                    </div>
                                                </div>
                                            ))}

                                            <div ref={messagesEndRef} className="h-1" />
                                        </div>
                                    )}

                                </div>
                            </ScrollArea>
                            <div className='p-4 border-t border-white/5 bg-[#0e0e12]'>
                                <div className='max-w-3xl mx-auto flex gap-2'>
                                    <Input
                                        value={replyContent}
                                        onChange={(e) => setReplyContent(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        placeholder='Type Your reply ...'
                                        className='bg-zinc-900/50 border-whtie/10 text-zinc-200 placeholder:text-zinc-600'
                                        disabled={isSending}
                                    />
                                    <Button
                                        onClick={handleReplySend}
                                        disabled={!replyContent.trim() || isSending}
                                        size="icon"
                                        className='bg-indigo-600 hover:bg-indigo-700 text-white'
                                    >
                                        {isSending ? (
                                            <Loader2 className='w-4 h-4 animate-spin' />
                                        ) : (
                                            <Send classNamew-4 h-4 />
                                        )
                                        }
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className='flex-1 flex flex-col items-center justify-center text-zinc-500 gap-2'>
                        <MessageSquare className='w-8 h-8 text-zinc-700' />
                        <p>Select a conversation to view details.</p>
                    </div>
                )
                }

            </div>
        </div>
    );
}

export default ConversationsPage