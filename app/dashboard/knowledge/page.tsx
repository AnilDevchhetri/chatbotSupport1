'use client'
import QuickActions from '@/components/dashboard/knowledge/quickActions'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import React, { useState } from 'react'

const Knowledge = () => {

    const [defaultTab, setDefaultTab] = useState("website");
    const [isAddOpen, setIsAddOpen] = useState(false);

    const openModel = (tab: string) => {
        setDefaultTab(tab);
        setIsAddOpen(true);
    }

    return (
        <div className='p-6 md:p-8 space-y-8 max-w-7xl mx-auto animate-in fade-in duration'>
            <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4'>
                <div>
                    <h1 className='text-2xl font-semibold text-white tracking-tight'>
                        Knowledge Base
                    </h1>
                    <p className='text-sm text-zince-400 mt-1'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, repellendus. Soluta, perferendis!
                    </p>
                </div>
                <div className='flex items-center gap-2'>
                    <Button onClick={() => openModel("website")} className='bg-white text-black hover:bg-zinc-200'>
                        <Plus className='w-4 h-4 mr-2' />
                        Add Knowledge
                    </Button>
                </div>
            </div>


            {/* Quick ACtion  */}
            <QuickActions onOpenModal={openModel} />

        </div>
    )
}

export default Knowledge