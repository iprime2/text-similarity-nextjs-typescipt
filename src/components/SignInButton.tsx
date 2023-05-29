'use client'

import { FC, useState } from 'react'
import Button from './ui/Button'
import { signIn } from 'next-auth/react'
import { toast } from '@/ui/Toast'

interface SignInButtonProps {}

const SignInButton: FC<SignInButtonProps> = ({}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const signInWithGoogle = async () => {
    try {
      setIsLoading(true)
      await signIn('google')
    } catch (error) {
      toast({
        title: 'Error signing in',
        message: 'Please try again later',
        type: 'error',
      })
    }
  }

  return (
    <Button isLoading={isLoading} onClick={signInWithGoogle}>
      Sign In
    </Button>
  )
}

export default SignInButton
