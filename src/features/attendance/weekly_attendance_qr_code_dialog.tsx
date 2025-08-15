import { QrCodeIcon } from '@heroicons/react/24/outline'
import ReactQRCode from 'react-qr-code'

import { Dialog } from '@/design_system/dialog'
import { cn } from '@/utils/cn'

type WeeklyAttendanceQRCodeProps = {
  value: string
  className?: string
}

export const WeeklyAttendanceQRCodeDialog = ({
  value,
  className,
}: WeeklyAttendanceQRCodeProps) => (
  <Dialog
    title="QR Code"
    trigger={<QrCodeIcon className={cn('box-content size-8', className)} />}
    className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform rounded outline-none"
  >
    <ReactQRCode value={value} className="h-auto w-[80vw] max-w-96" />
  </Dialog>
)
