function initBlog(root) {
  const grid = root.querySelector('[data-blog-grid]');
  if (!grid) return;
  const cards = [...grid.querySelectorAll('[data-blog-card]')];
  const tabs = [...root.querySelectorAll('.ci-blog__tab')];
  const sortSel = root.querySelector('[data-blog-sort]');
  const moreWrap = root.querySelector('[data-blog-more]');
  const loadBtn = root.querySelector('[data-blog-load]');
  const shownEl = root.querySelector('[data-blog-shown]');
  const totalEl = root.querySelector('[data-blog-total]');
  const initial = parseInt(root.dataset.initial, 10) || 9;
  const batch = parseInt(root.dataset.batch, 10) || 9;
  let activeTag = 'all';
  let sortOrder = 'newest';
  let shown = initial;

  function filtered() {
    return cards.filter((c) => activeTag === 'all' || (c.dataset.tags || '').split(/\s+/).includes(activeTag));
  }

  function render() {
    const list = filtered();
    list.sort((a, b) => {
      const da = +a.dataset.date;
      const db = +b.dataset.date;
      return sortOrder === 'newest' ? db - da : da - db;
    });
    cards.forEach((c) => { c.hidden = true; });
    list.forEach((c, i) => {
      grid.appendChild(c);
      if (i < shown) c.hidden = false;
    });
    const totalInFilter = list.length;
    const visible = Math.min(shown, totalInFilter);
    if (shownEl) shownEl.textContent = visible;
    if (totalEl) totalEl.textContent = totalInFilter;
    if (moreWrap) moreWrap.hidden = visible >= totalInFilter;
  }

  const tabsRow = root.querySelector('.ci-blog__tabs');
  if (tabsRow) {
    const updateHint = () => {
      const overflow = tabsRow.scrollWidth - tabsRow.clientWidth;
      tabsRow.classList.toggle('has-more', overflow > 1 && tabsRow.scrollLeft < overflow - 4);
    };
    tabsRow.addEventListener('scroll', updateHint, { passive: true });
    window.addEventListener('resize', updateHint);
    updateHint();
  }

  tabs.forEach((t) => t.addEventListener('click', () => {
    tabs.forEach((x) => { x.classList.remove('is-active'); x.setAttribute('aria-selected', 'false'); });
    t.classList.add('is-active');
    t.setAttribute('aria-selected', 'true');
    activeTag = t.dataset.tag;
    shown = initial;
    render();
  }));
  if (sortSel) sortSel.addEventListener('change', () => { sortOrder = sortSel.value; render(); });
  if (loadBtn) loadBtn.addEventListener('click', () => { shown += batch; render(); });
  render();
}

document.querySelectorAll('.ci-blog').forEach(initBlog);
document.addEventListener('shopify:section:load', (e) => {
  e.target.querySelectorAll('.ci-blog').forEach(initBlog);
});
