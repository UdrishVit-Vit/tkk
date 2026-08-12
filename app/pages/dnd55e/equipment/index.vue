<script setup>
import {
  DND55E_EQUIPMENT,
  DND55E_EQUIPMENT_CATEGORIES,
  DND55E_EQUIPMENT_TAGS,
  DND55E_GEAR_VARIANTS,
  DND55E_WEAPON_MASTERIES,
  DND55E_WEAPON_PROPERTIES
} from '~/data/dnd55e/equipment2024.js'
const search = ref('')
const open = ref(null)
const showFilter = ref(false)
const showSources = ref(false)
const shareState = ref('')
let shareTimer = null
const active = reactive({ category: [], property: [], damageType: [], srdVersion: [] })

watch(showFilter, (shown) => {
  if (shown) showSources.value = false
})

function toggleSources() {
  showSources.value = !showSources.value
  if (showSources.value) showFilter.value = false
}

function flashShareState(value) {
  shareState.value = value
  if (shareTimer) window.clearTimeout(shareTimer)
  shareTimer = window.setTimeout(() => { shareState.value = '' }, 1800)
}

function fallbackCopy(value) {
  const area = document.createElement('textarea')
  area.value = value
  area.setAttribute('readonly', '')
  area.style.position = 'fixed'
  area.style.left = '-9999px'
  area.style.opacity = '0'
  document.body.appendChild(area)
  area.select()
  const copied = document.execCommand('copy')
  document.body.removeChild(area)
  if (!copied) throw new Error('Copy command failed')
}

async function sharePage() {
  if (!import.meta.client) return
  const url = window.location.href
  try {
    if (navigator.clipboard?.writeText) await navigator.clipboard.writeText(url)
    else fallbackCopy(url)
    flashShareState('Скопировано')
  } catch {
    try {
      fallbackCopy(url)
      flashShareState('Скопировано')
    } catch {
      flashShareState('Не удалось')
    }
  }
}

onBeforeUnmount(() => {
  if (shareTimer) window.clearTimeout(shareTimer)
})

const query = computed(() => search.value.trim().toLocaleLowerCase('ru'))

const visibleItems = computed(() => DND55E_EQUIPMENT.filter((item) => {
  if (active.category.length && !active.category.includes(item.category)) return false
  if (active.property.length && !active.property.some(property => weaponPropertyKeys(item).includes(property))) return false
  if (active.damageType.length && !active.damageType.includes(item.damageType)) return false
  if (active.srdVersion.length && !active.srdVersion.includes(item.srdVersion)) return false
  if (!query.value) return true

  return [
    item.title, item.englishName, item.description, item.type, item.damage, item.damageType,
    item.properties, item.mastery, item.ac, item.strength, item.ability, item.utilize, item.craft,
    item.cost, item.weight, item.capacity, item.speed, item.crew, item.passengers, item.cargo, item.srdVersion,
    ...item.tags.map(tag => DND55E_EQUIPMENT_TAGS[tag] || tag)
  ].filter(Boolean).join(' ').toLocaleLowerCase('ru').includes(query.value)
}))

const groups = computed(() => Object.entries(DND55E_EQUIPMENT_CATEGORIES)
  .map(([id, title]) => ({
    id,
    title,
    code: 'PHB · 2024',
    items: visibleItems.value.filter(item => item.category === id).map(item => ({
      id: item.id,
      title: item.title,
      raw: item
    }))
  }))
  .filter(group => group.items.length))

const filters = computed(() => [
  {
    key: 'category',
    label: 'Категория',
    options: Object.entries(DND55E_EQUIPMENT_CATEGORIES).map(([value, label]) => ({ value, label }))
  },
  {
    key: 'property',
    label: 'Свойства оружия',
    note: 'Показывает оружие хотя бы с одним из выбранных свойств',
    options: DND55E_WEAPON_PROPERTIES.map(property => ({
      value: property[0],
      label: property[0],
      title: property[3]
    }))
  },
  {
    key: 'damageType',
    label: 'Тип урона',
    options: [...new Set(DND55E_EQUIPMENT.map(item => item.damageType).filter(Boolean))]
      .map(value => ({ value, label: value }))
  },
  {
    key: 'srdVersion',
    label: 'Версия SRD',
    options: [...new Set(DND55E_EQUIPMENT.map(item => item.srdVersion).filter(Boolean))]
      .map(value => ({ value, label: `SRD ${value}`, title: 'System Reference Document для правил 2024 года' }))
  }
])

const activeCount = computed(() => (
  active.category.length + active.property.length + active.damageType.length + active.srdVersion.length
))
const isActive = (key, value) => active[key]?.includes(value)

