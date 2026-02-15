import Link from 'next/link'
import {settingsQuery} from '@/sanity/lib/queries'
import {sanityFetch} from '@/sanity/lib/live'
import {linkResolver} from '@/sanity/lib/utils'
import type {DereferencedLink} from '@/sanity/lib/types'

export default async function Header() {
  const {data: settings} = await sanityFetch({
    query: settingsQuery,
  })

  const headerNav = settings?.headerNav ?? []

  return (
    <header className="fixed z-50 h-24 inset-0 bg-white/80 flex items-center backdrop-blur-lg border-b border-gray-100">
      <div className="container py-6 px-2 sm:px-6">
        <div className="flex items-center justify-between gap-5">
          <Link className="flex items-center gap-2" href="/">
            <span className="text-lg sm:text-2xl pl-2 font-semibold tracking-tight">
              {settings?.title || 'dalkvist.dk'}
            </span>
          </Link>

          {headerNav.length > 0 && (
            <nav>
              <ul
                role="list"
                className="flex items-center gap-4 md:gap-6 leading-5 text-sm tracking-tight"
              >
                {headerNav.map((item, index) => {
                  const href = linkResolver(item.link as DereferencedLink)
                  if (!href) return null
                  return (
                    <li key={index}>
                      <Link
                        href={href}
                        target={item.link?.openInNewTab ? '_blank' : undefined}
                        rel={item.link?.openInNewTab ? 'noopener noreferrer' : undefined}
                        className="hover:underline text-gray-700 hover:text-black transition-colors"
                      >
                        {item.label}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </nav>
          )}
        </div>
      </div>
    </header>
  )
}
