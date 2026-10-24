// Emphasise only phrases present in the rule. Keep explicit links and existing
// Markdown intact; no inferred action cost, resource limit or duration.
export function emphasizeFeatRule(text) {
  return text.split(/(\[[^\n]*?\]\([^\s)]+\)|\*\*[^*]+\*\*)/g).map(part => {
    if (part.startsWith('[') || part.startsWith('**')) return part
    return part.replace(/Когда [^.\n]+?(?=, вы)|(?<![а-яёА-ЯЁ])(?:Бонусным действием|бонусным действием|Действием|действием|Реакцией|реакцией)|(?:один|два|три|четыре|пять|шесть|1|2|3) раз(?:а)?(?=[\s,.])|число раз, равное вашему бонусу мастерства|(?:короткий или долгий|короткого или долгого|короткий|долгий|короткого|долгого) отдых(?:а)?/gu, phrase => `**${phrase}**`)
  }).join('')
}
