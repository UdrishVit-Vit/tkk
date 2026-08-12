import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const OUTPUT = resolve(ROOT, 'app/data/dnd55e/bestiary2024.json')
const DATA_REVISION = 'e5f3e77b303a92df10487207857200245e71957c'
const DATA_ROOT = `https://raw.githubusercontent.com/5etools-mirror-3/5etools-src/${DATA_REVISION}/data/bestiary`
const RUSSIAN_DATA_ROOT = 'https://new.ttg.club/api/v2/bestiary'

const SOURCE_FILES = {
  MM: 'bestiary-xmm.json',
  PHB: 'bestiary-xphb.json',
  DMG: 'bestiary-xdmg.json'
}

const SOURCE_TITLES = {
  MM: 'Бестиарий',
  PHB: 'Книга игрока',
  DMG: 'Руководство Мастера'
}

const CREATURES = [
  ['Avatar of Death', 'Аватар смерти', 'DMG'],
  ['Giant Insect', 'Гигантское насекомое', 'PHB'],
  ['Aberrant Spirit', 'Дух аберрации', 'PHB'],
  ['Draconic Spirit', 'Дух дракона', 'PHB'],
  ['Bestial Spirit', 'Дух зверя', 'PHB'],
  ['Fiendish Spirit', 'Дух исчадия', 'PHB'],
  ['Construct Spirit', 'Дух конструкта', 'PHB'],
  ['Celestial Spirit', 'Дух небожителя', 'PHB'],
  ['Undead Spirit', 'Дух нежити', 'PHB'],
  ['Fey Spirit', 'Дух феи', 'PHB'],
  ['Elemental Spirit', 'Дух элементаля', 'PHB'],
  ['Beast of the Sea', 'Морской зверь', 'PHB'],
  ['Beast of the Land', 'Наземный зверь', 'PHB'],
  ['Beast of the Sky', 'Небесный зверь', 'PHB'],
  ['Animated Object', 'Оживлённый предмет', 'PHB'],
  ['Otherworldly Steed', 'Потусторонний скакун', 'PHB'],
  ['Baboon', 'Бабуин', 'MM'],
  ['Badger', 'Барсук', 'MM'],
  ['Shrieker Fungus', 'Визгун', 'MM'],
  ['Raven', 'Ворон', 'MM'],
  ['Giant Fly', 'Гигантская муха', 'DMG'],
  ['Giant Fire Beetle', 'Гигантский огненный жук', 'MM'],
  ['Hyena', 'Гиена', 'MM'],
  ['Homunculus', 'Гомункул', 'MM'],
  ['Vulture', 'Гриф', 'MM'],
  ['Goat', 'Козёл', 'MM'],
  ['Cat', 'Кошка', 'MM'],
  ['Crab', 'Краб', 'MM'],
  ['Rat', 'Крыса', 'MM'],
  ['Weasel', 'Куница', 'MM'],
  ['Larva', 'Ларва', 'MM'],
  ['Lemure', 'Лемур', 'MM'],
  ['Bat', 'Летучая мышь', 'MM'],
  ['Frog', 'Лягушка', 'MM'],
  ['Seahorse', 'Морской конёк', 'MM'],
  ['Commoner', 'Обыватель', 'MM'],
  ['Deer', 'Олень', 'MM'],
  ['Eagle', 'Орёл', 'MM'],
  ['Octopus', 'Осьминог', 'MM'],
  ['Spider', 'Паук', 'MM'],
  ['Piranha', 'Пиранья', 'MM'],
  ['Crawling Claw', 'Ползающая рука', 'MM'],
  ['Awakened Shrub', 'Пробуждённый куст', 'MM'],
  ['Myconid Sprout', 'Росток миконида', 'MM'],
  ['Scorpion', 'Скорпион', 'MM'],
  ['Jackal', 'Шакал', 'MM'],
  ['Hawk', 'Ястреб', 'MM'],
  ['Lizard', 'Ящерица', 'MM'],
  ['Bandit', 'Бандит', 'MM'],
  ['Noble', 'Благородный', 'MM'],
  ['Camel', 'Верблюд', 'MM'],
  ['Twig Blight', 'Ветвистая зараза', 'MM'],
  ['Warrior Infantry', 'Воин пехотинец', 'MM'],
  ['Giant Rat', 'Гигантская крыса', 'MM'],
  ['Giant Weasel', 'Гигантская куница', 'MM'],
  ['Giant Owl', 'Гигантская сова', 'MM'],
  ['Giant Crab', 'Гигантский краб', 'MM'],
  ['Goblin Minion', 'Гоблин прислужник', 'MM'],
  ['Kobold Warrior', 'Кобольд воин', 'MM'],
  ['Blood Hawk', 'Кровавый ястреб', 'MM'],
  ['Stirge', 'Кровопийца', 'MM'],
  ['Cultist', 'Культист', 'MM'],
  ['Flying Snake', 'Летающая змея', 'MM'],
  ['Adult Gold Dragon', 'Взрослый золотой дракон', 'MM'],
  ['Adult Red Dragon', 'Взрослый красный дракон', 'MM'],
  ['Goristro', 'Гористо', 'MM'],
  ['Dracolich', 'Драколич', 'MM'],
  ['Dragon Turtle', 'Дракочерепаха', 'MM'],
  ['Death Knight', 'Рыцарь смерти', 'MM'],
  ['Sphinx of Valor', 'Сфинкс доблести', 'MM'],
  ['Demilich', 'Демилич', 'MM'],
  ['Balor', 'Балор', 'MM'],
  ['Animal Lord', 'Владыка зверей', 'MM'],
  ['Ancient White Dragon', 'Древний белый дракон', 'MM'],
  ['Ancient Brass Dragon', 'Древний латунный дракон', 'MM'],
  ['Pit Fiend', 'Исчадие пропасти', 'MM'],
  ['Arch-hag', 'Архикарга', 'MM'],
  ['Ancient Copper Dragon', 'Древний медный дракон', 'MM'],
  ['Ancient Black Dragon', 'Древний чёрный дракон', 'MM'],
  ['Lich', 'Лич', 'MM'],
  ['Solar', 'Солар', 'MM'],
  ['Ancient Bronze Dragon', 'Древний бронзовый дракон', 'MM'],
  ['Ancient Green Dragon', 'Древний зелёный дракон', 'MM'],
  ['Elemental Cataclysm', 'Стихийный катаклизм', 'MM'],
  ['Ancient Silver Dragon', 'Древний серебряный дракон', 'MM'],
  ['Ancient Blue Dragon', 'Древний синий дракон', 'MM'],
  ['Blob of Annihilation', 'Капля аннигиляции', 'MM'],
  ['Kraken', 'Кракен', 'MM'],
  ['Empyrean', 'Эмпирей', 'MM'],
  ['Ancient Gold Dragon', 'Древний золотой дракон', 'MM'],
  ['Ancient Red Dragon', 'Древний красный дракон', 'MM'],
  ['Colossus', 'Колосс', 'MM'],
  ['Tarrasque', 'Тарраск', 'MM']
]

const TYPE_LABELS = {
  aberration: 'Аберрация', beast: 'Зверь', celestial: 'Небожитель', construct: 'Конструкт',
  dragon: 'Дракон', elemental: 'Элементаль', fey: 'Фея', fiend: 'Исчадие',
  humanoid: 'Гуманоид', monstrosity: 'Монстр', ooze: 'Слизь', plant: 'Растение', undead: 'Нежить'
}

const TAG_LABELS = {
  angel: 'ангел', chromatic: 'цветной', demon: 'демон', devil: 'дьявол',
  goblinoid: 'гоблиноид', metallic: 'металлический', titan: 'титан', wizard: 'волшебник'
}
const SIZE_LABELS = { T: 'Крошечный', S: 'Маленький', M: 'Средний', L: 'Большой', H: 'Огромный', G: 'Громадный' }
const ABILITY_LABELS = { str: 'Сил', dex: 'Лов', con: 'Тел', int: 'Инт', wis: 'Мдр', cha: 'Хар' }
const DAMAGE_LABELS = {
  acid: 'кислота', bludgeoning: 'дробящий', cold: 'холод', fire: 'огонь', force: 'силовое поле',
  lightning: 'электричество', necrotic: 'некротическая энергия', piercing: 'колющий', poison: 'яд',
  psychic: 'психическая энергия', radiant: 'излучение', slashing: 'рубящий', thunder: 'звук'
}
const CONDITION_LABELS = {
  blinded: 'Ослеплённый', charmed: 'Очарованный', deafened: 'Оглохший', exhaustion: 'Истощение',
  frightened: 'Испуганный', incapacitated: 'Недееспособный', paralyzed: 'Парализованный',
  petrified: 'Окаменевший', poisoned: 'Отравленный', prone: 'Сбитый с ног',
  unconscious: 'Бессознательный'
}

