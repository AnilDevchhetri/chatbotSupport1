'use client'

import { cn } from '@/lib/utils';
import { Building2, ChevronLeft, Globe, LinkIcon, Sparkles } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react'
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Input } from '../ui/input';

interface InitialData {
    businessName: string;
    websiteUrl: string;
    externalLinks: string
}

const STEPS = [
    {
        id: "name",
        label: "Business Name",
        question: "What is the name of your business?",
        description: "This will be the identity of Your Organization",
        icon: Building2,
        placeholder: "e.g. Acme corp",
        type: "text",
        field: "businessName" as keyof InitialData

    },
    {
        id: "website",
        label: "Website",
        question: "What is your website URl?",
        description: "we will scrape data from her to train your chatbot",
        icon: Globe,
        placeholder: "e.g. wwww.anil.com.np",
        type: "url",
        field: "websiteUrl" as keyof InitialData

    },
    {
        id: "links",
        label: "Extra Context",
        question: "Any Other links to add?",
        description: "Add external links like notion pages or Help docs to ",
        icon: LinkIcon,
        placeholder: "http://notion.so/docs...",
        type: "textarea",
        badge: "Optional",
        field: "externalLinks" as keyof InitialData

    },
]


const Initialform = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState<InitialData>({
        businessName: "",
        websiteUrl: "",
        externalLinks: ""
    })

    const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

    const progress = ((currentStep + 1) / STEPS.length) * 100;

    const stepData = STEPS[currentStep];
    const Icon = stepData.icon;
    useEffect(() => {
        setTimeout(() => {
            if (inputRef.current) {
                inputRef.current.focus();
            }
        }, 300);
    }, [currentStep])

    const handleBack = () => {
        if (currentStep > 0) {
            setIsAnimating(true);
            setTimeout(() => {
                setCurrentStep((prev) => prev - 1);
                setIsAnimating(false)
            }, 300)
        }

    }

    const handleNext = async () => {
        if (isSubmitting) return;
        const currentField = STEPS[currentStep].field;
        const value = formData[currentField];
        if (currentStep < 2 && (!value || value.trim() === "")) return;

        if (currentStep < STEPS.length - 1) {
            setIsAnimating(true);
            setTimeout(() => {
                setCurrentStep((prev) => prev + 1);
                setIsAnimating(false)
            }, 300)
        } else {
            handleSubmit();
        }

    }

    const hanldeKeyDown = (e: React.KeyboardEvent) => {
        if (STEPS[currentStep].type === 'textarea') {
            if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
                e.preventDefault();
                handleNext();
            }
        }
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleNext();
        }
    }

    const handleSubmit = async () => {
        setIsSubmitting(true);
    }
    const isStepValid = currentStep >= 2 || (formData[stepData.field] && formData[stepData.field].trim() !== '');



    return (
        <div className='w-full max-w-xl mx-auto min-h-100 flex flex-col justify-center'>
            <div className='fixed top-0 left-0 w-full h-1 bg-white/5'>
                <div className='h-full bg-indigo-500 transition-all duration-500 ease-out' style={{ width: `${progress}%` }} />
            </div>
            <div className='fixed top-6 right-6 md:top-8 md:right-8 text-xs font-medium text-zinc-600 uppercase tracking-widest pointer-events-none fade-in'>
                your acocunt
            </div>
            {
                isSubmitting ? (
                    <div className='flex flex-col items-center justify-center text-center animate-in fade-in duration-700'>

                        <div className='relative mb-8 flex items-center justify-center'>

                            {/* Glow effect */}
                            <div className='absolute w-20 h-20 bg-indigo-500/20 blur-2xl rounded-full animate-pulse'></div>

                            {/* Icon box */}
                            <div className='relative w-16 h-16 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20'>
                                <Sparkles className='w-8 h-8 text-white animate-bounce' />
                            </div>

                        </div>

                        <h2 className='text-2xl font-medium text-white mb-2'>
                            Storing Your Organization Info!
                        </h2>

                        <p className='text-zinc-400'>
                            Scanning {formData.websiteUrl}...
                        </p>
                    </div>
                ) : (
                    <div className={cn("transition-all duration-300 ease-in-out transform",
                        isAnimating ? "opacity-0 translate-y-4 scale-95" : "opacity-100 translate-y-0 scale-100"
                    )}>
                        <div className='flex items-center justify-between mb-8'>
                            <div className='flex items-center gap-2'>
                                {currentStep > 0 && (
                                    <Button variant="ghost"
                                        size={"icon"}
                                        onClick={handleBack}
                                        className='text-zinc-500 hover:text-zinc-300 hover:bg-white/5 rounded-full -ml-2 w-8 h-8'
                                    >
                                        <ChevronLeft className='w-5 h-5' />
                                    </Button>
                                )}
                                <span className='text-xs font-medium text-indigo-400 uppercase tracking-wide'>
                                    Step {currentStep + 1} of {STEPS.length}

                                </span>
                            </div>
                        </div>


                        <div className='space-y-6'>
                            <div className='space-y-2'>
                                <h1 className='text-3xl md:text-4xl font-medium text-white leading-tight'>
                                    {stepData.question}
                                </h1>
                                <p className='text-lg text-zinc-500 font-light'>
                                    {stepData.description}
                                </p>
                            </div>
                            <div className='relative group'>
                                {stepData.type === 'textarea' ? (
                                    <Textarea ref={inputRef as any}
                                        value={formData[stepData.field] as string}
                                        onChange={(e) => {
                                            setFormData({
                                                ...formData,
                                                [stepData.field]: e.target.value
                                            })
                                        }}
                                    />
                                ) : (<Input />)
                                }
                            </div>

                        </div>


                    </div>
                )
            }

        </div>
    )
}

export default Initialform