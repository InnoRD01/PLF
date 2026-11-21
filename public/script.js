// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile menu
const btn = document.querySelector('.menu-btn');
const links = document.getElementById('links');
btn.addEventListener('click', () => {
  const open = links.classList.toggle('open');
  btn.setAttribute('aria-expanded', open);
});
links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  links.classList.remove('open');
  btn.setAttribute('aria-expanded', 'false');
}));

// Count-up stats
const fmt = new Intl.NumberFormat('en');
const run = el => {
  const target = +el.dataset.count, suffix = el.dataset.suffix || '';
  const start = performance.now(), dur = 1400;
  const tick = now => {
    const p = Math.min((now - start) / dur, 1);
    el.textContent = fmt.format(Math.round(target * (1 - Math.pow(1 - p, 3)))) + (p === 1 ? suffix : '');
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
};
const counters = document.querySelectorAll('[data-count]');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries, o) => entries.forEach(e => {
    if (e.isIntersecting) { run(e.target); o.unobserve(e.target); }
  }), { threshold: 0.4 });
  counters.forEach(c => io.observe(c));
} else {
  counters.forEach(c => c.textContent = fmt.format(+c.dataset.count) + (c.dataset.suffix || ''));
}

// Contact form: opens the visitor's email app (static site, no backend).
// Change TO to PLF's real address.
const TO = 'info@example.org';
const form = document.getElementById('contact-form');
const status = form.querySelector('.form-status');
form.addEventListener('submit', e => {
  e.preventDefault();
  const d = new FormData(form);
  const name = (d.get('name') || '').trim(), email = (d.get('email') || '').trim(), msg = (d.get('message') || '').trim();
  if (!name || !/^\S+@\S+\.\S+$/.test(email) || !msg) {
    status.style.color = '#b00020';
    status.textContent = 'Please fill in all fields with a valid email.';
    return;
  }
  const subject = encodeURIComponent('PLF enquiry from ' + name);
  const body = encodeURIComponent(msg + '\n\n— ' + name + ' (' + email + ')');
  status.style.color = '#1b7a3a';
  status.textContent = 'Opening your email app…';
  window.location.href = 'mailto:' + TO + '?subject=' + subject + '&body=' + body;
});
