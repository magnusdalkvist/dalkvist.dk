import {defineField, defineType} from 'sanity'
import {StarIcon} from '@sanity/icons'

export const hero = defineType({
  name: 'hero',
  title: 'Hero',
  type: 'object',
  icon: StarIcon,
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'image',
      title: 'Background Image',
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
      ],
    }),
    defineField({
      name: 'button',
      title: 'Button',
      type: 'button',
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      media: 'image',
    },
    prepare({title, media}) {
      return {
        title: title || 'Untitled Hero',
        subtitle: 'Hero',
        media,
      }
    },
  },
})
