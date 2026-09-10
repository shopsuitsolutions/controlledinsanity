# Phase 4: Pilot — Evergreen Pump Cover

Merges 8 source products into 1 draft product with Color × Size variants. Every field decision applied per rules G1-G9 plus Aiman's pilot-specific approvals.

## Pilot-specific decisions

- **Handle**: `pump-cover` (confirmed free, no existing product uses it). Same handle stays post-cutover.
- **Description**: purpose-written family description (see below). Gunmetal Grey's existing copy was the longest but referenced "gunmetal grey colorway" specifically — not suitable for a multi-color product.
- **SEO title + description**: purpose-written for the family (see below).
- **Color swatches**: SKIPPED for the pilot. Verify base merge first, then add `shopify.color-pattern` in a follow-up import once mapping is confirmed.

## The change at a glance

| | Before | After |
|---|---|---|
| Products | 8 | 1 |
| Variants | 62 total (7-8 sizes each) | 61 (Color × Size matrix) |
| Images | 40 across 8 products | 40 attached to 1 product (each color's images bound to that color variant) |
| Tags | Varies 3-12 per product | 21 (UNION per Rule G1) |
| Collections | Varies 11-24 per product | 30 (UNION per Rule G2) |
| Prices | $55 or $60 per product | Per-variant: $55 or $60 depending on color (Rule G3) |
| Description | 8 different descriptions | 1 purpose-written for the family |
| SEO title | None on any | Purpose-written for the family |
| SEO description | None on any | Purpose-written for the family |
| Product type | 5 "Evergreen Pump Cover" + 3 "Pump Cover" | "Pump Cover" (Rule G5) |
| Template | Blank on 7, "Default product" on Cherry Blossom | Blank (Rule G6) |
| Vendor | Controlled Insanity | Controlled Insanity (Rule G4) |
| Product metafields | 23 total across 8 | 13 kept, 10 dropped (Rule G8) |
| Color swatch metafield | Present on 0 of 8 | Skipped for pilot (follow-up import) |
| Loox reviews | Attached to each old product ID | Will migrate via Loox handle-remap after cutover |
| Status | Active | **DRAFT** (invisible to customers until you approve) |
| URL | 8 different `/products/*` URLs | `/products/pump-cover` |

## Merged description (purpose-written)

```html
<h3>Pump Cover</h3>
<p>Our signature pump cover is constructed from <strong>440 GSM double-layered waffle knit</strong>, giving it a substantial weight, textured feel, and structured oversized fit. Primarily cotton, built for the durability and comfort of hard training while maintaining a heavyweight presence.</p>
<p>Featuring our foundational mantra: <strong>CONTROLLED</strong> across the chest and <strong>INSANITY</strong> across the back — bold, minimal, and unmistakably us.</p>
<p>Available in eight colorways. Choose the finish that fits how you train.</p>
<p><strong>Details:</strong></p>
<ul>
  <li>440 GSM heavyweight construction</li>
  <li>Double-layered waffle knit</li>
  <li>Primarily cotton</li>
  <li>Oversized pump cover fit</li>
  <li>Signature CONTROLLED / INSANITY design</li>
  <li>Built for training and everyday wear</li>
</ul>
```

## SEO

- **Title**: `Pump Cover — Heavyweight Waffle Knit | Controlled Insanity` (58 chars)
- **Meta description**: `Heavyweight 440 GSM double-layered waffle knit pump cover. Signature CONTROLLED / INSANITY design. Eight colorways. Built for training and daily wear.` (149 chars)

## Source products going in

| Source product | Old handle | Variants | Images | Tags | Collections | Price |
|---|---|---|---|---|---|---|
| Blackout Pump Cover | `blackout-pump-cover` | 8 | 4 | 12 | 24 | $55 |
| UNC Blue Pump Cover | `unc-blue-pump-cover` | 8 | 3 | 7 | 16 | $55 |
| Cool Grey Pump Cover | `cool-grey-pump-cover` | 8 | 4 | 11 | 23 | $55 |
| Oreo Pump Cover | `oreo-pump-cover` | 8 | 5 | 4 | 11 | $55 |
| Midnight Black Pump Cover | `midnight-black-pump-cover` | 8 | 5 | 12 | 24 | $55 |
| Cherry Blossom Pump Cover | `cherry-blossom-pump-cover` | 7 | 8 | 4 | 18 | $60 |
| Navy Pump Cover | `navy-pump-cover` | 7 | 4 | 3 | 12 | $55 |
| Gunmetal Grey Pump Cover | `gunmetal-grey-pump-cover` | 7 | 7 | 3 | 12 | $55 |

## Merged variant matrix (Color × Size, cells show inventory qty)

| Color | S | M | L | XL | 2XL | 3XL | 4XL | 5XL | Price |
|---|---|---|---|---|---|---|---|---|---|
| Blackout | 0 | 0 | 0 | 584 | 792 | 210 | 256 | 80 | $55 |
| UNC Blue | 0 | -25 | -18 | 0 | 0 | 12 | 0 | 0 | $55 |
| Cool Grey | 0 | 0 | -1 | 189 | 294 | 81 | 86 | 0 | $55 |
| Oreo | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | $55 |
| Midnight Black | 0 | 0 | 0 | 529 | 556 | 175 | 220 | 52 | $55 |
| Cherry Blossom | 0 | 0 | 37 | 141 | 158 | 75 | 62 | — | $60 |
| Navy | -1 | -1 | -1 | 0 | 75 | 9 | 23 | — | $55 |
| Gunmetal Grey | -1 | -1 | -1 | 0 | 18 | 4 | 14 | — | $55 |

*Cells show current inventory qty; "—" means variant does not exist. Negative numbers are oversells from your existing data — carried over as-is.*

## Tags on the merged product (21)

`50-75`, `color-blackout`, `color-cherry-blossom`, `color-cool-grey`, `color-gunmetal-grey`, `color-midnight-black`, `color-navy`, `color-oreo`, `color-unc-blue`, `evergreen pumpcover`, `japandroppart1`, `pumpCover`, `size-2xl`, `size-3xl`, `size-4xl`, `size-5xl`, `size-l`, `size-m`, `size-s`, `size-xl`, `tops`

## Collections the merged product joins (30)

`50-75`, `all`, `black-friday`, `black-friday-sales-campaign`, `cherry-restock-discord-exclusive`, `evergreen-collection`, `globofilter-best-selling-products-index`, `in-stock`, `japan-drop-part-1`, `japan-drop-part-1-2`, `japan-drop-part-2`, `japan-restock`, `march-restock`, `new-arrivals`, `new-evergreen`, `pump-cover`, `pump-covers`, `shop`, `size-2xl`, `size-3xl`, `size-4xl`, `size-5xl`, `size-l`, `size-m`, `size-s`, `size-xl`, `tiktok-shop-collection`, `tops`, `trending`, `trends`

## Product metafields — what's kept, dropped

| Metafield | Action |
|---|---|
| `custom.color` | DROP (per Rule G8) |
| `custom.family` | SET to family name |
| `custom.size_chart_image` | MOST COMMON (8 of 8) |
| `custom.variant_products` | DROP (per Rule G8) |
| `loox.avg_rating` | DROP (per Rule G8) |
| `loox.num_reviews` | DROP (per Rule G8) |
| `loox.review_feed` | DROP (per Rule G8) |
| `loox.reviews` | DROP (per Rule G8) |
| `mc-facebook.google_product_category` | MOST COMMON (6 of 8) |
| `mm-google-shopping.age_group` | MOST COMMON (5 of 5) |
| `mm-google-shopping.google_product_category` | MOST COMMON (1 of 2) |
| `reviews.rating` | DROP (per Rule G8) |
| `reviews.rating_count` | DROP (per Rule G8) |
| `shopify.age-group` | MOST COMMON (5 of 5) |
| `shopify.bra-closure-type` | MOST COMMON (1 of 1) |
| `shopify.bra-coverage` | MOST COMMON (1 of 1) |
| `shopify.bra-features` | MOST COMMON (1 of 1) |
| `shopify.color-pattern` | DROP (per Rule G8) |
| `shopify.fabric` | MOST COMMON (6 of 6) |
| `shopify.neckline` | MOST COMMON (5 of 5) |
| `shopify.size` | DROP (per Rule G8) |
| `shopify.target-gender` | MOST COMMON (5 of 5) |
| `shopify.top-length-type` | MOST COMMON (5 of 5) |

**SEO fields overridden with purpose-written copy**: `title_tag` and `description_tag`.

**Skipped**: `shopify.color-pattern` swatch (follow-up import after base merge verifies).

## Redirects (to apply in Phase 5, not yet applied)

| From | To |
|---|---|
| `/products/blackout-pump-cover` | `/products/pump-cover` |
| `/products/unc-blue-pump-cover` | `/products/pump-cover` |
| `/products/cool-grey-pump-cover` | `/products/pump-cover` |
| `/products/oreo-pump-cover` | `/products/pump-cover` |
| `/products/midnight-black-pump-cover` | `/products/pump-cover` |
| `/products/cherry-blossom-pump-cover` | `/products/pump-cover` |
| `/products/navy-pump-cover` | `/products/pump-cover` |
| `/products/gunmetal-grey-pump-cover` | `/products/pump-cover` |

## Files with this pilot

- `_migration/pilot-import-evergreen-pump-cover.xlsx` — Matrixify workbook (102 rows)
- `_migration/pilot-mapping.csv` — old product ID/handle → new handle mapping (8 rows) — feed to Loox support in the same batch
- `_migration/pilot-redirects.csv` — 8 redirects to apply at cutover
- `_migration/phase4-pilot.md` — this document

## To run the pilot

1. Matrixify → New Import → upload `pilot-import-evergreen-pump-cover.xlsx`
2. **Check "Dry Run" first** — validates without writing. Fix any errors before real import.
3. If dry run clean, run real import (~30 sec).
4. Products → Drafts → find "Pump Cover" (handle `pump-cover`).
5. Verify:
   - 8 colors in Color option
   - Sizes per color match the matrix above
   - Variant images swap when clicking through colors
   - Inventory matches
   - Prices per variant match ($55 for 5 colors, $60 for Cherry Blossom)
   - 21 tags applied
   - 30 collections joined
   - Description and SEO show the purpose-written copy
6. Tell me what looks right or wrong.

## Rollback

Products → Drafts → find "Pump Cover" → Delete. Nothing on storefront was touched.

## After pilot approval — remaining steps for Evergreen Pump Cover

1. Follow-up import: add `shopify.color-pattern` swatch metafield with agreed color→metaobject mapping.
2. Loox: submit `pilot-mapping.csv` to Loox support to merge reviews to the new product handle.
3. When ready to go live: switch new product to Active, set 8 originals to Archived, import redirects CSV.
