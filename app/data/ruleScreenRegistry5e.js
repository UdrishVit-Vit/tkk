// Реестр ленивых загрузчиков данных для интерактивной ширмы правил.
// Каждый загрузчик возвращает { screen, groups: [{ id, title?, rules }], icons }.

function flat(rules) {
  return [{ id: 'all', rules }]
}

export const RULE_SCREEN_LOADERS_5E = {
  move: async () => {
    const m = await import('./movementRules5e.js')
    return { screen: m.MOVEMENT_SCREEN_5E, groups: flat(m.MOVEMENT_RULES_5E), icons: m.MOVEMENT_ICON_SVG_5E }
  },
  multiclassing: async () => {
    const m = await import('./multiclassingRules5e.js')
    return { screen: m.MULTICLASSING_SCREEN_5E, groups: m.MULTICLASSING_GROUPS_WITH_RULES_5E, icons: m.MULTICLASSING_ICON_SVG_5E }
  },
  spells: async () => {
    const m = await import('./spellRules5e.js')
    return { screen: m.SPELLS_SCREEN_5E, groups: m.SPELL_GROUPS_WITH_RULES_5E, icons: m.SPELLS_ICON_SVG_5E }
  },
  action: async () => {
    const m = await import('./actionRules5e.js')
    const groups = m.ACTION_RULE_GROUPS_5E.map(group => ({
      ...group,
      rules: m.actionRulesForGroup(group).map(rule => ({
        ...rule,
        sourceUrl: rule.source === 'DMG' ? m.ACTION_SCREEN_5E.optionalSourceUrl : m.ACTION_SCREEN_5E.sourceUrl,
        sourceName: rule.source === 'DMG' ? m.ACTION_SCREEN_5E.optionalSourceName : m.ACTION_SCREEN_5E.sourceName
      }))
    }))
    return { screen: m.ACTION_SCREEN_5E, groups, icons: m.ACTION_ICON_SVG_5E }
  },
  bonus_action: async () => {
    const m = await import('./bonusActionRules5e.js')
    return { screen: m.BONUS_ACTION_SCREEN_5E, groups: flat(m.BONUS_ACTION_RULES_5E), icons: m.BONUS_ACTION_ICON_SVG_5E }
  },
  reaction: async () => {
    const m = await import('./reactionRules5e.js')
    return { screen: m.REACTION_SCREEN_5E, groups: flat(m.REACTION_RULES_5E), icons: m.REACTION_ICON_SVG_5E }
  },
  combat: async () => {
    const m = await import('./combatRules5e.js')
    return { screen: m.COMBAT_SCREEN_5E, groups: flat(m.COMBAT_RULES_5E), icons: m.COMBAT_ICON_SVG_5E }
  },
  other_action: async () => {
    const m = await import('./otherActionRules5e.js')
    return { screen: m.OTHER_ACTION_SCREEN_5E, groups: flat(m.OTHER_ACTION_RULES_5E), icons: m.OTHER_ACTION_ICON_SVG_5E }
  },
  environment: async () => {
    const m = await import('./environmentRules5e.js')
    return { screen: m.ENVIRONMENT_SCREEN_5E, groups: m.ENVIRONMENT_GROUPS_WITH_RULES_5E, icons: m.ENVIRONMENT_ICON_SVG_5E }
  },
  damage_and_attack: async () => {
    const m = await import('./damageAttackRules5e.js')
    return { screen: m.DAMAGE_ATTACK_SCREEN_5E, groups: m.DAMAGE_ATTACK_GROUPS_WITH_RULES_5E, icons: m.DAMAGE_ATTACK_ICON_SVG_5E }
  },
  hits_death_rest: async () => {
    const m = await import('./hitsDeathRestRules5e.js')
    return { screen: m.HITS_DEATH_REST_SCREEN_5E, groups: m.HITS_DEATH_REST_GROUPS_WITH_RULES_5E, icons: m.HITS_DEATH_REST_ICON_SVG_5E }
  },
  stats_and_skills: async () => {
    const m = await import('./statsSkillsRules5e.js')
    return { screen: m.STATS_SKILLS_SCREEN_5E, groups: m.STATS_SKILLS_GROUPS_WITH_RULES_5E, icons: m.STATS_SKILLS_ICON_SVG_5E }
  },
  origins: async () => {
    const m = await import('./originRules5e.js')
    return { screen: m.ORIGINS_SCREEN_5E, groups: m.ORIGINS_GROUPS_WITH_RULES_5E, icons: m.ORIGINS_ICON_SVG_5E }
  },
  conditions_and_disease: async () => {
    const m = await import('./conditionsDiseaseRules5e.js')
    return { screen: m.CONDITIONS_DISEASE_SCREEN_5E, groups: m.CONDITIONS_DISEASE_GROUPS_WITH_RULES_5E, icons: m.CONDITIONS_DISEASE_ICON_SVG_5E }
  },
  active_class_features: async () => {
    const m = await import('./activeClassFeatureRules5e.js')
    return { screen: m.ACTIVE_CLASS_FEATURES_SCREEN_5E, groups: m.ACTIVE_CLASS_FEATURE_GROUPS_WITH_RULES_5E, icons: m.ACTIVE_CLASS_FEATURES_ICON_SVG_5E }
  },
  equipment: async () => {
    const m = await import('./equipmentRules5e.js')
    return { screen: m.EQUIPMENT_SCREEN_5E, groups: m.EQUIPMENT_GROUPS_WITH_RULES_5E, icons: m.EQUIPMENT_ICON_SVG_5E }
  },
  downtime_activities: async () => {
    const m = await import('./downtimeActivityRules5e.js')
    return { screen: m.DOWNTIME_ACTIVITIES_SCREEN_5E, groups: m.DOWNTIME_ACTIVITY_GROUPS_WITH_RULES_5E, icons: m.DOWNTIME_ICON_SVG_5E }
  },
  creating_adventures: async () => {
    const m = await import('./creatingAdventureRules5e.js')
    return { screen: m.CREATING_ADVENTURES_SCREEN_5E, groups: m.CREATING_ADVENTURE_GROUPS_WITH_RULES_5E, icons: m.CREATING_ADVENTURES_ICON_SVG_5E }
  },
  traps: async () => {
    const m = await import('./trapRules5e.js')
    return { screen: m.TRAPS_SCREEN_5E, groups: m.TRAP_GROUPS_WITH_RULES_5E, icons: m.TRAP_ICON_SVG_5E }
  },
  supernatural_gifts: async () => {
    const m = await import('./supernaturalGiftRules5e.js')
    return { screen: m.SUPERNATURAL_GIFTS_SCREEN_5E, groups: m.SUPERNATURAL_GIFT_GROUPS_WITH_RULES_5E, icons: m.SUPERNATURAL_GIFT_ICON_SVG_5E }
  },
  demonic_boons: async () => {
    const m = await import('./demonicBoonRules5e.js')
    return { screen: m.DEMONIC_BOONS_SCREEN_5E, groups: m.DEMONIC_BOON_GROUPS_WITH_RULES_5E, icons: m.DEMONIC_BOON_ICON_SVG_5E }
  },
  epic_boons: async () => {
    const m = await import('./epicBoonRules5e.js')
    return { screen: m.EPIC_BOONS_SCREEN_5E, groups: m.EPIC_BOON_GROUPS_WITH_RULES_5E, icons: m.EPIC_BOON_ICON_SVG_5E }
  },
  artifacts: async () => {
    const m = await import('./artifactRules5e.js')
    return { screen: m.ARTIFACTS_SCREEN_5E, groups: m.ARTIFACT_GROUPS_WITH_RULES_5E, icons: m.ARTIFACT_ICON_SVG_5E }
  },
  magic_items: async () => {
    const m = await import('./magicItemRules5e.js')
    return { screen: m.MAGIC_ITEMS_SCREEN_5E, groups: m.MAGIC_ITEM_GROUPS_WITH_RULES_5E, icons: m.MAGIC_ITEM_ICON_SVG_5E }
  },
  journey: async () => {
    const m = await import('./journeyRules5e.js')
    return { screen: m.JOURNEY_SCREEN_5E, groups: m.JOURNEY_GROUPS_WITH_RULES_5E, icons: m.JOURNEY_ICON_SVG_5E }
  },
  planar_travel: async () => {
    const m = await import('./planarTravelRules5e.js')
    return { screen: m.PLANAR_TRAVEL_SCREEN_5E, groups: m.PLANAR_TRAVEL_GROUPS_WITH_RULES_5E, icons: m.PLANAR_TRAVEL_ICON_SVG_5E }
  },
  chases: async () => {
    const m = await import('./chaseRules5e.js')
    return { screen: m.CHASES_SCREEN_5E, groups: m.CHASE_GROUPS_WITH_RULES_5E, icons: m.CHASE_ICON_SVG_5E }
  },
  magical_phenomena: async () => {
    const m = await import('./magicalPhenomenaRules5e.js')
    return { screen: m.MAGICAL_PHENOMENA_SCREEN_5E, groups: m.MAGICAL_PHENOMENA_GROUPS_WITH_RULES_5E, icons: m.MAGICAL_PHENOMENA_ICON_SVG_5E }
  },
  monster: async () => {
    const m = await import('./monsterRules5e.js')
    return { screen: m.MONSTER_SCREEN_5E, groups: m.MONSTER_GROUPS_WITH_RULES_5E, icons: m.MONSTER_ICON_SVG_5E }
  },
  language: async () => {
    const m = await import('./languageRules5e.js')
    return { screen: m.LANGUAGE_SCREEN_5E, groups: m.LANGUAGE_GROUPS_WITH_RULES_5E, icons: m.LANGUAGE_ICON_SVG_5E }
  },
  experience: async () => {
    const m = await import('./experienceRules5e.js')
    return { screen: m.EXPERIENCE_SCREEN_5E, groups: m.EXPERIENCE_GROUPS_WITH_RULES_5E, icons: m.EXPERIENCE_ICON_SVG_5E }
  },
}
