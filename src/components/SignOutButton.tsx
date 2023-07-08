'use client'

import { FC, useState } from 'react'
import Button from './ui/Button'
import { signOut } from 'next-auth/react'
import { toast } from '@/ui/Toast'
import { useRouter } from 'next/navigation'

interface SignOutButtonProps {}

const SignOutButton: FC<SignOutButtonProps> = ({}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const router = useRouter()

  const signOutWithGoogle = async () => {
    setIsLoading(true)

    try {
      await signOut()
    } catch (error) {
      toast({
        title: 'Error signing out',
        message: 'Please try again later',
        type: 'error',
      })
    }
  }

  return (
    <Button isLoading={isLoading} onClick={signOutWithGoogle}>
      Sign Out
    </Button>
  )
}

export default SignOutButton
