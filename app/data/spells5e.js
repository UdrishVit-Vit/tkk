import { SPELL_SOURCES, SPELL_LEVELS, SPELL_SCHOOLS, SPELL_TAGS } from './spellLabels.js'
export { SPELL_SOURCES, SPELL_LEVELS, SPELL_SCHOOLS, SPELL_TAGS } from './spellLabels.js'


// Английские названия (для подзаголовка карточки). У самобытных заклинаний Эноа их нет.
export const SPELL_TITLES_EN = {
  'acid-splash': 'Acid Splash',
  'fire-bolt': 'Fire Bolt',
  'ray-of-frost': 'Ray of Frost',
  'mage-hand': 'Mage Hand',
  light: 'Light',
  'minor-illusion': 'Minor Illusion',
  prestidigitation: 'Prestidigitation',
  'vicious-mockery': 'Vicious Mockery',
  'toll-the-dead': 'Toll the Dead',
  'booming-blade': 'Booming Blade',
  'mind-sliver': 'Mind Sliver',
  'blade-ward': 'Blade Ward',
  'chill-touch': 'Chill Touch',
  'dancing-lights': 'Dancing Lights',
  druidcraft: 'Druidcraft',
  'eldritch-blast': 'Eldritch Blast',
  friends: 'Friends',
  'green-flame-blade': 'Green-Flame Blade',
  guidance: 'Guidance',
  infestation: 'Infestation',
  frostbite: 'Frostbite',
  'lightning-lure': 'Lightning Lure',
  mending: 'Mending',
  message: 'Message',
  'poison-spray': 'Poison Spray',
  'produce-flame': 'Produce Flame',
  resistance: 'Resistance',
  'sacred-flame': 'Sacred Flame',
  shillelagh: 'Shillelagh',
  'shocking-grasp': 'Shocking Grasp',
  'spare-the-dying': 'Spare the Dying',
  'sword-burst': 'Sword Burst',
  'thorn-whip': 'Thorn Whip',
  'true-strike': 'True Strike',
  'control-flames': 'Control Flames',
  'create-bonfire': 'Create Bonfire',
  gust: 'Gust',
  'magic-stone': 'Magic Stone',
  'mold-earth': 'Mold Earth',
  'primal-savagery': 'Primal Savagery',
  'shape-water': 'Shape Water',
  thaumaturgy: 'Thaumaturgy',
  thunderclap: 'Thunderclap',
  'word-of-radiance': 'Word of Radiance',
  // 1 уровень
  'hellish-rebuke': 'Hellish Rebuke',
  'silent-image': 'Silent Image',
  bless: 'Bless',
  'divine-favor': 'Divine Favor',
  'witch-bolt': 'Witch Bolt',
  thunderwave: 'Thunderwave',
  'magic-missile': 'Magic Missile',
  'compelled-duel': 'Compelled Duel',
  'cause-fear': 'Cause Fear',
  heroism: 'Heroism',
  'wrathful-smite': 'Wrathful Smite',
  'hail-of-thorns': 'Hail of Thorns',
  'thunderous-smite': 'Thunderous Smite',
  'dissonant-whispers': 'Dissonant Whispers',
  'armor-of-agathys': 'Armor of Agathys',
  'mage-armor': 'Mage Armor',
  'earth-tremor': 'Earth Tremor',
  'animal-friendship': 'Animal Friendship',
  'tashas-caustic-brew': 'Tasha’s Caustic Brew',
  'tashas-hideous-laughter': 'Tasha’s Hideous Laughter',
  'protection-from-evil-and-good': 'Protection from Evil and Good',
  'beast-bond': 'Beast Bond',
  catapult: 'Catapult',
  'ice-knife': 'Ice Knife',
  'healing-word': 'Healing Word',
  'cure-wounds': 'Cure Wounds',
  'ray-of-sickness': 'Ray of Sickness',
  'disguise-self': 'Disguise Self',
  'hunters-mark': 'Hunter’s Mark',
  'inflict-wounds': 'Inflict Wounds',
  'guiding-bolt': 'Guiding Bolt',
  'illusory-script': 'Illusory Script',
  'unseen-servant': 'Unseen Servant',
  'detect-poison-and-disease': 'Detect Poison and Disease',
  'detect-evil-and-good': 'Detect Evil and Good',
  'detect-magic': 'Detect Magic',
  'faerie-fire': 'Faerie Fire',
  'burning-hands': 'Burning Hands',
  identify: 'Identify',
  entangle: 'Entangle',
  'ensnaring-strike': 'Ensnaring Strike',
  'purify-food-and-drink': 'Purify Food and Drink',
  'charm-person': 'Charm Person',
  'feather-fall': 'Feather Fall',
  'searing-smite': 'Searing Smite',
  'absorb-elements': 'Absorb Elements',
  'find-familiar': 'Find Familiar',
  'comprehend-languages': 'Comprehend Languages',
  bane: 'Bane',
  'expeditious-retreat': 'Expeditious Retreat',
  command: 'Command',
  jump: 'Jump',
  'false-life': 'False Life',
  'speak-with-animals': 'Speak with Animals',
  'arms-of-hadar': 'Arms of Hadar',
  'color-spray': 'Color Spray',
  hex: 'Hex',
  alarm: 'Alarm',
  snare: 'Snare',
  grease: 'Grease',
  longstrider: 'Longstrider',
  'chaos-bolt': 'Chaos Bolt',
  'create-or-destroy-water': 'Create or Destroy Water',
  'tensers-floating-disk': 'Tenser’s Floating Disk',
  'fog-cloud': 'Fog Cloud',
  sanctuary: 'Sanctuary',
  'zephyr-strike': 'Zephyr Strike',
  sleep: 'Sleep',
  'chromatic-orb': 'Chromatic Orb',
  ceremony: 'Ceremony',
  goodberry: 'Goodberry',
  shield: 'Shield',
  'shield-of-faith': 'Shield of Faith',
  // 2 уровень
  'pass-without-trace': 'Pass without Trace',
  'spiritual-weapon': 'Spiritual Weapon',
  'continual-flame': 'Continual Flame',
  'see-invisibility': 'See Invisibility',
  suggestion: 'Suggestion',
  'magic-mouth': 'Magic Mouth',
  'arcane-lock': 'Arcane Lock',
  'phantasmal-force': 'Phantasmal Force',
  augury: 'Augury',
  'blindness-or-deafness': 'Blindness or Deafness',
  'flame-blade': 'Flame Blade',
  shatter: 'Shatter',
  barkskin: 'Barkskin',
  'dragons-breath': 'Dragon’s Breath',
  'beast-sense': 'Beast Sense',
  'cordon-of-arrows': 'Cordon of Arrows',
  'protection-from-poison': 'Protection from Poison',
  'warding-wind': 'Warding Wind',
  'maximilians-earthen-grasp': 'Maximilian’s Earthen Grasp',
  'healing-spirit': 'Healing Spirit',
  'branding-smite': 'Branding Smite',
  'crown-of-madness': 'Crown of Madness',
  levitate: 'Levitate',
  moonbeam: 'Moonbeam',
  'ray-of-enfeeblement': 'Ray of Enfeeblement',
  'magic-weapon': 'Magic Weapon',
  'lesser-restoration': 'Lesser Restoration',
  'melfs-acid-arrow': 'Melf’s Acid Arrow',
  'prayer-of-healing': 'Prayer of Healing',
  skywrite: 'Skywrite',
  invisibility: 'Invisibility',
  'gentle-repose': 'Gentle Repose',
  'nystuls-magic-aura': 'Nystul’s Magic Aura',
  'cloud-of-daggers': 'Cloud of Daggers',
  'zone-of-truth': 'Zone of Truth',
  'detect-thoughts': 'Detect Thoughts',
  knock: 'Knock',
  'mirror-image': 'Mirror Image',
  'warding-bond': 'Warding Bond',
  'scorching-ray': 'Scorching Ray',
  'spider-climb': 'Spider Climb',
  web: 'Web',
  'aganazzars-scorcher': 'Aganazzar’s Scorcher',
  pyrotechnics: 'Pyrotechnics',
  aid: 'Aid',
  'locate-animals-or-plants': 'Locate Animals or Plants',
  'find-traps': 'Find Traps',
  'locate-object': 'Locate Object',
  'find-steed': 'Find Steed',
  'gust-of-wind': 'Gust of Wind',
  'animal-messenger': 'Animal Messenger',
  'summon-beast': 'Summon Beast',
  'mind-spike': 'Mind Spike',
  'tashas-mind-whip': 'Tasha’s Mind Whip',
  'flaming-sphere': 'Flaming Sphere',
  'dust-devil': 'Dust Devil',
  blur: 'Blur',
  'heat-metal': 'Heat Metal',
  enthrall: 'Enthrall',
  'alter-self': 'Alter Self',
  'snillocs-snowball-swarm': 'Snilloc’s Snowball Swarm',
  darkvision: 'Darkvision',
  'shadow-blade': 'Shadow Blade',
  silence: 'Silence',
  'rope-trick': 'Rope Trick',
  'misty-step': 'Misty Step',
  darkness: 'Darkness',
  'enlarge-or-reduce': 'Enlarge/Reduce',
  'hold-person': 'Hold Person',
  earthbind: 'Earthbind',
  'enhance-ability': 'Enhance Ability',
  'calm-emotions': 'Calm Emotions',
  'spike-growth': 'Spike Growth',
  // 3 уровень
  'aura-of-vitality': 'Aura of Vitality',
  'wall-of-water': 'Wall of Water',
  revivify: 'Revivify',
  'animate-dead': 'Animate Dead',
  'conjure-animals': 'Conjure Animals',
  'conjure-barrage': 'Conjure Barrage',
  'gaseous-form': 'Gaseous Form',
  'hypnotic-pattern': 'Hypnotic Pattern',
  'hunger-of-hadar': 'Hunger of Hadar',
  'thunder-step': 'Thunder Step',
  daylight: 'Daylight',
  catnap: 'Catnap',
  'spirit-guardians': 'Spirit Guardians',
  slow: 'Slow',
  'protection-from-energy': 'Protection from Energy',
  'stinking-cloud': 'Stinking Cloud',
  'erupting-earth': 'Erupting Earth',
  'enemies-abound': 'Enemies Abound',
  counterspell: 'Counterspell',
  'intellect-fortress': 'Intellect Fortress',
  'tiny-servant': 'Tiny Servant',
  'leomunds-tiny-hut': 'Leomund’s Tiny Hut',
  'magic-circle': 'Magic Circle',
  'crusaders-mantle': 'Crusader’s Mantle',
  'beacon-of-hope': 'Beacon of Hope',
  'melfs-minute-meteors': 'Melf’s Minute Meteors',
  blink: 'Blink',
  'sleet-storm': 'Sleet Storm',
  'mass-healing-word': 'Mass Healing Word',
  'lightning-arrow': 'Lightning Arrow',
  'lightning-bolt': 'Lightning Bolt',
  nondetection: 'Nondetection',
  'major-image': 'Major Image',
  fireball: 'Fireball',
  'blinding-smite': 'Blinding Smite',
  'glyph-of-warding': 'Glyph of Warding',
  'life-transference': 'Life Transference',
  'wall-of-sand': 'Wall of Sand',
  'water-breathing': 'Water Breathing',
  clairvoyance: 'Clairvoyance',
  'spirit-shroud': 'Spirit Shroud',
  fly: 'Fly',
  sending: 'Sending',
  'phantom-steed': 'Phantom Steed',
  'summon-undead': 'Summon Undead',
  'summon-shadowspawn': 'Summon Shadowspawn',
  'summon-fey': 'Summon Fey',
  'call-lightning': 'Call Lightning',
  'summon-lesser-demons': 'Summon Lesser Demons',
  'vampiric-touch': 'Vampiric Touch',
  'tidal-wave': 'Tidal Wave',
  'feign-death': 'Feign Death',
  'bestow-curse': 'Bestow Curse',
  'flame-arrows': 'Flame Arrows',
  'speak-with-dead': 'Speak with Dead',
  'speak-with-plants': 'Speak with Plants',
  'dispel-magic': 'Dispel Magic',
  'plant-growth': 'Plant Growth',
  'meld-into-stone': 'Meld Into Stone',
  'remove-curse': 'Remove Curse',
  'create-food-and-water': 'Create Food and Water',
  'wind-wall': 'Wind Wall',
  'elemental-weapon': 'Elemental Weapon',
  fear: 'Fear',
  haste: 'Haste',
  'water-walk': 'Water Walk',
  tongues: 'Tongues',
  // 4 уровень
  'aura-of-life': 'Aura of Life',
  'aura-of-purity': 'Aura of Purity',
  'sickening-radiance': 'Sickening Radiance',
  'mordenkainens-faithful-hound': 'Mordenkainen’s Faithful Hound',
  'control-water': 'Control Water',
  'watery-sphere': 'Watery Sphere',
  'phantasmal-killer': 'Phantasmal Killer',
  'conjure-woodland-beings': 'Conjure Woodland Beings',
  'conjure-minor-elementals': 'Conjure Minor Elementals',
  'greater-invisibility': 'Greater Invisibility',
  'giant-insect': 'Giant Insect',
  'ice-storm': 'Ice Storm',
  'vitriolic-sphere': 'Vitriolic Sphere',
  'death-ward': 'Death Ward',
  banishment: 'Banishment',
  fabricate: 'Fabricate',
  'stone-shape': 'Stone Shape',
  'mordenkainens-private-sanctum': 'Mordenkainen’s Private Sanctum',
  stoneskin: 'Stoneskin',
  'leomunds-secret-chest': 'Leomund’s Secret Chest',
  'arcane-eye': 'Arcane Eye',
  'hallucinatory-terrain': 'Hallucinatory Terrain',
  'shadow-of-moil': 'Shadow of Moil',
  'staggering-smite': 'Staggering Smite',
  'wall-of-fire': 'Wall of Fire',
  'fire-shield': 'Fire Shield',
  'otilukes-resilient-sphere': 'Otiluke’s Resilient Sphere',
  'charm-monster': 'Charm Monster',
  'dimension-door': 'Dimension Door',
  'dominate-beast': 'Dominate Beast',
  'find-greater-steed': 'Find Greater Steed',
  'locate-creature': 'Locate Creature',
  polymorph: 'Polymorph',
  divination: 'Divination',
  'summon-greater-demon': 'Summon Greater Demon',
  'summon-aberration': 'Summon Aberration',
  'summon-construct': 'Summon Construct',
  'summon-elemental': 'Summon Elemental',
  compulsion: 'Compulsion',
  'elemental-bane': 'Elemental Bane',
  'freedom-of-movement': 'Freedom of Movement',
  confusion: 'Confusion',
  'guardian-of-faith': 'Guardian of Faith',
  'guardian-of-nature': 'Guardian of Nature',
  'storm-sphere': 'Storm Sphere',
  blight: 'Blight',
  'grasping-vine': 'Grasping Vine',
  'evards-black-tentacles': 'Evard’s Black Tentacles',
  // 5 уровень
  'swift-quiver': 'Swift Quiver',
  'control-winds': 'Control Winds',
  maelstrom: 'Maelstrom',
  'conjure-elemental': 'Conjure Elemental',
  'wrath-of-nature': 'Wrath of Nature',
  'far-step': 'Far Step',
  'bigbys-hand': 'Bigby’s Hand',
  'tree-stride': 'Tree Stride',
  'banishing-smite': 'Banishing Smite',
  'modify-memory': 'Modify Memory',
  'infernal-calling': 'Infernal Calling',
  immolation: 'Immolation',
  'wall-of-stone': 'Wall of Stone',
  'circle-of-power': 'Circle of Power',
  scrying: 'Scrying',
  'insect-plague': 'Insect Plague',
  enervation: 'Enervation',
  cloudkill: 'Cloudkill',
  'animate-objects': 'Animate Objects',
  'danse-macabre': 'Danse Macabre',
  'dominate-person': 'Dominate Person',
  'antilife-shell': 'Antilife Shell',
  'summon-celestial': 'Summon Celestial',
  dawn: 'Dawn',
  'dispel-evil-and-good': 'Dispel Evil and Good',
  'holy-weapon': 'Holy Weapon',
  'wall-of-force': 'Wall of Force',
  'wall-of-light': 'Wall of Light',
  telekinesis: 'Telekinesis',
  'hold-monster': 'Hold Monster',
  'skill-empowerment': 'Skill Empowerment',
  mislead: 'Mislead',
  dream: 'Dream',
  'conjure-volley': 'Conjure Volley',
  'greater-restoration': 'Greater Restoration',
  contagion: 'Contagion',
  'legend-lore': 'Legend Lore',
  'cone-of-cold': 'Cone of Cold',
  'teleportation-circle': 'Teleportation Circle',
  'rarys-telepathic-bond': 'Rary’s Telepathic Bond',
  'mass-cure-wounds': 'Mass Cure Wounds',
  'flame-strike': 'Flame Strike',
  geas: 'Geas',
  commune: 'Commune',
  'commune-with-nature': 'Commune with Nature',
  'raise-dead': 'Raise Dead',
  'planar-binding': 'Planar Binding',
  'negative-energy-flood': 'Negative Energy Flood',
  'transmute-rock': 'Transmute Rock',
  seeming: 'Seeming',
  awaken: 'Awaken',
  'destructive-wave': 'Destructive Wave',
  reincarnate: 'Reincarnate',
  'contact-other-plane': 'Contact Other Plane',
  hallow: 'Hallow',
  'synaptic-static': 'Synaptic Static',
  passwall: 'Passwall',
  creation: 'Creation',
  'steel-wind-strike': 'Steel Wind Strike',
  // 6 уровень
  'conjure-fey': 'Conjure Fey',
  'move-earth': 'Move Earth',
  'wall-of-ice': 'Wall of Ice',
  'arcane-gate': 'Arcane Gate',
  'mental-prison': 'Mental Prison',
  'ottos-irresistible-dance': 'Otto’s Irresistible Dance',
  'investiture-of-wind': 'Investiture of Wind',
  'investiture-of-stone': 'Investiture of Stone',
  'investiture-of-ice': 'Investiture of Ice',
  'investiture-of-flame': 'Investiture of Flame',
  'flesh-to-stone': 'Flesh to Stone',
  'primordial-ward': 'Primordial Ward',
  'find-the-path': 'Find the Path',
  'tashas-otherworldly-guise': 'Tasha’s Otherworldly Guise',
  'summon-fiend': 'Summon Fiend',
  eyebite: 'Eyebite',
  sunbeam: 'Sunbeam',
  'blade-barrier': 'Blade Barrier',
  'globe-of-invulnerability': 'Globe of Invulnerability',
  'wall-of-thorns': 'Wall of Thorns',
  'tensers-transformation': 'Tenser’s Transformation',
  'magic-jar': 'Magic Jar',
  'drawmijs-instant-summons': 'Drawmij’s Instant Summons',
  'programmed-illusion': 'Programmed Illusion',
  forbiddance: 'Forbiddance',
  'true-seeing': 'True Seeing',
  'soul-cage': 'Soul Cage',
  'bones-of-the-earth': 'Bones of the Earth',
  'circle-of-death': 'Circle of Death',
  'mass-suggestion': 'Mass Suggestion',
  'otilukes-freezing-sphere': 'Otiluke’s Freezing Sphere',
  'heroes-feast': 'Heroes’ Feast',
  'planar-ally': 'Planar Ally',
  'chain-lightning': 'Chain Lightning',
  heal: 'Heal',
  harm: 'Harm',
  contingency: 'Contingency',
  'transport-via-plants': 'Transport via Plants',
  scatter: 'Scatter',
  disintegrate: 'Disintegrate',
  'druid-grove': 'Druid Grove',
  'word-of-recall': 'Word of Recall',
  'create-homunculus': 'Create Homunculus',
  'create-undead': 'Create Undead',
  'guards-and-wards': 'Guards and Wards',
  'wind-walk': 'Wind Walk',
  // 7 уровень
  'conjure-celestial': 'Conjure Celestial',
  'delayed-blast-fireball': 'Delayed Blast Fireball',
  'reverse-gravity': 'Reverse Gravity',
  'mordenkainens-sword': 'Mordenkainen’s Sword',
  'project-image': 'Project Image',
  whirlwind: 'Whirlwind',
  'divine-word': 'Divine Word',
  'mordenkainens-magnificent-mansion': 'Mordenkainen’s Magnificent Mansion',
  resurrection: 'Resurrection',
  symbol: 'Symbol',
  sequester: 'Sequester',
  'crown-of-stars': 'Crown of Stars',
  'fire-storm': 'Fire Storm',
  'finger-of-death': 'Finger of Death',
  simulacrum: 'Simulacrum',
  'prismatic-spray': 'Prismatic Spray',
  regenerate: 'Regenerate',
  'power-word-pain': 'Power Word Pain',
  'dream-of-the-blue-veil': 'Dream of the Blue Veil',
  'mirage-arcane': 'Mirage Arcane',
  teleport: 'Teleport',
  forcecage: 'Forcecage',
  'plane-shift': 'Plane Shift',
  'temple-of-the-gods': 'Temple of the Gods',
  etherealness: 'Etherealness',
  // 8 уровень
  'holy-aura': 'Holy Aura',
  'control-weather': 'Control Weather',
  'incendiary-cloud': 'Incendiary Cloud',
  earthquake: 'Earthquake',
  'illusory-dragon': 'Illusory Dragon',
  maze: 'Maze',
  'maddening-darkness': 'Maddening Darkness',
  'dominate-monster': 'Dominate Monster',
  'animal-shapes': 'Animal Shapes',
  'antimagic-field': 'Antimagic Field',
  tsunami: 'Tsunami',
  'antipathy-or-sympathy': 'Antipathy/Sympathy',
  clone: 'Clone',
  demiplane: 'Demiplane',
  'mighty-fortress': 'Mighty Fortress',
  glibness: 'Glibness',
  feeblemind: 'Feeblemind',
  'power-word-stun': 'Power Word Stun',
  'mind-blank': 'Mind Blank',
  sunburst: 'Sunburst',
  telepathy: 'Telepathy',
  'abi-dalzims-horrid-wilting': 'Abi-Dalzim’s Horrid Wilting',
  // 9 уровень
  gate: 'Gate',
  'storm-of-vengeance': 'Storm of Vengeance',
  'true-polymorph': 'True Polymorph',
  'blade-of-disaster': 'Blade of Disaster',
  'mass-polymorph': 'Mass Polymorph',
  invulnerability: 'Invulnerability',
  shapechange: 'Shapechange',
  weird: 'Weird',
  imprisonment: 'Imprisonment',
  wish: 'Wish',
  'true-resurrection': 'True Resurrection',
  'meteor-swarm': 'Meteor Swarm',
  'mass-heal': 'Mass Heal',
  'time-stop': 'Time Stop',
  foresight: 'Foresight',
  'astral-projection': 'Astral Projection',
  'psychic-scream': 'Psychic Scream',
  'prismatic-wall': 'Prismatic Wall',
  'power-word-heal': 'Power Word Heal',
  'power-word-kill': 'Power Word Kill'
}

export const DAMAGE_TYPES = {
  none: 'Без урона',
  bludgeoning: 'Дробящий',
  piercing: 'Колющий',
  slashing: 'Рубящий',
  fire: 'Огонь',
  cold: 'Холод',
  lightning: 'Электричество',
  poison: 'Яд',
  acid: 'Кислота',
  thunder: 'Звук',
  necrotic: 'Некротическая энергия',
  radiant: 'Излучение',
  force: 'Силовое поле',
  psychic: 'Психическая энергия'
}

export const SAVES = {
  str: 'Сила',
  dex: 'Ловкость',
  con: 'Телосложение',
  int: 'Интеллект',
  wis: 'Мудрость',
  cha: 'Харизма'
}

// Структурированная метаинформация для фильтров: тип урона, спасбросок, лечение,
// расходуемый материал. Указывается только там, где применимо.
export const SPELL_META = {
  // ── Заговоры ──
  'acid-splash': { damage: ['acid'], save: 'dex' },
  'fire-bolt': { damage: ['fire'] },
  'ray-of-frost': { damage: ['cold'] },
  light: { save: 'dex' },
  'vicious-mockery': { damage: ['psychic'], save: 'wis' },
  'toll-the-dead': { damage: ['necrotic'], save: 'wis' },
  'booming-blade': { damage: ['thunder'] },
  'mind-sliver': { damage: ['psychic'], save: 'int' },
  'chill-touch': { damage: ['necrotic'] },
  'eldritch-blast': { damage: ['force'] },
  'green-flame-blade': { damage: ['fire'] },
  infestation: { damage: ['poison'], save: 'con' },
  frostbite: { damage: ['cold'], save: 'con' },
  'lightning-lure': { damage: ['lightning'], save: 'str' },
  'poison-spray': { damage: ['poison'], save: 'con' },
  'produce-flame': { damage: ['fire'] },
  'sacred-flame': { damage: ['radiant'], save: 'dex' },
  'shocking-grasp': { damage: ['lightning'] },
  'sword-burst': { damage: ['force'], save: 'dex' },
  'thorn-whip': { damage: ['piercing'] },
  'create-bonfire': { damage: ['fire'], save: 'dex' },
  gust: { save: 'str' },
  'magic-stone': { damage: ['bludgeoning'] },
  'primal-savagery': { damage: ['acid'] },
  thunderclap: { damage: ['thunder'], save: 'con' },
  'word-of-radiance': { damage: ['radiant'], save: 'con' },
  // ── 1 уровень ──
  'hellish-rebuke': { damage: ['fire'], save: 'dex' },
  'divine-favor': { damage: ['radiant'] },
  'witch-bolt': { damage: ['lightning'] },
  thunderwave: { damage: ['thunder'], save: 'con' },
  'magic-missile': { damage: ['force'] },
  'compelled-duel': { save: 'wis' },
  'cause-fear': { save: 'wis' },
  heroism: { healing: 'temp' },
  'wrathful-smite': { damage: ['psychic'], save: 'wis' },
  'hail-of-thorns': { damage: ['piercing'], save: 'dex' },
  'thunderous-smite': { damage: ['thunder'], save: 'str' },
  'dissonant-whispers': { damage: ['psychic'], save: 'wis' },
  'armor-of-agathys': { damage: ['cold'], healing: 'temp' },
  'earth-tremor': { damage: ['bludgeoning'], save: 'dex' },
  'animal-friendship': { save: 'wis' },
  'tashas-caustic-brew': { damage: ['acid'], save: 'dex' },
  'tashas-hideous-laughter': { save: 'wis' },
  catapult: { damage: ['bludgeoning'], save: 'dex' },
  'ice-knife': { damage: ['piercing', 'cold'], save: 'dex' },
  'healing-word': { healing: 'hits' },
  'cure-wounds': { healing: 'hits' },
  'ray-of-sickness': { damage: ['poison'], save: 'con' },
  'inflict-wounds': { damage: ['necrotic'] },
  'guiding-bolt': { damage: ['radiant'] },
  'illusory-script': { consumed: true },
  'burning-hands': { damage: ['fire'], save: 'dex' },
  'charm-person': { save: 'wis' },
  'find-familiar': { consumed: true },
  'command': { save: 'wis' },
  'false-life': { healing: 'temp' },
  'arms-of-hadar': { damage: ['necrotic'], save: 'str' },
  snare: { save: 'dex', consumed: true },
  grease: { save: 'dex' },
  'chaos-bolt': { damage: ['acid', 'cold', 'fire', 'force', 'lightning', 'poison', 'psychic', 'thunder'] },
  sanctuary: { save: 'wis' },
  'chromatic-orb': { damage: ['acid', 'cold', 'fire', 'lightning', 'poison', 'thunder'] },
  ceremony: { consumed: true },
  goodberry: { healing: 'hits' },
  'faerie-fire': { save: 'dex' },
  entangle: { save: 'str' },
  'ensnaring-strike': { damage: ['piercing'], save: 'str' },
  'searing-smite': { damage: ['fire'], save: 'con' },
  bane: { save: 'cha' },
  hex: { damage: ['necrotic'] },
  'zephyr-strike': { damage: ['force'] },
  // ── 2 уровень ──
  'spiritual-weapon': { damage: ['force'] },
  'continual-flame': { consumed: true },
  'magic-mouth': { consumed: true },
  'arcane-lock': { consumed: true },
  'blindness-or-deafness': { save: 'con' },
  suggestion: { save: 'wis' },
  'phantasmal-force': { damage: ['psychic'], save: 'int' },
  'flame-blade': { damage: ['fire'] },
  shatter: { damage: ['thunder'], save: 'con' },
  'dragons-breath': { damage: ['acid', 'cold', 'fire', 'lightning', 'poison'], save: 'dex' },
  'cordon-of-arrows': { damage: ['piercing'], save: 'dex' },
  'maximilians-earthen-grasp': { damage: ['bludgeoning'], save: 'str' },
  'healing-spirit': { healing: 'hits' },
  'branding-smite': { damage: ['radiant'] },
  'crown-of-madness': { save: 'wis' },
  levitate: { save: 'con' },
  moonbeam: { damage: ['radiant'], save: 'con' },
  'ray-of-enfeeblement': { save: 'con' },
  'melfs-acid-arrow': { damage: ['acid'] },
  'prayer-of-healing': { healing: 'hits' },
  'cloud-of-daggers': { damage: ['slashing'] },
  'zone-of-truth': { save: 'cha' },
  'detect-thoughts': { save: 'wis' },
  'scorching-ray': { damage: ['fire'] },
  'aganazzars-scorcher': { damage: ['fire'], save: 'dex' },
  pyrotechnics: { save: 'con' },
  aid: { healing: 'hits' },
  web: { save: 'dex' },
  'gust-of-wind': { save: 'str' },
  'mind-spike': { damage: ['psychic'], save: 'wis' },
  'tashas-mind-whip': { damage: ['psychic'], save: 'int' },
  'flaming-sphere': { damage: ['fire'], save: 'dex' },
  'dust-devil': { damage: ['bludgeoning'], save: 'str' },
  'heat-metal': { damage: ['fire'], save: 'con' },
  enthrall: { save: 'wis' },
  'snillocs-snowball-swarm': { damage: ['cold'], save: 'dex' },
  'shadow-blade': { damage: ['psychic'] },
  'enlarge-or-reduce': { save: 'con' },
  'hold-person': { save: 'wis' },
  earthbind: { save: 'dex' },
  'calm-emotions': { save: 'cha' },
  'spike-growth': { damage: ['piercing'] },
  // ── 3 уровень ──
  'aura-of-vitality': { healing: 'hits' },
  revivify: { healing: 'hits', consumed: true },
  'conjure-barrage': { damage: ['bludgeoning', 'piercing', 'slashing'], save: 'dex' },
  'hypnotic-pattern': { save: 'wis' },
  'hunger-of-hadar': { damage: ['cold', 'acid'], save: 'dex' },
  'thunder-step': { damage: ['thunder'], save: 'con' },
  'spirit-guardians': { damage: ['radiant', 'necrotic'], save: 'wis' },
  slow: { save: 'wis' },
  'stinking-cloud': { save: 'con' },
  'erupting-earth': { damage: ['bludgeoning'], save: 'dex' },
  'enemies-abound': { save: 'int' },
  'magic-circle': { save: 'cha', consumed: true },
  'crusaders-mantle': { damage: ['radiant'] },
  'beacon-of-hope': { healing: 'hits' },
  'melfs-minute-meteors': { damage: ['fire'], save: 'dex' },
  'sleet-storm': { save: 'dex' },
  'mass-healing-word': { healing: 'hits' },
  'lightning-arrow': { damage: ['lightning'], save: 'dex' },
  'lightning-bolt': { damage: ['lightning'], save: 'dex' },
  nondetection: { consumed: true },
  fireball: { damage: ['fire'], save: 'dex' },
  'blinding-smite': { damage: ['radiant'], save: 'con' },
  'glyph-of-warding': { damage: ['acid', 'cold', 'fire', 'lightning', 'thunder'], save: 'dex', consumed: true },
  'life-transference': { damage: ['necrotic'], healing: 'hits' },
  'spirit-shroud': { damage: ['necrotic', 'radiant', 'cold'] },
  'call-lightning': { damage: ['lightning'], save: 'dex' },
  'vampiric-touch': { damage: ['necrotic'], healing: 'hits' },
  'tidal-wave': { damage: ['bludgeoning'], save: 'dex' },
  'bestow-curse': { damage: ['necrotic'], save: 'wis' },
  'flame-arrows': { damage: ['fire'] },
  'wind-wall': { damage: ['bludgeoning'], save: 'str' },
  'elemental-weapon': { damage: ['acid', 'cold', 'fire', 'lightning', 'thunder'] },
  fear: { save: 'wis' },
  // ── 4 уровень ──
  'aura-of-life': { healing: 'hits' },
  'sickening-radiance': { damage: ['radiant'], save: 'con' },
  'mordenkainens-faithful-hound': { damage: ['piercing'] },
  'watery-sphere': { save: 'str' },
  'phantasmal-killer': { damage: ['psychic'], save: 'wis' },
  'ice-storm': { damage: ['bludgeoning', 'cold'], save: 'dex' },
  'vitriolic-sphere': { damage: ['acid'], save: 'dex' },
  banishment: { save: 'cha' },
  'shadow-of-moil': { damage: ['necrotic'] },
  'staggering-smite': { damage: ['psychic'], save: 'wis' },
  'wall-of-fire': { damage: ['fire'], save: 'dex' },
  'fire-shield': { damage: ['fire', 'cold'] },
  'otilukes-resilient-sphere': { save: 'dex' },
  'charm-monster': { save: 'wis' },
  'dominate-beast': { save: 'wis' },
  polymorph: { save: 'wis' },
  divination: { consumed: true },
  'summon-greater-demon': { save: 'cha' },
  compulsion: { save: 'wis' },
  'elemental-bane': { save: 'con' },
  confusion: { save: 'wis' },
  'guardian-of-faith': { damage: ['radiant'], save: 'dex' },
  'storm-sphere': { damage: ['bludgeoning', 'lightning'], save: 'str' },
  blight: { damage: ['necrotic'], save: 'con' },
  'grasping-vine': { save: 'dex' },
  'evards-black-tentacles': { damage: ['bludgeoning'], save: 'dex' },
  // ── 5 уровень ──
  maelstrom: { damage: ['bludgeoning'], save: 'str' },
  'bigbys-hand': { damage: ['force'], save: 'str' },
  'banishing-smite': { damage: ['force'] },
  'modify-memory': { save: 'wis' },
  immolation: { damage: ['fire'], save: 'dex' },
  scrying: { save: 'wis' },
  'insect-plague': { damage: ['piercing'], save: 'con' },
  enervation: { damage: ['necrotic'], save: 'dex', healing: 'hits' },
  cloudkill: { damage: ['poison'], save: 'con' },
  'animate-objects': { damage: ['bludgeoning'] },
  'dominate-person': { save: 'wis' },
  dawn: { damage: ['radiant'], save: 'con' },
  'holy-weapon': { damage: ['radiant'], save: 'con' },
  'wall-of-light': { damage: ['radiant'], save: 'con' },
  telekinesis: { save: 'str' },
  'hold-monster': { save: 'wis' },
  'conjure-volley': { damage: ['piercing'], save: 'dex' },
  contagion: { save: 'con' },
  'cone-of-cold': { damage: ['cold'], save: 'con' },
  'mass-cure-wounds': { healing: 'hits' },
  'flame-strike': { damage: ['fire', 'radiant'], save: 'dex' },
  geas: { save: 'wis' },
  'raise-dead': { healing: 'hits' },
  'planar-binding': { save: 'cha' },
  'negative-energy-flood': { damage: ['necrotic'], save: 'con' },
  'transmute-rock': { save: 'dex' },
  seeming: { save: 'cha' },
  'destructive-wave': { damage: ['thunder', 'radiant', 'necrotic'], save: 'con' },
  'reincarnate': { healing: 'hits' },
  'contact-other-plane': { damage: ['psychic'], save: 'int' },
  'synaptic-static': { damage: ['psychic'], save: 'int' },
  'steel-wind-strike': { damage: ['force'] },
  // ── 6 уровень ──
  'wall-of-ice': { damage: ['cold'], save: 'dex' },
  'mental-prison': { damage: ['psychic'], save: 'int' },
  'ottos-irresistible-dance': { save: 'wis' },
  'investiture-of-ice': { damage: ['cold'], save: 'con' },
  'investiture-of-flame': { damage: ['fire'], save: 'dex' },
  'flesh-to-stone': { save: 'con' },
  eyebite: { save: 'wis' },
  sunbeam: { damage: ['radiant'], save: 'con' },
  'blade-barrier': { damage: ['slashing'], save: 'dex' },
  'wall-of-thorns': { damage: ['piercing'], save: 'dex' },
  'magic-jar': { save: 'cha' },
  forbiddance: { damage: ['radiant', 'necrotic'] },
  'bones-of-the-earth': { damage: ['bludgeoning'], save: 'dex' },
  'circle-of-death': { damage: ['necrotic'], save: 'con' },
  'mass-suggestion': { save: 'wis' },
  'otilukes-freezing-sphere': { damage: ['cold'], save: 'con' },
  'heroes-feast': { healing: 'hits' },
  'chain-lightning': { damage: ['lightning'], save: 'dex' },
  heal: { healing: 'hits' },
  harm: { damage: ['necrotic'], save: 'con' },
  scatter: { save: 'cha' },
  disintegrate: { damage: ['force'], save: 'dex' },
  // ── 7 уровень ──
  'delayed-blast-fireball': { damage: ['fire'], save: 'dex' },
  'reverse-gravity': { save: 'dex' },
  'mordenkainens-sword': { damage: ['force'] },
  whirlwind: { damage: ['bludgeoning'], save: 'dex' },
  'divine-word': { save: 'cha' },
  resurrection: { healing: 'hits' },
  'crown-of-stars': { damage: ['radiant'] },
  'fire-storm': { damage: ['fire'], save: 'dex' },
  'finger-of-death': { damage: ['necrotic'], save: 'con' },
  'prismatic-spray': { damage: ['fire', 'acid', 'lightning', 'poison', 'cold'], save: 'dex' },
  regenerate: { healing: 'hits' },
  'plane-shift': { save: 'cha' },
  // ── 8 уровень ──
  'incendiary-cloud': { damage: ['fire'], save: 'dex' },
  earthquake: { damage: ['bludgeoning'], save: 'dex' },
  'illusory-dragon': { damage: ['acid', 'cold', 'fire', 'lightning', 'poison'], save: 'int' },
  'maddening-darkness': { damage: ['psychic'], save: 'wis' },
  'dominate-monster': { save: 'wis' },
  tsunami: { damage: ['bludgeoning'], save: 'str' },
  'antipathy-or-sympathy': { save: 'wis' },
  feeblemind: { damage: ['psychic'], save: 'int' },
  sunburst: { damage: ['radiant'], save: 'con' },
  'abi-dalzims-horrid-wilting': { damage: ['necrotic'], save: 'con' },
  // ── 9 уровень ──
  'storm-of-vengeance': { damage: ['thunder', 'acid', 'lightning', 'cold'], save: 'con' },
  'true-polymorph': { save: 'wis' },
  'blade-of-disaster': { damage: ['force'] },
  'mass-polymorph': { save: 'wis' },
  weird: { damage: ['psychic'], save: 'wis' },
  imprisonment: { save: 'wis' },
  'true-resurrection': { healing: 'hits' },
  'meteor-swarm': { damage: ['fire', 'bludgeoning'], save: 'dex' },
  'mass-heal': { healing: 'hits' },
  'psychic-scream': { damage: ['psychic'], save: 'int' },
  'prismatic-wall': { damage: ['fire', 'acid', 'lightning', 'poison', 'cold'], save: 'dex' },
  'power-word-heal': { healing: 'hits' },
  // ── Заклинания Эноа ──
  'fortune-absorption': { save: 'wis' },
  'living-flesh': { healing: 'hits' },
  'self-ignition': { damage: ['fire'], save: 'con' },
  void: { damage: ['necrotic'] }
}







function spell(id, title, level, school, castingTime, range, components, duration, tags, description, options = {}) {
  return {
    id,
    title,
    level,
    school,
    castingTime,
    range,
    components,
    duration,
    tags,
    source: options.source || 'TU',
    classes: options.classes || [],
    description,
    sections: options.sections || [],
    table: options.table || null
  }
}

export const SPELLS_5E = [
  // ── Заговоры (базовые, PHB / XGE / TCE) ──────────────────────────
  spell(
    'acid-splash', 'Брызги кислоты', 0, 'evocation',
    '1 действие', '60 фт.', 'В, С', 'Мгновенная',
    ['damage'],
    'Вы бросаете пузырь кислоты. Выберите одно существо в пределах дистанции или двух существ в пределах дистанции, которые стоят не дальше 5 футов друг от друга. Цель должна преуспеть в спасброске Ловкости, иначе получит 1к6 урона кислотой. Урон заклинания увеличивается на 1к6, когда вы достигаете 5-го уровня (2к6), 11-го уровня (3к6) и 17-го уровня (4к6).',
    {
      source: 'PHB',
      classes: ['Волшебник', 'Чародей', 'Изобретатель']
    }
  ),
  spell(
    'fire-bolt', 'Огненный снаряд', 0, 'evocation',
    '1 действие', '120 фт.', 'В, С', 'Мгновенная',
    ['damage'],
    'Вы бросаете сгусток огня в существо или предмет в пределах дистанции. Совершите по цели дальнобойную атаку заклинанием. При попадании цель получает 1к10 урона огнём. Горючий предмет, который никто не несёт и не носит, загорается от попадания. Урон заклинания увеличивается на 1к10, когда вы достигаете 5-го уровня (2к10), 11-го уровня (3к10) и 17-го уровня (4к10).',
    {
      source: 'PHB',
      classes: ['Волшебник', 'Чародей', 'Изобретатель']
    }
  ),
  spell(
    'ray-of-frost', 'Луч холода', 0, 'evocation',
    '1 действие', '60 фт.', 'В, С', 'Мгновенная',
    ['damage', 'control'],
    'Холодный бело-голубой луч устремляется к существу в пределах дистанции. Совершите по цели дальнобойную атаку заклинанием. При попадании цель получает 1к8 урона холодом, а её скорость уменьшается на 10 футов до начала вашего следующего хода. Урон заклинания увеличивается на 1к8, когда вы достигаете 5-го уровня (2к8), 11-го уровня (3к8) и 17-го уровня (4к8).',
    {
      source: 'PHB',
      classes: ['Волшебник', 'Чародей', 'Изобретатель']
    }
  ),
  spell(
    'mage-hand', 'Волшебная рука', 0, 'conjuration',
    '1 действие', '30 фт.', 'В, С', '1 минута',
    ['utility'],
    'В точке, выбранной в пределах дистанции, появляется призрачная парящая рука. Рука существует до конца действия заклинания или пока вы не отпустите её действием. Она исчезает, если окажется дальше 30 футов от вас или если вы сотворите это заклинание снова.',
    {
      source: 'PHB',
      classes: ['Волшебник', 'Чародей', 'Бард', 'Колдун', 'Изобретатель'],
      sections: [
        { title: 'Управление', text: 'Действием вы можете управлять рукой: манипулировать предметом, открыть незапертую дверь или контейнер, убрать предмет в открытый контейнер или достать его оттуда, вылить содержимое флакона. При каждом использовании руку можно переместить на расстояние до 30 футов.' },
        { title: 'Ограничения', text: 'Рука не может атаковать, активировать магические предметы и переносить больше 10 фунтов.' }
      ]
    }
  ),
  spell(
    'light', 'Свет', 0, 'evocation',
    '1 действие', 'Касание', 'В, М (светлячок или фосфоресцирующий мох)', '1 час',
    ['utility'],
    'Вы касаетесь одного предмета, ни одно измерение которого не превышает 10 футов. Пока заклинание действует, предмет испускает яркий свет в радиусе 20 футов и тусклый свет ещё на 20 футов. Свет может быть любого цвета на ваш выбор. Если полностью накрыть предмет чем-то непрозрачным, свет перекрывается. Заклинание заканчивается, если вы сотворите его снова или отпустите его действием.',
    {
      source: 'PHB',
      classes: ['Волшебник', 'Чародей', 'Бард', 'Жрец', 'Изобретатель'],
      sections: [
        { title: 'Чужой предмет', text: 'Если вы нацеливаетесь на предмет, который держит или носит враждебное существо, это существо должно преуспеть в спасброске Ловкости, чтобы избежать заклинания.' }
      ]
    }
  ),
  spell(
    'minor-illusion', 'Малая иллюзия', 0, 'illusion',
    '1 действие', '30 фт.', 'С, М (клочок овечьей шерсти)', '1 минута',
    ['utility'],
    'Вы создаёте звук или образ предмета в пределах дистанции; он существует до конца действия заклинания. Иллюзия также заканчивается, если вы отпустите её действием или сотворите это заклинание снова.',
    {
      source: 'PHB',
      classes: ['Волшебник', 'Чародей', 'Бард', 'Колдун'],
      sections: [
        { title: 'Звук', text: 'Звук может быть любой громкости — от шёпота до крика — и звучать как ваш голос, чужой голос, рык льва, бой барабанов или любой другой звук. Он может звучать всё время действия заклинания, либо вы можете создавать отдельные звуки в разное время, пока оно действует.' },
        { title: 'Образ', text: 'Образ предмета — например, стула, следов в грязи или небольшого сундука — должен помещаться в куб со стороной 5 футов. Образ не может издавать звуков, света, запаха и других ощущений. Физическое взаимодействие с образом выдаёт иллюзию: предметы проходят сквозь него.' },
        { title: 'Разоблачение', text: 'Существо, которое действием изучает звук или образ, может понять, что это иллюзия, преуспев в проверке Интеллекта (Анализ) против СЛ спасброска ваших заклинаний. Если существо распознало иллюзию, она становится для него едва различимой.' }
      ]
    }
  ),
  spell(
    'prestidigitation', 'Фокусы', 0, 'transmutation',
    '1 действие', '10 фт.', 'В, С', 'До 1 часа',
    ['utility'],
    'Простой магический фокус, на котором упражняются начинающие заклинатели. Вы создаёте в пределах дистанции один из магических эффектов ниже.',
    {
      source: 'PHB',
      classes: ['Волшебник', 'Чародей', 'Бард', 'Колдун', 'Изобретатель'],
      sections: [
        { title: 'Ощущение', text: 'Мгновенный безвредный сенсорный эффект — сноп искр, порыв ветра, тихая музыка или странный запах.' },
        { title: 'Огонёк', text: 'Вы мгновенно зажигаете или гасите свечу, факел или небольшой костёр.' },
        { title: 'Чистота', text: 'Вы мгновенно очищаете или пачкаете предмет объёмом не больше 1 кубического фута.' },
        { title: 'Вкус и температура', text: 'На 1 час вы охлаждаете, нагреваете или придаёте вкус неживому веществу объёмом не больше 1 кубического фута.' },
        { title: 'Метка', text: 'На 1 час на предмете или поверхности проступает цвет, маленькая отметка или символ.' },
        { title: 'Безделушка', text: 'Вы создаёте немагическую безделушку или иллюзорный образ, который помещается в руке; он существует до конца вашего следующего хода.' },
        { title: 'Несколько эффектов', text: 'Если сотворить заклинание несколько раз, одновременно могут действовать до трёх его немгновенных эффектов; лишний эффект можно отменить действием.' }
      ]
    }
  ),
  spell(
    'vicious-mockery', 'Злая насмешка', 0, 'enchantment',
    '1 действие', '60 фт.', 'В', 'Мгновенная',
    ['damage', 'control'],
    'Вы осыпаете существо, которое видите в пределах дистанции, потоком оскорблений, пропитанных едва уловимой магией. Если цель вас слышит (понимать вас ей не обязательно), она должна преуспеть в спасброске Мудрости, иначе получит 1к4 урона психической энергией и совершит с помехой следующий бросок атаки до конца своего следующего хода. Урон заклинания увеличивается на 1к4, когда вы достигаете 5-го уровня (2к4), 11-го уровня (3к4) и 17-го уровня (4к4).',
    {
      source: 'PHB',
      classes: ['Бард']
    }
  ),
  spell(
    'toll-the-dead', 'Погребальный звон', 0, 'necromancy',
    '1 действие', '60 фт.', 'В, С', 'Мгновенная',
    ['damage'],
    'Вы указываете на существо, которое видите в пределах дистанции, и вокруг него на миг разносится погребальный звон колокола. Цель совершает спасбросок Мудрости и при провале получает 1к8 урона некротической энергией — или 1к12, если её хиты уже не полные. Урон растёт на одну кость на 5-м уровне (2к8 или 2к12), на 11-м (3к8 или 3к12) и на 17-м (4к8 или 4к12).',
    {
      source: 'XGE',
      classes: ['Волшебник', 'Жрец', 'Колдун']
    }
  ),
  spell(
    'booming-blade', 'Громовой клинок', 0, 'evocation',
    '1 действие', 'На себя (радиус 5 фт.)', 'С, М (рукопашное оружие стоимостью не менее 1 л.м.)', '1 раунд',
    ['damage'],
    'Вы совершаете оружием, использованным для сотворения, рукопашную атаку по существу в пределах 5 футов от вас. При попадании атака действует как обычно, а цель до начала вашего следующего хода окружена гудящей энергией. Если до тех пор цель по своей воле переместится на 5 футов или больше, она получает 1к8 урона звуком, и заклинание заканчивается.',
    {
      source: 'TCE',
      classes: ['Волшебник', 'Чародей', 'Колдун', 'Изобретатель'],
      sections: [
        { title: 'Усиление заговора', text: 'С 5-го уровня попавшая атака наносит цели дополнительно 1к8 урона звуком, а урон за перемещение становится 2к8. На 11-м уровне оба броска урона растут на 1к8 (2к8 и 3к8), на 17-м — ещё на 1к8 (3к8 и 4к8).' }
      ]
    }
  ),
  spell(
    'mind-sliver', 'Расщепление разума', 0, 'enchantment',
    '1 действие', '60 фт.', 'В', '1 раунд',
    ['damage', 'control'],
    'Вы вонзаете в разум существа, которое видите в пределах дистанции, осколок психической энергии, сбивающий с толку. Цель совершает спасбросок Интеллекта. При провале она получает 1к6 урона психической энергией и вычитает 1к4 из ближайшего спасброска, который совершит до конца вашего следующего хода. Урон заклинания увеличивается на 1к6, когда вы достигаете 5-го уровня (2к6), 11-го уровня (3к6) и 17-го уровня (4к6).',
    {
      source: 'TCE',
      classes: ['Волшебник', 'Чародей', 'Колдун']
    }
  ),
  spell(
    'blade-ward', 'Защита от оружия', 0, 'abjuration',
    '1 действие', 'На себя', 'В, С', '1 раунд',
    ['support'],
    'Вы чертите в воздухе охранный знак. До конца вашего следующего хода у вас есть сопротивление дробящему, колющему и рубящему урону, который наносят атаки оружием.',
    {
      source: 'PHB',
      classes: ['Бард', 'Волшебник', 'Чародей', 'Колдун']
    }
  ),
  spell(
    'chill-touch', 'Леденящее прикосновение', 0, 'necromancy',
    '1 действие', '120 фт.', 'В, С', '1 раунд',
    ['damage', 'control'],
    'Вы создаёте призрачную скелетную руку в пространстве существа в пределах дистанции. Совершите по нему дальнобойную атаку заклинанием, чтобы окутать его могильным холодом. При попадании цель получает 1к8 урона некротической энергией и не может восстанавливать хиты до начала вашего следующего хода; всё это время рука держится за цель. Если цель — нежить, она к тому же совершает с помехой броски атаки по вам до конца вашего следующего хода. Урон заклинания увеличивается на 1к8, когда вы достигаете 5-го уровня (2к8), 11-го уровня (3к8) и 17-го уровня (4к8).',
    {
      source: 'PHB',
      classes: ['Волшебник', 'Чародей', 'Колдун']
    }
  ),
  spell(
    'dancing-lights', 'Пляшущие огоньки', 0, 'evocation',
    '1 действие', '120 фт.', 'В, С, М (немного фосфора или гнилушка)', 'Концентрация, до 1 минуты',
    ['concentration', 'utility'],
    'Вы создаёте в пределах дистанции до четырёх огоньков размером с факел. Они выглядят как факелы, фонари или светящиеся шары и парят в воздухе, пока действует заклинание. Можно вместо этого собрать все четыре огонька в одну светящуюся, смутно человекоподобную фигуру Среднего размера. Какую бы форму вы ни выбрали, каждый огонёк испускает тусклый свет в радиусе 10 футов.',
    {
      source: 'PHB',
      classes: ['Бард', 'Волшебник', 'Чародей', 'Изобретатель'],
      sections: [
        { title: 'Перемещение', text: 'Бонусным действием в свой ход вы можете переместить огоньки на расстояние до 60 футов в новое место в пределах дистанции. Каждый огонёк должен находиться не дальше 20 футов от другого огонька этого заклинания; огонёк, оказавшийся за пределами дистанции, гаснет.' }
      ]
    }
  ),
  spell(
    'druidcraft', 'Искусство друидов', 0, 'transmutation',
    '1 действие', '30 фт.', 'В, С', 'Мгновенная',
    ['utility'],
    'Шепнув духам природы, вы создаёте в пределах дистанции один из эффектов ниже.',
    {
      source: 'PHB',
      classes: ['Друид'],
      sections: [
        { title: 'Погода', text: 'Крошечный безвредный сенсорный эффект предсказывает погоду в вашем месте на ближайшие 24 часа: золотой шарик к ясной погоде, облачко к дождю, падающие снежинки к снегу и так далее. Эффект длится 1 раунд.' },
        { title: 'Цветение', text: 'Вы мгновенно заставляете распуститься цветок, раскрыться семенную коробочку или лопнуть почку.' },
        { title: 'Ощущение', text: 'Вы создаёте мгновенный безвредный сенсорный эффект — падающие листья, дуновение ветра, звук мелкого зверька или слабый запах скунса. Эффект должен помещаться в куб со стороной 5 футов.' },
        { title: 'Огонь', text: 'Вы мгновенно зажигаете или гасите свечу, факел или небольшой костёр.' }
      ]
    }
  ),
  spell(
    'eldritch-blast', 'Мистический заряд', 0, 'evocation',
    '1 действие', '120 фт.', 'В, С', 'Мгновенная',
    ['damage'],
    'Луч потрескивающей энергии устремляется к существу в пределах дистанции. Совершите по цели дальнобойную атаку заклинанием. При попадании цель получает 1к10 урона силовым полем. С ростом уровня заклинание создаёт больше лучей: на 5 уровне лучей становится два, на 11 — три, на 17 — четыре. Лучи можно направить в одну цель или в разные; для каждого луча совершается отдельный бросок атаки.',
    {
      source: 'PHB',
      classes: ['Колдун']
    }
  ),
  spell(
    'friends', 'Дружба', 0, 'enchantment',
    '1 действие', 'На себя', 'С, М (немного косметики)', 'Концентрация, до 1 минуты',
    ['concentration', 'control'],
    'Пока действует заклинание, все ваши проверки Харизмы, обращённые к одному выбранному вами существу, которое не враждебно к вам, совершаются с преимуществом. Когда заклинание заканчивается, существо понимает, что вы магией повлияли на его настроение, и становится к вам враждебным. Склонное к насилию может напасть на вас, другое — отплатить иначе; как именно, решает Мастер, смотря по тому, как вы с ним обошлись.',
    {
      source: 'PHB',
      classes: ['Бард', 'Волшебник', 'Чародей', 'Колдун']
    }
  ),
  spell(
    'green-flame-blade', 'Клинок зелёного пламени', 0, 'evocation',
    '1 действие', 'На себя (радиус 5 фт.)', 'С, М (рукопашное оружие стоимостью не менее 1 л.м.)', 'Мгновенная',
    ['damage'],
    'Вы совершаете оружием, использованным для сотворения, рукопашную атаку по существу в пределах 5 футов от вас. При попадании атака действует как обычно, и вы можете заставить зелёное пламя перескочить с цели на другое выбранное вами существо, которое вы видите в пределах 5 футов от неё. Второе существо получает урон огнём, равный модификатору вашей заклинательной характеристики.',
    {
      source: 'TCE',
      classes: ['Волшебник', 'Чародей', 'Колдун', 'Изобретатель'],
      sections: [
        { title: 'Усиление заговора', text: 'С 5-го уровня попавшая атака наносит цели дополнительно 1к8 урона огнём, а урон второму существу становится 1к8 + модификатор вашей заклинательной характеристики. На 11-м уровне оба броска урона растут на 1к8 (2к8 и 2к8 + модификатор), на 17-м — ещё на 1к8 (3к8 и 3к8 + модификатор).' }
      ]
    }
  ),
  spell(
    'guidance', 'Указание', 0, 'divination',
    '1 действие', 'Касание', 'В, С', 'Концентрация, до 1 минуты',
    ['concentration', 'support'],
    'Вы касаетесь одного согласного существа. Один раз до конца действия заклинания цель может бросить к4 и прибавить выпавшее число к одной проверке характеристики на свой выбор. Кость можно бросить до или после проверки. После этого заклинание заканчивается.',
    {
      source: 'PHB',
      classes: ['Друид', 'Жрец', 'Изобретатель']
    }
  ),
  spell(
    'infestation', 'Нашествие', 0, 'conjuration',
    '1 действие', '30 фт.', 'В, С, М (живой клещ или блоха)', 'Мгновенная',
    ['damage', 'control'],
    'На существе, которое вы видите в пределах дистанции, на миг появляется облако клещей, блох и прочих паразитов. Цель совершает спасбросок Телосложения. При провале она получает 1к6 урона ядом и, если может двигаться и её скорость не меньше 5 футов, отходит на 5 футов в случайную сторону: бросьте к4 — 1 север, 2 юг, 3 восток, 4 запад. Это перемещение не провоцирует атак; если в выпавшую сторону пути нет, цель остаётся на месте. Урон заклинания увеличивается на 1к6, когда вы достигаете 5-го уровня (2к6), 11-го уровня (3к6) и 17-го уровня (4к6).',
    {
      source: 'XGE',
      classes: ['Друид', 'Волшебник', 'Чародей', 'Колдун']
    }
  ),
  spell(
    'frostbite', 'Обморожение', 0, 'evocation',
    '1 действие', '60 фт.', 'В, С', 'Мгновенная',
    ['damage', 'control'],
    'Леденящий иней покрывает существо, которое вы видите в пределах дистанции. Цель совершает спасбросок Телосложения. При провале она получает 1к6 урона холодом, а её ближайший бросок атаки оружием до конца её следующего хода совершается с помехой. Урон заклинания увеличивается на 1к6, когда вы достигаете 5-го уровня (2к6), 11-го уровня (3к6) и 17-го уровня (4к6).',
    {
      source: 'XGE',
      classes: ['Друид', 'Волшебник', 'Чародей', 'Колдун', 'Изобретатель']
    }
  ),
  spell(
    'lightning-lure', 'Лассо молнии', 0, 'evocation',
    '1 действие', 'На себя (радиус 15 фт.)', 'В', 'Мгновенная',
    ['damage', 'control'],
    'Плеть из молнии хлещет выбранное вами существо, которое вы видите в пределах 15 футов. Цель совершает спасбросок Силы; при провале её притягивает к вам по прямой на расстояние до 10 футов, и если после этого она в пределах 5 футов от вас, то получает 1к8 урона электричеством. Урон заклинания увеличивается на 1к8, когда вы достигаете 5-го уровня (2к8), 11-го уровня (3к8) и 17-го уровня (4к8).',
    {
      source: 'TCE',
      classes: ['Волшебник', 'Чародей', 'Колдун', 'Изобретатель']
    }
  ),
  spell(
    'mending', 'Починка', 0, 'transmutation',
    '1 минута', 'Касание', 'В, С, М (два магнетита)', 'Мгновенная',
    ['utility'],
    'Заклинание чинит одно повреждение предмета, которого вы касаетесь, — например, порванное звено цепи, две половинки сломанного ключа, разорванный плащ или протекающий бурдюк. Если разрыв или трещина не больше 1 фута ни в одном измерении, вы чините его, не оставляя следов прежнего повреждения. Заклинание может физически починить магический предмет или конструкта, но не восстанавливает магию такого предмета.',
    {
      source: 'PHB',
      classes: ['Бард', 'Друид', 'Жрец', 'Волшебник', 'Чародей', 'Изобретатель']
    }
  ),
  spell(
    'message', 'Сообщение', 0, 'transmutation',
    '1 действие', '120 фт.', 'В, С, М (кусочек медной проволоки)', '1 раунд',
    ['utility'],
    'Вы указываете пальцем на существо в пределах дистанции и шёпотом произносите послание. Цель — и только она — слышит послание и может ответить шёпотом, который слышите только вы. Вы можете сотворить заклинание сквозь твёрдые преграды, если знаете, где находится цель, и путь к ней не перекрывают магическая тишина, 1 фут камня, 1 дюйм обычного металла, тонкий лист свинца или 3 фута дерева. Заклинанию не нужно идти по прямой: оно свободно огибает углы и проходит через отверстия.',
    {
      source: 'PHB',
      classes: ['Бард', 'Волшебник', 'Чародей', 'Изобретатель']
    }
  ),
  spell(
    'poison-spray', 'Ядовитые брызги', 0, 'conjuration',
    '1 действие', '10 фт.', 'В, С', 'Мгновенная',
    ['damage'],
    'Вы вытягиваете руку к существу, которое видите в пределах дистанции, и выпускаете из ладони облачко ядовитого газа. Существо должно преуспеть в спасброске Телосложения, иначе получит 1к12 урона ядом. Урон заклинания увеличивается на 1к12, когда вы достигаете 5-го уровня (2к12), 11-го уровня (3к12) и 17-го уровня (4к12).',
    {
      source: 'PHB',
      classes: ['Друид', 'Волшебник', 'Чародей', 'Колдун', 'Изобретатель']
    }
  ),
  spell(
    'produce-flame', 'Сотворение пламени', 0, 'conjuration',
    '1 действие', 'На себя', 'В, С', '10 минут',
    ['damage', 'utility'],
    'В вашей руке появляется мерцающее пламя. Оно остаётся там, пока действует заклинание, и не вредит ни вам, ни вашему снаряжению. Пламя испускает яркий свет в радиусе 10 футов и тусклый свет ещё на 10 футов. Заклинание заканчивается, если вы отпустите его действием или сотворите снова.',
    {
      source: 'PHB',
      classes: ['Друид'],
      sections: [
        { title: 'Бросок', text: 'Сотворяя заклинание или позже действием, вы можете метнуть пламя в существо в пределах 30 футов от вас; после этого заклинание заканчивается. Совершите дальнобойную атаку заклинанием. При попадании цель получает 1к8 урона огнём. Урон заклинания увеличивается на 1к8, когда вы достигаете 5-го уровня (2к8), 11-го уровня (3к8) и 17-го уровня (4к8).' }
      ]
    }
  ),
  spell(
    'resistance', 'Сопротивление', 0, 'abjuration',
    '1 действие', 'Касание', 'В, С, М (миниатюрный плащ)', 'Концентрация, до 1 минуты',
    ['concentration', 'support'],
    'Вы касаетесь одного согласного существа. Один раз до конца действия заклинания цель может бросить к4 и прибавить выпавшее число к одному спасброску на свой выбор. Кость можно бросить до или после спасброска. После этого заклинание заканчивается.',
    {
      source: 'PHB',
      classes: ['Друид', 'Жрец', 'Изобретатель']
    }
  ),
  spell(
    'sacred-flame', 'Священное пламя', 0, 'evocation',
    '1 действие', '60 фт.', 'В, С', 'Мгновенная',
    ['damage'],
    'На существо, которое вы видите в пределах дистанции, нисходит сияние, подобное пламени. Цель должна преуспеть в спасброске Ловкости, иначе получит 1к8 урона излучением. Укрытие не помогает цели в этом спасброске. Урон заклинания увеличивается на 1к8, когда вы достигаете 5-го уровня (2к8), 11-го уровня (3к8) и 17-го уровня (4к8).',
    {
      source: 'PHB',
      classes: ['Жрец']
    }
  ),
  spell(
    'shillelagh', 'Дубинка', 0, 'transmutation',
    '1 бонусное действие', 'Касание', 'В, С, М (омела и лист клевера)', '1 минута',
    ['support'],
    'Дерево дубинки или боевого посоха, которые вы держите, наполняется силой природы. Пока заклинание действует, для бросков атаки и урона этим оружием вы можете использовать свою заклинательную характеристику вместо Силы, а кость урона оружия становится к8. Оружие также становится магическим, если ещё не было таким. Заклинание заканчивается, если вы сотворите его снова или выпустите оружие из рук.',
    {
      source: 'PHB',
      classes: ['Друид']
    }
  ),
  spell(
    'shocking-grasp', 'Электрошок', 0, 'evocation',
    '1 действие', 'Касание', 'В, С', 'Мгновенная',
    ['damage', 'control'],
    'Из вашей руки вырывается молния и бьёт существо, которого вы пытаетесь коснуться. Совершите по цели рукопашную атаку заклинанием; вы совершаете её с преимуществом, если на цели металлический доспех. При попадании цель получает 1к8 урона электричеством и не может совершать реакции до начала своего следующего хода. Урон заклинания увеличивается на 1к8, когда вы достигаете 5-го уровня (2к8), 11-го уровня (3к8) и 17-го уровня (4к8).',
    {
      source: 'PHB',
      classes: ['Волшебник', 'Чародей', 'Изобретатель']
    }
  ),
  spell(
    'spare-the-dying', 'Уход за умирающим', 0, 'necromancy',
    '1 действие', 'Касание', 'В, С', 'Мгновенная',
    ['healing'],
    'Вы касаетесь живого существа, у которого 0 хитов. Существо становится стабильным. На нежить и конструктов заклинание не действует.',
    {
      source: 'PHB',
      classes: ['Жрец', 'Изобретатель']
    }
  ),
  spell(
    'sword-burst', 'Вспышка мечей', 0, 'conjuration',
    '1 действие', 'На себя (радиус 5 фт.)', 'В', 'Мгновенная',
    ['damage'],
    'Вокруг вас на миг проносится кольцо призрачных клинков. Каждое другое существо в пределах 5 футов от вас совершает спасбросок Ловкости и при провале получает 1к6 урона силовым полем. Урон заклинания увеличивается на 1к6, когда вы достигаете 5-го уровня (2к6), 11-го уровня (3к6) и 17-го уровня (4к6).',
    {
      source: 'TCE',
      classes: ['Волшебник', 'Чародей', 'Колдун', 'Изобретатель']
    }
  ),
  spell(
    'thorn-whip', 'Терновый кнут', 0, 'transmutation',
    '1 действие', '30 фт.', 'В, С, М (стебель с шипами)', 'Мгновенная',
    ['damage', 'control'],
    'По вашему слову появляется длинная шипастая плеть, похожая на лозу, и хлещет существо в пределах дистанции. Совершите по цели рукопашную атаку заклинанием. При попадании цель получает 1к6 колющего урона, а если она размера Большой или меньше, вы подтягиваете её к себе на расстояние до 10 футов. Урон заклинания увеличивается на 1к6, когда вы достигаете 5-го уровня (2к6), 11-го уровня (3к6) и 17-го уровня (4к6).',
    {
      source: 'PHB',
      classes: ['Друид', 'Изобретатель']
    }
  ),
  spell(
    'true-strike', 'Меткий удар', 0, 'divination',
    '1 действие', '30 фт.', 'С', 'Концентрация, до 1 раунда',
    ['concentration', 'support'],
    'Вы вытягиваете руку и указываете пальцем на цель в пределах дистанции. Магия на миг открывает вам слабые места в её защите. В свой следующий ход вы совершаете с преимуществом первый бросок атаки по этой цели, если заклинание к тому времени не закончилось.',
    {
      source: 'PHB',
      classes: ['Бард', 'Волшебник', 'Чародей', 'Колдун']
    }
  ),
  spell(
    'control-flames', 'Власть над огнём', 0, 'transmutation',
    '1 действие', '60 фт.', 'С', 'Мгновенная или до 1 часа',
    ['utility', 'control'],
    'Выберите немагическое пламя, которое вы видите в пределах дистанции и которое умещается в куб со стороной 5 футов. Вы воздействуете на него одним из способов ниже.',
    {
      source: 'XGE',
      classes: ['Волшебник', 'Друид', 'Чародей'],
      sections: [
        { title: 'Разжечь', text: 'Пламя сразу перекидывается на 5 футов в одну сторону, если там есть дерево или другое топливо.' },
        { title: 'Погасить', text: 'Огонь в кубе сразу гаснет.' },
        { title: 'Свет', text: 'На 1 час вы вдвое увеличиваете или уменьшаете область яркого и тусклого света от пламени, меняете его цвет или и то и другое.' },
        { title: 'Образы', text: 'На 1 час в пламени появляются простые очертания — смутная фигура существа, предмет или место — и движутся так, как вы пожелаете.' },
        { title: 'Несколько эффектов', text: 'Если сотворить заклинание несколько раз, одновременно могут действовать не больше трёх его немгновенных эффектов; такой эффект можно отменить действием.' }
      ]
    }
  ),
  spell(
    'create-bonfire', 'Сотворение костра', 0, 'conjuration',
    '1 действие', '60 фт.', 'В, С', 'Концентрация, до 1 минуты',
    ['concentration', 'damage', 'control'],
    'На земле, которую вы видите в пределах дистанции, вспыхивает волшебный костёр размером с куб со стороной 5 футов и горит, пока действует заклинание. Существо, оказавшееся в пространстве костра при сотворении, совершает спасбросок Ловкости и при провале получает 1к8 урона огнём. Тот же спасбросок совершает существо, которое в свой ход впервые входит в пространство костра или заканчивает там ход. Горючие предметы в области костра, которые никто не носит и не держит, загораются. Урон заклинания увеличивается на 1к8, когда вы достигаете 5-го уровня (2к8), 11-го уровня (3к8) и 17-го уровня (4к8).',
    {
      source: 'XGE',
      classes: ['Друид', 'Волшебник', 'Чародей', 'Колдун', 'Изобретатель']
    }
  ),
  spell(
    'gust', 'Шквал', 0, 'transmutation',
    '1 действие', '30 фт.', 'В, С', 'Мгновенная',
    ['utility', 'control'],
    'Вы подчиняете себе воздух и создаёте в точке, которую видите в пределах дистанции, один из эффектов ниже.',
    {
      source: 'XGE',
      classes: ['Волшебник', 'Друид', 'Чародей'],
      sections: [
        { title: 'Толчок', text: 'Выбранное вами существо размера Средний или меньше совершает спасбросок Силы; при провале его отбрасывает от вас на расстояние до 5 футов.' },
        { title: 'Предмет', text: 'Порыв воздуха отталкивает от вас на расстояние до 10 футов предмет весом не больше 5 фунтов, который никто не держит и не несёт. Толчок слишком слаб, чтобы причинить урон.' },
        { title: 'Ощущение', text: 'Воздух создаёт безвредный эффект для чувств: шелестит листва, ветер захлопывает ставни, одежда колышется на ветру.' }
      ]
    }
  ),
  spell(
    'magic-stone', 'Волшебный камень', 0, 'transmutation',
    '1 бонусное действие', 'Касание', 'В, С', '1 минута',
    ['damage'],
    'Вы касаетесь от одного до трёх камешков и наполняете их магией. Камешком можно совершить дальнобойную атаку заклинанием — бросить его рукой (дальность 60 футов) или метнуть из пращи; атаковать может и другое существо, но к броску атаки оно прибавляет модификатор вашей заклинательной характеристики, а не свой. При попадании цель получает 1к6 + модификатор вашей заклинательной характеристики дробящего урона. После атаки, попавшей или нет, заклинание для этого камешка заканчивается.',
    {
      source: 'XGE',
      classes: ['Друид', 'Колдун', 'Изобретатель'],
      sections: [
        { title: 'Повтор', text: 'Если сотворить заклинание снова, оно заканчивается для камешков, которые ещё заряжены прошлым сотворением.' }
      ]
    }
  ),
  spell(
    'mold-earth', 'Лепка земли', 0, 'transmutation',
    '1 действие', '30 фт.', 'С', 'Мгновенная или до 1 часа',
    ['utility'],
    'Выберите участок земли или камня, который вы видите в пределах дистанции и который умещается в куб со стороной 5 футов. Вы воздействуете на него одним из способов ниже.',
    {
      source: 'XGE',
      classes: ['Волшебник', 'Друид', 'Чародей'],
      sections: [
        { title: 'Копать', text: 'Рыхлую землю вы сразу выкапываете, двигаете по поверхности и ссыпаете на расстоянии до 5 футов. Движение слишком слабое, чтобы причинить урон.' },
        { title: 'Узоры', text: 'На 1 час на земле или камне проступают очертания, цвета или и то и другое: слова, картинки, узоры.' },
        { title: 'Местность', text: 'Если выбранная земля или камень лежит на поверхности, на 1 час она становится труднопроходимой местностью; уже труднопроходимую вы можете вместо этого сделать обычной.' },
        { title: 'Несколько эффектов', text: 'Если сотворить заклинание несколько раз, одновременно могут действовать не больше двух его немгновенных эффектов; такой эффект можно отменить действием.' }
      ]
    }
  ),
  spell(
    'primal-savagery', 'Первобытная дикость', 0, 'transmutation',
    '1 действие', 'На себя', 'С', 'Мгновенная',
    ['damage'],
    'Первобытная магия заостряет ваши зубы или ногти и делает их едкими. Совершите рукопашную атаку заклинанием по существу в пределах 5 футов от вас. При попадании цель получает 1к10 урона кислотой. После атаки зубы или ногти становятся прежними. Урон заклинания увеличивается на 1к10, когда вы достигаете 5-го уровня (2к10), 11-го уровня (3к10) и 17-го уровня (4к10).',
    {
      source: 'XGE',
      classes: ['Друид']
    }
  ),
  spell(
    'shape-water', 'Формирование воды', 0, 'transmutation',
    '1 действие', '30 фт.', 'С', 'Мгновенная или до 1 часа',
    ['utility'],
    'Выберите воду, которую вы видите в пределах дистанции и которая умещается в куб со стороной 5 футов. Вы управляете ею одним из способов ниже.',
    {
      source: 'XGE',
      classes: ['Волшебник', 'Друид', 'Чародей'],
      sections: [
        { title: 'Течение', text: 'Вода сразу перемещается или меняет течение, как вы укажете, на расстояние до 5 футов в любую сторону. Движение слишком слабое, чтобы причинить урон.' },
        { title: 'Фигуры', text: 'На 1 час вода складывается в простые фигуры, которые движутся по вашему указанию.' },
        { title: 'Цвет', text: 'На 1 час вы меняете цвет или прозрачность воды — одинаково во всём объёме.' },
        { title: 'Лёд', text: 'Вода замерзает, если в ней нет существ, и оттаивает через 1 час.' },
        { title: 'Несколько эффектов', text: 'Если сотворить заклинание несколько раз, одновременно могут действовать не больше двух его немгновенных эффектов; такой эффект можно отменить действием.' }
      ]
    }
  ),
  spell(
    'thaumaturgy', 'Чудотворство', 0, 'transmutation',
    '1 действие', '30 фт.', 'В', 'До 1 минуты',
    ['utility'],
    'Вы творите малое чудо — знак сверхъестественной силы. В пределах дистанции вы создаёте один из магических эффектов ниже.',
    {
      source: 'PHB',
      classes: ['Жрец'],
      sections: [
        { title: 'Голос', text: 'На 1 минуту ваш голос становится втрое громче обычного.' },
        { title: 'Пламя', text: 'На 1 минуту пламя мерцает, становится ярче или тусклее либо меняет цвет.' },
        { title: 'Дрожь', text: 'На 1 минуту вы вызываете безвредную дрожь земли.' },
        { title: 'Звук', text: 'Вы создаёте мгновенный звук из выбранной точки в пределах дистанции — раскат грома, крик ворона или зловещий шёпот.' },
        { title: 'Двери и окна', text: 'Вы мгновенно распахиваете или захлопываете незапертую дверь или окно.' },
        { title: 'Глаза', text: 'На 1 минуту вы меняете вид своих глаз.' },
        { title: 'Несколько эффектов', text: 'Если сотворить заклинание несколько раз, одновременно могут действовать до трёх его эффектов длительностью 1 минута; лишний эффект можно отменить действием.' }
      ]
    }
  ),
  spell(
    'thunderclap', 'Раскат грома', 0, 'evocation',
    '1 действие', 'На себя (радиус 5 фт.)', 'С', 'Мгновенная',
    ['damage'],
    'Вы порождаете громовой раскат, который слышно за 100 футов. Каждое существо, кроме вас, в пределах дистанции совершает спасбросок Телосложения и при провале получает 1к6 урона звуком. Урон заклинания увеличивается на 1к6, когда вы достигаете 5-го уровня (2к6), 11-го уровня (3к6) и 17-го уровня (4к6).',
    {
      source: 'XGE',
      classes: ['Бард', 'Друид', 'Волшебник', 'Чародей', 'Колдун', 'Изобретатель']
    }
  ),
  spell(
    'word-of-radiance', 'Слово Сияния', 0, 'evocation',
    '1 действие', 'На себя (радиус 5 фт.)', 'В, С, М (священный символ)', 'Мгновенная',
    ['damage'],
    'Вы произносите священное слово, и от вас расходится обжигающее сияние. Каждое выбранное вами существо, которое вы видите в пределах дистанции, совершает спасбросок Телосложения и при провале получает 1к6 урона излучением. Урон заклинания увеличивается на 1к6, когда вы достигаете 5-го уровня (2к6), 11-го уровня (3к6) и 17-го уровня (4к6).',
    {
      source: 'XGE',
      classes: ['Жрец']
    }
  ),
  spell(
    'chambers-protection',
    'Защита Чертогов',
    1,
    'special',
    '1 реакция',
    '60 фт.',
    'Ж',
    'Мгновенная',
    ['reaction', 'support', 'veil'],
    'Вы вызываете небольшой импульс Вуали и вмешиваетесь в неудачный спасбросок союзника. Когда видимое вами дружественное существо в пределах дистанции проваливает спасбросок Силы, Ловкости или Телосложения, вы можете бросить текущую Кость Вуали и добавить результат к спасброску. Если после этого спасбросок становится успешным, цель также получает бонус к КД, равный половине результата вашей Кости Вуали, до начала вашего следующего хода.'
  ),
  spell(
    'fortune-absorption',
    'Поглощение Удачи',
    1,
    'special',
    '1 реакция, когда видимая цель в пределах 30 фт. совершает атаку, спасбросок или проверку с преимуществом',
    '30 фт.',
    'С',
    'Мгновенная',
    ['reaction', 'control'],
    'Вы вытягиваете удачный миг из действия противника. Выберите цель в пределах дистанции: она должна совершить спасбросок Мудрости. При провале цель теряет преимущество на вызвавший реакцию бросок.'
  ),
  spell(
    'living-flesh',
    'Живая Плоть',
    2,
    'special',
    '1 действие',
    '60 фт.',
    'С, Ж',
    'До 1 минуты',
    ['healing', 'support'],
    'Вы призываете на видимую цель пульсирующую живую плоть. В начале каждого хода цели она восстанавливает 1к8 хитов. Плоть срабатывает количество раз, равное 1 + ваш модификатор заклинательной характеристики, минимум 2 раза, после чего отмирает.'
  ),
  spell(
    'veil-whisper',
    'Шёпот Вуали',
    3,
    'special',
    '1 действие',
    'На себя, радиус 30 фт.',
    'С, Ж',
    'Концентрация, до 1 минуты',
    ['concentration', 'support', 'veil'],
    'Часть вашего лица меняется, образуя рот, шепчущий голосом самой Вуали. Пока заклинание активно, шёпот перемещается вместе с вами. Союзники в радиусе действия могут добавлять 1к6 Кости Вуали к броскам урона. Эти кости не меняют размер и не могут вызвать Порыв Вуали. Если у существа уже есть кости Вуали из другого источника, используется размер кости этого источника, и такое существо может вызвать Порыв Вуали.'
  ),
  spell(
    'channorong-living-workshop',
    'Живая Мастерская Чанноронга',
    3,
    'transmutation',
    '10 минут',
    'Касание',
    'В, С, М (любое немагически призванное животное)',
    '24 часа',
    ['ritual', 'utility'],
    'Вы касаетесь животного и создаёте внутри него мастерскую, внешний вид которой определяете сами. Внутри комфортно и есть воздух независимо от внешних условий. Предметы, созданные вместе с мастерской, превращаются в дым, если их вынести наружу.',
    {
      classes: ['Волшебник'],
      sections: [
        { title: 'Вход и выход', text: 'Чтобы войти в мастерскую, нужно действием прикоснуться к существу, на которое наложено заклинание. Чтобы покинуть её, находясь внутри, нужно потратить бонусное действие. Вы появляетесь в выбранном вами ближайшем свободном пространстве рядом с животным.' },
        { title: 'Вместимость', text: 'Вы выбираете существ, которые могут входить внутрь. Крошечное или Маленькое животное вмещает одно существо Среднего или меньшего размера; Среднее или Большое - до 3 таких существ; Огромное или Громадное - до 7.' },
        { title: 'Завершение', text: 'Заклинание заканчивается, если вы накладываете его на другое животное или если животное-носитель умирает. Все предметы и существа внутри, не созданные заклинанием, появляются в ближайшем свободном пространстве рядом с животным. Если внутри оказывается больше существ, чем допустимо, животное-носитель погибает.' }
      ]
    }
  ),
  spell(
    'flesh-sculpt',
    'Скульпт Плоти',
    4,
    'special',
    '1 действие',
    '60 фт.',
    'С, Ж',
    '1 минута',
    ['support', 'veil'],
    'Вы модифицируете тело видимого согласного существа в пределах дистанции, усиливая его Эсхой. При сотворении выберите один из двух эффектов.',
    {
      sections: [
        { title: 'Руки Вуали', text: 'У цели вырастает пара новых рук из плоти. Она может совершить одну дополнительную атаку оружием, захват или толчок. Если цель находится в пределах дистанции заклинания от вас, вы можете реакцией добавить вашу Кость Вуали к урону дополнительной атаки или к проверке захвата/толчка.' },
        { title: 'Ноги Вуали', text: 'Стопы цели усиливаются дополнительной костной структурой. Цель может совершить дополнительное действие Уклонение, Рывок или Отход. Если цель совершает спасбросок Ловкости и находится в пределах дистанции заклинания от вас, вы можете реакцией добавить к результату вашу текущую Кость Вуали.' }
      ]
    }
  ),
  spell(
    'self-ignition',
    'Самовозгорание',
    4,
    'special',
    '1 действие',
    'На себя, радиус 30 фт.',
    'С, Ж',
    'Мгновенная',
    ['damage'],
    'Вы жертвуете собственной жизненной силой, высвобождая взрыв огня. Все существа в радиусе 30 фт. должны совершить спасбросок Телосложения. При провале существо получает урон, равный удвоенному количеству ваших текущих хитов; при успехе - половину этого урона. После этого ваши хиты падают до 0. В течение 1 минуты вы горите и получаете 1к4 урона огнём в начале своего хода. Существо может действием потушить огонь.'
  ),
  spell(
    'decay-aura',
    'Аура Разложения',
    4,
    'special',
    '1 действие',
    'На себя, радиус 30 фт.',
    'С',
    'Концентрация, до 10 минут',
    ['concentration', 'control', 'damage'],
    'От вас исходит защитная аура радиусом 30 фт., перемещающаяся вместе с вами. При сотворении выберите один тип урона: холод, некротический, яд, кислота или психический. Выбранные вами существа, начинающие ход в ауре, получают уязвимость к выбранному типу урона до начала своего следующего хода.'
  ),
  spell(
    'power-word-freeze',
    'Слово Силы: Замри',
    5,
    'special',
    '1 действие',
    '60 фт.',
    'С',
    'Мгновенная',
    ['control', 'powerWord'],
    'Вы произносите Слово Силы, заставляющее противника застыть в движении. Видимая вами цель в пределах дистанции парализована до начала вашего следующего хода, если у неё 100 хитов или меньше. Если хитов больше, заклинание не оказывает эффекта.'
  ),
  spell(
    'void',
    'Пустота',
    5,
    'special',
    '1 действие',
    '5 фт.',
    'С, Ж, М (чёрная жемчужина стоимостью не менее 100 с.м.)',
    'Концентрация, до 1 минуты',
    ['concentration', 'control', 'damage'],
    'В чёрном жемчуге хранится толика силы дома Ра. При сотворении выберите один из двух эффектов: Испытание пустотой или Покров Ра.',
    {
      sections: [
        { title: 'Испытание пустотой', text: 'Выберите видимое существо в пределах дистанции. Вы и цель оказываетесь в сфере пустоты радиусом 10 фт. с центром на вас. Сфера огибает углы, проходит сквозь материю, существует на всех планах и выталкивает всех существ, кроме вас и цели, в ближайшее свободное пространство. Если цель не помещается внутри сферы, заклинание не срабатывает.' },
        { title: 'Свойства сферы', text: 'Внутри сферы невозможно восстанавливать хиты. Сфера недвижима, непрозрачна, а её граница непроницаема для физического и магического воздействия. Существа внутри не могут телепортироваться, использовать порталы или перемещаться между планами. В пространство сферы также нельзя телепортироваться. Когда сфера исчезает, материя, с которой она взаимодействовала, возвращается в исходное состояние.' },
        { title: 'Покров Ра', text: 'Выберите одно рукопашное оружие в пределах дистанции. Его досягаемость увеличивается на 15 фт. Пока заклинание активно, один раз в ход при попадании этим оружием по существу урон оружия увеличивается на 1к6 некротического урона.' }
      ]
    }
  ),
  // ── Заклинания 1 уровня (базовые, PHB / XGE / TCE) ────────────────
  spell(
    'hellish-rebuke', 'Адское возмездие', 1, 'evocation',
    '1 реакция, совершаемая, когда видимое существо в пределах 60 фт. причиняет вам урон', '60 фт.', 'В, С', 'Мгновенная',
    ['reaction', 'damage'],
    'Существо, которое только что причинило вам урон, на миг охватывает адское пламя. Оно совершает спасбросок Ловкости и получает 2к10 урона огнём при провале или половину этого урона при успехе.',
    {
      source: 'PHB',
      classes: ['Колдун'],
      sections: [
        { title: 'Когда сотворить', text: 'Реакцией, сразу после того как вам причинило урон существо, которое вы видите в пределах 60 футов.' },
        { title: 'На более высоких уровнях', text: 'Урон увеличивается на 1к10 за каждый уровень ячейки выше 1-го.' }
      ]
    }
  ),
  spell(
    'silent-image', 'Безмолвный образ', 1, 'illusion',
    '1 действие', '60 фт.', 'В, С, М (кусочек овечьей шерсти)', 'Концентрация, до 10 минут',
    ['concentration', 'control'],
    'Вы создаёте образ предмета, существа или другого видимого явления, не больше куба со стороной 15 футов. Образ появляется в точке в пределах дистанции и держится, пока действует заклинание. Это только изображение: оно не издаёт звуков, запахов и других ощущений.',
    {
      source: 'PHB',
      classes: ['Бард', 'Волшебник', 'Чародей'],
      sections: [
        { title: 'Перемещение', text: 'Действием вы можете переместить образ в любое место в пределах дистанции. При этом вы можете менять его вид так, чтобы движение выглядело естественно: например, образ существа может идти.' },
        { title: 'Разоблачение', text: 'Физическое взаимодействие с образом выдаёт иллюзию: предметы проходят сквозь него. Существо, которое действием изучает образ, может понять, что это иллюзия, преуспев в проверке Интеллекта (Анализ) против СЛ спасброска ваших заклинаний. Распознав иллюзию, существо видит сквозь образ.' }
      ]
    }
  ),
  spell(
    'bless', 'Благословение', 1, 'enchantment',
    '1 действие', '30 фт.', 'В, С, М (капелька святой воды)', 'Концентрация, до 1 минуты',
    ['concentration', 'support'],
    'Вы благословляете до трёх существ по вашему выбору в пределах дистанции. Каждый раз, когда цель совершает бросок атаки или спасбросок, пока действует заклинание, она может бросить к4 и прибавить выпавшее число к этому броску атаки или спасброску.',
    {
      source: 'PHB',
      classes: ['Жрец', 'Паладин'],
      sections: [
        { title: 'На более высоких уровнях', text: 'Ячейкой 2-го уровня и выше заклинание затрагивает ещё одно существо за каждый уровень ячейки выше 1-го.' }
      ]
    }
  ),
  spell(
    'divine-favor', 'Божественное благоволение', 1, 'evocation',
    '1 бонусное действие', 'На себя', 'В, С', 'Концентрация, до 1 минуты',
    ['concentration', 'support'],
    'Ваша молитва наполняет вас божественным сиянием. Пока заклинание действует, ваши атаки оружием наносят при попадании дополнительно 1к4 урона излучением.',
    {
      source: 'PHB',
      classes: ['Паладин']
    }
  ),
  spell(
    'witch-bolt', 'Ведьмин снаряд', 1, 'evocation',
    '1 действие', '30 фт.', 'В, С, М (веточка дерева, поражённого молнией)', 'Концентрация, до 1 минуты',
    ['concentration', 'damage'],
    'Синяя потрескивающая молния бьёт в существо в пределах дистанции и остаётся дугой между вами. Совершите по цели дальнобойную атаку заклинанием: при попадании она получает 1к12 урона электричеством.',
    {
      source: 'PHB',
      classes: ['Волшебник', 'Чародей', 'Колдун'],
      sections: [
        { title: 'Удержание дуги', text: 'Пока заклинание действует, в каждый свой ход вы можете действием нанести цели 1к12 урона электричеством без броска атаки.' },
        { title: 'Когда дуга рвётся', text: 'Заклинание заканчивается, если вы потратите действие на что-то другое, если цель окажется дальше дистанции заклинания или если у неё появится от вас полное укрытие.' },
        { title: 'На более высоких уровнях', text: 'Урон первого удара увеличивается на 1к12 за каждый уровень ячейки выше 1-го. Урон дуги в следующие ходы не растёт.' }
      ]
    }
  ),
  spell(
    'thunderwave', 'Волна грома', 1, 'evocation',
    '1 действие', 'На себя (15-футовый куб)', 'В, С', 'Мгновенная',
    ['damage', 'control'],
    'От вас расходится волна громовой силы. Каждое существо в кубе со стороной 15 футов, исходящем от вас, совершает спасбросок Телосложения. При провале существо получает 2к8 урона звуком и отлетает на 10 футов от вас. При успехе оно получает половину урона и не отлетает. Незакреплённые предметы, целиком находящиеся в области, тоже отлетают на 10 футов от вас, а заклинание издаёт громовой раскат, слышимый на расстоянии до 300 футов.',
    {
      source: 'PHB',
      classes: ['Бард', 'Волшебник', 'Друид', 'Чародей'],
      sections: [
        { title: 'На более высоких уровнях', text: 'Урон увеличивается на 1к8 за каждый уровень ячейки выше 1-го.' }
      ]
    }
  ),
  spell(
    'magic-missile', 'Волшебная стрела', 1, 'evocation',
    '1 действие', '120 фт.', 'В, С', 'Мгновенная',
    ['damage'],
    'Вы создаёте три светящихся дротика магической силы. Каждый дротик попадает в выбранное вами существо, которое вы видите в пределах дистанции, и наносит ему 1к4 + 1 урона силовым полем. Все дротики бьют одновременно; их можно направить в одно существо или в разных.',
    {
      source: 'PHB',
      classes: ['Волшебник', 'Чародей'],
      sections: [
        { title: 'На более высоких уровнях', text: 'Заклинание создаёт ещё один дротик за каждый уровень ячейки выше 1-го.' }
      ]
    }
  ),
  spell(
    'compelled-duel', 'Вызов на дуэль', 1, 'enchantment',
    '1 бонусное действие', '30 фт.', 'В', 'Концентрация, до 1 минуты',
    ['concentration', 'control'],
    'Вы вызываете на поединок существо, которое видите в пределах дистанции. Оно совершает спасбросок Мудрости; при провале ваше божественное требование приковывает его к вам до конца действия заклинания.',
    {
      source: 'PHB',
      classes: ['Паладин'],
      sections: [
        { title: 'Вызванная цель', text: 'Её броски атаки по любым существам, кроме вас, совершаются с помехой. Каждый раз, когда она пытается переместиться в пространство дальше 30 футов от вас, она совершает спасбросок Мудрости; при успехе заклинание в этот ход не мешает её перемещению.' },
        { title: 'Конец поединка', text: 'Заклинание заканчивается, если вы атакуете другое существо или направляете заклинание на другое враждебное существо, если союзное вам существо причиняет цели урон или накладывает на неё вредоносное заклинание, а также если вы заканчиваете ход дальше 30 футов от цели.' }
      ]
    }
  ),
  spell(
    'cause-fear', 'Вызов страха', 1, 'necromancy',
    '1 действие', '60 фт.', 'В', 'Концентрация, до 1 минуты',
    ['concentration', 'control'],
    'Вы пробуждаете в существе, которое видите в пределах дистанции, ощущение собственной смертности. Цель совершает спасбросок Мудрости и при провале становится испуганной вами до конца действия заклинания. В конце каждого своего хода испуганная цель повторяет спасбросок и при успехе избавляется от страха. Конструкты и нежить к этому заклинанию невосприимчивы.',
    {
      source: 'XGE',
      classes: ['Волшебник', 'Чародей', 'Колдун', 'Жрец'],
      sections: [
        { title: 'На более высоких уровнях', text: 'За каждый уровень ячейки выше 1-го можно выбрать ещё одну цель; все цели должны быть не дальше 30 футов друг от друга.' }
      ]
    }
  ),
  spell(
    'heroism', 'Героизм', 1, 'enchantment',
    '1 действие', 'Касание', 'В, С', 'Концентрация, до 1 минуты',
    ['concentration', 'support', 'healing'],
    'Согласное существо, которого вы касаетесь, наполняется храбростью. Пока заклинание действует, существо невосприимчиво к испугу и в начале каждого своего хода получает временные хиты, равные модификатору вашей заклинательной характеристики. Когда заклинание заканчивается, цель теряет оставшиеся от него временные хиты.',
    {
      source: 'PHB',
      classes: ['Бард', 'Паладин'],
      sections: [
        { title: 'На более высоких уровнях', text: 'Ячейкой 2-го уровня и выше заклинание затрагивает ещё одно существо за каждый уровень ячейки выше 1-го.' }
      ]
    }
  ),
  spell(
    'wrathful-smite', 'Гневная кара', 1, 'evocation',
    '1 бонусное действие', 'На себя', 'В', 'Концентрация, до 1 минуты',
    ['concentration', 'damage', 'control'],
    'Пока заклинание действует, ваше следующее попадание атакой рукопашным оружием наносит дополнительно 1к6 урона психической энергией.',
    {
      source: 'PHB',
      classes: ['Паладин'],
      sections: [
        { title: 'Страх', text: 'Если цель — существо, она совершает спасбросок Мудрости и при провале становится испуганной вами до конца действия заклинания. Испуганное существо может действием совершить проверку Мудрости против СЛ спасброска ваших заклинаний; при успехе оно берёт себя в руки, и заклинание заканчивается.' }
      ]
    }
  ),
  spell(
    'hail-of-thorns', 'Град шипов', 1, 'conjuration',
    '1 бонусное действие', 'На себя', 'В', 'Концентрация, до 1 минуты',
    ['concentration', 'damage'],
    'Пока заклинание действует, ваше следующее попадание по существу атакой дальнобойным оружием обрушивает град шипов, выросших из оружия или боеприпаса. Атака наносит обычный урон, а сама цель и каждое существо в пределах 5 футов от неё совершают спасбросок Ловкости: 1к10 колющего урона при провале, половина при успехе. После этого заклинание заканчивается.',
    {
      source: 'PHB',
      classes: ['Следопыт'],
      sections: [
        { title: 'На более высоких уровнях', text: 'Урон шипов увеличивается на 1к10 за каждый уровень ячейки выше 1-го, но не больше 6к10.' }
      ]
    }
  ),
  spell(
    'thunderous-smite', 'Громовая кара', 1, 'evocation',
    '1 бонусное действие', 'На себя', 'В', 'Концентрация, до 1 минуты',
    ['concentration', 'damage', 'control'],
    'Пока заклинание действует, ваше первое попадание атакой рукопашным оружием сопровождается громовым раскатом, слышным в пределах 300 футов, и наносит цели дополнительно 2к6 урона звуком. Если цель — существо, она совершает спасбросок Силы; при провале она отлетает на 10 футов от вас и сбита с ног.',
    {
      source: 'PHB',
      classes: ['Паладин']
    }
  ),
  spell(
    'dissonant-whispers', 'Диссонирующий шёпот', 1, 'enchantment',
    '1 действие', '60 фт.', 'В', 'Мгновенная',
    ['damage', 'control'],
    'Вы шепчете нестройный напев, который слышит только одно выбранное вами существо в пределах дистанции, и он терзает его болью. Цель совершает спасбросок Мудрости. При провале она получает 3к6 урона психической энергией и, если у неё есть реакция, сразу тратит её, чтобы отойти от вас как можно дальше в пределах своей скорости, — но не в заведомо опасное место вроде огня или ямы. При успехе цель получает половину урона и никуда не отходит.',
    {
      source: 'PHB',
      classes: ['Бард'],
      sections: [
        { title: 'Глухота', text: 'Оглохшее существо автоматически преуспевает в этом спасброске.' },
        { title: 'На более высоких уровнях', text: 'Урон увеличивается на 1к6 за каждый уровень ячейки выше 1-го.' }
      ]
    }
  ),
  spell(
    'armor-of-agathys', 'Доспех Агатиса', 1, 'abjuration',
    '1 действие', 'На себя', 'В, С, М (чашка воды)', '1 час',
    ['support', 'damage', 'healing'],
    'Вас и ваше снаряжение покрывает призрачный иней — защитная магическая сила. На время действия заклинания вы получаете 5 временных хитов. Пока эти временные хиты не кончились, каждое существо, попавшее по вам рукопашной атакой, получает 5 урона холодом.',
    {
      source: 'PHB',
      classes: ['Колдун'],
      sections: [
        { title: 'На более высоких уровнях', text: 'Временные хиты и урон холодом увеличиваются на 5 за каждый уровень ячейки выше 1-го.' }
      ]
    }
  ),
  spell(
    'mage-armor', 'Доспехи мага', 1, 'abjuration',
    '1 действие', 'Касание', 'В, С, М (кусочек выделанной кожи)', '8 часов',
    ['support'],
    'Вы касаетесь согласного существа, которое не носит доспеха, и до конца действия заклинания его окутывает защитная магическая сила. Базовый КД цели становится 13 + её модификатор Ловкости. Заклинание заканчивается, если цель надевает доспех или если вы отпустите заклинание действием.',
    {
      source: 'PHB',
      classes: ['Волшебник', 'Чародей']
    }
  ),
  spell(
    'earth-tremor', 'Дрожь земли', 1, 'evocation',
    '1 действие', 'На себя (радиус 10 фт.)', 'В, С', 'Мгновенная',
    ['damage', 'control'],
    'Земля вокруг вас содрогается. Каждое существо, кроме вас, в пределах 10 футов от вас совершает спасбросок Ловкости; при провале оно получает 1к6 дробящего урона и сбито с ног.',
    {
      source: 'XGE',
      classes: ['Бард', 'Волшебник', 'Друид', 'Чародей'],
      sections: [
        { title: 'Рыхлая земля', text: 'Если земля в этой области — рыхлая почва или камень, она становится труднопроходимой местностью, пока её не расчистят: на каждый участок диаметром 5 футов уходит не меньше минуты ручной работы.' },
        { title: 'На более высоких уровнях', text: 'Урон увеличивается на 1к6 за каждый уровень ячейки выше 1-го.' }
      ]
    }
  ),
  spell(
    'animal-friendship', 'Дружба с животными', 1, 'enchantment',
    '1 действие', '30 фт.', 'В, С, М (кусочек пищи)', '24 часа',
    ['control'],
    'Заклинание убеждает зверя, что вы не желаете ему зла. Выберите зверя, которого видите в пределах дистанции; он должен видеть и слышать вас. Если Интеллект зверя 4 или больше, заклинание не действует. Иначе зверь должен преуспеть в спасброске Мудрости, иначе станет очарованным вами на время действия заклинания. Если вы или кто-то из ваших спутников причиняет цели вред, заклинание заканчивается.',
    {
      source: 'PHB',
      classes: ['Бард', 'Друид', 'Следопыт'],
      sections: [
        { title: 'На более высоких уровнях', text: 'Ячейкой 2-го уровня и выше заклинание затрагивает ещё одного зверя за каждый уровень ячейки выше 1-го.' }
      ]
    }
  ),
  spell(
    'tashas-caustic-brew', 'Едкое варево Таши', 1, 'evocation',
    '1 действие', 'На себя (линия 30 фт.)', 'В, С, М (кусочек гнилой пищи)', 'Концентрация, до 1 минуты',
    ['concentration', 'damage'],
    'Из вас бьёт струя кислоты — линия длиной 30 футов и шириной 5 футов в выбранном направлении. Каждое существо в линии совершает спасбросок Ловкости; при провале его покрывает кислота.',
    {
      source: 'TCE',
      classes: ['Волшебник', 'Чародей', 'Изобретатель'],
      sections: [
        { title: 'Кислота', text: 'Покрытое кислотой существо получает 2к4 урона кислотой в начале каждого своего хода. Кислота держится, пока действует заклинание или пока кто-нибудь действием не соскоблит или не смоет её — с себя или с другого существа.' },
        { title: 'На более высоких уровнях', text: 'Урон увеличивается на 2к4 за каждый уровень ячейки выше 1-го.' }
      ]
    }
  ),
  spell(
    'tashas-hideous-laughter', 'Жуткий смех Таши', 1, 'enchantment',
    '1 действие', '30 фт.', 'В, С, М (крошечные тарталетки и перо)', 'Концентрация, до 1 минуты',
    ['concentration', 'control'],
    'Выбранное вами существо, которое вы видите в пределах дистанции, начинает находить смешным всё вокруг и, если заклинание на него подействовало, заходится неудержимым хохотом. Цель должна преуспеть в спасброске Мудрости, иначе она сбита с ног, недееспособна и не может встать, пока действует заклинание. Существо с Интеллектом 4 или ниже заклинанию не подвержено.',
    {
      source: 'PHB',
      classes: ['Бард', 'Волшебник', 'Чародей', 'Колдун'],
      sections: [
        { title: 'Повторный спасбросок', text: 'В конце каждого своего хода, а также каждый раз, когда цель получает урон, она может совершить ещё один спасбросок Мудрости. Если спасбросок вызван уроном, он совершается с преимуществом. При успехе заклинание заканчивается.' }
      ]
    }
  ),
  spell(
    'protection-from-evil-and-good', 'Защита от добра и зла', 1, 'abjuration',
    '1 действие', 'Касание', 'В, С, М (святая вода или порошок из серебра и железа, расходуются)', 'Концентрация, до 10 минут',
    ['concentration', 'support'],
    'Пока действует заклинание, одно согласное существо, которого вы касаетесь, защищено от существ определённых видов: аберраций, небожителей, элементалей, фей, исчадий и нежити.',
    {
      source: 'PHB',
      classes: ['Жрец', 'Паладин', 'Волшебник', 'Чародей', 'Колдун', 'Друид'],
      sections: [
        { title: 'Защита', text: 'Существа этих видов совершают броски атаки по цели с помехой. Кроме того, они не могут очаровать, испугать цель или вселиться в неё. Если цель уже очарована, испугана таким существом или в неё оно уже вселилось, она совершает с преимуществом каждый новый спасбросок против этого эффекта.' }
      ]
    }
  ),
  spell(
    'beast-bond', 'Звериные узы', 1, 'divination',
    '1 действие', 'Касание', 'В, С, М (клочок меха, завёрнутый в ткань)', 'Концентрация, до 10 минут',
    ['concentration', 'support'],
    'Вы касаетесь зверя, дружелюбного к вам или очарованного вами, и устанавливаете с ним телепатическую связь. Если Интеллект зверя 4 или больше, заклинание не действует.',
    {
      source: 'XGE',
      classes: ['Друид', 'Следопыт'],
      sections: [
        { title: 'Связь', text: 'Пока действует заклинание, связь работает, когда вы и зверь находитесь в поле зрения друг друга. Зверь понимает ваши телепатические послания и может в ответ передавать вам простые чувства и понятия.' },
        { title: 'Помощь в бою', text: 'Пока связь работает, зверь совершает с преимуществом броски атаки по любому существу, которое вы видите в пределах 5 футов от себя.' }
      ]
    }
  ),
  spell(
    'catapult', 'Катапульта', 1, 'transmutation',
    '1 действие', '60 фт.', 'С', 'Мгновенная',
    ['damage'],
    'Выберите в пределах дистанции предмет весом от 1 до 5 фунтов, который никто не носит и не держит. Он летит по прямой до 90 футов в выбранном вами направлении и падает на землю; если на пути твёрдая поверхность, он останавливается раньше.',
    {
      source: 'XGE',
      classes: ['Волшебник', 'Чародей', 'Изобретатель'],
      sections: [
        { title: 'Удар', text: 'Если предмет должен попасть в существо, то существо совершает спасбросок Ловкости; при провале предмет попадает в него и останавливается. Во что бы ни ударился предмет, и он сам, и то, во что он попал, получают по 3к8 дробящего урона.' },
        { title: 'На более высоких уровнях', text: 'За каждый уровень ячейки выше 1-го наибольший вес предмета увеличивается на 5 фунтов, а урон — на 1к8.' }
      ]
    }
  ),
  spell(
    'ice-knife', 'Ледяной кинжал', 1, 'conjuration',
    '1 действие', '60 фт.', 'С, М (капля воды или кусочек льда)', 'Мгновенная',
    ['damage'],
    'Вы создаёте осколок льда и бросаете его в существо в пределах дистанции. Совершите по цели дальнобойную атаку заклинанием: при попадании она получает 1к10 колющего урона.',
    {
      source: 'XGE',
      classes: ['Волшебник', 'Друид', 'Чародей'],
      sections: [
        { title: 'Взрыв', text: 'Попали вы или промахнулись, затем осколок взрывается. Цель и каждое существо в пределах 5 футов от неё совершают спасбросок Ловкости; при провале существо получает 2к6 урона холодом.' },
        { title: 'На более высоких уровнях', text: 'Урон холодом увеличивается на 1к6 за каждый уровень ячейки выше 1-го.' }
      ]
    }
  ),
  spell(
    'healing-word', 'Лечащее слово', 1, 'evocation',
    '1 бонусное действие', '60 фт.', 'В', 'Мгновенная',
    ['healing'],
    'Выбранное вами существо, которое вы видите в пределах дистанции, восстанавливает 1к4 + модификатор вашей заклинательной характеристики хитов. Заклинание не действует на нежить и конструктов.',
    {
      source: 'PHB',
      classes: ['Бард', 'Друид', 'Жрец'],
      sections: [
        { title: 'На более высоких уровнях', text: 'Лечение увеличивается на 1к4 за каждый уровень ячейки выше 1-го.' }
      ]
    }
  ),
  spell(
    'cure-wounds', 'Лечение ран', 1, 'evocation',
    '1 действие', 'Касание', 'В, С', 'Мгновенная',
    ['healing'],
    'Существо, которого вы касаетесь, восстанавливает 1к8 + модификатор вашей заклинательной характеристики хитов. Заклинание не действует на нежить и конструктов.',
    {
      source: 'PHB',
      classes: ['Бард', 'Друид', 'Жрец', 'Паладин', 'Следопыт', 'Изобретатель'],
      sections: [
        { title: 'На более высоких уровнях', text: 'Лечение увеличивается на 1к8 за каждый уровень ячейки выше 1-го.' }
      ]
    }
  ),
  spell(
    'ray-of-sickness', 'Луч болезни', 1, 'necromancy',
    '1 действие', '60 фт.', 'В, С', 'Мгновенная',
    ['damage', 'control'],
    'В существо в пределах дистанции бьёт луч тошнотворной зеленоватой энергии. Совершите по цели дальнобойную атаку заклинанием. При попадании она получает 2к8 урона ядом и совершает спасбросок Телосложения; при провале она ещё и отравлена до конца вашего следующего хода.',
    {
      source: 'PHB',
      classes: ['Волшебник', 'Чародей'],
      sections: [
        { title: 'На более высоких уровнях', text: 'Урон увеличивается на 1к8 за каждый уровень ячейки выше 1-го.' }
      ]
    }
  ),
  spell(
    'disguise-self', 'Маскировка', 1, 'illusion',
    '1 действие', 'На себя', 'В, С', '1 час',
    ['utility'],
    'Вы меняете свою внешность — вместе с одеждой, доспехом, оружием и остальными вещами при себе — до конца действия заклинания или пока не отпустите его действием. Вы можете казаться на 1 фут ниже или выше, худым, толстым или среднего сложения. Строение тела изменить нельзя: у нового облика должно быть то же расположение конечностей. В остальном вид иллюзии выбираете вы.',
    {
      source: 'PHB',
      classes: ['Бард', 'Волшебник', 'Чародей', 'Изобретатель'],
      sections: [
        { title: 'Ощупывание', text: 'Иллюзия не выдерживает физической проверки. Например, если вы добавили к наряду шляпу, предметы проходят сквозь неё, а тот, кто её коснётся, ничего не почувствует или нащупает вашу голову и волосы. Если вы кажетесь худее, чем есть, рука того, кто тянется к вам, наткнётся на вас, ещё как будто не дотянувшись.' },
        { title: 'Разоблачение', text: 'Чтобы понять, что вы замаскированы, существо должно действием изучить вашу внешность и преуспеть в проверке Интеллекта (Анализ) против СЛ спасброска ваших заклинаний.' }
      ]
    }
  ),
  spell(
    'hunters-mark', 'Метка охотника', 1, 'divination',
    '1 бонусное действие', '90 фт.', 'В', 'Концентрация, до 1 часа',
    ['concentration', 'damage'],
    'Вы выбираете существо, которое видите в пределах дистанции, и магически отмечаете его как свою добычу. Пока действует заклинание, каждое ваше попадание по цели атакой оружием наносит ей дополнительно 1к6 урона, а проверки Мудрости (Внимательность) и Мудрости (Выживание), чтобы найти её, вы совершаете с преимуществом.',
    {
      source: 'PHB',
      classes: ['Следопыт'],
      sections: [
        { title: 'Новая добыча', text: 'Если хиты цели опускаются до 0, пока заклинание действует, в один из следующих своих ходов вы можете бонусным действием отметить новое существо.' },
        { title: 'На более высоких уровнях', text: 'Ячейкой 3-го или 4-го уровня концентрацию можно поддерживать до 8 часов, ячейкой 5-го уровня и выше — до 24 часов.' }
      ]
    }
  ),
  spell(
    'inflict-wounds', 'Нанесение ран', 1, 'necromancy',
    '1 действие', 'Касание', 'В, С', 'Мгновенная',
    ['damage'],
    'Совершите рукопашную атаку заклинанием по существу в пределах вашей досягаемости. При попадании цель получает 3к10 урона некротической энергией.',
    {
      source: 'PHB',
      classes: ['Жрец'],
      sections: [
        { title: 'На более высоких уровнях', text: 'Урон увеличивается на 1к10 за каждый уровень ячейки выше 1-го.' }
      ]
    }
  ),
  spell(
    'guiding-bolt', 'Направленный снаряд', 1, 'evocation',
    '1 действие', '120 фт.', 'В, С', '1 раунд',
    ['damage', 'support'],
    'К выбранному вами существу в пределах дистанции устремляется вспышка света. Совершите по цели дальнобойную атаку заклинанием. При попадании цель получает 4к6 урона излучением, а следующий бросок атаки по этой цели до конца вашего следующего хода совершается с преимуществом: до тех пор на ней мерцает таинственный тусклый свет.',
    {
      source: 'PHB',
      classes: ['Жрец'],
      sections: [
        { title: 'На более высоких уровнях', text: 'Урон увеличивается на 1к6 за каждый уровень ячейки выше 1-го.' }
      ]
    }
  ),
  spell(
    'illusory-script', 'Невидимое письмо', 1, 'illusion',
    '1 минута', 'Касание', 'С, М (чернила на основе свинца стоимостью не менее 10 с.м., расходуются)', '10 дней',
    ['ritual', 'utility'],
    'Вы пишете на пергаменте, бумаге или другом подходящем материале и вкладываете в написанное сильную иллюзию, которая держится, пока действует заклинание. Вам и существам, которых вы назвали при сотворении, текст кажется обычным: он написан вашей рукой и передаёт тот смысл, который вы вложили. Всем остальным он кажется написанным непонятными или магическими письменами.',
    {
      source: 'PHB',
      classes: ['Бард', 'Волшебник', 'Колдун'],
      sections: [
        { title: 'Ложное послание', text: 'Вместо этого вы можете сделать так, чтобы текст выглядел совсем другим посланием, написанным другим почерком и на другом языке; этот язык должен быть вам известен.' },
        { title: 'Конец', text: 'Если заклинание рассеять, исчезают и исходный текст, и иллюзия. Существо с истинным зрением может прочитать скрытое послание.' }
      ]
    }
  ),
  spell(
    'unseen-servant', 'Невидимый слуга', 1, 'conjuration',
    '1 действие', '60 фт.', 'В, С, М (кусочек верёвки и щепка дерева)', '1 час',
    ['ritual', 'utility'],
    'Заклинание создаёт невидимую, безмозглую и бесформенную силу, которая до конца действия заклинания выполняет по вашей команде простые поручения. Слуга появляется в свободном пространстве на земле в пределах дистанции. У него КД 10, 1 хит и Сила 2, атаковать он не может. Если его хиты опускаются до 0, заклинание заканчивается.',
    {
      source: 'PHB',
      classes: ['Бард', 'Волшебник', 'Колдун'],
      sections: [
        { title: 'Команды', text: 'Один раз в каждый свой ход бонусным действием вы можете мысленно приказать слуге переместиться на расстояние до 15 футов и взаимодействовать с предметом. Слуга может делать то же, что и обычный слуга-человек: приносить вещи, убирать, чинить, складывать одежду, разводить огонь, подавать еду и разливать вино. Получив команду, слуга выполняет поручение как может, пока не закончит, а затем ждёт следующей команды.' },
        { title: 'Предел', text: 'Если вы приказываете слуге сделать что-то, из-за чего он окажется дальше 60 футов от вас, заклинание заканчивается.' }
      ]
    }
  ),
  spell(
    'detect-poison-and-disease', 'Обнаружение болезней и яда', 1, 'divination',
    '1 действие', 'На себя', 'В, С, М (тисовый лист)', 'Концентрация, до 10 минут',
    ['concentration', 'ritual', 'utility'],
    'Пока действует заклинание, вы чувствуете присутствие и местонахождение ядов, ядовитых существ и болезней в пределах 30 футов от себя. Кроме того, в каждом случае вы узнаёте, какой это яд, ядовитое существо или болезнь.',
    {
      source: 'PHB',
      classes: ['Жрец', 'Друид', 'Паладин', 'Следопыт', 'Изобретатель'],
      sections: [
        { title: 'Преграды', text: 'Заклинание проникает сквозь большинство преград, но его останавливают 1 фут камня, 1 дюйм обычного металла, тонкий лист свинца или 3 фута дерева или земли.' }
      ]
    }
  ),
  spell(
    'detect-evil-and-good', 'Обнаружение добра и зла', 1, 'divination',
    '1 действие', 'На себя', 'В, С', 'Концентрация, до 10 минут',
    ['concentration', 'utility'],
    'Пока действует заклинание, вы знаете, есть ли в пределах 30 футов от вас аберрация, небожитель, элементаль, фея, исчадие или нежить, и где это существо находится. Точно так же вы знаете, есть ли в пределах 30 футов от вас место или предмет, магически освящённые или осквернённые.',
    {
      source: 'PHB',
      classes: ['Жрец', 'Паладин'],
      sections: [
        { title: 'Преграды', text: 'Заклинание проникает сквозь большинство преград, но его останавливают 1 фут камня, 1 дюйм обычного металла, тонкий лист свинца или 3 фута дерева или земли.' }
      ]
    }
  ),
  spell(
    'detect-magic', 'Обнаружение магии', 1, 'divination',
    '1 действие', 'На себя', 'В, С', 'Концентрация, до 10 минут',
    ['concentration', 'ritual', 'utility'],
    'Пока действует заклинание, вы чувствуете присутствие магии в пределах 30 футов от себя. Почувствовав её, вы можете действием увидеть слабую ауру вокруг любого видимого существа или предмета в этой области, несущего магию, и узнать её школу, если она есть.',
    {
      source: 'PHB',
      classes: ['Бард', 'Жрец', 'Друид', 'Паладин', 'Следопыт', 'Волшебник', 'Чародей', 'Изобретатель'],
      sections: [
        { title: 'Преграды', text: 'Заклинание проникает сквозь большинство преград, но его останавливают 1 фут камня, 1 дюйм обычного металла, тонкий лист свинца или 3 фута дерева или земли.' }
      ]
    }
  ),
  spell(
    'burning-hands', 'Огненные ладони', 1, 'evocation',
    '1 действие', 'На себя (15-футовый конус)', 'В, С', 'Мгновенная',
    ['damage'],
    'Вы складываете ладони, соприкасаясь большими пальцами и растопырив остальные, и из кончиков пальцев вырывается тонкая завеса пламени. Каждое существо в 15-футовом конусе совершает спасбросок Ловкости и получает 3к6 урона огнём при провале или половину этого урона при успехе. Огонь поджигает горючие предметы в области, которые никто не носит и не держит.',
    {
      source: 'PHB',
      classes: ['Волшебник', 'Чародей'],
      sections: [
        { title: 'На более высоких уровнях', text: 'Урон увеличивается на 1к6 за каждый уровень ячейки выше 1-го.' }
      ]
    }
  ),
  spell(
    'faerie-fire', 'Огонь фей', 1, 'evocation',
    '1 действие', '60 фт.', 'В', 'Концентрация, до 1 минуты',
    ['concentration', 'control'],
    'Каждый предмет в кубе со стороной 20 футов в пределах дистанции обрисовывается синим, зелёным или фиолетовым светом (на ваш выбор). Каждое существо в этой области в момент сотворения тоже обрисовывается светом, если проваливает спасбросок Ловкости.',
    {
      source: 'PHB',
      classes: ['Бард', 'Друид', 'Изобретатель'],
      sections: [
        { title: 'Подсветка', text: 'Пока действует заклинание, затронутые предметы и существа испускают тусклый свет в радиусе 10 футов. Броски атаки по затронутому существу или предмету совершаются с преимуществом, если атакующий его видит, и затронутое существо или предмет не получает преимуществ от невидимости.' }
      ]
    }
  ),
  spell(
    'identify', 'Опознание', 1, 'divination',
    '1 минута', 'Касание', 'В, С, М (жемчужина стоимостью не менее 100 с.м. и совиное перо)', 'Мгновенная',
    ['ritual', 'utility'],
    'Вы выбираете один предмет и касаетесь его всё время сотворения. Если это магический предмет или другой наполненный магией объект, вы узнаёте его свойства и способ применения, нужна ли для него настройка и сколько у него зарядов, если они есть. Вы узнаёте, действуют ли на предмет какие-то заклинания и какие именно. Если предмет создан заклинанием, вы узнаёте, каким.',
    {
      source: 'PHB',
      classes: ['Бард', 'Волшебник', 'Изобретатель'],
      sections: [
        { title: 'Существо', text: 'Если вместо этого вы касаетесь всё время сотворения существа, вы узнаёте, какие заклинания на него сейчас действуют, если такие есть.' }
      ]
    }
  ),
  spell(
    'entangle', 'Опутывание', 1, 'conjuration',
    '1 действие', '90 фт.', 'В, С', 'Концентрация, до 1 минуты',
    ['concentration', 'control'],
    'Из земли на квадратном участке со стороной 20 футов, начинающемся от точки в пределах дистанции, вырастают цепкие сорняки и лозы. Пока действует заклинание, растения делают землю в этой области труднопроходимой местностью.',
    {
      source: 'PHB',
      classes: ['Друид', 'Следопыт'],
      sections: [
        { title: 'Опутывание', text: 'Существо, находящееся в области в момент сотворения, должно преуспеть в спасброске Силы, иначе растения опутывают его до конца действия заклинания. Опутанное растениями существо может действием совершить проверку Силы против СЛ спасброска ваших заклинаний; при успехе оно освобождается.' },
        { title: 'Конец', text: 'Когда заклинание заканчивается, призванные растения увядают.' }
      ]
    }
  ),
  spell(
    'ensnaring-strike', 'Опутывающий удар', 1, 'conjuration',
    '1 бонусное действие', 'На себя', 'В', 'Концентрация, до 1 минуты',
    ['concentration', 'control', 'damage'],
    'Пока заклинание действует, при вашем следующем попадании по существу атакой оружием в месте удара появляется клубок шипастых лоз. Цель совершает спасбросок Силы и при провале опутана лозами до конца действия заклинания; существо размера Большой и больше совершает этот спасбросок с преимуществом. При успехе лозы усыхают.',
    {
      source: 'PHB',
      classes: ['Следопыт'],
      sections: [
        { title: 'Шипы', text: 'Пока цель опутана лозами, она получает 1к6 колющего урона в начале каждого своего хода.' },
        { title: 'Освобождение', text: 'Опутанное существо или любое существо, которое может до него дотронуться, может действием совершить проверку Силы против СЛ спасброска ваших заклинаний; при успехе цель освобождается.' },
        { title: 'На более высоких уровнях', text: 'Урон увеличивается на 1к6 за каждый уровень ячейки выше 1-го.' }
      ]
    }
  ),
  spell(
    'charm-person', 'Очарование личности', 1, 'enchantment',
    '1 действие', '30 фт.', 'В, С', '1 час',
    ['control'],
    'Вы пытаетесь очаровать гуманоида, которого видите в пределах дистанции. Он совершает спасбросок Мудрости, причём с преимуществом, если вы или ваши спутники сражаетесь с ним. При провале он очарован вами, пока действует заклинание или пока вы либо ваши спутники не сделаете ему что-то вредное. Очарованное существо считает вас дружелюбным знакомым. Когда заклинание заканчивается, существо знает, что вы его очаровали.',
    {
      source: 'PHB',
      classes: ['Бард', 'Волшебник', 'Друид', 'Колдун', 'Чародей'],
      sections: [
        { title: 'На более высоких уровнях', text: 'Ячейкой 2-го уровня и выше заклинание затрагивает ещё одно существо за каждый уровень ячейки выше 1-го. Все цели должны находиться не дальше 30 футов друг от друга.' }
      ]
    }
  ),
  spell(
    'purify-food-and-drink', 'Очищение пищи и питья', 1, 'transmutation',
    '1 действие', '10 фт.', 'В, С', 'Мгновенная',
    ['ritual', 'utility'],
    'Вся немагическая еда и питьё в сфере радиусом 5 футов с центром в выбранной вами точке в пределах дистанции очищаются от ядов и болезней.',
    {
      source: 'PHB',
      classes: ['Друид', 'Жрец', 'Паладин', 'Изобретатель']
    }
  ),
  spell(
    'feather-fall', 'Падение пёрышком', 1, 'transmutation',
    '1 реакция, совершаемая, когда вы или существо в пределах 60 фт. начинает падать', '60 фт.', 'В, М (маленькое перо или кусочек пуха)', '1 минута',
    ['reaction', 'support'],
    'Выберите до пяти падающих существ в пределах дистанции. Пока действует заклинание, скорость падения каждого из них снижается до 60 футов за раунд. Если существо приземляется до окончания заклинания, оно не получает урона от падения и может приземлиться на ноги, а заклинание для него заканчивается.',
    {
      source: 'PHB',
      classes: ['Бард', 'Волшебник', 'Чародей', 'Изобретатель']
    }
  ),
  spell(
    'searing-smite', 'Палящая кара', 1, 'evocation',
    '1 бонусное действие', 'На себя', 'В', 'Концентрация, до 1 минуты',
    ['concentration', 'damage'],
    'Пока заклинание действует, при вашем следующем попадании по существу атакой рукопашным оружием оружие вспыхивает добела: атака наносит цели дополнительно 1к6 урона огнём, и цель загорается.',
    {
      source: 'PHB',
      classes: ['Паладин'],
      sections: [
        { title: 'Горение', text: 'Пока действует заклинание, в начале каждого своего хода горящая цель совершает спасбросок Телосложения: при провале она получает 1к6 урона огнём, при успехе заклинание заканчивается.' },
        { title: 'Тушение', text: 'Заклинание также заканчивается, если цель или существо в пределах 5 футов от неё действием тушит пламя или если огонь гасит что-то другое — например, цель погружается в воду.' },
        { title: 'На более высоких уровнях', text: 'Дополнительный урон от самой атаки увеличивается на 1к6 за каждый уровень ячейки выше 1-го. Урон от горения не растёт.' }
      ]
    }
  ),
  spell(
    'absorb-elements', 'Поглощение стихий', 1, 'abjuration',
    '1 реакция, совершаемая при получении урона кислотой, холодом, огнём, электричеством или звуком', 'На себя', 'С', '1 раунд',
    ['reaction', 'support', 'damage'],
    'Заклинание перехватывает часть летящей в вас энергии, ослабляет её и сохраняет для вашего следующего удара. До начала вашего следующего хода у вас есть сопротивление тому типу урона, который вызвал реакцию, — включая сам этот урон.',
    {
      source: 'XGE',
      classes: ['Волшебник', 'Друид', 'Следопыт', 'Чародей', 'Изобретатель'],
      sections: [
        { title: 'Ответный удар', text: 'Когда в свой следующий ход вы впервые попадаете рукопашной атакой, цель получает дополнительно 1к6 урона того же типа, и заклинание заканчивается.' },
        { title: 'На более высоких уровнях', text: 'Дополнительный урон увеличивается на 1к6 за каждый уровень ячейки выше 1-го.' }
      ]
    }
  ),
  spell(
    'find-familiar', 'Поиск фамильяра', 1, 'conjuration',
    '1 час', '10 фт.', 'В, С, М (уголь, благовония и травы стоимостью 10 с.м., сжигаемые в латунной жаровне)', 'Мгновенная',
    ['ritual', 'utility'],
    'Вам начинает служить фамильяр — дух, принявший облик выбранного вами животного: летучей мыши, кошки, краба, лягушки (жабы), ястреба, ящерицы, осьминога, совы, ядовитой змеи, рыбы (квиппера), крысы, ворона, морского конька, паука или ласки. Он появляется в свободном пространстве в пределах дистанции и имеет характеристики выбранного облика, но это не зверь, а небожитель, фея или исчадие (на ваш выбор).',
    {
      source: 'PHB',
      classes: ['Волшебник'],
      sections: [
        { title: 'В бою', text: 'Фамильяр действует независимо от вас, но всегда подчиняется вашим командам. В бою он бросает собственную инициативу и действует в свой ход. Фамильяр не может атаковать, но может совершать другие действия как обычно.' },
        { title: 'Гибель', text: 'Когда хиты фамильяра опускаются до 0, он исчезает, не оставляя тела. Он появляется снова, когда вы ещё раз сотворите это заклинание.' },
        { title: 'Связь', text: 'Пока фамильяр находится в пределах 100 футов от вас, вы можете общаться с ним телепатически. Кроме того, действием вы можете до начала своего следующего хода смотреть глазами фамильяра и слышать то, что слышит он, пользуясь его особыми чувствами. В это время вы слепы и глухи в отношении собственных чувств.' },
        { title: 'Отпустить', text: 'Действием вы можете временно отпустить фамильяра: он исчезает в карманное измерение и ждёт там вашего зова. Можно отпустить его и навсегда. Пока фамильяр отпущен временно, действием вы можете вернуть его в любое свободное пространство в пределах 30 футов от себя.' },
        { title: 'Один фамильяр', text: 'Одновременно у вас может быть только один фамильяр. Если вы творите это заклинание, когда фамильяр уже есть, он принимает новый облик из списка выше.' },
        { title: 'Передача заклинаний', text: 'Когда вы творите заклинание с дистанцией «касание», его может передать фамильяр, как если бы сотворил его сам. Фамильяр должен быть в пределах 100 футов от вас и потратить реакцию, когда вы творите заклинание. Если для заклинания нужен бросок атаки, используется ваш модификатор атаки.' }
      ]
    }
  ),
  spell(
    'comprehend-languages', 'Понимание языков', 1, 'divination',
    '1 действие', 'На себя', 'В, С, М (щепотка сажи и соли)', '1 час',
    ['ritual', 'utility'],
    'Пока действует заклинание, вы понимаете буквальный смысл любой услышанной речи на любом языке. Вы также понимаете любой письменный язык, который видите, но при этом должны касаться поверхности, на которой написаны слова. На чтение одной страницы текста уходит около 1 минуты. Заклинание не расшифровывает тайные послания в тексте и знаки вроде магических символов, которые не относятся к письменному языку.',
    {
      source: 'PHB',
      classes: ['Бард', 'Волшебник', 'Колдун', 'Чародей']
    }
  ),
  spell(
    'bane', 'Порча', 1, 'enchantment',
    '1 действие', '30 фт.', 'В, С, М (капля крови)', 'Концентрация, до 1 минуты',
    ['concentration', 'control'],
    'До трёх выбранных вами существ, которых вы видите в пределах дистанции, совершают спасбросок Харизмы. Каждый раз, когда цель, провалившая этот спасбросок, совершает бросок атаки или спасбросок, пока действует заклинание, она бросает к4 и вычитает выпавшее число из этого броска атаки или спасброска.',
    {
      source: 'PHB',
      classes: ['Бард', 'Жрец'],
      sections: [
        { title: 'На более высоких уровнях', text: 'Ячейкой 2-го уровня и выше заклинание затрагивает ещё одно существо за каждый уровень ячейки выше 1-го.' }
      ]
    }
  ),
  spell(
    'expeditious-retreat', 'Поспешное отступление', 1, 'transmutation',
    '1 бонусное действие', 'На себя', 'В, С', 'Концентрация, до 10 минут',
    ['concentration', 'utility'],
    'Заклинание позволяет вам двигаться с невероятной быстротой. Когда вы творите его, а затем бонусным действием в каждый свой ход до конца действия заклинания вы можете совершать действие Рывок.',
    {
      source: 'PHB',
      classes: ['Волшебник', 'Чародей', 'Колдун', 'Изобретатель']
    }
  ),
  spell(
    'command', 'Приказ', 1, 'enchantment',
    '1 действие', '60 фт.', 'В', '1 раунд',
    ['control'],
    'Вы произносите приказ из одного слова существу, которое видите в пределах дистанции. Цель должна преуспеть в спасброске Мудрости, иначе в свой следующий ход она выполняет приказ. Заклинание не действует, если цель — нежить, если она не понимает ваш язык или если приказ напрямую причиняет ей вред. Ниже — обычные приказы и их действие. Вы можете отдать и другой приказ; тогда, как поведёт себя цель, решает Мастер. Если цель не может выполнить приказ, заклинание заканчивается.',
    {
      source: 'PHB',
      classes: ['Бард', 'Жрец', 'Паладин'],
      sections: [
        { title: 'Подойди', text: 'Цель движется к вам кратчайшим и самым прямым путём и заканчивает ход, оказавшись в пределах 5 футов от вас.' },
        { title: 'Брось', text: 'Цель бросает всё, что держит, и заканчивает ход.' },
        { title: 'Беги', text: 'Цель тратит ход на то, чтобы удалиться от вас самым быстрым доступным способом.' },
        { title: 'Пади ниц', text: 'Цель сбита с ног и заканчивает ход.' },
        { title: 'Стой', text: 'Цель не перемещается и не совершает действий. Летающее существо остаётся в воздухе, если может; если для этого ему нужно двигаться, оно пролетает наименьшее нужное расстояние.' },
        { title: 'На более высоких уровнях', text: 'Ячейкой 2-го уровня и выше заклинание затрагивает ещё одно существо за каждый уровень ячейки выше 1-го. Все цели должны находиться не дальше 30 футов друг от друга.' }
      ]
    }
  ),
  spell(
    'jump', 'Прыжок', 1, 'transmutation',
    '1 действие', 'Касание', 'В, С, М (задняя лапка кузнечика)', '1 минута',
    ['support'],
    'Вы касаетесь существа. Пока действует заклинание, дальность его прыжков утраивается.',
    {
      source: 'PHB',
      classes: ['Волшебник', 'Друид', 'Следопыт', 'Чародей', 'Изобретатель']
    }
  ),
  spell(
    'false-life', 'Псевдожизнь', 1, 'necromancy',
    '1 действие', 'На себя', 'В, С, М (небольшое количество алкоголя)', '1 час',
    ['healing', 'support'],
    'Укрепив себя некромантическим подобием жизни, вы получаете 1к4 + 4 временных хита на время действия заклинания.',
    {
      source: 'PHB',
      classes: ['Волшебник', 'Чародей', 'Изобретатель'],
      sections: [
        { title: 'На более высоких уровнях', text: 'Вы получаете ещё 5 временных хитов за каждый уровень ячейки выше 1-го.' }
      ]
    }
  ),
  spell(
    'speak-with-animals', 'Разговор с животными', 1, 'divination',
    '1 действие', 'На себя', 'В, С', '10 минут',
    ['ritual', 'utility'],
    'Пока действует заклинание, вы понимаете зверей и можете разговаривать с ними. Знания и осведомлённость многих зверей ограничены их умом, но как минимум звери могут рассказать вам о ближайших местах и чудовищах, в том числе обо всём, что они воспринимают сейчас или воспринимали за последние сутки. На усмотрение Мастера вы можете уговорить зверя оказать вам небольшую услугу.',
    {
      source: 'PHB',
      classes: ['Бард', 'Друид', 'Следопыт']
    }
  ),
  spell(
    'arms-of-hadar', 'Руки Хадара', 1, 'conjuration',
    '1 действие', 'На себя (радиус 10 фт.)', 'В, С', 'Мгновенная',
    ['damage', 'control'],
    'Вы взываете к силе Хадара, Тёмного Голода, и из вас вырываются щупальца тёмной энергии, хлещущие всех существ в пределах 10 футов от вас. Каждое существо в этой области совершает спасбросок Силы. При провале оно получает 2к6 урона некротической энергией и до начала своего следующего хода не может совершать реакции. При успехе оно получает половину урона и никаких других последствий.',
    {
      source: 'PHB',
      classes: ['Колдун'],
      sections: [
        { title: 'На более высоких уровнях', text: 'Урон увеличивается на 1к6 за каждый уровень ячейки выше 1-го.' }
      ]
    }
  ),
  spell(
    'color-spray', 'Сверкающие брызги', 1, 'illusion',
    '1 действие', 'На себя (15-футовый конус)', 'В, С, М (щепотка порошка или песка красного, жёлтого и синего цвета)', '1 раунд',
    ['control'],
    'Из вашей руки вырывается ослепительная россыпь мерцающих цветных огней. Бросьте 6к10: сумма — это сколько хитов существ может затронуть заклинание.',
    {
      source: 'PHB',
      classes: ['Бард', 'Волшебник', 'Чародей'],
      sections: [
        { title: 'Порядок', text: 'Существа в 15-футовом конусе, исходящем от вас, затрагиваются по возрастанию их текущих хитов; существа без сознания и те, кто не может видеть, не учитываются. Начиная с существа с наименьшими текущими хитами, каждое затронутое существо ослеплено до конца вашего следующего хода. Перед тем как перейти к существу со следующими наименьшими хитами, вычтите хиты затронутого существа из суммы. Существо затрагивается, только если его хиты не больше оставшейся суммы.' },
        { title: 'На более высоких уровнях', text: 'Бросьте дополнительно 2к10 за каждый уровень ячейки выше 1-го.' }
      ]
    }
  ),
  spell(
    'hex', 'Сглаз', 1, 'enchantment',
    '1 бонусное действие', '90 фт.', 'В, С, М (окаменевший глаз тритона)', 'Концентрация, до 1 часа',
    ['concentration', 'damage', 'control'],
    'Вы проклинаете существо, которое видите в пределах дистанции. Пока действует заклинание, каждое ваше попадание по цели атакой наносит ей дополнительно 1к6 урона некротической энергией. Кроме того, при сотворении вы выбираете одну характеристику: проверки этой характеристики цель совершает с помехой.',
    {
      source: 'PHB',
      classes: ['Колдун'],
      sections: [
        { title: 'Новая цель', text: 'Если хиты цели опускаются до 0, пока заклинание действует, в один из следующих своих ходов вы можете бонусным действием проклясть новое существо.' },
        { title: 'Снятие', text: 'Заклинание «Снятие проклятья», сотворённое на цель, досрочно оканчивает это заклинание.' },
        { title: 'На более высоких уровнях', text: 'Ячейкой 3-го или 4-го уровня концентрацию можно поддерживать до 8 часов, ячейкой 5-го уровня и выше — до 24 часов.' }
      ]
    }
  ),
  spell(
    'alarm', 'Сигнал тревоги', 1, 'abjuration',
    '1 минута', '30 фт.', 'В, С, М (крошечный колокольчик и кусочек тонкой серебряной проволоки)', '8 часов',
    ['ritual', 'utility'],
    'Вы ставите сигнализацию от незваных гостей. Выберите дверь, окно или область в пределах дистанции не больше куба со стороной 20 футов. Пока действует заклинание, сигнал предупреждает вас каждый раз, когда охраняемой области касается или входит в неё существо размера Крошечный или больше. При сотворении вы можете назвать существ, которые не будут поднимать тревогу. Вы также выбираете, будет сигнал мысленным или слышимым.',
    {
      source: 'PHB',
      classes: ['Волшебник', 'Следопыт', 'Изобретатель'],
      sections: [
        { title: 'Мысленный сигнал', text: 'Предупреждает вас звоном в голове, если вы находитесь в пределах 1 мили от охраняемой области. Этот звон будит вас, если вы спите.' },
        { title: 'Слышимый сигнал', text: 'В течение 10 секунд звучит звон ручного колокольчика, слышимый в пределах 60 футов.' }
      ]
    }
  ),
  spell(
    'snare', 'Силок', 1, 'abjuration',
    '1 минута', 'Касание', 'С, М (25 фт. верёвки, расходуется)', '8 часов',
    ['control'],
    'Сотворяя заклинание, вы выкладываете верёвкой на земле или полу круг радиусом 5 футов. Когда сотворение закончено, верёвка исчезает, а круг становится магической ловушкой. Ловушку почти не видно: чтобы её заметить, нужна успешная проверка Интеллекта (Анализ) против СЛ спасброска ваших заклинаний.',
    {
      source: 'XGE',
      classes: ['Волшебник', 'Друид', 'Следопыт', 'Изобретатель'],
      sections: [
        { title: 'Срабатывание', text: 'Ловушка срабатывает, когда существо размера Маленький, Средний или Большой ступает на землю или пол в её радиусе. Это существо совершает спасбросок Ловкости; при провале магия вздёргивает его вверх ногами на 3 фута над землёй или полом, и оно опутано там до конца действия заклинания.' },
        { title: 'Освобождение', text: 'Опутанное существо в конце каждого своего хода может совершить спасбросок Ловкости и при успехе освобождается. Кроме того, оно само или кто-то, кто может до него дотянуться, может действием совершить проверку Интеллекта (Знание магии) против СЛ спасброска ваших заклинаний; при успехе опутывание заканчивается.' },
        { title: 'Конец', text: 'После того как ловушка сработала, заклинание заканчивается, когда в ней не остаётся опутанных существ.' }
      ]
    }
  ),
  spell(
    'grease', 'Скольжение', 1, 'conjuration',
    '1 действие', '60 фт.', 'В, С, М (кусочек сливочного масла или свиного сала)', '1 минута',
    ['control'],
    'Скользкий жир покрывает землю на квадратном участке со стороной 10 футов с центром в точке в пределах дистанции и на время действия заклинания делает его труднопроходимой местностью. Когда жир появляется, каждое существо, стоящее в этой области, должно преуспеть в спасброске Ловкости, иначе оно сбито с ног. Существо, которое входит в эту область или заканчивает в ней ход, тоже должно преуспеть в спасброске Ловкости, иначе оно сбито с ног.',
    {
      source: 'PHB',
      classes: ['Волшебник', 'Чародей', 'Изобретатель']
    }
  ),
  spell(
    'longstrider', 'Скороход', 1, 'transmutation',
    '1 действие', 'Касание', 'В, С, М (щепотка земли)', '1 час',
    ['support'],
    'Вы касаетесь существа. Пока действует заклинание, его скорость увеличивается на 10 футов.',
    {
      source: 'PHB',
      classes: ['Бард', 'Волшебник', 'Друид', 'Следопыт', 'Изобретатель'],
      sections: [
        { title: 'На более высоких уровнях', text: 'Ячейкой 2-го уровня и выше заклинание затрагивает ещё одно существо за каждый уровень ячейки выше 1-го.' }
      ]
    }
  ),
  spell(
    'chaos-bolt', 'Снаряд хаоса', 1, 'evocation',
    '1 действие', '120 фт.', 'В, С', 'Мгновенная',
    ['damage'],
    'Вы швыряете в существо в пределах дистанции колышущийся, дрожащий сгусток хаотической энергии. Совершите по цели дальнобойную атаку заклинанием. При попадании цель получает 2к8 + 1к6 урона. Выберите один из к8: выпавшее на нём число определяет тип урона — 1 кислота, 2 холод, 3 огонь, 4 силовое поле, 5 электричество, 6 яд, 7 психическая энергия, 8 звук.',
    {
      source: 'XGE',
      classes: ['Чародей'],
      sections: [
        { title: 'Прыжок энергии', text: 'Если на обоих к8 выпало одно и то же число, хаотическая энергия перескакивает с цели на другое выбранное вами существо в пределах 30 футов от неё. Совершите по новой цели новый бросок атаки и новый бросок урона — энергия может перескочить снова. Каждое существо может стать целью этого заклинания только один раз за сотворение.' },
        { title: 'На более высоких уровнях', text: 'Каждая цель получает дополнительно 1к6 урона выпавшего типа за каждый уровень ячейки выше 1-го.' }
      ]
    }
  ),
  spell(
    'create-or-destroy-water', 'Сотворение или уничтожение воды', 1, 'transmutation',
    '1 действие', '30 фт.', 'В, С, М (капля воды для сотворения или несколько песчинок для уничтожения)', 'Мгновенная',
    ['utility'],
    'Вы создаёте или уничтожаете воду.',
    {
      source: 'PHB',
      classes: ['Друид', 'Жрец'],
      sections: [
        { title: 'Создание воды', text: 'Вы создаёте до 10 галлонов чистой воды в открытом сосуде в пределах дистанции. Вместо этого вода может пролиться дождём в кубе со стороной 30 футов в пределах дистанции; дождь гасит открытый огонь в этой области.' },
        { title: 'Уничтожение воды', text: 'Вы уничтожаете до 10 галлонов воды в открытом сосуде в пределах дистанции. Вместо этого вы можете уничтожить туман в кубе со стороной 30 футов в пределах дистанции.' },
        { title: 'На более высоких уровнях', text: 'За каждый уровень ячейки выше 1-го вы создаёте или уничтожаете ещё 10 галлонов воды либо сторона куба увеличивается на 5 футов.' }
      ]
    }
  ),
  spell(
    'tensers-floating-disk', 'Тензеров парящий диск', 1, 'conjuration',
    '1 действие', '30 фт.', 'В, С, М (капля ртути)', '1 час',
    ['ritual', 'utility'],
    'Заклинание создаёт круглую горизонтальную плоскость силового поля диаметром 3 фута и толщиной 1 дюйм. Она парит в 3 футах над землёй в выбранном вами свободном пространстве, которое вы видите в пределах дистанции. Диск держится, пока действует заклинание, и выдерживает до 500 фунтов. Если на него положить больше, заклинание заканчивается, и всё, что было на диске, падает на землю.',
    {
      source: 'PHB',
      classes: ['Волшебник'],
      sections: [
        { title: 'Движение', text: 'Пока вы находитесь в пределах 20 футов от диска, он неподвижен. Если вы отходите дальше 20 футов, диск следует за вами, оставаясь в пределах 20 футов. Он движется по неровной местности, вверх и вниз по лестницам, склонам и тому подобному, но не может преодолеть перепад высоты в 10 футов и больше. Например, диск не пересечёт яму глубиной 10 футов и не выберется из такой ямы, если появился на её дне.' },
        { title: 'Конец', text: 'Если вы отходите от диска дальше чем на 100 футов (обычно потому, что он не может обойти препятствие, чтобы последовать за вами), заклинание заканчивается.' }
      ]
    }
  ),
  spell(
    'fog-cloud', 'Туманное облако', 1, 'conjuration',
    '1 действие', '120 фт.', 'В, С', 'Концентрация, до 1 часа',
    ['concentration', 'control'],
    'Вы создаёте сферу тумана радиусом 20 футов с центром в точке в пределах дистанции. Туман огибает углы, а его область сильно заслонена. Он держится, пока действует заклинание или пока его не рассеет ветер умеренной силы и больше (не меньше 10 миль в час).',
    {
      source: 'PHB',
      classes: ['Друид', 'Следопыт', 'Волшебник', 'Чародей', 'Изобретатель'],
      sections: [
        { title: 'На более высоких уровнях', text: 'Радиус тумана увеличивается на 20 футов за каждый уровень ячейки выше 1-го.' }
      ]
    }
  ),
  spell(
    'sanctuary', 'Убежище', 1, 'abjuration',
    '1 бонусное действие', '30 фт.', 'В, С, М (маленькое серебряное зеркало)', '1 минута',
    ['support'],
    'Вы защищаете существо в пределах дистанции от нападения. Пока действует заклинание, каждое существо, которое выбирает защищённое существо целью атаки или вредоносного заклинания, сначала должно совершить спасбросок Мудрости. При провале оно должно выбрать другую цель или потерять атаку либо заклинание. Заклинание не защищает от эффектов по области — например, от взрыва огненного шара.',
    {
      source: 'PHB',
      classes: ['Жрец', 'Изобретатель'],
      sections: [
        { title: 'Конец', text: 'Если защищённое существо атакует, творит заклинание, которое затрагивает врага, или причиняет урон другому существу, заклинание заканчивается.' }
      ]
    }
  ),
  spell(
    'zephyr-strike', 'Удар Зефира', 1, 'transmutation',
    '1 бонусное действие', 'На себя', 'В', 'Концентрация, до 1 минуты',
    ['concentration', 'support', 'damage'],
    'Вы движетесь, как ветер. Пока действует заклинание, ваше перемещение не провоцирует атак.',
    {
      source: 'XGE',
      classes: ['Следопыт'],
      sections: [
        { title: 'Порыв', text: 'Один раз за время действия заклинания в свой ход вы можете совершить один бросок атаки оружием с преимуществом. При попадании эта атака наносит дополнительно 1к8 урона силовым полем. Попали вы или нет, до конца этого хода ваша скорость ходьбы увеличивается на 30 футов.' }
      ]
    }
  ),
  spell(
    'sleep', 'Усыпление', 1, 'enchantment',
    '1 действие', '90 фт.', 'В, С, М (щепотка мелкого песка, лепестки розы или сверчок)', '1 минута',
    ['control'],
    'Заклинание погружает существ в магический сон. Бросьте 5к8: сумма — это сколько хитов существ может затронуть заклинание.',
    {
      source: 'PHB',
      classes: ['Бард', 'Волшебник', 'Чародей'],
      sections: [
        { title: 'Порядок', text: 'Существа в пределах 20 футов от выбранной вами точки в пределах дистанции затрагиваются по возрастанию их текущих хитов; существа без сознания не учитываются. Начиная с существа с наименьшими текущими хитами, каждое затронутое существо теряет сознание, пока не закончится заклинание, пока спящий не получит урон или пока кто-нибудь действием не растолкает его или не разбудит пощёчиной. Перед тем как перейти к существу со следующими наименьшими хитами, вычтите хиты затронутого существа из суммы. Существо затрагивается, только если его хиты не больше оставшейся суммы.' },
        { title: 'Невосприимчивые', text: 'Нежить и существа, невосприимчивые к очарованию, заклинанию не подвержены.' },
        { title: 'На более высоких уровнях', text: 'Бросьте дополнительно 2к8 за каждый уровень ячейки выше 1-го.' }
      ]
    }
  ),
  spell(
    'chromatic-orb', 'Цветной шарик', 1, 'evocation',
    '1 действие', '90 фт.', 'В, С, М (алмаз стоимостью не менее 50 с.м.)', 'Мгновенная',
    ['damage'],
    'Вы метаете сферу энергии диаметром 4 дюйма в существо, которое видите в пределах дистанции. Сначала выберите вид сферы — кислота, холод, огонь, электричество, яд или звук, — затем совершите по цели дальнобойную атаку заклинанием. При попадании существо получает 3к8 урона выбранного типа.',
    {
      source: 'PHB',
      classes: ['Волшебник', 'Чародей'],
      sections: [
        { title: 'На более высоких уровнях', text: 'Урон увеличивается на 1к8 за каждый уровень ячейки выше 1-го.' }
      ]
    }
  ),
  spell(
    'ceremony', 'Церемония', 1, 'abjuration',
    '1 час', 'Касание', 'В, С, М (порошок серебра стоимостью 25 с.м., расходуется)', 'Мгновенная',
    ['ritual', 'support'],
    'Вы совершаете один из религиозных обрядов ниже. Сотворяя заклинание, вы должны касаться предмета или существ, на которых направлен обряд.',
    {
      source: 'XGE',
      classes: ['Жрец', 'Паладин'],
      sections: [
        { title: 'Искупление', text: 'Вы касаетесь согласного существа, чьё мировоззрение изменилось, и совершаете проверку Мудрости (Проницательность) СЛ 20. При успехе вы возвращаете существу прежнее мировоззрение.' },
        { title: 'Освящение воды', text: 'Вы касаетесь флакона с водой, и она становится святой водой.' },
        { title: 'Совершеннолетие', text: 'Вы касаетесь гуманоида, вступающего во взрослую жизнь. В следующие 24 часа, совершая проверку характеристики, он может бросить к4 и прибавить выпавшее число к проверке. Существо получает пользу от этого обряда только один раз в жизни.' },
        { title: 'Посвящение', text: 'Вы касаетесь гуманоида, желающего посвятить себя служению вашему божеству. В следующие 24 часа, совершая спасбросок, он может бросить к4 и прибавить выпавшее число к спасброску. Существо получает пользу от этого обряда только один раз в жизни.' },
        { title: 'Погребение', text: 'Вы касаетесь трупа, и в следующие 7 дней его нельзя превратить в нежить никаким способом, кроме заклинания «Исполнение желаний».' },
        { title: 'Венчание', text: 'Вы касаетесь взрослых гуманоидов, согласных вступить в брак. В следующие 7 дней каждый из них получает бонус +2 к КД, пока они находятся в пределах 30 футов друг от друга. Повторно существо может получить пользу от этого обряда, только если овдовеет.' }
      ]
    }
  ),
  spell(
    'goodberry', 'Чудо-ягоды', 1, 'transmutation',
    '1 действие', 'Касание', 'В, С, М (веточка омелы)', 'Мгновенная',
    ['healing', 'utility'],
    'В вашей руке появляется до десяти ягод, наполненных магией. Существо может действием съесть одну ягоду. Съеденная ягода восстанавливает 1 хит и даёт столько пищи, сколько существу нужно на день. Ягоды теряют силу, если их не съели в течение 24 часов после сотворения заклинания.',
    {
      source: 'PHB',
      classes: ['Друид', 'Следопыт']
    }
  ),
  spell(
    'shield', 'Щит', 1, 'abjuration',
    '1 реакция, совершаемая при попадании по вам атакой или если вы стали целью волшебной стрелы', 'На себя', 'В, С', '1 раунд',
    ['reaction', 'support'],
    'Появляется невидимый барьер магической силы и защищает вас. До начала вашего следующего хода вы получаете бонус +5 к КД, в том числе против атаки, вызвавшей реакцию, и не получаете урона от заклинания «Волшебная стрела».',
    {
      source: 'PHB',
      classes: ['Волшебник', 'Чародей']
    }
  ),
  spell(
    'shield-of-faith', 'Щит веры', 1, 'abjuration',
    '1 бонусное действие', '60 фт.', 'В, С, М (маленький пергамент со священным текстом)', 'Концентрация, до 10 минут',
    ['concentration', 'support'],
    'Выбранное вами существо в пределах дистанции окружает мерцающее поле, которое даёт ему бонус +2 к КД на время действия заклинания.',
    {
      source: 'PHB',
      classes: ['Жрец', 'Паладин']
    }
  ),
  // ── Заклинания 2 уровня (базовые, PHB / XGE / TCE) ────────────────
  spell(
    'pass-without-trace', 'Бесследное передвижение', 2, 'abjuration',
    '1 действие', 'На себя (радиус 30 фт.)', 'В, С, М (пепел сожжённого листа омелы и веточка ели)', 'Концентрация, до 1 часа',
    ['concentration', 'support'],
    'От вас расходится завеса теней и тишины, скрывая вас и ваших спутников. Пока действует заклинание, каждое выбранное вами существо в пределах 30 футов от вас (включая вас) получает бонус +10 к проверкам Ловкости (Скрытность), и его нельзя выследить иначе как магией. Существо, получившее этот бонус, не оставляет ни следов, ни других признаков своего прохода.',
    {
      source: 'PHB',
      classes: ['Друид', 'Следопыт']
    }
  ),
  spell(
    'spiritual-weapon', 'Божественное оружие', 2, 'evocation',
    '1 бонусное действие', '60 фт.', 'В, С', '1 минута',
    ['damage'],
    'Вы создаёте в пределах дистанции парящее призрачное оружие. Оно держится, пока действует заклинание или пока вы не сотворите это заклинание снова. При сотворении вы можете совершить рукопашную атаку заклинанием по существу в пределах 5 футов от оружия. При попадании цель получает 1к8 + модификатор вашей заклинательной характеристики урона силовым полем.',
    {
      source: 'PHB',
      classes: ['Жрец'],
      sections: [
        { title: 'Новые атаки', text: 'Бонусным действием в свой ход вы можете переместить оружие на расстояние до 20 футов и повторить атаку по существу в пределах 5 футов от него.' },
        { title: 'Облик', text: 'Оружие может выглядеть как угодно. Жрецы богов, связанных с определённым оружием, обычно придают ему вид этого оружия.' },
        { title: 'На более высоких уровнях', text: 'Урон увеличивается на 1к8 за каждые два уровня ячейки выше 2-го.' }
      ]
    }
  ),
  spell(
    'continual-flame', 'Вечный огонь', 2, 'evocation',
    '1 действие', 'Касание', 'В, С, М (рубиновая пыль стоимостью 50 с.м., расходуется)', 'Пока не рассеется',
    ['utility'],
    'Из предмета, которого вы касаетесь, вырывается пламя, яркое, как факел. Оно похоже на обычный огонь, но не греет и не потребляет воздуха. Вечный огонь можно накрыть или спрятать, но нельзя задушить или погасить.',
    {
      source: 'PHB',
      classes: ['Волшебник', 'Друид', 'Жрец', 'Изобретатель']
    }
  ),
  spell(
    'see-invisibility', 'Видение невидимого', 2, 'divination',
    '1 действие', 'На себя', 'В, С, М (щепотка талька и немного толчёного серебра)', '1 час',
    ['utility'],
    'Пока действует заклинание, вы видите невидимых существ и предметы так, будто они видимы, а также видите Эфирный план. Существа и предметы на Эфирном плане кажутся призрачными и полупрозрачными.',
    {
      source: 'PHB',
      classes: ['Бард', 'Волшебник', 'Чародей', 'Изобретатель']
    }
  ),
  spell(
    'suggestion', 'Внушение', 2, 'enchantment',
    '1 действие', '30 фт.', 'В, М (язык змеи и кусочек медовых сот или капля сладкого масла)', 'Концентрация, до 8 часов',
    ['concentration', 'control'],
    'Вы внушаете образ действий (одно-два предложения) существу, которое видите в пределах дистанции и которое слышит и понимает вас, и магически влияете на него. Существа, которых нельзя очаровать, невосприимчивы к этому эффекту. Внушение должно звучать так, чтобы действие казалось разумным. Если предложить существу заколоть себя, броситься на копьё, поджечь себя или сделать что-то ещё явно вредное, заклинание заканчивается.',
    {
      source: 'PHB',
      classes: ['Бард', 'Волшебник', 'Чародей', 'Колдун'],
      sections: [
        { title: 'Спасбросок', text: 'Цель совершает спасбросок Мудрости. При провале она изо всех сил следует внушённому. Внушённое действие может длиться всё время действия заклинания. Если его можно выполнить быстрее, заклинание заканчивается, когда цель сделает то, о чём её просили.' },
        { title: 'Условие', text: 'Можно также назначить условие, при котором цель за время действия заклинания совершит особое действие. Например, можно внушить рыцарю отдать своего боевого коня первому встреченному нищему. Если условие не наступило до конца заклинания, действие не совершается.' },
        { title: 'Конец', text: 'Если вы или кто-то из ваших спутников причиняет цели урон, заклинание заканчивается.' }
      ]
    }
  ),
  spell(
    'magic-mouth', 'Волшебные уста', 2, 'illusion',
    '1 минута', '30 фт.', 'В, С, М (кусочек медовых сот и нефритовая пыль стоимостью не менее 10 с.м., расходуются)', 'Пока не рассеется',
    ['ritual', 'utility'],
    'Вы вкладываете в предмет в пределах дистанции послание, которое прозвучит, когда выполнится условие. Выберите предмет, который вы видите и который не носит и не держит другое существо. Затем произнесите послание — до 25 слов, хотя произносить его можно до 10 минут. Наконец, задайте обстоятельство, при котором заклинание передаст послание.',
    {
      source: 'PHB',
      classes: ['Бард', 'Волшебник', 'Изобретатель'],
      sections: [
        { title: 'Рот', text: 'Когда обстоятельство наступает, на предмете появляется волшебный рот и произносит послание вашим голосом и с той же громкостью. Если у предмета есть рот или что-то похожее на рот (например, рот статуи), волшебный рот появляется там, и кажется, что слова произносит сам предмет.' },
        { title: 'Повтор', text: 'При сотворении вы решаете, закончится ли заклинание, передав послание, или останется и будет повторять послание каждый раз, когда условие выполняется.' },
        { title: 'Условие', text: 'Условие может быть сколь угодно общим или подробным, но должно опираться на то, что видно или слышно в пределах 30 футов от предмета. Например, рот может заговорить, когда любое существо подойдёт к предмету на 30 футов или когда в пределах 30 футов от него зазвонит серебряный колокольчик.' }
      ]
    }
  ),
  spell(
    'arcane-lock', 'Волшебный замок', 2, 'abjuration',
    '1 действие', 'Касание', 'В, С, М (золотая пыль стоимостью не менее 25 с.м., расходуется)', 'Пока не рассеется',
    ['utility'],
    'Вы касаетесь закрытой двери, окна, ворот, сундука или другого входа, и он запирается на время действия заклинания. Вы и существа, которых вы назвали при сотворении, открываете его как обычно. Вы также можете задать пароль: если произнести его в пределах 5 футов от предмета, заклинание подавляется на 1 минуту. В остальное время предмет не открыть, пока его не сломают или пока заклинание не рассеют или не подавят.',
    {
      source: 'PHB',
      classes: ['Волшебник', 'Изобретатель'],
      sections: [
        { title: 'Открывание', text: 'Заклинание «Открывание», сотворённое на предмет, подавляет волшебный замок на 10 минут.' },
        { title: 'Прочность', text: 'Пока на предмете это заклинание, его труднее сломать или открыть силой: СЛ, чтобы сломать его или вскрыть любые замки на нём, увеличивается на 10.' }
      ]
    }
  ),
  spell(
    'phantasmal-force', 'Воображаемая сила', 2, 'illusion',
    '1 действие', '60 фт.', 'В, С, М (кусочек овечьей шерсти)', 'Концентрация, до 1 минуты',
    ['concentration', 'damage', 'control'],
    'Вы вживляете иллюзию в разум существа, которое видите в пределах дистанции. Цель совершает спасбросок Интеллекта. При провале вы создаёте призрачный предмет, существо или другое видимое явление на свой выбор, не больше куба со стороной 10 футов; на время действия заклинания его воспринимает только цель. На нежить и конструктов заклинание не действует.',
    {
      source: 'PHB',
      classes: ['Бард', 'Волшебник', 'Чародей', 'Колдун'],
      sections: [
        { title: 'Видение', text: 'У видения есть звук, температура и другие ощущения, но их тоже чувствует только цель. Цель может действием изучить видение проверкой Интеллекта (Анализ) против СЛ спасброска ваших заклинаний; при успехе она понимает, что это иллюзия, и заклинание заканчивается.' },
        { title: 'Вера в видение', text: 'Пока заклинание действует, цель считает видение настоящим и сама находит объяснения нелогичным последствиям. Например, ступив на призрачный мост через пропасть, она падает; если она переживёт падение, то всё равно уверена, что мост есть, и объясняет падение иначе — её толкнули, она поскользнулась, её сдуло ветром.' },
        { title: 'Урон', text: 'Цель так верит в видение, что может получить от него урон. Видение в облике существа может её атаковать, видение огня, лужи кислоты или лавы — обжечь. В каждый ваш ход видение может нанести цели 1к6 урона психической энергией, если она находится в области видения или в пределах 5 футов от него и если видение изображает существо или опасность, которая могла бы причинить урон. Цель воспринимает этот урон как урон подходящего иллюзии вида.' }
      ]
    }
  ),
  spell(
    'augury', 'Гадание', 2, 'divination',
    '1 минута', 'На себя', 'В, С, М (особым образом размеченные палочки, кости или подобные знаки стоимостью не менее 25 с.м.)', 'Мгновенная',
    ['ritual', 'utility'],
    'Бросая палочки с самоцветами, кости или узорчатые карты либо пользуясь другим гадальным средством, вы получаете от потусторонней сущности знамение о том, чем обернётся определённое действие, которое вы собираетесь совершить в ближайшие 30 минут. Мастер выбирает одно из знамений: «благо» — к хорошему исходу, «горе» — к плохому, «благо и горе» — к хорошему и плохому сразу, «ничего» — исход ни особенно хороший, ни плохой.',
    {
      source: 'PHB',
      classes: ['Волшебник', 'Друид', 'Жрец'],
      sections: [
        { title: 'Пределы', text: 'Заклинание не учитывает обстоятельств, которые могут изменить исход, — например, сотворения других заклинаний, потери или появления спутника.' },
        { title: 'Повторное гадание', text: 'Если вы творите заклинание два раза или больше до окончания следующего продолжительного отдыха, то за каждое сотворение после первого есть накопительный шанс 25 процентов получить случайный ответ. Этот бросок Мастер делает тайно.' }
      ]
    }
  ),
  spell(
    'blindness-or-deafness', 'Глухота/слепота', 2, 'necromancy',
    '1 действие', '30 фт.', 'В', '1 минута',
    ['control'],
    'Вы можете ослепить или оглушить врага. Выберите существо, которое видите в пределах дистанции; оно совершает спасбросок Телосложения. При провале цель ослеплена или оглохла (на ваш выбор) на время действия заклинания. В конце каждого своего хода цель может совершить спасбросок Телосложения; при успехе заклинание заканчивается.',
    {
      source: 'PHB',
      classes: ['Бард', 'Волшебник', 'Жрец', 'Чародей'],
      sections: [
        { title: 'На более высоких уровнях', text: 'Ячейкой 3-го уровня и выше заклинание затрагивает ещё одно существо за каждый уровень ячейки выше 2-го.' }
      ]
    }
  ),
  spell(
    'flame-blade', 'Горящий клинок', 2, 'evocation',
    '1 бонусное действие', 'На себя', 'В, С, М (лист сумаха)', 'Концентрация, до 10 минут',
    ['concentration', 'damage'],
    'Вы вызываете в свободной руке огненный клинок размером и формой со скимитар; он держится, пока действует заклинание. Если вы выпустите клинок, он исчезнет, но бонусным действием его можно вызвать снова.',
    {
      source: 'PHB',
      classes: ['Друид'],
      sections: [
        { title: 'Атака', text: 'Действием вы можете совершить огненным клинком рукопашную атаку заклинанием. При попадании цель получает 3к6 урона огнём.' },
        { title: 'Свет', text: 'Пылающий клинок испускает яркий свет в радиусе 10 футов и тусклый свет ещё на 10 футов.' },
        { title: 'На более высоких уровнях', text: 'Урон увеличивается на 1к6 за каждые два уровня ячейки выше 2-го.' }
      ]
    }
  ),
  spell(
    'shatter', 'Дребезги', 2, 'evocation',
    '1 действие', '60 фт.', 'В, С, М (кусочек слюды)', 'Мгновенная',
    ['damage'],
    'В выбранной вами точке в пределах дистанции раздаётся внезапный оглушительный звон, мучительно громкий. Каждое существо в сфере радиусом 10 футов с центром в этой точке совершает спасбросок Телосложения и получает 3к8 урона звуком при провале или половину этого урона при успехе. Существа из неорганических материалов — камня, кристалла или металла — совершают этот спасбросок с помехой. Немагический предмет, который никто не носит и не держит, тоже получает урон, если находится в области заклинания.',
    {
      source: 'PHB',
      classes: ['Бард', 'Волшебник', 'Колдун', 'Чародей'],
      sections: [
        { title: 'На более высоких уровнях', text: 'Урон увеличивается на 1к8 за каждый уровень ячейки выше 2-го.' }
      ]
    }
  ),
  spell(
    'barkskin', 'Дубовая кора', 2, 'transmutation',
    '1 действие', 'Касание', 'В, С, М (горсть дубовой коры)', 'Концентрация, до 1 часа',
    ['concentration', 'support'],
    'Вы касаетесь согласного существа. Пока действует заклинание, кожа цели становится грубой, похожей на кору, и её КД не может быть меньше 16, какой бы доспех она ни носила.',
    {
      source: 'PHB',
      classes: ['Друид', 'Следопыт']
    }
  ),
  spell(
    'dragons-breath', 'Дыхание дракона', 2, 'transmutation',
    '1 бонусное действие', 'Касание', 'В, С, М (острый перец)', 'Концентрация, до 1 минуты',
    ['concentration', 'damage'],
    'Вы касаетесь согласного существа и даёте ему силу изрыгать магическую энергию изо рта, если рот у него есть. Выберите кислоту, холод, огонь, электричество или яд.',
    {
      source: 'XGE',
      classes: ['Волшебник', 'Чародей', 'Изобретатель'],
      sections: [
        { title: 'Дыхание', text: 'Пока действует заклинание, существо может действием выдохнуть энергию выбранного вида 15-футовым конусом. Каждое существо в этой области совершает спасбросок Ловкости и получает 3к6 урона выбранного вида при провале или половину этого урона при успехе.' },
        { title: 'На более высоких уровнях', text: 'Урон увеличивается на 1к6 за каждый уровень ячейки выше 2-го.' }
      ]
    }
  ),
  spell(
    'beast-sense', 'Животные чувства', 2, 'divination',
    '1 действие', 'Касание', 'С', 'Концентрация, до 1 часа',
    ['concentration', 'ritual', 'utility'],
    'Вы касаетесь согласного зверя. Пока действует заклинание, вы можете действием смотреть его глазами и слышать то, что слышит он, — до тех пор, пока действием не вернётесь к собственным чувствам. Пока вы воспринимаете мир чувствами зверя, вы пользуетесь всеми его особыми чувствами, но сами слепы и глухи к тому, что происходит вокруг вас.',
    {
      source: 'PHB',
      classes: ['Друид', 'Следопыт']
    }
  ),
  spell(
    'cordon-of-arrows', 'Завеса стрел', 2, 'transmutation',
    '1 действие', '5 фт.', 'В, С, М (не менее четырёх стрел или арбалетных болтов)', '8 часов',
    ['damage', 'control'],
    'Вы втыкаете в землю в пределах дистанции четыре немагических боеприпаса — стрелы или арбалетные болты — и зачаровываете их охранять место. Пока действует заклинание, когда существо, кроме вас, впервые за ход оказывается в пределах 30 футов от боеприпасов или заканчивает там ход, один боеприпас взлетает и бьёт его. Существо совершает спасбросок Ловкости и при провале получает 1к6 колющего урона. Этот боеприпас уничтожается. Когда боеприпасов не остаётся, заклинание заканчивается.',
    {
      source: 'PHB',
      classes: ['Следопыт'],
      sections: [
        { title: 'Свои', text: 'При сотворении вы можете назвать любых существ, и заклинание не будет их трогать.' },
        { title: 'На более высоких уровнях', text: 'За каждый уровень ячейки выше 2-го число зачарованных боеприпасов увеличивается на два.' }
      ]
    }
  ),
  spell(
    'protection-from-poison', 'Защита от яда', 2, 'abjuration',
    '1 действие', 'Касание', 'В, С', '1 час',
    ['support'],
    'Вы касаетесь существа. Если оно отравлено, вы нейтрализуете яд. Если на цель действует несколько ядов, вы нейтрализуете один яд, о котором знаете, или один случайный. Пока действует заклинание, цель совершает с преимуществом спасброски от отравления и получает сопротивление урону ядом.',
    {
      source: 'PHB',
      classes: ['Друид', 'Жрец', 'Паладин', 'Следопыт', 'Изобретатель']
    }
  ),
  spell(
    'warding-wind', 'Защитный ветер', 2, 'evocation',
    '1 действие', 'На себя (радиус 10 фт.)', 'В', 'Концентрация, до 10 минут',
    ['concentration', 'control'],
    'Вокруг вас в радиусе 10 футов дует сильный ветер (20 миль в час); он движется вместе с вами, оставаясь с центром на вас, пока действует заклинание.',
    {
      source: 'XGE',
      classes: ['Бард', 'Друид', 'Волшебник', 'Чародей'],
      sections: [
        { title: 'Ветер', text: 'Вы и другие существа в области оглохли. Незащищённое пламя размером с факел и меньше в области гаснет. Ветер не пускает внутрь пар, газ и туман, которые может разогнать сильный ветер. Для всех, кроме вас, область — труднопроходимая местность. Атаки дальнобойным оружием, которые проходят в ветер или из него, совершаются с помехой.' }
      ]
    }
  ),
  spell(
    'maximilians-earthen-grasp', 'Земляная хватка Максимилиана', 2, 'transmutation',
    '1 действие', '30 фт.', 'В, С, М (миниатюрная кисть руки, вылепленная из глины)', 'Концентрация, до 1 минуты',
    ['concentration', 'damage', 'control'],
    'Выберите свободный участок земли размером 5 на 5 футов, который видите в пределах дистанции. Там поднимается рука Среднего размера из спрессованной земли и тянется к существу, которое вы видите в пределах 5 футов от неё. Цель совершает спасбросок Силы; при провале она получает 2к6 дробящего урона и опутана, пока действует заклинание.',
    {
      source: 'XGE',
      classes: ['Волшебник', 'Чародей', 'Изобретатель'],
      sections: [
        { title: 'Сжать', text: 'Действием вы можете заставить руку сдавить опутанную цель. Цель совершает спасбросок Силы и получает 2к6 дробящего урона при провале или половину при успехе.' },
        { title: 'Вырваться', text: 'Опутанная цель может действием совершить проверку Силы против СЛ спасброска ваших заклинаний; при успехе она вырывается, и рука её больше не держит.' },
        { title: 'Новая цель', text: 'Действием вы можете направить руку к другому существу или переместить её на другой свободный участок в пределах дистанции. В обоих случаях рука отпускает опутанную цель.' }
      ]
    }
  ),
  spell(
    'healing-spirit', 'Исцеляющий дух', 2, 'conjuration',
    '1 бонусное действие', '60 фт.', 'В, С', 'Концентрация, до 1 минуты',
    ['concentration', 'healing'],
    'Вы призываете духа природы, чтобы он облегчал страдания раненых. Бесплотный дух появляется в пространстве размером с куб со стороной 5 футов, которое вы видите в пределах дистанции, и выглядит как прозрачный зверь или фея (на ваш выбор).',
    {
      source: 'XGE',
      classes: ['Друид', 'Следопыт'],
      sections: [
        { title: 'Лечение', text: 'Пока действует заклинание, когда вы или существо, которое вы видите, впервые за ход входите в пространство духа или начинаете там ход, вы можете без действия заставить духа восстановить этому существу 1к6 хитов. Дух не лечит конструктов и нежить.' },
        { title: 'Сколько раз', text: 'Дух лечит число раз, равное 1 + модификатор вашей заклинательной характеристики (но не меньше двух), а затем исчезает.' },
        { title: 'Перемещение', text: 'Бонусным действием в свой ход вы можете переместить духа на расстояние до 30 футов в пространство, которое видите.' },
        { title: 'На более высоких уровнях', text: 'Лечение увеличивается на 1к6 за каждый уровень ячейки выше 2-го.' }
      ]
    }
  ),
  spell(
    'branding-smite', 'Клеймящая кара', 2, 'evocation',
    '1 бонусное действие', 'На себя', 'В', 'Концентрация, до 1 минуты',
    ['concentration', 'damage'],
    'Пока заклинание действует, когда вы в следующий раз попадаете по существу атакой оружием, оружие вспыхивает астральным сиянием. Атака наносит цели дополнительно 2к6 урона излучением. Невидимая цель становится видимой; до конца действия заклинания она испускает тусклый свет в радиусе 5 футов и не может стать невидимой.',
    {
      source: 'PHB',
      classes: ['Паладин'],
      sections: [
        { title: 'На более высоких уровнях', text: 'Дополнительный урон увеличивается на 1к6 за каждый уровень ячейки выше 2-го.' }
      ]
    }
  ),
  spell(
    'crown-of-madness', 'Корона безумия', 2, 'enchantment',
    '1 действие', '120 фт.', 'В, С', 'Концентрация, до 1 минуты',
    ['concentration', 'control'],
    'Выбранный вами гуманоид, которого вы видите в пределах дистанции, совершает спасбросок Мудрости и при провале очарован вами на время действия заклинания. Пока он очарован так, на его голове появляется кривая корона из зазубренного железа, а в глазах горит безумие.',
    {
      source: 'PHB',
      classes: ['Бард', 'Волшебник', 'Чародей', 'Колдун'],
      sections: [
        { title: 'Безумие', text: 'В каждый свой ход, прежде чем перемещаться, очарованная цель должна действием совершить рукопашную атаку по существу, которое вы мысленно выбираете, — но не по самой себе. Если вы никого не выбрали или выбранного нет в её досягаемости, цель действует в свой ход как обычно.' },
        { title: 'Удержание', text: 'В каждый свой следующий ход вы должны тратить действие на то, чтобы удерживать цель, иначе заклинание заканчивается. Кроме того, в конце каждого своего хода цель может совершить спасбросок Мудрости; при успехе заклинание заканчивается.' }
      ]
    }
  ),
  spell(
    'levitate', 'Левитация', 2, 'transmutation',
    '1 действие', '60 фт.', 'В, С, М (маленькая кожаная петля или кусочек золотой проволоки, согнутой чашечкой, с длинным стержнем на одном конце)', 'Концентрация, до 10 минут',
    ['concentration', 'utility'],
    'Одно существо или незакреплённый предмет на ваш выбор, которых вы видите в пределах дистанции, поднимается вертикально на высоту до 20 футов и висит там, пока действует заклинание. Заклинание поднимает цель весом до 500 фунтов. Несогласное существо, преуспевшее в спасброске Телосложения, не подвергается действию заклинания.',
    {
      source: 'PHB',
      classes: ['Волшебник', 'Чародей', 'Изобретатель'],
      sections: [
        { title: 'Перемещение', text: 'Цель может двигаться, только отталкиваясь от неподвижного предмета или поверхности в пределах досягаемости (например, от стены или потолка) или подтягиваясь к ним, — как будто лазая. В свой ход вы можете изменить высоту цели на расстояние до 20 футов вверх или вниз. Если цель — вы, вы поднимаетесь или опускаетесь в рамках своего перемещения. Иначе вы можете действием передвинуть цель, но она должна оставаться в пределах дистанции заклинания.' },
        { title: 'Конец', text: 'Когда заклинание заканчивается, цель, если всё ещё висит в воздухе, плавно опускается на землю.' }
      ]
    }
  ),
  spell(
    'moonbeam', 'Лунный луч', 2, 'evocation',
    '1 действие', '120 фт.', 'В, С, М (несколько семян любого луносемянника и кусочек опалесцирующего полевого шпата)', 'Концентрация, до 1 минуты',
    ['concentration', 'damage'],
    'Серебристый луч бледного света падает вниз цилиндром радиусом 5 футов и высотой 40 футов с центром в точке в пределах дистанции. Пока действует заклинание, цилиндр заполнен тусклым светом.',
    {
      source: 'PHB',
      classes: ['Друид'],
      sections: [
        { title: 'Призрачное пламя', text: 'Когда существо впервые за ход входит в область заклинания или начинает там ход, его охватывает призрачное пламя, причиняющее жгучую боль, и оно совершает спасбросок Телосложения. Существо получает 2к10 урона излучением при провале или половину этого урона при успехе.' },
        { title: 'Перевёртыши', text: 'Перевёртыш совершает этот спасбросок с помехой. При провале он ещё и сразу возвращается в свой истинный облик и не может принять другой, пока не выйдет из света заклинания.' },
        { title: 'Перемещение', text: 'В каждый свой ход после сотворения вы можете действием передвинуть луч на расстояние до 60 футов в любом направлении.' },
        { title: 'На более высоких уровнях', text: 'Урон увеличивается на 1к10 за каждый уровень ячейки выше 2-го.' }
      ]
    }
  ),
  spell(
    'ray-of-enfeeblement', 'Луч слабости', 2, 'necromancy',
    '1 действие', '60 фт.', 'В, С', 'Концентрация, до 1 минуты',
    ['concentration', 'control'],
    'С вашего пальца срывается чёрный луч изнуряющей энергии и летит в существо в пределах дистанции. Совершите по цели дальнобойную атаку заклинанием. При попадании, пока действует заклинание, цель наносит атаками оружием, в которых использует Силу, только половину урона. В конце каждого своего хода цель может совершить спасбросок Телосложения против заклинания; при успехе заклинание заканчивается.',
    {
      source: 'PHB',
      classes: ['Волшебник', 'Чародей', 'Колдун']
    }
  ),
  spell(
    'magic-weapon', 'Магическое оружие', 2, 'transmutation',
    '1 бонусное действие', 'Касание', 'В, С', 'Концентрация, до 1 часа',
    ['concentration', 'support'],
    'Вы касаетесь немагического оружия. Пока действует заклинание, оно становится магическим оружием с бонусом +1 к броскам атаки и урона.',
    {
      source: 'PHB',
      classes: ['Паладин', 'Волшебник', 'Чародей', 'Изобретатель'],
      sections: [
        { title: 'На более высоких уровнях', text: 'Ячейкой 4-го уровня и выше бонус становится +2, ячейкой 6-го уровня и выше — +3.' }
      ]
    }
  ),
  spell(
    'lesser-restoration', 'Малое восстановление', 2, 'abjuration',
    '1 действие', 'Касание', 'В, С', 'Мгновенная',
    ['support'],
    'Вы касаетесь существа и можете окончить одну болезнь или одно состояние, действующее на него. Состояние может быть таким: ослеплён, оглох, парализован или отравлен.',
    {
      source: 'PHB',
      classes: ['Бард', 'Друид', 'Жрец', 'Паладин', 'Следопыт', 'Изобретатель']
    }
  ),
  spell(
    'melfs-acid-arrow', 'Мельфова кислотная стрела', 2, 'evocation',
    '1 действие', '90 фт.', 'В, С, М (толчёный лист ревеня и желудок гадюки)', 'Мгновенная',
    ['damage'],
    'К цели в пределах дистанции устремляется мерцающая зелёная стрела и взрывается брызгами кислоты. Совершите по цели дальнобойную атаку заклинанием. При попадании цель сразу получает 4к4 урона кислотой и ещё 2к4 урона кислотой в конце своего следующего хода. При промахе стрела обрызгивает цель кислотой на половину начального урона, а в конце её следующего хода урона нет.',
    {
      source: 'PHB',
      classes: ['Волшебник'],
      sections: [
        { title: 'На более высоких уровнях', text: 'Урон (и начальный, и последующий) увеличивается на 1к4 за каждый уровень ячейки выше 2-го.' }
      ]
    }
  ),
  spell(
    'prayer-of-healing', 'Молебен лечения', 2, 'evocation',
    '10 минут', '30 фт.', 'В', 'Мгновенная',
    ['healing'],
    'До шести выбранных вами существ, которых вы видите в пределах дистанции, восстанавливают каждое 2к8 + модификатор вашей заклинательной характеристики хитов. Заклинание не действует на нежить и конструктов.',
    {
      source: 'PHB',
      classes: ['Жрец', 'Паладин'],
      sections: [
        { title: 'На более высоких уровнях', text: 'Лечение увеличивается на 1к8 за каждый уровень ячейки выше 2-го.' }
      ]
    }
  ),
  spell(
    'skywrite', 'Небесные письмена', 2, 'transmutation',
    '1 действие', 'В пределах видимости', 'В, С', 'Концентрация, до 1 часа',
    ['concentration', 'ritual', 'utility'],
    'На участке неба, который вы видите, складываются в надпись до десяти слов. Слова будто сотканы из облаков и висят на месте, пока действует заклинание, а с его окончанием рассеиваются. Сильный ветер может разогнать облака и досрочно окончить заклинание.',
    {
      source: 'XGE',
      classes: ['Бард', 'Друид', 'Волшебник', 'Чародей', 'Изобретатель']
    }
  ),
  spell(
    'invisibility', 'Невидимость', 2, 'illusion',
    '1 действие', 'Касание', 'В, С, М (ресница в смоле гуммиарабика)', 'Концентрация, до 1 часа',
    ['concentration', 'support', 'utility'],
    'Существо, которого вы касаетесь, становится невидимым до конца действия заклинания. Всё, что цель носит или держит, тоже невидимо, пока находится при ней. Для цели, которая атакует или творит заклинание, заклинание заканчивается.',
    {
      source: 'PHB',
      classes: ['Бард', 'Волшебник', 'Чародей', 'Колдун', 'Изобретатель'],
      sections: [
        { title: 'На более высоких уровнях', text: 'Ячейкой 3-го уровня и выше заклинание затрагивает ещё одно существо за каждый уровень ячейки выше 2-го.' }
      ]
    }
  ),
  spell(
    'gentle-repose', 'Нетленные останки', 2, 'necromancy',
    '1 действие', 'Касание', 'В, С, М (щепотка соли и по медной монете на каждый глаз трупа; они должны лежать там всё время действия заклинания)', '10 дней',
    ['ritual', 'utility'],
    'Вы касаетесь трупа или других останков. Пока действует заклинание, цель защищена от разложения и не может стать нежитью. Заклинание также фактически продлевает срок, в который цель можно вернуть к жизни: дни под действием этого заклинания не засчитываются в предельный срок заклинаний вроде «Оживления».',
    {
      source: 'PHB',
      classes: ['Волшебник', 'Жрец', 'Паладин']
    }
  ),
  spell(
    'nystuls-magic-aura', 'Нистулова ложная магия', 2, 'illusion',
    '1 действие', 'Касание', 'В, С, М (маленький квадратный лоскут шёлка)', '24 часа',
    ['utility'],
    'Вы накладываете иллюзию на существо или предмет, которого касаетесь, чтобы заклинания прорицания сообщали о нём ложные сведения. Целью может быть согласное существо или предмет, который не носит и не держит другое существо. При сотворении выберите один или оба эффекта ниже; эффект держится, пока действует заклинание. Если 30 дней подряд каждый день творить это заклинание на то же существо или предмет с тем же эффектом, иллюзия держится, пока её не рассеют.',
    {
      source: 'PHB',
      classes: ['Волшебник'],
      sections: [
        { title: 'Ложная аура', text: 'Вы меняете то, каким цель предстаёт перед заклинаниями и магическими эффектами, обнаруживающими магические ауры, — например, «Обнаружением магии». Немагический предмет может казаться магическим, магический — немагическим, а магическую ауру предмета можно изменить так, будто она принадлежит выбранной вами школе магии. Наложив этот эффект на предмет, вы можете сделать ложную магию заметной любому существу, которое возьмёт предмет в руки.' },
        { title: 'Маска', text: 'Вы меняете то, каким цель предстаёт перед заклинаниями и магическими эффектами, определяющими вид существ, — например, Божественным чувством паладина или условием срабатывания заклинания «Знак». Вы выбираете вид существа, и другие заклинания и магические эффекты считают цель существом этого вида или этого мировоззрения.' }
      ]
    }
  ),
  spell(
    'cloud-of-daggers', 'Облако кинжалов', 2, 'conjuration',
    '1 действие', '60 фт.', 'В, С, М (осколок стекла)', 'Концентрация, до 1 минуты',
    ['concentration', 'damage'],
    'Вы наполняете воздух вращающимися кинжалами — куб со стороной 5 футов с центром в выбранной вами точке в пределах дистанции. Существо получает 4к4 рубящего урона, когда впервые за ход входит в область заклинания или начинает там ход.',
    {
      source: 'PHB',
      classes: ['Бард', 'Волшебник', 'Чародей', 'Колдун'],
      sections: [
        { title: 'На более высоких уровнях', text: 'Урон увеличивается на 2к4 за каждый уровень ячейки выше 2-го.' }
      ]
    }
  ),
  spell(
    'zone-of-truth', 'Область истины', 2, 'enchantment',
    '1 действие', '60 фт.', 'В, С', '10 минут',
    ['control'],
    'Вы создаёте магическую зону, защищающую от обмана, — сферу радиусом 15 футов с центром в выбранной вами точке в пределах дистанции. Пока действует заклинание, существо, которое впервые за ход входит в эту область или начинает там ход, совершает спасбросок Харизмы. При провале существо не может сознательно лгать, пока находится в этом радиусе. Вы знаете, преуспело каждое существо в спасброске или провалило его.',
    {
      source: 'PHB',
      classes: ['Бард', 'Жрец', 'Паладин'],
      sections: [
        { title: 'Уклончивость', text: 'Существо под действием заклинания знает о нём и поэтому может не отвечать на вопросы, на которые обычно ответило бы ложью. Оно может отвечать уклончиво, пока не выходит за рамки правды.' }
      ]
    }
  ),
  spell(
    'detect-thoughts', 'Обнаружение мыслей', 2, 'divination',
    '1 действие', 'На себя', 'В, С, М (медная монета)', 'Концентрация, до 1 минуты',
    ['concentration', 'utility', 'control'],
    'Пока действует заклинание, вы можете читать мысли некоторых существ. При сотворении и действием в каждый ход до конца заклинания вы можете сосредоточиться на одном существе, которое видите в пределах 30 футов от себя. Если у выбранного существа Интеллект 3 или ниже или оно не говорит ни на одном языке, заклинание на него не действует.',
    {
      source: 'PHB',
      classes: ['Бард', 'Волшебник', 'Чародей', 'Колдун'],
      sections: [
        { title: 'Поверхностные мысли', text: 'Сначала вы узнаёте поверхностные мысли существа — то, что больше всего занимает его в этот момент. Действием вы можете либо переключиться на мысли другого существа, либо попытаться проникнуть глубже в разум того же существа.' },
        { title: 'Глубже', text: 'Если вы проникаете глубже, цель совершает спасбросок Мудрости. При провале вы узнаёте её образ мыслей (если он есть), её чувства и что-то, что занимает в её разуме большое место (например, то, о чём она тревожится, что любит или ненавидит). При успехе заклинание заканчивается. В любом случае цель знает, что вы копаетесь в её разуме, и, если вы не переключились на мысли другого существа, она может действием в свой ход совершить проверку Интеллекта против вашей проверки Интеллекта; если она побеждает, заклинание заканчивается.' },
        { title: 'Допрос', text: 'Вопросы, заданные цели вслух, сами направляют ход её мыслей, поэтому заклинание особенно полезно на допросе.' },
        { title: 'Поиск разумов', text: 'Заклинанием можно также обнаружить мыслящих существ, которых вы не видите. При сотворении или действием, пока заклинание действует, вы можете искать мысли в пределах 30 футов от себя. Заклинание проникает сквозь преграды, но его останавливают 2 фута камня, 2 дюйма любого металла, кроме свинца, или тонкий лист свинца. Нельзя обнаружить существо с Интеллектом 3 или ниже или не говорящее ни на одном языке. Обнаружив так существо, вы до конца действия заклинания можете читать его мысли, как описано выше, даже не видя его, но оно должно оставаться в пределах дистанции.' }
      ]
    }
  ),
  spell(
    'knock', 'Открывание', 2, 'transmutation',
    '1 действие', '60 фт.', 'В', 'Мгновенная',
    ['utility'],
    'Выберите предмет, который видите в пределах дистанции: дверь, ящик, сундук, кандалы, навесной замок или другой предмет, доступ к которому преграждает обычное или магическое средство. Цель, запертая обычным замком, заклинившая или заложенная засовом, отпирается, высвобождается или освобождается от засова. Если на предмете несколько замков, отпирается только один из них.',
    {
      source: 'PHB',
      classes: ['Бард', 'Волшебник', 'Чародей'],
      sections: [
        { title: 'Волшебный замок', text: 'Если цель заперта заклинанием «Волшебный замок», оно подавляется на 10 минут, и в это время цель можно открывать и закрывать как обычно.' },
        { title: 'Стук', text: 'При сотворении от предмета раздаётся громкий стук, слышный на расстоянии до 300 футов.' }
      ]
    }
  ),
  spell(
    'mirror-image', 'Отражения', 2, 'illusion',
    '1 действие', 'На себя', 'В, С', '1 минута',
    ['support'],
    'В вашем пространстве появляются три ваших иллюзорных двойника. Пока действует заклинание, они двигаются вместе с вами и повторяют ваши действия, меняясь местами так, что не уследить, какое изображение настоящее. Действием вы можете отпустить двойников.',
    {
      source: 'PHB',
      classes: ['Бард', 'Волшебник', 'Колдун', 'Чародей'],
      sections: [
        { title: 'Отвод атаки', text: 'Каждый раз, когда существо выбирает вас целью атаки, пока действует заклинание, бросьте к20, чтобы узнать, не попадёт ли атака вместо вас в двойника. При трёх двойниках атака переходит на двойника при 6 или больше, при двух — при 8 или больше, при одном — при 11 или больше.' },
        { title: 'Двойники', text: 'КД двойника равен 10 + ваш модификатор Ловкости. Если атака попадает по двойнику, он уничтожается. Уничтожить двойника можно только попавшей по нему атакой; любой другой урон и эффекты он игнорирует. Заклинание заканчивается, когда уничтожены все три двойника.' },
        { title: 'Невосприимчивые', text: 'Заклинание не действует на существо, которое не может видеть, полагается на другие чувства, кроме зрения (например, на слепое зрение), или распознаёт иллюзии, как с истинным зрением.' }
      ]
    }
  ),
  spell(
    'warding-bond', 'Охраняющая связь', 2, 'abjuration',
    '1 действие', 'Касание', 'В, С, М (пара платиновых колец стоимостью не менее 50 с.м. каждое; вы и цель должны носить их всё время действия заклинания)', '1 час',
    ['support'],
    'Заклинание защищает согласное существо, которого вы касаетесь, и до конца своего действия создаёт мистическую связь между вами и целью. Пока цель находится в пределах 60 футов от вас, она получает бонус +1 к КД и спасброскам и сопротивление всему урону. Кроме того, каждый раз, когда она получает урон, вы получаете столько же урона.',
    {
      source: 'PHB',
      classes: ['Жрец', 'Паладин'],
      sections: [
        { title: 'Конец', text: 'Заклинание заканчивается, если ваши хиты опускаются до 0 или если вы и цель оказываетесь дальше 60 футов друг от друга. Оно также заканчивается, если его снова сотворить на любое из связанных существ. Кроме того, вы можете отпустить заклинание действием.' }
      ]
    }
  ),
  spell(
    'scorching-ray', 'Палящий луч', 2, 'evocation',
    '1 действие', '120 фт.', 'В, С', 'Мгновенная',
    ['damage'],
    'Вы создаёте три огненных луча и бросаете их в цели в пределах дистанции — в одну цель или в несколько. Совершите дальнобойную атаку заклинанием для каждого луча. При попадании цель получает 2к6 урона огнём.',
    {
      source: 'PHB',
      classes: ['Волшебник', 'Чародей'],
      sections: [
        { title: 'На более высоких уровнях', text: 'Заклинание создаёт ещё один луч за каждый уровень ячейки выше 2-го.' }
      ]
    }
  ),
  spell(
    'spider-climb', 'Паук', 2, 'transmutation',
    '1 действие', 'Касание', 'В, С, М (капля битума и паук)', 'Концентрация, до 1 часа',
    ['concentration', 'utility'],
    'Пока действует заклинание, одно согласное существо, которого вы касаетесь, может передвигаться вверх, вниз и поперёк по вертикальным поверхностям, а также вниз головой по потолку, оставляя руки свободными. Цель также получает скорость лазания, равную своей скорости ходьбы.',
    {
      source: 'PHB',
      classes: ['Волшебник', 'Чародей', 'Колдун', 'Изобретатель']
    }
  ),
  spell(
    'web', 'Паутина', 2, 'conjuration',
    '1 действие', '60 фт.', 'В, С, М (кусочек паутины)', 'Концентрация, до 1 часа',
    ['concentration', 'control'],
    'Вы создаёте в выбранной вами точке в пределах дистанции массу толстой липкой паутины. Пока действует заклинание, паутина заполняет куб со стороной 20 футов от этой точки. Паутина — труднопроходимая местность, и её область слабо заслонена.',
    {
      source: 'PHB',
      classes: ['Волшебник', 'Чародей', 'Изобретатель'],
      sections: [
        { title: 'Опора', text: 'Если паутина не натянута между двумя твёрдыми опорами (например, стенами или деревьями) и не лежит слоем на полу, стене или потолке, она слипается в ком, и заклинание заканчивается в начале вашего следующего хода. Слой паутины на ровной поверхности — глубиной 5 футов.' },
        { title: 'Липкость', text: 'Каждое существо, которое начинает ход в паутине или входит в неё в свой ход, совершает спасбросок Ловкости. При провале оно опутано, пока остаётся в паутине или пока не вырвется. Опутанное паутиной существо может действием совершить проверку Силы против СЛ спасброска ваших заклинаний; при успехе оно больше не опутано.' },
        { title: 'Огонь', text: 'Паутина горюча. Любой участок паутины размером с куб со стороной 5 футов, до которого дошёл огонь, сгорает за 1 раунд, и каждое существо, начинающее ход в этом огне, получает 2к4 урона огнём.' }
      ]
    }
  ),
  spell(
    'aganazzars-scorcher', 'Пекло Аганаззара', 2, 'evocation',
    '1 действие', '30 фт.', 'В, С, М (чешуя красного дракона)', 'Мгновенная',
    ['damage'],
    'От вас в выбранном направлении вырывается ревущее пламя — линия длиной 30 футов и шириной 5 футов. Каждое существо в линии совершает спасбросок Ловкости и получает 3к8 урона огнём при провале или половину этого урона при успехе.',
    {
      source: 'XGE',
      classes: ['Волшебник', 'Чародей'],
      sections: [
        { title: 'На более высоких уровнях', text: 'Урон увеличивается на 1к8 за каждый уровень ячейки выше 2-го.' }
      ]
    }
  ),
  spell(
    'pyrotechnics', 'Пиротехника', 2, 'transmutation',
    '1 действие', '60 фт.', 'В, С', 'Мгновенная',
    ['control', 'utility'],
    'Выберите немагическое пламя, которое вы видите в пределах дистанции и которое умещается в куб со стороной 5 футов. Вы гасите огонь в этой области и при этом создаёте фейерверк или дым.',
    {
      source: 'XGE',
      classes: ['Бард', 'Волшебник', 'Чародей', 'Изобретатель'],
      sections: [
        { title: 'Фейерверк', text: 'Пламя взрывается ослепительной россыпью цветов. Каждое существо в пределах 10 футов от него должно преуспеть в спасброске Телосложения, иначе ослеплено до конца вашего следующего хода.' },
        { title: 'Дым', text: 'От места пламени на 20 футов во все стороны расползается густой чёрный дым, огибая углы. Область дыма сильно заслонена. Дым держится 1 минуту или пока его не разгонит сильный ветер.' }
      ]
    }
  ),
  spell(
    'aid', 'Подмога', 2, 'abjuration',
    '1 действие', '30 фт.', 'В, С, М (крошечная полоска белой ткани)', '8 часов',
    ['healing', 'support'],
    'Заклинание придаёт вашим союзникам стойкость и решимость. Выберите до трёх существ в пределах дистанции. Пока действует заклинание, максимум хитов и текущие хиты каждой цели увеличиваются на 5.',
    {
      source: 'PHB',
      classes: ['Бард', 'Жрец', 'Паладин', 'Следопыт', 'Изобретатель'],
      sections: [
        { title: 'На более высоких уровнях', text: 'Хиты цели увеличиваются ещё на 5 за каждый уровень ячейки выше 2-го.' }
      ]
    }
  ),
  spell(
    'locate-animals-or-plants', 'Поиск животных или растений', 2, 'divination',
    '1 действие', 'На себя', 'В, С, М (кусочек меха ищейки)', 'Мгновенная',
    ['ritual', 'utility'],
    'Опишите или назовите определённый вид зверей или растений. Сосредоточившись на голосе природы вокруг, вы узнаёте направление и расстояние до ближайшего существа или растения этого вида в пределах 5 миль, если такие есть.',
    {
      source: 'PHB',
      classes: ['Бард', 'Друид', 'Следопыт']
    }
  ),
  spell(
    'find-traps', 'Поиск ловушек', 2, 'divination',
    '1 действие', '120 фт.', 'В, С', 'Мгновенная',
    ['utility'],
    'Вы чувствуете присутствие любой ловушки в пределах дистанции, которая находится в пределах прямой видимости. Ловушкой для этого заклинания считается всё, что должно причинить внезапный или неожиданный эффект, который вы сочтёте вредным или нежелательным, и что создатель задумал именно таким. Так, заклинание почует область под действием заклинаний «Сигнал тревоги», «Охранные руны» или механическую ловушку-яму, но не обнаружит естественную слабину в полу, непрочный потолок или скрытую карстовую воронку.',
    {
      source: 'PHB',
      classes: ['Друид', 'Жрец', 'Следопыт'],
      sections: [
        { title: 'Что вы узнаёте', text: 'Заклинание лишь показывает, что ловушка есть. Где находится каждая ловушка, вы не узнаёте, но узнаёте общий характер опасности от почуянной ловушки.' }
      ]
    }
  ),
  spell(
    'locate-object', 'Поиск предмета', 2, 'divination',
    '1 действие', 'На себя', 'В, С, М (раздвоенная веточка)', 'Концентрация, до 10 минут',
    ['concentration', 'utility'],
    'Опишите или назовите знакомый вам предмет. Вы чувствуете направление на него, если он находится в пределах 1000 футов от вас. Если предмет движется, вы знаете направление его движения.',
    {
      source: 'PHB',
      classes: ['Бард', 'Жрец', 'Друид', 'Паладин', 'Следопыт', 'Волшебник'],
      sections: [
        { title: 'Какой предмет', text: 'Заклинание может найти конкретный известный вам предмет, если вы хотя бы раз видели его вблизи — в пределах 30 футов. Вместо этого заклинание может найти ближайший предмет определённого рода — например, определённый вид одежды, украшения, мебели, инструмента или оружия.' },
        { title: 'Свинец', text: 'Заклинание не находит предмет, если прямой путь между вами и предметом преграждает свинец любой толщины, даже тонкий лист.' }
      ]
    }
  ),
  spell(
    'find-steed', 'Поиск скакуна', 2, 'conjuration',
    '10 минут', '30 фт.', 'В, С', 'Мгновенная',
    ['support', 'utility'],
    'Вы призываете духа, который принимает облик необычайно умного, сильного и верного скакуна, и создаёте с ним долгую связь. Скакун появляется в свободном пространстве в пределах дистанции в выбранном вами облике: боевого коня, пони, верблюда, лося или мастифа (Мастер может разрешить призвать скакуном и других животных). У скакуна характеристики выбранного облика, но вместо своего обычного вида он небожитель, фея или исчадие (на ваш выбор). Кроме того, если Интеллект скакуна 5 или ниже, он становится 6, и скакун начинает понимать один выбранный вами язык, на котором вы говорите.',
    {
      source: 'PHB',
      classes: ['Паладин'],
      sections: [
        { title: 'Верховой зверь', text: 'Скакун служит вам ездовым животным в бою и вне боя, а инстинктивная связь позволяет вам сражаться вместе как одно целое. Сидя верхом на скакуне, вы можете сделать так, чтобы любое ваше заклинание, нацеленное только на вас, нацеливалось и на скакуна.' },
        { title: 'Гибель и возвращение', text: 'Когда хиты скакуна опускаются до 0, он исчезает, не оставляя тела. Вы также можете в любой момент действием отпустить скакуна, и он исчезнет. В обоих случаях повторное сотворение заклинания призывает того же скакуна с полным максимумом хитов.' },
        { title: 'Связь', text: 'Пока скакун находится в пределах 1 мили от вас, вы можете общаться с ним телепатически.' },
        { title: 'Один скакун', text: 'Одновременно связанным этим заклинанием может быть только один скакун. Действием вы можете в любой момент освободить скакуна от связи, и он исчезнет.' }
      ]
    }
  ),
  spell(
    'gust-of-wind', 'Порыв ветра', 2, 'evocation',
    '1 действие', 'На себя (линия 60 фт.)', 'В, С, М (бобовое семя)', 'Концентрация, до 1 минуты',
    ['concentration', 'control'],
    'Пока действует заклинание, от вас в выбранном направлении бьёт линия сильного ветра длиной 60 футов и шириной 10 футов. Каждое существо, начинающее ход в этой линии, должно преуспеть в спасброске Силы, иначе его отбрасывает на 15 футов от вас вдоль линии. Любое существо в линии, приближаясь к вам, тратит 2 фута перемещения на каждый фут.',
    {
      source: 'PHB',
      classes: ['Друид', 'Волшебник', 'Чародей', 'Изобретатель'],
      sections: [
        { title: 'Пламя и газы', text: 'Порыв рассеивает газ и пар и гасит свечи, факелы и подобный незащищённый огонь в области. Защищённое пламя, например в фонарях, бешено пляшет и гаснет с вероятностью 50 процентов.' },
        { title: 'Поворот', text: 'Бонусным действием в каждый свой ход, пока действует заклинание, вы можете изменить направление, в котором бьёт линия ветра.' }
      ]
    }
  ),
  spell(
    'animal-messenger', 'Почтовое животное', 2, 'enchantment',
    '1 действие', '30 фт.', 'В, С, М (кусочек пищи)', '24 часа',
    ['ritual', 'utility'],
    'С помощью этого заклинания вы отправляете послание через животное. Выберите Крошечного зверя, которого видите в пределах дистанции, — например, белку, сойку или летучую мышь. Назовите место, где вы бывали, и получателя по общему описанию — например, «мужчина или женщина в форме городской стражи» или «рыжий дварф в остроконечной шапке». Затем произнесите послание до 25 слов.',
    {
      source: 'PHB',
      classes: ['Бард', 'Друид', 'Следопыт'],
      sections: [
        { title: 'Путь', text: 'Пока действует заклинание, зверь движется к указанному месту, проходя около 50 миль за 24 часа, если летает, или 25 миль, если нет. Добравшись, вестник передаёт послание описанному вами существу, воспроизводя ваш голос. Вестник говорит только с существом, подходящим под описание.' },
        { title: 'Неудача', text: 'Если вестник не добрался до цели до конца заклинания, послание теряется, а зверь возвращается туда, где вы сотворили заклинание.' },
        { title: 'На более высоких уровнях', text: 'Длительность заклинания увеличивается на 48 часов за каждый уровень ячейки выше 2-го.' }
      ]
    }
  ),
  spell(
    'summon-beast', 'Призыв духа зверя', 2, 'conjuration',
    '1 действие', '90 фт.', 'В, С, М (перо, клочок шерсти и рыбий хвост внутри позолоченного жёлудя стоимостью не менее 200 с.м.)', 'Концентрация, до 1 часа',
    ['concentration', 'support'],
    'Вы призываете звериного духа. Он принимает телесный облик в свободном пространстве, которое вы видите в пределах дистанции, и использует блок статистики «Звериный дух». При сотворении выберите среду: воздух, суша или вода. Существо похоже на выбранное вами животное этой среды, и от выбора зависят некоторые черты в его блоке статистики. Существо исчезает, когда его хиты опускаются до 0 или когда заклинание заканчивается.',
    {
      source: 'TCE',
      classes: ['Друид', 'Следопыт'],
      sections: [
        { title: 'В бою', text: 'Существо — союзник вам и вашим спутникам. В бою оно действует на вашей инициативе, но свой ход совершает сразу после вашего. Оно подчиняется вашим устным командам (вам это действия не стоит). Если вы ничего не приказываете, оно совершает действие Уклонение и перемещается, чтобы избегать опасности.' },
        { title: 'На более высоких уровнях', text: 'Уровень заклинания в блоке статистики считается равным уровню использованной ячейки.' }
      ]
    }
  ),
  spell(
    'mind-spike', 'Пронзание разума', 2, 'divination',
    '1 действие', '60 фт.', 'С', 'Концентрация, до 1 часа',
    ['concentration', 'damage'],
    'Вы проникаете в разум существа, которое видите в пределах дистанции. Цель совершает спасбросок Мудрости и получает 3к8 урона психической энергией при провале или половину этого урона при успехе.',
    {
      source: 'XGE',
      classes: ['Волшебник', 'Чародей', 'Колдун', 'Жрец'],
      sections: [
        { title: 'След', text: 'Если цель провалила спасбросок, то до конца заклинания вы всегда знаете, где она, — но только пока вы оба на одном плане бытия. Пока вы это знаете, цель не может от вас спрятаться, а невидимость не даёт ей против вас никаких преимуществ.' },
        { title: 'На более высоких уровнях', text: 'Урон увеличивается на 1к8 за каждый уровень ячейки выше 2-го.' }
      ]
    }
  ),
  spell(
    'tashas-mind-whip', 'Психическая плеть Таши', 2, 'enchantment',
    '1 действие', '90 фт.', 'В', '1 раунд',
    ['damage', 'control'],
    'Вы хлещете психической силой существо, которое видите в пределах дистанции. Цель совершает спасбросок Интеллекта. При провале она получает 3к6 урона психической энергией и до конца своего следующего хода не может совершать реакции. Кроме того, в свой следующий ход она должна выбрать что-то одно: перемещение, действие или бонусное действие. При успехе цель получает половину урона и никаких других последствий.',
    {
      source: 'TCE',
      classes: ['Волшебник', 'Чародей'],
      sections: [
        { title: 'На более высоких уровнях', text: 'Ячейкой 3-го уровня и выше заклинание затрагивает ещё одно существо за каждый уровень ячейки выше 2-го. Все цели должны быть не дальше 30 футов друг от друга.' }
      ]
    }
  ),
  spell(
    'flaming-sphere', 'Пылающий шар', 2, 'conjuration',
    '1 действие', '60 фт.', 'В, С, М (кусочек сала, щепотка серы и немного железного порошка)', 'Концентрация, до 1 минуты',
    ['concentration', 'damage'],
    'В выбранном вами свободном пространстве в пределах дистанции появляется огненная сфера диаметром 5 футов и держится, пока действует заклинание. Каждое существо, заканчивающее ход в пределах 5 футов от сферы, совершает спасбросок Ловкости и получает 2к6 урона огнём при провале или половину этого урона при успехе.',
    {
      source: 'PHB',
      classes: ['Друид', 'Волшебник', 'Чародей', 'Изобретатель'],
      sections: [
        { title: 'Перемещение', text: 'Бонусным действием вы можете переместить сферу на расстояние до 30 футов. Если вы направите сферу в существо, оно совершает спасбросок против урона сферы, а сфера в этот ход больше не движется. Перемещая сферу, вы можете провести её над преградами высотой до 5 футов и перебросить через ямы шириной до 10 футов.' },
        { title: 'Огонь и свет', text: 'Сфера поджигает горючие предметы, которые никто не носит и не держит, и испускает яркий свет в радиусе 20 футов и тусклый свет ещё на 20 футов.' },
        { title: 'На более высоких уровнях', text: 'Урон увеличивается на 1к6 за каждый уровень ячейки выше 2-го.' }
      ]
    }
  ),
  spell(
    'dust-devil', 'Пылевой вихрь', 2, 'conjuration',
    '1 действие', '60 фт.', 'В, С, М (щепотка пыли)', 'Концентрация, до 1 минуты',
    ['concentration', 'damage', 'control'],
    'Выберите свободный куб воздуха со стороной 5 футов, который видите в пределах дистанции. В нём появляется стихийная сила, похожая на пыльный вихрь, и держится, пока действует заклинание. Каждое существо, заканчивающее ход в пределах 5 футов от вихря, совершает спасбросок Силы. При провале оно получает 1к8 дробящего урона и отлетает на 10 футов. При успехе оно получает половину урона и не отлетает.',
    {
      source: 'XGE',
      classes: ['Друид', 'Чародей', 'Изобретатель'],
      sections: [
        { title: 'Перемещение', text: 'Бонусным действием вы можете переместить вихрь на расстояние до 30 футов в любом направлении. Если вихрь проходит над песком, пылью, рыхлой землёй или мелким гравием, он втягивает их и окружает себя облаком обломков радиусом 10 футов до начала вашего следующего хода. Область облака сильно заслонена.' },
        { title: 'На более высоких уровнях', text: 'Урон увеличивается на 1к8 за каждый уровень ячейки выше 2-го.' }
      ]
    }
  ),
  spell(
    'blur', 'Размытый образ', 2, 'illusion',
    '1 действие', 'На себя', 'В', 'Концентрация, до 1 минуты',
    ['concentration', 'support'],
    'Ваше тело становится размытым, дрожит и колеблется в глазах всех, кто вас видит. Пока действует заклинание, все существа совершают броски атаки по вам с помехой. Атакующий невосприимчив к этому эффекту, если не полагается на зрение (как при слепом зрении) или видит сквозь иллюзии (как при истинном зрении).',
    {
      source: 'PHB',
      classes: ['Волшебник', 'Чародей', 'Изобретатель']
    }
  ),
  spell(
    'heat-metal', 'Раскалённый металл', 2, 'transmutation',
    '1 действие', '60 фт.', 'В, С, М (кусок железа и язычок пламени)', 'Концентрация, до 1 минуты',
    ['concentration', 'damage', 'control'],
    'Выберите металлический предмет, сделанный руками, — например, металлическое оружие или тяжёлый либо средний металлический доспех, — который видите в пределах дистанции. Предмет раскаляется докрасна. Любое существо, физически соприкасающееся с предметом, получает 2к8 урона огнём, когда вы творите заклинание. Пока заклинание действует, в каждый свой следующий ход вы можете бонусным действием снова причинить этот урон.',
    {
      source: 'PHB',
      classes: ['Бард', 'Друид', 'Изобретатель'],
      sections: [
        { title: 'Ожог', text: 'Если существо держит или носит предмет и получает от него урон, оно должно преуспеть в спасброске Телосложения, иначе роняет предмет, если может. Если оно не уронило предмет, то до начала вашего следующего хода совершает броски атаки и проверки характеристик с помехой.' },
        { title: 'На более высоких уровнях', text: 'Урон увеличивается на 1к8 за каждый уровень ячейки выше 2-го.' }
      ]
    }
  ),
  spell(
    'enthrall', 'Речь златоуста', 2, 'enchantment',
    '1 действие', '60 фт.', 'В, С', '1 минута',
    ['control'],
    'Вы сплетаете отвлекающую речь, и выбранные вами существа, которых вы видите в пределах дистанции и которые вас слышат, совершают спасбросок Мудрости. Существо, которое нельзя очаровать, автоматически преуспевает в спасброске, а если вы или ваши спутники сражаетесь с существом, оно совершает спасбросок с преимуществом. При провале цель совершает с помехой проверки Мудрости (Внимательность), чтобы заметить любое существо, кроме вас, пока не закончится заклинание или пока цель вас не перестанет слышать. Заклинание заканчивается, если вы недееспособны или больше не можете говорить.',
    {
      source: 'PHB',
      classes: ['Бард', 'Колдун']
    }
  ),
  spell(
    'alter-self', 'Смена обличья', 2, 'transmutation',
    '1 действие', 'На себя', 'В, С', 'Концентрация, до 1 часа',
    ['concentration', 'utility'],
    'Вы принимаете иной облик. При сотворении выберите один из вариантов ниже; его эффект держится, пока действует заклинание. Пока заклинание действует, вы можете действием окончить один вариант, чтобы получить другой.',
    {
      source: 'PHB',
      classes: ['Волшебник', 'Чародей', 'Изобретатель'],
      sections: [
        { title: 'Водное приспособление', text: 'Ваше тело приспосабливается к воде: появляются жабры, между пальцами вырастают перепонки. Вы можете дышать под водой и получаете скорость плавания, равную скорости ходьбы.' },
        { title: 'Изменение внешности', text: 'Вы меняете свою внешность: сами решаете, как выглядите, включая рост, вес, черты лица, звук голоса, длину волос, цвет и особые приметы, если они есть. Вы можете выглядеть как представитель другого народа, но ваши характеристики не меняются. Нельзя принять облик существа другого размера, а основное строение тела остаётся прежним: например, двуногий не может стать четвероногим. В любой момент, пока действует заклинание, вы можете действием снова так изменить внешность.' },
        { title: 'Природное оружие', text: 'У вас вырастают когти, клыки, шипы, рога или другое природное оружие на ваш выбор. Ваши безоружные удары наносят 1к6 дробящего, колющего или рубящего урона — смотря по выбранному оружию, — и вы владеете безоружными ударами. Кроме того, природное оружие магическое, и вы получаете бонус +1 к броскам атаки и урона, которые совершаете им.' }
      ]
    }
  ),
  spell(
    'snillocs-snowball-swarm', 'Снежный шквал Сниллока', 2, 'evocation',
    '1 действие', '90 фт.', 'В, С, М (кусочек льда или белого камня)', 'Мгновенная',
    ['damage'],
    'Из выбранной вами точки в пределах дистанции разлетается град волшебных снежков. Каждое существо в сфере радиусом 5 футов с центром в этой точке совершает спасбросок Ловкости и получает 3к6 урона холодом при провале или половину этого урона при успехе.',
    {
      source: 'XGE',
      classes: ['Волшебник', 'Чародей'],
      sections: [
        { title: 'На более высоких уровнях', text: 'Урон увеличивается на 1к6 за каждый уровень ячейки выше 2-го.' }
      ]
    }
  ),
  spell(
    'darkvision', 'Тёмное зрение', 2, 'transmutation',
    '1 действие', 'Касание', 'В, С, М (щепотка сушёной моркови или агат)', '8 часов',
    ['support', 'utility'],
    'Вы касаетесь согласного существа и даёте ему способность видеть в темноте. Пока действует заклинание, у этого существа есть тёмное зрение на 60 футов.',
    {
      source: 'PHB',
      classes: ['Волшебник', 'Друид', 'Следопыт', 'Чародей', 'Изобретатель']
    }
  ),
  spell(
    'shadow-blade', 'Теневой клинок', 2, 'illusion',
    '1 бонусное действие', 'На себя', 'В, С', 'Концентрация, до 1 минуты',
    ['concentration', 'damage'],
    'Вы сплетаете нити тени в меч из сгустившегося мрака в своей руке. Меч держится, пока действует заклинание. Это простое рукопашное оружие, которым вы владеете; при попадании оно наносит 2к8 урона психической энергией и имеет свойства «фехтовальное», «лёгкое» и «метательное» (дистанция 20/60). Атаки мечом по цели, находящейся в тусклом свете или темноте, вы совершаете с преимуществом.',
    {
      source: 'XGE',
      classes: ['Волшебник', 'Чародей', 'Колдун'],
      sections: [
        { title: 'Вернуть меч', text: 'Если вы выпустите или метнёте меч, он рассеивается в конце хода. После этого, пока заклинание действует, вы можете бонусным действием вернуть меч в руку.' },
        { title: 'На более высоких уровнях', text: 'Ячейкой 3-го или 4-го уровня урон становится 3к8, ячейкой 5-го или 6-го уровня — 4к8, ячейкой 7-го уровня и выше — 5к8.' }
      ]
    }
  ),
  spell(
    'silence', 'Тишина', 2, 'illusion',
    '1 действие', '120 фт.', 'В, С', 'Концентрация, до 10 минут',
    ['concentration', 'ritual', 'control'],
    'Пока действует заклинание, в сфере радиусом 20 футов с центром в выбранной вами точке в пределах дистанции не может возникнуть никакой звук, и никакой звук не может через неё пройти. Любое существо или предмет, целиком находящиеся внутри сферы, невосприимчивы к урону звуком, а существа, целиком находящиеся внутри неё, оглохли. Сотворить там заклинание с вербальным компонентом невозможно.',
    {
      source: 'PHB',
      classes: ['Бард', 'Жрец', 'Следопыт']
    }
  ),
  spell(
    'rope-trick', 'Трюк с верёвкой', 2, 'transmutation',
    '1 действие', 'Касание', 'В, С, М (порошок из кукурузного экстракта и скрученная петля из пергамента)', '1 час',
    ['utility'],
    'Вы касаетесь верёвки длиной до 60 футов. Один её конец поднимается в воздух, пока вся верёвка не повиснет перпендикулярно земле. На верхнем конце верёвки открывается невидимый вход во внепространственное убежище, которое держится, пока действует заклинание.',
    {
      source: 'PHB',
      classes: ['Волшебник', 'Изобретатель'],
      sections: [
        { title: 'Убежище', text: 'Попасть в убежище можно, взобравшись на верх верёвки. Оно вмещает до восьми существ размера Средний или меньше. Верёвку можно втянуть внутрь, и тогда снаружи её не видно.' },
        { title: 'Вход', text: 'Атаки и заклинания не могут пройти через вход ни внутрь, ни наружу, но те, кто внутри, видят наружу, как через окно размером 3 на 5 футов с центром на верёвке.' },
        { title: 'Конец', text: 'Когда заклинание заканчивается, всё, что было в убежище, выпадает наружу.' }
      ]
    }
  ),
  spell(
    'misty-step', 'Туманный шаг', 2, 'conjuration',
    '1 бонусное действие', 'На себя', 'В', 'Мгновенная',
    ['utility'],
    'На миг окутавшись серебристым туманом, вы телепортируетесь на расстояние до 30 футов в свободное пространство, которое видите.',
    {
      source: 'PHB',
      classes: ['Волшебник', 'Колдун', 'Чародей']
    }
  ),
  spell(
    'darkness', 'Тьма', 2, 'evocation',
    '1 действие', '60 фт.', 'В, М (мех летучей мыши и капля смолы или кусочек угля)', 'Концентрация, до 10 минут',
    ['concentration', 'control'],
    'Из выбранной вами точки в пределах дистанции расползается магическая тьма и на время действия заклинания заполняет сферу радиусом 15 футов. Тьма огибает углы. Существо с тёмным зрением не видит сквозь эту тьму, а немагический свет не может её осветить.',
    {
      source: 'PHB',
      classes: ['Волшебник', 'Чародей', 'Колдун'],
      sections: [
        { title: 'Источник', text: 'Если выбранная точка находится на предмете, который вы держите или который никто не носит и не держит, тьма исходит от предмета и движется вместе с ним. Если полностью накрыть источник тьмы непрозрачным предметом, например миской или шлемом, тьма перекрывается.' },
        { title: 'Свет', text: 'Если часть области заклинания пересекается с областью света, созданного заклинанием 2-го уровня или ниже, заклинание, создавшее свет, рассеивается.' }
      ]
    }
  ),
  spell(
    'enlarge-or-reduce', 'Увеличение/уменьшение', 2, 'transmutation',
    '1 действие', '30 фт.', 'В, С, М (щепотка железного порошка)', 'Концентрация, до 1 минуты',
    ['concentration', 'support', 'control'],
    'Пока действует заклинание, существо или предмет, которые вы видите в пределах дистанции, становятся больше или меньше. Выберите существо или предмет, который никто не носит и не держит. Несогласная цель может совершить спасбросок Телосложения; при успехе заклинание на неё не действует. Если цель — существо, всё, что она носит и держит, меняет размер вместе с ней. Любой предмет, который она выпустит, сразу возвращается к обычному размеру.',
    {
      source: 'PHB',
      classes: ['Волшебник', 'Чародей', 'Изобретатель'],
      sections: [
        { title: 'Увеличение', text: 'Размеры цели удваиваются во всех измерениях, а вес увеличивается в восемь раз. Её категория размера становится на одну больше — например, со Среднего на Большой. Если места для удвоения не хватает, существо или предмет достигает наибольшего возможного в этом пространстве размера. Пока действует заклинание, цель совершает с преимуществом проверки и спасброски Силы. Оружие цели тоже увеличивается под её новый размер, и пока оно увеличено, её атаки им наносят 1к4 дополнительного урона.' },
        { title: 'Уменьшение', text: 'Размеры цели уменьшаются вдвое во всех измерениях, а вес — до одной восьмой. Её категория размера становится на одну меньше — например, со Среднего на Маленький. Пока действует заклинание, цель совершает с помехой проверки и спасброски Силы. Оружие цели тоже уменьшается под её новый размер, и пока оно уменьшено, её атаки им наносят на 1к4 меньше урона (но не меньше 1).' }
      ]
    }
  ),
  spell(
    'hold-person', 'Удержание личности', 2, 'enchantment',
    '1 действие', '60 фт.', 'В, С, М (прямой кусочек железа)', 'Концентрация, до 1 минуты',
    ['concentration', 'control'],
    'Выберите гуманоида, которого видите в пределах дистанции. Цель должна преуспеть в спасброске Мудрости, иначе она парализована на время действия заклинания. В конце каждого своего хода цель может совершить ещё один спасбросок Мудрости; при успехе заклинание на ней заканчивается.',
    {
      source: 'PHB',
      classes: ['Бард', 'Жрец', 'Друид', 'Чародей', 'Колдун', 'Волшебник'],
      sections: [
        { title: 'На более высоких уровнях', text: 'Ячейкой 3-го уровня и выше заклинание затрагивает ещё одного гуманоида за каждый уровень ячейки выше 2-го. Все гуманоиды должны находиться не дальше 30 футов друг от друга.' }
      ]
    }
  ),
  spell(
    'earthbind', 'Узы земли', 2, 'transmutation',
    '1 действие', '300 фт.', 'В', 'Концентрация, до 1 минуты',
    ['concentration', 'control'],
    'Выберите существо, которое видите в пределах дистанции. Его обвивают жёлтые ленты магической энергии. Цель должна преуспеть в спасброске Силы, иначе её скорость полёта (если есть) становится 0 футов, пока действует заклинание. Существо в воздухе под действием заклинания опускается со скоростью 60 футов за раунд, пока не достигнет земли или пока заклинание не закончится.',
    {
      source: 'XGE',
      classes: ['Друид', 'Волшебник', 'Чародей', 'Колдун']
    }
  ),
  spell(
    'enhance-ability', 'Улучшение характеристики', 2, 'transmutation',
    '1 действие', 'Касание', 'В, С, М (мех или перо животного)', 'Концентрация, до 1 часа',
    ['concentration', 'support'],
    'Вы касаетесь существа и даёте ему магическое усиление. Выберите один из эффектов ниже; цель получает его до конца действия заклинания.',
    {
      source: 'PHB',
      classes: ['Бард', 'Жрец', 'Друид', 'Чародей', 'Изобретатель'],
      sections: [
        { title: 'Выносливость медведя', text: 'Цель совершает с преимуществом проверки Телосложения. Кроме того, она получает 2к6 временных хитов, которые пропадают, когда заклинание заканчивается.' },
        { title: 'Сила быка', text: 'Цель совершает с преимуществом проверки Силы, а её грузоподъёмность удваивается.' },
        { title: 'Грация кошки', text: 'Цель совершает с преимуществом проверки Ловкости. Кроме того, если она не недееспособна, она не получает урона от падения с высоты 20 футов и меньше.' },
        { title: 'Великолепие орла', text: 'Цель совершает с преимуществом проверки Харизмы.' },
        { title: 'Хитрость лисы', text: 'Цель совершает с преимуществом проверки Интеллекта.' },
        { title: 'Мудрость совы', text: 'Цель совершает с преимуществом проверки Мудрости.' },
        { title: 'На более высоких уровнях', text: 'Ячейкой 3-го уровня и выше заклинание затрагивает ещё одно существо за каждый уровень ячейки выше 2-го.' }
      ]
    }
  ),
  spell(
    'calm-emotions', 'Умиротворение', 2, 'enchantment',
    '1 действие', '60 фт.', 'В, С', 'Концентрация, до 1 минуты',
    ['concentration', 'control'],
    'Вы пытаетесь подавить сильные чувства толпы. Каждый гуманоид в сфере радиусом 20 футов с центром в выбранной вами точке в пределах дистанции совершает спасбросок Харизмы; существо может по желанию провалить его. Для каждого существа, провалившего спасбросок, выберите один из двух эффектов ниже.',
    {
      source: 'PHB',
      classes: ['Бард', 'Жрец'],
      sections: [
        { title: 'Подавление', text: 'Вы подавляете любой эффект, из-за которого цель очарована или испугана. Когда заклинание заканчивается, подавленный эффект возобновляется, если его длительность за это время не истекла.' },
        { title: 'Безразличие', text: 'Вы делаете цель безразличной к выбранным вами существам, к которым она враждебна. Безразличие заканчивается, если цель атакуют или вредят ей заклинанием или если она видит, как вредят кому-то из её друзей. Когда заклинание заканчивается, существо снова становится враждебным, если Мастер не решит иначе.' }
      ]
    }
  ),
  spell(
    'spike-growth', 'Шипы', 2, 'transmutation',
    '1 действие', '150 фт.', 'В, С, М (семь острых колючек или семь маленьких заострённых веточек)', 'Концентрация, до 10 минут',
    ['concentration', 'damage', 'control'],
    'Земля в радиусе 20 футов с центром в точке в пределах дистанции вздыбливается и покрывается твёрдыми шипами и колючками. Пока действует заклинание, область — труднопроходимая местность. Когда существо входит в эту область или перемещается внутри неё, оно получает 2к4 колющего урона за каждые пройденные 5 футов.',
    {
      source: 'PHB',
      classes: ['Друид', 'Следопыт'],
      sections: [
        { title: 'Маскировка', text: 'Изменённая земля выглядит естественно. Существо, которое не видит область в момент сотворения, должно преуспеть в проверке Мудрости (Внимательность) против СЛ спасброска ваших заклинаний, чтобы распознать опасность прежде, чем войти туда.' }
      ]
    }
  ),
  // ── Заклинания 3 уровня (базовые, PHB / XGE / TCE) ────────────────
  spell(
    'aura-of-vitality', 'Аура живучести', 3, 'evocation',
    '1 действие', 'На себя (радиус 30 фт.)', 'В', 'Концентрация, до 1 минуты',
    ['concentration', 'healing'],
    'От вас исходит аура целительной энергии радиусом 30 футов. Пока действует заклинание, аура движется вместе с вами, оставаясь с центром на вас. Бонусным действием вы можете восстановить одному существу в ауре (в том числе себе) 2к6 хитов.',
    {
      source: 'PHB',
      classes: ['Друид', 'Паладин', 'Следопыт']
    }
  ),
  spell(
    'wall-of-water', 'Водяная стена', 3, 'evocation',
    '1 действие', '60 фт.', 'В, С, М (капля воды)', 'Концентрация, до 10 минут',
    ['concentration', 'control'],
    'В точке на земле, которую вы видите в пределах дистанции, поднимается стена воды: прямая — длиной до 30 футов, высотой до 10 футов и толщиной 1 фут, или кольцо диаметром до 20 футов, высотой до 20 футов и толщиной 1 фут. Стена держится, пока действует заклинание. Пространство стены — труднопроходимая местность.',
    {
      source: 'XGE',
      classes: ['Друид', 'Чародей', 'Волшебник', 'Изобретатель'],
      sections: [
        { title: 'Сквозь воду', text: 'Атаки дальнобойным оружием, проходящие через пространство стены, совершаются с помехой. Урон огнём от эффекта, который проходит сквозь стену к цели, уменьшается вдвое.' },
        { title: 'Холод', text: 'Заклинание, наносящее урон холодом и проходящее сквозь стену, замораживает ту её часть, через которую прошло, — не меньше участка 5 на 5 футов. У каждого замёрзшего участка размером 5 на 5 футов КД 5 и 15 хитов; если его хиты опускаются до 0, он разрушается, и вода стены на его место не возвращается.' }
      ]
    }
  ),
  spell(
    'revivify', 'Возрождение', 3, 'necromancy',
    '1 действие', 'Касание', 'В, С, М (алмазы стоимостью 300 с.м., расходуются)', 'Мгновенная',
    ['healing'],
    'Вы касаетесь существа, умершего не больше минуты назад. Оно возвращается к жизни с 1 хитом. Заклинание не может вернуть к жизни существо, умершее от старости, и не восстанавливает утраченные части тела.',
    {
      source: 'PHB',
      classes: ['Друид', 'Жрец', 'Паладин', 'Следопыт', 'Изобретатель']
    }
  ),
  spell(
    'animate-dead', 'Восставший труп', 3, 'necromancy',
    '1 минута', '10 фт.', 'В, С, М (капля крови, кусочек плоти и щепотка костной пыли)', 'Мгновенная',
    ['support'],
    'Заклинание создаёт слугу-нежить. Выберите в пределах дистанции груду костей или труп гуманоида размера Средний или Маленький. Заклинание наделяет цель мерзким подобием жизни и поднимает её нежитью: из костей — скелетом, из трупа — зомби (характеристики существа у Мастера).',
    {
      source: 'PHB',
      classes: ['Волшебник', 'Жрец'],
      sections: [
        { title: 'Команды', text: 'В каждый свой ход вы можете бонусным действием мысленно приказывать любому существу, созданному этим заклинанием, если оно в пределах 60 футов от вас (если существ несколько, можно приказать любым или всем сразу, отдав каждому одну и ту же команду). Вы решаете, какое действие существо совершит и куда переместится в свой следующий ход, или отдаёте общий приказ — например, охранять определённую комнату или коридор. Без приказов существо только защищается от враждебных существ. Получив приказ, существо выполняет его, пока не закончит.' },
        { title: 'Контроль', text: 'Существо подчиняется вам 24 часа, а затем перестаёт выполнять ваши приказы. Чтобы удержать контроль ещё на 24 часа, нужно снова сотворить это заклинание на существо до окончания текущих 24 часов. Такое сотворение возобновляет ваш контроль над четырьмя существами, поднятыми этим заклинанием, вместо того чтобы поднять новое.' },
        { title: 'На более высоких уровнях', text: 'За каждый уровень ячейки выше 3-го вы поднимаете ещё двух существ нежити или возобновляете контроль ещё над двумя. Каждое существо должно быть из отдельного трупа или груды костей.' }
      ]
    }
  ),
  spell(
    'conjure-animals', 'Вызов животных', 3, 'conjuration',
    '1 действие', '60 фт.', 'В, С', 'Концентрация, до 1 часа',
    ['concentration', 'support'],
    'Вы призываете духов фей, которые принимают облик зверей и появляются в свободных пространствах, которые вы видите в пределах дистанции. Выберите, кто появится: один зверь с показателем опасности 2 или ниже; два зверя с ПО 1 или ниже; четыре зверя с ПО 1/2 или ниже; восемь зверей с ПО 1/4 или ниже. Каждый зверь считается также феей и исчезает, когда его хиты опускаются до 0 или когда заклинание заканчивается.',
    {
      source: 'PHB',
      classes: ['Друид', 'Следопыт'],
      sections: [
        { title: 'Призванные', text: 'Призванные существа дружелюбны к вам и вашим спутникам. Бросьте инициативу за призванных существ одной группой, у которой свои ходы. Они выполняют ваши устные команды (вам это действия не стоит). Если вы не отдаёте им команд, они защищаются от враждебных существ, а больше ничего не делают. Характеристики существ у Мастера.' },
        { title: 'На более высоких уровнях', text: 'Ячейкой более высокого уровня вы выбираете один из вариантов выше, и существ появляется больше: вдвое больше ячейкой 5-го уровня, втрое — ячейкой 7-го уровня и вчетверо — ячейкой 9-го уровня.' }
      ]
    }
  ),
  spell(
    'conjure-barrage', 'Вызов заграждения', 3, 'conjuration',
    '1 действие', 'На себя (конус 60 фт.)', 'В, С, М (метательное оружие или один боеприпас)', 'Мгновенная',
    ['damage'],
    'Вы подбрасываете немагическое оружие или выпускаете немагический боеприпас, и в воздухе возникает конус таких же снарядов, которые летят вперёд и исчезают. Каждое существо в 60-футовом конусе совершает спасбросок Ловкости и получает 3к8 урона при провале или половину этого урона при успехе. Вид урона — тот же, что у оружия или боеприпаса, использованного как компонент.',
    {
      source: 'PHB',
      classes: ['Следопыт']
    }
  ),
  spell(
    'gaseous-form', 'Газообразная форма', 3, 'transmutation',
    '1 действие', 'Касание', 'В, С, М (кусочек марли и струйка дыма)', 'Концентрация, до 1 часа',
    ['concentration', 'utility'],
    'Вы превращаете согласное существо, которого касаетесь, вместе со всем, что оно носит и держит, в облачко тумана на время действия заклинания. Заклинание заканчивается, если хиты существа опускаются до 0. На бесплотных существ оно не действует.',
    {
      source: 'PHB',
      classes: ['Чародей', 'Колдун', 'Волшебник', 'Изобретатель'],
      sections: [
        { title: 'Облик тумана', text: 'В этом облике цель может передвигаться только полётом со скоростью 10 футов. Она может входить в пространство другого существа и находиться там. У цели есть сопротивление немагическому урону, и она совершает с преимуществом спасброски Силы, Ловкости и Телосложения. Цель может проходить сквозь маленькие отверстия, узкие проёмы и даже просто щели, но жидкости для неё — твёрдая поверхность. Цель не может упасть и продолжает парить в воздухе, даже если ошеломлена или иначе недееспособна.' },
        { title: 'Ограничения', text: 'В облике облачка цель не может говорить и пользоваться предметами, а всё, что она несла или держала, нельзя выронить, использовать или как-то с ним взаимодействовать. Цель не может атаковать и творить заклинания.' }
      ]
    }
  ),
  spell(
    'hypnotic-pattern', 'Гипнотический узор', 3, 'illusion',
    '1 действие', '120 фт.', 'С, М (тлеющая палочка благовоний или хрустальный флакон со светящимся веществом)', 'Концентрация, до 1 минуты',
    ['concentration', 'control'],
    'Вы создаёте извилистый узор цветов, который вьётся в воздухе внутри куба со стороной 30 футов в пределах дистанции. Узор появляется на миг и исчезает. Каждое существо в области, которое видит узор, совершает спасбросок Мудрости. При провале существо очаровано на время действия заклинания. Очарованное этим заклинанием существо недееспособно, и его скорость равна 0. Заклинание заканчивается для существа, если оно получает любой урон или если кто-то другой действием выведет его из оцепенения.',
    {
      source: 'PHB',
      classes: ['Бард', 'Волшебник', 'Чародей', 'Колдун']
    }
  ),
  spell(
    'hunger-of-hadar', 'Голод Хадара', 3, 'conjuration',
    '1 действие', '150 фт.', 'В, С, М (маринованное щупальце спрута)', 'Концентрация, до 1 минуты',
    ['concentration', 'damage', 'control'],
    'Вы открываете проход во тьму между звёздами, кишащую неведомыми ужасами. В точке в пределах дистанции на время действия заклинания возникает сфера черноты и лютого холода радиусом 20 футов. Пустота наполнена тихим шёпотом и чавканьем, которые слышно на 30 футов вокруг. Никакой свет, магический или нет, не освещает эту область, а существа, целиком находящиеся в ней, ослеплены. Пустота искажает пространство: область — труднопроходимая местность.',
    {
      source: 'PHB',
      classes: ['Колдун'],
      sections: [
        { title: 'Холод и щупальца', text: 'Существо, начинающее ход в области, получает 2к6 урона холодом. Существо, заканчивающее ход в области, должно преуспеть в спасброске Ловкости, иначе получает 2к6 урона кислотой: о него трутся молочно-белые потусторонние щупальца.' }
      ]
    }
  ),
  spell(
    'thunder-step', 'Громовой шаг', 3, 'conjuration',
    '1 действие', '90 фт.', 'В', 'Мгновенная',
    ['damage', 'utility'],
    'Вы телепортируетесь в свободное пространство, которое видите в пределах дистанции. Сразу после вашего исчезновения раздаётся громовой раскат, слышный за 300 футов: каждое существо в пределах 10 футов от места, которое вы покинули, совершает спасбросок Телосложения и получает 3к10 урона звуком при провале или половину этого урона при успехе.',
    {
      source: 'XGE',
      classes: ['Волшебник', 'Колдун', 'Чародей'],
      sections: [
        { title: 'Что взять с собой', text: 'Вы переносите предметы, если их вес не больше того, что вы можете нести. Можно перенести и одно согласное существо вашего размера или меньше вместе со снаряжением в пределах его грузоподъёмности: при сотворении оно должно быть в пределах 5 футов от вас, а в пределах 5 футов от места вашего прибытия должно быть свободное пространство для него. Иначе существо остаётся на месте.' },
        { title: 'На более высоких уровнях', text: 'Урон увеличивается на 1к10 за каждый уровень ячейки выше 3-го.' }
      ]
    }
  ),
  spell(
    'daylight', 'Дневной свет', 3, 'evocation',
    '1 действие', '60 фт.', 'В, С', '1 час',
    ['utility'],
    'Из выбранной вами точки в пределах дистанции расходится сфера света радиусом 60 футов. Внутри сферы яркий свет, и она испускает тусклый свет ещё на 60 футов.',
    {
      source: 'PHB',
      classes: ['Друид', 'Жрец', 'Паладин', 'Следопыт', 'Чародей'],
      sections: [
        { title: 'Источник', text: 'Если выбранная точка находится на предмете, который вы держите или который никто не носит и не держит, свет исходит от предмета и движется вместе с ним. Если полностью накрыть предмет непрозрачным предметом, например миской или шлемом, свет перекрывается.' },
        { title: 'Тьма', text: 'Если часть области заклинания пересекается с областью тьмы, созданной заклинанием 3-го уровня или ниже, заклинание, создавшее тьму, рассеивается.' }
      ]
    }
  ),
  spell(
    'catnap', 'Дрёма', 3, 'enchantment',
    '1 действие', '30 фт.', 'С, М (щепотка песка)', '10 минут',
    ['support'],
    'Успокаивающим жестом вы погружаете в сон до трёх выбранных вами согласных существ, которых видите в пределах дистанции: они без сознания, пока действует заклинание. Заклинание заканчивается для цели раньше, если она получает урон или если кто-то действием растолкает её или разбудит пощёчиной.',
    {
      source: 'XGE',
      classes: ['Бард', 'Волшебник', 'Чародей', 'Изобретатель'],
      sections: [
        { title: 'Отдых', text: 'Если цель проспала всё время действия заклинания, она получает преимущества короткого отдыха и не может снова попасть под действие этого заклинания, пока не закончит продолжительный отдых.' },
        { title: 'На более высоких уровнях', text: 'За каждый уровень ячейки выше 3-го заклинание затрагивает ещё одно согласное существо.' }
      ]
    }
  ),
  spell(
    'spirit-guardians', 'Духовные стражи', 3, 'conjuration',
    '1 действие', 'На себя (радиус 15 фт.)', 'В, С, М (священный символ)', 'Концентрация, до 10 минут',
    ['concentration', 'damage', 'control'],
    'Вы призываете духов, чтобы они защищали вас. Пока действует заклинание, они кружат вокруг вас на расстоянии до 15 футов. Если вы добры или нейтральны, их призрачный облик похож на ангелов или фей (на ваш выбор), если злы — на исчадий. При сотворении вы можете назвать любое число существ, которых вы видите, и заклинание не будет на них действовать.',
    {
      source: 'PHB',
      classes: ['Жрец'],
      sections: [
        { title: 'Стражи', text: 'Скорость затронутого существа в области уменьшается вдвое. Когда оно впервые за ход входит в область или начинает там ход, оно совершает спасбросок Мудрости. При провале существо получает 3к8 урона излучением (если вы добры или нейтральны) или 3к8 урона некротической энергией (если вы злы). При успехе оно получает половину урона.' },
        { title: 'На более высоких уровнях', text: 'Урон увеличивается на 1к8 за каждый уровень ячейки выше 3-го.' }
      ]
    }
  ),
  spell(
    'slow', 'Замедление', 3, 'transmutation',
    '1 действие', '120 фт.', 'В, С, М (капля патоки)', 'Концентрация, до 1 минуты',
    ['concentration', 'control'],
    'Вы искажаете время вокруг не более чем шести выбранных вами существ в кубе со стороной 40 футов в пределах дистанции. Каждая цель должна преуспеть в спасброске Мудрости, иначе заклинание действует на неё, пока не закончится.',
    {
      source: 'PHB',
      classes: ['Волшебник', 'Чародей', 'Изобретатель'],
      sections: [
        { title: 'Замедление', text: 'Скорость затронутой цели уменьшается вдвое, она получает штраф −2 к КД и спасброскам Ловкости и не может совершать реакции. В свой ход она может совершить либо действие, либо бонусное действие, но не оба. Какими бы ни были её способности и магические предметы, в свой ход она может совершить не больше одной рукопашной или дальнобойной атаки.' },
        { title: 'Заклинания', text: 'Если существо пытается сотворить заклинание со временем сотворения 1 действие, бросьте к20. При 11 или больше заклинание срабатывает только в следующий ход существа, и в этот ход существо должно потратить действие, чтобы завершить его. Если не может — заклинание пропадает.' },
        { title: 'Спасбросок', text: 'В конце каждого своего хода затронутое существо совершает ещё один спасбросок Мудрости; при успехе эффект на нём заканчивается.' }
      ]
    }
  ),
  spell(
    'protection-from-energy', 'Защита от энергии', 3, 'abjuration',
    '1 действие', 'Касание', 'В, С', 'Концентрация, до 1 часа',
    ['concentration', 'support'],
    'Пока действует заклинание, согласное существо, которого вы касаетесь, получает сопротивление одному выбранному вами виду урона: кислоте, холоду, огню, электричеству или звуку.',
    {
      source: 'PHB',
      classes: ['Жрец', 'Друид', 'Следопыт', 'Чародей', 'Волшебник', 'Изобретатель']
    }
  ),
  spell(
    'stinking-cloud', 'Зловонное облако', 3, 'conjuration',
    '1 действие', '90 фт.', 'В, С, М (тухлое яйцо или несколько листьев скунсовой капусты)', 'Концентрация, до 1 минуты',
    ['concentration', 'control'],
    'Вы создаёте сферу жёлтого тошнотворного газа радиусом 20 футов с центром в точке в пределах дистанции. Облако огибает углы, и его область сильно заслонена. Облако висит в воздухе, пока действует заклинание.',
    {
      source: 'PHB',
      classes: ['Бард', 'Волшебник', 'Чародей', 'Колдун'],
      sections: [
        { title: 'Тошнота', text: 'Каждое существо, целиком находящееся в облаке в начале своего хода, совершает спасбросок Телосложения против яда. При провале оно тратит действие в этот ход на рвоту и шатание. Существа, которым не нужно дышать или которые невосприимчивы к яду, автоматически преуспевают в этом спасброске.' },
        { title: 'Ветер', text: 'Умеренный ветер (не меньше 10 миль в час) рассеивает облако за 4 раунда. Сильный ветер (не меньше 20 миль в час) — за 1 раунд.' }
      ]
    }
  ),
  spell(
    'erupting-earth', 'Извержение земли', 3, 'transmutation',
    '1 действие', '120 фт.', 'В, С, М (кусочек обсидиана)', 'Мгновенная',
    ['damage', 'control'],
    'Выберите точку на земле, которую видите в пределах дистанции. Из неё бьёт фонтан взрытой земли и камней — куб со стороной 20 футов с центром в этой точке. Каждое существо в этой области совершает спасбросок Ловкости и получает 3к12 дробящего урона при провале или половину этого урона при успехе.',
    {
      source: 'XGE',
      classes: ['Волшебник', 'Друид', 'Чародей'],
      sections: [
        { title: 'Завал', text: 'Земля в области становится труднопроходимой местностью, пока её не расчистят: на каждый участок 5 на 5 футов уходит не меньше минуты ручной работы.' },
        { title: 'На более высоких уровнях', text: 'Урон увеличивается на 1к12 за каждый уровень ячейки выше 3-го.' }
      ]
    }
  ),
  spell(
    'enemies-abound', 'Изобилие врагов', 3, 'enchantment',
    '1 действие', '120 фт.', 'В, С', 'Концентрация, до 1 минуты',
    ['concentration', 'control'],
    'Вы проникаете в разум существа, которое видите в пределах дистанции. Оно совершает спасбросок Интеллекта; существо, невосприимчивое к испугу, преуспевает автоматически. При провале цель больше не отличает друзей от врагов и до конца заклинания считает врагами всех существ, которых видит. Каждый раз, получая урон, цель может повторить спасбросок и при успехе избавляется от эффекта.',
    {
      source: 'XGE',
      classes: ['Бард', 'Волшебник', 'Чародей', 'Колдун'],
      sections: [
        { title: 'Слепая ярость', text: 'Выбирая цель для атаки, заклинания или другой способности, затронутое существо выбирает её случайно среди существ, которых видит в пределах дистанции этой атаки или способности. Если враг провоцирует от него атаку, оно обязано её совершить, если может.' }
      ]
    }
  ),
  spell(
    'counterspell', 'Контрзаклинание', 3, 'abjuration',
    '1 реакция, когда видимое существо в пределах 60 фт. накладывает заклинание', '60 фт.', 'С', 'Мгновенная',
    ['reaction', 'control'],
    'Вы пытаетесь прервать существо, творящее заклинание. Если оно творит заклинание 3-го уровня или ниже, заклинание проваливается и ничего не делает. Если оно творит заклинание 4-го уровня или выше, совершите проверку вашей заклинательной характеристики со СЛ 10 + уровень того заклинания. При успехе заклинание существа проваливается и ничего не делает.',
    {
      source: 'PHB',
      classes: ['Волшебник', 'Колдун', 'Чародей'],
      sections: [
        { title: 'На более высоких уровнях', text: 'Прерванное заклинание ничего не делает, если его уровень не выше уровня использованной вами ячейки.' }
      ]
    }
  ),
  spell(
    'intellect-fortress', 'Крепость интеллекта', 3, 'abjuration',
    '1 действие', '30 фт.', 'В', 'Концентрация, до 1 часа',
    ['concentration', 'support'],
    'Пока действует заклинание, вы или одно согласное существо, которое вы видите в пределах дистанции, получаете сопротивление урону психической энергией и совершаете с преимуществом спасброски Интеллекта, Мудрости и Харизмы.',
    {
      source: 'TCE',
      classes: ['Бард', 'Волшебник', 'Чародей', 'Колдун', 'Изобретатель'],
      sections: [
        { title: 'На более высоких уровнях', text: 'За каждый уровень ячейки выше 3-го заклинание затрагивает ещё одно существо; все цели должны быть не дальше 30 футов друг от друга.' }
      ]
    }
  ),
  spell(
    'tiny-servant', 'Крошечный слуга', 3, 'transmutation',
    '1 минута', 'Касание', 'В, С', '8 часов',
    ['support', 'utility'],
    'Вы касаетесь одного немагического предмета размера Крошечный, который ни к чему не прикреплён и который никто не несёт. Предмет оживает, у него вырастают ручки и ножки, и он становится существом под вашим контролем — пока действует заклинание или пока его хиты не опустятся до 0.',
    {
      source: 'XGE',
      classes: ['Волшебник', 'Изобретатель'],
      sections: [
        { title: 'Слуга', text: 'Крошечный конструкт. КД 15, 10 хитов (4к4), скорость 30 футов, лазание 30 футов. СИЛ 4, ЛОВ 16, ТЕЛ 10, ИНТ 2, МДР 10, ХАР 1. Иммунитет к урону ядом и психической энергией; не может быть ослеплён, очарован, оглушён, истощён, испуган, парализован, окаменевшим или отравлен. Слепое зрение 60 футов (дальше слеп), пассивная Внимательность 10. Не говорит. Удар: рукопашная атака оружием, +5 к попаданию, досягаемость 5 футов, одна цель; при попадании 5 (1к4 + 3) дробящего урона.' },
        { title: 'Команды', text: 'Бонусным действием вы мысленно приказываете слуге, если он в пределах 120 футов от вас (если слуг несколько, можно приказать любым или всем сразу, отдав одну и ту же команду). Вы решаете, какое действие он совершит и куда переместится в свой следующий ход, или даёте простое общее поручение — принести ключ, стоять на страже, сложить книги стопкой. Без команд слуга только защищается от враждебных существ. Получив поручение, он выполняет его, пока не закончит.' },
        { title: 'Конец', text: 'Когда хиты слуги опускаются до 0, он снова становится предметом, и оставшийся урон переходит на предмет.' },
        { title: 'На более высоких уровнях', text: 'За каждый уровень ячейки выше 3-го вы оживляете ещё два предмета.' }
      ]
    }
  ),
  spell(
    'leomunds-tiny-hut', 'Леомундова хижина', 3, 'evocation',
    '1 минута', 'На себя (полусфера радиусом 10 фт.)', 'В, С, М (маленькая кристаллическая бусина)', '8 часов',
    ['ritual', 'utility'],
    'Вокруг и над вами возникает неподвижный купол силового поля радиусом 10 футов и стоит на месте, пока действует заклинание. Если вы покинете его область, заклинание заканчивается. Вместе с вами в куполе помещаются девять существ размера Средний или меньше. Если в области есть существо крупнее или больше девяти существ, заклинание проваливается.',
    {
      source: 'PHB',
      classes: ['Бард', 'Волшебник'],
      sections: [
        { title: 'Стены', text: 'Существа и предметы, которые были внутри купола при сотворении, свободно проходят сквозь него. Все остальные существа и предметы пройти сквозь него не могут. Заклинания и другие магические эффекты не проходят сквозь купол, и сквозь него нельзя творить заклинания.' },
        { title: 'Внутри', text: 'Внутри сухо и удобно, какая бы погода ни была снаружи. Пока заклинание действует, вы можете приказать, чтобы внутри был тусклый свет или темнота. Снаружи купол непрозрачен и любого выбранного вами цвета, изнутри — прозрачен.' }
      ]
    }
  ),
  spell(
    'magic-circle', 'Магический круг', 3, 'abjuration',
    '1 минута', '10 фт.', 'В, С, М (святая вода или порошок серебра и железа стоимостью не менее 100 с.м., расходуются)', '1 час',
    ['control', 'support'],
    'Вы создаёте цилиндр магической энергии радиусом 10 футов и высотой 20 футов с центром в точке на земле, которую видите в пределах дистанции. Там, где цилиндр пересекается с полом или другой поверхностью, проступают светящиеся руны. Выберите один или несколько видов существ: небожители, элементали, феи, исчадия или нежить.',
    {
      source: 'PHB',
      classes: ['Волшебник', 'Жрец', 'Колдун', 'Паладин'],
      sections: [
        { title: 'Защита', text: 'Существо выбранного вида не может по своей воле войти в цилиндр немагическим способом. Если оно пытается сделать это телепортацией или межпланарным перемещением, оно сначала должно преуспеть в спасброске Харизмы. Оно совершает с помехой броски атаки по целям внутри цилиндра. Цели внутри цилиндра оно не может очаровать, испугать или вселиться в них.' },
        { title: 'Наоборот', text: 'При сотворении вы можете обратить действие магии: тогда круг не выпускает существо выбранного вида из цилиндра и защищает цели снаружи.' },
        { title: 'На более высоких уровнях', text: 'Длительность увеличивается на 1 час за каждый уровень ячейки выше 3-го.' }
      ]
    }
  ),
  spell(
    'crusaders-mantle', 'Мантия крестоносца', 3, 'evocation',
    '1 действие', 'На себя (радиус 30 фт.)', 'В', 'Концентрация, до 1 минуты',
    ['concentration', 'support'],
    'От вас исходит аура святой силы радиусом 30 футов, пробуждающая отвагу в союзниках. Пока действует заклинание, аура движется вместе с вами, оставаясь с центром на вас. Каждое невраждебное существо в ауре (в том числе вы), попадая атакой оружием, наносит дополнительно 1к4 урона излучением.',
    {
      source: 'PHB',
      classes: ['Паладин']
    }
  ),
  spell(
    'beacon-of-hope', 'Маяк надежды', 3, 'abjuration',
    '1 действие', '30 фт.', 'В, С', 'Концентрация, до 1 минуты',
    ['concentration', 'support', 'healing'],
    'Заклинание дарует надежду и жизненную силу. Выберите любое число существ в пределах дистанции. Пока действует заклинание, каждая цель совершает с преимуществом спасброски Мудрости и спасброски от смерти, а от любого лечения восстанавливает наибольшее возможное число хитов.',
    {
      source: 'PHB',
      classes: ['Жрец']
    }
  ),
  spell(
    'melfs-minute-meteors', 'Мельфовы маленькие метеоры', 3, 'evocation',
    '1 действие', 'На себя', 'В, С, М (селитра, сера и сосновая смола, скатанные в шарик)', 'Концентрация, до 10 минут',
    ['concentration', 'damage'],
    'В вашем пространстве появляются шесть крошечных метеоров и, пока действует заклинание, кружат вокруг вас. При сотворении, а затем бонусным действием в каждый свой ход вы можете запустить один или два метеора в выбранные вами точки в пределах 120 футов от себя.',
    {
      source: 'XGE',
      classes: ['Волшебник', 'Чародей'],
      sections: [
        { title: 'Взрыв', text: 'Долетев до цели или ударившись о твёрдую поверхность, метеор взрывается. Каждое существо в пределах 5 футов от точки взрыва совершает спасбросок Ловкости и получает 2к6 урона огнём при провале или половину этого урона при успехе.' },
        { title: 'На более высоких уровнях', text: 'За каждый уровень ячейки выше 3-го появляется на два метеора больше.' }
      ]
    }
  ),
  spell(
    'blink', 'Мерцание', 3, 'transmutation',
    '1 действие', 'На себя', 'В, С', '1 минута',
    ['support', 'utility'],
    'Пока действует заклинание, в конце каждого своего хода бросайте к20. При 11 или больше вы исчезаете со своего плана бытия и появляетесь на Эфирном плане (если вы уже были на нём, заклинание проваливается, а сотворение пропадает). В начале вашего следующего хода, а также когда заклинание заканчивается, если вы на Эфирном плане, вы возвращаетесь в выбранное вами свободное пространство, которое видите в пределах 10 футов от места, где исчезли. Если в этих пределах свободного пространства нет, вы появляетесь в ближайшем свободном (если таких несколько на одном расстоянии — в случайном). Действием вы можете окончить заклинание.',
    {
      source: 'PHB',
      classes: ['Волшебник', 'Чародей', 'Изобретатель'],
      sections: [
        { title: 'На Эфирном плане', text: 'Находясь на Эфирном плане, вы видите и слышите план, с которого пришли, в оттенках серого, но не видите там ничего дальше 60 футов. Вы можете воздействовать только на существ на Эфирном плане, и только они могут воздействовать на вас. Существа, которых там нет, не могут вас воспринимать и с вами взаимодействовать, если у них нет такой способности.' }
      ]
    }
  ),
  spell(
    'sleet-storm', 'Метель', 3, 'conjuration',
    '1 действие', '150 фт.', 'В, С, М (щепотка пыли и несколько капель воды)', 'Концентрация, до 1 минуты',
    ['concentration', 'control'],
    'Пока действует заклинание, в цилиндре высотой 20 футов и радиусом 40 футов с центром в выбранной вами точке в пределах дистанции идёт ледяной дождь со снегом. Область сильно заслонена, а открытый огонь в ней гаснет. Землю в области покрывает скользкий лёд, и она становится труднопроходимой местностью.',
    {
      source: 'PHB',
      classes: ['Друид', 'Волшебник', 'Чародей'],
      sections: [
        { title: 'Гололёд', text: 'Когда существо впервые за ход входит в область заклинания или начинает там ход, оно совершает спасбросок Ловкости; при провале оно сбито с ног.' },
        { title: 'Концентрация', text: 'Если существо начинает ход в области заклинания и концентрируется на заклинании, оно должно преуспеть в спасброске Телосложения против СЛ спасброска ваших заклинаний, иначе теряет концентрацию.' }
      ]
    }
  ),
  spell(
    'mass-healing-word', 'Множественное лечащее слово', 3, 'evocation',
    '1 бонусное действие', '60 фт.', 'В', 'Мгновенная',
    ['healing'],
    'Вы произносите слова исцеления, и до шести выбранных вами существ, которых вы видите в пределах дистанции, восстанавливают по 1к4 + модификатор вашей заклинательной характеристики хитов. Заклинание не действует на нежить и конструктов.',
    {
      source: 'PHB',
      classes: ['Бард', 'Жрец'],
      sections: [
        { title: 'На более высоких уровнях', text: 'Лечение увеличивается на 1к4 за каждый уровень ячейки выше 3-го.' }
      ]
    }
  ),
  spell(
    'lightning-arrow', 'Молниевая стрела', 3, 'transmutation',
    '1 бонусное действие', 'На себя', 'В, С', 'Концентрация, до 1 минуты',
    ['concentration', 'damage'],
    'Пока заклинание действует, при вашей следующей атаке дальнобойным оружием боеприпас — или само оружие, если оно метательное, — превращается в молнию. Бросок атаки совершается как обычно. Вместо обычного урона оружия цель получает 4к8 урона электричеством при попадании или половину этого урона при промахе.',
    {
      source: 'PHB',
      classes: ['Следопыт'],
      sections: [
        { title: 'Разряд', text: 'Попали вы или нет, каждое существо в пределах 10 футов от цели совершает спасбросок Ловкости и получает 2к8 урона электричеством при провале или половину при успехе. Затем боеприпас или оружие принимает обычный вид.' },
        { title: 'На более высоких уровнях', text: 'Урон обоих эффектов увеличивается на 1к8 за каждый уровень ячейки выше 3-го.' }
      ]
    }
  ),
  spell(
    'lightning-bolt', 'Молния', 3, 'evocation',
    '1 действие', 'На себя (линия 100 фт.)', 'В, С, М (кусочек меха и стержень из янтаря, хрусталя или стекла)', 'Мгновенная',
    ['damage'],
    'От вас в выбранном направлении бьёт молния — линия длиной 100 футов и шириной 5 футов. Каждое существо в линии совершает спасбросок Ловкости и получает 8к6 урона электричеством при провале или половину этого урона при успехе. Молния поджигает горючие предметы в области, которые никто не носит и не держит.',
    {
      source: 'PHB',
      classes: ['Волшебник', 'Чародей'],
      sections: [
        { title: 'На более высоких уровнях', text: 'Урон увеличивается на 1к6 за каждый уровень ячейки выше 3-го.' }
      ]
    }
  ),
  spell(
    'nondetection', 'Необнаружимость', 3, 'abjuration',
    '1 действие', 'Касание', 'В, С, М (щепотка алмазной пыли стоимостью 25 с.м., которой посыпают цель; расходуется)', '8 часов',
    ['utility'],
    'Пока действует заклинание, вы скрываете от магии прорицания цель, которой касаетесь. Целью может быть согласное существо, место или предмет не больше 10 футов в любом измерении. Цель нельзя выбрать целью никакой магии прорицания, и её нельзя воспринять через магические датчики наблюдения.',
    {
      source: 'PHB',
      classes: ['Бард', 'Волшебник', 'Следопыт']
    }
  ),
  spell(
    'major-image', 'Образ', 3, 'illusion',
    '1 действие', '120 фт.', 'В, С, М (кусочек овечьей шерсти)', 'Концентрация, до 10 минут',
    ['concentration', 'control'],
    'Вы создаёте образ предмета, существа или другого видимого явления, не больше куба со стороной 20 футов. Образ появляется в месте, которое вы видите в пределах дистанции, и держится, пока действует заклинание. Он кажется совершенно настоящим, со звуками, запахами и температурой, подходящими изображённому. Нельзя создать жар или холод, способный причинить урон, звук, достаточно громкий, чтобы нанести урон звуком или оглушить существо, или запах, от которого существу станет дурно.',
    {
      source: 'PHB',
      classes: ['Бард', 'Волшебник', 'Чародей', 'Колдун'],
      sections: [
        { title: 'Движение', text: 'Пока вы находитесь в пределах дистанции от иллюзии, вы можете действием переместить образ в любое другое место в пределах дистанции. При этом вы можете менять его вид так, чтобы движение выглядело естественно: например, созданное существо может идти. Точно так же иллюзия может в разное время издавать разные звуки и даже вести разговор.' },
        { title: 'Разоблачение', text: 'Физическое взаимодействие с образом выдаёт иллюзию: предметы проходят сквозь него. Существо, которое действием изучает образ, может понять, что это иллюзия, преуспев в проверке Интеллекта (Анализ) против СЛ спасброска ваших заклинаний. Распознав иллюзию, существо видит сквозь образ, а остальные его ощущения становятся для него слабыми.' },
        { title: 'На более высоких уровнях', text: 'Ячейкой 6-го уровня и выше заклинание держится, пока его не рассеют, и не требует концентрации.' }
      ]
    }
  ),
  spell(
    'fireball', 'Огненный шар', 3, 'evocation',
    '1 действие', '150 фт.', 'В, С, М (крошечный шарик из гуано летучей мыши и серы)', 'Мгновенная',
    ['damage'],
    'Из вашего указательного пальца к выбранной вами точке в пределах дистанции устремляется яркая искра и с глухим рёвом расцветает огненным взрывом. Каждое существо в сфере радиусом 20 футов с центром в этой точке совершает спасбросок Ловкости и получает 8к6 урона огнём при провале или половину этого урона при успехе. Огонь огибает углы. Он поджигает горючие предметы в области, которые никто не носит и не держит.',
    {
      source: 'PHB',
      classes: ['Волшебник', 'Чародей'],
      sections: [
        { title: 'На более высоких уровнях', text: 'Урон увеличивается на 1к6 за каждый уровень ячейки выше 3-го.' }
      ]
    }
  ),
  spell(
    'blinding-smite', 'Ослепляющая кара', 3, 'evocation',
    '1 бонусное действие', 'На себя', 'В', 'Концентрация, до 1 минуты',
    ['concentration', 'damage'],
    'Пока заклинание действует, при вашем следующем попадании по существу атакой рукопашным оружием оружие вспыхивает ярким светом, и атака наносит цели дополнительно 3к8 урона излучением. Кроме того, цель совершает спасбросок Телосложения и при провале ослеплена до конца действия заклинания. Ослеплённое так существо в конце каждого своего хода повторяет спасбросок Телосложения и при успехе прозревает.',
    {
      source: 'PHB',
      classes: ['Паладин']
    }
  ),
  spell(
    'glyph-of-warding', 'Охранные руны', 3, 'abjuration',
    '1 час', 'Касание', 'В, С, М (благовония и растолчённый бриллиант стоимостью не менее 200 с.м., расходуются)', 'Пока не рассеется или не сработает',
    ['damage', 'control', 'utility'],
    'Сотворяя заклинание, вы наносите знак, вредящий другим существам, — либо на поверхность (например, стол или участок пола или стены), либо внутрь закрываемого предмета (книги, свитка или сундука с сокровищами), чтобы спрятать знак. На поверхности знак может занимать участок диаметром не больше 10 футов. Предмет со знаком должен оставаться на месте: если его отодвинуть дальше 10 футов от места сотворения, знак разрушается, и заклинание заканчивается, не сработав. Знак почти не виден: чтобы его найти, нужна успешная проверка Интеллекта (Анализ) против СЛ спасброска ваших заклинаний.',
    {
      source: 'PHB',
      classes: ['Бард', 'Волшебник', 'Жрец', 'Изобретатель'],
      sections: [
        { title: 'Срабатывание', text: 'При сотворении вы решаете, что приведёт знак в действие. У знаков на поверхности обычно это касание знака или вставание на него, снятие другого предмета, закрывающего знак, приближение к знаку на определённое расстояние или манипуляции с предметом, на котором он нанесён. У знаков внутри предмета — открытие предмета, приближение к нему на определённое расстояние, взгляд на знак или его прочтение. Когда знак срабатывает, заклинание заканчивается.' },
        { title: 'Уточнение', text: 'Условие можно уточнить, чтобы заклинание срабатывало только при определённых обстоятельствах, по телесным признакам (росту, весу), по виду существ (например, только на аберраций) или по мировоззрению. Можно также задать условия для существ, на которых знак не сработает, — например, для тех, кто назовёт пароль.' },
        { title: 'Вид знака', text: 'Нанося знак, выберите взрывные руны или знак заклинания.' },
        { title: 'Взрывные руны', text: 'Сработав, знак выплёскивает магическую энергию сферой радиусом 20 футов с центром на знаке. Сфера огибает углы. Каждое существо в области совершает спасбросок Ловкости и получает 5к8 урона кислотой, холодом, огнём, электричеством или звуком (вид выбираете вы, создавая знак) при провале или половину этого урона при успехе.' },
        { title: 'Знак заклинания', text: 'В знак можно вложить подготовленное заклинание 3-го уровня или ниже, сотворив его при создании знака. Заклинание должно действовать на одно существо или на область. Вложенное так заклинание при сотворении ничего не делает. Когда знак срабатывает, вложенное заклинание творится. Если у заклинания есть цель, ею становится существо, приведшее знак в действие; если оно действует на область, центр области — на этом существе. Если заклинание призывает враждебных существ или создаёт вредоносные предметы или ловушки, они появляются как можно ближе к нарушителю и атакуют его. Если заклинание требует концентрации, оно действует всю свою полную длительность.' },
        { title: 'На более высоких уровнях', text: 'Урон взрывных рун увеличивается на 1к8 за каждый уровень ячейки выше 3-го. В знак заклинания можно вложить любое заклинание уровня не выше ячейки, использованной для охранных рун.' }
      ]
    }
  ),
  spell(
    'life-transference', 'Передача жизни', 3, 'necromancy',
    '1 действие', '30 фт.', 'В, С', 'Мгновенная',
    ['damage', 'healing'],
    'Вы жертвуете частью своего здоровья, чтобы залечить раны другого. Вы получаете 4к8 урона некротической энергией — его нельзя уменьшить никаким способом, — а одно выбранное вами существо, которое вы видите в пределах дистанции, восстанавливает хиты, равные удвоенному некротическому урону, который вы получили.',
    {
      source: 'XGE',
      classes: ['Волшебник', 'Жрец'],
      sections: [
        { title: 'На более высоких уровнях', text: 'Урон увеличивается на 1к8 за каждый уровень ячейки выше 3-го.' }
      ]
    }
  ),
  spell(
    'wall-of-sand', 'Песчаная стена', 3, 'evocation',
    '1 действие', '90 фт.', 'В, С, М (горсть песка)', 'Концентрация, до 10 минут',
    ['concentration', 'control'],
    'В точке на земле, которую вы видите в пределах дистанции, поднимается стена из кружащегося песка длиной до 30 футов, высотой до 10 футов и толщиной до 10 футов. Она держится, пока действует заклинание. Стена закрывает обзор, но не мешает проходить. Существо в пространстве стены ослеплено и тратит там 3 фута перемещения на каждый фут.',
    {
      source: 'XGE',
      classes: ['Волшебник', 'Изобретатель']
    }
  ),
  spell(
    'water-breathing', 'Подводное дыхание', 3, 'transmutation',
    '1 действие', '30 фт.', 'В, С, М (короткая тростинка или соломинка)', '24 часа',
    ['ritual', 'support'],
    'Заклинание даёт до десяти согласным существам, которых вы видите в пределах дистанции, способность дышать под водой, пока оно действует. Существа под действием заклинания сохраняют и обычный способ дыхания.',
    {
      source: 'PHB',
      classes: ['Волшебник', 'Друид', 'Следопыт', 'Чародей', 'Изобретатель']
    }
  ),
  spell(
    'clairvoyance', 'Подсматривание', 3, 'divination',
    '10 минут', '1 миля', 'В, С, М (фокусировка стоимостью не менее 100 с.м. — рог с самоцветами, чтобы слышать, или стеклянный глаз, чтобы видеть)', 'Концентрация, до 10 минут',
    ['concentration', 'utility'],
    'Вы создаёте в пределах дистанции невидимый датчик — в знакомом вам месте (где вы бывали или которое видели) или в очевидном, но незнакомом (например, за дверью, за углом или в роще). Датчик остаётся на месте, пока действует заклинание; его нельзя атаковать или как-то с ним взаимодействовать.',
    {
      source: 'PHB',
      classes: ['Бард', 'Жрец', 'Волшебник', 'Чародей'],
      sections: [
        { title: 'Зрение или слух', text: 'При сотворении вы выбираете зрение или слух и пользуетесь этим чувством через датчик так, будто находитесь на его месте. Действием вы можете переключаться между зрением и слухом.' },
        { title: 'Датчик', text: 'Существо, способное видеть датчик (например, под действием «Видения невидимого» или с истинным зрением), видит светящийся бесплотный шар размером с ваш кулак.' }
      ]
    }
  ),
  spell(
    'spirit-shroud', 'Покров духа', 3, 'necromancy',
    '1 бонусное действие', 'На себя', 'В, С', 'Концентрация, до 1 минуты',
    ['concentration', 'damage'],
    'Вы призываете духов мёртвых, и пока действует заклинание, они вьются вокруг вас; духи бесплотны и неуязвимы. При сотворении выберите вид урона: излучение, некротическая энергия или холод. Пока заклинание действует, каждая ваша атака, попавшая по существу в пределах 10 футов от вас, наносит дополнительно 1к8 урона этого вида. Существо, получившее этот урон, не может восстанавливать хиты до начала вашего следующего хода.',
    {
      source: 'TCE',
      classes: ['Жрец', 'Паладин', 'Волшебник', 'Колдун'],
      sections: [
        { title: 'Хватка мёртвых', text: 'Кроме того, скорость каждого выбранного вами существа, которое вы видите и которое начинает ход в пределах 10 футов от вас, уменьшается на 10 футов до начала вашего следующего хода.' },
        { title: 'На более высоких уровнях', text: 'Урон увеличивается на 1к8 за каждые два уровня ячейки выше 3-го.' }
      ]
    }
  ),
  spell(
    'fly', 'Полёт', 3, 'transmutation',
    '1 действие', 'Касание', 'В, С, М (маховое перо любой птицы)', 'Концентрация, до 10 минут',
    ['concentration', 'utility'],
    'Вы касаетесь согласного существа. Пока действует заклинание, цель получает скорость полёта 60 футов. Когда заклинание заканчивается, цель, если всё ещё в воздухе, падает, если не может остановить падение.',
    {
      source: 'PHB',
      classes: ['Волшебник', 'Чародей', 'Колдун', 'Изобретатель'],
      sections: [
        { title: 'На более высоких уровнях', text: 'Ячейкой 4-го уровня и выше заклинание затрагивает ещё одно существо за каждый уровень ячейки выше 3-го.' }
      ]
    }
  ),
  spell(
    'sending', 'Послание', 3, 'evocation',
    '1 действие', 'Неограниченная', 'В, С, М (кусок тонкой медной проволоки)', '1 раунд',
    ['utility'],
    'Вы отправляете короткое послание до 25 слов знакомому вам существу. Существо слышит послание в мыслях, узнаёт в вас отправителя, если знает вас, и может сразу ответить так же. Заклинание позволяет понять смысл послания любому существу с Интеллектом не меньше 1. Послание можно отправить на любое расстояние и даже на другие планы бытия, но если цель на другом плане, есть шанс 5 процентов, что послание не дойдёт.',
    {
      source: 'PHB',
      classes: ['Бард', 'Волшебник', 'Жрец']
    }
  ),
  spell(
    'phantom-steed', 'Призрачный скакун', 3, 'illusion',
    '1 минута', '30 фт.', 'В, С', '1 час',
    ['ritual', 'utility'],
    'В выбранном вами свободном пространстве на земле в пределах дистанции появляется полуреальное существо размера Большой, похожее на лошадь. Внешность существа выбираете вы, но у него всегда есть седло, удила и уздечка. Любое снаряжение, созданное заклинанием, исчезает облачком дыма, если его унести дальше 10 футов от скакуна.',
    {
      source: 'PHB',
      classes: ['Волшебник'],
      sections: [
        { title: 'Езда', text: 'Пока действует заклинание, на скакуне можете ехать вы или выбранное вами существо. У существа характеристики ездовой лошади, но скорость 100 футов, и оно проходит 10 миль в час или 13 миль в час быстрым темпом.' },
        { title: 'Конец', text: 'Когда заклинание заканчивается, скакун постепенно тает, давая всаднику 1 минуту, чтобы спешиться. Заклинание заканчивается, если вы отпустите его действием или если скакун получит любой урон.' }
      ]
    }
  ),
  spell(
    'summon-undead', 'Призыв духа нежити', 3, 'necromancy',
    '1 действие', '90 фт.', 'В, С, М (позолоченный череп стоимостью не менее 300 с.м.)', 'Концентрация, до 1 часа',
    ['concentration', 'support'],
    'Вы призываете духа нежити. Он принимает телесный облик в свободном пространстве, которое вы видите в пределах дистанции, и использует блок статистики «Дух нежити». При сотворении выберите облик: призрачный, гнилостный или скелетный. Дух похож на нежить этого облика, и от выбора зависят некоторые черты в его блоке статистики. Существо исчезает, когда его хиты опускаются до 0 или когда заклинание заканчивается.',
    {
      source: 'TCE',
      classes: ['Волшебник', 'Колдун'],
      sections: [
        { title: 'В бою', text: 'Дух — союзник вам и вашим спутникам. В бою он действует на вашей инициативе, но свой ход совершает сразу после вашего. Он подчиняется вашим устным командам (вам это действия не стоит). Если вы ничего не приказываете, он совершает действие Уклонение и перемещается, чтобы избегать опасности.' },
        { title: 'На более высоких уровнях', text: 'Уровень заклинания в блоке статистики считается равным уровню использованной ячейки.' }
      ]
    }
  ),
  spell(
    'summon-shadowspawn', 'Призыв духа порождения теней', 3, 'conjuration',
    '1 действие', '90 фт.', 'В, С, М (слёзы внутри самоцвета стоимостью не менее 300 с.м.)', 'Концентрация, до 1 часа',
    ['concentration', 'support'],
    'Вы призываете теневого духа. Он принимает телесный облик в свободном пространстве, которое вы видите в пределах дистанции, и использует блок статистики «Теневой дух». При сотворении выберите чувство: ярость, отчаяние или страх. Дух похож на уродливое двуногое существо, отмеченное этим чувством, и от выбора зависят некоторые черты в его блоке статистики. Существо исчезает, когда его хиты опускаются до 0 или когда заклинание заканчивается.',
    {
      source: 'TCE',
      classes: ['Волшебник', 'Чародей', 'Колдун'],
      sections: [
        { title: 'В бою', text: 'Дух — союзник вам и вашим спутникам. В бою он действует на вашей инициативе, но свой ход совершает сразу после вашего. Он подчиняется вашим устным командам (вам это действия не стоит). Если вы ничего не приказываете, он совершает действие Уклонение и перемещается, чтобы избегать опасности.' },
        { title: 'На более высоких уровнях', text: 'Уровень заклинания в блоке статистики считается равным уровню использованной ячейки.' }
      ]
    }
  ),
  spell(
    'summon-fey', 'Призыв духа феи', 3, 'conjuration',
    '1 действие', '90 фт.', 'В, С, М (позолоченный цветок стоимостью не менее 300 с.м.)', 'Концентрация, до 1 часа',
    ['concentration', 'support'],
    'Вы призываете духа фей. Он принимает телесный облик в свободном пространстве, которое вы видите в пределах дистанции, и использует блок статистики «Дух фей». При сотворении выберите настроение: гневное, весёлое или озорное. Дух похож на выбранную вами фею с этим настроением, и от выбора зависят некоторые черты в его блоке статистики. Существо исчезает, когда его хиты опускаются до 0 или когда заклинание заканчивается.',
    {
      source: 'TCE',
      classes: ['Друид', 'Следопыт', 'Волшебник', 'Колдун'],
      sections: [
        { title: 'В бою', text: 'Дух — союзник вам и вашим спутникам. В бою он действует на вашей инициативе, но свой ход совершает сразу после вашего. Он подчиняется вашим устным командам (вам это действия не стоит). Если вы ничего не приказываете, он совершает действие Уклонение и перемещается, чтобы избегать опасности.' },
        { title: 'На более высоких уровнях', text: 'Уровень заклинания в блоке статистики считается равным уровню использованной ячейки.' }
      ]
    }
  ),
  spell(
    'call-lightning', 'Призыв молнии', 3, 'conjuration',
    '1 действие', '120 фт.', 'В, С', 'Концентрация, до 10 минут',
    ['concentration', 'damage'],
    'Прямо над вами появляется грозовая туча в форме цилиндра высотой 10 футов и радиусом 60 футов с центром в точке, которую вы видите в пределах дистанции. Если вы не видите в воздухе точки, где могла бы появиться туча (например, вы в комнате, где она не поместится), заклинание проваливается.',
    {
      source: 'PHB',
      classes: ['Друид'],
      sections: [
        { title: 'Молния', text: 'При сотворении выберите точку под тучей, которую вы видите. Из тучи в эту точку бьёт молния. Каждое существо в пределах 5 футов от точки совершает спасбросок Ловкости и получает 3к10 урона электричеством при провале или половину этого урона при успехе. Пока заклинание действует, в каждый свой ход вы можете действием снова так вызвать молнию — в ту же точку или в другую.' },
        { title: 'Гроза', text: 'Если при сотворении вы находитесь под открытым небом в грозу, заклинание даёт вам власть над этой грозой, а не создаёт новую тучу. В таких условиях урон заклинания больше на 1к10.' },
        { title: 'На более высоких уровнях', text: 'Урон увеличивается на 1к10 за каждый уровень ячейки выше 3-го.' }
      ]
    }
  ),
  spell(
    'summon-lesser-demons', 'Призыв низших демонов', 3, 'conjuration',
    '1 действие', '60 фт.', 'В, С, М (флакон крови гуманоида, убитого в последние 24 часа)', 'Концентрация, до 1 часа',
    ['concentration', 'control'],
    'Вы произносите нечестивые слова и призываете демонов из хаоса Бездны. Бросьте к6, чтобы узнать, кто появится: 1–2 — два демона с показателем опасности 1 или ниже; 3–4 — четыре демона с ПО 1/2 или ниже; 5–6 — восемь демонов с ПО 1/4 или ниже. Каких именно демонов (например, маны или дретчи), выбирает Мастер, а свободные пространства в пределах дистанции, где они появятся, — вы. Демон исчезает, когда его хиты опускаются до 0 или когда заклинание заканчивается.',
    {
      source: 'XGE',
      classes: ['Волшебник', 'Колдун'],
      sections: [
        { title: 'Демоны', text: 'Демоны враждебны ко всем существам, в том числе к вам. Бросьте за демонов инициативу одной группой, у которой свои ходы. Они преследуют ближайших существ, которые не демоны, и атакуют их как могут.' },
        { title: 'Круг из крови', text: 'Сотворяя заклинание, вы можете начертить на земле кровью из компонента круг, в который помещается ваше пространство. Пока заклинание действует, демоны не могут пересечь круг, повредить его или выбрать целью кого-то внутри. Использованная так кровь расходуется, когда заклинание заканчивается.' },
        { title: 'На более высоких уровнях', text: 'Ячейкой 6-го или 7-го уровня демонов появляется вдвое больше, ячейкой 8-го или 9-го уровня — втрое.' }
      ]
    }
  ),
  spell(
    'vampiric-touch', 'Прикосновение вампира', 3, 'necromancy',
    '1 действие', 'На себя', 'В, С', 'Концентрация, до 1 минуты',
    ['concentration', 'damage', 'healing'],
    'Касание вашей окутанной тенью руки вытягивает жизненную силу из других, чтобы залечить ваши раны. Совершите рукопашную атаку заклинанием по существу в пределах вашей досягаемости. При попадании цель получает 3к6 урона некротической энергией, а вы восстанавливаете хиты, равные половине нанесённого некротического урона. Пока заклинание действует, в каждый свой ход вы можете действием снова совершить эту атаку.',
    {
      source: 'PHB',
      classes: ['Волшебник', 'Колдун'],
      sections: [
        { title: 'На более высоких уровнях', text: 'Урон увеличивается на 1к6 за каждый уровень ячейки выше 3-го.' }
      ]
    }
  ),
  spell(
    'tidal-wave', 'Приливная волна', 3, 'conjuration',
    '1 действие', '120 фт.', 'В, С, М (капля воды)', 'Мгновенная',
    ['damage', 'control'],
    'Вы вызываете волну, которая обрушивается на область в пределах дистанции длиной до 30 футов, шириной до 10 футов и высотой до 10 футов. Каждое существо в этой области совершает спасбросок Ловкости. При провале оно получает 4к8 дробящего урона и сбито с ног. При успехе оно получает половину урона и остаётся на ногах.',
    {
      source: 'XGE',
      classes: ['Волшебник', 'Друид', 'Чародей'],
      sections: [
        { title: 'Разлив', text: 'Затем вода растекается по земле во все стороны, гасит незащищённый огонь в области и в пределах 30 футов от неё и исчезает.' }
      ]
    }
  ),
  spell(
    'feign-death', 'Притворная смерть', 3, 'necromancy',
    '1 действие', 'Касание', 'В, С, М (щепотка кладбищенской земли)', '1 час',
    ['ritual', 'support'],
    'Вы касаетесь согласного существа и погружаете его в оцепенение, неотличимое от смерти. Пока действует заклинание или пока вы действием не коснётесь цели, чтобы окончить его, цель кажется мёртвой при любом внешнем осмотре и для заклинаний, определяющих её состояние. Цель ослеплена и недееспособна, и её скорость равна 0. У цели есть сопротивление всему урону, кроме урона психической энергией. Если цель больна или отравлена при сотворении или заболевает или отравляется под действием заклинания, болезнь и яд не действуют, пока заклинание не закончится.',
    {
      source: 'PHB',
      classes: ['Бард', 'Волшебник', 'Друид', 'Жрец']
    }
  ),
  spell(
    'bestow-curse', 'Проклятие', 3, 'necromancy',
    '1 действие', 'Касание', 'В, С', 'Концентрация, до 1 минуты',
    ['concentration', 'control', 'damage'],
    'Вы касаетесь существа, и оно должно преуспеть в спасброске Мудрости, иначе проклято на время действия заклинания. При сотворении выберите природу проклятья из вариантов ниже.',
    {
      source: 'PHB',
      classes: ['Бард', 'Жрец', 'Волшебник', 'Чародей', 'Колдун'],
      sections: [
        { title: 'Характеристика', text: 'Выберите одну характеристику. Пока цель проклята, она совершает с помехой проверки и спасброски этой характеристики.' },
        { title: 'Против вас', text: 'Пока цель проклята, она совершает с помехой броски атаки по вам.' },
        { title: 'Бездействие', text: 'Пока цель проклята, в начале каждого своего хода она совершает спасбросок Мудрости. При провале она тратит действие в этот ход впустую, ничего не делая.' },
        { title: 'Урон', text: 'Пока цель проклята, ваши атаки и заклинания наносят ей дополнительно 1к8 урона некротической энергией.' },
        { title: 'Снятие и другие проклятья', text: 'Заклинание «Снятие проклятья» оканчивает этот эффект. С согласия Мастера вы можете выбрать другое проклятье, но оно не должно быть сильнее описанных; что оно делает, решает Мастер.' },
        { title: 'На более высоких уровнях', text: 'Ячейкой 4-го уровня длительность — концентрация, до 10 минут. Ячейкой 5-го уровня и выше — 8 часов, 7-го уровня и выше — 24 часа, ячейкой 9-го уровня заклинание действует, пока его не рассеют. Ячейкой 5-го уровня и выше концентрация не нужна.' }
      ]
    }
  ),
  spell(
    'flame-arrows', 'Пылающие стрелы', 3, 'transmutation',
    '1 действие', 'Касание', 'В, С', 'Концентрация, до 1 часа',
    ['concentration', 'damage'],
    'Вы касаетесь колчана со стрелами или болтами. Когда цель получает попадание атакой дальнобойным оружием боеприпасом, вынутым из этого колчана, она получает дополнительно 1к6 урона огнём. Для каждого боеприпаса магия заканчивается после попадания или промаха, а само заклинание — когда из колчана вынуто двенадцать боеприпасов.',
    {
      source: 'XGE',
      classes: ['Друид', 'Следопыт', 'Волшебник', 'Чародей', 'Изобретатель'],
      sections: [
        { title: 'На более высоких уровнях', text: 'За каждый уровень ячейки выше 3-го число зачарованных боеприпасов увеличивается на два.' }
      ]
    }
  ),
  spell(
    'speak-with-dead', 'Разговор с мёртвыми', 3, 'necromancy',
    '1 действие', '10 фт.', 'В, С, М (горящие благовония)', '10 минут',
    ['utility'],
    'Вы наделяете выбранный вами труп в пределах дистанции подобием жизни и разума, чтобы он мог отвечать на ваши вопросы. У трупа должен быть рот, и он не может быть нежитью. Заклинание проваливается, если этот труп был целью этого заклинания в последние 10 дней.',
    {
      source: 'PHB',
      classes: ['Бард', 'Волшебник', 'Жрец'],
      sections: [
        { title: 'Вопросы', text: 'Пока действует заклинание, вы можете задать трупу до пяти вопросов. Труп знает только то, что знал при жизни, включая известные ему языки. Ответы обычно краткие, загадочные или повторяющиеся, и труп не обязан говорить правду, если вы к нему враждебны или он узнаёт в вас врага.' },
        { title: 'Не душа', text: 'Заклинание не возвращает в тело душу существа — только оживляющий его дух. Поэтому труп не может узнать ничего нового, не понимает ничего, что случилось после его смерти, и не может строить догадки о будущем.' }
      ]
    }
  ),
  spell(
    'speak-with-plants', 'Разговор с растениями', 3, 'transmutation',
    '1 действие', 'На себя (радиус 30 фт.)', 'В, С', '10 минут',
    ['utility', 'control'],
    'Вы наделяете растения в пределах 30 футов от себя ограниченным разумом и подвижностью, и они могут общаться с вами и выполнять простые команды. Вы можете расспросить растения о событиях в области заклинания за последние сутки — о проходивших существах, погоде и других обстоятельствах.',
    {
      source: 'PHB',
      classes: ['Бард', 'Друид', 'Следопыт'],
      sections: [
        { title: 'Местность', text: 'Вы можете превратить труднопроходимую местность из растений (например, заросли и подлесок) в обычную на время действия заклинания. Или превратить обычную местность, где есть растения, в труднопроходимую на то же время — например, чтобы лозы и ветви мешали преследователям.' },
        { title: 'Растения', text: 'На усмотрение Мастера растения могут выполнить для вас и другие поручения. Заклинание не позволяет растениям выкорчеваться и ходить, но ветвями, усиками и стеблями они двигают свободно. Если в области есть существо-растение, вы можете общаться с ним, будто у вас общий язык, но магической власти над ним не получаете. Заклинание может заставить растения, созданные «Опутыванием», отпустить опутанное существо.' }
      ]
    }
  ),
  spell(
    'dispel-magic', 'Рассеивание магии', 3, 'abjuration',
    '1 действие', '120 фт.', 'В, С', 'Мгновенная',
    ['control', 'utility'],
    'Выберите одно существо, предмет или магический эффект в пределах дистанции. Все заклинания 3-го уровня и ниже на цели заканчиваются. Для каждого заклинания 4-го уровня и выше на цели совершите проверку вашей заклинательной характеристики со СЛ 10 + уровень этого заклинания. При успехе заклинание заканчивается.',
    {
      source: 'PHB',
      classes: ['Бард', 'Волшебник', 'Друид', 'Жрец', 'Колдун', 'Паладин', 'Чародей', 'Изобретатель'],
      sections: [
        { title: 'На более высоких уровнях', text: 'Вы автоматически оканчиваете на цели действие заклинания, если его уровень не выше уровня использованной вами ячейки.' }
      ]
    }
  ),
  spell(
    'plant-growth', 'Рост растений', 3, 'transmutation',
    '8 часов или 1 действие', '150 фт.', 'В, С', 'Мгновенная',
    ['control', 'utility'],
    'Заклинание наполняет жизненной силой растения в определённой области. Его можно применить двумя способами — ради немедленной или долгосрочной пользы.',
    {
      source: 'PHB',
      classes: ['Бард', 'Друид', 'Следопыт'],
      sections: [
        { title: 'За 1 действие', text: 'Выберите точку в пределах дистанции. Все обычные растения в радиусе 100 футов с центром в этой точке густеют и разрастаются. Существо, движущееся по этой области, тратит 4 фута перемещения на каждый фут. Вы можете исключить из области заклинания один или несколько участков любого размера.' },
        { title: 'За 8 часов', text: 'Вы делаете землю плодородной. Все растения в радиусе полумили с центром в точке в пределах дистанции на 1 год становятся плодороднее и при сборе урожая дают вдвое больше пищи.' }
      ]
    }
  ),
  spell(
    'meld-into-stone', 'Слияние с камнем', 3, 'transmutation',
    '1 действие', 'Касание', 'В, С', '8 часов',
    ['ritual', 'utility'],
    'Вы входите в каменный предмет или поверхность, достаточно большие, чтобы вместить вас целиком, и сливаетесь с камнем вместе со всем снаряжением при себе на время действия заклинания. Вы входите в камень, тратя перемещение, в точке, которой можете коснуться. От вашего присутствия не остаётся ничего, что можно увидеть или иначе заметить немагическими чувствами.',
    {
      source: 'PHB',
      classes: ['Друид', 'Жрец', 'Следопыт'],
      sections: [
        { title: 'В камне', text: 'Слившись с камнем, вы не видите, что происходит снаружи, а проверки Мудрости (Внимательность), чтобы услышать звуки снаружи, совершаете с помехой. Вы чувствуете течение времени и можете творить заклинания на себя. Вы можете, тратя перемещение, выйти из камня там же, где вошли, — это оканчивает заклинание. Иначе двигаться вы не можете.' },
        { title: 'Повреждение камня', text: 'Небольшие повреждения камня вам не вредят, но если камень частично разрушен или изменил форму так, что вы больше в нём не помещаетесь, вас выталкивает наружу, и вы получаете 6к6 дробящего урона. Если камень разрушен полностью или превращён в другое вещество, вас выталкивает, и вы получаете 50 дробящего урона. Вытолкнутый, вы падаете и сбиты с ног в ближайшем свободном пространстве к месту, где вошли.' }
      ]
    }
  ),
  spell(
    'remove-curse', 'Снятие проклятья', 3, 'abjuration',
    '1 действие', 'Касание', 'В, С', 'Мгновенная',
    ['support', 'utility'],
    'От вашего касания заканчиваются все проклятья, действующие на одно существо или предмет. Если предмет — проклятый магический предмет, его проклятье остаётся, но заклинание разрывает настройку владельца на предмет, так что его можно снять или выбросить.',
    {
      source: 'PHB',
      classes: ['Волшебник', 'Жрец', 'Колдун', 'Паладин']
    }
  ),
  spell(
    'create-food-and-water', 'Сотворение пищи и воды', 3, 'conjuration',
    '1 действие', '30 фт.', 'В, С', 'Мгновенная',
    ['utility'],
    'Вы создаёте на земле или в сосудах в пределах дистанции 45 фунтов еды и 30 галлонов воды — достаточно, чтобы сутки прокормить до пятнадцати гуманоидов или пять скакунов. Еда пресная, но сытная, и портится, если её не съесть за 24 часа. Вода чистая и не портится.',
    {
      source: 'PHB',
      classes: ['Жрец', 'Паладин', 'Изобретатель']
    }
  ),
  spell(
    'wind-wall', 'Стена ветров', 3, 'evocation',
    '1 действие', '120 фт.', 'В, С, М (крошечный веер и перо экзотической птицы)', 'Концентрация, до 1 минуты',
    ['concentration', 'control'],
    'В выбранной вами точке в пределах дистанции с земли поднимается стена сильного ветра длиной до 50 футов, высотой до 15 футов и толщиной 1 фут. Форма стены может быть любой, если она идёт по земле одной непрерывной линией. Стена держится, пока действует заклинание. Когда стена появляется, каждое существо в её области совершает спасбросок Силы и получает 3к8 дробящего урона при провале или половину этого урона при успехе.',
    {
      source: 'PHB',
      classes: ['Друид', 'Следопыт', 'Волшебник', 'Изобретатель'],
      sections: [
        { title: 'Ветер', text: 'Сильный ветер не пропускает туман, дым и другие газы. Летающие существа и предметы размера Маленький и меньше не могут пройти сквозь стену. Незакреплённые лёгкие материалы, попав в стену, взлетают вверх. Стрелы, болты и другие обычные снаряды, выпущенные по целям за стеной, отклоняются вверх и автоматически промахиваются (на валуны, брошенные великанами или осадными машинами, и подобные снаряды это не действует). Существа в газообразном облике не могут пройти сквозь стену.' }
      ]
    }
  ),
  spell(
    'elemental-weapon', 'Стихийное оружие', 3, 'transmutation',
    '1 действие', 'Касание', 'В, С', 'Концентрация, до 1 часа',
    ['concentration', 'support', 'damage'],
    'Немагическое оружие, которого вы касаетесь, становится магическим. Выберите вид урона: кислота, холод, огонь, электричество или звук. Пока действует заклинание, оружие даёт бонус +1 к броскам атаки и при попадании наносит дополнительно 1к4 урона выбранного вида.',
    {
      source: 'PHB',
      classes: ['Паладин', 'Изобретатель'],
      sections: [
        { title: 'На более высоких уровнях', text: 'Ячейкой 5-го или 6-го уровня бонус к броскам атаки становится +2, а дополнительный урон — 2к4. Ячейкой 7-го уровня и выше — +3 и 3к4.' }
      ]
    }
  ),
  spell(
    'fear', 'Ужас', 3, 'illusion',
    '1 действие', 'На себя (конус 30 фт.)', 'В, С, М (белое перо или сердце курицы)', 'Концентрация, до 1 минуты',
    ['concentration', 'control'],
    'Вы насылаете призрачный образ худших страхов существа. Каждое существо в 30-футовом конусе должно преуспеть в спасброске Мудрости, иначе роняет всё, что держит, и становится испуганным на время действия заклинания.',
    {
      source: 'PHB',
      classes: ['Бард', 'Волшебник', 'Чародей', 'Колдун'],
      sections: [
        { title: 'Бегство', text: 'Испуганное этим заклинанием существо в каждый свой ход должно совершать действие Рывок и уходить от вас самым безопасным доступным путём, если есть куда идти. Если существо заканчивает ход там, откуда вас не видно, оно может совершить спасбросок Мудрости; при успехе заклинание на нём заканчивается.' }
      ]
    }
  ),
  spell(
    'haste', 'Ускорение', 3, 'transmutation',
    '1 действие', '30 фт.', 'В, С, М (стружка корня лакрицы)', 'Концентрация, до 1 минуты',
    ['concentration', 'support'],
    'Выберите согласное существо, которое видите в пределах дистанции. Пока действует заклинание, скорость цели удваивается, она получает бонус +2 к КД, совершает с преимуществом спасброски Ловкости и в каждый свой ход получает дополнительное действие. Это действие можно потратить только на Атаку (лишь одну атаку оружием), Рывок, Отход, Засаду или Использование предмета.',
    {
      source: 'PHB',
      classes: ['Волшебник', 'Чародей', 'Изобретатель'],
      sections: [
        { title: 'Вялость', text: 'Когда заклинание заканчивается, цель не может перемещаться и совершать действия до конца своего следующего хода: её накрывает волна вялости.' }
      ]
    }
  ),
  spell(
    'water-walk', 'Хождение по воде', 3, 'transmutation',
    '1 действие', '30 фт.', 'В, С, М (кусочек пробки)', '1 час',
    ['ritual', 'support', 'utility'],
    'Заклинание позволяет передвигаться по любой жидкой поверхности — воде, кислоте, грязи, снегу, зыбучему песку или лаве — как по безопасной твёрдой земле (идущие по расплавленной лаве всё равно могут получать урон от жара). Эту способность на время действия заклинания получают до десяти согласных существ, которых вы видите в пределах дистанции. Если цель погружена в жидкость, заклинание поднимает её к поверхности со скоростью 60 футов за раунд.',
    {
      source: 'PHB',
      classes: ['Друид', 'Жрец', 'Следопыт', 'Чародей', 'Изобретатель']
    }
  ),
  spell(
    'tongues', 'Языки', 3, 'divination',
    '1 действие', 'Касание', 'В, М (маленькая глиняная модель зиккурата)', '1 час',
    ['utility'],
    'Заклинание даёт существу, которого вы касаетесь, способность понимать любую устную речь, которую оно слышит. Кроме того, когда цель говорит, любое существо, знающее хотя бы один язык и слышащее цель, понимает, что она говорит.',
    {
      source: 'PHB',
      classes: ['Бард', 'Волшебник', 'Жрец', 'Колдун', 'Чародей']
    }
  ),
  // ── Заклинания 4 уровня (базовые, PHB / XGE / TCE) ────────────────
  spell(
    'aura-of-life', 'Аура жизни', 4, 'abjuration',
    '1 действие', 'На себя (радиус 30 фт.)', 'В', 'Концентрация, до 10 минут',
    ['concentration', 'support', 'healing'],
    'От вас расходится аура жизненной силы радиусом 30 футов. Пока действует заклинание, аура движется вместе с вами, оставаясь с центром на вас. У каждого невраждебного существа в ауре (и у вас) есть сопротивление урону некротической энергией, и его максимум хитов не может уменьшиться. Кроме того, невраждебное живое существо, которое начинает ход в ауре с 0 хитов, восстанавливает 1 хит.',
    {
      source: 'PHB',
      classes: ['Паладин']
    }
  ),
  spell(
    'aura-of-purity', 'Аура очищения', 4, 'abjuration',
    '1 действие', 'На себя (радиус 30 фт.)', 'В', 'Концентрация, до 10 минут',
    ['concentration', 'support'],
    'От вас расходится очищающая аура радиусом 30 футов. Пока действует заклинание, аура движется вместе с вами, оставаясь с центром на вас. Каждое невраждебное существо в ауре (и вы) не может заболеть, получает сопротивление урону ядом и совершает с преимуществом спасброски от эффектов, которые делают его ослеплённым, очарованным, оглохшим, испуганным, парализованным, отравленным или ошеломлённым.',
    {
      source: 'PHB',
      classes: ['Паладин']
    }
  ),
  spell(
    'sickening-radiance', 'Болезненное сияние', 4, 'evocation',
    '1 действие', '120 фт.', 'В, С', 'Концентрация, до 10 минут',
    ['concentration', 'damage', 'control'],
    'В сфере радиусом 30 футов с центром в выбранной вами точке в пределах дистанции разливается тусклый зеленоватый свет. Он огибает углы и держится, пока заклинание не закончится.',
    {
      source: 'XGE',
      classes: ['Волшебник', 'Чародей', 'Колдун'],
      sections: [
        { title: 'Облучение', text: 'Когда существо впервые за ход входит в область заклинания или начинает в ней ход, оно должно преуспеть в спасброске Телосложения, иначе получает 4к10 урона излучением и одну степень истощения, а само начинает испускать тусклый зеленоватый свет в радиусе 5 футов. Пока существо светится, невидимость ему ничего не даёт.' },
        { title: 'Конец заклинания', text: 'Когда заклинание заканчивается, свечение пропадает, а все степени истощения, полученные от него, проходят.' }
      ]
    }
  ),
  spell(
    'mordenkainens-faithful-hound', 'Верный пёс Морденкайнена', 4, 'conjuration',
    '1 действие', '30 фт.', 'В, С, М (крошечный серебряный свисток, кусочек кости и нитка)', '8 часов',
    ['damage', 'utility'],
    'Вы призываете призрачного сторожевого пса в свободное пространство, которое видите в пределах дистанции. Он остаётся там, пока действует заклинание, пока вы действием не отпустите его или пока вы не отойдёте от него дальше чем на 100 футов.',
    {
      source: 'PHB',
      classes: ['Волшебник', 'Изобретатель'],
      sections: [
        { title: 'Сторож', text: 'Пёс невидим для всех существ, кроме вас, и ему нельзя причинить вред. Когда существо размера Маленький или больше приближается к нему на 30 футов, не назвав сперва пароль, который вы задаёте при сотворении, пёс начинает громко лаять. Пёс видит невидимых существ и видит Эфирный план. Иллюзии на него не действуют.' },
        { title: 'Укус', text: 'В начале каждого вашего хода пёс пытается укусить одно враждебное вам существо в пределах 5 футов от себя. Бонус атаки пса равен модификатору вашей заклинательной характеристики плюс ваш бонус мастерства. При попадании он наносит 4к8 колющего урона.' }
      ]
    }
  ),
  spell(
    'control-water', 'Власть над водами', 4, 'transmutation',
    '1 действие', '300 фт.', 'В, С, М (капля воды и щепотка пыли)', 'Концентрация, до 10 минут',
    ['concentration', 'control'],
    'Пока заклинание не закончится, вы управляете любой открытой водой в выбранной вами области — кубе со стороной до 100 футов. При сотворении выберите один из эффектов ниже. Действием в свой ход вы можете повторить тот же эффект или выбрать другой.',
    {
      source: 'PHB',
      classes: ['Жрец', 'Друид', 'Волшебник'],
      sections: [
        { title: 'Наводнение', text: 'Уровень всей стоячей воды в области поднимается на высоту до 20 футов. Если в области есть берег, вода выплёскивается на сушу. Если вы выбрали область в большом водоёме, вместо этого поднимается волна высотой 20 футов: она проходит от одного края области до другого и обрушивается. Транспорт размера Огромный и меньше на пути волны она уносит с собой к другому краю, и у каждого такого судна, в которое она ударила, 25-процентный шанс перевернуться. Вода остаётся поднятой, пока заклинание не закончится или пока вы не выберете другой эффект. Если этот эффект создал волну, она повторяется в начале вашего следующего хода, пока длится наводнение.' },
        { title: 'Разделение воды', text: 'Вода в области расступается, образуя траншею. Траншея пересекает всю область заклинания, а раздвинутая вода стоит стенами по обе её стороны. Траншея остаётся, пока заклинание не закончится или пока вы не выберете другой эффект. Затем в течение следующего раунда вода медленно заполняет траншею, пока не вернётся к обычному уровню.' },
        { title: 'Перенаправление течения', text: 'Текущая вода в области движется в выбранном вами направлении, даже если ей приходится течь через препятствия, вверх по стенам или в других невероятных направлениях. Вода в области движется так, как вы ей велите, но за пределами области снова течёт по рельефу местности. Вода продолжает двигаться в выбранном направлении, пока заклинание не закончится или пока вы не выберете другой эффект.' },
        { title: 'Водоворот', text: 'Для этого эффекта нужен водоём размером не меньше 50 на 50 футов и глубиной не меньше 25 футов. В центре области образуется водоворот — воронка шириной 5 футов у основания, до 50 футов вверху и высотой 25 футов. Каждое существо и каждый предмет в воде в пределах 25 футов от воронки притягивается на 10 футов к ней. Существо может отплыть от воронки, совершив проверку Силы (Атлетика) против СЛ спасброска ваших заклинаний.' },
        { title: 'В воронке', text: 'Когда существо впервые за ход входит в воронку или начинает в ней ход, оно совершает спасбросок Силы. При провале существо получает 2к8 дробящего урона и захвачено воронкой, пока заклинание не закончится. При успехе оно получает половину урона и не захвачено. Захваченное существо может действием попытаться отплыть от воронки, как описано выше, но совершает проверку Силы (Атлетика) с помехой. Когда предмет впервые за ход попадает в воронку, он получает 2к8 дробящего урона и получает его каждый раунд, пока остаётся в воронке.' }
      ]
    }
  ),
  spell(
    'watery-sphere', 'Водяная сфера', 4, 'conjuration',
    '1 действие', '90 фт.', 'В, С, М (капля воды)', 'Концентрация, до 1 минуты',
    ['concentration', 'control'],
    'Вы создаёте шар воды радиусом 5 футов в точке, которую видите в пределах дистанции. Шар может парить, но не выше 10 футов над землёй, и держится, пока действует заклинание.',
    {
      source: 'XGE',
      classes: ['Друид', 'Чародей', 'Волшебник', 'Изобретатель'],
      sections: [
        { title: 'Захват', text: 'Каждое существо в пространстве шара совершает спасбросок Силы. При успехе оно выталкивается в ближайшее свободное пространство вне шара на свой выбор. Существо размера Огромный и больше преуспевает автоматически, а существо размера Большой и меньше может провалить спасбросок по своему желанию. При провале существо опутано шаром и поглощено водой. В конце каждого своего хода опутанная цель может повторить спасбросок и при успехе освобождается.' },
        { title: 'Вместимость', text: 'Шар удерживает до четырёх существ размера Средний и меньше или одно существо размера Большой. Если шар опутывает существо сверх этого, одно случайное из уже опутанных выпадает из него и оказывается сбито с ног в пространстве в пределах 5 футов от шара.' },
        { title: 'Движение', text: 'Действием вы можете переместить шар по прямой на расстояние до 30 футов. Если он проходит над ямой, обрывом или другим перепадом высоты, то плавно опускается, пока не зависнет в 10 футах над землёй. Опутанные шаром существа движутся вместе с ним. Шаром можно наехать на существ — тогда они совершают спасбросок.' },
        { title: 'Конец заклинания', text: 'Когда заклинание заканчивается, шар падает на землю и гасит все обычные огни в пределах 30 футов от себя. Каждое опутанное им существо оказывается сбито с ног там, где упал шар. После этого вода исчезает.' }
      ]
    }
  ),
  spell(
    'phantasmal-killer', 'Воображаемый убийца', 4, 'illusion',
    '1 действие', '120 фт.', 'В, С', 'Концентрация, до 1 минуты',
    ['concentration', 'damage', 'control'],
    'Вы проникаете в кошмары существа, которое видите в пределах дистанции, и создаёте иллюзорное воплощение его глубочайших страхов, видимое только ему. Цель совершает спасбросок Мудрости. При провале она испугана, пока действует заклинание. В конце каждого хода цели, пока заклинание не закончилось, она должна преуспеть в спасброске Мудрости, иначе получает 4к10 урона психической энергией. При успехе заклинание заканчивается.',
    {
      source: 'PHB',
      classes: ['Волшебник', 'Чародей', 'Колдун'],
      sections: [
        { title: 'На более высоких уровнях', text: 'Урон увеличивается на 1к10 за каждый уровень ячейки выше 4-го.' }
      ]
    }
  ),
  spell(
    'conjure-woodland-beings', 'Вызов лесных обитателей', 4, 'conjuration',
    '1 действие', '60 фт.', 'В, С, М (одна остролистная ягода на каждое существо)', 'Концентрация, до 1 часа',
    ['concentration', 'support'],
    'Вы призываете фей, которые появляются в свободных пространствах, которые вы видите в пределах дистанции. Выберите, кто появится: одна фея с показателем опасности 2 или ниже; две феи с ПО 1 или ниже; четыре феи с ПО 1/2 или ниже; восемь фей с ПО 1/4 или ниже. Призванное существо исчезает, когда его хиты опускаются до 0 или когда заклинание заканчивается.',
    {
      source: 'PHB',
      classes: ['Друид', 'Следопыт'],
      sections: [
        { title: 'Призванные', text: 'Призванные существа дружелюбны к вам и вашим спутникам. Бросьте инициативу за призванных существ одной группой, у которой свои ходы. Они выполняют ваши устные команды (вам это действия не стоит). Если вы не отдаёте им команд, они защищаются от враждебных существ, а больше ничего не делают. Характеристики существ у Мастера.' },
        { title: 'На более высоких уровнях', text: 'Ячейкой более высокого уровня вы выбираете один из вариантов выше, и существ появляется больше: вдвое больше ячейкой 6-го уровня и втрое — ячейкой 8-го уровня.' }
      ]
    }
  ),
  spell(
    'conjure-minor-elementals', 'Вызов малых элементалей', 4, 'conjuration',
    '1 минута', '90 фт.', 'В, С', 'Концентрация, до 1 часа',
    ['concentration', 'support'],
    'Вы призываете элементалей, которые появляются в свободных пространствах, которые вы видите в пределах дистанции. Выберите, кто появится: один элементаль с показателем опасности 2 или ниже; два элементаля с ПО 1 или ниже; четыре элементаля с ПО 1/2 или ниже; восемь элементалей с ПО 1/4 или ниже. Призванный этим заклинанием элементаль исчезает, когда его хиты опускаются до 0 или когда заклинание заканчивается.',
    {
      source: 'PHB',
      classes: ['Друид', 'Волшебник'],
      sections: [
        { title: 'Призванные', text: 'Призванные существа дружелюбны к вам и вашим спутникам. Бросьте инициативу за призванных существ одной группой, у которой свои ходы. Они выполняют ваши устные команды (вам это действия не стоит). Если вы не отдаёте им команд, они защищаются от враждебных существ, а больше ничего не делают. Характеристики существ у Мастера.' },
        { title: 'На более высоких уровнях', text: 'Ячейкой более высокого уровня вы выбираете один из вариантов выше, и существ появляется больше: вдвое больше ячейкой 6-го уровня и втрое — ячейкой 8-го уровня.' }
      ]
    }
  ),
  spell(
    'greater-invisibility', 'Высшая невидимость', 4, 'illusion',
    '1 действие', 'Касание', 'В, С', 'Концентрация, до 1 минуты',
    ['concentration', 'support'],
    'Вы или существо, которого вы касаетесь, становитесь невидимы, пока заклинание не закончится. Всё, что цель носит или несёт, невидимо, пока остаётся при ней.',
    {
      source: 'PHB',
      classes: ['Бард', 'Волшебник', 'Чародей', 'Колдун']
    }
  ),
  spell(
    'giant-insect', 'Гигантское насекомое', 4, 'transmutation',
    '1 действие', '30 фт.', 'В, С', 'Концентрация, до 10 минут',
    ['concentration', 'support'],
    'Вы превращаете в пределах дистанции до десяти многоножек, трёх пауков, пяти ос или одного скорпиона в гигантские версии их естественного облика на время действия заклинания. Многоножка становится гигантской многоножкой, паук — гигантским пауком, оса — гигантской осой, скорпион — гигантским скорпионом.',
    {
      source: 'PHB',
      classes: ['Друид'],
      sections: [
        { title: 'Команды', text: 'Каждое существо выполняет ваши устные команды, а в бою действует в ваш ход каждый раунд. Характеристики этих существ у Мастера, и он же разрешает их действия и перемещение.' },
        { title: 'Сколько длится', text: 'Существо остаётся гигантским, пока действует заклинание, пока его хиты не опустятся до 0 или пока вы действием не окончите эффект на нём.' },
        { title: 'Другие насекомые', text: 'Мастер может разрешить выбрать другие цели. Например, превращённая пчела может получить характеристики гигантской осы.' }
      ]
    }
  ),
  spell(
    'ice-storm', 'Град', 4, 'evocation',
    '1 действие', '300 фт.', 'В, С, М (щепотка пыли и несколько капель воды)', 'Мгновенная',
    ['damage', 'control'],
    'Град твёрдого как камень льда обрушивается на землю в цилиндре радиусом 20 футов и высотой 40 футов с центром в точке в пределах дистанции. Каждое существо в цилиндре совершает спасбросок Ловкости и получает 2к8 дробящего урона и 4к6 урона холодом при провале или половину этого урона при успехе. Градины делают область заклинания труднопроходимой местностью до конца вашего следующего хода.',
    {
      source: 'PHB',
      classes: ['Волшебник', 'Друид', 'Чародей'],
      sections: [
        { title: 'На более высоких уровнях', text: 'Дробящий урон увеличивается на 1к8 за каждый уровень ячейки выше 4-го.' }
      ]
    }
  ),
  spell(
    'vitriolic-sphere', 'Едкий шар', 4, 'evocation',
    '1 действие', '150 фт.', 'В, С, М (капля желчи гигантского слизня)', 'Мгновенная',
    ['damage'],
    'Вы указываете на место в пределах дистанции, и туда устремляется светящийся шар изумрудной кислоты диаметром 1 фут, который взрывается сферой радиусом 20 футов. Каждое существо в этой области совершает спасбросок Ловкости. При провале существо получает 10к4 урона кислотой и ещё 5к4 урона кислотой в конце своего следующего хода. При успехе оно получает половину первоначального урона, а в конце своего следующего хода урона не получает.',
    {
      source: 'XGE',
      classes: ['Волшебник', 'Чародей'],
      sections: [
        { title: 'На более высоких уровнях', text: 'Первоначальный урон увеличивается на 2к4 за каждый уровень ячейки выше 4-го.' }
      ]
    }
  ),
  spell(
    'death-ward', 'Защита от смерти', 4, 'abjuration',
    '1 действие', 'Касание', 'В, С', '8 часов',
    ['support'],
    'Вы касаетесь существа и даруете ему защиту от смерти. Когда цель впервые должна опуститься до 0 хитов, получив урон, вместо этого её хиты опускаются до 1, и заклинание заканчивается. Если заклинание всё ещё действует, когда на цель обрушивается эффект, который мгновенно убил бы её, не нанося урона, этот эффект против цели не срабатывает, и заклинание заканчивается.',
    {
      source: 'PHB',
      classes: ['Жрец', 'Паладин']
    }
  ),
  spell(
    'banishment', 'Изгнание', 4, 'abjuration',
    '1 действие', '60 фт.', 'В, С, М (предмет, ненавистный цели)', 'Концентрация, до 1 минуты',
    ['concentration', 'control'],
    'Вы пытаетесь отправить на другой план существования одно существо, которое видите в пределах дистанции. Цель должна преуспеть в спасброске Харизмы, иначе она изгнана.',
    {
      source: 'PHB',
      classes: ['Жрец', 'Паладин', 'Волшебник', 'Чародей', 'Колдун'],
      sections: [
        { title: 'Существо этого плана', text: 'Если цель родом с того плана существования, на котором вы находитесь, вы изгоняете её на безвредный полуплан. Там цель недееспособна. Она остаётся там, пока заклинание не закончится, а затем появляется в пространстве, которое покинула, или в ближайшем свободном пространстве, если то занято.' },
        { title: 'Существо другого плана', text: 'Если цель родом с другого плана существования, она с тихим хлопком изгоняется и возвращается на свой родной план. Если заклинание закончится раньше, чем пройдёт 1 минута, цель появляется в пространстве, которое покинула, или в ближайшем свободном, если то занято. Иначе цель не возвращается.' },
        { title: 'На более высоких уровнях', text: 'Ячейкой 5-го уровня или выше вы можете выбрать целью ещё одно существо за каждый уровень ячейки выше 4-го.' }
      ]
    }
  ),
  spell(
    'fabricate', 'Изготовление', 4, 'transmutation',
    '10 минут', '120 фт.', 'В, С', 'Мгновенная',
    ['utility'],
    'Вы превращаете сырьё в изделия из того же материала. Например, вы можете сделать деревянный мост из рощицы деревьев, верёвку из охапки конопли и одежду изо льна или шерсти.',
    {
      source: 'PHB',
      classes: ['Волшебник', 'Изобретатель'],
      sections: [
        { title: 'Размер', text: 'Выберите сырьё, которое вы видите в пределах дистанции. При достаточном количестве сырья вы можете изготовить предмет размера Большой или меньше (умещающийся в кубе со стороной 10 футов или в восьми соединённых кубах со стороной 5 футов). Если же вы работаете с металлом, камнем или другим минералом, изделие может быть не больше Среднего (умещается в одном кубе со стороной 5 футов). Качество изделий соответствует качеству сырья.' },
        { title: 'Ограничения', text: 'Этим заклинанием нельзя создавать или преобразовывать существ и магические предметы. Им также нельзя создавать вещи, для которых обычно нужно высокое мастерство, — например, украшения, оружие, стекло или доспехи, — если только вы не владеете тем видом инструментов ремесленника, которым такие вещи делают.' }
      ]
    }
  ),
  spell(
    'stone-shape', 'Изменение формы камня', 4, 'transmutation',
    '1 действие', 'Касание', 'В, С, М (мягкая глина, которой придают желаемую форму)', 'Мгновенная',
    ['utility'],
    'Вы касаетесь каменного предмета размера Средний или меньше либо участка камня не больше 5 футов в любом измерении и придаёте ему любую нужную вам форму. Например, можно превратить большой валун в оружие, идола или ларец или проделать небольшой проход в стене толщиной меньше 5 футов. Можно также изменить каменную дверь или её раму так, чтобы дверь оказалась запечатана. Созданный предмет может иметь до двух петель и защёлку, но более тонкая механика невозможна.',
    {
      source: 'PHB',
      classes: ['Волшебник', 'Друид', 'Жрец', 'Изобретатель']
    }
  ),
  spell(
    'mordenkainens-private-sanctum', 'Кабинет Морденкайнена', 4, 'abjuration',
    '10 минут', '120 фт.', 'В, С, М (свинцовый лист, матовое стекло, вата или ткань и толчёный хризолит)', '24 часа',
    ['utility'],
    'Вы делаете область в пределах дистанции магически защищённой. Область — куб со стороной от 5 до 100 футов. Заклинание действует всю длительность или пока вы не окончите его действием.',
    {
      source: 'PHB',
      classes: ['Волшебник', 'Изобретатель'],
      sections: [
        { title: 'Защита', text: 'При сотворении вы решаете, какую защиту даёт заклинание, выбирая любые из этих свойств или все сразу. Звук не проходит через преграду на границе защищённой области. Преграда выглядит тёмной и туманной и не даёт видеть сквозь неё (в том числе тёмным зрением). Сенсоры заклинаний прорицания не могут появиться внутри области или пройти через преграду на её границе. Существа в области нельзя выбрать целью заклинаний прорицания. Ничто не может телепортироваться в защищённую область или из неё. Внутри защищённой области невозможны путешествия между планами.' },
        { title: 'Навсегда', text: 'Если творить это заклинание на одном и том же месте каждый день в течение года, эффект становится постоянным.' },
        { title: 'На более высоких уровнях', text: 'Ячейкой 5-го уровня или выше вы можете увеличить сторону куба на 100 футов за каждый уровень ячейки выше 4-го. Так, ячейкой 5-го уровня можно защитить куб со стороной до 200 футов.' }
      ]
    }
  ),
  spell(
    'stoneskin', 'Каменная кожа', 4, 'abjuration',
    '1 действие', 'Касание', 'В, С, М (алмазная пыль стоимостью 100 с.м., расходуется)', 'Концентрация, до 1 часа',
    ['concentration', 'support'],
    'Заклинание делает плоть согласного существа, которого вы касаетесь, твёрдой как камень. Пока заклинание не закончится, у цели есть сопротивление немагическому дробящему, колющему и рубящему урону.',
    {
      source: 'PHB',
      classes: ['Друид', 'Следопыт', 'Волшебник', 'Чародей', 'Изобретатель']
    }
  ),
  spell(
    'leomunds-secret-chest', 'Леомундов потайной сундук', 4, 'conjuration',
    '1 действие', 'Касание', 'В, С, М (изысканный сундук 3 × 2 × 2 фута из редких материалов стоимостью не менее 5000 с.м. и его крошечная копия из тех же материалов стоимостью не менее 50 с.м.)', 'Мгновенная',
    ['utility'],
    'Вы прячете сундук со всем его содержимым на Эфирном плане. Для этого нужно коснуться сундука и его миниатюрной копии, которая служит материальным компонентом. В сундуке помещается до 12 кубических футов неживого материала (3 × 2 × 2 фута).',
    {
      source: 'PHB',
      classes: ['Волшебник', 'Изобретатель'],
      sections: [
        { title: 'Призыв и возврат', text: 'Пока сундук на Эфирном плане, вы можете действием коснуться копии, чтобы вызвать сундук. Он появляется в свободном пространстве на земле в пределах 5 футов от вас. Отправить сундук обратно на Эфирный план можно действием, коснувшись и сундука, и копии.' },
        { title: 'Конец заклинания', text: 'Через 60 дней появляется накопительный шанс 5 процентов в день, что эффект заклинания закончится. Эффект заканчивается и тогда, когда вы снова творите это заклинание, когда маленькая копия сундука уничтожена или когда вы действием решаете окончить заклинание. Если заклинание закончилось, а большой сундук на Эфирном плане, он потерян безвозвратно.' }
      ]
    }
  ),
  spell(
    'arcane-eye', 'Магический глаз', 4, 'divination',
    '1 действие', '30 фт.', 'В, С, М (кусочек шерсти летучей мыши)', 'Концентрация, до 1 часа',
    ['concentration', 'utility'],
    'Вы создаёте в пределах дистанции невидимый магический глаз, который парит в воздухе, пока действует заклинание. Вы мысленно получаете от глаза зрительные образы; у глаза обычное зрение и тёмное зрение на 30 футов. Глаз может смотреть во все стороны.',
    {
      source: 'PHB',
      classes: ['Волшебник', 'Изобретатель'],
      sections: [
        { title: 'Перемещение', text: 'Действием вы можете переместить глаз на расстояние до 30 футов в любом направлении. Глаз может удаляться от вас сколь угодно далеко, но не может попасть на другой план существования. Сплошная преграда не пускает глаз дальше, но он проходит через отверстие диаметром от 1 дюйма.' }
      ]
    }
  ),
  spell(
    'hallucinatory-terrain', 'Мираж', 4, 'illusion',
    '10 минут', '300 фт.', 'В, С, М (камень, ветка и кусочек зелёного растения)', '24 часа',
    ['control', 'utility'],
    'Вы делаете так, что природная местность в кубе со стороной 150 футов в пределах дистанции выглядит, звучит и пахнет как местность другого рода. Так, открытое поле или дорогу можно сделать похожими на болото, холм, расселину или другую труднопроходимую или непроходимую местность. Пруд можно превратить с виду в травянистый луг, обрыв — в пологий склон, а усыпанный камнями овраг — в широкую ровную дорогу. Постройки, снаряжение и существа в области свой вид не меняют.',
    {
      source: 'PHB',
      classes: ['Бард', 'Волшебник', 'Друид', 'Колдун'],
      sections: [
        { title: 'Разоблачение', text: 'На ощупь местность остаётся прежней, поэтому существа, вошедшие в область, скорее всего, распознают иллюзию. Если на ощупь разница не очевидна, существо, внимательно изучающее иллюзию, может совершить проверку Интеллекта (Анализ) против СЛ спасброска ваших заклинаний, чтобы не поверить ей. Существо, распознавшее иллюзию, видит её как смутный образ поверх настоящей местности.' }
      ]
    }
  ),
  spell(
    'shadow-of-moil', 'Облачение тени', 4, 'necromancy',
    '1 действие', 'На себя', 'В, С, М (глаз нежити, заключённый в самоцвет стоимостью не менее 150 с.м.)', 'Концентрация, до 1 минуты',
    ['concentration', 'damage', 'support'],
    'Пока заклинание не закончится, ваше тело окутывают тени, похожие на языки пламени, и для других вы сильно заслонены. Тени превращают тусклый свет в пределах 10 футов от вас во тьму, а яркий свет там же — в тусклый.',
    {
      source: 'XGE',
      classes: ['Колдун'],
      sections: [
        { title: 'Защита', text: 'Пока заклинание не закончится, у вас есть сопротивление урону излучением. Кроме того, каждый раз, когда существо в пределах 10 футов от вас попадает по вам атакой, тени хлещут его и наносят ему 2к8 урона некротической энергией.' }
      ]
    }
  ),
  spell(
    'staggering-smite', 'Оглушающая кара', 4, 'evocation',
    '1 бонусное действие', 'На себя', 'В', 'Концентрация, до 1 минуты',
    ['concentration', 'damage', 'control'],
    'Пока действует заклинание, в следующий раз, когда вы попадаете по существу рукопашной атакой оружием, ваше оружие ранит и тело, и разум: атака наносит цели дополнительно 4к6 урона психической энергией. Цель совершает спасбросок Мудрости. При провале до конца своего следующего хода она совершает с помехой броски атаки и проверки характеристик и не может совершать реакции.',
    {
      source: 'PHB',
      classes: ['Паладин']
    }
  ),
  spell(
    'wall-of-fire', 'Огненная стена', 4, 'evocation',
    '1 действие', '120 фт.', 'В, С, М (кусочек фосфора)', 'Концентрация, до 1 минуты',
    ['concentration', 'damage', 'control'],
    'Вы создаёте стену огня на твёрдой поверхности в пределах дистанции. Стена может быть прямой — длиной до 60 футов, высотой до 20 футов и толщиной 1 фут — или кольцом диаметром до 20 футов, высотой до 20 футов и толщиной 1 фут. Стена непрозрачна и существует, пока действует заклинание.',
    {
      source: 'PHB',
      classes: ['Друид', 'Волшебник', 'Чародей', 'Колдун', 'Изобретатель'],
      sections: [
        { title: 'Появление', text: 'Когда стена появляется, каждое существо в её области совершает спасбросок Ловкости и получает 5к8 урона огнём при провале или половину этого урона при успехе.' },
        { title: 'Жгучая сторона', text: 'Одна сторона стены, которую вы выбираете при сотворении, наносит 5к8 урона огнём каждому существу, которое заканчивает ход в пределах 10 футов от этой стороны или внутри стены. Такой же урон существо получает, когда впервые за ход входит в стену или заканчивает в ней ход. Другая сторона стены урона не наносит.' },
        { title: 'На более высоких уровнях', text: 'Урон увеличивается на 1к8 за каждый уровень ячейки выше 4-го.' }
      ]
    }
  ),
  spell(
    'fire-shield', 'Огненный щит', 4, 'evocation',
    '1 действие', 'На себя', 'В, С, М (кусочек фосфора или светлячок)', '10 минут',
    ['damage', 'support'],
    'Пока действует заклинание, ваше тело окутывают тонкие струйки пламени, излучая яркий свет в радиусе 10 футов и тусклый свет ещё на 10 футов. Вы можете окончить заклинание досрочно, отпустив его действием.',
    {
      source: 'PHB',
      classes: ['Волшебник', 'Друид', 'Чародей'],
      sections: [
        { title: 'Тёплый или холодный', text: 'Пламя даёт вам тёплый или холодный щит — на ваш выбор. Тёплый щит даёт сопротивление урону холодом, а холодный — урону огнём.' },
        { title: 'Ответный удар', text: 'Кроме того, каждый раз, когда существо в пределах 5 футов от вас попадает по вам рукопашной атакой, из щита вырывается пламя. Атакующий получает 2к8 урона огнём от тёплого щита или 2к8 урона холодом от холодного.' }
      ]
    }
  ),
  spell(
    'otilukes-resilient-sphere', 'Отилюков упругий шар', 4, 'evocation',
    '1 действие', '30 фт.', 'В, С, М (полусфера из хрусталя и полусфера из гуммиарабика)', 'Концентрация, до 1 минуты',
    ['concentration', 'control'],
    'Сфера мерцающего силового поля заключает в себя существо или предмет размера Большой или меньше в пределах дистанции. Несогласное существо совершает спасбросок Ловкости. При провале оно заключено в сферу, пока действует заклинание.',
    {
      source: 'PHB',
      classes: ['Волшебник', 'Изобретатель'],
      sections: [
        { title: 'Преграда', text: 'Ничто — ни физические предметы, ни энергия, ни эффекты других заклинаний — не может пройти сквозь преграду ни внутрь, ни наружу, хотя дышать внутри сферы можно. Сфера невосприимчива к любому урону. Существу или предмету внутри нельзя причинить урон атаками или эффектами снаружи, а существо внутри не может причинить урон ничему снаружи.' },
        { title: 'Катить и нести', text: 'Сфера ничего не весит и ровно такого размера, чтобы вместить того, кто или что внутри. Заключённое существо может действием толкать стенки сферы и так катить её со скоростью до половины своей. Точно так же другие существа могут поднять сферу и перенести.' },
        { title: 'Распад', text: 'Заклинание распада, нацеленное на сферу, уничтожает её, не причиняя вреда тому, что внутри.' }
      ]
    }
  ),
  spell(
    'charm-monster', 'Очарование монстра', 4, 'enchantment',
    '1 действие', '30 фт.', 'В, С', '1 час',
    ['control'],
    'Вы пытаетесь очаровать существо, которое видите в пределах дистанции. Оно совершает спасбросок Мудрости — с преимуществом, если вы или ваши спутники сражаетесь с ним. При провале существо очаровано вами, пока заклинание не закончится или пока вы или ваши спутники не причините ему какой-либо вред. Очарованное существо дружелюбно к вам. Когда заклинание заканчивается, существо знает, что вы его очаровали.',
    {
      source: 'XGE',
      classes: ['Бард', 'Волшебник', 'Друид', 'Колдун', 'Чародей'],
      sections: [
        { title: 'На более высоких уровнях', text: 'Ячейкой 5-го уровня или выше вы можете выбрать целью ещё одно существо за каждый уровень ячейки выше 4-го. Когда вы выбираете их целями, они должны быть в пределах 30 футов друг от друга.' }
      ]
    }
  ),
  spell(
    'dimension-door', 'Переносящая дверь', 4, 'conjuration',
    '1 действие', '500 фт.', 'В', 'Мгновенная',
    ['utility'],
    'Вы телепортируетесь с того места, где находитесь, в любую другую точку в пределах дистанции и оказываетесь ровно там, где хотели. Это может быть место, которое вы видите, которое можете представить или которое можете описать, назвав расстояние и направление, — например, «200 футов прямо вниз» или «вверх на северо-запад под углом 45 градусов, 300 футов».',
    {
      source: 'PHB',
      classes: ['Бард', 'Волшебник', 'Колдун', 'Чародей'],
      sections: [
        { title: 'Попутчики и груз', text: 'Вы можете взять с собой предметы, если их вес не превышает того, что вы можете нести. Вы также можете взять с собой одно согласное существо вашего размера или меньше, которое несёт снаряжение не тяжелее своей грузоподъёмности. При сотворении заклинания это существо должно быть в пределах 5 футов от вас.' },
        { title: 'Занятое место', text: 'Если вы должны оказаться в месте, уже занятом предметом или существом, вы и каждое существо, перемещающееся с вами, получаете по 4к6 урона силовым полем, а телепортация не происходит.' }
      ]
    }
  ),
  spell(
    'dominate-beast', 'Подчинение зверя', 4, 'enchantment',
    '1 действие', '60 фт.', 'В, С', 'Концентрация, до 1 минуты',
    ['concentration', 'control'],
    'Вы пытаетесь подчинить зверя, которого видите в пределах дистанции. Он должен преуспеть в спасброске Мудрости, иначе очарован вами, пока действует заклинание. Если вы или дружественные вам существа сражаетесь с ним, он совершает спасбросок с преимуществом.',
    {
      source: 'PHB',
      classes: ['Друид', 'Чародей'],
      sections: [
        { title: 'Команды', text: 'Пока зверь очарован, у вас с ним телепатическая связь, если вы оба на одном плане существования. Пока вы в сознании, вы можете через эту связь отдавать существу команды (действия это не требует), и оно старается их выполнить. Можно указать простой и общий образ действий, например «Атакуй это существо», «Беги туда» или «Принеси этот предмет». Если существо выполнило приказ и больше указаний от вас не получило, оно защищается и бережёт себя как может.' },
        { title: 'Полный контроль', text: 'Действием вы можете взять цель под полный и точный контроль. До конца вашего следующего хода существо совершает только выбранные вами действия и не делает ничего, что вы не разрешаете. В это время вы также можете заставить существо совершить реакцию, но для этого вам нужно потратить и свою реакцию.' },
        { title: 'Урон', text: 'Каждый раз, когда цель получает урон, она совершает новый спасбросок Мудрости против заклинания. При успехе заклинание заканчивается.' },
        { title: 'На более высоких уровнях', text: 'Ячейкой 5-го уровня длительность — концентрация, вплоть до 10 минут; ячейкой 6-го уровня — концентрация, вплоть до 1 часа; ячейкой 7-го уровня или выше — концентрация, вплоть до 8 часов.' }
      ]
    }
  ),
  spell(
    'find-greater-steed', 'Поиск высшего скакуна', 4, 'conjuration',
    '10 минут', '30 фт.', 'В, С', 'Мгновенная',
    ['support', 'utility'],
    'Вы призываете духа, который принимает облик верного и величественного скакуна. Он появляется в свободном пространстве в пределах дистанции в выбранном вами облике: грифона, пегаса, перитона, лютого волка, носорога или саблезубого тигра. У скакуна характеристики выбранного облика, но вместо своего обычного вида он небожитель, фея или исчадие (на ваш выбор). Кроме того, если Интеллект скакуна 5 или ниже, он становится 6, и скакун начинает понимать один выбранный вами язык, на котором вы говорите.',
    {
      source: 'XGE',
      classes: ['Паладин'],
      sections: [
        { title: 'Верховой зверь', text: 'В бою скакуном управляете вы. Пока он в пределах 1 мили от вас, вы можете общаться с ним телепатически. Сидя верхом на скакуне, вы можете сделать так, чтобы любое ваше заклинание, нацеленное только на вас, нацеливалось и на скакуна.' },
        { title: 'Исчезновение и возвращение', text: 'Когда хиты скакуна опускаются до 0 или когда вы действием отпускаете его, он на время исчезает. Повторное сотворение заклинания вновь призывает связанного с вами скакуна с полными хитами и без каких-либо состояний. Исчезая, скакун оставляет все предметы, которые носил или нёс.' },
        { title: 'Один скакун', text: 'Одновременно у вас может быть только один скакун, связанный этим заклинанием или заклинанием «Поиск скакуна». Действием вы можете освободить скакуна от связи, и он исчезнет навсегда.' }
      ]
    }
  ),
  spell(
    'locate-creature', 'Поиск существа', 4, 'divination',
    '1 действие', 'На себя', 'В, С, М (клок шерсти ищейки)', 'Концентрация, до 1 часа',
    ['concentration', 'utility'],
    'Опишите или назовите знакомое вам существо. Вы чувствуете, в какой стороне оно находится, если оно в пределах 1000 футов от вас. Если существо движется, вы знаете направление его движения.',
    {
      source: 'PHB',
      classes: ['Бард', 'Жрец', 'Друид', 'Паладин', 'Следопыт', 'Волшебник'],
      sections: [
        { title: 'Кого можно найти', text: 'Заклинание может найти определённое известное вам существо или ближайшее существо определённого вида (например, человека или единорога), если вы хотя бы раз видели такое существо вблизи — в пределах 30 футов. Если описанное или названное существо находится в другом облике — например, под действием заклинания превращения, — заклинание его не находит.' },
        { title: 'Преграда', text: 'Заклинание не может найти существо, если прямой путь между вами и ним перегораживает текущая вода шириной не меньше 10 футов.' }
      ]
    }
  ),
  spell(
    'polymorph', 'Превращение', 4, 'transmutation',
    '1 действие', '60 фт.', 'В, С, М (кокон гусеницы)', 'Концентрация, до 1 часа',
    ['concentration', 'control'],
    'Заклинание придаёт новый облик существу, которое вы видите в пределах дистанции. Несогласное существо совершает спасбросок Мудрости, чтобы избежать эффекта. На перевёртыша и на существо с 0 хитов заклинание не действует.',
    {
      source: 'PHB',
      classes: ['Бард', 'Друид', 'Волшебник', 'Чародей'],
      sections: [
        { title: 'Сколько длится', text: 'Превращение длится, пока действует заклинание, или пока хиты цели не опустятся до 0, или пока она не умрёт.' },
        { title: 'Новый облик', text: 'Облик — любой зверь, чей показатель опасности не выше, чем у цели (или не выше её уровня, если показателя опасности у цели нет). Игровые параметры цели, включая значения ментальных характеристик, заменяются параметрами выбранного зверя. У цели остаются только мировоззрение и личность.' },
        { title: 'Хиты', text: 'Цель получает хиты нового облика. Вернувшись в обычный облик, она снова имеет столько хитов, сколько было до превращения. Если она вернулась потому, что хиты нового облика опустились до 0, лишний урон переносится на обычный облик; если он не опускает хиты обычного облика до 0, существо не теряет сознание.' },
        { title: 'Что нельзя', text: 'В новом облике существо может совершать только те действия, которые этот облик позволяет: оно не может говорить, творить заклинания и делать что-либо, для чего нужны руки или речь.' },
        { title: 'Снаряжение', text: 'Снаряжение цели сливается с новым обликом. Существо не может активировать, использовать, держать своё снаряжение или иначе получать от него пользу.' }
      ]
    }
  ),
  spell(
    'divination', 'Предсказание', 4, 'divination',
    '1 действие', 'На себя', 'В, С, М (благовония и жертвенное подношение стоимостью не менее 25 с.м., расходуются)', 'Мгновенная',
    ['ritual', 'utility'],
    'Ваша магия и подношение связывают вас с богом или его слугами. Вы задаёте один вопрос об определённой цели, событии или деле, которое должно произойти в ближайшие 7 дней. Мастер даёт правдивый ответ — короткую фразу, загадочное стихотворение или знамение.',
    {
      source: 'PHB',
      classes: ['Волшебник', 'Друид', 'Жрец'],
      sections: [
        { title: 'Пределы', text: 'Заклинание не учитывает обстоятельств, которые могут изменить исход, — например, сотворения других заклинаний, потери или появления спутника.' },
        { title: 'Повторное гадание', text: 'Если вы творите заклинание два раза или больше до окончания следующего продолжительного отдыха, то за каждое сотворение после первого есть накопительный шанс 25 процентов получить случайный ответ. Этот бросок Мастер делает тайно.' }
      ]
    }
  ),
  spell(
    'summon-greater-demon', 'Призыв высшего демона', 4, 'conjuration',
    '1 действие', '60 фт.', 'В, С, М (сосуд с кровью гуманоида, убитого за последние сутки)', 'Концентрация, до 1 часа',
    ['concentration', 'support'],
    'Вы произносите нечестивые слова и призываете из хаоса Бездны одного демона. Вид демона выбираете вы — с показателем опасности 5 или ниже, например теневого демона или барлгуру. Демон появляется в свободном пространстве, которое вы видите в пределах дистанции, и исчезает, когда его хиты опускаются до 0 или когда заклинание заканчивается.',
    {
      source: 'XGE',
      classes: ['Волшебник', 'Колдун'],
      sections: [
        { title: 'Команды', text: 'Бросьте инициативу за демона: у него свои ходы. Когда вы его призываете и в каждый свой ход после этого, вы можете отдать ему устную команду (вам это действия не стоит) — что ему сделать в его следующий ход. Если команды нет, демон тратит ход на атаки по любому существу в пределах досягаемости, которое атаковало его.' },
        { title: 'Удержание', text: 'В конце каждого своего хода демон совершает спасбросок Харизмы — с помехой, если вы произнесли его истинное имя. При провале он продолжает вам подчиняться. При успехе вы теряете контроль над демоном до конца длительности, и он тратит ходы на то, чтобы преследовать и атаковать ближайших существ, которые не являются демонами. Если вы прекращаете концентрироваться на заклинании раньше, чем истечёт его полная длительность, вышедший из-под контроля демон, у которого остались хиты, исчезает не сразу, а через 1к6 раундов.' },
        { title: 'Круг крови', text: 'При сотворении вы можете начертить на земле круг кровью, которая служит материальным компонентом. Круг достаточно велик, чтобы вместить ваше пространство. Пока действует заклинание, призванный демон не может пересечь круг, повредить его или выбрать целью кого-либо внутри. Использованная так кровь расходуется, когда заклинание заканчивается.' },
        { title: 'На более высоких уровнях', text: 'Показатель опасности демона увеличивается на 1 за каждый уровень ячейки выше 4-го.' }
      ]
    }
  ),
  spell(
    'summon-aberration', 'Призыв духа аберрации', 4, 'conjuration',
    '1 действие', '90 фт.', 'В, С, М (маринованное щупальце и глаз во флаконе с платиновой инкрустацией стоимостью не менее 400 с.м.)', 'Концентрация, до 1 часа',
    ['concentration', 'support'],
    'Вы призываете духа аберрации. Он принимает телесный облик в свободном пространстве, которое вы видите в пределах дистанции, и использует блок статистики «Дух аберрации». При сотворении выберите облик: сородич созерцателя, слаад или звёздное отродье. Дух похож на аберрацию этого рода, и от выбора зависят некоторые черты в его блоке статистики. Существо исчезает, когда его хиты опускаются до 0 или когда заклинание заканчивается.',
    {
      source: 'TCE',
      classes: ['Волшебник', 'Колдун', 'Изобретатель'],
      sections: [
        { title: 'В бою', text: 'Дух — союзник вам и вашим спутникам. В бою он действует на вашей инициативе, но свой ход совершает сразу после вашего. Он подчиняется вашим устным командам (вам это действия не стоит). Если вы ничего не приказываете, он совершает действие Уклонение и перемещается, чтобы избегать опасности.' },
        { title: 'На более высоких уровнях', text: 'Уровень заклинания в блоке статистики считается равным уровню использованной ячейки.' }
      ]
    }
  ),
  spell(
    'summon-construct', 'Призыв духа конструкта', 4, 'conjuration',
    '1 действие', '90 фт.', 'В, С, М (богато украшенный ларец из камня и металла с замком стоимостью не менее 400 с.м.)', 'Концентрация, до 1 часа',
    ['concentration', 'support'],
    'Вы призываете духа конструкта. Он принимает телесный облик в свободном пространстве, которое вы видите в пределах дистанции, и использует блок статистики «Дух конструкта». При сотворении выберите материал: глина, металл или камень. Дух похож на голема или модрона (на ваш выбор) из этого материала, и от выбора зависят некоторые черты в его блоке статистики. Существо исчезает, когда его хиты опускаются до 0 или когда заклинание заканчивается.',
    {
      source: 'TCE',
      classes: ['Волшебник', 'Изобретатель'],
      sections: [
        { title: 'В бою', text: 'Дух — союзник вам и вашим спутникам. В бою он действует на вашей инициативе, но свой ход совершает сразу после вашего. Он подчиняется вашим устным командам (вам это действия не стоит). Если вы ничего не приказываете, он совершает действие Уклонение и перемещается, чтобы избегать опасности.' },
        { title: 'На более высоких уровнях', text: 'Уровень заклинания в блоке статистики считается равным уровню использованной ячейки.' }
      ]
    }
  ),
  spell(
    'summon-elemental', 'Призыв духа элементалей', 4, 'conjuration',
    '1 действие', '90 фт.', 'В, С, М (воздух, камешек, пепел и вода во флаконе с золотой инкрустацией стоимостью не менее 400 с.м.)', 'Концентрация, до 1 часа',
    ['concentration', 'support'],
    'Вы призываете духа стихии. Он принимает телесный облик в свободном пространстве, которое вы видите в пределах дистанции, и использует блок статистики «Дух стихии». При сотворении выберите стихию: воздух, земля, огонь или вода. Дух похож на двуногое существо, окутанное этой стихией, и от выбора зависят некоторые черты в его блоке статистики. Существо исчезает, когда его хиты опускаются до 0 или когда заклинание заканчивается.',
    {
      source: 'TCE',
      classes: ['Друид', 'Следопыт', 'Волшебник', 'Изобретатель'],
      sections: [
        { title: 'В бою', text: 'Дух — союзник вам и вашим спутникам. В бою он действует на вашей инициативе, но свой ход совершает сразу после вашего. Он подчиняется вашим устным командам (вам это действия не стоит). Если вы ничего не приказываете, он совершает действие Уклонение и перемещается, чтобы избегать опасности.' },
        { title: 'На более высоких уровнях', text: 'Уровень заклинания в блоке статистики считается равным уровню использованной ячейки.' }
      ]
    }
  ),
  spell(
    'compulsion', 'Принуждение', 4, 'enchantment',
    '1 действие', '30 фт.', 'В, С', 'Концентрация, до 1 минуты',
    ['concentration', 'control'],
    'Существа на ваш выбор, которых вы видите в пределах дистанции и которые слышат вас, совершают спасбросок Мудрости. Цель, которую нельзя очаровать, преуспевает в этом спасброске автоматически. При провале цель попадает под действие заклинания.',
    {
      source: 'PHB',
      classes: ['Бард'],
      sections: [
        { title: 'Направление', text: 'Пока заклинание не закончится, в каждый свой ход вы можете бонусным действием указать направление в горизонтальной плоскости. Каждая подвластная заклинанию цель в свой следующий ход должна потратить как можно больше перемещения, чтобы двигаться в этом направлении. Своё действие она может совершить до перемещения. Переместившись так, цель может снова совершить спасбросок Мудрости, чтобы попытаться окончить эффект.' },
        { title: 'Опасности', text: 'Цель не обязана входить в явно смертельную опасность, например в огонь или в яму, но ради движения в указанном направлении будет провоцировать атаки по возможности.' }
      ]
    }
  ),
  spell(
    'elemental-bane', 'Проклятье стихий', 4, 'transmutation',
    '1 действие', '90 фт.', 'В, С', 'Концентрация, до 1 минуты',
    ['concentration', 'control'],
    'Выберите одно существо, которое вы видите в пределах дистанции, и один вид урона: кислота, холод, огонь, электричество или звук. Цель должна преуспеть в спасброске Телосложения, иначе подвержена заклинанию на всю его длительность. Когда подверженная цель впервые за ход получает урон выбранного вида, она получает дополнительно 2к6 урона этого вида. Кроме того, пока заклинание не закончится, цель теряет сопротивление к этому виду урона.',
    {
      source: 'XGE',
      classes: ['Друид', 'Волшебник', 'Чародей', 'Колдун', 'Изобретатель'],
      sections: [
        { title: 'На более высоких уровнях', text: 'Ячейкой 5-го уровня или выше вы можете выбрать целью ещё одно существо за каждый уровень ячейки выше 4-го. Когда вы выбираете их целями, они должны быть в пределах 30 футов друг от друга.' }
      ]
    }
  ),
  spell(
    'freedom-of-movement', 'Свобода перемещения', 4, 'abjuration',
    '1 действие', 'Касание', 'В, С, М (кожаный ремешок, обмотанный вокруг конечности)', '1 час',
    ['support'],
    'Вы касаетесь согласного существа. Пока действует заклинание, труднопроходимая местность не мешает его перемещению, а заклинания и другие магические эффекты не могут ни уменьшить его скорость, ни сделать его парализованным или опутанным. Цель также может потратить 5 футов перемещения, чтобы автоматически освободиться от немагических пут — например, кандалов или схватившего её существа. Наконец, под водой цель перемещается и атакует без штрафов.',
    {
      source: 'PHB',
      classes: ['Бард', 'Друид', 'Жрец', 'Следопыт', 'Изобретатель']
    }
  ),
  spell(
    'confusion', 'Смятение', 4, 'enchantment',
    '1 действие', '90 фт.', 'В, С, М (три ореховые скорлупки)', 'Концентрация, до 1 минуты',
    ['concentration', 'control'],
    'Заклинание атакует и искажает разум существ, порождая бред и толкая на неподвластные им поступки. Каждое существо в сфере радиусом 10 футов с центром в выбранной вами точке в пределах дистанции при сотворении заклинания должно преуспеть в спасброске Мудрости, иначе оно попадает под действие заклинания.',
    {
      source: 'PHB',
      classes: ['Бард', 'Друид', 'Волшебник', 'Чародей'],
      sections: [
        { title: 'Поведение', text: 'Подвластная заклинанию цель не может совершать реакции и в начале каждого своего хода бросает к10, чтобы узнать, как она ведёт себя в этот ход.' },
        { title: 'Выпало 1', text: 'Существо тратит всё своё перемещение, чтобы двигаться в случайном направлении. Чтобы определить направление, бросьте к8, заранее назначив направление каждой грани. В этот ход существо не совершает действие.' },
        { title: 'Выпало 2–6', text: 'В этот ход существо не перемещается и не совершает действий.' },
        { title: 'Выпало 7–8', text: 'Существо действием совершает рукопашную атаку по случайно выбранному существу в пределах своей досягаемости. Если в пределах досягаемости никого нет, в этот ход существо ничего не делает.' },
        { title: 'Выпало 9–10', text: 'Существо может действовать и перемещаться как обычно.' },
        { title: 'Конец эффекта', text: 'В конце каждого своего хода подвластная заклинанию цель может совершить спасбросок Мудрости. При успехе эффект для неё заканчивается.' },
        { title: 'На более высоких уровнях', text: 'Ячейкой 5-го уровня или выше радиус сферы увеличивается на 5 футов за каждый уровень ячейки выше 4-го.' }
      ]
    }
  ),
  spell(
    'guardian-of-faith', 'Страж веры', 4, 'conjuration',
    '1 действие', '30 фт.', 'В', '8 часов',
    ['damage', 'control'],
    'В свободном пространстве на ваш выбор, которое вы видите в пределах дистанции, появляется призрачный страж размера Большой и парит там, пока действует заклинание. Страж занимает это пространство; его очертания размыты, видны лишь сверкающий меч и щит с символом вашего божества.',
    {
      source: 'PHB',
      classes: ['Жрец'],
      sections: [
        { title: 'Охрана', text: 'Каждое враждебное вам существо, которое впервые за ход перемещается в пространство в пределах 10 футов от стража, должно преуспеть в спасброске Ловкости. Существо получает 20 урона излучением при провале или половину этого урона при успехе. Страж исчезает, когда нанесёт в сумме 60 урона.' }
      ]
    }
  ),
  spell(
    'guardian-of-nature', 'Страж природы', 4, 'transmutation',
    '1 бонусное действие', 'На себя', 'В', 'Концентрация, до 1 минуты',
    ['concentration', 'support'],
    'На ваш зов откликается дух природы и превращает вас в могучего стража. Превращение длится, пока не закончится заклинание. Выберите облик: Первобытный зверь или Великое древо.',
    {
      source: 'XGE',
      classes: ['Друид', 'Следопыт'],
      sections: [
        { title: 'Первобытный зверь', text: 'Тело покрывается звериной шерстью, черты лица дичают. Ваша скорость ходьбы увеличивается на 10 футов, вы получаете тёмное зрение на 120 футов, а броски атаки, основанные на Силе, совершаете с преимуществом. Ваши рукопашные атаки оружием при попадании наносят дополнительно 1к6 урона силовым полем.' },
        { title: 'Великое древо', text: 'Кожа становится похожей на кору, в волосах пробиваются листья. Вы получаете 10 временных хитов, совершаете с преимуществом спасброски Телосложения, а броски атаки, основанные на Ловкости и Мудрости, — с преимуществом. Пока вы стоите на земле, земля в пределах 15 футов от вас — труднопроходимая местность для ваших врагов.' }
      ]
    }
  ),
  spell(
    'storm-sphere', 'Сфера бури', 4, 'evocation',
    '1 действие', '150 фт.', 'В, С', 'Концентрация, до 1 минуты',
    ['concentration', 'damage'],
    'В выбранной вами точке в пределах дистанции возникает сфера кружащегося воздуха радиусом 20 футов и держится, пока действует заклинание. Каждое существо, которое находится в сфере, когда она появляется, или заканчивает в ней ход, должно преуспеть в спасброске Силы, иначе получает 2к6 дробящего урона. Пространство сферы — труднопроходимая местность.',
    {
      source: 'XGE',
      classes: ['Волшебник', 'Чародей'],
      sections: [
        { title: 'Молния', text: 'Пока заклинание не закончится, в каждый свой ход вы можете бонусным действием послать из центра сферы молнию в одно выбранное вами существо в пределах 60 футов от центра. Совершите дальнобойную атаку заклинанием — с преимуществом, если цель в сфере. При попадании цель получает 4к6 урона электричеством.' },
        { title: 'Шум бури', text: 'Существа в пределах 30 футов от сферы совершают с помехой проверки Мудрости (Внимательность), чтобы что-то расслышать.' },
        { title: 'На более высоких уровнях', text: 'Урон каждого эффекта увеличивается на 1к6 за каждый уровень ячейки выше 4-го.' }
      ]
    }
  ),
  spell(
    'blight', 'Усыхание', 4, 'necromancy',
    '1 действие', '30 фт.', 'В, С', 'Мгновенная',
    ['damage'],
    'Некротическая энергия окатывает выбранное вами существо, которое вы видите в пределах дистанции, вытягивая из него влагу и жизненную силу. Цель совершает спасбросок Телосложения и получает 8к8 урона некротической энергией при провале или половину этого урона при успехе. На нежить и конструктов заклинание не действует.',
    {
      source: 'PHB',
      classes: ['Волшебник', 'Друид', 'Колдун', 'Чародей'],
      sections: [
        { title: 'Растения', text: 'Если цель — существо-растение или магическое растение, она совершает спасбросок с помехой, а заклинание наносит ей максимальный урон. Если цель — немагическое растение, которое не является существом (например, дерево или куст), спасбросок не совершается: растение просто засыхает и погибает.' },
        { title: 'На более высоких уровнях', text: 'Урон увеличивается на 1к8 за каждый уровень ячейки выше 4-го.' }
      ]
    }
  ),
  spell(
    'grasping-vine', 'Цепкая лоза', 4, 'conjuration',
    '1 бонусное действие', '30 фт.', 'В, С', 'Концентрация, до 1 минуты',
    ['concentration', 'control'],
    'Вы призываете лозу, которая вырастает из земли в свободном пространстве на ваш выбор, которое вы видите в пределах дистанции. При сотворении вы можете велеть лозе хлестнуть существо, которое вы видите в пределах 30 футов от неё. Это существо должно преуспеть в спасброске Ловкости, иначе его подтягивает на 20 футов прямо к лозе. Пока заклинание не закончится, в каждый свой ход вы можете бонусным действием снова велеть лозе хлестнуть то же или другое существо.',
    {
      source: 'XGE',
      classes: ['Друид', 'Следопыт']
    }
  ),
  spell(
    'evards-black-tentacles', 'Эвардовы чёрные щупальца', 4, 'conjuration',
    '1 действие', '90 фт.', 'В, С, М (кусок щупальца гигантского осьминога или гигантского кальмара)', 'Концентрация, до 1 минуты',
    ['concentration', 'damage', 'control'],
    'Извивающиеся щупальца цвета эбенового дерева заполняют квадрат со стороной 20 футов на земле, которую вы видите в пределах дистанции. Пока действует заклинание, щупальца делают землю в области труднопроходимой местностью.',
    {
      source: 'PHB',
      classes: ['Волшебник', 'Колдун'],
      sections: [
        { title: 'Хватка', text: 'Когда существо впервые за ход входит в область или начинает в ней ход, оно должно преуспеть в спасброске Ловкости, иначе получает 3к6 дробящего урона и опутано щупальцами, пока заклинание не закончится. Существо, которое начинает ход в области, уже опутанное щупальцами, получает 3к6 дробящего урона.' },
        { title: 'Освобождение', text: 'Опутанное щупальцами существо может действием совершить проверку Силы или Ловкости (на свой выбор) против СЛ спасброска ваших заклинаний. При успехе оно освобождается.' }
      ]
    }
  ),
  // ── Заклинания 5 уровня (базовые, PHB / XGE / TCE) ────────────────
  spell(
    'swift-quiver', 'Быстрый колчан', 5, 'transmutation',
    '1 бонусное действие', 'Касание', 'В, С, М (колчан с не менее чем одним снарядом)', 'Концентрация, до 1 минуты',
    ['concentration', 'support'],
    'Вы преобразуете свой колчан так, что он без конца даёт немагические боеприпасы, которые будто сами прыгают в руку, стоит за ними потянуться. Пока заклинание не закончится, в каждый свой ход вы можете бонусным действием совершить две атаки оружием, которое использует боеприпасы из колчана. После каждой такой дальнобойной атаки колчан магически заменяет потраченный боеприпас таким же немагическим. Все боеприпасы, созданные заклинанием, рассыпаются в прах, когда оно заканчивается. Если колчан перестаёт быть при вас, заклинание заканчивается.',
    {
      source: 'XGE',
      classes: ['Следопыт']
    }
  ),
  spell(
    'control-winds', 'Власть над ветрами', 5, 'transmutation',
    '1 действие', '300 фт.', 'В, С', 'Концентрация, до 1 часа',
    ['concentration', 'control'],
    'Вы подчиняете себе воздух в кубе со стороной 100 футов, который видите в пределах дистанции. При сотворении выберите один из эффектов ниже. Он действует всю длительность, если только в один из следующих ходов вы не смените его действием на другой. Действием вы также можете на время остановить эффект или снова запустить остановленный.',
    {
      source: 'XGE',
      classes: ['Друид', 'Чародей', 'Волшебник'],
      sections: [
        { title: 'Порывы', text: 'В кубе поднимается ветер, непрерывно дующий в выбранном вами горизонтальном направлении. Силу ветра выбираете вы: слабый, умеренный или сильный. При умеренном или сильном ветре дальнобойные атаки оружием, которые проходят сквозь него или нацелены на цели внутри куба, совершаются с помехой. При сильном ветре каждый фут перемещения против ветра стоит существу 1 дополнительный фут.' },
        { title: 'Нисходящий поток', text: 'С верхней грани куба вниз непрерывно бьёт сильный ветер. Дальнобойные атаки оружием, которые проходят сквозь куб или нацелены на цели внутри него, совершаются с помехой. Существо, которое впервые за ход влетает в куб или начинает в нём ход в полёте, совершает спасбросок Силы и при провале оказывается сбито с ног.' },
        { title: 'Восходящий поток', text: 'От нижней грани куба вверх непрерывно поднимается поток воздуха. Существа, падение которых заканчивается в кубе, получают от падения только половину урона. Когда существо в кубе прыгает в высоту, оно может прыгнуть на 10 футов выше обычного.' }
      ]
    }
  ),
  spell(
    'maelstrom', 'Водоворот', 5, 'evocation',
    '1 действие', '120 фт.', 'В, С, М (бумага или лист, свёрнутые воронкой)', 'Концентрация, до 1 минуты',
    ['concentration', 'damage', 'control'],
    'В точке, которую вы видите в пределах дистанции, появляется и закручивается масса воды глубиной 5 футов и радиусом 30 футов. Точка должна быть на земле или в водоёме. Пока заклинание не закончится, эта область — труднопроходимая местность, а каждое существо, которое начинает в ней ход, должно преуспеть в спасброске Силы, иначе получает 6к6 дробящего урона и притягивается на 10 футов к центру.',
    {
      source: 'XGE',
      classes: ['Друид']
    }
  ),
  spell(
    'conjure-elemental', 'Вызов элементаля', 5, 'conjuration',
    '1 минута', '90 фт.', 'В, С, М (горящие благовония для воздуха, мягкая глина для земли, сера и фосфор для огня или вода и песок для воды)', 'Концентрация, до 1 часа',
    ['concentration', 'support'],
    'Вы призываете слугу-элементаля. Выберите в пределах дистанции область воздуха, земли, огня или воды, заполняющую куб со стороной 10 футов. Элементаль с показателем опасности 5 или ниже, подходящий выбранной области, появляется в свободном пространстве в пределах 10 футов от неё. Например, огненный элементаль выходит из костра, а земляной поднимается из земли. Элементаль исчезает, когда его хиты опускаются до 0 или когда заклинание заканчивается.',
    {
      source: 'PHB',
      classes: ['Друид', 'Волшебник'],
      sections: [
        { title: 'Слуга', text: 'Пока действует заклинание, элементаль дружелюбен к вам и вашим спутникам. Бросьте за элементаля инициативу: у него свои ходы. Он выполняет ваши устные команды (вам это действия не стоит). Если вы не отдаёте ему команд, он защищается от враждебных существ, а больше ничего не делает.' },
        { title: 'Потеря контроля', text: 'Если ваша концентрация прервана, элементаль не исчезает. Вместо этого вы теряете над ним контроль, он становится враждебен вам и вашим спутникам и может напасть. Элементаля, вышедшего из-под контроля, вы отпустить не можете; он исчезает через 1 час после призыва. Характеристики элементаля у Мастера.' },
        { title: 'На более высоких уровнях', text: 'Показатель опасности увеличивается на 1 за каждый уровень ячейки выше 5-го.' }
      ]
    }
  ),
  spell(
    'wrath-of-nature', 'Гнев природы', 5, 'evocation',
    '1 действие', '120 фт.', 'В, С', 'Концентрация, до 1 минуты',
    ['concentration', 'damage', 'control'],
    'Вы взываете к духам природы, поднимая их против своих врагов. Выберите точку, которую видите в пределах дистанции. Духи оживляют деревья, камни и травы в кубе со стороной 60 футов с центром в этой точке, пока заклинание не закончится.',
    {
      source: 'XGE',
      classes: ['Друид', 'Следопыт'],
      sections: [
        { title: 'Травы и подлесок', text: 'Любой участок земли в кубе, покрытый травой или подлеском, — труднопроходимая местность для ваших врагов.' },
        { title: 'Деревья', text: 'В начале каждого вашего хода каждый ваш враг в пределах 10 футов от любого дерева в кубе должен преуспеть в спасброске Ловкости, иначе получает 4к6 рубящего урона от хлещущих ветвей.' },
        { title: 'Корни и лозы', text: 'В конце каждого вашего хода одно выбранное вами существо, стоящее на земле в кубе, должно преуспеть в спасброске Силы, иначе опутано, пока заклинание не закончится. Опутанное существо может действием совершить проверку Силы (Атлетика) против СЛ спасброска ваших заклинаний и при успехе освобождается.' },
        { title: 'Камни', text: 'Бонусным действием в свой ход вы можете метнуть незакреплённый камень из куба в существо в кубе, которое вы видите. Совершите по цели дальнобойную атаку заклинанием. При попадании цель получает 3к8 немагического дробящего урона и должна преуспеть в спасброске Силы, иначе падает и оказывается сбита с ног.' }
      ]
    }
  ),
  spell(
    'far-step', 'Далёкий шаг', 5, 'conjuration',
    '1 бонусное действие', 'На себя', 'В', 'Концентрация, до 1 минуты',
    ['concentration', 'utility'],
    'Вы телепортируетесь на расстояние до 60 футов в свободное пространство, которое видите. Пока заклинание не закончится, в каждый свой ход вы можете бонусным действием снова телепортироваться так же.',
    {
      source: 'XGE',
      classes: ['Волшебник', 'Чародей', 'Колдун']
    }
  ),
  spell(
    'bigbys-hand', 'Длань Бигби', 5, 'evocation',
    '1 действие', '120 фт.', 'В, С, М (яичная скорлупа и перчатка из змеиной кожи)', 'Концентрация, до 1 минуты',
    ['concentration', 'damage', 'control'],
    'Вы создаёте в свободном пространстве, которое видите в пределах дистанции, руку размера Большой из мерцающего полупрозрачного силового поля. Рука существует, пока действует заклинание, и движется по вашей команде, повторяя движения вашей руки.',
    {
      source: 'PHB',
      classes: ['Волшебник', 'Изобретатель'],
      sections: [
        { title: 'Рука', text: 'Рука — предмет с КД 20 и хитами, равными вашему максимуму хитов. Если её хиты опускаются до 0, заклинание заканчивается. У неё Сила 26 (+8) и Ловкость 10 (+0). Рука не заполняет своё пространство.' },
        { title: 'Приказы', text: 'При сотворении и бонусным действием в последующие ходы вы можете переместить руку на расстояние до 60 футов, а затем вызвать ею один из эффектов ниже.' },
        { title: 'Сжатый кулак', text: 'Рука бьёт одно существо или предмет в пределах 5 футов от себя. Совершите за руку рукопашную атаку заклинанием, используя свои характеристики. При попадании цель получает 4к8 урона силовым полем.' },
        { title: 'Толкающая рука', text: 'Рука пытается толкнуть существо в пределах 5 футов от себя в выбранном вами направлении. Совершите проверку Силы руки против проверки Силы (Атлетика) цели. Если цель размера Средний или меньше, вы совершаете проверку с преимуществом. При успехе рука толкает цель на 5 футов плюс число футов, равное пятикратному модификатору вашей заклинательной характеристики. Рука движется вместе с целью, оставаясь в пределах 5 футов от неё.' },
        { title: 'Хватающая рука', text: 'Рука пытается схватить существо размера Огромный или меньше в пределах 5 футов от себя. Для захвата используется значение Силы руки. Если цель размера Средний или меньше, вы совершаете проверку с преимуществом. Пока рука держит цель, вы можете бонусным действием велеть ей сдавить цель: та получает дробящий урон, равный 2к6 + модификатор вашей заклинательной характеристики.' },
        { title: 'Заслоняющая рука', text: 'Рука встаёт между вами и выбранным вами существом, пока вы не отдадите ей другую команду. Она перемещается, оставаясь между вами и целью, и даёт вам укрытие на половину против этой цели. Цель не может пройти через пространство руки, если её Сила не больше Силы руки. Если Сила цели больше, она может двигаться к вам через пространство руки, но для неё это пространство — труднопроходимая местность.' },
        { title: 'На более высоких уровнях', text: 'Урон сжатого кулака увеличивается на 2к8, а урон хватающей руки — на 2к6 за каждый уровень ячейки выше 5-го.' }
      ]
    }
  ),
  spell(
    'tree-stride', 'Древесный путь', 5, 'conjuration',
    '1 действие', 'На себя', 'В, С', 'Концентрация, до 1 минуты',
    ['concentration', 'utility'],
    'Вы получаете способность входить в дерево и перемещаться изнутри него в другое дерево того же вида в пределах 500 футов. Оба дерева должны быть живыми и не меньше вас размером. Чтобы войти в дерево, нужно потратить 5 футов перемещения. Вы сразу узнаёте, где находятся все другие деревья того же вида в пределах 500 футов, и в рамках перемещения, потраченного на вход в дерево, можете либо перейти в одно из них, либо выйти из дерева, в котором находитесь. Вы появляетесь в выбранной вами точке в пределах 5 футов от дерева назначения, потратив ещё 5 футов перемещения. Если перемещения не осталось, вы появляетесь в пределах 5 футов от дерева, в которое вошли.',
    {
      source: 'PHB',
      classes: ['Друид', 'Следопыт'],
      sections: [
        { title: 'Раз в раунд', text: 'Пока действует заклинание, вы можете пользоваться этим способом передвижения раз в раунд. Каждый ход вы должны заканчивать вне дерева.' }
      ]
    }
  ),
  spell(
    'banishing-smite', 'Изгоняющая кара', 5, 'abjuration',
    '1 бонусное действие', 'На себя', 'В', 'Концентрация, до 1 минуты',
    ['concentration', 'damage', 'control'],
    'Пока действует заклинание, в следующий раз, когда вы попадаете по существу атакой оружием, ваше оружие трещит от силового поля, и атака наносит цели дополнительно 5к10 урона силовым полем. Если после этой атаки у цели остаётся 50 хитов или меньше, вы изгоняете её. Существо с другого плана существования исчезает и возвращается на свой родной план. Существо с того плана, на котором вы находитесь, исчезает на безвредном полуплане: там оно недееспособно и остаётся, пока заклинание не закончится, а затем появляется в пространстве, которое покинуло, или в ближайшем свободном, если то занято.',
    {
      source: 'PHB',
      classes: ['Паладин']
    }
  ),
  spell(
    'modify-memory', 'Изменение памяти', 5, 'enchantment',
    '1 действие', '30 фт.', 'В, С', 'Концентрация, до 1 минуты',
    ['concentration', 'control'],
    'Вы пытаетесь переделать воспоминания другого существа. Одно существо, которое вы видите, совершает спасбросок Мудрости; если вы сражаетесь с ним, оно совершает спасбросок с преимуществом. При провале цель очарована вами, пока действует заклинание. Очарованная цель недееспособна и не замечает окружающего, но по-прежнему слышит вас. Если она получает любой урон или становится целью другого заклинания, это заклинание заканчивается, и воспоминания цели не меняются.',
    {
      source: 'PHB',
      classes: ['Бард', 'Волшебник'],
      sections: [
        { title: 'Что можно изменить', text: 'Пока длится очарование, вы можете повлиять на воспоминание цели о событии, которое она пережила за последние 24 часа и которое длилось не больше 10 минут. Вы можете навсегда стереть всю память о событии, позволить цели вспомнить его с полной ясностью и во всех подробностях, изменить её память о подробностях события или создать воспоминание о каком-то другом событии.' },
        { title: 'Описание', text: 'Чтобы описать, как меняются воспоминания, вы должны говорить с целью, и она должна понимать ваш язык, иначе изменённые воспоминания не приживутся. Пробелы в подробностях вашего описания её разум заполнит сам. Если заклинание закончится раньше, чем вы закончите описание, память существа не меняется. Иначе изменённые воспоминания закрепляются, когда заклинание заканчивается.' },
        { title: 'Поведение', text: 'Изменённое воспоминание не обязательно влияет на поведение существа, особенно если противоречит его природным склонностям, мировоззрению или убеждениям. Нелогичное воспоминание — например, о том, как существу понравилось обливаться кислотой, — отбрасывается, может быть, как дурной сон. Мастер может решить, что изменённое воспоминание слишком бессмысленно, чтобы заметно повлиять на существо.' },
        { title: 'Возврат памяти', text: 'Заклинание снятия проклятия или высшего восстановления, сотворённое на цель, возвращает существу его настоящие воспоминания.' },
        { title: 'На более высоких уровнях', text: 'Ячейкой 6-го уровня или выше можно изменить воспоминания о событии, которое произошло до 7 дней назад (6-й уровень), до 30 дней назад (7-й), до года назад (8-й) или когда угодно в прошлом существа (9-й).' }
      ]
    }
  ),
  spell(
    'infernal-calling', 'Инфернальный зов', 5, 'conjuration',
    '1 минута', '90 фт.', 'В, С, М (рубин стоимостью не менее 999 с.м.)', 'Концентрация, до 1 часа',
    ['concentration', 'control'],
    'Произнеся тёмное заклинание, вы призываете дьявола из Девяти Преисподних. Вид дьявола выбираете вы — с показателем опасности 6 или ниже, например шипастого или бородатого дьявола. Дьявол появляется в свободном пространстве, которое вы видите в пределах дистанции, и исчезает, когда его хиты опускаются до 0 или когда заклинание заканчивается.',
    {
      source: 'XGE',
      classes: ['Волшебник', 'Колдун'],
      sections: [
        { title: 'Нрав дьявола', text: 'Дьявол недружелюбен к вам и вашим спутникам. Бросьте за него инициативу: у него свои ходы. Им управляет Мастер, и в каждый свой ход дьявол поступает сообразно своей природе: может напасть на вас, если думает, что одолеет, или попытаться склонить вас ко злу в обмен на недолгую службу. Характеристики дьявола у Мастера.' },
        { title: 'Приказы', text: 'В каждый свой ход вы можете попытаться отдать дьяволу устную команду (вам это действия не стоит). Он выполняет её, если вероятный исход отвечает его желаниям — особенно если он подталкивает вас ко злу. Иначе вы совершаете проверку Харизмы (Обман, Запугивание или Убеждение) против его проверки Мудрости (Проницательность) — с преимуществом, если вы назвали истинное имя дьявола. При провале дьявол становится невосприимчив к вашим устным командам до конца заклинания, хотя может выполнять их по собственной воле. При успехе дьявол выполняет команду — например, «атакуй моих врагов», «разведай комнату впереди» или «отнеси это послание королеве», — пока не закончит, а затем возвращается к вам доложить об этом.' },
        { title: 'Потеря концентрации', text: 'Если ваша концентрация обрывается раньше, чем истечёт полная длительность заклинания, дьявол, ставший невосприимчивым к вашим командам, не исчезает. Вместо этого он 3к6 минут поступает как ему вздумается, а затем исчезает.' },
        { title: 'Талисман', text: 'Если у вас есть личный талисман дьявола, вы можете призвать этого дьявола, если его показатель опасности не больше допустимого плюс 1. Он выполняет все ваши команды без проверок Харизмы.' },
        { title: 'На более высоких уровнях', text: 'Показатель опасности дьявола увеличивается на 1 за каждый уровень ячейки выше 5-го.' }
      ]
    }
  ),
  spell(
    'immolation', 'Испепеление', 5, 'evocation',
    '1 действие', '90 фт.', 'В', 'Концентрация, до 1 минуты',
    ['concentration', 'damage'],
    'Пламя охватывает одно существо, которое вы видите в пределах дистанции. Цель совершает спасбросок Ловкости и получает 8к6 урона огнём при провале или половину этого урона при успехе. При провале цель к тому же горит, пока действует заклинание.',
    {
      source: 'XGE',
      classes: ['Чародей', 'Волшебник'],
      sections: [
        { title: 'Горение', text: 'Горящая цель излучает яркий свет в радиусе 30 футов и тусклый свет ещё на 30 футов. В конце каждого своего хода цель повторяет спасбросок: при провале получает 4к6 урона огнём, при успехе заклинание заканчивается. Это магическое пламя нельзя погасить немагическими средствами.' },
        { title: 'Пепел', text: 'Если урон от этого заклинания убивает цель, она обращается в пепел.' }
      ]
    }
  ),
  spell(
    'wall-of-stone', 'Каменная стена', 5, 'evocation',
    '1 действие', '120 фт.', 'В, С, М (небольшой кусок гранита)', 'Концентрация, до 10 минут',
    ['concentration', 'control'],
    'В выбранной вами точке в пределах дистанции возникает немагическая стена из сплошного камня. Стена толщиной 6 дюймов и состоит из десяти панелей 10 × 10 футов. Каждая панель должна примыкать хотя бы к одной другой. Вместо этого можно создать панели 10 × 20 футов толщиной всего 3 дюйма.',
    {
      source: 'PHB',
      classes: ['Друид', 'Чародей', 'Волшебник', 'Изобретатель'],
      sections: [
        { title: 'Появление', text: 'Если при появлении стена проходит через пространство существа, существо выталкивается на одну из её сторон (на ваш выбор). Если существо оказалось бы со всех сторон окружено стеной (или стеной и другой твёрдой поверхностью), оно может совершить спасбросок Ловкости. При успехе оно может реакцией переместиться на расстояние до своей скорости, чтобы больше не быть замурованным.' },
        { title: 'Форма', text: 'Стена может быть любой формы, но не может занимать одно пространство с существом или предметом. Она не обязана быть вертикальной или стоять на прочном основании, но должна сливаться с существующим камнем и прочно на него опираться. Так этим заклинанием можно перекинуть мост через пропасть или сделать пандус. Если пролёт длиннее 20 футов, для опор нужно вдвое уменьшить размер каждой панели. Стене можно грубо придать форму с зубцами, бойницами и тому подобным.' },
        { title: 'Прочность', text: 'Стена — каменный предмет, которому можно причинить урон и пробить. У каждой панели КД 15 и 30 хитов на каждый дюйм толщины. Панель с 0 хитов разрушается, и по решению Мастера могут обрушиться соединённые с ней панели.' },
        { title: 'Навсегда', text: 'Если вы поддерживаете концентрацию на заклинании всю его длительность, стена становится постоянной, и её нельзя рассеять. Иначе стена исчезает, когда заклинание заканчивается.' }
      ]
    }
  ),
  spell(
    'circle-of-power', 'Круг силы', 5, 'abjuration',
    '1 действие', 'На себя (радиус 30 фт.)', 'В', 'Концентрация, до 10 минут',
    ['concentration', 'support'],
    'От вас исходит божественная энергия, искажая и рассеивая магию в пределах 30 футов. Пока заклинание не закончится, эта сфера движется вместе с вами, оставаясь с центром на вас. Пока оно действует, каждое дружественное существо в области (и вы) совершает с преимуществом спасброски от заклинаний и других магических эффектов. Кроме того, если такое существо преуспевает в спасброске от заклинания или магического эффекта, при успехе в котором оно получило бы только половину урона, оно вместо этого не получает урона вовсе.',
    {
      source: 'PHB',
      classes: ['Паладин']
    }
  ),
  spell(
    'scrying', 'Наблюдение', 5, 'divination',
    '10 минут', 'На себя', 'В, С, М (фокусировка стоимостью не менее 1000 с.м. — например, хрустальный шар, серебряное зеркало или чаша со святой водой)', 'Концентрация, до 10 минут',
    ['concentration', 'utility'],
    'Вы можете видеть и слышать выбранное вами определённое существо, находящееся на одном с вами плане существования. Цель совершает спасбросок Мудрости с модификатором, который зависит от того, насколько хорошо вы её знаете и какая у вас с ней физическая связь. Если цель знает, что вы творите это заклинание, она может по желанию провалить спасбросок, чтобы за ней наблюдали.',
    {
      source: 'PHB',
      classes: ['Бард', 'Жрец', 'Друид', 'Волшебник', 'Колдун'],
      sections: [
        { title: 'Модификаторы спасброска', text: 'Знакомство: понаслышке (вы слышали о цели) +5; лично (вы встречали цель) +0; близко (вы хорошо знаете цель) −5. Связь: изображение или портрет −2; вещь или одежда цели −4; часть тела, прядь волос, обрезок ногтя или подобное −10.' },
        { title: 'Успех и провал', text: 'При успехе цель не подвержена заклинанию, и вы не можете снова применить его против неё в течение 24 часов. При провале заклинание создаёт невидимый сенсор в пределах 10 футов от цели. Через сенсор вы видите и слышите, как если бы находились там. Сенсор движется вместе с целью, оставаясь в пределах 10 футов от неё, пока действует заклинание. Существо, способное видеть невидимые предметы, видит сенсор как светящийся шар размером с ваш кулак.' },
        { title: 'Место', text: 'Вместо существа целью заклинания можно выбрать место, которое вы раньше видели. Тогда сенсор появляется в этом месте и не движется.' }
      ]
    }
  ),
  spell(
    'insect-plague', 'Нашествие насекомых', 5, 'conjuration',
    '1 действие', '300 фт.', 'В, С, М (несколько крупинок сахара, немного зёрен и капля жира)', 'Концентрация, до 10 минут',
    ['concentration', 'damage', 'control'],
    'Рой кусачей саранчи заполняет сферу радиусом 20 футов с центром в выбранной вами точке в пределах дистанции. Сфера огибает углы и держится, пока действует заклинание. Её область слегка заслонена и является труднопроходимой местностью.',
    {
      source: 'PHB',
      classes: ['Жрец', 'Друид', 'Чародей'],
      sections: [
        { title: 'Укусы', text: 'Когда область появляется, каждое существо в ней совершает спасбросок Телосложения и получает 4к10 колющего урона при провале или половину этого урона при успехе. Этот спасбросок существо совершает и тогда, когда впервые за ход входит в область заклинания или заканчивает в ней ход.' },
        { title: 'На более высоких уровнях', text: 'Урон увеличивается на 1к10 за каждый уровень ячейки выше 5-го.' }
      ]
    }
  ),
  spell(
    'enervation', 'Обессиливание', 5, 'necromancy',
    '1 действие', '60 фт.', 'В, С', 'Концентрация, до 1 минуты',
    ['concentration', 'damage', 'healing'],
    'От вас тянется щупальце чернильной тьмы и касается существа, которое вы видите в пределах дистанции, вытягивая из него жизнь. Цель совершает спасбросок Ловкости. При провале цель получает 4к8 урона некротической энергией, и, пока заклинание не закончится, в каждый свой ход вы можете действием автоматически наносить ей 4к8 урона некротической энергией. При успехе цель получает 2к8 урона некротической энергией, и заклинание заканчивается.',
    {
      source: 'XGE',
      classes: ['Чародей', 'Волшебник', 'Колдун'],
      sections: [
        { title: 'Конец заклинания', text: 'Заклинание заканчивается, если вы тратите действие на что-либо другое, если цель оказывается за пределами дистанции или если у неё есть полное укрытие от вас.' },
        { title: 'Похищенная жизнь', text: 'Каждый раз, когда заклинание наносит цели урон, вы восстанавливаете хиты в количестве половины полученного ею урона некротической энергией.' },
        { title: 'На более высоких уровнях', text: 'Урон увеличивается на 1к8 за каждый уровень ячейки выше 5-го.' }
      ]
    }
  ),
  spell(
    'cloudkill', 'Облако смерти', 5, 'conjuration',
    '1 действие', '120 фт.', 'В, С', 'Концентрация, до 10 минут',
    ['concentration', 'damage', 'control'],
    'Вы создаёте сферу ядовитого жёлто-зелёного тумана радиусом 20 футов с центром в выбранной вами точке в пределах дистанции. Туман огибает углы. Он держится, пока действует заклинание или пока сильный ветер не развеет его, окончив заклинание. Его область сильно заслонена.',
    {
      source: 'PHB',
      classes: ['Чародей', 'Волшебник'],
      sections: [
        { title: 'Яд', text: 'Когда существо впервые за ход входит в область заклинания или начинает в ней ход, оно совершает спасбросок Телосложения и получает 5к8 урона ядом при провале или половину этого урона при успехе. Туман действует на существ, даже если они задерживают дыхание или им не нужно дышать.' },
        { title: 'Движение тумана', text: 'В начале каждого вашего хода туман сдвигается на 10 футов в сторону от вас, стелясь по земле. Пары тяжелее воздуха, поэтому опускаются в самые низкие места и даже стекают в отверстия.' },
        { title: 'На более высоких уровнях', text: 'Урон увеличивается на 1к8 за каждый уровень ячейки выше 5-го.' }
      ]
    }
  ),
  spell(
    'animate-objects', 'Оживление вещей', 5, 'transmutation',
    '1 действие', '120 фт.', 'В, С', 'Концентрация, до 1 минуты',
    ['concentration', 'damage', 'support'],
    'По вашему велению предметы оживают. Выберите в пределах дистанции до десяти немагических предметов, которые никто не носит и не несёт. Средняя цель считается за два предмета, Большая — за четыре, Огромная — за восемь. Предмет больше Огромного оживить нельзя. Каждая цель оживает и становится существом под вашим контролем, пока заклинание не закончится или пока её хиты не опустятся до 0.',
    {
      source: 'PHB',
      classes: ['Бард', 'Чародей', 'Волшебник', 'Изобретатель'],
      sections: [
        { title: 'Команды', text: 'Бонусным действием вы можете мысленно приказывать любому существу, созданному этим заклинанием, если оно в пределах 500 футов от вас (если существ несколько, можно приказать любым или всем сразу, отдав каждому одну и ту же команду). Вы решаете, какое действие существо совершит и куда переместится в свой следующий ход, или отдаёте общий приказ — например, охранять определённую комнату или коридор. Без приказов существо только защищается от враждебных существ. Получив приказ, существо выполняет его, пока не закончит.' },
        { title: 'Оживлённый предмет', text: 'Оживлённый предмет — конструкт; его КД, хиты, атака, Сила и Ловкость зависят от размера (ниже). Телосложение у него 10, Интеллект и Мудрость 3, Харизма 1. Скорость 30 футов; если у предмета нет ног или других частей, которыми он мог бы передвигаться, у него вместо этого скорость полёта 30 футов, и он может парить. Если предмет надёжно прикреплён к поверхности или большему предмету (например, цепь, вбитая в стену), его скорость 0. У него слепое зрение в радиусе 30 футов, а дальше он слеп. Когда хиты оживлённого предмета опускаются до 0, он снова становится обычным предметом, и оставшийся урон переносится на этот предмет.' },
        { title: 'Крошечный', text: '20 хитов, КД 18, атака +8, урон 1к4 + 4, Сила 4, Ловкость 18.' },
        { title: 'Маленький', text: '25 хитов, КД 16, атака +6, урон 1к8 + 2, Сила 6, Ловкость 14.' },
        { title: 'Средний', text: '40 хитов, КД 13, атака +5, урон 2к6 + 1, Сила 10, Ловкость 12.' },
        { title: 'Большой', text: '50 хитов, КД 10, атака +6, урон 2к10 + 2, Сила 14, Ловкость 10.' },
        { title: 'Огромный', text: '80 хитов, КД 10, атака +8, урон 2к12 + 4, Сила 18, Ловкость 6.' },
        { title: 'Атака', text: 'Если вы приказываете предмету атаковать, он может совершить одну рукопашную атаку по существу в пределах 5 футов от себя — удар с бонусом атаки и дробящим уроном по своему размеру. Мастер может решить, что конкретный предмет по своей форме наносит рубящий или колющий урон.' },
        { title: 'На более высоких уровнях', text: 'Ячейкой 6-го уровня или выше вы можете оживить ещё два предмета за каждый уровень ячейки выше 5-го.' }
      ]
    }
  ),
  spell(
    'danse-macabre', 'Пляска смерти', 5, 'necromancy',
    '1 действие', '60 фт.', 'В, С', 'Концентрация, до 1 часа',
    ['concentration', 'support'],
    'Из ваших пальцев срываются нити тёмной силы и пронзают до пяти трупов размера Маленький или Средний, которые вы видите в пределах дистанции. Каждый труп тут же встаёт и становится нежитью — зомби или скелетом, на ваш выбор (характеристики у Мастера). К броскам атаки и урона он прибавляет модификатор вашей заклинательной характеристики.',
    {
      source: 'XGE',
      classes: ['Волшебник', 'Колдун'],
      sections: [
        { title: 'Команды', text: 'Бонусным действием вы можете мысленно приказывать созданным этим заклинанием существам, отдавая всем одну и ту же команду. Чтобы получить её, существо должно быть в пределах 60 футов от вас. Вы решаете, какое действие существа совершат и куда переместятся в свой следующий ход, или отдаёте общий приказ — например, охранять комнату или коридор от ваших врагов. Без приказов существа только защищаются от враждебных существ. Получив приказ, они выполняют его, пока не закончат.' },
        { title: 'Конец заклинания', text: 'Существа подчиняются вам, пока заклинание не закончится, а затем снова становятся неживыми.' },
        { title: 'На более высоких уровнях', text: 'Вы оживляете ещё до двух трупов за каждый уровень ячейки выше 5-го.' }
      ]
    }
  ),
  spell(
    'dominate-person', 'Подчинение личности', 5, 'enchantment',
    '1 действие', '60 фт.', 'В, С', 'Концентрация, до 1 минуты',
    ['concentration', 'control'],
    'Вы пытаетесь подчинить гуманоида, которого видите в пределах дистанции. Он должен преуспеть в спасброске Мудрости, иначе очарован вами, пока действует заклинание. Если вы или дружественные вам существа сражаетесь с ним, он совершает спасбросок с преимуществом.',
    {
      source: 'PHB',
      classes: ['Бард', 'Чародей', 'Волшебник'],
      sections: [
        { title: 'Команды', text: 'Пока цель очарована, у вас с ней телепатическая связь, если вы оба на одном плане существования. Пока вы в сознании, вы можете через эту связь отдавать существу команды (действия это не требует), и оно старается их выполнить. Можно указать простой и общий образ действий, например «Атакуй это существо», «Беги туда» или «Принеси этот предмет». Если существо выполнило приказ и больше указаний от вас не получило, оно защищается и бережёт себя как может.' },
        { title: 'Полный контроль', text: 'Действием вы можете взять цель под полный и точный контроль. До конца вашего следующего хода существо совершает только выбранные вами действия и не делает ничего, что вы не разрешаете. В это время вы также можете заставить существо совершить реакцию, но для этого вам нужно потратить и свою реакцию.' },
        { title: 'Урон', text: 'Каждый раз, когда цель получает урон, она совершает новый спасбросок Мудрости против заклинания. При успехе заклинание заканчивается.' },
        { title: 'На более высоких уровнях', text: 'Ячейкой 6-го уровня длительность — концентрация, вплоть до 10 минут; ячейкой 7-го уровня — концентрация, вплоть до 1 часа; ячейкой 8-го уровня или выше — концентрация, вплоть до 8 часов.' }
      ]
    }
  ),
  spell(
    'antilife-shell', 'Преграда жизни', 5, 'abjuration',
    '1 действие', 'На себя (радиус 10 фт.)', 'В, С', 'Концентрация, до 1 часа',
    ['concentration', 'support'],
    'От вас на 10 футов во все стороны расходится мерцающая преграда. Она движется вместе с вами, оставаясь с центром на вас, и не подпускает существ, кроме нежити и конструктов. Преграда держится, пока действует заклинание. Затронутое существо не может пройти сквозь преграду или дотянуться через неё. Оно может творить сквозь преграду заклинания и атаковать дальнобойным оружием или оружием с досягаемостью. Если вы перемещаетесь так, что затронутое существо вынуждено пройти сквозь преграду, заклинание заканчивается.',
    {
      source: 'PHB',
      classes: ['Друид']
    }
  ),
  spell(
    'summon-celestial', 'Призыв духа небожителей', 5, 'conjuration',
    '1 действие', '90 фт.', 'В, С, М (золотой реликварий стоимостью не менее 500 с.м.)', 'Концентрация, до 1 часа',
    ['concentration', 'support', 'healing'],
    'Вы призываете духа-небожителя. Он принимает телесный облик ангела в свободном пространстве, которое вы видите в пределах дистанции, и использует блок статистики «Дух небожителя». При сотворении выберите облик: мститель или защитник. От выбора зависит атака существа в его блоке статистики. Существо исчезает, когда его хиты опускаются до 0 или когда заклинание заканчивается.',
    {
      source: 'TCE',
      classes: ['Жрец', 'Паладин'],
      sections: [
        { title: 'В бою', text: 'Дух — союзник вам и вашим спутникам. В бою он действует на вашей инициативе, но свой ход совершает сразу после вашего. Он подчиняется вашим устным командам (вам это действия не стоит). Если вы ничего не приказываете, он совершает действие Уклонение и перемещается, чтобы избегать опасности.' },
        { title: 'На более высоких уровнях', text: 'Уровень заклинания в блоке статистики считается равным уровню использованной ячейки.' }
      ]
    }
  ),
  spell(
    'dawn', 'Рассвет', 5, 'evocation',
    '1 действие', '60 фт.', 'В, С, М (подвеска в виде солнца стоимостью не менее 100 с.м.)', 'Концентрация, до 1 минуты',
    ['concentration', 'damage'],
    'Свет зари падает на указанное вами место в пределах дистанции. Пока заклинание не закончится, там сияет цилиндр яркого света радиусом 30 футов и высотой 40 футов. Этот свет — солнечный.',
    {
      source: 'XGE',
      classes: ['Жрец', 'Волшебник'],
      sections: [
        { title: 'Ожог', text: 'Когда цилиндр появляется, каждое существо в нём совершает спасбросок Телосложения и получает 4к10 урона излучением при провале или половину этого урона при успехе. Этот спасбросок существо совершает и каждый раз, когда заканчивает ход в цилиндре.' },
        { title: 'Движение', text: 'Если вы в пределах 60 футов от цилиндра, бонусным действием в свой ход вы можете переместить его на расстояние до 60 футов.' }
      ]
    }
  ),
  spell(
    'dispel-evil-and-good', 'Рассеивание добра и зла', 5, 'abjuration',
    '1 действие', 'На себя', 'В, С, М (святая вода или порошок серебра и железа)', 'Концентрация, до 1 минуты',
    ['concentration', 'support', 'control'],
    'Вас окружает и защищает мерцающая энергия от фей, нежити и существ, пришедших из-за пределов Материального плана. Пока действует заклинание, небожители, элементали, феи, исчадия и нежить совершают с помехой броски атаки по вам. Вы можете окончить заклинание досрочно, применив одно из особых свойств ниже.',
    {
      source: 'PHB',
      classes: ['Жрец', 'Паладин'],
      sections: [
        { title: 'Снятие чар', text: 'Действием вы касаетесь существа в пределах досягаемости, которое очаровано, испугано или одержимо небожителем, элементалем, феей, исчадием или нежитью. Существо, которого вы касаетесь, больше не очаровано, не испугано и не одержимо такими существами.' },
        { title: 'Изгнание', text: 'Действием совершите рукопашную атаку заклинанием по небожителю, элементалю, фее, исчадию или нежити в пределах досягаемости. При попадании вы пытаетесь отправить существо обратно на его родной план. Существо должно преуспеть в спасброске Харизмы, иначе отправляется на свой родной план (если оно ещё не там). Нежить, которая не на родном плане, отправляется в Царство теней, а феи — в Страну фей.' }
      ]
    }
  ),
  spell(
    'holy-weapon', 'Священное оружие', 5, 'evocation',
    '1 бонусное действие', 'Касание', 'В, С', 'Концентрация, до 1 часа',
    ['concentration', 'damage', 'support'],
    'Вы наполняете святой силой оружие, которого касаетесь. Пока заклинание не закончится, оружие излучает яркий свет в радиусе 30 футов и тусклый свет ещё на 30 футов, а атаки этим оружием при попадании наносят дополнительно 2к8 урона излучением. Если оружие ещё не магическое, оно становится магическим на время действия заклинания.',
    {
      source: 'XGE',
      classes: ['Жрец', 'Паладин'],
      sections: [
        { title: 'Вспышка', text: 'Бонусным действием в свой ход вы можете окончить заклинание и заставить оружие испустить вспышку сияния. Каждое выбранное вами существо, которое вы видите в пределах 30 футов от оружия, совершает спасбросок Телосложения. При провале существо получает 4к8 урона излучением и ослеплено на 1 минуту. При успехе оно получает половину урона и не ослеплено. В конце каждого своего хода ослеплённое существо может совершить спасбросок Телосложения и при успехе прозревает.' }
      ]
    }
  ),
  spell(
    'wall-of-force', 'Силовая стена', 5, 'evocation',
    '1 действие', '120 фт.', 'В, С, М (щепотка порошка из прозрачного самоцвета)', 'Концентрация, до 10 минут',
    ['concentration', 'control'],
    'В выбранной вами точке в пределах дистанции возникает невидимая силовая стена. Она появляется в любой выбранной вами ориентации — горизонтальной или вертикальной преградой либо под углом — и может свободно висеть в воздухе или опираться на твёрдую поверхность. Вы можете придать ей форму полусферического купола или сферы радиусом до 10 футов либо сделать плоскую поверхность из десяти панелей 10 × 10 футов, каждая из которых должна примыкать к другой. В любой форме стена толщиной в 1/4 дюйма и существует, пока действует заклинание. Если при появлении стена проходит через пространство существа, существо выталкивается на одну из её сторон (на ваш выбор).',
    {
      source: 'PHB',
      classes: ['Волшебник', 'Изобретатель'],
      sections: [
        { title: 'Преграда', text: 'Ничто не может физически пройти сквозь стену. Она невосприимчива к любому урону, и её нельзя рассеять заклинанием рассеивания магии. Однако заклинание распада мгновенно уничтожает стену. Стена продолжается и на Эфирном плане, не давая пройти сквозь неё эфирным путём.' }
      ]
    }
  ),
  spell(
    'wall-of-light', 'Стена света', 5, 'evocation',
    '1 действие', '120 фт.', 'В, С, М (ручное зеркальце)', 'Концентрация, до 10 минут',
    ['concentration', 'damage', 'control'],
    'В выбранной вами точке в пределах дистанции появляется мерцающая стена яркого света. Её положение выбираете вы: горизонтально, вертикально или наискосок; она может свободно висеть в воздухе или стоять на твёрдой поверхности. Стена может быть длиной до 60 футов, высотой 10 футов и толщиной 5 футов. Она закрывает обзор, но существа и предметы проходят сквозь неё. Стена излучает яркий свет на 120 футов и тусклый свет ещё на 120 футов.',
    {
      source: 'XGE',
      classes: ['Чародей', 'Волшебник', 'Колдун'],
      sections: [
        { title: 'Появление', text: 'Когда стена появляется, каждое существо в её области совершает спасбросок Телосложения. При провале существо получает 4к8 урона излучением и ослеплено на 1 минуту. При успехе оно получает половину урона и не ослеплено. В конце каждого своего хода ослеплённое существо может совершить спасбросок Телосложения и при успехе прозревает. Существо, которое заканчивает ход в области стены, получает 4к8 урона излучением.' },
        { title: 'Луч', text: 'Пока заклинание не закончится, действием вы можете выпустить из стены луч сияния в одно существо, которое видите в пределах 60 футов от неё. Совершите дальнобойную атаку заклинанием. При попадании цель получает 4к8 урона излучением. Попали вы или нет, длина стены уменьшается на 10 футов. Если длина стены становится 0 футов, заклинание заканчивается.' },
        { title: 'На более высоких уровнях', text: 'Урон увеличивается на 1к8 за каждый уровень ячейки выше 5-го.' }
      ]
    }
  ),
  spell(
    'telekinesis', 'Телекинез', 5, 'transmutation',
    '1 действие', '60 фт.', 'В, С', 'Концентрация, до 10 минут',
    ['concentration', 'control'],
    'Вы получаете способность силой мысли перемещать существ и предметы и управлять ими. При сотворении и затем действием каждый раунд, пока действует заклинание, вы можете воздействовать волей на одно существо или предмет, которые видите в пределах дистанции, вызывая один из эффектов ниже. Можно воздействовать на одну и ту же цель раунд за раундом или в любой момент выбрать новую. Если вы меняете цель, на прежнюю заклинание больше не действует.',
    {
      source: 'PHB',
      classes: ['Чародей', 'Волшебник', 'Колдун', 'Изобретатель'],
      sections: [
        { title: 'Существо', text: 'Вы можете попытаться переместить существо размера Огромный или меньше. Совершите проверку вашей заклинательной характеристики против проверки Силы существа. Если вы побеждаете, то перемещаете существо на расстояние до 30 футов в любом направлении, в том числе вверх, но не за пределы дистанции заклинания. До конца вашего следующего хода существо опутано вашей телекинетической хваткой. Поднятое вверх существо висит в воздухе. В последующие раунды вы можете действием пытаться удержать хватку, повторяя состязание.' },
        { title: 'Предмет', text: 'Вы можете попытаться переместить предмет весом до 1000 фунтов. Если предмет никто не носит и не несёт, вы автоматически перемещаете его на расстояние до 30 футов в любом направлении, но не за пределы дистанции заклинания. Если предмет носит или несёт существо, вы должны совершить проверку вашей заклинательной характеристики против проверки Силы этого существа. При успехе вы вырываете у него предмет и можете переместить его на расстояние до 30 футов в любом направлении, но не за пределы дистанции заклинания.' },
        { title: 'Тонкая работа', text: 'Телекинетической хваткой можно тонко управлять предметами: пользоваться простым инструментом, открыть дверь или сосуд, положить предмет в открытый сосуд или достать оттуда, вылить содержимое флакона.' }
      ]
    }
  ),
  spell(
    'hold-monster', 'Удержание чудовища', 5, 'enchantment',
    '1 действие', '90 фт.', 'В, С, М (прямой кусочек железа)', 'Концентрация, до 1 минуты',
    ['concentration', 'control'],
    'Выберите существо, которое вы видите в пределах дистанции. Цель должна преуспеть в спасброске Мудрости, иначе она парализована, пока действует заклинание. На нежить заклинание не действует. В конце каждого своего хода цель может совершить ещё один спасбросок Мудрости. При успехе заклинание для неё заканчивается.',
    {
      source: 'PHB',
      classes: ['Бард', 'Чародей', 'Волшебник', 'Колдун'],
      sections: [
        { title: 'На более высоких уровнях', text: 'Ячейкой 6-го уровня или выше вы можете выбрать целью ещё одно существо за каждый уровень ячейки выше 5-го. Когда вы выбираете их целями, они должны быть в пределах 30 футов друг от друга.' }
      ]
    }
  ),
  spell(
    'skill-empowerment', 'Усиление навыка', 5, 'transmutation',
    '1 действие', 'Касание', 'В, С', 'Концентрация, до 1 часа',
    ['concentration', 'support'],
    'Ваша магия углубляет понимание существом собственного таланта. Вы касаетесь одного согласного существа и даёте ему компетентность в одном навыке на ваш выбор: пока заклинание не закончится, существо удваивает бонус мастерства для проверок характеристик с этим навыком. Навык должен быть из тех, которыми цель владеет, и к нему ещё не должен применяться эффект, удваивающий бонус мастерства, — например, Компетентность.',
    {
      source: 'XGE',
      classes: ['Бард', 'Чародей', 'Волшебник', 'Изобретатель']
    }
  ),
  spell(
    'mislead', 'Фальшивый двойник', 5, 'illusion',
    '1 действие', 'На себя', 'С', 'Концентрация, до 1 часа',
    ['concentration', 'utility', 'control'],
    'Вы становитесь невидимы, и в то же мгновение на вашем месте появляется ваш иллюзорный двойник. Двойник существует, пока действует заклинание, но невидимость заканчивается, если вы атакуете или творите заклинание.',
    {
      source: 'PHB',
      classes: ['Бард', 'Волшебник'],
      sections: [
        { title: 'Двойник', text: 'Действием вы можете переместить иллюзорного двойника на расстояние до удвоенной вашей скорости и заставить его жестикулировать, говорить и вести себя так, как вы хотите.' },
        { title: 'Чувства двойника', text: 'Вы можете видеть его глазами и слышать его ушами, как если бы находились на его месте. В каждый свой ход бонусным действием вы можете переключиться с его чувств на свои или обратно. Пока вы пользуетесь его чувствами, по отношению к своему окружению вы ослеплены и оглохли.' }
      ]
    }
  ),
  // ── Заклинания 6 уровня (базовые, PHB / XGE / TCE) ────────────────
  spell(
    'conjure-fey', 'Вызов феи', 6, 'conjuration',
    '1 минута', '90 фт.', 'В, С', 'Концентрация, до 1 часа',
    ['concentration', 'support'],
    'Вы призываете фею с показателем опасности 6 или ниже или духа фей, принявшего облик зверя с показателем опасности 6 или ниже. Существо появляется в свободном пространстве, которое вы видите в пределах дистанции, и исчезает, когда его хиты опускаются до 0 или когда заклинание заканчивается.',
    {
      source: 'PHB',
      classes: ['Друид', 'Колдун'],
      sections: [
        { title: 'Союзник', text: 'Пока действует заклинание, фея дружелюбна к вам и вашим спутникам. Бросьте за неё инициативу: у неё свои ходы. Она выполняет ваши устные команды (вам это действия не стоит), если они не противоречат её мировоззрению. Если вы не отдаёте ей команд, она защищается от враждебных существ, а больше ничего не делает.' },
        { title: 'Потеря контроля', text: 'Если ваша концентрация прервана, фея не исчезает. Вместо этого вы теряете над ней контроль, она становится враждебна вам и вашим спутникам и может напасть. Фею, вышедшую из-под контроля, вы отпустить не можете; она исчезает через 1 час после призыва. Характеристики феи у Мастера.' },
        { title: 'На более высоких уровнях', text: 'Показатель опасности увеличивается на 1 за каждый уровень ячейки выше 6-го.' }
      ]
    }
  ),
  spell(
    'move-earth', 'Движение почвы', 6, 'transmutation',
    '1 действие', '120 фт.', 'В, С, М (железное лезвие и мешочек со смесью почв — глины, суглинка и песка)', 'Концентрация, до 2 часов',
    ['concentration', 'utility'],
    'Выберите в пределах дистанции участок местности со стороной не больше 40 футов. Пока действует заклинание, вы можете как угодно менять форму земли, песка или глины на этом участке: поднимать или опускать его, рыть или засыпать траншею, возводить или сравнивать вал, создавать столб. Размер любого такого изменения не может превышать половины наибольшего размера участка. Так, на квадрате 40 × 40 футов можно создать столб высотой до 20 футов, поднять или опустить квадрат на 20 футов, вырыть траншею глубиной до 20 футов и так далее. Каждое изменение занимает 10 минут.',
    {
      source: 'PHB',
      classes: ['Друид', 'Чародей', 'Волшебник', 'Изобретатель'],
      sections: [
        { title: 'Новый участок', text: 'В конце каждых 10 минут концентрации на заклинании вы можете выбрать новый участок местности.' },
        { title: 'Медленно', text: 'Местность меняется медленно, поэтому существ на участке её движение обычно не может поймать в ловушку или ранить.' },
        { title: 'Ограничения', text: 'Заклинание не может менять природный камень или каменные постройки. Камни и сооружения смещаются, подстраиваясь под новую местность. Если изменение местности делает сооружение неустойчивым, оно может обрушиться. Точно так же заклинание напрямую не влияет на рост растений: сдвинутая земля переносит растения вместе с собой.' }
      ]
    }
  ),
  spell(
    'wall-of-ice', 'Ледяная стена', 6, 'evocation',
    '1 действие', '120 фт.', 'В, С, М (кусочек кварца)', 'Концентрация, до 10 минут',
    ['concentration', 'damage', 'control'],
    'Вы создаёте ледяную стену на твёрдой поверхности в пределах дистанции. Вы можете придать ей форму полусферического купола или сферы радиусом до 10 футов либо сделать плоскую поверхность из десяти панелей 10 × 10 футов, каждая из которых должна примыкать к другой. В любой форме стена толщиной 1 фут и существует, пока действует заклинание.',
    {
      source: 'PHB',
      classes: ['Волшебник', 'Изобретатель'],
      sections: [
        { title: 'Появление', text: 'Если при появлении стена проходит через пространство существа, существо в её области выталкивается на одну из её сторон и совершает спасбросок Ловкости. При провале оно получает 10к6 урона холодом, при успехе — половину этого урона.' },
        { title: 'Прочность', text: 'Стена — предмет, которому можно причинить урон и пробить. У неё КД 12 и 30 хитов на каждую секцию 10 футов, и она уязвима к урону огнём. Секция стены с 0 хитов разрушается, а на её месте остаётся завеса морозного воздуха. Существо, которое впервые за ход проходит сквозь эту завесу, совершает спасбросок Телосложения и получает 5к6 урона холодом при провале или половину этого урона при успехе.' },
        { title: 'На более высоких уровнях', text: 'Урон стены при появлении увеличивается на 2к6, а урон от прохода сквозь морозный воздух — на 1к6 за каждый уровень ячейки выше 6-го.' }
      ]
    }
  ),
  spell(
    'arcane-gate', 'Магические врата', 6, 'conjuration',
    '1 действие', '500 фт.', 'В, С', 'Концентрация, до 10 минут',
    ['concentration', 'utility'],
    'Вы создаёте связанные порталы телепортации, которые остаются открытыми, пока действует заклинание. Выберите на земле две точки, которые видите: одну в пределах 10 футов от вас, другую в пределах 500 футов. Над каждой открывается круглый портал диаметром 10 футов. Если портал должен открыться в пространстве, занятом существом, заклинание не срабатывает, а сотворение потрачено впустую.',
    {
      source: 'PHB',
      classes: ['Чародей', 'Волшебник', 'Колдун'],
      sections: [
        { title: 'Порталы', text: 'Порталы — плоские светящиеся кольца, заполненные туманом. Они висят в нескольких дюймах над землёй, перпендикулярно ей, в выбранных точках. Кольцо видно только с одной стороны (на ваш выбор), и порталом служит именно она. Любое существо или предмет, вошедшие в портал, выходят из другого, как если бы два портала стояли вплотную; проход через кольцо с другой стороны ничего не даёт. Туман в порталах непрозрачен и закрывает обзор сквозь них.' },
        { title: 'Поворот', text: 'В свой ход вы можете бонусным действием повернуть кольца так, чтобы их рабочая сторона смотрела в другую сторону.' }
      ]
    }
  ),
  spell(
    'mental-prison', 'Ментальная тюрьма', 6, 'illusion',
    '1 действие', '60 фт.', 'С', 'Концентрация, до 1 минуты',
    ['concentration', 'damage', 'control'],
    'Вы пытаетесь заключить существо в иллюзорную темницу, которую видит только оно. Одно существо, которое вы видите в пределах дистанции, совершает спасбросок Интеллекта; если его нельзя очаровать, оно преуспевает автоматически. При провале цель получает 5к10 урона психической энергией, и вы делаете так, что пространство вокруг неё кажется ей чем-то опасным — например, кольцом огня, парящими бритвами или жуткими пастями, с зубов которых капает слюна. Каким бы ни был облик иллюзии, цель ничего не видит и не слышит за её пределами и опутана, пока действует заклинание. При успехе цель получает 5к10 урона психической энергией, и заклинание заканчивается.',
    {
      source: 'XGE',
      classes: ['Чародей', 'Волшебник', 'Колдун'],
      sections: [
        { title: 'Попытка выйти', text: 'Если цель вытащили из иллюзии, если она совершает сквозь неё рукопашную атаку или просовывает сквозь неё любую часть тела, она получает 10к10 урона психической энергией, и заклинание заканчивается.' }
      ]
    }
  ),
  spell(
    'ottos-irresistible-dance', 'Неудержимая пляска Отто', 6, 'enchantment',
    '1 действие', '30 фт.', 'В', 'Концентрация, до 1 минуты',
    ['concentration', 'control'],
    'Выберите одно существо, которое вы видите в пределах дистанции. Пока действует заклинание, цель пускается на месте в комичный пляс: шаркает, притоптывает и скачет. Существа, которых нельзя очаровать, невосприимчивы к этому заклинанию. Пляшущее существо должно тратить всё своё перемещение на пляс, не покидая своего пространства, и совершает с помехой спасброски Ловкости и броски атаки. Пока цель под действием заклинания, другие существа совершают с преимуществом броски атаки по ней. Действием пляшущее существо совершает спасбросок Мудрости, чтобы вернуть себе власть над собой. При успехе заклинание заканчивается.',
    {
      source: 'PHB',
      classes: ['Бард', 'Волшебник']
    }
  ),
  spell(
    'investiture-of-wind', 'Облачение ветра', 6, 'transmutation',
    '1 действие', 'На себя', 'В, С', 'Концентрация, до 10 минут',
    ['concentration', 'support', 'control'],
    'Пока заклинание не закончится, вокруг вас кружит ветер, и вы получаете следующие блага. Дальнобойные атаки оружием по вам совершаются с помехой. Вы получаете скорость полёта 60 футов; если вы ещё летите, когда заклинание заканчивается, вы падаете, если только не можете как-то этому помешать.',
    {
      source: 'XGE',
      classes: ['Друид', 'Чародей', 'Волшебник', 'Колдун'],
      sections: [
        { title: 'Вихрь', text: 'Действием вы можете создать куб кружащегося ветра со стороной 15 футов с центром в точке, которую видите в пределах 60 футов от себя. Каждое существо в этой области совершает спасбросок Телосложения и получает 2к10 дробящего урона при провале или половину этого урона при успехе. Существо размера Большой или меньше, проваливая спасбросок, к тому же отталкивается на расстояние до 10 футов от центра куба.' }
      ]
    }
  ),
  spell(
    'investiture-of-stone', 'Облачение камня', 6, 'transmutation',
    '1 действие', 'На себя', 'В, С', 'Концентрация, до 10 минут',
    ['concentration', 'support', 'control'],
    'Пока заклинание не закончится, ваше тело покрывают каменные пластинки, и вы получаете следующие блага. У вас есть сопротивление дробящему, колющему и рубящему урону от немагического оружия. Вы перемещаетесь по труднопроходимой местности из земли или камня, не тратя дополнительного перемещения.',
    {
      source: 'XGE',
      classes: ['Друид', 'Чародей', 'Волшебник', 'Колдун'],
      sections: [
        { title: 'Землетрясение', text: 'Действием вы можете вызвать небольшое землетрясение на земле в радиусе 15 футов с центром на вас. Другие существа на этой земле должны преуспеть в спасброске Ловкости, иначе оказываются сбиты с ног.' },
        { title: 'Сквозь камень', text: 'Вы можете двигаться сквозь сплошную землю или камень, как сквозь воздух и не расшатывая их, но не можете заканчивать там своё перемещение. Если вы закончили там перемещение, вас выталкивает в ближайшее свободное пространство, заклинание заканчивается, и вы ошеломлены до конца своего следующего хода.' }
      ]
    }
  ),
  spell(
    'investiture-of-ice', 'Облачение льда', 6, 'transmutation',
    '1 действие', 'На себя', 'В, С', 'Концентрация, до 10 минут',
    ['concentration', 'damage', 'control'],
    'Пока заклинание не закончится, ваше тело покрывает изморозь, и вы получаете следующие блага. У вас есть иммунитет к урону холодом и сопротивление урону огнём. Вы перемещаетесь по труднопроходимой местности из льда или снега, не тратя дополнительного перемещения. Земля в радиусе 10 футов вокруг вас покрыта льдом и является труднопроходимой местностью для всех, кроме вас; этот радиус движется вместе с вами.',
    {
      source: 'XGE',
      classes: ['Друид', 'Чародей', 'Волшебник', 'Колдун'],
      sections: [
        { title: 'Ледяной ветер', text: 'Действием вы можете выпустить из вытянутой руки конус морозного ветра длиной 15 футов в выбранном вами направлении. Каждое существо в конусе совершает спасбросок Телосложения и получает 4к6 урона холодом при провале или половину этого урона при успехе. У существа, проваливающего этот спасбросок, скорость уменьшается вдвое до начала вашего следующего хода.' }
      ]
    }
  ),
  spell(
    'investiture-of-flame', 'Облачение огня', 6, 'transmutation',
    '1 действие', 'На себя', 'В, С', 'Концентрация, до 10 минут',
    ['concentration', 'damage', 'support'],
    'Пока действует заклинание, по вашему телу бежит пламя, излучая яркий свет в радиусе 30 футов и тусклый свет ещё на 30 футов. Пламя не причиняет вам вреда. Пока заклинание не закончится, вы получаете следующие блага. У вас есть иммунитет к урону огнём и сопротивление урону холодом. Каждое существо, которое впервые за ход оказывается в пределах 5 футов от вас или заканчивает там ход, получает 1к10 урона огнём.',
    {
      source: 'XGE',
      classes: ['Друид', 'Чародей', 'Волшебник', 'Колдун'],
      sections: [
        { title: 'Огненная линия', text: 'Действием вы можете выпустить от себя линию огня длиной 15 футов и шириной 5 футов в выбранном вами направлении. Каждое существо на линии совершает спасбросок Ловкости и получает 4к8 урона огнём при провале или половину этого урона при успехе.' }
      ]
    }
  ),
  spell(
    'flesh-to-stone', 'Окаменение', 6, 'transmutation',
    '1 действие', '60 фт.', 'В, С, М (щепотка извести, немного воды и земли)', 'Концентрация, до 1 минуты',
    ['concentration', 'control'],
    'Вы пытаетесь обратить в камень одно существо, которое видите в пределах дистанции. Если тело цели из плоти, существо совершает спасбросок Телосложения. При провале оно опутано: его плоть начинает твердеть. При успехе существо не подвержено заклинанию.',
    {
      source: 'PHB',
      classes: ['Волшебник', 'Колдун'],
      sections: [
        { title: 'Окаменение', text: 'Опутанное этим заклинанием существо в конце каждого своего хода совершает ещё один спасбросок Телосложения. Если оно три раза преуспевает в спасброске против этого заклинания, заклинание заканчивается. Если оно три раза проваливает спасбросок, то обращается в камень и окаменевает на время действия заклинания. Успехи и провалы не обязаны идти подряд: считайте и те и другие, пока цель не наберёт три одинаковых.' },
        { title: 'Повреждения', text: 'Если окаменевшее существо физически повредили, то, вернувшись в прежнее состояние, оно получает похожие увечья.' },
        { title: 'Навсегда', text: 'Если вы поддерживаете концентрацию на заклинании всю его возможную длительность, существо остаётся каменным, пока эффект не снимут.' }
      ]
    }
  ),
  spell(
    'primordial-ward', 'Первородный страж', 6, 'abjuration',
    '1 действие', 'На себя', 'В, С', 'Концентрация, до 1 минуты',
    ['concentration', 'support'],
    'Пока действует заклинание, у вас есть сопротивление урону кислотой, холодом, огнём, электричеством и звуком. Когда вы получаете урон одного из этих видов, вы можете реакцией получить иммунитет к нему, в том числе к урону, вызвавшему реакцию. Тогда сопротивления заканчиваются, а иммунитет держится до конца вашего следующего хода, и затем заклинание заканчивается.',
    {
      source: 'XGE',
      classes: ['Друид']
    }
  ),
  spell(
    'find-the-path', 'Поиск пути', 6, 'divination',
    '1 минута', 'На себя', 'В, С, М (набор гадальных принадлежностей — например, кости, палочки из слоновой кости, карты, зубы или резные руны — стоимостью 100 с.м. и предмет из места, которое вы хотите найти)', 'Концентрация, до 1 дня',
    ['concentration', 'utility'],
    'Заклинание позволяет найти самый короткий и прямой путь к определённому неподвижному месту, которое вам знакомо и находится на одном с вами плане существования. Если вы называете место на другом плане существования, движущееся место (например, передвижную крепость) или место без определённости (например, «логово зелёного дракона»), заклинание не срабатывает.',
    {
      source: 'PHB',
      classes: ['Бард', 'Жрец', 'Друид'],
      sections: [
        { title: 'В пути', text: 'Пока заклинание действует и вы на одном плане существования с местом назначения, вы знаете, как далеко оно и в какой стороне. Пока вы идёте туда, на каждой развилке вы автоматически определяете, какой путь самый короткий и прямой (но не обязательно самый безопасный).' }
      ]
    }
  ),
  spell(
    'tashas-otherworldly-guise', 'Потусторонний облик Таши', 6, 'transmutation',
    '1 бонусное действие', 'На себя', 'В, С, М (предмет с вырезанным символом Внешних планов стоимостью не менее 500 с.м.)', 'Концентрация, до 1 минуты',
    ['concentration', 'support'],
    'Произнеся заклинание, вы черпаете магию Нижних или Верхних планов (на ваш выбор) и преображаетесь. Пока заклинание не закончится, вы получаете следующие блага.',
    {
      source: 'TCE',
      classes: ['Чародей', 'Волшебник', 'Колдун'],
      sections: [
        { title: 'Защита', text: 'У вас иммунитет к урону огнём и ядом (Нижние планы) или к урону излучением и некротической энергией (Верхние планы). У вас иммунитет к состоянию «отравлен» (Нижние планы) или «очарован» (Верхние планы).' },
        { title: 'Крылья', text: 'За спиной появляются призрачные крылья, и вы получаете скорость полёта 40 футов. Вы получаете бонус +2 к КД.' },
        { title: 'Оружие', text: 'Все ваши атаки оружием магические, и, атакуя оружием, вы можете использовать для бросков атаки и урона модификатор заклинательной характеристики вместо Силы или Ловкости. Совершая в свой ход действие Атака, вы можете атаковать дважды, а не один раз; если у вас уже есть умение вроде Дополнительной атаки, которое позволяет атаковать больше одного раза действием Атака, этим благом вы не пользуетесь.' }
      ]
    }
  ),
  spell(
    'summon-fiend', 'Призыв духа исчадия', 6, 'conjuration',
    '1 действие', '90 фт.', 'В, С, М (кровь гуманоида во флаконе из рубина стоимостью не менее 600 с.м.)', 'Концентрация, до 1 часа',
    ['concentration', 'support'],
    'Вы призываете духа-исчадие. Он принимает телесный облик в свободном пространстве, которое вы видите в пределах дистанции, и использует блок статистики «Дух исчадия». При сотворении выберите облик: демон, дьявол или юголот. Дух похож на исчадие этого вида, и от выбора зависят некоторые черты в его блоке статистики. Существо исчезает, когда его хиты опускаются до 0 или когда заклинание заканчивается.',
    {
      source: 'TCE',
      classes: ['Волшебник', 'Колдун'],
      sections: [
        { title: 'В бою', text: 'Дух — союзник вам и вашим спутникам. В бою он действует на вашей инициативе, но свой ход совершает сразу после вашего. Он подчиняется вашим устным командам (вам это действия не стоит). Если вы ничего не приказываете, он совершает действие Уклонение и перемещается, чтобы избегать опасности.' },
        { title: 'На более высоких уровнях', text: 'Уровень заклинания в блоке статистики считается равным уровню использованной ячейки.' }
      ]
    }
  ),
  spell(
    'eyebite', 'Разящее око', 6, 'necromancy',
    '1 действие', 'На себя', 'В, С', 'Концентрация, до 1 минуты',
    ['concentration', 'control'],
    'Пока действует заклинание, ваши глаза становятся чернильной пустотой, полной жуткой силы. Одно выбранное вами существо, которое вы видите в пределах 60 футов от вас, должно преуспеть в спасброске Мудрости, иначе на всю длительность попадает под один из эффектов ниже на ваш выбор. В каждый свой ход, пока заклинание не закончится, вы можете действием выбрать целью другое существо, но не то, которое уже преуспело в спасброске против этого сотворения.',
    {
      source: 'PHB',
      classes: ['Бард', 'Чародей', 'Волшебник', 'Колдун'],
      sections: [
        { title: 'Сон', text: 'Цель теряет сознание. Она просыпается, если получает любой урон или если другое существо действием растолкает её.' },
        { title: 'Паника', text: 'Цель испугана вами. В каждый свой ход испуганное существо должно совершать действие Рывок и уходить от вас самым безопасным и коротким путём, если только ему есть куда идти. Если цель оказывается в месте не ближе 60 футов от вас, откуда больше вас не видит, эффект заканчивается.' },
        { title: 'Хворь', text: 'Цель совершает с помехой броски атаки и проверки характеристик. В конце каждого своего хода она может совершить ещё один спасбросок Мудрости и при успехе избавляется от эффекта.' }
      ]
    }
  ),
  spell(
    'sunbeam', 'Солнечный луч', 6, 'evocation',
    '1 действие', 'На себя (линия 60 фт.)', 'В, С, М (увеличительное стекло)', 'Концентрация, до 1 минуты',
    ['concentration', 'damage'],
    'Из вашей руки вырывается луч яркого света — линия шириной 5 футов и длиной 60 футов. Каждое существо на линии совершает спасбросок Телосложения. При провале существо получает 6к8 урона излучением и ослеплено до вашего следующего хода. При успехе оно получает половину урона и не ослеплено этим заклинанием. Нежить и слизи совершают этот спасбросок с помехой.',
    {
      source: 'PHB',
      classes: ['Друид', 'Волшебник'],
      sections: [
        { title: 'Новый луч', text: 'Пока заклинание не закончится, в любой ход вы можете действием создать новую линию сияния.' },
        { title: 'Свет', text: 'Пока действует заклинание, в вашей руке сияет яркая искра. Она излучает яркий свет в радиусе 30 футов и тусклый свет ещё на 30 футов. Этот свет — солнечный.' }
      ]
    }
  ),
  spell(
    'blade-barrier', 'Стена клинков', 6, 'evocation',
    '1 действие', '90 фт.', 'В, С', 'Концентрация, до 10 минут',
    ['concentration', 'damage', 'control'],
    'Вы создаёте вертикальную стену из вращающихся, острых как бритва клинков магической энергии. Стена появляется в пределах дистанции и существует, пока действует заклинание. Она может быть прямой — длиной до 100 футов, высотой 20 футов и толщиной 5 футов — или кольцом диаметром до 60 футов, высотой 20 футов и толщиной 5 футов. Стена даёт существам за ней укрытие на три четверти, а её пространство — труднопроходимая местность.',
    {
      source: 'PHB',
      classes: ['Жрец'],
      sections: [
        { title: 'Клинки', text: 'Когда существо впервые за ход входит в область стены или начинает в ней ход, оно совершает спасбросок Ловкости. При провале существо получает 6к10 рубящего урона, при успехе — половину этого урона.' }
      ]
    }
  ),
  spell(
    'globe-of-invulnerability', 'Сфера неуязвимости', 6, 'abjuration',
    '1 действие', 'На себя (радиус 10 фт.)', 'В, С, М (стеклянная бусина)', 'Концентрация, до 1 минуты',
    ['concentration', 'support'],
    'Вокруг вас в радиусе 10 футов возникает неподвижная, слабо мерцающая преграда и держится, пока действует заклинание. Заклинание 5-го уровня или ниже, сотворённое снаружи преграды, не может подействовать на существ и предметы внутри неё, даже если сотворено ячейкой более высокого уровня. Такое заклинание может нацелиться на существ и предметы внутри преграды, но ничего им не сделает. Точно так же область внутри преграды исключается из областей таких заклинаний.',
    {
      source: 'PHB',
      classes: ['Волшебник', 'Чародей'],
      sections: [
        { title: 'На более высоких уровнях', text: 'За каждый уровень ячейки выше 6-го преграда не пропускает заклинания на один уровень выше.' }
      ]
    }
  ),
  spell(
    'wall-of-thorns', 'Терновая стена', 6, 'conjuration',
    '1 действие', '120 фт.', 'В, С, М (горсть колючек)', 'Концентрация, до 10 минут',
    ['concentration', 'damage', 'control'],
    'Вы создаёте стену из прочного, гибкого, спутанного кустарника, усеянного острыми как иглы шипами. Стена появляется на твёрдой поверхности в пределах дистанции и существует, пока действует заклинание. Она может быть длиной до 60 футов, высотой 10 футов и толщиной 5 футов или кольцом диаметром 20 футов, высотой до 20 футов и толщиной 5 футов. Стена закрывает обзор.',
    {
      source: 'PHB',
      classes: ['Друид'],
      sections: [
        { title: 'Появление', text: 'Когда стена появляется, каждое существо в её области совершает спасбросок Ловкости. При провале существо получает 7к8 колющего урона, при успехе — половину этого урона.' },
        { title: 'Сквозь шипы', text: 'Существо может пробираться сквозь стену, хоть и медленно и мучительно: каждый фут перемещения сквозь стену стоит ему 4 фута. Кроме того, когда существо впервые за ход входит в стену или заканчивает в ней ход, оно совершает спасбросок Ловкости и получает 7к8 рубящего урона при провале или половину этого урона при успехе.' },
        { title: 'На более высоких уровнях', text: 'Урон обоих видов увеличивается на 1к8 за каждый уровень ячейки выше 6-го.' }
      ]
    }
  ),
  spell(
    'tensers-transformation', 'Трансформация Тензера', 6, 'transmutation',
    '1 действие', 'На себя', 'В, С, М (несколько волосков быка)', 'Концентрация, до 10 минут',
    ['concentration', 'support'],
    'Вы наделяете себя выносливостью и боевым мастерством, которые питает магия. Пока заклинание не закончится, вы не можете творить заклинания и получаете следующие блага.',
    {
      source: 'XGE',
      classes: ['Волшебник'],
      sections: [
        { title: 'Блага', text: 'Вы получаете 50 временных хитов; если какие-то из них останутся, когда заклинание закончится, они пропадают. Вы совершаете с преимуществом броски атаки простым и воинским оружием. Когда вы попадаете по цели атакой оружием, она получает дополнительно 2к12 урона силовым полем. Вы владеете всеми доспехами, щитами, простым и воинским оружием, а также спасбросками Силы и Телосложения. Совершая в свой ход действие Атака, вы можете атаковать дважды, а не один раз; если у вас уже есть умение вроде Дополнительной атаки, которое даёт лишние атаки, этим благом вы не пользуетесь.' },
        { title: 'После', text: 'Сразу после окончания заклинания вы должны преуспеть в спасброске Телосложения со СЛ 15, иначе получаете одну степень истощения.' }
      ]
    }
  ),
  // ── Заклинания 7 уровня (базовые, PHB / XGE) ──────────────────────
  spell(
    'conjure-celestial', 'Вызов небожителя', 7, 'conjuration',
    '1 минута', '90 фт.', 'В, С', 'Концентрация, до 1 часа',
    ['concentration', 'support', 'healing'],
    'Вы призываете небожителя с показателем опасности 4 или ниже. Он появляется в свободном пространстве, которое вы видите в пределах дистанции, и исчезает, когда его хиты опускаются до 0 или когда заклинание заканчивается.',
    {
      source: 'PHB',
      classes: ['Жрец'],
      sections: [
        { title: 'Союзник', text: 'Пока действует заклинание, небожитель дружелюбен к вам и вашим спутникам. Бросьте за него инициативу: у него свои ходы. Он выполняет ваши устные команды (вам это действия не стоит), если они не противоречат его мировоззрению. Если вы не отдаёте ему команд, он защищается от враждебных существ, а больше ничего не делает. Характеристики небожителя у Мастера.' },
        { title: 'На более высоких уровнях', text: 'Ячейкой 9-го уровня вы призываете небожителя с показателем опасности 5 или ниже.' }
      ]
    }
  ),
  spell(
    'delayed-blast-fireball', 'Замедленный огненный шар', 7, 'evocation',
    '1 действие', '150 фт.', 'В, С, М (щепотка гуано летучей мыши и сера)', 'Концентрация, до 1 минуты',
    ['concentration', 'damage'],
    'Из вашего указательного пальца вырывается луч жёлтого света, сгущается в выбранной точке в пределах дистанции и висит там светящейся бусиной, пока действует заклинание. Когда заклинание заканчивается — потому что ваша концентрация прервалась или потому что вы решили его окончить, — бусина с глухим рёвом расцветает огненным взрывом, который огибает углы. Каждое существо в сфере радиусом 20 футов с центром в этой точке совершает спасбросок Ловкости и получает урон огнём, равный всему накопленному урону, при провале или половину этого урона при успехе.',
    {
      source: 'PHB',
      classes: ['Волшебник', 'Чародей'],
      sections: [
        { title: 'Накопление', text: 'Базово заклинание наносит 12к6 урона огнём. Если в конце вашего хода бусина ещё не взорвалась, урон увеличивается на 1к6.' },
        { title: 'Бусина', text: 'Если до срока кто-то касается светящейся бусины, коснувшееся существо совершает спасбросок Ловкости. При провале заклинание тут же заканчивается, и бусина взрывается пламенем. При успехе существо может бросить бусину на расстояние до 40 футов. Когда она ударяется о существо или твёрдый предмет, заклинание заканчивается, и бусина взрывается. Огонь повреждает предметы в области и поджигает горючие предметы, которые никто не носит и не несёт.' },
        { title: 'На более высоких уровнях', text: 'Базовый урон увеличивается на 1к6 за каждый уровень ячейки выше 7-го.' }
      ]
    }
  ),
  spell(
    'reverse-gravity', 'Изменение тяготения', 7, 'transmutation',
    '1 действие', '100 фт.', 'В, С, М (магнетит и железные опилки)', 'Концентрация, до 1 минуты',
    ['concentration', 'control'],
    'Заклинание обращает тяготение в цилиндре радиусом 50 футов и высотой 100 футов с центром в точке в пределах дистанции. Все существа и предметы в области, которые как-то не закреплены на земле, при сотворении падают вверх и достигают верха области. Существо может совершить спасбросок Ловкости, чтобы ухватиться за неподвижный предмет в пределах досягаемости и так избежать падения. Если на пути падения встречается твёрдый предмет (например, потолок), падающие предметы и существа ударяются о него так же, как при обычном падении вниз. Предмет или существо, достигшее верха области ни обо что не ударившись, остаётся там, слегка покачиваясь, пока действует заклинание. Когда длительность истекает, затронутые предметы и существа падают обратно вниз.',
    {
      source: 'PHB',
      classes: ['Друид', 'Чародей', 'Волшебник', 'Изобретатель']
    }
  ),
  spell(
    'mordenkainens-sword', 'Меч Морденкайнена', 7, 'evocation',
    '1 действие', '60 фт.', 'В, С, М (миниатюрный платиновый меч с рукоятью и навершием из меди и цинка стоимостью 250 с.м.)', 'Концентрация, до 1 минуты',
    ['concentration', 'damage'],
    'Вы создаёте плоскость силового поля в форме меча, которая парит в пределах дистанции и существует, пока действует заклинание. Когда меч появляется, вы совершаете рукопашную атаку заклинанием по выбранной вами цели в пределах 5 футов от меча. При попадании цель получает 3к10 урона силовым полем. Пока заклинание не закончится, в каждый свой ход вы можете бонусным действием переместить меч на расстояние до 20 футов в точку, которую видите, и повторить эту атаку по той же цели или по другой.',
    {
      source: 'PHB',
      classes: ['Бард', 'Волшебник', 'Изобретатель']
    }
  ),
  spell(
    'project-image', 'Проекция', 7, 'illusion',
    '1 действие', '500 миль', 'В, С, М (маленькая копия вас стоимостью не менее 5 с.м.)', 'Концентрация, до 1 дня',
    ['concentration', 'utility'],
    'Вы создаёте свою иллюзорную копию, которая существует, пока действует заклинание. Копия может появиться в любом месте в пределах дистанции, которое вы раньше видели, независимо от преград между вами. Иллюзия выглядит и звучит как вы, но неосязаема. Если иллюзия получает любой урон, она исчезает, и заклинание заканчивается.',
    {
      source: 'PHB',
      classes: ['Бард', 'Волшебник'],
      sections: [
        { title: 'Двойник', text: 'Действием вы можете переместить иллюзию на расстояние до удвоенной вашей скорости и заставить её жестикулировать, говорить и вести себя так, как вы хотите. Она в точности повторяет ваши манеры.' },
        { title: 'Чувства копии', text: 'Вы можете видеть её глазами и слышать её ушами, как если бы находились на её месте. В свой ход бонусным действием вы можете переключиться с её чувств на свои или обратно. Пока вы пользуетесь её чувствами, по отношению к своему окружению вы ослеплены и оглохли.' },
        { title: 'Разоблачение', text: 'Физическое взаимодействие с образом показывает, что это иллюзия: предметы проходят сквозь него. Существо, которое действием изучает образ, может понять, что это иллюзия, преуспев в проверке Интеллекта (Анализ) против СЛ спасброска ваших заклинаний. Распознавшее иллюзию существо видит сквозь образ, а все его звуки кажутся ему пустыми.' }
      ]
    }
  ),
  spell(
    'whirlwind', 'Смерч', 7, 'evocation',
    '1 действие', '300 фт.', 'В, М (соломинка)', 'Концентрация, до 1 минуты',
    ['concentration', 'damage', 'control'],
    'В точку на земле, которую вы видите в пределах дистанции, с воем опускается вихрь — цилиндр радиусом 10 футов и высотой 30 футов с центром в этой точке. Пока заклинание не закончится, вы можете действием переместить вихрь по земле на расстояние до 30 футов в любом направлении. Вихрь засасывает все незакреплённые предметы размера Средний или меньше, которые никто не носит и не несёт.',
    {
      source: 'XGE',
      classes: ['Друид', 'Чародей', 'Волшебник'],
      sections: [
        { title: 'Удар вихря', text: 'Существо совершает спасбросок Ловкости, когда впервые за ход входит в вихрь или вихрь входит в его пространство, в том числе когда вихрь появляется. Существо получает 10к6 дробящего урона при провале или половину этого урона при успехе. Кроме того, существо размера Большой или меньше, проваливающее этот спасбросок, должно преуспеть в спасброске Силы, иначе опутано в вихре, пока заклинание не закончится.' },
        { title: 'В вихре', text: 'Когда опутанное вихрем существо начинает ход, его поднимает внутри вихря на 5 футов выше, если оно ещё не наверху. Опутанное существо движется вместе с вихрем и падает, когда заклинание заканчивается, если у него нет способа удержаться в воздухе. Опутанное существо может действием совершить проверку Силы или Ловкости против СЛ спасброска ваших заклинаний. При успехе оно больше не опутано, и вихрь отбрасывает его на 3к6 × 10 футов в случайном направлении.' }
      ]
    }
  ),
  // ── Заклинания 8 уровня (базовые, PHB / XGE) ──────────────────────
  spell(
    'holy-aura', 'Аура святости', 8, 'abjuration',
    '1 действие', 'На себя (радиус 30 фт.)', 'В, С, М (крошечный реликварий стоимостью не менее 1000 с.м. с реликвией святого)', 'Концентрация, до 1 минуты',
    ['concentration', 'support'],
    'От вас исходит божественный свет и сгущается мягким сиянием в радиусе 30 футов вокруг вас. Существа на ваш выбор, находящиеся в этом радиусе при сотворении, излучают тусклый свет в радиусе 5 футов и совершают с преимуществом все спасброски, а другие существа совершают с помехой броски атаки по ним, пока заклинание не закончится.',
    {
      source: 'PHB',
      classes: ['Жрец'],
      sections: [
        { title: 'Вспышка', text: 'Кроме того, когда исчадие или нежить попадает по затронутому существу рукопашной атакой, аура вспыхивает ярким светом. Атакующий должен преуспеть в спасброске Телосложения, иначе ослеплён, пока заклинание не закончится.' }
      ]
    }
  ),
  spell(
    'control-weather', 'Власть над погодой', 8, 'transmutation',
    '10 минут', 'На себя (радиус 5 миль)', 'В, С, М (горящие благовония и кусочки земли и дерева, смешанные с водой)', 'Концентрация, до 8 часов',
    ['concentration', 'control'],
    'Пока действует заклинание, вы управляете погодой в пределах 5 миль от себя. Творить заклинание можно только под открытым небом. Если вы переходите туда, откуда нет прямого пути к небу, заклинание досрочно заканчивается.',
    {
      source: 'PHB',
      classes: ['Жрец', 'Друид', 'Волшебник'],
      sections: [
        { title: 'Смена погоды', text: 'При сотворении вы меняете нынешние погодные условия, которые определяет Мастер исходя из климата и времени года. Можно менять осадки, температуру и ветер. Новые условия устанавливаются за 1к4 × 10 минут. После этого условия можно менять снова. Когда заклинание заканчивается, погода постепенно возвращается к обычной. Меняя условия, найдите нынешнее условие в списках ниже и сдвиньте его стадию на одну вверх или вниз. Меняя ветер, можно менять и его направление.' },
        { title: 'Осадки', text: '1 — ясно; 2 — лёгкая облачность; 3 — пасмурно или туман у земли; 4 — дождь, град или снег; 5 — ливень, сильный град или метель.' },
        { title: 'Температура', text: '1 — невыносимая жара; 2 — жарко; 3 — тепло; 4 — прохладно; 5 — холодно; 6 — арктический холод.' },
        { title: 'Ветер', text: '1 — штиль; 2 — умеренный ветер; 3 — сильный ветер; 4 — штормовой ветер; 5 — буря.' }
      ]
    }
  ),
  spell(
    'incendiary-cloud', 'Воспламеняющаяся туча', 8, 'conjuration',
    '1 действие', '150 фт.', 'В, С', 'Концентрация, до 1 минуты',
    ['concentration', 'damage', 'control'],
    'В сфере радиусом 20 футов с центром в точке в пределах дистанции появляется клубящееся облако дыма, пронизанное раскалёнными добела угольками. Облако огибает углы, его область сильно заслонена. Оно держится, пока действует заклинание или пока его не развеет ветер скоростью не ниже умеренной (не меньше 10 миль в час).',
    {
      source: 'PHB',
      classes: ['Чародей', 'Волшебник'],
      sections: [
        { title: 'Жар', text: 'Когда облако появляется, каждое существо в нём совершает спасбросок Ловкости и получает 10к8 урона огнём при провале или половину этого урона при успехе. Этот спасбросок существо совершает и тогда, когда впервые за ход входит в область заклинания или заканчивает в ней ход.' },
        { title: 'Движение', text: 'В начале каждого вашего хода облако сдвигается на 10 футов прямо от вас в выбранном вами направлении.' }
      ]
    }
  ),
  spell(
    'earthquake', 'Землетрясение', 8, 'evocation',
    '1 действие', '500 фт.', 'В, С, М (щепотка земли, кусочек камня и комок глины)', 'Концентрация, до 1 минуты',
    ['concentration', 'damage', 'control'],
    'Вы вызываете сейсмическое возмущение в точке на земле, которую видите в пределах дистанции. Пока действует заклинание, сильный толчок сотрясает землю в круге радиусом 100 футов с центром в этой точке и трясёт существ и сооружения, соприкасающиеся с землёй в этой области. Земля в области становится труднопроходимой местностью.',
    {
      source: 'PHB',
      classes: ['Жрец', 'Друид', 'Чародей'],
      sections: [
        { title: 'Толчки', text: 'Когда вы творите заклинание и в конце каждого хода, который вы проводите, концентрируясь на нём, каждое существо на земле в области совершает спасбросок Ловкости. При провале существо оказывается сбито с ног.' },
        { title: 'Концентрация', text: 'Каждое существо на земле в области, которое концентрируется, совершает спасбросок Телосложения. При провале его концентрация прерывается.' },
        { title: 'Местность', text: 'В зависимости от местности в области у заклинания могут быть дополнительные эффекты — их определяет Мастер.' },
        { title: 'Трещины', text: 'В начале вашего следующего хода после сотворения по всей области заклинания открываются трещины — всего 1к6 штук в местах, выбранных Мастером. Каждая глубиной 1к10 × 10 футов, шириной 10 футов и тянется от одного края области заклинания до противоположного. Существо, стоящее там, где открывается трещина, должно преуспеть в спасброске Ловкости, иначе падает в неё. Преуспевшее существо смещается вместе с краем раскрывающейся трещины. Трещина, открывшаяся под сооружением, автоматически обрушивает его (см. ниже).' },
        { title: 'Сооружения', text: 'Толчок наносит 50 дробящего урона каждому сооружению, соприкасающемуся с землёй в области, при сотворении заклинания и в начале каждого вашего хода, пока заклинание не закончится. Если хиты сооружения опускаются до 0, оно обрушивается и может ранить существ поблизости. Существо, находящееся от сооружения не дальше половины его высоты, совершает спасбросок Ловкости. При провале оно получает 5к6 дробящего урона, оказывается сбито с ног и погребено под обломками; чтобы выбраться, нужно действием преуспеть в проверке Силы (Атлетика) со СЛ 20. Мастер может повысить или понизить СЛ в зависимости от обломков. При успехе существо получает половину урона, не падает и не погребено.' }
      ]
    }
  ),
  spell(
    'illusory-dragon', 'Иллюзорный дракон', 8, 'illusion',
    '1 действие', '120 фт.', 'С', 'Концентрация, до 1 минуты',
    ['concentration', 'damage', 'control'],
    'Собрав нити теневого вещества из Царства теней, вы создаёте в свободном пространстве, которое видите в пределах дистанции, теневого дракона размера Огромный. Иллюзия держится, пока действует заклинание, и занимает своё пространство, как существо. Когда иллюзия появляется, каждый ваш враг, который её видит, должен преуспеть в спасброске Мудрости, иначе на 1 минуту испуган ею. Если испуганное существо заканчивает ход там, откуда не видит иллюзию, оно может повторить спасбросок и при успехе избавляется от эффекта.',
    {
      source: 'XGE',
      classes: ['Волшебник'],
      sections: [
        { title: 'Дыхание', text: 'Бонусным действием в свой ход вы можете переместить иллюзию на расстояние до 60 футов. В любой момент этого перемещения вы можете заставить её выдохнуть поток энергии конусом длиной 60 футов из своего пространства. Создавая дракона, выберите вид урона: кислота, холод, огонь, электричество, некротическая энергия или яд. Каждое существо в конусе совершает спасбросок Интеллекта и получает 7к6 урона выбранного вида при провале или половину этого урона при успехе.' },
        { title: 'Иллюзия', text: 'Иллюзия осязаема благодаря теневому веществу, из которого создана, но атаки по ней автоматически промахиваются, она преуспевает во всех спасбросках и невосприимчива ко всем видам урона и ко всем состояниям. Существо, которое действием изучает дракона, может понять, что это иллюзия, преуспев в проверке Интеллекта (Анализ) против СЛ спасброска ваших заклинаний. Распознавшее иллюзию существо видит сквозь неё и совершает с преимуществом спасброски от её дыхания.' }
      ]
    }
  ),
  spell(
    'maze', 'Лабиринт', 8, 'conjuration',
    '1 действие', '60 фт.', 'В, С', 'Концентрация, до 10 минут',
    ['concentration', 'control'],
    'Вы изгоняете существо, которое видите в пределах дистанции, на полуплан-лабиринт. Цель остаётся там, пока действует заклинание или пока она не выберется из лабиринта. Действием цель может попытаться выбраться: она совершает проверку Интеллекта со СЛ 20. При успехе она выбирается, и заклинание заканчивается (минотавр или демон гористро преуспевает автоматически). Когда заклинание заканчивается, цель появляется в пространстве, которое покинула, или, если оно занято, в ближайшем свободном пространстве.',
    {
      source: 'PHB',
      classes: ['Волшебник']
    }
  ),
  spell(
    'maddening-darkness', 'Одуряющая тьма', 8, 'evocation',
    '1 действие', '150 фт.', 'В, М (капля смолы, смешанная с каплей ртути)', 'Концентрация, до 10 минут',
    ['concentration', 'damage', 'control'],
    'Из выбранной вами точки в пределах дистанции расползается магическая тьма и заполняет сферу радиусом 60 футов, пока заклинание не закончится. Тьма огибает углы. Существо с тёмным зрением сквозь неё не видит. Ни немагический свет, ни свет от заклинаний 8-го уровня и ниже не может осветить эту область. Внутри сферы слышны вопли, бормотание и безумный смех. Каждый раз, когда существо начинает ход в сфере, оно совершает спасбросок Мудрости и получает 8к8 урона психической энергией при провале или половину этого урона при успехе.',
    {
      source: 'XGE',
      classes: ['Волшебник', 'Колдун']
    }
  ),
  spell(
    'dominate-monster', 'Подчинение чудовища', 8, 'enchantment',
    '1 действие', '60 фт.', 'В, С', 'Концентрация, до 1 часа',
    ['concentration', 'control'],
    'Вы пытаетесь подчинить существо, которое видите в пределах дистанции. Оно должно преуспеть в спасброске Мудрости, иначе очаровано вами, пока действует заклинание. Если вы или дружественные вам существа сражаетесь с ним, оно совершает спасбросок с преимуществом.',
    {
      source: 'PHB',
      classes: ['Бард', 'Чародей', 'Волшебник', 'Колдун'],
      sections: [
        { title: 'Команды', text: 'Пока существо очаровано, у вас с ним телепатическая связь, если вы оба на одном плане существования. Пока вы в сознании, вы можете через эту связь отдавать существу команды (действия это не требует), и оно старается их выполнить. Можно указать простой и общий образ действий, например «Атакуй это существо», «Беги туда» или «Принеси этот предмет». Если существо выполнило приказ и больше указаний от вас не получило, оно защищается и бережёт себя как может.' },
        { title: 'Полный контроль', text: 'Действием вы можете взять цель под полный и точный контроль. До конца вашего следующего хода существо совершает только выбранные вами действия и не делает ничего, что вы не разрешаете. В это время вы также можете заставить существо совершить реакцию, но для этого вам нужно потратить и свою реакцию.' },
        { title: 'Урон', text: 'Каждый раз, когда цель получает урон, она совершает новый спасбросок Мудрости против заклинания. При успехе заклинание заканчивается.' },
        { title: 'На более высоких уровнях', text: 'Ячейкой 9-го уровня длительность — концентрация, вплоть до 8 часов.' }
      ]
    }
  ),
  spell(
    'animal-shapes', 'Превращение в животных', 8, 'transmutation',
    '1 действие', '30 фт.', 'В, С', 'Концентрация, до 24 часов',
    ['concentration', 'support'],
    'Ваша магия превращает других в зверей. Выберите любое число согласных существ, которых вы видите в пределах дистанции. Вы превращаете каждую цель в зверя размера Большой или меньше с показателем опасности 4 или ниже. В последующие ходы вы можете действием превращать затронутых существ в новые облики.',
    {
      source: 'PHB',
      classes: ['Друид'],
      sections: [
        { title: 'Сколько длится', text: 'Превращение длится для каждой цели всю длительность заклинания или пока её хиты не опустятся до 0 или она не умрёт. Для каждой цели можно выбрать свой облик.' },
        { title: 'Новый облик', text: 'Игровые параметры цели заменяются параметрами выбранного зверя, но цель сохраняет мировоззрение и значения Интеллекта, Мудрости и Харизмы. Цель получает хиты нового облика, а вернувшись в обычный облик, снова имеет столько хитов, сколько было до превращения. Если она вернулась потому, что её хиты опустились до 0, лишний урон переносится на обычный облик; если он не опускает хиты обычного облика до 0, существо не теряет сознание. Существо может совершать только те действия, которые позволяет новый облик, и не может говорить и творить заклинания.' },
        { title: 'Снаряжение', text: 'Снаряжение цели сливается с новым обликом. Цель не может активировать, использовать, держать своё снаряжение или иначе получать от него пользу.' }
      ]
    }
  ),
  spell(
    'antimagic-field', 'Преграда магии', 8, 'abjuration',
    '1 действие', 'На себя (радиус 10 фт.)', 'В, С, М (щепотка железного порошка или железных опилок)', 'Концентрация, до 1 часа',
    ['concentration', 'support'],
    'Вас окружает невидимая сфера антимагии радиусом 10 футов. Эта область отрезана от магической энергии, пронизывающей мироздание. Внутри сферы нельзя творить заклинания, призванные существа исчезают, и даже магические предметы становятся обычными. Пока заклинание не закончится, сфера движется вместе с вами, оставаясь с центром на вас.',
    {
      source: 'PHB',
      classes: ['Жрец', 'Волшебник'],
      sections: [
        { title: 'Подавление', text: 'Заклинания и другие магические эффекты, кроме созданных артефактом или божеством, в сфере подавлены и не могут в неё проникнуть. Ячейка, потраченная на подавленное заклинание, расходуется. Пока эффект подавлен, он не работает, но время подавления засчитывается в его длительность.' },
        { title: 'Нацеленные эффекты', text: 'Заклинания и другие магические эффекты — например, волшебная стрела или очарование личности, — нацеленные на существо или предмет в сфере, на эту цель не действуют.' },
        { title: 'Области магии', text: 'Область другого заклинания или магического эффекта — например, огненного шара — не может заходить в сферу. Если сфера пересекается с областью магии, накрытая сферой часть области подавлена. Например, пламя огненной стены подавляется внутри сферы, и если пересечение достаточно велико, в стене образуется проём.' },
        { title: 'Заклинания', text: 'Любое действующее заклинание или другой магический эффект на существе или предмете в сфере подавлено, пока существо или предмет внутри неё.' },
        { title: 'Магические предметы', text: 'Свойства и силы магических предметов в сфере подавлены. Например, длинный меч +1 в сфере работает как немагический длинный меч. Свойства и силы магического оружия подавлены, если им бьют по цели в сфере или если его держит атакующий в сфере. Если магическое оружие или магический боеприпас полностью покидает сферу (например, вы выпускаете магическую стрелу или метаете магическое копьё в цель за её пределами), магия предмета перестаёт быть подавленной, как только он выходит наружу.' },
        { title: 'Магические перемещения', text: 'Телепортация и путешествия между планами в сфере не работают, будь сфера местом назначения или отправления. Портал в другое место, мир или на другой план, а также проход в пространство иного измерения — например, созданное трюком с верёвкой, — временно закрывается, пока находится в сфере.' },
        { title: 'Существа и предметы', text: 'Существо или предмет, призванные или созданные магией, временно исчезают в сфере. Такое существо сразу появляется снова, как только занимаемое им пространство перестаёт быть в сфере.' },
        { title: 'Рассеивание магии', text: 'Заклинания и магические эффекты вроде рассеивания магии на сферу не действуют. Точно так же сферы разных заклинаний преграды магии не отменяют друг друга.' }
      ]
    }
  ),
  spell(
    'tsunami', 'Цунами', 8, 'conjuration',
    '1 действие', 'В пределах видимости', 'В, С', 'Концентрация, до 6 раундов',
    ['concentration', 'damage', 'control'],
    'В выбранной вами точке в пределах дистанции возникает стена воды длиной до 300 футов, высотой до 300 футов и толщиной до 50 футов. Стена держится, пока действует заклинание. Когда она появляется, каждое существо в её области совершает спасбросок Силы и получает 6к10 дробящего урона при провале или половину этого урона при успехе.',
    {
      source: 'PHB',
      classes: ['Друид'],
      sections: [
        { title: 'Волна идёт', text: 'В начале каждого вашего хода после появления стена вместе со всеми существами в ней сдвигается на 50 футов от вас. Каждое существо размера Огромный или меньше внутри стены или в пространство которого она входит, двигаясь, должно преуспеть в спасброске Силы, иначе получает 5к10 дробящего урона. Этот урон существо может получить не чаще раза в раунд. В конце хода высота стены уменьшается на 50 футов, а урон, который существа получают от заклинания в последующих раундах, уменьшается на 1к10. Когда высота стены доходит до 0 футов, заклинание заканчивается.' },
        { title: 'В волне', text: 'Существо, захваченное стеной, может перемещаться вплавь. Но из-за силы волны, чтобы сдвинуться хоть немного, оно должно преуспеть в проверке Силы (Атлетика) против СЛ спасброска ваших заклинаний. При провале оно не может перемещаться. Существо, покинувшее область, падает на землю.' }
      ]
    }
  ),
  // ── Заклинания 9 уровня (базовые, PHB / XGE / TCE) ────────────────
  spell(
    'gate', 'Врата', 9, 'conjuration',
    '1 действие', '60 фт.', 'В, С, М (алмаз стоимостью не менее 5000 с.м.)', 'Концентрация, до 1 минуты',
    ['concentration', 'utility'],
    'Вы создаёте портал, связывающий свободное пространство, которое вы видите в пределах дистанции, с точным местом на другом плане существования. Портал — круглый проём диаметром от 5 до 20 футов, развернуть его можно как угодно. Портал существует, пока действует заклинание.',
    {
      source: 'PHB',
      classes: ['Жрец', 'Чародей', 'Волшебник'],
      sections: [
        { title: 'Проход', text: 'У портала есть лицевая и обратная сторона на каждом плане, где он появляется. Пройти через портал можно только с лицевой стороны. Всё, что так проходит, мгновенно переносится на другой план и появляется в ближайшем к порталу свободном пространстве. Божества и другие владыки планов могут не давать порталам этого заклинания открываться в своём присутствии или где-либо в своих владениях.' },
        { title: 'Призыв по имени', text: 'При сотворении вы можете произнести имя определённого существа (псевдоним, титул или прозвище не годятся). Если это существо на другом плане, портал открывается прямо рядом с ним и затягивает его в ближайшее свободное пространство на вашей стороне портала. Никакой особой власти над существом вы не получаете, и оно вольно действовать так, как сочтёт нужным Мастер: может уйти, напасть на вас или помочь вам.' }
      ]
    }
  ),
  spell(
    'storm-of-vengeance', 'Гроза гнева', 9, 'conjuration',
    '1 действие', 'В пределах видимости', 'В, С', 'Концентрация, до 1 минуты',
    ['concentration', 'damage', 'control'],
    'Образуется бурлящая грозовая туча с центром в точке, которую вы видите, и расползается на радиус 360 футов. В области сверкают молнии, гремит гром и ревёт сильный ветер. Каждое существо под тучей (не глубже 5000 футов под ней) в момент её появления совершает спасбросок Телосложения. При провале существо получает 2к6 урона звуком и оглохло на 5 минут. Каждый раунд, пока вы сохраняете концентрацию, буря в ваш ход даёт новые эффекты.',
    {
      source: 'PHB',
      classes: ['Друид'],
      sections: [
        { title: 'Раунд 2', text: 'Из тучи льёт кислотный дождь. Каждое существо и каждый предмет под тучей получает 1к6 урона кислотой.' },
        { title: 'Раунд 3', text: 'Вы обрушиваете из тучи шесть молний на шесть выбранных вами существ или предметов под ней. В одно существо или предмет может ударить только одна молния. Поражённое существо совершает спасбросок Ловкости и получает 10к6 урона электричеством при провале или половину этого урона при успехе.' },
        { title: 'Раунд 4', text: 'Из тучи сыплется град. Каждое существо под тучей получает 2к6 дробящего урона.' },
        { title: 'Раунды 5–10', text: 'Область под тучей хлещут порывы ветра и ледяной дождь. Область становится труднопроходимой местностью и сильно заслонена. Каждое существо там получает 1к6 урона холодом. Дальнобойные атаки оружием в области невозможны. Ветер и дождь считаются сильной помехой для поддержания концентрации на заклинаниях. Наконец, сильные порывы ветра (от 20 до 50 миль в час) автоматически развеивают в области туман, дымку и подобные явления, обычные или магические.' }
      ]
    }
  ),
  spell(
    'true-polymorph', 'Истинное превращение', 9, 'transmutation',
    '1 действие', '30 фт.', 'В, С, М (капля ртути, комок гуммиарабика и струйка дыма)', 'Концентрация, до 1 часа',
    ['concentration', 'control'],
    'Выберите одно существо или немагический предмет, которые видите в пределах дистанции. Вы превращаете существо в другое существо, существо в предмет или предмет в существо (предмет не должен быть надет на другое существо или нестись им). Превращение длится всю длительность заклинания или пока хиты цели не опустятся до 0 или она не умрёт. Если вы концентрируетесь на заклинании всю его длительность, превращение длится, пока его не рассеют. На перевёртыша и на существо с 0 хитов заклинание не действует. Несогласное существо может совершить спасбросок Мудрости и при успехе заклинанию не подвержено.',
    {
      source: 'PHB',
      classes: ['Бард', 'Волшебник'],
      sections: [
        { title: 'Существо в существо', text: 'Если вы превращаете существо в существо другого рода, новым обликом может быть любое выбранное вами существо, чей показатель опасности не выше, чем у цели (или не выше её уровня, если показателя опасности у цели нет). Игровые параметры цели, включая ментальные характеристики, заменяются параметрами нового облика. Цель сохраняет мировоззрение и личность. Она получает хиты нового облика, а вернувшись в обычный облик, снова имеет столько хитов, сколько было до превращения. Если она вернулась потому, что хиты нового облика опустились до 0, лишний урон переносится на обычный облик; если он не опускает хиты обычного облика до 0, существо не теряет сознание. Существо может совершать только те действия, которые позволяет новый облик, и не может говорить, творить заклинания и делать что-либо, для чего нужны руки или речь, если новый облик на это не способен. Снаряжение цели сливается с новым обликом: существо не может его активировать, использовать, держать или иначе получать от него пользу.' },
        { title: 'Предмет в существо', text: 'Предмет можно превратить в любое существо, если размер существа не больше размера предмета, а показатель опасности — 9 или ниже. Существо дружелюбно к вам и вашим спутникам и действует в каждый ваш ход. Какое действие оно совершит и как переместится, решаете вы. Характеристики существа у Мастера, и он же разрешает все его действия и перемещение. Если заклинание становится постоянным, вы больше не управляете существом. Оно может остаться дружелюбным к вам — смотря как вы с ним обращались.' },
        { title: 'Существо в предмет', text: 'Если вы превращаете существо в предмет, оно превращается вместе со всем, что носит и несёт. Параметры существа становятся параметрами предмета, а когда заклинание заканчивается и существо возвращается в обычный облик, оно ничего не помнит о времени, проведённом в этом облике.' }
      ]
    }
  ),
  spell(
    'blade-of-disaster', 'Клинок разрушения', 9, 'conjuration',
    '1 бонусное действие', '60 фт.', 'В, С', 'Концентрация, до 1 минуты',
    ['concentration', 'damage'],
    'Вы создаёте в свободном пространстве, которое видите в пределах дистанции, планарный разлом в форме клинка длиной около 3 футов. Клинок держится, пока действует заклинание. При сотворении вы можете совершить клинком до двух рукопашных атак заклинанием, каждую по существу, незакреплённому предмету или сооружению в пределах 5 футов от клинка. При попадании цель получает 4к12 урона силовым полем.',
    {
      source: 'TCE',
      classes: ['Чародей', 'Волшебник', 'Колдун'],
      sections: [
        { title: 'Критическое попадание', text: 'Эта атака становится критическим попаданием, если на к20 выпало 18 или больше. При критическом попадании клинок наносит дополнительно 8к12 урона силовым полем (всего 12к12).' },
        { title: 'Движение', text: 'Бонусным действием в свой ход вы можете переместить клинок на расстояние до 30 футов в свободное пространство, которое видите, а затем снова совершить им до двух рукопашных атак заклинанием. Клинок безвредно проходит сквозь любую преграду, даже сквозь силовую стену.' }
      ]
    }
  ),
  spell(
    'mass-polymorph', 'Множественное превращение', 9, 'transmutation',
    '1 действие', '120 фт.', 'В, С, М (кокон гусеницы)', 'Концентрация, до 1 часа',
    ['concentration', 'control'],
    'Вы превращаете до десяти существ на ваш выбор, которых видите в пределах дистанции. Несогласная цель должна преуспеть в спасброске Мудрости, чтобы противостоять превращению; несогласный перевёртыш преуспевает автоматически. Каждая цель принимает облик зверя по вашему выбору — для всех один или для каждой свой. Новым обликом может быть любой зверь, которого вы видели, с показателем опасности не выше, чем у цели (или не выше половины её уровня, если показателя опасности у цели нет).',
    {
      source: 'XGE',
      classes: ['Бард', 'Чародей', 'Волшебник'],
      sections: [
        { title: 'Новый облик', text: 'Игровые параметры цели, включая ментальные характеристики, заменяются параметрами выбранного зверя, но цель сохраняет свои хиты, мировоззрение и личность. Каждая цель получает временные хиты, равные хитам нового облика. Эти временные хиты нельзя заменить временными хитами из другого источника. Цель возвращается в обычный облик, когда у неё не остаётся этих временных хитов или когда она умирает. Если заклинание закончилось раньше, существо теряет все эти временные хиты и возвращается в обычный облик.' },
        { title: 'Что нельзя', text: 'Существо может совершать только те действия, которые позволяет новый облик: оно не может говорить, творить заклинания и делать что-либо, для чего нужны руки или речь. Снаряжение цели сливается с новым обликом: цель не может его активировать, использовать, держать или иначе получать от него пользу.' }
      ]
    }
  ),
  spell(
    'invulnerability', 'Неуязвимость', 9, 'abjuration',
    '1 действие', 'На себя', 'В, С, М (небольшой кусочек адамантина стоимостью не менее 500 с.м., расходуется)', 'Концентрация, до 10 минут',
    ['concentration', 'support'],
    'Пока заклинание не закончится, у вас иммунитет ко всему урону.',
    {
      source: 'XGE',
      classes: ['Волшебник']
    }
  ),
  spell(
    'shapechange', 'Полное превращение', 9, 'transmutation',
    '1 действие', 'На себя', 'В, С, М (нефритовый обруч стоимостью не менее 1500 с.м., который нужно надеть на голову перед сотворением)', 'Концентрация, до 1 часа',
    ['concentration', 'support'],
    'Пока действует заклинание, вы принимаете облик другого существа. Это может быть любое существо с показателем опасности не выше вашего уровня. Оно не может быть конструктом или нежитью, и вы должны хотя бы раз видеть существо такого рода. Вы превращаетесь в обычный образец этого существа — без уровней класса и без черты «Использование заклинаний».',
    {
      source: 'PHB',
      classes: ['Друид', 'Волшебник'],
      sections: [
        { title: 'Параметры', text: 'Ваши игровые параметры заменяются параметрами выбранного существа, но вы сохраняете мировоззрение и значения Интеллекта, Мудрости и Харизмы. Вы сохраняете и все владения навыками и спасбросками, вдобавок получая владения существа. Если у существа то же владение, что у вас, а бонус в его параметрах выше вашего, используйте бонус существа. Легендарными действиями и действиями логова нового облика пользоваться нельзя.' },
        { title: 'Хиты', text: 'Вы получаете хиты и Кости хитов нового облика. Вернувшись в обычный облик, вы снова имеете столько хитов, сколько было до превращения. Если вы вернулись потому, что хиты опустились до 0, лишний урон переносится на обычный облик; если он не опускает хиты обычного облика до 0, вы не теряете сознание.' },
        { title: 'Умения', text: 'Вы сохраняете пользу от умений класса, расы или другого источника и можете ими пользоваться, если новый облик физически на это способен. Особыми чувствами (например, тёмным зрением) пользоваться нельзя, если их нет и у нового облика. Говорить вы можете, только если существо обычно умеет говорить.' },
        { title: 'Снаряжение', text: 'Превращаясь, вы решаете, падает ли снаряжение на землю, сливается с новым обликом или надето на нём. Надетое снаряжение работает как обычно. Сможет ли новый облик носить ту или иную вещь, решает Мастер по форме и размеру существа. Снаряжение не меняет формы и размера под новый облик; то, что новый облик не может носить, либо падает на землю, либо сливается с ним. Слившееся снаряжение не действует.' },
        { title: 'Новый облик', text: 'Пока действует заклинание, вы можете действием принять другой облик по тем же ограничениям и правилам, с одним исключением: если у нового облика больше хитов, чем у нынешнего, ваши хиты остаются прежними.' }
      ]
    }
  ),
  spell(
    'weird', 'Смертный ужас', 9, 'illusion',
    '1 действие', '120 фт.', 'В, С', 'Концентрация, до 1 минуты',
    ['concentration', 'damage', 'control'],
    'Опираясь на глубочайшие страхи группы существ, вы создаёте в их разуме иллюзорных созданий, видимых только им. Каждое существо в сфере радиусом 30 футов с центром в выбранной вами точке в пределах дистанции совершает спасбросок Мудрости. При провале существо испугано, пока действует заклинание. Иллюзия взывает к глубочайшим страхам существа, воплощая его худшие кошмары в неумолимую угрозу. В конце каждого хода испуганного существа оно должно преуспеть в спасброске Мудрости, иначе получает 4к10 урона психической энергией. При успехе заклинание для этого существа заканчивается.',
    {
      source: 'PHB',
      classes: ['Волшебник']
    }
  ),
  // ── Заклинания 9 уровня без концентрации (базовые, PHB / XGE) ─────
  spell(
    'imprisonment', 'Заточение', 9, 'abjuration',
    '1 минута', '30 фт.', 'В, С, М (изображение цели на пергаменте или резная статуэтка, похожая на неё, и особый компонент, зависящий от выбранного варианта заклинания, стоимостью не менее 500 с.м. за каждую Кость хитов цели)', 'Пока не рассеется',
    ['control'],
    'Вы создаёте магические узы, чтобы удержать существо, которое видите в пределах дистанции. Цель должна преуспеть в спасброске Мудрости, иначе связана заклинанием; если она преуспевает, это заклинание в ваших повторных сотворениях на неё не действует. Пока на существо действует заклинание, ему не нужно дышать, есть и пить, и оно не стареет. Заклинания прорицания не могут найти или почувствовать цель. При сотворении выберите один из вариантов заточения ниже.',
    {
      source: 'PHB',
      classes: ['Волшебник', 'Колдун'],
      sections: [
        { title: 'Погребение', text: 'Цель заточена глубоко под землёй в сфере магической силы, которая ровно вмещает её. Ничто не может пройти сквозь сферу, и ни одно существо не может проникнуть в неё или выбраться из неё телепортацией или путешествием между планами. Особый компонент этого варианта — маленький шарик из мифрила.' },
        { title: 'Цепи', text: 'Тяжёлые цепи, накрепко вросшие в землю, удерживают цель на месте. Цель опутана, пока заклинание не закончится, и до тех пор не может перемещаться, и её нельзя переместить никаким способом. Особый компонент этого варианта — тонкая цепочка из драгоценного металла.' },
        { title: 'Огороженная темница', text: 'Заклинание переносит цель на крошечный полуплан, защищённый от телепортации и путешествий между планами. Полуплан может быть лабиринтом, клеткой, башней или любым подобным замкнутым сооружением или местом на ваш выбор. Особый компонент этого варианта — миниатюрное изображение темницы из нефрита.' },
        { title: 'Малое заключение', text: 'Цель уменьшается до 1 дюйма и заточается в самоцвет или похожий предмет. Свет проходит сквозь самоцвет как обычно (цель видит наружу, а другие существа — внутрь), но больше ничего не проходит, даже телепортацией или путешествием между планами. Пока действует заклинание, самоцвет нельзя огранить или разбить. Особый компонент этого варианта — крупный прозрачный самоцвет, например корунд, алмаз или рубин.' },
        { title: 'Сон', text: 'Цель засыпает, и её нельзя разбудить. Особый компонент этого варианта — редкие снотворные травы.' },
        { title: 'Конец заклинания', text: 'Сотворяя любой вариант заклинания, вы можете назначить условие, при котором заклинание закончится и цель освободится. Условие может быть сколь угодно точным или сложным, но Мастер должен согласиться, что оно разумно и может наступить. Условие может основываться на имени, личности или божестве существа, а в остальном — на наблюдаемых поступках или качествах, а не на нематериальном вроде уровня, класса или хитов. Заклинание рассеивания магии может окончить это заклинание, только если сотворено как заклинание 9-го уровня и нацелено на темницу или на использованный для неё особый компонент.' },
        { title: 'Один компонент', text: 'Каждым особым компонентом можно одновременно создать только одну темницу. Если вы снова творите заклинание с тем же компонентом, цель первого сотворения тут же освобождается от уз.' }
      ]
    }
  ),
  spell(
    'wish', 'Исполнение желаний', 9, 'conjuration',
    '1 действие', 'На себя', 'В', 'Мгновенная',
    ['utility'],
    'Исполнение желаний — самое могущественное заклинание, доступное смертному существу. Просто произнеся желание вслух, вы можете изменить сами основы реальности по своей воле. Основное применение заклинания — повторить любое другое заклинание 8-го уровня или ниже. Выполнять требования того заклинания, в том числе дорогие компоненты, не нужно: заклинание просто срабатывает.',
    {
      source: 'PHB',
      classes: ['Чародей', 'Волшебник'],
      sections: [
        { title: 'Другие эффекты', text: 'Вместо этого вы можете создать один из этих эффектов на выбор. Вы создаёте один немагический предмет стоимостью до 25 000 с.м. не больше 300 футов в любом измерении; он появляется в свободном пространстве на земле, которое вы видите. Вы позволяете не более чем двадцати существам, которых видите, восстановить все хиты и оканчиваете на них все эффекты, описанные в заклинании высшего восстановления. Вы даёте не более чем десяти существам, которых видите, сопротивление выбранному вами виду урона. Вы даёте не более чем десяти существам, которых видите, иммунитет к одному заклинанию или другому магическому эффекту на 8 часов — например, себе и всем спутникам иммунитет к высасыванию жизни лича. Вы отменяете одно недавнее событие, заставляя перебросить любой бросок, сделанный за последний раунд (включая ваш прошлый ход). Реальность меняется под новый результат. Например, исполнение желаний может отменить успешный спасбросок противника, критическое попадание врага или проваленный спасбросок друга. Переброс можно сделать с преимуществом или помехой, и вы выбираете, использовать ли переброс или исходный бросок.' },
        { title: 'Большее', text: 'Возможно, вы добьётесь чего-то и сверх этих примеров. Изложите желание Мастеру как можно точнее. У Мастера большая свобода в решении, что произойдёт; чем больше желание, тем вероятнее, что что-то пойдёт не так. Заклинание может просто не сработать, желаемый эффект может исполниться лишь частично, или из-за формулировки желания вы можете столкнуться с непредвиденными последствиями. Например, пожелав смерти злодею, вы можете перенестись в будущее, когда его уже нет в живых, — фактически выйдя из игры. Точно так же, пожелав легендарный магический предмет или артефакт, вы можете мгновенно оказаться перед его нынешним владельцем.' },
        { title: 'Цена', text: 'Напряжение от сотворения этого заклинания ради любого эффекта, кроме повторения другого заклинания, ослабляет вас. После этого каждый раз, когда вы творите заклинание, пока не закончите продолжительный отдых, вы получаете 1к10 урона некротической энергией за каждый уровень этого заклинания. Этот урон нельзя никак уменьшить или предотвратить. Кроме того, ваша Сила падает до 3 (если она ещё не 3 или ниже) на 2к4 дня. За каждый из этих дней, который вы проводите в отдыхе, занимаясь лишь лёгкими делами, оставшееся время восстановления уменьшается на 2 дня. Наконец, есть шанс 33 процента, что после этого напряжения вы больше никогда не сможете сотворить исполнение желаний.' }
      ]
    }
  ),
  spell(
    'true-resurrection', 'Истинное воскрешение', 9, 'necromancy',
    '1 час', 'Касание', 'В, С, М (капли святой воды и алмазы общей стоимостью не менее 25 000 с.м., расходуются)', 'Мгновенная',
    ['healing'],
    'Вы касаетесь существа, которое мертво не дольше 200 лет и умерло по любой причине, кроме старости. Если душа существа свободна и согласна, оно возвращается к жизни со всеми хитами. Заклинание закрывает все раны, обезвреживает все яды, излечивает все болезни и снимает все проклятия, которые действовали на существо в момент смерти. Оно заменяет повреждённые или утраченные органы и конечности. Заклинание может даже создать новое тело, если прежнего больше нет; тогда вы должны произнести имя существа. Существо появляется в свободном пространстве на ваш выбор в пределах 10 футов от вас.',
    {
      source: 'PHB',
      classes: ['Жрец', 'Друид']
    }
  ),
  spell(
    'meteor-swarm', 'Метеоритный дождь', 9, 'evocation',
    '1 действие', '1 миля', 'В, С', 'Мгновенная',
    ['damage'],
    'В четыре разные точки на земле, которые вы видите в пределах дистанции, обрушиваются пылающие огненные шары. Каждое существо в сфере радиусом 40 футов с центром в каждой выбранной вами точке совершает спасбросок Ловкости. Сфера огибает углы. Существо получает 20к6 урона огнём и 20к6 дробящего урона при провале или половину этого урона при успехе. Существо в области нескольких огненных взрывов подвергается их действию только один раз. Заклинание повреждает предметы в области и поджигает горючие предметы, которые никто не носит и не несёт.',
    {
      source: 'PHB',
      classes: ['Чародей', 'Волшебник']
    }
  ),
  spell(
    'mass-heal', 'Множественное полное исцеление', 9, 'evocation',
    '1 действие', '60 фт.', 'В, С', 'Мгновенная',
    ['healing'],
    'Из вас в раненых существ вокруг изливается поток целительной энергии. Вы восстанавливаете в сумме до 700 хитов, распределяя их как угодно между любым числом существ, которых вы видите в пределах дистанции. Существа, исцелённые этим заклинанием, также излечиваются от всех болезней и избавляются от всех эффектов, из-за которых они ослеплены или оглохли. На нежить и конструктов заклинание не действует.',
    {
      source: 'PHB',
      classes: ['Жрец']
    }
  ),
  spell(
    'time-stop', 'Остановка времени', 9, 'transmutation',
    '1 действие', 'На себя', 'В', 'Мгновенная',
    ['utility'],
    'Вы ненадолго останавливаете течение времени для всех, кроме себя. Для других существ время не идёт, а вы совершаете 1к4 + 1 ходов подряд, в течение которых можете совершать действия и перемещаться как обычно. Заклинание заканчивается, если одно из ваших действий в это время или любой созданный в это время эффект затрагивает другое существо или предмет, который носит или несёт кто-то другой. Кроме того, заклинание заканчивается, если вы отходите дальше чем на 1000 футов от места, где его сотворили.',
    {
      source: 'PHB',
      classes: ['Чародей', 'Волшебник', 'Изобретатель']
    }
  ),
  spell(
    'foresight', 'Предвидение', 9, 'divination',
    '1 минута', 'Касание', 'В, С, М (перо колибри)', '8 часов',
    ['support'],
    'Вы касаетесь согласного существа и даёте ему ограниченную способность заглядывать в ближайшее будущее. Пока действует заклинание, цель нельзя застать врасплох, она совершает с преимуществом броски атаки, проверки характеристик и спасброски, а другие существа совершают с помехой броски атаки по ней. Заклинание сразу заканчивается, если вы творите его снова, пока оно действует.',
    {
      source: 'PHB',
      classes: ['Бард', 'Друид', 'Волшебник', 'Колдун']
    }
  ),
  spell(
    'astral-projection', 'Проекция в астрал', 9, 'necromancy',
    '1 час', '10 фт.', 'В, С, М (на каждое существо, на которое действует заклинание, — гиацинт стоимостью не менее 1000 с.м. и богато украшенный резьбой серебряный брусок стоимостью не менее 100 с.м., всё расходуется)', 'Особая',
    ['utility'],
    'Вы и не более восьми согласных существ в пределах дистанции переносите свои астральные тела на Астральный план (если вы уже на нём, заклинание не срабатывает, и сотворение потрачено впустую). Оставленное вами материальное тело без сознания и в оцепенении: ему не нужны пища и воздух, и оно не стареет.',
    {
      source: 'PHB',
      classes: ['Жрец', 'Волшебник', 'Колдун'],
      sections: [
        { title: 'Астральное тело', text: 'Ваше астральное тело почти во всём похоже на смертный облик: у него те же игровые параметры и вещи. Главное отличие — серебристая нить, которая тянется у вас из-за спины от лопаток и через 1 фут становится невидимой. Эта нить связывает вас с материальным телом. Пока связь цела, вы найдёте дорогу домой. Если нить перерезана — а это может случиться, только когда эффект прямо так говорит, — душа и тело разделяются, и вы мгновенно умираете.' },
        { title: 'Странствие', text: 'Ваш астральный облик может свободно странствовать по Астральному плану и проходить там через порталы на любой другой план. Если вы попадаете на новый план или возвращаетесь на тот, где творили заклинание, ваше тело и вещи переносятся по серебряной нити, и вы снова входите в тело, оказываясь на новом плане. Астральный облик — отдельное воплощение. Урон и другие эффекты, которые на него действуют, не влияют на физическое тело и не сохраняются, когда вы в него возвращаетесь.' },
        { title: 'Конец заклинания', text: 'Заклинание заканчивается для вас и ваших спутников, когда вы действием отпускаете его. Тогда затронутое существо возвращается в физическое тело и просыпается. Для вас или одного из спутников заклинание может закончиться и досрочно. Успешное заклинание рассеивания магии, применённое к астральному или физическому телу, оканчивает заклинание для этого существа. Если хиты исходного тела или астрального облика существа опускаются до 0, заклинание для него заканчивается. Если заклинание закончилось, а серебряная нить цела, нить утягивает астральный облик существа обратно в тело, и оцепенение проходит.' },
        { title: 'Раннее возвращение', text: 'Если вас вернуло в тело раньше времени, ваши спутники остаются в астральных обликах и должны сами искать путь назад в свои тела — обычно опустив хиты до 0.' }
      ]
    }
  ),
  spell(
    'psychic-scream', 'Психический крик', 9, 'enchantment',
    '1 действие', '90 фт.', 'С', 'Мгновенная',
    ['damage', 'control'],
    'Вы высвобождаете силу своего разума и бьёте по рассудку не более чем десяти существ на ваш выбор, которых видите в пределах дистанции. На существ с Интеллектом 2 или ниже заклинание не действует. Каждая цель совершает спасбросок Интеллекта. При провале цель получает 14к6 урона психической энергией и ошеломлена. При успехе она получает половину урона и не ошеломлена. Если этот урон убивает цель, её голова взрывается — если, конечно, она есть.',
    {
      source: 'XGE',
      classes: ['Бард', 'Чародей', 'Волшебник', 'Колдун'],
      sections: [
        { title: 'Ошеломление', text: 'В конце каждого своего хода ошеломлённая цель может совершить спасбросок Интеллекта и при успехе избавляется от ошеломления.' }
      ]
    }
  ),
  spell(
    'prismatic-wall', 'Радужная стена', 9, 'abjuration',
    '1 действие', '60 фт.', 'В, С', '10 минут',
    ['damage', 'control'],
    'В точке, которую вы видите в пределах дистанции, образуется мерцающая разноцветная плоскость света — вертикальная непрозрачная стена длиной до 90 футов, высотой до 30 футов и толщиной 1 дюйм с центром в этой точке. Вместо этого стене можно придать форму сферы диаметром до 30 футов с центром в выбранной вами точке в пределах дистанции. Стена стоит на месте, пока действует заклинание. Если поставить стену так, что она проходит через пространство, занятое существом, заклинание не срабатывает, а действие и ячейка потрачены впустую.',
    {
      source: 'PHB',
      classes: ['Волшебник'],
      sections: [
        { title: 'Свет', text: 'Стена излучает яркий свет на 100 футов и тусклый свет ещё на 100 футов. Вы и существа, которых вы укажете при сотворении, можете проходить сквозь стену и находиться рядом с ней без вреда. Если другое существо, которое видит стену, подходит к ней на 20 футов или начинает там ход, оно должно преуспеть в спасброске Телосложения, иначе ослеплено на 1 минуту.' },
        { title: 'Слои', text: 'Стена состоит из семи слоёв разного цвета. Когда существо пытается дотянуться сквозь стену или пройти через неё, оно проходит все слои по одному. Проходя или дотягиваясь сквозь каждый слой, существо совершает спасбросок Ловкости, иначе на него действуют свойства этого слоя (ниже). Стену можно разрушить — тоже по одному слою, от красного к фиолетовому, особым для каждого слоя способом. Разрушенный слой остаётся разрушенным до конца заклинания. Жезл отмены разрушает радужную стену, а поле антимагии на неё не действует.' },
        { title: '1. Красный', text: 'Существо получает 10к6 урона огнём при провале или половину этого урона при успехе. Пока этот слой цел, немагические дальнобойные атаки не проходят сквозь стену. Слой разрушается, если нанести ему не меньше 25 урона холодом.' },
        { title: '2. Оранжевый', text: 'Существо получает 10к6 урона кислотой при провале или половину этого урона при успехе. Пока этот слой цел, магические дальнобойные атаки не проходят сквозь стену. Слой разрушает сильный ветер.' },
        { title: '3. Жёлтый', text: 'Существо получает 10к6 урона электричеством при провале или половину этого урона при успехе. Слой разрушается, если нанести ему не меньше 60 урона силовым полем.' },
        { title: '4. Зелёный', text: 'Существо получает 10к6 урона ядом при провале или половину этого урона при успехе. Слой разрушает заклинание создания прохода или другое заклинание того же уровня или выше, способное открыть проход в твёрдой поверхности.' },
        { title: '5. Синий', text: 'Существо получает 10к6 урона холодом при провале или половину этого урона при успехе. Слой разрушается, если нанести ему не меньше 25 урона огнём.' },
        { title: '6. Индиго', text: 'При провале существо опутано. Затем в конце каждого своего хода оно совершает спасбросок Телосложения. Если оно трижды преуспевает, заклинание заканчивается. Если трижды проваливает, оно навсегда обращается в камень и окаменевает. Успехи и провалы не обязаны идти подряд: считайте и те и другие, пока существо не наберёт три одинаковых. Пока этот слой цел, сквозь стену нельзя творить заклинания. Слой разрушает яркий свет заклинания дневного света или похожего заклинания того же уровня или выше.' },
        { title: '7. Фиолетовый', text: 'При провале существо ослеплено. Затем в начале вашего следующего хода оно совершает спасбросок Мудрости. При успехе слепота проходит. При провале существо переносится на другой план по выбору Мастера и больше не ослеплено. (Обычно существо, которое не на своём родном плане, изгоняется домой, а остальных, как правило, забрасывает на Астральный или Эфирный план.) Слой разрушает заклинание рассеивания магии или похожее заклинание того же уровня или выше, способное оканчивать заклинания и магические эффекты.' }
      ]
    }
  ),
  spell(
    'power-word-heal', 'Слово силы: Исцеление', 9, 'evocation',
    '1 действие', 'Касание', 'В, С', 'Мгновенная',
    ['healing'],
    'Существо, которого вы касаетесь, омывает волна целительной энергии. Цель восстанавливает все свои хиты. Если существо очаровано, испугано, парализовано или ошеломлено, это состояние заканчивается. Если существо лежит, сбитое с ног, оно может реакцией встать. На нежить и конструктов заклинание не действует.',
    {
      source: 'PHB',
      classes: ['Бард', 'Жрец']
    }
  ),
  spell(
    'power-word-kill', 'Слово силы: Смерть', 9, 'enchantment',
    '1 действие', '60 фт.', 'В', 'Мгновенная',
    ['control'],
    'Вы произносите слово силы, которое может заставить одно существо, которое вы видите в пределах дистанции, мгновенно умереть. Если у выбранного существа 100 хитов или меньше, оно умирает. Иначе заклинание ничего не делает.',
    {
      source: 'PHB',
      classes: ['Бард', 'Чародей', 'Волшебник', 'Колдун']
    }
  ),
  // ── Заклинания 8 уровня без концентрации (базовые, PHB / XGE) ─────
  spell(
    'antipathy-or-sympathy', 'Антипатия/симпатия', 8, 'enchantment',
    '1 час', '60 фт.', 'В, С, М (для антипатии — квасцы в уксусе, для симпатии — капля мёда)', '10 дней',
    ['control'],
    'Заклинание притягивает или отталкивает существ на ваш выбор. Выберите цель в пределах дистанции: предмет или существо размера Огромный или меньше либо область не больше куба со стороной 200 футов. Затем назовите вид разумных существ — например, красных драконов, гоблинов или вампиров. Вы наделяете цель аурой, которая на время действия заклинания притягивает или отталкивает названных существ. Выберите эффект ауры: антипатия или симпатия.',
    {
      source: 'PHB',
      classes: ['Друид', 'Волшебник', 'Колдун'],
      sections: [
        { title: 'Антипатия', text: 'Чары вызывают у существ названного вида сильное желание покинуть область и избегать цели. Когда такое существо видит цель или приближается к ней на 60 футов, оно должно преуспеть в спасброске Мудрости, иначе испугано. Существо остаётся испуганным, пока видит цель или находится в пределах 60 футов от неё. Испуганное целью существо должно тратить перемещение, чтобы уйти в ближайшее безопасное место, откуда цель не видно. Если существо отходит от цели дальше чем на 60 футов и не видит её, оно перестаёт быть испуганным, но снова пугается, если вновь увидит цель или приблизится к ней на 60 футов.' },
        { title: 'Симпатия', text: 'Чары вызывают у названных существ сильное желание приблизиться к цели, пока они в пределах 60 футов от неё или видят её. Когда такое существо видит цель или приближается к ней на 60 футов, оно должно преуспеть в спасброске Мудрости, иначе в каждый свой ход тратит перемещение, чтобы войти в область или подойти к цели на расстояние досягаемости. Сделав это, существо не может добровольно отойти от цели. Если цель причиняет затронутому существу урон или иной вред, оно может совершить спасбросок Мудрости, чтобы окончить эффект, как описано ниже.' },
        { title: 'Конец эффекта', text: 'Если затронутое существо заканчивает ход не в пределах 60 футов от цели и не видя её, оно совершает спасбросок Мудрости. При успехе цель на него больше не действует, и оно понимает, что отвращение или влечение было магическим. Кроме того, пока заклинание действует, затронутое существо может совершать ещё один спасбросок Мудрости каждые 24 часа. Существо, преуспевшее в спасброске против этого эффекта, на 1 минуту невосприимчиво к нему, а затем эффект снова может на него подействовать.' }
      ]
    }
  ),
  spell(
    'clone', 'Двойник', 8, 'necromancy',
    '1 час', 'Касание', 'В, С, М (алмаз стоимостью не менее 1000 с.м. и не меньше 1 кубического дюйма плоти существа, которое нужно клонировать, — расходуются; а также сосуд стоимостью не менее 2000 с.м. с запечатываемой крышкой, в котором поместится существо размера Средний, — например, огромная урна, гроб, заполненная грязью полость в земле или хрустальный сосуд с солёной водой)', 'Мгновенная',
    ['utility'],
    'Заклинание выращивает неживого двойника живого существа как страховку от смерти. Клон формируется в запечатанном сосуде и через 120 дней вырастает до полного размера и зрелости; можно также сделать клона более молодой версией того же существа. Клон остаётся неживым и сохраняется бесконечно, пока его сосуд никто не трогает.',
    {
      source: 'PHB',
      classes: ['Волшебник'],
      sections: [
        { title: 'Перенос души', text: 'В любой момент после того, как клон созрел, если исходное существо умирает, его душа переходит в клона, если она свободна и согласна вернуться. Клон физически тождествен оригиналу, у него та же личность, воспоминания и способности, но нет снаряжения оригинала. Физические останки исходного существа, если они ещё существуют, становятся неживыми и больше не могут быть возвращены к жизни, ведь душа существа теперь в другом месте.' }
      ]
    }
  ),
  spell(
    'demiplane', 'Демиплан', 8, 'conjuration',
    '1 действие', '60 фт.', 'С', '1 час',
    ['utility'],
    'Вы создаёте призрачную дверь на ровной твёрдой поверхности, которую видите в пределах дистанции. Дверь достаточно велика, чтобы существа размера Средний проходили в неё без помех. Открытая, она ведёт на полуплан — пустую комнату 30 футов в каждом измерении из дерева или камня. Когда заклинание заканчивается, дверь исчезает, и все существа и предметы внутри полуплана остаются запертыми там, потому что дверь исчезает и с другой стороны.',
    {
      source: 'PHB',
      classes: ['Чародей', 'Волшебник', 'Колдун'],
      sections: [
        { title: 'Тот же полуплан', text: 'Каждый раз, творя это заклинание, вы можете создать новый полуплан или соединить призрачную дверь с полупланом, созданным прежним сотворением этого заклинания. Кроме того, если вы знаете природу и содержимое полуплана, созданного этим заклинанием другого существа, вы можете соединить призрачную дверь с его полупланом.' }
      ]
    }
  ),
  spell(
    'mighty-fortress', 'Могучая крепость', 8, 'conjuration',
    '1 минута', '1 миля', 'В, С, М (алмаз стоимостью не менее 500 с.м., расходуется)', '7 дней',
    ['utility'],
    'Из выбранного вами квадратного участка земли, который вы видите в пределах дистанции, вырастает каменная крепость. Участок — 120 футов в каждую сторону, на нём не должно быть зданий и других сооружений. Существ на участке крепость безвредно поднимает с собой.',
    {
      source: 'XGE',
      classes: ['Волшебник'],
      sections: [
        { title: 'Стены и башни', text: 'У крепости четыре башни с квадратным основанием 20 × 20 футов и высотой 30 футов — по одной на каждом углу. Башни соединены каменными стенами длиной 80 футов, которые образуют замкнутый двор. Каждая стена толщиной 1 фут и состоит из панелей шириной 10 футов и высотой 20 футов. Каждая панель примыкает к двум другим панелям или к панели и башне. Во внешней стене можно сделать до четырёх каменных дверей.' },
        { title: 'Донжон', text: 'Во дворе стоит небольшой донжон с квадратным основанием 50 × 50 футов и тремя этажами высотой 10 футов. Каждый этаж можно разделить на сколько угодно комнат, если каждая не меньше 5 футов в каждую сторону. Этажи связаны каменными лестницами, стены донжона толщиной 6 дюймов, а между комнатами — каменные двери или открытые арки, на ваш выбор. Обстановка и убранство донжона — какие пожелаете, и каждый день в нём хватает еды на пир из девяти перемен на сто человек. Мебель, еда и другие предметы, созданные заклинанием, рассыпаются в прах, если их вынести из крепости.' },
        { title: 'Слуги', text: 'Сто невидимых слуг выполняют любые приказы существ, которых вы укажете при сотворении. Каждый слуга действует так, будто создан заклинанием невидимого слуги.' },
        { title: 'Прочность', text: 'Стены, башни и донжон сделаны из камня, которому можно причинить урон. У каждой секции камня 10 × 10 футов КД 15 и 30 хитов на каждый дюйм толщины, и она невосприимчива к урону ядом и психической энергией. Секция с 0 хитов разрушается, и по решению Мастера соединённые с ней секции могут прогнуться и обрушиться.' },
        { title: 'Конец заклинания', text: 'Через 7 дней или когда вы творите это заклинание в другом месте, крепость безвредно рассыпается и уходит в землю, оставляя всех, кто был внутри, невредимыми на земле. Если творить это заклинание на одном и том же месте раз в 7 дней в течение года, крепость становится постоянной.' }
      ]
    }
  ),
  spell(
    'glibness', 'Находчивость', 8, 'transmutation',
    '1 действие', 'На себя', 'В', '1 час',
    ['support'],
    'Пока заклинание не закончится, совершая проверку Харизмы, вы можете заменить выпавшее на кости число на 15. Кроме того, что бы вы ни говорили, магия, определяющая, говорите ли вы правду, показывает, что вы правдивы.',
    {
      source: 'PHB',
      classes: ['Бард', 'Волшебник', 'Колдун']
    }
  ),
  spell(
    'feeblemind', 'Слабоумие', 8, 'enchantment',
    '1 действие', '150 фт.', 'В, С, М (горсть глиняных, хрустальных, стеклянных или минеральных шариков)', 'Мгновенная',
    ['damage', 'control'],
    'Вы бьёте по разуму существа, которое видите в пределах дистанции, пытаясь сокрушить его ум и личность. Цель получает 4к6 урона психической энергией и совершает спасбросок Интеллекта.',
    {
      source: 'PHB',
      classes: ['Бард', 'Друид', 'Чародей', 'Волшебник', 'Колдун'],
      sections: [
        { title: 'Слабоумие', text: 'При провале значения Интеллекта и Харизмы существа становятся 1. Существо не может творить заклинания, активировать магические предметы, понимать речь или как-либо внятно общаться. Однако оно узнаёт своих друзей, может следовать за ними и даже защищать их.' },
        { title: 'Конец заклинания', text: 'По истечении каждых 30 дней существо может повторить спасбросок против этого заклинания. При успехе заклинание заканчивается. Его также оканчивают заклинания высшего восстановления, полного исцеления или исполнения желаний.' }
      ]
    }
  ),
  spell(
    'power-word-stun', 'Слово силы: Оглушение', 8, 'enchantment',
    '1 действие', '60 фт.', 'В', 'Мгновенная',
    ['control'],
    'Вы произносите слово силы, способное подавить разум одного существа, которое вы видите в пределах дистанции, и ошеломить его. Если у цели 150 хитов или меньше, она ошеломлена; иначе заклинание ничего не делает. В конце каждого своего хода ошеломлённая цель совершает спасбросок Телосложения. При успехе ошеломление проходит.',
    {
      source: 'PHB',
      classes: ['Бард', 'Чародей', 'Волшебник', 'Колдун']
    }
  ),
  spell(
    'mind-blank', 'Сокрытие разума', 8, 'abjuration',
    '1 действие', 'Касание', 'В, С', '24 часа',
    ['support'],
    'Пока заклинание не закончится, одно согласное существо, которого вы касаетесь, невосприимчиво к урону психической энергией, к любым эффектам, которые чувствуют его эмоции или читают мысли, к заклинаниям прорицания и к состоянию «очарован». Заклинание срывает даже исполнение желаний и заклинания или эффекты сходной силы, которыми пытаются повлиять на разум цели или узнать о ней.',
    {
      source: 'PHB',
      classes: ['Бард', 'Волшебник']
    }
  ),
  spell(
    'sunburst', 'Солнечный ожог', 8, 'evocation',
    '1 действие', '150 фт.', 'В, С, М (огонь и кусочек солнечного камня)', 'Мгновенная',
    ['damage', 'control'],
    'В радиусе 60 футов с центром в выбранной вами точке в пределах дистанции вспыхивает яркий солнечный свет. Каждое существо в этом свете совершает спасбросок Телосложения. При провале существо получает 12к6 урона излучением и ослеплено на 1 минуту. При успехе оно получает половину урона и не ослеплено этим заклинанием. Нежить и слизи совершают этот спасбросок с помехой.',
    {
      source: 'PHB',
      classes: ['Друид', 'Чародей', 'Волшебник'],
      sections: [
        { title: 'После', text: 'Ослеплённое этим заклинанием существо в конце каждого своего хода совершает ещё один спасбросок Телосложения и при успехе прозревает. Заклинание рассеивает в своей области любую тьму, созданную заклинанием.' }
      ]
    }
  ),
  spell(
    'telepathy', 'Телепатия', 8, 'evocation',
    '1 действие', 'Неограниченная', 'В, С, М (пара связанных серебряных колец)', '24 часа',
    ['utility'],
    'Вы создаёте телепатическую связь между собой и согласным существом, которое хорошо знаете. Существо может быть где угодно на одном с вами плане существования. Если вы или цель оказываетесь на разных планах, заклинание заканчивается. Пока заклинание не закончится, вы с целью можете мгновенно обмениваться через эту связь словами, образами, звуками и другими ощущениями, и цель знает, что общается именно с вами. Заклинание позволяет существу с Интеллектом не ниже 1 понимать смысл ваших слов и улавливать суть посылаемых ему ощущений.',
    {
      source: 'PHB',
      classes: ['Волшебник']
    }
  ),
  spell(
    'abi-dalzims-horrid-wilting', 'Ужасное увядание Аби-Далзима', 8, 'necromancy',
    '1 действие', '150 фт.', 'В, С, М (кусочек губки)', 'Мгновенная',
    ['damage'],
    'Вы вытягиваете влагу из каждого существа в кубе со стороной 30 футов с центром в выбранной вами точке в пределах дистанции. Каждое существо в этой области совершает спасбросок Телосложения. На конструктов и нежить заклинание не действует, а растения и водяные элементали совершают этот спасбросок с помехой. Существо получает 12к8 урона некротической энергией при провале или половину этого урона при успехе. Немагические растения в области, которые не являются существами, — например, деревья и кусты, — мгновенно засыхают и погибают.',
    {
      source: 'XGE',
      classes: ['Чародей', 'Волшебник']
    }
  ),
  // ── Заклинания 7 уровня без концентрации (базовые, PHB / XGE / TCE) ──
  spell(
    'divine-word', 'Божественное слово', 7, 'evocation',
    '1 бонусное действие', '30 фт.', 'В', 'Мгновенная',
    ['control'],
    'Вы произносите божественное слово, наполненное силой, что создала мир на заре творения. Выберите любое число существ, которых вы видите в пределах дистанции. Каждое существо, которое слышит вас, совершает спасбросок Харизмы. При провале на существо действует эффект в зависимости от его текущих хитов.',
    {
      source: 'PHB',
      classes: ['Жрец'],
      sections: [
        { title: 'Эффект', text: '50 хитов или меньше — оглохло на 1 минуту; 40 хитов или меньше — оглохло и ослеплено на 10 минут; 30 хитов или меньше — ослеплено, оглохло и ошеломлено на 1 час; 20 хитов или меньше — мгновенно убито.' },
        { title: 'Изгнание', text: 'Независимо от текущих хитов небожитель, элементаль, фея или исчадие, проваливший спасбросок, отбрасывается на свой родной план (если он ещё не там) и 24 часа не может вернуться на ваш нынешний план никаким способом, кроме заклинания исполнения желаний.' }
      ]
    }
  ),
  spell(
    'mordenkainens-magnificent-mansion', 'Великолепный особняк Морденкайнена', 7, 'conjuration',
    '1 минута', '300 фт.', 'В, С, М (миниатюрный портал, вырезанный из слоновой кости, кусочек полированного мрамора и крошечная серебряная ложечка, каждый предмет стоимостью не менее 5 с.м.)', '24 часа',
    ['utility'],
    'Вы создаёте в пределах дистанции жилище в ином измерении, которое существует, пока действует заклинание. Где будет его единственный вход, выбираете вы. Вход слабо мерцает, шириной 5 футов и высотой 10 футов. Вы и все существа, которых вы укажете при сотворении, можете входить в жилище, пока портал открыт. Вы можете открыть или закрыть портал, если вы в пределах 30 футов от него. Закрытый портал невидим.',
    {
      source: 'PHB',
      classes: ['Бард', 'Волшебник'],
      sections: [
        { title: 'Особняк', text: 'За порталом — великолепная прихожая, а за ней множество покоев. Воздух чистый, свежий и тёплый. Планировку вы выбираете любую, но пространство не может превышать 50 кубов со стороной 10 футов. Обстановка и убранство — какие пожелаете. Еды в особняке достаточно для пира из девяти перемен на сто человек.' },
        { title: 'Слуги', text: 'Всех входящих обслуживают сто почти прозрачных слуг. Как они выглядят и во что одеты, решаете вы. Они полностью послушны вашим приказам. Каждый слуга может выполнять любую работу, которую выполнил бы обычный слуга-человек, но не может атаковать или совершать действия, прямо вредящие другому существу. Так, слуги могут приносить вещи, убирать, чинить, складывать одежду, разжигать огонь, подавать еду, разливать вино и так далее. Слуги могут ходить по всему особняку, но не могут его покинуть.' },
        { title: 'Конец заклинания', text: 'Мебель и другие предметы, созданные заклинанием, рассеиваются дымом, если их вынести из особняка. Когда заклинание заканчивается, все существа внутри пространства иного измерения выталкиваются в ближайшие ко входу свободные места.' }
      ]
    }
  ),
  spell(
    'resurrection', 'Воскрешение', 7, 'necromancy',
    '1 час', 'Касание', 'В, С, М (алмаз стоимостью не менее 1000 с.м., расходуется)', 'Мгновенная',
    ['healing'],
    'Вы касаетесь мёртвого существа, которое мертво не больше века, умерло не от старости и не является нежитью. Если его душа свободна и согласна, цель возвращается к жизни со всеми хитами.',
    {
      source: 'PHB',
      classes: ['Бард', 'Жрец'],
      sections: [
        { title: 'Яды и болезни', text: 'Заклинание обезвреживает все яды и излечивает обычные болезни, которыми существо страдало в момент смерти. Магические болезни, проклятия и подобное оно не снимает; если их не снять до сотворения заклинания, они поражают цель, когда она возвращается к жизни. Заклинание закрывает все смертельные раны и восстанавливает утраченные части тела.' },
        { title: 'Тяжёлое возвращение', text: 'Возвращение из мёртвых — тяжкое испытание. Цель получает штраф −4 ко всем броскам атаки, спасброскам и проверкам характеристик. Каждый раз, когда цель заканчивает продолжительный отдых, штраф уменьшается на 1, пока не исчезнет.' },
        { title: 'Цена', text: 'Если вы творите заклинание, чтобы вернуть жизнь существу, мёртвому год или дольше, это сильно изнуряет вас. Пока вы не закончите продолжительный отдых, вы не можете снова творить заклинания и совершаете с помехой все броски атаки, проверки характеристик и спасброски.' }
      ]
    }
  ),
  spell(
    'symbol', 'Знак', 7, 'abjuration',
    '1 минута', 'Касание', 'В, С, М (ртуть, фосфор и порошок алмаза и опала общей стоимостью не менее 1000 с.м., расходуются)', 'Пока не рассеется или не сработает',
    ['control'],
    'Сотворяя это заклинание, вы начертываете вредоносный знак либо на поверхности (например, на участке пола, стене или столе), либо внутри предмета, который можно закрыть, чтобы спрятать знак (например, в книге, свитке или сундуке с сокровищами). На поверхности знак может занимать участок диаметром не больше 10 футов. Предмет со знаком должен оставаться на месте: если его сдвинуть дальше чем на 10 футов от места сотворения, знак разрушается, и заклинание заканчивается, не сработав. Знак почти невидим: чтобы найти его, нужна проверка Интеллекта (Анализ) против СЛ спасброска ваших заклинаний.',
    {
      source: 'PHB',
      classes: ['Бард', 'Жрец', 'Волшебник'],
      sections: [
        { title: 'Срабатывание', text: 'Что запускает знак, вы решаете при сотворении. Для знака на поверхности это обычно касание или шаг на знак, удаление закрывающего его предмета, приближение к нему на определённое расстояние или действия с предметом, на котором он начертан. Для знака внутри предмета — открытие предмета, приближение к нему на определённое расстояние или взгляд на знак либо его прочтение. Условие можно уточнить так, чтобы заклинание срабатывало лишь при определённых обстоятельствах, по телосложению существа (например, росту или весу) или по его виду (например, только на ведьм или перевёртышей). Можно также указать существ, которые знак не запускают, — например, тех, кто произносит пароль.' },
        { title: 'Действие', text: 'Начертывая знак, выберите один из эффектов ниже. Сработав, знак светится, заполняя сферу радиусом 60 футов тусклым светом на 10 минут, после чего заклинание заканчивается. Эффект действует на каждое существо в сфере в момент срабатывания, а также на существо, которое впервые за ход входит в сферу или заканчивает в ней ход.' },
        { title: 'Смерть', text: 'Каждая цель совершает спасбросок Телосложения и получает 10к10 урона некротической энергией при провале или половину этого урона при успехе.' },
        { title: 'Раздор', text: 'Каждая цель совершает спасбросок Телосложения. При провале она 1 минуту пререкается и спорит с другими существами. Всё это время она не способна к осмысленному общению и совершает с помехой броски атаки и проверки характеристик.' },
        { title: 'Страх', text: 'Каждая цель совершает спасбросок Мудрости и при провале испугана на 1 минуту. Испуганная цель роняет всё, что держит, и в каждый свой ход должна, если может, отойти от знака хотя бы на 30 футов.' },
        { title: 'Безнадёжность', text: 'Каждая цель совершает спасбросок Харизмы. При провале её на 1 минуту охватывает отчаяние. Всё это время она не может атаковать или выбирать целью какое-либо существо вредоносными способностями, заклинаниями или другими магическими эффектами.' },
        { title: 'Безумие', text: 'Каждая цель совершает спасбросок Интеллекта. При провале она на 1 минуту сходит с ума. Безумное существо не может совершать действия, не понимает, что говорят другие существа, не может читать и говорит только бессвязно. Его беспорядочным перемещением управляет Мастер.' },
        { title: 'Боль', text: 'Каждая цель совершает спасбросок Телосложения и при провале на 1 минуту становится недееспособной от мучительной боли.' },
        { title: 'Сон', text: 'Каждая цель совершает спасбросок Мудрости и при провале теряет сознание на 10 минут. Существо просыпается, если получает урон или если кто-то действием растолкает его или даст пощёчину.' },
        { title: 'Оглушение', text: 'Каждая цель совершает спасбросок Мудрости и при провале ошеломлена на 1 минуту.' }
      ]
    }
  ),
  spell(
    'sequester', 'Изоляция', 7, 'transmutation',
    '1 действие', 'Касание', 'В, С, М (порошок алмаза, изумруда, рубина и сапфира стоимостью не менее 5000 с.м., расходуется)', 'Пока не рассеется',
    ['utility'],
    'Этим заклинанием согласное существо или предмет можно спрятать так, чтобы его нельзя было обнаружить, пока действует заклинание. Когда вы творите заклинание и касаетесь цели, она становится невидимой, её нельзя выбрать целью заклинаний прорицания и нельзя увидеть через сенсоры, созданные заклинаниями прорицания. Если цель — существо, оно впадает в оцепенение: для него перестаёт течь время, и оно не стареет. Вы можете назначить условие, при котором заклинание закончится раньше. Условие может быть любым, но оно должно наступить или быть видимым в пределах 1 мили от цели — например, «через 1000 лет» или «когда пробудится тарраска». Заклинание заканчивается и тогда, когда цель получает любой урон.',
    {
      source: 'PHB',
      classes: ['Волшебник']
    }
  ),
  spell(
    'crown-of-stars', 'Корона звёзд', 7, 'evocation',
    '1 действие', 'На себя', 'В, С', '1 час',
    ['damage'],
    'Вокруг вашей головы появляются и кружат, пока не закончится заклинание, семь звёздочек света. Бонусным действием вы можете послать одну из них в существо или предмет в пределах 120 футов от вас. Совершите дальнобойную атаку заклинанием. При попадании цель получает 4к12 урона излучением. Попали вы или нет, звёздочка расходуется. Заклинание заканчивается досрочно, если вы потратили последнюю звёздочку.',
    {
      source: 'XGE',
      classes: ['Чародей', 'Волшебник', 'Колдун'],
      sections: [
        { title: 'Свет', text: 'Пока звёздочек четыре или больше, они излучают яркий свет в радиусе 30 футов и тусклый свет ещё на 30 футов. Когда их от одной до трёх, они излучают тусклый свет в радиусе 30 футов.' },
        { title: 'На более высоких уровнях', text: 'Звёздочек становится на две больше за каждый уровень ячейки выше 7-го.' }
      ]
    }
  ),
  spell(
    'fire-storm', 'Огненная буря', 7, 'evocation',
    '1 действие', '150 фт.', 'В, С', 'Мгновенная',
    ['damage'],
    'В выбранном вами месте в пределах дистанции появляется буря из ревущих полотнищ пламени. Область бури — до десяти кубов со стороной 10 футов, расставленных как вам угодно; каждый куб должен хотя бы одной гранью примыкать к грани другого. Каждое существо в области совершает спасбросок Ловкости и получает 7к10 урона огнём при провале или половину этого урона при успехе. Огонь повреждает предметы в области и поджигает горючие предметы, которые никто не носит и не несёт. По вашему желанию растения в области заклинанию не подвержены.',
    {
      source: 'PHB',
      classes: ['Жрец', 'Друид', 'Чародей']
    }
  ),
  spell(
    'finger-of-death', 'Перст смерти', 7, 'necromancy',
    '1 действие', '60 фт.', 'В, С', 'Мгновенная',
    ['damage'],
    'Вы пропускаете сквозь существо, которое видите в пределах дистанции, поток отрицательной энергии, причиняя ему жгучую боль. Цель совершает спасбросок Телосложения и получает 7к8 + 30 урона некротической энергией при провале или половину этого урона при успехе. Гуманоид, убитый этим заклинанием, в начале вашего следующего хода встаёт зомби, который навсегда остаётся под вашим началом и как может выполняет ваши устные приказы.',
    {
      source: 'PHB',
      classes: ['Чародей', 'Волшебник', 'Колдун']
    }
  ),
  spell(
    'simulacrum', 'Подобие', 7, 'illusion',
    '12 часов', 'Касание', 'В, С, М (снег или лёд в форме цели, частица её тела и порошок рубина стоимостью не менее 1500 с.м., расходуется)', 'Пока не рассеется',
    ['utility'],
    'Вы создаёте иллюзорную копию одного зверя или гуманоида, который всё время сотворения находится в пределах дистанции. Копия — существо, отчасти настоящее и сделанное из льда или снега; оно может совершать действия, и на него можно воздействовать как на обычное существо. С виду оно такое же, как оригинал, но у него половина максимума хитов оригинала, и оно появляется без снаряжения. В остальном иллюзия использует все параметры существа, которое повторяет.',
    {
      source: 'PHB',
      classes: ['Волшебник'],
      sections: [
        { title: 'Слуга', text: 'Симулякр дружелюбен к вам и к существам, которых вы укажете. Он подчиняется вашим устным командам, перемещается и действует так, как вы хотите, а в бою ходит в ваш ход. Симулякр не способен учиться и становиться сильнее, поэтому никогда не повышает уровень и другие способности и не может восстанавливать потраченные ячейки заклинаний.' },
        { title: 'Починка и гибель', text: 'Повреждённый симулякр можно починить в алхимической лаборатории, потратив редкие травы и минералы стоимостью 100 с.м. за каждый восстановленный хит. Симулякр существует, пока его хиты не опустятся до 0; тогда он снова становится снегом и мгновенно тает. Если вы творите это заклинание снова, все действующие копии, созданные им раньше, мгновенно уничтожаются.' }
      ]
    }
  ),
  spell(
    'prismatic-spray', 'Радужные брызги', 7, 'evocation',
    '1 действие', 'На себя (конус 60 фт.)', 'В, С', 'Мгновенная',
    ['damage', 'control'],
    'Из вашей руки вырываются восемь разноцветных лучей света. У каждого луча свой цвет, своя сила и своё назначение. Каждое существо в конусе длиной 60 футов совершает спасбросок Ловкости. Для каждой цели бросьте к8, чтобы узнать, какой луч на неё действует.',
    {
      source: 'PHB',
      classes: ['Чародей', 'Волшебник'],
      sections: [
        { title: '1. Красный', text: 'Цель получает 10к6 урона огнём при провале или половину этого урона при успехе.' },
        { title: '2. Оранжевый', text: 'Цель получает 10к6 урона кислотой при провале или половину этого урона при успехе.' },
        { title: '3. Жёлтый', text: 'Цель получает 10к6 урона электричеством при провале или половину этого урона при успехе.' },
        { title: '4. Зелёный', text: 'Цель получает 10к6 урона ядом при провале или половину этого урона при успехе.' },
        { title: '5. Синий', text: 'Цель получает 10к6 урона холодом при провале или половину этого урона при успехе.' },
        { title: '6. Индиго', text: 'При провале цель опутана. Затем в конце каждого своего хода она совершает спасбросок Телосложения. Если она трижды преуспевает, заклинание заканчивается. Если трижды проваливает, она навсегда обращается в камень и окаменевает. Успехи и провалы не обязаны идти подряд: считайте и те и другие, пока цель не наберёт три одинаковых.' },
        { title: '7. Фиолетовый', text: 'При провале цель ослеплена. Затем в начале вашего следующего хода она совершает спасбросок Мудрости. При успехе слепота проходит. При провале существо переносится на другой план существования по выбору Мастера и больше не ослеплено. (Обычно существо, которое не на своём родном плане, изгоняется домой, а остальных, как правило, забрасывает на Астральный или Эфирный план.)' },
        { title: '8. Особый', text: 'В цель попадают два луча. Бросьте ещё дважды, перебрасывая каждую 8.' }
      ]
    }
  ),
  spell(
    'regenerate', 'Регенерация', 7, 'transmutation',
    '1 минута', 'Касание', 'В, С, М (молитвенное колесо и святая вода)', '1 час',
    ['healing'],
    'Вы касаетесь существа и пробуждаете его природную способность к исцелению. Цель восстанавливает 4к8 + 15 хитов. Пока действует заклинание, цель восстанавливает 1 хит в начале каждого своего хода (10 хитов в минуту). Отрубленные части тела цели (пальцы, ноги, хвосты и так далее), если они есть, восстанавливаются через 2 минуты. Если у вас есть отрубленная часть и вы прижимаете её к обрубку, заклинание мгновенно приращивает её.',
    {
      source: 'PHB',
      classes: ['Бард', 'Жрец', 'Друид']
    }
  ),
  spell(
    'power-word-pain', 'Слово силы: Боль', 7, 'enchantment',
    '1 действие', '60 фт.', 'В', 'Мгновенная',
    ['control'],
    'Вы произносите слово силы, и на одно существо, которое вы видите в пределах дистанции, обрушиваются волны сильной боли. Если у цели 100 хитов или меньше, её сковывает мучительная боль; иначе заклинание на неё не действует. Не действует оно и на цель, которую нельзя очаровать.',
    {
      source: 'XGE',
      classes: ['Чародей', 'Волшебник', 'Колдун'],
      sections: [
        { title: 'Мучительная боль', text: 'Пока цель скована болью, любая её скорость не может быть выше 10 футов. Цель совершает с помехой броски атаки, проверки характеристик и спасброски, кроме спасбросков Телосложения. Наконец, если цель пытается сотворить заклинание, она сперва должна преуспеть в спасброске Телосложения, иначе сотворение не удаётся, а заклинание потрачено впустую. В конце каждого своего хода страдающая от боли цель может совершить спасбросок Телосложения и при успехе избавляется от боли.' }
      ]
    }
  ),
  spell(
    'dream-of-the-blue-veil', 'Сон синей вуали', 7, 'conjuration',
    '10 минут', '20 фт.', 'В, С, М (магический предмет или согласное существо из мира назначения)', '6 часов',
    ['utility'],
    'Вы и не более восьми согласных существ в пределах дистанции теряете сознание на время действия заклинания и видите видения другого мира на Материальном плане. Если заклинание длится всю свою длительность, видения заканчиваются тем, что каждый из вас находит таинственный синий занавес и отдёргивает его. Тогда заклинание заканчивается, и вы душой и телом переноситесь в мир из видений.',
    {
      source: 'TCE',
      classes: ['Бард', 'Чародей', 'Волшебник', 'Колдун'],
      sections: [
        { title: 'Куда', text: 'Чтобы сотворить это заклинание, нужен магический предмет, созданный в мире, куда вы хотите попасть, и вы должны знать о существовании этого мира, пусть даже не зная его названия. Вы попадаете в безопасное место в пределах 1 мили от того места, где был создан предмет. Заклинание можно сотворить и тогда, когда одно из подвластных ему существ родилось в другом мире: тогда вы попадаете в безопасное место в пределах 1 мили от места его рождения.' },
        { title: 'Прерванный сон', text: 'Если существо получает любой урон, заклинание для него досрочно заканчивается, и оно никуда не переносится. Если урон получаете вы, заклинание заканчивается для вас и всех остальных существ, и никто не переносится.' }
      ]
    }
  ),
  spell(
    'mirage-arcane', 'Таинственный мираж', 7, 'illusion',
    '10 минут', 'В пределах видимости', 'В, С', '10 дней',
    ['control', 'utility'],
    'Вы делаете так, что местность на площади до 1 квадратной мили выглядит, звучит, пахнет и даже ощущается на ощупь как местность другого рода. Общие очертания местности, однако, остаются прежними. Открытое поле или дорогу можно сделать похожими на болото, холм, расселину или другую труднопроходимую или непроходимую местность. Пруд можно превратить с виду в травянистый луг, обрыв — в пологий склон, а усыпанный камнями овраг — в широкую ровную дорогу. Точно так же можно изменить вид построек или добавить их там, где их нет. Существ заклинание не маскирует, не скрывает и не добавляет.',
    {
      source: 'PHB',
      classes: ['Бард', 'Друид', 'Волшебник'],
      sections: [
        { title: 'Ощутимая иллюзия', text: 'У иллюзии есть звук, вид, осязаемость и запах, поэтому она может превратить чистую землю в труднопроходимую местность (или наоборот) или иначе мешать передвижению по области. Любая часть иллюзорной местности (например, камень или палка), вынесенная из области заклинания, сразу исчезает.' },
        { title: 'Истинное зрение', text: 'Существа с истинным зрением видят сквозь иллюзию настоящий облик местности; однако все остальные составляющие иллюзии сохраняются, так что существо, хоть и знает об иллюзии, всё равно может физически с ней взаимодействовать.' }
      ]
    }
  ),
  spell(
    'teleport', 'Телепортация', 7, 'conjuration',
    '1 действие', '10 фт.', 'В', 'Мгновенная',
    ['utility'],
    'Заклинание мгновенно переносит вас и не более восьми согласных существ на ваш выбор, которых вы видите в пределах дистанции, или один предмет, который вы видите в пределах дистанции, в выбранное вами место назначения. Предмет должен целиком умещаться в кубе со стороной 10 футов, и его не может держать или нести несогласное существо. Место назначения должно быть вам известно и находиться на одном с вами плане существования. Попадёте ли вы туда, зависит от того, насколько хорошо вы знаете место. Мастер бросает к100 по таблице ниже.',
    {
      source: 'PHB',
      classes: ['Бард', 'Чародей', 'Волшебник'],
      sections: [
        { title: 'Таблица (к100)', text: 'Постоянный круг и связанный предмет — точно в цель 01–100. Очень знакомо — неудача 01–05, похожее место 06–13, мимо цели 14–24, точно в цель 25–100. Видели мельком — неудача 01–33, похожее место 34–43, мимо цели 44–53, точно в цель 54–100. Видели однажды и Описание — неудача 01–43, похожее место 44–53, мимо цели 54–73, точно в цель 74–100. Ложное место — неудача 01–50, похожее место 51–100.' },
        { title: 'Знакомство', text: '«Постоянный круг» — постоянный круг телепортации, последовательность знаков которого вы знаете. «Связанный предмет» — у вас есть предмет, взятый из нужного места за последние шесть месяцев: например, книга из библиотеки волшебника, постельное бельё из королевских покоев или кусок мрамора из тайной гробницы лича. «Очень знакомо» — место, где вы бывали очень часто, которое тщательно изучили или которое видите при сотворении. «Видели мельком» — место, которое вы видели не раз, но знаете не очень хорошо. «Видели однажды» — место, которое вы видели один раз, возможно с помощью магии. «Описание» — место, расположение и вид которого вы знаете по чужому описанию, может быть, по карте. «Ложное место» — места не существует: может быть, вы пытались наблюдать за убежищем врага, а увидели иллюзию, или пытаетесь попасть в знакомое место, которого больше нет.' },
        { title: 'Точно в цель', text: 'Вы и ваша группа (или предмет-цель) появляетесь там, где хотели.' },
        { title: 'Мимо цели', text: 'Вы и ваша группа (или предмет-цель) появляетесь на случайном расстоянии от места назначения в случайном направлении. Отклонение — 1к10 × 1к10 процентов расстояния, которое нужно было преодолеть. Например, если вы пытались переместиться на 120 миль, промахнулись и на двух к10 выпали 5 и 3, отклонение — 15 процентов, то есть 18 миль. Направление Мастер определяет случайно, бросая к8: 1 — север, 2 — северо-восток, 3 — восток и так далее по сторонам света. Если вы телепортировались в приморский город и оказались в 18 милях от берега в море, у вас могут быть неприятности.' },
        { title: 'Похожее место', text: 'Вы и ваша группа (или предмет-цель) оказываетесь в другом месте, похожем на нужное внешне или по сути. Например, если вы направлялись в свою домашнюю лабораторию, то можете оказаться в лаборатории другого волшебника или в лавке алхимических припасов, где много тех же инструментов и принадлежностей. Обычно вы появляетесь в ближайшем похожем месте, но заклинание не ограничено дистанцией, поэтому вы можете оказаться где угодно на этом плане.' },
        { title: 'Неудача', text: 'Непредсказуемая магия заклинания делает путь тяжёлым. Каждое телепортирующееся существо (или предмет-цель) получает 3к10 урона силовым полем, а Мастер снова бросает по таблице, чтобы узнать, где вы окажетесь (неудач может быть несколько, и урон наносится каждый раз).' }
      ]
    }
  ),
  spell(
    'forcecage', 'Узилище', 7, 'evocation',
    '1 действие', '100 фт.', 'В, С, М (рубиновая пыль стоимостью не менее 1500 с.м., расходуется)', '1 час',
    ['control'],
    'Вокруг выбранной вами области в пределах дистанции возникает неподвижная невидимая кубическая темница из магической силы. Темница может быть клеткой или сплошным ящиком — на ваш выбор. Клетка может быть со стороной до 20 футов и состоит из прутьев диаметром 1/2 дюйма с промежутками в 1/2 дюйма. Ящик может быть со стороной до 10 футов: это сплошная преграда, которая не пропускает никакого вещества и не даёт творить заклинания в эту область или из неё.',
    {
      source: 'PHB',
      classes: ['Бард', 'Волшебник'],
      sections: [
        { title: 'Заключённые', text: 'Каждое существо, которое при сотворении целиком находится в области клетки, оказывается в ловушке. Существа, которые лишь частично в области или слишком велики, чтобы в ней поместиться, выталкиваются от центра области, пока не окажутся целиком снаружи.' },
        { title: 'Побег', text: 'Существо внутри клетки не может покинуть её немагическими способами. Если существо пытается выбраться телепортацией или путешествием между планами, оно сперва должно совершить спасбросок Харизмы. При успехе оно может выйти из клетки с помощью этой магии. При провале выйти не удаётся, а заклинание или эффект потрачены впустую. Клетка продолжается и на Эфирном плане, не давая пройти эфирным путём. Это заклинание нельзя рассеять заклинанием рассеивания магии.' }
      ]
    }
  ),
  spell(
    'plane-shift', 'Уход в иной мир', 7, 'conjuration',
    '1 действие', 'Касание', 'В, С, М (раздвоенный металлический жезл стоимостью не менее 250 с.м., настроенный на нужный план)', 'Мгновенная',
    ['utility'],
    'Вы и не более восьми согласных существ, которые взялись за руки, встав в круг, переноситесь на другой план существования. Место назначения можно указать в общих чертах — например, Медный город на Стихийном плане Огня или дворец Диспатера на втором круге Девяти Преисподних, — и вы появляетесь в этом месте или рядом с ним. Если вы, например, хотите попасть в Медный город, то можете оказаться на его Стальной улице, перед его Пепельными вратами или смотреть на город с другого берега Огненного моря — на усмотрение Мастера.',
    {
      source: 'PHB',
      classes: ['Жрец', 'Друид', 'Чародей', 'Волшебник', 'Колдун'],
      sections: [
        { title: 'Круг телепортации', text: 'Если же вы знаете последовательность знаков круга телепортации на другом плане существования, заклинание может перенести вас к этому кругу. Если круг слишком мал, чтобы вместить всех перенесённых существ, они появляются в ближайших к нему свободных пространствах.' },
        { title: 'Изгнание', text: 'Этим заклинанием можно изгнать несогласное существо на другой план. Выберите существо в пределах вашей досягаемости и совершите по нему рукопашную атаку заклинанием. При попадании существо совершает спасбросок Харизмы. При провале оно переносится в случайное место на указанном вами плане существования. Перенесённое так существо должно само искать дорогу обратно на ваш нынешний план.' }
      ]
    }
  ),
  spell(
    'temple-of-the-gods', 'Храм богов', 7, 'conjuration',
    '1 час', '120 фт.', 'В, С, М (священный символ стоимостью не менее 5 с.м.)', '24 часа',
    ['utility', 'support'],
    'Вы заставляете храм мерцанием возникнуть на земле, которую видите в пределах дистанции. Храм должен уместиться в незанятом кубе со стороной до 120 футов и стоит, пока заклинание не закончится. Он посвящён тому богу, пантеону или учению, которое представляет священный символ, использованный при сотворении.',
    {
      source: 'XGE',
      classes: ['Жрец'],
      sections: [
        { title: 'Устройство', text: 'Вид храма определяете вы. Внутреннее пространство ограничено полом, стенами и крышей; в храм ведёт одна дверь, а окон может быть сколько угодно. Открывать и закрывать дверь могут только вы и существа, которых вы укажете при сотворении. Внутри — открытое пространство с идолом или алтарём в одном конце. Вы решаете, освещён ли храм и каким светом — ярким или тусклым. В воздухе пахнет курящимися благовониями, температура мягкая.' },
        { title: 'Неугодные', text: 'Храм противостоит видам существ, которые вы выбираете при сотворении: одному или нескольким из небожителей, элементалей, фей, исчадий и нежити. Если существо выбранного вида пытается войти в храм, оно совершает спасбросок Харизмы. При провале оно не может войти в храм 24 часа. Даже если существо может войти, магия храма мешает ему: каждый раз, совершая внутри бросок атаки, проверку характеристики или спасбросок, оно бросает к4 и вычитает выпавшее из броска к20.' },
        { title: 'Защита и лечение', text: 'Сенсоры заклинаний прорицания не могут появиться внутри храма, а существ внутри нельзя выбрать целью заклинаний прорицания. Каждый раз, когда существо в храме восстанавливает хиты от заклинания 1-го уровня или выше, оно восстанавливает дополнительно хиты в количестве вашего модификатора Мудрости (не меньше 1).' },
        { title: 'Стены', text: 'Храм сделан из непрозрачной магической силы, которая продолжается и на Эфирном плане, не давая проникнуть внутрь эфирным путём. Ничто не может физически пройти сквозь внешние стены храма. Его нельзя рассеять заклинанием рассеивания магии, и поле антимагии на него не действует. Заклинание распада мгновенно уничтожает храм. Если творить это заклинание на одном и том же месте каждый день в течение года, эффект становится постоянным.' }
      ]
    }
  ),
  spell(
    'etherealness', 'Эфирность', 7, 'transmutation',
    '1 действие', 'На себя', 'В, С', 'До 8 часов',
    ['utility'],
    'Вы шагаете в пограничные области Эфирного плана — туда, где он перекрывается с вашим нынешним планом. Вы остаётесь в Пограничном Эфире, пока действует заклинание или пока вы действием не окончите его. Всё это время вы можете перемещаться в любом направлении; при движении вверх или вниз каждый фут перемещения стоит дополнительный фут. Вы видите и слышите план, с которого пришли, но всё там выглядит серым, и дальше 60 футов вы ничего не видите.',
    {
      source: 'PHB',
      classes: ['Бард', 'Жрец', 'Чародей', 'Волшебник', 'Колдун'],
      sections: [
        { title: 'На Эфирном плане', text: 'На Эфирном плане вы можете воздействовать только на существ на этом же плане, и только они могут воздействовать на вас. Существа не на Эфирном плане не могут вас воспринимать и взаимодействовать с вами, если только особая способность или магия не даёт им этого. Вы не замечаете предметов и эффектов, которых нет на Эфирном плане, и можете проходить сквозь предметы, которые видите на родном плане.' },
        { title: 'Возвращение', text: 'Когда заклинание заканчивается, вы сразу возвращаетесь на свой родной план в той точке, где сейчас находитесь. Если в этот момент вы занимаете одно место с твёрдым предметом или существом, вас сразу выталкивает в ближайшее свободное пространство, которое вы можете занять, и вы получаете урон силовым полем, равный удвоенному числу футов, на которые вас сдвинуло.' },
        { title: 'Где не действует', text: 'Заклинание ничего не делает, если вы творите его на Эфирном плане или на плане, который с ним не граничит, — например, на одном из Внешних планов.' },
        { title: 'На более высоких уровнях', text: 'Ячейкой 8-го уровня или выше вы можете выбрать целями до трёх согласных существ (включая себя) за каждый уровень ячейки выше 7-го. При сотворении эти существа должны быть в пределах 10 футов от вас.' }
      ]
    }
  ),
  // ── Заклинания 6 уровня без концентрации (базовые, PHB / XGE) ─────
  spell(
    'magic-jar', 'Волшебный сосуд', 6, 'necromancy',
    '1 минута', 'На себя', 'В, С, М (самоцвет, кристалл или реликварий стоимостью не менее 500 с.м.)', 'Пока не рассеется',
    ['control'],
    'Ваше тело впадает в оцепенение, а душа покидает его и переселяется в сосуд, который служит материальным компонентом. Пока душа в сосуде, вы осознаёте окружающее так, как если бы находились в пространстве сосуда. Вы не можете перемещаться и совершать реакции. Единственное доступное вам действие — выбросить душу из сосуда на расстояние до 100 футов, чтобы либо вернуться в своё живое тело (окончив заклинание), либо попытаться вселиться в тело гуманоида.',
    {
      source: 'PHB',
      classes: ['Волшебник'],
      sections: [
        { title: 'Вселение', text: 'Вы можете попытаться вселиться в любого гуманоида, которого видите в пределах 100 футов от себя (в существ, защищённых заклинанием защиты от добра и зла или магического круга, вселиться нельзя). Цель совершает спасбросок Харизмы. При провале ваша душа переходит в тело цели, а душа цели оказывается заперта в сосуде. При успехе цель противится вашей попытке, и снова попытаться вселиться в неё вы сможете только через 24 часа.' },
        { title: 'В чужом теле', text: 'Вселившись в тело существа, вы управляете им. Ваши игровые параметры заменяются параметрами существа, но вы сохраняете своё мировоззрение и значения Интеллекта, Мудрости и Харизмы. Вы сохраняете и пользу от умений своего класса. Если у цели есть уровни класса, вы не можете пользоваться её классовыми умениями. Душа существа, в которое вы вселились, тем временем воспринимает окружающее из сосуда своими чувствами, но совсем не может двигаться и совершать действия.' },
        { title: 'Возвращение', text: 'Находясь в теле, вы можете действием вернуться из тела-носителя в сосуд, если он в пределах 100 футов от вас, и тогда душа носителя возвращается в своё тело. Если тело-носитель умирает, пока вы в нём, существо умирает, а вы должны совершить спасбросок Харизмы против своей же СЛ заклинаний. При успехе вы возвращаетесь в сосуд, если он в пределах 100 футов от вас. Иначе вы умираете.' },
        { title: 'Конец заклинания', text: 'Если сосуд уничтожен или заклинание закончилось, ваша душа сразу возвращается в ваше тело. Если тело дальше 100 футов от вас или мертво, когда вы пытаетесь в него вернуться, вы умираете. Если в момент уничтожения сосуда в нём душа другого существа, она возвращается в своё тело, если оно живо и в пределах 100 футов. Иначе это существо умирает. Когда заклинание заканчивается, сосуд уничтожается.' }
      ]
    }
  ),
  spell(
    'drawmijs-instant-summons', 'Дромиджево появление', 6, 'conjuration',
    '1 минута', 'Касание', 'В, С, М (сапфир стоимостью не менее 1000 с.м.)', 'Пока не рассеется',
    ['ritual', 'utility'],
    'Вы касаетесь предмета весом не больше 10 фунтов, самый длинный размер которого не больше 6 футов. Заклинание оставляет на его поверхности невидимую метку и невидимо записывает название предмета на сапфире, который служит материальным компонентом. Для каждого сотворения нужен новый сапфир.',
    {
      source: 'PHB',
      classes: ['Волшебник'],
      sections: [
        { title: 'Призыв', text: 'В любой момент после этого вы можете действием произнести название предмета и раздавить сапфир. Предмет мгновенно появляется у вас в руке, как бы далеко он ни был и на каком бы плане ни находился, и заклинание заканчивается.' },
        { title: 'Чужие руки', text: 'Если предмет держит или несёт другое существо, раздавленный сапфир не переносит предмет к вам, но вы узнаёте, кто это существо и где примерно оно находится в этот момент.' },
        { title: 'Рассеивание', text: 'Рассеивание магии или похожий эффект, успешно применённые к сапфиру, оканчивают действие заклинания.' }
      ]
    }
  ),
  spell(
    'programmed-illusion', 'Заданная иллюзия', 6, 'illusion',
    '1 действие', '120 фт.', 'В, С, М (клочок овечьей шерсти и нефритовая пыль стоимостью не менее 25 с.м.)', 'Пока не рассеется',
    ['utility'],
    'Вы создаёте в пределах дистанции иллюзию предмета, существа или другого видимого явления, которая срабатывает при определённом условии. До этого иллюзию невозможно заметить. Она должна умещаться в кубе со стороной 30 футов; при сотворении вы решаете, как иллюзия будет себя вести и какие звуки издавать. Это представление может длиться до 5 минут.',
    {
      source: 'PHB',
      classes: ['Бард', 'Волшебник'],
      sections: [
        { title: 'Срабатывание', text: 'Когда наступает заданное вами условие, иллюзия появляется и ведёт себя так, как вы описали. Закончив представление, иллюзия исчезает и 10 минут остаётся в бездействии. После этого её снова можно запустить. Условие может быть сколь угодно общим или подробным, но должно основываться на том, что видно или слышно в пределах 30 футов от области. Например, можно создать иллюзию самого себя, которая появится и предостережёт тех, кто попытается открыть дверь с ловушкой, или сделать так, чтобы иллюзия срабатывала, только когда существо произнесёт верное слово или фразу.' },
        { title: 'Разоблачение', text: 'Физическое взаимодействие с образом показывает, что это иллюзия: предметы проходят сквозь него. Существо, которое действием изучает образ, может понять, что это иллюзия, преуспев в проверке Интеллекта (Анализ) против СЛ спасброска ваших заклинаний. Распознавшее иллюзию существо видит сквозь образ, а все его звуки кажутся ему пустыми.' }
      ]
    }
  ),
  spell(
    'forbiddance', 'Запрет', 6, 'abjuration',
    '10 минут', 'Касание', 'В, С, М (капли святой воды, редкие благовония и порошок рубина стоимостью не менее 1000 с.м.)', '1 день',
    ['ritual', 'control', 'damage'],
    'Вы создаёте защиту от магических перемещений, охраняющую до 40 000 квадратных футов пола на высоту до 30 футов над ним. Пока действует заклинание, существа не могут телепортироваться в область или входить в неё через порталы — например, созданные заклинанием врат. Заклинание ограждает область от путешествий между планами и поэтому не даёт попасть в неё через Астральный план, Эфирный план, Страну фей, Царство теней или заклинанием ухода в иной мир.',
    {
      source: 'PHB',
      classes: ['Жрец'],
      sections: [
        { title: 'Урон', text: 'Кроме того, заклинание вредит выбранным при сотворении видам существ. Выберите один или несколько: небожители, элементали, феи, исчадия и нежить. Когда выбранное существо впервые за ход входит в область заклинания или начинает в ней ход, оно получает 5к10 урона излучением или некротической энергией (выбираете при сотворении).' },
        { title: 'Пароль', text: 'При сотворении вы можете назначить пароль. Существо, которое произносит пароль, входя в область, не получает урона от заклинания.' },
        { title: 'Навсегда', text: 'Область заклинания не может пересекаться с областью другого заклинания запрета. Если творить запрет каждый день в течение 30 дней на одном и том же месте, заклинание длится, пока его не рассеют, а материальные компоненты расходуются при последнем сотворении.' }
      ]
    }
  ),
  spell(
    'true-seeing', 'Истинное зрение', 6, 'divination',
    '1 действие', 'Касание', 'В, С, М (мазь для глаз стоимостью 25 с.м. из грибного порошка, шафрана и жира, расходуется)', '1 час',
    ['utility'],
    'Заклинание даёт согласному существу, которого вы касаетесь, способность видеть вещи такими, какие они есть. Пока действует заклинание, у существа есть истинное зрение, оно замечает потайные двери, скрытые магией, и видит Эфирный план — всё на расстоянии до 120 футов.',
    {
      source: 'PHB',
      classes: ['Бард', 'Жрец', 'Чародей', 'Волшебник', 'Колдун']
    }
  ),
  spell(
    'soul-cage', 'Клетка душ', 6, 'necromancy',
    '1 реакция, совершаемая, когда гуманоид, которого вы видите в пределах 60 фт., умирает', '60 фт.', 'В, С, М (крошечная серебряная клетка стоимостью не менее 100 с.м.)', '8 часов',
    ['utility'],
    'Заклинание выхватывает душу умирающего гуманоида и запирает её в крошечной клетке, которая служит материальным компонентом. Украденная душа остаётся в клетке, пока заклинание не закончится или пока вы не уничтожите клетку, что тоже оканчивает заклинание. Пока в клетке есть душа, вы можете использовать её любым из способов ниже — всего до шести раз. После шестого использования душа освобождается, и заклинание заканчивается. Пока душа заперта, умершего гуманоида, которому она принадлежала, нельзя вернуть к жизни.',
    {
      source: 'XGE',
      classes: ['Волшебник', 'Колдун'],
      sections: [
        { title: 'Похищение жизни', text: 'Бонусным действием вы вытягиваете из души силу и восстанавливаете 2к8 хитов.' },
        { title: 'Расспрос души', text: 'Вы задаёте душе вопрос (действия это не требует) и получаете короткий телепатический ответ, который понимаете на любом языке. Душа знает только то, что знала при жизни, но должна отвечать вам правдиво и как может. Ответ — не больше одного-двух предложений и может быть загадочным.' },
        { title: 'Чужой опыт', text: 'Бонусным действием вы укрепляете себя жизненным опытом души: следующий бросок атаки, проверку характеристики или спасбросок вы совершаете с преимуществом. Если не воспользоваться этим до начала вашего следующего хода, благо пропадает.' },
        { title: 'Глаза мёртвого', text: 'Действием вы называете место, которое гуманоид видел при жизни. Если оно на том же плане существования, что и вы, где-то в нём появляется невидимый сенсор. Сенсор держится, пока вы концентрируетесь, до 10 минут (как если бы вы концентрировались на заклинании). Через сенсор вы видите и слышите, как если бы были на его месте и пользовались своими чувствами.' }
      ]
    }
  ),
  spell(
    'bones-of-the-earth', 'Кости земли', 6, 'transmutation',
    '1 действие', '120 фт.', 'В, С', 'Мгновенная',
    ['damage', 'control'],
    'Вы заставляете до шести каменных столбов вырваться из земли в местах, которые видите в пределах дистанции. Каждый столб — цилиндр диаметром 5 футов и высотой до 30 футов. Земля под столбом должна быть достаточно широкой для его диаметра; можно выбрать землю под существом, если оно размера Средний или меньше. У каждого столба КД 5 и 30 хитов. Когда хиты столба опускаются до 0, он рассыпается щебнем, который создаёт труднопроходимую местность радиусом 10 футов, пока его не уберут. Чтобы расчистить вручную каждый участок диаметром 5 футов, нужна хотя бы 1 минута.',
    {
      source: 'XGE',
      classes: ['Друид'],
      sections: [
        { title: 'Под существом', text: 'Если столб появляется под существом, оно должно преуспеть в спасброске Ловкости, иначе столб поднимает его. Существо может провалить спасбросок по своему желанию.' },
        { title: 'Зажатый', text: 'Если столб не может подняться на полную высоту из-за потолка или другой преграды, существо на нём получает 6к6 дробящего урона и опутано, зажатое между столбом и преградой. Опутанное существо может действием совершить проверку Силы или Ловкости (на свой выбор) против СЛ спасброска заклинания. При успехе оно больше не опутано и должно либо сойти со столба, либо упасть с него.' },
        { title: 'На более высоких уровнях', text: 'Вы создаёте ещё два столба за каждый уровень ячейки выше 6-го.' }
      ]
    }
  ),
  spell(
    'circle-of-death', 'Круг смерти', 6, 'necromancy',
    '1 действие', '150 фт.', 'В, С, М (порошок растёртой чёрной жемчужины стоимостью не менее 500 с.м.)', 'Мгновенная',
    ['damage'],
    'Из точки в пределах дистанции расходится сфера отрицательной энергии радиусом 60 футов. Каждое существо в этой области совершает спасбросок Телосложения и получает 8к6 урона некротической энергией при провале или половину этого урона при успехе.',
    {
      source: 'PHB',
      classes: ['Чародей', 'Волшебник', 'Колдун'],
      sections: [
        { title: 'На более высоких уровнях', text: 'Урон увеличивается на 2к6 за каждый уровень ячейки выше 6-го.' }
      ]
    }
  ),
  spell(
    'mass-suggestion', 'Множественное внушение', 6, 'enchantment',
    '1 действие', '60 фт.', 'В, М (язык змеи и капля мёда или сладкого масла)', '24 часа',
    ['control'],
    'Вы предлагаете образ действий (одно-два предложения) и магически влияете на не более чем двенадцать существ на ваш выбор, которых вы видите в пределах дистанции и которые слышат и понимают вас. Существа, которых нельзя очаровать, невосприимчивы к этому эффекту. Внушение должно быть сформулировано так, чтобы образ действий казался разумным. Если попросить существо заколоть себя, броситься на копьё, поджечь себя или сделать что-то иное явно вредное, эффект заклинания автоматически пропадает.',
    {
      source: 'PHB',
      classes: ['Бард', 'Чародей', 'Волшебник', 'Колдун'],
      sections: [
        { title: 'Исполнение', text: 'Каждая цель совершает спасбросок Мудрости. При провале она как может следует описанному вами образу действий. Внушённое может длиться всю длительность заклинания. Если внушённое дело можно выполнить быстрее, заклинание заканчивается, когда цель выполнит то, о чём её просили.' },
        { title: 'Условие', text: 'Можно также назвать условия, при которых в течение длительности цели совершат особое действие. Например, можно внушить отряду солдат отдать все деньги первому встреченному нищему. Если условие не наступит до окончания заклинания, действие не совершается.' },
        { title: 'Урон', text: 'Если вы или кто-то из ваших спутников причиняет урон существу под действием этого заклинания, заклинание для этого существа заканчивается.' },
        { title: 'На более высоких уровнях', text: 'Ячейкой 7-го уровня длительность — 10 дней, ячейкой 8-го уровня — 30 дней, ячейкой 9-го уровня — год и один день.' }
      ]
    }
  ),
  spell(
    'otilukes-freezing-sphere', 'Отилюков ледяной шар', 6, 'evocation',
    '1 действие', '300 фт.', 'В, С, М (маленькая хрустальная сфера)', 'Мгновенная',
    ['damage'],
    'С кончиков ваших пальцев к выбранной вами точке в пределах дистанции устремляется морозный шар холодной энергии и взрывается там сферой радиусом 60 футов. Каждое существо в области совершает спасбросок Телосложения. При провале существо получает 10к6 урона холодом, при успехе — половину этого урона.',
    {
      source: 'PHB',
      classes: ['Волшебник'],
      sections: [
        { title: 'Лёд', text: 'Если шар попадает в водоём или в жидкость, состоящую в основном из воды (не считая водяных существ), он замораживает жидкость на глубину 6 дюймов на площади 30 × 30 футов. Лёд держится 1 минуту. Существа, плававшие на поверхности замёрзшей воды, вмерзают в лёд. Вмёрзшее существо может действием совершить проверку Силы против СЛ спасброска ваших заклинаний, чтобы вырваться.' },
        { title: 'Шар про запас', text: 'Закончив сотворение, вы можете по желанию не выпускать шар. Тогда у вас в руке появляется маленький, холодный на ощупь шарик размером с камень для пращи. В любой момент вы или существо, которому вы его отдали, можете бросить шарик (на 40 футов) или метнуть его из пращи (на обычную дистанцию пращи). Он разбивается при ударе с тем же эффектом, что и при обычном сотворении. Шарик можно и положить, не разбив. Если через 1 минуту шарик ещё не разбился, он взрывается.' },
        { title: 'На более высоких уровнях', text: 'Урон увеличивается на 1к6 за каждый уровень ячейки выше 6-го.' }
      ]
    }
  ),
  spell(
    'heroes-feast', 'Пир героев', 6, 'conjuration',
    '10 минут', '30 фт.', 'В, С, М (украшенная самоцветами чаша стоимостью не менее 1000 с.м., расходуется)', 'Мгновенная',
    ['healing', 'support'],
    'Вы создаёте великолепный пир с изысканными яствами и напитками. На пир уходит 1 час, после чего он исчезает, а полезные эффекты начинают действовать только по истечении этого часа. Попировать могут до двенадцати других существ.',
    {
      source: 'PHB',
      classes: ['Жрец', 'Друид'],
      sections: [
        { title: 'Польза', text: 'Существо, отведавшее пира, получает несколько благ. Оно излечивается от всех болезней и ядов, становится невосприимчиво к яду и испугу и совершает с преимуществом все спасброски Мудрости. Кроме того, его максимум хитов увеличивается на 2к10, и оно получает столько же хитов. Эти блага длятся 24 часа.' }
      ]
    }
  ),
  spell(
    'planar-ally', 'Планарный союзник', 6, 'conjuration',
    '10 минут', '60 фт.', 'В, С', 'Мгновенная',
    ['support'],
    'Вы просите о помощи потустороннюю сущность. Она должна быть вам известна: бог, первородный, князь демонов или другое существо космической мощи. Сущность посылает вам на помощь верного ей небожителя, элементаля или исчадие, и это существо появляется в свободном пространстве в пределах дистанции. Если вы знаете имя определённого существа, вы можете произнести его при сотворении, чтобы попросить именно его, хотя всё равно может явиться другое (решает Мастер).',
    {
      source: 'PHB',
      classes: ['Жрец'],
      sections: [
        { title: 'Договор', text: 'Явившееся существо ничем не обязано вести себя как-то определённо. Вы можете попросить его выполнить службу за плату, но оно не обязано соглашаться. Задача может быть простой (перенеси нас через пропасть, помоги в бою) или сложной (шпионь за нашими врагами, охраняй нас в подземелье). Чтобы торговаться о службе, вы должны иметь возможность общаться с существом.' },
        { title: 'Плата', text: 'Плата бывает разной. Небожитель может потребовать щедрого пожертвования золотом или магическими предметами союзному храму, а исчадие — живой жертвы или подарка из сокровищ. Некоторые существа согласны служить в обмен на задание, которое выполните вы.' },
        { title: 'Сколько платить', text: 'Как правило, задача, которая измеряется минутами, стоит 100 с.м. за минуту; измеряемая часами — 1000 с.м. за час; измеряемая днями (до 10 дней) — 10 000 с.м. за день. Мастер может менять плату в зависимости от обстоятельств сотворения. Если задача отвечает убеждениям существа, плату могут вдвое снизить или вовсе отменить. Неопасные задачи обычно стоят половину, а особо опасные могут потребовать большего дара. Задачи, похожие на самоубийство, существа берут редко.' },
        { title: 'Конец службы', text: 'Выполнив задачу или когда истечёт оговорённый срок службы, существо возвращается на свой родной план, доложив вам, если это уместно и возможно. Если вы не можете договориться о цене, существо сразу возвращается на свой родной план. Существо, вступившее в ваш отряд, считается его членом и получает полную долю опыта.' }
      ]
    }
  ),
  spell(
    'chain-lightning', 'Пляшущая молния', 6, 'evocation',
    '1 действие', '150 фт.', 'В, С, М (клочок меха, янтарный или хрустальный стержень и три серебряные булавки)', 'Мгновенная',
    ['damage'],
    'Вы создаёте разряд молнии, который бьёт в выбранную вами цель, которую вы видите в пределах дистанции. От этой цели три разряда перескакивают ещё на три цели, каждая из которых должна быть в пределах 30 футов от первой. Целью может быть существо или предмет, и в каждую цель может попасть только один разряд. Каждая цель совершает спасбросок Ловкости и получает 10к8 урона электричеством при провале или половину этого урона при успехе.',
    {
      source: 'PHB',
      classes: ['Чародей', 'Волшебник'],
      sections: [
        { title: 'На более высоких уровнях', text: 'За каждый уровень ячейки выше 6-го от первой цели перескакивает ещё один разряд к ещё одной цели.' }
      ]
    }
  ),
  spell(
    'heal', 'Полное исцеление', 6, 'evocation',
    '1 действие', '60 фт.', 'В, С', 'Мгновенная',
    ['healing'],
    'Выберите существо, которое вы видите в пределах дистанции. Через него прокатывается волна положительной энергии, и оно восстанавливает 70 хитов. Заклинание также снимает с цели слепоту, глухоту и все болезни. На конструктов и нежить заклинание не действует.',
    {
      source: 'PHB',
      classes: ['Жрец', 'Друид'],
      sections: [
        { title: 'На более высоких уровнях', text: 'Лечение увеличивается на 10 хитов за каждый уровень ячейки выше 6-го.' }
      ]
    }
  ),
  spell(
    'harm', 'Поражение', 6, 'necromancy',
    '1 действие', '60 фт.', 'В, С', 'Мгновенная',
    ['damage'],
    'Вы насылаете губительную болезнь на существо, которое видите в пределах дистанции. Цель совершает спасбросок Телосложения и получает 14к6 урона некротической энергией при провале или половину этого урона при успехе. Этот урон не может опустить хиты цели ниже 1. Если цель проваливает спасбросок, её максимум хитов на 1 час уменьшается на величину полученного урона некротической энергией. Любой эффект, излечивающий болезнь, позволяет максимуму хитов существа вернуться к обычному раньше.',
    {
      source: 'PHB',
      classes: ['Жрец']
    }
  ),
  spell(
    'contingency', 'Предосторожность', 6, 'evocation',
    '10 минут', 'На себя', 'В, С, М (статуэтка вас стоимостью не менее 1500 с.м.)', '10 дней',
    ['utility'],
    'Выберите заклинание 5-го уровня или ниже, которое вы можете сотворить, у которого время сотворения 1 действие и которое может нацеливаться на вас. Вы творите это заклинание — его называют условным — как часть сотворения предосторожности, тратя ячейки на оба, но условное заклинание пока не действует. Оно срабатывает, когда наступает определённое обстоятельство, которое вы описываете, творя оба заклинания. Например, предосторожность с подводным дыханием может срабатывать, когда вас накрывает вода или похожая жидкость.',
    {
      source: 'PHB',
      classes: ['Волшебник'],
      sections: [
        { title: 'Срабатывание', text: 'Условное заклинание срабатывает сразу, как только обстоятельство впервые наступает, хотите вы того или нет, и тогда предосторожность заканчивается.' },
        { title: 'Ограничения', text: 'Условное заклинание действует только на вас, даже если обычно может нацеливаться на других. Одновременно у вас может действовать только одна предосторожность. Если вы творите это заклинание снова, действие прежнего на вас заканчивается. Кроме того, предосторожность заканчивается, если его материальный компонент оказывается не при вас.' }
      ]
    }
  ),
  spell(
    'transport-via-plants', 'Путешествие через растения', 6, 'conjuration',
    '1 действие', '10 фт.', 'В, С', '1 раунд',
    ['utility'],
    'Заклинание создаёт магическую связь между неодушевлённым растением размера Большой или больше в пределах дистанции и другим растением на любом расстоянии на том же плане существования. Растение назначения вы должны хотя бы раз видеть или трогать. Пока действует заклинание, любое существо может войти в растение-цель и выйти из растения назначения, потратив 5 футов перемещения.',
    {
      source: 'PHB',
      classes: ['Друид']
    }
  ),
  spell(
    'scatter', 'Раскидывание', 6, 'conjuration',
    '1 действие', '30 фт.', 'В', 'Мгновенная',
    ['control', 'utility'],
    'Воздух дрожит вокруг не более чем пяти существ на ваш выбор, которых вы видите в пределах дистанции. Несогласное существо должно преуспеть в спасброске Мудрости, чтобы противостоять заклинанию. Вы телепортируете каждую подвластную заклинанию цель в свободное пространство, которое видите в пределах 120 футов от себя. Это пространство должно быть на земле или на полу.',
    {
      source: 'XGE',
      classes: ['Чародей', 'Волшебник', 'Колдун']
    }
  ),
  spell(
    'disintegrate', 'Распад', 6, 'transmutation',
    '1 действие', '60 фт.', 'В, С, М (магнетит и щепотка пыли)', 'Мгновенная',
    ['damage'],
    'Из вашего указательного пальца в цель, которую вы видите в пределах дистанции, бьёт тонкий зелёный луч. Целью может быть существо, предмет или творение магической силы — например, стена, созданная силовой стеной. Существо, ставшее целью, совершает спасбросок Ловкости. При провале цель получает 10к6 + 40 урона силовым полем. Если этот урон опускает её хиты до 0, она распадается.',
    {
      source: 'PHB',
      classes: ['Чародей', 'Волшебник', 'Изобретатель'],
      sections: [
        { title: 'Распад', text: 'Распавшееся существо и всё, что оно носит и несёт, кроме магических предметов, обращается в кучку тонкой серой пыли. Вернуть такое существо к жизни можно только заклинанием истинного воскрешения или исполнения желаний.' },
        { title: 'Предметы', text: 'Заклинание автоматически уничтожает немагический предмет размера Большой или меньше или творение магической силы. Если цель — предмет или творение силы размера Огромный или больше, заклинание уничтожает её часть размером с куб со стороной 10 футов. На магические предметы заклинание не действует.' },
        { title: 'На более высоких уровнях', text: 'Урон увеличивается на 3к6 за каждый уровень ячейки выше 6-го.' }
      ]
    }
  ),
  spell(
    'druid-grove', 'Роща друида', 6, 'abjuration',
    '10 минут', 'Касание', 'В, С, М (омела, срезанная золотым серпом при свете полной луны; расходуется)', 'Пока не рассеется',
    ['control'],
    'Вы призываете духов природы защищать область под открытым небом или под землёй — от куба со стороной 30 футов до куба со стороной 90 футов. Здания и другие сооружения в область не входят. Если творить это заклинание на одном и том же месте каждый день в течение года, оно длится, пока его не рассеют.',
    {
      source: 'XGE',
      classes: ['Друид'],
      sections: [
        { title: 'Друзья и пароль', text: 'При сотворении вы можете назвать существ друзьями: на них эффекты не действуют. Можно также назначить пароль: тот, кто произносит его вслух, становится невосприимчив к этим эффектам.' },
        { title: 'Рассеивание', text: 'Вся защищённая область излучает магию. Рассеивание магии, сотворённое на область, при успехе снимает только один из эффектов ниже, а не всю область; какой — выбирает творящий его. Заклинание рассеяно, лишь когда не остаётся ни одного эффекта.' },
        { title: 'Густой туман', text: 'Вы можете заполнить любое число квадратов со стороной 5 футов на земле густым туманом высотой 10 футов, делая их сильно заслонёнными. Кроме того, каждый фут перемещения сквозь туман стоит 2 дополнительных фута. Для невосприимчивого существа туман ничего не заслоняет и выглядит лёгкой дымкой, в которой парят зелёные огоньки.' },
        { title: 'Цепкий подлесок', text: 'Любое число квадратов со стороной 5 футов на земле, не заполненных туманом, вы можете покрыть цепкими сорняками и лозами, как заклинанием опутывания. Для невосприимчивого существа сорняки и лозы мягки на ощупь и сами принимают форму сидений или постелей.' },
        { title: 'Стражи рощи', text: 'Вы можете оживить до четырёх деревьев в области, и они вырываются из земли. У них характеристики пробуждённого дерева (у Мастера), только они не могут говорить, а кора покрыта друидическими знаками. Если в защищённую область входит любое существо, не невосприимчивое к этому эффекту, стражи рощи сражаются, пока не прогонят или не убьют нарушителей. Стражи также выполняют ваши устные команды, отданные в области (вам это действия не стоит). Без команд и при отсутствии нарушителей деревья ничего не делают. Покинуть область они не могут. Когда заклинание заканчивается, оживлявшая их магия исчезает, и деревья по возможности снова пускают корни.' },
        { title: 'Дополнительный эффект', text: 'Вы можете поместить в защищённую область один из этих магических эффектов на выбор: постоянный порыв ветра в двух выбранных местах; шипы в одном выбранном месте; стену ветров в двух выбранных местах. Для невосприимчивого существа ветры — ласковый душистый ветерок, а область шипов безвредна.' }
      ]
    }
  ),
  spell(
    'word-of-recall', 'Слово возврата', 6, 'conjuration',
    '1 действие', '5 фт.', 'В', 'Мгновенная',
    ['utility'],
    'Вы и не более пяти согласных существ в пределах 5 футов от вас мгновенно телепортируетесь в заранее назначенное святилище. Вы и все, кто телепортируется с вами, появляетесь в свободном пространстве, ближайшем к месту, которое вы указали, готовя святилище (см. ниже). Если вы творите заклинание, не подготовив святилище, оно ничего не делает.',
    {
      source: 'PHB',
      classes: ['Жрец'],
      sections: [
        { title: 'Святилище', text: 'Чтобы назначить святилище, нужно сотворить это заклинание в месте, посвящённом вашему божеству или тесно связанном с ним, — например, в храме. Если попытаться сотворить заклинание так в месте, не посвящённом вашему божеству, оно ничего не делает.' }
      ]
    }
  ),
  spell(
    'create-homunculus', 'Сотворение гомункула', 6, 'transmutation',
    '1 час', 'Касание', 'В, С, М (глина, зола и корень мандрагоры, а также усыпанный самоцветами кинжал стоимостью не менее 1000 с.м.)', 'Мгновенная',
    ['utility'],
    'Произнося сложное заклинание, вы режете себя украшенным самоцветами кинжалом и получаете 2к4 колющего урона, которые нельзя никак уменьшить. Затем вы капаете кровью на остальные компоненты заклинания и касаетесь их, превращая в особого конструкта — гомункула (характеристики у Мастера). Гомункул — ваш верный спутник, и он умирает, если умираете вы.',
    {
      source: 'XGE',
      classes: ['Волшебник'],
      sections: [
        { title: 'Общие хиты', text: 'Каждый раз, заканчивая продолжительный отдых, вы можете потратить до половины своих Костей хитов, если гомункул на одном с вами плане существования. Бросьте каждую кость и прибавьте к ней модификатор Телосложения. Ваш максимум хитов уменьшается на итог, а максимум и текущие хиты гомункула на столько же увеличиваются. Так ваши хиты не могут опуститься ниже 1, а изменение ваших хитов и хитов гомункула заканчивается, когда вы завершаете следующий продолжительный отдых. До тех пор уменьшение вашего максимума хитов ничем нельзя снять, кроме смерти гомункула.' },
        { title: 'Один гомункул', text: 'Одновременно у вас может быть только один гомункул. Если вы творите это заклинание, пока ваш гомункул жив, заклинание не срабатывает.' }
      ]
    }
  ),
  spell(
    'create-undead', 'Сотворение нежити', 6, 'necromancy',
    '1 минута', '10 фт.', 'В, С, М (глиняный горшок могильной земли, горшок затхлой воды и по чёрному ониксу стоимостью не менее 150 с.м. за каждый труп)', 'Мгновенная',
    ['utility'],
    'Это заклинание можно сотворить только ночью. Выберите в пределах дистанции до трёх трупов гуманоидов размера Средний или Маленький. Каждый труп становится гулем под вашим контролем (характеристики у Мастера).',
    {
      source: 'PHB',
      classes: ['Жрец', 'Волшебник', 'Колдун'],
      sections: [
        { title: 'Команды', text: 'В каждый свой ход вы можете бонусным действием мысленно приказывать любому существу, оживлённому этим заклинанием, если оно в пределах 120 футов от вас (если существ несколько, можно приказать любым или всем сразу, отдав каждому одну и ту же команду). Вы решаете, какое действие существо совершит и куда переместится в свой следующий ход, или отдаёте общий приказ — например, охранять определённую комнату или коридор. Без приказов существо только защищается от враждебных существ. Получив приказ, существо выполняет его, пока не закончит.' },
        { title: 'Контроль', text: 'Существо подчиняется вам 24 часа, а затем перестаёт выполнять ваши приказы. Чтобы удержать контроль ещё на 24 часа, нужно снова сотворить это заклинание на существо до окончания текущих 24 часов. Такое сотворение возобновляет ваш контроль не более чем над тремя существами, оживлёнными этим заклинанием, вместо того чтобы оживить новых.' },
        { title: 'На более высоких уровнях', text: 'Ячейкой 7-го уровня вы оживляете четырёх гулей или возобновляете контроль над ними. Ячейкой 8-го уровня — пять гулей или двух гастов или умертвий. Ячейкой 9-го уровня — шесть гулей, трёх гастов или умертвий или двух мумий.' }
      ]
    }
  ),
  spell(
    'guards-and-wards', 'Стражи', 6, 'abjuration',
    '10 минут', 'Касание', 'В, С, М (благовония, немного серы и масла, узловатая бечёвка, капля крови грязевого крушира и серебряный жезл стоимостью не менее 10 с.м.)', '24 часа',
    ['control'],
    'Вы создаёте защиту, которая охраняет до 2500 квадратных футов пола (площадь 50 × 50 футов, или сто квадратов по 5 футов, или двадцать пять квадратов по 10 футов). Защищённая область может быть высотой до 20 футов и любой нужной вам формы. Можно защитить несколько этажей крепости, разделив площадь между ними, если во время сотворения вы можете пройти в каждую связную часть области.',
    {
      source: 'PHB',
      classes: ['Бард', 'Волшебник'],
      sections: [
        { title: 'Исключения', text: 'При сотворении вы можете указать тех, на кого не действуют любые или все выбранные вами эффекты. Можно также назначить пароль: тот, кто произносит его вслух, становится невосприимчив к этим эффектам.' },
        { title: 'Коридоры', text: 'Все коридоры в защищённой области заполняет туман, делая их сильно заслонёнными. Кроме того, на каждом перекрёстке или развилке, где можно выбрать направление, существо, кроме вас, с шансом 50 процентов думает, что идёт в сторону, противоположную выбранной.' },
        { title: 'Двери', text: 'Все двери в защищённой области магически заперты, как заклинанием волшебного замка. Кроме того, до десяти дверей вы можете скрыть иллюзией (как свойство иллюзорного предмета у малой иллюзии), чтобы они выглядели как обычный участок стены.' },
        { title: 'Лестницы', text: 'Все лестницы в защищённой области сверху донизу затянуты паутиной, как заклинанием паутины. Пока действуют стражи, сожжённые или сорванные нити отрастают за 10 минут.' },
        { title: 'Другой эффект', text: 'Вы можете поместить в защищённую область крепости один из этих магических эффектов на выбор: пляшущие огоньки в четырёх коридорах (можно задать простую программу, которую огоньки повторяют, пока действуют стражи); волшебные уста в двух местах; зловонное облако в двух местах (пары появляются там, где вы укажете, и, развеянные ветром, возвращаются через 10 минут, пока действуют стражи); постоянный порыв ветра в одном коридоре или комнате; внушение в одном месте — вы выбираете участок до 5 × 5 футов, и каждое существо, которое входит на него или проходит через него, мысленно получает внушение.' },
        { title: 'Магия области', text: 'Вся защищённая область излучает магию. Рассеивание магии, сотворённое на определённый эффект, при успехе снимает только этот эффект. Если творить это заклинание на одном и том же сооружении каждый день в течение года, сооружение становится защищённым навсегда.' }
      ]
    }
  ),
  spell(
    'wind-walk', 'Хождение по ветру', 6, 'transmutation',
    '1 минута', '30 фт.', 'В, С, М (огонь и святая вода)', '8 часов',
    ['utility'],
    'Вы и не более десяти согласных существ, которых вы видите в пределах дистанции, на время действия заклинания принимаете газообразный облик, похожий на клочья облаков. В облачном облике у существа скорость полёта 300 футов и сопротивление урону от немагического оружия. Единственные действия, доступные существу в этом облике, — Рывок и возвращение в обычный облик. Возвращение занимает 1 минуту, в течение которой существо недееспособно и не может перемещаться. Пока заклинание не закончилось, существо может снова принять облачный облик — это тоже занимает 1 минуту.',
    {
      source: 'PHB',
      classes: ['Друид'],
      sections: [
        { title: 'Конец заклинания', text: 'Если существо в облачном облике летит, когда эффект заканчивается, оно 1 минуту снижается на 60 футов за раунд, пока не приземлится, и приземляется безопасно. Если за 1 минуту оно не может приземлиться, оставшееся расстояние оно падает.' }
      ]
    }
  ),
  // ── Заклинания 5 уровня без концентрации (базовые, PHB / XGE) ─────
  spell(
    'dream', 'Вещий сон', 5, 'illusion',
    '1 минута', 'Особая', 'В, С, М (горсть песка, капля чернил и писчее перо, выдернутое у спящей птицы)', '8 часов',
    ['utility'],
    'Заклинание меняет сны существа. Выберите целью известное вам существо, находящееся на одном с вами плане существования. Существа, которые не спят (например, эльфы), этим заклинанием достичь нельзя. Вы или согласное существо, которого вы касаетесь, впадаете в транс и становитесь посланником. В трансе посланник осознаёт, что происходит вокруг, но не может совершать действия и перемещаться.',
    {
      source: 'PHB',
      classes: ['Бард', 'Друид', 'Волшебник', 'Колдун'],
      sections: [
        { title: 'Во сне', text: 'Если цель спит, посланник появляется в её снах и может говорить с ней, пока она спит, но не дольше длительности заклинания. Посланник может также менять обстановку сна, создавая пейзажи, предметы и другие образы. Посланник может выйти из транса в любой момент, досрочно окончив действие заклинания. Проснувшись, цель отчётливо помнит сон. Если при сотворении заклинания цель бодрствует, посланник знает об этом и может либо выйти из транса (окончив заклинание), либо дождаться, пока цель уснёт, и тогда появиться в её снах.' },
        { title: 'Кошмар', text: 'Вы можете сделать так, что посланник покажется цели чудовищным и устрашающим. Тогда посланник может передать послание не более чем из десяти слов, после чего цель совершает спасбросок Мудрости. При провале отголоски призрачного чудовища порождают кошмар, который длится, пока цель спит, и не даёт ей получить никакой пользы от этого отдыха. Кроме того, проснувшись, цель получает 3к6 урона психической энергией.' },
        { title: 'Частица цели', text: 'Если у вас есть часть тела цели — прядь волос, обрезок ногтя или что-то подобное, — цель совершает спасбросок с помехой.' }
      ]
    }
  ),
  spell(
    'conjure-volley', 'Вызов залпа', 5, 'conjuration',
    '1 действие', '150 фт.', 'В, С, М (один снаряд или метательное оружие)', 'Мгновенная',
    ['damage'],
    'Вы выпускаете из дальнобойного оружия немагический боеприпас или подбрасываете в воздух немагическое оружие и выбираете точку в пределах дистанции. Сверху залпом падают сотни копий боеприпаса или оружия и затем исчезают. Каждое существо в цилиндре радиусом 40 футов и высотой 20 футов с центром в этой точке совершает спасбросок Ловкости и получает 8к8 урона при провале или половину этого урона при успехе. Вид урона — тот же, что у боеприпаса или оружия.',
    {
      source: 'PHB',
      classes: ['Следопыт']
    }
  ),
  spell(
    'greater-restoration', 'Высшее восстановление', 5, 'abjuration',
    '1 действие', 'Касание', 'В, С, М (алмазная пыль стоимостью не менее 100 с.м., расходуется)', 'Мгновенная',
    ['support'],
    'Вы наполняете существо, которого касаетесь, положительной энергией, чтобы снять изнуряющий эффект. Вы можете уменьшить степень истощения цели на одну или окончить на цели один из эффектов: один эффект, который очаровал цель или превратил её в камень; одно проклятие, в том числе настройку цели на проклятый магический предмет; любое уменьшение одной из характеристик цели; один эффект, уменьшающий максимум хитов цели.',
    {
      source: 'PHB',
      classes: ['Бард', 'Жрец', 'Друид', 'Волшебник']
    }
  ),
  spell(
    'contagion', 'Заражение', 5, 'necromancy',
    '1 действие', 'Касание', 'В, С', '7 дней',
    ['damage', 'control'],
    'Ваше касание насылает болезнь. Совершите рукопашную атаку заклинанием по существу в пределах вашей досягаемости. При попадании вы заражаете существо одной из болезней ниже на ваш выбор.',
    {
      source: 'PHB',
      classes: ['Жрец', 'Друид'],
      sections: [
        { title: 'Течение болезни', text: 'В конце каждого своего хода цель совершает спасбросок Телосложения. После трёх проваленных спасбросков эффект болезни длится всю длительность, и существо перестаёт совершать эти спасброски. После трёх успешных существо выздоравливает, и заклинание заканчивается. Заклинание вызывает у цели естественную болезнь, поэтому на неё действует всё, что излечивает болезни или ослабляет их действие.' },
        { title: 'Слепящая хворь', text: 'Боль охватывает разум существа, а глаза становятся молочно-белыми. Существо совершает с помехой проверки и спасброски Мудрости и ослеплено.' },
        { title: 'Грязная лихорадка', text: 'Тело существа сжигает жестокий жар. Существо совершает с помехой проверки и спасброски Силы и броски атаки, в которых использует Силу.' },
        { title: 'Гниение плоти', text: 'Плоть существа разлагается. Существо совершает с помехой проверки Харизмы и уязвимо ко всем видам урона.' },
        { title: 'Огонь разума', text: 'Разум существа охвачен бредом. Существо совершает с помехой проверки и спасброски Интеллекта, а в бою ведёт себя так, будто находится под действием заклинания смятения.' },
        { title: 'Судороги', text: 'Существо бьёт дрожь. Оно совершает с помехой проверки и спасброски Ловкости и броски атаки, в которых использует Ловкость.' },
        { title: 'Липкая гибель', text: 'Существо начинает неудержимо кровоточить. Оно совершает с помехой проверки и спасброски Телосложения. Кроме того, каждый раз, когда существо получает урон, оно ошеломлено до конца своего следующего хода.' }
      ]
    }
  ),
  spell(
    'legend-lore', 'Знание легенд', 5, 'divination',
    '10 минут', 'На себя', 'В, С, М (благовония стоимостью не менее 250 с.м., которые расходуются, и четыре пластинки слоновой кости стоимостью не менее 50 с.м. каждая)', 'Мгновенная',
    ['utility'],
    'Назовите или опишите человека, место или предмет. Заклинание приносит вам в разум краткую сводку значимых преданий о названном. Это могут быть ходящие ныне рассказы, забытые истории или даже тайные знания, никогда не бывшие широко известными. Если названное не имеет легендарного значения, вы ничего не узнаёте. Чем больше вы уже знаете о нём, тем точнее и подробнее сведения.',
    {
      source: 'PHB',
      classes: ['Бард', 'Жрец', 'Волшебник'],
      sections: [
        { title: 'Образный язык', text: 'Сведения точны, но могут быть облечены в образы. Например, если у вас в руках загадочный магический топор, заклинание может сказать: «Горе злодею, чья рука коснётся топора, ибо даже топорище режет руку злых. Лишь истинное Дитя Камня, любящее и любимое богом кузни, пробудит истинную силу топора — и лишь со священным словом на устах».' }
      ]
    }
  ),
  spell(
    'cone-of-cold', 'Конус холода', 5, 'evocation',
    '1 действие', 'На себя (конус 60 фт.)', 'В, С, М (маленький кристалл или стеклянный конус)', 'Мгновенная',
    ['damage'],
    'Из ваших рук вырывается волна холодного воздуха. Каждое существо в конусе длиной 60 футов совершает спасбросок Телосложения и получает 8к8 урона холодом при провале или половину этого урона при успехе. Убитое этим заклинанием существо становится замёрзшей статуей, пока не оттает.',
    {
      source: 'PHB',
      classes: ['Чародей', 'Волшебник', 'Изобретатель'],
      sections: [
        { title: 'На более высоких уровнях', text: 'Урон увеличивается на 1к8 за каждый уровень ячейки выше 5-го.' }
      ]
    }
  ),
  spell(
    'teleportation-circle', 'Круг телепортации', 5, 'conjuration',
    '1 минута', '10 фт.', 'В, М (редкие мелки и чернила стоимостью не менее 50 с.м., расходуются)', '1 раунд',
    ['utility'],
    'Творя заклинание, вы чертите на земле круг диаметром 10 футов, покрытый знаками, которые связывают ваше местоположение с выбранным вами постоянным кругом телепортации на том же плане существования, последовательность знаков которого вы знаете. Внутри начерченного круга открывается мерцающий портал и остаётся открытым до конца вашего следующего хода. Любое существо, вошедшее в портал, мгновенно появляется в пределах 5 футов от круга назначения или в ближайшем свободном пространстве, если то занято.',
    {
      source: 'PHB',
      classes: ['Бард', 'Чародей', 'Волшебник'],
      sections: [
        { title: 'Последовательности знаков', text: 'Во многих крупных храмах, гильдиях и других важных местах где-то начертаны постоянные круги телепортации. У каждого такого круга своя последовательность знаков — цепочка магических рун, расположенных особым образом. Когда вы впервые получаете способность творить это заклинание, вы узнаёте последовательности знаков двух мест назначения на Материальном плане — их определяет Мастер. Новые последовательности вы можете узнать в приключениях. Чтобы запомнить новую последовательность, нужно изучать её 1 минуту.' },
        { title: 'Постоянный круг', text: 'Постоянный круг телепортации можно создать, если творить это заклинание на одном и том же месте каждый день в течение года. Творя заклинание так, не обязательно пользоваться кругом для телепортации.' }
      ]
    }
  ),
  spell(
    'rarys-telepathic-bond', 'Ментальная связь Рэри', 5, 'divination',
    '1 действие', '30 фт.', 'В, С, М (кусочки яичной скорлупы двух разных существ)', '1 час',
    ['ritual', 'utility'],
    'Вы создаёте телепатическую связь между не более чем восемью согласными существами на ваш выбор в пределах дистанции, психически связывая каждое со всеми остальными, пока действует заклинание. На существ с Интеллектом 2 или ниже заклинание не действует. Пока заклинание не закончится, цели могут общаться через эту связь телепатически, есть у них общий язык или нет. Общение возможно на любом расстоянии, но не с другими планами существования.',
    {
      source: 'PHB',
      classes: ['Волшебник']
    }
  ),
  spell(
    'mass-cure-wounds', 'Множественное лечение ран', 5, 'evocation',
    '1 действие', '60 фт.', 'В, С', 'Мгновенная',
    ['healing'],
    'Из выбранной вами точки в пределах дистанции расходится волна целительной энергии. Выберите до шести существ в сфере радиусом 30 футов с центром в этой точке. Каждая цель восстанавливает хиты в количестве 3к8 + модификатор вашей заклинательной характеристики. На нежить и конструктов заклинание не действует.',
    {
      source: 'PHB',
      classes: ['Бард', 'Жрец', 'Друид'],
      sections: [
        { title: 'На более высоких уровнях', text: 'Лечение увеличивается на 1к8 за каждый уровень ячейки выше 5-го.' }
      ]
    }
  ),
  spell(
    'flame-strike', 'Небесный огонь', 5, 'evocation',
    '1 действие', '60 фт.', 'В, С, М (щепотка серы)', 'Мгновенная',
    ['damage'],
    'В указанное вами место с небес с рёвом обрушивается вертикальный столб божественного огня. Каждое существо в цилиндре радиусом 10 футов и высотой 40 футов с центром в точке в пределах дистанции совершает спасбросок Ловкости и получает 4к6 урона огнём и 4к6 урона излучением при провале или половину этого урона при успехе.',
    {
      source: 'PHB',
      classes: ['Жрец'],
      sections: [
        { title: 'На более высоких уровнях', text: 'Урон огнём или урон излучением (на ваш выбор) увеличивается на 1к6 за каждый уровень ячейки выше 5-го.' }
      ]
    }
  ),
  spell(
    'geas', 'Обет', 5, 'enchantment',
    '1 минута', '60 фт.', 'В', '30 дней',
    ['control'],
    'Вы накладываете магический приказ на существо, которое видите в пределах дистанции, вынуждая его выполнить какую-то службу или воздерживаться от какого-то действия или образа действий — как вы решите. Если существо понимает вас, оно должно преуспеть в спасброске Мудрости, иначе очаровано вами, пока действует заклинание. Пока существо очаровано вами, оно получает 5к10 урона психической энергией каждый раз, когда поступает прямо наперекор вашим указаниям, но не чаще раза в день. Существо, которое вас не понимает, заклинанию не подвержено.',
    {
      source: 'PHB',
      classes: ['Бард', 'Жрец', 'Друид', 'Паладин', 'Волшебник'],
      sections: [
        { title: 'Приказ', text: 'Вы можете отдать любой приказ, кроме такого, исполнение которого приведёт к верной смерти. Если вы отдаёте самоубийственный приказ, заклинание заканчивается.' },
        { title: 'Конец заклинания', text: 'Вы можете окончить заклинание досрочно, отпустив его действием. Его также оканчивают заклинания снятия проклятия, высшего восстановления или исполнения желаний.' },
        { title: 'На более высоких уровнях', text: 'Ячейкой 7-го или 8-го уровня длительность — 1 год. Ячейкой 9-го уровня заклинание длится, пока его не окончит одно из упомянутых выше заклинаний.' }
      ]
    }
  ),
  spell(
    'commune', 'Общение', 5, 'divination',
    '1 минута', 'На себя', 'В, С, М (благовония и склянка святой или нечистой воды)', '1 минута',
    ['ritual', 'utility'],
    'Вы связываетесь со своим божеством или его посланником и задаёте до трёх вопросов, на которые можно ответить «да» или «нет». Вопросы нужно задать, пока заклинание не закончилось. На каждый вопрос вы получаете верный ответ.',
    {
      source: 'PHB',
      classes: ['Жрец'],
      sections: [
        { title: 'Пределы', text: 'Божественные существа не обязательно всеведущи, поэтому, если вопрос касается того, чего божество не знает, ответом может быть «неясно». Если ответ одним словом может ввести в заблуждение или противоречит интересам божества, Мастер может вместо него дать короткую фразу.' },
        { title: 'Повторное обращение', text: 'Если вы творите заклинание два раза или больше до окончания следующего продолжительного отдыха, то за каждое сотворение после первого есть накопительный шанс 25 процентов не получить ответа. Этот бросок Мастер делает тайно.' }
      ]
    }
  ),
  spell(
    'commune-with-nature', 'Общение с природой', 5, 'divination',
    '1 минута', 'На себя', 'В, С', 'Мгновенная',
    ['ritual', 'utility'],
    'Вы ненадолго становитесь единым целым с природой и узнаёте об окружающей местности. Под открытым небом заклинание даёт знание о земле в пределах 3 миль от вас. В пещерах и других естественных подземельях радиус — 300 футов. Заклинание не действует там, где природу вытеснили постройки, — например, в подземельях и городах.',
    {
      source: 'PHB',
      classes: ['Друид', 'Следопыт'],
      sections: [
        { title: 'Что вы узнаёте', text: 'Вы мгновенно узнаёте до трёх фактов на свой выбор об этой местности по любым из этих тем: рельеф и водоёмы; распространённые растения, минералы, животные или народы; могущественные небожители, феи, исчадия, элементали или нежить; влияние других планов существования; постройки. Например, можно узнать, где в округе сильная нежить, где главные источники чистой питьевой воды и где ближайшие города.' }
      ]
    }
  ),
  spell(
    'raise-dead', 'Оживление', 5, 'necromancy',
    '1 час', 'Касание', 'В, С, М (алмаз стоимостью не менее 500 с.м., расходуется)', 'Мгновенная',
    ['healing'],
    'Вы возвращаете к жизни мёртвое существо, которого касаетесь, если оно мертво не дольше 10 дней. Если душа существа согласна и свободна вернуться в тело, существо оживает с 1 хитом.',
    {
      source: 'PHB',
      classes: ['Бард', 'Жрец', 'Паладин'],
      sections: [
        { title: 'Яды и болезни', text: 'Заклинание также обезвреживает все яды и излечивает немагические болезни, которыми существо страдало в момент смерти. Магические болезни, проклятия и подобные эффекты оно не снимает; если их не снять до сотворения заклинания, они начинают действовать, когда существо оживает. Нежить это заклинание вернуть к жизни не может.' },
        { title: 'Тело', text: 'Заклинание закрывает все смертельные раны, но не восстанавливает утраченные части тела. Если у существа нет частей тела или органов, без которых нельзя жить, — например, головы, — заклинание автоматически не срабатывает.' },
        { title: 'Тяжёлое возвращение', text: 'Возвращение из мёртвых — тяжкое испытание. Цель получает штраф −4 ко всем броскам атаки, спасброскам и проверкам характеристик. Каждый раз, когда цель заканчивает продолжительный отдых, штраф уменьшается на 1, пока не исчезнет.' }
      ]
    }
  ),
  spell(
    'planar-binding', 'Планарные узы', 5, 'abjuration',
    '1 час', '60 фт.', 'В, С, М (драгоценность стоимостью не менее 1000 с.м., расходуется)', '24 часа',
    ['control'],
    'Этим заклинанием вы пытаетесь привязать к себе на службу небожителя, элементаля, фею или исчадие. Существо должно быть в пределах дистанции всё время сотворения. (Обычно существо сперва призывают в центр обращённого магического круга, чтобы удержать его, пока творится это заклинание.) По окончании сотворения цель совершает спасбросок Харизмы. При провале она обязана служить вам, пока действует заклинание. Если существо было призвано или создано другим заклинанием, длительность того заклинания продлевается до длительности этого.',
    {
      source: 'PHB',
      classes: ['Бард', 'Жрец', 'Друид', 'Волшебник', 'Колдун'],
      sections: [
        { title: 'Служба', text: 'Связанное существо обязано следовать вашим указаниям как может. Вы можете приказать ему сопровождать вас в приключении, охранять место или доставить послание. Существо выполняет букву ваших указаний, но если оно враждебно вам, то старается извратить ваши слова в свою пользу. Если существо полностью выполнит ваши указания до окончания заклинания, оно отправляется к вам доложить об этом, если вы на одном плане существования. Если вы на другом плане, оно возвращается туда, где вы его связали, и остаётся там, пока заклинание не закончится.' },
        { title: 'На более высоких уровнях', text: 'Ячейкой более высокого уровня длительность увеличивается: до 10 дней ячейкой 6-го уровня, до 30 дней — 7-го, до 180 дней — 8-го и до года и одного дня — ячейкой 9-го уровня.' }
      ]
    }
  ),
  spell(
    'negative-energy-flood', 'Поток негативной энергии', 5, 'necromancy',
    '1 действие', '60 фт.', 'В, М (сломанная кость и лоскут чёрного шёлка)', 'Мгновенная',
    ['damage'],
    'Вы посылаете ленты отрицательной энергии в одно существо, которое видите в пределах дистанции. Если цель не нежить, она совершает спасбросок Телосложения и получает 5к12 урона некротической энергией при провале или половину этого урона при успехе. Цель, убитая этим уроном, в начале вашего следующего хода встаёт зомби. Зомби преследует ближайшее существо, которое видит. Характеристики зомби у Мастера.',
    {
      source: 'XGE',
      classes: ['Волшебник', 'Колдун'],
      sections: [
        { title: 'Нежить', text: 'Если целью стала нежить, она не совершает спасбросок. Вместо этого бросьте 5к12: цель получает половину выпавшей суммы в виде временных хитов.' }
      ]
    }
  ),
  spell(
    'transmute-rock', 'Преобразование камня', 5, 'transmutation',
    '1 действие', '120 фт.', 'В, С, М (глина и вода)', 'Пока не рассеется',
    ['control'],
    'Вы выбираете участок камня или грязи, который видите в пределах дистанции и который умещается в кубе со стороной 40 футов, и выбираете один из эффектов ниже.',
    {
      source: 'XGE',
      classes: ['Друид', 'Волшебник', 'Изобретатель'],
      sections: [
        { title: 'Камень в грязь', text: 'Немагический камень любого рода в области превращается в равный объём густой текучей грязи, которая держится, пока действует заклинание. Если вы сотворили заклинание на участок земли, он становится таким топким, что существа могут в нём увязнуть. Каждый фут перемещения через грязь стоит 4 фута, а каждое существо на земле в момент сотворения совершает спасбросок Силы. Этот спасбросок существо совершает и тогда, когда впервые за ход входит в область или заканчивает в ней ход. При провале существо увязает в грязи и опутано, но может действием окончить это состояние, выбравшись из грязи.' },
        { title: 'Грязь с потолка', text: 'Если вы сотворили заклинание на потолок, грязь падает. Каждое существо под падающей грязью совершает спасбросок Ловкости и получает 4к8 дробящего урона при провале или половину этого урона при успехе.' },
        { title: 'Грязь в камень', text: 'Немагическая грязь или зыбучий песок в области глубиной не больше 10 футов превращается в мягкий камень на время действия заклинания. Каждое существо в грязи в момент превращения совершает спасбросок Ловкости. При успехе его безопасно выносит на поверхность в свободное пространство. При провале оно опутано камнем. Опутанное существо или другое существо в пределах досягаемости может действием попытаться разбить камень, преуспев в проверке Силы со СЛ 20 или причинив ему урон. У камня КД 15 и 25 хитов, и он невосприимчив к урону ядом и психической энергией.' }
      ]
    }
  ),
  spell(
    'seeming', 'Притворство', 5, 'illusion',
    '1 действие', '30 фт.', 'В, С', '8 часов',
    ['utility'],
    'Заклинание позволяет изменить внешность любого числа существ, которых вы видите в пределах дистанции. Каждой выбранной цели вы придаёте новый иллюзорный облик. Несогласная цель может совершить спасбросок Харизмы и при успехе заклинанию не подвержена.',
    {
      source: 'PHB',
      classes: ['Бард', 'Чародей', 'Волшебник'],
      sections: [
        { title: 'Облик', text: 'Заклинание маскирует внешность, а также одежду, доспехи, оружие и снаряжение. Каждое существо может казаться на 1 фут ниже или выше, худым, толстым или средним. Строение тела цели изменить нельзя — облик должен иметь то же основное расположение конечностей. В остальном размах иллюзии — на ваше усмотрение. Заклинание действует всю длительность, если вы не отпустите его действием раньше.' },
        { title: 'На ощупь', text: 'Изменения не выдерживают проверки на ощупь. Например, если вы добавили к наряду существа шляпу, предметы проходят сквозь неё, а коснувшийся её ничего не почувствует или нащупает голову и волосы существа. Если вы с помощью заклинания кажетесь худее, чем есть, рука того, кто потянется к вам, наткнётся на вас, хотя с виду будет ещё в воздухе.' },
        { title: 'Разоблачение', text: 'Существо может действием осмотреть цель и совершить проверку Интеллекта (Анализ) против СЛ спасброска ваших заклинаний. При успехе оно понимает, что цель замаскирована.' }
      ]
    }
  ),
  spell(
    'awaken', 'Пробуждение разума', 5, 'transmutation',
    '8 часов', 'Касание', 'В, С, М (агат стоимостью не менее 1000 с.м., расходуется)', 'Мгновенная',
    ['utility'],
    'Потратив время сотворения на то, чтобы прочертить магические пути внутри драгоценного камня, вы касаетесь зверя или растения размера Огромный или меньше. У цели не должно быть Интеллекта или он должен быть 3 или ниже. Цель получает Интеллект 10 и способность говорить на одном известном вам языке. Если цель — растение, она обретает способность двигать ветвями, корнями, лозами, побегами и тому подобным, а также чувства, похожие на человеческие. Мастер подбирает пробуждённому растению подходящие характеристики — например, пробуждённого кустарника или пробуждённого дерева.',
    {
      source: 'PHB',
      classes: ['Бард', 'Друид'],
      sections: [
        { title: 'Очарование', text: 'Пробуждённый зверь или растение очарован вами на 30 дней или пока вы или ваши спутники не причините ему какой-либо вред. Когда очарование заканчивается, пробуждённое существо само решает, оставаться ли дружелюбным к вам, — смотря по тому, как вы обращались с ним, пока оно было очаровано.' }
      ]
    }
  ),
  spell(
    'destructive-wave', 'Разрушительная волна', 5, 'evocation',
    '1 действие', 'На себя (радиус 30 фт.)', 'В', 'Мгновенная',
    ['damage'],
    'Вы бьёте по земле, и от вас волнами расходится всплеск божественной энергии. Каждое выбранное вами существо в пределах 30 футов от вас должно преуспеть в спасброске Телосложения, иначе получает 5к6 урона звуком и ещё 5к6 урона излучением или некротической энергией (на ваш выбор) и оказывается сбито с ног. При успехе существо получает половину урона и не сбито с ног.',
    {
      source: 'PHB',
      classes: ['Паладин']
    }
  ),
  spell(
    'reincarnate', 'Реинкарнация', 5, 'transmutation',
    '1 час', 'Касание', 'В, С, М (редкие масла и притирания стоимостью не менее 1000 с.м., расходуются)', 'Мгновенная',
    ['healing', 'utility'],
    'Вы касаетесь мёртвого гуманоида или части мёртвого гуманоида. Если существо мертво не дольше 10 дней, заклинание создаёт для него новое взрослое тело и призывает в это тело душу. Если душа цели не свободна или не согласна вернуться, заклинание не срабатывает.',
    {
      source: 'PHB',
      classes: ['Друид'],
      sections: [
        { title: 'Новое тело', text: 'Магия создаёт для существа новое тело, и, скорее всего, народ существа сменится. Мастер бросает к20 по таблице народов Эноа ниже, чтобы узнать, в каком облике существо вернётся к жизни, или выбирает народ сам.' },
        { title: 'Народы Эноа (к20)', text: '1 — аджаид; 2 — борос; 3 — вету; 4 — вирморождённый; 5 — джабари; 6 — кобольд; 7 — маракиец; 8 — мор’хор; 9 — ойрдуг; 10 — самагхи; 11 — удриш; 12 — худдулин; 13 — человек; 14 — чотгор; 15 — эхор’нур; 16–20 — бросьте снова.' },
        { title: 'Прежняя жизнь', text: 'Перевоплощённое существо помнит прежнюю жизнь и пережитое. Оно сохраняет возможности, которые были у него в прежнем облике, но меняет прежний народ на новый и соответственно меняет особенности народа.' }
      ]
    }
  ),
  spell(
    'contact-other-plane', 'Связь с иным миром', 5, 'divination',
    '1 минута', 'На себя', 'В', '1 минута',
    ['ritual', 'utility'],
    'Вы мысленно связываетесь с полубогом, духом давно умершего мудреца или другой загадочной сущностью с иного плана. Связь с этим внепланарным разумом может надорвать или даже сломить ваш рассудок. При сотворении заклинания совершите спасбросок Интеллекта со СЛ 15. При провале вы получаете 6к6 урона психической энергией и безумны до окончания продолжительного отдыха. Безумным вы не можете совершать действия, не понимаете, что говорят другие существа, не можете читать и говорите только бессвязно. Заклинание высшего восстановления, сотворённое на вас, оканчивает этот эффект.',
    {
      source: 'PHB',
      classes: ['Волшебник', 'Колдун'],
      sections: [
        { title: 'Вопросы', text: 'При успехе вы можете задать сущности до пяти вопросов. Вопросы нужно задать, пока заклинание не закончилось. Мастер отвечает на каждый одним словом — например, «да», «нет», «возможно», «никогда», «не важно» или «неясно» (если сущность не знает ответа). Если ответ одним словом ввёл бы в заблуждение, Мастер может вместо него дать короткую фразу.' }
      ]
    }
  ),
  spell(
    'hallow', 'Святилище', 5, 'evocation',
    '24 часа', 'Касание', 'В, С, М (травы, масла и благовония стоимостью не менее 1000 с.м., расходуются)', 'Пока не рассеется',
    ['control', 'support'],
    'Вы касаетесь точки и наполняете область вокруг неё святой (или нечестивой) силой. Радиус области — до 60 футов; заклинание не срабатывает, если в радиус попадает область, уже находящаяся под действием заклинания святилища. На область действуют эффекты ниже.',
    {
      source: 'PHB',
      classes: ['Жрец'],
      sections: [
        { title: 'Ограда', text: 'Во-первых, небожители, элементали, феи, исчадия и нежить не могут войти в область, а также очаровывать, пугать или вселяться в существ внутри неё. Существо, очарованное, испуганное или одержимое таким существом, войдя в область, перестаёт быть очарованным, испуганным или одержимым. Вы можете исключить из этого эффекта один или несколько из этих видов существ.' },
        { title: 'Дополнительный эффект', text: 'Во-вторых, вы можете привязать к области дополнительный эффект — из списка ниже или предложенный Мастером. Некоторые эффекты действуют на существ в области; вы решаете, на кого — на всех существ, на последователей определённого божества или вождя или на существ определённого рода, например на орков или троллей. Когда существо, на которое эффект должен подействовать, впервые за ход входит в область или начинает в ней ход, оно может совершить спасбросок Харизмы. При успехе оно не замечает дополнительного эффекта, пока не покинет область.' },
        { title: 'Храбрость', text: 'Затронутые существа в области не могут быть испуганы.' },
        { title: 'Тьма', text: 'Область заполняет тьма. Ни обычный свет, ни магический свет от заклинаний уровня ниже ячейки, которой вы сотворили это заклинание, не могут её осветить.' },
        { title: 'Дневной свет', text: 'Область заполняет яркий свет. Магическая тьма от заклинаний уровня ниже ячейки, которой вы сотворили это заклинание, не может его погасить.' },
        { title: 'Защита от энергии', text: 'Затронутые существа в области получают сопротивление одному виду урона на ваш выбор, кроме дробящего, колющего и рубящего.' },
        { title: 'Уязвимость к энергии', text: 'Затронутые существа в области получают уязвимость к одному виду урона на ваш выбор, кроме дробящего, колющего и рубящего.' },
        { title: 'Вечный покой', text: 'Мёртвые тела, погребённые в области, нельзя превратить в нежить.' },
        { title: 'Помеха перемещению', text: 'Затронутые существа не могут перемещаться и путешествовать телепортацией или через другие измерения и планы.' },
        { title: 'Страх', text: 'Затронутые существа в области испуганы.' },
        { title: 'Тишина', text: 'Ни один звук не исходит из области и не проникает в неё.' },
        { title: 'Языки', text: 'Затронутые существа могут общаться с любым другим существом в области, даже если у них нет общего языка.' }
      ]
    }
  ),
  spell(
    'synaptic-static', 'Синаптический разряд', 5, 'enchantment',
    '1 действие', '120 фт.', 'В, С', 'Мгновенная',
    ['damage', 'control'],
    'Вы выбираете точку в пределах дистанции, и в ней взрывается психическая энергия. Каждое существо в сфере радиусом 20 футов с центром в этой точке совершает спасбросок Интеллекта. На существо с Интеллектом 2 или ниже заклинание не действует. Цель получает 8к6 урона психической энергией при провале или половину этого урона при успехе.',
    {
      source: 'XGE',
      classes: ['Бард', 'Чародей', 'Волшебник', 'Колдун'],
      sections: [
        { title: 'Смятение мыслей', text: 'Проваливая спасбросок, цель на 1 минуту теряет ясность мыслей. Всё это время она бросает к6 и вычитает выпавшее число из всех своих бросков атаки и проверок характеристик, а также из спасбросков Телосложения для поддержания концентрации. В конце каждого своего хода цель может совершить спасбросок Интеллекта и при успехе избавляется от эффекта.' }
      ]
    }
  ),
  spell(
    'passwall', 'Создание прохода', 5, 'transmutation',
    '1 действие', '30 фт.', 'В, С, М (щепотка кунжутных семян)', '1 час',
    ['utility'],
    'В выбранной вами точке на деревянной, оштукатуренной или каменной поверхности (стене, потолке или полу), которую вы видите в пределах дистанции, появляется проход и держится, пока действует заклинание. Размеры проёма выбираете вы: до 5 футов в ширину, 8 футов в высоту и 20 футов в глубину. Проход не нарушает прочности окружающего сооружения. Когда проём исчезает, все существа и предметы, оставшиеся в проходе, безопасно выталкиваются в свободное пространство, ближайшее к поверхности, на которой вы сотворили заклинание.',
    {
      source: 'PHB',
      classes: ['Волшебник']
    }
  ),
  spell(
    'creation', 'Сотворение', 5, 'illusion',
    '1 минута', '30 фт.', 'В, С, М (крошечный кусочек вещества того же вида, что и создаваемый предмет)', 'Особая',
    ['utility'],
    'Вы вытягиваете клочья теневого вещества из Царства теней, чтобы создать в пределах дистанции неживой предмет из растительного вещества: ткань, верёвку, дерево или что-то подобное. Этим заклинанием можно создавать и минеральные предметы — из камня, кристалла или металла. Предмет должен умещаться в кубе со стороной 5 футов, а его форму и материал вы должны были видеть раньше.',
    {
      source: 'PHB',
      classes: ['Чародей', 'Волшебник'],
      sections: [
        { title: 'Сколько держится', text: 'Длительность зависит от материала предмета; если материалов несколько, берётся самая короткая. Растительное вещество — 1 день; камень или кристалл — 12 часов; драгоценные металлы — 1 час; самоцветы — 10 минут; адамантин или мифрил — 1 минута.' },
        { title: 'Не компонент', text: 'Если использовать созданный этим заклинанием материал как материальный компонент другого заклинания, то заклинание не срабатывает.' },
        { title: 'На более высоких уровнях', text: 'Сторона куба увеличивается на 5 футов за каждый уровень ячейки выше 5-го.' }
      ]
    }
  ),
  spell(
    'steel-wind-strike', 'Удар стального ветра', 5, 'conjuration',
    '1 действие', '30 фт.', 'С, М (рукопашное оружие стоимостью не менее 1 л.м.)', 'Мгновенная',
    ['damage'],
    'Вы взмахиваете оружием, использованным при сотворении, и исчезаете, чтобы ударить подобно ветру. Выберите до пяти существ, которых вы видите в пределах дистанции. Совершите по каждой цели рукопашную атаку заклинанием. При попадании цель получает 6к10 урона силовым полем. Затем вы можете телепортироваться в свободное пространство, которое видите в пределах 5 футов от одной из целей, по которой вы попали или промахнулись.',
    {
      source: 'XGE',
      classes: ['Следопыт', 'Волшебник']
    }
  )
]
