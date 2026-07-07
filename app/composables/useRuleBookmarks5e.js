// Закладки правил ширмы: хранение в localStorage, состояние общее на всё приложение.

const STORAGE_KEY = 'tkk-rule-bookmarks-5e'

export function useRuleBookmarks5e() {
  const bookmarks = useState('rule-bookmarks-5e', () => [])
  const loaded = useState('rule-bookmarks-5e-loaded', () => false)

  function load() {
    if (loaded.value || import.meta.server) return
    try {
      const raw = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]')
      bookmarks.value = Array.isArray(raw) ? raw.filter(item => item && item.path && item.title) : []
    } catch {
      bookmarks.value = []
    }
    loaded.value = true
  }

  function persist() {
    if (import.meta.server) return
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks.value))
    } catch {
      // приватный режим или заполненное хранилище — закладки живут до перезагрузки
    }
  }

  function isBookmarked(path) {
    return bookmarks.value.some(item => item.path === path)
  }

  function toggle(entry) {
    load()
    if (isBookmarked(entry.path)) {
      bookmarks.value = bookmarks.value.filter(item => item.path !== entry.path)
    } else {
      bookmarks.value = [...bookmarks.value, {
        path: entry.path,
        title: entry.title,
        titleEn: entry.titleEn || '',
        section: entry.section || ''
      }]
    }
    persist()
  }

  return { bookmarks, load, isBookmarked, toggle }
}
