// Типизированные связи между статьями.
//
// Выведенные связи (`ogni.relations`) отвечают только «эти двое встречаются
// рядом». Типизированная говорит, чем именно они друг другу приходятся, и это
// нельзя надёжно достать из текста: попытка разобрать утверждения правилами
// дала четыре верных связи из десяти — «отец Ишмал» это сан, а не родство,
// а «не смог защитить сына Изудина» вообще про третьего.
//
// Поэтому связи здесь авторские. Кандидатов подсказывает
// `python scripts/suggest-relations.py`, решение принимает человек.

export const LORE_RELATION_TYPES = [
  { id: 'kin', title: 'Родня', inverse: 'Родня' },
  { id: 'member', title: 'Состоит в', inverse: 'В составе' },
  { id: 'leads', title: 'Возглавляет', inverse: 'Во главе' },
  { id: 'origin', title: 'Родом из', inverse: 'Отсюда родом' },
  { id: 'owner', title: 'Владеет', inverse: 'Принадлежит' },
  { id: 'enemy', title: 'Противник', inverse: 'Противник' },
  { id: 'ally', title: 'Союзник', inverse: 'Союзник' },
  { id: 'located', title: 'Находится в', inverse: 'Здесь находится' },
]

/**
 * Ребро направленное: «Ияр — сын Изудина», а не наоборот. Обратную сторону
 * строит сборщик, подпись берётся из `inverse` ребра или из типа.
 *
 * Основание каждой связи — в поле `why`: через год никто не вспомнит, откуда
 * она взялась, а свод живёт годами.
 */
