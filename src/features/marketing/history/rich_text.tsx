import { RichTextItemResponse } from '@notionhq/client'
import { JSX } from 'react'

import { cn } from '@/utils/cn'

type RichTextProps = {
  as: keyof JSX.IntrinsicElements
  richText: RichTextItemResponse[]
  className?: string
}

export const RichText = ({ as, richText, className }: RichTextProps) => {
  const Component = as

  return (
    <Component className={className}>
      {richText.map((text, index) => {
        switch (text.type) {
          case 'text':
            if (text.text.link) {
              return (
                <a
                  key={index}
                  href={text.text.link.url}
                  className={cn(
                    'text-primary-2 outline-none hover:underline',
                    text.annotations.italic && 'italic',
                    text.annotations.bold && 'text-neutral-1 font-semi',
                    text.annotations.underline && 'underline',
                    text.annotations.strikethrough && 'line-through',
                  )}
                >
                  {text.text.content}
                </a>
              )
            }

            return (
              <span
                key={index}
                className={cn(
                  text.annotations.italic && 'italic',
                  text.annotations.bold && 'text-neutral-1 font-semibold',
                  text.annotations.underline && 'underline',
                  text.annotations.strikethrough && 'line-through',
                )}
              >
                {text.text.content}
              </span>
            )
          case 'mention':
            return <span key={index}>{text.plain_text}</span>
          case 'equation':
            return <span key={index}>{text.plain_text}</span>
          default:
            text satisfies never
        }
      })}
    </Component>
  )
}
