import { FC } from 'react'

import type { Metadata } from 'next'
import LargeHeading from '@/ui/LargeHeading'
import Paragraph from '@/ui/Paragraph'
import DocumentationTabs from '@/components/ui/DocumentationTabs'
import 'simplebar-react/dist/simplebar.min.css'
import ApiAlert from '@/components/ApiAlert'

export const metadata: Metadata = {
  title: 'Similarity API | Documentation',
  description: 'Free & open-source text similarity API',
}

const page: FC = ({}) => {
  return (
    <div className='container max-w-7xl mx-auto mt-12 mb-10'>
      <div className='flex flex-col items-center gap-6 '>
        <LargeHeading className='text-3xl'>Making a request</LargeHeading>

        <ApiAlert type />
        <DocumentationTabs />
      </div>
    </div>
  )
}

export default page
