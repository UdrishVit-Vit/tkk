import {
  LORE_OGNI_ENTRIES,
  LORE_OGNI_SOURCE,
  LORE_OGNI_SEASONS,
} from './loreOgniGlossary/index.js'

export { cutOgniPayload } from './loreOgniGlossary/index.js'

import { normalizeLoreEntity } from './loreEntity.js'
import { buildLoreLinks } from './loreRelations.js'
import { dossierEntries, HOMONYMS } from './loreDossiers.js'

export { LORE_RELATION_TYPES, LORE_RELATIONS } from './loreRelations.js'

export {
  LORE_ENTITY_SCHEMA,
  LORE_ENTITY_STATUSES,
  LORE_ENTITY_TYPES,
  SLUG_PATTERN,
} from './loreEntity.js'

export const LORE_GLOSSARY_CATEGORIES = [
  { id: 'foundations', title: 'Основа мира', short: 'Космология, устройство реальности и первосилы' },
  { id: 'beings', title: 'Существа и народы', short: 'Создатели, древние существа и смертные народы' },
  { id: 'characters', title: 'Лица', short: 'Герои, спутники и все, кого встречали в пути' },
  { id: 'places', title: 'Места', short: 'Города, земли и иные области мироздания' },
  { id: 'powers', title: 'Силы и сообщества', short: 'Ордены, институты, законы и объединения' },
  { id: 'history', title: 'События и эпохи', short: 'Поворотные моменты Нити Башни Мафраш' },
  { id: 'practices', title: 'Практики и предметы', short: 'Магия, знания, материалы и реликвии' },
  { id: 'culture', title: 'Обычаи и языки', short: 'Речь, обряды, ремёсла и повседневный уклад' },
]

// A record may override `source` and `attributedTo`. Current archive entries
// inherit this provenance; later supplements can add their own source entry
// without changing the glossary UI.
export const LORE_GLOSSARY_SOURCES = {
  'threads-of-unseen': {
    id: 'threads-of-unseen',
    mark: 'TU',
    title: 'The Threads of Unseen',
    attributedTo: 'Башня Мафраш',
    description: 'Основной источник нынешнего свода понятий мира Эноа.',
  },
  [LORE_OGNI_SOURCE.id]: {
    ...LORE_OGNI_SOURCE,
    mark: 'ОГ',
    title: 'Огни',
  },
}

export const LORE_GLOSSARY_DEFAULT_SOURCE = 'threads-of-unseen'

