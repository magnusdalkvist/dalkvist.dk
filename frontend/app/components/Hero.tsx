import Image from '@/app/components/SanityImage'
import ResolvedLink from '@/app/components/ResolvedLink'

type HeroProps = {
  block: {
    _key: string
    _type: 'hero'
    heading?: string
    subheading?: string
    image?: {
      asset?: {_ref: string}
      hotspot?: {x: number; y: number}
      crop?: {top: number; bottom: number; left: number; right: number}
      alt?: string
    }
    button?: {
      buttonText?: string
      link?: any
    }
  }
  index: number
  pageId: string
  pageType: string
}

export default function Hero({block}: HeroProps) {
  const {heading, subheading, image, button} = block

  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
      {image?.asset?._ref && (
        <div className="absolute inset-0">
          <Image
            id={image.asset._ref}
            alt={image.alt || ''}
            width={1920}
            hotspot={image.hotspot}
            crop={image.crop}
            mode="cover"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
      )}

      {!image?.asset?._ref && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-700" />
      )}

      <div className="container relative z-10 text-center py-20">
        {heading && (
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight">
            {heading}
          </h1>
        )}
        {subheading && (
          <p className="mt-6 text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
            {subheading}
          </p>
        )}
        {button?.buttonText && button?.link && (
          <div className="mt-8 flex justify-center">
            <ResolvedLink
              link={button.link}
              className="rounded-full font-medium text-sm whitespace-nowrap bg-white hover:bg-gray-100 py-3 px-8 text-gray-900 transition-colors duration-200"
            >
              {button.buttonText}
            </ResolvedLink>
          </div>
        )}
      </div>
    </section>
  )
}
