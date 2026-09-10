# Phase 3: Risk Check

Comprehensive audit of what a product-ID change breaks on this store.

## Overall risk level: MODERATE

Good news: theme code is CLEAN — no hardcoded product IDs or handles anywhere in `sections/`, `snippets/`, `templates/`, `blocks/`, or `assets/`. Nothing to refactor in code.

Notable risks (detailed below): Rebuy Data Sources, manual collections (49+), Loox reviews, product-ID-based analytics attribution, one navigation entry.

## Installed apps (26)

Grouped by migration risk.

### HIGH RISK — reference product IDs directly, need manual attention

| App | Impact | Migration action |
|---|---|---|
| **Rebuy Personalization Engine** | Data Sources, Smart Cart, upsells, gift-with-purchase, and Rebuy Widgets all reference specific product IDs configured in the Rebuy dashboard. The theme has Rebuy snippets in 13 files but they render Rebuy config, not hardcoded products. | After each batch: audit Rebuy Data Sources (Merchandising → Data Sources), update any "Include Products" / "Boost Products" rules that reference old product IDs. Same for Smart Cart rules and any Rebuy Bundle Builder configs. Alternatively, most Rebuy rules can be re-pointed to collections instead of individual product IDs — recommend switching to collection-based rules where possible so future SKU changes don't break rules again. |
| **Loox Reviews** | Reviews tied to product ID. Loox has a Product Merge tool in their support portal that maps OLD product ID → NEW product ID and moves all reviews. | Open a Loox support ticket ahead of pilot with the source→target product ID mapping (I'll generate this as `_migration/mapping.csv` in Phase 4). Loox typically processes merges within 24-48h. |
| **Shopify Bundles** | Any active bundle products list component variants by ID. | Query current bundles before starting. For each bundle that references a migrating product, update the bundle to point to the new merged product's variant. Bundles are `custom.bundle_component` metaobjects — I can enumerate these in Phase 4 pre-flight. |
| **Loop Returns & Exchanges** | Return policy rules can filter by product ID, tag, or collection. Tag/collection rules survive; product-ID rules break. | Log into Loop admin, review Return Policies for any product-ID exclusions/inclusions, remap to new IDs after migration. |
| **Klaviyo** | Product catalog syncs by product ID; Flows and Segments can reference specific product IDs. Product-triggered flows (e.g., "browsed product X") reset because the product ID changes. | After migration: full Klaviyo catalog resync (automatic when the app detects ID changes, but takes 1-4 hours). Audit Flows for hardcoded product IDs — search for `product_id` in Flow triggers/conditions. |
| **VerifyPass** | Discount rules may target specific products. | Log into VerifyPass admin, remap any product-ID discount rules. |
| **SavedBy Package Protection** | Adds a product to cart; usually references its own product, not merchant products. Low risk but confirm no product-ID-specific rules. | Verify in SavedBy admin after pilot. |
| **Yotpo Loyalty & Rewards** | Point-earning campaigns can target specific products. | Audit Loyalty campaigns for product-ID references, remap. |

### MEDIUM RISK — likely need a resync but no manual reconfiguration

| App | Migration action |
|---|---|
| **Translate & Adapt** | Translations attached to old product IDs need to be re-created on new products. Matrixify can export/import translations, or use the app to bulk re-apply. |
| **QuickBooks Online** | Historical orders keep old product IDs (fine). New orders reference new IDs. Reports may show two "versions" of the same product for a while. |
| **TripleWhale** | Attribution reports may split old vs new product IDs briefly. Historical data is preserved by TripleWhale's own ID mapping. |
| **CI x FP Analytics** (custom) | Likely reads product IDs via API. Verify with Flight Performance if any dashboard breaks. |
| **Marpipe** | Creative automation reads the product catalog. Auto-resyncs on next generation cycle. |
| **Trybe UGC** | UGC tags to product IDs. May need remap for continuity of tagged content. |
| **Affiliatly** | Tracks orders by variant ID for commission attribution. Old orders unaffected. New orders track new variants. |
| **Windsor.ai** | Ad-side analytics; reads catalog. Auto-resync. |
| **Shopify Flow** | I did NOT enumerate active Flow workflows. Audit these manually: any workflow with a "Product" trigger or condition referencing specific product IDs must be updated. |

### LOW RISK — no meaningful product-ID dependency

| App |
|---|
| Messaging (Shopify) |
| Shippo, ShipStation, ShipBob, FlavorCloud — fulfillment uses variant IDs; historical orders unaffected |
| Bundles that reference NO migrating products |
| Shopify CLI Connector, Shopify Claude Connector App |
| Knowledge Base |
| Matrixify (our migration tool) |

## Smart collections (108 total)

All smart collections use TAG-based, PRICE-based, INVENTORY-based, or TITLE-based rules. **UNION tag rule (G1) keeps every one of them working.** No smart collection rule needs to change.

### Exceptions I found

- The `Shop`, `Trends`, and `Black Friday Sales Campaign` smart collections all exclude specific products via **TITLE NOT_CONTAINS** rules. Titles matched: "striped mesh shorts", "forged in failure", "fif", "CI Patched crop hoodie", "sunwashed sweatpants", "labeled jersey 1/300". After migration your new "Forged in Failure Crewneck" family product will be EXCLUDED from Shop/Trends/BF because it contains "forged in failure" in its title. **Confirm this is intended.** If not, remove those NOT_CONTAINS rules.
- Duplicate/broken smart collections found: "Japan Drop Part 1" exists twice (handles `japan-drop-part-1` and `japan-drop-part-2` both filter tag `japandroppart1`), and "RESTOCK DROP PART 2" filters tag `restockdroppart1`. These naming inconsistencies exist today and don't affect migration but worth cleaning up.
- 24 `color-*` smart collections exist but 22 are empty (0 products). These represent an unrealized filter setup. Not a migration risk, but consider deleting the empty ones for a cleaner admin.

## Manual collections (49+ curated collections)

These are HIGH-impact: each one manually lists specific products by ID. When we archive old products and create new merged ones, every manual collection that contained a migrating product needs the old ID swapped for the new.

### Manual collections referenced by our 62 families

Total unique collections touched by family members: **101**. Includes both smart and manual.

The following manual collections (curated drops) have members that will migrate. Each needs to be re-populated after Phase 5.

- Project Scorpion
- Iron Therapy
- Golden Era vs. Dark Age
- Shock Drop + Golden Era Restock
- Golden Era vs. Dark Age - Featured for Home Page
- Project Scorpion - Featured for Home Page
- Fam Favorites
- Forged in Failure
- FIF Featured
- PUMP COVERS
- Imprisoned Minds– Part II
- Stealth Drop
- Dark Matter
- Arctic Drop
- The Butcher's Shop
- OG Drop
- Golden Era V2
- Vintage Drop
- Neutral Drop
- Evergreen Collection
- TRENDING
- Neutral Sweats
- Camo Three Packs
- NIGHTSHADE COLLECTION
- MARCH RESTOCK
- Blanks
- Smoke Drop
- Long Sleeve Pump Covers
- Cozy Collection
- Japan Restock
- Cropped Pumps
- Paranorman Drop
- Supercharged
- Product Templates
- Waffle Knit Collection
- BUTTERFLY WIDE LEG SWEATS
- For Sale
- SIGNATURE
- Tiktok Shop Collection
- Butterfly Effect
- ...plus additional pages of manual collections not enumerated here

**Recommended workflow**: use Matrixify to export current manual collection membership BEFORE migration. After each Phase 5 batch, Matrixify can update collection membership by product handle — old handles become 301-redirected to new handles, and Matrixify updates the collection's product list in one operation.

## Navigation menus (17 menus enumerated)

- **Only 1 product link found across all menus**: "Giftcard" → `/products/controlled-insanity-gift-card` (in menus "In Stock" and "MEGA MENU TEST"). This is the Gift Card, a LONER — no migration needed.
- **No collection or page link references a migrating product.**
- All menu entries link to collections, pages, or the general catalog. Migration-safe.

## URL redirects (CRITICAL)

When we archive old products and create new merged ones, existing customers, backlinks, ads, and cached search results all point to the old URLs. Every old handle needs a 301 redirect to the new family product.

- **255 old product URLs → 62 family URLs + 43 loner URLs = 105 destinations.**
- Matrixify handles this in a single `Redirects` sheet: rows of `redirect_from` / `redirect_to`. I generate the CSV from `_migration/mapping.csv` in Phase 4 and import in Phase 5.
- Loners keep their original handle — no redirect needed for those 43.
- 212 redirects needed total (255 - 43 loners).

## Reviews migration (Loox)

Loox does NOT auto-merge reviews when products consolidate. Their process:

1. Export current reviews with product IDs from Loox admin.
2. Provide Loox Support with a mapping CSV: `old_product_id` → `new_product_id`.
3. Loox runs their internal merge tool. Reviews reassign to new products, star ratings recalculate.
4. Post-merge: the `loox.avg_rating`, `loox.num_reviews`, `loox.review_feed` metafields on the new products refresh automatically within ~1 hour.

**Action item**: I'll email a mapping CSV template we can submit to Loox support in Phase 4 (pilot) so we can validate their process on one family before batching.

## Shopify limits (Plus)

| Limit | Value | Our biggest family | Status |
|---|---|---|---|
| Options per product | 3 | 2 (Color + Size) | OK |
| Variants per product | 100 (Plus: up to 2000 with request) | Evergreen Pump Cover: 11 colors × ~6 sizes = 66 variants; Heavyweight Sweatpants: 11 × 7 = 77 | OK, but close to 100 |
| Images per product | 250 | Estimated 5-10 images × 11 colors = 55-110 | OK |
| Product metafields | Unlimited | ~30 populated | OK |
| Variant metafields | Unlimited | ~12 populated | OK |

## Product templates

17 products currently use a non-default `template_suffix`:
- 2 use `platmart-swatch-product` (Gunmetal Gray + Faded Black Heavyweight Sweatpants)
- 1 uses `Default product` (Cherry Blossom Pump Cover) — this is a Shopify auto-created label, not a real template
- 14 use `japan-collection` (Japan Drop products)

**Warning**: neither `product.platmart-swatch-product.json` nor `product.japan-collection.json` exists in the theme repo (only `product.json` and `product.pump-cover.json`). These products may be silently falling back to the default template today. Confirm this is intended before migration; if you want the merged products to keep a specific template, we set `template_suffix` accordingly in Matrixify.

## Metafield migrations (from Phase 2)

- `productwiz.rio`, `productwiz.rio-options`, `globo--filter--product_recommendation.*`, `shopify--discovery--product_recommendation.*`, `custom.variant_products`, `loox.*`, `reviews.*` → DROP on new products. These reference old IDs or are managed by external apps and will repopulate.
- `shopify.color-pattern` → move to variant-level `shopify.color` metaobject reference so each color variant gets its own swatch.
- Everything else per Phase 2 Rules G8/G9.

## Recommended pilot family (Phase 4)

Best candidate = small family with clean data, few app dependencies, low downside if it breaks.

**My pick: `Iron Shell Skullie` (2 colors: Off White, Dusk).**

Rationale:
- Only 2 source products, low blast radius
- Accessories category, low traffic and low revenue impact if a mistake happens
- No `japan-collection` template complexity
- Not in Rebuy Data Sources (verifiable in pilot)
- Not in Loox review-heavy category (skullies rarely reviewed)

**Alternate**: `Butterfly Off The Shoulder Crewneck` (2 colors: Black, Grey) — also small, but already uses Color+Size structure so it's a lower-stress test of the tooling itself.

## Rollback plan

Everything reversible until Phase 5 batch is committed:
- **Draft state**: pilot and batch new products start as `DRAFT`. Not visible to customers. Delete or set to Archived to fully revert.
- **Originals kept**: originals stay `ACTIVE` alongside drafts through Phase 4-5 verification. Only in Phase 6 (not scoped yet) do we archive originals and cut redirects live.
- **Redirects**: applied as a batch via Matrixify. Import a "reverse redirects" CSV to remove them.
- **Metafield changes**: Matrixify keeps a rollback export of every changed metafield. Re-import to restore.
- **Loox reviews**: Loox Support can reverse a merge within 30 days.
- **App configurations (Rebuy, Klaviyo, Loop, VerifyPass)**: manual changes we made in each app admin. Document each change so we can undo them.

## Blocked / Need your input before Phase 4

1. **Confirm pilot family**: Iron Shell Skullie (recommended) or Butterfly Off The Shoulder Crewneck?
2. **Forged in Failure title exclusion**: The Shop/Trends/BF collections exclude "forged in failure" from the title. Should the new merged product be excluded from those collections too? If not, we need to remove that exclusion rule.
3. **Japan-collection template**: 14 Japan Drop products reference a template that doesn't exist in the theme. Keep the reference (silently falls back to default), remove it during migration, or restore the template file from an older theme version?
4. **Rebuy audit access**: Need you to walk through Rebuy Data Sources / Smart Cart rules and confirm what references product IDs vs collections. Or I can log in and inventory.
5. **Loop Returns audit**: Same as Rebuy — walk-through or admin access.
6. **Klaviyo flows**: Same. If we don't audit before Phase 4, we might miss product-ID-triggered flows.

## Deliverables from Phase 3

- `_migration/phase3-risk.md` — this report
- `_migration/apps-inventory.csv` — 26 apps with migration action per app
- `_migration/smart-collections.csv` — 108 smart collections with rules and product counts
- `_migration/manual-collections.csv` — 49+ manual collections

