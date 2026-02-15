import {person} from './documents/person'
import {page} from './documents/page'
import {post} from './documents/post'
import {callToAction} from './objects/callToAction'
import {infoSection} from './objects/infoSection'
import {hero} from './objects/hero'
import {imageGallery} from './objects/imageGallery'
import {recentPosts} from './objects/recentPosts'
import {settings} from './singletons/settings'
import {homepage} from './singletons/homepage'
import {link} from './objects/link'
import {navItem} from './objects/navItem'
import {blockContent} from './objects/blockContent'
import button from './objects/button'
import {blockContentTextOnly} from './objects/blockContentTextOnly'

// Export an array of all the schema types.  This is used in the Sanity Studio configuration. https://www.sanity.io/docs/studio/schema-types

export const schemaTypes = [
  // Singletons
  settings,
  homepage,
  // Documents
  page,
  post,
  person,
  // Objects
  button,
  blockContent,
  blockContentTextOnly,
  hero,
  imageGallery,
  recentPosts,
  infoSection,
  callToAction,
  link,
  navItem,
]
