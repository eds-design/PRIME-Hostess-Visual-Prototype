import { useMemo, useState, type FormEvent, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ArrowUpRight, CalendarDays, Check, ChevronDown, Instagram, Linkedin, Mail, MapPin, Menu, Phone, X } from 'lucide-react';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';
import NotFound from '@/pages/not-found';

const queryClient = new QueryClient();

const navItems = [
  ['Начало', 'hero'],
  ['За нас', 'about'],
  ['Услуги', 'services'],
  ['Профили', 'profiles'],
  ['Портфолио', 'portfolio'],
  ['FAQ', 'faq'],
];

const services = [
  ['01', 'Хостеси', 'Посрещане, регистрация, гардероб, ориентация и грижа за всеки гост.', 'Гости'],
  ['02', 'Хостове', 'Уверено представяне на програма, публика и ключови моменти.', 'Гости'],
  ['03', 'Промоутъри', 'Енергична и ясна връзка между хората, продукта и мястото.', 'Активирации'],
  ['04', 'Brand Ambassadors', 'Лица, които разбират историята на бранда и я разказват убедително.', 'Бранд'],
  ['05', 'Exhibition Staff', 'Професионално присъствие на изложения, конгреси и корпоративни форуми.', 'Бизнес'],
  ['06', 'Automotive Staff', 'Екипи за премиери, тест драйвове, дилърски събития и активации.', 'Автомобили'],
  ['07', 'VIP & Private Events', 'Дискретно обслужване и безупречна грижа за специални гости.', 'Гости'],
];

const profiles = [
  ['Александра', 'Хостеса', 'Corporate / Automotive', '/images/prime-alexandra.jpg'],
  ['Виктор', 'Хост', 'Corporate / Events', '/images/prime-bmw.jpg'],
  ['Мария', 'Brand Ambassador', 'Luxury / Retail', '/images/prime-registration.jpg'],
  ['Димитър', 'Хост', 'Automotive / VIP', '/images/prime-bmw.jpg'],
  ['Симона', 'Хостеса', 'Exhibitions / Gala', '/images/prime-alexandra.jpg'],
  ['Николай', 'Промоутър', 'Technology / Sport', '/images/prime-registration.jpg'],
];

const faqs = [
  ['Колко време предварително да направим запитване?', 'Обичайно работим най-добре с две до четири седмици за подготовка. Ако събитието е по-близо, пишете ни — ще проверим наличностите и ще кажем честно какво е възможно.'],
  ['Подбирате ли екипа според конкретния бриф?', 'Да. Не изпращаме един и същ профил навсякъде. Съобразяваме хората с аудиторията, атмосферата, ролите, езиците и темпото на конкретния формат.'],
  ['Работите ли извън София?', 'Да, организираме екипи в цялата страна. В запитването добавете локация, часови диапазон и очакван брой гости, за да подготвим точна следваща стъпка.'],
  ['Мога ли да получа реални профили преди потвърждение?', 'След кратък бриф изпращаме подбрана селекция с актуална информация за опит и наличност. Профилите на тази страница са демонстрационни и служат само за ориентация.'],
  ['Какво се случва след изпращане на формата?', 'Отговаряме с уточняващи въпроси и предложение за разговор. Изпращането на запитване не създава ангажимент и не потвърждава резервация.'],
];

