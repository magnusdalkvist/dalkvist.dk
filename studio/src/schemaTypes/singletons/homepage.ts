import {HomeIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

/**
 * Homepage schema singleton — the customizable landing page.
 */
export const homepage = defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  icon: HomeIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      description: 'The title shown in the browser tab',
      validation: (Rule) => Rule.required(),
      initialValue: 'Velkommen',
    }),
    defineField({
      name: 'pageBuilder',
      title: 'Page Sections',
      type: 'array',
      description: 'Add and arrange sections to build the homepage',
      of: [
        {type: 'hero'},
        {type: 'imageGallery'},
        {type: 'recentPosts'},
        {type: 'callToAction'},
        {type: 'infoSection'},
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Homepage',
      }
    },
  },
})
