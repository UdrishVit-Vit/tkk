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
  { from: 'seryy-sultan', to: 'marduk', type: 'enemy', label: 'убил', inverse: 'убит', why: 'Ненависть Драконоподобных: «Убийство Темного Вирма Серым Султаном»; Тёмный Вирм — это Мардук' },
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


  // Время Королей: родство и служба названы в книге прямо.
  { from: 'mel-ozar', to: 'ohurozar', type: 'kin', label: 'младший брат', inverse: 'старший брат', why: 'гл. 4: «Мой младший брат — Мелозар»' },
  { from: 'midal', to: 'sadal', type: 'kin', label: 'сестра-близнец', inverse: 'брат-близнец', why: 'гл. 10: «И всё-таки я старше»; всюду названы близнецами' },
  { from: 'zumrat', to: 'sadal', type: 'kin', label: 'старший брат', inverse: 'младший брат', why: 'гл. 10: «Теперь ты старший брат»' },
  { from: 'zumrat', to: 'midal', type: 'kin', label: 'старший брат', inverse: 'младшая сестра', why: 'гл. 6: «Мидал, Садал и Зумрат слышат один другого»' },
  { from: 'marduk', to: 'haar', type: 'kin', label: 'брат', inverse: 'брат', why: 'гл. 10: «Вы брат Мардука, верно?» — о Хааре' },
  { from: 'sargon', to: 'semya-mehshir', type: 'origin', label: 'из семьи', inverse: 'отсюда родом', why: 'гл. 10: «Я Саргон, с семьи Михшир»' },
  { from: 'sargon', to: 'dragmir', type: 'owner', label: 'связан договором', inverse: 'держит договор', why: 'гл. 7: «С рождения я был клинком Драгмира»' },
  { from: 'sargon', to: 'mel-ozar', type: 'member', label: 'клинок владыки', inverse: 'клинок', why: 'гл. 7: «Позволь мне быть твоим клинком» — «Я принимаю твой клинок, Саргон»' },
  { from: 'midal', to: 'mel-ozar', type: 'member', label: 'тень владыки', inverse: 'тень', why: 'гл. 9: «станешь ли ты охранять мою тень?»' },
  { from: 'narmandah', to: 'tsam', type: 'ally', label: 'соратник', inverse: 'соратница', why: 'гл. 6: Цам вела его дела в ямах; гл. 9: правое крыло и карающий клинок' },
  { from: 'narmandah', to: 'yamy', type: 'leads', label: 'чемпион ям', inverse: 'чемпион', why: 'гл. 6: «Нара уже пять лет был абсолютным чемпионом ям»' },
  { from: 'narmandah', to: 'ula', type: 'owner', label: 'в игре с ней', inverse: 'играет с ним', why: 'гл. 6: «Ты что, с Улой разговаривал?»' },

  // Крылья и клинок «Золотого Симурга».
  { from: 'ohurozar', to: 'bratstvo-simurga', type: 'leads', label: 'глава', inverse: 'во главе', why: 'гл. 4: «Я тут главный, вроде бы»' },
  { from: 'mel-ozar', to: 'bratstvo-simurga', type: 'leads', label: 'владыка', inverse: 'во главе', why: 'гл. 7: «Мелозар стал новым и единственным владыкой „Золотого Симурга“»' },
  { from: 'emefeyus', to: 'bratstvo-simurga', type: 'member', label: 'левое крыло', inverse: 'левое крыло', why: 'гл. 4: «Левое крыло „Золотого Симурга“ Эмефеюс»' },
  { from: 'tsam', to: 'bratstvo-simurga', type: 'member', label: 'правое крыло', inverse: 'правое крыло', why: 'гл. 4: «И правое крыло „Золотого Симурга“ Цам»' },
  { from: 'vsadniki-shamasa', to: 'bratstvo-simurga', type: 'member', label: 'клинок братства', inverse: 'клинок', why: 'гл. 6: «тринадцать лет он служил клинком „Золотого Симурга“»' },
  { from: 'sargon', to: 'vsadniki-shamasa', type: 'member', label: 'из Всадников', inverse: 'в отряде', why: 'Всадники Шамаса — пятеро с ничейных земель' },
  { from: 'narmandah', to: 'vsadniki-shamasa', type: 'member', label: 'из Всадников', inverse: 'в отряде', why: 'Всадники Шамаса — пятеро с ничейных земель' },
  { from: 'sadal', to: 'vsadniki-shamasa', type: 'member', label: 'из Всадников', inverse: 'в отряде', why: 'Всадники Шамаса — пятеро с ничейных земель' },
  { from: 'midal', to: 'vsadniki-shamasa', type: 'member', label: 'из Всадников', inverse: 'в отряде', why: 'Всадники Шамаса — пятеро с ничейных земель' },
  { from: 'yath-u', to: 'vsadniki-shamasa', type: 'member', label: 'из Всадников', inverse: 'в отряде', why: 'Всадники Шамаса — пятеро с ничейных земель' },
  { from: 'edra', to: 'vsadniki-shamasa', type: 'member', label: 'шестая', inverse: 'шестая', why: 'гл. 6: «Вот так Всадников Шамаса стало шестеро»' },

  // Народы и создатели.
  { from: 'sadal', to: 'elorcy', type: 'origin', label: 'из народа', inverse: 'отсюда родом', why: 'Книга всюду зовёт близнецов элорцами' },
  { from: 'midal', to: 'elorcy', type: 'origin', label: 'из народа', inverse: 'отсюда родом', why: 'Книга всюду зовёт близнецов элорцами' },
  { from: 'zumrat', to: 'elorcy', type: 'origin', label: 'из народа', inverse: 'отсюда родом', why: 'гл. 6: трое близнецов, рождённых за вуалью' },
  { from: 'um', to: 'elorcy', type: 'leads', label: 'архиепископ', inverse: 'во главе', why: 'гл. 6: «Его статус среди элорцев был невероятно высоким»' },
  { from: 'elorcy', to: 'var-elor', type: 'origin', label: 'народ осколка', inverse: 'родина', why: 'гл. 6: «единственный раз в истории Вар’Элора»' },
  { from: 'yath-u', to: 'ehornury', type: 'origin', label: 'из народа', inverse: 'отсюда родом', why: 'гл. 1: «Таких существ знали, как эхор’нуры»' },
  { from: 'yath-u', to: 'fulum', type: 'origin', label: 'ушёл из Башни', inverse: 'изгнанник', why: 'гл. 6: суд Верховного совета и уход из Башни' },
  { from: 'narmandah', to: 'borosy', type: 'origin', label: 'из народа', inverse: 'отсюда родом', why: 'Книга всюду зовёт Нару боросом' },
  { from: 'sargon', to: 'dragmirtsy', type: 'origin', label: 'из народа', inverse: 'отсюда родом', why: 'гл. 1: «высоким и мускулистым драгмирцем»' },
  { from: 'edra', to: 'enuma', type: 'kin', label: 'создание', inverse: 'создатель', why: 'гл. 9: «я не горжусь тем, что создал её»' },
  { from: 'emefeyus', to: 'morhory', type: 'origin', label: 'из народа', inverse: 'отсюда родом', why: 'гл. 4: «Ятх’У сразу узнал мор’хора»' },
  { from: 'emefeyus', to: 'spiral-stradaniy', type: 'origin', label: 'родом отсюда', inverse: 'отсюда родом', why: 'гл. 4: «он из спирали Страданий, одного из главных советов их вида»' },

  // Короли и их земли.
  { from: 'tusus', to: 'parkas', type: 'leads', label: 'правит', inverse: 'во главе', why: 'гл. 3: «они, из Паркаса, приезжают. Тусус выбирает…»' },
  { from: 'fahat', to: 'stalnoy-bastion', type: 'leads', label: 'правит', inverse: 'во главе', why: 'гл. 3: «Прибыли они в царство Фахата. Там, где стоит Железный бастион»' },
  { from: 'mu-i-lo', to: 'ulok', type: 'leads', label: 'правят', inverse: 'во главе', why: 'гл. 4: «В городе под названием Улок, в царстве Му и Ло»' },
  { from: 'iton', to: 'esor', type: 'leads', label: 'правит', inverse: 'во главе', why: 'гл. 1: «Итон, нынешний правитель»' },
  { from: 'krovavaya-gidra', to: 'tusus', type: 'owner', label: 'зверь короля', inverse: 'держит зверя', why: 'гл. 3: «Это гидра короля! Во имя Тусуса…»' },
  { from: 'deti-vremeni', to: 'mu-i-lo', type: 'owner', label: 'выведены ими', inverse: 'вывели', why: 'гл. 5: «они субстанция, которую вывели короли»' },
  { from: 'aegus', to: 'ulok', type: 'located', label: 'сын висит в башне', inverse: 'здесь висит принц', why: 'гл. 5: «Король боли отослал своего сына на вечные муки»' },

  // Вещи и их владельцы.
  { from: 'salbariy', to: 'ehornury', type: 'owner', label: 'металл народа', inverse: 'владеют им', why: 'гл. 5: «Фулум построили такие, как я»; люди с сальбарием работать не могут' },
  { from: 'kub-vrat', to: 'pyur', type: 'origin', label: 'дар Пйюра', inverse: 'подарил', why: 'гл. 10: «Это был подарок. Подарки — не отдарки»' },
  { from: 'kub-vrat', to: 'yath-u', type: 'owner', label: 'у него на хранении', inverse: 'хранит', why: 'гл. 8: «На Великой Охоте обрёл его ты»' },
  { from: 'krasnaya-kost', to: 'ula', type: 'origin', label: 'дар Улы', inverse: 'дала', why: 'гл. 6: «это выглядело, как клеймо Улы»' },
  { from: 'maski-korolev', to: 'mel-ozar', type: 'owner', label: 'носит', inverse: 'носит маски', why: 'гл. 8: «На его ремне висело четыре маски»' },
  { from: 'lazerus', to: 'mel-ozar', type: 'enemy', label: 'выкован против него', inverse: 'против него', why: 'Эпилог: «есть кое-кто, кто изобрёл кое-что против него»' },
  { from: 'iskry-titana', to: 'kollektsioner', type: 'owner', label: 'принесены им', inverse: 'принёс', why: 'гл. 9: «У меня есть кое-что. Я вам это передам»' },

  // Что с чем случилось.
  { from: 'ohota-dvuh-bratev', to: 'ohurozar', type: 'enemy', label: 'гибель', inverse: 'погиб', why: 'гл. 6-7: Драгмир свернул шею владыке в ночь охоты' },
  { from: 'dragmir', to: 'ohurozar', type: 'enemy', label: 'убил', inverse: 'убит', why: 'гл. 7: «Драгмир отрубил голову Охурозара и поднял её над лагерем»' },
  { from: 'voyna-koroley', to: 'dragmir', type: 'enemy', label: 'гибель', inverse: 'погиб', why: 'гл. 10: «Драгмир должен пасть сегодня»' },
  { from: 'voyna-koroley', to: 'vremena-koroley', type: 'located', label: 'конец эпохи', inverse: 'кончились ею', why: 'гл. 9-10: последняя битва, после которой не осталось королей' },
  { from: 'koronatsiya-tsarya-tsarey', to: 'mel-ozar', type: 'owner', label: 'его коронация', inverse: 'коронован', why: 'гл. 1: «Рядами сотни, тысячи приклонились Королю Королей»' },
  { from: 'sabara', to: 'mel-ozar', type: 'owner', label: 'дала ему плоть', inverse: 'обрёл плоть', why: 'гл. 7: «Приведите мне её, Королеву чумы, Сабару. Она сможет меня вылечить»' },
  { from: 'marduk', to: 'voyna-koroley', type: 'ally', label: 'выжег бастион', inverse: 'решил исход', why: 'гл. 10: «покрыв бастион синим пламенем, которое не щадило никого»' },
  { from: 'marduk', to: 'dragmirtsy', type: 'origin', label: 'его дыхание', inverse: 'созданы им', why: 'гл. 10: «Драгмирцы были созданы из воли Драгмира и дыхания Мардука»' },
  { from: 'vechnoe-solntsestoyanie', to: 'raskol', type: 'located', label: 'в те же дни', inverse: 'в те же дни', why: 'Эпилог: солнцестояние и раскол мира описаны одной сценой' },

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
