'use client'

import { Building2, Globe, LinkIcon } from 'lucide-react';
import React, { useState } from 'react'

interface InitialData {
    businessName: string;
    wwebsiteUrl: string;
    externalLinks: string
}

const STEPS = [
    {
        id: "name",
        label: "Business Name",
        question: "What is the name of your business?",
        description: "This will be the identity of Your AI assistant",
        icon: Building2,
        placeholder: "e.g. Acme corp",
        type: "text",
        field: "businessName " as keyof InitialData

    },
    {
        id: "website",
        label: "Website",
        question: "What is your website URl?",
        description: "we will scrape data from her to train your chatbot",
        icon: Globe,
        placeholder: "e.g. wwww.anil.com.np",
        type: "url",
        field: "wwebsiteUrl" as keyof InitialData

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
        wwebsiteUrl: "",
        externalLinks: ""
    })
    return (
        <div>I</div>
    )
}

export default Initialform