'use client'

import Link from 'next/link'
import {linkResolver} from '@/sanity/lib/utils'
import type {DereferencedLink} from '@/sanity/lib/types'
import {SettingsQueryResult} from '@/sanity.types'
import {useState} from 'react'

export default function Header({settings}: {settings: SettingsQueryResult}) {
  const headerNav = settings?.headerNav ?? []

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="fixed z-50 h-24 inset-0">
      <div
        className={`flex items-center backdrop-blur-lg border-b border-gray-100 h-full z-1 relative ${mobileMenuOpen ? 'bg-white' : 'bg-white/80 transition-colors delay-150'}`}
      >
        <div className="container py-6 px-2 sm:px-6">
          <div className="flex items-center justify-between gap-5 z-10">
            <Link className="flex items-center gap-2" href="/">
              <span className="text-lg sm:text-2xl pl-2 font-semibold tracking-tight">
                {settings?.title || 'dalkvist.dk'}
              </span>
            </Link>

            {headerNav.length > 0 && (
              <nav className="pr-2">
                <button className={`hamburger hamburger--squeeze md:hidden ${mobileMenuOpen ? 'is-active' : ''}`} type="button" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                  <span className="hamburger-box">
                    <span className="hamburger-inner" />
                  </span>
                </button>
                <ul
                  role="list"
                  className="items-center gap-4 md:gap-6 leading-5 text-sm tracking-tight hidden md:flex"
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
      </div>
      <nav
        className={`md:hidden z-0 absolute top-full left-0 right-0 bg-white/90 backdrop-blur-lg border-b border-gray-100 py-4 transition duration-300 ${mobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}
      >
        <ul
          role="list"
          className="container px-2 sm:px-6 flex flex-col gap-4 md:gap-6 leading-5 text-sm tracking-tight"
        >
          {headerNav.map((item, index) => {
            const href = linkResolver(item.link as DereferencedLink)
            if (!href) return null
            return (
              <li key={index} className="pl-2">
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
    </header>
  )
}
