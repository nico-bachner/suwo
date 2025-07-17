import { QrCodeIcon } from '@heroicons/react/24/outline'
import ReactQRCode from 'react-qr-code'

import { cn } from '@/utils/cn'

import { Dialog } from '../../design_system/dialog'

type RollCallQRCodeProps = {
  value: string
  className?: string
}

export const RollCallQRCodeDialog = ({
  value,
  className,
}: RollCallQRCodeProps) => (
  <Dialog
    title="QR Code"
    trigger={
      <button
        className={cn(
          'bg-neutral-7/80 hover:bg-neutral-6/80 cursor-pointer rounded backdrop-blur transition-colors focus:outline-none',
          className,
        )}
      >
        <QrCodeIcon className="stroke-neutral-4 box-content h-10 w-10 p-1 lg:h-14 lg:w-14" />
      </button>
    }
    className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform rounded focus:outline-none"
  >
    <ReactQRCode value={value} className="h-auto w-[80vw] max-w-96" />
  </Dialog>
)
