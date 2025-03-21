import { QrCodeIcon } from '@heroicons/react/24/outline'
import { Dialog, VisuallyHidden } from 'radix-ui'
import ReactQRCode from 'react-qr-code'

import { cn } from '@/lib/cn'

type QRCodeProps = {
  value: string
  className?: string
}

export const QRCodeDialog = ({ value, className }: QRCodeProps) => (
  <Dialog.Root>
    <Dialog.Trigger
      className={cn(
        'cursor-pointer rounded bg-gray-950/80 backdrop-blur transition-colors hover:bg-gray-900/80 focus:bg-gray-700/80 focus:outline-none',
        className,
      )}
    >
      <QrCodeIcon className="box-content h-10 w-10 stroke-gray-300 p-1 lg:h-14 lg:w-14" />
    </Dialog.Trigger>
    <Dialog.Overlay className="fixed inset-0 bg-black/80 backdrop-blur" />
    <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform rounded bg-gray-800 focus:outline-none">
      <VisuallyHidden.Root>
        <Dialog.Title>QR Code</Dialog.Title>
      </VisuallyHidden.Root>
      <ReactQRCode value={value} className="h-auto w-[80vw] max-w-96" />
    </Dialog.Content>
  </Dialog.Root>
)
