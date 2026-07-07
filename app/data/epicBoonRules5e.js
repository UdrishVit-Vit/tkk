export const EPIC_BOONS_SCREEN_5E = {
  slug: 'epic_boons',
  title: 'Эпические дары',
  titleEn: 'Epic Boons',
  source: 'DMG',
  sourceName: "Dungeon Master's Guide 2014",
  sourceUrl: 'https://5e14.ttg.club/screens/epic_boons',
  intro: 'Эпические дары - награды для героев высшего уровня. Они могут заменять дальнейшее повышение уровня, отмечать легендарный подвиг или давать персонажу силу, достойную финала кампании.'
}

export const EPIC_BOON_ICON_SVG_5E = {
  default: '<path d="M12 3l3 6 6 1-4.5 4.3 1 6.2L12 17l-5.5 3.5 1-6.2L3 10l6-1z" stroke="currentColor" stroke-width="1.7" fill="none" stroke-linejoin="round"/>',
  immortality: '<path d="M4 12c2-5 6-5 8 0s6 5 8 0c-2 5-6 5-8 0s-6-5-8 0z" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/>',
  combat: '<path d="M4 20L20 4M7 7l10 10M4 4l16 16" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round"/>',
  storm: '<path d="M4 13l8-9v7h8l-8 9v-7z" fill="currentColor"/>',
  spell: '<path d="M12 4a8 8 0 1 0 8 8M12 4c2 3 2 5 0 8s-2 5 0 8M4 12h16" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round"/>',
  skill: '<path d="M6 19V5h4l2 4 2-4h4v14M9 13h6" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round"/>',
  recovery: '<path d="M12 21c-5-3-8-6-8-10a4 4 0 0 1 7-2 4 4 0 0 1 7 2c0 4-3 7-6 10z" fill="currentColor"/><path d="M12 8v8M8 12h8" stroke="#101820" stroke-width="1.8" stroke-linecap="round"/>',
  highMagic: '<path d="M5 17c5-1 6-5 7-13 3 3 5 7 2 10 3 0 5-1 6-4 1 6-4 10-11 10H5z" fill="currentColor"/>',
  health: '<path d="M12 21c-5-3-8-6-8-10a4 4 0 0 1 7-2 4 4 0 0 1 7 2c0 4-3 7-6 10z" stroke="currentColor" stroke-width="1.8" fill="none"/><path d="M12 8v8M8 12h8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
  sight: '<path d="M3 12c3-5 15-5 18 0-3 5-15 5-18 0z" stroke="currentColor" stroke-width="1.8" fill="none"/><circle cx="12" cy="12" r="3" fill="currentColor"/>',
  travel: '<path d="M5 19c2-8 5-12 14-14-3 5-3 10 0 14-6-3-10-3-14 0z" stroke="currentColor" stroke-width="1.8" fill="none"/><path d="M9 15l6-6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
  stealth: '<path d="M12 3c4 3 6 6 6 10a6 6 0 0 1-12 0c0-4 2-7 6-10z" stroke="currentColor" stroke-width="1.8" fill="none"/><path d="M5 20L19 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
  offense: '<path d="M4 18l10-10M14 4h6v6M6 20l-2-2 4-4 2 2z" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
  aim: '<circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="1.8" fill="none"/><circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.8" fill="none"/><path d="M12 4v3M12 17v3M4 12h3M17 12h3" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
  invincible: '<path d="M12 3l8 4v6c0 4-3 7-8 9-5-2-8-5-8-9V7z" fill="currentColor"/><path d="M8 12h8" stroke="#101820" stroke-width="1.8" stroke-linecap="round"/>',
  night: '<path d="M15 4a8 8 0 1 0 5 10 6 6 0 0 1-5-10z" fill="currentColor"/>',
  fire: '<path d="M12 21c4-2 6-5 6-8 0-4-3-6-4-10-4 3-1 6-5 8-2 1-3 3-3 5 0 3 2 5 6 5z" fill="currentColor"/>',
  freedom: '<path d="M5 17c6 0 8-8 14-8M5 17l4-4M5 17l4 4" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
  speed: '<path d="M5 18h8a6 6 0 1 0-6-6M3 12h8M4 8h5M4 16h6" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round"/>',
  resilience: '<path d="M12 3l8 4v6c0 4-3 7-8 9-5-2-8-5-8-9V7z" stroke="currentColor" stroke-width="1.8" fill="none"/><path d="M8 12h8M12 8v8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
  fate: '<path d="M12 3l8 8-8 10-8-10z" stroke="currentColor" stroke-width="1.8" fill="none"/><path d="M8 11h8M12 7v8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
  luck: '<path d="M7 19c-2-8 12-8 10 0M8 19h8M9 12V8a3 3 0 0 1 6 0v4" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round"/>'
}

