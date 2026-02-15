import {Suspense} from 'react'

import PageBuilderPage from '@/app/components/PageBuilder'
import {homepageQuery} from '@/sanity/lib/queries'
import {sanityFetch} from '@/sanity/lib/live'

export default async function Page() {
  const {data: homepage} = await sanityFetch({
    query: homepageQuery,
  })

  if (!homepage?._id) {
    return (
      <div className="container py-20">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Velkommen til dalkvist.dk</h1>
          <p className="text-gray-600 text-lg">
            Open the Sanity Studio to set up the homepage content.
          </p>
        </div>
      </div>
    )
  }

  return (
    <Suspense>
      <PageBuilderPage page={homepage} />
    </Suspense>
  )
}
