# Phase 2: Conflict Report

Analyzed all 62 proposed families for cross-sibling disagreements.
**60** families have at least one conflict; **2** are conflict-free.

## Conflict category breakdown

| Category | Families affected |
|---|---|
| body_html | 48 |
| product_metafields | 45 |
| collections | 30 |
| tags | 23 |
| price | 7 |
| compare_at_price | 6 |
| variant_metafields | 6 |
| template | 4 |
| type | 3 |

## Proposed global resolution rules

Rather than resolve 60+ families field-by-field, I propose default rules. You confirm each rule, and I only bring you specific families where a rule needs a case-by-case call.

### Rule G1: Tags — UNION across siblings
Every tag on any sibling product carries into the merged product. Rationale: preserves searchability and any filter/collection rules that depend on tags. Streetwear drops especially need this since seasonal tags (`restockdroppart1`, `japandroppart1`, `japanpart2`) only sit on some colors.

**Exception to confirm**: size tags (`size-s`, `size-m`, ..., `size-4xl`) are already inconsistent because they were manually applied per-product for size-based collection filters. In the merged product with a Size variant option, these tags are redundant. **Proposal: DROP all `size-*` tags during migration** and rely on variant Size values. Confirm.

### Rule G2: Collections — UNION across siblings
Same reasoning as tags. Any smart (automated) collection re-evaluates based on the merged product's tags/attributes anyway.

**Exception**: If a smart collection filters by size-tag (e.g. a `size-4xl` collection), that filter must be rewritten to use variant Size instead. I'll flag which smart collections need rule changes in Phase 3.

### Rule G3: Price and Compare-at Price — keep PER-VARIANT
Shopify supports different prices per variant natively. If Cherry Blossom is $60 and Blackout is $55, both prices persist on their color variant. No decision needed per family.

### Rule G4: Vendor — use most common
If a family has one outlier vendor, use the majority. I'll flag any family where vendor legitimately varies.

### Rule G5: Product Type — normalize to base type
For families where sub-types like "Evergreen Pump Cover" and "Pump Cover" coexist, standardize to the shorter/broader base type ("Pump Cover"). Same for others where drop-specific types crept in.

### Rule G6: Template — use the theme default (blank)
Sole outlier that specifies "Default product" is redundant with the theme default. Blank it out for consistency.

### Rule G7: Description (Body HTML) — pick canonical + review**
This is the biggest content decision. Options:

- **G7a**: For each family, use the LONGEST description as canonical. Cleanest signal that the description was the "finished" one.
- **G7b**: Use the description of the product with the MOST inventory (proxy for the "hero" color).
- **G7c**: I write a merged/unified description per family, you review each one.
- **G7d**: You review each of the 48 families and pick the canonical yourself.

**Recommendation**: G7a for now. Any families where the LONGEST description is bad/wrong, we override manually. This gets us to a working draft fastest.

### Rule G8: Product metafields

| Metafield category | Default | Reason |
|---|---|---|
| `shopify.color-pattern` | **MOVE to variant-level** as `shopify.color` | Each color variant needs its own color-pattern reference for swatches |
| `shopify.size` | DROP (redundant with variant Size) | Shopify auto-derives from variant options |
| `custom.color` | **MOVE to variant-level** | Same reason — per-color hex code |
| `custom.variant_products` | DROP (obsolete after consolidation) | This metafield only existed to link the separate color products |
| `custom.family` | Set to new family display name | Repurpose for the family name |
| Attribute fields (fabric, neckline, target-gender, activity, fit, sleeve-length, pants-length, top-length, waist-rise, age-group, activewear-features, clothing-features, accessory-size, bra-*) | Use MOST COMMON non-null value across siblings | Attributes describe the garment structure, not the color |
| SEO (`title_tag`, `description_tag`) | Use LONGEST value or DERIVE from title | Same principle as body HTML |
| Google/Facebook categories (`mm-google-shopping.google_product_category`, `mc-facebook.google_product_category`) | MOST COMMON | Should be uniform |
| `mm-google-shopping.custom_product` (boolean) | ANY sibling = true → true | Google Shopping opt-in |
| `custom.size_chart`, `custom.size_guide`, `custom.size_chart_image` | Use non-null (first found) | Size chart is style-level, not color-level |
| `shopify--discovery--product_search_boost.queries` | UNION | Search keywords should combine |
| `shopify--discovery--product_recommendation.*`, `globo--filter--product_recommendation.*` | DROP and regenerate in Phase 3 | These reference old product IDs |
| `reviews.rating`, `reviews.rating_count` | Rebuild from Loox after migration | These are managed by Loox |
| `loox.*` | DROP and let Loox repopulate | Loox will resync |
| `ecomposer.countdown*` | Use non-null (first found) | Only relevant during a countdown period |
| `productwiz.rio`, `productwiz.rio-options` | DROP and rebuild in ProductWiz | These reference old product IDs |

### Rule G9: Variant metafields

