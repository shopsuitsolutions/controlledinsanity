class CiSizeChart extends HTMLElement {
  connectedCallback() {
    this.onKey = (e) => {
      if (e.key === 'Escape') this.close();
    };
    this.querySelectorAll('[data-chart-close]').forEach((el) => {
      el.addEventListener('click', () => this.close());
    });
    this.querySelectorAll('[data-unit]').forEach((btn) => {
      btn.addEventListener('click', () => this.setUnit(btn.dataset.unit));
    });
    document.querySelectorAll('a.ci-size-guide-link').forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        this.open();
      });
    });
  }

  open() {
    this.hidden = false;
    requestAnimationFrame(() => this.setAttribute('data-open', ''));
    document.addEventListener('keydown', this.onKey);
    document.documentElement.style.setProperty('overflow', 'hidden');
    this.querySelector('.ci-size-chart__close')?.focus();
  }

  close() {
    this.removeAttribute('data-open');
    document.removeEventListener('keydown', this.onKey);
    document.documentElement.style.removeProperty('overflow');
    setTimeout(() => {
      this.hidden = true;
    }, 300);
  }

  setUnit(unit) {
    this.querySelectorAll('[data-unit]').forEach((btn) => {
      const active = btn.dataset.unit === unit;
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-pressed', String(active));
    });
    this.querySelectorAll('td[data-cm]').forEach((td) => {
      const cm = parseFloat(td.dataset.cm);
      if (Number.isNaN(cm)) return;
      if (unit === 'in') {
        const inches = Math.round((cm / 2.54) * 10) / 10;
        td.textContent = String(inches);
      } else {
        td.textContent = td.dataset.cm;
      }
    });
  }
}

if (!customElements.get('ci-size-chart')) {
  customElements.define('ci-size-chart', CiSizeChart);
}
