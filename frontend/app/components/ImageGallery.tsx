import Image from '@/app/components/SanityImage'

type ImageGalleryProps = {
  block: {
    _key: string
    _type: 'imageGallery'
    heading?: string
    subheading?: string
    images?: Array<{
      _key: string
      asset?: {_ref?: string; _id?: string; url?: string}
      hotspot?: {x: number; y: number}
      crop?: {top: number; bottom: number; left: number; right: number}
      alt?: string
      caption?: string
    }>
    columns?: number
  }
  index: number
  pageId: string
  pageType: string
}

function getGridCols(columns?: number) {
  switch (columns) {
    case 2:
      return 'grid-cols-1 sm:grid-cols-2'
    case 4:
      return 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
    case 3:
    default:
      return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
  }
}

export default function ImageGallery({block}: ImageGalleryProps) {
  const {heading, subheading, images, columns} = block

  if (!images || images.length === 0) return null

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

      <div className={`grid ${getGridCols(columns)} gap-4`}>
        {images.map((image) => {
          const imageRef = image.asset?._ref || image.asset?._id
          if (!imageRef) return null

          return (
            <figure key={image._key} className="group relative overflow-hidden rounded-lg">
              <div className="aspect-square">
                <Image
                  id={imageRef}
                  alt={image.alt || ''}
                  width={800}
                  hotspot={image.hotspot}
                  crop={image.crop}
                  mode="cover"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              {image.caption && (
                <figcaption className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 pt-8 text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {image.caption}
                </figcaption>
              )}
            </figure>
          )
        })}
      </div>
    </section>
  )
}
