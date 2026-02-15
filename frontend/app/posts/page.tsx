import {Suspense} from 'react'
import type {Metadata} from 'next'

import {AllPosts} from '@/app/components/Posts'

export const metadata: Metadata = {
  title: 'Indlæg',
  description: 'Alle indlæg fra dalkvist.dk',
}

export default async function PostsPage() {
  return (
    <div className="container py-12 lg:py-24">
      <div className="mb-8">
        <h1 className="text-4xl text-gray-900 sm:text-5xl lg:text-6xl font-medium">Indlæg</h1>
      </div>
      <Suspense>{await AllPosts()}</Suspense>
    </div>
  )
}
