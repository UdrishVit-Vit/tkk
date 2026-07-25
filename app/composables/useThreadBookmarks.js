// Обобщённые закладки карточек справочников «нити»: хранение в localStorage,
// состояние общее на всё приложение, ключ хранилища задаёт вызывающая страница.
// Обобщение useRuleBookmarks5e.js — переиспользуется панелью иконок в ThreadRefPage.

export function useThreadBookmarks(storeKey) {
  const key = storeKey || 'tkk-thread-bookmarks'
  const stateId = `thread-bookmarks:${key}`
  const bookmarks = useState(stateId, () => [])
  const loaded = useState(`${stateId}:loaded`, () => false)

  function load() {
    if (loaded.value || import.meta.server) return
    try {
      const raw = JSON.parse(window.localStorage.getItem(key) || '[]')
      bookmarks.value = Array.isArray(raw) ? raw.filter(item => item && item.key && item.title) : []
    } catch {
      bookmarks.value = []
    }
    loaded.value = true
  }

  function persist() {
    if (import.meta.server) return
    try {
      window.localStorage.setItem(key, JSON.stringify(bookmarks.value))
    } catch {
      // приватный режим или заполненное хранилище — закладки живут до перезагрузки
    }
  }

  function isBookmarked(entryKey) {
    return bookmarks.value.some(item => item.key === entryKey)
  }

  function toggle(entry) {
    load()
    if (isBookmarked(entry.key)) {
      bookmarks.value = bookmarks.value.filter(item => item.key !== entry.key)
    } else {
      bookmarks.value = [...bookmarks.value, {
        key: entry.key,
        path: entry.path,
        query: entry.query || '',
        title: entry.title
      }]
    }
    persist()
  }

  return { bookmarks, load, isBookmarked, toggle }
}
