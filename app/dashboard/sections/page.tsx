'use client'
import SectionFormFields from '@/components/dashboard/sections/sectionFormFields'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Plus } from 'lucide-react'
import React, { useEffect, useState } from 'react'



interface Section {
    id: string;
    name: string;
    description: string;
    sourceCount: number;
    source_ids?: string[];
    tone: Tone;
    scopeLabel: string;
    allowed_topics?: string;
    blocked_topics?: string;
    status: SectionStatus

}

interface KnowledgeSource {
    id: string;
    name: string;
    type: string;
    status: string;
}

const INITIAL_FORM_DATA: SectionFormData = {
    name: "",
    description: "",
    tone: "neutral",
    allowedTopics: "",
    blockedTopics: "",
    fallbackBehavior: "escalate"
}


const Page = () => {
    const [isSheetOpen, setIsSheetOpen] = useState(false);
    const [selectedSection, setSelectedSection] = useState<Section | null>(null);

    const [knowledgeSources, setKnowledgeSources] = useState<KnowledgeSource[]>([]);

    const [selectedSources, setSelectedSources] = useState<string[]>([]);
    const [isLoadingSources, setIsLoadingSources] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [sections, setSections] = useState(false);
    const [isLoadingSections, setIsLoadingSections] = useState(true);
    const [formData, setFormData] = useState<SectionFormData>(INITIAL_FORM_DATA);

    useEffect(() => {
        const fetchKnowledgeSources = async () => {
            try {
                const res = await fetch("/api/knowledge/fetch");
                const data = await res.json();
                setKnowledgeSources(data.sources || [])
            } catch (error) {
                console.error("Failed to fetch Knowledge sources: ", error)
            } finally {
                setIsLoadingSources(false);
            }
        }
        fetchKnowledgeSources();
    }, [])
    const handleCreateSection = async () => {
        setSelectedSection({
            id: "new",
            name: "",
            description: "",
            sourceCount: 0,
            tone: "neutral",
            scopeLabel: "",
            status: "draft"
        })
        setSelectedSources([])
        setFormData(INITIAL_FORM_DATA);
        setIsSheetOpen(true);

    }

    const isPreviewMode = selectedSection?.id !== "new";

    return (
        <div className='p-8 space-y-6'>
            <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4'>
                <div>
                    <h1 className='text-2xl font-semibold text-white tracking-tight'>
                        Sections
                    </h1>
                    <p className='text-sm text-zince-400 mt-1'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, repellendus. Soluta, perferendis!
                    </p>
                </div>
                <div className='flex items-center gap-2'>
                    <Button onClick={handleCreateSection} className='bg-white text-black hover:bg-zinc-200'>
                        <Plus className='w-4 h-4 mr-2' />
                        Create Section
                    </Button>
                </div>
            </div>
            {/* {cards} */}
            <Card className='borer-white/5 bg-[#0A0A0E]'>
                <CardContent className='p-0'>

                </CardContent>
            </Card>

            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                <SheetContent className='w-full sm:max-w-lg broder-l border-white/10 bg-[#0A0A0E] p-0 shadow-2xl flex flex-cl h-full'>
                    {
                        <>
                            <SheetHeader className='p-6 border-b border-white/5'>
                                <SheetTitle className='text-xl text-white'>
                                    {
                                        selectedSection?.id === "new"
                                            ? "create section" : "View Section"
                                    }
                                </SheetTitle>
                                <SheetDescription className='text-zinc-500'>
                                    {
                                        selectedSection?.id === "new"
                                            ? "Configure how the AI hebave for this specefice Topic"
                                            : "Review Section configruatin and data sources"
                                    }
                                </SheetDescription>
                            </SheetHeader>
                            <div className='flex-1 overflow-y-auto p-6 space-y-8'>
                                <SectionFormFields
                                    formData={formData}
                                    setFormData={setFormData}
                                    selectedSources={selectedSources}
                                    setSelectedSources={setSelectedSources}
                                    knowledgeSources={knowledgeSources}
                                    isLoadingSources={isLoadingSources}
                                    isDisabled={isPreviewMode}
                                />
                            </div>
                        </>
                    }
                </SheetContent>
            </Sheet>
        </div>
    )
}

export default Page