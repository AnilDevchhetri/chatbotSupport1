
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

import React, { useState } from 'react'

interface AddKnoledgeModalProps {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    defaultTab: string;
    setDefaultTab: (tab: string) => void;
    onImport: (data: any) => Promise<void>;
    isLoading: boolean;
    existingSources: KnowledgeSource[];

}


const AddKnoledgeModal = ({ isOpen, setIsOpen, defaultTab, setDefaultTab, onImport, isLoading, existingSources }: AddKnoledgeModalProps) => {
    const [webisteUrl, setWebsiteUrl] = useState("");
    const [docsTitle, setDocsTitle] = useState("");
    const [docsContent, setDocsContent] = useState("");
    const [uploadedFile, setUploadedFile] = useState<File | null>(null)
    const [error, setError] = useState<string | null>(null);
    return (<Dialog
        open={isOpen}
        onOpenChange={(open) => {
            setIsOpen(open);
            if (!open) setError(null)
        }}

    >
        <DialogContent className='sm:max-w[600px] bg-[#0E0E12] border-white/10 text-zinc-100 p-0 overflow-hidden gap-0'>
            <DialogHeader className='p-6 pb-2'>
                <DialogTitle>
                    Add New Source
                </DialogTitle>
                <DialogDescription className='text-zinc-500'>
                    Chose a content type to train your assistant
                </DialogDescription>
            </DialogHeader>
        </DialogContent>
    </Dialog>
    )
}

export default AddKnoledgeModal