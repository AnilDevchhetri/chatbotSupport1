import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { Bot, RefreshCcw, Send, User } from 'lucide-react';
import React, { RefObject } from 'react'

interface ChatSimulatrProps {
    messages: any[],
    primaryColor: string,
    sections: Section[],
    input: string;
    setInput: (val: string) => void;
    handleSend: () => void;
    handleKeyDown: (e: React.KeyboardEvent) => void;
    handleSectionClick: (name: string) => void;
    activeSection: string | null;
    isTyping: boolean;
    handleReset: () => void;
    scrollRef: RefObject<HTMLDivElement | null>;

}

const ChatSimulator = ({
    messages,
    primaryColor,
    sections,
    input,
    setInput,
    handleSend,
    handleKeyDown,
    handleSectionClick,
    activeSection,
    isTyping,
    handleReset,
    scrollRef
}: ChatSimulatrProps) => {
    return (
        <Card className="flex flex-col h-full min-h-0 bg-[#0A0A0E] border border-white/5 rounded-2xl overflow-hidden">
            {/* Header */}
            <div className="h-14 shrink-0 border-b border-white/5 flex items-center justify-between px-4 bg-[#0E0E12]">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                    <span className="text-sm text-zinc-300">test</span>
                </div>
                <Button variant="ghost" size="sm" onClick={handleReset} className="h-8 text-zinc-500 hover:text-white">
                    <RefreshCcw className="w-3.5 h-3.5 mr-2" />
                    Reset
                </Button>
            </div>

            {/* Messages - Scrollbar hidden here */}
            <div
                className="flex-1 min-h-0 overflow-y-auto px-4 py-4 scrollbar-hide"
                style={{
                    scrollbarWidth: 'none', /* Firefox */
                    msOverflowStyle: 'none' /* IE/Edge */
                }}
            >
                {/* Inject this into your global CSS for Chrome/Safari support:
           .scrollbar-hide::-webkit-scrollbar { display: none; } 
        */}
                <div className="space-y-4">
                    {messages.map((msg, i) => (
                        <div key={i} className={cn("flex w-full", msg.role === "user" ? "justify-end" : "justify-start")}>
                            <div className="flex gap-3 max-w-[75%]">
                                <div className={cn("w-8 h-8 rounded-full flex items-center justify-center shrink-0 border border-white/5", msg.role === "user" ? "bg-zinc-800" : "")}
                                    style={msg.role !== "user" ? { backgroundColor: primaryColor } : {}}>
                                    {msg.role === "user" ? <User className="w-4 h-4 text-zinc-400" /> : <Bot className="w-4 h-4 text-white" />}
                                </div>
                                <div>
                                    <div className={cn("px-4 py-3 text-sm rounded-2xl leading-relaxed", msg.role === "user" ? "bg-zinc-800 text-zinc-200 rounded-tr-sm" : "bg-white text-zinc-900 rounded-tl-sm")}>
                                        {msg.content}
                                    </div>
                                    {msg.isWelcome && sections.length > 0 && (
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            {sections.map((section) => (
                                                <button key={section.id} onClick={() => handleSectionClick(section.name)} className="px-3 py-1 text-xs rounded-full border border-zinc-600 text-zinc-300 hover:bg-zinc-800">
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
                        <div className="flex justify-start">
                            <div className="flex gap-3 max-w-[75%]">
                                <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: primaryColor }}>
                                    <Bot className="w-4 h-4 text-white" />
                                </div>
                                <div className="px-4 py-3 bg-white rounded-2xl flex gap-1">
                                    <div className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce" />
                                    <div className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce delay-100" />
                                    <div className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce delay-200" />
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={scrollRef} />
                </div>
            </div>

            {/* Input */}
            <div className="p-3 shrink-0 border-t border-white/5 bg-[#0A0A0E]">
                <div className="relative">
                    <Textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        disabled={!activeSection}
                        placeholder={activeSection ? "Type a message..." : "Select a category to start"}
                        className="min-h-[44px] max-h-[120px] pr-12 text-sm text-white bg-zinc-900/50 border border-white/10 rounded-xl resize-none"
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
            </div>
        </Card>
    )
}

export default ChatSimulator