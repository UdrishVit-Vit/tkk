# Схема сайта TKK.club

Последнее обновление: 2026-07-08.

Документ фиксирует текущую структуру проекта `C:\Projects\ENOA\tkk`: где лежат страницы, данные, ассеты и как связаны разделы D&D 5e 2014. Это рабочая карта сайта, чтобы после новых правок быстро понимать, куда добавлять контент и какие маршруты проверять.

## 1. Техническая основа

- Фреймворк: Nuxt 4.4.8 / Vue 3.
- Менеджер пакетов: pnpm.
- Главная конфигурация: `nuxt.config.ts`.
- Точка приложения: `app/app.vue`.
- Глобальные стили: `app/assets/css/main.css`.
- Контент Markdown: `@nuxt/content`, конфигурация в `content.config.ts`.
- Основные данные справочников: JS-модули в `app/data`.
- Публичные изображения и иконки: `public`.

Ключевые зависимости:

- `@nuxt/content` - Markdown-коллекции, сейчас используется для рас.
- `@nuxt/image` - работа с изображениями.
- `@nuxt/ui` - UI-обвязка приложения.
- `@pinia/nuxt` и `pinia` - подключены для состояния.
- `better-sqlite3` - зависимость Nuxt Content.

## 2. Главные зоны сайта

| Зона | Маршрут | Основной файл | Назначение |
| --- | --- | --- | --- |
| Главный хаб | `/` | `app/pages/index.vue` | Интерактивная карта систем TKK.club. Поддерживает deep-link `/?system=5e`. |
| Хаб D&D 5e | `/dnd5e` | `app/pages/dnd5e/index.vue` | Та же карта, сразу открытая на системе D&D 5e 2014. |
| Классы | `/dnd5e/classes` | `app/pages/dnd5e/classes/[[slug]].vue` | Карта классов. |
| Страница класса | `/dnd5e/classes/:slug` | `app/pages/dnd5e/classes/[[slug]].vue` | Подробная карточка класса, подклассы, таблица класса, умения. |
| Расы | `/dnd5e/races` | `app/pages/dnd5e/races/[[slug]].vue` | Карта рас и народов. |
| Страница расы | `/dnd5e/races/:slug` | `app/pages/dnd5e/races/[[slug]].vue` | Досье конкретной расы из Markdown. |
| Ширма правил | `/dnd5e/screens` | `app/pages/dnd5e/screens/index.vue` | Большой справочник правил D&D 5e 2014. |
| Раздел ширмы | `/dnd5e/screens/:section` | `app/pages/dnd5e/screens/<section>/index.vue` | Список правил внутри выбранного раздела. |
| Правило ширмы | `/dnd5e/screens/:section/:rule` | `app/pages/dnd5e/screens/<section>/[rule].vue` | Отдельная страница правила. |

## 3. Хаб D&D 5e

Структура хаба берётся из `app/data/hub.js`, а маршруты разделов задаются в `app/components/HubPage.vue`.

### Разделы хаба

| Группа | Разделы |
| --- | --- |
| Персонаж | Классы, Расы и происхождения, Черты, Особенности классов, Предыстории, Заклинания |
| Предметы | Оружие, Доспехи, Снаряжение, Драгоценности, Магические предметы |
| Инструменты | Знамения, Гнев Ильбеша, Чай |
| Мастерская | Бестиарий, Ширма (справочник) |

### Связанные маршруты

| Раздел | Маршрут |
| --- | --- |
| Классы | `/dnd5e/classes` |
| Расы и происхождения | `/dnd5e/races` |
| Черты | `/dnd5e/feats` |
| Особенности классов | `/dnd5e/class-features` |
| Предыстории | `/dnd5e/backgrounds` |
| Заклинания | `/dnd5e/spells` |
| Оружие | `/dnd5e/weapons` |
| Доспехи | `/dnd5e/armor` |
| Снаряжение | `/dnd5e/equipment` |
| Драгоценности | `/dnd5e/jewelry` |
| Магические предметы | `/dnd5e/magic-items` |
| Бестиарий | `/dnd5e/bestiary` |
| Знамения | `/dnd5e/omens` |
| Ширма (справочник) | `/dnd5e/screens` |

## 4. Справочники D&D 5e

Все эти страницы находятся в `app/pages/dnd5e`, а данные в `app/data`.

