import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import React from 'react'

interface KnowledgeSource {
    id: string;
    name: string;
    type: string;
}

type SectionFormFieldsProps = {
    formData: SectionFormData;
    setFormData: (data: SectionFormData) => void;
    selectedSources: string[];
    setSelectedSources: (sources: string[]) => void;
    knowledgeSources: KnowledgeSource[];
    isLoadingSources: boolean;
    isDisabled: boolean;
}

const SectionFormFields = ({ formData, setFormData, selectedSources, setSelectedSources, knowledgeSources, isLoadingSources, isDisabled }: SectionFormFieldsProps) => {
    return (
        <>
            <div className='space-y-4'>
                <h4 className='text-xs font-semibold text-zinc-500 uppercase tracking-wider'>
                    Basics
                </h4>
                <div className='space-y-2'>
                    <Label className='text-zinc-300'>Section Name</Label>
                    <Input
                        placeholder='e.g. Billing Policy'
                        className='bg-white/2 border-white/10 text-white placeholder:text-white/10 '
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                </div>
                <div className='space-y-2'>
                    <Label className='text-zinc-300'>Description</Label>
                    <Textarea rows={4}
                        placeholder='When should the AI use this?'
                        className='bg-white/2 border-white/10 text-white placeholder:text-white/10 '
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                </div>
                <p className='text-[11px] text-zinc-500'>Used by hte rouding model to decied when to acitve this section.</p>
                <div className='space-y-4'>
                    <div className='flex items-center justify-between'>
                        <h4 className='text-xs font-semibold text-zinc-500 uppercase tracking-wider'>
                            Data Sources
                        </h4>
                        <span className='text-xs text-zinc-500'>
                            {selectedSources.length} attached
                        </span>
                    </div>
                    <Select value={selectedSources[0] || ""}
                        onValueChange={(value) => {
                            if (!selectedSources.includes(value)) {
                                setSelectedSources([...selectedSources, value])
                            }
                        }}
                        disabled={isDisabled}
                    >
                        <SelectTrigger
                            className='bg-white/2 border-white/10'
                        >
                            <SelectValue
                                placeholder={
                                    isLoadingSources ? "Loading sources..."
                                        : "Select Knowlege Sources..."
                                }
                            />

                        </SelectTrigger>
                    </Select>
                </div>
            </div>
        </>
    )
}

export default SectionFormFields