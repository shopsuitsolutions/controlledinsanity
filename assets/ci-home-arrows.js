(function () {
  function scrollEl(section) {
    var all = section.querySelectorAll('slideshow-slides');
    for (var i = 0; i < all.length; i++) {
      var e = all[i];
      if (e.closest('.hidden--desktop')) continue;
      if (e.closest('.product-card, .card-gallery, .resource-list__slide, .slideshow-slide')) continue;
      return e;
    }
    return null;
  }

  function step(section, slides) {
    var card = section.querySelector('.resource-list__item, .slideshow-slide, slideshow-slides > *');
    return card ? card.getBoundingClientRect().width + 8 : Math.round(slides.clientWidth * 0.9);
  }

  function buildNav() {
    var nav = document.createElement('div');
    nav.className = 'ci-home-arrows';
    nav.innerHTML =
      '<button type="button" class="ci-home-arrows__btn" data-dir="prev" aria-label="Previous"><svg viewBox="0 0 20 20" width="18" height="18" fill="none"><path d="M12.5 4L7 10l5.5 6" stroke="currentColor" stroke-width="1.5"/></svg></button>' +
      '<button type="button" class="ci-home-arrows__btn" data-dir="next" aria-label="Next"><svg viewBox="0 0 20 20" width="18" height="18" fill="none"><path d="M7.5 4L13 10l-5.5 6" stroke="currentColor" stroke-width="1.5"/></svg></button>';
    return nav;
  }

  function place(section, nav) {
    var heading = section.querySelector('h2, h3');
    var wrap = section.querySelector('.section-resource-list__header');
    var link = wrap ? Array.prototype.slice.call(wrap.querySelectorAll('a[href]')).pop() : null;

    if (link) {
      var row = link.parentElement;
      while (row && row !== section && !(heading && row.contains(heading) && row.contains(link))) row = row.parentElement;
      if (!row || row === section) row = link.parentElement;
      var ref = link;
      while (ref.parentElement && ref.parentElement !== row) ref = ref.parentElement;
      row.classList.add('ci-home-arrowrow');
      var bar = document.createElement('div');
      bar.className = 'ci-home-arrowbar';
      row.insertBefore(bar, ref);
      bar.appendChild(nav);
      bar.appendChild(ref);
      return;
    }

    if (heading) {
      var sb = section.getBoundingClientRect();
      var hb = heading.getBoundingClientRect();
      section.style.position = section.style.position || 'relative';
      nav.classList.add('ci-home-arrows--float');
      nav.style.top = Math.round(hb.top - sb.top + hb.height / 2) + 'px';
      section.appendChild(nav);
      return;
    }
    section.appendChild(nav);
  }

  function init(section) {
    if (section.dataset.ciArrows) return;
    if (section.querySelector('.ci-home-arrows') || section.closest('[data-ci-arrows]')) return;
    var slides = scrollEl(section);
    if (!slides) return;
    if (slides.dataset.ciArrows) return;
    slides.dataset.ciArrows = '1';
    section.dataset.ciArrows = '1';
    var nav = buildNav();
    place(section, nav);

    var prev = nav.querySelector('[data-dir="prev"]');
    var next = nav.querySelector('[data-dir="next"]');
    function update() {
      var scrollable = slides.scrollWidth > slides.clientWidth + 40;
      nav.style.display = scrollable ? '' : 'none';
      if (!scrollable) return;
      var max = slides.scrollWidth - slides.clientWidth - 2;
      prev.disabled = slides.scrollLeft <= 2;
      next.disabled = slides.scrollLeft >= max;
    }
    prev.addEventListener('click', function () { slides.scrollBy({ left: -step(section, slides), behavior: 'smooth' }); });
    next.addEventListener('click', function () { slides.scrollBy({ left: step(section, slides), behavior: 'smooth' }); });
    slides.addEventListener('scroll', update, { passive: true });
    update();
    setTimeout(update, 600);
    window.addEventListener('load', update);
  }

  function initAll() { document.querySelectorAll('.ci-home-header, .featured-blog-posts').forEach(init); }
  if (document.readyState !== 'loading') initAll();
  else document.addEventListener('DOMContentLoaded', initAll);
  window.addEventListener('load', initAll);
  document.addEventListener('shopify:section:load', initAll);
})();
