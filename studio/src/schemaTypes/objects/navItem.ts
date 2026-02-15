import {defineField, defineType} from 'sanity'
import {LinkIcon} from '@sanity/icons'

/**
 * Navigation item — a label + link used in header/footer navigation.
 */
export const navItem = defineType({
  name: 'navItem',
  title: 'Navigation Item',
  type: 'object',
  icon: LinkIcon,
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'link',
      title: 'Link',
      type: 'link',
    }),
  ],
  preview: {
    select: {
      title: 'label',
    },
    prepare({title}) {
      return {
        title: title || 'Untitled Link',
        subtitle: 'Navigation Item',
      }
    },
  },
})
