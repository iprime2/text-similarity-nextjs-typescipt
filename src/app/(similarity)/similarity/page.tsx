import CheckSimilarity from '@/components/CheckSimilarity'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { notFound } from 'next/navigation'
import React from 'react'

const SimilarityPage = async () => {
  const user = await getServerSession(authOptions)

  if (!user) notFound()
  const userData = user.user

  return (
    <div className='max-w-7xl mx-auto mt-16'>
      <CheckSimilarity user={userData} />
    </div>
  )
}

export default SimilarityPage
