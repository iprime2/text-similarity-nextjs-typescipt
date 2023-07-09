'use client'

import { FC } from 'react'
import { Copy } from 'lucide-react'
import { toast } from '@/components/ui/Toast'
import { Server } from 'lucide-react'
import Paragraph from './ui/Paragraph'

interface ApiAlertProps {
  type?: boolean
}

const ApiAlert: FC<ApiAlertProps> = ({ type }) => {
  const url = `https://text-similarity-nextjs-typescipt.vercel.app/api/v1/similarity`
  const onCopy = () => {
    navigator.clipboard.writeText(url)
    toast({
      title: 'Copied',
      message: 'API Route Copied to clipboard',
      type: 'success',
    })
  }
  return (
    <div
      className={`w-full flex flex-col items-start ${type ? 'max-w-2xl' : ''}`}
    >
      <Paragraph className='ml-3'>API Endpoint</Paragraph>
      <div
        className={`w-full rounded-md dark:border-slate-700 border-slate-300 border-[1px] p-5 flex flex-col dark:text-white `}
      >
        <div className='flex flex-row gap-3 '>
          <Server className='h-4 w-4' />
          <p className='-mt-[3px]'>Public</p>
        </div>
        <div className='w-full flex justify-between'>
          <p>{url}</p>

          <button onClick={onCopy}>
            <Copy className='h-4 w-4 cursor-pointer' />
          </button>
        </div>
      </div>
    </div>
  )
}

export default ApiAlert