const SKILL_LABELS = {
  acrobatics: 'Акробатика', athletics: 'Атлетика', deception: 'Обман', insight: 'Проницательность',
  perception: 'Внимательность', persuasion: 'Убеждение', religion: 'Религия', stealth: 'Скрытность'
}

const DAMAGE_DEALT_LABELS = {
  acid: 'урона кислотой', bludgeoning: 'дробящего урона', cold: 'урона холодом', fire: 'урона огнём',
  force: 'урона силовым полем', lightning: 'урона электричеством', necrotic: 'урона некротической энергией',
  piercing: 'колющего урона', poison: 'урона ядом', psychic: 'урона психической энергией',
  radiant: 'урона излучением', slashing: 'рубящего урона', thunder: 'урона звуком'
}

const NAME_TRANSLATIONS = {
  Agile: 'Проворный', Amphibious: 'Амфибия', Compression: 'Сжатие', Flyby: 'Облёт', Illumination: 'Свечение',
  Jumper: 'Прыгун', 'Magic Resistance': 'Сопротивление магии', Mimicry: 'Подражание',
  'Pack Tactics': 'Тактика стаи', 'Spider Climb': 'Паучье лазание', 'Standing Leap': 'Прыжок с места',
  'Sun Sickness': 'Солнечная болезнь', 'Sunlight Sensitivity': 'Чувствительность к солнечному свету',
  'Telepathic Bond': 'Телепатическая связь', Training: 'Обучение', 'Water Breathing': 'Водное дыхание',
  'Web Walker': 'Хождение по паутине', Beak: 'Клюв', Bite: 'Укус', Claw: 'Клешня', Club: 'Дубинка',
  Dagger: 'Кинжал', 'Light Crossbow': 'Лёгкий арбалет', Multiattack: 'Мультиатака', Proboscis: 'Хоботок',
  Rake: 'Царапины', Ram: 'Таран', Rapier: 'Рапира', 'Rapport Spores': 'Споры взаимопонимания',
  'Ritual Sickle': 'Ритуальный серп', Scimitar: 'Скимитар', Scratch: 'Царапина', Slam: 'Удар',
  Spear: 'Копьё', Sting: 'Жало', Talons: 'Когти', Tentacles: 'Щупальца', 'Vile Slime': 'Мерзкая слизь',
  'Bubble Dash': 'Пузырьковый рывок', 'Nimble Escape': 'Ловкое отступление', Parry: 'Парирование', Shriek: 'Визг',
  'Ink Cloud (1/Day)': 'Чернильное облако (1/день)',
  'Amorphous Form (Air, Fire, and Water Only)': 'Аморфная форма (только воздух, огонь и вода)',
  'Death Throes (Demon Only)': 'Предсмертная агония (только демон)',
  "Devil's Sight (Devil Only)": 'Зрение дьявола (только дьявол)',
  'Festering Aura (Putrid Only)': 'Гнилостная аура (только гнилой)',
  'Flyby (Air Only)': 'Облёт (только воздушный)',
  'Heated Body (Metal Only)': 'Раскалённое тело (только металлический)',
  'Hellish Restoration': 'Адское восстановление',
  'Incorporeal Movement': 'Бестелесное перемещение',
  'Incorporeal Passage (Ghostly Only)': 'Бестелесный проход (только призрачный)',
  'Life Bond': 'Узы жизни', 'Pack Tactics (Land and Water Only)': 'Тактика стаи (только наземный и водный)',
  'Primal Bond': 'Первобытная связь', 'Regeneration (Slaad Only)': 'Регенерация (только слаад)',
  'Shared Resistances': 'Общее сопротивление', 'Stony Lethargy (Stone Only)': 'Каменная медлительность (только каменный)',
  'Water Breathing (Water Only)': 'Водное дыхание (только водный)',
  'Whispering Aura (Mind Flayer Only)': 'Шепчущая аура (только иллитид)',
  "Beast's Strike": 'Удар зверя', 'Bite (Demon Only)': 'Укус (только демон)', 'Breath Weapon': 'Дыхательное оружие',
  'Claw (Slaad Only)': 'Коготь (только слаад)', 'Claws (Yugoloth Only)': 'Когти (только юголот)',
  'Deathly Touch (Ghostly Only)': 'Смертельное касание (только призрачный)',
  'Eye Ray (Beholderkin Only)': 'Луч из глаза (только бехолдер)', 'Fey Blade': 'Клинок феи',
  'Fiery Strike (Devil Only)': 'Огненный удар (только дьявол)',
  'Grave Bolt (Skeletal Only)': 'Могильный снаряд (только скелет)', 'Healing Touch (1/Day)': 'Целительное касание (1/день)',
  'Otherworldly Slam': 'Потусторонний удар', 'Poison Jab': 'Ядовитый выпад',
  'Psychic Slam (Mind Flayer Only)': 'Психический удар (только иллитид)',
  'Radiant Bow (Avenger Only)': 'Сияющий лук (только мститель)',
  'Radiant Mace (Defender Only)': 'Сияющая булава (только защитник)', 'Reaping Scythe': 'Жатвенная коса',
  Rend: 'Разрывание', 'Rotting Claw (Putrid Only)': 'Гниющий коготь (только гнилой)',
  'Web Bolt (Spider Only)': 'Паутинный снаряд (только паук)',
  'Fell Glare (Fiend Only; Recharges after a Long Rest)': 'Зловещий взгляд (только исчадие; после продолжительного отдыха)',
  'Fey Step': 'Шаг феи', 'Fey Step (Fey Only; Recharges after a Long Rest)': 'Шаг феи (только фея; после продолжительного отдыха)',
  'Healing Touch (Celestial Only; Recharges after a Long Rest)': 'Целительное касание (только небожитель; после продолжительного отдыха)',
  'Venomous Spew (Centipede Only)': 'Ядовитый плевок (только многоножка)',
  'Berserk Lashing (Clay Only)': 'Яростный удар (только глиняный)'
}

