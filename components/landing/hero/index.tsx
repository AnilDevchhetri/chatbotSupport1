
import { ArrowRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import React from 'react'
import Image from 'next/image'

const Hero = () => {
    return (
        <section className='relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 overflow-hidden'>
            <div className='max-w-4xl mx-auto text-center relative z-20'>
                <div className='inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8 animate-float'>
                    <span className='w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]'></span>
                    <span className='text-xs text-zinc-300 tracking-wide font-light'>Verson 1.0.0 available now</span>
                </div>
                <h1 className='text-5xl md:text-7xl font-medium tracking-tight text-white mb-6 leading-[1.1] '>
                    Human-firendly Support <br /> <span className='text-zinc-500'>powered by AI.</span>
                </h1>
                <p className='text-lg md:text-xl text-zinc-400 font-light mb-10 max-w-2xl mx-auto leading-relaxed'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam quo necessitatibus consequuntur tempora non sit delectus quis. Quia, id porro! Esse quasi doloribus eius fuga.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20 ">
                    <Button variant="default" className='cursor-pointer py-5  hover:scale-[1.08] '>Start For Free <ArrowRight /></Button>
                    <Button variant="outline" className='text-black hover:scale-[1.08] cursor-pointer transition-transform py-5'>View Demo</Button>
                </div>
            </div>
            {/* floating chat interface visualizaiotn */}


            <div className="max-w-3xl mx-auto relative z-10">

                {/* Background Glow */}
                <div className="absolute inset-0 bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none" />

                {/* Actual Card */}
                <div className="rounded-2xl p-1 md:p-2 relative overflow-hidden ring-1 ring-white/10 bg-[#0a0a0e] shadow-2xl">

                    <div className="flex flex-col h-[500px] md:h-[600px] w-full bg-[#0a0a0e] rounded-xl overflow-hidden">

                        {/* 🔝 TOP BAR */}
                        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-white/5 backdrop-blur-md">

                            {/* LEFT - Company */}
                            <div className="flex items-center gap-2">
                                <div className="w-7 h-7 rounded-md bg-indigo-500 flex items-center justify-center text-white text-sm font-bold">
                                    T
                                </div>
                                <span className="text-white font-medium">TasukeAi</span>
                            </div>


                        </div>

                        {/* 💬 CHAT AREA */}
                        <div className="flex-1  p-6 overflow-y-auto space-y-6 bg-zinc-950/30">
                            <div className="flex w-full flex-col items-start">
                                <div className=' w-8 h-8 rounded-full flex items-center justify-center overflow-hidden'>
                                    <Image src="https://images.unsplash.com/photo-1654110455429-cf322b40a906?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZSUyMHBpY3R1cmV8ZW58MHx8MHx8fDA%3D" alt="profile" width={20} height={20} className="w-full h-full object-cover" />
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </section>
    )
}

export default Hero