export const LORE_RELATIONS = [
  // Родство — из прямых утверждений кампании.
  { from: 'iyar', to: 'izudin', type: 'kin', label: 'сын', inverse: 'отец', why: 'гл. 4: «Иярдар, сын Изудина, властителя Солнечных Холмов»' },
  { from: 'iyardar', to: 'izudin', type: 'kin', label: 'сын', inverse: 'отец', why: 'гл. 26: «изначальный и единственный сын Изудина»' },
  { from: 'zavlon', to: 'elor', type: 'kin', label: 'четвёртый сын', inverse: 'отец', why: 'гл. 14: «Четвёртый сын Элора и архиепископ»' },
  { from: 'raran', to: 'narar', type: 'kin', label: 'сестра', why: 'толкование: «Южный ветер; сестра Нарара»' },

  // Членство.
  { from: 'abram', to: 'migdashskaya-yacheyka-belyh-sokolov', type: 'member', label: 'участник', inverse: 'участник', why: 'гл. 13: «местная ячейка Белых Соколов, к которой принадлежит Абрам»' },


  // Дом Ра: родство названо прямо в своде.
  { from: 'tsam', to: 'agranor', type: 'kin', label: 'сестра', inverse: 'брат', why: 'Дом Ра: «Цам Дева Смерти и Агранор Бессмертный — сестра и брат»' },
  { from: 'tsam', to: 'ul', type: 'kin', label: 'дочь', inverse: 'отец', why: 'Дом Ра: их родители — Величайший и Жестокий Глады' },
  { from: 'tsam', to: 'yul', type: 'kin', label: 'дочь', inverse: 'мать', why: 'Дом Ра: их родители — Величайший и Жестокий Глады' },
  { from: 'agranor', to: 'ul', type: 'kin', label: 'сын', inverse: 'отец', why: 'Дом Ра: их родители — Величайший и Жестокий Глады' },
  { from: 'agranor', to: 'yul', type: 'kin', label: 'сын', inverse: 'мать', why: 'Дом Ра: их родители — Величайший и Жестокий Глады' },
  { from: 'issidor', to: 'verhovnyy-belyy-otets', type: 'member', label: 'носит сан', inverse: 'сан носит', why: 'Структура Ордена: «Иссидор — Верховный Белый Отец во времена Тёмной Нити»' },
  { from: 'krushtervor', to: 'sindikat-chernogo-falanga', type: 'member', label: 'Указательный Палец Севера', inverse: 'Указательный Палец Севера', why: 'Пальцы Северной Руки' },
  { from: 'ravana', to: 'sindikat-chernogo-falanga', type: 'member', label: 'Указательный Палец Юга', inverse: 'Указательный Палец Юга', why: 'Пальцы Южной Руки' },
  { from: 'mogoy', to: 'sindikat-chernogo-falanga', type: 'member', label: 'Средний Палец Юга', inverse: 'Средний Палец Юга', why: 'Пальцы Южной Руки' },
  { from: 'ashira', to: 'sapiri', type: 'leads', label: 'возглавляет', why: 'Ковени: «Сапири возглавляет Ашира»' },
  { from: 'zadzhar', to: 'giyator', type: 'located', label: 'властвует в', inverse: 'создан ненавистью', why: 'Гият: город Гиятор — проявление ненависти Заджара' },


  // Гарганты: основатели названы прямо в своде.
  { from: 'eya', to: 'garganty', type: 'leads', label: 'основатель', inverse: 'основан', why: 'Ковени: «Эя, От и Ар являются основателями этого ордена»' },
  { from: 'ot', to: 'garganty', type: 'leads', label: 'основатель', inverse: 'основан', why: 'Ковени: «Эя, От и Ар являются основателями этого ордена»' },
  { from: 'ar', to: 'garganty', type: 'leads', label: 'основатель', inverse: 'основан', why: 'Ковени: «Эя, От и Ар являются основателями этого ордена»' },


  // Летопись: прямые указания «Нити Башни Мафраш».
  { from: 'irmesh', to: 'mel-ozar', type: 'enemy', label: 'сразил', inverse: 'сражён', why: 'Герой Раскола: «И пал Король Королей, пронзённый клинком Ирмеша»' },
  { from: 'haar', to: 'aagra', type: 'leads', label: 'основал', inverse: 'основан', why: 'Два Великих Змея: «Они построили город А’агра под мудрым руководством старого змея»' },
  { from: 'marduk', to: 'maraq', type: 'leads', label: 'захватил', inverse: 'захвачен', why: 'Два Великих Змея: «Мардук захватил Маракийский Султанат»' },
  { from: 'haar', to: 'marduk', type: 'enemy', label: 'сородич и противник', why: 'Два Великих Змея: Мардук не был согласен с деяниями своего сородича' },
  { from: 'urdreg', to: 'vysokii-krug', type: 'member', label: 'основатель', inverse: 'основатель', why: 'Закон Небес: перечень основателей Высокого Круга' },
  { from: 'elish-kanitar', to: 'vysokii-krug', type: 'member', label: 'основатель', inverse: 'основатель', why: 'Закон Небес: перечень основателей Высокого Круга' },
  { from: 'maland-brotor', to: 'vysokii-krug', type: 'member', label: 'основатель', inverse: 'основатель', why: 'Закон Небес: перечень основателей Высокого Круга' },
  { from: 'grono', to: 'vysokii-krug', type: 'member', label: 'Торговый Принц', inverse: 'Торговый Принц', why: 'Высокий Круг во Время Ветров' },
  { from: 'kuyul', to: 'vysokii-krug', type: 'member', label: 'Великий Агха', inverse: 'Великий Агха', why: 'Высокий Круг во Время Ветров' },
  { from: 'seryy-sultan', to: 'maraq', type: 'leads', label: 'правит', inverse: 'под властью', why: 'Путь Марака: «Теперь Серый Султан правит выжженными землями Марака»' },
  { from: 'miz-krovavyy', to: 'voyna-yarostnoy-zmei', type: 'member', label: 'участник', inverse: 'участник', why: 'Война Яростной Змеи' },
  { from: 'ke-el', to: 'mirin-az', type: 'located', label: 'обитает в', inverse: 'обитель', why: 'Улунгуры: Ке’эль создал карманное измерение Мирин’аз' },


  // Народы: происхождение и родство названы в досье прямо.
  { from: 'boros', to: 'nochnaya-kolesnitsa', type: 'kin', label: 'первенец', inverse: 'родитель', why: 'Боросы: «Борос был самым сильным из всех аджаидов, первенцем Ночной Колесницы»' },
  { from: 'boros', to: 'adzhaidy', type: 'origin', label: 'из народа', inverse: 'отсюда родом', why: 'Боросы: «самый сильный из всех аджаидов»' },
  { from: 'boros', to: 'dvenadtsat-klanov', type: 'kin', label: 'предок', inverse: 'потомки', why: 'Боросы: «Борос и его спутники стали предками 12 кланов ящериц»' },
  { from: 'borosy', to: 'dvenadtsat-klanov', type: 'member', label: 'делится на', inverse: 'часть народа', why: 'Боросы: двенадцать изначальных кланов ящериц' },
  { from: 'sapaki', to: 'borosy', type: 'member', label: 'избранные', inverse: 'избирает', why: 'Сапаки: «из новорожденных выбирают избранных… пережившие инициацию становятся сапаками»' },
  { from: 'danguntsy', to: 'dangun', type: 'origin', label: 'народ', inverse: 'родина', why: 'Люди: «Дангун — королевство башен и гор»; дангунцы описаны как его народ' },
  { from: 'brallcy', to: 'brall', type: 'origin', label: 'народ', inverse: 'родина', why: 'Люди: «Бралльцы — потомки первых поселенцев земель Ханида»' },
  { from: 'adaady', to: 'hurhon', type: 'origin', label: 'осели в', inverse: 'приютил', why: 'Адаады: «люди, которые поселились в бескрайних степях Хурхона»' },
  { from: 'erh', to: 'hudduliny', type: 'member', label: 'ветвь народа', inverse: 'ветвь', why: 'Худдулины: солнечные, лунные и ветреные худдулины' },
  { from: 'sar', to: 'hudduliny', type: 'member', label: 'ветвь народа', inverse: 'ветвь', why: 'Худдулины: солнечные, лунные и ветреные худдулины' },
  { from: 'omor', to: 'hudduliny', type: 'member', label: 'ветвь народа', inverse: 'ветвь', why: 'Худдулины: солнечные, лунные и ветреные худдулины' },
  { from: 'solnechnye-vsadniki', to: 'hudduliny', type: 'member', label: 'род', inverse: 'род', why: 'Клан и род: «Дээл Солнечных Всадников — грязно-красный с эмблемой узла огня»' },
  { from: 'shkury-yashcherits', to: 'hudduliny', type: 'member', label: 'род', inverse: 'род', why: 'Клан и род: «Дээл у Шкур Ящериц — длинный и жёлтый, с вышитым узлом клыка»' },
  { from: 'pepelnye-marakiytsy', to: 'marakiets', type: 'member', label: 'ветвь народа', inverse: 'ветвь', why: 'Маракийцы: пепельные и янтарные маракийцы' },
  { from: 'yantarnye-marakiytsy', to: 'marakiets', type: 'member', label: 'ветвь народа', inverse: 'ветвь', why: 'Маракийцы: пепельные и янтарные маракийцы' },
  { from: 'marakiets', to: 'dragmir', type: 'kin', label: 'потомки', inverse: 'предок', why: 'Базальтовая комплекция: «Они называют себя потомками Драгмира, Царя Великанов»' },
  { from: 'udrishi', to: 'urma', type: 'kin', label: 'дети', inverse: 'создатель', why: 'Любознательные и изобретательные: «Дети Урма и Эрил»' },
  { from: 'udrishi', to: 'eril', type: 'kin', label: 'дети', inverse: 'создатель', why: 'Любознательные и изобретательные: «Дети Урма и Эрил»' },
  { from: 'deti-edry', to: 'edra', type: 'kin', label: 'создания', inverse: 'создатель', why: 'Дети Эдры: «искусственные создания Эдры»' },
  { from: 'morhory', to: 'purush', type: 'kin', label: 'создания', inverse: 'создатель', why: 'Провинившийся Страж: «создатель мор’хоров Пуруш»' },

  // Власть и место.
  { from: 'velikiy-agha', to: 'hudduliny', type: 'leads', label: 'правит', inverse: 'во главе', why: 'Адаады: восстание северных худдулинов против Великого Агхи' },
  { from: 'velikiy-agha', to: 'zolotaya-yurta', type: 'located', label: 'сидит в', inverse: 'ставка', why: 'Адаады: «возвышение одного из адаадов в золотую юрту»' },
  { from: 'karabalgun', to: 'velikiy-agha', type: 'kin', label: 'приёмный сын', inverse: 'приёмный отец', why: 'Адаады: «Карабалгун — адаад, ставший приемным сыном Великого Агхи»' },
  { from: 'karabalgun', to: 'adaady', type: 'origin', label: 'из народа', inverse: 'отсюда родом', why: 'Адаады: «Карабалгун — адаад»' },
  { from: 'stepnoy-tigr', to: 'adaady', type: 'leads', label: 'во главе племён', inverse: 'во главе', why: 'Адаады: «Степные тигры стоят во главе племён»' },
  { from: 'vizir', to: 'seryy-sultan', type: 'member', label: 'следует по положению', inverse: 'над визирями', why: 'Раскаленное железо: «Правит маракийцами Серый Султан, за ним по положению следуют 7 визирей»' },
  { from: 'seryy-sultan', to: 'maraq', type: 'leads', label: 'правит', inverse: 'во главе', why: 'Раскаленное железо: «Правит маракийцами Серый Султан»' },
  { from: 'seryy-sultan', to: 'marduk', type: 'enemy', label: 'убил', inverse: 'убит', why: 'Ненависть Драконоподобных: «Убийство Темного Вирма Серым Султаном»; Тёмный Вирм — это Мардук' },
  { from: 'marduk', to: 'maraq', type: 'leads', label: 'правил', inverse: 'под властью', why: 'Ха’ар и Мардук: «Мардук подчинил Маракийский Султанат»' },
  { from: 'danguntsy', to: 'mel-ozar', type: 'kin', label: 'кровь Мел', inverse: 'от него кровь', why: 'Удача и индиго: «В дангунцах течёт знатная кровь Мел», восходящая к Королю Королей' },
  { from: 'merang', to: 'pepelnye-marakiytsy', type: 'located', label: 'город-государство', inverse: 'столица', why: 'Пепельные маракийцы: «Город-государство пепельных маракийцев — Меранг»' },
  { from: 'a-za-al', to: 'pepelnye-marakiytsy', type: 'origin', label: 'из ветви', inverse: 'отсюда родом', why: 'Пепельные маракийцы: «Сам генерал А’за’ал был потомком пепельных маракийцев»' },
  { from: 'ern', to: 'brall', type: 'located', label: 'столица', inverse: 'столица', why: 'Бралльцы: «Бралл со своей столицей Эрн»' },
  { from: 'brazan', to: 'spirali', type: 'member', label: 'последняя из', inverse: 'последняя', why: 'Потерянные: «Последняя спираль мор’хоров — Бразан»' },
  { from: 'hram-eril-i-urmy', to: 'velikaya-igra', type: 'located', label: 'место игры', inverse: 'проходит в', why: 'Игра: «Каждые 150 лунных лет в храме Эрил и Урмы… проходит Великая Игра»' },

  // Веры и ордены.
  { from: 'belaya-vera', to: 'narekateli', type: 'member', label: 'вера ордена', inverse: 'орден веры', why: 'Бралльцы: Белая Вера и Нарекатели названы одним учением Белого Пророка' },
  { from: 'graar', to: 'belaya-vera', type: 'leads', label: 'от него просветление', inverse: 'исходит от', why: 'Бралльцы: «Бралл был первым местом, куда пришло просветление от Грара, Ведающего сон»' },
  { from: 'deti-nefrita', to: 'oyrdugi', type: 'member', label: 'культ народа', inverse: 'культ', why: 'Очищение: «Ойрдурги, противящиеся Призыву… создали культ Детей Нефрита»' },
  { from: 'deti-nefrita', to: 'labirint', type: 'enemy', label: 'крестовый поход против', inverse: 'противник', why: 'Очищение: «истинное искупление ойрдуги обретут, лишь отправившись в крестовый поход против Лабиринта»' },
  { from: 'deti-nefrita', to: 'plamennyi-yazyk', type: 'located', label: 'основан на', inverse: 'здесь основан', why: 'Очищение: «создали на крайнем юге Даскара, известном как Пламенный Язык»' },
  { from: 'shahi-labirinta', to: 'labirint', type: 'leads', label: 'владыки', inverse: 'во главе', why: 'Ойрдуги: «семь Шахов» названы истинными создателями ойрдугов' },
  { from: 'shahi-labirinta', to: 'oyrdugi', type: 'owner', label: 'создатели', inverse: 'создания', why: 'Призыв: «делая все более подвластной их истинным создателям — Шахам Лабиринтов»' },
  { from: 'kult-spyashchego-boga', to: 'morhory', type: 'member', label: 'вера народа', inverse: 'вера', why: 'Провинившийся Страж и Спящий Бог: часть мор’хоров верит, что они — частица спящего бога' },
  { from: 'orakuly-spiraley', to: 'spirali', type: 'located', label: 'жили в', inverse: 'здесь были', why: 'Выходцы из Спирали: «Оракулы в Спиралях могли определять, чьим перерождением является появившийся мор’хор»' },
  { from: 'medrese-begushchih-po-vetru', to: 'tanets-vetra', type: 'owner', label: 'хранит искусство', inverse: 'искусство школы', why: 'Аджаиды: медресе названо владельцем Танца Ветра, который аджаиды превосходят' },

  // Предметы, обычаи и звери.
  { from: 'dodor', to: 'vual', type: 'origin', label: 'тронут силой', inverse: 'коснулась', why: 'Аджаиды: «трехногого додора — существо, затронутое силой Вуали»' },
  { from: 'tatuirovki-begunov', to: 'adzhaidy', type: 'owner', label: 'обычай народа', inverse: 'обычай', why: 'Аджаиды: татуировки наносят на стопы при завершении первого испытания' },
  { from: 'tatuirovki-begunov', to: 'dodor', type: 'origin', label: 'наносятся кровью', inverse: 'кровь идёт на', why: 'Аджаиды: «используя его кровь для татуировки своих первых символов»' },
  { from: 'ogon-baraska', to: 'adzhaidy', type: 'owner', label: 'огонь народа', inverse: 'хранит', why: 'Аджаиды: «Огонь Бараска — священный огонь, который горит на каждой станции Аджаида»' },
  { from: 'galantar', to: 'zhark', type: 'ally', label: 'спутник', inverse: 'спутник', why: 'Ожидание, Спасение и Вера: «спутника Бесклыкого — зверя Галантара»' },
  { from: 'legion-goryashchego-kolesa', to: 'galantar', type: 'owner', label: 'носит его знак', inverse: 'знак легиона', why: 'Ожидание, Спасение и Вера: «легион Горящего колеса носит на своих масках тысячу глаз, символизирующих спутника Бесклыкого»' },
  { from: 'anzu', to: 'morhory', type: 'owner', label: 'зверь внутри', inverse: 'несёт в себе', why: 'Зверь: «Мор’хоры называют своего внутреннего демона Анзу»' },
  { from: 'anzu', to: 'purush', type: 'origin', label: 'проклятие от', inverse: 'проклял', why: 'Провинившийся Страж: «демон Анзу является проклятием, который создатель мор’хоров Пуруш обрушил на них»' },
  { from: 'provinivshiysya-strazh', to: 'kuznya-sudby', type: 'located', label: 'произошло в', inverse: 'здесь произошло', why: 'Провинившийся Страж: мор’хоры охраняли Кузню Золотых Нитей и вошли в неё' },
  { from: 'dogovor-krovi', to: 'dragmirtsy', type: 'owner', label: 'обычай народа', inverse: 'обычай', why: 'Договор Крови: «Каждый, кто желает получить помощь алого драгмирца, обязан заключить с ним договор»' },
  { from: 'braslet-materi', to: 'yamy', type: 'origin', label: 'выдаётся после', inverse: 'даёт право на', why: 'Раскаленное железо: «По прибытии домой они получают… браслет матери»' },
  { from: 'tanets-stali', to: 'yamy', type: 'located', label: 'ему учат в', inverse: 'здесь учат', why: 'Раскаленное железо: «Там они закаляются пламенными песками и обучаются танцу стали и крови»' },
  { from: 'igry-vechno-palyashchego', to: 'vizir', type: 'owner', label: 'выбирают на них', inverse: 'выбраны на', why: 'Раскаленное железо: «Каждые 10 лет проходят Игры Вечно Палящего, где выбирают визирей»' },
  { from: 'solntserozhdennyy', to: 'azar', type: 'origin', label: 'поведёт в', inverse: 'цель пути', why: 'Ожидание, Спасение и Вера: «Мессия, который поведет маракийцев обратно в затерянные земли их предков-колосов Азар»' },
  { from: 'narmesh', to: 'udrishi', type: 'owner', label: 'цель пути', inverse: 'ищут', why: 'Нармеш: «они ищут дорогу ветра и дюн, чтобы однажды обрести свою Нармеш, звезду судьбы»' },
  { from: 'pyyur-pyyur', to: 'narmesh', type: 'origin', label: 'не нашли', inverse: 'не найдена', why: 'Пйюр-пйюр: «удриши, которые так и не нашли свою Нармеш»' },
  { from: 'mastodonty', to: 'udrishi', type: 'ally', label: 'спутники', inverse: 'спутники', why: 'Семейство мастодонтов: «стали семьёй и домом для удришей»' },
  { from: 'obo', to: 'omor', type: 'located', label: 'при нём живут', inverse: 'живут при', why: 'Ветреные худдулины: «худдулины, которые живут рядом с определённым обо»' },
  { from: 'dulur', to: 'samaghi', type: 'owner', label: 'им кормятся ныряльщики', inverse: 'знают о нём', why: 'Самагхи: «все они кормят себя дулуром, думая обмануть глубины»' },
  { from: 'kyarizy', to: 'samaghi', type: 'located', label: 'их воды', inverse: 'живут в них', why: 'Дети глубин: «В подземных кяризах и пещерах Даскара плодятся и живут… самагхи»' },
  { from: 'uatana', to: 'vetu', type: 'located', label: 'земли народа', inverse: 'родина', why: 'Вету: «змееобразные метисы болот Уатаны»' },
  { from: 'tash-nagar', to: 'virmorozhdennye', type: 'located', label: 'земли народа', inverse: 'родина', why: 'Вирморожденные: «народ Таш’Нагара»' },
  { from: 'virmohana', to: 'virmorozhdennye', type: 'owner', label: 'устройство общества', inverse: 'разделены ею', why: 'Вирмохана: «разделение на две основные касты: норбу и нагбо»' },

  // Происхождение — из авторского указателя персонажей базы знаний
  // (Campaign_KB/visual/character_lore_index.json).
  { from: 'sarim', to: 'hudduliny', type: 'origin', label: 'сар худдулин', why: 'указатель персонажей: race huddulin, lineage sar' },
  { from: 'pepel', to: 'hudduliny', type: 'origin', label: 'эрх худдулин', why: 'указатель персонажей: race huddulin, lineage erkh' },
  { from: 'abraks', to: 'morhory', type: 'origin', label: 'морхор', why: 'указатель персонажей: race morhor' },
  { from: 'kofu-va-afna', to: 'udrishi', type: 'origin', label: 'эрил удришка', why: 'указатель персонажей: race udrish, lineage eril' },
  { from: 'iyar', to: 'dangun', type: 'origin', label: 'дангунец', why: 'указатель персонажей: race dangun' },
  { from: 'shida', to: 'maraq', type: 'origin', label: 'маракийка', why: 'указатель персонажей: race maraqi' },
]

function typeOf(id) {
  return LORE_RELATION_TYPES.find(item => item.id === id) || null
}

/**
 * Раскладывает рёбра по статьям: каждой стороне своя подпись.
 * `byId` — карта статей, чтобы взять заголовок и отбросить связи в никуда
 * (их ловит `pnpm lore:check`, но падать из-за них незачем).
 */
export function buildLoreLinks(byId) {
  const links = new Map()
  const push = (owner, link) => {
    if (!links.has(owner)) links.set(owner, [])
    links.get(owner).push(link)
  }

  for (const edge of LORE_RELATIONS) {
    const from = byId.get(edge.from)
    const to = byId.get(edge.to)
    if (!from || !to) continue
    const kind = typeOf(edge.type)
    if (!kind) continue

    push(edge.from, {
      id: edge.to,
      term: to.term,
      type: edge.type,
      label: edge.label || kind.title,
      direction: 'out',
      why: edge.why || '',
    })
    push(edge.to, {
      id: edge.from,
      term: from.term,
      type: edge.type,
      label: edge.inverse || kind.inverse,
      direction: 'in',
      why: edge.why || '',
    })
  }

  return links
}
