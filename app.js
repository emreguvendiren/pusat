import { createQuoteUrl } from './quote.js';
import { createIntroStory } from './intro-story.js';

const menuButton = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('#mobile-menu');
const desktop = window.matchMedia('(min-width: 960px)');

function setMenu(open, restoreFocus = false) {
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Menüyü kapat' : 'Menüyü aç');
  mobileMenu.hidden = !open;
  document.body.classList.toggle('menu-open', open);
  if (restoreFocus) menuButton.focus();
}

setMenu(false);
menuButton.addEventListener('click', () => {
  const open = mobileMenu.hidden;
  setMenu(open);
  if (open) mobileMenu.querySelector('a').focus();
});
mobileMenu.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', (event) => {
  if (mobileMenu.hidden) return;
  if (event.key === 'Escape') {
    event.preventDefault();
    setMenu(false, true);
  }
  if (event.key !== 'Tab') return;
  const focusable = [menuButton, ...mobileMenu.querySelectorAll('a')];
  const first = focusable[0];
  const last = focusable.at(-1);
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault(); last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault(); first.focus();
  }
});
desktop.addEventListener('change', () => { if (desktop.matches) setMenu(false); });

document.querySelector('#year').textContent = new Intl.DateTimeFormat('tr-TR', {
  year: 'numeric', timeZone: 'Europe/Istanbul',
}).format(new Date());

const form = document.querySelector('#quote-form');
const status = document.querySelector('#form-status');
const preparedLink = document.querySelector('#prepared-message');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  try {
    const fields = Object.fromEntries(new FormData(form));
    const url = createQuoteUrl(fields);
    preparedLink.href = url;
    preparedLink.hidden = false;
    status.hidden = false;
    status.textContent = 'Mesaj taslağı hazır. Gönderimi WhatsApp üzerinden tamamlayabilirsiniz.';
    // User-triggered navigation only. Opening a draft does not send a message.
    window.open(url, '_blank', 'noopener,noreferrer');
  } catch (error) {
    preparedLink.hidden = true;
    status.hidden = false;
    status.textContent = error.message;
  }
});
form.addEventListener('input', () => {
  preparedLink.hidden = true;
  status.hidden = true;
});
form.querySelector('button[type="submit"]').disabled = false;

const navLinks = [...document.querySelectorAll('.desktop-nav a')];
const observedSections = navLinks.map((link) => document.querySelector(link.hash));
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      navLinks.forEach((link) => {
        if (link.hash === `#${entry.target.id}`) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    }
  }, { rootMargin: '-20% 0px -55% 0px', threshold: 0 });
  observedSections.forEach((section) => observer.observe(section));
}

// All content remains visible when GSAP is unavailable or motion is reduced.
const { gsap, ScrollTrigger } = window;
if (gsap && ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);
  const media = gsap.matchMedia();
  const pictures = [...document.querySelectorAll('.equipment-image')];
  const chapters = [...document.querySelectorAll('.equipment-chapter')];
  const progress = [...document.querySelectorAll('.scene-progress > span')];
  const labels = ['Kamyon üzeri vinç', 'Bom erişimi', 'Şantiye çalışması'];

  const showScene = (index) => {
    pictures.forEach((picture, i) => { picture.hidden = i !== index; });
    progress.forEach((segment, i) => segment.classList.toggle('is-active', i === index));
    chapters.forEach((chapter, i) => chapter.classList.toggle('is-current', i === index));
    document.querySelector('#scene-caption').textContent = labels[index];
    document.querySelector('#scene-count').textContent = `0${index + 1} / 03`;
  };

  media.add({
    desktop: '(min-width: 960px)',
    mobile: '(max-width: 959px)',
    tallDesktop: '(min-width: 960px) and (min-height: 558px)',
    tallTablet: '(min-width: 768px) and (max-width: 959px) and (min-height: 546px)',
    tallPhone: '(max-width: 767px) and (min-height: 540px)',
    motion: '(prefers-reduced-motion: no-preference)',
  }, (context) => {
    const { desktop: isDesktop, motion } = context.conditions;
    if (!motion) { showScene(0); return; }

    const cleanupIntro = createIntroStory(gsap, ScrollTrigger);
    gsap.from('[data-intro-scene="0"] h1, [data-intro-scene="0"] .hero-copy > p, [data-intro-scene="0"] .hero-actions', {
      y: 28, opacity: 0, stagger: 0.11, duration: 0.8, ease: 'power2.out',
      clearProps: 'all',
    });
    // Pin the visual while the three adjacent chapters continue naturally.
    if (isDesktop) {
      ScrollTrigger.create({
        trigger: '.equipment-story', pin: '.equipment-visual', start: 'top 115px',
        end: 'bottom bottom-=50px', pinSpacing: false, invalidateOnRefresh: true,
      });
      chapters.forEach((chapter, index) => {
        ScrollTrigger.create({
          trigger: chapter, start: 'top center', end: 'bottom center',
          onEnter: () => showScene(index), onEnterBack: () => showScene(index),
        });
      });
    } else {
      showScene(0);
    }
    document.querySelectorAll('.services .heading-row, .gallery .heading-row, .process-list li').forEach((element) => {
      gsap.from(element, { y: 24, opacity: 0, duration: 0.7, ease: 'power2.out',
        scrollTrigger: { trigger: element, start: 'top 92%', once: true }, clearProps: 'all' });
    });
    return () => { cleanupIntro(); showScene(0); };
  });
  document.fonts.ready.then(() => ScrollTrigger.refresh());
  window.addEventListener('load', () => ScrollTrigger.refresh(), { once: true });
  document.querySelectorAll('.equipment-image').forEach((image) => {
    if (!image.complete) image.addEventListener('load', () => ScrollTrigger.refresh(), { once: true });
  });
}
