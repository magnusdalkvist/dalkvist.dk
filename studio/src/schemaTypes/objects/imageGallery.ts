import {defineField, defineType} from 'sanity'
import {ImagesIcon} from '@sanity/icons'

export const imageGallery = defineType({
  name: 'imageGallery',
  title: 'Image Gallery',
  type: 'object',
  icon: ImagesIcon,
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'string',
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
              description: 'Important for SEO and accessibility.',
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
            },
          ],
        },
      ],
      validation: (Rule) => Rule.min(1),
    }),
    defineField({
      name: 'columns',
      title: 'Columns',
      type: 'number',
      description: 'Number of columns in the grid (2-4)',
      initialValue: 3,
      options: {
        list: [
          {title: '2 columns', value: 2},
          {title: '3 columns', value: 3},
          {title: '4 columns', value: 4},
        ],
      },
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      images: 'images',
    },
    prepare({title, images}) {
      return {
        title: title || 'Image Gallery',
        subtitle: `${images?.length || 0} image${images?.length === 1 ? '' : 's'}`,
      }
    },
  },
})
