import Script from 'next/script'
import React from 'react'

const page = () => {
    return (
        <div>

            <Script src="http://localhost:3000/widget.js" data-id="6367987a-b4aa-449f-81e7-4b6b849a22bb" defer></Script>
        </div>
    )
}

export default page