// The scroll position drives one pinned stage, then returns to normal page flow.
export function createIntroStory(gsap, ScrollTrigger) {
  const hero = document.querySelector('.hero');
  const scenes = [...hero.querySelectorAll('.hero-scene')];
  const copies = scenes.map(scene => scene.querySelector('.hero-copy'));
  const controls = hero.querySelector('.intro-progress');
  const count = hero.querySelector('.intro-progress-count');
  const track = hero.querySelector('.intro-progress-track span');
  const headerHeight = () => parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header'));
  // Extremely short landscape screens retain the readable, natural fallback.
  if (window.innerHeight - headerHeight() < 470) return () => {};
  hero.classList.add('is-pinned-story');
  controls.hidden = false;
  gsap.set(scenes[1], { autoAlpha: 1, clipPath: 'inset(0% 100% 0% 0%)' });
  gsap.set(scenes[2], { autoAlpha: 1, clipPath: 'inset(0% 0% 0% 100%)' });
  gsap.set(copies[1], { xPercent: -14, opacity: 0 });
  gsap.set(copies[2], { xPercent: 14, opacity: 0 });
  let active = -1;
  const setActive = (index) => {
    if (index === active) return;
    active = index;
    hero.dataset.activeScene = String(index + 1);
    count.textContent = `0${index + 1} / 03`;
    scenes.forEach((scene, i) => {
      scene.inert = i !== index;
      scene.setAttribute('aria-hidden', String(i !== index));
    });
  };
  setActive(0);
  const timeline = gsap.timeline({
    defaults: { ease: 'power2.inOut' },
    onUpdate() {
      const time = this.time();
      setActive(time < 0.605 ? 0 : time < 1.675 ? 1 : 2);
      track.style.transform = `scaleX(${this.progress()})`;
    },
    scrollTrigger: {
      trigger: hero, start: () => `top top+=${headerHeight()}`,
      end: () => `+=${Math.round(window.innerHeight * 1.5)}`,
      pin: true, scrub: 0.7, anticipatePin: 1, invalidateOnRefresh: true,
      snap: { snapTo: [0, 0.5, 1], duration: 0.45, delay: 0.12, ease: 'power2.inOut', inertia: false },
    },
  });
  // Alternate horizontal directions. Let the outgoing copy fade before the
  // incoming copy appears, so the two headlines never overlap visibly.
  timeline.to(copies[0], { xPercent: 14, opacity: 0, duration: 0.28 }, 0.18)
    .to(scenes[1], { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.85 }, 0.18)
    .to(copies[1], { xPercent: 0, opacity: 1, duration: 0.65 }, 0.4)
    .set(scenes[0], { autoAlpha: 0 }, 1.05)
    .to(copies[1], { xPercent: -14, opacity: 0, duration: 0.28 }, 1.25)
    .to(scenes[2], { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.85 }, 1.25)
    .to(copies[2], { xPercent: 0, opacity: 1, duration: 0.65 }, 1.47)
    .set(scenes[1], { autoAlpha: 0 }, 2.12)
    .to({}, { duration: 0.18 }, 2.12);
  // A keyboard user can reach the following section without tabbing through
  // an inactive scene, using the persistent skip link.
  return () => {
    hero.classList.remove('is-pinned-story');
    delete hero.dataset.activeScene;
    controls.hidden = true;
    track.style.removeProperty('transform');
    scenes.forEach(scene => { scene.inert = false; scene.removeAttribute('aria-hidden'); });
  };
}
