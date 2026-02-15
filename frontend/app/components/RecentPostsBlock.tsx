import Link from 'next/link'

import DateComponent from '@/app/components/Date'
import Avatar from '@/app/components/Avatar'
import Image from '@/app/components/SanityImage'

type PostData = {
  _id: string
  title: string
  slug: string | null
  excerpt: string | null
  coverImage: {
    asset?: {_ref: string}
    alt?: string
    hotspot?: {x: number; y: number}
    crop?: {top: number; bottom: number; left: number; right: number}
  } | null
  date: string | null
  author: {
    firstName: string | null
    lastName: string | null
    picture: unknown
  } | null
}

type RecentPostsBlockProps = {
  block: {
    _key: string
    _type: 'recentPosts'
    heading?: string
    subheading?: string
    limit?: number
    posts?: PostData[]
  }
  index: number
  pageId: string
  pageType: string
}

export default function RecentPostsBlock({block}: RecentPostsBlockProps) {
  const {heading, subheading, limit = 6, posts: allPosts} = block

  // The GROQ query fetches up to 12, slice to the configured limit
  const posts = allPosts?.slice(0, limit)

  if (!posts || posts.length === 0) {
    return (
      <section className="container py-12 md:py-16">
        <p className="text-gray-500 text-center">No posts yet. Start writing in the Studio!</p>
      </section>
    )
  }

  return (
    <section className="container py-12 md:py-16">
      {(heading || subheading) && (
        <div className="mb-8 md:mb-12">
          {heading && (
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium">{heading}</h2>
          )}
          {subheading && (
            <p className="mt-2 text-lg text-gray-600">{subheading}</p>
          )}
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <article
            key={post._id}
            className="group border border-gray-200 rounded-lg overflow-hidden bg-white hover:shadow-lg transition-shadow duration-300"
          >
            <Link href={`/posts/${post.slug}`} className="block">
              {post.coverImage?.asset?._ref && (
                <div className="aspect-video overflow-hidden">
                  <Image
                    id={post.coverImage.asset._ref}
                    alt={post.coverImage.alt || ''}
                    width={600}
                    height={340}
                    crop={post.coverImage.crop}
                    hotspot={post.coverImage.hotspot}
                    mode="cover"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              )}
              <div className="p-5">
                <h3 className="text-lg font-medium group-hover:text-gray-600 transition-colors">
                  {post.title}
                </h3>
                {post.excerpt && (
                  <p className="mt-2 text-sm text-gray-600 line-clamp-2">{post.excerpt}</p>
                )}
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                  {post.author?.firstName && post.author?.lastName && (
                    <div className="flex items-center">
                      <Avatar person={post.author} small />
                    </div>
                  )}
                  {post.date && (
                    <time className="text-gray-500 text-xs font-mono" dateTime={post.date}>
                      <DateComponent dateString={post.date} />
                    </time>
                  )}
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </section>
  )
}