Object.assign(NAME_TRANSLATIONS, {
  'Acid Breath': 'Кислотное дыхание', 'Animal Lordship': 'Владычество над животными',
  'Animal Spirit': 'Дух животного', 'Arcane Prowl': 'Арканная охота', 'Astral Implosion': 'Астральная имплозия',
  Banish: 'Изгнание', 'Blazing Light': 'Пылающий свет', 'Blinding Gaze': 'Ослепляющий взгляд',
  Bolster: 'Поддержка', 'Brutal Gore': 'Жестокие рога', 'Cataclysmic Event': 'Событие катаклизма',
  Charge: 'Наскок', Chill: 'Холод', 'Cloaked Flight': 'Скрытый полёт', 'Cloud of Insects': 'Облако насекомых',
  'Cold Breath': 'Холодное дыхание', 'Cold Gale': 'Морозный шторм', 'Commanding Presence': 'Властный облик',
  'Control Weather': 'Контроль погоды', 'Coven Magic': 'Магия шабаша', 'Crackling Wave': 'Трескучая волна',
  'Death Throes': 'Предсмертная агония', 'Deathly Teleport': 'Смертельная телепортация', Decay: 'Распад',
  'Demonic Restoration': 'Демоническое восстановление', 'Devilish Claw': 'Дьявольский коготь',
  'Diabolical Restoration': 'Дьявольское восстановление', 'Disrupt Life': 'Разрушение жизни',
  'Divine Aid': 'Божественная помощь', 'Divine Awareness': 'Божественная осведомлённость',
  'Divine Beam': 'Божественный луч', 'Divine Ray': 'Божественный луч', 'Dread Authority': 'Жуткая власть',
  'Dread Blade': 'Жуткий клинок', 'Earth Glide': 'Скольжение сквозь землю', 'Eldritch Burst': 'Потусторонний взрыв',
  'Elemental Burst': 'Стихийный взрыв', 'Energy Drain': 'Поглощение энергии', Engulf: 'Поглощение', Eruption: 'Извержение',
  'Exalted Restoration': 'Возвышенное восстановление', 'Fear Aura': 'Аура страха', 'Fell Word': 'Слово ужаса',
  'Feral Strike': 'Дикий удар', 'Fiery Mace': 'Адская булава', 'Fiery Rays': 'Огненные лучи', 'Fire Aura': 'Аура огня',
  'Fire Breath': 'Огненное дыхание', 'Flame Whip': 'Кнут пламени', Fling: 'Бросок', 'Flying Sword': 'Летающий меч',
  'Freezing Burst': 'Морозный взрыв', 'Frightening Gaze': 'Устрашающий взгляд', 'Frightful Presence': 'Пугающее присутствие',
  'Giggling Magic': 'Магия хихиканья', 'Grasping Glob': 'Схватывающий шар', 'Grave-Dust Flight': 'Облако могильной пыли',
  'Guiding Light': 'Направляющий свет', "Hag's Swipe": 'Взмах карги', 'Hellfire Orb': 'Сгусток адского пламени',
  'Hellfire Spellcasting': 'Адские заклинания', Howl: 'Вой', 'Ice Walk': 'Хождение по льду', 'Immutable Form': 'Неизменяемая форма',
  Inscrutable: 'Непостижимый', 'Lashing Goop': 'Хлёсткая слизь', 'Life Suppression': 'Подавление жизни',
  'Lightning Blade': 'Клинок молнии', 'Lightning Breath': 'Электрическое дыхание', 'Lightning Strike': 'Удар молнии',
  'Lordly Presence': 'Присутствие владыки', Lunge: 'Выпад', 'Malicious Magic': 'Злобная магия', 'Marshal Undead': 'Маршал нежити',
  'Mind Invasion': 'Вторжение в разум', 'Mind Jolt': 'Удар по разуму', Necrosis: 'Некроз', 'Necrotic Breath': 'Некротическое дыхание',
  'Necrotic Burst': 'Некротическая вспышка', 'Noxious Miasma': 'Ядовитые миазмы', Onslaught: 'Натиск',
  'Paralyzing Breath': 'Парализующее дыхание', 'Paralyzing Touch': 'Парализующее касание', 'Poison Breath': 'Ядовитое дыхание',
  Pounce: 'Наскок', 'Protective Magic': 'Защитная магия', Pseudopod: 'Ложноножка', 'Radiant Ray': 'Луч сияния',
  'Radiant Strike': 'Сияющий удар', 'Radiant Teleport': 'Сияющая телепортация', 'Reflective Carapace': 'Отражающий панцирь',
  'Repulsion Breath': 'Отталкивающее дыхание', 'Restraining Glob': 'Схватывающий шар', Roar: 'Рык',
  'Rumbling Movement': 'Грохочущее движение', 'Sacred Weapon': 'Священное оружие', 'Scorching Sands': 'Раскалённые пески',
  'Shape-Shift': 'Превращение', 'Shockwave of Glory': 'Взрыв славы', 'Sickening Ray': 'Отвратительный луч',
  'Siege Monster': 'Осадное чудовище', 'Slaying Bow': 'Убийственный лук', 'Sleep Breath': 'Сонное дыхание',
  'Slowing Breath': 'Замедляющее дыхание', Smite: 'Кара', 'Sonic Boom': 'Звуковой удар', 'Soul Gem': 'Камень души',
  'Spectral Claw': 'Призрачный коготь', Spellcasting: 'Использование заклинаний', 'Spirit Jar': 'Сосуд души',
  'Spiteful Escape': 'Злобный побег', 'Steam Breath': 'Паровое дыхание', Stomp: 'Топот', 'Storm Bolt': 'Удар бури', Swallow: 'Проглатывание',
  Tail: 'Хвост', 'Tail Swipe': 'Удар хвостом', Teleport: 'Телепортация', Tentacle: 'Щупальце', 'Terrifying Presence': 'Ужасающее присутствие',
  Thunderclap: 'Громовой удар', 'Thunderous Bellow': 'Громовой рёв', 'Tongue Twister': 'Скороговорка',
  'Toxic Ink': 'Токсичные чернила', 'Undead Restoration': 'Восстановление нежити', 'Weakening Breath': 'Ослабляющее дыхание',
  'Weight of Years': 'Тяжесть лет', 'Witch Strike': 'Ведьмовской удар', 'World-Shaking Movement': 'Сотрясающее мир перемещение'
})

const STANDARD_SUMMARIES = {
  Agile: 'Существо не провоцирует Атаку по возможности, покидая досягаемость врага.',
  Amphibious: 'Существо может дышать воздухом и под водой.',
  Compression: 'Существо проходит через пространство шириной до 1 дюйма без дополнительного расхода перемещения.',
  Flyby: 'Существо не провоцирует Атаку по возможности, когда вылетает из досягаемости врага.',
  Illumination: 'Существо испускает яркий свет в радиусе 10 футов и тусклый свет ещё на 10 футов.',
  Jumper: 'Дальность прыжка определяется Ловкостью, а не Силой.',
  'Magic Resistance': 'Существо совершает с преимуществом спасброски против заклинаний и других магических эффектов.',
  'Siege Monster': 'Существо наносит двойной урон объектам и строениям.',
  Mimicry: 'Существо подражает простым услышанным звукам. Подделку можно распознать проверкой Мудрости (Проницательность) со Сл. 10.',
  'Pack Tactics': 'Существо совершает бросок атаки с преимуществом, если в пределах 5 футов от цели находится дееспособный союзник существа.',
  'Spider Climb': 'Существо лазает по сложным поверхностям и потолкам без проверки характеристики.',
  'Standing Leap': 'Прыжок в длину достигает 10 футов, а в высоту — 5 футов, с разбегом или без него.',
  'Sun Sickness': 'При солнечном свете существо совершает проверки к20 с помехой и погибает, проведя на солнце больше 1 часа.',
  'Sunlight Sensitivity': 'При солнечном свете существо совершает проверки характеристик и броски атаки с помехой.',
  'Telepathic Bond': 'Пока существо и его хозяин находятся на одном плане существования, они могут телепатически общаться.',
  Training: 'Мастер выбирает один навык, которым существо владеет; соответствующие проверки характеристики совершаются с преимуществом.',
  'Water Breathing': 'Существо может дышать только под водой.',
  'Web Walker': 'Существо игнорирует ограничения перемещения от паутины и знает местоположение других существ, касающихся той же паутины.'
}

