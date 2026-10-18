# QA_REPORT — Точка опоры

Проверено 17.10.2026. **Финальные проверки выполнены на реальном публичном HTTPS-сайте:** https://shadrussed-private-lawyer-demo.netlify.app

## Результаты

| Проверка | Результат |
| --- | --- |
| TypeScript, включая тесты/конфигурацию | PASS |
| ESLint | PASS, 0 ошибок |
| Production build | PASS |
| Playwright по публичному URL | 4/4 PASS; skipped 0, unexpected 0, flaky 0 |
| Ширины | 1440, 768, 390, 320px |
| axe WCAG 2 A/AA + WCAG 2.1 AA, страница и dialog | 0 нарушений в проверенных состояниях |
| Дополнительная проверка доступного имени | 0 нарушений |
| Горизонтальная прокрутка | Не обнаружена на четырёх размерах |
| Console/pageerror/requestfailed/HTTP 4xx–5xx в сценарии | Не обнаружены |
| Запросы после submit демоформы | 0 |
| Cookies, localStorage, sessionStorage | Пусто |

Мобильные проверки выполнены в Chromium с эмуляцией viewport/touch. Браузер не авторизован в Netlify. Использован системный HTTPS proxy среды; TLS-проверка не отключалась. Исходный локальный прогон также сохранён.

## Пользовательские сценарии

Проверены skip link и переход с клавиатуры, цели всех якорей, мобильное меню (open/Escape/возврат фокуса/переход/close), три формата консультаций и навигация ArrowRight/Home, синхронизация с формой, FAQ, выбор параметров и submit формы, честный результат без отправки, dialog (Escape/возврат фокуса/закрытие кнопкой), reduced motion и сброс результата после reload.

Прямое открытие `/#faq` проверено E2E. Отдельно на всех четырёх ширинах проверены `/#contact`, HTTPS и отсутствие overflow; сделаны реальные публичные скриншоты.

## Lighthouse на публичном HTTPS

Стандартный мобильный профиль Lighthouse. Проверки выполнены последовательно после E2E, чтобы параллельная браузерная нагрузка не искажала показатели.

| Категория/метрика | Результат |
| --- | --- |
| Performance | 96/100 |
| Accessibility | 100/100 |
| Best Practices | 100/100 |
| SEO | 100/100 |
| LCP | 2.0 s |
| CLS | 0 |
| TBT | 0 ms |

Показатели — фактический лабораторный замер опубликованной версии, а не гарантия одинакового результата на любом устройстве или сети.

## HTTP и метаданные

Анонимные запросы к `/`, `/robots.txt`, `/sitemap.xml` и `/social-preview.png` возвращают 200. По настоящему домену настроены canonical, Open Graph URL/image и sitemap. Подтверждены CSP, HSTS, nosniff и Referrer-Policy. Ни вход в Netlify, ни пароль посетителю не требуются.

В финальном CSP разрешены запросы только к своему домену (`connect-src 'self'`), что позволяет Lighthouse прочитать robots.txt. `form-action 'none'` сохранён; у демоформы отсутствуют персональные поля, отправка, backend и хранение. Изменение проверено повторным публичным E2E.

## Визуальный аудит и исправления

Просмотрены реальные публичные desktop/tablet/mobile снимки: композиция, переносы заголовков, читаемость текста, отступы, положение графики и отсутствие обрезаний. В `docs/screenshots` ровно три презентационных изображения; дополнительные размеры и длинные страницы — в `docs/audit`.

Ранее исправлены контраст подписей, доступное имя логотипа, размер иконок этапов у бюро, положение иллюстрации на desktop/tablet и читаемость основного мобильного текста. Мобильное меню раскрывается в потоке документа. После исправлений локальные и публичные сценарии проходят без ошибок. Светлая антиквенная система и бумажная графика композиционно отличаются от корпоративного бюро.

## Сырые артефакты

- [Публичный Playwright](docs/e2e-results.json)
- [Локальный Playwright](docs/e2e-local-results.json)
- [Публичный Lighthouse](docs/lighthouse-mobile.json)
- [Локальный Lighthouse](docs/lighthouse-local-mobile.json)
- [HTTP-проверка](docs/https-check.json)
- [Размеры и прямой contact anchor](docs/live-visual-check.json)
- [Production deploy](docs/netlify-deploy.json)
- [Публичные настройки проекта](docs/netlify-publication.json)

Повторение: `BASE_URL=https://shadrussed-private-lawyer-demo.netlify.app npm run test:e2e`. Lighthouse: запустить `npx lighthouse https://shadrussed-private-lawyer-demo.netlify.app --only-categories=performance,accessibility,best-practices,seo` с установленным Chromium. В cloud при необходимости указывается системный proxy в Chrome flags.

## Публикация исходников

Сайт опубликован и доступен клиентам по HTTPS. Исходный код и история изменений загружены в публичную ветку main: https://github.com/SHADrussed/private-lawyer-demo. Автоматические проверки — [private-lawyer-demo/actions](https://github.com/SHADrussed/private-lawyer-demo/actions). Подробности — DEPLOYMENT_REPORT.md.
