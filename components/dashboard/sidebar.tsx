'use client'
import { cn } from '@/lib/utils'
import { BookOpen, Bot, Layers, LayoutDashboard, MessageSquare, Settings } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'


const SIDEBAR_ITEMS = [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "Knowledge", href: "/dashboard/knowledge", icon: BookOpen },
    { label: "Sections", href: "/dashboard/sections", icon: Layers },
    { label: "Chatbot", href: "/dashboard/chatbot", icon: Bot },
    { label: "Conversations", href: "/dashboard/conversations", icon: MessageSquare },
    { label: "Settings", href: "/dashboard/settings", icon: Settings },

]

const Sidebar = () => {
    const pathName = usePathname();
    return (
        <div className='w-64 border-r border-white/5 bg-[#050509] flex flex-col h-screen fixed left-0 top-0 z-40 hidden md:flex'>
            <div className='h-16 flex items-center px-6 border-b border-white/5'>
                <div className='flex items-center gap-2'>
                    {/* logo mark */}
                    <div className='w-5 h-5 bg-white rounded-sm flex items-center justify-center'>
                        <div className='w-2.5 h-2.5 bg-black rounded-[1px]'></div>
                    </div>
                    <span className='text-sm font-medium tracking-tight text-white/90'>TasukeAi</span>
                </div>
            </div>

            <nav className='flex-1 p-4 space-y-1 overflow-y-auto'>
                {
                    SIDEBAR_ITEMS.map((item) => {
                        const isActive = pathName == item.href;
                        return (
                            <Link href={item.href} key={item.href}
                                className={cn("flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                                    isActive ? "bg-white/5 text-white"
                                        : "text-zinc-400 hover:text-white hover:bg-white/5"

                                )}
                            >
                                <item.icon className='w-4 h-4' />
                                {item.label}
                            </Link>
                        )
                    })
                }
            </nav>


        </div>
    )
}

export default Sidebar