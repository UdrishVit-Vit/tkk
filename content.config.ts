import { defineCollection, defineContentConfig, z } from '@nuxt/content'

const statusSchema = z.enum(['draft', 'published', 'archived'])
const accessSchema = z.enum(['public', 'player', 'master', 'private'])

const baseEntity = {
  title: z.string(),
  description: z.string(),
  status: statusSchema.default('draft'),
  access: accessSchema.default('public'),
  tags: z.array(z.string()).default([]),
  related: z.array(z.string()).default([])
}

const primaryTraitSchema = z.object({
  title: z.string(),
  text: z.string()
})

const ruleSectionSchema = z.object({
  title: z.string(),
  text: z.string()
})

const themedImagesSchema = z.object({
  shamas: z.string().optional(),
  manu: z.string().optional(),
  marak: z.string().optional(),
  dangun: z.string().optional(),
  brall: z.string().optional()
}).default({})

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: 'page',
      source: 'index.md',
      schema: z.object({
        title: z.string().optional(),
        description: z.string().optional()
      })
    }),

    // D&D 5e (2014) races — kept separate from D&D 5.5e (2024) "Виды" and any
    // future Pathfinder races, since each system has its own rules/terms.
    // When 5.5e/Pathfinder race content is added, give it its own collection +
    // source path the same way (e.g. dnd5e5Races: source 'dnd5e5/races/**/*.md').
    dnd5eRaces: defineCollection({
      type: 'page',
      source: 'dnd5e/races/**/*.md',
      schema: z.object({
        ...baseEntity,
        type: z.literal('race').default('race'),

        region: z.array(z.string()).default([]),
        playable: z.boolean().default(true),
        hasDndRules: z.boolean().default(false),

        source: z.string().default('ENOA'),
        originalName: z.string().default(''),
        creatureType: z.string().default('гуманоид'),
        abilityScore: z.string().default('—'),
        raceSize: z.string().default('Средний'),
        speed: z.string().default('30 фт.'),
        primaryTraits: z.array(primaryTraitSchema).default([]),
        ruleSections: z.array(ruleSectionSchema).default([]),

        image: z.string().default(''),
        imageAlt: z.string().default(''),
        cardImages: themedImagesSchema,
        detailImages: themedImagesSchema
      })
    })
  }
})
