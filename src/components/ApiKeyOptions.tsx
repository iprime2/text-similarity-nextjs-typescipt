'use client'

import { FC, useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/DropdownMenu'
import Button from './ui/Button'
import { Loader2 } from 'lucide-react'
import { toast } from './ui/Toast'
import { createApiKey } from '@/helpers/create-api-key'
import { useRouter } from 'next/navigation'
import { revokeApiKey } from '@/helpers/revoke-api-keys'

interface ApiKeyOptionsProps {
  apiKeyId: string
  apiKeyKey: string
}

const ApiKeyOptions: FC<ApiKeyOptionsProps> = ({ apiKeyId, apiKeyKey }) => {
  const [isCreatingNew, setIsCreatingNew] = useState<boolean>(false)
  const [isRevoking, setIsRevoking] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const router = useRouter()

  const createNewApiKey = async () => {
    setIsCreatingNew(true)
    setIsLoading(true)

    try {
      await revokeApiKey({ keyId: apiKeyId })
      await createApiKey()
      router.refresh()
    } catch (error) {
      toast({
        title: 'Error creating Api Key',
        message: 'Please try again later',
        type: 'error',
      })
    } finally {
      setIsLoading(false)

      setIsCreatingNew(false)
    }
  }

  const revokeCurrentApiKey = async () => {
    setIsRevoking(true)
    setIsLoading(true)

    try {
      await revokeApiKey({ keyId: apiKeyId })
      router.refresh()
    } catch (error) {
      toast({
        title: 'Error revoking Api Key',
        message: 'Please try again later',
        type: 'error',
      })
    } finally {
      setIsRevoking(false)
      setIsLoading(false)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger disabled={isCreatingNew || isRevoking} asChild>
        <Button variant='ghost' className='flex gap-2 items-center'>
          <p>
            {isCreatingNew
              ? 'reating new key'
              : isRevoking
              ? 'Revoking Key'
              : 'options'}
          </p>
          {isCreatingNew || isRevoking ? (
            <Loader2 className='animate-spin h-4 w-4' />
          ) : null}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={() => {
            navigator.clipboard.writeText(apiKeyKey)

            toast({
              title: 'Copied',
              message: 'Api key is copied to clipboard',
              type: 'success',
            })
          }}
        >
          Copy
        </DropdownMenuItem>
        <DropdownMenuItem onClick={createNewApiKey}>
          Create New Key
        </DropdownMenuItem>
        <DropdownMenuItem onClick={revokeCurrentApiKey}>
          Revoke Key
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ApiKeyOptions
