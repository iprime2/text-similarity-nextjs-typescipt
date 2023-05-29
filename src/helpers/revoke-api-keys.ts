import { toast } from '@/components/ui/Toast'
import { RevokeApiData } from '@/types/api'

export async function revokeApiKey({ keyId }: { keyId: string }) {
  const res = await fetch('/api/api-key/revoke', {
    method: 'POST',
    body: JSON.stringify({ keyId }),
    headers: {
      'Content-Type': 'application/json',
    },
  })

  const data = (await res.json()) as { error?: string }
  toast({
    title: 'Revoked',
    message: 'API key revoked',
    type: 'success',
  })

  if (data.error) {
    throw new Error(data.error)
  }
}
