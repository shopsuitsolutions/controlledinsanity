class CiNavbar extends HTMLElement {
  connectedCallback() {
    this.bar = this.querySelector('.ci-navbar__bar');
    this.sentinel = this.querySelector('[data-sentinel]');
    this.transparent = this.hasAttribute('transparent');
    this.solidScheme = this.dataset.schemeSolid;
    this.transparentScheme = this.dataset.schemeTransparent;
    this.scrolled = false;
    this.megaOpen = false;
    this.initAnnouncement();
    this.initSticky();
    this.initMega();
  }

  setState() {
    const solid = !this.transparent || this.scrolled || this.megaOpen;
    this.setAttribute('data-state', solid ? 'solid' : 'transparent');
    this.toggleAttribute('data-stuck', this.scrolled && (this.transparent || this.hasAttribute('sticky')));
    if (!this.bar) return;
    const add = solid ? this.solidScheme : this.transparentScheme;
    const remove = solid ? this.transparentScheme : this.solidScheme;
    if (add) this.bar.classList.add(add);
    if (remove && remove !== add) this.bar.classList.remove(remove);
  }

  measure() {
    const ann = this.querySelector('[data-announcement]');
    const h = ann ? ann.offsetHeight : 0;
    this.style.setProperty('--ci-ann-h', `${h}px`);
    if (this.bar) this.style.setProperty('--ci-bar-h', `${this.bar.offsetHeight}px`);
    this.threshold = Math.max(h - 1, 0);
  }

  initSticky() {
    this.measure();
    window.addEventListener('resize', () => this.measure());
    if (!this.transparent && !this.hasAttribute('sticky')) {
      this.setState();
      return;
    }
    const onScroll = () => {
      const sc = window.scrollY > this.threshold;
      if (sc !== this.scrolled) {
        this.scrolled = sc;
        this.setState();
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    this.setState();
  }

  isAnyItemActive() {
    return !!(this.querySelector('[data-nav-item].has-mega:hover') || this.querySelector('[data-nav-item].has-mega:focus-within'));
  }

  initMega() {
    this.querySelectorAll('[data-nav-item].has-mega').forEach((item) => {
      const link = item.querySelector('.ci-nav__link');
      const open = () => {
        this.megaOpen = true;
        this.setAttribute('data-mega-open', '');
        if (link) link.setAttribute('aria-expanded', 'true');
        this.setState();
      };
      const maybeClose = () => {
        if (link) link.setAttribute('aria-expanded', 'false');
        if (!this.isAnyItemActive()) {
          this.megaOpen = false;
          this.removeAttribute('data-mega-open');
          this.setState();
        }
      };
      item.addEventListener('mouseenter', open);
      item.addEventListener('mouseleave', maybeClose);
      item.addEventListener('focusin', open);
      item.addEventListener('focusout', () => setTimeout(maybeClose, 0));

      item.querySelectorAll('[data-mega-cat]').forEach((cat) => {
        const activate = () => this.activateColumn(item, cat.getAttribute('data-mega-cat'));
        cat.addEventListener('mouseenter', activate);
        cat.addEventListener('focus', activate);
      });
    });
  }

  activateColumn(item, idx) {
    item.querySelectorAll('.ci-nav__l1-link[data-mega-cat]').forEach((l) => {
      const on = l.getAttribute('data-mega-cat') === idx;
      l.classList.toggle('is-active', on);
      if (on) {
        l.setAttribute('aria-current', 'true');
      } else {
        l.removeAttribute('aria-current');
      }
    });
    item.querySelectorAll('[data-mega-col]').forEach((col) => {
      const on = col.getAttribute('data-mega-col') === idx;
      col.classList.toggle('is-active', on);
      col.hidden = !on;
    });
  }

  initAnnouncement() {
    const wrap = this.querySelector('[data-announcement]');
    const track = this.querySelector('[data-announcement-track]');
    if (!wrap || !track || track.children.length < 2) return;
    const items = track.children;
    let i = 0;
    const speed = parseFloat(wrap.style.getPropertyValue('--ci-ann-speed')) || 5;
    track.style.transition = 'transform 0.5s var(--ease-out-cubic, ease)';
    setInterval(() => {
      i = (i + 1) % items.length;
      track.style.transform = `translateX(-${i * 100}%)`;
    }, speed * 1000);
  }
}
customElements.define('ci-navbar-component', CiNavbar);

class CiNavbarDrawer extends HTMLElement {
  connectedCallback() {
    this.stack = ['root'];
    this.initSliders();
    this.bindOpeners();
    this.addEventListener('click', (e) => {
      const push = e.target.closest('[data-drawer-push]');
      const back = e.target.closest('[data-drawer-back]');
      const close = e.target.closest('[data-drawer-close]');
      if (push) {
        this.push(push.getAttribute('data-drawer-push'));
      } else if (back) {
        this.back();
      } else if (close) {
        this.close();
      }
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.classList.contains('is-open')) this.close();
    });
  }

  bindOpeners() {
    document.querySelectorAll('[data-drawer-open]').forEach((btn) => {
      btn.addEventListener('click', () => this.open(btn));
    });
  }

  initSliders() {
    this.sliders = [...this.querySelectorAll('[data-drawer-slider]')].map((sl) => {
      const track = sl.querySelector('[data-drawer-slider-track]');
      const thumb = sl.querySelector('[data-drawer-slider-thumb]');
      const update = () => {
        if (!track || !thumb) return;
        const total = track.scrollWidth;
        const vis = track.clientWidth;
        const bar = sl.querySelector('.ci-drawer__slider');
        if (!vis || total <= vis + 1) {
          if (bar) bar.style.visibility = 'hidden';
          return;
        }
        if (bar) bar.style.visibility = 'visible';
        const ratio = vis / total;
        const max = total - vis;
        const p = max > 0 ? track.scrollLeft / max : 0;
        thumb.style.width = `${ratio * 100}%`;
        thumb.style.transform = `translateX(${(p * (1 - ratio) / ratio) * 100}%)`;
      };
      if (track) track.addEventListener('scroll', update, { passive: true });
      return { update };
    });
    window.addEventListener('resize', () => this.refreshSliders());
  }

  refreshSliders() {
    if (this.sliders) requestAnimationFrame(() => this.sliders.forEach((s) => s.update()));
  }

  panel(id) {
    return this.querySelector(`[data-drawer-panel="${id}"]`);
  }

  open(trigger) {
    this.hidden = false;
    this.opener = trigger || null;
    if (trigger) trigger.setAttribute('aria-expanded', 'true');
    document.documentElement.style.overflow = 'hidden';
    requestAnimationFrame(() => this.classList.add('is-open'));
  }

  close() {
    this.classList.remove('is-open');
    if (this.opener) this.opener.setAttribute('aria-expanded', 'false');
    document.documentElement.style.overflow = '';
    const done = () => {
      this.hidden = true;
      this.reset();
      this.removeEventListener('transitionend', done);
    };
    const dialog = this.querySelector('.ci-drawer__dialog');
    if (dialog) dialog.addEventListener('transitionend', done, { once: true });
    else done();
  }

  reset() {
    this.querySelectorAll('.ci-drawer__panel').forEach((p) => {
      const isRoot = p.getAttribute('data-drawer-panel') === 'root';
      p.classList.toggle('is-active', isRoot);
      p.classList.remove('is-parent');
      p.hidden = !isRoot;
    });
    this.stack = ['root'];
  }

  push(id) {
    const target = this.panel(id);
    if (!target) return;
    const current = this.panel(this.stack[this.stack.length - 1]);
    if (current) {
      current.classList.remove('is-active');
      current.classList.add('is-parent');
    }
    target.hidden = false;
    target.querySelectorAll('[data-drawer-slider-track]').forEach((t) => {
      t.scrollLeft = 0;
    });
    requestAnimationFrame(() => {
      target.classList.add('is-active');
      this.refreshSliders();
    });
    this.stack.push(id);
  }

  back() {
    if (this.stack.length < 2) return;
    const currentId = this.stack.pop();
    const current = this.panel(currentId);
    const prev = this.panel(this.stack[this.stack.length - 1]);
    if (current) {
      current.classList.remove('is-active');
      current.addEventListener('transitionend', () => { current.hidden = true; }, { once: true });
    }
    if (prev) {
      prev.classList.remove('is-parent');
      prev.classList.add('is-active');
    }
  }
}
customElements.define('ci-navbar-drawer', CiNavbarDrawer);
