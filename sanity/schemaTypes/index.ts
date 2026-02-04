import { type SchemaTypeDefinition } from 'sanity'

import {blockContentType} from './blockContentType'
import {categoryType} from './categoryType'
import {postType} from './postType'
import {authorType} from './authorType'
import {trainer} from './trainer'
import {membership} from './membership'
import {program} from './program'
import {testimonial} from './testimonial'
import {testimonialStat} from './testimonialStat'
import {faq} from './faq' 
import {contactInfo} from './contactInfo'
import {facility} from './facility'
import {hero} from './hero'
import { socialLink } from './socialLinks'
import contactMessage from './contactMessage'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContentType, categoryType, postType, authorType, trainer, membership, program, testimonial, testimonialStat, faq, contactInfo, facility, hero, socialLink, contactMessage],
}