// Свод Башни Мафраш — то, что архив знает о мире сам по себе.
// Ниже к нему подмешиваются сведения кампании: см. LORE_GLOSSARY.
export const LORE_GLOSSARY_ARCHIVE = [
  {
    id: 'enoa', term: 'Эноа', category: 'foundations', aliases: ['Новое Святилище'],
    definition: 'Мир смертных и новое Святилище, возникшее вокруг Искры после древнейших эпох. После Раскола Эноа разделилась на осколки, крупнейшим из которых стал Даскар.',
    related: ['svyatilishche', 'iskra', 'daskar'], history: 'epoha-sveta',
  },
  {
    id: 'purush', term: 'Пуруш', category: 'foundations', aliases: ['Жертва', 'Рогатая Луна', 'Двуликий'],
    definition: 'Изначальное существо, превратившее своё тело в Колыбель для угасающей Искры. Разделил себя на восемь первооснов — Садхияров — и создал мор’хоров и эхор’нуров.',
    related: ['kolybel', 'iskra', 'sadhiyary'], history: 'zhertva-purusha',
  },
  {
    id: 'iskra', term: 'Искра', category: 'foundations', aliases: ['Вечный источник'],
    definition: 'Вечный источник света, жизни и внутренней силы, ради спасения которого Пуруш создал Колыбель. Искра присутствует в творениях богов и остаётся центром борьбы за власть над миром.',
    related: ['purush', 'kolybel', 'kuznya-sudby'], history: 'zhertva-purusha',
  },
  {
    id: 'kolybel', term: 'Колыбель', category: 'foundations', aliases: ['Колыбель Искры'],
    definition: 'Первоначальная оболочка мира, созданная Пурушем из собственного тела для сохранения Искры. В её сердце находится Кузня Судьбы.',
    related: ['purush', 'iskra', 'kuznya-sudby'], history: 'zhertva-purusha',
  },
  {
    id: 'sadhiyary', term: 'Садхияры', category: 'foundations', aliases: ['Первоосновы'],
    definition: 'Восемь изначальных сущностей, на которые Пуруш разделил себя. Они построили Святилище, восстановили Плетение и стали первыми хранителями устройства мира.',
    related: ['purush', 'svyatilishche', 'pletenie'], history: 'epoha-rassveta',
  },
  {
    id: 'svyatilishche', term: 'Святилище', category: 'foundations', aliases: ['Первое Святилище'],
    definition: 'Первый упорядоченный мир вокруг Кузни Судьбы, сотканный Садхиярами. После древних катастроф его образ продолжился в новом Святилище — Эноа.',
    related: ['sadhiyary', 'kuznya-sudby', 'enoa'], history: 'epoha-rassveta',
  },
  {
    id: 'kuznya-sudby', term: 'Кузня Судьбы', category: 'foundations', aliases: ['Кузня Золотых Нитей'],
    definition: 'Мастерская Судьбы, возведённая в Сердце Колыбели. Здесь раскрываются бесконечные переплетения Судьбы: мор’хоры охраняли тут Искру, а Ке’эль позднее выпустил Нити Судьбы.',
    related: ['serdtse-kolybeli', 'iskra', 'niti-sudby', 'morhory'], history: 'epoha-rassveta',
  },
  {
    id: 'serdtse-kolybeli', term: 'Сердце Колыбели', category: 'places', aliases: [],
    definition: 'Сердцевина Колыбели, куда Пуруш поместил Искру и вокруг которой возведена Кузня Судьбы. Здесь стояла стража мор’хоров, и здесь же они пролили кровь, потянувшись к Искре.',
    related: ['kolybel', 'kuznya-sudby', 'iskra', 'morhory'], history: 'epoha-rassveta',
  },
  {
    id: 'niti-sudby', term: 'Нити Судьбы', category: 'foundations', aliases: ['Нити рока'],
    definition: 'Пути существ и событий, исходящие из Кузни Судьбы. Их можно читать по знамениям; на концах нитей Ке’эль увидел смерть созданий своих братьев.',
    related: ['kuznya-sudby', 'pletenie', 'temnaya-nit'], history: 'epoha-pererozhdeniya',
  },
  {
    id: 'pletenie', term: 'Плетение', category: 'foundations', aliases: ['Полотно мира'],
    definition: 'Защитный и упорядочивающий узор реальности, созданный Садхиярами вокруг Святилища. Образы нити, имени и судьбы в поздних учениях восходят к этому принципу.',
    related: ['sadhiyary', 'niti-sudby', 'ner'], history: 'epoha-rassveta',
  },
  {
    id: 'vual', term: 'Вуаль', category: 'foundations', aliases: ['Космическая Вуаль'],
    definition: 'Граница и одновременно чуждая область за пределами устойчивой реальности. За Вуалью таится «всё и ничего»; её разрывы впускают искажения, чудовищ и чужаков.',
    related: ['dalnie-chertogi', 'krov-elora', 'izir', 'esha'], history: 'epoha-lyudey',
  },
  {
    id: 'dalnie-chertogi', term: 'Дальние Чертоги', category: 'foundations', aliases: ['Грань реальности'],
    definition: 'Область на границе сущего, куда Садхияры изгнали Зугрула. Попытки открыть путь туда становились причиной катастроф и искажений мира.',
    related: ['vual', 'zugrul', 'voyna-vrat'], history: 'epoha-rassveta',
  },
  {
    id: 'tingir', term: 'Тингир', category: 'foundations', aliases: ['Реалии Тингира'],
    definition: 'Созданное ослабевшими Улунгурами место отдыха и восстановления, расположенное близко к Искре. Из его врат в мир сходили небесные дети богов.',
    related: ['ulungury', 'iskra', 'ashury'], history: 'epoha-pererozhdeniya',
  },

  {
    id: 'morhory', term: 'Мор’хоры', category: 'beings', aliases: ['Стражи Искры'],
    definition: 'Созданные Пурушем хранители, помещённые в Кузню Судьбы. Поддавшись соблазну, они потянулись к Искре, пролили кровь в её Сердце и были изгнаны.',
    related: ['purush', 'kuznya-sudby', 'iskra'], history: 'epoha-rassveta',
  },
  {
    id: 'ehornury', term: 'Эхор’нуры', category: 'beings', aliases: ['Наблюдатели'],
    definition: 'Созданные Пурушем наблюдатели, подвешенные над Колыбелью. Узрев переплетения Судьбы, они покинули Святилище, чтобы исполнить предназначенное нитями.',
    related: ['purush', 'niti-sudby', 'kolybel'], history: 'epoha-rassveta',
  },
  {
    id: 'meridiri', term: 'Меридиры', category: 'beings', aliases: ['Совершенные существа'],
    definition: 'Первые совершенные творения Садхияров. Зависть к мор’хорам и последующие войны исказили их природу; некоторые древние меридиры пережили эпохи в глубинах мира.',
    related: ['sadhiyary', 'morhory', 'voyna-iskry'], history: 'epoha-rassveta',
  },
  {
    id: 'ulungury', term: 'Улунгуры', category: 'beings', aliases: ['Четыре Света', 'Родившие Свет'],
    definition: 'Четыре божественных Света, соединившиеся с Искрой, победившие Садхияров и ставшие новыми хозяевами Колыбели. Их творения положили начало смертным народам.',
    related: ['voyna-iskry', 'tingir', 'zharify'], history: 'epoha-pererozhdeniya',
  },
  {
    id: 'zvezdy', term: 'Звёзды', category: 'beings', aliases: ['Малые светила'],
    definition: 'Небесные сущности, призванные Улунгурами для помощи в сотворении мира. Некоторые стали создателями народов, учителями смертных или объектами поклонения.',
    related: ['ulungury', 'nochnaya-kolesnitsa', 'kolossy'], history: 'epoha-sveta',
  },
  {
    id: 'ula', term: 'Ула', category: 'foundations', aliases: ['Красное солнце', 'Мстительное солнце'],
    definition: 'Красное мстительное солнце Эноа, выжигавшее земли досуха. Даскар сбил Улу с неба, а её осколки сокрыли от мира, чтобы она больше никогда не увидела синего неба.',
    related: ['shamas', 'azrak', 'leto-treh-solnts'], history: 'epoha-sveta',
  },
  {
    id: 'azrak', term: 'Азрак', category: 'foundations', aliases: ['Ледяное солнце'],
    definition: 'Ледяное солнце Эноа, приносившее смерть и застой, пока Даскар не сбил его с неба. Осколки Азрака дремлют по всему континенту и манят искателей поднять их вновь.',
    related: ['shamas', 'ula', 'leto-treh-solnts'], history: 'epoha-sveta',
  },
  {
    id: 'manu', term: 'Ману', category: 'foundations', aliases: ['Белая луна', 'Око Ночи'],
    definition: 'Белая луна и Око Ночи, хранитель тайн и исцеления, покровитель азартных игр. Ману — врата в царства Чоку и привратник снов; он занял почётное место, чтобы править ночью, пока не будет сплетена Золотая Нить.',
    related: ['eri', 'dayya', 'choku'], history: 'epoha-sveta',
  },
  {
    id: 'eri', term: 'Эри', category: 'foundations', aliases: ['Кровавая луна'],
    definition: 'Кровавая луна — символ цикла, смерти и искупления. Поддавшись словам Ману, Эри убила свою сестру Дайю и окрасила руки в кроваво-красный цвет; многие гильдии убийц почитают её.',
    related: ['manu', 'dayya'], history: 'epoha-sveta',
  },
  {
    id: 'dayya', term: 'Дайя', category: 'foundations', aliases: ['Мёртвая луна'],
    definition: 'Мёртвая луна и самая могучая из трёх. Она была ближе всех к миру, пока не пала от руки сестры; её тело лежит осколками в Эноа в вечном сне.',
    related: ['manu', 'eri'], history: 'epoha-sveta',
  },
  {
    id: 'zharify', term: 'Зарифы', category: 'beings', aliases: ['Первые Дети Сумуга'],
    definition: 'Смертные, созданные Сумугом и наделённые сочувствием и жизнью. После Порчи они покинули прежние земли и отправились искать новый дом.',
    related: ['ulungury', 'irdashi', 'porcha'], history: 'epoha-pererozhdeniya',
  },
  {
    id: 'irdashi', term: 'Ирдаши', category: 'beings', aliases: ['Дети Эоса'],
    definition: 'Разумные существа, созданные Эосом под светом луны Дайи и наделённые свободой выбора. Открытие древних врат привело их к Войне Врат и последующей Порче.',
    related: ['zharify', 'voyna-vrat', 'porcha'], history: 'epoha-pererozhdeniya',
  },
  {
    id: 'serafimy', term: 'Серафимы', category: 'beings', aliases: ['Истинные дети Улунгуров'],
    definition: 'Созданные Улунгурами небесные воины, пришедшие смертным на помощь во время Войны Врат. Часть серафимов восстала и укрылась в первых слоях Лабиринта.',
    related: ['voyna-vrat', 'labirint', 'ashury'], history: 'epoha-pererozhdeniya',
  },
  {
    id: 'ashury', term: 'Ашуры', category: 'beings', aliases: ['Дети Улунгуров'],
    definition: 'Небожители Тингира, посланные остановить Мела Озара от открытия врат в Дальние Чертоги во время Очищения.',
    related: ['tingir', 'ochishchenie', 'astry'], history: 'epoha-lyudey',
  },
  {
    id: 'kolossy', term: 'Колоссы', category: 'beings', aliases: ['Дети Морнара'],
    definition: 'Могучие полубоги, созданные Морнаром из крови и глины Колыбели для поисков Вечного Змея. Их потомков называют кровью гигантов.',
    related: ['zvezdy', 'vechny-zmey', 'adzhaidy'], history: 'epoha-pererozhdeniya',
  },
  {
    id: 'adzhaidy', term: 'Аджаиды', category: 'beings', aliases: ['Искатели камня и туннелей'],
    definition: 'Народ, созданный звёздами Ночной Колесницы. Первые аджаиды спустились в недра мира, разыскивая Вечного Змея; позднее их царство возникло в дюнах Меша.',
    related: ['nochnaya-kolesnitsa', 'vechny-zmey', 'baraskus'], history: 'epoha-pererozhdeniya',
  },
  {
    id: 'virmy', term: 'Вирмы', category: 'beings', aliases: ['Древние змеи'],
    definition: 'Порождения Иджин’Ана, возникавшие в ответ на эмоции первых искателей. Древние вирмы становились правителями, защитниками и тиранами смертных земель.',
    related: ['vechny-zmey', 'adzhaidy', 'ha-ar-i-marduk'], history: 'epoha-pererozhdeniya',
  },
  {
    id: 'udrishi', term: 'Удриши', category: 'beings', aliases: ['Дети Эрила и Урмы'],
    definition: 'Один из народов Эпохи Света, созданный звёздами Эрилом и Урмой. Удриши пережили Раскол и Лето Трёх Солнц, скрываясь от палящих светил.',
    related: ['zvezdy', 'leto-treh-solnts', 'daskar'], history: 'epoha-sveta',
  },
  {
    id: 'lyudi', term: 'Люди', category: 'beings', aliases: ['Дети озера Гор'],
    definition: 'Чужаки с короткой жизнью, прибывшие к озеру Гор из-за Вуали. Мор’хоры и эхор’нуры передали им знания Традиций, после чего одиннадцать родов людей расселились по Эноа.',
    related: ['ozero-gor', 'traditsii', 'krov-elora'], history: 'epoha-lyudey',
  },
  {
    id: 'oyrdugi', term: 'Ойрдуги', category: 'beings', aliases: ['Сыны Нефрита'],
    definition: 'Народ, часть которого после Раскола основала Нефритовую культуру в Пламенном Языке. Их традиции тесно связаны со стигматами и идеей очищения.',
    related: ['plamennyi-yazyk', 'stigmata', 'raskol'], history: 'epoha-vosstanovleniya',
  },
  {
    id: 'hudduliny', term: 'Худдулины', category: 'beings', aliases: ['Народ выжженной степи'],
    definition: 'Кочевой народ северо-восточного Даскара, возводящий происхождение к детям Сумуга. Их общество подчинилось суровому Закону Бесконечных Небес.',
    related: ['daskar', 'zakon-nebes', 'vysokii-krug'], history: 'epoha-vosstanovleniya',
  },
  {
    id: 'chotgory', term: 'Чотгоры', category: 'beings', aliases: ['Слепцы', 'Слепые Провидцы'],
    definition: 'Те, кто не вышел из убежищ после Лета Трёх Солнц и не начал давать друг другу имена. Их боятся как поглощённых тьмой или почитают как свободных духов пустынь.',
    related: ['leto-treh-solnts', 'bezimiannye', 'udrishi'], history: 'epoha-vosstanovleniya',
  },
  {
    id: 'krov-elora', term: 'Кровь Элора', category: 'beings', aliases: ['Потерянный Старший Брат'],
    definition: 'Арьергард народа людей, надолго оставшийся за Вуалью и изменённый её вихрями. Не сумев вернуться, они поселились там, где граница реальности наиболее сильна.',
    related: ['lyudi', 'vual', 'dalnie-chertogi'], history: 'epoha-lyudey',
  },

  {
    id: 'titania', term: 'Титания', category: 'places', aliases: ['Белый город', 'Белая Цитадель'],
    definition: 'Великая колыбель цивилизации Эпохи Света и место основания Башни Мафраш. Пережила Лето Трёх Солнц за закрытыми вратами, после чего впервые в своей истории подверглась набегу худдулинов: библиотеки были сожжены, храмы разрушены. Исчезла в Последнюю Ночь, оставив кратер, и вернулась из Дальних Чертогов разрушенной оболочкой, чьи улицы кишат бывшими жителями.',
    related: ['bashnya-mafrash', 'poslednyaya-noch', 'dalnie-chertogi'], history: 'epoha-sveta',
  },
  {
    id: 'bashnya-mafrash', term: 'Башня Мафраш', category: 'places', aliases: ['Мафраш', 'Башня знаний'],
    definition: 'Башня знаний, заложенная в Титании в Эпоху Света. Её магусы защищали город, а архивы башни сохраняют Нить истории и различные версии событий Эноа.',
    related: ['titania', 'medrese-mafrash', 'pletenie'], history: 'epoha-sveta',
  },
  {
    id: 'daskar', term: 'Даскар', category: 'places', aliases: ['Крупнейший осколок Эноа'],
    definition: 'Крупнейший осколок мира после Раскола и центр истории Эпохи Восстановления и Времени Ветров. Назван в честь героя, завершившего Лето Трёх Солнц.',
    related: ['raskol', 'leto-treh-solnts', 'vremya-vetrov'], history: 'epoha-vosstanovleniya',
  },
  {
    id: 'ozero-gor', term: 'Озеро Гор', category: 'places', aliases: ['Берега озера Гор'],
    definition: 'Место появления первых людей в Эноа после того, как вселенная растрескалась и чужаки ступили в мир из-за Вуали.',
    related: ['lyudi', 'vual', 'traditsii'], history: 'epoha-lyudey',
  },
  {
    id: 'labirint', term: 'Лабиринт', category: 'places', aliases: ['Семь Лабиринтов'],
    definition: 'Слои реальности, где укрылись восставшие серафимы и их последователи. Владыки Лабиринта жаждали Искры и выводили в мир смертных свои орды и левиафанов.',
    related: ['serafimy', 'vtoroe-znamenie', 'iskra'], history: 'epoha-pererozhdeniya',
  },
  {
    id: 'spiralnoe-ustye', term: 'Спиральное Устье', category: 'places', aliases: ['Кристальный шпиль'],
    definition: 'Тёмное место Святилища у истока реки Чо, где Ке’эль затворился, чтобы надзирать за Нитями Судьбы и смертью творений своих братьев.',
    related: ['tingir', 'niti-sudby', 'ulungury'], history: 'epoha-pererozhdeniya',
  },
  {
    id: 'more-mriya', term: 'Море Мрия', category: 'places', aliases: ['Воды страданий'],
    definition: 'Море, возникшее из слёз Мулунгура, Сумуга и Ке’эля, когда они решили навеки запечатать Эоса.',
    related: ['obman', 'ulungury', 'daskar'], history: 'epoha-lyudey',
  },
  {
    id: 'krasnye-peski', term: 'Красные Пески', category: 'places', aliases: ['Южные пески'],
    definition: 'Южная область Даскара, богатая мифрасом. Открытие залежей превратило её в цель экспедиций, торговли и колонизации.',
    related: ['mifras', 'mifrasovyi-put', 'daskar'], history: 'vremya-vetrov',
  },
  {
    id: 'baragkar', term: 'Бараг’кар', category: 'places', aliases: ['Город договора'],
    definition: 'Центральный торговый город Северного Даскара, выросший из мира между Титанией и худдулинами. Во Время Ветров здесь собирается Высокий Круг.',
    related: ['vysokii-krug', 'titania', 'hudduliny'], history: 'epoha-vosstanovleniya',
  },
  {
    id: 'abora', term: 'Абора', category: 'places', aliases: ['Город Торговли'],
    definition: 'Нейтральный торговый город между владениями А’агры и Марака, основанный там, где встретились народы двух великих вирмов.',
    related: ['ha-ar-i-marduk', 'gildii', 'zakon-nebes'], history: 'epoha-vosstanovleniya',
  },
  {
    id: 'maraq', term: 'Марак', category: 'places', aliases: ['Маракийский Султанат', 'Город Шпилей и Уз'],
    definition: 'Земли и город-государство бывшего Маракийского Султаната. После гибели великого вирма ими правит Серый Султан, соединивший военную традицию Марака с торговым влиянием.',
    related: ['ha-ar-i-marduk', 'mifrasovyi-put', 'daskar'], history: 'vremya-vetrov',
  },
  {
    id: 'plamennyi-yazyk', term: 'Пламенный Язык', category: 'places', aliases: ['Земли Нефрита'],
    definition: 'Южная земля Даскара, ставшая убежищем Нефритовой культуры и забытых традиций. Её красота соседствует с властью касты Стигмаров и тёмными практиками.',
    related: ['oyrdugi', 'stigmata', 'daskar'], history: 'vremya-vetrov',
  },

  {
    id: 'traditsii', term: 'Традиции', category: 'powers', aliases: ['Великие Традиции'],
    definition: 'Древние законы и знания, переданные людям мор’хорами и эхор’нурами. Они направляли первые человеческие королевства и позднее по-разному толковались народами Даскара.',
    related: ['lyudi', 'morhory', 'ehornury'], history: 'epoha-lyudey',
  },
  {
    id: 'bratstvo-simurga', term: 'Братство Золотого Симурга', category: 'powers', aliases: ['Защитники смертных', 'Золотой Симург'],
    definition: 'Братство, основанное в год Лазурного Каша как сила, призванная защищать всех смертных. Знак его — орёл с телом льва, хвостом рыбы и крыльями небесных существ. Во главе стоял Охурозар, разумом был его младший брат Мелозар, крыльями — мор’хор Эмефеюс и древняя Цам, а клинком — Всадники Шамаса. Обещало не славу и не деньги, а свободу от судьбы; собрало под своё знамя четыре из десяти королевств и десять тысяч солдат, а после гибели Охурозара треснуло по швам и растворилось в империи Царя Царей.',
    related: ['mel-ozar', 'ohurozar', 'vremena-koroley', 'astry', 'vsadniki-shamasa', 'emefeyus', 'tsam'], history: 'epoha-lyudey',
  },
  {
    id: 'vysokii-krug', term: 'Высокий Круг', category: 'powers', aliases: ['Высший Круг'],
    definition: 'Совет правителей и представителей северных земель Даскара. Создал общие законы, поддержал гильдии и во Время Ветров собирается в Бараг’каре.',
    related: ['zakon-nebes', 'gildii', 'baragkar'], history: 'epoha-vosstanovleniya',
  },
  {
    id: 'zakon-nebes', term: 'Закон Небес', category: 'powers', aliases: ['Закон Бесконечных Небес'],
    definition: 'Суровый общий закон северных народов Даскара, утверждённый Высоким Кругом. Гильдии отвечают за соблюдение закона своими членами.',
    related: ['vysokii-krug', 'gildii', 'hudduliny'], history: 'epoha-vosstanovleniya',
  },
  {
    id: 'gildii', term: 'Гильдии', category: 'powers', aliases: ['Гильдии Даскара'],
    definition: 'Самоуправляемые объединения, ставшие центрами торговли, кредита, экспедиций, наёмной силы и религиозных услуг. Их власть особенно выросла после принятия Закона Небес.',
    related: ['zakon-nebes', 'vysokii-krug', 'mifrasovyi-put'], history: 'epoha-vosstanovleniya',
  },
  {
    id: 'narekateli', term: 'Нарекатели', category: 'powers', aliases: ['Орден Белой Веры'],
    definition: 'Могущественное движение, возникшее вокруг Граара Пробуждённого после его видения детей без Н Е Р. Нарекатели восстанавливают защиту имени, помогают павшим во тьму и участвуют во власти и правосудии Даскара.',
    related: ['ner', 'bezimiannye', 'zakon-nebes'], history: 'vremya-vetrov',
  },
  {
    id: 'ner', term: 'Н Е Р', category: 'powers', aliases: ['Истинное имя', 'Защитное плетение имени'],
    definition: 'Истинное имя и защитное плетение, удерживающее личность и реальность от распада. После исчезновения Зугрула дети стали рождаться без Н Е Р, а Нарекатели начали восстанавливать повреждённую защиту.',
    related: ['narekateli', 'bezimiannye', 'pletenie'], history: 'vremya-vetrov',
  },
  {
    id: 'bezimiannye', term: 'Безымянные', category: 'powers', aliases: ['Изгои Даскара'],
    definition: 'Люди, лишённые Н Е Р или отмеченные последствиями Объятия. Их считают испорченными, не допускают к цветам гильдий и вытесняют в трущобы и пустоши.',
    related: ['ner', 'narekateli', 'obyatie'], history: 'vremya-vetrov',
  },
  {
    id: 'medrese-mafrash', term: 'Медресе Мафраш', category: 'powers', aliases: ['Медресе Магусов'],
    definition: 'Учебная и магическая традиция Башни Мафраш, связанная с хранением знаний и подготовкой магусов различных школ.',
    related: ['bashnya-mafrash', 'magusy', 'pletenie'], history: 'epoha-sveta',
  },
  {
    id: 'niti-maraka', term: 'Нити Марака', category: 'powers', aliases: ['Влияние Серого Султана'],
    definition: 'Сеть скрытого экономического и политического влияния Марака: инвестиции, поддержка гильдий и управление чужими решениями без открытого завоевания.',
    related: ['gildii', 'mifrasovyi-put', 'maraq'], history: 'vremya-vetrov',
  },
  {
    id: 'mifrasovyi-put', term: 'Мифрасовый Путь', category: 'powers', aliases: ['Торговый путь мифраса'],
    definition: 'Организованный торговый маршрут от Мифрасовых Врат в Хурхоне до Марака, построенный после открытия мифраса в Красных Песках.',
    related: ['mifras', 'krasnye-peski', 'gildii'], history: 'vremya-vetrov',
  },
  {
    id: 'bogi-kochevniki', term: 'Боги-кочевники', category: 'powers', aliases: ['Эрз'],
    definition: 'Могущественные и изменчивые сущности, занявшие исчезнувшие или забытые домены после того, как Улунгуры отвернулись от мира. Народы Эноа сделали их объектами почитания.',
    related: ['zvezdy', 'tingir', 'daskar'], history: 'epoha-vosstanovleniya',
  },

  {
    id: 'voyna-iskry', term: 'Война Искры', category: 'history', aliases: ['Пришествие Четырёх Светов'],
    definition: 'Борьба Садхияров и искажённых меридиров против Четырёх Светов за Искру. Завершилась поражением Садхияров и началом власти Улунгуров.',
    related: ['iskra', 'sadhiyary', 'ulungury'], history: 'epoha-rassveta',
  },
  {
    id: 'pervoe-znamenie', term: 'Первое Знамение', category: 'history', aliases: ['Эхо Нитей Судьбы'],
    definition: 'Знамение, явленное при затмении Ману луной Эри. Оно предшествовало открытию древних врат ирдашами и Войне Врат.',
    related: ['niti-sudby', 'voyna-vrat', 'irdashi'], history: 'epoha-pererozhdeniya',
  },
  {
    id: 'voyna-vrat', term: 'Война Врат', category: 'history', aliases: ['Открытие пути к Дальним Чертогам'],
    definition: 'Катастрофа, начавшаяся после открытия ирдашами древних врат Зугрула. В мир проникли аберрации, а Улунгуры создали серафимов для защиты смертных.',
    related: ['irdashi', 'serafimy', 'dalnie-chertogi'], history: 'epoha-pererozhdeniya',
  },
  {
    id: 'porcha', term: 'Порча', category: 'history', aliases: ['Искажение ирдашей'],
    definition: 'Медленное проникновение последствий открытых врат в ирдашей и их Искру. Новые поколения менялись и становились всё более звероподобными.',
    related: ['voyna-vrat', 'irdashi', 'vual'], history: 'epoha-pererozhdeniya',
  },
  {
    id: 'vremena-koroley', term: 'Времена Королей', category: 'history', aliases: ['Десять Королевств'],
    definition: 'Период расцвета и последующего падения десяти человеческих королевств, основанных во имя Традиций. Борьба за власть превратила их в мрачные отражения первоначального замысла: Король стали вбивал гвозди в живых, Король крови кормил гидру собственными детьми, Король сияния растягивал свою искру, а Му и Ло заперли целый город в кругах времени. Конец им положила Война Королей.',
    related: ['lyudi', 'traditsii', 'mel-ozar', 'fahat', 'tusus', 'vetamon', 'mu-i-lo', 'voyna-koroley'], history: 'epoha-lyudey',
  },
  {
    id: 'obman', term: 'Обман', category: 'history', aliases: ['День Обмана'],
    definition: 'Событие, в ходе которого Мел Озар заманил Эоса в ловушку трёх других Улунгуров. Эос был навеки связан в собственном карманном измерении.',
    related: ['mel-ozar', 'ulungury', 'more-mriya'], history: 'epoha-lyudey',
  },
  {
    id: 'vtoroe-znamenie', term: 'Второе Знамение', category: 'history', aliases: ['Чёрное солнце'],
    definition: 'Пришествие сил Лабиринта под чёрным солнцем. Семь левиафанов и пробуждённый меридир сопровождали их к Вратам Эоса.',
    related: ['labirint', 'meridiri', 'vrata-eosa'], history: 'epoha-lyudey',
  },
  {
    id: 'ochishchenie', term: 'Очищение', category: 'history', aliases: ['Священный поход Мела Озара'],
    definition: 'Поход Мела Озара против Дальних Чертогов, выросший из его одержимости светом. Попытка остановить короля привела к Великому Раздору и войне смертных, небожителей и звёзд.',
    related: ['mel-ozar', 'ashury', 'astry'], history: 'epoha-lyudey',
  },
  {
    id: 'raskol', term: 'Раскол', category: 'history', aliases: ['Раскол мира'],
    definition: 'Катастрофа, раздробившая Эноа на отдельные осколки и завершившая прежний мировой порядок. История крупнейшего осколка продолжилась как история Даскара.',
    related: ['enoa', 'daskar', 'leto-treh-solnts'], history: 'epoha-lyudey',
  },
  {
    id: 'leto-treh-solnts', term: 'Лето Трёх Солнц', category: 'history', aliases: ['Бесконечное лето'],
    definition: 'Двести лет, когда Шамас, Азрак и Ула одновременно выжигали мир после Раскола. Эпоха завершилась, когда герой Даскар сбил два солнца луком Ша’.',
    related: ['daskar', 'udrishi', 'titania'], history: 'epoha-lyudey',
  },
  {
    id: 'poslednyaya-noch', term: 'Последняя Ночь', category: 'history', aliases: ['Возвращение Зугрула'],
    definition: 'Вторжение Зугрула в мир смертных. Вестники Бури выковали Копьё Судьбы и вошли во Врата Эоса; Титания исчезла, а два великих вирма пропали.',
    related: ['zugrul', 'titania', 'obyatie'], history: 'epoha-vosstanovleniya',
  },
  {
    id: 'obyatie', term: 'Объятие', category: 'history', aliases: ['Проклятие Объятия'],
    definition: 'Проклятие, появившееся после исчезновения Зугрула и защитного плетения Н Е Р. Оно меняет тела, судьбы и способности переживших его детей; в их глазах видна чёрная субстанция Изир.',
    related: ['ner', 'bezimiannye', 'izir'], history: 'epoha-vosstanovleniya',
  },
  {
    id: 'vremya-vetrov', term: 'Время Ветров', category: 'history', aliases: ['Нынешняя эпоха'],
    definition: 'Современная эпоха Эноа, наступившая через пятьдесят лет после Объятия. Нарекатели пытаются восстановить разорванное полотно мира, торговые пути вновь связывают Даскар, а Тёмная Нить предвещает новый конец.',
    related: ['obyatie', 'narekateli', 'temnaya-nit'], history: 'vremya-vetrov',
  },
  {
    id: 'temnaya-nit', term: 'Тёмная Нить', category: 'history', aliases: ['Последняя нить Кузни Судьбы'],
    definition: 'Цепь предзнаменований Времени Ветров, ведущая к возможному концу Эноа. Шаманы, колдуны и чтецы нитей видят в ней приближение пустоты и последнего поворота Колеса.',
    related: ['niti-sudby', 'kuznya-sudby', 'vremya-vetrov'], history: 'vremya-vetrov',
  },

  {
    id: 'astry', term: 'Астры', category: 'practices', aliases: ['Божественные оружия'],
    definition: 'Оружия, выкованные героями из пылающих звёздных молотов, дарованных Гендином. Владевших Астрами героев называли Шепотами.',
    related: ['shepoty', 'zvezdy', 'ochishchenie'], history: 'epoha-lyudey',
  },
  {
    id: 'shepoty', term: 'Шепоты', category: 'practices', aliases: ['Герои Астр'],
    definition: 'Герои, вооружённые Астрами и выступившие против безумия Мела Озара во время Великого Раздора.',
    related: ['astry', 'mel-ozar', 'ochishchenie'], history: 'epoha-lyudey',
  },
  {
    id: 'magusy', term: 'Магусы', category: 'practices', aliases: ['Мастера магии'],
    definition: 'Практики магии, способные работать с первобытными силами и плетением мира. Магусы Мафраша защищали Титанию и сохраняли традиции башни.',
    related: ['medrese-mafrash', 'bashnya-mafrash', 'pletenie'], history: 'epoha-vosstanovleniya',
  },
  {
    id: 'shamany', term: 'Шаманы', category: 'practices', aliases: ['Призывающие Эрз'],
    definition: 'Хранители кочевых практик, обращающиеся к богам-кочевникам и читающие знаки в огне. Во Время Ветров они первыми замечают приближение Тёмной Нити.',
    related: ['bogi-kochevniki', 'temnaya-nit', 'daskar'], history: 'vremya-vetrov',
  },
  {
    id: 'mifras', term: 'Мифрас', category: 'practices', aliases: ['Плоть павшей Звезды'],
    definition: 'Ценный минерал Красных Песков, вызвавший торговую лихорадку и строительство Мифрасового Пути. Архив утверждает, что это плоть павшей Звезды, ожидающей возрождения.',
    related: ['krasnye-peski', 'mifrasovyi-put', 'zvezdy'], history: 'vremya-vetrov',
  },
  {
    id: 'stigmata', term: 'Стигматы', category: 'practices', aliases: ['Печати Лабиринта'],
    definition: 'Телесные и духовные отметины, связанные с искажениями Лабиринта. Стигмары Пламенного Языка считают их великим проклятием и стремятся противопоставить им красоту.',
    related: ['labirint', 'oyrdugi', 'plamennyi-yazyk'], history: 'vremya-vetrov',
  },
  {
    id: 'izir', term: 'Изир', category: 'practices', aliases: ['Чёрная субстанция Объятия'],
    definition: 'Чистейшее проявление Вуали в том имени, которым его зовут увидевшие в нём проклятие: мутная чёрная субстанция, заметная в глазах переживших Объятие. Те, кто считает это же явление благословением, называют его Эсхой.',
    related: ['vual', 'esha', 'obyatie', 'bezimiannye'], history: 'epoha-vosstanovleniya',
  },
  {
    id: 'vechny-zmey', term: 'Иджин’Ан', category: 'practices', aliases: ['Вечный Змей'],
    definition: 'Садхияр, воплощающий цикл и охватывающий новое Святилище. После пробуждения породил древних вирмов в ответ на эмоции пришедших к нему искателей.',
    related: ['sadhiyary', 'virmy', 'adzhaidy'], history: 'epoha-pererozhdeniya',
  },
  {
    id: 'zugrul', term: 'Зугрул', category: 'practices', aliases: ['Отец Имен', 'Мертворождённый', 'Бесконечный Голод'],
    definition: 'Изгнанный Садхияр, чья сила слова и имени влияла на сущности мира. Его возвращение вызвало Последнюю Ночь, а исчезновение разрушило первое защитное плетение Н Е Р.',
    related: ['dalnie-chertogi', 'poslednyaya-noch', 'ner'], history: 'epoha-rassveta',
  },
  {
    id: 'nochnaya-kolesnitsa', term: 'Ночная Колесница', category: 'practices', aliases: ['Звёзды северного неба'],
    definition: 'Союз Морнара и призванных им звёзд, создавших аджаидов для поисков и пробуждения Вечного Змея.',
    related: ['zvezdy', 'adzhaidy', 'vechny-zmey'], history: 'epoha-pererozhdeniya',
  },
  {
    id: 'ha-ar-i-marduk', term: 'Ха’ар и Мардук', category: 'practices', aliases: ['Два Великих Змея'],
    definition: 'Два древних вирма, предложивших разный порядок западному Даскару: Ха’ар основал свободную А’агру, а Мардук подчинил Маракийский Султанат.',
    related: ['virmy', 'abora', 'daskar'], history: 'epoha-vosstanovleniya',
  },
  {
    id: 'mel-ozar', term: 'Мел Озар', category: 'characters', aliases: ['Король Королей', 'Мелозар', 'Царь Царей', 'Владыка Владык'],
    definition: 'Величайший человеческий король, основатель Империи Ургон, к которому восходит кровь Мел. Начинал младшим братом Охурозара и разумом «Золотого Симурга»: хрупкий калека с бельмом на глазу, которому не поднять кинжала, он сидел в углу палатки, отдавал чёткие указания и мечтал однажды проснуться свободным от собственного тела. Когда брата убил Драгмир, он впервые приказал вместо того, чтобы просить, — и этим словам поклонились даже светила. Сабара дала ему новую плоть, маски королей — силу, а в день падения бастиона его нить судьбы оборвалась и улетела с северным ветром. Дальше были коронация, казнь Драгмира, гонения на драгмирцев и вызов, брошенный небесам. Его одержимость Дальними Чертогами привела к Очищению и Великому Раздору.',
    related: ['ohurozar', 'bratstvo-simurga', 'imperiya-urgon', 'vremena-koroley', 'obman', 'ochishchenie', 'mel', 'sabara', 'maski-korolev', 'vsadniki-shamasa'], history: 'epoha-lyudey',
  },
  {
    id: 'vrata-eosa', term: 'Врата Эоса', category: 'practices', aliases: ['Врата Светлейшего'],
    definition: 'Врата на плато Звёзд, связанные с замыслом Эоса и Дальними Чертогами. Они стали местом Второго Знамения и последнего пути Вестников Бури.',
    related: ['vtoroe-znamenie', 'poslednyaya-noch', 'dalnie-chertogi'], history: 'epoha-lyudey',
  },
  {
    id: 'baraskus', term: 'Бараскус', category: 'practices', aliases: ['Священное пламя бегунов'],
    definition: 'Почитаемая сила аджаидов, чьё пламя благословляло бегунов песков. После падения их царства беженцы разнесли пламя Бараскуса по Даскару.',
    related: ['adzhaidy', 'bogi-kochevniki', 'daskar'], history: 'epoha-vosstanovleniya',
  },

  // ——— Дом Ра: шесть Гладов ———
  {
    id: 'ul', term: 'Ул', category: 'characters', aliases: ['Величайший глад'],
    definition: 'Величайший глад и старший в Доме Ра, воплощение правосудия семьи: только ему позволено поглощать своих. Восседает в Ак’джине; в прошлом вместе с Юл был любовником Хада’ры.',
    related: ['dom-ra', 'meridiri', 'yul'],
  },
  {
    id: 'tu', term: 'Ту', category: 'characters', aliases: ['Глад разума'],
    definition: 'Глад разума, величайший стратег Войны Рассвета, ныне кукловод Дома Ра: сталкивает родню лбами ради собственной выгоды. Великий владыка инкор и член совета Изумрудного Города Туз.',
    related: ['dom-ra', 'inkor', 'meridiri'],
  },
  {
    id: 'haz', term: 'Хаз', category: 'characters', aliases: ['Иссушающий глад'],
    definition: 'Иссушающий глад, раздувшийся обжора, поглотивший столько, что созданная Садхиярами оболочка едва его сдерживает. Властвует над ползунами-элака, его домен — Бараг’кар.',
    related: ['dom-ra', 'meridiri'],
  },
  {
    id: 'yul', term: 'Юл', category: 'characters', aliases: ['Жестокий глад'],
    definition: 'Жестокий глад, несущая насилие и беспредельный жор, владычица сарла. Живёт среди Белых Саров в землях Беш Дельты на юге Ханида; вместе с Улом была любовницей Хада’ры.',
    related: ['dom-ra', 'sarla', 'ul'],
  },
  {
    id: 'ket', term: 'Кет', category: 'characters', aliases: ['Смеющийся глад'],
    definition: 'Смеющийся глад, вихрь смерти на поле боя и мастер танца безумия. Единственная смертная на троне шести гладов; её хаотичность заражает пирамиду и делает Кет сильнее день ото дня. Восседает в Мараке.',
    related: ['dom-ra', 'meridiri'],
  },
  {
    id: 'gog', term: 'Гог', category: 'characters', aliases: ['Тихий глад'],
    definition: 'Тихий глад, чей трон пустует во Время Ветров. Обманутая Даскаром, Гог была заперта в Красных Песках на века, пока её не пожрала кровь Хинрала.',
    related: ['dom-ra', 'meridiri'],
  },

  // ——— Пирамида Адам’эва ———
  {
    id: 'adam-ev', term: 'Адам’эв', category: 'characters', aliases: ['Перворождённый Святилища'],
    definition: 'Перворождённый Святилища и первый меридир, созданный по образу Пуруша. Искривив его сущность, Садхияры испугались содеянного и бросили его на раскалённые камни. Поглотил Ададжайю, облачился в её кожу и ждёт своего часа на вершине Пирамиды.',
    related: ['meridiri', 'adadzhayya', 'purush'],
  },
  {
    id: 'sarla', term: 'Сарла', category: 'beings', aliases: [],
    definition: 'Ступень Пирамиды: созданные Садхиярами воины в броне из крепчайших материалов, символ силы и ужас полей сражений. Ныне так зовут воинов Дома Ра.',
    related: ['meridiri', 'dom-ra'],
  },
  {
    id: 'inkor', term: 'Инкор', category: 'beings', aliases: [],
    definition: 'Ступень Пирамиды: воплощения разрушения и пустоты, исполнявшие танец погибели врагам Садхияров. Ныне инкор — тени Дома Ра, поглощающие всё без капли сожаления.',
    related: ['meridiri', 'dom-ra'],
  },
  {
    id: 'ishvana', term: 'Ишвана', category: 'practices', aliases: ['Поиск силы', 'Ишваха'],
    definition: 'Путь поиска силы, сокрытой в крови меридира: чувство пустоты подталкивает потомка к первому поглощению Искры. После него новорождённого меридира находит Дом Ра, чтобы призвать занять место в Пирамиде.',
    related: ['meridiri', 'dom-ra'],
  },

  // ——— Ковени ———
  {
    id: 'sapiri', term: 'Сапири', category: 'powers', aliases: [],
    definition: 'Ковени, охотящиеся только на меридиров: они считают, что род прогнил за века, и собирают эссенцию, дарованную Садхиярами. Верны изначальному пути — битве против Четырёх Светов; крепко связаны с Лабиринтами. Возглавляет их Ашира.',
    related: ['meridiri', 'ashira'],
  },
  {
    id: 'garganty', term: 'Гарганты', category: 'powers', aliases: [],
    definition: 'Ковени из крови Великого Змея Иджин’Ана или носящие его печать. Считают его предательство причиной превращения меридиров и клянутся пожрать самого Змея и его детей. Их три догмата — Истреби, Захвати, Уничтожь; славятся мастерством в убийстве вирмов.',
    related: ['meridiri', 'vechny-zmey'],
  },
  {
    id: 'mirhi', term: 'Мирхи', category: 'powers', aliases: ['Отрекшиеся'],
    definition: 'Малая группа меридиров, извлекающих из Искры мысли, а не саму Искру. Считаются неполноценными, слабокровными; среди смертных известны как Отрекшиеся, и пути их скрыты и от Пирамиды, и от людей.',
    related: ['meridiri'],
  },

  // ——— Шахи Лабиринтов ———
  {
    id: 'merku', term: 'Мерку', category: 'characters', aliases: ['Шах Ахава'],
    definition: 'Шах Ахава, Лабиринта Отчаяния. Говорят, она узрела в Дальних Чертогах бесконечное и неотвратимое страдание, приняла его и воплотила: если исправить нельзя, нужно управлять.',
    related: ['dalnie-chertogi'],
  },
  {
    id: 'dzhiani', term: 'Джиани', category: 'characters', aliases: ['Шах Нирара'],
    definition: 'Шах Нирара, Лабиринта Безразличия. Узрев неизбежную участь всего, когда сломается Колесо, она перестала заботиться о чём-либо; её королевство захватить не проще, чем дым.',
    related: [],
  },
  {
    id: 'zadzhar', term: 'Заджар', category: 'characters', aliases: ['Шах Гията'],
    definition: 'Творец Гията, Лабиринта Ненависти, и хозяин города Гиятор. Говорят, он первым из падших осознал истинное устройство мира и обман Улунгуров; гнев поглотил его целиком.',
    related: ['ulungury'],
  },
  {
    id: 'hidegur', term: 'Хидегур', category: 'characters', aliases: ['Шах Диятама'],
    definition: 'Шах Диятама, Лабиринта Холода, один из трёх близнецов. Пытался предупредить создателей о грядущей погибели, но остался неуслышанным — и погасил своё пламя, став владыкой мёртвых льдов.',
    related: [],
  },
  {
    id: 'ehes', term: 'Эхес', category: 'characters', aliases: ['Шах Боаки'],
    definition: 'Шах Боаки, Лабиринта Уныния, один из трёх близнецов. Счастливейший из серафимов, радостно служивший создателям, — пока Дальний Чертог не обрёк его не видеть радости ни в одном своём деянии.',
    related: ['dalnie-chertogi'],
  },
  {
    id: 'ures', term: 'Урес', category: 'characters', aliases: ['Шах Харанху'],
    definition: 'Шах Харанху, Лабиринта Опустошения, один из трёх близнецов. Понял, чем стала Ададжайя, и вместе с осквернёнными братьями возвёл последнюю стену перед бездной Мадахари, лишившись всего и став самой пустотой.',
    related: ['adadzhayya'],
  },
  {
    id: 'adadzhayya', term: 'Ададжайя', category: 'characters', aliases: ['Королева Лабиринтов'],
    definition: 'Первая павшая и сильнейший из ныне живущих серафимов, владычица Мадахари. Она увидела в Дальних Чертогах не предательство, а тайную силу, и сподвигла братьев на восстание. Воззвала к Адам’эву — и была им поглощена.',
    related: ['adam-ev', 'dalnie-chertogi'],
  },

  // ——— Мафраш и Синдикат ———
  {
    id: 'emefeyus', term: 'Эмефеюс Урегал Мафраш', category: 'characters', aliases: ['Эмефеюс', 'Левое крыло'],
    definition: 'Величайший из живших магусов, творец Башен и основатель ордена Мафраш, призванного соблюдать нейтралитет и хранить Великое Равновесие Даскара. Ему Гендин даровал камни стазиса, что несут главы медресе. Во Времена Королей он был огромным мор’хором с чёрно-синей шерстью и золотыми рогами — левым крылом «Золотого Симурга», из спирали Страданий: в его палатке не видно, где право, где лево, и нельзя солгать. Просил Всадников вернуть золотого тельца и присмотреть за ней, подарил Эдр’е механическую руку и сосуд для Сабары, а на поле у бастиона обернулся бронзовым драконом. Умолял Царя Царей пощадить Драгмира — и не был услышан.',
    related: ['gendin', 'morhory', 'bratstvo-simurga', 'edra', 'enuma', 'spiral-stradaniy', 'sabara'], history: 'epoha-lyudey',
  },
  {
    id: 'zuratar', term: 'Зуратар', category: 'characters', aliases: ['Золотой Магус', 'Зуротар'],
    definition: 'Золотой Магус Времени Ветров, бывший ученик Школы Базальта. После возвращения Башни Мафраш из Дальних Чертогов заперся в мраморном водопаде на верхнем уровне и с тех пор не выходил.',
    related: ['dalnie-chertogi'],
  },
  {
    id: 'ashira', term: 'Ашира', category: 'characters', aliases: [],
    definition: 'Глава Сапири, Ра, вырвавшая собственное тёмное сердце, когда осознала, что порча охватывает её. Сердце заперто навеки: пока оно бьётся, Ашира не может быть убита.',
    related: ['sapiri', 'meridiri'],
  },
  {
    id: 'bezyazykiy', term: 'Безъязыкий', category: 'characters', aliases: [],
    definition: 'Безжалостный глава Дома Масок, подмявший преступные организации городов-оазисов и превративший дом в Синдикат Фаланга. К приходу Нарекателей в Бараг’кар заседал в торговом совете города.',
    related: ['dom-masok'],
  },
  {
    id: 'dom-masok', term: 'Дом Масок', category: 'powers', aliases: [],
    definition: 'Мелкая преступная организация Аборы, из которой вырос Синдикат Фаланга. На руинах Последней Ночи наладила нелегальные поставки провизии из А’агры в Марак и за семь лет подмяла контрабандные пути к западу от Аборы.',
    related: ['bezyazykiy'],
  },
  {
    id: 'zolotoe-koltso', term: 'Золотое Кольцо', category: 'powers', aliases: [],
    definition: 'Теневая гильдия, созданная в обход запретов Синдиката Фаланга: переправляет рабов на юг Даскара, к гротескным вкусам элиты Пламенных Языков. Работорговля в Синдикате карается смертью.',
    related: [],
  },

  // ——— Спирали ———
  {
    id: 'edra', term: 'Эдр’а', category: 'characters', aliases: ['Золотой телец'],
    definition: 'Синтетический мор’хор, созданный Энумой как эксперимент, о котором тот не хотел вспоминать. Золотистая шерсть, рога полной окружностью с письменами создателя, радужка из завёрнутых друг на друга лепестков; не ест, не спит и не стареет. Ветамон держал её в колбе у океана, а Всадники Шамаса вынесли оттуда — и имя она выбрала себе сама, прочитав его на узлах первого тома легенды. Потеряв руку в бою у Драгмира, получила от Эмефеюса механическую и научилась делать механизмы. Вырвала Спираль из цикла м’хур и создала детей по своему образу — мор’хоров, свободных от воли создателей.',
    related: ['morhory', 'enuma', 'emefeyus', 'vetamon', 'vsadniki-shamasa', 'mhur'], history: 'epoha-lyudey',
  },
  {
    id: 'spiral-snov', term: 'Спираль Снов', category: 'places', aliases: [],
    definition: 'Спираль Северного Даскара, чьё ядро запустила экспедиция Великого Агхи Севера и Йондани. После этого дремлющие Спирали начали пробуждаться; из самой экспедиции не вернулся никто, и с тех пор к Спирали Снов не удавалось приблизиться.',
    related: [],
  },
  {
    id: 'yorgal', term: 'Йоргал', category: 'practices', aliases: ['Камень души'],
    definition: 'Камень души: фиолетовый кристалл, на энергии которого живут ложные дети Эдр’ы. Каждый йондани вшивает его в тело как доказательство намерений — от прикосновения к плоти ложного дитя камень даёт свет.',
    related: ['edra'],
  },
  {
    id: 'mhur', term: 'М’хур', category: 'foundations', aliases: ['Колыбель М’хур'],
    definition: 'Круговорот перерождения мор’хоров: каждый из них — воплощение одного из предков, несущее сознание прошлых жизней. Спирали хранят Колыбели М’хур, и без них род не продолжается.',
    related: ['morhory'],
  },
  {
    id: 'linii-sily', term: 'Линии Силы', category: 'foundations', aliases: ['Линия Силы'],
    definition: 'Токи волшебства, пронизывающие Эноа, которые магусы ощущают от природы и на которых стоит учение всех медресе. Одна из линий тянется от Кузни Судьбы через Эноа, и в ней живёт Ильбеш.',
    related: ['kuznya-sudby'],
  },

  // ——— Столпы Нарекателей ———
  {
    id: 'verhovnyy-belyy-otets', term: 'Верховный Белый Отец', category: 'powers', aliases: [],
    definition: 'Глава ордена Нарекателей, ближайший к Белой Призме. Судит перечащих учениям и спасает молящих о знании, передаёт преемнику мистерию Пророка и сокровенные учения Н Е Р. Носит белый нефрит.',
    related: ['narekateli', 'ner'],
  },
  {
    id: 'lunnye-devy', term: 'Лунные девы', category: 'powers', aliases: [],
    definition: 'Столп Нарекателей: личные телохранительницы Верховного Белого Отца, обученные путям Н Е Р, чтобы уничтожать всё опасное для главы ордена. Их ведёт Дева Смерти, а знаком служит серый говлит.',
    related: ['narekateli', 'verhovnyy-belyy-otets', 'tsam'],
  },
  {
    id: 'stolp-slovo', term: 'Слово', category: 'powers', aliases: ['Столп Слова'],
    definition: 'Столп Нарекателей: проповедники Белой Веры, которые несут слова Белого Пророка по всему Даскару. Их чаще прочих видно на улицах и базарах; знак столпа — синий содалит.',
    related: ['narekateli', 'belyy-prorok'],
  },
  {
    id: 'stolp-kristall', term: 'Кристалл', category: 'powers', aliases: ['Столп Кристалла'],
    definition: 'Столп Нарекателей: секретность и шпионаж, надзор за расправами над врагами ордена и донесения о всякой активности Вуали. Считает носителей Изира животными, не нуждающимися в милосердии; знак — красный кварц, тем кровавее, чем выше положение.',
    related: ['narekateli', 'izir', 'belye-ohotniki'],
  },
  {
    id: 'stolp-plamya', term: 'Пламя', category: 'powers', aliases: ['Столп Пламени'],
    definition: 'Столп Нарекателей: хранители знаний, пламя ума, освещающее незнание. Стерегут легенды и библиотеку узлов Белых Пророков; знак столпа — жёлтая яшма.',
    related: ['narekateli', 'belyy-prorok'],
  },
  {
    id: 'stolp-ryab', term: 'Рябь', category: 'powers', aliases: ['Столп Ряби'],
    definition: 'Столп Нарекателей: те, кто слышит рябь в переплетении и существовании Н Е Р. Их сияющие пруды медитации чуют сдвиги сил и аномалии Вуали на огромном расстоянии и служат для передачи важнейших вестей; знак — гелиотроп.',
    related: ['narekateli', 'ner'],
  },
  {
    id: 'stolp-eliksir', term: 'Эликсир', category: 'powers', aliases: ['Столп Эликсира'],
    definition: 'Столп Нарекателей: хранители диковин, заключённых и секретов ордена, отчитывающиеся только перед Верховным Белым Отцом. Их подземное святилище к северу от Садов Белого Пророка обросло слухами об опытах над древними существами; знак — белый опал.',
    related: ['narekateli', 'verhovnyy-belyy-otets'],
  },
  {
    id: 'belye-ohotniki', term: 'Белые Охотники', category: 'powers', aliases: [],
    definition: 'Братство охотников на нинавеш внутри столпа Кристалла.',
    related: ['stolp-kristall', 'ninavesh'],
  },
  {
    id: 'gauta', term: 'Гаута', category: 'characters', aliases: [],
    definition: 'Член столпа Эликсира, добившийся аудиенции у Серого Султана и поразивший его настолько, что остался почётным гостем. С тех пор прошло тридцать лет, и ни одного Нарекателя больше не пустили в Марак.',
    related: ['stolp-eliksir', 'narekateli'],
  },
  {
    id: 'nergul-tohilka', term: 'Нергуль Тохил’ка', category: 'characters', aliases: [],
    definition: 'Предводитель степей Хурхона, склонный прислушиваться к новым веяниям ветра: через него Нарекатели закрепились в Хурхоне после череды вооружённых столкновений с худдулинами. В будущем — Агха Хурхона.',
    related: ['narekateli', 'hurhon'],
  },

  // ——— Пальцы Синдиката Фаланга ———
  {
    id: 'krushtervor', term: 'Круштервор', category: 'characters', aliases: [],
    definition: 'Указательный Палец Северной Руки Синдиката Фаланга, вирморождённый из Бараг’кара. Широко известен крайней жестокостью ко всем, кто не входит в Синдикат.',
    related: ['sindikat-chernogo-falanga'],
  },
  {
    id: 'mishmash', term: 'Мишмаш', category: 'characters', aliases: [],
    definition: 'Средний Палец Северной Руки Синдиката Фаланга, удриш из пйюр-пйюр. Владеет сетью курильных лавок в центральном оазисе Свободных Городов и живёт в А’агре.',
    related: ['sindikat-chernogo-falanga'],
  },
  {
    id: 'bahasa', term: 'Бахаса', category: 'characters', aliases: [],
    definition: 'Безымянный Палец Северной Руки Синдиката Фаланга, уроженка северных племён. Под влиянием Вуали стала похожа на нинавеш; тесно работает с Круштервором в Бараг’каре.',
    related: ['sindikat-chernogo-falanga', 'krushtervor', 'ninavesh'],
  },
  {
    id: 'ilzoy', term: 'Ильзой', category: 'characters', aliases: [],
    definition: 'Большой Палец Северной Руки Синдиката Фаланга, дюнный странник из Аборы, огромный и внушительный. Ведёт дела в Аборе, рядом с торговыми узлами Марака и Вольного Города.',
    related: ['sindikat-chernogo-falanga'],
  },
  {
    id: 'vam-vam', term: 'Вам’вам', category: 'characters', aliases: [],
    definition: 'Мизинец Северной Руки Синдиката Фаланга, одержимый духами старик. Ведёт дела там, где упал пьяным накануне.',
    related: ['sindikat-chernogo-falanga'],
  },
  {
    id: 'ravana', term: 'Равана', category: 'characters', aliases: [],
    definition: 'Указательный Палец Южной Руки Синдиката Фаланга: страстная женщина, живущая по строгим правилам и метящая куда выше. Живёт в Ак’джине.',
    related: ['sindikat-chernogo-falanga'],
  },
  {
    id: 'iziya', term: 'Изия', category: 'characters', aliases: [],
    definition: 'Исполняющий обязанности Безымянного Пальца Южной Руки, янтарный маракиец и мрачный убийца. Истинная личность Пальца известна только Руке: считается, что он на особом секретном задании.',
    related: ['sindikat-chernogo-falanga'],
  },
  {
    id: 'dzhahi', term: 'Джахи', category: 'characters', aliases: [],
    definition: 'Большой Палец Южной Руки Синдиката Фаланга, браллка из Акребалка. Известна презрением к Белой Вере; в бою впадает в колдовской раж крови и костей.',
    related: ['sindikat-chernogo-falanga', 'narekateli'],
  },
  {
    id: 'altun', term: 'Алтун', category: 'characters', aliases: [],
    definition: 'Мизинец Южной Руки Синдиката Фаланга, дварф-аджаид с на редкость мерзким чувством юмора и легендарной способностью к скрытности. Ведёт дела в Эрне.',
    related: ['sindikat-chernogo-falanga'],
  },

  // ——— Дети Гладов ———
  {
    id: 'agranor', term: 'Агранор Бессмертный', category: 'characters', aliases: ['Агранор'],
    definition: 'Прямой потомок Дома Ра, брат Цам Девы Смерти. Их родители — Величайший Глад и Жестокий Глад.',
    related: ['dom-ra', 'tsam', 'meridiri'],
  },

  // ——— Места ———
  {
    id: 'kesh-aur', term: 'Кеш’аур', category: 'places', aliases: ['Город милосердия'],
    definition: 'Город милосердия в бралльских горах: один из лагерей, где Когорта ищет рекрутов. Заключённые носят там «шлемы прощения», а пастухи Искры доводят их до грани смерти, чтобы в последний миг сменить шлем на ошейник.',
    related: ['kogorta', 'pastuhi-iskry'],
  },
  {
    id: 'giyator', term: 'Гиятор', category: 'places', aliases: [],
    definition: 'Город, вознесшийся над Лабиринтом Гият величайшим проявлением ненависти его творца Заджара к собственным создателям. Единственное место Гията, не подверженное непрерывным изменениям.',
    related: ['zadzhar'],
  },
  {
    id: 'gorod-para', term: 'Город Пара', category: 'places', aliases: [],
    definition: 'Легендарный город Нирара, Лабиринта Безразличия, чьи цитадели сотканы из дыма и пара столь плотных, что не пропускают существ сквозь себя.',
    related: [],
  },
  {
    id: 'izumrudnyy-gorod-tuz', term: 'Изумрудный Город Туз', category: 'places', aliases: ['Туз'],
    definition: 'Город, в совете которого заседает Ту, глад разума Дома Ра.',
    related: ['tu', 'dom-ra'],
  },
  {
    id: 'besh-delta', term: 'Беш Дельта', category: 'places', aliases: [],
    definition: 'Земли на юге Ханида, где живут Белые Сары. Здесь среди них обитает Юл, жестокий глад Дома Ра, а тамошние сар худдулины куют, почитая жар Сальбара, а не Строителя.',
    related: ['yul', 'salbar', 'dom-ra'],
  },

  // ——— Когорта ———
  {
    id: 'pastuhi-iskry', term: 'Пастухи Искры', category: 'powers', aliases: [],
    definition: 'Те, кто присматривает за заключёнными на грани смерти в лагерях Когорты. Найдя кандидата, пастух доводит его состояние до крайности и снимает шлем прощения за мгновение до смерти, заменяя ошейником.',
    related: ['kogorta', 'kesh-aur', 'shlem-proshcheniya'],
  },
  {
    id: 'shlem-proshcheniya', term: 'Шлем прощения', category: 'practices', aliases: [],
    definition: 'Предмет, заключающий носящего в кромешную тьму и не дающий умереть от истощения: он поддерживает жизнь за счёт Искры, постепенно сжигая её. Надевается на заключённых в лагерях Когорты.',
    related: ['kogorta', 'pastuhi-iskry'],
  },


  // ——— Основатели Гаргантов ———
  {
    id: 'eya', term: 'Эя', category: 'characters', aliases: [],
    definition: 'Один из трёх основателей Гаргантов — ковени меридиров, происходящих из крови Великого Змея Иджин’Ана. Вместе с От и Аром воплощает три догмата ордена: Истреби, Захвати и Уничтожь.',
    related: ['garganty', 'ot', 'ar', 'meridiri'],
  },
  {
    id: 'ot', term: 'От', category: 'characters', aliases: [],
    definition: 'Один из трёх основателей Гаргантов — ковени меридиров, поклявшихся пожрать Великого Змея и его детей. Вместе с Эей и Аром воплощает три догмата ордена: Истреби, Захвати и Уничтожь.',
    related: ['garganty', 'eya', 'ar', 'meridiri'],
  },
  {
    id: 'ar', term: 'Ар', category: 'characters', aliases: [],
    definition: 'Один из трёх основателей Гаргантов — ковени, славящихся мастерством в убийстве вирмов. Вместе с Эей и От воплощает три догмата ордена: Истреби, Захвати и Уничтожь.',
    related: ['garganty', 'eya', 'ot', 'meridiri'],
  },


  // ——— Лица летописи ———
  {
    id: 'vetu-zemli', term: 'Вету', category: 'places', aliases: ['Город Зиккуратов', 'Земли Вету'],
    definition: 'Земли и город змееобразного народа вету на болотах Уатаны: Город Зиккуратов, поднятый на Линиях Силы. Отсюда Миз Кровавый выпустил кислотные воды в Яростную Змею, здесь Девы Мирзы провозгласили себя правительницами и отсюда через порт Джарчор поднялось первое воздушное судно.',
    related: ['vetu', 'miz-krovavyy', 'voyna-yarostnoy-zmei'], history: 'epoha-vosstanovleniya',
  },
  {
    id: 'irmesh', term: 'Ирмеш', category: 'characters', aliases: ['Герой Раскола'],
    definition: 'Герой, сразивший Короля Королей в час Тёмного Быка под знамением Вуша: непревзойдённый в танце солнца и луны, владевший Астрой Пустоты. Одни говорят, его послали Улунгуры, другие — что он был колоссом древности, третьи — что сыном Мела Озара и Владычицы Лабиринта. Он оплакал свою победу, увидев её цену.',
    related: ['mel-ozar', 'astry'], history: 'epoha-lyudey',
  },
  {
    id: 'dragmir', term: 'Драгмир', category: 'characters', aliases: [],
    definition: 'Колосс, чьи первые дети крови — драгмирцы. Противник Мела Озара в Войне Королей; в год Кристальной Совы Король Королей казнил его и утопил свои города в крови гигантов.',
    related: ['mel-ozar', 'kolossy'], history: 'epoha-lyudey',
  },
  {
    id: 'urdreg', term: 'Урдрег', category: 'characters', aliases: ['Великий Агха Урдрег'],
    definition: 'Великий Агха, при котором народ выжженной степи принял Закон Бесконечных Небес и распространил владения от берегов Моря Мрия до Дюн аджаидов. Его словами говорит Закон Небес; один из основателей Высокого Круга.',
    related: ['zakon-nebes', 'vysokii-krug'], history: 'epoha-vosstanovleniya',
  },
  {
    id: 'haar', term: 'Ха’ар', category: 'characters', aliases: ['Ха’ар Мудрый'],
    definition: 'Первый из золотых вирмов, стремившийся упорядочить хаос Даскара. Сплотил кочевников Проклятых Песков и основал город А’агра под знаменем закона, свободы и равенства.',
    related: ['aagra', 'vysokii-krug'], history: 'epoha-vosstanovleniya',
  },
  {
    id: 'marduk', term: 'Мардук', category: 'characters', aliases: ['Мардук Инквизитор', 'Тёмный Вирм'],
    definition: 'Древний кровавый вирм, не согласный с деяниями своего сородича Ха’ара: во всех существах он видел диких и звероподобных созданий, а среди них — порченые творения Эоса. Захватил Маракийский Султанат и разжигал в маракийцах ненависть к чужакам. Сотни лет вирмы правили Мараком, пока Серый Султан не убил Тёмного Вирма: маракийцы впервые за долгое время сбросили их оковы, а величественный череп Мардука служит теперь залом для аудиенций султана. Отсюда же особая ненависть маракийцев к драконоподобным.',
    related: ['haar', 'maraq', 'seryy-sultan', 'virmy'], history: 'epoha-vosstanovleniya',
  },
  {
    id: 'elish-kanitar', term: 'Элиш Канитар', category: 'characters', aliases: ['Синяя Рука Титании'],
    definition: 'Синяя Рука Титании и один из основателей Высокого Круга в год Лазуритового Быка.',
    related: ['vysokii-krug', 'titania'], history: 'epoha-vosstanovleniya',
  },
  {
    id: 'maland-brotor', term: 'Маланд Бротор Песчанобородый', category: 'characters', aliases: ['Король Бротор'],
    definition: 'Король дварфов-аджаидов из клана Песчанобородых, один из основателей Высокого Круга. Отправил сына эмиссаром в Вету, где того убили, — с этого началась Война Яростной Змеи.',
    related: ['vysokii-krug', 'voyna-yarostnoy-zmei'], history: 'epoha-vosstanovleniya',
  },
  {
    id: 'grono', term: 'Гроно', category: 'characters', aliases: ['Торговый Принц А’агры'],
    definition: 'Торговый Принц А’агры и член Высокого Круга во Время Ветров.',
    related: ['vysokii-krug', 'aagra'], history: 'vremya-vetrov',
  },
  {
    id: 'kuyul', term: 'Куюл', category: 'characters', aliases: ['Великий Агха Куюл'],
    definition: 'Великий Агха и член Высокого Круга во Время Ветров.',
    related: ['vysokii-krug'], history: 'vremya-vetrov',
  },
  {
    id: 'miz-krovavyy', term: 'Миз Кровавый', category: 'characters', aliases: [],
    definition: 'Правитель Вету, Города Зиккуратов, выпустивший кислотные воды в реку Яростной Змеи и смывший армии Высокого Круга на край мира. Пока он вёл войско на север, Девы Мирзы провозгласили себя правительницами; зажатый между ними и Кругом, Миз был сброшен в реку вместе с тысячами солдат.',
    related: ['voyna-yarostnoy-zmei'], history: 'epoha-vosstanovleniya',
  },
  {
    id: 'el-huddur', term: 'Эл’худдур', category: 'characters', aliases: [],
    definition: 'Легендарный капитан Бралла, который первым перелетел Пропасть Снов и высадился в южных землях Маракийского Султаната. Его возвращение стало новым началом для культуры Бралла.',
    related: ['brall', 'maraq'], history: 'vremya-vetrov',
  },
  {
    id: 'seryy-sultan', term: 'Серый Султан', category: 'powers', aliases: [],
    definition: 'Правитель Марака после гибели великого Вирма. Распространяет власть не войной, а вложениями: многие гильдии Даскара спонсируются Мараком, не подозревая об этом. Обречён, как говорят, стать Королём Королей.',
    related: ['maraq'], history: 'vremya-vetrov',
  },
  {
    id: 'pyur', term: 'Пйюр', category: 'characters', aliases: ['Безумец Пйюр', 'Пюр'],
    definition: 'Первый Белый Пророк: он обладал такой силой воли и так верил в собственные слова, что они становились правдой. Прежде чем его поймали Улунгуры, он раскрыл нескольким удришам истины мироздания и исчез в маленькой коробке с лабиринтом внутри. Ятх’У нашёл его живым в шатре на стыке всего мира — маленьким скрюченным стариком, который придумывает себе гостей, потому что скучно, и учит, что у придуманного слова есть сила, если у него есть смысл. Ему же эхор’нур оставил на сохранение куб врат.',
    related: ['belyy-prorok', 'yath-u', 'kub-vrat', 'pyyur-pyyur', 'udrishi'], history: 'epoha-sveta',
  },

  // ——— События ———
  {
    id: 'velikiy-razdor', term: 'Великий Раздор', category: 'history', aliases: [],
    definition: 'Раскол среди людей во время Очищения, когда сомнения в ясности ума Короля Королей поселились в его армиях: брат восстал против брата, сёстры убивали друг друга во сне, отцы разили своих детей.',
    related: ['ochishchenie', 'mel-ozar'], history: 'epoha-lyudey',
  },
  {
    id: 'voyna-yarostnoy-zmei', term: 'Война Яростной Змеи', category: 'history', aliases: [],
    definition: 'Поход Высокого Круга на юг после убийства священного бегуна Бараскуса в Городе Зиккуратов. Кислотные воды Вету смыли армии Круга, а поход завершился гибелью Миза Кровавого и вхождением Мирз в Круг.',
    related: ['vysokii-krug', 'miz-krovavyy', 'baraskus'], history: 'epoha-vosstanovleniya',
  },
  {
    id: 'vozvyshenie-klykov', term: 'Возвышение Клыков', category: 'history', aliases: [],
    definition: 'Поглощение империей Ургон народов теней и древности в четыре десятилетия мира после воцарения Короля Королей.',
    related: ['imperiya-urgon', 'mel-ozar'], history: 'epoha-lyudey',
  },

  // ——— Уложения и державы ———
  {
    id: 'zakon-gildiy', term: 'Закон Гильдий', category: 'powers', aliases: [],
    definition: 'Уложение Высокого Круга: каждая гильдия вправе поступать со своими членами по своим законам и отвечает за то, чтобы они не нарушали Закон Небес. Нарушивших разыскивали Охотники Урдрега.',
    related: ['zakon-nebes', 'vysokii-krug', 'urdreg'], history: 'epoha-vosstanovleniya',
  },
  {
    id: 'baragkarskiy-dogovor', term: 'Бараг’карский договор', category: 'history', aliases: [],
    definition: 'Мир между Титанией и худдулинами, скреплённый Синей Рукой и Великим Агхой обменом тремя чашами инжирного вина. Стал краеугольным камнем будущего торгового города Бараг’кар.',
    related: ['titania', 'urdreg'], history: 'epoha-vosstanovleniya',
  },
  {
    id: 'kodeks-krovi', term: 'Кодекс Крови', category: 'culture', aliases: [],
    definition: 'Суровый закон племён Хешег, живущих в горах и северных пустошах и почитающих Тотемных Духов. Презрение к южанам, не чтившим Кровь, со временем обратилось внутрь и положило начало межплеменным войнам и кровной мести.',
    related: ['heshegi'], history: 'epoha-vosstanovleniya',
  },
  {
    id: 'imperiya-urgon', term: 'Империя Ургон', category: 'powers', aliases: [],
    definition: 'Держава Мела Озара, поглотившая народы теней и древности. Её границы ширились, башни Титании сияли в ночи, а караваны Вету возили товары от одного небесного порта к другому — до тех пор, пока Очищение не привело империю к упадку.',
    related: ['mel-ozar', 'titania', 'ochishchenie'], history: 'epoha-lyudey',
  },

  // ——— Места летописи ———
  {
    id: 'aagra', term: 'А’агра', category: 'places', aliases: [],
    definition: 'Город, основанный Ха’аром Мудрым для кочевников Проклятых Песков: искра свободы и равенства, где каждый желанный гость под знаменами закона и порядка. После Последней Ночи им правит Торговый совет.',
    related: ['haar', 'grono'], history: 'epoha-vosstanovleniya',
  },
  {
    id: 'almar', term: 'Алмар', category: 'places', aliases: [],
    definition: 'Город дварфов-аджаидов в дюнах Меша, основанный при восстановлении погребённого песками королевства. Здесь клан Песчанобородых вновь зажёг священное пламя Бараскуса.',
    related: ['baraskus', 'maland-brotor'], history: 'epoha-vosstanovleniya',
  },
  {
    id: 'tik-chik', term: 'Тик-Чик', category: 'places', aliases: [],
    definition: 'Город, обогатившийся на Мифрасовом Пути: через него шли плоты и баржи, сплавлявшиеся из Эндира подземными реками и кяризами в озеро М’лах.',
    related: ['mifrasovyi-put', 'endir', 'm-lah'], history: 'vremya-vetrov',
  },
  {
    id: 'endir', term: 'Эндир', category: 'places', aliases: [],
    definition: 'Торговые порты Бралла, откуда знать и сам Архон переселились в Ак’джин. Отсюда грузы шли подземными реками к Тик-Чику.',
    related: ['tik-chik', 'arhon'], history: 'vremya-vetrov',
  },
  {
    id: 'm-lah', term: 'М’лах', category: 'places', aliases: ['Озеро М’лах'],
    definition: 'Озеро, к которому подземные реки и кяризы выводят баржи Мифрасового Пути.',
    related: ['tik-chik', 'mifrasovyi-put'], history: 'vremya-vetrov',
  },
  {
    id: 'ugru', term: 'Угру', category: 'places', aliases: [],
    definition: 'Первый бастион Марака по другую сторону Пропасти Снов, основанный ради колонизации Красных Песков. Отсюда маракийцы идут на юг в поисках обетованной земли колосса Азара.',
    related: ['maraq', 'seryy-sultan'], history: 'vremya-vetrov',
  },
  {
    id: 'dolina-dush', term: 'Долина Душ', category: 'places', aliases: [],
    definition: 'Туманные земли Когтя, где армия Империи Ургон сошлась с силами Шепотов в решающей схватке Очищения. В тот день горы обратились в пыль, города были уничтожены, а моря объяты пламенем.',
    related: ['ochishchenie', 'shepoty', 'imperiya-urgon'], history: 'epoha-lyudey',
  },
  {
    id: 'plato-zvezd', term: 'Плато Звёзд', category: 'places', aliases: [],
    definition: 'Место, где стоят Врата Эоса и где в день Буревестника Король Королей схватился с Владычицей Лабиринта. После того дня орды Лабиринта не переступали порога мира смертных.',
    related: ['vrata-eosa', 'mel-ozar', 'adadzhayya'], history: 'epoha-lyudey',
  },
  {
    id: 'mirin-az', term: 'Мирин’аз', category: 'places', aliases: [],
    definition: 'Карманное измерение Ке’эля вблизи Кузни Судьбы — единственное, созданное кем-то из Улунгуров. Здесь он целую вечность прядёт нити Судьбы.',
    related: ['ke-el', 'kuznya-sudby'], history: 'epoha-pererozhdeniya',
  },
  {
    id: 'heshegi', term: 'Хешег', category: 'beings', aliases: ['Кланы Хешег'],
    definition: 'Племена, ушедшие в северную часть Забытых Пиков: кланы Лисы, Волка, Медведя, Клыка и Оникса. Живут по Кодексу Крови и почитают Тотемных Духов.',
    related: ['kodeks-krovi'], history: 'epoha-vosstanovleniya',
  },

  // ——— Вещи и существа ———
  {
    id: 'kope-sudby', term: 'Копьё Судьбы', category: 'practices', aliases: [],
    definition: 'Оружие, выкованное Вестниками Бури в путешествии, полном дружбы, ужасов и храбрости. С ним они вошли во Врата Эоса, чтобы положить конец Зугрулу Мертворождённому.',
    related: ['zugrul', 'vrata-eosa', 'poslednyaya-noch'], history: 'epoha-vosstanovleniya',
  },
  {
    id: 'sha', term: 'Ша’', category: 'practices', aliases: ['Лук воли'],
    definition: 'Лук, сделанный из ветви горящего дерева древних. Вложив в него две стрелы, безымянный герой сбил с небосклона Азрака и Улу — и Лето Трёх Солнц закончилось, а сам он получил имя Даскар.',
    related: ['daskar', 'leto-treh-solnts'], history: 'epoha-vosstanovleniya',
  },
  {
    id: 'dobnye', term: 'Добные', category: 'beings', aliases: [],
    definition: 'Одни из существ, порождённых Иджин’Аном при встрече с искателями: Вечный Змей рождал по одному за раз, отзываясь на эмоцию каждого из пришедших. Тогда же появились первые древние вирмы и кобольды.',
    related: ['vechny-zmey', 'virmy'], history: 'epoha-pererozhdeniya',
  },
  {
    id: 'kobold', term: 'Кобольды', category: 'beings', aliases: [],
    definition: 'Существа, порождённые Иджин’Аном при встрече с искателями. Единственные последователи Верокха’бина, которого они зовут Джу’джу’вар, Большая Бошка.',
    related: ['vechny-zmey', 'verokha-bin'], history: 'epoha-pererozhdeniya',
  },


  // ——— Аджаиды: бегуны, огонь и татуировки крови ———
  {
    id: 'ogon-baraska', term: 'Огонь Бараска', category: 'culture', aliases: ['Священный огонь аджаидов'],
    definition: 'Священный огонь, который горит на каждой станции аджаидов. Он символизирует бесконечный дух народа и притязание однажды вернуть себе Дюнное Царство, а вместе с тем — менталитет правды и чести, которым аджаиды держатся в изгнании.',
    related: ['adzhaidy', 'baraskus', 'dyunnoe-tsarstvo'],
  },
  {
    id: 'dyunnoe-tsarstvo', term: 'Дюнное Царство', category: 'places', aliases: [],
    definition: 'Царство, из которого аджаиды были изгнаны и после которого живут небольшими коммунами по всему Даскару. Вернуть себе законное место его правителей — надежда, ради которой на каждой станции поддерживают Огонь Бараска.',
    related: ['adzhaidy', 'ogon-baraska', 'daskar'],
  },
  {
    id: 'dodor', term: 'Додор', category: 'beings', aliases: ['Трёхногий додор'],
    definition: 'Трёхногая птица, тронутая силой Вуали. Молодой бегун аджаидов обязан выследить и убить додора, чтобы его кровью нанести первые символы на свои стопы; адаады же гадают на лопатках додор и держат костяных провидцев.',
    related: ['adzhaidy', 'adaady', 'vual', 'tatuirovki-begunov', 'kostyanye-providtsy'],
  },
  {
    id: 'tatuirovki-begunov', term: 'Татуировки бегунов', category: 'culture', aliases: ['Татуировки крови', 'Мастера символов бегунов'],
    definition: 'Символы, которые аджаид наносит на стопы кровью додора: первый — по завершении первого испытания, дальше по числу пройденных путей, до десяти у глав семей бегунов. Соединение с Вуалью даёт сверхъестественную выносливость и умение двигаться незаметно, но каждый новый символ — это шанс, что Вуаль заберёт носящего. Мастера этого искусства часто теряют свои имена, зато неприкосновенны даже в Бралле: навредить им значит нарушить Закон Небес о посыльных.',
    related: ['adzhaidy', 'dodor', 'vual', 'zakon-nebes', 'brall'],
  },
  {
    id: 'medrese-begushchih-po-vetru', term: 'Медресе Бегущих по Ветру', category: 'powers', aliases: [],
    definition: 'Школа Танца Ветра, завидующая аджаидам: те, кто соединился с ветром и Вуалью через татуировки крови, превосходят её искусство.',
    related: ['tanets-vetra', 'adzhaidy', 'tatuirovki-begunov', 'vual'],
  },
  {
    id: 'tanets-vetra', term: 'Танец Ветра', category: 'practices', aliases: [],
    definition: 'Искусство Медресе Бегущих по Ветру. Аджаиды, чьи стопы отмечены кровью додора, движутся незаметно, будто мчатся по ветру и скрываются за Вуалью, — и в этом превосходят Танец Ветра.',
    related: ['medrese-begushchih-po-vetru', 'adzhaidy', 'tatuirovki-begunov'],
  },

  // ——— Боросы: первенец, двенадцать кланов и сапаки ———
  {
    id: 'boros', term: 'Борос', category: 'characters', aliases: ['Первенец Ночной Колесницы'],
    definition: 'Сильнейший из аджаидов и первенец Ночной Колесницы, выбранный судьбой чтецом знаков для отряда, искавшего Вечного Змея. Первым узрел бесконечный взгляд пробуждённого Иджин’Ана; Змей поглотил пришедших, но они вырвались, вырезав одно из сердец Садхияра. Их кровь была отравлена проклятием, бороды опали, а тела приобрели ящероподобные черты — так Борос и его спутники стали предками двенадцати кланов.',
    related: ['borosy', 'nochnaya-kolesnitsa', 'vechny-zmey', 'sadhiyary', 'adzhaidy', 'dvenadtsat-klanov'],
  },
  {
    id: 'dvenadtsat-klanov', term: 'Двенадцать кланов', category: 'beings', aliases: ['12 кланов ящериц'],
    definition: 'Кланы народа боросов, чьими предками стали Борос и его спутники, забравшие сердце Иджин’Ана. Ярость и агония изначальных двенадцати кланов и есть то, что слышат сапаки в песнях духов пустоты.',
    related: ['boros', 'borosy', 'sapaki', 'vechny-zmey'],
  },
  {
    id: 'sapaki', term: 'Сапаки', category: 'beings', aliases: [],
    definition: 'Избранные народа боросов. В день, когда зверь поглощает Шамаса, из новорождённых выбирают тех, кто в ритуале слушает запретные песни духов пустоты — ярость и агонию изначальных двенадцати кланов. Пережившие инициацию несут бремя памяти о судьбе своего народа, и Искра их сгорает раньше срока.',
    related: ['borosy', 'dvenadtsat-klanov', 'iskra', 'shamas', 'put-iskatelya'],
  },
  {
    id: 'put-iskatelya', term: 'Путь Искателя', category: 'culture', aliases: ['Зов Пути Искателя'],
    definition: 'Зов, неудержимо влекущий сапак скитаться по Эноа в поисках искупления и освобождения для своего народа. Боросы не склоняются перед богами, и в их глазах достижение цели оправдывает любые средства, — но тяжесть наследия не даёт забыть о совершённом во имя выживания.',
    related: ['sapaki', 'borosy'],
  },

  // ——— Дангун: старые деньги, индиго и соль ———
  {
    id: 'razar', term: 'Разар', category: 'powers', aliases: ['Семья Разар'],
    definition: 'Королевская семья Дангуна. Король из Разар — лишь марионетка у самых старых денег Трёх Королевств, семьи Авил’ар, и в Дангуне это понимают все. Необъяснимая терпимость Разар к безымянным сделала Мигдаш городом, где мракоглазов куда больше, чем в остальных землях.',
    related: ['dangun', 'avilar', 'migdash', 'mrakoglazy', 'bezimiannye', 'tri-korolevstva'],
  },
  {
    id: 'tri-korolevstva', term: 'Три Королевства', category: 'places', aliases: [],
    definition: 'Хурхон, Бралл и Дангун — земли, которыми держится запад Даскара. В них ходят золотые солнца, в их тенях идёт игра семей, и за их пределы вышли торговые гильдии Бралла.',
    related: ['hurhon', 'brall', 'dangun', 'zolotoe-solntse', 'avilar'],
  },
  {
    id: 'mrakoglazy', term: 'Мракоглазы', category: 'beings', aliases: [],
    definition: 'Безымянные люди Трёх Королевств. В Бралле их считают отбросами общества и ценят не больше, чем животных; в Мигдаше их куда больше, чем где-либо ещё, — из-за необъяснимой терпимости семьи Разар.',
    related: ['bezimiannye', 'brall', 'migdash', 'razar', 'narekateli'],
  },
  {
    id: 'goryashchie-ruki', term: 'Горящие руки', category: 'powers', aliases: [],
    definition: 'Скитальцы солёных пустошей севернее Мигдаша. Когда эксперимент с переселением синих крабов ради индиго высушил солёные озёра, большая часть тамошнего населения превратилась в собирателей соли в мёртвых землях.',
    related: ['dangun', 'migdash', 'sinie-kraby', 'indigo'],
  },
  {
    id: 'sinie-kraby', term: 'Синие крабы', category: 'beings', aliases: [],
    definition: 'Крабы, которых несколько десятков лет назад переселили в солёные озёра севернее Мигдаша ради добычи индиго. Эксперимент обернулся экологической катастрофой: озёра высохли, а край обезлюдел.',
    related: ['indigo', 'goryashchie-ruki', 'dangun'],
  },
  {
    id: 'indigo', term: 'Индиго', category: 'practices', aliases: [],
    definition: 'Краска, к которой дангунцы питают нездоровую любовь: по ней их узнают на любом базаре Даскара. Ради добычи индиго синих крабов переселили в солёные озёра севернее Мигдаша — и потеряли и озёра, и край.',
    related: ['danguntsy', 'sinie-kraby', 'goryashchie-ruki'],
  },
  {
    id: 'zolotoe-solntse', term: 'Золотое солнце', category: 'practices', aliases: ['Солнечная монета'],
    definition: 'Монета Трёх Королевств, весом которой Бралл и его Архоны привыкли решать любые вопросы. Последние десять лет дангунские шахты приносят золотых солнц всё меньше и меньше.',
    related: ['tri-korolevstva', 'dangun', 'brall', 'arhon'],
  },
  {
    id: 'dugye', term: 'Дугйе', category: 'practices', aliases: ['Кольца удачи'],
    definition: 'Кольца удачи, которыми дангунские мужчины украшают две косы. Женщины же прячут волосы в изысканные тюрбаны, показывая лишь несколько украшенных бисером прядей.',
    related: ['danguntsy'],
  },
  {
    id: 'mel', term: 'Мел', category: 'foundations', aliases: ['Кровь Мел'],
    definition: 'Древняя кровь людского рода, восходящая к Королю Королей — Мелу Озару. Ею гордятся, и она многое значит: в дангунцах течёт знатная кровь Мел, и по ней их узнают — кожа цвета румяного фундука, объёмные кудри, хотя на юге встречаются и светлые дангунцы.',
    related: ['mel-ozar', 'danguntsy', 'dangun', 'chelovek'],
  },
  {
    id: 'danguntsy', term: 'Дангунцы', category: 'beings', aliases: [],
    definition: 'Народ Дангуна — королевства башен и гор, старых денег и неизменных правил ведения войны. В них течёт знатная кровь Мел; их узнают по двум косам с кольцами дугйе, по тюрбанам женщин и по нездоровой любви к цвету индиго.',
    related: ['dangun', 'mel', 'dugye', 'indigo', 'chelovek'],
  },
  {
    id: 'brallcy', term: 'Бралльцы', category: 'beings', aliases: [],
    definition: 'Народ Бралла, потомки первых поселенцев земель Ханида: кожа темна, как песок после дождя, женщины сбривают волосы и брови и каждое утро украшают череп узорами, а роскошные усы — часть статуса любого уважающего себя мужчины. Радикально верующие и при этом держащиеся племенной семьи, где женщины управляют делами своих мужей.',
    related: ['brall', 'hanid', 'belaya-vera', 'chelovek', 'ern'],
  },

  // ——— Бралл: Белая Вера, кяризы и Ущелье Снов ———
  {
    id: 'ern', term: 'Эрн', category: 'places', aliases: [],
    definition: 'Столичный город Бралла, стоящий поблизости от Ущелья Снов.',
    related: ['brall', 'propast-snov', 'brallcy'],
  },
  {
    id: 'propast-snov', term: 'Пропасть Снов', category: 'places', aliases: ['Ущелье Снов'],
    definition: 'Разлом у земель Бралла, за простор горизонта над которым бралльские торговцы совершили первый полёт на север. Так Эл’худдур вышел к южным землям Маракийского Султаната, и возвращение капитана стало новым началом для культуры Бралла. По другую сторону Пропасти стоит Меранг, первый бастион Марака.',
    related: ['brall', 'ern', 'el-huddur', 'maraq', 'merang'],
  },
  {
    id: 'belaya-vera', term: 'Белая Вера', category: 'powers', aliases: [],
    definition: 'Вера Нарекателей, ставшая в Бралле частью закона и повседневных реалий: во времена Объятия Бралл был первым местом, куда пришло просветление от Граара. Но воспевания Белого Пророка дают трещины — на улицах таятся старые городские шаманы, а чародейные отметки на теле по-прежнему в ходу, и Нарекатели на это прикрывают своё око.',
    related: ['narekateli', 'graar', 'belyy-prorok', 'brall', 'obyatie'],
  },
  {
    id: 'kyarizy', term: 'Кяризы', category: 'places', aliases: [],
    definition: 'Подземные водоводы и реки Даскара. Быстрейший путь к Тик-Чику лежит через кяризы и подводные реки Бралла: группировки, братства и ныряльщики соревнуются там по своим правилам, доставляя грузы всех сортов. Лучшие паромщики в них — самагхи, и в них же, говорят, просыпаются спящие.',
    related: ['brall', 'tik-chik', 'samaghi', 'mifrasovyi-put'],
  },

  // ——— Адаады: выжившие под солнцем ———
  {
    id: 'adaady', term: 'Адаады', category: 'beings', aliases: ['Шадуллины'],
    definition: 'Народ людей, осевших в бескрайних степях Хурхона и живущих в низких глиняных домах за высокими стенами. Их имя означает «выжившие под солнцем»; худдулинское прозвище «шадуллины» — «люди грязи» — адаады считают оскорблением. Одни крови худдулинов их терпят, другие враждуют и считают паразитами степи, а сами адаады часто становятся связующим звеном между людьми и степью.',
    related: ['hurhon', 'hudduliny', 'chelovek', 'stepnoy-tigr', 'med-chernyh-pchel'],
  },
  {
    id: 'stepnoy-tigr', term: 'Степной тигр', category: 'powers', aliases: [],
    definition: 'Тот, кто победил степь и одолел её опасности. Степные тигры стоят во главе племён адаадов, и множество искателей проходят испытание караз, чтобы заработать этот титул. Решение трёх великих степных тигров примкнуть к северным худдулинам поставило Хурхон на порог войны.',
    related: ['adaady', 'karaz', 'hurhon', 'velikiy-agha'],
  },
  {
    id: 'karaz', term: 'Караз', category: 'culture', aliases: [],
    definition: 'Испытание, которое проходит адаад, чтобы заслужить титул степного тигра.',
    related: ['adaady', 'stepnoy-tigr'],
  },
  {
    id: 'kostyanye-providtsy', term: 'Костяные провидцы', category: 'powers', aliases: [],
    definition: 'Гадатели адаадов, читающие лопатки додор. Вера в них — одно из самых распространённых верований этого народа: врагами адаады считают тех, кому суждено умереть, а товарищами — тех, за кого умереть не стыдно, ведь так гласят кости.',
    related: ['adaady', 'dodor'],
  },
  {
    id: 'obo', term: 'Обо', category: 'places', aliases: [],
    definition: 'Священное место кочевников, где любой может оставить подношение духам или богам степи. Обо ставят в честь семейного божества — у обо Ай’анги молятся о переменах и о том, чтобы гроза миновала. Ветреные худдулины живут рядом с определённым обо и заботятся о нём; адаады же после Объятия демонстративно насаживали на шесты обо головы Нарекателей.',
    related: ['hudduliny', 'omor', 'ay-anga', 'adaady', 'narekateli'],
  },
  {
    id: 'med-chernyh-pchel', term: 'Мёд чёрных пчёл', category: 'practices', aliases: [],
    definition: 'Один из главных предметов торговли адаадов: его добывают в пропастях Хурхона, в гигантских ульях чёрных пчёл.',
    related: ['adaady', 'hurhon'],
  },
  {
    id: 'karabalgun', term: 'Карабалгун', category: 'characters', aliases: [],
    definition: 'Адаад, ставший приёмным сыном Великого Агхи и сыгравший огромную роль в установлении мира между Браллом и Хурхоном. Но даже возвышение адаада в золотую юрту не изменило решения трёх великих степных тигров примкнуть к восставшим северным худдулинам.',
    related: ['adaady', 'velikiy-agha', 'zolotaya-yurta', 'brall', 'hurhon', 'stepnoy-tigr'],
  },
  {
    id: 'velikiy-agha', term: 'Великий Агха', category: 'powers', aliases: ['Агха'],
    definition: 'Правитель худдулинов, сидящий в золотой юрте. Его приёмным сыном стал адаад Карабалгун, а против него восстали северные худдулины, к которым примкнули три великих степных тигра, — и в степях Хурхона затих ветер в ожидании войны.',
    related: ['hudduliny', 'zolotaya-yurta', 'karabalgun', 'stepnoy-tigr', 'hurhon'],
  },
  {
    id: 'zolotaya-yurta', term: 'Золотая юрта', category: 'places', aliases: [],
    definition: 'Ставка Великого Агхи и высшее место в степи: возвышением в золотую юрту называют вход в семью правителя худдулинов.',
    related: ['velikiy-agha', 'hudduliny', 'karabalgun'],
  },


  // ——— Худдулины: роды, пути и Закон степи ———
  {
    id: 'erh', term: 'Эрх', category: 'beings', aliases: ['Солнечные худдулины'],
    definition: 'Самая многочисленная ветвь народа худдулинов — строго дисциплинированная полувоенная сила, живущая по законам степи. Их патриархальное общество исповедует культ почитания предков и старших и поклоняется сотням малых кочевнических богов: помимо Нарара и Салхи, известнее всех Ай’анга. Дээл эрх не сковывает движений и предназначен для верховой езды.',
    related: ['hudduliny', 'narar', 'salhi', 'ay-anga', 'deel', 'obo'],
  },
  {
    id: 'sar', term: 'Сар', category: 'beings', aliases: ['Лунные худдулины'],
    definition: 'Горная ветвь народа худдулинов, сторонящаяся степных сородичей. Сар живут на высокогорье в крайних климатических условиях, кочуют с зимних пастбищ на летние и покидают родные края лишь по знамению шамана. Им помогают грузные красно-коричневые яки, а самые распространённые их боги — Снежный Отец и Ледяная Мать. Некоторые воины употребляют мистические травы и грибы, что делает их одними из опаснейших противников на поле боя.',
    related: ['hudduliny', 'snezhnyy-otets', 'ledyanaya-mat', 'chuba', 'kas-ak', 'myo-ey'],
  },
  {
    id: 'omor', term: 'Омор', category: 'beings', aliases: ['Ветреные худдулины', 'Бегущие по ветру'],
    definition: 'Ветвь народа худдулинов, живущая рядом с определённым обо. Омор сильнее всех связаны с богами кочевников и не имеют ни родов, ни кланов, а потому презираемы в худдулинских кругах, где семья — основа всего. Но с ними мирятся: многие из них заботятся о священных местах.',
    related: ['hudduliny', 'obo'],
  },
  {
    id: 'deel', term: 'Дээл', category: 'practices', aliases: [],
    definition: 'Кочевой халат худдулинов: у эрх он не сковывает движений и предназначен для верховой езды. Символы на нём отличают одну семью от другой — грязно-красный с эмблемой узла огня у Солнечных Всадников, длинный жёлтый с узлом клыка у Шкур Ящериц.',
    related: ['hudduliny', 'erh', 'solnechnye-vsadniki', 'shkury-yashcherits'],
  },
  {
    id: 'chuba', term: 'Чуба', category: 'practices', aliases: [],
    definition: 'Тёплая и универсальная одежда сар худдулинов, идеально подходящая для жизни на высокогорье.',
    related: ['hudduliny', 'sar'],
  },
  {
    id: 'solnechnye-vsadniki', term: 'Солнечные Всадники', category: 'powers', aliases: [],
    definition: 'Род худдулинов, который узнают по грязно-красному дээлу с эмблемой узла огня и по меховым плоским шапкам того же цвета.',
    related: ['hudduliny', 'deel', 'erh'],
  },
  {
    id: 'shkury-yashcherits', term: 'Шкуры Ящериц', category: 'powers', aliases: [],
    definition: 'Род худдулинов, который узнают по длинному жёлтому дээлу с вышитым узлом клыка, высоким фетровым шляпам и длинным традиционным шалям поверх них.',
    related: ['hudduliny', 'deel'],
  },
  {
    id: 'kas-ak', term: 'Кас’ак', category: 'foundations', aliases: ['Путь Снега'],
    definition: 'Путь Снега — один из путей кочевнических богов, который практикуют среди сар худдулинов.',
    related: ['sar', 'hudduliny', 'myo-ey'],
  },
  {
    id: 'myo-ey', term: 'Мйо’эй', category: 'foundations', aliases: ['Путь Льда'],
    definition: 'Путь Льда — один из путей кочевнических богов, который практикуют среди сар худдулинов.',
    related: ['sar', 'hudduliny', 'kas-ak'],
  },
  {
    id: 'snezhnyy-otets', term: 'Снежный Отец', category: 'foundations', aliases: [],
    definition: 'Дух высокогорья, один из самых распространённых богов кочевников среди сар худдулинов.',
    related: ['sar', 'ledyanaya-mat', 'hudduliny'],
  },
  {
    id: 'ledyanaya-mat', term: 'Ледяная Мать', category: 'foundations', aliases: [],
    definition: 'Дух высокогорья, один из самых распространённых богов кочевников среди сар худдулинов.',
    related: ['sar', 'snezhnyy-otets', 'hudduliny'],
  },
  {
    id: 'zakon-stepi', term: 'Закон степи', category: 'culture', aliases: [],
    definition: 'То, ради чего спокойный и гостеприимный народ становится яростным и импульсивным. Если в остальных частях Даскара нарушение законов карается по-разному, то в степи есть только один вариант — смерть.',
    related: ['hudduliny', 'zakon-nebes', 'hurhon'],
  },
  {
    id: 'bartir', term: 'Бартир', category: 'characters', aliases: [],
    definition: 'Высокий скуластый худдулин, несущий дозор с самой высокой башни каменного города: Агха хотел видеть человека из города камня мёртвым, и долг Бартира — исполнить это желание, ведь никто не смеет нарушить Закон Небес и продолжать спокойно жить. Длинный синий дээл и миндалевидные глаза выделяют его в городской толпе; каменные города он считает ужасными и уверен, что живущие в них завидуют свободному народу.',
    related: ['hudduliny', 'deel', 'zakon-nebes', 'velikiy-agha'],
  },

  // ——— Удриши: Нармеш, Игра и мастодонты ———
  {
    id: 'narmesh', term: 'Нармеш', category: 'foundations', aliases: ['Звезда судьбы'],
    definition: 'Звезда судьбы удришей и цель их бесконечной дороги. Жизнь удриша — это путешествие, а путешествие — это жизнь; если вы видите осевшего удриша, значит, он нашёл свою Нармеш. Толкуют её по-разному: кто-то говорит, что это вещь, кто-то — что занятие, другие — что родственная душа или место. Не нашедшие её оседают в трущобах и становятся пйюр-пйюр.',
    related: ['udrishi', 'urma', 'eril', 'pyyur-pyyur'],
  },
  {
    id: 'igra-udrishey', term: 'Игра удришей', category: 'history', aliases: [],
    definition: 'Ежегодное состязание удришей за самое выдающееся сокровище или секрет, найденный в руинах. Игра — это способ социализации, собирания сведений и укрепления связей; чаще она идёт умами, и побеждает самый хитрый, хотя в пылу случаются и кровопролития. Победитель обычно получает право разграбить подземелье целиком.',
    related: ['udrishi', 'velikaya-igra', 'velikaya-ma', 'stareyshiy-izobretatel'],
  },
  {
    id: 'velikaya-igra', term: 'Великая Игра', category: 'history', aliases: [],
    definition: 'Игра удришей, которая раз в сто пятьдесят лунных лет проходит в храме Эрил и Урмы на высоких вершинах запада.',
    related: ['igra-udrishey', 'udrishi', 'hram-eril-i-urmy', 'bronzovye-vershiny'],
  },
  {
    id: 'hram-eril-i-urmy', term: 'Храм Эрил и Урмы', category: 'places', aliases: [],
    definition: 'Святилище звёздных близнецов на высоких вершинах запада, где раз в сто пятьдесят лунных лет проходит Великая Игра.',
    related: ['urma', 'eril', 'velikaya-igra', 'udrishi'],
  },
  {
    id: 'mastodonty', term: 'Мастодонты', category: 'beings', aliases: ['Песчаный бизон', 'Серый тахар'],
    definition: 'Гиганты, ставшие удришам домом и семьёй: песчаные бизоны, серые тахары, песчаные львы, слепые яки с Пламенного Языка. Удриши воспитываются в окружении своих компаньонов и, сколько помнят старейшины, всегда могли говорить с существами огромных размеров. Раскачивающиеся верёвки, раздвижные юрты и плетёные ткани, которые семья сплетает вокруг такого спутника, выглядят так, будто вот-вот развалятся, — но нерушимы, пока жива жажда приключений.',
    related: ['udrishi', 'plamennyi-yazyk'],
  },
  {
    id: 'korona-udrishey', term: 'Корона удришей', category: 'practices', aliases: [],
    definition: 'Причёска удришевских женщин: богато украшенная, она вмещает немало нужных предметов — от орудий труда до мечей. До сих пор многие удивляются, как там столько всего помещается.',
    related: ['udrishi'],
  },
  {
    id: 'velikaya-ma', term: 'Великая Ма', category: 'characters', aliases: [],
    definition: 'Удриш, чья встреча со Старейшим Изобретателем положила начало обычаю Игры: с тех пор победитель получает право разграбить подземелье полностью.',
    related: ['udrishi', 'stareyshiy-izobretatel', 'igra-udrishey'],
  },
  {
    id: 'stareyshiy-izobretatel', term: 'Старейший Изобретатель', category: 'characters', aliases: [],
    definition: 'Удриш, чья встреча с Великой Ма положила начало обычаю Игры: с тех пор победитель получает право разграбить подземелье полностью.',
    related: ['udrishi', 'velikaya-ma', 'igra-udrishey'],
  },
  {
    id: 'azur-mechtatelnitsa', term: 'Азур Мечтательница', category: 'characters', aliases: [],
    definition: 'Удриша из сказания о путешествии по красным дюнам: с мешочком лакомств для гигантского василиска, темными кудрями из-под цветастого тюрбана и умением перепрыгивать с верёвки на верёвку над песчаным бизоном. Ждала великого соревнования в Бронзовых Вершинах и гадала, кто победит в этот раз.',
    related: ['udrishi', 'mastodonty', 'bronzovye-vershiny', 'igra-udrishey'],
  },

  // ——— Маракийцы: ямы, танец стали и ожидание Солнцерожденного ———
  {
    id: 'igry-vechno-palyashchego', term: 'Игры Вечно Палящего', category: 'history', aliases: [],
    definition: 'Состязание, которое проходит в Мараке каждые десять лет: там выбирают семерых визирей, показывающих своё мастерство, и там же любой из них может бросить вызов самому Серому Султану.',
    related: ['maraq', 'vizir', 'seryy-sultan', 'shamas'],
  },
  {
    id: 'tanets-stali', term: 'Танец стали', category: 'culture', aliases: ['Танец стали и крови'],
    definition: 'Маракийское искусство боя, которому учат в ямах. Из-за него броню носят немногие: доспех для маракийца — проявление слабости, знак того, что танец не освоен. Дрепи — единственные, кому позволено не участвовать в ритуальном танце стали.',
    related: ['maraq', 'yamy', 'drepi', 'dadzhari', 'braslet-materi'],
  },
  {
    id: 'braslet-materi', term: 'Браслет матери', category: 'practices', aliases: [],
    definition: 'Один из самых важных предметов для маракийца: его получают, вернувшись домой из ям с завершёнными испытаниями. Браслет делает носящего полноправным членом общества и всегда напоминает, через что тот прошёл.',
    related: ['maraq', 'yamy', 'tanets-stali'],
  },
  {
    id: 'drepi', term: 'Дрепи', category: 'powers', aliases: [],
    definition: 'Привилегированное сословие маракийцев: учёные, ткачи узлов, шаманы, воспеватели огня и звездочёты. Лишь они могут не участвовать в ритуальном танце стали, и лишь они вместе с певцами пламени украшают замысловатыми узорами свои руки.',
    related: ['maraq', 'dadzhari', 'tanets-stali'],
  },
  {
    id: 'dadzhari', term: 'Даджари', category: 'powers', aliases: [],
    definition: 'Воины, составляющие остальную часть маракийского общества: для них участие в танце стали обязательно. Даджари могут владеть любыми ремёслами — от парфюмера до мастера костей, — но все они равны в ямах, пока не доказано обратное.',
    related: ['maraq', 'drepi', 'yamy', 'tanets-stali'],
  },
  {
    id: 'vizir', term: 'Визирь', category: 'powers', aliases: ['Семь визирей'],
    definition: 'Семеро, следующих по положению за Серым Султаном. Визирей выбирают по заслугам, титул не передаётся по наследству, а раз в десять лет на Играх Вечно Палящего они заново показывают своё мастерство.',
    related: ['seryy-sultan', 'maraq', 'igry-vechno-palyashchego'],
  },
  {
    id: 'galantar', term: 'Галантар', category: 'beings', aliases: [],
    definition: 'Зверь, спутник Бесклыкого. Легион Горящего колеса носит на масках тысячу глаз, символизирующих его.',
    related: ['zhark', 'legion-goryashchego-kolesa', 'maraq'],
  },
  {
    id: 'legion-goryashchego-kolesa', term: 'Легион Горящего колеса', category: 'powers', aliases: [],
    definition: 'Отряд наёмников, чьи маски несут тысячу глаз — символ Галантара, зверя-спутника Бесклыкого. Трёхглазый орёл Бесклыкого украшает знамёна многих таких отрядов Марака.',
    related: ['galantar', 'zhark', 'maraq'],
  },
  {
    id: 'solntserozhdennyy', term: 'Солнцерожденный', category: 'foundations', aliases: ['Мессия маракийцев'],
    definition: 'Мессия, которого ждут маракийцы: он поведёт их обратно в затерянные земли предков-колоссов, в Азар. Ожидание связано с вечно горящим диском Шамаса и знамением потерянного всадника, и каждый маракиец хотя бы раз в неделю делает приношение солнечному диску в надежде, что этот день уже скоро.',
    related: ['maraq', 'shamas', 'azar', 'kolossy'],
  },
  {
    id: 'azar', term: 'Азар', category: 'places', aliases: [],
    definition: 'Затерянные земли предков-колоссов, куда Солнцерожденный должен привести маракийцев. За ними же маракийцы идут на юг из Меранга через Красные Пески.',
    related: ['solntserozhdennyy', 'maraq', 'kolossy', 'merang', 'krasnye-peski'],
  },
  {
    id: 'merang', term: 'Меранг', category: 'places', aliases: [],
    definition: 'Город-государство пепельных маракийцев в северных пределах Бронзовых вершин.',
    related: ['pepelnye-marakiytsy', 'bronzovye-vershiny', 'maraq', 'propast-snov'],
  },
  {
    id: 'pepelnye-marakiytsy', term: 'Пепельные маракийцы', category: 'beings', aliases: [],
    definition: 'Ветвь народа маракийцев, чьи восприятие и устойчивость приспособлены к горячим пустынным землям. Кожа цвета светлого пепла, глаза яркой бирюзы или зелёные, рост не выше шести футов. Их город-государство — Меранг; из них происходил и генерал А’за’ал.',
    related: ['marakiets', 'merang', 'a-za-al', 'yantarnye-marakiytsy'],
  },
  {
    id: 'yantarnye-marakiytsy', term: 'Янтарные маракийцы', category: 'beings', aliases: [],
    definition: 'Ветвь народа маракийцев, которую учат разжигать внутренний огонь и обращать его себе во благо. Крепко сбитые, до семи футов ростом, с красновато-золотыми глазами: в них ярче всего видна кровь великанов. Импульсивные и горячие, они выжигают на теле знаки всех достижений своего пути.',
    related: ['marakiets', 'pepelnye-marakiytsy', 'dragmir'],
  },
  {
    id: 'a-za-al', term: 'А’за’ал', category: 'characters', aliases: ['Генерал А’за’ал'],
    definition: 'Генерал, происходивший из пепельных маракийцев.',
    related: ['pepelnye-marakiytsy', 'maraq'],
  },
  {
    id: 'metok', term: 'Меток', category: 'characters', aliases: [],
    definition: 'Маракиец из сказания о полуденной стычке в дюнах: едва заметные белые шрамы, кожа цвета утреннего пепла, внимательные янтарные глаза. Каждый раз, касаясь холодной чёрной стали ятагана, он вспоминал дни обучения в ямах и благодарил наставника — после них все прочие испытания казались прогулкой в фиговых садах Марака.',
    related: ['marakiets', 'maraq', 'yamy', 'shamas'],
  },

  // ——— Драгмирцы: хранители троп ———
  {
    id: 'dragmirtsy', term: 'Драгмирцы', category: 'beings', aliases: ['Алые драгмирцы', 'Алые'],
    definition: 'Народ проводников: сероватая кожа, расписанная узорами шрамов, высокие скулы, длинные силуэты и глаза, что в свете кажутся насыщенно-красными. Никто не знает, потеряли ли алые былой облик или вернулись к подлинным истокам, но проводника в самые опасные и удалённые от цивилизации места ищут среди них — говорят, сама Вуаль приоткрыла им свои тайные тропы. Тьма погасила пламя в их руках, но кровь древних гигантов всё ещё течёт в жилах, густея и подгоняя в путь изнутри.',
    related: ['dragmir', 'dogovor-krovi', 'vual', 'marakiets'],
  },
  {
    id: 'dogovor-krovi', term: 'Договор Крови', category: 'culture', aliases: [],
    definition: 'Плата за услуги алых драгмирцев: традиция гласит, что скрепить договор может лишь кровь и что кровь не лжёт. Каждый ритуал неповторим, а напоминанием служат шрамы, которые драгмирец наносит на себя после выполнения. В любой момент глава семьи может потребовать от просящего или его нанимателей ответную услугу; как определяется плата и зачем алые собирают обязательства, не знает никто, кроме самых влиятельных из них. Взрослым алого считают после первого завершённого Договора, а нарушителя уничтожит изнутри его собственная кровь.',
    related: ['dragmirtsy', 'kirharim'],
  },
  {
    id: 'kirharim', term: 'Кирхарим', category: 'places', aliases: [],
    definition: 'Место, дорогу в которое просят у алых драгмирцев: за неё предлагают целое состояние, но алым это неинтересно — им нужен Договор Крови. Чем Кирхарим опасен, свод не поясняет.',
    related: ['dragmirtsy', 'dogovor-krovi'],
  },

  // ——— Ойрдуги: Призыв, стигматы и Дети Нефрита ———
  {
    id: 'shahi-labirinta', term: 'Шахи Лабиринта', category: 'beings', aliases: ['Семь Шахов', 'Шахи'],
    definition: 'Семеро владык Лабиринта и истинные создатели ойрдугов. Часть услышавших Призыв считает его указанием вернуться к ним, другие — началом дороги к истине, обнаруженной Шахами. Чем ближе последний оборот Колеса Судьбы, тем сильнее Тёмная Нить опутывает судьбу ойрдугов, делая её подвластной Шахам.',
    related: ['labirint', 'oyrdugi', 'prizyv', 'koleso-sudby', 'temnaya-nit'],
  },
  {
    id: 'prizyv', term: 'Призыв', category: 'foundations', aliases: [],
    definition: 'Шёпот, который начинает звучать в разуме ойрдуга, когда проявляются стигматы: он повествует о безумии и отчаянии, а эхом его становятся слова Силы. Шёпот может обернуться предупреждением о грядущем, рассказом о неизвестном прошлом или напевом ранее неслыханной мелодии. Призыв — одновременно проклятие и благословение: он даёт силу выжить в полном презрения мире и подталкивает к грани безумия, и он же связывает всех ойрдугов между собой.',
    related: ['oyrdugi', 'stigmata', 'labirint', 'shahi-labirinta'],
  },
  {
    id: 'deti-nefrita', term: 'Дети Нефрита', category: 'powers', aliases: [],
    definition: 'Культ ойрдугов, созданный на Пламенном Языке теми, кто противится Призыву и потерял веру в Лабиринт. В поисках красоты и очищения они практикуют жестокие ритуалы самобичевания и клеймения, скрывают свои стигматы и вырезают на теле символы улунгуров, веря, что те даруют защиту, — но их путь к чистоте лишь глубже погружает их в безумие. Храмовники культа внедряют в смертных пожертвованные искры, готовя войну с семью Шахами; смертные с двумя искрами не справляются, и от них остаются пустые изуродованные оболочки.',
    related: ['oyrdugi', 'plamennyi-yazyk', 'labirint', 'ulungury', 'iskra', 'shahi-labirinta'],
  },
  {
    id: 'dyavolskie-vrata-batu', term: 'Дьявольские Врата Бату', category: 'places', aliases: [],
    definition: 'Одно из мест, где связь с творениями падших серафимов особенно сильна, а потому ойрдуги рождаются чаще, чем где-либо ещё.',
    related: ['oyrdugi', 'labirint', 'plamennyi-yazyk'],
  },
  {
    id: 'la-mistik', term: 'Ла Мистик', category: 'powers', aliases: ['Труппа Ла Мистик'],
    definition: 'Путешествующая труппа, среди которой ойрдуги рождаются заметно чаще, чем в других частях Даскара.',
    related: ['oyrdugi', 'labirint'],
  },
  {
    id: 'koleso-sudby', term: 'Колесо Судьбы', category: 'foundations', aliases: [],
    definition: 'Ход мироздания, отсчитываемый оборотами. Приближение последнего оборота убивает в ойрдугах надежду когда-нибудь освободиться от проклятия Лабиринта; мор’хоры же говорят, что в день, когда колесо остановится, спящий бог проснётся внутри одного из них.',
    related: ['temnaya-nit', 'oyrdugi', 'morhory', 'kult-spyashchego-boga'],
  },
  {
    id: 'zemli-vechnoy-ohoty', term: 'Земли Вечной Охоты', category: 'places', aliases: [],
    definition: 'Земли, куда уходят после смерти и куда ойрдугам путь закрыт: с гибелью тела их яркая Искра раскалывается, ведь две заключённые внутри сущности не могут больше сосуществовать.',
    related: ['oyrdugi', 'iskra'],
  },

  // ——— Мор’хоры: Анзу, Спирали и спящий бог ———
  {
    id: 'anzu', term: 'Анзу', category: 'beings', aliases: [],
    definition: 'Внутренний демон мор’хоров: неконтролируемая вспышка насилия, сидящая в теле, словно сдерживаемый вихрь. Анзу превращает мор’хора в яростное животное, о каких на поверхности нашёптывают в балладах как о злых духах подземелий. Контролировать его учат с раннего возраста: одни держат зверя под замком, другие оттачивают владение им до совершенства, но показывать Анзу в обществе — табу. Оттого мор’хоры большую часть времени спокойны, неторопливы и уравновешенны.',
    related: ['morhory', 'purush', 'provinivshiysya-strazh', 'kult-spyashchego-boga'],
  },
  {
    id: 'provinivshiysya-strazh', term: 'Провинившийся Страж', category: 'history', aliases: [],
    definition: 'Легенда о том, как мор’хорам выпала честь охранять Кузню Золотых Нитей, а коварный шепчущий ветер соблазнил их войти внутрь. Там они увидели пряди судьбы и захотели овладеть ими, и в святая святых пролилась кровь — каждый хотел обладать этой силой. В ярости Пуруш навсегда изгнал мор’хоров из святилища и проклял, оживив в них демона, жаждущего лишь насилия.',
    related: ['morhory', 'purush', 'kuznya-sudby', 'anzu'],
  },
  {
    id: 'kult-spyashchego-boga', term: 'Культ Спящего Бога', category: 'powers', aliases: ['Спящий бог'],
    definition: 'Вера части мор’хоров в то, что их предки не провинились, а сами они — частица спящего бога. Пуруш, говорят они, принёс себя в жертву, чтобы дать жизнь циркуляции м’хур; Анзу — его искра, которой не нужно стыдиться, а нужно учиться пользоваться. Воспоминания предков нахлынывают перед смертью потому, что все мор’хоры суть единое целое — плоть и разум Пуруша, — и настанет день, когда колесо остановится и спящий бог вновь проснётся внутри мор’хора.',
    related: ['morhory', 'purush', 'anzu', 'mhur', 'koleso-sudby'],
  },
  {
    id: 'orakuly-spiraley', term: 'Оракулы Спиралей', category: 'powers', aliases: [],
    definition: 'Те, кто в Спиралях определял, чьим перерождением является появившийся на свет мор’хор, и тем направлял его на верный путь. С потерей последних Спиралей оракулов осталось совсем немного, и многие мор’хоры не могут пользоваться опытом прежних воплощений.',
    related: ['morhory', 'spirali', 'mhur', 'brazan'],
  },
  {
    id: 'brazan', term: 'Бразан', category: 'places', aliases: [],
    definition: 'Последняя Спираль мор’хоров — подземный город, разрушенный природным катаклизмом в 65 году Багрового Быка. После этого мор’хоры остались без места, которое могли бы назвать своим: многие живут небольшими коммунами в городах Пламенного Языка, а некоторые предпочитают одиночество, осуждая общество поверхности.',
    related: ['spirali', 'morhory', 'bagrovyy-byk', 'plamennyi-yazyk'],
  },
  {
    id: 'bagrovyy-byk', term: 'Багровый Бык', category: 'history', aliases: [],
    definition: 'Эпоха, счётом лет которой пользуется свод: в её 65 году природный катаклизм разрушил Бразан, последнюю Спираль мор’хоров.',
    related: ['brazan', 'spirali', 'morhory'],
  },
  {
    id: 'deti-edry', term: 'Дети Эдры', category: 'beings', aliases: [],
    definition: 'Искусственные создания Эдр’а, порождённые вне м’хур. Связи с предками у них нет, а потому не действует и проклятие Анзу; в отличие от своих творцов, Дети Эдры не нуждаются в долгом сне, но их искусственная Искра не восстанавливается обычным путём.',
    related: ['edra', 'morhory', 'mhur', 'anzu', 'iskra'],
  },
  {
    id: 'mak-a', term: 'Мак’а', category: 'characters', aliases: [],
    definition: 'Мор’хора из сказания о находке: её огромные рога в форме полумесяца задевали потолок кабинета, пока она изучала кристаллом только что купленный механизм и надеялась, что он не окажется очередной подделкой. Среди ярких килимов и ковров она думала о том, сколько тайн хранят изобретения Спирали, как много знали её предки — и что время исправить сделанное ещё есть.',
    related: ['morhory', 'spirali', 'stolp-kristall'],
  },

  // ——— Самагхи: глубины и дулур ———
  {
    id: 'dulur', term: 'Дулур', category: 'beings', aliases: [],
    definition: 'Моллюск, которым искатели кормят себя перед погружением, думая обмануть глубины. Самагхи над этим смеются: глубины заберут, что хотят, и никакие моллюски этого не изменят.',
    related: ['samaghi', 'kyarizy'],
  },
  {
    id: 'chuluga', term: 'Чулуга', category: 'characters', aliases: [],
    definition: 'Самагхи из сказания о погружении: в нескольких слоях ткани и с бурдюками воды вокруг пояса она ждала возвращения в холодную безграничную темноту глубин, где только она и тьма. Считая себя благословлённой глубинами, а искателей с их дулуром — жалкими созданиями пыли и грязи, она делала два шага и прыгала со скалы: время нырять, и Чулуга будет нырять, пока жива.',
    related: ['samaghi', 'dulur', 'kyarizy'],
  },

  // ——— Соседние досье, на которые ссылаются народы ———
  {
    id: 'uatana', term: 'Уатана', category: 'places', aliases: [],
    definition: 'Земли и болота, на которых змееобразные вету воздвигли свои города-зиккураты. Здесь собирают ядовитую рыбу и смертельные растения, из которых Ча’Нери варят противоядия, мази и эликсиры.',
    related: ['vetu', 'vetu-zemli', 'daskar'],
  },
  {
    id: 'tash-nagar', term: 'Таш’Нагар', category: 'places', aliases: [],
    definition: 'Земли и королевство вирморожденных. Шесть родов, вышедших победителями из бойни, заключили в землях спящей Салхи договор о перемирии, определивший структуру власти будущего Таш’Нагара.',
    related: ['virmorozhdennye', 'salhi', 'virmohana', 'virmy'],
  },
  {
    id: 'virmohana', term: 'Вирмохана', category: 'culture', aliases: [],
    definition: 'Основа современного общества вирморожденных: разделение на две касты — норбу и нагбо. Только представитель высшей касты, норбу, может быть избран Несущим Пламя, продолжателем рода: их Кремень идеален, а Пламя сильно.',
    related: ['virmorozhdennye', 'tash-nagar'],
  },


  // ——— Время Королей: Всадники Шамаса ———
  {
    id: 'vsadniki-shamasa', term: 'Всадники Шамаса', category: 'powers', aliases: ['Всадники солнца', 'Пятёрка с ничейных земель'],
    definition: 'Пятеро наёмников с ничейных земель, взявшие заказ с золотой нитью и ставшие клинком «Золотого Симурга»: драгмирец Саргон, борос Нармандах, эхор’нур Ятх’У и элорцы-близнецы Садал и Мидал; позже к ним прибавилась мор’хора Эдр’а. Имя им дал Мелозар — «Всадники солнца», — но прижилось другое, потому что солнце звали Шамасом. Их подвигами держалась слава ордена, их руками пали гидра Тусуса, дети времени Му и Ло, Король сияния и Королева чумы.',
    related: ['bratstvo-simurga', 'sargon', 'narmandah', 'yath-u', 'sadal', 'midal', 'edra'], history: 'epoha-lyudey',
  },
  {
    id: 'sargon', term: 'Саргон', category: 'characters', aliases: ['Саргон из семьи Мехшир'],
    definition: 'Драгмирец с серой кожей, красными волосами до пола и камнем сальбария вместо глаза, весь покрытый пересекающимися шрамами. Он не тощ, как его собратья, — объёмы мышц нужны ему, чтобы носить огромный клинок. Носил деньги, чего драгмирцы не делают, и от рождения был клинком Драгмира: договор его семьи не давал ему поднять руку на создателя, и в ночь охоты двух братьев кровь текла у него из ушей, носа и глаз, пока он смотрел на гибель владыки. Разбив свой меч о плоть Драгмира, он первым из драгмирцев освободился от договора — и сам выбрал, за что сражаться дальше.',
    related: ['vsadniki-shamasa', 'dragmirtsy', 'dragmir', 'ohurozar', 'mel-ozar', 'semya-mehshir', 'holodnaya-yarost'], history: 'epoha-lyudey',
  },
  {
    id: 'narmandah', term: 'Нармандах', category: 'characters', aliases: ['Нара'],
    definition: 'Борос, покрытый желтоватой чешуёй, с зубами и шипами из сальбария и хвостом, который он пускает в ход в захвате. Пять лет держал звание абсолютного чемпиона ям и говорил, что смерть — ничто, если слава не погаснет. На берегу Ветамона сыграл в кости с женщиной с красными-красными волосами и не понял, что говорил с Улой: ставкой была его слава. Позже, чтобы вырваться из чар флейты Куджина, проткнул себе барабанные перепонки и остался глухим — с тех пор говорил через сальбариевый шлем Ятх’У.',
    related: ['vsadniki-shamasa', 'borosy', 'yamy', 'ula', 'krasnaya-kost', 'tsam', 'kudzhin'], history: 'epoha-lyudey',
  },
  {
    id: 'sadal', term: 'Садал', category: 'characters', aliases: [],
    definition: 'Элорец в тёмной мерцающей мантии, с впавшими глазами и безумным взглядом, который видит нити судьбы. Знал день и час собственной смерти и всё делал ради плетения: каждый его довод начинался словами «так велят нити». Брат-близнец Мидал и младший брат Зумрата. Потеряв сестру у стен бастиона, он впервые в жизни увидел, как кто-то пошёл не по линии судьбы, — и ушёл за вуаль искать последнего ребёнка, чтобы вынести оттуда Завлона.',
    related: ['vsadniki-shamasa', 'midal', 'zumrat', 'elorcy', 'niti-sudby', 'vual', 'zavlon'], history: 'epoha-lyudey',
  },
  {
    id: 'midal', term: 'Мидал', category: 'characters', aliases: ['Тень владыки'],
    definition: 'Элорка с криво обрезанной чёлкой и длинной белой косой вокруг пояса; щелчком у серьги призывает клинки из вуали и уходит в тень. Единственная, кто не верил в судьбу и голосовал против, пока против оставалась только она. Пошла за братом, чтобы судьба не оттяпала ему голову, мечтала о чайной — и стала тенью Царя Царей, пятнадцать лет нося кинжал для сердца предателя. У бастиона она приняла в себя всю вуаль, накопленную архиепископом Умом, и ушла за вуаль вместо брата: смерть по нитям причиталась ему.',
    related: ['vsadniki-shamasa', 'sadal', 'zumrat', 'elorcy', 'vual', 'mel-ozar', 'um'], history: 'epoha-lyudey',
  },
  {
    id: 'yath-u', term: 'Ятх’У', category: 'characters', aliases: ['Шестирукий'],
    definition: 'Эхор’нур с синей кожей, шестью руками и венами цвета ртути, из подбородка которого течёт сальбарий. Ушёл из Башни, когда Верховный совет обвинил его во вмешательстве в судьбу смертных, — первое изгнание в истории его народа, и с него, говорят написания Гумо, пошла трещина, обрушившая Башни. Ока велел ему спрятать три предмета до того, как Колесо закроется; куб врат он оставил у Пюра, а пятое копьё унёс с собой.',
    related: ['vsadniki-shamasa', 'ehornury', 'fulum', 'salbariy', 'oka', 'kub-vrat', 'pyur'], history: 'epoha-lyudey',
  },
  {
    id: 'ohurozar', term: 'Охурозар', category: 'characters', aliases: ['Первый сын Азара'],
    definition: 'Основатель и глава «Золотого Симурга», человек с кудрями и золотым кольцом в волосах, разливавший гостям чай и говоривший о свободе от судьбы. Называл себя первым сыном Азара и тем, кто достанет солнце с неба, а на деле переспрашивал взглядом младшего брата перед каждым глубоким ответом. Взял с Саргона слово защитить Мелозара, а в ночь охоты двух братьев вышел с сияющим клинком против Драгмира, ранил его — и был удавлен, когда меч разбился о браслеты бога.',
    related: ['bratstvo-simurga', 'mel-ozar', 'sargon', 'dragmir', 'ohota-dvuh-bratev'], history: 'epoha-lyudey',
  },
  {
    id: 'zumrat', term: 'Зумрат', category: 'characters', aliases: [],
    definition: 'Старший из трёх элорцев-близнецов, посланный за вуаль искать последнего ребёнка вместо Садала и Мидал. Пятьдесят лет считался пропавшим, а вернулся у стен бастиона на стороне Драгмира — с белыми волосами и залитыми чернотой глазами, с договором убить брата и сестру. Вырвал из груди камень, указывающий дорогу к последнему ребёнку, бросил его Садалу и нарушил договор, зная, что жить ему осталось мгновение. За это он и окаменел: статуя Зумрата так и стоит в бастионе.',
    related: ['sadal', 'midal', 'elorcy', 'vual', 'dragmir', 'zavlon'], history: 'epoha-lyudey',
  },
  {
    id: 'semya-mehshir', term: 'Семья Мехшир', category: 'powers', aliases: ['Мехшир'],
    definition: 'Драгмирская семья, из которой происходит Саргон; её узнают по янтарным глазам. На ней лежит договор, заключённый напрямую с Драгмиром, — честь для одних и бремя для других: Саргон называл его договором, который невозможно исполнить. Перед казнью Драгмира он отправил к ним самого быстрого аджаида с приказом уходить.',
    related: ['sargon', 'dragmirtsy', 'dragmir', 'adzhaidy'], history: 'epoha-lyudey',
  },

  // ——— Владыки, советники и создатели ———
  {
    id: 'enuma', term: 'Энума', category: 'characters', aliases: [],
    definition: 'Мор’хор, создавший Эдр’у и не гордившийся этим: если бы совет спиралей узнал, что она существует, его бы казнили. Друг Эмефеюса. На единственный вопрос Эдр’ы — может ли она сама воссоздать жизнь — ответил «да» и назвал три составляющих: дыхание Сумуга, искру Пуруша и сердце колосса.',
    related: ['edra', 'emefeyus', 'morhory', 'sumug', 'purush', 'kolossy'], history: 'epoha-lyudey',
  },
  {
    id: 'oka', term: 'Ока', category: 'characters', aliases: [],
    definition: 'Тот, кто оставил эхор’нурам путь не вмешиваться в дела смертных, и тот, кто когда-то запутался в нитях судьбы, когда мор’хоры открыли хранилище. Явился Ятх’У в облике кобальда с фиолетовым тюрбаном, роясь в его вещах, и предупредил: ровно через пятьдесят лет не станет ни одной Башни. Велел спрятать три предмета — чтобы, когда Колесо закроется, миру было чем помочь себе.',
    related: ['ehornury', 'yath-u', 'fulum', 'kub-vrat', 'niti-sudby'], history: 'epoha-lyudey',
  },
  {
    id: 'kollektsioner', term: 'Коллекционер', category: 'characters', aliases: [],
    definition: 'Советник, обвешанный дорогими украшениями, который взялся открыть Всадникам врата бастиона Драгмира. Принёс им искры титана, способные разбить что угодно, но поставил условие: он предаст Драгмира лишь тогда, когда старший брат — Мардук — пойдёт за ними.',
    related: ['iskry-titana', 'dragmir', 'marduk', 'voyna-koroley'], history: 'epoha-lyudey',
  },
  {
    id: 'um', term: 'Архиепископ Ум', category: 'characters', aliases: [],
    definition: 'Элорский архиепископ, один из пятерых, кто побывал за вуалью и вернулся; серебряные волосы он вопреки обычаю носил в тугой косе у пояса, показывая, что не согласен с тем, как идут дела. Пятьдесят лет допытывался у Садала и Мидал, куда делся Зумрат, и предлагал Садалу своё место. У бастиона встал на сторону Драгмира — ради выживания элорцев, как он говорил, — и вобрал в себя столько вуали, что должен был взорваться.',
    related: ['elorcy', 'var-elor', 'sadal', 'midal', 'zumrat', 'dragmir', 'vual'], history: 'epoha-lyudey',
  },
  {
    id: 'sabara', term: 'Сабара', category: 'characters', aliases: ['Королева чумы'],
    definition: 'Королева чумы, у которой давно нет плоти: её плоть — рой, а сама она женщина под мантией, из-под которой смотрит один нарисованный глаз. Правит там, где людям плохо, и возвращается в те же города; в Ликоне её узнавали по крикам «нет тела, лишь глаз». Всадники поймали её в сосуд Эмефеюса и принесли Мелозару — новую плоть для владыки.',
    related: ['mel-ozar', 'vsadniki-shamasa', 'emefeyus', 'likot'], history: 'epoha-lyudey',
  },
  {
    id: 'ahriman', term: 'Ахриман', category: 'beings', aliases: [],
    definition: 'Маленькая девочка, которая появляется и пропадает рядом с Драгмиром и хохочет над происходящим. Она встала между клинком Охурозара и лицом бога — и меч разбился. Спрашивает, чего ты боишься, и за её спиной, если поднять взгляд, стоит пустота, в которой не дует ветер.',
    related: ['dragmir', 'ohota-dvuh-bratev', 'narmandah'], history: 'epoha-lyudey',
  },
  {
    id: 'ekvintus', term: 'Эквинтус', category: 'characters', aliases: [],
    definition: 'Мудрейший из колоссов, вставший между бастионом и армией Царя Царей: он кричал в небеса, прося остановиться, и тысячи задержали дыхание, а иные опустили оружие. Драгмир метнул бич, пробивший ему сердце, — и кровь Эквинтуса, разлившаяся между войсками, начала последнюю битву.',
    related: ['kolossy', 'dragmir', 'mel-ozar', 'voyna-koroley'], history: 'epoha-lyudey',
  },

  // ——— Десять королевств ———
  {
    id: 'tusus', term: 'Тусус', category: 'characters', aliases: ['Король крови'],
    definition: 'Король Паркаса, города крови, которого никто не видел: он ходит в золотом паланкине и в золотой маске, а на поясе носит четыре маски. Его наследники синекожи, потому что кровь у них голубая не только в переносном смысле, и он скармливал собственных детей болотной гидре — двадцать пять человек в неделю, тех, у кого правильная кровь. Держал в сердце кристалл, способный убить каждого человека, и заключил с Драгмиром договор, который распространил бы это на всех. Нармандах оторвал ему голову на снежной вершине.',
    related: ['parkas', 'krovavaya-gidra', 'dragmir', 'narmandah', 'stolp-kristall', 'maski-korolev'], history: 'epoha-lyudey',
  },
  {
    id: 'fahat', term: 'Фахат', category: 'characters', aliases: ['Король стали'],
    definition: 'Повелитель всего железа, хозяин Стального бастиона, вбивавший гвозди в растянутого на столе человека, пока говорил с гостями. Заказал Всадникам головы гидры Тусуса и отдал им до рассвета единственное, что оставалось тёплым в его теле, — время своей придворной ведьмы. Когда её убили, потерял рассудок и два года мстил, пока «Золотой Симург» не взял его бастион.',
    related: ['stalnoy-bastion', 'tusus', 'vsadniki-shamasa', 'yath-u', 'bratstvo-simurga'], history: 'epoha-lyudey',
  },
  {
    id: 'vetamon', term: 'Ветамон', category: 'characters', aliases: ['Король сияния'],
    definition: 'Король болот и красных песков, помешанный на изумрудном шёлке и на использовании магии, забывший, что он такое, и понимающий только силу. Он и есть свой подземный замок: его искру растягивали, пока она не лопалась, и сшивали заново, а лицо его проступало на потолках и стенах. Держал в колбе золотого тельца и погиб, когда Саргон пробил клинком лицо внутри огромного зелёного камня.',
    related: ['edra', 'sargon', 'izumrudnyy-shelk', 'kamen-zhizni', 'krasnye-peski'], history: 'epoha-lyudey',
  },
  {
    id: 'kudzhin', term: 'Куджин', category: 'characters', aliases: ['Король музыки'],
    definition: 'Совсем молодой король с лицом, выкрашенным в белое, и чёрными губами, играющий на флейте в виде черепа. Его музыка заманивает и показывает каждому его же желание — Нармандаху она вернула бой с полуглухим великаном. Чтобы вырваться, борос оглушил себя, а флейту сломал о колено. Всадники принесли Куджина владыке вместе с Сабарой.',
    related: ['narmandah', 'sabara', 'vsadniki-shamasa'], history: 'epoha-lyudey',
  },
  {
    id: 'mu-i-lo', term: 'Му и Ло', category: 'characters', aliases: ['Близнецы, которые не стареют'],
    definition: 'Первые цари людей и самые старшие короли человечества, близнецы, которые никогда не стареют. Правят самым большим королевством, где ночь длится дольше, Шамас заходит лишь на чашку чая, а Уле и Азраку они запретили появляться вовсе. Не сдержали договор с элорцами и первыми из королей их не приняли; в их городе Улок время идёт кругами, а на стыке двух сплетённых башен зрели дети времени.',
    related: ['ulok', 'deti-vremeni', 'elorcy', 'shamas', 'ula', 'azrak'], history: 'epoha-lyudey',
  },
  {
    id: 'iton', term: 'Итон', category: 'characters', aliases: [],
    definition: 'Правитель Есора, города между владениями Фахата и Гулума. Всадники пришли за зелёным камнем жизни, который он хранил, — и нашли его обезглавленным в шахте для побега, с камнем, вросшим под ребро. Есор пал в четвёртый раз за десять лет, а молва решила, что правитель сбежал: это пошатнуло силу Фахата, ведь поместникам бежать не полагается.',
    related: ['esor', 'kamen-zhizni', 'fahat', 'vsadniki-shamasa'], history: 'epoha-lyudey',
  },
  {
    id: 'aegus', term: 'Аегус', category: 'characters', aliases: ['Король Боли'],
    definition: 'Король Боли, отославший первого сына на вечные муки: тот висел в петле на арке в башне Му и Ло, между гранью смерти и последним вздохом, и умирал заново с каждым качком. Когда Мидал перерубила верёвку, время наверстало своё и от принца остался скрюченный скелет.',
    related: ['mu-i-lo', 'ulok', 'midal', 'vremena-koroley'], history: 'epoha-lyudey',
  },
  {
    id: 'gulom', term: 'Гулом', category: 'characters', aliases: ['Король Цепей'],
    definition: 'Король Цепей, один из десяти: между его владениями и землями Фахата стоит Есор, с которого начался путь Всадников.',
    related: ['esor', 'fahat', 'vremena-koroley'], history: 'epoha-lyudey',
  },


  // ——— Время Королей: земли ———
  {
    id: 'nicheynye-zemli', term: 'Ничейные земли', category: 'places', aliases: [],
    definition: 'Область, образовавшаяся от земель Фахата между десятью королевствами: настолько сожжённая насилием и пропитанная кровью, что там больше ничего не растёт. Там нет никого, кроме старых бастионов, — и там же, в долине с высохшим деревом, стояло логово Всадников. Позже «Золотой Симург» провёл сюда хорезы, и на холмах снова поднялись трава и кусты с инжиром.',
    related: ['vremena-koroley', 'logovo-vsadnikov', 'bratstvo-simurga', 'horezy', 'fahat'], history: 'epoha-lyudey',
  },
  {
    id: 'logovo-vsadnikov', term: 'Логово Всадников', category: 'places', aliases: [],
    definition: 'Крепость в скале в долине ничейных земель, которую никто не смог бы найти при всём желании: вход из сальбария расходится рябью, как вода, и от него у бороса ноют зубы. Внутри костёр, тандыр, топчаны и продырявленный кинжалами потолок, а одна комната пустует уже столько лет, что Ману заглядывает в неё первой. В последний свой приход Всадники сожгли логово вместе с вещами Эктора.',
    related: ['vsadniki-shamasa', 'nicheynye-zemli', 'pochtovoe-derevo', 'salbariy', 'manu', 'ektor'], history: 'epoha-lyudey',
  },
  {
    id: 'pochtovoe-derevo', term: 'Почтовое дерево', category: 'places', aliases: ['Дерево заказов'],
    definition: 'Высохшее дерево у входа в долину Всадников, смотрящее ветвями в небеса. На нём висят сотни, если не тысячи узлов с заказами; королевские сплетены из изумрудного шёлка, и каждый из десяти королевств знает кару за то, чтобы тронуть чужой узел. Однажды к одному из посланий приплели второе, с золотой нитью, — так «Золотой Симург» позвал Всадников, не спросив их. Эктор, уходя, выдул на дерево тень, и узлы начали гнить.',
    related: ['logovo-vsadnikov', 'bratstvo-simurga', 'izumrudnyy-shelk', 'ektor', 'vsadniki-shamasa'], history: 'epoha-lyudey',
  },
  {
    id: 'esor', term: 'Есор', category: 'places', aliases: [],
    definition: 'Город между королевствами Фахата и Гулума, с которого в год Красного варана начался путь Всадников. За последние десять лет пал четырежды, меняя хозяина. Об осаде, в которую они пришли за камнем жизни, помнят лишь две вещи: как Нармандах одним ударом убил пылающего зверя и как правитель Итон сбежал из города.',
    related: ['iton', 'fahat', 'gulom', 'narmandah', 'god-krasnogo-varana'], history: 'epoha-lyudey',
  },
  {
    id: 'parkas', term: 'Паркас', category: 'places', aliases: ['Город крови'],
    definition: 'Город Тусуса, а севернее от него — болота, где жила кровавая гидра. Вокруг разбросаны посёлки, верные королю, и в каждом боятся оказаться следующим: людей с правильной кровью увозят на прокорм зверю.',
    related: ['tusus', 'krovavaya-gidra'], history: 'epoha-lyudey',
  },
  {
    id: 'ulok', term: 'Улок', category: 'places', aliases: ['Город времени'],
    definition: 'Город в царстве Му и Ло, где время относительно: в проулке и на торговой площади оно идёт по-разному, а полчаса могут повториться трижды подряд, и люди в них повторяют каждое движение. Пузыри времени разрывают только чёрные наручи смотрящих. В центре стоят две сплетённые, как змеи, башни, а на их стыке зрели дети времени.',
    related: ['mu-i-lo', 'deti-vremeni', 'vsadniki-shamasa'], history: 'epoha-lyudey',
  },
  {
    id: 'likot', term: 'Ликот', category: 'places', aliases: [],
    definition: 'Городок, выкошенный хворью: скот умер в первый день, дети плакали во второй, женщины несли чушь в третий, а вода в реке отдавала кровью и запахом болот гидры. Сюда с севера пришёл кто-то из Паркаса, сюда же возвращалась Сабара, и здесь Нармандах, ломая флейту Куджина, звуковой волной разорвал жителям барабанные перепонки.',
    related: ['sabara', 'kudzhin', 'tusus', 'narmandah'], history: 'epoha-lyudey',
  },
  {
    id: 'stalnoy-bastion', term: 'Стальной бастион', category: 'places', aliases: ['Железный бастион'],
    definition: 'Твердыня Фахата, где празднуют величайшие владыки и где всё построено из железа — слишком мягкого, на вкус эхор’нура. Подарки из сальбария здесь принимали как насмешку над Королём стали: сам он работать с этим металлом не мог. В ночь, когда убили его ведьму, стены комнат начали сужаться, а как Всадники выбрались — никто так и не узнал.',
    related: ['fahat', 'yath-u', 'salbariy', 'bratstvo-simurga'], history: 'epoha-lyudey',
  },
  {
    id: 'idzhar', term: 'Иджар', category: 'places', aliases: [],
    definition: 'Место, где Ветамон, Эктор и Тусус — короли, готовые убить друг друга, — заключили сделку и виделись с Драгмиром.',
    related: ['vetamon', 'ektor', 'tusus', 'dragmir'], history: 'epoha-lyudey',
  },
  {
    id: 'batikus', term: 'Батикус', category: 'places', aliases: [],
    definition: 'Селение, которое Эдр’а помнит как последнее до колбы: там она зажигала огни и развлекала детей, и там жили люди, а не мор’хоры. Ни в одной из спиралей о таком месте не слышали, и спутники сочли рассказ такой же выдумкой, как её координаты для круга телепортации.',
    related: ['edra', 'spirali'], history: 'epoha-lyudey',
  },
  {
    id: 'shpil-zur', term: 'Шпиль Зур', category: 'places', aliases: ['Великий Вулкан'],
    definition: 'Самый большой спящий вулкан континента, в углях которого спал Мардук: тронный зал внутри — нелепо огромная пародия на человеческий, а верные тоннели узнают по дыханию дракона. Ману попросился спрятаться именно здесь: никто не знает, где спал дракон, а сокровища драконы хранят лучше всех.',
    related: ['marduk', 'manu', 'vsadniki-shamasa'], history: 'epoha-lyudey',
  },
  {
    id: 'spiral-stradaniy', term: 'Спираль Страданий', category: 'places', aliases: [],
    definition: 'Один из подземных городов, построенных мор’хорами, и один из главных советов их вида. Отсюда происходит Эмефеюс, левое крыло «Золотого Симурга», — и оттого Ятх’У не понимал, зачем такой мор’хор ввязался в игру людей. Отсюда же Ветамон похитил сущность, которую Всадники вернули под именем золотого тельца.',
    related: ['spirali', 'morhory', 'emefeyus', 'edra', 'vetamon'], history: 'epoha-lyudey',
  },
  {
    id: 'fulum', term: 'Фулум', category: 'places', aliases: ['Башни эхор’нуров'],
    definition: 'Башни народа эхор’нуров, где нити звенят вместо речи, а десять советников Верховного совета ведут разговор натянутыми струнами сальбария. Люди строили свои башни в подражание им — дешёвой имитацией, по слову Ятх’У. Здесь судили его за вмешательство в судьбу смертных, отсюда он ушёл первым за всю их историю, и через пятьдесят лет, как обещал Ока, Башен не стало.',
    related: ['ehornury', 'yath-u', 'oka', 'salbariy', 'niti-sudby'], history: 'epoha-lyudey',
  },

  // ——— Народы и звери ———
  {
    id: 'elorcy', term: 'Элорцы', category: 'beings', aliases: [],
    definition: 'Народ Вар’Элора, чьи фиолетовые глаза светятся в темноте, а сила — вуаль: они уходят в тень, режут кинжалом само пространство и заживляют лишь собственные раны. Их осталось мало: дети рождаются за вуалью, и если последний ребёнок не выйдет оттуда, народа не станет. Люди забыли, кто они такие, хотя элорцы остались за вуалью, чтобы смертные могли спастись. Слышат друг друга на расстоянии, а высшее звание у них — архиепископ.',
    related: ['var-elor', 'vual', 'sadal', 'midal', 'zumrat', 'um', 'zavlon'], history: 'epoha-lyudey',
  },
  {
    id: 'leviofany', term: 'Левиофаны', category: 'beings', aliases: ['Древние'],
    definition: 'Древние существа, каких не увидишь и в самом страшном сне; при их появлении на поле битвы у смертных сжимается желудок. Они не участвуют в играх королей — и всё же Цам стояла в палатке «Золотого Симурга», а её брат Агранор спал на дне, пока Лабиринт не вытянул его на поверхность.',
    related: ['tsam', 'agranor', 'labirint', 'bratstvo-simurga'], history: 'epoha-lyudey',
  },
  {
    id: 'krovavaya-gidra', term: 'Кровавая гидра', category: 'beings', aliases: ['Гидра Тусуса'],
    definition: 'Восьмиглавый зверь болот у Паркаса, который врывается на поле боя и перевешивает весы. Тусус кормил её двадцатью пятью людьми в неделю и держал с ней союз; её страх — голод. Спит ночью, когда Ману убаюкивает болота, но одна голова с выдавленным глазом не спит вовсе — глаз ей выдавил Эктор, испугав огнём. Всадники сняли все восемь глав в одну ночь.',
    related: ['tusus', 'parkas', 'ektor', 'manu', 'vsadniki-shamasa'], history: 'epoha-lyudey',
  },
  {
    id: 'deti-vremeni', term: 'Дети времени', category: 'beings', aliases: ['Десятеро из Улока'],
    definition: 'Десять существ, выведенных королями Му и Ло на стыке двух башен: они стояли светящимися статуями в колбах, которые носили туда мор’хоры. Говорят, будто они сопротивляются нитям, но на деле живут в них, как в коконах, — их нити словно разорваны и привязаны обратно. Мелозар назвал их символом рабства человечества и послал Всадников оборвать эти нити.',
    related: ['mu-i-lo', 'ulok', 'mel-ozar', 'niti-sudby', 'morhory'], history: 'epoha-lyudey',
  },

  // ——— Вещи ———
  {
    id: 'salbariy', term: 'Сальбарий', category: 'practices', aliases: [],
    definition: 'Живой металл эхор’нуров: течёт с подбородка Ятх’У нитью-лезвием, растекается щитом и куполом, идёт мелкой взвесью, чтобы разыскать пустоту под песком, и передаёт тому, кто его читает, всё, что видел. Из него делают клинки, шлемы, иглы и оковы; в теле бороса из него зубы и шипы, а в глазнице Саргона — камень, хранящий предсмертный лик. Люди работать с ним не умеют, и подарок из сальбария Королю стали был насмешкой.',
    related: ['ehornury', 'yath-u', 'fulum', 'sargon', 'narmandah'], history: 'epoha-lyudey',
  },
  {
    id: 'kamen-zhizni', term: 'Камень жизни', category: 'practices', aliases: ['Зелёный камень'],
    definition: 'Распространённый источник энергии: зелёные камни светят в светильниках, питают механизмы и иногда их выращивают прямо в живых существах, а потом достают из-под кожи. Обычно они мелкие — тот, что Всадники вырезали из-под ребра правителя Есора, был во всю ладонь. В замке Ветамона такими камнями заполнен целый зал, а в самом большом из них плавал сам король.',
    related: ['iton', 'esor', 'vetamon', 'edra'], history: 'epoha-lyudey',
  },
  {
    id: 'kub-vrat', term: 'Куб врат', category: 'practices', aliases: [],
    definition: 'Подарок Пюра, доставшийся Ятх’У на Великой Охоте: маленький куб, парящий над ладонью, внутри которого — пространство, похожее на темницу. У него пять граней, хотя сделано их было три; в третьей время не идёт, а первая однажды оторвала руку. Ятх’У предлагал спрятать в нём детей времени вместо того, чтобы убивать, а по слову Ока оставил куб на сохранение самому Пюру.',
    related: ['yath-u', 'pyur', 'oka', 'deti-vremeni'], history: 'epoha-lyudey',
  },
  {
    id: 'lazerus', term: 'Лазерус', category: 'practices', aliases: ['Клинок предателя'],
    definition: 'Недлинный меч, скованный из лучшего, что есть, в подвале маленького городка на краю империи — там, где собрались те, кто решил повергнуть Царя Царей. Имя ему дала женщина с фиолетовым свечением под капюшоном: она коснулась лезвия пальцем, и оно обросло фиолетовым кристаллом. Пусть служит всегда тем, кто хочет опереться, — и да найдёт его достойный.',
    related: ['mel-ozar', 'sargon', 'emefeyus', 'edra'], history: 'epoha-lyudey',
  },
  {
    id: 'iskry-titana', term: 'Искры титана', category: 'practices', aliases: [],
    definition: 'Шар, в котором летают маленькие искры: по слову Коллекционера, он способен разбить что угодно. Принесён Всадникам, чтобы вскрыть бастион Драгмира.',
    related: ['kollektsioner', 'dragmir', 'voyna-koroley'], history: 'epoha-lyudey',
  },
  {
    id: 'maski-korolev', term: 'Маски королей', category: 'practices', aliases: [],
    definition: 'Маски, из которых их носитель черпает силу. Тусус ходил в золотой маске, скрывая лик, и держал на поясе ещё четыре; Нармандах отобрал у него несколько. Вернувшись из юрты, Мелозар нёс на ремне четыре маски, а в день падения бастиона их было уже десять — и они слились в одну, которую он надел, когда его собственная нить судьбы оборвалась.',
    related: ['tusus', 'mel-ozar', 'narmandah', 'niti-sudby'], history: 'epoha-lyudey',
  },
  {
    id: 'krasnaya-kost', term: 'Красная кость', category: 'practices', aliases: ['Клеймо Улы'],
    definition: 'Игральная кость красного-красного цвета, которую Ула дала Нармандаху на берегу Ветамона: она горяча, как раскалённый уголь, и каждый смертный узнаёт в ней клеймо мстительного солнца. Ставкой в игре была слава бороса: останется до конца — выиграл он, погаснет — заберёт всё она. Позже Нармандах отдал кость Цам как знак, что своего он добьётся.',
    related: ['ula', 'narmandah', 'tsam', 'vetamon'], history: 'epoha-lyudey',
  },
  {
    id: 'koren-chumy', term: 'Корень чумы', category: 'practices', aliases: [],
    definition: 'Курево, которое медленно пробирается в тело и парализует. Его жгли на болотах у Паркаса, пока двадцать пять человек танцевали у костра в ожидании гидры.',
    related: ['krovavaya-gidra', 'parkas', 'narmandah'], history: 'epoha-lyudey',
  },

  // ——— События ———
  {
    id: 'god-krasnogo-varana', term: 'Год Красного варана', category: 'history', aliases: [],
    definition: 'Год, в который начался путь Всадников: в Есоре, городе между владениями Фахата и Гулума, и в тот же год — путь Царя Царей. Никто не знает, что было тогда на самом деле: сошлись ли пятеро с «Золотым Симургом» в схватке, встретились ли на вершине холма или у подножья, на рассвете или ночью.',
    related: ['esor', 'vsadniki-shamasa', 'bratstvo-simurga', 'mel-ozar'], history: 'epoha-lyudey',
  },
  {
    id: 'boishche-u-reki-kiras', term: 'Побоище у реки Кирас', category: 'history', aliases: [],
    definition: 'Сражение, в котором люди видели кровавую гидру в бою. Всадники искали его выживших, чтобы узнать о звере хоть что-то, — и нашли лишь калек, безумцев и старого солдата, помнившего Эктора.',
    related: ['krovavaya-gidra', 'ektor', 'vsadniki-shamasa'], history: 'epoha-lyudey',
  },
  {
    id: 'ohota-dvuh-bratev', term: 'Охота двух братьев', category: 'history', aliases: ['Ночь гибели Охурозара'],
    definition: 'Самая тихая ночь в ничейных землях, когда Ману побоялся взойти. На лагерь «Золотого Симурга» напали пять теней из вуали, искавших Мелозара, а Драгмир вышел на Охурозара сам. Владыка ранил бога — и погиб, когда его меч разбился о браслеты. Договор не давал Саргону сдвинуться с места; в ту ночь и дала трещину основа, на которой держался орден.',
    related: ['ohurozar', 'dragmir', 'bratstvo-simurga', 'sargon', 'ahriman', 'mel-ozar'], history: 'epoha-lyudey',
  },
  {
    id: 'voyna-koroley', term: 'Война Королей', category: 'history', aliases: ['Битва у бастиона'],
    definition: 'Последняя битва Царя Царей: Мардук выжег бастион синим пламенем, а внутри его ждали Драгмир, архиепископ Ум, Тусус и Эктор. Погибли все четверо, Мидал ушла за вуаль вместо брата, а Зумрат нарушил договор и окаменел. Кровь Эквинтуса, вставшего между войсками, начала эту битву; ею же кончились Времена Королей.',
    related: ['mel-ozar', 'marduk', 'dragmir', 'um', 'tusus', 'ektor', 'ekvintus', 'vsadniki-shamasa'], history: 'epoha-lyudey',
  },
  {
    id: 'koronatsiya-tsarya-tsarey', term: 'Коронация Царя Царей', category: 'history', aliases: [],
    definition: 'День, когда в самом большом городе Эноа корона легла на голову Мелозара и рядами преклонились тысячи: человечество обрело свободу от судьбы. В тёмных переулках и среди приближённых стояли те, кто не был уверен в своих поступках. Накануне Царь Царей предложил Саргону казнить своего бога.',
    related: ['mel-ozar', 'dragmir', 'sargon', 'voyna-koroley'], history: 'epoha-lyudey',
  },
  {
    id: 'vechnoe-solntsestoyanie', term: 'Вечное солнцестояние', category: 'history', aliases: [],
    definition: 'Шамас увидел, что стало с человечеством, и позвал брата и сестру выжечь всё, что движется. Так наступило вечное солнцестояние — в те же дни, когда мир раскололся, а Ману прятался у Мардука.',
    related: ['shamas', 'ula', 'azrak', 'raskol', 'manu'], history: 'epoha-lyudey',
  },

  // ——— Понятия ———
  {
    id: 'holodnaya-yarost', term: 'Холодная ярость', category: 'culture', aliases: [],
    definition: 'Состояние, в которое драгмирец входит, очистив разум: сердцебиение замедляется, чтобы не терять кровь из глубоких ран, тело перестаёт чувствоваться, остаются лишь расчётливые удары. В нём Саргон не различает друга и врага и опаснее любого существа; чтобы войти в него, он надрезал мышцы под браслетами матери.',
    related: ['sargon', 'dragmirtsy', 'braslet-materi', 'tanets-stali'], history: 'epoha-lyudey',
  },

]