const SPECIAL_SUMMARIES = {
  'Blood Hawk::Beak': 'Рукопашная атака: +4 к попаданию, досягаемость 5 футов. Попадание: 4 (1к4 + 2) колющего урона или 6 (1к8 + 2), если цель Окровавлена.',
  'Goat::Ram': 'Рукопашная атака: +2 к попаданию, досягаемость 5 футов. Попадание: 1 дробящего урона или 2 (1к4), если перед попаданием козёл прошёл не менее 20 футов по прямой к цели.',
  'Homunculus::Bite': 'Рукопашная атака: +4 к попаданию, досягаемость 5 футов. Попадание: 1 колющего урона; цель совершает спасбросок Телосложения со Сл. 12. При провале она Отравлена до конца следующего хода гомункула; при провале на 5 и более — на 1 минуту и Бессознательна, пока не получит урон.',
  'Giant Crab::Claw': 'Рукопашная атака: +3 к попаданию, досягаемость 5 футов. Попадание: 4 (1к6 + 1) дробящего урона. Средняя или меньшая цель Схвачена (Сл. высвобождения 11); краб может удерживать до двух целей.',
  'Piranha::Bite': 'Рукопашная атака: +5 к попаданию, досягаемость 5 футов; атака совершается с преимуществом, если у цели не все хиты. Попадание: 1 колющего урона.',
  'Stirge::Proboscis': 'Рукопашная атака: +5 к попаданию, досягаемость 5 футов. Попадание: 6 (1к6 + 3) колющего урона, и кровопийца прикрепляется к цели. В начале каждого своего хода он наносит цели 5 (2к4) некротического урона. Отцепиться он может, потратив 5 футов перемещения; цель или соседнее существо может отцепить его действием.',
  'Myconid Sprout::Rapport Spores': 'Росток выпускает споры в 30-футовой Эманации. Существа с Интеллектом 2 и выше, кроме Конструктов, Элементалей и Нежити, на 1 час получают телепатию дальностью 30 футов.',
  'Seahorse::Bubble Dash': 'Под водой существо перемещается на расстояние до своей скорости плавания, не провоцируя Атак по возможности.',
  'Goblin Minion::Nimble Escape': 'Гоблин совершает действие Отход или Засада.',
  'Noble::Parry': 'Триггер: по благородному попали рукопашной атакой, пока он держит оружие. Ответ: он получает +2 к КД против этой атаки, что может превратить попадание в промах.',
  'Octopus::Ink Cloud (1/Day)': 'Триггер: существо заканчивает ход в пределах 5 футов от осьминога под водой. Ответ: осьминог создаёт сильно заслоняющее 5-футовое облако чернил на 1 минуту и перемещается на расстояние до скорости плавания.',
  'Shrieker Fungus::Shriek': 'Триггер: существо или источник яркого света оказывается в пределах 30 футов. Ответ: визгун издаёт крик, слышимый за 300 футов, в течение 1 минуты или до своей гибели.',
  'Avatar of Death::Incorporeal Movement': 'Аватар проходит сквозь существ и предметы как через Труднопроходимую местность. Если он заканчивает ход внутри предмета, то получает 5 (1к10) урона силовым полем.',
  'Avatar of Death::Multiattack': 'Аватар совершает число атак Жатвенной косой, равное половине бонуса мастерства призвавшего его существа, с округлением вверх.',
  'Avatar of Death::Reaping Scythe': 'Рукопашная атака автоматически попадает по цели в пределах 5 футов и наносит 7 (1к8 + 3) рубящего плюс 4 (1к8) некротического урона.',
  'Giant Insect::Spider Climb': 'Насекомое лазает по сложным поверхностям и потолкам без проверки характеристики.',
  'Giant Insect::Multiattack': 'Насекомое совершает число атак, равное половине уровня заклинания с округлением вниз.',
  'Giant Insect::Poison Jab': 'Рукопашная атака заклинанием, досягаемость 10 футов. Урон: 1к6 + 3 + уровень заклинания колющего и дополнительно 1к4 урона ядом.',
  'Giant Insect::Web Bolt (Spider Only)': 'Дальнобойная атака заклинанием, дистанция 60 футов. Урон: 1к10 + 3 + уровень заклинания дробящего; скорость цели становится равна 0 до начала следующего хода насекомого.',
  'Giant Insect::Venomous Spew (Centipede Only)': 'Видимая цель в пределах 10 футов совершает спасбросок Телосложения против Сл. заклинаний призывателя. При провале цель Отравлена до начала следующего хода насекомого.',
  'Aberrant Spirit::Regeneration (Slaad Only)': 'В начале своего хода дух восстанавливает 5 хитов, если у него остался хотя бы 1 хит.',
  'Aberrant Spirit::Whispering Aura (Mind Flayer Only)': 'В начале хода духа каждое другое существо в пределах 5 футов совершает спасбросок Мудрости против Сл. заклинаний призывателя. При провале оно получает 2к6 психического урона.',
  'Aberrant Spirit::Multiattack': 'Дух совершает число атак, равное половине уровня заклинания с округлением вниз.',
  'Aberrant Spirit::Claw (Slaad Only)': 'Рукопашная атака заклинанием, досягаемость 5 футов. Урон: 1к10 + 3 + уровень заклинания рубящего; цель не восстанавливает хиты до начала следующего хода духа.',
  'Aberrant Spirit::Eye Ray (Beholderkin Only)': 'Дальнобойная атака заклинанием, дистанция 150 футов. Урон: 1к8 + 3 + уровень заклинания психического урона.',
  'Aberrant Spirit::Psychic Slam (Mind Flayer Only)': 'Рукопашная атака заклинанием, досягаемость 5 футов. Урон: 1к8 + 3 + уровень заклинания психического урона.',
  'Draconic Spirit::Shared Resistances': 'При призыве выберите одно сопротивление духа. До окончания заклинания призыватель также получает сопротивление выбранному виду урона.',
  'Draconic Spirit::Multiattack': 'Дух совершает число атак Разрыванием, равное половине уровня заклинания с округлением вниз, и использует Дыхательное оружие.',
  'Draconic Spirit::Rend': 'Рукопашная атака заклинанием, досягаемость 10 футов. Урон: 1к6 + 4 + уровень заклинания колющего урона.',
  'Draconic Spirit::Breath Weapon': 'Все существа в 30-футовом Конусе совершают спасбросок Ловкости против Сл. заклинаний призывателя. Урон: 2к6 выбранного вида, к которому дух имеет сопротивление; при успехе — половина.',
  'Bestial Spirit::Flyby (Air Only)': 'Воздушный дух не провоцирует Атаку по возможности, вылетая из досягаемости врага.',
  'Bestial Spirit::Pack Tactics (Land and Water Only)': 'Наземный или водный дух совершает бросок атаки с преимуществом, если в пределах 5 футов от цели находится его дееспособный союзник.',
  'Bestial Spirit::Water Breathing (Water Only)': 'Водный дух может дышать только под водой.',
  'Bestial Spirit::Multiattack': 'Дух совершает число атак Разрыванием, равное половине уровня заклинания с округлением вниз.',
  'Bestial Spirit::Rend': 'Рукопашная атака заклинанием, досягаемость 5 футов. Урон: 1к8 + 4 + уровень заклинания колющего урона.',
  'Fiendish Spirit::Death Throes (Demon Only)': 'Когда дух падает до 0 хитов или заклинание заканчивается, он взрывается. Существа в 10-футовой Эманации совершают спасбросок Ловкости против Сл. заклинаний; при провале получают 2к10 + уровень заклинания урона огнём, при успехе — половину.',
  "Fiendish Spirit::Devil's Sight (Devil Only)": 'Магическая Тьма не мешает тёмному зрению духа.',
  'Fiendish Spirit::Magic Resistance': 'Дух совершает с преимуществом спасброски против заклинаний и других магических эффектов.',
  'Fiendish Spirit::Multiattack': 'Дух совершает число атак, равное половине уровня заклинания с округлением вниз.',
  'Fiendish Spirit::Bite (Demon Only)': 'Рукопашная атака заклинанием, досягаемость 5 футов. Урон: 1к12 + 3 + уровень заклинания некротического урона.',
  'Fiendish Spirit::Claws (Yugoloth Only)': 'Рукопашная атака заклинанием, досягаемость 5 футов. Урон: 1к8 + 3 + уровень заклинания рубящего; после атаки дух телепортируется на расстояние до 30 футов.',
  'Fiendish Spirit::Fiery Strike (Devil Only)': 'Рукопашная или дальнобойная атака заклинанием, досягаемость 5 футов или дистанция 150 футов. Урон: 2к6 + 3 + уровень заклинания урона огнём.',
  'Construct Spirit::Heated Body (Metal Only)': 'Существо, попавшее по духу рукопашной атакой или начинающее ход в захвате с ним, получает 1к10 урона огнём.',
  'Construct Spirit::Stony Lethargy (Stone Only)': 'В начале хода видимая цель в пределах 10 футов совершает спасбросок Мудрости против Сл. заклинаний. При провале её скорость уменьшается вдвое и она не может совершать Атаки по возможности до начала следующего хода.',
  'Construct Spirit::Multiattack': 'Дух совершает число атак Ударом, равное половине уровня заклинания с округлением вниз.',
  'Construct Spirit::Slam': 'Рукопашная атака заклинанием, досягаемость 5 футов. Урон: 1к8 + 4 + уровень заклинания дробящего урона.',
  'Construct Spirit::Berserk Lashing (Clay Only)': 'Триггер: дух получает урон от существа. Ответ: дух атакует это существо Ударом либо перемещается к нему на расстояние до половины скорости, не провоцируя Атак по возможности.',
  'Celestial Spirit::Multiattack': 'Дух совершает число атак, равное половине уровня заклинания с округлением вниз.',
  'Celestial Spirit::Radiant Bow (Avenger Only)': 'Дальнобойная атака заклинанием, дистанция 600 футов. Урон: 2к6 + 2 + уровень заклинания урона излучением.',
  'Celestial Spirit::Radiant Mace (Defender Only)': 'Рукопашная атака заклинанием, досягаемость 5 футов. Урон: 1к10 + 3 + уровень заклинания излучением; дух или существо в пределах 10 футов от цели получает 1к10 временных хитов.',
  'Celestial Spirit::Healing Touch (1/Day)': 'Дух касается другого существа и восстанавливает ему 2к8 + уровень заклинания хитов.',
  'Undead Spirit::Festering Aura (Putrid Only)': 'Другое существо, начинающее ход в 5-футовой Эманации духа, совершает спасбросок Телосложения против Сл. заклинаний. При провале оно Отравлено до начала своего следующего хода.',
  'Undead Spirit::Incorporeal Passage (Ghostly Only)': 'Дух проходит сквозь существ и предметы как через Труднопроходимую местность. Закончив ход внутри предмета, он выталкивается наружу и получает 1к10 урона силовым полем за каждые 5 футов перемещения.',
  'Undead Spirit::Multiattack': 'Дух совершает число атак, равное половине уровня заклинания с округлением вниз.',
  'Undead Spirit::Deathly Touch (Ghostly Only)': 'Рукопашная атака заклинанием, досягаемость 5 футов. Урон: 1к8 + 3 + уровень заклинания некротического урона; цель Испугана до конца своего следующего хода.',
  'Undead Spirit::Grave Bolt (Skeletal Only)': 'Дальнобойная атака заклинанием, дистанция 150 футов. Урон: 2к4 + 3 + уровень заклинания некротического урона.',
  'Undead Spirit::Rotting Claw (Putrid Only)': 'Рукопашная атака заклинанием, досягаемость 5 футов. Урон: 1к6 + 3 + уровень заклинания рубящего; Отравленная цель также Парализована до конца своего следующего хода.',
  'Fey Spirit::Multiattack': 'Дух совершает число атак Клинком феи, равное половине уровня заклинания с округлением вниз.',
  'Fey Spirit::Fey Blade': 'Рукопашная атака заклинанием, досягаемость 5 футов. Урон: 2к6 + 3 + уровень заклинания урона силовым полем.',
  'Fey Spirit::Fey Step': 'Дух телепортируется на расстояние до 30 футов и применяет эффект настроения: разъярённый получает преимущество на следующую атаку в этот ход; весёлый может Очаровать цель в 10 футах на 1 минуту при провале спасброска Мудрости (эффект заканчивается, если цель получает урон); лукавый создаёт 10-футовый Куб магической Тьмы до конца следующего хода.',
  'Elemental Spirit::Amorphous Form (Air, Fire, and Water Only)': 'Воздушный, огненный или водный дух проходит через пространство шириной до 1 дюйма, и оно не считается для него Труднопроходимой местностью.',
  'Elemental Spirit::Multiattack': 'Дух совершает число атак Ударом, равное половине уровня заклинания с округлением вниз.',
  'Elemental Spirit::Slam': 'Рукопашная атака заклинанием, досягаемость 5 футов. Урон: 1к10 + 4 + уровень заклинания; вид урона зависит от формы: дробящий (земля), холод (вода), электричество (воздух) или огонь (огонь).',
  'Beast of the Land::Primal Bond': 'Добавьте бонус мастерства следопыта ко всем проверкам характеристик и спасброскам зверя.',
  "Beast of the Land::Beast's Strike": 'Рукопашная атака заклинанием, досягаемость 5 футов. Урон: 1к8 + 2 + модификатор Мудрости дробящий, колющий или рубящий. После движения не менее 20 футов по прямой к цели наносит дополнительно 1к6 урона и сбивает Большую или меньшую цель с ног.',
  'Beast of the Sea::Amphibious': 'Зверь может дышать воздухом и под водой.',
  'Beast of the Sea::Primal Bond': 'Добавьте бонус мастерства следопыта ко всем проверкам характеристик и спасброскам зверя.',
  "Beast of the Sea::Beast's Strike": 'Рукопашная атака заклинанием, досягаемость 5 футов. Урон: 1к6 + 2 + модификатор Мудрости дробящий или колющий; цель Схвачена, Сл. высвобождения равна Сл. заклинаний следопыта.',
  'Beast of the Sky::Flyby': 'Зверь не провоцирует Атаку по возможности, вылетая из досягаемости врага.',
  'Beast of the Sky::Primal Bond': 'Добавьте бонус мастерства следопыта ко всем проверкам характеристик и спасброскам зверя.',
  "Beast of the Sky::Beast's Strike": 'Рукопашная атака заклинанием, досягаемость 5 футов. Урон: 1к4 + 3 + модификатор Мудрости рубящего урона.',
  'Animated Object::Slam': 'Рукопашная атака заклинанием, досягаемость 5 футов. Урон силовым полем зависит от размера и уровня заклинания: Средний или меньше — (уровень − 4)к4 + 3; Большой — (уровень − 3)к6 + 3 + модификатор заклинательной характеристики; Огромный — (уровень − 3)к12 + 3 + модификатор.',
  'Otherworldly Steed::Life Bond': 'Когда призыватель восстанавливает хиты от заклинания уровня 1+, скакун восстанавливает столько же хитов, если находится в пределах 5 футов.',
  'Otherworldly Steed::Otherworldly Slam': 'Рукопашная атака заклинанием, досягаемость 5 футов. Урон: 1к8 + уровень заклинания; излучение для небожителя, психический для феи или некротический для исчадия.',
  'Otherworldly Steed::Fell Glare (Fiend Only; Recharges after a Long Rest)': 'Видимая цель в пределах 60 футов совершает спасбросок Мудрости против Сл. заклинаний. При провале она Испугана до конца следующего хода призывателя.',
  'Otherworldly Steed::Fey Step (Fey Only; Recharges after a Long Rest)': 'Скакун вместе со всадником телепортируется на расстояние до 60 футов в выбранное свободное пространство.',
  'Otherworldly Steed::Healing Touch (Celestial Only; Recharges after a Long Rest)': 'Одно существо в пределах 5 футов восстанавливает 2к8 + уровень заклинания хитов.'
}

