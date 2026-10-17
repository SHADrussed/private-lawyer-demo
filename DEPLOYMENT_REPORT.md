# DEPLOYMENT_REPORT — Точка опоры

Дата: 17.10.2026 (UTC). **Сайт опубликован и проверен по публичному HTTPS.**

Публичная ссылка: **https://shadrussed-private-lawyer-demo.netlify.app**

| Параметр | Фактическое значение |
| --- | --- |
| Netlify project | `shadrussed-private-lawyer-demo` |
| Project ID | `651a7d3a-ff96-49a8-838e-c8bb9e4ad738` |
| Deploy ID | `6ad37ab8e2d69f66c49371bf` |
| Состояние deploy | ready |
| Команда | shadrussed |
| Тариф | Free / credit-free, $0 |
| Доступ посетителей | Публичный, без входа в Netlify |
| Способ публикации | Netlify CLI 27.13.0, готовый dist, production |
| Платные дополнения, домены, auto recharge | Не подключались |
| Удалённый GitHub-репозиторий | Не создан: ограничение прав интеграции |

Панель проекта: https://app.netlify.com/projects/shadrussed-private-lawyer-demo

## Публикация и настройки

После подтверждения владельцем официального OAuth-входа Netlify CLI использована существующая команда shadrussed. Через API проверен тип `credit-free` / Free и стоимость участника 0. Два новых проекта созданы независимо от существующих VANTA DETAILING, DROP/01 и FORME; эти три проекта не изменялись.

Сборка опубликована командой:

```sh
npm run build
npx netlify-cli@27.13.0 deploy --site shadrussed-private-lawyer-demo --dir dist --prod --no-build
```

На новом проекте снята защита входом (`sso_login: false`) для публичного доступа. Служебный badge отключён допустимой настройкой конкретного проекта (`built_with_badge_enabled: false`), без изменения тарифа и общих настроек команды. Официальное описание этой бесплатной настройки: https://docs.netlify.com/manage/projects/powered-by-netlify-badge/ .

`netlify.toml` и `public/_headers` обеспечивают CSP, Referrer-Policy, Permissions-Policy и nosniff; Netlify добавляет HSTS. Подтверждено получение заголовков по HTTPS. Файлы шрифтов локальные; canonical, Open Graph image и sitemap используют настоящий опубликованный домен.

Node для приложения/сборки: 22.12+; в Netlify config — 22. Для CLI 27 использовался Node 24.19.0. Секреты в исходники не добавлялись: CLI использует свой глобальный профиль, `.netlify` исключён из Git и архивов.

## Публичная проверка

- Неавторизованные HTTPS-запросы к `/`, `/sitemap.xml`, `/robots.txt` и `/social-preview.png`: HTTP 200.
- Браузерные E2E выполнены по реальному `https://shadrussed-private-lawyer-demo.netlify.app`: 4/4 сценария на 1440, 768, 390 и 320px, без пропусков и повторов.
- Проверены меню, клавиатура, FAQ, диалог, формы и переключение форматов консультации.
- Не обнаружены console/pageerror, запросы 4xx–5xx/requestfailed, горизонтальная прокрутка и нарушения проверенных правил axe.
- Демоформа не отправляет запросов, не принимает контакты и не сохраняет данные. Проверены cookies, localStorage и sessionStorage.
- Прямое открытие `/#faq` и `/#contact` проверяется в браузере. Desktop/mobile снимки сделаны с опубликованного сайта.
- Публичные показатели Lighthouse и ссылки на сырые отчёты приведены в QA_REPORT.md.

Артефакты: `docs/netlify-deploy.json`, `docs/netlify-publication.json`, `docs/https-check.json`, `docs/e2e-results.json`, `docs/live-visual-check.json`, `docs/lighthouse-mobile.json`.

## GitHub — оставшееся ограничение

Локальный независимый Git-репозиторий с веткой main подготовлен. GitHub CLI авторизован, но попытка создания репозитория вернула:

```text
GraphQL: Resource not accessible by integration (createRepository)
```

Удалённого репозитория `private-lawyer-demo` пока нет. Для его создания владелец может использовать терминал с нужными полномочиями:

```sh
gh auth login
gh repo create private-lawyer-demo --public --source=. --remote=origin --push
```

Существующий подходящий вход повторять не нужно. После этого GitHub можно подключить к уже работающему проекту Netlify с build command `npm run build`, publish directory `dist`, Node 22. Публикация из CLI уже работает и не зависит от этого шага.

## Передача

В `/workspace/deliverables` подготовлены исходный ZIP, production ZIP и переносимый Git bundle. Контрольные суммы — `SHA256SUMS.txt`, идентификаторы и публичные URL — `manifest.json`. Скриншоты, описание и подходящие специализации — в PORTFOLIO.md. README содержит порядок адаптации под реального клиента.

Условия Netlify Free и право коммерческого использования зафиксированы в DESIGN_SPEC.md с первичными источниками. Платные действия не выполнялись.
