import { CartAddEvent } from '@theme/events';

class CiCartRecs extends HTMLElement {
  connectedCallback() {
    this.row = this.querySelector('[data-slider-row]') || this.querySelector('.ci-cart-recommendations__row');
    this.progress = this.querySelector('[data-slider-progress]') || this.querySelector('.ci-cart-recommendations__progress');
    this.thumb = this.querySelector('[data-slider-thumb]') || this.querySelector('.ci-cart-recommendations__progress-thumb');
    if (!this.row) return;
    this.addEventListener('click', (event) => {
      const arrow = event.target.closest('button[data-dir]');
      if (!arrow) return;
      const distance = Math.max(this.row.clientWidth * 0.8, 181);
      this.row.scrollBy({ left: arrow.dataset.dir === 'next' ? distance : -distance, behavior: 'smooth' });
    });
    this.row.addEventListener('scroll', () => this.update(), { passive: true });
    if (window.ResizeObserver) {
      this.observer = new ResizeObserver(() => this.update());
      this.observer.observe(this.row);
    }
    this.update();
  }

  disconnectedCallback() {
    if (this.observer) this.observer.disconnect();
  }

  update() {
    const overflow = this.row.scrollWidth - this.row.clientWidth;
    const prev = this.querySelector('[data-dir="prev"]');
    const next = this.querySelector('[data-dir="next"]');
    if (prev) prev.disabled = this.row.scrollLeft <= 0;
    if (next) next.disabled = this.row.scrollLeft >= overflow - 1;
    if (!this.progress || !this.thumb) return;
    if (overflow <= 1) {
      this.progress.hidden = true;
      return;
    }
    this.progress.hidden = false;
    const ratio = this.row.clientWidth / this.row.scrollWidth;
    const position = this.row.scrollLeft / overflow;
    this.thumb.style.width = `${ratio * 100}%`;
    this.thumb.style.left = `${position * (1 - ratio) * 100}%`;
  }
}

if (!customElements.get('ci-cart-recs')) {
  customElements.define('ci-cart-recs', CiCartRecs);
}

if (!customElements.get('ci-slider')) {
  customElements.define('ci-slider', class CiSlider extends CiCartRecs {});
}

class CiRebuyBlock extends HTMLElement {
  connectedCallback() {
    if (window.Rebuy && typeof window.Rebuy.init === 'function') {
      window.Rebuy.init();
    }
    if (this.classList.contains('rebuy-block--pdp') || this.classList.contains('rebuy-block--cart-drawer')) {
      this.stripObserver = new MutationObserver(() => this.buildStrips());
      this.stripObserver.observe(this, { childList: true, subtree: true });
      this.buildStrips();
    }
  }

  disconnectedCallback() {
    if (this.stripObserver) this.stripObserver.disconnect();
  }

