'use client'

import Image from 'next/image'
import { useState } from 'react'

import { cn } from '@/utils/cn'

import no_auditions from './no_auditions.png'

export const NoAuditions = () => {
  const [flipped, setFlipped] = useState(false)

  return (
    <div className="pointer-events-none fixed inset-0 z-50 flex w-full flex-row items-end">
      <Image
        src={no_auditions}
        alt="No Auditions"
        className={cn(
          'pointer-events-auto w-1/2 transition-transform duration-1000 sm:w-1/4',
          flipped
            ? 'translate-x-[100%] rotate-y-180 sm:translate-x-[300%]'
            : 'translate-x-0 rotate-y-0',
        )}
        onClick={() => {
          setFlipped(!flipped)
        }}
      />
    </div>
  )
}
