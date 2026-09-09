function initFaq(root) {
  const tabs = root.querySelectorAll('.ci-faq__tab');
  const items = root.querySelectorAll('.ci-faq__item');
  if (!tabs.length) return;
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => t.classList.remove('is-active'));
      tab.classList.add('is-active');
      const cat = tab.dataset.cat;
      items.forEach((item) => {
        const show = cat === 'all' || item.dataset.cat === cat;
        item.hidden = !show;
        if (!show) item.open = false;
      });
    });
  });
}

document.querySelectorAll('.ci-faq').forEach(initFaq);

document.addEventListener('shopify:section:load', (event) => {
  event.target.querySelectorAll('.ci-faq').forEach(initFaq);
});
