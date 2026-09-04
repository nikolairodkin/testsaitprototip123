/* ============================================================
   ФИНАНСОВЫЙ КОНСАЛТИНГ — ЛЕНДИНГ-ПРОТОТИП
   script.js

   ВНИМАНИЕ: ВСЕ ЗАМЕНЯЕМЫЕ ДАННЫЕ (ЗАГЛУШКИ) СОБРАНЫ
   В ОБЪЕКТЕ CONFIG НИЖЕ. Меняйте только его — HTML трогать не нужно.
   ============================================================ */

const CONFIG = {

  /* --- БРЕНД (ЗАГЛУШКА) --- */
  brand: {
    name: '[НАЗВАНИЕ ПРОЕКТА]',
    requisites: '[ООО «НАЗВАНИЕ» · ИНН 0000000000 · ОГРН 0000000000000]'
  },

  /* --- КОНТАКТЫ (ЗАГЛУШКА) --- */
  contacts: {
    phone:     '[+7 (000) 000-00-00]',
    phoneHref: 'tel:+70000000000',
    email:     '[email@example.ru]',
    emailHref: 'mailto:email@example.ru',
    whatsapp:  '[+7 (000) 000-00-00]',
    whatsappHref: 'https://wa.me/70000000000',
    telegram:  '[@username]',
    telegramHref: 'https://t.me/username',
    max:       '[+7 (000) 000-00-00]',
    maxHref:   '#'
  },

  /* --- ЦИФРЫ HERO (ЗАГЛУШКА) --- */
  hero: {
    stats: [
      { value: 'N',     label: 'реализованных проектов', accent: false },
      { value: 'X',     label: 'отраслей', accent: false },
      { value: 'XX%',   label: 'средний рост чистой прибыли', accent: true }
    ]
  },

  /* --- 4-Й ЭТАП РАБОТЫ (ЗАГЛУШКА) --- */
  /* Кандидаты: «Сопровождение и контроль результата» / «Масштабирование» / «Регулярная аналитика» */
  stage4: {
    title: '[РЕЗЕРВ — НАЗВАНИЕ ЭТАПА]',
    text:  'Заглушка. Кандидаты: сопровождение и контроль результата / масштабирование / регулярная аналитика.'
  },

  /* --- КЕЙСЫ (ЗАГЛУШКА: все цифры условные) --- */
  cases: [
    {
      industry: 'Производство',
      problem: 'Не было управленческого учёта, собственник не видел реальной себестоимости. Поставили учёт, нашли убыточную группу продукции.',
      resultLabel: 'Результат',
      resultValue: 'Чистая прибыль +XX% за N месяцев'
    },
    {
      industry: 'Оптовая торговля',
      problem: 'Учёт был, но рост упирался в закупки и оборачиваемость склада. Расшили узкое место.',
      resultLabel: 'Результат',
      resultValue: 'Маржинальность выросла с XX% до YY%'
    },
    {
      industry: 'Услуги',
      problem: 'Высокая выручка при низкой прибыли. Пересобрали ценообразование и загрузку.',
      resultLabel: 'Результат',
      resultValue: 'Выручка +XX%, чистая прибыль +YY%'
    }
  ],

  /* --- КОМАНДА, 4 человека (ЗАГЛУШКА) --- */
  team: [
    { name: '[Имя Фамилия]', role: '[Роль]', bio: '[Короткое описание опыта: специализация, отрасли, срок работы в профессии.]' },
    { name: '[Имя Фамилия]', role: '[Роль]', bio: '[Короткое описание опыта: специализация, отрасли, срок работы в профессии.]' },
    { name: '[Имя Фамилия]', role: '[Роль]', bio: '[Короткое описание опыта: специализация, отрасли, срок работы в профессии.]' },
    { name: '[Имя Фамилия]', role: '[Роль]', bio: '[Короткое описание опыта: специализация, отрасли, срок работы в профессии.]' }
  ],

  /* --- ОТЗЫВЫ (ЗАГЛУШКА) ---
     Реальных отзывов пока нет.
     showTestimonials: false — полностью скрыть секцию до сбора отзывов. */
  showTestimonials: true,
  testimonials: [
    { name: '[Имя Фамилия]', company: '[Компания]', date: '[Месяц 2026]', text: '[Текст отзыва: с какой задачей пришли, что сделали, какой результат получили.]' },
    { name: '[Имя Фамилия]', company: '[Компания]', date: '[Месяц 2026]', text: '[Текст отзыва: с какой задачей пришли, что сделали, какой результат получили.]' },
    { name: '[Имя Фамилия]', company: '[Компания]', date: '[Месяц 2026]', text: '[Текст отзыва: с какой задачей пришли, что сделали, какой результат получили.]' }
  ]
};

