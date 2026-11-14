
// ELEMENTOS PRINCIPALES
const progress = document.getElementById('progress');
const nav = document.getElementById('nav');
const menuToggle = document.getElementById('menuToggle');

// BARRA DE PROGRESO
function updateProgress() {
  const scrollable =
    document.documentElement.scrollHeight - window.innerHeight;

  const percent = scrollable > 0
    ? (window.scrollY / scrollable) * 100
    : 0;

  progress.style.width = `${percent}%`;
}

window.addEventListener('scroll', updateProgress, {
  passive: true
});

updateProgress();

// MENÚ PARA CELULARES
menuToggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');

  menuToggle.setAttribute(
    'aria-expanded',
    String(isOpen)
  );

  menuToggle.textContent = isOpen ? '×' : '☰';
});

// CERRAR MENÚ AL SELECCIONAR UNA SECCIÓN
nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');

    menuToggle.setAttribute(
      'aria-expanded',
      'false'
    );

    menuToggle.textContent = '☰';
  });
});

// ANIMACIONES AL DESPLAZARSE
const revealTargets = document.querySelectorAll(
  '.section, .location-section, .impact-section, .prevention, .closing, .sources'
);

revealTargets.forEach(element => {
  element.classList.add('reveal');
});

const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');

        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12
  }
);

revealTargets.forEach(element => {
  revealObserver.observe(element);
});

// CONTADORES ANIMADOS
const counters = document.querySelectorAll('[data-count]');

const counterObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const element = entry.target;
      const target = Number(element.dataset.count);

      const duration = 1300;
      const start = performance.now();

      function tick(now) {
        const progress = Math.min(
          (now - start) / duration,
          1
        );

        const eased = 1 - Math.pow(1 - progress, 3);

        element.textContent = Math.round(
          target * eased
        );

        if (progress < 1) {
          requestAnimationFrame(tick);
        }
      }

      requestAnimationFrame(tick);

      counterObserver.unobserve(element);
    });
  },
  {
    threshold: 0.6
  }
);

counters.forEach(counter => {
  counterObserver.observe(counter);
});

// IDENTIFICAR LA SECCIÓN ACTIVA EN EL MENÚ
const sections = document.querySelectorAll(
  'main section[id]'
);

const sectionObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {

        nav.querySelectorAll('a').forEach(link => {

          link.classList.toggle(
            'active',
            link.getAttribute('href') ===
            `#${entry.target.id}`
          );

        });

      }
    });
  },
  {
    rootMargin: '-35% 0px -55% 0px'
  }
);

sections.forEach(section => {
  sectionObserver.observe(section);
});
