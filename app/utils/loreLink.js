// Адрес статьи свода по её имени.
//
// «Связанные нити» досье народов и «см. также» правил хранятся строками —
// «Спирали», «Мхур», «Обо без Имени», — а не слагами: их пишет автор в
// Markdown, и требовать там знания идентификаторов нельзя. Поэтому имя
// сводится к той же основе, по которой глоссарий сливает свои источники
// (`loreMatchKey`), и ищется среди терминов и синонимов.
//
// Ничего не найдено — ссылки нет: пункт остаётся обычной подписью, а не ведёт
// на пустую страницу.

import { LORE_GLOSSARY, loreMatchKey } from '~/data/loreGlossary.js'

let index = null

function getIndex() {
  if (index) return index
  index = new Map()
  // Два прохода: сперва собственные термины, потом синонимы. Иначе исход
  // зависел бы от алфавита — синоним статьи, стоящей выше по списку, перебивал
  // бы настоящее имя другой статьи.
  for (const entry of LORE_GLOSSARY) {
    const key = loreMatchKey(entry.term)
    if (key && !index.has(key)) index.set(key, entry)
  }
  for (const entry of LORE_GLOSSARY) {
    for (const alias of entry.aliases || []) {
      const key = loreMatchKey(alias)
      if (key && !index.has(key)) index.set(key, entry)
    }
  }
  return index
}

/** Статья свода по имени, либо null. */
export function loreEntryFor(term) {
  const key = loreMatchKey(term)
  return key ? getIndex().get(key) || null : null
}

/** Адрес статьи свода по имени, либо пустая строка. */
export function loreLinkFor(term) {
  const entry = loreEntryFor(term)
  return entry ? `/lore/glossary/${entry.id}` : ''
}
