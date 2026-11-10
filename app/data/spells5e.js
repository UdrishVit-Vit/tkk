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
    '1 действие', 'На себя (радиус 5 фт.)', 'С, М (оружие стоимостью не менее 1 с.м.)', '1 раунд',
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
    '1 действие', 'На себя (радиус 5 фт.)', 'С, М (оружие стоимостью не менее 1 с.м.)', 'Мгновенная',
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
    'От вас исходит аура жизни радиусом 9 м. Существа в ней (кроме нежити и конструктов) получают сопротивление некротическому урону, их максимум хитов не снижается, а союзник с 0 хитов в ауре восстанавливает 1 хит в начале своего хода.',
    { source: 'PHB', classes: ['Паладин'] }
  ),
  spell(
    'aura-of-purity', 'Аура очищения', 4, 'abjuration',
    '1 действие', 'На себя (радиус 30 фт.)', 'В', 'Концентрация, до 10 минут',
    ['concentration', 'support'],
    'От вас исходит очищающая аура радиусом 9 м. Существа в ней не могут заболеть, получают сопротивление ядовитому урону и совершают с преимуществом спасброски от отравления, слепоты, очарования, оглушения, испуга, паралича и окаменения.',
    { source: 'PHB', classes: ['Паладин'] }
  ),
  spell(
    'sickening-radiance', 'Болезненное сияние', 4, 'evocation',
    '1 действие', '120 фт.', 'В, С', 'Концентрация, до 10 минут',
    ['concentration', 'damage', 'control'],
    'Область цилиндром радиусом 9 м заливает тусклый зеленоватый свет. Существо, входящее туда или начинающее там ход, совершает спасбросок Телосложения, получая 4к10 урона излучением, уровень истощения и слабое свечение (не может прятаться).',
    { source: 'XGE', classes: ['Волшебник', 'Чародей', 'Колдун'] }
  ),
  spell(
    'mordenkainens-faithful-hound', 'Верный пёс Морденкайнена', 4, 'conjuration',
    '1 действие', '30 фт.', 'В, С, М (крошечный серебряный свисток, кусочек кости и нитка)', '8 часов',
    ['damage', 'utility'],
    'Вы создаёте в свободной точке невидимого сторожевого пса. Он лает, когда к нему приближается существо, не назвавшее заданный пароль, видит невидимых существ и Эфирный План и игнорирует иллюзии. В начале каждого вашего хода пёс атакует враждебную цель рядом с собой, нанося при попадании 4к8 колющего урона.',
    { source: 'PHB', classes: ['Волшебник', 'Изобретатель'] }
  ),
  spell(
    'control-water', 'Власть над водами', 4, 'transmutation',
    '1 действие', '300 фт.', 'В, С, М (капля воды и щепотка пыли)', 'Концентрация, до 10 минут',
    ['concentration', 'control'],
    'Вы управляете водой в большой области: поднимаете потоп, расступаете воду проходом, направляете течение или создаёте водоворот, засасывающий существ.',
    { source: 'PHB', classes: ['Жрец', 'Друид', 'Волшебник'] }
  ),
  spell(
    'watery-sphere', 'Водяная сфера', 4, 'conjuration',
    '1 действие', '90 фт.', 'В, С, М (капля воды)', 'Концентрация, до 1 минуты',
    ['concentration', 'control'],
    'Сфера воды диаметром 3 м окутывает существ. Каждое (до четырёх) совершает спасбросок Силы; при провале попадает внутрь, становится опутанным и всплывает. Действием вы можете двигать сферу на 9 м.',
    { source: 'XGE', classes: ['Друид', 'Чародей', 'Волшебник', 'Изобретатель'] }
  ),
  spell(
    'phantasmal-killer', 'Воображаемый убийца', 4, 'illusion',
    '1 действие', '120 фт.', 'В, С', 'Концентрация, до 1 минуты',
    ['concentration', 'damage', 'control'],
    'Вы создаёте в разуме цели образ её худшего кошмара. Существо совершает спасбросок Мудрости; при провале становится испуганным и получает 4к10 урона психической энергией, повторяя спасбросок в конце каждого своего хода.',
    { source: 'PHB', classes: ['Волшебник', 'Чародей', 'Колдун'] }
  ),
  spell(
    'conjure-woodland-beings', 'Вызов лесных обитателей', 4, 'conjuration',
    '1 действие', '60 фт.', 'В, С, М (одна остролистная ягода на каждое существо)', 'Концентрация, до 1 часа',
    ['concentration', 'support'],
    'Вы призываете фейские существа общей ПО не выше 2 (один ПО 2, двое по 1, четверо по 1/2 или восемь по 1/4). Они дружественны и действуют в ваш ход.',
    { source: 'PHB', classes: ['Друид', 'Следопыт'] }
  ),
  spell(
    'conjure-minor-elementals', 'Вызов малых элементалей', 4, 'conjuration',
    '1 минута', '90 фт.', 'В, С', 'Концентрация, до 1 часа',
    ['concentration', 'support'],
    'Вы призываете элементалей в незанятые пространства, которые видите в пределах дистанции. На выбор появляются один элементаль с ПО 2 или ниже, два — с ПО 1 или ниже, четыре — с ПО 1/2 или ниже либо восемь — с ПО 1/4 или ниже. Элементаль исчезает, когда его хиты опускаются до 0 или заклинание заканчивается.',
    {
      source: 'PHB',
      classes: ['Друид', 'Волшебник'],
      sections: [
        { title: 'Призванные', text: 'Элементали дружественны вам и вашим спутникам и ходят группой со своей инициативой. Они выполняют ваши словесные команды (это не требует действия), а без команд защищаются от враждебных существ и больше ничего не делают.' },
        { title: 'На более высоких уровнях', text: 'Ячейкой 6-го уровня появляется вдвое больше элементалей выбранного варианта, ячейкой 8-го — втрое.' }
      ]
    }
  ),
  spell(
    'greater-invisibility', 'Высшая невидимость', 4, 'illusion',
    '1 действие', 'Касание', 'В, С', 'Концентрация, до 1 минуты',
    ['concentration', 'support'],
    'Согласное существо становится невидимым, пока заклинание активно, — даже когда атакует или творит заклинания.',
    { source: 'PHB', classes: ['Бард', 'Волшебник', 'Чародей', 'Колдун'] }
  ),
  spell(
    'giant-insect', 'Гигантское насекомое', 4, 'transmutation',
    '1 действие', '30 фт.', 'В, С', 'Концентрация, до 10 минут',
    ['concentration', 'support'],
    'Вы превращаете до десяти сколопендр, трёх пауков, пяти ос или одного скорпиона в гигантские версии, послушные вашим командам, пока заклинание активно.',
    { source: 'PHB', classes: ['Друид'] }
  ),
  spell(
    'ice-storm', 'Град', 4, 'evocation',
    '1 действие', '300 фт.', 'В, С, М (щепотка пыли и несколько капель воды)', 'Мгновенная',
    ['damage', 'control'],
    'Ледяные глыбы обрушиваются цилиндром радиусом 20 фт. и высотой 40 фт. Существа в области совершают спасбросок Ловкости, получая 2к8 дробящего и 4к6 урона холодом при провале или половину при успехе. До конца вашего следующего хода область становится труднопроходимой.',
    { source: 'PHB', classes: ['Волшебник', 'Друид', 'Чародей'] }
  ),
  spell(
    'vitriolic-sphere', 'Едкий шар', 4, 'evocation',
    '1 действие', '150 фт.', 'В, С, М (капля желчи гигантского слизня)', 'Мгновенная',
    ['damage'],
    'Шар кислоты взрывается сферой радиусом 20 фт. Все существа внутри совершают спасбросок Ловкости. При провале цель получает 10к4 урона кислотой и ещё 5к4 в конце своего следующего хода; при успехе — половину первичного урона без последующего урона.',
    { source: 'XGE', classes: ['Волшебник', 'Чародей'] }
  ),
  spell(
    'death-ward', 'Защита от смерти', 4, 'abjuration',
    '1 действие', 'Касание', 'В, С', '8 часов',
    ['support'],
    'Вы защищаете существо от гибели. Когда урон впервые должен опустить его хиты до 0, вместо этого остаётся 1 хит. Если цель должна мгновенно погибнуть без получения урона, этот эффект отменяется. В обоих случаях заклинание после срабатывания заканчивается.',
    { source: 'PHB', classes: ['Жрец', 'Паладин'] }
  ),
  spell(
    'banishment', 'Изгнание', 4, 'abjuration',
    '1 действие', '60 фт.', 'В, С, М (предмет, ненавистный цели)', 'Концентрация, до 1 минуты',
    ['concentration', 'control'],
    'Вы пытаетесь изгнать видимое существо. Оно совершает спасбросок Харизмы; при провале переносится на безобидный демиплан (если родом с вашего плана) или на свой родной план, откуда не может вернуться, пока заклинание активно.',
    { source: 'PHB', classes: ['Жрец', 'Паладин', 'Волшебник', 'Чародей', 'Колдун'] }
  ),
  spell(
    'fabricate', 'Изготовление', 4, 'transmutation',
    '10 минут', '120 фт.', 'В, С', 'Мгновенная',
    ['utility'],
    'Вы превращаете видимое сырьё в готовое изделие. Обычно оно помещается в куб с ребром 10 фт.; предмет из металла, камня или минералов — в куб с ребром 5 фт. Заклинание не создаёт существ и магические предметы, а сложная работа требует владения подходящим ремесленным инструментом.',
    { source: 'PHB', classes: ['Волшебник', 'Изобретатель'] }
  ),
  spell(
    'stone-shape', 'Изменение формы камня', 4, 'transmutation',
    '1 действие', 'Касание', 'В, С, М (мягкая глина, которой придают желаемую форму)', 'Мгновенная',
    ['utility'],
    'Вы придаёте желаемую форму каменному предмету Среднего размера или участку камня не более 5 фт. в любом измерении. Так можно создать проход, простой предмет или наглухо закрыть каменную дверь; мелкие механические детали воспроизвести нельзя.',
    { source: 'PHB', classes: ['Волшебник', 'Друид', 'Жрец', 'Изобретатель'] }
  ),
  spell(
    'mordenkainens-private-sanctum', 'Кабинет Морденкайнена', 4, 'abjuration',
    '10 минут', '120 фт.', 'В, С, М (свинцовый лист, матовое стекло, вата или ткань и толчёный хризолит)', '24 часа',
    ['utility'],
    'Вы ограждаете куб с ребром от 5 до 100 фт., выбирая свойства защиты: блокировку звука и обзора, прорицания, телепортации и планарных перемещений. Ежедневное наложение на одно место в течение года делает защиту постоянной.',
    { source: 'PHB', classes: ['Волшебник', 'Изобретатель'] }
  ),
  spell(
    'stoneskin', 'Каменная кожа', 4, 'abjuration',
    '1 действие', 'Касание', 'В, С, М (алмазная пыль стоимостью не менее 100 с.м.)', 'Концентрация, до 1 часа',
    ['concentration', 'support'],
    'Кожа согласного существа обретает твёрдость камня. Пока заклинание активно, оно получает сопротивление немагическому дробящему, колющему и рубящему урону.',
    { source: 'PHB', classes: ['Друид', 'Следопыт', 'Волшебник', 'Чародей', 'Изобретатель'] }
  ),
  spell(
    'leomunds-secret-chest', 'Леомундов потайной сундук', 4, 'conjuration',
    '1 действие', 'Касание', 'В, С, М (изысканный сундук стоимостью не менее 5000 с.м. и его крошечная копия стоимостью не менее 50 с.м.)', 'Мгновенная',
    ['utility'],
    'Вы прячете сундук объёмом до 12 кубических футов на Эфирном Плане. Касаясь миниатюрной копии, вы можете действием вернуть сундук рядом с собой или отправить обратно. После 60 дней ежедневно появляется накапливающийся риск, что сундук останется на Эфирном Плане навсегда.',
    { source: 'PHB', classes: ['Волшебник', 'Изобретатель'] }
  ),
  spell(
    'arcane-eye', 'Магический глаз', 4, 'divination',
    '1 действие', '30 фт.', 'В, С, М (кусочек шерсти летучей мыши)', 'Концентрация, до 1 часа',
    ['concentration', 'utility'],
    'Вы создаёте незримый парящий магический глаз в пределах дистанции. Действием вы перемещаете его до 9 м в любом направлении (в т.ч. сквозь щели) и видите его тёмным зрением на 9 м.',
    { source: 'PHB', classes: ['Волшебник', 'Изобретатель'] }
  ),
  spell(
    'hallucinatory-terrain', 'Мираж', 4, 'illusion',
    '10 минут', '300 фт.', 'В, С, М (камень, ветка и кусочек зелёного растения)', '24 часа',
    ['control', 'utility'],
    'Вы заставляете природную местность в кубе с ребром 150 фт. выглядеть, звучать и пахнуть как другая природная местность. Рукотворные объекты и существа не меняются, а прикосновение раскрывает настоящую поверхность; внимательное исследование позволяет распознать иллюзию.',
    { source: 'PHB', classes: ['Бард', 'Волшебник', 'Друид', 'Колдун'] }
  ),
  spell(
    'shadow-of-moil', 'Облачение тени', 4, 'necromancy',
    '1 действие', 'На себя', 'В, С, М (погребальная пелена стоимостью не менее 150 с.м.)', 'Концентрация, до 1 минуты',
    ['concentration', 'damage', 'support'],
    'Вас окутывают призрачные тени: вы получаете сопротивление урону излучением и полностью заслонены для других. Когда существо в пределах 3 м попадает по вам рукопашной атакой, оно получает 2к8 урона некротической энергией.',
    { source: 'XGE', classes: ['Колдун'] }
  ),
  spell(
    'staggering-smite', 'Оглушающая кара', 4, 'evocation',
    '1 бонусное действие', 'На себя', 'В', 'Концентрация, до 1 минуты',
    ['concentration', 'damage', 'control'],
    'Ваша следующая удачная рукопашная атака оружием наносит дополнительно 4к6 урона психической энергией. Цель совершает спасбросок Мудрости; при провале до конца вашего следующего хода атакует и проверяет характеристики с помехой и не может использовать реакции.',
    { source: 'PHB', classes: ['Паладин'] }
  ),
  spell(
    'wall-of-fire', 'Огненная стена', 4, 'evocation',
    '1 действие', '120 фт.', 'В, С, М (кусочек фосфора)', 'Концентрация, до 1 минуты',
    ['concentration', 'damage', 'control'],
    'Вы возводите огненную стену до 6 м высотой и 18 м длиной (или кольцо). Одна сторона обжигает: существо в пределах 3 м от неё или входящее в стену совершает спасбросок Ловкости, получая 5к8 урона огнём.',
    { source: 'PHB', classes: ['Друид', 'Волшебник', 'Чародей', 'Колдун', 'Изобретатель'] }
  ),
  spell(
    'fire-shield', 'Огненный щит', 4, 'evocation',
    '1 действие', 'На себя', 'В, С, М (кусочек фосфора или светлячок)', '10 минут',
    ['damage', 'support'],
    'Вас окружает тёплое или прохладное пламя. Тёплый щит даёт сопротивление холоду и отвечает на рукопашные попадания 2к8 урона огнём; прохладный даёт сопротивление огню и наносит 2к8 урона холодом.',
    { source: 'PHB', classes: ['Волшебник', 'Друид', 'Чародей'] }
  ),
  spell(
    'otilukes-resilient-sphere', 'Отилюков упругий шар', 4, 'evocation',
    '1 действие', '30 фт.', 'В, С, М (полусфера из хрусталя и полусфера из гуммиарабика)', 'Концентрация, до 1 минуты',
    ['concentration', 'control'],
    'Вокруг существа или предмета возникает сфера из мерцающей силы. Несогласная цель совершает спасбросок Ловкости. Сфера непроницаема для любого воздействия; заключённый не может выйти, но может катить её изнутри.',
    { source: 'PHB', classes: ['Волшебник', 'Изобретатель'] }
  ),
  spell(
    'charm-monster', 'Очарование монстра', 4, 'enchantment',
    '1 действие', '30 фт.', 'В, С', '1 час',
    ['control'],
    'Видимое существо совершает спасбросок Мудрости с преимуществом, если сражается с вами или вашими спутниками. При провале оно очаровано и считает вас другом, пока ему не причинят вред. После окончания эффекта цель понимает, что была очарована.',
    { source: 'XGE', classes: ['Бард', 'Волшебник', 'Друид', 'Колдун', 'Чародей'] }
  ),
  spell(
    'dimension-door', 'Переносящая дверь', 4, 'conjuration',
    '1 действие', '500 фт.', 'В', 'Мгновенная',
    ['utility'],
    'Вы телепортируетесь в видимое, знакомое или описанное расстоянием и направлением место и можете взять одно согласное существо не крупнее вас. Если точка назначения занята, перемещение не происходит, а путешественники получают по 4к6 урона силовым полем.',
    { source: 'PHB', classes: ['Бард', 'Волшебник', 'Колдун', 'Чародей'] }
  ),
  spell(
    'dominate-beast', 'Подчинение зверя', 4, 'enchantment',
    '1 действие', '60 фт.', 'В, С', 'Концентрация, до 1 минуты',
    ['concentration', 'control'],
    'Вы пытаетесь подчинить видимого зверя. Он совершает спасбросок Мудрости; при провале очарован и подчиняется вашим телепатическим командам, пока заклинание активно. Полученный урон даёт цели новый спасбросок.',
    { source: 'PHB', classes: ['Друид', 'Чародей'] }
  ),
  spell(
    'find-greater-steed', 'Поиск высшего скакуна', 4, 'conjuration',
    '10 минут', '30 фт.', 'В, С', 'Мгновенная',
    ['support', 'utility'],
    'Вы призываете верного духа в облике грифона, пегаса, перитона, лютого волка, носорога или саблезубого тигра. Скакун понимает выбранный язык, телепатически общается с вами на расстоянии до 1 мили и может разделять заклинания, нацеленные только на вас.',
    { source: 'XGE', classes: ['Паладин'] }
  ),
  spell(
    'locate-creature', 'Поиск существа', 4, 'divination',
    '1 действие', 'На себя', 'В, С, М (клок шерсти ищейки)', 'Концентрация, до 1 часа',
    ['concentration', 'utility'],
    'Пока заклинание активно, вы чувствуете направление к знакомому существу или ближайшему существу определённого вида в пределах 300 м, если между вами нет проточной воды шириной от 3 м.',
    { source: 'PHB', classes: ['Бард', 'Жрец', 'Друид', 'Паладин', 'Следопыт', 'Волшебник'] }
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
    'Вы задаёте божественной сущности один вопрос о цели, событии или деятельности, которые должны произойти в ближайшие 7 дней, и получаете честный, хотя возможно загадочный, ответ. Повторные применения до продолжительного отдыха могут дать случайный ответ.',
    { source: 'PHB', classes: ['Волшебник', 'Друид', 'Жрец'] }
  ),
  spell(
    'summon-greater-demon', 'Призыв высшего демона', 4, 'conjuration',
    '1 действие', '60 фт.', 'В, С, М (сосуд с кровью гуманоида, убитого за последние сутки)', 'Концентрация, до 1 часа',
    ['concentration', 'support'],
    'Вы призываете демона ПО не выше 5. Он появляется рядом и подчиняется вашим командам, но каждый ход совершает спасбросок Харизмы, стремясь вырваться, если вы теряете концентрацию.',
    { source: 'XGE', classes: ['Волшебник', 'Колдун'] }
  ),
  spell(
    'summon-aberration', 'Призыв духа аберрации', 4, 'conjuration',
    '1 действие', '90 фт.', 'В, С, М (шкатулка с извивающимися щупальцами стоимостью не менее 400 с.м.)', 'Концентрация, до 1 часа',
    ['concentration', 'support'],
    'Вы призываете дух аберрации (пожиратель, слизень или похититель), который появляется рядом и действует по вашей команде в ваш ход.',
    { source: 'TCE', classes: ['Волшебник', 'Колдун', 'Изобретатель'] }
  ),
  spell(
    'summon-construct', 'Призыв духа конструкта', 4, 'conjuration',
    '1 действие', '90 фт.', 'В, С, М (позолоченная шкатулка с шестерёнками стоимостью не менее 400 с.м.)', 'Концентрация, до 1 часа',
    ['concentration', 'support'],
    'Вы призываете дух конструкта (глины, камня или металла), который появляется рядом и сражается на вашей стороне.',
    { source: 'TCE', classes: ['Волшебник', 'Изобретатель'] }
  ),
  spell(
    'summon-elemental', 'Призыв духа элементалей', 4, 'conjuration',
    '1 действие', '90 фт.', 'В, С, М (обручи разных стихий стоимостью не менее 400 с.м.)', 'Концентрация, до 1 часа',
    ['concentration', 'support'],
    'Вы призываете дух элементаля (воздуха, земли, огня или воды), который появляется рядом и действует по вашей команде.',
    { source: 'TCE', classes: ['Друид', 'Следопыт', 'Волшебник', 'Изобретатель'] }
  ),
  spell(
    'compulsion', 'Принуждение', 4, 'enchantment',
    '1 действие', '30 фт.', 'В, С', 'Концентрация, до 1 минуты',
    ['concentration', 'control'],
    'Существа по вашему выбору в пределах 9 м совершают спасбросок Мудрости; при провале в свой ход вы можете бонусным действием направлять их перемещение — вынуждая идти в выбранную вами сторону.',
    { source: 'PHB', classes: ['Бард'] }
  ),
  spell(
    'elemental-bane', 'Проклятье стихий', 4, 'transmutation',
    '1 действие', '90 фт.', 'В, С', 'Концентрация, до 1 минуты',
    ['concentration', 'control'],
    'Видимое существо совершает спасбросок Телосложения. При провале, пока заклинание активно, оно теряет сопротивление к выбранному типу урона (кислота, холод, огонь, электричество или звук), а первый такой урон за ход по нему увеличивается на 2к6.',
    { source: 'XGE', classes: ['Друид', 'Волшебник', 'Чародей', 'Колдун', 'Изобретатель'] }
  ),
  spell(
    'freedom-of-movement', 'Свобода перемещения', 4, 'abjuration',
    '1 действие', 'Касание', 'В, С, М (кожаный ремешок, обмотанный вокруг конечности)', '1 час',
    ['support'],
    'Согласная цель игнорирует труднопроходимую местность; магия не может снизить её скорость, парализовать или опутать. Потратив 5 фт. перемещения, она автоматически освобождается из немагических оков и захватов, а под водой движется и атакует без обычных штрафов.',
    { source: 'PHB', classes: ['Бард', 'Друид', 'Жрец', 'Следопыт', 'Изобретатель'] }
  ),
  spell(
    'confusion', 'Смятение', 4, 'enchantment',
    '1 действие', '90 фт.', 'В, С, М (три ореховые скорлупки)', 'Концентрация, до 1 минуты',
    ['concentration', 'control'],
    'Существа в сфере радиусом 3 м совершают спасбросок Мудрости; при провале не могут действовать нормально и в свой ход по броску к10 либо бездействуют, либо бредут в случайную сторону, либо атакуют ближайшего.',
    { source: 'PHB', classes: ['Бард', 'Друид', 'Волшебник', 'Чародей'] }
  ),
  spell(
    'guardian-of-faith', 'Страж веры', 4, 'conjuration',
    '1 действие', '30 фт.', 'В', '8 часов',
    ['damage', 'control'],
    'В выбранной точке появляется неподвижный призрачный страж. Враждебное существо, впервые за ход входящее в область в пределах 10 фт. от него, совершает спасбросок Ловкости и получает 20 урона излучением при провале или половину при успехе. Нанеся суммарно 60 урона, страж исчезает.',
    { source: 'PHB', classes: ['Жрец'] }
  ),
  spell(
    'guardian-of-nature', 'Страж природы', 4, 'transmutation',
    '1 бонусное действие', 'На себя', 'В', 'Концентрация, до 1 минуты',
    ['concentration', 'support'],
    'Вы принимаете облик стража природы на выбор: Первобытный зверь (скорость, тёмное зрение, доп. урон рукопашными) или Могучее древо (временные хиты, преимущество на проверки Силы и Телосложения, врагам труднее вас достать).',
    { source: 'XGE', classes: ['Друид', 'Следопыт'] }
  ),
  spell(
    'storm-sphere', 'Сфера бури', 4, 'evocation',
    '1 действие', '150 фт.', 'В, С', 'Концентрация, до 1 минуты',
    ['concentration', 'damage'],
    'Сфера бушующей бури радиусом 6 м возникает в пределах дистанции. Существо, входящее туда или начинающее там ход, совершает спасбросок Силы, получая 2к6 дробящего урона. Бонусным действием вы бьёте молнией из сферы, нанося цели 4к6 урона электричеством.',
    { source: 'XGE', classes: ['Волшебник', 'Чародей'] }
  ),
  spell(
    'blight', 'Усыхание', 4, 'necromancy',
    '1 действие', '30 фт.', 'В, С', 'Мгновенная',
    ['damage'],
    'Некротическая энергия иссушает видимое существо. Оно совершает спасбросок Телосложения, получая 8к8 урона некротической энергией при провале или половину при успехе. Растительные существа спасаются с помехой и получают максимальный урон, а обычные растения сразу увядают.',
    { source: 'PHB', classes: ['Волшебник', 'Друид', 'Колдун', 'Чародей'] }
  ),
  spell(
    'grasping-vine', 'Цепкая лоза', 4, 'conjuration',
    '1 бонусное действие', '30 фт.', 'В, С', 'Концентрация, до 1 минуты',
    ['concentration', 'control'],
    'Вы создаёте лозу, тянущуюся из точки к цели в пределах 9 м. Существо совершает спасбросок Ловкости; при провале притягивается к лозе на 6 м. Бонусным действием вы можете повторять рывок.',
    { source: 'XGE', classes: ['Друид', 'Следопыт'] }
  ),
  spell(
    'evards-black-tentacles', 'Эвардовы чёрные щупальца', 4, 'conjuration',
    '1 действие', '90 фт.', 'В, С, М (кусок щупальца осьминога или спрута)', 'Концентрация, до 1 минуты',
    ['concentration', 'damage', 'control'],
    'Область квадратом 6×6 м покрывается извивающимися щупальцами. Существо в ней совершает спасбросок Ловкости; при провале получает 3к6 дробящего урона и становится опутанным, получая тот же урон в начале каждого своего хода.',
    { source: 'PHB', classes: ['Волшебник', 'Колдун'] }
  ),
  // ── Заклинания 5 уровня (базовые, PHB / XGE / TCE) ────────────────
  spell(
    'swift-quiver', 'Быстрый колчан', 5, 'transmutation',
    '1 бонусное действие', 'Касание', 'В, С, М (колчан с не менее чем одним снарядом)', 'Концентрация, до 1 минуты',
    ['concentration', 'support'],
    'Ваш колчан наполняется бесконечными снарядами. Пока заклинание активно, бонусным действием вы совершаете две атаки оружием, использующим боеприпасы из этого колчана; снаряды исчезают после попадания или промаха.',
    { source: 'XGE', classes: ['Следопыт'] }
  ),
  spell(
    'control-winds', 'Власть над ветрами', 5, 'transmutation',
    '1 действие', '300 фт.', 'В, С', 'Концентрация, до 1 часа',
    ['concentration', 'control'],
    'Вы управляете воздухом в кубе 30 м: создаёте порыв (сбивает мелкие объекты, гасит огонь), затишье, восходящий или нисходящий поток, меняющий движение и полёт существ в области.',
    { source: 'XGE', classes: ['Друид', 'Чародей', 'Волшебник'] }
  ),
  spell(
    'maelstrom', 'Водоворот', 5, 'evocation',
    '1 действие', '120 фт.', 'В, С, М (бумажный или пробковый кораблик)', 'Концентрация, до 1 минуты',
    ['concentration', 'damage', 'control'],
    'В точке на воде возникает водоворот радиусом 9 м (труднопроходимая местность). Существо, начинающее там ход, совершает спасбросок Силы, получая 6к6 дробящего урона и притягиваясь на 3 м к центру.',
    { source: 'XGE', classes: ['Друид'] }
  ),
  spell(
    'conjure-elemental', 'Вызов элементаля', 5, 'conjuration',
    '1 минута', '90 фт.', 'В, С, М (горящий уголёк, кусок земли, курильница или вода — по стихии)', 'Концентрация, до 1 часа',
    ['concentration', 'support'],
    'Вы призываете элементаля ПО не выше 5 из выбранной стихии. Он появляется в незанятом пространстве и подчиняется вам, но при потере концентрации становится враждебным.',
    {
      source: 'PHB',
      classes: ['Друид', 'Волшебник'],
      sections: [{ title: 'На более высоких уровнях', text: 'Ячейкой 6-го уровня и выше ПО элементаля растёт на 1 за каждый уровень ячейки выше 5-го.' }]
    }
  ),
  spell(
    'wrath-of-nature', 'Гнев природы', 5, 'evocation',
    '1 действие', '120 фт.', 'В, С', 'Концентрация, до 1 минуты',
    ['concentration', 'damage', 'control'],
    'Природа в кубе 18 м ополчается на ваших врагов: трава оплетает, деревья хлещут ветвями, камни летят, а корни и колючки покрывают землю — существа совершают спасброски Ловкости и получают урон или ограничения.',
    { source: 'XGE', classes: ['Друид', 'Следопыт'] }
  ),
  spell(
    'far-step', 'Далёкий шаг', 5, 'conjuration',
    '1 бонусное действие', 'На себя', 'В', 'Концентрация, до 1 минуты',
    ['concentration', 'utility'],
    'Вы телепортируетесь на 18 м в свободное пространство. Пока заклинание активно, вы можете бонусным действием в каждый свой ход телепортироваться так же снова.',
    { source: 'XGE', classes: ['Волшебник', 'Чародей', 'Колдун'] }
  ),
  spell(
    'bigbys-hand', 'Длань Бигби', 5, 'evocation',
    '1 действие', '120 фт.', 'В, С, М (яичная скорлупа и змеиная кожа)', 'Концентрация, до 1 минуты',
    ['concentration', 'damage', 'control'],
    'Вы создаёте огромную мерцающую руку из силы. Бонусным действием вы командуете ей: сжать кулак и ударить (4к8 силового урона), толкнуть, схватить (спасбросок Силы) или заслонить вас.',
    { source: 'PHB', classes: ['Волшебник', 'Изобретатель'] }
  ),
  spell(
    'tree-stride', 'Древесный путь', 5, 'conjuration',
    '1 действие', 'На себя', 'В, С', 'Концентрация, до 1 минуты',
    ['concentration', 'utility'],
    'Пока заклинание активно, вы можете действием войти в живое дерево не меньше вашего размера и мгновенно выйти из другого такого же дерева в пределах 150 м, потратив 1,5 м перемещения.',
    { source: 'PHB', classes: ['Друид', 'Следопыт'] }
  ),
  spell(
    'banishing-smite', 'Изгоняющая кара', 5, 'abjuration',
    '1 бонусное действие', 'На себя', 'В', 'Концентрация, до 1 минуты',
    ['concentration', 'damage', 'control'],
    'Ваша следующая удачная атака оружием наносит дополнительно 5к10 урона силовым полем. Если это снижает цель ниже 50 хитов, она изгоняется на безобидный демиплан или свой родной план, пока заклинание активно.',
    { source: 'PHB', classes: ['Паладин'] }
  ),
  spell(
    'modify-memory', 'Изменение памяти', 5, 'enchantment',
    '1 действие', '30 фт.', 'В, С', 'Концентрация, до 1 минуты',
    ['concentration', 'control'],
    'Вы пытаетесь переиначить память существа. Оно совершает спасбросок Мудрости; при провале вы можете стереть память о событии последних суток или заменить её вымышленным воспоминанием.',
    { source: 'PHB', classes: ['Бард', 'Волшебник'] }
  ),
  spell(
    'infernal-calling', 'Инфернальный зов', 5, 'conjuration',
    '1 минута', '90 фт.', 'В, С, М (рубин стоимостью не менее 999 с.м.)', 'Концентрация, до 1 часа',
    ['concentration', 'control'],
    'Вы призываете дьявола ПО не выше 6, произнеся его имя. Он появляется в пентакле и враждебен; каждый ход вы совершаете проверку, чтобы подчинить его своей воле.',
    { source: 'XGE', classes: ['Волшебник', 'Колдун'] }
  ),
  spell(
    'immolation', 'Испепеление', 5, 'evocation',
    '1 действие', '90 фт.', 'В', 'Концентрация, до 1 минуты',
    ['concentration', 'damage'],
    'Видимое существо охватывает пламя. Оно совершает спасбросок Ловкости, получая 8к6 урона огнём (половину при успехе); при провале горит и получает 4к6 огнём в начале каждого своего хода, источая свет.',
    { source: 'XGE', classes: ['Чародей', 'Волшебник'] }
  ),
  spell(
    'wall-of-stone', 'Каменная стена', 5, 'evocation',
    '1 действие', '120 фт.', 'В, С, М (кусочек гранита)', 'Концентрация, до 10 минут',
    ['concentration', 'control'],
    'Вы возводите каменную стену из шести панелей 3×3 м (или мост, купол и т.п.). Стена прочна; если вы поддерживаете концентрацию 10 минут, она становится постоянной.',
    { source: 'PHB', classes: ['Друид', 'Чародей', 'Волшебник', 'Изобретатель'] }
  ),
  spell(
    'circle-of-power', 'Круг силы', 5, 'abjuration',
    '1 действие', 'На себя (радиус 30 фт.)', 'В', 'Концентрация, до 10 минут',
    ['concentration', 'support'],
    'От вас исходит божественная энергия радиусом 9 м. Союзники в ней совершают с преимуществом спасброски от заклинаний и магических эффектов, а при успешном спасброске с уроном не получают его вовсе.',
    { source: 'PHB', classes: ['Паладин'] }
  ),
  spell(
    'scrying', 'Наблюдение', 5, 'divination',
    '10 минут', 'На себя', 'В, С, М (фокус стоимостью не менее 1000 с.м. — хрустальный шар, зеркало или чаша с водой)', 'Концентрация, до 10 минут',
    ['concentration', 'utility'],
    'Вы создаёте незримый сенсор рядом с известным вам существом, видя и слыша через него. Цель совершает спасбросок Мудрости (с модификатором по знакомству); при успехе заклинание проваливается.',
    { source: 'PHB', classes: ['Бард', 'Жрец', 'Друид', 'Волшебник', 'Колдун'] }
  ),
  spell(
    'insect-plague', 'Нашествие насекомых', 5, 'conjuration',
    '1 действие', '300 фт.', 'В, С, М (несколько крупинок сахара, немного зёрен и капля жира)', 'Концентрация, до 10 минут',
    ['concentration', 'damage', 'control'],
    'Сфера кусачих летающих насекомых радиусом 6 м окутывает область (труднопроходимая местность, заслонение). Существо, входящее туда или начинающее там ход, совершает спасбросок Телосложения, получая 4к10 колющего урона (половину при успехе).',
    { source: 'PHB', classes: ['Жрец', 'Друид', 'Чародей'] }
  ),
  spell(
    'enervation', 'Обессиливание', 5, 'necromancy',
    '1 действие', '60 фт.', 'В, С', 'Концентрация, до 1 минуты',
    ['concentration', 'damage', 'healing'],
    'Тень между вами и целью тянет из неё жизнь. Существо совершает спасбросок Ловкости; при провале получает 4к8 некротического урона, а вы восстанавливаете половину. Пока заклинание активно, вы можете действием повторять урон.',
    { source: 'XGE', classes: ['Чародей', 'Волшебник', 'Колдун'] }
  ),
  spell(
    'cloudkill', 'Облако смерти', 5, 'conjuration',
    '1 действие', '120 фт.', 'В, С', 'Концентрация, до 10 минут',
    ['concentration', 'damage', 'control'],
    'Сфера ядовитого зелёного тумана радиусом 6 м окутывает область. Существо в ней совершает спасбросок Телосложения, получая 5к8 урона ядом (половину при успехе). Облако медленно движется от вас каждый ход.',
    { source: 'PHB', classes: ['Чародей', 'Волшебник'] }
  ),
  spell(
    'animate-objects', 'Оживление вещей', 5, 'transmutation',
    '1 действие', '120 фт.', 'В, С', 'Концентрация, до 1 минуты',
    ['concentration', 'damage', 'support'],
    'Вы оживляете до десяти немагических предметов, которые становятся существами под вашим командованием. Мелкие бьют слабее, крупные — сильнее; бонусным действием вы направляете их атаки.',
    { source: 'PHB', classes: ['Бард', 'Чародей', 'Волшебник', 'Изобретатель'] }
  ),
  spell(
    'danse-macabre', 'Пляска смерти', 5, 'necromancy',
    '1 действие', '60 фт.', 'В, С', 'Концентрация, до 1 часа',
    ['concentration', 'support'],
    'Вы поднимаете до пяти трупов Среднего или Малого размера как зомби или скелетов, послушных вам. Пока заклинание активно, они действуют в ваш ход и получают бонус к атакам и урону.',
    { source: 'XGE', classes: ['Волшебник', 'Колдун'] }
  ),
  spell(
    'dominate-person', 'Подчинение личности', 5, 'enchantment',
    '1 действие', '60 фт.', 'В, С', 'Концентрация, до 1 минуты',
    ['concentration', 'control'],
    'Вы пытаетесь подчинить видимого гуманоида. Он совершает спасбросок Мудрости; при провале очарован и подчиняется вашим телепатическим командам. Полученный урон даёт цели новый спасбросок.',
    { source: 'PHB', classes: ['Бард', 'Чародей', 'Волшебник'] }
  ),
  spell(
    'antilife-shell', 'Преграда жизни', 5, 'abjuration',
    '1 действие', 'На себя (радиус 10 фт.)', 'В, С', 'Концентрация, до 1 часа',
    ['concentration', 'support'],
    'Вокруг вас возникает мерцающий барьер радиусом 3 м, движущийся вместе с вами. Он не пропускает внутрь существ из плоти и крови, но не мешает атакам и заклинаниям.',
    { source: 'PHB', classes: ['Друид'] }
  ),
  spell(
    'summon-celestial', 'Призыв духа небожителей', 5, 'conjuration',
    '1 действие', '90 фт.', 'В, С, М (реликварий стоимостью не менее 500 с.м.)', 'Концентрация, до 1 часа',
    ['concentration', 'support', 'healing'],
    'Вы призываете дух небожителя (защитник или мститель), который появляется рядом, сражается на вашей стороне и способен лечить союзников.',
    { source: 'TCE', classes: ['Жрец', 'Паладин'] }
  ),
  spell(
    'dawn', 'Рассвет', 5, 'evocation',
    '1 действие', '60 фт.', 'В, С, М (солнечные часы стоимостью не менее 100 с.м.)', 'Концентрация, до 1 минуты',
    ['concentration', 'damage'],
    'В точке возникает столб солнечного света радиусом 9 м. Существо в области при появлении столба или начинающее там ход совершает спасбросок Телосложения, получая 4к10 урона излучением. Бонусным действием вы двигаете столб на 18 м.',
    { source: 'XGE', classes: ['Жрец', 'Волшебник'] }
  ),
  spell(
    'dispel-evil-and-good', 'Рассеивание добра и зла', 5, 'abjuration',
    '1 действие', 'На себя', 'В, С, М (святая вода или порошок серебра и железа)', 'Концентрация, до 1 минуты',
    ['concentration', 'support', 'control'],
    'Пока заклинание активно, аберрации, исчадия, небожители, нежить, феи и элементали атакуют вас с помехой. Действием вы можете разорвать очарование/испуг/вселение или изгнать такое существо (спасбросок Харизмы).',
    { source: 'PHB', classes: ['Жрец', 'Паладин'] }
  ),
  spell(
    'holy-weapon', 'Священное оружие', 5, 'evocation',
    '1 бонусное действие', 'Касание', 'В, С', 'Концентрация, до 1 часа',
    ['concentration', 'damage', 'support'],
    'Вы наделяете оружие священной силой: оно светит и наносит дополнительно 2к8 урона излучением. Бонусным действием вы можете разбить свет, и существа в 9 м совершают спасбросок Телосложения, получая 4к8 излучением и слепоту при провале.',
    { source: 'XGE', classes: ['Жрец', 'Паладин'] }
  ),
  spell(
    'wall-of-force', 'Силовая стена', 5, 'evocation',
    '1 действие', '120 фт.', 'В, С, М (щепотка порошка из прозрачного самоцвета)', 'Концентрация, до 10 минут',
    ['concentration', 'control'],
    'Вы создаёте незримую стену силы (плоскую или в виде сферы). Она непроницаема для физических предметов и большинства эффектов; сквозь неё нельзя пройти, и её нельзя пробить обычным оружием.',
    { source: 'PHB', classes: ['Волшебник', 'Изобретатель'] }
  ),
  spell(
    'wall-of-light', 'Стена света', 5, 'evocation',
    '1 действие', '120 фт.', 'В, С, М (осколок зеркала)', 'Концентрация, до 10 минут',
    ['concentration', 'damage', 'control'],
    'Вы возводите стену яркого света до 18 м длиной. Существо в ней при появлении или начинающее там ход совершает спасбросок Телосложения, получая 4к8 урона излучением и временную слепоту. Действием вы выпускаете из стены луч.',
    { source: 'XGE', classes: ['Чародей', 'Волшебник', 'Колдун'] }
  ),
  spell(
    'telekinesis', 'Телекинез', 5, 'transmutation',
    '1 действие', '60 фт.', 'В, С', 'Концентрация, до 10 минут',
    ['concentration', 'control'],
    'Пока заклинание активно, действием вы можете силой мысли перемещать существо (проверка Силы против вашей) или предмет весом до 500 кг — поднимать, бросать и удерживать его.',
    { source: 'PHB', classes: ['Чародей', 'Волшебник', 'Колдун', 'Изобретатель'] }
  ),
  spell(
    'hold-monster', 'Удержание чудовища', 5, 'enchantment',
    '1 действие', '90 фт.', 'В, С, М (прямой кусочек железа)', 'Концентрация, до 1 минуты',
    ['concentration', 'control'],
    'Видимое существо (кроме нежити) совершает спасбросок Мудрости; при провале парализовано, пока заклинание активно, повторяя спасбросок в конце каждого своего хода.',
    { source: 'PHB', classes: ['Бард', 'Чародей', 'Волшебник', 'Колдун'] }
  ),
  spell(
    'skill-empowerment', 'Усиление навыка', 5, 'transmutation',
    '1 действие', 'Касание', 'В, С', 'Концентрация, до 1 часа',
    ['concentration', 'support'],
    'Согласное существо получает мастерство (удвоение бонуса умения) в одном навыке на выбор, пока заклинание активно.',
    { source: 'XGE', classes: ['Бард', 'Чародей', 'Волшебник', 'Изобретатель'] }
  ),
  spell(
    'mislead', 'Фальшивый двойник', 5, 'illusion',
    '1 действие', 'На себя', 'С', 'Концентрация, до 1 часа',
    ['concentration', 'utility', 'control'],
    'Вы становитесь невидимым и создаёте свой иллюзорный двойник. Действием вы можете видеть и слышать через двойника и управлять его движением, говоря его голосом.',
    { source: 'PHB', classes: ['Бард', 'Волшебник'] }
  ),
  // ── Заклинания 6 уровня (базовые, PHB / XGE / TCE) ────────────────
  spell(
    'conjure-fey', 'Вызов феи', 6, 'conjuration',
    '1 минута', '90 фт.', 'В, С', 'Концентрация, до 1 часа',
    ['concentration', 'support'],
    'Вы призываете фейское существо ПО не выше 6 или дух-фею в облике зверя. Оно появляется рядом и дружественно; при потере концентрации становится враждебным.',
    { source: 'PHB', classes: ['Друид', 'Колдун'] }
  ),
  spell(
    'move-earth', 'Движение почвы', 6, 'transmutation',
    '1 действие', '120 фт.', 'В, С, М (железное лезвие и мешочек с землёй и глиной)', 'Концентрация, до 2 часов',
    ['concentration', 'utility'],
    'Пока заклинание активно, вы можете переформировать землю, песок или глину в области до 12×12 м: поднимать холмы, рыть ямы и рвы, сдвигать грунт — не быстрее шага.',
    { source: 'PHB', classes: ['Друид', 'Чародей', 'Волшебник', 'Изобретатель'] }
  ),
  spell(
    'wall-of-ice', 'Ледяная стена', 6, 'evocation',
    '1 действие', '120 фт.', 'В, С, М (кусочек кварца)', 'Концентрация, до 10 минут',
    ['concentration', 'damage', 'control'],
    'Вы возводите ледяную стену из панелей или купол. Пробивший в ней проём проходит сквозь оставшийся холод: спасбросок Ловкости, при провале 10к6 урона холодом (половину при успехе).',
    { source: 'PHB', classes: ['Волшебник', 'Изобретатель'] }
  ),
  spell(
    'arcane-gate', 'Магические врата', 6, 'conjuration',
    '1 действие', '500 фт.', 'В, С', 'Концентрация, до 10 минут',
    ['concentration', 'utility'],
    'Вы создаёте пару связанных порталов-колец в пределах дистанции. Существо, входящее в один, мгновенно выходит из другого; бонусным действием можно менять ориентацию порталов.',
    { source: 'PHB', classes: ['Чародей', 'Волшебник', 'Колдун'] }
  ),
  spell(
    'mental-prison', 'Ментальная тюрьма', 6, 'illusion',
    '1 действие', '60 фт.', 'С', 'Концентрация, до 1 минуты',
    ['concentration', 'damage', 'control'],
    'Вы заключаете разум цели в иллюзорную темницу. Существо совершает спасбросок Интеллекта, получая 5к10 урона психической энергией; при провале считает себя запертым в опасной иллюзии и не может двигаться, а попытка выйти наносит ещё 10к10.',
    { source: 'XGE', classes: ['Чародей', 'Волшебник', 'Колдун'] }
  ),
  spell(
    'ottos-irresistible-dance', 'Неудержимая пляска Отто', 6, 'enchantment',
    '1 действие', '30 фт.', 'В', 'Концентрация, до 1 минуты',
    ['concentration', 'control'],
    'Существо пускается в нелепую пляску: пока заклинание активно, оно двигается с помехой, атакует и проверяет Ловкость с помехой, а атаки по нему идут с преимуществом. Действием оно совершает спасбросок Мудрости, чтобы прекратить пляс.',
    { source: 'PHB', classes: ['Бард', 'Волшебник'] }
  ),
  spell(
    'investiture-of-wind', 'Облачение ветра', 6, 'transmutation',
    '1 действие', 'На себя', 'В, С', 'Концентрация, до 10 минут',
    ['concentration', 'support', 'control'],
    'Вас окутывает вихрь. Пока заклинание активно, дальнобойные атаки по вам идут с помехой, вы получаете скорость полёта 18 м, а действием сдуваете существ порывом ветра.',
    { source: 'XGE', classes: ['Друид', 'Чародей', 'Волшебник', 'Колдун'] }
  ),
  spell(
    'investiture-of-stone', 'Облачение камня', 6, 'transmutation',
    '1 действие', 'На себя', 'В, С', 'Концентрация, до 10 минут',
    ['concentration', 'support', 'control'],
    'Вас покрывает каменная броня. Пока заклинание активно, вы получаете сопротивление немагическому дробящему, колющему и рубящему урону, можете проходить сквозь землю и действием сотрясать землю, роняя существ.',
    { source: 'XGE', classes: ['Друид', 'Чародей', 'Волшебник', 'Колдун'] }
  ),
  spell(
    'investiture-of-ice', 'Облачение льда', 6, 'transmutation',
    '1 действие', 'На себя', 'В, С', 'Концентрация, до 10 минут',
    ['concentration', 'damage', 'control'],
    'Вас окутывает лёд. Пока заклинание активно, вы получаете сопротивление холоду, вокруг вас образуется скользкая труднопроходимая местность, и действием вы выдыхаете конус холода (спасбросок Телосложения, 4к6 урона холодом).',
    { source: 'XGE', classes: ['Друид', 'Чародей', 'Волшебник', 'Колдун'] }
  ),
  spell(
    'investiture-of-flame', 'Облачение огня', 6, 'transmutation',
    '1 действие', 'На себя', 'В, С', 'Концентрация, до 10 минут',
    ['concentration', 'damage', 'support'],
    'Вас окутывает пламя. Пока заклинание активно, вы получаете сопротивление огню, источаете свет, обжигаете стоящих вплотную (1к10 огнём) и действием пускаете линию огня (спасбросок Ловкости, 4к6 урона огнём).',
    { source: 'XGE', classes: ['Друид', 'Чародей', 'Волшебник', 'Колдун'] }
  ),
  spell(
    'flesh-to-stone', 'Окаменение', 6, 'transmutation',
    '1 действие', '60 фт.', 'В, С, М (щепотка извести, немного воды и земли)', 'Концентрация, до 1 минуты',
    ['concentration', 'control'],
    'Вы пытаетесь обратить видимое существо в камень. Оно совершает спасбросок Телосложения; при провале начинает каменеть (опутано), и, провалив спасбросок ещё раз, окаменевает полностью, пока заклинание активно.',
    { source: 'PHB', classes: ['Волшебник', 'Колдун'] }
  ),
  spell(
    'primordial-ward', 'Первородный страж', 6, 'abjuration',
    '1 действие', 'На себя', 'В, С', 'Концентрация, до 1 минуты',
    ['concentration', 'support'],
    'Пока заклинание активно, вы получаете сопротивление кислоте, холоду, огню, электричеству и звуку. Реакцией вы можете обратить одно такое сопротивление в иммунитет до конца своего следующего хода.',
    { source: 'XGE', classes: ['Друид'] }
  ),
  spell(
    'find-the-path', 'Поиск пути', 6, 'divination',
    '1 минута', 'На себя', 'В, С, М (набор гадальных костей стоимостью не менее 100 с.м. и предмет из искомого места)', 'Концентрация, до 1 дня',
    ['concentration', 'utility'],
    'Пока заклинание активно, вы всегда знаете кратчайший путь к известному вам стационарному месту, чувствуя направление и препятствия на пути.',
    { source: 'PHB', classes: ['Бард', 'Жрец', 'Друид'] }
  ),
  spell(
    'tashas-otherworldly-guise', 'Потусторонний облик Таши', 6, 'transmutation',
    '1 бонусное действие', 'На себя', 'В, С, М (пламенеющий меч, обмакнутый в святую или нечистую воду)', 'Концентрация, до 1 минуты',
    ['concentration', 'support'],
    'Вы окутываете себя энергией небожителей или исчадий. Пока заклинание активно, вы получаете иммунитет к нескольким состояниям, скорость полёта, магическое оружие с дополнительным уроном и бонус к КД и спасброскам.',
    { source: 'TCE', classes: ['Чародей', 'Волшебник', 'Колдун'] }
  ),
  spell(
    'summon-fiend', 'Призыв духа исчадия', 6, 'conjuration',
    '1 действие', '90 фт.', 'В, С, М (окаменевшая душа стоимостью не менее 600 с.м.)', 'Концентрация, до 1 часа',
    ['concentration', 'support'],
    'Вы призываете дух исчадия (демон, дьявол или юголот), который появляется рядом и сражается на вашей стороне, действуя в ваш ход.',
    { source: 'TCE', classes: ['Волшебник', 'Колдун'] }
  ),
  spell(
    'eyebite', 'Разящее око', 6, 'necromancy',
    '1 действие', 'На себя', 'В, С', 'Концентрация, до 1 минуты',
    ['concentration', 'control'],
    'Ваши глаза наливаются чёрной силой. Пока заклинание активно, действием вы поражаете взглядом видимое существо (спасбросок Мудрости): усыпляете, пугаете или ввергаете в болезненное состояние.',
    { source: 'PHB', classes: ['Бард', 'Чародей', 'Волшебник', 'Колдун'] }
  ),
  spell(
    'sunbeam', 'Солнечный луч', 6, 'evocation',
    '1 действие', 'На себя (линия 60 фт.)', 'В, С, М (увеличительное стекло)', 'Концентрация, до 1 минуты',
    ['concentration', 'damage'],
    'Из вашей ладони бьёт луч палящего света линией 18 м. Существа в линии совершают спасбросок Телосложения, получая 6к8 урона излучением и слепоту при провале. Действием вы повторяете луч в каждый свой ход.',
    { source: 'PHB', classes: ['Друид', 'Волшебник'] }
  ),
  spell(
    'blade-barrier', 'Стена клинков', 6, 'evocation',
    '1 действие', '90 фт.', 'В, С', 'Концентрация, до 10 минут',
    ['concentration', 'damage', 'control'],
    'Вы возводите вертикальную стену из вращающихся клинков (заслонение, труднопроходимая местность). Существо, проходящее сквозь неё или начинающее ход внутри, совершает спасбросок Ловкости, получая 6к10 рубящего урона.',
    { source: 'PHB', classes: ['Жрец'] }
  ),
  spell(
    'globe-of-invulnerability', 'Сфера неуязвимости', 6, 'abjuration',
    '1 действие', 'На себя (радиус 10 фт.)', 'В, С, М (стеклянная бусина)', 'Концентрация, до 1 минуты',
    ['concentration', 'support'],
    'Вокруг вас возникает мерцающая сфера радиусом 3 м. Заклинания 5 уровня и ниже не могут воздействовать на существ и предметы внутри неё, хотя высвобождают энергию, наложенную ячейкой большего уровня.',
    { source: 'PHB', classes: ['Волшебник', 'Чародей'] }
  ),
  spell(
    'wall-of-thorns', 'Терновая стена', 6, 'conjuration',
    '1 действие', '120 фт.', 'В, С, М (горсть колючек)', 'Концентрация, до 10 минут',
    ['concentration', 'damage', 'control'],
    'Вы выращиваете стену колючих кустов до 6 м высотой (труднопроходимая местность). Существо, входящее в стену или начинающее там ход, совершает спасбросок Ловкости, получая 7к8 колющего урона.',
    { source: 'PHB', classes: ['Друид'] }
  ),
  spell(
    'tensers-transformation', 'Трансформация Тензера', 6, 'transmutation',
    '1 действие', 'На себя', 'В, С, М (несколько волосков быка)', 'Концентрация, до 10 минут',
    ['concentration', 'support'],
    'Вы наполняете себя магической выносливостью и воинской сноровкой. Пока заклинание действует, вы не можете творить заклинания, но получаете 50 временных хитов (оставшиеся пропадают, когда заклинание заканчивается), совершаете с преимуществом броски атаки простым и воинским оружием, а при попадании атакой оружием цель получает дополнительно 2к12 урона силовым полем.',
    {
      source: 'XGE',
      classes: ['Волшебник'],
      sections: [
        { title: 'Воинская выучка', text: 'Вы владеете всеми доспехами, щитами, простым и воинским оружием, а также спасбросками Силы и Телосложения. Действием «Атака» в свой ход вы атакуете дважды, а не один раз; если у вас уже есть умение с дополнительными атаками (например, Дополнительная атака), это не прибавляется к нему.' },
        { title: 'Окончание', text: 'Сразу после окончания заклинания пройдите спасбросок Телосложения СЛ 15, иначе получите 1 степень истощения.' }
      ]
    }
  ),
  // ── Заклинания 7 уровня (базовые, PHB / XGE) ──────────────────────
  spell(
    'conjure-celestial', 'Вызов небожителя', 7, 'conjuration',
    '1 минута', '90 фт.', 'В, С', 'Концентрация, до 1 часа',
    ['concentration', 'support', 'healing'],
    'Вы призываете небожителя ПО не выше 4. Он появляется в свободном пространстве, дружественен к вам и вашим спутникам, действует по вашим командам и способен лечить союзников.',
    { source: 'PHB', classes: ['Жрец'] }
  ),
  spell(
    'delayed-blast-fireball', 'Замедленный огненный шар', 7, 'evocation',
    '1 действие', '150 фт.', 'В, С, М (щепотка гуано летучей мыши и сера)', 'Концентрация, до 1 минуты',
    ['concentration', 'damage'],
    'В выбранной точке разгорается мерцающий шар пламени. Пока вы держите концентрацию, урон растёт на 1к6 за ход; при завершении область радиусом 6 м вспыхивает — спасбросок Ловкости, 12к6 (+ накопленное) урона огнём (половину при успехе).',
    { source: 'PHB', classes: ['Волшебник', 'Чародей'] }
  ),
  spell(
    'reverse-gravity', 'Изменение тяготения', 7, 'transmutation',
    '1 действие', '100 фт.', 'В, С, М (магнетит и железные опилки)', 'Концентрация, до 1 минуты',
    ['concentration', 'control'],
    'В цилиндре радиусом 15 м и высотой 30 м тяготение обращается: незакреплённые существа и предметы падают вверх. Существо может ухватиться за что-то, совершив спасбросок Ловкости.',
    { source: 'PHB', classes: ['Друид', 'Чародей', 'Волшебник', 'Изобретатель'] }
  ),
  spell(
    'mordenkainens-sword', 'Меч Морденкайнена', 7, 'evocation',
    '1 действие', '60 фт.', 'В, С, М (миниатюрный платиновый меч стоимостью не менее 250 с.м.)', 'Концентрация, до 1 минуты',
    ['concentration', 'damage'],
    'Вы создаёте парящий клинок из силы. Бонусным действием вы перемещаете его до 6 м и совершаете им рукопашную атаку заклинанием, нанося при попадании 3к10 урона силовым полем.',
    { source: 'PHB', classes: ['Бард', 'Волшебник', 'Изобретатель'] }
  ),
  spell(
    'project-image', 'Проекция', 7, 'illusion',
    '1 действие', '500 миль', 'В, С, М (маленькая копия вас стоимостью не менее 5 с.м.)', 'Концентрация, до 1 дня',
    ['concentration', 'utility'],
    'Вы создаёте свою иллюзорную копию в знакомом месте в пределах 800 км. Действием вы можете видеть и слышать через неё и говорить её голосом, перемещая её как реальную.',
    { source: 'PHB', classes: ['Бард', 'Волшебник'] }
  ),
  spell(
    'whirlwind', 'Смерч', 7, 'evocation',
    '1 действие', '300 фт.', 'В, С, М (соломинка)', 'Концентрация, до 1 минуты',
    ['concentration', 'damage', 'control'],
    'В точке возникает вихрь радиусом 3 м. Существо, впервые за ход входящее туда или начинающее там ход, совершает спасбросок Ловкости, получая 10к6 дробящего урона и рискуя быть подхваченным и отброшенным.',
    { source: 'XGE', classes: ['Друид', 'Чародей', 'Волшебник'] }
  ),
  // ── Заклинания 8 уровня (базовые, PHB / XGE) ──────────────────────
  spell(
    'holy-aura', 'Аура святости', 8, 'abjuration',
    '1 действие', 'На себя (радиус 30 фт.)', 'В, С, М (крошечный реликварий стоимостью не менее 1000 с.м. с реликвией святого)', 'Концентрация, до 1 минуты',
    ['concentration', 'support'],
    'От вас исходит святая аура радиусом 9 м. Выбранные существа в ней совершают с преимуществом все спасброски, а атакующие их — с помехой; при попадании вплотную исчадие или нежить может ослепнуть (спасбросок Телосложения).',
    { source: 'PHB', classes: ['Жрец'] }
  ),
  spell(
    'control-weather', 'Власть над погодой', 8, 'transmutation',
    '10 минут', 'На себя (радиус 5 миль)', 'В, С, М (курильница)', 'Концентрация, до 8 часов',
    ['concentration', 'control'],
    'Пока заклинание активно, вы меняете погоду в радиусе 8 км: на ступень усиливаете или ослабляете осадки, ветер и температуру, постепенно сдвигая условия к желаемым.',
    { source: 'PHB', classes: ['Жрец', 'Друид', 'Волшебник'] }
  ),
  spell(
    'incendiary-cloud', 'Воспламеняющаяся туча', 8, 'conjuration',
    '1 действие', '150 фт.', 'В, С', 'Концентрация, до 1 минуты',
    ['concentration', 'damage', 'control'],
    'Клубящееся облако тлеющего дыма и искр радиусом 6 м окутывает область (заслонение). Существо в нём при появлении облака или начинающее там ход совершает спасбросок Ловкости, получая 10к8 урона огнём. Облако движется от вас каждый ход.',
    { source: 'PHB', classes: ['Чародей', 'Волшебник'] }
  ),
  spell(
    'earthquake', 'Землетрясение', 8, 'evocation',
    '1 действие', '500 фт.', 'В, С, М (щепотка земли, кусочек камня и комок глины)', 'Концентрация, до 1 минуты',
    ['concentration', 'damage', 'control'],
    'Земля в радиусе 30 м сотрясается. Существа падают ничком, строения рушатся, в земле разверзаются трещины. Стоящие совершают спасбросок Ловкости, а оказавшиеся над трещиной рискуют упасть в неё.',
    { source: 'PHB', classes: ['Жрец', 'Друид', 'Чародей'] }
  ),
  spell(
    'illusory-dragon', 'Иллюзорный дракон', 8, 'illusion',
    '1 действие', '120 фт.', 'С', 'Концентрация, до 1 минуты',
    ['concentration', 'damage', 'control'],
    'Вы создаёте иллюзию грозного дракона. Действием вы двигаете его и заставляете дыхнуть конусом 18 м; существа совершают спасбросок Интеллекта, получая 7к6 урона выбранного вами типа (половину при успехе), а увидевшие впервые пугаются.',
    { source: 'XGE', classes: ['Волшебник'] }
  ),
  spell(
    'maze', 'Лабиринт', 8, 'conjuration',
    '1 действие', '60 фт.', 'В, С', 'Концентрация, до 10 минут',
    ['concentration', 'control'],
    'Вы отправляете видимое существо в лабиринтный демиплан. Оно исчезает и в свой ход может действием совершить проверку Интеллекта (СЛ 20), чтобы выбраться; при провале остаётся, пока заклинание активно.',
    { source: 'PHB', classes: ['Волшебник'] }
  ),
  spell(
    'maddening-darkness', 'Одуряющая тьма', 8, 'evocation',
    '1 действие', '150 фт.', 'В, С, М (капля смолы и растёртая печень летучей мыши)', 'Концентрация, до 10 минут',
    ['concentration', 'damage', 'control'],
    'Сфера магической тьмы радиусом 18 м поглощает свет и наполняется безумным шёпотом. Существо, начинающее ход в области, совершает спасбросок Мудрости, получая 8к8 урона психической энергией (половину при успехе).',
    { source: 'XGE', classes: ['Волшебник', 'Колдун'] }
  ),
  spell(
    'dominate-monster', 'Подчинение чудовища', 8, 'enchantment',
    '1 действие', '60 фт.', 'В, С', 'Концентрация, до 1 часа',
    ['concentration', 'control'],
    'Вы пытаетесь подчинить видимое существо. Оно совершает спасбросок Мудрости; при провале очаровано и подчиняется вашим телепатическим командам, пока заклинание активно. Полученный урон даёт цели новый спасбросок.',
    { source: 'PHB', classes: ['Бард', 'Чародей', 'Волшебник', 'Колдун'] }
  ),
  spell(
    'animal-shapes', 'Превращение в животных', 8, 'transmutation',
    '1 действие', '30 фт.', 'В, С', 'Концентрация, до 24 часов',
    ['concentration', 'support'],
    'Пока заклинание активно, вы превращаете любое число согласных существ в зверей ПО не выше 4. Их характеристики заменяются формой зверя, разум и способность понимать вас сохраняются.',
    { source: 'PHB', classes: ['Друид'] }
  ),
  spell(
    'antimagic-field', 'Преграда магии', 8, 'abjuration',
    '1 действие', 'На себя (радиус 10 фт.)', 'В, С, М (щепотка железных опилок)', 'Концентрация, до 1 часа',
    ['concentration', 'support'],
    'Вокруг вас возникает сфера подавления магии радиусом 3 м, движущаяся с вами. Внутри не работают заклинания, магические предметы и эффекты; заклинания нельзя творить, и в неё нельзя проникнуть магией.',
    { source: 'PHB', classes: ['Жрец', 'Волшебник'] }
  ),
  spell(
    'tsunami', 'Цунами', 8, 'conjuration',
    '1 действие', 'В пределах видимости', 'В, С', 'Концентрация, до 6 раундов',
    ['concentration', 'damage', 'control'],
    'Стена воды до 75 м длиной и 30 м высотой обрушивается на область. Существа в ней совершают спасбросок Силы, получая 6к10 дробящего урона; каждый ход стена слабеет и продвигается к вам.',
    { source: 'PHB', classes: ['Друид'] }
  ),
  // ── Заклинания 9 уровня (базовые, PHB / XGE / TCE) ────────────────
  spell(
    'gate', 'Врата', 9, 'conjuration',
    '1 действие', '60 фт.', 'В, С, М (алмаз стоимостью не менее 5000 с.м.)', 'Концентрация, до 1 минуты',
    ['concentration', 'utility'],
    'Вы открываете портал-кольцо, соединяющий ваш план с точкой на другом плане. Существа могут проходить сквозь него в обе стороны; вы также можете призвать конкретное существо, назвав его имя.',
    { source: 'PHB', classes: ['Жрец', 'Чародей', 'Волшебник'] }
  ),
  spell(
    'storm-of-vengeance', 'Гроза гнева', 9, 'conjuration',
    '1 действие', 'В пределах видимости', 'В, С', 'Концентрация, до 1 минуты',
    ['concentration', 'damage', 'control'],
    'Над областью радиусом 90 м собирается грозовая туча. Каждый ход она обрушивает новую кару — оглушающий гром, кислотный дождь, молнии, град и ледяной ветер — с соответствующими спасбросками и уроном.',
    { source: 'PHB', classes: ['Друид'] }
  ),
  spell(
    'true-polymorph', 'Истинное превращение', 9, 'transmutation',
    '1 действие', '30 фт.', 'В, С, М (капля ртути, комок гуммиарабика и струйка дыма)', 'Концентрация, до 1 часа',
    ['concentration', 'control'],
    'Вы превращаете видимое существо в другое существо или в предмет (несогласное — спасбросок Мудрости). Если поддерживать концентрацию весь час, превращение становится постоянным.',
    { source: 'PHB', classes: ['Бард', 'Волшебник'] }
  ),
  spell(
    'blade-of-disaster', 'Клинок разрушения', 9, 'conjuration',
    '1 бонусное действие', '60 фт.', 'В, С', 'Концентрация, до 1 минуты',
    ['concentration', 'damage'],
    'Вы создаёте клинок разрушительной силы. Бонусным действием вы перемещаете его до 9 м и совершаете им две атаки заклинанием, нанося по 3к12 урона силовым полем; критический удар — при выпадении 18–20.',
    { source: 'TCE', classes: ['Чародей', 'Волшебник', 'Колдун'] }
  ),
  spell(
    'mass-polymorph', 'Множественное превращение', 9, 'transmutation',
    '1 действие', '120 фт.', 'В, С, М (кокон гусеницы)', 'Концентрация, до 1 часа',
    ['concentration', 'control'],
    'Вы превращаете до десяти видимых существ в зверей ПО не выше их уровня (несогласные — спасбросок Мудрости), пока заклинание активно или пока форма не будет обнулена по хитам.',
    { source: 'XGE', classes: ['Бард', 'Чародей', 'Волшебник'] }
  ),
  spell(
    'invulnerability', 'Неуязвимость', 9, 'abjuration',
    '1 действие', 'На себя', 'В, С, М (крошечный кусочек адамантина стоимостью не менее 500 с.м., вплавленный в кожу)', 'Концентрация, до 10 минут',
    ['concentration', 'support'],
    'Пока заклинание активно, вы получаете иммунитет ко всему урону.',
    { source: 'XGE', classes: ['Волшебник'] }
  ),
  spell(
    'shapechange', 'Полное превращение', 9, 'transmutation',
    '1 действие', 'На себя', 'В, С, М (нефритовый круг стоимостью не менее 1500 с.м., надетый на тело)', 'Концентрация, до 1 часа',
    ['concentration', 'support'],
    'Пока заклинание активно, вы принимаете облик другого существа ПО не выше вашего уровня, сохраняя разум; вы получаете его игровые характеристики и способности и можете менять форму действием.',
    { source: 'PHB', classes: ['Друид', 'Волшебник'] }
  ),
  spell(
    'weird', 'Смертный ужас', 9, 'illusion',
    '1 действие', '120 фт.', 'В, С', 'Концентрация, до 1 минуты',
    ['concentration', 'damage', 'control'],
    'Вы воплощаете кошмары существ в области радиусом 9 м. Каждое совершает спасбросок Мудрости; при провале получает 4к10 урона психической энергией и становится испуганным, получая тот же урон в конце каждого своего хода.',
    { source: 'PHB', classes: ['Волшебник'] }
  ),
  // ── Заклинания 9 уровня без концентрации (базовые, PHB / XGE) ─────
  spell(
    'imprisonment', 'Заточение', 9, 'abjuration',
    '1 минута', '30 фт.', 'В, С, М (изображение цели и особый компонент по виду темницы стоимостью не менее 500 с.м. за Кость Хитов цели)', 'Пока не рассеется',
    ['control'],
    'Вы пытаетесь навечно заточить видимое существо. Оно совершает спасбросок Мудрости; при провале заключается в выбранную вами темницу — погребение, оковы, минимус-заточение, нишу забвения или бесконечный лабиринт, — пока заклинание не будет рассеяно.',
    { source: 'PHB', classes: ['Волшебник', 'Колдун'] }
  ),
  spell(
    'wish', 'Исполнение желаний', 9, 'conjuration',
    '1 действие', 'На себя', 'В', 'Мгновенная',
    ['utility'],
    'Могущественнейшее заклинание. Вы можете повторить эффект любого заклинания 8 уровня и ниже без соблюдения его условий — либо загадать собственное желание, меняющее реальность, с риском тяжёлых последствий и невозможности снова сотворить это заклинание.',
    { source: 'PHB', classes: ['Чародей', 'Волшебник'] }
  ),
  spell(
    'true-resurrection', 'Истинное воскрешение', 9, 'necromancy',
    '1 час', 'Касание', 'В, С, М (святая вода и алмазы стоимостью не менее 25 000 с.м., расходуются)', 'Мгновенная',
    ['healing'],
    'Вы касаетесь мёртвого существа (или называете его, если тела нет) и возвращаете его к жизни с полными хитами, исцеляя все раны, болезни, яды и проклятия и создавая новое тело при необходимости. Существо должно быть мертво не дольше 200 лет.',
    { source: 'PHB', classes: ['Жрец', 'Друид'] }
  ),
  spell(
    'meteor-swarm', 'Метеоритный дождь', 9, 'evocation',
    '1 действие', '1 миля', 'В, С', 'Мгновенная',
    ['damage'],
    'В четырёх точках в пределах дистанции с неба обрушиваются пылающие метеоры. Существа в сферах радиусом 12 м совершают спасбросок Ловкости, получая 20к6 урона огнём и 20к6 дробящего урона (половину при успехе).',
    { source: 'PHB', classes: ['Чародей', 'Волшебник'] }
  ),
  spell(
    'mass-heal', 'Множественное полное исцеление', 9, 'evocation',
    '1 действие', '60 фт.', 'В, С', 'Мгновенная',
    ['healing'],
    'Поток целительной энергии устремляется к существам по вашему выбору в пределах дистанции. Распределите между ними до 700 хитов; каждое к тому же избавляется от болезней, слепоты и глухоты.',
    { source: 'PHB', classes: ['Жрец'] }
  ),
  spell(
    'time-stop', 'Остановка времени', 9, 'transmutation',
    '1 действие', 'На себя', 'В', 'Мгновенная',
    ['utility'],
    'Время замирает для всех, кроме вас: вы получаете 1к4+1 хода подряд, в течение которых действуете обычно. Эффект прерывается, если ваше действие затронет другое существо или предмет, несомый другим.',
    { source: 'PHB', classes: ['Чародей', 'Волшебник', 'Изобретатель'] }
  ),
  spell(
    'foresight', 'Предвидение', 9, 'divination',
    '1 минута', 'Касание', 'В, С, М (перо колибри)', '8 часов',
    ['support'],
    'Согласное существо обретает проблеск будущего: на 8 часов оно не может быть застигнуто врасплох и совершает с преимуществом броски атаки, проверки и спасброски, а атакующие его — с помехой.',
    { source: 'PHB', classes: ['Бард', 'Друид', 'Волшебник', 'Колдун'] }
  ),
  spell(
    'astral-projection', 'Проекция в астрал', 9, 'necromancy',
    '1 час', '10 фт.', 'В, С, М (на каждое существо: гиацинт стоимостью не менее 1000 с.м. и резной серебряный брусок не менее 100 с.м.)', 'Особая',
    ['utility'],
    'Вы и ваши спутники проецируете свои астральные тела в Астральное море, оставляя физические тела в состоянии транса. Астральные тела связаны с телами серебряной нитью; её разрыв означает смерть.',
    { source: 'PHB', classes: ['Жрец', 'Волшебник', 'Колдун'] }
  ),
  spell(
    'psychic-scream', 'Психический крик', 9, 'enchantment',
    '1 действие', '90 фт.', 'С', 'Мгновенная',
    ['damage', 'control'],
    'Вы обрушиваете на до десяти видимых существ волну ментальной энергии. Каждое совершает спасбросок Интеллекта, получая 14к6 урона психической энергией и оглушение при провале; погибший от этого урона взрывается изнутри.',
    { source: 'XGE', classes: ['Бард', 'Чародей', 'Волшебник', 'Колдун'] }
  ),
  spell(
    'prismatic-wall', 'Радужная стена', 9, 'abjuration',
    '1 действие', '60 фт.', 'В, С', '10 минут',
    ['damage', 'control'],
    'Вы возводите мерцающую стену из семи разноцветных слоёв, каждый со своим эффектом. Проходящий сквозь стену по очереди минует все слои, совершая спасброски Ловкости и рискуя получить урон разных типов, ослепнуть, окаменеть или быть изгнанным.',
    { source: 'PHB', classes: ['Волшебник'] }
  ),
  spell(
    'power-word-heal', 'Слово силы: Исцеление', 9, 'evocation',
    '1 действие', 'Касание', 'В, С', 'Мгновенная',
    ['healing'],
    'Волна целительной энергии омывает существо. Оно восстанавливает все хиты, избавляется от очарования, испуга, паралича, оглушения и, если было недееспособно, может встать.',
    { source: 'PHB', classes: ['Бард', 'Жрец'] }
  ),
  spell(
    'power-word-kill', 'Слово силы: Смерть', 9, 'enchantment',
    '1 действие', '60 фт.', 'В', 'Мгновенная',
    ['control'],
    'Вы произносите слово силы, обрывающее жизнь. Если у видимой цели 100 хитов или меньше, она мгновенно умирает без спасброска.',
    { source: 'PHB', classes: ['Бард', 'Чародей', 'Волшебник', 'Колдун'] }
  ),
  // ── Заклинания 8 уровня без концентрации (базовые, PHB / XGE) ─────
  spell(
    'antipathy-or-sympathy', 'Антипатия/симпатия', 8, 'enchantment',
    '1 час', '60 фт.', 'В, С, М (для антипатии — квасцы в уксусе, для симпатии — капля мёда)', '10 дней',
    ['control'],
    'Вы налагаете на предмет или область магическое притяжение или отторжение к выбранному виду существ. Приближающееся (симпатия) или увидевшее (антипатия) существо совершает спасбросок Мудрости; при провале вынуждено стремиться к цели или в панике бежать от неё.',
    { source: 'PHB', classes: ['Друид', 'Волшебник', 'Колдун'] }
  ),
  spell(
    'clone', 'Двойник', 8, 'necromancy',
    '1 час', 'Касание', 'В, С, М (алмаз стоимостью не менее 1000 с.м., кусочек плоти цели и сосуд стоимостью не менее 2000 с.м.)', 'Мгновенная',
    ['utility'],
    'Вы выращиваете точную копию тела живого существа в особом сосуде. Если оригинал погибает, его душа переносится в готовый клон, воскрешая существо; клон созревает 120 дней.',
    { source: 'PHB', classes: ['Волшебник'] }
  ),
  spell(
    'demiplane', 'Демиплан', 8, 'conjuration',
    '1 действие', '60 фт.', 'С', '1 час',
    ['utility'],
    'Вы создаёте тенистую дверь в пустой демиплан-комнату 9×9×9 м. Дверь ведёт в один и тот же демиплан при каждом сотворении; через неё можно переносить существ и предметы туда и обратно.',
    { source: 'PHB', classes: ['Чародей', 'Волшебник', 'Колдун'] }
  ),
  spell(
    'mighty-fortress', 'Могучая крепость', 8, 'conjuration',
    '1 минута', '1 миля', 'В, С, М (алмаз стоимостью не менее 500 с.м., расходуется)', '7 дней',
    ['utility'],
    'Из земли поднимается квадратная каменная крепость со стеной, башнями и внутренними помещениями. Она стоит 7 дней (или дольше, если подновлять) и обставлена по вашему выбору.',
    { source: 'XGE', classes: ['Волшебник'] }
  ),
  spell(
    'glibness', 'Находчивость', 8, 'transmutation',
    '1 действие', 'На себя', 'В', '1 час',
    ['support'],
    'Пока заклинание активно, при любой проверке Харизмы вы можете считать бросок к20 равным 15, а магия не способна определить, лжёте ли вы.',
    { source: 'PHB', classes: ['Бард', 'Волшебник', 'Колдун'] }
  ),
  spell(
    'feeblemind', 'Слабоумие', 8, 'enchantment',
    '1 действие', '150 фт.', 'В, С, М (горсть глиняных, хрустальных, стеклянных или минеральных шариков)', 'Мгновенная',
    ['damage', 'control'],
    'Вы бьёте по разуму существа волной психической энергии. Оно получает 4к6 урона психической энергией и совершает спасбросок Интеллекта; при провале его Интеллект и Харизма падают до 1 — оно не может творить заклинания и понимать речь, пока эффект не снимут.',
    { source: 'PHB', classes: ['Бард', 'Друид', 'Чародей', 'Волшебник', 'Колдун'] }
  ),
  spell(
    'power-word-stun', 'Слово силы: Оглушение', 8, 'enchantment',
    '1 действие', '60 фт.', 'В', 'Мгновенная',
    ['control'],
    'Вы произносите слово силы, ошеломляющее разум. Если у видимой цели 150 хитов или меньше, она оглушена, пока не пройдёт спасбросок Телосложения в конце своего хода.',
    { source: 'PHB', classes: ['Бард', 'Чародей', 'Волшебник', 'Колдун'] }
  ),
  spell(
    'mind-blank', 'Сокрытие разума', 8, 'abjuration',
    '1 действие', 'Касание', 'В, С', '24 часа',
    ['support'],
    'Пока заклинание активно, существо получает иммунитет к психическому урону, чтению мыслей, прорицанию и очарованию, а также к заклинанию Исполнение желаний, направленному на его разум.',
    { source: 'PHB', classes: ['Бард', 'Волшебник'] }
  ),
  spell(
    'sunburst', 'Солнечный ожог', 8, 'evocation',
    '1 действие', '150 фт.', 'В, С, М (огонь и кусочек солнечного камня)', 'Мгновенная',
    ['damage', 'control'],
    'В точке вспыхивает ослепительный солнечный свет сферой радиусом 18 м. Существа в ней совершают спасбросок Телосложения, получая 12к6 урона излучением и слепоту при провале; нежить и слизи страдают особенно.',
    { source: 'PHB', classes: ['Друид', 'Чародей', 'Волшебник'] }
  ),
  spell(
    'telepathy', 'Телепатия', 8, 'evocation',
    '1 действие', 'Неограниченная', 'В, С, М (пара связанных серебряных колец)', '24 часа',
    ['utility'],
    'Пока заклинание активно, вы устанавливаете телепатическую связь с известным вам согласным существом на любом расстоянии на одном плане, обмениваясь словами, образами, звуками и ощущениями.',
    { source: 'PHB', classes: ['Волшебник'] }
  ),
  spell(
    'abi-dalzims-horrid-wilting', 'Ужасное увядание Аби-Далзима', 8, 'necromancy',
    '1 действие', '150 фт.', 'В, С, М (кусочек губки)', 'Мгновенная',
    ['damage'],
    'Из вас исходит иссушающая волна. Существа (кроме конструктов и нежити) в кубе 9 м совершают спасбросок Телосложения, получая 12к8 некротического урона (половину при успехе); растения и водные существа страдают сильнее.',
    { source: 'XGE', classes: ['Чародей', 'Волшебник'] }
  ),
  // ── Заклинания 7 уровня без концентрации (базовые, PHB / XGE / TCE) ──
  spell(
    'divine-word', 'Божественное слово', 7, 'evocation',
    '1 бонусное действие', '30 фт.', 'В', 'Мгновенная',
    ['control'],
    'Вы изрекаете первозданное слово творения. Существа по вашему выбору в пределах 9 м совершают спасбросок Харизмы; при провале, в зависимости от оставшихся хитов, оглушаются, слепнут, глохнут или гибнут, а исчадия и небожители могут быть изгнаны на родной план.',
    { source: 'PHB', classes: ['Жрец'] }
  ),
  spell(
    'mordenkainens-magnificent-mansion', 'Великолепный особняк Морденкайнена', 7, 'conjuration',
    '1 минута', '300 фт.', 'В, С, М (миниатюрная дверь из слоновой кости, полированный камешек и клочок магической ткани)', '24 часа',
    ['utility'],
    'Вы создаёте невидимую дверь в роскошный экстрапространственный особняк. Внутри чисто, светло, тепло и накрыт стол; призрачные слуги прислуживают гостям. Только вы решаете, кто может войти.',
    { source: 'PHB', classes: ['Бард', 'Волшебник'] }
  ),
  spell(
    'resurrection', 'Воскрешение', 7, 'necromancy',
    '1 час', 'Касание', 'В, С, М (алмаз стоимостью не менее 1000 с.м., расходуется)', 'Мгновенная',
    ['healing'],
    'Вы касаетесь мёртвого существа, умершего не дольше века, и возвращаете его к жизни с полными хитами, исцеляя раны, болезни и обычные яды (но не старение). Воскрешённого некоторое время преследует слабость.',
    { source: 'PHB', classes: ['Бард', 'Жрец'] }
  ),
  spell(
    'symbol', 'Знак', 7, 'abjuration',
    '1 минута', 'Касание', 'В, С, М (ртуть, фосфор и порошок алмаза и опала стоимостью не менее 1000 с.м.)', 'Пока не рассеется',
    ['control'],
    'Вы наносите на поверхность или в предмет губительную руну-глиф. При срабатывании (по заданному условию) она вспыхивает эффектом на выбор — смерть, отчаяние, испуг, боль, сон, оглушение, безумие или раздор — с соответствующим спасброском.',
    { source: 'PHB', classes: ['Бард', 'Жрец', 'Волшебник'] }
  ),
  spell(
    'sequester', 'Изоляция', 7, 'transmutation',
    '1 действие', 'Касание', 'В, С, М (порошок алмаза, изумруда, рубина и сапфира стоимостью не менее 5000 с.м., расходуется)', 'Пока не рассеется',
    ['utility'],
    'Прикосновением вы делаете существо или предмет невидимым и сокрытым от любого прорицания и слежения. Согласное существо погружается в стазис, не старея; сокрытие держится, пока не сработает заданное условие.',
    { source: 'PHB', classes: ['Волшебник'] }
  ),
  spell(
    'crown-of-stars', 'Корона звёзд', 7, 'evocation',
    '1 действие', 'На себя', 'В, С', '1 час',
    ['damage'],
    'Вокруг вашей головы вспыхивают семь звёзд. Бонусным действием вы швыряете одну в существо в пределах 36 м — дальнобойная атака заклинанием, 4к12 урона излучением. Пока горят четыре звезды и больше, вы источаете яркий свет.',
    { source: 'XGE', classes: ['Чародей', 'Волшебник', 'Колдун'] }
  ),
  spell(
    'fire-storm', 'Огненная буря', 7, 'evocation',
    '1 действие', '150 фт.', 'В, С', 'Мгновенная',
    ['damage'],
    'В пределах дистанции возникает ревущее пламя, охватывающее до десяти кубов 3 м. Существа в области совершают спасбросок Ловкости, получая 7к10 урона огнём (половину при успехе); по желанию растения в области не горят.',
    { source: 'PHB', classes: ['Жрец', 'Друид', 'Чародей'] }
  ),
  spell(
    'finger-of-death', 'Перст смерти', 7, 'necromancy',
    '1 действие', '60 фт.', 'В, С', 'Мгновенная',
    ['damage'],
    'Вы посылаете в цель волну некротической энергии. Существо совершает спасбросок Телосложения, получая 7к8+30 некротического урона (половину при успехе). Убитый этим заклинанием гуманоид восстаёт как послушный вам зомби.',
    { source: 'PHB', classes: ['Чародей', 'Волшебник', 'Колдун'] }
  ),
  spell(
    'simulacrum', 'Подобие', 7, 'illusion',
    '12 часов', 'Касание', 'В, С, М (снег или лёд в форме цели, частица её тела и порошок рубина стоимостью не менее 1500 с.м., расходуется)', 'Пока не рассеется',
    ['utility'],
    'Из снега или льда вы создаёте иллюзорную копию зверя или гуманоида с половиной его хитов. Копия послушна вам, обладает частью способностей оригинала, но не растёт и не восстанавливает ячейки; повреждения чинят арканной магией.',
    { source: 'PHB', classes: ['Волшебник'] }
  ),
  spell(
    'prismatic-spray', 'Радужные брызги', 7, 'evocation',
    '1 действие', 'На себя (конус 60 фт.)', 'В, С', 'Мгновенная',
    ['damage', 'control'],
    'Из вашей руки веером бьют восемь разноцветных лучей конусом 18 м. Каждое существо в конусе получает случайный луч (или несколько): урон разных типов, ослепление, окаменение, безумие или изгнание на другой план — со спасбросками Ловкости.',
    { source: 'PHB', classes: ['Чародей', 'Волшебник'] }
  ),
  spell(
    'regenerate', 'Регенерация', 7, 'transmutation',
    '1 минута', 'Касание', 'В, С, М (молитвенное колесо и святая вода)', '1 час',
    ['healing'],
    'Вы касаетесь существа: оно немедленно восстанавливает 4к8+15 хитов и в течение часа возвращает по 1 хиту в начале каждого своего хода, а также отращивает утраченные конечности и органы.',
    { source: 'PHB', classes: ['Бард', 'Жрец', 'Друид'] }
  ),
  spell(
    'power-word-pain', 'Слово силы: Боль', 7, 'enchantment',
    '1 действие', '60 фт.', 'В', 'Мгновенная',
    ['control'],
    'Вы произносите слово силы, обрушивающее мучительную боль. Если у видимой цели 100 хитов или меньше, она скована болью: скорость снижена, атаки и проверки с помехой, а концентрация под угрозой, пока цель не пройдёт спасбросок Телосложения.',
    { source: 'XGE', classes: ['Чародей', 'Волшебник', 'Колдун'] }
  ),
  spell(
    'dream-of-the-blue-veil', 'Сон синей вуали', 7, 'conjuration',
    '10 минут', 'Касание', 'В, С, М (предмет из мира назначения)', '6 часов',
    ['utility'],
    'Вы и до восьми согласных существ рядом переноситесь сквозь Синюю вуаль в иной мир мультивселенной, знакомый вам по предмету оттуда. Путешествие занимает 6 часов сна-транса.',
    { source: 'TCE', classes: ['Бард', 'Чародей', 'Волшебник', 'Колдун'] }
  ),
  spell(
    'mirage-arcane', 'Таинственный мираж', 7, 'illusion',
    '10 минут', 'В пределах видимости', 'В, С', '10 дней',
    ['control', 'utility'],
    'Вы иллюзорно преображаете местность в области до квадратной мили: лес кажется болотом, дорога — рекой и наоборот. Иллюзия затрагивает вид, звук, запах и осязание и держится до 10 дней.',
    { source: 'PHB', classes: ['Бард', 'Друид', 'Волшебник'] }
  ),
  spell(
    'teleport', 'Телепортация', 7, 'conjuration',
    '1 действие', '10 фт.', 'В', 'Мгновенная',
    ['utility'],
    'Вы мгновенно переносите себя и до восьми согласных существ (или один предмет) в известное вам место на том же плане. Точность переноса зависит от вашего знакомства с целью — возможен промах или сбой.',
    { source: 'PHB', classes: ['Бард', 'Чародей', 'Волшебник'] }
  ),
  spell(
    'forcecage', 'Узилище', 7, 'evocation',
    '1 действие', '100 фт.', 'В, С, М (рубиновая пыль стоимостью не менее 1500 с.м., расходуется)', '1 час',
    ['control'],
    'Вы создаёте непроницаемую тюрьму из силовых стен — сплошную клетку 3 м или решётчатую 6 м. Существо внутри не может выйти обычными средствами, а телепортация наружу требует успешного спасброска Харизмы.',
    { source: 'PHB', classes: ['Бард', 'Волшебник'] }
  ),
  spell(
    'plane-shift', 'Уход в иной мир', 7, 'conjuration',
    '1 действие', 'Касание', 'В, С, М (раздвоенный металлический жезл стоимостью не менее 250 с.м., настроенный на нужный план)', 'Мгновенная',
    ['utility'],
    'Вы и до восьми согласных существ (или, коснувшись несогласного, оно одно — спасбросок Харизмы) переноситесь на другой план бытия, в точку, заданную настроенным жезлом.',
    { source: 'PHB', classes: ['Жрец', 'Друид', 'Чародей', 'Волшебник', 'Колдун'] }
  ),
  spell(
    'temple-of-the-gods', 'Храм богов', 7, 'conjuration',
    '1 час', '120 фт.', 'В, С, М (священный символ стоимостью не менее 5 с.м.)', '24 часа',
    ['utility', 'support'],
    'Вы возводите храм своего божества в области до 45×45 м. В его стенах вы получаете преимущества освящённой земли: защиту от избранных существ, невозможность подслушивания и прочие благословения. При ежедневном подновлении храм становится постоянным.',
    { source: 'XGE', classes: ['Жрец'] }
  ),
  spell(
    'etherealness', 'Эфирность', 7, 'transmutation',
    '1 действие', 'На себя', 'В, С', 'До 8 часов',
    ['utility'],
    'Вы вступаете в пограничье Эфирного плана и, пока заклинание активно, можете свободно перемещаться, проходя сквозь предметы и существ материального мира, оставаясь для них невидимым и неосязаемым.',
    { source: 'PHB', classes: ['Бард', 'Жрец', 'Чародей', 'Волшебник', 'Колдун'] }
  ),
  // ── Заклинания 6 уровня без концентрации (базовые, PHB / XGE) ─────
  spell(
    'magic-jar', 'Волшебный сосуд', 6, 'necromancy',
    '1 минута', 'На себя', 'В, С, М (самоцвет, кристалл или реликварий стоимостью не менее 500 с.м.)', 'Пока не рассеется',
    ['control'],
    'Ваша душа покидает тело и вселяется в подготовленный сосуд. Оттуда вы можете попытаться захватить тело гуманоида поблизости (спасбросок Харизмы), вытеснив его душу в сосуд.',
    { source: 'PHB', classes: ['Волшебник'] }
  ),
  spell(
    'drawmijs-instant-summons', 'Дромиджево появление', 6, 'conjuration',
    '1 минута', 'Касание', 'В, С, М (сапфир стоимостью не менее 1000 с.м.)', 'Пока не рассеется',
    ['ritual', 'utility'],
    'Заранее наделив предмет-метку сапфиром, вы можете затем в любой момент призвать этот предмет к себе в руку с любого расстояния, даже с другого плана.',
    { source: 'PHB', classes: ['Волшебник'] }
  ),
  spell(
    'programmed-illusion', 'Заданная иллюзия', 6, 'illusion',
    '1 действие', '120 фт.', 'В, С, М (нефритовая пыль стоимостью не менее 25 с.м.)', 'Пока не рассеется',
    ['utility'],
    'Вы создаёте иллюзию предмета, существа или явления, которая срабатывает при заданном условии и разыгрывает заранее прописанное представление до 5 минут.',
    { source: 'PHB', classes: ['Бард', 'Волшебник'] }
  ),
  spell(
    'forbiddance', 'Запрет', 6, 'abjuration',
    '10 минут', 'Касание', 'В, С, М (святая вода, благовония и порошок рубина стоимостью не менее 1000 с.м.)', '1 день',
    ['ritual', 'control', 'damage'],
    'Вы освящаете область до 40 000 кв. футов против магического перемещения и определённого вида существ. Такие существа, входя в область, получают 5к10 урона излучением или некротической энергией, а телепортация в неё блокируется.',
    { source: 'PHB', classes: ['Жрец'] }
  ),
  spell(
    'true-seeing', 'Истинное зрение', 6, 'divination',
    '1 действие', 'Касание', 'В, С, М (мазь для глаз стоимостью не менее 25 с.м., расходуется)', '1 час',
    ['utility'],
    'Существо получает истинное зрение на 36 м: видит в темноте, замечает невидимое, распознаёт иллюзии и изменённый облик и заглядывает в Эфирный план — на 1 час.',
    { source: 'PHB', classes: ['Бард', 'Жрец', 'Чародей', 'Волшебник', 'Колдун'] }
  ),
  spell(
    'soul-cage', 'Клетка душ', 6, 'necromancy',
    '1 реакция', '60 фт.', 'В, С, М (крошечная серебряная клетка стоимостью не менее 100 с.м.)', '8 часов',
    ['utility'],
    'Реакцией на смерть гуманоида рядом вы захватываете его ускользающую душу в клетку. Затем вы можете тратить её заряды: красть жизнь, менять бросок, узнавать ответы или видеть его глазами.',
    { source: 'XGE', classes: ['Волшебник', 'Колдун'] }
  ),
  spell(
    'bones-of-the-earth', 'Кости земли', 6, 'transmutation',
    '1 действие', '120 фт.', 'В, С', 'Мгновенная',
    ['damage', 'control'],
    'Из земли вырастают каменные колонны до 9 м высотой. Существо над колонной может быть подброшено; оказавшееся между колонной и препятствием получает 6к6 дробящего урона (спасбросок Ловкости, чтобы избежать).',
    { source: 'XGE', classes: ['Друид'] }
  ),
  spell(
    'circle-of-death', 'Круг смерти', 6, 'necromancy',
    '1 действие', '150 фт.', 'В, С, М (порошок растёртой чёрной жемчужины стоимостью не менее 500 с.м.)', 'Мгновенная',
    ['damage'],
    'Волна отрицательной энергии сферой радиусом 18 м прокатывается из точки. Существа в ней совершают спасбросок Телосложения, получая 8к6 некротического урона (половину при успехе).',
    { source: 'PHB', classes: ['Чародей', 'Волшебник', 'Колдун'] }
  ),
  spell(
    'mass-suggestion', 'Множественное внушение', 6, 'enchantment',
    '1 действие', '60 фт.', 'В, М (язык змеи и капля мёда или сладкого масла)', '24 часа',
    ['control'],
    'Вы внушаете разумный курс действий до двенадцати существ, слышащих вас. Каждое совершает спасбросок Мудрости; при провале старается выполнить внушение до суток.',
    { source: 'PHB', classes: ['Бард', 'Чародей', 'Волшебник', 'Колдун'] }
  ),
  spell(
    'otilukes-freezing-sphere', 'Отилюков ледяной шар', 6, 'evocation',
    '1 действие', '300 фт.', 'В, С, М (маленькая хрустальная сфера)', 'Мгновенная',
    ['damage'],
    'Вы метаете шарик ледяного холода, взрывающийся сферой радиусом 18 м. Существа в ней совершают спасбросок Телосложения, получая 10к6 урона холодом (половину при успехе); вода в области замерзает.',
    { source: 'PHB', classes: ['Волшебник'] }
  ),
  spell(
    'heroes-feast', 'Пир героев', 6, 'conjuration',
    '10 минут', '30 фт.', 'В, С, М (украшенная самоцветами чаша стоимостью не менее 1000 с.м., расходуется)', 'Мгновенная',
    ['healing', 'support'],
    'Вы устраиваете волшебный пир на до двенадцати существ. Отобедавшие исцеляются, получают иммунитет к яду и испугу, преимущество на спасброски Мудрости и +2к10 к максимуму хитов на 24 часа.',
    { source: 'PHB', classes: ['Жрец', 'Друид'] }
  ),
  spell(
    'planar-ally', 'Планарный союзник', 6, 'conjuration',
    '10 минут', '60 фт.', 'В, С', 'Мгновенная',
    ['support'],
    'Вы взываете к своему божеству, и оно присылает верного слугу — небожителя, исчадие или элементаля. Существо не обязано подчиняться и торгуется за плату; вы договариваетесь о службе.',
    { source: 'PHB', classes: ['Жрец'] }
  ),
  spell(
    'chain-lightning', 'Пляшущая молния', 6, 'evocation',
    '1 действие', '150 фт.', 'В, С, М (клочок меха, янтарный или хрустальный стержень и три серебряные булавки)', 'Мгновенная',
    ['damage'],
    'Молния бьёт в цель, а затем перескакивает ещё на три существа в пределах 9 м. Каждая цель совершает спасбросок Ловкости, получая 10к8 урона электричеством (половину при успехе).',
    { source: 'PHB', classes: ['Чародей', 'Волшебник'] }
  ),
  spell(
    'heal', 'Полное исцеление', 6, 'evocation',
    '1 действие', '60 фт.', 'В, С', 'Мгновенная',
    ['healing'],
    'Целительная энергия наполняет существо: оно восстанавливает 70 хитов и избавляется от слепоты, глухоты и любых болезней.',
    { source: 'PHB', classes: ['Жрец', 'Друид'] }
  ),
  spell(
    'harm', 'Поражение', 6, 'necromancy',
    '1 действие', '60 фт.', 'В, С', 'Мгновенная',
    ['damage'],
    'Вы наполняете существо болезнетворной энергией. Оно совершает спасбросок Телосложения, получая 14к6 некротического урона (половину при успехе); при провале его максимум хитов снижается на этот урон до долгого отдыха.',
    { source: 'PHB', classes: ['Жрец'] }
  ),
  spell(
    'contingency', 'Предосторожность', 6, 'evocation',
    '10 минут', 'На себя', 'В, С, М (статуэтка вас стоимостью не менее 1500 с.м.)', '10 дней',
    ['utility'],
    'Вы заготавливаете заклинание 5 уровня и ниже, которое сработает автоматически при заданном вами условии, не требуя действия и концентрации в тот момент.',
    { source: 'PHB', classes: ['Волшебник'] }
  ),
  spell(
    'transport-via-plants', 'Путешествие через растения', 6, 'conjuration',
    '1 действие', '10 фт.', 'В, С', '1 раунд',
    ['utility'],
    'Вы создаёте магический проход между двумя крупными растениями на одном плане. В течение раунда существа могут пройти сквозь одно и выйти из другого на любом расстоянии.',
    { source: 'PHB', classes: ['Друид'] }
  ),
  spell(
    'scatter', 'Раскидывание', 6, 'conjuration',
    '1 действие', '30 фт.', 'В', 'Мгновенная',
    ['control', 'utility'],
    'Вы телепортируете до пяти существ в пределах 9 м. Несогласное существо совершает спасбросок Харизмы; при провале переносится в видимое вами свободное пространство в пределах 36 м.',
    { source: 'XGE', classes: ['Чародей', 'Волшебник', 'Колдун'] }
  ),
  spell(
    'disintegrate', 'Распад', 6, 'transmutation',
    '1 действие', '60 фт.', 'В, С, М (магнетит и щепотка пыли)', 'Мгновенная',
    ['damage'],
    'Тонкий зелёный луч бьёт по цели. Существо или предмет совершает спасбросок Ловкости, получая 10к6+40 урона силовым полем; убитое этим уроном существо рассыпается в прах вместе со снаряжением.',
    { source: 'PHB', classes: ['Чародей', 'Волшебник', 'Изобретатель'] }
  ),
  spell(
    'druid-grove', 'Роща друида', 6, 'abjuration',
    '10 минут', 'Касание', 'В, С, М (омела, побеги ели, остролист и дубовые листья)', 'Пока не рассеется',
    ['control'],
    'Вы освящаете лесной участок до 90×90 футов, наделяя его стражами: скрытыми тревогами, оживающими растениями-хищниками, иллюзорными искажениями и порывами, отбрасывающими незваных гостей.',
    { source: 'XGE', classes: ['Друид'] }
  ),
  spell(
    'word-of-recall', 'Слово возврата', 6, 'conjuration',
    '1 действие', '5 фт.', 'В', 'Мгновенная',
    ['utility'],
    'Вы и до пяти согласных существ рядом мгновенно телепортируетесь в заранее освящённое убежище, которое вы назначили.',
    { source: 'PHB', classes: ['Жрец'] }
  ),
  spell(
    'create-homunculus', 'Сотворение гомункула', 6, 'transmutation',
    '1 час', 'Касание', 'В, С, М (глина, зола и корень мандрагоры, а также усыпанный самоцветами кинжал стоимостью не менее 1000 с.м.)', 'Мгновенная',
    ['utility'],
    'Из глины, золы и корня мандрагоры вы создаёте гомункула, влив в него частицу собственной жизненной силы. Он служит вам и может хранить в себе заклинание для будущего использования.',
    { source: 'XGE', classes: ['Волшебник'] }
  ),
  spell(
    'create-undead', 'Сотворение нежити', 6, 'necromancy',
    '1 минута', '10 фт.', 'В, С, М (глиняный горшок могильной земли, горшок затхлой воды и по чёрному ониксу стоимостью не менее 150 с.м. за каждый труп)', 'Мгновенная',
    ['utility'],
    'В ночной тьме вы обращаете до трёх трупов в упырей (или более могущественную нежить на высоких ячейках), послушных вашим командам сутки; приказ можно продлевать.',
    { source: 'PHB', classes: ['Жрец', 'Волшебник', 'Колдун'] }
  ),
  spell(
    'guards-and-wards', 'Стражи', 6, 'abjuration',
    '10 минут', 'Касание', 'В, С, М (благовония, немного серы и масла, узловатая бечёвка, капля крови грязевого крушира и серебряный жезл стоимостью не менее 10 с.м.)', '24 часа',
    ['control'],
    'Вы опутываете строение до 2500 кв. футов сетью защитных чар: туман, паутина, запертые и замаскированные двери, оглушающие звуки и иные преграды по вашему выбору. Держится сутки, при подновлении — постоянно.',
    { source: 'PHB', classes: ['Бард', 'Волшебник'] }
  ),
  spell(
    'wind-walk', 'Хождение по ветру', 6, 'transmutation',
    '1 минута', '30 фт.', 'В, С, М (огонь и святая вода)', '8 часов',
    ['utility'],
    'Вы и до десяти согласных существ обращаетесь в подобие газовых облаков и получаете скорость полёта 300 футов, странствуя по небу; принять облачную форму или вернуться занимает 1 минуту.',
    { source: 'PHB', classes: ['Друид'] }
  ),
  // ── Заклинания 5 уровня без концентрации (базовые, PHB / XGE) ─────
  spell(
    'dream', 'Вещий сон', 5, 'illusion',
    '1 минута', 'Особая', 'В, С, М (горсть песка, капля чернил и писчее перо, выдернутое у спящей птицы)', '8 часов',
    ['utility'],
    'Вы или посланник являетесь во сне известному вам существу на том же плане, передавая ему послание. Как кошмар, сон лишает цель отдыха и наносит 3к6 урона психической энергией (спасбросок Мудрости).',
    { source: 'PHB', classes: ['Бард', 'Друид', 'Волшебник', 'Колдун'] }
  ),
  spell(
    'conjure-volley', 'Вызов залпа', 5, 'conjuration',
    '1 действие', '150 фт.', 'В, С, М (один снаряд или метательное оружие)', 'Мгновенная',
    ['damage'],
    'Взмахнув снарядом, вы обрушиваете залп призрачного оружия на область цилиндром радиусом 12 м. Существа в ней совершают спасбросок Ловкости, получая 8к8 урона (типа оружия) — половину при успехе.',
    { source: 'PHB', classes: ['Следопыт'] }
  ),
  spell(
    'greater-restoration', 'Высшее восстановление', 5, 'abjuration',
    '1 действие', 'Касание', 'В, С, М (алмазная пыль стоимостью не менее 100 с.м., расходуется)', 'Мгновенная',
    ['support'],
    'Целительная магия снимает с существа одно тяжкое воздействие: истощение, очарование, окаменение, снижение характеристики или максимума хитов либо родовое проклятие.',
    { source: 'PHB', classes: ['Бард', 'Жрец', 'Друид', 'Волшебник'] }
  ),
  spell(
    'contagion', 'Заражение', 5, 'necromancy',
    '1 действие', 'Касание', 'В, С', '7 дней',
    ['damage', 'control'],
    'Вашим прикосновением-атакой вы заражаете цель болезнью. Она трижды совершает спасбросок Телосложения; после трёх провалов болезнь охватывает её полностью, а три успеха снимают заражение.',
    { source: 'PHB', classes: ['Жрец', 'Друид'] }
  ),
  spell(
    'legend-lore', 'Знание легенд', 5, 'divination',
    '10 минут', 'На себя', 'В, С, М (благовония стоимостью не менее 250 с.м. и четыре пластинки слоновой кости не менее 50 с.м. каждая)', 'Мгновенная',
    ['utility'],
    'Вы взываете к знанию о знаменитом человеке, месте или предмете. Мастер сообщает вам известные легенды и сведения — в виде ясных фактов, стихов или загадок.',
    { source: 'PHB', classes: ['Бард', 'Жрец', 'Волшебник'] }
  ),
  spell(
    'cone-of-cold', 'Конус холода', 5, 'evocation',
    '1 действие', 'На себя (конус 60 фт.)', 'В, С, М (маленький кристалл или стеклянный конус)', 'Мгновенная',
    ['damage'],
    'Из вашей руки вырывается волна ледяного холода конусом 18 м. Существа в нём совершают спасбросок Телосложения, получая 8к8 урона холодом (половину при успехе); убитые превращаются в замёрзшие статуи.',
    { source: 'PHB', classes: ['Чародей', 'Волшебник', 'Изобретатель'] }
  ),
  spell(
    'teleportation-circle', 'Круг телепортации', 5, 'conjuration',
    '1 минута', '10 фт.', 'В, М (редкие мелки и чернила стоимостью не менее 50 с.м., расходуются)', '1 раунд',
    ['utility'],
    'Вы чертите на полу светящийся круг телепортации, открывающий проход к постоянному кругу назначения, чьи руны вам известны. Проход держится один раунд.',
    { source: 'PHB', classes: ['Бард', 'Чародей', 'Волшебник'] }
  ),
  spell(
    'rarys-telepathic-bond', 'Ментальная связь Рэри', 5, 'divination',
    '1 действие', '30 фт.', 'В, С, М (кусочки яичной скорлупы двух разных существ)', '1 час',
    ['ritual', 'utility'],
    'Вы связываете телепатической нитью до восьми согласных существ. Пока связь держится, они могут безмолвно общаться друг с другом на любом расстоянии на одном плане.',
    { source: 'PHB', classes: ['Волшебник'] }
  ),
  spell(
    'mass-cure-wounds', 'Множественное лечение ран', 5, 'evocation',
    '1 действие', '60 фт.', 'В, С', 'Мгновенная',
    ['healing'],
    'Целительная энергия омывает до шести существ в пределах дистанции; каждое восстанавливает 3к8 + ваш модификатор заклинательной характеристики хитов.',
    { source: 'PHB', classes: ['Бард', 'Жрец', 'Друид'] }
  ),
  spell(
    'flame-strike', 'Небесный огонь', 5, 'evocation',
    '1 действие', '60 фт.', 'В, С, М (щепотка серы)', 'Мгновенная',
    ['damage'],
    'С небес обрушивается столб божественного огня радиусом 3 м. Существа в нём совершают спасбросок Ловкости, получая 4к6 урона огнём и 4к6 урона излучением (половину при успехе).',
    { source: 'PHB', classes: ['Жрец'] }
  ),
  spell(
    'geas', 'Обет', 5, 'enchantment',
    '1 минута', '60 фт.', 'В', '30 дней',
    ['control'],
    'Вы налагаете на существо магический обет-приказ. Оно совершает спасбросок Мудрости; при провале, нарушая приказ, получает 5к10 урона психической энергией (не чаще раза в день), пока заклинание активно.',
    { source: 'PHB', classes: ['Бард', 'Жрец', 'Друид', 'Паладин', 'Волшебник'] }
  ),
  spell(
    'commune', 'Общение', 5, 'divination',
    '1 минута', 'На себя', 'В, С, М (благовония и склянка святой или нечистой воды)', '1 минута',
    ['ritual', 'utility'],
    'Вы задаёте своему божеству до трёх вопросов, требующих ответа «да/нет», и получаете правдивые ответы в пределах его ведома.',
    { source: 'PHB', classes: ['Жрец'] }
  ),
  spell(
    'commune-with-nature', 'Общение с природой', 5, 'divination',
    '1 минута', 'На себя', 'В, С', 'Мгновенная',
    ['ritual', 'utility'],
    'Вы сливаетесь с природой и узнаёте о местности вокруг (на 5 км под открытым небом или 90 м под землёй) до трёх фактов: расположение вод, поселений, могучих существ, растений и подобного.',
    { source: 'PHB', classes: ['Друид', 'Следопыт'] }
  ),
  spell(
    'raise-dead', 'Оживление', 5, 'necromancy',
    '1 час', 'Касание', 'В, С, М (алмаз стоимостью не менее 500 с.м., расходуется)', 'Мгновенная',
    ['healing'],
    'Вы возвращаете к жизни существо, умершее не дольше 10 дней, с 1 хитом. Заклинание не восстанавливает недостающие части тела; воскрешённого преследует временная слабость.',
    { source: 'PHB', classes: ['Бард', 'Жрец', 'Паладин'] }
  ),
  spell(
    'planar-binding', 'Планарные узы', 5, 'abjuration',
    '1 час', '60 фт.', 'В, С, М (драгоценность стоимостью не менее 1000 с.м., расходуется)', '24 часа',
    ['control'],
    'Вы пытаетесь подчинить своей воле призванного небожителя, элементаля, фею или исчадие. Существо совершает спасбросок Харизмы; при провале обязано служить вам сутки.',
    { source: 'PHB', classes: ['Бард', 'Жрец', 'Друид', 'Волшебник', 'Колдун'] }
  ),
  spell(
    'negative-energy-flood', 'Поток негативной энергии', 5, 'necromancy',
    '1 действие', '60 фт.', 'В, С, М (сломанная кость и лоскут чёрного шёлка)', 'Мгновенная',
    ['damage'],
    'Вы обрушиваете на существо поток отрицательной энергии. Оно совершает спасбросок Телосложения, получая 5к12 некротического урона (при успехе вдвое меньше); убитое поднимается как зомби.',
    { source: 'XGE', classes: ['Волшебник', 'Колдун'] }
  ),
  spell(
    'transmute-rock', 'Преобразование камня', 5, 'transmutation',
    '1 действие', '120 фт.', 'В, С, М (глина и вода)', 'Пока не рассеется',
    ['control'],
    'Вы обращаете камень в грязь (или грязь в камень) в кубе с ребром 12 м. Грязь становится труднопроходимой трясиной; отвердевание грязи может защемить или сбросить существ (спасбросок Ловкости).',
    { source: 'XGE', classes: ['Друид', 'Волшебник', 'Изобретатель'] }
  ),
  spell(
    'seeming', 'Притворство', 5, 'illusion',
    '1 действие', '30 фт.', 'В, С', '8 часов',
    ['utility'],
    'Вы меняете внешность любого числа существ в пределах дистанции: одежду, черты, размеры в небольших пределах. Несогласная цель совершает спасбросок Харизмы; изучающий иллюзию может распознать её проверкой.',
    { source: 'PHB', classes: ['Бард', 'Чародей', 'Волшебник'] }
  ),
  spell(
    'awaken', 'Пробуждение разума', 5, 'transmutation',
    '8 часов', 'Касание', 'В, С, М (агат стоимостью не менее 1000 с.м., расходуется)', 'Мгновенная',
    ['utility'],
    'За 8 часов таинства вы пробуждаете разум зверя или растения: оно обретает Интеллект 10, речь, подвижность (для растения) и на 30 дней становится дружественным к вам.',
    { source: 'PHB', classes: ['Бард', 'Друид'] }
  ),
  spell(
    'destructive-wave', 'Разрушительная волна', 5, 'evocation',
    '1 действие', 'На себя (радиус 30 фт.)', 'В', 'Мгновенная',
    ['damage'],
    'От вас во все стороны прокатывается волна божественной силы радиусом 9 м. Существа на земле совершают спасбросок Телосложения, получая 5к6 урона звуком и 5к6 урона излучением или некротической энергией, и падают ничком.',
    { source: 'PHB', classes: ['Паладин'] }
  ),
  spell(
    'reincarnate', 'Реинкарнация', 5, 'transmutation',
    '1 час', 'Касание', 'В, С, М (редкие масла и притирания стоимостью не менее 1000 с.м., расходуются)', 'Мгновенная',
    ['healing', 'utility'],
    'Вы касаетесь останков существа, умершего не дольше 10 дней, и возвращаете его к жизни в новом, случайно определённом теле-расе, с полными хитами.',
    { source: 'PHB', classes: ['Друид'] }
  ),
  spell(
    'contact-other-plane', 'Связь с иным миром', 5, 'divination',
    '1 минута', 'На себя', 'В', '1 минута',
    ['ritual', 'utility'],
    'Вы мысленно связываетесь с сущностью иного плана ради знаний. Спасбросок Интеллекта: при провале вы получаете 6к6 урона психической энергией и безумие; при успехе можете задать до пяти вопросов «да/нет».',
    { source: 'PHB', classes: ['Волшебник', 'Колдун'] }
  ),
  spell(
    'hallow', 'Святилище', 5, 'evocation',
    '24 часа', 'Касание', 'В, С, М (травы, масла и благовония стоимостью не менее 1000 с.м., расходуются)', 'Пока не рассеется',
    ['control', 'support'],
    'За сутки обряда вы освящаете область радиусом до 18 м, ограждая её от избранных видов существ и наделяя дополнительным эффектом на выбор — покоем, тьмой, языками, страхом и подобным.',
    { source: 'PHB', classes: ['Жрец'] }
  ),
  spell(
    'synaptic-static', 'Синаптический разряд', 5, 'enchantment',
    '1 действие', '120 фт.', 'В, С', 'Мгновенная',
    ['damage', 'control'],
    'Вы бьёте по разумам существ в сфере радиусом 6 м. Каждое совершает спасбросок Интеллекта, получая 8к6 урона психической энергией (половину при успехе); при провале — помеха на атаки и проверки на минуту.',
    { source: 'XGE', classes: ['Бард', 'Чародей', 'Волшебник', 'Колдун'] }
  ),
  spell(
    'passwall', 'Создание прохода', 5, 'transmutation',
    '1 действие', '30 фт.', 'В, С, М (щепотка кунжутных семян)', '1 час',
    ['utility'],
    'Вы создаёте проход сквозь дерево, штукатурку или камень: коридор до 6 м глубиной, 1,5 м шириной и 2,4 м высотой, существующий 1 час.',
    { source: 'PHB', classes: ['Волшебник'] }
  ),
  spell(
    'creation', 'Сотворение', 5, 'illusion',
    '1 минута', '30 фт.', 'В, С, М (крошечный кусочек вещества того же вида, что и создаваемый предмет)', 'Особая',
    ['utility'],
    'Из теневого вещества вы создаёте неживой предмет из растительной или минеральной материи (куб до 1,5 м). Долговечность зависит от материала: от минут до нескольких часов.',
    { source: 'PHB', classes: ['Чародей', 'Волшебник'] }
  ),
  spell(
    'steel-wind-strike', 'Удар стального ветра', 5, 'conjuration',
    '1 действие', '30 фт.', 'В, С, М (рукопашное оружие стоимостью не менее 1 с.м.)', 'Мгновенная',
    ['damage'],
    'Взмахнув оружием, вы вспышкой перемещаетесь и атакуете: выберите до пяти видимых существ, по каждому — атака заклинанием с 6к10 урона силовым полем, после чего вы телепортируетесь рядом с одним из них.',
    { source: 'XGE', classes: ['Следопыт', 'Волшебник'] }
  )
]