| Справочник | Маршрут | Данные | Сейчас записей |
| --- | --- | --- | --- |
| Классы | `/dnd5e/classes` | `classdata.js` | 15 классов |
| Умения классов | `/dnd5e/class-features` | `classFeatures5e.js` | 194 умения |
| Расы | `/dnd5e/races` | `content/dnd5e/races/*.md` | 12 файлов |
| Черты | `/dnd5e/feats` | `feats5e.js` | 14 черт |
| Предыстории | `/dnd5e/backgrounds` | `backgrounds5e.js` | 4 предыстории |
| Заклинания | `/dnd5e/spells` | `spells5e.js` | 10 заклинаний |
| Оружие | `/dnd5e/weapons` | `weapons5e.js` | 38 предметов |
| Доспехи | `/dnd5e/armor` | `armor5e.js` | 13 предметов |
| Снаряжение | `/dnd5e/equipment` | `equipment5e.js` | 81 предмет |
| Бестиарий | `/dnd5e/bestiary` | `bestiary5e.js` | 6 существ |
| Драгоценности | `/dnd5e/jewelry` | `gems5e.js` | 53 камня |
| Магические предметы | `/dnd5e/magic-items` | `magicItems5e.js` | 32 предмета |
| Знамения | `/dnd5e/omens` | `omens5e.js` | 35 знамений |

## 5. Страница класса

Главный компонент: `app/components/ClassPage.vue`.

Маршруты:

- `/dnd5e/classes` - список классов.
- `/dnd5e/classes/bard` - пример отдельной страницы класса.
- `/dnd5e/classes/:slug` - универсальный маршрут для остальных классов.

Данные:

- `app/data/classdata.js` - базовые карточки классов, таблицы уровней, подклассы.
- `app/data/classFeatures5e.js` - вынесенные умения классов.
- `app/data/spells5e.js` - используется для вкладки заклинаний класса.
- `app/data/ruleLinkIndex5e.js` - словарь правил и терминов для ссылок в тексте.

Что важно помнить:

- Карточка класса должна оставаться универсальной для всех 15 классов.
- Выбор подкласса не должен сам включать фильтр. Фильтр применяется только вручную пользователем.
- Базовые умения PHB должны оставаться видимыми вместе с выбранным подклассом.
- Таблица класса содержит ссылки на блоки умений ниже и должна вести к ним плавным скроллом.
- Эмблема класса ведёт назад на `/dnd5e/classes`.

## 6. Ширма правил D&D 5e

Ширма - новая крупная структура сайта.

Главные файлы:

- `app/pages/dnd5e/screens/index.vue` - центральный экран ширмы.
- `app/components/RuleScreenListPage.vue` - список правил внутри раздела.
- `app/components/RuleScreenDetailPage.vue` - отдельная страница правила.
- `app/components/RuleRichText.vue` - форматирование текста правила.
- `app/composables/useRuleBookmarks5e.js` - закладки правил.
- `app/data/ruleScreens5e.js` - группы и 31 раздел ширмы.
- `app/data/ruleScreenRegistry5e.js` - lazy-load модулей правил.
- `app/data/ruleLinkIndex5e.js` - 805 ссылочных терминов.

Текущая статистика:

- 5 групп ширмы.
- 31 раздел правил.
- 31 локальный загрузчик раздела.
- 774 правила внутри разделов.

### Группы ширмы

| Группа | Разделы |
| --- | --- |
| Ход и сцена | Движение, Действие, Бонусное действие, Реакция, Прочая деятельность |
| Бой и опасности | Сражение, Урон и атака, Хиты, Смерть и Отдых, Состояния и болезни, Окружающая среда, Ловушки, Погоня |
| Персонаж | Характеристики и Навыки, Происхождение, Активные умения класса, Мультиклассирование, Опыт, Языки |
| Магия и предметы | Заклинания, Снаряжение, Магические предметы, Артефакты, Сверхъестественные дары, Демонические дары, Эпические дары, Магические проявления |
| Мастерская | Деятельность в простое, Создание приключений, Путешествие, Путешествия по планам, Монстры |

### Разделы ширмы

