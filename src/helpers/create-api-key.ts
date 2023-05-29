import { toast } from '@/components/ui/Toast'
import { CreateApiData } from '@/types/api'

export async function createApiKey() {
  const res = await fetch('/api/api-key/create')
  const data = (await res.json()) as CreateApiData

  if (data.error || !data.createdApiKey) {
    if (data.error instanceof Array) {
      throw new Error(data.error.join(' '))
    }

    throw new Error(data.error ?? 'Something went wrong!!')
  }

  toast({
    title: 'Created!!',
    message: 'New API key created',
    type: 'success',
  })
  return data.createdApiKey.key
}
