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
      {richText.map((text) => {
        switch (text.type) {
          case 'text':
            if (text.text.link) {
              return (
                <a
                  key={text.text.content}
                  href={text.text.link.url}
                  className={cn(
                    'text-primary-2 outline-none hover:underline',
                    text.annotations.italic && 'italic',
                    text.annotations.bold && 'font-bold',
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
                key={text.text.content}
                className={cn(
                  text.annotations.italic && 'italic',
                  text.annotations.bold && 'font-bold',
                  text.annotations.underline && 'underline',
                  text.annotations.strikethrough && 'line-through',
                )}
              >
                {text.text.content}
              </span>
            )
          case 'mention':
            return <span key={text.plain_text}>{text.plain_text}</span>
          case 'equation':
            return <span key={text.plain_text}>{text.plain_text}</span>
          default:
            text satisfies never
        }
      })}
    </Component>
  )
}
