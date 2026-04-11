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
        <div>ChatSimulator</div>
    )
}

export default ChatSimulator