import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';
import React from 'react'

const QuickActions = ({ onOpenModal }: { onOpenModal: (tab: string) => void; }) => {
    return (
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            <Button
                className='h-auto py-8 px-6 flex flex-col items-center justify-center gap-4 border-white/5 bg-[#0A0A0E] hover:border-indigo-500/30 transition-all hover:text-white group whitespace-normal'
                onClick={() => onOpenModal("website")}
            >
                <div className='p-3 rounded-full bg-indigo-500/10 border border-indigo-500/20 group-hover:bg-indigo-500/20 transition-colors'>
                    <Globe className='w-6 h-6 text-indigo-400' />
                </div>

                <div className='space-y-1.5 text-center w-full'>
                    <span className='text-sm font-medium block whitespace-bormal'>
                        Add Website
                    </span>
                    <p className='text-xs text-zinc-500 font-normal leading-relaxed whitespace-normal wrap-break-word'>
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusamus delectus, sint culpa ut voluptate dolore mollitia possimus quia maxime laborum!
                    </p>
                </div>


            </Button>

            <Button
                className='h-auto py-8 px-6 flex flex-col items-center justify-center gap-4 border-white/5 bg-[#0A0A0E] hover:border-indigo-500/30 transition-all hover:text-white group whitespace-normal'
                onClick={() => onOpenModal("upload")}
            >

            </Button>


        </div>
    )
}

export default QuickActions