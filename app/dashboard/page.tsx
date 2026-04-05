'use client'
import Initialform from '@/components/dashboard/initialform'
import React, { useEffect, useState } from 'react'


const Page = () => {
    const [isMetaDataAvailable, setIsMetaDataAvailable] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchMetadata = async () => {
            const response = await fetch("/api/metadata/fetch");
            const data = await response.json();
            setIsMetaDataAvailable(data.exists);
            setIsLoading(false);
            console.log(data)
        }
        fetchMetadata();
    }, [])

    if (isLoading) {
        <div className='flex-1 flex w-full items-center justify-center p-4' />
    }

    return (
        <div className='flex-1 flex w-full'>

            {
                !isMetaDataAvailable ? (
                    <div className='w-full flex items-center justify-center p-4 min-h-[cal(100vh -10)'>

                        <Initialform />
                    </div>
                ) : (
                    <>

                    </>
                )
            }


        </div>
    )
}

export default Page
