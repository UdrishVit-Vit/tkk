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

const windTattooTableSchema = z.object({
  title: z.string(),
  entries: z.array(z.object({
    whiteTitle: z.string(),
    whiteText: z.string(),
    blackTitle: z.string(),
    blackText: z.string(),
    darknessPoints: z.number().int().min(1)
  })).default([])
})

const ruleSectionSchema = z.object({
  title: z.string(),
  text: z.string()
})

const bloodTablesSchema = z.object({
  mother: z.array(z.object({ dice: z.string(), name: z.string(), text: z.string() })).default([]),
  father: z.array(z.object({ dice: z.string(), name: z.string(), text: z.string() })).default([])
})

const nameDataSchema = z.object({
  intro: z.string(),
  examples: z.string().optional(),
  varieties: z.array(z.string()).default([]),
  d13: z.object({
    intro: z.string().optional(),
    entries: z.array(z.object({ roll: z.number(), desc: z.string(), value: z.string() })).default([])
  }).optional(),
  d4x4: z.object({
    intro: z.string().optional(),
    entries: z.array(z.object({ roll: z.string(), sign: z.string(), value: z.string(), g: z.string().optional() })).default([])
  }).optional(),
  lost: z.object({
    desc: z.string(),
    entries: z.array(z.object({ d13: z.number(), roll: z.string(), sign: z.string() })).default([])
  }).optional()
})

const themedImagesSchema = z.object({
  shamas: z.string().optional(),
  manu: z.string().optional(),
  marak: z.string().optional(),
  dangun: z.string().optional(),
  brall: z.string().optional()
}).default({})

const raceThreadLoreBlockSchema = z.object({
  title: z.string().optional(),
  text: z.string()
})

// Every Thread Source is a complete, independently authored version of a race.
// Fields remain optional so a source may inherit unchanged values, but every
// visible and mechanical part of the dossier can be replaced.
const raceThreadSourceSchema = z.object({
  id: z.string(),
  source: z.string(),
  sourceTitle: z.string(),
  sourceAuthor: z.string().optional(),
  sourceUrl: z.string().optional(),
  sourceNote: z.string().optional(),
  publishedAt: z.string().optional(),
  title: z.string().optional(),
  originalName: z.string().optional(),
  description: z.string().optional(),
  lore: z.array(z.union([z.string(), raceThreadLoreBlockSchema])).optional(),
  inheritNames: z.boolean().optional(),
  region: z.array(z.string()).optional(),
  playable: z.boolean().optional(),
  hasDndRules: z.boolean().optional(),
  tags: z.array(z.string()).optional(),
  related: z.array(z.string()).optional(),
  creatureType: z.string().optional(),
  abilityScore: z.string().optional(),
  raceSize: z.string().optional(),
  speed: z.string().optional(),
  primaryTraits: z.array(primaryTraitSchema).optional(),
  windTattooTable: windTattooTableSchema.optional(),
  ruleSections: z.array(ruleSectionSchema).optional(),
  bloodTables: bloodTablesSchema.optional(),
  nameData: nameDataSchema.optional(),
  image: z.string().optional(),
  imageAlt: z.string().optional(),
  cardImages: themedImagesSchema.optional(),
  detailImages: themedImagesSchema.optional()
})