const REFERENCE_LINKS = {
  'Avatar of Death': { label: 'Колода многих вещей [Deck of Many Things]', path: '/dnd55e/magic-items?item=deck-of-many-things-dmg' },
  'Giant Insect': { label: 'Гигантское насекомое [Giant Insect]', path: '/dnd55e/spells?spell=giant-insect-phb' },
  'Aberrant Spirit': { label: 'Призыв духа аберрации [Summon Aberration]', path: '/dnd55e/spells?spell=summon-aberration-phb' },
  'Draconic Spirit': { label: 'Призыв духа дракона [Summon Dragon]', path: '/dnd55e/spells?spell=summon-dragon-phb' },
  'Bestial Spirit': { label: 'Призыв духа зверя [Summon Beast]', path: '/dnd55e/spells?spell=summon-beast-phb' },
  'Fiendish Spirit': { label: 'Призыв духа исчадия [Summon Fiend]', path: '/dnd55e/spells?spell=summon-fiend-phb' },
  'Construct Spirit': { label: 'Призыв духа конструкта [Summon Construct]', path: '/dnd55e/spells?spell=summon-construct-phb' },
  'Celestial Spirit': { label: 'Призыв духа небожителя [Summon Celestial]', path: '/dnd55e/spells?spell=summon-celestial-phb' },
  'Undead Spirit': { label: 'Призыв духа нежити [Summon Undead]', path: '/dnd55e/spells?spell=summon-undead-phb' },
  'Fey Spirit': { label: 'Призыв духа феи [Summon Fey]', path: '/dnd55e/spells?spell=summon-fey-phb' },
  'Elemental Spirit': { label: 'Призыв духа элементаля [Summon Elemental]', path: '/dnd55e/spells?spell=summon-elemental-phb' },
  'Animated Object': { label: 'Оживление вещей [Animate Objects]', path: '/dnd55e/spells?spell=animate-objects-phb' },
  'Otherworldly Steed': { label: 'Поиск скакуна [Find Steed]', path: '/dnd55e/spells?spell=find-steed-phb' }
}