| Раздел | Маршрут | Данные | Правил |
| --- | --- | --- | ---: |
| Движение | `/dnd5e/screens/move` | `movementRules5e.js` | 14 |
| Действие | `/dnd5e/screens/action` | `actionRules5e.js` | 24 |
| Бонусное действие | `/dnd5e/screens/bonus_action` | `bonusActionRules5e.js` | 3 |
| Реакция | `/dnd5e/screens/reaction` | `reactionRules5e.js` | 3 |
| Сражение | `/dnd5e/screens/combat` | `combatRules5e.js` | 9 |
| Прочая деятельность | `/dnd5e/screens/other_action` | `otherActionRules5e.js` | 3 |
| Окружающая среда | `/dnd5e/screens/environment` | `environmentRules5e.js` | 45 |
| Урон и атака | `/dnd5e/screens/damage_and_attack` | `damageAttackRules5e.js` | 25 |
| Хиты, Смерть и Отдых | `/dnd5e/screens/hits_death_rest` | `hitsDeathRestRules5e.js` | 17 |
| Характеристики и Навыки | `/dnd5e/screens/stats_and_skills` | `statsSkillsRules5e.js` | 51 |
| Происхождение | `/dnd5e/screens/origins` | `originRules5e.js` | 21 |
| Состояния и болезни | `/dnd5e/screens/conditions_and_disease` | `conditionsDiseaseRules5e.js` | 47 |
| Активные умения класса | `/dnd5e/screens/active_class_features` | `activeClassFeatureRules5e.js` | 32 |
| Заклинания | `/dnd5e/screens/spells` | `spellRules5e.js` | 15 |
| Мультиклассирование | `/dnd5e/screens/multiclassing` | `multiclassingRules5e.js` | 10 |
| Снаряжение | `/dnd5e/screens/equipment` | `equipmentRules5e.js` | 87 |
| Деятельность в простое | `/dnd5e/screens/downtime_activities` | `downtimeActivityRules5e.js` | 29 |
| Создание приключений | `/dnd5e/screens/creating_adventures` | `creatingAdventureRules5e.js` | 13 |
| Ловушки | `/dnd5e/screens/traps` | `trapRules5e.js` | 23 |
| Сверхъестественные дары | `/dnd5e/screens/supernatural_gifts` | `supernaturalGiftRules5e.js` | 89 |
| Демонические дары | `/dnd5e/screens/demonic_boons` | `demonicBoonRules5e.js` | 12 |
| Эпические дары | `/dnd5e/screens/epic_boons` | `epicBoonRules5e.js` | 26 |
| Артефакты | `/dnd5e/screens/artifacts` | `artifactRules5e.js` | 5 |
| Магические предметы | `/dnd5e/screens/magic_items` | `magicItemRules5e.js` | 34 |
| Путешествие | `/dnd5e/screens/journey` | `journeyRules5e.js` | 17 |
| Путешествия по планам | `/dnd5e/screens/planar_travel` | `planarTravelRules5e.js` | 62 |
| Погоня | `/dnd5e/screens/chases` | `chaseRules5e.js` | 5 |
| Магические проявления | `/dnd5e/screens/magical_phenomena` | `magicalPhenomenaRules5e.js` | 13 |
| Монстры | `/dnd5e/screens/monster` | `monsterRules5e.js` | 20 |
| Языки | `/dnd5e/screens/language` | `languageRules5e.js` | 18 |
| Опыт | `/dnd5e/screens/experience` | `experienceRules5e.js` | 2 |

## 7. Расы и Markdown-контент

Папка: `content/dnd5e/races`.

Конфигурация: `content.config.ts`, коллекция `dnd5eRaces`.

Текущие файлы:

- `adzhaidy.md`
- `borosy.md`
- `ehornur.md`
- `hudduliny.md`
- `jabari.md`
- `lyudi.md`
- `marakiytsy.md`
- `morhory.md`
- `oyrdugi.md`
- `samaghi.md`
- `udrishi.md`
- `vetu.md`

Связанные изображения:

- Портреты: `public/images/races/portraits`.
- Карточки: `public/images/races/<slug>/cards`.
- Детальные изображения: `public/images/races/<slug>/details`.
- Узлы разновидностей: `public/images/races/<slug>/knots`.
- Специальные подпапки: например `tattoos`, `parasites`.

### Источники Нити

Верхний уровень Markdown-файла задаёт основной Источник Нити. В досье он
показывается в едином формате: `Источник Нити — TL — The Threads of Largo`.
Код хранится в `source`, полное название — в `sourceTitle`. Дополнительные поля:
`sourceAuthor`, `sourceUrl`, `sourceNote` и `publishedAt`.

Дополнительные версии задаются массивом `threadSources`. Каждый Источник Нити —
самостоятельное представление расы и может заменить всё: название, исходное имя,
описание, регионы, теги, изображения, сводку, разновидности, особенности,
внутренние правила, имена и связанные нити. Неуказанные поля наследуются от
основного источника, что позволяет не дублировать совпадающие данные.

```yaml
source: TL
sourceTitle: The Threads of Largo
sourceUrl: https://www.enoa.club

threadSources:
  - id: another-thread
    source: AT
    sourceTitle: Another Thread
    sourceAuthor: Имя автора
    sourceUrl: https://example.com/source
    sourceNote: Кратко о принципах Источника Нити
    title: Собственное название расы
    originalName: Original name
    description: Собственное краткое представление расы.
    lore:
      - Первый абзац представления расы.
      - Второй абзац представления расы.
    raceSize: Средний
    speed: 30 фт.
    primaryTraits:
      - title: Особенность
        text: Полный текст особенности.
    ruleSections:
      - title: Возраст
        text: Текст для сводки и внутренних правил.
    windTattooTable:
      title: Татуировки — Символы Ветра
      entries:
        - whiteTitle: Белый эффект
          whiteText: Описание Белого Ветра.
          blackTitle: Чёрный эффект
          blackText: Описание Чёрного Ветра.
          darknessPoints: 1
    nameData:
      intro: Принцип образования имён.
      varieties: []
```

