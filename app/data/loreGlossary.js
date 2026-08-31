import {
  LORE_OGNI_ENTRIES,
  LORE_OGNI_SOURCE,
  LORE_OGNI_SEASONS,
} from './loreOgniGlossary/index.js'

export { cutOgniPayload } from './loreOgniGlossary/index.js'

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
    id: 'iskra', term: 'Искра', category: 'foundations', aliases: ['Сердце Колыбели'],
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
    id: 'kuznya-sudby', term: 'Кузня Судьбы', category: 'foundations', aliases: ['Сердце Колыбели'],
    definition: 'Сердце Колыбели и место, где раскрываются бесконечные переплетения Судьбы. Здесь мор’хоры охраняли Искру, а Ке’эль позднее выпустил Нити Судьбы.',
    related: ['iskra', 'niti-sudby', 'morhory'], history: 'epoha-rassveta',
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
    related: ['dalnie-chertogi', 'krov-elora', 'izir'], history: 'epoha-lyudey',
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
    definition: 'Великая колыбель цивилизации Эпохи Света и место основания Башни Мафраш. Пережила Раскол под защитой башни, исчезла в Последнюю Ночь и позднее вернулась искажённой из Дальних Чертогов.',
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
    id: 'bratstvo-simurga', term: 'Братство Золотого Симурга', category: 'powers', aliases: ['Защитники смертных'],
    definition: 'Братство, основанное Мелом Озаром в год Лазурного Каша как сила, призванная защищать всех смертных.',
    related: ['mel-ozar', 'vremena-koroley', 'astry'], history: 'epoha-lyudey',
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
    definition: 'Период расцвета и последующего падения десяти человеческих королевств, основанных во имя Традиций. Борьба за власть превратила их в мрачные отражения первоначального замысла.',
    related: ['lyudi', 'traditsii', 'mel-ozar'], history: 'epoha-lyudey',
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
    id: 'obyatie', term: 'Объятие', category: 'history', aliases: ['Проклятие Объятия', 'Изир'],
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
    definition: 'Мутная чёрная субстанция, заметная в глазах людей, переживших проклятие Объятия. Служит общей внешней меткой его разнообразных проявлений.',
    related: ['obyatie', 'bezimiannye', 'vual'], history: 'epoha-vosstanovleniya',
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
    id: 'mel-ozar', term: 'Мел Озар', category: 'practices', aliases: ['Король Королей'],
    definition: 'Величайший человеческий король, основатель Братства Золотого Симурга и Империи Ургон. Его одержимость Дальними Чертогами привела к Очищению и Великому Раздору.',
    related: ['vremena-koroley', 'obman', 'ochishchenie'], history: 'epoha-lyudey',
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

// Имена из стенограмм приходят как попало: «золотые шахты Гизана», «морхор».
// Для заголовка статьи поднимаем первую букву, остальное не трогаем — внутри
// названия регистр осмысленный: «знак Проклятых щитов».
export function loreDisplayTerm(term) {
  const value = String(term || '')
  return value ? value[0].toLocaleUpperCase('ru-RU') + value.slice(1) : value
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

  for (const entry of LORE_OGNI_ENTRIES) {
    const names = [entry.term, ...entry.aliases, ...entry.sourceNames]
    const hit = names.map(loreMatchKey).find(key => key && byKey.has(key))
    const payload = ogniPayload(entry)

    if (hit) {
      const target = byKey.get(hit)
      target.ogni = target.ogni ? mergeOgni(target.ogni, payload) : payload
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

  return merged
    .map(term => ({ ...term, term: loreDisplayTerm(term.term) }))
    .sort((a, b) => a.term.localeCompare(b.term, 'ru'))
}

export const LORE_GLOSSARY = buildGlossary()

export const LORE_GLOSSARY_BY_ID = Object.fromEntries(LORE_GLOSSARY.map(item => [item.id, item]))