// ——— Сведение источников ———
//
// Глоссарий один. Свод Башни Мафраш и свод кампании «Огни» — два Источника
// Нити внутри него: сущность, известная обоим, остаётся одной статьёй и просто
// показывает оба свидетельства. Совпадение ищется по названию и синонимам.

export const LORE_GLOSSARY_SEASONS = LORE_OGNI_SEASONS

// Ключ сведения: «Мор’хоры» и «морхор» — одна сущность, и она должна остаться
// одной статьёй. Поэтому сравниваются не строки, а основы: у слова длиннее трёх
// букв отбрасывается конечная изменяемая буква, у множественного числа — ещё и
// «ы/и/а». Список закрытый: свободное усечение начинает склеивать чужое.
const PLURAL_TAIL = /(?:ами|ями|ов|ев|ей|ах|ях|ы|и|а|я)$/

function stemWord(word) {
  if (word.length <= 3) return word
  let base = word.replace(PLURAL_TAIL, '')
  if (base.length < 3) base = word
  if (base.length > 3 && 'ьйоуэе'.includes(base[base.length - 1])) base = base.slice(0, -1)
  return base
}

export const loreMatchKey = value => String(value || '')
  .toLocaleLowerCase('ru-RU')
  .replace(/ё/g, 'е')
  .replace(/[’'`«»]/g, '')
  .replace(/[^\p{L}\p{N}]+/gu, ' ')
  .trim()
  .split(' ')
  .filter(Boolean)
  .map(stemWord)
  .join(' ')

function ogniPayload(entry) {
  return {
    season: entry.seasons[0]?.season || 1,
    seasons: entry.seasons,
    chapters: entry.chapters,
    firstChapter: entry.firstChapter,
    lastChapter: entry.lastChapter,
    summary: entry.summary,
    summaryEarly: entry.summaryEarly,
    summaryByChapter: entry.summaryByChapter,
    claims: entry.claims,
    facets: entry.facets,
    relations: entry.relations,
    mentions: entry.mentions,
    profile: entry.profile,
    hero: entry.hero,
    section: entry.section,
    siteSection: entry.siteSection,
    stub: entry.stub,
  }
}

// Две записи кампании об одной сущности («морхор» и «мор’хоры») складываются,
// а не вытесняют друг друга.
function mergeOgni(a, b) {
  const facets = b.facets.reduce((acc, facet) => {
    const existing = acc.find(item => item.id === facet.id)
    if (existing) existing.items = [...existing.items, ...facet.items]
    else acc.push({ ...facet })
    return acc
  }, a.facets.map(facet => ({ ...facet, items: [...facet.items] })))

  const chapters = [...new Set([...a.chapters, ...b.chapters])].sort((x, y) => x - y)
  const relations = [...a.relations]
  for (const relation of b.relations) {
    if (!relations.some(item => item.id === relation.id)) relations.push(relation)
  }

  return {
    ...a,
    facets,
    chapters,
    relations,
    claims: [...a.claims, ...b.claims],
    mentions: [...new Set([...a.mentions, ...b.mentions])].sort((x, y) => x - y),
    summaryByChapter: [...a.summaryByChapter, ...b.summaryByChapter].sort((x, y) => x.chapter - y.chapter),
    profile: { ...b.profile, ...a.profile },
    hero: a.hero || b.hero,
    stub: a.stub && b.stub,
    summary: a.summary || b.summary,
    summaryEarly: a.summaryEarly || b.summaryEarly,
    firstChapter: chapters[0] ?? null,
    lastChapter: chapters[chapters.length - 1] ?? null,
  }
}

// Транслитерация для статей, приходящих из досье: слаг должен быть таким же,
// как у остального свода, иначе адреса разъедутся по стилю.
const TRANSLIT = {
  а: 'a', б: 'b', в: 'v', г: 'g', д: 'd', е: 'e', ё: 'e', ж: 'zh', з: 'z',
  и: 'i', й: 'y', к: 'k', л: 'l', м: 'm', н: 'n', о: 'o', п: 'p', р: 'r',
  с: 's', т: 't', у: 'u', ф: 'f', х: 'h', ц: 'ts', ч: 'ch', ш: 'sh',
  щ: 'shch', ъ: '', ы: 'y', ь: '', э: 'e', ю: 'yu', я: 'ya',
}

export function loreSlug(name) {
  const text = String(name || '').toLocaleLowerCase('ru-RU')
  let out = ''
  for (const char of text) {
    if (TRANSLIT[char] !== undefined) out += TRANSLIT[char]
    else if (/[a-z0-9]/.test(char)) out += char
    else out += ' '
  }
  return out.trim().replace(/\s+/g, '-').replace(/-{2,}/g, '-').replace(/^-|-$/g, '')
}

// Имена из стенограмм приходят как попало: «золотые шахты Гизана», «морхор».
// Для заголовка статьи поднимаем первую букву, остальное не трогаем — внутри
// названия регистр осмысленный: «знак Проклятых щитов».
export function loreDisplayTerm(term) {
  const value = String(term || '')
  return value ? value[0].toLocaleUpperCase('ru-RU') + value.slice(1) : value
}

const EXTRA_ALIASES = {
  graar: ['Грар', 'Ведающий сон'],
  'ay-anga': ['Ай’янга', 'Ай’янга Шторм'],
  marakiets: ['Маракийцы'],
  // «Лунгуры наблюдают» — так здороваются в «Золотом Симурге».
  ulungury: ['Лунгуры'],
  'shelkovye-myshi': ['Изумрудные мыши'],
  'velikiy-agha': ['Акха'],
  // Худдулины ставят его имя на обо, а в песках его зовут иначе.
  akrepa: ['Владыка песков', 'Владыка огня'],
}

function buildGlossary() {
  const merged = LORE_GLOSSARY_ARCHIVE.map(term => ({
    ...term,
    sources: [term.source || LORE_GLOSSARY_DEFAULT_SOURCE],
  }))

  const byKey = new Map()
  for (const term of merged) {
    for (const name of [term.term, ...(term.aliases || [])]) {
      const key = loreMatchKey(name)
      if (key && !byKey.has(key)) byKey.set(key, term)
    }
  }
  const takenIds = new Set(merged.map(term => term.id))
  const homonymKeys = new Set(HOMONYMS.map(loreMatchKey))

  for (const entry of LORE_OGNI_ENTRIES) {
    const names = [entry.term, ...entry.aliases, ...entry.sourceNames]
    // Совпадение имени обычно значит «это та же сущность». Исключение — имена
    // из HOMONYMS: народ боросов назван по имени Бороса, и сводить человека с
    // народом нельзя. Признак разный вид: одно имя, но разные разделы свода.
    const hit = names.map(loreMatchKey).find(key => key && byKey.has(key)
      && !(homonymKeys.has(key) && byKey.get(key).category !== entry.category))
    const payload = ogniPayload(entry)

    if (hit) {
      const target = byKey.get(hit)
      target.ogni = target.ogni ? mergeOgni(target.ogni, payload) : payload
      if (target.ogniId && target.ogniId !== entry.id) {
        target.absorbedOgniIds = [...(target.absorbedOgniIds || []), entry.id]
      }
      target.ogniId = target.ogniId || entry.id
      if (!target.sources.includes(LORE_OGNI_SOURCE.id)) target.sources.push(LORE_OGNI_SOURCE.id)
      for (const alias of [entry.term, ...names.slice(1)]) {
        if (alias !== target.term && !(target.aliases || []).includes(alias)) {
          target.aliases = [...(target.aliases || []), alias]
        }
      }
      continue
    }

    // Статья без толкования и без свидетельств не сообщает ничего, кроме того,
    // что имя где-то прозвучало. Такую не публикуем: если она никуда не влилась,
    // ей просто нечего показать читателю.
    if (entry.stub) continue

    // Статья, которой у Башни Мафраш нет: она известна только по кампании.
    const id = takenIds.has(entry.id) ? `${entry.id}-ogni` : entry.id
    takenIds.add(id)
    const record = {
      id,
      ogniId: entry.id,
      term: entry.term,
      category: entry.category,
      aliases: [...entry.aliases, ...entry.sourceNames],
      definition: entry.summary || `Упоминается в кампании «Огни»${
        entry.chapters.length ? `, главы ${entry.chapters.join(', ')}` : ''
      }. Толкование ещё не внесено в архив.`,
      related: [],
      source: LORE_OGNI_SOURCE.id,
      sources: [LORE_OGNI_SOURCE.id],
      ogni: payload,
    }
    merged.push(record)
    for (const name of [record.term, ...record.aliases]) {
      const key = loreMatchKey(name)
      if (key && !byKey.has(key)) byKey.set(key, record)
    }
  }

  // Досье пантеона и фракций, у которых нет своей статьи, становятся статьями:
  // иначе раздел остаётся островом — термин не найти поиском и не связать
  // ссылкой из текста.
  // Ключ ведёт к набору видов: одно имя может принадлежать и народу, и землям.
  // Счёт идёт по всем записям, а не по byKey: там имя закреплено за первой
  // статьёй, и вторая — та самая, ради которой имя объявлено омонимом, — в
  // подсчёт не попадала. Из-за этого досье заводило третью статью с тем же
  // именем.
  const takenKinds = new Map()
  for (const term of merged) {
    for (const name of [term.term, ...(term.aliases || [])]) {
      const key = loreMatchKey(name)
      if (!key) continue
      if (!takenKinds.has(key)) takenKinds.set(key, new Set())
      takenKinds.get(key).add(term.category)
    }
  }

  for (const dossier of dossierEntries(takenKinds, loreMatchKey)) {
    const id = takenIds.has(loreSlug(dossier.title)) ? `${loreSlug(dossier.title)}-2` : loreSlug(dossier.title)
    if (!id) continue
    takenIds.add(id)
    const record = {
      id,
      term: dossier.title,
      category: dossier.category,
      aliases: dossier.aliases || [],
      definition: dossier.summary,
      related: [],
      source: LORE_GLOSSARY_DEFAULT_SOURCE,
      sources: [LORE_GLOSSARY_DEFAULT_SOURCE],
      // Вид досье знает о сущности больше ключевых слов: народ остаётся
      // народом, даже если в толковании нет слова «народ».
      dossierKind: dossier.kind,
    }
    merged.push(record)
    const key = loreMatchKey(record.term)
    if (key && !byKey.has(key)) byKey.set(key, record)
  }

  // Досье народов и свод пантеона расходятся в написании: у бралльцев Граар —
  // это Грар, Ведающий сон, а обо ставят Ай’янге Шторму. Синоним прописывается
  // здесь, а не в самой статье: часть статей приходит из генерируемого свода
  // кампании, править который руками нельзя, — и досье своих синонимов не
  // знает вовсе.
  for (const [id, aliases] of Object.entries(EXTRA_ALIASES)) {
    const target = merged.find(term => term.id === id)
    if (!target) continue
    target.aliases = [...(target.aliases || []), ...aliases.filter(
      alias => alias !== target.term && !(target.aliases || []).includes(alias),
    )]
  }

  const entries = merged.map(term => normalizeLoreEntity({
    ...term,
    term: loreDisplayTerm(term.term),
  }))

  // Слияние по основе меняет адрес статьи: связь, указывавшая на «морхор»,
  // должна вести в «Мор’хоры». Без переадресации интерфейс молча терял такие
  // связи — их находил только `pnpm lore:check`.
  const redirect = new Map()
  const titleById = new Map()
  for (const term of entries) {
    titleById.set(term.id, term.term)
    if (term.ogniId) redirect.set(term.ogniId, term.id)
    for (const absorbed of term.absorbedOgniIds || []) redirect.set(absorbed, term.id)
  }

  for (const term of entries) {
    if (!term.ogni?.relations?.length) continue
    const seen = new Set()
    const relations = []
    for (const relation of term.ogni.relations) {
      const id = redirect.get(relation.id) || relation.id
      if (id === term.id || seen.has(id) || !titleById.has(id)) continue
      seen.add(id)
      relations.push({ ...relation, id, term: titleById.get(id) })
    }
    term.ogni = { ...term.ogni, relations }
  }

  // Типизированные связи ложатся поверх выведенных: они авторские и говорят,
  // чем именно статьи приходятся друг другу.
  const byId = new Map(entries.map(entry => [entry.id, entry]))
  const links = buildLoreLinks(byId)
  for (const entry of entries) entry.links = links.get(entry.id) || []

  return entries.sort((a, b) => a.term.localeCompare(b.term, 'ru'))
}

export const LORE_GLOSSARY = buildGlossary()

export const LORE_GLOSSARY_BY_ID = Object.fromEntries(LORE_GLOSSARY.map(item => [item.id, item]))
