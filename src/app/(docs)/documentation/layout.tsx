import React from 'react'

export default function Layout({ children }: { children: React.ReactNode }) {
  return <section className='pt-20 pb-20'>{children}</section>
}
