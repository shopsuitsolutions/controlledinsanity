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

  document.querySelectorAll('media-gallery').forEach((gallery) => {
    const moved = [
      moveColorFirst(gallery.querySelectorAll('slideshow-slide[data-ci-color]'), color),
      moveColorFirst(gallery.querySelectorAll('.media-gallery__grid > li[data-ci-color]'), color),
      moveColorFirst(gallery.querySelectorAll('.dialog-zoomed-gallery > li[data-ci-color]'), color),
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
 * @param {NodeListOf<Element>} nodes - Sibling elements in display order
 * @param {string} color - Lowercased colour name to bring forward
 * @returns {boolean} Whether anything moved
 */
function moveColorFirst(nodes, color) {
  const list = Array.from(nodes);
  if (list.length < 2) return false;

  const matches = list.filter((node) => node.getAttribute('data-ci-color') === color);
  if (!matches.length) return false;
  if (matches.every((node, i) => node === list[i])) return false;

  const parent = list[0].parentElement;
  const first = list[0];
  matches.forEach((node) => parent.insertBefore(node, first));
  return true;
}
