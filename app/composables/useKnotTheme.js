export const KNOT_THEMES = [
  {
    id: 'void',
    name: 'Пустота',
    description: 'Холод беззвёздной глубины',
    preview: 'radial-gradient(120% 120% at 50% 30%, #0c0e14, #040406)'
  },
  {
    id: 'shamas',
    name: 'Шамас',
    description: 'Тёплое сияние солнца',
    preview: 'radial-gradient(120% 120% at 50% 30%, #171208, #070402)'
  },
  {
    id: 'manu',
    name: 'Ману',
    description: 'Мрамор, лунное серебро и тайна',
    preview: 'radial-gradient(circle at 68% 24%, rgba(226,234,244,.28) 0 10%, transparent 38%), linear-gradient(128deg, transparent 44%, rgba(225,234,245,.16) 44.5%, transparent 45.5%), #252c35'
  },
  {
    id: 'madness',
    name: 'Безумие',
    description: 'Аметист, индиго и свет за гранью',
    preview: 'radial-gradient(circle at 28% 20%, rgba(214,169,255,.62), transparent 31%), radial-gradient(circle at 78% 26%, rgba(91,86,214,.7), transparent 42%), linear-gradient(145deg,#24143e,#090512)'
  }
]

const THEME_IDS = new Set(KNOT_THEMES.map(theme => theme.id))

export function normalizeKnotTheme(value) {
  if (value === 'sepia') return 'shamas'
  return THEME_IDS.has(value) ? value : 'void'
}

export function useKnotTheme() {
  const cookie = useCookie('tkk-theme', {
    default: () => 'void',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 365
  })
  const theme = useState('tkk-theme', () => normalizeKnotTheme(cookie.value))

  watch(theme, (value) => {
    const normalized = normalizeKnotTheme(value)
    if (value !== normalized) theme.value = normalized
    cookie.value = normalized
  }, { immediate: true })

  const setTheme = value => { theme.value = normalizeKnotTheme(value) }
  const currentTheme = computed(() => KNOT_THEMES.find(item => item.id === theme.value) || KNOT_THEMES[0])

  return { theme, currentTheme, themes: KNOT_THEMES, setTheme }
}
