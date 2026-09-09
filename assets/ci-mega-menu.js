document.addEventListener('pointerover', (event) => {
  const category = event.target.closest('.ci-mega__cat[data-has-children]');
  if (!category) return;
  const mega = category.closest('[data-ci-mega]');
  if (!mega) return;
  const index = category.dataset.ciCat;
  mega.querySelectorAll('.ci-mega__cat').forEach((node) => {
    node.classList.toggle('is-active', node === category);
  });
  mega.querySelectorAll('.ci-mega__panel').forEach((panel) => {
    panel.classList.toggle('is-active', panel.dataset.ciPanel === index);
  });
});
