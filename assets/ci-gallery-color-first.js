/**
 * Moves the selected colour's media to the top of the product gallery the moment a
 * colour swatch is picked, instead of waiting for the re-rendered section from Shopify.
 * The server response (which the theme swaps in afterwards) arrives in the same order,
 * so this only removes the delay. Matching uses the data-ci-color attribute the gallery
 * snippet writes from each image's alt text, same rule as the Liquid ordering.
 */
document.addEventListener('variant:selected', (event) => {
  const optionValueId = event.detail?.resource?.id;
  if (!optionValueId) return;

  const input = document.querySelector(
    `variant-picker .variant-option--swatches input[data-option-value-id="${optionValueId}"]`
  );
  if (!(input instanceof HTMLInputElement)) return;

  const color = input.value.trim().toLowerCase();
  if (!color) return;
  const mediaId = input.dataset.ciMediaId || '';

  document.querySelectorAll('media-gallery').forEach((gallery) => {
    const moved = [
      moveColorFirst(gallery.querySelectorAll('slideshow-slide[data-ci-color]'), color, mediaId),
      moveColorFirst(gallery.querySelectorAll('.media-gallery__grid > li[data-ci-color]'), color, mediaId),
      moveColorFirst(gallery.querySelectorAll('.dialog-zoomed-gallery > li[data-ci-color]'), color, mediaId),
    ].some(Boolean);

    if (moved) {
      try {
        gallery.slideshow?.select(0, undefined, { animate: false });
      } catch {
        // Slideshow not ready; the server render will settle it.
      }
    }
  });
});

/**
 * Same order the Liquid produces: the variant's own image, then the rest of that
 * colour in their original order, then everything else.
 * @param {NodeListOf<Element>} nodes - Sibling elements in display order
 * @param {string} color - Lowercased colour name to bring forward
 * @param {string} mediaId - Media id of the selected variant's image, if known
 * @returns {boolean} Whether anything moved
 */
function moveColorFirst(nodes, color, mediaId) {
  const list = Array.from(nodes);
  if (list.length < 2) return false;

  const matches = list.filter((node) => node.getAttribute('data-ci-color') === color);
  if (!matches.length) return false;

  if (mediaId) {
    const heroIndex = matches.findIndex((node) => node.querySelector(`[data-media-id="${mediaId}"]`));
    if (heroIndex > 0) matches.unshift(matches.splice(heroIndex, 1)[0]);
  }

  if (matches.every((node, i) => node === list[i])) return false;

  const parent = list[0].parentElement;
  const first = list[0];
  matches.forEach((node) => parent.insertBefore(node, first));
  return true;
}
