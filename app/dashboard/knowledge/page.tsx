'use client'
import AddKnoledgeModal from '@/components/dashboard/knowledge/addKnoledgeModal'
import KnowledgeTable from '@/components/dashboard/knowledge/knowledgeTable'
import QuickActions from '@/components/dashboard/knowledge/quickActions'
import SourceDetailSheet from '@/components/dashboard/knowledge/sourceDetailSheet'
import { Button } from '@/components/ui/button'
import { KnownKeysOnly } from 'drizzle-orm'
import { Plus } from 'lucide-react'
import React, { useEffect, useState } from 'react'

const Knowledge = () => {

    const [defaultTab, setDefaultTab] = useState("website");
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [KnowledgeStoringLoader, setKnowledgeStoringLoader] = useState(false);
    const [knowledgSourcesLoader, setKnowledgeSourcesLoader] = useState(true);
    const [knowledgeSources, setKnowledgeSources] = useState<KnowledgeSource[]>([]);

    const [selectedSource, setSelectedSource] = useState<KnowledgeSource | null>(null);
    const [isSheetOpen, setIsSheetOpen] = useState(false);

    const openModel = (tab: string) => {
        setDefaultTab(tab);
        setIsAddOpen(true);
    }

    useEffect(() => {

        const fetchKnowledgeSource = async () => {
            setKnowledgeSourcesLoader(true)
            const res = await fetch("/api/knowledge/fetch");
            const data = await res.json();
            setKnowledgeSources(data.source);
            setKnowledgeSourcesLoader(false)
        }
        fetchKnowledgeSource();
    }, [])

    const handleImportSource = async (data: any) => {
        setKnowledgeStoringLoader(true);
        console.log("data.type is ", data.type)
        try {
            let response;
            if (data.type === "upload" && data.file) {
                const formData = new FormData();
                formData.append("type", "upload");
                formData.append("file", data.file);
                response = await fetch("/api/knowledge/store", {
                    method: "POST",
                    body: formData,
                })

            } else {
                response = await fetch("/api/knowledge/store", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data)
                });
            }

            if (!response.ok) throw new Error("Failded to store source")

            const res = await fetch("/api/knowledge/fetch");
            const newData = await res.json();
            setKnowledgeSources(newData.source)

        } catch (error) {
            console.error(error);
        } finally {
            setKnowledgeStoringLoader(false)
        }

    }

    const hanldeSourceClick = (source: KnowledgeSource) => {
        setSelectedSource(source);
        setIsSheetOpen(true);

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

            <KnowledgeTable
                sources={knowledgeSources}
                onSourceClick={hanldeSourceClick}
                isLoading={knowledgSourcesLoader}
            />

            {/* Add model comoetn */}
            <AddKnoledgeModal
                isOpen={isAddOpen}
                setIsOpen={setIsAddOpen}
                defaultTab={defaultTab}
                setDefaultTab={setDefaultTab}
                onImport={handleImportSource}
                isLoading={KnowledgeStoringLoader}
                existingSources={knowledgeSources}
            />


            <SourceDetailSheet
                isOpen={isSheetOpen}
                setIsOpen={setIsSheetOpen}
                selectedSource={selectedSource}

            />

        </div>
    )
}

export default Knowledge