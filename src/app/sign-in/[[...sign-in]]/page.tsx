"use client";

import { SignIn } from '@clerk/nextjs'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Page() {

  return (
    <div className='flex items-center justify-center min-h-screen'>
      <SignIn />
    </div>
  )
}