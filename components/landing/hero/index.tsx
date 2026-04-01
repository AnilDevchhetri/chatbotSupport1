import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import React from 'react'

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
            <div className='max-w-3xl mx-auto relative z-10'>

            </div>
        </section>
    )
}

export default Hero