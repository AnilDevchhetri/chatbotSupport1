'use client'
import SectionFormFields from '@/components/dashboard/sections/sectionFormFields'
import SectionTable from '@/components/dashboard/sections/sectionTable'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Plus } from 'lucide-react'
import React, { useEffect, useState } from 'react'



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
    const [sections, setSections] = useState<Section[]>([]);
    const [isLoadingSections, setIsLoadingSections] = useState(true);
    const [formData, setFormData] = useState<SectionFormData>(INITIAL_FORM_DATA);


    useEffect(() => {
        fetchSections();
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



    const handleDeleteSection = async () => {

    }
    const handlePreviewSection = async (section: Section) => {
        setSelectedSection(section);
        setFormData({
            name: section.name,
            description: section.description,
            tone: section.tone,
            allowedTopics: section.allowed_topics || "",
            blockedTopics: section.blocked_topics || "",
            fallbackBehavior: "escalate",
        })
        setSelectedSources(section.source_ids || []);
        setIsSheetOpen(true);
    }
    const fetchSections = async () => {
        try {
            setIsLoadingSections(true);
            const res = await fetch("/api/section/fetch");
            const data = await res.json();
            const transformedSection: Section[] = data.map((section: any) => ({
                id: section.id,
                name: section.name,
                description: section.description,
                sourceCount: section.source_ids?.lenght || 0,
                source_ids: section.source_ids || [],
                tone: section.tone as Tone,
                scopeLabel: section.allowed_topics || "General",
                allowed_topcs: section.allowed_topics,
                blocked_topics: section.blocked_topics,
                status: section.status as SectionStatus,
            }));
            setSections(transformedSection);
        } catch (error) {
            console.log("failded to fetch sections:", error);
        } finally {
            setIsLoadingSections(false);
        }
    }
    const hanldeSaveSection = async () => {
        if (!formData.name.trim()) {
            alert("Please enter a section name!");
            return;
        }
        if (!formData.description.trim()) {
            alert("Please enter a description");
            return;
        }
        if (selectedSources.length === 0) {
            alert("Please Select at least one knowlege source");
            return;
        }
        setIsSaving(true);
        try {
            const sectionData = {
                ...formData,
                sourceIds: selectedSources,
                status: "active",
            }
            const response = await fetch("/api/section/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(sectionData)
            })
            console.log(response);
            if (!response.ok) {
                throw new Error("Faidl to create Section");
            }

            await fetchSections();
            setIsSheetOpen(false);

        } catch (error) {
            console.log("failed to save section", error);
        } finally {
            setIsSaving(false);
        }

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
                    <SectionTable
                        sections={sections}
                        isLoading={isLoadingSections}
                        onPreview={handlePreviewSection}
                        onCreateSection={handleCreateSection}
                    />
                </CardContent>
            </Card>

            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                <SheetContent className='w-full sm:max-w-lg broder-l border-white/10 bg-[#0A0A0E] p-0 shadow-2xl flex flex-cl h-full  [&>button]:text-white [&>button]:hover:bg-white/10[&>button]:hover:bg-white/10 [&>button]:hover:text-balck'>
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
                            <div className='flex-1 overflow-y-auto p-4 space-y-8'>
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
                            {selectedSection?.id === "new" && (
                                <div className='p-6 border-t border-white/5'>
                                    <Button
                                        className='w-full bg-white text-black hover:bg-zinc-500 hover:text-white'
                                        onClick={hanldeSaveSection}
                                        disabled={isSaving}
                                    >
                                        {isSaving ? "Creating..." : "Create Section"}
                                    </Button>
                                </div>
                            )}

                            {selectedSection?.id !== "new" && (
                                <div className='p-6 bg-red-500/5 border-t border-red-500/10'>
                                    <h5 className='text-sm font-medium text-red-400 mb-1'>
                                        Danger Zone
                                    </h5>
                                    <p className='text-xs text-red-500/70 mb-3'>
                                        Deleting this section will rmeovall all associated routing rules.
                                    </p>
                                    <Button
                                        variant={"destructive"}
                                        size={"sm"}
                                        className='w-full bg-red-500/10 text-red-500 border border-red-500/10'
                                        onClick={handleDeleteSection}
                                        disabled={isSaving}
                                    >
                                        {isSaving ? "Deleteing..." : "Delecte Setion"}

                                    </Button>
                                </div>
                            )}
                        </>
                    }
                </SheetContent>
            </Sheet>
        </div>
    )
}

export default Page