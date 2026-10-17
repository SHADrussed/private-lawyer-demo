import { useEffect, useRef, useState } from "react";
const formats = [
  {
    name: "Онлайн",
    caption: "Разговор из удобного места",
    text: "Видеовстреча, чтобы обсудить обстоятельства, задать вопросы и определить, какие материалы понадобятся для дальнейшей работы.",
    items: [
      "Способ связи согласуется заранее",
      "Документы — по отдельной договорённости",
      "После встречи — понимание следующих шагов",
    ],
  },
  {
    name: "Лично",
    caption: "Встреча за одним столом",
    text: "Очная консультация для подробного разговора и совместного изучения материалов. Место и время встречи согласуются индивидуально.",
    items: [
      "Встреча по предварительной договорённости",
      "Можно взять оригиналы документов",
      "Объём и стоимость обсуждаются до начала",
    ],
  },
  {
    name: "Письменно",
    caption: "Вопрос, который требует изучения",
    text: "Письменный анализ конкретного правового вопроса на основании согласованного перечня документов и обстоятельств.",
    items: [
      "Предмет анализа определяется заранее",
      "Срок и объём фиксируются в соглашении",
      "Выводы относятся к представленным материалам",
    ],
  },
];
const questions = [
  [
    "Я ещё не понимаю, в чём мой правовой вопрос. Это нормально?",
    "Да. Для первого разговора достаточно описать обстоятельства и то, что вас беспокоит. На реальной консультации адвокат поможет определить предмет вопроса и необходимые документы. В этом демосайте обращение отправить нельзя.",
  ],
  [
    "Что подготовить к первой консультации?",
    "Полезно составить краткую хронологию событий, список вопросов и собрать относящиеся к ситуации документы. Не отправляйте конфиденциальные материалы до согласования способа их передачи с адвокатом.",
  ],
  [
    "Как узнать стоимость работы?",
    "Стоимость зависит от предмета обращения, объёма материалов и формата помощи. Условия и вознаграждение обсуждаются до начала работы и закрепляются в соглашении. Цены в концепте не указаны.",
  ],
  [
    "Обязательно ли сразу обращаться в суд?",
    "Способ разрешения вопроса зависит от обстоятельств. После их изучения можно обсудить переговоры, досудебное урегулирование и судебный порядок, если он применим.",
  ],
  [
    "Можно ли гарантировать результат?",
    "Нет. Правовая оценка помогает понять риски и возможные варианты действий, но не гарантирует определённого решения суда или действий других лиц.",
  ],
];
function Arrow({ up = false }: { up?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d={up ? "M5 19 19 5H5m14 0v14" : "M4 12h16m-6-6 6 6-6 6"}
        stroke="currentColor"
        strokeWidth="1.3"
      />
    </svg>
  );
}
function Artwork() {
  return (
    <div className="artwork">
      <span className="art-side">Личная практика / человеческий масштаб</span>
      <div className="art-paper">
        <span className="art-number">ЗАМЕТКИ О ГЛАВНОМ / 01</span>
        <svg
          viewBox="0 0 400 390"
          fill="none"
          aria-label="Авторская линейная композиция: открытая форма и точка опоры"
          role="img"
        >
          <path
            d="M80 315V144c0-66 53-119 119-119s119 53 119 119v171"
            stroke="#e6caba"
            strokeWidth="1"
          />
          <path
            d="M106 315V150c0-52 42-94 94-94s94 42 94 94v165"
            stroke="#e6caba"
            strokeWidth="1"
          />
          <path
            d="M132 315V157a68 68 0 0 1 136 0v158"
            stroke="#e6caba"
            strokeWidth="1"
          />
          <path
            d="M158 315V162a42 42 0 0 1 84 0v153"
            stroke="#e6caba"
            strokeWidth="1"
          />
          <path
            d="M184 315V170a16 16 0 0 1 32 0v145M54 315h291"
            stroke="#e6caba"
            strokeWidth="1"
          />
          <circle cx="200" cy="315" r="6" fill="#f2e4ce" />
          <path d="M200 336v35" stroke="#e6caba" strokeWidth="1" />
        </svg>
        <div className="art-caption">
          Сначала —<br />
          <em>понять.</em>
        </div>
        <span className="art-bottom">Адвокат Н. / вымышленный персонаж</span>
      </div>
      <div className="art-tag">
        <span className="tag-dot" />
        <p>
          Место для ясности
          <br />
          <span>в сложных обстоятельствах.</span>
        </p>
      </div>
    </div>
  );
}
export default function App() {
  const [menu, setMenu] = useState(false);
  const [format, setFormat] = useState(0);
  const [ready, setReady] = useState(false);
  const [topic, setTopic] = useState("Семья и личные отношения");
  const dialog = useRef<HTMLDialogElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenu(false);
        menuButton.current?.focus();
      }
    };
    if (menu) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menu]);
  const navigation = [
    ["#about", "О практике"],
    ["#expertise", "Вопросы"],
    ["#consultation", "Консультации"],
    ["#contact", "Связаться"],
  ];
  return (
    <>
      <a className="skip" href="#main">
        Перейти к содержанию
      </a>
      <div className="demo-banner">
        <span>Сайт-концепт для портфолио.</span> Юридическая помощь не
        оказывается.
      </div>
      <header className="header container">
        <a href="#" className="logo">
          <span className="logo-dot" />
          точка опоры
          <span className="logo-sub">
            Частная адвокатская практика · концепт
          </span>
        </a>
        <nav className="desktop-nav" aria-label="Основная навигация">
          {navigation.slice(0, 3).map(([url, name]) => (
            <a key={url} href={url}>
              {name}
            </a>
          ))}
        </nav>
        <a className="header-contact" href="#contact">
          Начать разговор <Arrow up />
        </a>
        <button
          className="menu-button"
          ref={menuButton}
          onClick={() => setMenu(!menu)}
          aria-expanded={menu}
          aria-controls="mobile-menu"
        >
          {menu ? "Закрыть" : "Меню"}
          <span aria-hidden="true">{menu ? "−" : "+"}</span>
        </button>
      </header>
      {menu && (
        <nav
          id="mobile-menu"
          className="mobile-nav"
          aria-label="Мобильная навигация"
        >
          {navigation.map(([url, name]) => (
            <a key={url} href={url} onClick={() => setMenu(false)}>
              {name}
              <Arrow />
            </a>
          ))}
        </nav>
      )}
      <main id="main">
        <section className="hero container">
          <div className="hero-body">
            <p className="eyebrow">Адвокат Н. / персональный демоконцепт</p>
            <h1>
              Право на
              <br />
              <em>спокойный</em>
              <br />
              разговор.
            </h1>
            <div className="hero-bottom">
              <span className="thin-line" />
              <div>
                <p>
                  Когда личный вопрос становится правовым,
                  <br className="desktop-break" /> важно понять, с чего начать.
                </p>
                <a href="#consultation" className="button rust">
                  О консультации <Arrow />
                </a>
              </div>
            </div>
          </div>
          <Artwork />
          <a href="#about" className="hero-scroll">
            <span>Без спешки. По существу.</span>
            <span aria-hidden="true">↓</span>
          </a>
        </section>
        <section id="about" className="about section container">
          <div className="section-index">
            <span>01</span>
            <p>Личное / профессиональное</p>
          </div>
          <div className="about-content">
            <p className="eyebrow">О частной практике</p>
            <h2>
              За правовым вопросом
              <br />
              всегда есть <em>человек.</em>
            </h2>
            <div className="about-columns">
              <p className="lead">
                Обстоятельства могут быть сложными. Разговор о них может быть
                понятным.
              </p>
              <div>
                <p>
                  Этот концепт показывает персональный сайт адвоката, который
                  работает с вопросами семьи, наследства и имущества. В центре —
                  личное взаимодействие и последовательное объяснение возможных
                  действий.
                </p>
                <p>
                  В реальном проекте здесь будут имя адвоката, подтверждённые
                  сведения о статусе, образовании и профессиональном пути.
                  Вымышленному персонажу мы не приписываем стаж и достижения.
                </p>
                <span className="signature">Н.</span>
                <span className="signature-note">
                  Адвокат Н. · персонаж концепта
                </span>
              </div>
            </div>
          </div>
        </section>
        <section id="expertise" className="expertise section">
          <div className="container">
            <div className="expertise-heading">
              <div>
                <p className="eyebrow">02 / С чем можно обратиться</p>
                <h2>
                  Вопросы,
                  <br />
                  <em>близкие к жизни.</em>
                </h2>
              </div>
              <p>
                Пример специализации частной практики.
                <br />
                Возможность принять поручение определяется
                <br className="desktop-break" /> после знакомства с
                обстоятельствами.
              </p>
            </div>
            <div className="expertise-list">
              {[
                [
                  "Семья",
                  "и личные отношения",
                  "Расторжение брака, раздел имущества, вопросы участия в воспитании детей и семейные соглашения.",
                  "01",
                ],
                [
                  "Наследство",
                  "и преемственность",
                  "Принятие наследства, вопросы состава наследственного имущества и споры между наследниками.",
                  "02",
                ],
                [
                  "Имущество",
                  "и договорённости",
                  "Жилищные вопросы, право собственности, договорные обязательства и урегулирование имущественных споров.",
                  "03",
                ],
              ].map(([title, sub, desc, n]) => (
                <article key={title}>
                  <span className="expertise-number">{n}</span>
                  <h3>
                    {title}
                    <small>{sub}</small>
                  </h3>
                  <p>{desc}</p>
                  <a href="#contact" aria-label={"Обсудить тему: " + title}>
                    <Arrow up />
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section id="consultation" className="consultation section container">
          <div className="consultation-heading">
            <p className="eyebrow">03 / Первая консультация</p>
            <h2>
              Выберите, как вам
              <br />
              <em>удобнее говорить.</em>
            </h2>
            <p>
              Формат — часть диалога.
              <br />
              Содержание всегда зависит от вашей ситуации.
            </p>
          </div>
          <div className="consultation-panel">
            <div
              className="tabs"
              role="tablist"
              aria-label="Формат консультации"
            >
              {formats.map((item, i) => (
                <button
                  key={item.name}
                  ref={(el) => {
                    tabs.current[i] = el;
                  }}
                  id={"tab-" + i}
                  type="button"
                  role="tab"
                  aria-selected={format === i}
                  aria-controls={"panel-" + i}
                  tabIndex={format === i ? 0 : -1}
                  onClick={() => {
                    setFormat(i);
                    setReady(false);
                  }}
                  onKeyDown={(e) => {
                    let next = i;
                    if (e.key === "ArrowRight") next = (i + 1) % 3;
                    else if (e.key === "ArrowLeft") next = (i + 2) % 3;
                    else if (e.key === "Home") next = 0;
                    else if (e.key === "End") next = 2;
                    else return;
                    e.preventDefault();
                    setFormat(next);
                    setReady(false);
                    tabs.current[next]?.focus();
                  }}
                >
                  {item.name}
                  <span aria-hidden="true">0{i + 1}</span>
                </button>
              ))}
            </div>
            <div
              className="tab-content"
              key={format}
              role="tabpanel"
              id={"panel-" + format}
              aria-labelledby={"tab-" + format}
              tabIndex={0}
            >
              <span className="panel-label">
                Формат / {formats[format].name}
              </span>
              <h3>{formats[format].caption}</h3>
              <p>{formats[format].text}</p>
              <ul>
                {formats[format].items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <a href="#contact" className="text-link">
                Перейти к первому шагу <Arrow />
              </a>
            </div>
            <span className="consultation-note">
              Демонстрация форматов. Бронирование встреч недоступно.
            </span>
          </div>
        </section>
        <section className="quote-section">
          <div className="container quote-inner">
            <span aria-hidden="true" className="quote-mark">
              “
            </span>
            <blockquote>
              Не обязательно знать
              <br />
              все ответы, чтобы
              <br />
              <em>задать первый вопрос.</em>
            </blockquote>
            <p>
              Редакционная мысль концепта.
              <br />
              Не отзыв и не цитата реального адвоката.
            </p>
            <div className="quote-circle" aria-hidden="true">
              <span />
            </div>
          </div>
        </section>
        <section id="process" className="process section container">
          <div className="section-index">
            <span>04</span>
            <p>Шаг за шагом</p>
          </div>
          <div className="process-content">
            <h2>
              У каждого шага —<br />
              <em>понятный смысл.</em>
            </h2>
            <ol>
              {[
                [
                  "Расскажите о ситуации",
                  "На первой встрече обсуждаются обстоятельства и то, какой вопрос вы хотите решить.",
                ],
                [
                  "Разберитесь в вариантах",
                  "После изучения материалов адвокат объясняет правовые возможности и ограничения.",
                ],
                [
                  "Согласуйте работу",
                  "Объём помощи, вознаграждение и порядок взаимодействия закрепляются в соглашении.",
                ],
                [
                  "Двигайтесь по плану",
                  "Дальнейшие действия зависят от согласованного поручения и развития обстоятельств.",
                ],
              ].map(([title, text], i) => (
                <li key={title}>
                  <span>0{i + 1}</span>
                  <div>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>
        <section id="faq" className="faq section">
          <div className="container faq-grid">
            <div>
              <p className="eyebrow">05 / То, о чём часто спрашивают</p>
              <h2>
                Можно
                <br />
                <em>спросить.</em>
              </h2>
              <p className="faq-intro">
                Общая информация.
                <br />
                Не заменяет индивидуальную консультацию.
              </p>
            </div>
            <div className="faq-list">
              {questions.map(([q, a]) => (
                <details key={q}>
                  <summary>
                    {q}
                    <span className="plus" aria-hidden="true" />
                  </summary>
                  <p>{a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
        <section id="contact" className="contact section container">
          <div className="contact-heading">
            <p className="eyebrow">06 / Начало разговора</p>
            <h2>
              Давайте начнём
              <br />
              <em>с главного.</em>
            </h2>
            <p>
              В настоящем проекте здесь можно будет связаться с адвокатом. А
              пока — посмотреть пример подготовки к встрече.
            </p>
            <div className="contact-details">
              <span className="small-dot" />
              <p>
                Личные контакты и место приёма
                <br />
                будут добавлены для реального адвоката.
              </p>
            </div>
          </div>
          <form
            className="contact-form"
            onSubmit={(e) => {
              e.preventDefault();
              setReady(true);
            }}
          >
            <div className="form-top">
              <span>Подготовка к встрече</span>
              <span className="demo-label">Деморежим</span>
            </div>
            <p className="form-description">
              Здесь нет полей для имени, телефона или описания дела. Выбор
              остаётся только на этой странице.
            </p>
            <label htmlFor="topic">Что вы хотели бы обсудить?</label>
            <select
              id="topic"
              value={topic}
              onChange={(e) => {
                setTopic(e.target.value);
                setReady(false);
              }}
            >
              <option>Семья и личные отношения</option>
              <option>Наследство</option>
              <option>Имущество и договорённости</option>
              <option>Пока не знаю</option>
            </select>
            <fieldset>
              <legend>Формат разговора</legend>
              <div className="format-options">
                {formats.map((item, i) => (
                  <label key={item.name}>
                    <input
                      type="radio"
                      name="format"
                      checked={format === i}
                      onChange={() => {
                        setFormat(i);
                        setReady(false);
                      }}
                    />
                    <span>{item.name}</span>
                  </label>
                ))}
              </div>
            </fieldset>
            <button type="submit" className="button rust">
              Собрать план встречи <Arrow />
            </button>
            <div className="form-result" role="status">
              {ready ? (
                <>
                  <strong>Ваш примерный план</strong>
                  <p>
                    {topic} · {formats[format].name.toLowerCase()}. Подготовьте
                    хронологию, список вопросов и относящиеся к теме документы.
                    Встреча не назначена. Ничего не отправлено и не сохранено.
                  </p>
                </>
              ) : (
                <p>
                  Это демонстрация. Заявка не отправляется,
                  <br />
                  запись на консультацию не производится.
                </p>
              )}
            </div>
          </form>
        </section>
      </main>
      <footer className="footer">
        <div className="container">
          <div className="footer-top">
            <a href="#" className="footer-logo">
              <span className="logo-dot" />
              точка опоры
            </a>
            <p>
              Персональный сайт адвоката · демоконцепт
              <br />
              Адвокат Н. — вымышленный персонаж.
              <br />
              Юридическая помощь не оказывается.
            </p>
            <a href="#" className="back-top">
              К началу <span aria-hidden="true">↑</span>
            </a>
          </div>
          <div className="footer-bottom">
            <span>© 2026 · Проект для портфолио веб-студии</span>
            <button onClick={() => dialog.current?.showModal()}>
              О концепте и данных <Arrow up />
            </button>
          </div>
        </div>
      </footer>
      <dialog
        ref={dialog}
        aria-labelledby="legal-title"
        onClick={(e) => {
          if (e.target === e.currentTarget) dialog.current?.close();
        }}
      >
        <div className="dialog-inner">
          <span className="eyebrow">Информация о проекте</span>
          <h2 id="legal-title">
            Это <em>концепт.</em>
          </h2>
          <p>
            «Точка опоры» и адвокат Н. — вымышленные образы для портфолио
            веб-студии. Они не представляют действующего адвоката или
            адвокатское образование.
          </p>
          <p>
            Тексты показывают возможную структуру сайта. Здесь нет
            подтверждённых профессиональных сведений, адресов, реестровых
            номеров, отзывов или результатов дел. Материалы не являются
            юридической консультацией.
          </p>
          <p>
            В демоформе можно выбрать только готовые варианты. Они не передаются
            и не сохраняются. При перезагрузке выбор сбрасывается. На сайте нет
            аналитики и cookie. Хостинг может обрабатывать технические журналы
            запросов по собственным правилам.
          </p>
          <button
            className="button rust"
            onClick={() => dialog.current?.close()}
          >
            Понятно, закрыть <span aria-hidden="true">×</span>
          </button>
        </div>
      </dialog>
    </>
  );
}
