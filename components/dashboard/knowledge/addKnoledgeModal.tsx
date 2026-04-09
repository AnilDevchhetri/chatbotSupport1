
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';

import { AlertCircle, FileText, Globe, Loader2, Upload } from 'lucide-react';

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
    const [websiteUrl, setWebsiteUrl] = useState("");
    const [docsTitle, setDocsTitle] = useState("");
    const [docsContent, setDocsContent] = useState("");
    const [uploadedFile, setUploadedFile] = useState<File | null>(null)
    const [error, setError] = useState<string | null>(null);

    const validateUrl = (url: string) => {
        try {
            const parsed = new URL(url);
            return ["http:", "https:"].includes(parsed.protocol)
        } catch (error) {
            return false;
        }

    }

    const handleImportWrapper = async () => {
        setError(null);
        const data: any = { type: defaultTab }
        console.log(defaultTab);
        if (defaultTab === "website") {

            if (!websiteUrl) {
                setError("Please Enter a website url");
                return;
            }
            if (!validateUrl(websiteUrl)) {
                setError("Please enter a valid Url");
                return
            }

            const normalizeInput = websiteUrl.replace(/\/$/, "");
            const exists = existingSources.some((source) => {
                if (source.type !== "website" || !source.source_url) return false;
                const normalizedSource = source.source_url.replace(/\/$/, "");
                return normalizedSource === normalizeInput
            })
            if (exists) {
                setError("This website is already in you knowledge base.");
            }

            data.url = websiteUrl;


        } else if (defaultTab === "text") {
            if (!docsTitle.trim()) {
                setError("Please Ente a title.");
                return;
            }
            if (!docsContent.trim()) {
                setError("Please provide content.");
                return;
            }
            data.title = docsTitle;
            data.content = docsContent;
        } else if (defaultTab === "upload") {
            if (!uploadedFile) {
                setError("Please select a file to upload");
                return;
            }
            data.file = uploadedFile;
        }

        await onImport(data);
        setWebsiteUrl("");
        setDocsTitle("");
        setDocsContent("");
        setError(null);
        setUploadedFile(null)

    }
    return (<Dialog
        open={isOpen}
        onOpenChange={(open) => {
            setIsOpen(open);
            if (!open) setError(null)
        }}

    >
        <DialogContent className='sm:max-w-155  bg-[#0E0E12] border-white/10 text-zinc-100 p-0 overflow-hidden gap-0'>
            <DialogHeader className='p-6 pb-2'>
                <DialogTitle>
                    Add New Source
                </DialogTitle>
                <DialogDescription className='text-zinc-500'>
                    Chose a content type to train your assistant
                </DialogDescription>
            </DialogHeader>
            <Tabs
                defaultValue='website'
                value={defaultTab}
                onValueChange={(value) => { setDefaultTab(value); setError(null) }}
                className='w-full'
            >
                <div className='px-6 border-b border-white/5'>
                    <TabsList className='bg-transparent h-auto p-0 gap-6'>
                        <TabsTrigger value='website'
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
                    <TabsContent value='website' className='mt-0 space-y-4 animate-in fade-in duration-300'>
                        <div className='p-4 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-200 text-sm flex gap-3'>
                            <Globe className='w-5 h-5 shrink-0' />
                            <div>
                                <p className='font-medium'>Crawl Website</p>
                                <p className='text-xs text-indogo-300/80 mt-1 leading-relaxed'>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum sit harum minima!
                                </p>
                            </div>

                        </div>
                        <div className='space-y-3'>
                            <Label>Website Url</Label>
                            <Input placeholder='https://example.com'
                                className='bg-white/5 border-white/10 mt-1'
                                value={websiteUrl}
                                onChange={(e) => {
                                    setWebsiteUrl(e.target.value)
                                    if (error) setError(null)
                                }}
                            />
                        </div>
                    </TabsContent>
                    <TabsContent value='text' className='mt-0 space-y-4 animate-in fade-in duration-300'>
                        <div className='p-4 rounded-lg bg-purple-500/10 border border-indigo-500/20 text-indigo-200 text-sm flex gap-3'>
                            <FileText className='w-5 h-5 shrink-0' />
                            <div>
                                <p className='font-medium'>Raw Text</p>
                                <p className='text-xs text-purple-300/80 mt-1 leading-relaxed'>
                                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Alias, sit?
                                </p>
                            </div>
                        </div>
                        <div className='space-y-3'>
                            <Label>Title</Label>
                            <Input
                                placeholder='e.g. Refund Policy'
                                className='bg-white/5 border-white/10'
                                value={docsTitle}
                                onChange={(e) => setDocsTitle(e.target.value)}
                            />
                        </div>
                        <div className='space-y-3'>
                            <Label>Content</Label>
                            <Textarea
                                placeholder='Paste Text here...'
                                className='bg-white/5 border-white/10 h-32 resize-none'
                                value={docsContent}
                                onChange={(e) => setDocsContent(e.target.value)}
                            />
                        </div>
                    </TabsContent>

                    <TabsContent value='upload' className='mt-0 space-y-4 animate-in fade-in duration-300'>
                        <input type='file' id='csv-file-input'
                            accept='.csv,text/csv'
                            className='hidden'
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                    if (file.size > 10 * 1025 * 1024) {
                                        setError("File size must be less than 10Mb")
                                        return;
                                    }
                                }
                                if (!file?.name.endsWith(".csv") && file?.type !== "text/csv") {
                                    setError("Only Csv files are allowd");
                                    return
                                }
                                setUploadedFile(file);
                                setError(null);

                            }}
                        />
                        <div className='border-2 border-dashed border-white/10 rounded-xl h-60 flex flex-col items-center justify-center'
                            onClick={() => {
                                document.getElementById("csv-file-input")?.click();
                            }}
                        >
                            <div className='w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center '>
                                <Upload className='w-6 h-6 text-znic-400' />
                            </div>
                            <p className='text-sm font-medium text-white'>
                                {
                                    uploadedFile
                                        ? uploadedFile.name
                                        : "Click to upload or drag and drop"
                                }
                            </p>
                            <p className='text-xs text-zinc-500 mt-1'>Csv(max 10mb)</p>
                        </div>
                    </TabsContent>

                </div>


                <div className='p-6 border-6 border-white/5 bg-black/20 flex justify-end gap-3'>
                    <Button variant={"ghost"} onClick={() => setIsOpen(false)} className='text-zince-400 hover:text-white hover:bg-white/5'>Cancle</Button>
                    <Button className={`bg-white min-w-27.5 text-black hover:bg-zinc-200
                            ${isLoading ? "opacity-50 cursor-not-allowed" : ""
                        }
                    `}
                        onClick={handleImportWrapper}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <Loader2 className='w-4 h-4 mr-2 animate-spin' />
                        ) : (
                            "Import Source"
                        )

                        }

                    </Button>
                </div>

            </Tabs>
        </DialogContent>
    </Dialog>
    )
}

export default AddKnoledgeModal