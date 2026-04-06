
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertCircle } from 'lucide-react';

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
            <Tabs
                defaultValue='webiste'
                value={defaultTab}
                onValueChange={(value) => { setDefaultTab(value); setError(null) }}
                className='w-full'
            >
                <div className='px-6 border-b border-white/5'>
                    <TabsList className='bg-transparent h-auto p-0 gap-6'>
                        <TabsTrigger value='webiste'
                            className='data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-indigo-500 roudned-none px-0 py-3 text-xs uppercase tracking-wider text-zinc-500 data-[state=active]:text-white transition-all focus-visible:ringe-0 focus-visible:ring-offset-0 foucs-visible:outline-none focus:outline-none ring-0 outline-none border-t-0 border-x-0'
                        >
                            Website
                        </TabsTrigger>
                        <TabsTrigger value='text'
                            className='data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-indigo-500 rounded-none px-0 py-3 text-xs uppercase tracking-wider text-zinc-500 data-[state=active]:text-white transition-all focus-visible:ringe-0 focus-visible:ring-offset-0 foucs-visible:outline-none focus:outline-none ring-0 outline-none border-t-0 border-x-0'
                        >
                            Q&A/TEXT
                        </TabsTrigger>
                        <TabsTrigger value='upload'
                            className='data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-indigo-500 rounded-none px-0 py-3 text-xs uppercase tracking-wider text-zinc-500 data-[state=active]:text-white transition-all focus-visible:ringe-0 focus-visible:ring-offset-0 foucs-visible:outline-none focus:outline-none ring-0 outline-none border-t-0 border-x-0'
                        >
                            File Upload
                        </TabsTrigger>
                    </TabsList>
                </div>

                <div className='p-6 min-h-50 space-y-5'>
                    {
                        error && (
                            <Alert variant={"destructive"}
                                className='bg-red-500/10 broder-red-500/20 text-red-400'
                            >
                                <AlertCircle className='h-4 w-4' />
                                <AlertDescription className='ml-2 text-xs'>
                                    {error}
                                </AlertDescription>

                            </Alert>
                        )
                    }
                    <TabsContent value='webiste' className='mt-0 space-y-4 animate-in fade-in duration-300'>

                    </TabsContent>
                </div>

            </Tabs>
        </DialogContent>
    </Dialog>
    )
}

export default AddKnoledgeModal