function toggleFilter(key, value) {
  const values = active[key]
  const index = values.indexOf(value)
  if (index >= 0) values.splice(index, 1)
  else values.push(value)
}

function resetFilters() {
  active.category = []
  active.property = []
  active.damageType = []
  active.srdVersion = []
}

function tagLabel(tag) {
  return DND55E_EQUIPMENT_TAGS[tag] || tag
}

function variantsFor(item) {
  return DND55E_GEAR_VARIANTS[item.englishName] || []
}

const propertyRuleIndex = new Map(DND55E_WEAPON_PROPERTIES.map(rule => [rule[0].toLocaleLowerCase('ru'), rule]))
const masteryRuleIndex = new Map(DND55E_WEAPON_MASTERIES.map(rule => [rule[0], rule]))

function weaponPropertyKeys(item) {
  if (!item.properties || item.properties === '—') return []
  const keys = item.properties.split(', ').map(label => label.replace(/\s*\(.+$/, ''))
  if (/\(\d+\/\d+/.test(item.properties)) keys.push('Дистанция')
  return [...new Set(keys.map((key) => {
    const rule = propertyRuleIndex.get(key.toLocaleLowerCase('ru'))
    return rule?.[0] || key
  }))]
}

function glossaryPath(rule) {
  return `/dnd55e/glossary?rule=${rule[2]}`
}

function weaponPropertyRules(item) {
  if (!item.properties || item.properties === '—') return []
  return item.properties.split(', ').map((label) => {
    const title = label.replace(/\s*\(.+$/, '')
    const rule = propertyRuleIndex.get(title.toLocaleLowerCase('ru'))
    return rule ? { label, detail: label.slice(title.length).trim(), rule } : null
  }).filter(Boolean)
}

function masteryRule(name) {
  return masteryRuleIndex.get(name)
}

const PACKS = [
  ['Набор взломщика', 'Рюкзак, 1 000 шариков, 10-футовая бечёвка, колокольчик, 5 свечей, лом, молоток, 10 шлямбуров, закрытый фонарь, 2 фляги масла, 5 рационов, огниво и бурдюк.'],
  ['Набор дипломата', 'Сундук, 2 футляра для карт и свитков, богатая одежда, чернила, 5 перьев, лампа, 2 фляги масла, 5 листов бумаги, духи, сургуч и мыло.'],
  ['Набор исследователя подземелий', 'Рюкзак, кальтропы, лом, 2 фляги масла, 10 рационов, верёвка, огниво, 10 факелов и бурдюк.'],
  ['Набор артиста', 'Рюкзак, спальник, колокольчик, направленный фонарь, 3 костюма, зеркало, 8 фляг масла, 9 рационов, огниво и бурдюк.'],
  ['Набор путешественника', 'Рюкзак, спальник, 2 фляги масла, 10 рационов, верёвка, огниво, 10 факелов и бурдюк.'],
  ['Набор священника', 'Рюкзак, одеяло, святая вода, лампа, 7 рационов, ряса и огниво.'],
  ['Набор учёного', 'Рюкзак, книга, чернила, перо, лампа, 10 фляг масла, 10 листов пергамента и огниво.']
]

const SCROLL_COSTS = [
  ['Заговор', '1 день', '15 зм'], ['1-й', '1 день', '25 зм'], ['2-й', '3 дня', '100 зм'],
  ['3-й', '5 дней', '150 зм'], ['4-й', '10 дней', '1000 зм'], ['5-й', '25 дней', '1500 зм'],
  ['6-й', '40 дней', '10000 зм'], ['7-й', '50 дней', '12500 зм'], ['8-й', '60 дней', '15000 зм'],
  ['9-й', '120 дней', '50000 зм']
]

useSeoMeta({
  title: 'Снаряжение — D&D 5.5e 2024 — TKK.club',
  description: 'Оружие, мастерства, доспехи, инструменты, походное снаряжение, транспорт и услуги из официальных Basic Rules / Player’s Handbook 2024.'
})
</script>

<template>
  <ThreadRefPage
    emblem-img="/assets/nodes/snaryazhenie.png"
    emblem-alt="Снаряжение"
    system-path="/dnd55e"
    system-label="D&D 5.5e"
    kicker="D&D 5.5e · редакция 2024"
    title="Снаряжение"
    crumb-current="Снаряжение"
    search-placeholder="Найти предмет, свойство, мастерство или услугу"
    node-prefix="d55-equipment"
    query-key="item"
    :groups="groups"
    :total="DND55E_EQUIPMENT.length"
    :visible="visibleItems.length"
    :filters="filters"
    :is-active="isActive"
    :active-filter-count="activeCount"
    :columns="3"
    :thread-web="true"
    :card-actions="['link', 'bookmark', 'print', 'expand', 'close']"
    bookmark-store="tkk-dnd55e-equipment-bookmarks"
    empty-text="Ничего не найдено. Попробуйте название на русском или английском, игровое свойство либо сбросьте фильтры."
    v-model:search="search"
    v-model:open="open"
    v-model:show-filter="showFilter"
    @toggle-filter="toggleFilter"
    @reset-filters="resetFilters"
  >
    <template #intro>
      <aside v-if="false" class="equipment-note">
        <span class="equipment-note-mark" aria-hidden="true">◈</span>
        <div>
          <b>Официальное снаряжение редакции 2024 года</b>
          <p>
            Каталог использует цены, характеристики оружия, мастерства и правила из PHB / Basic Rules 2024.
            Предметы из DMG и сторонних книг не подмешиваются в базовый список.
          </p>
        </div>
      </aside>

      <section v-if="false" class="rules-handbook" aria-labelledby="equipment-rules-title">
        <header class="rules-handbook-heading">
          <span>
            <small>СПРАВОЧНИК ИГРОКА</small>
            <h2 id="equipment-rules-title">Как работает снаряжение</h2>
          </span>
          <span class="rules-count">{{ DND55E_EQUIPMENT.length }} позиций</span>
        </header>

        <div class="rules-grid">
          <details class="rules-panel" open>
            <summary><span>Монеты и продажа</span><small>5 номиналов</small></summary>
            <div class="rules-panel-body">
              <p>Золотая монета (зм) — основная единица стоимости. 50 монет любого номинала весят 1 фунт.</p>
              <div class="coin-line">
                <span><b>1 зм</b><small>100 мм</small></span>
                <span><b>1 зм</b><small>10 см</small></span>
                <span><b>1 зм</b><small>2 эм</small></span>
                <span><b>10 зм</b><small>1 пм</small></span>
              </div>
              <p>Обычное снаряжение обычно продаётся за половину цены. Предметы торговли и ценности сохраняют полную стоимость.</p>
            </div>
          </details>

          <details class="rules-panel">
            <summary><span>Владение оружием</span><small>атака и урон</small></summary>
            <div class="rules-panel-body">
              <p>Владение оружием позволяет добавлять бонус мастерства к броску атаки. Без владения бонус мастерства не добавляется.</p>
              <p>Рукопашная атака обычно использует Силу, дальнобойная — Ловкость. При попадании к урону добавляется модификатор той же характеристики, если правило не говорит иначе.</p>
              <p>Для применения свойства мастерства нужно владеть соответствующим мастерством оружия.</p>
            </div>
          </details>

          <details class="rules-panel wide">
            <summary><span>Свойства оружия</span><small>{{ DND55E_WEAPON_PROPERTIES.length }} правил</small></summary>
            <div class="rules-panel-body glossary-grid">
              <article v-for="property in DND55E_WEAPON_PROPERTIES" :key="property[0]">
                <h3>
                  <NuxtLink :to="glossaryPath(property)" class="rule-link">{{ property[0] }}</NuxtLink>
                  <small>[{{ property[3] }}]</small>
                </h3>
                <p><RuleRichText :text="property[1]" edition="2024" /></p>
              </article>
            </div>
          </details>

          <details class="rules-panel wide" open>
            <summary><span>Оружейные мастерства</span><small>{{ DND55E_WEAPON_MASTERIES.length }} приёмов</small></summary>
            <div class="rules-panel-body mastery-grid">
              <article v-for="mastery in DND55E_WEAPON_MASTERIES" :key="mastery[0]">
                <span class="mastery-rune" aria-hidden="true">◆</span>
                <span>
                  <h3>
                    <NuxtLink :to="glossaryPath(mastery)" class="rule-link">{{ mastery[0] }}</NuxtLink>
                    <small>[{{ mastery[3] }}]</small>
                  </h3>
                  <p><RuleRichText :text="mastery[1]" edition="2024" /></p>
                </span>
              </article>
            </div>
          </details>

          <details class="rules-panel">
            <summary><span>Доспехи и щиты</span><small>обучение</small></summary>
            <div class="rules-panel-body">
              <p>Без владения надетым доспехом персонаж получает помеху на проверки к20, связанные с Силой или Ловкостью, и не может накладывать заклинания.</p>
              <p>Если Сила ниже требования тяжёлого доспеха, Скорость уменьшается на 10 футов. Одновременно можно носить один доспех и использовать один щит.</p>
              <p>Бонус щита к КД действует только при владении щитами. Время надевания и снятия указано в карточке.</p>
            </div>
          </details>

          <details class="rules-panel">
            <summary><span>Инструменты</span><small>проверки и создание</small></summary>
            <div class="rules-panel-body">
              <p>Владение инструментом позволяет добавить бонус мастерства к проверке характеристики, выполненной с его помощью.</p>
              <p>Если к той же проверке применимо владение навыком, персонаж также получает преимущество. В карточке инструмента указаны характеристика, действие Использование и примеры создаваемых предметов.</p>
            </div>
          </details>

          <details class="rules-panel wide">
            <summary><span>Содержимое готовых наборов</span><small>{{ PACKS.length }} наборов</small></summary>
            <div class="rules-panel-body pack-list">
              <article v-for="pack in PACKS" :key="pack[0]"><h3>{{ pack[0] }}</h3><p>{{ pack[1] }}</p></article>
            </div>
          </details>

          <details class="rules-panel wide">
            <summary><span>Создание снаряжения</span><small>время и материалы</small></summary>
            <div class="rules-panel-body crafting-layout">
              <div>
                <h3>Обычные предметы</h3>
                <p>Нужны указанный инструмент, владение им и сырьё стоимостью в половину цены предмета (округляя вниз). Время в рабочих днях по 8 часов равно цене в зм, делённой на 10, с округлением вверх. Помощники с тем же владением делят время между собой; обычно Мастер допускает одного помощника.</p>
                <h3>Зелье лечения</h3>
                <p>Владение набором травника, сам набор, 25 зм сырья и 1 рабочий день позволяют создать обычное зелье лечения.</p>
                <h3>Свитки</h3>
                <p>Переписчик должен владеть Арканой или инструментами каллиграфа, иметь заклинание подготовленным каждый день работы и предоставить его материальные компоненты. Свиток использует Сл. и бонус атаки заклинания переписчика.</p>
              </div>
              <div class="equipment-table-wrap">
                <table>
                  <thead><tr><th>Уровень</th><th>Время</th><th>Цена</th></tr></thead>
                  <tbody><tr v-for="row in SCROLL_COSTS" :key="row[0]"><td>{{ row[0] }}</td><td>{{ row[1] }}</td><td>{{ row[2] }}</td></tr></tbody>
                </table>
              </div>
            </div>
          </details>

          <details class="rules-panel">
            <summary><span>Верховой бой</span><small>седло и груз</small></summary>
            <div class="rules-panel-body">
              <p>Тянущее карету, телегу, колесницу, сани или фургон животное перемещает груз до пятикратной грузоподъёмности, включая транспорт. Для нескольких животных грузоподъёмность складывается.</p>
              <p>Попона для ездового животного стоит в 4 раза дороже и весит в 2 раза больше соответствующего доспеха. Экзотическое седло требуется для водного или летающего животного; военное даёт преимущество на проверки, чтобы удержаться в седле.</p>
            </div>
          </details>

          <details class="rules-panel">
            <summary><span>Транспорт и услуги</span><small>путешествия</small></summary>
            <div class="rules-panel-body">
              <p>Сильный встречный ветер уменьшает скорость судна вдвое; без ветра парусное судно не движется под парусом. Течение обычно добавляет 3 мили/ч движущейся вниз по реке лодке.</p>
              <p>Ремонт 1 хита судна требует 1 дня и 20 зм. На городской верфи время и цена уменьшаются вдвое.</p>
              <p>Цены услуг — ориентир. Доступность заклинателя и редких услуг определяет Мастер и размер поселения.</p>
            </div>
          </details>
        </div>
      </section>
    </template>

    <template #controls>
      <button
        type="button"
        class="equipment-control-btn"
        :class="{ active: showSources }"
        :aria-expanded="showSources"
        aria-controls="equipment-sources"
        aria-label="Источники"
        title="Источники"
        @click="toggleSources"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 5.5c2.6-.7 5.1-.1 8 1.5v12c-2.9-1.6-5.4-2.2-8-1.5z" />
          <path d="M20 5.5c-2.6-.7-5.1-.1-8 1.5v12c2.9-1.6 5.4-2.2 8-1.5z" />
        </svg>
      </button>
      <button
        type="button"
        class="equipment-control-btn share"
        :class="{ success: shareState === 'Скопировано' }"
        :aria-label="shareState || 'Скопировать ссылку'"
        :title="shareState || 'Скопировать ссылку'"
        @click="sharePage"
      >
        <svg v-if="shareState !== 'Скопировано'" viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="18" cy="5" r="2.5" /><circle cx="6" cy="12" r="2.5" /><circle cx="18" cy="19" r="2.5" />
          <path d="m8.2 10.8 7.6-4.5M8.2 13.2l7.6 4.5" />
        </svg>
        <svg v-else viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12.5 4 4L19 7" /></svg>
        <span v-if="shareState" class="equipment-copy-feedback" role="status">{{ shareState }}</span>
      </button>
    </template>

    <template #control-panels>
      <Transition name="weave">
        <aside v-if="showSources" id="equipment-sources" class="equipment-sources" aria-label="Источники правил снаряжения">
          <header>
            <b>Источники</b>
            <button type="button" aria-label="Закрыть источники" title="Закрыть" @click="showSources = false">×</button>
          </header>
          <section class="equipment-source-group">
            <h3>Базовые правила</h3>
            <div class="equipment-source-chips">
              <span class="equipment-source-chip"><b>PHB</b> Книга игрока 2024</span>
              <span class="equipment-source-chip"><b>SRD</b> System Reference Document 5.2.1</span>
            </div>
          </section>
          <p class="equipment-source-note">В каталоге используются только официальные правила снаряжения 2024 года. Материалы DMG и сторонних изданий не добавлены.</p>
        </aside>
      </Transition>
    </template>

    <template #item="{ item }">
      <span class="equipment-list-card">
        <span class="equipment-list-copy">
          <span class="equipment-list-name">{{ item.raw.title }}</span>
        </span>
      </span>
    </template>

    <template #body="{ item }">
      <div class="tref-badges">
        <span class="tref-source" :title="item.raw.sourceTitle">PHB 2024</span>
        <span class="tref-tag">{{ DND55E_EQUIPMENT_CATEGORIES[item.raw.category] }}</span>
        <span v-for="tag in item.raw.tags.slice(0, 3)" :key="tag" class="tref-tag">{{ tagLabel(tag) }}</span>
      </div>

      <header class="equipment-card-heading">
        <span>
          <span class="equipment-card-title">{{ item.raw.title }}</span>
          <span class="equipment-card-original">{{ item.raw.englishName }}</span>
          <span class="equipment-card-summary">{{ item.raw.description }}</span>
        </span>
      </header>

      <dl class="tref-stats equipment-stats">
        <div class="tref-stat"><dt>Стоимость</dt><dd>{{ item.raw.cost }}</dd></div>
        <div class="tref-stat"><dt>Вес</dt><dd>{{ item.raw.weight || '—' }}</dd></div>

        <template v-if="item.raw.kind === 'weapon'">
          <div class="tref-stat"><dt>Урон</dt><dd>{{ item.raw.damage }} ({{ item.raw.damageType.toLowerCase() }})</dd></div>
          <div class="tref-stat"><dt>Мастерство</dt><dd>{{ item.raw.mastery }}</dd></div>
        </template>
        <template v-else-if="item.raw.kind === 'armor'">
          <div class="tref-stat"><dt>Класс Доспеха</dt><dd>{{ item.raw.ac }}</dd></div>
          <div class="tref-stat"><dt>Скрытность</dt><dd>{{ item.raw.stealth }}</dd></div>
        </template>
        <template v-else-if="item.raw.kind === 'tool'">
          <div class="tref-stat"><dt>Характеристика</dt><dd>{{ item.raw.ability }}</dd></div>
          <div class="tref-stat"><dt>Тип</dt><dd>{{ item.raw.group }}</dd></div>
        </template>
        <template v-else-if="item.raw.kind === 'mount'">
          <div class="tref-stat"><dt>Грузоподъёмность</dt><dd>{{ item.raw.capacity }}</dd></div>
        </template>
        <template v-else-if="item.raw.kind === 'vehicle' && item.raw.speed">
          <div class="tref-stat"><dt>Скорость</dt><dd>{{ item.raw.speed }}</dd></div>
          <div class="tref-stat"><dt>КД / хиты</dt><dd>{{ item.raw.ac }} / {{ item.raw.hp }}</dd></div>
        </template>
      </dl>

      <section v-if="item.raw.kind === 'weapon'" class="equipment-rule-block">
        <h3>Свойства оружия</h3>
        <div v-if="weaponPropertyRules(item.raw).length" class="weapon-property-list">
          <article v-for="property in weaponPropertyRules(item.raw)" :key="property.label">
            <h4>
              <NuxtLink :to="glossaryPath(property.rule)" class="rule-link">{{ property.rule[0] }}</NuxtLink>
              <small>[{{ property.rule[3] }}]</small>
              <span v-if="property.detail">{{ property.detail }}</span>
            </h4>
            <p><RuleRichText :text="property.rule[1]" edition="2024" /></p>
            <NuxtLink :to="glossaryPath(property.rule)" class="screen-link">Открыть в Ширме <span aria-hidden="true">→</span></NuxtLink>
          </article>
        </div>
        <p v-else>У этого оружия нет дополнительных свойств.</p>
        <article class="mastery-callout">
          <b>
            Приём:
            <NuxtLink :to="glossaryPath(masteryRule(item.raw.mastery))" class="rule-link">{{ item.raw.mastery }}</NuxtLink>
            <small>[{{ masteryRule(item.raw.mastery)?.[3] }}]</small>
          </b>
          <p><RuleRichText :text="masteryRule(item.raw.mastery)?.[1] || ''" edition="2024" /></p>
          <NuxtLink :to="glossaryPath(masteryRule(item.raw.mastery))" class="screen-link">Открыть приём в Ширме <span aria-hidden="true">→</span></NuxtLink>
        </article>
      </section>

      <section v-else-if="item.raw.kind === 'armor'" class="equipment-rule-block armor-details">
        <h3>Надевание и требования</h3>
        <dl>
          <div><dt>Сила</dt><dd>{{ item.raw.strength }}</dd></div>
          <div><dt>Надеть</dt><dd>{{ item.raw.don }}</dd></div>
          <div><dt>Снять</dt><dd>{{ item.raw.doff }}</dd></div>
        </dl>
      </section>

      <section v-else-if="item.raw.kind === 'tool'" class="equipment-rule-block">
        <h3>Использование</h3>
        <p>{{ item.raw.utilize }}</p>
        <template v-if="item.raw.craft !== '—'">
          <h3>Создание предметов</h3>
          <p>{{ item.raw.craft }}</p>
        </template>
      </section>

      <section v-else-if="item.raw.kind === 'vehicle' && item.raw.speed" class="equipment-rule-block vehicle-details">
        <h3>Характеристики судна</h3>
        <dl>
          <div><dt>Команда</dt><dd>{{ item.raw.crew }}</dd></div>
          <div><dt>Пассажиры</dt><dd>{{ item.raw.passengers }}</dd></div>
          <div><dt>Груз</dt><dd>{{ item.raw.cargo }}</dd></div>
          <div><dt>Порог урона</dt><dd>{{ item.raw.threshold }}</dd></div>
        </dl>
      </section>

      <section v-if="variantsFor(item.raw).length" class="equipment-rule-block variants-block">
        <h3>Варианты</h3>
        <div class="equipment-table-wrap">
          <table>
            <thead><tr><th>Вид</th><th>Примечание</th><th>Вес</th><th>Цена</th></tr></thead>
            <tbody><tr v-for="variant in variantsFor(item.raw)" :key="variant[0]"><td>{{ variant[0] }}</td><td>{{ variant[1] }}</td><td>{{ variant[2] }}</td><td>{{ variant[3] }}</td></tr></tbody>
          </table>
        </div>
      </section>
    </template>
  </ThreadRefPage>
</template>

<style scoped>
.equipment-note{display:flex;gap:14px;max-width:820px;margin:24px 0 20px;padding:15px 17px;border:1px solid rgba(var(--theme-accent-rgb),.24);border-radius:10px;background:linear-gradient(100deg,rgba(var(--theme-accent-rgb),.08),rgba(var(--theme-surface-rgb),.32));color:rgba(var(--theme-text-rgb),.82)}
.equipment-note-mark{display:grid;place-items:center;width:34px;height:34px;flex:0 0 auto;border:1px solid rgba(var(--theme-accent-rgb),.35);border-radius:50%;color:var(--theme-accent-strong)}
.equipment-note b{color:var(--theme-heading)}.equipment-note p{margin:5px 0 0;line-height:1.55}
.equipment-control-btn{position:relative;display:inline-grid;place-items:center;width:34px;height:34px;min-height:34px;flex:0 0 34px;border:1px solid rgba(var(--theme-accent-rgb),.16);border-radius:8px;background:transparent;padding:0;color:rgba(var(--theme-text-rgb),.58);cursor:pointer;transition:border-color .16s ease,color .16s ease,background .16s ease}.equipment-control-btn svg{width:15px;height:15px;fill:none;stroke:currentColor;stroke-width:1.7;stroke-linecap:round;stroke-linejoin:round}.equipment-control-btn:hover,.equipment-control-btn.active{border-color:rgba(var(--theme-accent-rgb),.48);background:rgba(var(--theme-accent-rgb),.06);color:var(--theme-accent-strong)}.equipment-control-btn.success{border-color:rgba(116,174,130,.42);color:#8fbe9a}.equipment-copy-feedback{position:absolute;z-index:5;top:calc(100% + 7px);right:0;padding:5px 8px;border:1px solid rgba(var(--theme-accent-rgb),.2);border-radius:6px;background:rgb(var(--theme-surface-rgb));box-shadow:0 8px 24px rgba(0,0,0,.18);color:var(--theme-heading);font-size:10px;font-weight:700;white-space:nowrap;pointer-events:none}
.equipment-sources{margin-top:12px;overflow:hidden;border:1px solid rgba(var(--theme-accent-rgb),.2);border-radius:10px;background:rgba(var(--theme-surface-rgb),.72);box-shadow:0 12px 34px rgba(0,0,0,.12)}.equipment-sources header{display:flex;align-items:center;justify-content:space-between;gap:16px;padding:11px 13px;border-bottom:1px solid rgba(var(--theme-accent-rgb),.12)}.equipment-sources header b{color:var(--theme-heading);font-size:13px}.equipment-sources header button{display:grid;place-items:center;width:25px;height:25px;border:0;border-radius:6px;background:transparent;color:rgba(var(--theme-text-rgb),.48);font-size:18px;cursor:pointer}.equipment-sources header button:hover{background:rgba(var(--theme-accent-rgb),.08);color:var(--theme-accent-strong)}.equipment-source-group{margin:11px 12px 8px;overflow:hidden;border:1px solid rgba(var(--theme-accent-rgb),.13);border-radius:8px}.equipment-source-group h3{margin:0;padding:8px 10px;border-bottom:1px solid rgba(var(--theme-accent-rgb),.1);color:rgba(var(--theme-text-rgb),.6);font-size:11px}.equipment-source-chips{display:flex;flex-wrap:wrap;gap:7px;padding:10px}.equipment-source-chip{display:inline-flex;align-items:center;gap:6px;padding:6px 9px;border:1px solid rgba(var(--theme-accent-rgb),.22);border-radius:6px;background:rgba(var(--theme-accent-rgb),.12);color:rgba(var(--theme-heading-rgb),.86);font-size:10px}.equipment-source-chip b{color:var(--theme-accent-strong);font-size:9px;letter-spacing:.04em}.equipment-source-note{margin:0;padding:2px 13px 12px;color:rgba(var(--theme-text-rgb),.48);font-size:10px;line-height:1.45}
.rules-handbook{max-width:1100px;margin:0 0 34px}.rules-handbook-heading{display:flex;align-items:end;justify-content:space-between;gap:18px;margin-bottom:13px}.rules-handbook-heading small{font-size:10px;font-weight:800;letter-spacing:.14em;color:rgba(var(--theme-accent-rgb),.72)}.rules-handbook-heading h2{margin:3px 0 0;font:700 24px/1.15 Georgia,serif;color:var(--theme-heading)}.rules-count{font-size:12px;color:rgba(var(--theme-text-rgb),.55)}
.rules-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}.rules-panel{border:1px solid rgba(var(--theme-accent-rgb),.16);border-radius:10px;background:rgba(var(--theme-surface-rgb),.28);overflow:hidden}.rules-panel.wide{grid-column:1/-1}.rules-panel summary{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:13px 15px;cursor:pointer;list-style:none;color:rgba(var(--theme-heading-rgb),.92);font-weight:750}.rules-panel summary::-webkit-details-marker{display:none}.rules-panel summary::before{content:'+';width:20px;height:20px;display:grid;place-items:center;border:1px solid rgba(var(--theme-accent-rgb),.28);border-radius:50%;color:var(--theme-accent-strong);font-weight:500}.rules-panel[open] summary::before{content:'−'}.rules-panel summary span{margin-right:auto}.rules-panel summary small{font-size:10px;text-transform:uppercase;letter-spacing:.08em;color:rgba(var(--theme-text-rgb),.46)}.rules-panel-body{padding:2px 15px 15px;border-top:1px solid rgba(var(--theme-accent-rgb),.1);color:rgba(var(--theme-text-rgb),.76)}.rules-panel-body p{line-height:1.58;margin:11px 0 0}
.coin-line{display:grid;grid-template-columns:repeat(4,1fr);gap:7px;margin:12px 0}.coin-line span{display:flex;flex-direction:column;padding:8px;border:1px solid rgba(var(--theme-accent-rgb),.14);border-radius:7px;background:rgba(var(--theme-contrast-rgb),.03)}.coin-line small{color:rgba(var(--theme-text-rgb),.5)}
.glossary-grid,.mastery-grid,.pack-list{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;padding-top:12px}.glossary-grid article,.pack-list article{padding:11px 12px;border-radius:8px;background:rgba(var(--theme-contrast-rgb),.025)}.glossary-grid h3,.mastery-grid h3,.pack-list h3,.crafting-layout h3{margin:0;color:var(--theme-accent-strong);font-size:14px}.glossary-grid h3 small,.mastery-grid h3 small{margin-left:4px;color:rgba(var(--theme-text-rgb),.46);font-size:11px;font-weight:500}.glossary-grid p,.mastery-grid p,.pack-list p{margin:4px 0 0;font-size:13px}.mastery-grid article{display:flex;gap:10px;padding:12px;border:1px solid rgba(var(--theme-accent-rgb),.12);border-radius:8px}.mastery-rune{color:var(--theme-accent-strong);font-size:9px;margin-top:4px}.crafting-layout{display:grid;grid-template-columns:minmax(0,1.35fr) minmax(280px,.65fr);gap:18px;padding-top:14px}.crafting-layout h3:not(:first-child){margin-top:14px}.rule-link{color:inherit;text-decoration:none;border-bottom:1px dotted rgba(var(--theme-accent-rgb),.48)}.rule-link:hover{color:var(--theme-accent-strong);border-bottom-style:solid}
.equipment-list-card{display:flex;align-items:center;width:100%;min-width:0}.equipment-list-copy{display:flex;flex-direction:column;min-width:0}.equipment-list-name{font-weight:750;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.equipment-card-heading{margin:14px 0 18px}.equipment-card-title,.equipment-card-original,.equipment-card-summary{display:block}.equipment-card-title{font:700 25px/1.15 Georgia,serif;color:var(--theme-heading)}.equipment-card-original{margin-top:2px;color:rgba(var(--theme-accent-rgb),.7);font-size:13px}.equipment-card-summary{max-width:720px;margin-top:8px;color:rgba(var(--theme-text-rgb),.72);line-height:1.52}
.equipment-stats{grid-template-columns:repeat(4,minmax(0,1fr))}.equipment-rule-block{margin-top:14px;padding:15px 16px;border:1px solid rgba(var(--theme-accent-rgb),.14);border-radius:9px;background:rgba(var(--theme-surface-rgb),.24)}.equipment-rule-block h3{margin:0 0 6px;font-size:13px;text-transform:uppercase;letter-spacing:.06em;color:var(--theme-accent-strong)}.equipment-rule-block p{margin:0;color:rgba(var(--theme-text-rgb),.76);line-height:1.58}.equipment-rule-block h3:not(:first-child){margin-top:15px}.weapon-property-list{display:grid;gap:9px;margin-top:10px}.weapon-property-list article{padding:13px 14px;border:1px solid rgba(var(--theme-accent-rgb),.12);border-radius:8px;background:rgba(var(--theme-contrast-rgb),.025)}.weapon-property-list h4{margin:0 0 7px;color:var(--theme-heading);font-size:14px}.weapon-property-list h4 small,.mastery-callout b small{margin-left:4px;color:rgba(var(--theme-text-rgb),.48);font-size:11px;font-weight:500}.weapon-property-list h4 span{display:inline-block;margin-left:8px;padding:2px 7px;border:1px solid rgba(var(--theme-accent-rgb),.18);border-radius:999px;color:var(--theme-accent-strong);font-size:10px}.screen-link{display:inline-flex;gap:5px;margin-top:9px;color:rgba(var(--theme-accent-rgb),.74);font-size:11px;font-weight:750;text-decoration:none}.screen-link:hover{color:var(--theme-accent-strong)}.mastery-callout{margin-top:13px;padding:12px 13px;border-left:2px solid var(--theme-accent);background:rgba(var(--theme-accent-rgb),.06)}.mastery-callout b{color:var(--theme-heading)}.mastery-callout p{margin-top:4px}.armor-details dl,.vehicle-details dl{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin:8px 0 0}.armor-details dl div,.vehicle-details dl div{padding:9px;border-radius:7px;background:rgba(var(--theme-contrast-rgb),.025)}.armor-details dt,.vehicle-details dt{font-size:10px;text-transform:uppercase;color:rgba(var(--theme-text-rgb),.48)}.armor-details dd,.vehicle-details dd{margin:3px 0 0;font-weight:700;color:var(--theme-heading)}
.equipment-table-wrap{overflow:auto}.equipment-table-wrap table{width:100%;border-collapse:collapse;font-size:12px}.equipment-table-wrap th,.equipment-table-wrap td{padding:9px 10px;border-bottom:1px solid rgba(var(--theme-accent-rgb),.1);text-align:left;white-space:nowrap}.equipment-table-wrap th{font-size:10px;text-transform:uppercase;color:rgba(var(--theme-accent-rgb),.7)}.equipment-table-wrap td:first-child{color:var(--theme-heading);font-weight:700}
@media (max-width:900px){.equipment-copy-feedback{display:none}}
@media (max-width:760px){.rules-grid{grid-template-columns:1fr}.rules-panel.wide{grid-column:auto}.glossary-grid,.mastery-grid,.pack-list,.crafting-layout{grid-template-columns:1fr}.coin-line{grid-template-columns:repeat(2,1fr)}.equipment-stats{grid-template-columns:repeat(2,minmax(0,1fr))}.armor-details dl,.vehicle-details dl{grid-template-columns:1fr}}
</style>
