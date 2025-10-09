import { useState } from 'react'

export const useShareableURL = (url: string) => {
  const [shareableURL, setShareableURL] = useState<string | null>(null)

  if (typeof window !== 'undefined') {
    const parsedURL = new URL(url, window.location.origin)
    setShareableURL(parsedURL.toString())
  }

  return {
    shareableURL,
  }
}
