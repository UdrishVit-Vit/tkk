// Shared shape for every Pathfinder 2e glossary entry.
//
// `summary` is the one-line answer a player wants mid-turn; `quick` is the strip
// of hard numbers (action cost, traits, DC); `sections` is the full explanation.
// Keeping the builder here means an entry file stays a list of rules instead of
// a list of object literals.

export function rule(id, title, en, cat, summary, options = {}) {
  const { quick = [], traits = [], sections = [], related = [] } = options
  return {
    id,
    title,
    en,
    cat,
    summary,
    quick,
    traits,
    sections,
    related,
    // Flattened text, used only by the page's search index.
    searchText: [
      title, en, summary,
      ...traits,
      ...quick.map(q => `${q.label} ${q.value}`),
      ...sections.flatMap(s => [s.title, ...(s.paragraphs || []), ...(s.list || [])])
    ].join(' ')
  }
}

// A degrees-of-success block appears in dozens of rules and always reads in the
// same order, so it gets its own helper rather than four hand-written lines.
export function degrees({ critSuccess, success, failure, critFailure }) {
  const list = []
  if (critSuccess) list.push(`Критический успех. ${critSuccess}`)
  if (success) list.push(`Успех. ${success}`)
  if (failure) list.push(`Провал. ${failure}`)
  if (critFailure) list.push(`Критический провал. ${critFailure}`)
  return { title: 'Степени успеха', list }
}
