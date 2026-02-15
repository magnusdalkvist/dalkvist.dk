import {defineField, defineType} from 'sanity'
import {DocumentsIcon} from '@sanity/icons'

export const recentPosts = defineType({
  name: 'recentPosts',
  title: 'Recent Posts',
  type: 'object',
  icon: DocumentsIcon,
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      initialValue: 'Recent Posts',
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'string',
    }),
    defineField({
      name: 'limit',
      title: 'Number of posts',
      type: 'number',
      initialValue: 6,
      description: 'How many posts to show (1-12)',
      validation: (Rule) => Rule.min(1).max(12),
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      limit: 'limit',
    },
    prepare({title, limit}) {
      return {
        title: title || 'Recent Posts',
        subtitle: `Showing ${limit || 6} posts`,
      }
    },
  },
})
