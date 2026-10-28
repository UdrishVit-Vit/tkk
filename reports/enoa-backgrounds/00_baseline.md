# Baseline до диагностического прохода

Дата: 2026-10-28. Рабочая папка: `C:\Projects\ENOA\tkk`. Исходный HEAD сохранён в [git-head.txt](baseline/git-head.txt).

До начала аудита уже были незакоммиченные изменения:

```
M app/data/dnd55e/backgrounds.js
M app/data/dnd55e/origin-feats-homebrew.js
M scripts/check-enoa-origin-revision3.mjs
M scripts/render-backgrounds-2024.mjs
M scripts/test-backgrounds-2024.mjs
?? .agents/
?? app/data/dnd55e/cohort-renegade.js
?? docs/backgrounds-2024/cohort-individual-review.md
```

Они сохранены как входное состояние, не отменены и не приписаны этому аудиту. [Git diff](baseline/working-tree.patch) покрывает отслеживаемые изменения; [snapshot](baseline/snapshot.json) содержит разрешённые данные всех каталогов, включая импортированную новую черту. [Хеши](baseline/hashes.json) покрывают 529 файлов `app`, `scripts`, `.agents`, конфигурацию и package.json; это контроль целостности, не полная резервная копия каждого untracked-файла. Сам untracked-контент оставлен на месте.

## Проверки

| Проверка | Результат |
| --- | --- |
| `node scripts/test-backgrounds-2024.mjs` | PASS; 19 отрицательных сценариев валидатора, защита существующих связей |
| `node scripts/check-enoa-origins.mjs` | PASS; 57 предложений, 73 проверки письменности, 4 регрессионных случая |
| `node scripts/check-enoa-origin-revision3.mjs` | PASS; контроль существующих 57 досье |
| `node scripts/render-backgrounds-2024.mjs` | PASS; SSR 73 карточек, каталог черт и отдельные 55 черновиков |
| `npm run build` | PASS, exit 0; сборка Nuxt/Nitro завершена |
| `node scripts/check-backgrounds-2024.mjs --strict` | Ожидаемый FAIL, exit 1: ровно два сохранённых исключения Free вместо Origin |
| Проверка SHA-256 после отчётов | 529/529 без изменения |
| Публичные карточки и интерактивность | Не подтверждены: web error / browser timeout |

Предупреждения сборки о sourcemap, аннотациях зависимостей и deprecated export paths не являются провалом сборки. Вывод sharp сообщает привязку сборки к win32-x64; публикация не выполнялась.

Существующий валидатор **сознательно допускает две категории Free** как старые исключения. Его успешный exit не равен строгому соответствию модели Origin. Итог структурной проверки записан в [structural-results.json](structural-results.json).

SSR проверяет создание HTML, а не клики, экранный читатель, мобильную вёрстку или баланс. Сценарии в карточках аудита — план проверки предлагаемых изменений, не утверждение о выполненном playtest. Отдельного human review в этом проходе не было: роли навыков применены последовательно агентом.
