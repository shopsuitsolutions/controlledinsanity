const ciQuickSizeIsMobile = () => window.matchMedia('(max-width: 749px)').matches;

function ciQuickSizeOpen(component) {
  const host = component.closest('dialog') || document.body;
  if (ciQuickSizeIsMobile() && component.parentElement !== host) {
    component._ciHome = { parent: component.parentElement, next: component.nextSibling };
    host.appendChild(component);
  }
  component.classList.add('is-open');
}

function ciQuickSizeClose(component) {
  component.classList.remove('is-open');
  const home = component._ciHome;
  component._ciHome = null;
  if (!home || !home.parent) return;
  try {
    if (home.next && home.next.parentNode === home.parent) {
      home.parent.insertBefore(component, home.next);
    } else {
      home.parent.appendChild(component);
    }
  } catch (e) {
    home.parent.appendChild(component);
  }
}

document.addEventListener(
  'click',
  (event) => {
    const toggle = event.target.closest('[data-ci-quick-size-toggle]');
    if (toggle) {
      event.preventDefault();
      event.stopPropagation();
      const component = toggle.closest('.ci-quick-size');
      if (!component) return;
      if (component.classList.contains('is-open')) {
        ciQuickSizeClose(component);
      } else {
        ciQuickSizeOpen(component);
      }
      return;
    }

    const cell = event.target.closest('.ci-quick-size__cell[data-variant-id]');
    if (!cell || cell.disabled) return;

    event.stopPropagation();
    const form = cell.closest('form');
    const input = form?.querySelector('input[name="id"]');
    if (input) input.value = cell.dataset.variantId;
    const component = cell.closest('.ci-quick-size');
    if (component) {
      setTimeout(() => ciQuickSizeClose(component), 0);
    }
  },
  true
);