function scrollToId(id: string, close?: () => void) {
  close?.();
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function Brand() {
  return (
    <a className="brand" href="#hero" aria-label="PRIME Hostess" data-testid="link-brand">
      <span className="brand-main">PRIME</span>
      <span className="brand-sub">HOSTESS</span>
    </a>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <nav className="nav" aria-label="Основна навигация">
        {navItems.slice(0, 4).map(([label, id]) => (
          <a key={id} href={`#${id}`} className="nav-link" data-testid={`link-nav-${id}`}>{label}</a>
        ))}
      </nav>
      <Brand />
      <nav className="nav right" aria-label="Вторична навигация">
        {navItems.slice(4).map(([label, id]) => (
          <a key={id} href={`#${id}`} className="nav-link" data-testid={`link-nav-${id}`}>{label}</a>
        ))}
        <a href="#contact" className="nav-link" data-testid="link-nav-contact">Контакти</a>
      </nav>
      <button className="menu-toggle" onClick={() => setOpen((value) => !value)} aria-label={open ? 'Затвори менюто' : 'Отвори менюто'} data-testid="button-mobile-menu">
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>
      {open && (
        <div className="mobile-panel">
          {navItems.map(([label, id]) => (
            <a key={id} href={`#${id}`} className="nav-link" onClick={() => setOpen(false)} data-testid={`link-mobile-${id}`}>{label}</a>
          ))}
          <a href="#contact" className="nav-link" onClick={() => setOpen(false)} data-testid="link-mobile-contact">Контакти</a>
        </div>
      )}
    </header>
  );
}

function Button({ children, href, onClick, ghost = false, type = 'button' }: { children: ReactNode; href?: string; onClick?: () => void; ghost?: boolean; type?: 'button' | 'submit' }) {
  const className = `button${ghost ? ' ghost' : ''}`;
  if (href) return <a className={className} href={href} onClick={onClick} data-testid={`link-action-${href.replace('#', '')}`}>{children}<ArrowUpRight size={14} /></a>;
  return <button className={className} type={type} onClick={onClick} data-testid={`button-action-${String(children).slice(0, 12)}`}>{children}<ArrowUpRight size={14} /></button>;
}

function Footer() {
  return (
    <footer className="footer">
      <div className="prime-container">
        <div className="footer-grid">
          <div>
            <Brand />
            <p>Хората зад събитието. Подбрани, подготвени и присъстващи с причина.</p>
            <div className="socials">
              <a href="https://www.instagram.com/" aria-label="Instagram" data-testid="link-instagram"><Instagram size={14} /></a>
              <a href="https://www.linkedin.com/" aria-label="LinkedIn" data-testid="link-linkedin"><Linkedin size={14} /></a>
            </div>
          </div>
          <div>
            <h3>Навигация</h3>
            <nav>{navItems.map(([label, id]) => <a href={`#${id}`} key={id} data-testid={`link-footer-${id}`}>{label}</a>)}</nav>
          </div>
          <div>
            <h3>За брандове</h3>
            <nav>
              <a href="#services" data-testid="link-footer-services">Услуги и формати</a>
              <a href="#portfolio" data-testid="link-footer-portfolio">Демонстрационни проекти</a>
              <a href="#contact" data-testid="link-footer-contact">Направете запитване</a>
            </nav>
          </div>
          <div>
            <h3>За хората</h3>
            <nav>
              <a href="#profiles" data-testid="link-footer-profiles">Разгледайте профили</a>
              <a href="#contact" data-testid="link-footer-team">Стани част от екипа</a>
              <a href="#faq" data-testid="link-footer-faq">Често задавани въпроси</a>
            </nav>
          </div>
        </div>
        <div className="footer-bottom">
          <span>PRIME Hostess · Brandit Solution</span>
          <span>© 2026 · София, България</span>
        </div>
      </div>
    </footer>
  );
}

function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="prime-container">
        <div className="hero-content">
          <div className="eyebrow reveal">PRIME HOSTESS · BRANDIT SOLUTION</div>
          <h1 className="display hero-title reveal delay-1">Правилните хора<br />за всяко събитие</h1>
          <p className="hero-lead reveal delay-2">Подбираме и подготвяме професионалисти, които превръщат присъствието на вашия бранд в преживяване.</p>
          <div className="hero-actions reveal delay-3">
            <Button href="#contact">Направете запитване</Button>
            <span className="hero-kicker">Every event. The right people.</span>
          </div>
        </div>
      </div>
      <div className="scroll-mark">Scroll to discover</div>
    </section>
  );
}