const EPIC_BOON_ITEMS_5E = [
  ['boon-of-immortality', 'Дар бессмертия', 'Boon of Immortality', 'immortality', 'Дар бессмертия выводит героя за пределы обычной смертной судьбы и делает его существование частью легенды.'],
  ['boon-of-combat-prowess', 'Дар боевой удали', 'Boon of Combat Prowess', 'combat', 'Дар боевой удали помогает герою превращать решающую атаку в успех, когда промах был бы слишком дорог.'],
  ['boon-of-the-stormborn', 'Дар бури', 'Boon of the Stormborn', 'storm', 'Дар бури связывает героя с небом, громом, молнией и свободой движения через бурю.'],
  ['boon-of-quick-casting', 'Дар быстрого заклинания', 'Boon of Quick Casting', 'spell', 'Дар быстрого заклинания позволяет выбранной магии срабатывать быстрее и менять темп боя.'],
  ['boon-of-skill-proficiency', 'Дар владения навыками', 'Boon of Skill Proficiency', 'skill', 'Дар владения навыками расширяет компетентность героя и делает его почти универсальным мастером проверок.'],
  ['boon-of-recovery', 'Дар восстановления', 'Boon of Recovery', 'recovery', 'Дар восстановления помогает герою резко вернуть силы в момент, когда поражение уже близко.'],
  ['boon-of-spell-recall', 'Дар восстановления заклинаний', 'Boon of Spell Recall', 'spell', 'Дар восстановления заклинаний возвращает часть магического ресурса и позволяет колдующему герою продолжать борьбу.'],
  ['boon-of-high-magic', 'Дар высшей магии', 'Boon of High Magic', 'highMagic', 'Дар высшей магии открывает дополнительный предел для сильнейшей магии героя.'],
  ['boon-of-perfect-health', 'Дар идеального здоровья', 'Boon of Perfect Health', 'health', 'Дар идеального здоровья защищает тело героя от болезней, слабости и разрушительных воздействий.'],
  ['boon-of-truesight', 'Дар истинного зрения', 'Boon of Truesight', 'sight', 'Дар истинного зрения позволяет герою видеть сквозь иллюзии, тьму и обманчивые формы мира.'],
  ['boon-of-dimensional-travel', 'Дар межпространственного перемещения', 'Boon of Dimensional Travel', 'travel', 'Дар межпространственного перемещения даёт герою короткий путь через пространство и помогает уходить от невозможных позиций.'],
  ['boon-of-undetectability', 'Дар необнаружения', 'Boon of Undetectability', 'stealth', 'Дар необнаружения скрывает героя от магического поиска, слежки и иных попыток выследить его сверхъестественным способом.'],
  ['boon-of-irresistible-offense', 'Дар неотразимого нападения', 'Boon of Irresistible Offense', 'offense', 'Дар неотразимого нападения помогает пробивать защиту существ, которые обычно игнорируют часть урона.'],
  ['boon-of-peerless-aim', 'Дар несравненного прицела', 'Boon of Peerless Aim', 'aim', 'Дар несравненного прицела превращает точность героя в почти невозможный выстрел или удар по цели.'],
  ['boon-of-invincibility', 'Дар неуязвимости', 'Boon of Invincibility', 'invincible', 'Дар неуязвимости на короткое время делает героя почти недосягаемым для урона.'],
  ['boon-of-the-night-spirit', 'Дар ночного духа', 'Boon of the Night Spirit', 'night', 'Дар ночного духа связывает героя с тьмой, скрытностью и образом существа, исчезающего в ночи.'],
  ['boon-of-the-fire-soul', 'Дар огненной души', 'Boon of the Fire Soul', 'fire', 'Дар огненной души делает героя родственным пламени и защищает от огненной угрозы.'],
  ['boon-of-planar-travel', 'Дар путешествия по планам', 'Boon of Planar Travel', 'travel', 'Дар путешествия по планам позволяет герою открывать путь между мирами и действовать в масштабе космологии.'],
  ['boon-of-the-unfettered', 'Дар свободы', 'Boon of the Unfettered', 'freedom', 'Дар свободы помогает герою избегать сковывающих эффектов и двигаться там, где других удерживают.'],
  ['boon-of-speed', 'Дар скорости', 'Boon of Speed', 'speed', 'Дар скорости увеличивает темп героя и делает его перемещение заметной частью силы.'],
  ['boon-of-resilience', 'Дар сопротивления', 'Boon of Resilience', 'resilience', 'Дар сопротивления укрепляет героя против выбранного типа урона.'],
  ['boon-of-magic-resistance', 'Дар сопротивления магии', 'Boon of Magic Resistance', 'resilience', 'Дар сопротивления магии помогает герою противостоять заклинаниям и магическим эффектам.'],
  ['boon-of-fortitude', 'Дар стойкости', 'Boon of Fortitude', 'health', 'Дар стойкости увеличивает запас жизненных сил героя и делает его труднее сломить.'],
  ['boon-of-fate', 'Дар судьбы', 'Boon of Fate', 'fate', 'Дар судьбы позволяет герою вмешиваться в важные броски и менять ход событий.'],
  ['boon-of-luck', 'Дар удачи', 'Boon of Luck', 'luck', 'Дар удачи даёт герою резерв счастливого случая в моменты риска.'],
  ['boon-of-spell-mastery', 'Дар усвоенного заклинания', 'Boon of Spell Mastery', 'spell', 'Дар усвоенного заклинания превращает выбранную магию в почти естественную способность героя.']
]