/* ============================================================
   Ниже — логика прототипа. Обычно править не нужно.
   ============================================================ */

(function () {
  'use strict';

  const $  = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  /* ---------- Подстановка простых значений из CONFIG по data-cfg ---------- */
  function getByPath(obj, path) {
    return path.split('.').reduce((acc, key) => (acc == null ? acc : acc[key]), obj);
  }

  function applyConfigBindings() {
    $$('[data-cfg]').forEach((el) => {
      const value = getByPath(CONFIG, el.dataset.cfg);
      if (value == null) return;
      const attr = el.dataset.cfgAttr;
      if (attr) el.setAttribute(attr, value);
      else el.textContent = value;
    });
    // Заголовок вкладки
    if (CONFIG.brand.name && !CONFIG.brand.name.startsWith('[')) {
      document.title = CONFIG.brand.name + ' — финансовый учёт и рост прибыли';
    }
  }

  /* ---------- Hero: цифры ---------- */
  function renderHeroStats() {
    const box = $('#heroStats');
    if (!box) return;
    box.innerHTML = CONFIG.hero.stats.map((s) => `
      <li class="hero__stat${s.accent ? ' is-accent' : ''}">
        <b>${s.value}</b>
        <span>${s.label}</span>
      </li>`).join('');
  }

  /* ---------- Кейсы ---------- */
  function renderCases() {
    const box = $('#casesGrid');
    if (!box) return;
    box.innerHTML = CONFIG.cases.map((c) => `
      <article class="card case reveal">
        <span class="case__industry">${c.industry}</span>
        <p class="case__problem">${c.problem}</p>
        <div class="case__result">
          <span class="case__result-label">${c.resultLabel}</span>
          <div class="case__result-value">${c.resultValue}</div>
        </div>
        <span class="tag tag--draft">ЗАГЛУШКА</span>
      </article>`).join('');
  }

  /* ---------- Команда ---------- */
  function renderTeam() {
    const box = $('#teamGrid');
    if (!box) return;
    const photoIcon = `
      <svg viewBox="0 0 24 24" width="34" height="34" fill="none">
        <circle cx="12" cy="8.5" r="3.6" stroke="currentColor" stroke-width="1.6"/>
        <path d="M4.5 20a7.5 7.5 0 0 1 15 0" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
      </svg>`;
    box.innerHTML = CONFIG.team.map((m) => `
      <article class="card member reveal">
        <div class="member__photo">${photoIcon}<span>Место под фото</span></div>
        <h3 class="member__name">${m.name}</h3>
        <p class="member__role">${m.role}</p>
        <p class="member__bio">${m.bio}</p>
        <span class="tag tag--draft">ЗАГЛУШКА</span>
      </article>`).join('');
  }

  /* ---------- Отзывы ---------- */
  function renderTestimonials() {
    const section = $('#testimonials');
    const box = $('#testimonialsGrid');
    if (!section || !box) return;

    // Секцию можно полностью выключить до сбора реальных отзывов
    if (!CONFIG.showTestimonials) { section.remove(); return; }

    box.innerHTML = CONFIG.testimonials.map((t) => `
      <article class="card testimonial reveal">
        <p class="testimonial__text">«${t.text}»</p>
        <div class="testimonial__author">
          <div class="testimonial__avatar" aria-hidden="true">?</div>
          <div>
            <div class="testimonial__name">${t.name}</div>
            <div class="testimonial__meta">${t.company} · ${t.date}</div>
          </div>
        </div>
      </article>`).join('');
  }

  /* ---------- Контакты в футере + соцсети ---------- */
  function renderFooterContacts() {
    const c = CONFIG.contacts;
    const list = $('#footerContacts');
    const icon = {
      mail: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none"><rect x="3" y="5" width="18" height="14" rx="2.5" stroke="currentColor" stroke-width="1.6"/><path d="m4 7 8 6 8-6" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>',
      wa:   '<svg viewBox="0 0 24 24" width="16" height="16" fill="none"><path d="M3.5 20.5 5 16.4A8.2 8.2 0 1 1 8 19.3l-4.5 1.2z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M9 9.2c.3 2 2 3.7 4 4.2l1-1.2 2 .9v1.4c-2.6.6-6.4-2.4-7.4-5.3L9 9.2z" fill="currentColor"/></svg>',
      tg:   '<svg viewBox="0 0 24 24" width="16" height="16" fill="none"><path d="M21 5 3.5 11.6l4.7 1.5L19 7l-8.4 8v4l2.6-3 4.2 3L21 5z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>',
      max:  '<svg viewBox="0 0 24 24" width="16" height="16" fill="none"><path d="M4 19V7l5 6 4-6 4 6 3-4v10" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
      phone:'<svg viewBox="0 0 24 24" width="16" height="16" fill="none"><path d="M6.5 3h3l1.5 4-2 1.5a12 12 0 0 0 6.5 6.5L17 13l4 1.5v3a2 2 0 0 1-2.2 2A17 17 0 0 1 4 5.2 2 2 0 0 1 6 3z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>'
    };

    if (list) {
      const rows = [
        { href: c.phoneHref,    text: c.phone,    ic: icon.phone, label: 'Телефон' },
        { href: c.emailHref,    text: c.email,    ic: icon.mail,  label: 'Почта' },
        { href: c.whatsappHref, text: c.whatsapp, ic: icon.wa,    label: 'WhatsApp' },
        { href: c.telegramHref, text: c.telegram, ic: icon.tg,    label: 'Telegram' },
        { href: c.maxHref,      text: c.max,      ic: icon.max,   label: 'MAX' }
      ];
      list.innerHTML = rows.map((r) => `
        <li><a href="${r.href}" aria-label="${r.label}">${r.ic}<span>${r.text}</span></a></li>`).join('');
    }

    const socials = $('#socials');
    if (socials) {
      socials.innerHTML = [
        { href: c.whatsappHref, ic: icon.wa,   label: 'WhatsApp' },
        { href: c.telegramHref, ic: icon.tg,   label: 'Telegram' },
        { href: c.maxHref,      ic: icon.max,  label: 'MAX' },
        { href: c.emailHref,    ic: icon.mail, label: 'Почта' }
      ].map((s) => `<a href="${s.href}" aria-label="${s.label}" title="${s.label}">${s.ic}</a>`).join('');
    }
  }

  /* ---------- Шапка: тень при скролле, бургер, активный пункт меню ---------- */
  function initHeader() {
    const header = $('#header');
    const nav = $('#nav');
    const burger = $('#burger');

    const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    burger.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', String(open));
    });

    // Закрываем мобильное меню после клика по ссылке
    $$('.nav__link', nav).forEach((link) => link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      burger.setAttribute('aria-expanded', 'false');
    }));

    // Подсветка текущей секции
    const links = $$('.nav__link');
    const sections = links
      .map((l) => document.querySelector(l.getAttribute('href')))
      .filter(Boolean);

    if ('IntersectionObserver' in window && sections.length) {
      const spy = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          links.forEach((l) => l.classList.toggle('is-active', l.getAttribute('href') === '#' + entry.target.id));
        });
      }, { rootMargin: '-45% 0px -50% 0px' });
      sections.forEach((s) => spy.observe(s));
    }
  }

  /* ---------- Плавное появление блоков при скролле ---------- */
  function initReveal() {
    const items = $$('.reveal');
    if (!('IntersectionObserver' in window)) {
      items.forEach((el) => el.classList.add('is-visible'));
      return;
    }
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    items.forEach((el, i) => {
      el.style.transitionDelay = (i % 4) * 70 + 'ms'; // лёгкий каскад внутри группы
      io.observe(el);
    });
  }

  /* ---------- Модальное окно ---------- */
  function initModal() {
    const modal = $('#modal');
    if (!modal) return;
    let lastFocused = null;

    const open = () => {
      lastFocused = document.activeElement;
      modal.hidden = false;
      document.body.classList.add('is-locked');
      const first = $('input', modal);
      if (first) setTimeout(() => first.focus(), 60);
    };

    const close = () => {
      modal.hidden = true;
      document.body.classList.remove('is-locked');
      if (lastFocused) lastFocused.focus();
    };

    $$('[data-open-modal]').forEach((b) => b.addEventListener('click', open));
    $$('[data-close-modal]', modal).forEach((b) => b.addEventListener('click', close));
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !modal.hidden) close();
    });
  }

  /* ---------- Формы: валидация и отправка (без бэкенда) ---------- */
  const PHONE_RE = /^\+?[\d\s()\-]{10,18}$/;

  function setError(field, message) {
    const wrap = field.closest('.field');
    const box = wrap ? wrap.querySelector('.field__error') : null;
    if (wrap) wrap.classList.toggle('has-error', Boolean(message));
    if (box) box.textContent = message || '';
  }

  function validateForm(form) {
    let ok = true;
    const name = form.elements.name;
    const phone = form.elements.phone;
    const consent = form.elements.consent;

    if (!name.value.trim()) { setError(name, 'Укажите имя'); ok = false; }
    else if (name.value.trim().length < 2) { setError(name, 'Слишком короткое имя'); ok = false; }
    else setError(name, '');

    const digits = phone.value.replace(/\D/g, '');
    if (!phone.value.trim()) { setError(phone, 'Укажите телефон'); ok = false; }
    else if (!PHONE_RE.test(phone.value.trim()) || digits.length < 10) { setError(phone, 'Проверьте формат: +7 (999) 123-45-67'); ok = false; }
    else setError(phone, '');

    if (!consent.checked) { setError(consent, 'Нужно согласие на обработку данных'); ok = false; }
    else setError(consent, '');

    return ok;
  }

  function initForms() {
    $$('.lead-form').forEach((form) => {
      const success = form.querySelector('[data-form-success]');

      // Снимаем ошибку по мере исправления
      ['input', 'change'].forEach((evt) => {
        form.addEventListener(evt, (e) => {
          const target = e.target;
          if (target.closest('.field.has-error')) setError(target, '');
        });
      });

      form.addEventListener('submit', (e) => {
        e.preventDefault(); // бэкенда нет

        if (!validateForm(form)) {
          const firstError = form.querySelector('.field.has-error input');
          if (firstError) firstError.focus();
          return;
        }

        const data = {
          form: form.id,
          name: form.elements.name.value.trim(),
          phone: form.elements.phone.value.trim(),
          consent: form.elements.consent.checked,
          sentAt: new Date().toISOString()
        };
        console.log('Заявка (прототип, данные никуда не отправляются):', data);

        form.reset();
        if (success) {
          success.hidden = false;
          setTimeout(() => { success.hidden = true; }, 5000);
        }
      });
    });
  }

  /* ---------- Плейсхолдерные ссылки не должны прыгать наверх ---------- */
  function initDraftLinks() {
    $$('a[data-draft]').forEach((a) => a.addEventListener('click', (e) => e.preventDefault()));
  }

  /* ---------- Запуск ---------- */
  document.addEventListener('DOMContentLoaded', () => {
    applyConfigBindings();
    renderHeroStats();
    renderCases();
    renderTeam();
    renderTestimonials();
    renderFooterContacts();
    initHeader();
    initModal();
    initForms();
    initDraftLinks();
    initReveal(); // последним: элементы уже отрисованы
  });
})();