These are naturally per-variant already:
- `mm-google-shopping.mpn`, `mm-google-shopping.custom_label_0..4` — keep per-variant as-is, they carry into the corresponding color+size variant in the merged product
- `harmonized_system_code` — should be uniform across variants of the same product; take MOST COMMON
- `mm-google-shopping.size_system`, `size_type`, `gender`, `condition`, `age_group` — should be uniform; take MOST COMMON per family

## Families requiring manual review

The following families have conflicts that don't fit cleanly into a global rule and need your specific call. Everything else is covered by the rules above.

### Price differences within family (7 families)

Rule G3 says keep per-variant, so no action needed unless you want to normalize a family to one price. Listed here for visibility.

| Family | Prices by product |
|---|---|
| Evergreen Pump Cover | Blackout Pump Cover=$55, UNC Blue Pump Cover=$55, Cool Grey Pump Cover=$55, Oreo Pump Cover=$55, Midnight Black Pump Cover=$55, Cherry Blossom Pump Cover=$60, Navy Pump Cover=$55, Gunmetal Grey Pump Cover=$55, Amethyst Pump Cover=$55, Amethyst Camo Pump Cover=$60, Arctic Camo Pump Cover=$60 |
| Heavyweight Sweatpants | Gunmetal Gray Heavyweight Sweatpants=$75, Faded Black Heavyweight Sweatpants=$75, Navy Heavyweight Sweatpants=$65, Forest Green Heavyweight Sweatpants=$65, Washed Red Heavyweight Sweatpants=$65, Heather grey Heavyweight Sweatpants=$65, Pitch Black Heavyweight Sweatpants=$65, Amethyst Heavyweight Sweatpants=$70, Amethyst Camo Heavyweight Sweatpants=$75, Arctic Camo Heavyweight Sweatpants=$75, Cherry Blossom Heavyweight Sweats=$75 |
| Heavyweight Zip Up | Faded Black Heavyweight Zip Up=$60, Forest Green Heavyweight Zip Up=$65, Gunmetal Grey Heavyweight Zip Up=$60, Navy Heavyweight Zip Up=$65, Washed Red Heavyweight Zip Up=$65, Pitch Black Heavyweight Zip Up=$65, Heather Grey Heavyweight Zip Up=$60 |
| Wide Leg Sweats | Butterfly Blue Wide Leg Sweats=$75, Paranorman Black Wide Leg Sweats=$75, Blood Red Wide Leg Sweats=$75, Glossy Gray Wide Leg Sweats=$75, Venom Green Wide Leg Sweats=$75, Paranorman Purple Wide Leg Sweats=$75, Wide Leg Sweats Dusk=$65, Wide Leg Sweats Black=$65 |
| Forged in Failure Crewneck | Black Forged in Failure Crewneck=$70, Brown Forged in Failure Crewneck=$40, Orange Forged in Failure Crewneck=$40, UNC Blue Forged in Failure Crewneck=$40 |
| Lightweight Tee 3-Pack | Weighted Tee 3 - Pack=$90, Supercharged Lightweight Tee 3 - Pack=$100, Nightshade Lightweight Tee 3 - Pack=$100, Neutral Lightweight Tee 3 - Pack=$100, Smoke Lightweight Tee Three Pack=$100, Butterfly Lightweight Tee Three Pack=$100 |
| Beater | White Stealth Beater=$15, OG Sky Blue Beaters=$10 |

### Product type inconsistency (3 families)

Rule G5 default: normalize to base type. Confirm the target per family:

| Family | Types found | Proposed target |
|---|---|---|
| Evergreen Pump Cover | Pump Cover: 6, Evergreen Pump Cover: 5 | Pump Cover |
| Heavyweight Sweatpants | Evergreen Sweats: 7, Sweatpants: 4 | Sweatpants |
| Chained Baby Tee | baby tee: 3, Cropped Tank: 1 | baby tee |

### Descriptions — top 10 families with widest length variance

Under Rule G7a (use LONGEST) these will pick the longest. Skim the top of this list to see if the longest is actually the right one to keep.

| Family | Members | Shortest → Longest chars |
|---|---|---|
| Smoke Pump Cover | 7 | 2322 → 5843 |
| Wide Leg Sweats | 8 | 663 → 1918 |
| Heavyweight Sweatpants | 11 | 266 → 1301 |
| Lightweight Tee 3-Pack | 6 | 766 → 1774 |
| Beater 3-Pack | 6 | 748 → 1656 |
| Evergreen Pump Cover | 11 | 326 → 1034 |
| Inferno Pump Cover | 5 | 1089 → 1691 |
| Signature Long Sleeve Compression | 3 | 1078 → 1659 |
| Signature Short Sleeve Compression | 3 | 1079 → 1660 |
| Stitched Cut Off Tee | 3 | 785 → 986 |

### Families with NO conflicts (already aligned, safe to build first)

- Hyper Compression
- Raglan 3/4 Tee

## Next step

Confirm the G1-G9 defaults (or send corrections). Once approved, I generate a resolved-values sheet per family showing what the merged product will actually get, ready for Phase 3 (risk check) and Phase 4 (pilot build).
