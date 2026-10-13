/* ===== A. Compteurs animés (hero) =====
   Les vrais chiffres sont déjà dans le HTML. Le JS les fait juste "monter" depuis 0. */
document.querySelectorAll('[data-count]').forEach(el => {
  const target = parseFloat(el.dataset.count);
  const dec = parseInt(el.dataset.dec || '0', 10);
  const suffix = el.dataset.suffix || '';
  const duration = 1400;
  let start = null;

  function tick(now) {
    if (start === null) start = now;                         // 1er frame = départ
    const p = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3);                    // ralentit à la fin
    el.textContent = (target * eased).toLocaleString('en-US', {
      minimumFractionDigits: dec,
      maximumFractionDigits: dec
    }) + suffix;
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
});

/* ===== B. Filtres de projets ===== */
const buttons = document.querySelectorAll('.filters button');
const projects = document.querySelectorAll('.project');

buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    buttons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;                       // all, health, dashboard, ml
    projects.forEach(card => {
      const cats = card.dataset.cat.split(' ');              // ex: ["health", "ml"]
      const show = filter === 'all' || cats.includes(filter);
      card.classList.toggle('hide', !show);
    });
  });
});