const SPECIAL_VALUE_TRANSLATIONS = new Map([
  ["11 + the spell's level", '11 + уровень заклинания'],
  ["12 + the spell's level", '12 + уровень заклинания'],
  ["13 + the spell's level", '13 + уровень заклинания'],
  ["14 + the spell's level", '14 + уровень заклинания'],
  ["11 + the spell's level + 2 (Defender only)", '11 + уровень заклинания; ещё +2 только для защитника'],
  ['13 plus your Wisdom modifier', '13 + ваш модификатор Мудрости'],
  ['10 + 1 per spell level', '10 + уровень заклинания'],
  ['Half the HP maximum of its summoner', 'Половина максимума хитов призвавшего существа'],
  ['30 + 10 for each spell level above 4', '30 + 10 за каждый уровень заклинания выше 4-го'],
  ['40 + 10 for each spell level above 4', '40 + 10 за каждый уровень заклинания выше 4-го'],
  ['50 + 10 for each spell level above 5', '50 + 10 за каждый уровень заклинания выше 5-го'],
  ['20 (Air only) or 30 (Land and Water only) + 5 for each spell level above 2', '20 (воздушный) или 30 (наземный и водный) + 5 за каждый уровень заклинания выше 2-го'],
  ['50 (Demon only) or 40 (Devil only) or 60 (Yugoloth only) + 15 for each spell level above 6', '50 (демон), 40 (дьявол) или 60 (юголот) + 15 за каждый уровень заклинания выше 6-го'],
  ['40 + 15 for each spell level above 4', '40 + 15 за каждый уровень заклинания выше 4-го'],
  ['40 + 10 for each spell level above 5', '40 + 10 за каждый уровень заклинания выше 5-го'],
  ['30 (Ghostly and Putrid only) or 20 (Skeletal only) + 10 for each spell level above 3', '30 (призрачный и гнилой) или 20 (скелет) + 10 за каждый уровень заклинания выше 3-го'],
  ['30 + 10 for each spell level above 3', '30 + 10 за каждый уровень заклинания выше 3-го'],
  ['50 + 10 for each spell level above 4', '50 + 10 за каждый уровень заклинания выше 4-го'],
  ['5 plus five times your Ranger level (the beast has a number of Hit Dice [d8s] equal to your Ranger level)', '5 + пятикратный уровень следопыта; число Костей Хитов к8 равно уровню следопыта'],
  ['4 plus four times your Ranger level (the beast has a number of Hit Dice [d6s] equal to your Ranger level)', '4 + четырёхкратный уровень следопыта; число Костей Хитов к6 равно уровню следопыта'],
  ['10 (Medium or smaller), 20 (Large), 40 (Huge)', '10 (Средний или меньше), 20 (Большой), 40 (Огромный)'],
  ["5 + 10 per spell level (the steed has a number of Hit Dice [d10s] equal to the spell's level)", '5 + 10 за каждый уровень заклинания; число Костей Хитов к10 равно уровню заклинания']
])

const SIMPLE_ATTACK_TYPES = { m: 'Рукопашная атака', r: 'Дальнобойная атака', 'm,r': 'Рукопашная или дальнобойная атака' }

function slugify(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

function dice(value) {
  return String(value).replace(/d/giu, 'к').replace(/\s+/g, ' ').trim()
}

function modifier(score) {
  const value = Math.floor((score - 10) / 2)
  return value >= 0 ? `+${value}` : String(value).replace('-', '−')
}

function translateSpecial(value) {
  return SPECIAL_VALUE_TRANSLATIONS.get(value) || value
}

function formatArmorClass(ac) {
  return (ac || []).map((value) => {
    if (typeof value === 'number') return String(value)
    if (value.special) return translateSpecial(value.special)
    const from = (value.from || []).map(part => part.replace(/^natural armor$/i, 'природный доспех')).join(', ')
    return `${value.ac}${from ? ` (${from})` : ''}`
  }).join(', ') || '—'
}

function formatHitPoints(hp) {
  if (!hp) return '—'
  if (hp.special) return translateSpecial(hp.special)
  return `${hp.average}${hp.formula ? ` (${dice(hp.formula)})` : ''}`
}

function formatSpeed(speed = {}) {
  const labels = { walk: 'ходьба', burrow: 'копая', climb: 'лазая', fly: 'летая', swim: 'плавая' }
  const conditionMap = {
    '(hover; Beholderkin only)': 'парит; только бехолдер', '(Land only)': 'только наземный',
    '(Air only)': 'только воздушный', '(Water only)': 'только водный', '(Wasp only)': 'только оса',
    '(Earth only)': 'только земля', '(hover; Air only)': 'парит; только воздух', '(hover; Ghostly only)': 'парит; только призрачный',
    '(requires level 4+ spell)': 'заклинание уровня 4+', '(hover)': 'парит', '(Demon only)': 'только демон', '(Devil only)': 'только дьявол'
  }
  return Object.entries(labels).flatMap(([key, label]) => {
    const raw = speed[key]
    if (!raw) return []
    const number = typeof raw === 'number' ? raw : raw.number
    const condition = typeof raw === 'object' && raw.condition ? conditionMap[raw.condition] || raw.condition : ''
    return `${label} ${number} футов${condition ? ` (${condition})` : ''}`
  }).join(', ') || '—'
}

function formatType(raw) {
  if (typeof raw === 'string') return { type: raw, types: [raw], typeLabel: TYPE_LABELS[raw] || raw, tags: [] }
  if (raw?.type?.choose) {
    const choices = raw.type.choose
    const tags = (raw.tags || []).map(tag => typeof tag === 'string' ? TAG_LABELS[tag] || tag : tag.prefix || tag.tag || '')
    return {
      type: choices.join(','),
      types: choices,
      typeLabel: `${choices.map(type => TYPE_LABELS[type] || type).join(', ')}${tags.length ? ` (${tags.join(', ')})` : ''}`,
      tags
    }
  }
  const type = raw?.type || 'unknown'
  const tags = (raw?.tags || []).map(tag => typeof tag === 'string' ? TAG_LABELS[tag] || tag : tag.prefix || tag.tag || '')
  return { type, types: [type], typeLabel: `${TYPE_LABELS[type] || type}${tags.length ? ` (${tags.join(', ')})` : ''}`, tags }
}

function flattenDefenses(raw, kind) {
  if (!raw) return []
  return raw.flatMap((entry) => {
    if (typeof entry === 'string') return [kind === 'condition' ? CONDITION_LABELS[entry] || entry : DAMAGE_LABELS[entry] || entry]
    const values = entry[kind === 'condition' ? 'conditionImmune' : kind] || []
    const note = entry.note?.replace('Air only', 'только воздух').replace('Earth only', 'только земля')
      .replace('Water only', 'только вода').replace('Fire only', 'только огонь')
    const suffix = note ? ` ${note}` : ''
    return values.map(value => `${kind === 'condition' ? CONDITION_LABELS[value] || value : DAMAGE_LABELS[value] || value}${suffix}`)
  })
}

function formatSenses(monster) {
  const map = { Darkvision: 'тёмное зрение', Blindsight: 'слепое зрение', Truesight: 'истинное зрение' }
  const senses = (monster.senses || []).map(value => value
    .replace(/Darkvision|Blindsight|Truesight/g, match => map[match])
    .replace(/ft\./g, 'футов')
    .replace(' (unimpeded by magical {@variantrule Darkness|XPHB})', ' (магическая Тьма не мешает этому чувству)'))
  senses.push(`пассивная Внимательность ${monster.passive ?? 10}`)
  return senses.join(', ')
}

function formatLanguages(languages = []) {
  const map = {
    Abyssal: 'Бездны', Celestial: 'Небесный', Draconic: 'Драконий', Elvish: 'Эльфийский', Goblin: 'Гоблинский',
    Infernal: 'Инфернальный', Primordial: 'Первичный', Sylvan: 'Сильван', "Thieves' cant": 'воровской жаргон',
    'Deep Speech': 'Глубинная речь', 'Telepathy 60 ft.': 'телепатия 60 футов',
    'telepathy 1 mile (works only with you)': 'телепатия 1 миля (только с призывателем)',
    'understands the languages you know': 'понимает известные вам языки',
    'Understands the languages you know': 'понимает известные вам языки',
    'all languages known to its summoner': 'все языки, известные призвавшему существу',
    "understands Common plus one other language but can't speak": 'понимает Общий и ещё один язык, но не говорит',
    "understands Infernal but can't speak": 'понимает Инфернальный, но не говорит',
    Common: 'Общий', "understands Common but can't speak": 'понимает Общий, но не говорит',
    'Common plus one other language': 'Общий и ещё один язык', 'telepathy 240 ft.': 'телепатия 240 футов',
    "Common, Thieves' cant": 'Общий, воровской жаргон', 'Common plus two other languages': 'Общий и ещё два языка',
    'Common, Goblin': 'Общий, Гоблинский', 'Common, Draconic': 'Общий, Драконий',
    "Celestial; understands Common, Elvish, and Sylvan but can't speak them": 'Небесный; понимает Общий, Эльфийский и Сильван, но не говорит на них',
    "understands Common, Elvish, and Sylvan but can't speak them": 'понимает Общий, Эльфийский и Сильван, но не говорит на них',
    'Celestial; understands Common': 'Небесный; понимает Общий', "and Sylvan but can't speak them": 'и Сильван, но не говорит на них'
  }
  return languages.map(value => map[value] || value).join(', ') || '—'
}

function simpleAttackSummary(entries = []) {
  const text = entries.filter(value => typeof value === 'string').join(' ')
  const kind = text.match(/\{@atkr ([^}]+)\}/)?.[1]
  const hit = text.match(/\{@hit ([^}]+)\}/)?.[1]
  const reach = text.match(/reach ([\d/]+) (?:ft\.|feet)/i)?.[1]
  const range = text.match(/range ([\d/]+) ft\./i)?.[1]
  const hitText = text.split('{@h}')[1]
  if (!kind || !hit || !hitText) return ''

  const damageParts = [...hitText.matchAll(/(?:(\d+)\s*)?(?:\(\{@damage ([^}|]+)[^}]*\}\)|\{@damage ([^}|]+)[^}]*\})?\s*([A-Za-z]+) damage/giu)]
    .map((match) => {
      const average = match[1] || ''
      const formula = match[2] || match[3] || ''
      const amount = average && formula ? `${average} (${dice(formula)})` : average || dice(formula)
      return `${amount} ${DAMAGE_DEALT_LABELS[match[4].toLowerCase()] || `${match[4].toLowerCase()} урона`}`
    })

  const distances = [reach ? `досягаемость ${reach} футов` : '', range ? `дистанция ${range} футов` : ''].filter(Boolean).join(' или ')
  return `${SIMPLE_ATTACK_TYPES[kind]}: +${hit} к попаданию${distances ? `, ${distances}` : ''}. Попадание: ${damageParts.join(' плюс ') || 'см. особое описание'}.`
}

