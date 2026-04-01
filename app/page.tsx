import Hero from '@/components/landing/hero'
import NavBar from '@/components/landing/nav'
import React from 'react'

const Page = () => {
  return (
    <main className='w-full flex flex-col relative z-10'>
      <NavBar />
      <Hero />
    </main>
  )
}

export default Page

//38