  buildStrips() {
    this.querySelectorAll('.rebuy-product-block[data-ci-strip]').forEach((block) => {
      if (!block.classList.contains('product-id-' + block.dataset.ciStrip)) {
        block.querySelectorAll('.ci-rebuy-sizes, .ci-rebuy-quick, .ci-rebuy-atb').forEach((node) => node.remove());
        delete block.dataset.ciStrip;
      }
    });
    document.querySelectorAll('.ci-rebuy-quick').forEach((quick) => {
      const home = quick._ciHome;
      if (!quick.closest('.rebuy-product-block') && home && home.parent && !home.parent.isConnected) {
        quick.remove();
      }
    });
    this.querySelectorAll('.rebuy-product-block:not([data-ci-strip])').forEach((block) => {
      const media = block.querySelector('.rebuy-product-media');
      const info = block.querySelector('.rebuy-product-info');
      if (!media || !info) return;
      let vue = null;
      let host = block;
      while (host && !vue) {
        vue = host.__vue__;
        host = host.parentElement;
      }
      const products = vue && vue.$data && vue.$data.products;
      if (!products) return;
      const pidClass = [...block.classList].find((c) => c.startsWith('product-id-'));
      const product = products.find((p) => String(p.id) === (pidClass || '').replace('product-id-', ''));
      if (!product || !product.variants || product.variants.length === 0) return;
      block.dataset.ciStrip = String(product.id);
      const widgetId = String(this.querySelector('[data-rebuy-id]')?.dataset.rebuyId || '');
      const addVariant = (variant, done) => {
        fetch('/cart/add.js', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            items: [
              {
                id: variant.id,
                quantity: 1,
                properties: { _source: 'Rebuy', _widget_id: widgetId, _attribution: 'Rebuy Product' },
              },
            ],
          }),
        })
          .then((response) => {
            if (!response.ok) throw new Error('add failed');
            return fetch('/cart.js');
          })
          .then((response) => response.json())
          .then((cart) => {
            document.dispatchEvent(
              new CartAddEvent(cart, 'ci-rebuy-sizes', {
                source: 'ci-rebuy-sizes',
                itemCount: cart.item_count,
                variantId: String(variant.id),
              })
            );
          })
          .finally(() => {
            if (done) done();
          });
      };
      const multi = product.variants.length > 1;
      let row = null;
      if (multi) {
        row = document.createElement('div');
        row.className = 'ci-quick-size__row ci-rebuy-sizes';
        product.variants.forEach((variant) => {
          const available = variant.inventory_management == null || variant.inventory_policy === 'continue' || variant.inventory_quantity > 0;
          const cell = document.createElement('button');
          cell.type = 'button';
          cell.className = available ? 'ci-quick-size__cell' : 'ci-quick-size__cell is-unavailable';
          cell.textContent = variant.title;
          if (available) {
            cell.addEventListener('click', () => {
              cell.disabled = true;
              addVariant(variant, () => {
                cell.disabled = false;
                row.classList.remove('is-open');
              });
            });
          } else {
            cell.disabled = true;
          }
          row.appendChild(cell);
        });
        media.appendChild(row);
      }
      if (this.classList.contains('rebuy-block--cart-drawer')) {
        const atb = document.createElement('button');
        atb.type = 'button';
        atb.className = 'button ci-rebuy-atb';
        atb.textContent = 'Add to bag';
        info.appendChild(atb);
        atb.addEventListener('click', () => {
          if (!multi) {
            addVariant(product.variants[0]);
          } else if (row) {
            row.classList.toggle('is-open');
          }
        });
      }
      const bagSvg =
        '<svg viewBox="0 0 15 13" width="15" height="13" fill="none" aria-hidden="true"><path d="M13.2327 4.1157H1.71298C1.54936 4.11239 1.3871 4.14593 1.23821 4.21384C1.08932 4.28174 0.957614 4.38228 0.85285 4.508C0.748086 4.63371 0.672949 4.78139 0.633004 4.94008C0.593059 5.09878 0.589329 5.26443 0.622092 5.42476L1.82207 11.4246C1.87307 11.6747 2.01016 11.8991 2.20949 12.0585C2.40881 12.218 2.65774 12.3025 2.91295 12.2973H12.0328C12.288 12.3025 12.5369 12.218 12.7362 12.0585C12.9355 11.8991 13.0726 11.6747 13.1236 11.4246L14.3236 5.42476C14.3564 5.26443 14.3526 5.09878 14.3127 4.94008C14.2728 4.78139 14.1976 4.63371 14.0929 4.508C13.9881 4.38228 13.8564 4.28174 13.7075 4.21384C13.5586 4.14593 13.3963 4.11239 13.2327 4.1157Z" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/><path d="M9.65468 0.297668L11.8364 4.11577" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/><path d="M3.10936 4.11577L5.29113 0.297668" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/></svg>';
      const quick = document.createElement('div');
      quick.className = 'ci-quick-size ci-rebuy-quick';
      const bag = document.createElement('button');
      bag.type = 'button';
      bag.className = 'ci-quick-size__bag';
      bag.setAttribute('aria-label', 'Add to bag');
      bag.innerHTML = bagSvg;
      quick.appendChild(bag);
      if (multi) {
        bag.setAttribute('data-ci-quick-size-toggle', '');
        const backdrop = document.createElement('div');
        backdrop.className = 'ci-quick-size__backdrop';
        backdrop.setAttribute('data-ci-quick-size-toggle', '');
        backdrop.setAttribute('aria-hidden', 'true');
        quick.appendChild(backdrop);
        const panel = document.createElement('div');
        panel.className = 'ci-quick-size__panel';
        const titleText = (block.querySelector('.rebuy-product-title')?.textContent || '').trim();
        const priceText = (block.querySelector('.rebuy-money span:not(.sr-only)')?.textContent || '').trim();
        const imgSrc = block.querySelector('.rebuy-product-image img')?.src || '';
        panel.innerHTML =
          '<div class="ci-quick-size__head"><span class="ci-quick-size__heading">Quick add</span>' +
          '<button type="button" class="ci-quick-size__close" data-ci-quick-size-toggle aria-label="Close">' +
          '<span class="svg-wrapper"><svg viewBox="0 0 16 16" width="16" height="16" fill="none" aria-hidden="true"><path d="M1 1L15 15M15 1L1 15" stroke="currentColor" stroke-width="1.2"/></svg></span>' +
          '</button></div>' +
          '<div class="ci-quick-size__product">' +
          (imgSrc ? '<img class="ci-quick-size__product-image" src="' + imgSrc + '" alt="" width="80" height="80" loading="lazy">' : '') +
          '<div class="ci-quick-size__product-meta">' +
          '<span class="ci-quick-size__product-title"></span>' +
          '<span class="ci-quick-size__product-price"></span>' +
          '</div></div>';
        panel.querySelector('.ci-quick-size__product-title').textContent = titleText;
        panel.querySelector('.ci-quick-size__product-price').textContent = priceText;
        const sheetRow = document.createElement('div');
        sheetRow.className = 'ci-quick-size__row';
        product.variants.forEach((variant) => {
          const available = variant.inventory_management == null || variant.inventory_policy === 'continue' || variant.inventory_quantity > 0;
          const cell = document.createElement('button');
          cell.type = 'button';
          cell.className = available ? 'ci-quick-size__cell' : 'ci-quick-size__cell is-unavailable';
          const label = document.createElement('span');
          label.className = 'ci-quick-size__cell-label';
          label.textContent = variant.title;
          cell.appendChild(label);
          if (available) {
            cell.addEventListener('click', () => {
              cell.disabled = true;
              addVariant(variant, () => {
                cell.disabled = false;
                quick.querySelector('.ci-quick-size__close')?.click();
              });
            });
          } else {
            cell.disabled = true;
          }
          sheetRow.appendChild(cell);
        });
        panel.appendChild(sheetRow);
        quick.appendChild(panel);
      } else {
        bag.addEventListener('click', () => addVariant(product.variants[0]));
      }
      media.appendChild(quick);
    });
  }
}

if (!customElements.get('ci-rebuy-block')) {
  customElements.define('ci-rebuy-block', CiRebuyBlock);
}
