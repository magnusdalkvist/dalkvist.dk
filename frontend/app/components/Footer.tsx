import Link from 'next/link'
import {settingsQuery} from '@/sanity/lib/queries'
import {sanityFetch} from '@/sanity/lib/live'
import {linkResolver} from '@/sanity/lib/utils'
import type {DereferencedLink} from '@/sanity/lib/types'

export default async function Footer() {
  const {data: settings} = await sanityFetch({
    query: settingsQuery,
  })

  const footerNav = settings?.footerNav ?? []
  const footerText = settings?.footerText ?? 'En familieblog'
  const siteTitle = settings?.title || 'dalkvist.dk'

  return (
    <footer className="bg-gray-50 border-t border-gray-100">
      <div className="container">
        <div className="flex flex-col items-center py-12 gap-4 lg:flex-row lg:justify-between">
          <div className="text-center lg:text-left">
            <p className="text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} {siteTitle}
            </p>
            {footerText && (
              <p className="mt-1 text-gray-400 text-xs">{footerText}</p>
            )}
          </div>

          {footerNav.length > 0 && (
            <nav>
              <ul
                role="list"
                className="flex items-center gap-4 md:gap-6 text-sm"
              >
                {footerNav.map((item, index) => {
                  const href = linkResolver(item.link as DereferencedLink)
                  if (!href) return null
                  return (
                    <li key={index}>
                      <Link
                        href={href}
                        target={item.link?.openInNewTab ? '_blank' : undefined}
                        rel={item.link?.openInNewTab ? 'noopener noreferrer' : undefined}
                        className="text-gray-500 hover:text-gray-800 hover:underline transition-colors"
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
    </footer>
  )
}
