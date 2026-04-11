import React from 'react'
import ChatSimulator from "@/components/dashboard/chatbot/chatSimulator"
const ChatbotPage = () => {
    return (
        <div className='p-6 md:p-8 space-y-8 max-w-400 mx-auto animate-in fade-in duration-500 h-[calc(100vh-64px)] overflow-hidden flex flex-col'>
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
            <div className='grid grid-cols-1 lg:grid-cols-12 gap-6 h-full mn-h-0'>
                <div className='lg:col-span-7 glex flex-col h-full min-h-0 space-y-4'>
                    <ChatSimulator />
                </div>
            </div>
        </div>
    )
}

export default ChatbotPage