function abilitySummary(monster, ability) {
  const special = SPECIAL_SUMMARIES[`${monster.name}::${ability.name}`]
  if (special) return special
  if (STANDARD_SUMMARIES[ability.name]) return STANDARD_SUMMARIES[ability.name]
  const attack = simpleAttackSummary(ability.entries)
  return attack || 'Особое игровое свойство существа; параметры зависят от указанной формы или призыва.'
}

const RUSSIAN_DISPLAY_ABILITY_NAMES = {
  'Giant Crab::Claw': 'Клешня',
  'Sphinx of Valor::Claw': 'Коготь',
  'Tarrasque::Claw': 'Когти'
}

function abilityName(rawName, monsterName = '') {
  const recharge = rawName.match(/\{@recharge (\d+)\}/)?.[1]
  const daily = rawName.match(/\((\d+)\/Day\)/i)?.[1]
  const base = rawName.replace(/\s*\{@recharge \d+\}/g, '').replace(/\s*\(\d+\/Day\)$/i, '')

  if (/^Legendary Resistance/.test(rawName)) {
    return rawName
      .replace('Legendary Resistance', 'Легендарное сопротивление')
      .replace(/Day/g, 'день')
      .replace('or', 'или')
      .replace('in Lair', 'в логове')
  }

  const translated = RUSSIAN_DISPLAY_ABILITY_NAMES[`${monsterName}::${base}`]
    || NAME_TRANSLATIONS[rawName]
    || NAME_TRANSLATIONS[base]
    || base
  if (recharge) return `${translated} (перезарядка ${recharge}–6)`
  if (daily) return `${translated} (${daily}/день)`
  return translated
}

function normalizedAbilityName(value) {
  return value
    .toLocaleLowerCase('ru')
    .replace(/\([^)]*\)/g, '')
    .replace(/[.ё]/g, match => match === 'ё' ? 'е' : '')
    .replace(/[^a-zа-я0-9]+/giu, ' ')
    .trim()
}

const RUSSIAN_ABILITY_ALIASES = {
  'Dracolich::Terrifying Presence': 'Пугающее присутствие',
  'Sphinx of Valor::Claw': 'Коготь',
  'Demilich::Grave-Dust Flight': 'Облако пыли',
  'Animal Lord::Radiant Strike': 'Луч излучения',
  'Ancient Black Dragon::Frightful Presence': 'Ужасающая внешность',
  'Lich::Paralyzing Touch': 'Парализующие касание',
  'Ancient Green Dragon::Mind Invasion': 'Ментальный всплеск',
  'Elemental Cataclysm::Rumbling Movement': 'Грохочущие движение',
  'Ancient Blue Dragon::Sonic Boom': 'Удар звуком',
  'Blob of Annihilation::Lashing Goop': 'Порка глупцов',
  'Tarrasque::Claw': 'Когти'
}

const SPELL_LINK_ALIASES = { 'melf-s-acid-arrow-phb': 'melfs-acid-arrow-phb' }
const GLOSSARY_LINK_ALIASES = { advantage: 'advantage-phb', 'move-phb': 'speed-phb', 'fear-phb': 'frightened-phb' }
const spellLink = slug => SPELL_LINK_ALIASES[slug] || slug
const glossaryLink = slug => GLOSSARY_LINK_ALIASES[slug] || slug

function cleanTtgTokens(value) {
  return value
    .replace(/\{@glossary\s+([^}|]+)\s*\|\s*url:([^}]+)\}/giu, (_, label, url) => `[${label.trim()}](/dnd55e/glossary?rule=${glossaryLink(url.trim())})`)
    .replace(/\{@spell\s+([^}|]+)\s*\|\s*url:([^}]+)\}/giu, (_, label, url) => `[${label.trim()}](/dnd55e/spells?spell=${spellLink(url.trim())})`)
    .replace(/\{@link\s+([^}|]+)(?:\s*\|[^}]*)?\}/giu, (_, label) => label.trim())
    .replace(/\{@(?:roll|dice)\s+([^}|]+)(?:\|[^}]*)?\}/giu, (_, label) => `**${label.trim()}**`)
    .replace(/\{@i\s+([^}]+)\}/giu, (_, label) => `*${label.trim()}*`)
    .replace(/\{@b\s+([^}]+)\}/giu, (_, label) => `**${label.trim()}**`)
}

function renderTtgNode(node) {
  if (typeof node === 'string') return cleanTtgTokens(node)
  if (!node || typeof node !== 'object') return ''

  const content = (node.content || []).map(renderTtgNode).join('')
  if (node.type === 'bold') return `**${content}**`
  if (node.type === 'italic') return `*${content}*`
  if (node.type === 'roll' || node.type === 'dice') return `**${content}**`
  if (node.type === 'glossary') return `[${content}](/dnd55e/glossary?rule=${glossaryLink(node.attrs?.url)})`
  if (node.type === 'spell') return `[${content}](/dnd55e/spells?spell=${spellLink(node.attrs?.url)})`
  if (node.type === 'link') return content
  if (node.type === 'li') return content.trim()
  if (node.type === 'list') return (node.content || []).map(renderTtgNode).filter(Boolean).join('; ')
  return content || cleanTtgTokens(node.text || '')
}

function renderTtgDescription(description = []) {
  return description
    .map(renderTtgNode)
    .filter(Boolean)
    .join(' ')
    .replace(/\s+/g, ' ')
    .replace(/заклинание заклинание/giu, 'заклинание')
    .replace(/оглохщий/giu, 'оглохший')
    .replace('/dnd55e/glossary?rule=advantage)', '/dnd55e/glossary?rule=advantage-phb)')
    .trim()
}

function normalizeGeneratedText(value) {
  return value
    .replace('/dnd55e/glossary?rule=advantage)', '/dnd55e/glossary?rule=advantage-phb)')
    .replace('/dnd55e/glossary?rule=move-phb)', '/dnd55e/glossary?rule=speed-phb)')
    .replace('/dnd55e/glossary?rule=fear-phb)', '/dnd55e/glossary?rule=frightened-phb)')
    .replace('/dnd55e/spells?spell=melf-s-acid-arrow-phb)', '/dnd55e/spells?spell=melfs-acid-arrow-phb)')
}