function sourceUrl(slug) {
  return `https://5e14.ttg.club/screens/${slug.replaceAll('-', '_')}`
}

function buildBlocks(summary) {
  return [
    {
      title: 'Суть дара',
      paragraphs: [
        summary,
        'Эпический дар лучше выдавать за подвиг уровня легенды: победу над великой угрозой, завершение судьбоносной арки, вмешательство божества или переход кампании за пределы 20-го уровня.'
      ]
    },
    {
      title: 'Баланс и место в игре',
      paragraphs: [
        'Эти награды сильнее обычных находок. Перед выдачей определите, является ли дар постоянным, как он сочетается с магическими предметами и не перекрывает ли уникальность другого персонажа.',
        'Если дар меняет важную часть правил, заранее обозначьте его границы: частоту использования, тип действия, дистанцию, цель и взаимодействие с сопротивлениями, иммунитетами или заклинаниями.'
      ]
    },
    {
      title: 'Как описывать',
      paragraphs: [
        'Эпический дар должен ощущаться как часть легенды персонажа. Свяжите его с образом героя, прошлым выбором, покровителем, планом существования или силой, которую он победил.'
      ]
    }
  ]
}

function makeRule(entry) {
  const [slug, title, titleEn, icon, summary] = entry

  return {
    slug,
    title,
    titleEn,
    icon,
    source: 'DMG',
    sourceName: EPIC_BOONS_SCREEN_5E.sourceName,
    sourceUrl: sourceUrl(slug),
    group: 'core',
    groupTitle: 'Эпические дары',
    summary,
    quick: [
      { label: 'Раздел', value: 'Эпические дары' },
      { label: 'Источник', value: 'DMG' },
      { label: 'Тип', value: 'Эпическая награда' }
    ],
    terms: ['эпический дар', '20 уровень', 'награда', 'герой', 'кампания'],
    blocks: buildBlocks(summary)
  }
}

export const EPIC_BOON_RULE_GROUPS_5E = [
  {
    id: 'core',
    title: '',
    items: EPIC_BOON_ITEMS_5E.map(item => item[0])
  }
]

export const EPIC_BOON_RULES_5E = EPIC_BOON_ITEMS_5E.map(makeRule)

export const EPIC_BOON_RULE_BY_SLUG_5E = Object.fromEntries(EPIC_BOON_RULES_5E.map(rule => [rule.slug, rule]))

export const EPIC_BOON_GROUPS_WITH_RULES_5E = EPIC_BOON_RULE_GROUPS_5E.map(group => ({
  ...group,
  rules: group.items.map(slug => EPIC_BOON_RULE_BY_SLUG_5E[slug]).filter(Boolean)
}))

export function epicBoonRulePath(slug) {
  return `/dnd5e/screens/epic_boons/${slug}`
}
