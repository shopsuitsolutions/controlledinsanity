function initAthletes(root) {
  const btn = root.querySelector('[data-athlete-load]');
  if (!btn) return;
  const cards = [...root.querySelectorAll('[data-athlete-card]')];
  const shownEl = root.querySelector('[data-athlete-shown]');
  const batch = parseInt(root.dataset.batch, 10) || 8;
  btn.addEventListener('click', () => {
    const hidden = cards.filter((c) => c.hasAttribute('hidden'));
    hidden.slice(0, batch).forEach((c) => c.removeAttribute('hidden'));
    const shown = cards.filter((c) => !c.hasAttribute('hidden')).length;
    if (shownEl) shownEl.textContent = shown;
    if (shown >= cards.length) {
      const wrap = btn.closest('.ci-athletes__more');
      if (wrap) wrap.remove();
    }
  });
}

document.querySelectorAll('.ci-athletes').forEach(initAthletes);
document.addEventListener('shopify:section:load', (e) => {
  e.target.querySelectorAll('.ci-athletes').forEach(initAthletes);
});