function rawAbilityBlock(monster, key) {
  const displayAs = { trait: 'trait', action: 'action', bonus: 'bonus', reaction: 'reaction', legendary: 'legendary' }[key]
  const spellcasting = (monster.spellcasting || []).filter(entry => (entry.displayAs || 'trait') === displayAs)
  return [...(monster[key] || []), ...spellcasting]
}

function russianAbilityBlock(russianMonster, key) {
  const apiKey = { trait: 'traits', action: 'actions', bonus: 'bonusActions', reaction: 'reactions' }[key]
  return key === 'legendary' ? russianMonster?.legendary?.actions || [] : russianMonster?.[apiKey] || []
}

let enrichedAbilityCount = 0
let fallbackAbilityCount = 0

function formatAbilityBlock(monster, key, russianMonster) {
  const abilities = rawAbilityBlock(monster, key)
  const russianAbilities = russianAbilityBlock(russianMonster, key)
  const unused = new Set(russianAbilities.map((_, index) => index))

  return abilities.map((ability) => {
    const name = abilityName(ability.name, monster.name)
    const expected = normalizedAbilityName(name)
    const alias = normalizedAbilityName(RUSSIAN_ABILITY_ALIASES[`${monster.name}::${ability.name.replace(/\s*\{@recharge \d+\}/g, '')}`] || '')
    let russianIndex = [...unused].find((index) => {
      const candidate = normalizedAbilityName(russianAbilities[index].name?.rus || '')
      return candidate === expected || (alias && candidate === alias)
    })

    const russianAbility = russianIndex === undefined ? null : russianAbilities[russianIndex]
    if (russianIndex !== undefined) unused.delete(russianIndex)
    const russianText = renderTtgDescription(russianAbility?.description)
    if (russianText) enrichedAbilityCount += 1
    else {
      fallbackAbilityCount += 1
    }

    return {
      name,
      englishName: ability.name.replace(/\s*\{@recharge (\d+)\}/g, ' (Recharge $1–6)'),
      text: normalizeGeneratedText(russianText || abilitySummary(monster, ability))
    }
  })
}

function crValue(monster) {
  const raw = monster.cr?.cr ?? monster.cr
  return !raw || raw === '?' ? '—' : String(raw)
}

function proficiencyBonus(cr, monster) {
  if (monster.pbNote) return monster.pbNote.includes('summoner') ? 'Равен бонусу мастерства призвавшего существа' : 'Равен вашему бонусу мастерства'
  if (cr === '—') return 'Зависит от призыва'
  const numeric = cr.includes('/') ? Number(cr.split('/')[0]) / Number(cr.split('/')[1]) : Number(cr)
  return `+${numeric >= 29 ? 9 : numeric >= 25 ? 8 : numeric >= 21 ? 7 : numeric >= 17 ? 6 : numeric >= 13 ? 5 : numeric >= 9 ? 4 : numeric >= 5 ? 3 : 2}`
}

async function loadSources() {
  const entries = []
  for (const [source, file] of Object.entries(SOURCE_FILES)) {
    let response
    let lastError
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        response = await fetch(`${DATA_ROOT}/${file}`)
        if (response.ok) break
        lastError = new Error(`HTTP ${response.status}`)
      } catch (error) {
        lastError = error
      }
      if (attempt < 3) await new Promise(resolve => setTimeout(resolve, attempt * 750))
    }
    if (!response) throw new Error(`Не удалось загрузить ${file}: ${lastError?.message || 'ошибка сети'}`)
    if (!response.ok) throw new Error(`Не удалось загрузить ${file}: HTTP ${response.status}`)
    const data = await response.json()
    entries.push(...(data.monster || []).map(monster => ({ monster, source })))
  }
  return entries
}

async function loadRussianSources() {
  const results = new Map()
  for (let offset = 0; offset < CREATURES.length; offset += 6) {
    const batch = CREATURES.slice(offset, offset + 6)
    const entries = await Promise.all(batch.map(async ([englishName, , source]) => {
      const id = `${slugify(englishName)}-${source.toLowerCase()}`
      let response
      let lastError
      for (let attempt = 1; attempt <= 4; attempt++) {
        try {
          response = await fetch(`${RUSSIAN_DATA_ROOT}/${id}`)
          if (response.ok) break
          lastError = new Error(`HTTP ${response.status}`)
        } catch (error) {
          lastError = error
        }
        if (attempt < 4) await new Promise(resolve => setTimeout(resolve, attempt * 500))
      }
      if (!response?.ok) {
        console.warn(`Не удалось обновить русский статблок ${englishName} (${source}): ${lastError?.message || 'ошибка сети'}`)
        return [id, null]
      }
      return [id, await response.json()]
    }))
    entries.forEach(([id, data]) => results.set(id, data))
  }
  return results
}

let cachedCreatures = new Map()
try {
  const cachedPayload = JSON.parse(await readFile(OUTPUT, 'utf8'))
  cachedCreatures = new Map((cachedPayload.creatures || []).map(creature => [creature.id, creature]))
} catch {
  // При первом запуске файла ещё нет; импорт продолжается без кэша.
}

const sourceEntries = await loadSources()
const russianSources = await loadRussianSources()

const creatures = CREATURES.map(([englishName, title, source]) => {
  const found = sourceEntries.find(entry => entry.source === source && entry.monster.name === englishName)
  if (!found) throw new Error(`Не найден статблок ${englishName} (${source})`)
  const monster = found.monster
  const id = `${slugify(englishName)}-${source.toLowerCase()}`
  const russianMonster = russianSources.get(id)
  const cachedCreature = cachedCreatures.get(id)
  const cr = crValue(monster)
  const type = formatType(monster.type)
  const abilities = (rawKey, outputKey) => russianMonster
    ? formatAbilityBlock(monster, rawKey, russianMonster)
    : cachedCreature?.[outputKey] || formatAbilityBlock(monster, rawKey, null)

  return {
    id,
    title,
    englishName,
    source,
    sourceTitle: SOURCE_TITLES[source],
    sourcePage: monster.page || null,
    cr,
    type: type.type,
    types: type.types,
    typeLabel: type.typeLabel,
    typeTags: type.tags,
    sizes: (monster.size || []).map(size => SIZE_LABELS[size] || size),
    armorClass: formatArmorClass(monster.ac),
    hitPoints: formatHitPoints(monster.hp),
    speed: formatSpeed(monster.speed),
    proficiencyBonus: proficiencyBonus(cr, monster),
    stats: Object.fromEntries(Object.keys(ABILITY_LABELS).map(key => [key, `${monster[key]} (${modifier(monster[key])})`])),
    savingThrows: monster.save ? Object.entries(monster.save).map(([key, value]) => `${ABILITY_LABELS[key] || key} ${value}`).join(', ') : '—',
    skills: monster.skill ? Object.entries(monster.skill).map(([key, value]) => `${SKILL_LABELS[key] || key} ${value}`).join(', ') : '—',
    damageResistances: flattenDefenses(monster.resist, 'resist').join(', ') || '—',
    damageImmunities: flattenDefenses(monster.immune, 'immune').join(', ') || '—',
    conditionImmunities: flattenDefenses(monster.conditionImmune, 'condition').join(', ') || '—',
    senses: formatSenses(monster),
    languages: formatLanguages(monster.languages),
    traits: abilities('trait', 'traits'),
    actions: abilities('action', 'actions'),
    bonusActions: abilities('bonus', 'bonusActions'),
    reactions: abilities('reaction', 'reactions'),
    legendaryActions: abilities('legendary', 'legendaryActions'),
    reference: REFERENCE_LINKS[englishName] || null
  }
})

function numericCr(cr) {
  if (cr === '—') return -1
  if (cr.includes('/')) {
    const [numerator, denominator] = cr.split('/').map(Number)
    return numerator / denominator
  }
  return Number(cr)
}

creatures.sort((a, b) => numericCr(a.cr) - numericCr(b.cr) || a.title.localeCompare(b.title, 'ru'))

const payload = {
  edition: '2024',
  dataRevision: DATA_REVISION,
  sources: SOURCE_TITLES,
  creatures
}

await mkdir(dirname(OUTPUT), { recursive: true })
await writeFile(OUTPUT, `${JSON.stringify(payload, null, 2)}\n`, 'utf8')
console.log(`Создано ${OUTPUT}: ${creatures.length} существ.`)
console.log(`Русские полные описания: ${enrichedAbilityCount}; резервные краткие: ${fallbackAbilityCount}.`)