function Services() {
  const [category, setCategory] = useState('Всички');
  const categories = ['Всички', 'Гости', 'Бранд', 'Автомобили', 'Бизнес', 'Активирации'];
  const shown = category === 'Всички' ? services : services.filter((service) => service[3] === category);
  return (
    <section className="section" id="services">
      <div className="prime-container">
        <div className="section-heading">
          <div><div className="eyebrow">С какво помагаме</div><h2 className="display">Събитието започва<br />преди първия гост.</h2></div>
          <p className="section-intro">От първото посрещане до последния детайл зад кулисите — екипът ни знае как да бъде видим, когато е важно, и невидим, когато трябва.</p>
        </div>
        <div className="filterbar" aria-label="Филтри за услуги">
          {categories.map((item) => <button key={item} className={`filter ${category === item ? 'active' : ''}`} onClick={() => setCategory(item)} data-testid={`button-service-filter-${item}`}>{item}</button>)}
        </div>
        <div className="service-list">
          {shown.map(([number, title, copy]) => (
            <article className="service-item" key={number} data-testid={`card-service-${number}`}>
              <span className="service-index">{number}</span>
              <div><strong className="service-title">{title}</strong><p className="service-copy">{copy}</p></div>
              <ArrowUpRight className="service-arrow" size={20} />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <>
      <section className="section quiet" id="about">
        <div className="prime-container split">
          <div className="media" style={{ backgroundImage: "url('/images/prime-registration.jpg')" }} role="img" aria-label="Хостеса посреща гост на регистрация" data-testid="img-registration" />
          <div className="copy">
            <div className="eyebrow">Нашият стандарт</div>
            <h2 className="display">Професионализмът се усеща.</h2>
            <div className="rule" />
            <p>Красивото присъствие е само началото. Нашите хора разбират контекста на събитието, следват брифа и остават спокойни, когато темпото се ускори.</p>
            <p>Вниманието към гостите не е заучен жест — то е отношение. PRIME Hostess е новото лице на опита, натрупан от Brandit Solution в повече от десет години работа с брандове и хора.</p>
            <div className="stats">
              <div className="stat"><strong>10+</strong><span>години опит</span></div>
              <div className="stat"><strong>500+</strong><span>демо проекта</span></div>
              <div className="stat"><strong>1</strong><span>точен екип</span></div>
            </div>
            <p className="demo-note">Демонстрационни данни за прототипа</p>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="prime-container">
          <div className="section-heading">
            <div><div className="eyebrow">Как работим</div><h2 className="display">От бриф<br />до резултат.</h2></div>
            <p className="section-intro">Ясен процес, един отговорен партньор и екип, който знае защо е там.</p>
          </div>
          <div className="process">
            {[
              ['01', 'Разбираме', 'Влизаме в контекста на събитието и целите на бранда.'],
              ['02', 'Селектираме', 'Подбираме точните хора за аудиторията и формата.'],
              ['03', 'Подготвяме', 'Брифинг, визия, роли и детайли преди деня.'],
              ['04', 'Координираме', 'Присъстваме на място и следим всичко да върви.'],
              ['05', 'Отчитаме', 'Събираме обратна връзка и затваряме проекта.'],
            ].map(([number, title, copy]) => <div className="process-item" key={number}><span className="service-index">{number}</span><strong>{title}</strong><p>{copy}</p></div>)}
          </div>
        </div>
      </section>
    </>
  );
}

function Profiles() {
  const [filter, setFilter] = useState('ВСИЧКИ');
  const filters = ['ВСИЧКИ', 'ХОСТЕСИ', 'ХОСТОВЕ', 'ПРОМОУТЪРИ', 'BRAND AMBASSADORS'];
  const profileFilterMap: Record<string, string> = { 'ХОСТЕСИ': 'ХОСТЕСА', 'ХОСТОВЕ': 'ХОСТ', 'ПРОМОУТЪРИ': 'ПРОМОУТЪР', 'BRAND AMBASSADORS': 'BRAND AMBASSADOR' };
  const shown = useMemo(() => filter === 'ВСИЧКИ' ? profiles : profiles.filter((profile) => profile[1].toUpperCase() === profileFilterMap[filter]), [filter]);
  return (
    <section className="section quiet" id="profiles">
      <div className="prime-container">
        <div className="section-heading">
          <div><div className="eyebrow">Демонстрационна селекция</div><h2 className="display">Точният човек<br />за вашата сцена.</h2></div>
          <p className="section-intro">Показваме хората през техните умения, езиците и средата, в която работят най-добре. Реалният подбор започва с вашия бриф.</p>
        </div>
        <div className="filterbar">
          {filters.map((item) => <button key={item} className={`filter ${filter === item ? 'active' : ''}`} onClick={() => setFilter(item)} data-testid={`button-profile-filter-${item}`}>{item}</button>)}
        </div>
        <div className="profiles-layout">
          <div className="copy">
            <div className="eyebrow">Селекция с мисъл</div>
            <h2 className="display">Не просто лице. Част от преживяването.</h2>
            <p>Всеки проект получава селекция, съобразена с неговата публика. Профилите по-долу са демонстрационни и не представляват потвърдена наличност.</p>
            <Button href="#contact">Поискайте селекция</Button>
          </div>
          <div className="profile-grid">
            {shown.length ? shown.map(([name, role, tag, photo]) => (
              <article className="profile-card" key={name} data-testid={`card-profile-${name}`}>
                <div className="profile-photo" style={{ backgroundImage: `url('${photo}')` }} role="img" aria-label={`${name}, демонстрационен профил`} />
                <div className="profile-body"><h3>{name}</h3><p>{role} · {tag}</p><a href="#contact" className="profile-link" data-testid={`link-profile-${name}`}>Поискайте профил <ArrowUpRight size={12} /></a></div>
              </article>
            )) : <div className="empty-state">В тази категория няма демонстрационни профили.</div>}
          </div>
        </div>
      </div>
    </section>
  );
}

function Portfolio() {
  const projects = [
    ['BMW Brand Experience', 'Автомобилно събитие · София · 2026', '/images/prime-bmw.jpg', 'tall'],
    ['Corporate Registration', 'Корпоративен форум · София', '/images/prime-registration.jpg', ''],
    ['Premium Guest Experience', 'VIP вечер · София', '/images/prime-hero.jpg', ''],
    ['Brand in Motion', 'Активиране на бранд · 2025', '/images/prime-alexandra.jpg', 'wide'],
  ];
  return (
    <>
      <section className="section" id="portfolio">
        <div className="prime-container">
          <div className="section-heading">
            <div><div className="eyebrow">Демонстрационно портфолио</div><h2 className="display">Реални моменти.<br />Реални екипи.</h2></div>
            <p className="section-intro">Всяко събитие има различна задача. Общото е стандартът, с който я изпълняваме.</p>
          </div>
          <div className="portfolio-grid">
            {projects.map(([title, meta, image, size]) => <a href="#contact" className={`project ${size}`} style={{ backgroundImage: `url('${image}')` }} key={title} data-testid={`link-project-${title}`}><div><div className="eyebrow">{meta}</div><h3>{title}</h3><p>Разкажете ни за вашия формат <ArrowUpRight size={12} /></p></div></a>)}
          </div>
          <p className="demo-note">Илюстративни демонстрационни проекти · Част от изображенията са концептуални</p>
        </div>
      </section>
      <section className="belief">
        <div className="prime-container belief-inner">
          <div className="eyebrow">Нашето убеждение</div>
          <h2 className="display">Гостът усеща, когато детайлът е обмислен.</h2>
          <p>Затова изграждаме процес, който дава спокойствие на домакините и естествено внимание на хората в залата. Добрата работа не иска прожектор — тя се вижда по лицата.</p>
        </div>
      </section>
    </>
  );
}

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="section" id="faq">
      <div className="prime-container faq-layout">
        <div><div className="eyebrow">Имате въпроси</div><h2 className="display" style={{ fontSize: 'clamp(45px, 5.5vw, 73px)', margin: '17px 0 23px' }}>Ясно още<br />преди старта.</h2><p className="muted">Няколко кратки отговора за начина, по който работим. Не откривате своето? Пишете ни.</p><Button href="#contact">Задайте въпрос</Button></div>
        <div className="faq-list">
          {faqs.map(([question, answer], index) => (
            <div className="faq-row" key={question}>
              <button className={`faq-question ${open === index ? 'open' : ''}`} onClick={() => setOpen(open === index ? null : index)} aria-expanded={open === index} data-testid={`button-faq-${index}`}><span>{question}</span><ChevronDown size={19} /></button>
              {open === index && <div className="faq-answer" data-testid={`text-faq-answer-${index}`}>{answer}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', date: '', location: '', type: '', details: '' });
  function update(field: keyof typeof form, value: string) { setForm((current) => ({ ...current, [field]: value })); }
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }
  return (
    <section className="section quiet" id="contact">
      <div className="prime-container contact-grid">
        <div className="copy">
          <div className="eyebrow">Следващата стъпка</div>
          <h2 className="display">Разкажете ни за вашето събитие.</h2>
          <p>Ще се върнем към вас с въпроси, идея и следваща стъпка. Без готови пакети и без излишен шум.</p>
          <div className="rule" />
          <div className="contact-meta">
            <div className="contact-line"><MapPin size={16} /> София и цяла България</div>
            <div className="contact-line"><Mail size={16} /> hello@primehostess.bg</div>
            <div className="contact-line"><Phone size={16} /> +359 888 000 000</div>
            <div className="contact-line"><CalendarDays size={16} /> Понеделник – Петък · 09:00 – 18:00</div>
          </div>
        </div>
        <div>
          {sent ? (
            <div className="success-card" data-testid="status-inquiry-success">
              <Check size={22} color="var(--oxide)" />
              <div className="eyebrow" style={{ marginTop: 20 }}>Запитването е изпратено</div>
              <h2 className="display">Ще се свържем с вас.</h2>
              <p className="muted">Благодарим, че ни разказахте за проекта. Това е демонстрационна форма — в реална среда съобщението ще бъде изпратено до екипа.</p>
              <Button onClick={() => { setSent(false); setForm({ name: '', email: '', phone: '', date: '', location: '', type: '', details: '' }); }}>Ново запитване</Button>
            </div>
          ) : (
            <form className="form" onSubmit={submit}>
              <div className="field"><label htmlFor="name">Име / Компания</label><input id="name" required value={form.name} onChange={(e) => update('name', e.target.value)} placeholder="Как да ви наричаме?" data-testid="input-inquiry-name" /></div>
              <div className="field"><label htmlFor="email">Имейл</label><input id="email" type="email" required value={form.email} onChange={(e) => update('email', e.target.value)} placeholder="name@company.com" data-testid="input-inquiry-email" /></div>
              <div className="field"><label htmlFor="phone">Телефон</label><input id="phone" value={form.phone} onChange={(e) => update('phone', e.target.value)} placeholder="+359" data-testid="input-inquiry-phone" /></div>
              <div className="field"><label htmlFor="date">Дата на събитието</label><input id="date" value={form.date} onChange={(e) => update('date', e.target.value)} placeholder="ДД / ММ / ГГГГ" data-testid="input-inquiry-date" /></div>
              <div className="field"><label htmlFor="location">Град / Локация</label><input id="location" value={form.location} onChange={(e) => update('location', e.target.value)} placeholder="София" data-testid="input-inquiry-location" /></div>
              <div className="field"><label htmlFor="type">Тип събитие</label><select id="type" value={form.type} onChange={(e) => update('type', e.target.value)} required data-testid="select-inquiry-type"><option value="" disabled>Изберете формат</option><option>Корпоративно</option><option>Автомобилно</option><option>Изложение</option><option>VIP / Private</option><option>Друго</option></select></div>
              <div className="field full"><label htmlFor="details">Брой хора / детайли</label><textarea id="details" required value={form.details} onChange={(e) => update('details', e.target.value)} placeholder="Разкажете ни за задачата..." data-testid="textarea-inquiry-details" /></div>
              <Button type="submit">Изпрати запитване</Button>
              <p className="form-note">С изпращането на формата не се създава ангажимент.</p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Home() {
  return (
    <div className="prime-page">
      <Header />
      <main>
        <Hero />
        <Services />
        <About />
        <div className="marquee" aria-label="Prime Hostess values"><div className="marquee-track"><span>WELCOME WITH PURPOSE</span><em>·</em><span>REPRESENT WITH CONFIDENCE</span><em>·</em><span>MAKE IT MEMORABLE</span><em>·</em><span>WELCOME WITH PURPOSE</span><em>·</em><span>REPRESENT WITH CONFIDENCE</span><em>·</em></div></div>
        <Profiles />
        <Portfolio />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;