// Pathfinder 2e ancestry feats: level-gated options with the game's own
// activity metadata (actions, frequency, trigger, requirements).
const pf2eAncestryFeatSchema = z.object({
  level: z.number().int().min(1),
  name: z.string(),
  traits: z.array(z.string()).default([]),
  actions: z.string().optional(),
  prerequisites: z.string().optional(),
  frequency: z.string().optional(),
  trigger: z.string().optional(),
  requirements: z.string().optional(),
  text: z.string(),
  special: z.string().optional()
})

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

    // D&D 5e (2014) races remain immutable source material for the legacy rules.
    dnd5eRaces: defineCollection({
      type: 'page',
      source: 'dnd5e/races/**/*.md',
      schema: z.object({
        ...baseEntity,
        type: z.literal('race').default('race'),

        region: z.array(z.string()).default([]),
        playable: z.boolean().default(true),
        hasDndRules: z.boolean().default(false),

        source: z.string().default('TL'),
        sourceTitle: z.string().default('The Threads of Largo'),
        sourceAuthor: z.string().optional(),
        sourceUrl: z.string().optional(),
        sourceNote: z.string().optional(),
        publishedAt: z.string().optional(),
        threadSources: z.array(raceThreadSourceSchema).default([]),
        originalName: z.string().default(''),
        creatureType: z.string().default('гуманоид'),
        abilityScore: z.string().default('—'),
        raceSize: z.string().default('Средний'),
        speed: z.string().default('30 фт.'),
        primaryTraits: z.array(primaryTraitSchema).default([]),
        windTattooTable: windTattooTableSchema.optional(),
        ruleSections: z.array(ruleSectionSchema).default([]),
        bloodTables: bloodTablesSchema.optional(),
        nameData: nameDataSchema.optional(),

        image: z.string().default(''),
        imageAlt: z.string().default(''),
        cardImages: themedImagesSchema,
        detailImages: themedImagesSchema
      })
    }),

    // D&D 5.5e (2024) species are generated from the complete legacy dossiers,
    // then adapted so ability scores and languages follow 2024 character origins.
    dnd55eSpecies: defineCollection({
      type: 'page',
      source: 'dnd55e/species/**/*.md',
      schema: z.object({
        ...baseEntity,
        type: z.literal('species').default('species'),
        rulesEdition: z.literal('2024').default('2024'),

        region: z.array(z.string()).default([]),
        playable: z.boolean().default(true),
        hasDndRules: z.boolean().default(false),

        source: z.string().default('TL'),
        sourceTitle: z.string().default('The Threads of Largo'),
        sourceAuthor: z.string().optional(),
        sourceUrl: z.string().optional(),
        sourceNote: z.string().optional(),
        publishedAt: z.string().optional(),
        threadSources: z.array(raceThreadSourceSchema).default([]),
        originalName: z.string().default(''),
        creatureType: z.string().default('гуманоид'),
        abilityScore: z.literal('Определяется предысторией').default('Определяется предысторией'),
        raceSize: z.string().default('Средний'),
        speed: z.string().default('30 фт.'),
        primaryTraits: z.array(primaryTraitSchema).default([]),
        windTattooTable: windTattooTableSchema.optional(),
        ruleSections: z.array(ruleSectionSchema).default([]),
        bloodTables: bloodTablesSchema.optional(),
        nameData: nameDataSchema.optional(),

        image: z.string().default(''),
        imageAlt: z.string().default(''),
        cardImages: themedImagesSchema,
        detailImages: themedImagesSchema
      })
    })
    ,

    // Pathfinder 2e ancestries reuse the Enoa dossiers, but every mechanic is
    // rebuilt on PF2e maths: ancestry HP, boosts and a flaw, heritages instead
    // of subraces, and ancestry feats gated by level.
    pf2eAncestries: defineCollection({
      type: 'page',
      source: 'pf2e/ancestries/**/*.md',
      schema: z.object({
        ...baseEntity,
        type: z.literal('ancestry').default('ancestry'),
        rulesSystem: z.literal('pf2e').default('pf2e'),

        region: z.array(z.string()).default([]),
        playable: z.boolean().default(true),
        hasDndRules: z.boolean().default(true),

        source: z.string().default('TL'),
        sourceTitle: z.string().default('The Threads of Largo'),
        sourceAuthor: z.string().optional(),
        sourceUrl: z.string().optional(),
        sourceNote: z.string().optional(),
        publishedAt: z.string().optional(),
        originalName: z.string().default(''),

        rarity: z.string().default('Обычное'),
        hp: z.number().int().default(8),
        ancestryTraits: z.array(z.string()).default([]),
        creatureType: z.string().default('гуманоид'),
        abilityScore: z.string().default('—'),
        abilityFlaw: z.string().default('—'),
        raceSize: z.string().default('Средний'),
        speed: z.string().default('25 футов'),
        senses: z.string().default('—'),
        languages: z.string().default('—'),

        primaryTraits: z.array(primaryTraitSchema).default([]),
        ruleSections: z.array(ruleSectionSchema).default([]),
        ancestryFeats: z.array(pf2eAncestryFeatSchema).default([]),
        windTattooTable: windTattooTableSchema.optional(),
        bloodTables: bloodTablesSchema.optional(),
        nameData: nameDataSchema.optional(),

        image: z.string().default(''),
        imageAlt: z.string().default(''),
        cardImages: themedImagesSchema,
        detailImages: themedImagesSchema
      })
    })
  }
})
