import Image from 'next/image'

import logo from '@/images/logo.png'

const Page = () => (
  <main className="flex flex-1 flex-col items-center justify-center p-6">
    <Image src={logo} alt="The SUWO logo" />
  </main>
)

export default Page
