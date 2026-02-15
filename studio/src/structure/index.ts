import {CogIcon, HomeIcon} from '@sanity/icons'
import type {StructureBuilder, StructureResolver} from 'sanity/structure'
import pluralize from 'pluralize-esm'

/**
 * Structure builder is useful whenever you want to control how documents are grouped and
 * listed in the studio or for adding additional in-studio previews or content to documents.
 * Learn more: https://www.sanity.io/docs/structure-builder-introduction
 */

const DISABLED_TYPES = ['settings', 'homepage', 'assist.instruction.context']

export const structure: StructureResolver = (S: StructureBuilder) =>
  S.list()
    .title('dalkvist.dk')
    .items([
      // Homepage singleton
      S.listItem()
        .title('Homepage')
        .child(S.document().schemaType('homepage').documentId('homepage'))
        .icon(HomeIcon),
      S.divider(),
      ...S.documentTypeListItems()
        // Remove singletons and internal types from the list
        .filter((listItem: any) => !DISABLED_TYPES.includes(listItem.getId()))
        // Pluralize the title of each document type
        .map((listItem) => {
          return listItem.title(pluralize(listItem.getTitle() as string))
        }),
      S.divider(),
      // Settings Singleton
      S.listItem()
        .title('Site Settings')
        .child(S.document().schemaType('settings').documentId('siteSettings'))
        .icon(CogIcon),
    ])
