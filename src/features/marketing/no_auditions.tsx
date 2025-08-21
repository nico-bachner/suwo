'use client'

import Image from 'next/image'
import { useState } from 'react'

import { cn } from '@/utils/cn'

import no_auditions from './no_auditions.png'

enum Position {
  TOP_LEFT = 'top-left',
  TOP_RIGHT = 'top-right',
  BOTTOM_LEFT = 'bottom-left',
  BOTTOM_RIGHT = 'bottom-right',
}

const getPosition = (position: Position) => {
  switch (position) {
    case Position.BOTTOM_LEFT:
      return 'translate-x-0 translate-y-0 rotate-y-0'
    case Position.BOTTOM_RIGHT:
      return 'translate-x-[calc(100vw-100%)] translate-y-0 rotate-y-180'
    case Position.TOP_LEFT:
      return 'translate-x-0 translate-y-[calc(100%+100px-100vh)] rotate-y-0'
    case Position.TOP_RIGHT:
      return 'translate-x-[calc(100vw-100%)] translate-y-[calc(100%+100px-100vh)] rotate-y-180'
  }
}

export const NoAuditions = () => {
  const [position, setPosition] = useState<Position>(Position.BOTTOM_LEFT)

  return (
    <div className="pointer-events-none fixed inset-0 z-20 flex h-full w-full flex-row items-end">
      <Image
        src={no_auditions}
        alt="No Auditions"
        className={cn(
          'pointer-events-auto transition-transform duration-1000',
          getPosition(position),
        )}
        style={{
          width: 'min(50vw, 50vh)',
        }}
        onClick={() => {
          setPosition((prev) => {
            switch (prev) {
              case Position.BOTTOM_LEFT:
                return Position.BOTTOM_RIGHT
              case Position.BOTTOM_RIGHT:
                return Position.TOP_LEFT
              case Position.TOP_LEFT:
                return Position.TOP_RIGHT
              case Position.TOP_RIGHT:
                return Position.BOTTOM_LEFT
            }
          })
        }}
      />
    </div>
  )
}