Идентификатор источника попадает в URL как `?source=another-thread`, поэтому
ссылка открывает расу именно из выбранного Источника Нити.

Страница расы использует тот же паттерн живой вертикальной нити, что и страницы
классов. Искра следует по нити за курсором, входит в ромб текущего смыслового
раздела и подсвечивает конкретную карточку, строку сводки, разновидность или
элемент таблицы под указателем. При `prefers-reduced-motion` искра отключается.

## 8. Компоненты

| Компонент | Назначение |
| --- | --- |
| `HubPage.vue` | Интерактивная карта систем и маршрутизация разделов хаба. |
| `HubOverlays.vue` | Поиск, закладки, социальные ссылки, тема, выбор системы. |
| `ClassPage.vue` | Универсальная страница класса. |
| `SectionCards.vue` | Плиточная выдача разделов хаба. |
| `ThreadRefPage.vue` | Общий каркас справочника в стиле нити. |
| `RuleScreenListPage.vue` | Список правил внутри раздела ширмы. |
| `RuleScreenDetailPage.vue` | Детальная страница одного правила. |
| `RuleRichText.vue` | Рендер структурированного текста правил. |
| `OmenCard.vue` | Карточка знамений. |

## 9. Ассеты

| Папка | Что хранит |
| --- | --- |
| `public/assets` | Главные узлы, favicon и базовые декоративные элементы. |
| `public/assets/classes` | Иконки 15 классов. |
| `public/assets/nodes` | Иконки узлов хаба D&D 5e. |
| `public/images/races` | Изображения рас, портреты, карточки, детали, узлы. |

Файлы узлов хаба уже есть для основных разделов: классы, расы, черты, особенности, предыстории, заклинания, оружие, доспехи, снаряжение, драгоценности, магические предметы, бестиарий, знамения, ширма.

## 10. Как добавлять новый раздел ширмы

1. Создать модуль данных в `app/data/<slug>Rules5e.js`.
2. В модуле хранить экран, группы, правила, иконки и `RULE_BY_SLUG`.
3. Добавить загрузчик в `app/data/ruleScreenRegistry5e.js`.
4. Добавить экран в `app/data/ruleScreens5e.js`.
5. Создать папку маршрута `app/pages/dnd5e/screens/<slug>`.
6. Внутри папки добавить `index.vue` для списка и `[rule].vue` для деталей.
7. При необходимости добавить термины в `app/data/ruleLinkIndex5e.js`.
8. Проверить `/dnd5e/screens`, `/dnd5e/screens/<slug>` и несколько правил внутри.

## 11. Как добавлять новый справочник D&D 5e

1. Создать файл данных в `app/data`.
2. Создать страницу в `app/pages/dnd5e`.
3. Добавить маршрут в `RACE_SECTION_ROUTES` внутри `app/components/HubPage.vue`.
4. Добавить раздел в `SYSTEMS` и иконку в `NODE_IMG` внутри `app/data/hub.js`, если раздел должен отображаться на карте.
5. Положить PNG-иконку узла в `public/assets/nodes`.
6. Проверить переход из `/dnd5e` и прямой маршрут.

## 12. Что проверять после крупных правок

Минимальный набор маршрутов:

- `/`
- `/dnd5e`
- `/dnd5e/classes`
- `/dnd5e/classes/bard`
- `/dnd5e/races`
- `/dnd5e/spells`
- `/dnd5e/weapons`
- `/dnd5e/armor`
- `/dnd5e/equipment`
- `/dnd5e/bestiary`
- `/dnd5e/jewelry`
- `/dnd5e/magic-items`
- `/dnd5e/omens`
- `/dnd5e/screens`
- `/dnd5e/screens/move`
- `/dnd5e/screens/move/moving`
- `/dnd5e/screens/equipment`
- `/dnd5e/screens/equipment/weapons`

Команды:

```bash
pnpm exec nuxt prepare
pnpm dev
```

Для продакшена:

```bash
pnpm build
node .output/server/index.mjs
```

## 13. Текущий вывод по структуре

Сайт теперь состоит из двух больших слоёв:

- визуальный хаб TKK.club с узлами систем и разделов;
- справочная база D&D 5e 2014, где есть отдельные справочники и новая ширма правил.

Самое крупное изменение после прошлой схемы - появление `/dnd5e/screens`: это отдельная библиотека правил с 31 разделом, вложенными страницами правил, закладками, фильтрами, поиском и ссылочным индексом терминов. Эту часть нужно считать одной из центральных структур сайта наравне с классами, расами и предметными справочниками.
