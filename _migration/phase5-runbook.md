# Phase 5 Runbook — Batch Migration Guidelines

Distilled from the Evergreen Pump Cover pilot (v1 → v9). Applies to the remaining 61 families.

## Per-family workflow

### 1. Prep the source data
- Pull live "on-hand" inventory per SKU at ShipBobFulfillment-437160 via GraphQL (not from stale Matrixify export). Matrixify inventory numbers go stale within hours.
- Note any variants with negative on-hand — Shopify's `inventorySetOnHandQuantities` rejects them; clamp to 0.
- Verify each source product's handle for the redirect mapping.

### 2. Build the Matrixify workbook

**Columns to include:**
- Handle, Command (`NEW`), Title, Body HTML, Vendor, Type, Status (`draft`), Published (`FALSE`), Template Suffix
- `Category: ID` = `gid://shopify/TaxonomyCategory/aa-1-13` (Clothing Tops) — REQUIRED before shopify.* metafields
- Tags, Tags Command (`REPLACE`)
- Collections (semicolon-separated handles — no Collections Command column, that's unsupported in Basic)
- Row #, Top Row
- Variant Command (`MERGE`), Option1/Option2 Name/Value (Color/Size), Variant SKU/Barcode/Image/Weight/Price/etc.
- **Variant HS Code** (NOT `Variant Metafield: harmonized_system_code` — deprecated)
- **Variant Fulfillment Service** = `shipbobfulfillment-437160` on every variant row

**Metafield columns to include:**
- `title_tag` [string] — purpose-written SEO title
- `description_tag` [string] — purpose-written SEO meta description
- `custom.family` [single_line_text_field] — family name
- `custom.size_chart_image` [file_reference] — Shopify File GID (not filename)
- `mm-google-shopping.google_product_category` [string]
- `mm-google-shopping.age_group` [string] = `adult`
- `mc-facebook.google_product_category` [string]
- `shopify.color-pattern` [list.metaobject_reference] — comma-separated `shopify--color-pattern.<handle>` for each color
- `shopify.age-group` [list.metaobject_reference] = `shopify--age-group.adults`
- `shopify.fabric` [list.metaobject_reference] = `shopify--fabric.cotton` (or family-appropriate)

**Metafields to DROP:**
- All `shopify.bra-*` (garbage from old auto-categorization)
- `shopify.target-gender` (not valid for Clothing Tops root category)
- `shopify.top-length-type`, `shopify.sleeve-length-type`, `shopify.fit`, `shopify.neckline`, `shopify.activity` (low ROI)
- `shopify.size` (redundant with variant Size)
- `custom.variant_products` (obsolete after merge)
- `custom.color` (moves to variant-level via shopify.color-pattern)
- All `loox.*`, `reviews.rating*`, `productwiz.*`, `globo--filter--*`, `shopify--discovery--product_recommendation.*` (repopulate after via each app)

### 3. Description writing rules
- Never copy-paste the longest source description word for word — old descriptions have color-specific language and leftover AI CSS wrapper divs (`class="dad65929"`, `ds-markdown-paragraph`, etc.).
- Write ONE purpose-built family description that captures shared specs (GSM, fabric, construction, fit, brand mantra) without mentioning any single colorway.
- Structure: intro paragraph → brand mantra paragraph → colorway callout → bulleted Details.
- Strip stale marketing (preorder banners, Japan Drop callouts, etc.) unless still active.

### 4. Handle strategy
- Use the final canonical handle from the start (e.g. `pump-cover`, not `pump-cover-new`).
- Verify handle is free via API before importing (`search_products` with `handle:xxx`).
- If the desired handle collides with an existing product, either archive the collider first or pick a different canonical.

### 5. Run the Matrixify import
- Options → check **Dry Run** and be aware: Matrixify Basic in this store has previously created products even with Dry Run intent. Verify via API before assuming dry run was actually a dry run.
- Download Import Results after every run to see per-row errors.
- One bad metafield errors the whole metafield batch — fix and re-import as `Command: UPDATE`.
- Product/variants/images/tags/collections save independently from metafields, so a metafield failure doesn't wipe the core product.

### 6. Post-import inventory fix (GraphQL, not Matrixify)

Matrixify Basic can only target the store's primary location, which is SHIPBOB MORENO. We need everything at ShipBobFulfillment-437160 only.

Run two mutations per family:

1. **`inventorySetOnHandQuantities`** — one call, up to 250 items per call. Set on-hand at ShipBobFulfillment-437160 (Location ID `gid://shopify/Location/114123407648`) for every variant.
2. **`inventoryDeactivate`** — batched aliased mutation, one call for all variants. Deactivate SHIPBOB MORENO level (`gid://shopify/InventoryLevel/154340557088?inventory_item_id=<item_id>`) for every variant.

Gotchas:
- Negative on-hand rejected → clamp to 0
- Deactivate requires 0 committed at that location; if committed > 0, it silently no-ops
- Admin UI can show ghost SHIPBOB MORENO rows for ~30 min after deactivation due to Shopify caching. API is source of truth.

### 7. Color swatch mapping

For each family, map each color to an existing `shopify--color-pattern.<handle>`. The pilot mapping (reusable for common colors):

| Color | Handle |
|---|---|
| Blackout | blackout |
| UNC Blue | unc-blue-new |
| Cool Grey | gray |
| Oreo | oreo-new |
| Midnight Black | midnight-black-new |
| Cherry Blossom | pink |
| Navy | navy-blue-new |
| Gunmetal Grey | gunmetal-gray |
| (new colors) | pick closest existing or create new metaobject |

If a family has a color that has no close match in your metaobjects, skip that color in the swatch metafield for now (it just doesn't get a swatch). Don't create new metaobjects on the fly during batching — collect them and batch-create in one admin session.

### 8. Verify the family
- Open the draft product in admin
- Check: 8 category metafields filled (Color chips, Fabric, Age group)
- Inventory: only ShipBobFulfillment-437160 listed per variant
- Fulfillment service: shipbobfulfillment-437160 per variant
- Prices per variant match originals
- SKUs preserved

### 9. Generate mapping + redirects
- Append to `_migration/mapping.csv`: old_product_id, old_handle, old_title, new_handle, new_title, new_color per source product
- Append to `_migration/redirects.csv`: `/products/<old_handle>` → `/products/<new_handle>`

### 10. Loox review migration
- Add family's mapping rows to the Loox support submission batch
- Submit weekly (not per-family) to keep Loox tickets manageable

## Batching cadence
- Start with the SMALLEST families first (2-3 products) to build muscle memory
- After every 5 families, pause and spot-check a random one end-to-end
- After every 10 families, run a full inventory reconciliation script comparing merged qty to originals

## What we're NOT doing during Phase 5 (deferred to Phase 6)
- Archiving originals (they stay ACTIVE)
- Publishing merged products (they stay DRAFT)
- Applying redirects
- Rewiring Rebuy / Klaviyo / Loop / VerifyPass / Yotpo / Bundles
- Cleaning up stale color-pattern metaobjects
- Adding image swatches (theme code work)
- Filling `custom.variant_products` for cross-family "related pump covers" strips
- Backfilling category metafields on the ~150 accessories/loners that stay single-color

## Rollback per family
- Products → Drafts → find "<Family Name>" → Delete. Nothing on storefront was touched (originals still Active, drafts invisible).
- Matrixify keeps history; re-import a reverse workbook if needed.
