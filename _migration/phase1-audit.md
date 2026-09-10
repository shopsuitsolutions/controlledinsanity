# Phase 1: Product Grouping Audit

Source: `active-products-2026-09-10.xlsx` (Matrixify export, 255 active products).



Method: Two grouping signals were combined.



1. **HIGH** confidence: the existing `custom.variant_products` product metafield explicitly lists sibling colorway handles. Products sharing a set were unioned into one family. Covers 138 products across 37 families.

2. **MEDIUM** confidence: for the remaining 117 products, titles were stripped of a color dictionary derived from known families plus a seed list of streetwear color and print words. Products with the same remaining "style stem" and same product type were grouped. Covers 61 products across 20 families.

3. **LOW** confidence: 18 products whose titles were fully consumed by color tokens (no stem left). Need manual grouping.

4. **LONERS**: 38 products with a unique stem. Most are single-color styles that stay as-is (accessories, gift card, one-off graphics), a few may still have color siblings I missed.


## Summary

- Total active products: 255

- Multi-color families proposed: 57 (37 HIGH + 20 MEDIUM)

- Products in multi-color families: 199

- Products needing manual review: 18 (LOW)

- Products staying as single-color: 38 (LONERS)



If the proposal holds, 255 products consolidate to roughly **57 multi-color families + 38 loners = 95 products**. Reduction of ~63%.


## Current variant option schemes in use

- `Size` only: 210 products (target for migration)

- `Color, Size`: 35 products (already structurally correct, but each has only ONE color value — still need consolidation)

- `Title`: 4 products (single-variant accessories: Sticker, Inferno Beanie, Tonal Web Skull Beanie, Collegiate Skull Beanie)

- `Sizes` (typo): 4 products (Cropped Chain Tank Creme, White/Black/Blue Camo Hyper Mesh Shorts) — should be normalized to `Size` during migration

- `Color` only: 1 product (Evergreen beanies)

- `Denominations`: 1 product (Gift Card, leave alone)


## HIGH confidence families (variant_products anchor)

These families are declared by the store itself via `custom.variant_products`.




### H-1: Track Pants (2 products)

| Product | Proposed color | Variants | Images |

|---|---|---|---|

| Varsity Blue & Gray Track Pants | Varsity Blue Gray | 5 | 4 |

| Forest Green Track Pants | Forest Green | 5 | 3 |


### H-2: Track Jacket (2 products)

| Product | Proposed color | Variants | Images |

|---|---|---|---|

| Varsity Blue & Gray Track Jacket | Varsity Blue Gray | 7 | 6 |

| Forest Green Track Jacket | Forest Green | 7 | 4 |


### H-3: Forged In Failure Crewneck (2 products)

| Product | Proposed color | Variants | Images |

|---|---|---|---|

| Brown Forged in Failure Crewneck | Brown | 7 | 6 |

| UNC Blue Forged in Failure Crewneck | UNC Blue | 7 | 4 |


### H-4: Lightweight Tee (2 products)

| Product | Proposed color | Variants | Images |

|---|---|---|---|

| White Stealth Lightweight Tee | White Stealth | 7 | 4 |

| Midnight Black Lightweight Tee | Midnight Black | 7 | 12 |


### H-5: Track Pants (2 products)

| Product | Proposed color | Variants | Images |

|---|---|---|---|

| Prime Layer Frost Blue Track Pants | Prime Layer Frost Blue | 7 | 3 |

| Prime Layer Forest Green Track Pants | Prime Layer Forest Green | 7 | 3 |


### H-6: Heavyweight Sweatpants (7 products)

| Product | Proposed color | Variants | Images |

|---|---|---|---|

| Gunmetal Gray Heavyweight Sweatpants | Gunmetal Gray | 5 | 4 |

| Faded Black Heavyweight Sweatpants | Faded Black | 5 | 6 |

| Navy Heavyweight Sweatpants | Navy | 5 | 8 |

| Forest Green Heavyweight Sweatpants | Forest Green | 5 | 7 |

| Washed Red Heavyweight Sweatpants | Washed Red | 5 | 5 |

| Heather grey Heavyweight Sweatpants | Heather grey | 5 | 7 |

| Pitch Black Heavyweight Sweatpants | Pitch Black | 5 | 4 |


### H-7: Pump Cover (8 products)

| Product | Proposed color | Variants | Images |

|---|---|---|---|

| Blackout Pump Cover | Blackout | 8 | 4 |

| UNC Blue Pump Cover | UNC Blue | 8 | 3 |

| Cool Grey Pump Cover | Cool Grey | 8 | 4 |

| Oreo Pump Cover | Oreo | 8 | 5 |

| Midnight Black Pump Cover | Midnight Black | 8 | 5 |

| Cherry Blossom Pump Cover | Cherry Blossom | 7 | 8 |

| Navy Pump Cover | Navy | 7 | 4 |

| Gunmetal Grey Pump Cover | Gunmetal Grey | 7 | 7 |


### H-8: Tee (4 products)

| Product | Proposed color | Variants | Images |

|---|---|---|---|

| Faded Tee | Faded | 7 | 6 |

| Black Stitched Cut Off Tee | Black Stitched Cut Off | 7 | 0 |

| Beige Stitched Cut Off Tee | Beige Stitched Cut Off | 7 | 0 |

| Cool Grey Stitched Cut Off Tee | Cool Grey Stitched Cut Off | 7 | 0 |


### H-9: Faded Cutoff Off White (2 products)

| Product | Proposed color | Variants | Images |

|---|---|---|---|

| Faded Cutoff Off White | (same as stem) | 7 | 9 |

| Faded Cutoff Dusk | Dusk | 7 | 5 |


### H-10: Smoke Pump Cover Off White (2 products)

| Product | Proposed color | Variants | Images |

|---|---|---|---|

| Smoke Pump Cover Off White | (same as stem) | 7 | 7 |

| Smoke Pump Cover Dusk | Dusk | 7 | 4 |


### H-11: Wide Leg Sweats Dusk (2 products)

| Product | Proposed color | Variants | Images |

|---|---|---|---|

| Wide Leg Sweats Dusk | (same as stem) | 5 | 7 |

| Wide Leg Sweats Black | Black | 5 | 7 |


### H-12: Iron Shell Skullie Off White (5 products)

| Product | Proposed color | Variants | Images |

|---|---|---|---|

| Iron Shell Skullie Off White | (same as stem) | 1 | 4 |

| Iron Shell Skullie Dusk | Dusk | 1 | 4 |

| Black Digital Print Bandana | Black Digital Print Bandana | 1 | 0 |

| Butterfly Skullie Black | Butterfly Black | 1 | 0 |

| Black Signature Hat | Black Signature Hat | 1 | 0 |


### H-13: Smoke Zip Up Hoodie (2 products)

| Product | Proposed color | Variants | Images |

|---|---|---|---|

| Smoke Zip Up Hoodie | (same as stem) | 7 | 10 |

| Smoke Zip Up Hoodie Grey | Grey | 7 | 2 |


### H-14: Pack (4 products)

| Product | Proposed color | Variants | Images |

|---|---|---|---|

| Dusk Beater Three Pack | Dusk Beater Three | 7 | 13 |

| Vintage Washed Beater 3-Pack | Vintage Washed Beater | 7 | 11 |

| Nightshade Beater 3-Pack | Nightshade Beater | 7 | 0 |

| Neutral Beater 3-Pack | Neutral Beater | 7 | 0 |


### H-15: Lightweight Tee Three Pack (2 products)

| Product | Proposed color | Variants | Images |

|---|---|---|---|

| Smoke Lightweight Tee Three Pack | Smoke | 7 | 17 |

| Butterfly Lightweight Tee Three Pack | Butterfly | 7 | 0 |


### H-16: Blank pump cover (3 products)

| Product | Proposed color | Variants | Images |

|---|---|---|---|

| Blank pump cover | (same as stem) | 7 | 11 |

| Blank Pumpcover | Pumpcover | 7 | 6 |

| Vintage Washed Pump Cover | Vintage Washed | 8 | 6 |


### H-17: Heavyweight Pullover (7 products)

| Product | Proposed color | Variants | Images |

|---|---|---|---|

| Heather Grey Heavyweight Pullover | Heather Grey | 7 | 6 |

| Forest Green Heavyweight Pullover | Forest Green | 7 | 6 |

| Navy Heavyweight Pullover | Navy | 7 | 6 |

| Washed Red Heavyweight Pullover | Washed Red | 7 | 5 |

| Pitch Black Heavyweight Pullover | Pitch Black | 7 | 6 |

| Gunmetal Grey Heavyweight Pullover | Gunmetal Grey | 7 | 6 |

| Faded Black Heavyweight Pullover | Faded Black | 7 | 6 |


### H-18: Heavyweight Zip Up (7 products)

| Product | Proposed color | Variants | Images |

|---|---|---|---|

| Faded Black Heavyweight Zip Up | Faded Black | 7 | 5 |

| Forest Green Heavyweight Zip Up | Forest Green | 7 | 5 |

| Gunmetal Grey Heavyweight Zip Up | Gunmetal Grey | 7 | 6 |

| Navy Heavyweight Zip Up | Navy | 7 | 3 |

| Washed Red Heavyweight Zip Up | Washed Red | 7 | 4 |

| Pitch Black Heavyweight Zip Up | Pitch Black | 7 | 5 |

| Heather Grey Heavyweight Zip Up | Heather Grey | 7 | 5 |


### H-19: Heavyweight Zip Up (2 products)

| Product | Proposed color | Variants | Images |

|---|---|---|---|

| Embossed Grey Heavyweight Zip-up | Embossed Grey | 7 | 4 |

| Embossed Black Heavyweight Zip-up | Embossed Black | 7 | 4 |


### H-20: Long Sleeve Pump Cover (2 products)

| Product | Proposed color | Variants | Images |

|---|---|---|---|

| Midnight Long Sleeve Pump Cover | Midnight | 7 | 4 |

| Blackout Long Sleeve Pump Cover | Blackout | 7 | 4 |


### H-21: Pullover (3 products)

| Product | Proposed color | Variants | Images |

|---|---|---|---|

| Midnight Pullover | Midnight | 7 | 6 |

| Blackout Pullover | Blackout | 7 | 7 |

| Cool Grey Pullover | Cool Grey | 7 | 4 |


### H-22: Snug Cover (2 products)

| Product | Proposed color | Variants | Images |

|---|---|---|---|

| Cool Grey Snug Cover | Cool Grey | 1 | 2 |

| Midnight Black Snug Cover | Midnight Black | 1 | 3 |


### H-23: Pump Cover (5 products)

| Product | Proposed color | Variants | Images |

|---|---|---|---|

| Smoke Inferno Pump Cover | Smoke Inferno | 7 | 4 |

| Toxic Inferno Pump Cover | Toxic Inferno | 7 | 4 |

| Electric Inferno Pump Cover | Electric Inferno | 7 | 2 |

| Blood red Inferno Pump Cover | Blood red Inferno | 7 | 4 |

| Silver Gradient Pump Cover | Silver Gradient | 7 | 4 |


### H-24: Pump Cover (5 products)

| Product | Proposed color | Variants | Images |

|---|---|---|---|

| Butterfly Blue Pump Cover | Butterfly Blue | 7 | 5 |

| Paranorman Black Pump Cover | Paranorman Black | 7 | 5 |

| Paranorman Blood Red Pump Cover | Paranorman Blood Red | 7 | 7 |

| Glossy Gray Pump Cover | Glossy Gray | 7 | 10 |

| Smoked Out Gray in Black Pump Cover | Smoked Out Gray in Black | 7 | 9 |


### H-25: Pump Cover (2 products)

| Product | Proposed color | Variants | Images |

|---|---|---|---|

| Inferno Cropped Red Pump Cover | Inferno Cropped Red | 5 | 4 |

| Inferno Cropped Pink Pump Cover | Inferno Cropped Pink | 5 | 4 |


### H-26: Wide Leg Sweats (6 products)

| Product | Proposed color | Variants | Images |

|---|---|---|---|

| Butterfly Blue Wide Leg Sweats | Butterfly Blue | 5 | 7 |

| Paranorman Black Wide Leg Sweats | Paranorman Black | 5 | 4 |

| Blood Red Wide Leg Sweats | Blood Red | 5 | 5 |

| Glossy Gray Wide Leg Sweats | Glossy Gray | 5 | 4 |

| Venom Green Wide Leg Sweats | Venom Green | 5 | 6 |

| Paranorman Purple Wide Leg Sweats | Paranorman Purple | 5 | 7 |


### H-27: Chained Baby Tee Midnight (8 products)

| Product | Proposed color | Variants | Images |

|---|---|---|---|

| Chained Baby Tee Midnight | (same as stem) | 5 | 4 |

| Chained Baby Tee Glossy Pink | Glossy Pink | 5 | 4 |

| Chained Baby Tee Grey | Grey | 5 | 4 |

| Chained Baby Tee Creme | Creme | 5 | 4 |

| Cropped Chain Tank Midnight | Cropped Chain Tank | 5 | 2 |

| Cropped Chain Tank Glossy Pink | Cropped Chain Tank Glossy Pink | 5 | 4 |

| Cropped Chain Tank Gray | Cropped Chain Tank Gray | 5 | 4 |

| Cropped Chain Tank Creme | Cropped Chain Tank Creme | 5 | 4 |


### H-28: Chrome Thermal (6 products)

| Product | Proposed color | Variants | Images |

|---|---|---|---|

| Chrome Thermal | (same as stem) | 7 | 2 |

| Chrome Thermal Glossy Pink | Glossy Pink | 7 | 4 |

| Chrome Thermal Toxic Green | Toxic Green | 7 | 4 |

| Chrome Thermal Electric Blue | Electric Blue | 7 | 5 |

| Hombre Thermal Grey Faded | Hombre Grey Faded | 7 | 4 |

| Hombre Thermal Beige Faded | Hombre Beige Faded | 7 | 5 |


### H-29: Pink Wing Sweatpants (3 products)

| Product | Proposed color | Variants | Images |

|---|---|---|---|

| Pink Wing Sweatpants | (same as stem) | 5 | 3 |

| Silver Wing Sweatpants | Silver | 5 | 5 |

| Wing Sweatpants (Copy) | Copy | 10 | 3 |


### H-30: Ghost Zip Up Blood Red (5 products)

| Product | Proposed color | Variants | Images |

|---|---|---|---|

| Ghost Zip Up Blood Red | (same as stem) | 7 | 5 |

| Ghost Zip Up Glossy Pink | Glossy Pink | 7 | 5 |

| Ghost Zip Up Creme | Creme | 7 | 5 |

| Ghost Zip Up Dusk | Dusk | 7 | 4 |

| Ghost Zip Up Toxic Green | Toxic Green | 7 | 2 |


### H-31: Chopper Crewneck Blackout (2 products)

| Product | Proposed color | Variants | Images |

|---|---|---|---|

| Chopper Crewneck Blackout | (same as stem) | 7 | 5 |

| Chopper Crewneck Midnight | Midnight | 7 | 5 |


### H-32: Ghost Sweatpants Toxic Green (4 products)

| Product | Proposed color | Variants | Images |

|---|---|---|---|

| Ghost Sweatpants Toxic Green | (same as stem) | 5 | 5 |

| Ghost Sweatpants Blood Red | Blood Red | 5 | 2 |

| Ghost Sweatpants Glossy Pink | Glossy Pink | 5 | 4 |

| Ghost Sweatpants Dusk | Dusk | 5 | 4 |


### H-33: Flame Cropped Hoodie Blackout (2 products)

| Product | Proposed color | Variants | Images |

|---|---|---|---|

| Flame Cropped Hoodie Blackout | (same as stem) | 5 | 5 |

| Flame Cropped Hoodie Glossy Pink | Glossy Pink | 5 | 4 |


### H-34: Tee Pack (4 products)

| Product | Proposed color | Variants | Images |

|---|---|---|---|

| Weighted Tee 3 - Pack | Weighted | 7 | 6 |

| Supercharged Lightweight Tee 3 - Pack | Supercharged Lightweight | 7 | 11 |

| Nightshade Lightweight Tee 3 - Pack | Nightshade Lightweight | 7 | 0 |

| Neutral Lightweight Tee 3 - Pack | Neutral Lightweight | 7 | 0 |


### H-35: Signature Wideleg Sweats - Pitch Black (7 products)

| Product | Proposed color | Variants | Images |

|---|---|---|---|

| Signature Wideleg Sweats - Pitch Black | (same as stem) | 5 | 5 |

| Signature Wideleg Sweats Grey | Grey | 5 | 5 |

| Signature Wideleg Sweats Faded Black | Faded | 5 | 5 |

| Vintage Sweats Black with White Stripes | Vintage with White Stripes | 5 | 0 |

| Form Straight Leggings Black | Form Straight Leggings | 5 | 0 |

| Form Straight Leggings Blue | Form Straight Leggings Blue | 5 | 0 |

| Morph Wide Leg Sweats Black | Morph Wide Leg | 5 | 0 |


### H-36: Print (2 products)

| Product | Proposed color | Variants | Images |

|---|---|---|---|

| Blended Zip Up Black with Grey Print | Blended Zip Up Black with Grey | 7 | 0 |

| Blended Zip Up Black with Black Print | Blended Zip Up Black with Black | 7 | 0 |


### H-37: Print (3 products)

| Product | Proposed color | Variants | Images |

|---|---|---|---|

| Butterfly Zip Up Black with White Print | Butterfly Zip Up Black with White | 7 | 0 |

| Butterfly Zip Up Black with Blue Print | Butterfly Zip Up Black with Blue | 7 | 0 |

| Butterfly Zip Up Beige with Black Print | Butterfly Zip Up Beige with Black | 7 | 0 |


## MEDIUM confidence families (title-stem clustering)

Same style stem + same product type. Please verify each.




### M-1: Butterfly Off The Shoulder Crewneck Black (2 products)

| Product | Proposed color | Variants | Images |

|---|---|---|---|

| Butterfly Off The Shoulder Crewneck Black | (same as stem) | 5 | 0 |

| Butterfly Off The Shoulder Crewneck Grey | Grey | 5 | 0 |


### M-2: Gray Iron Therapy Gunmetal Grey Long-Sleeve Compression (3 products)

| Product | Proposed color | Variants | Images |

|---|---|---|---|

| Gray Iron Therapy Gunmetal Grey Long-Sleeve Compression | (same as stem) | 7 | 5 |

| Signature Long Sleeve Compression Blue | Signature Blue | 5 | 0 |

| Signature Long Sleeve Compression Lilac Purple | Signature Lilac Purple | 5 | 0 |


### M-3: Onyx Black Iron Therapy Short-Sleeve Compression (3 products)

| Product | Proposed color | Variants | Images |

|---|---|---|---|

| Onyx Black Iron Therapy Short-Sleeve Compression | (same as stem) | 7 | 5 |

| Signature Short Sleeve Compression Lilac Purple | Signature Lilac Purple | 5 | 0 |

| Signature Short Sleeve Compression Blue | Signature Blue | 5 | 0 |


### M-4: Crewneck (4 products)

| Product | Proposed color | Variants | Images |

|---|---|---|---|

| Forest Green Crewneck | Forest Green | 7 | 5 |

| Black Forged in Failure Crewneck | Black Forged in Failure | 7 | 7 |

| Orange Forged in Failure Crewneck | Orange Forged in Failure | 7 | 6 |

| Cherry Blossom Crewneck | Cherry Blossom | 7 | 4 |


### M-5: Tech Pants (2 products)

| Product | Proposed color | Variants | Images |

|---|---|---|---|

| Beige Tech Pants | Beige | 5 | 7 |

| Black Tech Pants | Black | 5 | 7 |


### M-6: Heavyweight Sweatpants (3 products)

| Product | Proposed color | Variants | Images |

|---|---|---|---|

| Amethyst Heavyweight Sweatpants | Amethyst | 7 | 6 |

| Arctic Camo Heavyweight Sweatpants | Arctic Camo | 7 | 11 |

| Amethyst Camo Heavyweight Sweatpants | Amethyst Camo | 7 | 2 |


### M-7: Shorts (3 products)

| Product | Proposed color | Variants | Images |

|---|---|---|---|

| Prime Layer Frost Blue Shorts | Prime Layer Frost Blue | 5 | 4 |

| Prime Layer Midnight Black Shorts | Prime Layer Midnight Black | 5 | 4 |

| Prime Layer Forest Green Shorts | Prime Layer Forest Green | 5 | 4 |


### M-8: Track Jacket (3 products)

| Product | Proposed color | Variants | Images |

|---|---|---|---|

| Prime Layer Frost Blue Track Jacket | Prime Layer Frost Blue | 7 | 5 |

| Prime Layer Forest Green Track Jacket | Prime Layer Forest Green | 7 | 5 |

| Prime Layer Midnight Black Track Jacket | Prime Layer Midnight Black | 7 | 5 |


### M-9: Smoke Sweatshorts (2 products)

| Product | Proposed color | Variants | Images |

|---|---|---|---|

| Black Smoke Sweatshorts | Black | 5 | 3 |

| Grey Smoke Sweatshorts | Grey | 5 | 3 |


### M-10: Camo Spray Tee (2 products)

| Product | Proposed color | Variants | Images |

|---|---|---|---|

| Blue Camo Spray Tee | Blue | 7 | 0 |

| Sand Camo Spray Tee | Sand | 7 | 0 |


### M-11: Mesh Shorts (4 products)

| Product | Proposed color | Variants | Images |

|---|---|---|---|

| White Hyper Mesh Shorts | White Hyper | 5 | 0 |

| Black Hyper Mesh Shorts | Black Hyper | 5 | 0 |

| Blue Camo Mesh Shorts | Blue Camo | 5 | 0 |

| Sand Camo Mesh Shorts | Sand Camo | 5 | 0 |


### M-12: New York Cargo Wideleg - Black (2 products)

| Product | Proposed color | Variants | Images |

|---|---|---|---|

| New York Cargo Wideleg - Black | (same as stem) | 5 | 0 |

| New York Cargo Wideleg - Cool Grey | Cool Grey | 5 | 0 |


### M-13: Hyper Compression (2 products)

| Product | Proposed color | Variants | Images |

|---|---|---|---|

| White Hyper Compression | White | 7 | 0 |

| Black Hyper Compression | Black | 7 | 0 |


### M-14: Print (3 products)

| Product | Proposed color | Variants | Images |

|---|---|---|---|

| Waffleknit Zip Up Black with Black Print | Waffleknit Zip Up Black with Black | 7 | 0 |

| Waffleknit Zip Up Navy with Navy Print | Waffleknit Zip Up Navy with Navy | 7 | 0 |

| Waffleknit Zip Up Grey with Grey Print | Waffleknit Zip Up Grey with Grey | 7 | 0 |


### M-15: Waffleknit Sweatpants Black with Black (3 products)

| Product | Proposed color | Variants | Images |

|---|---|---|---|

| Waffleknit Sweatpants Black with Black | (same as stem) | 5 | 0 |

| Waffleknit Sweatpants Navy with Navy Print | Navy Navy Print | 5 | 0 |

| Waffleknit Sweatpants Grey with Grey Print | Grey Grey Print | 5 | 0 |


### M-16: Print (3 products)

| Product | Proposed color | Variants | Images |

|---|---|---|---|

| Waffleknit Pullover Black with Black Print | Waffleknit Pullover Black with Black | 7 | 0 |

| Waffleknit Pullover Navy with Navy Print | Waffleknit Pullover Navy with Navy | 7 | 0 |

| Waffleknit Pullover Grey with Grey Print | Waffleknit Pullover Grey with Grey | 7 | 0 |


### M-17: Print (4 products)

| Product | Proposed color | Variants | Images |

|---|---|---|---|

| Outlaw Waffleknit Zip Up Black with Grey Print | Outlaw Waffleknit Zip Up Black with Grey | 7 | 0 |

| Outlaw Waffleknit Zip Up Black with Beige Print | Outlaw Waffleknit Zip Up Black with Beige | 7 | 0 |

| Outlaw Waffleknit Zip Up Black with Red Print | Outlaw Waffleknit Zip Up Black with Red | 7 | 0 |

| Outlaw Waffleknit Zip Up Grey with Beige Print | Outlaw Waffleknit Zip Up Grey with Beige | 7 | 0 |


### M-18: Print (4 products)

| Product | Proposed color | Variants | Images |

|---|---|---|---|

| Reaper Waffleknit Sweatpants Black with Grey Print | Reaper Waffleknit Sweatpants Black with Grey | 5 | 0 |

| Reaper Waffleknit Sweatpants Black with Beige Print | Reaper Waffleknit Sweatpants Black with Beige | 5 | 0 |

| Reaper Waffleknit Sweatpants Black with Red Print | Reaper Waffleknit Sweatpants Black with Red | 5 | 0 |

| Reaper Waffleknit Sweatpants Grey with Beige Print | Reaper Waffleknit Sweatpants Grey with Beige | 5 | 0 |


### M-19: Print (5 products)

| Product | Proposed color | Variants | Images |

|---|---|---|---|

| Reaper Waffleknit Pullover Black with Grey Print | Reaper Waffleknit Pullover Black with Grey | 7 | 0 |

| Reaper Waffleknit Pullover Black with Beige Print | Reaper Waffleknit Pullover Black with Beige | 7 | 0 |

| Reaper Waffleknit Pullover Black with Red Print | Reaper Waffleknit Pullover Black with Red | 7 | 0 |

| Reaper Waffleknit Pullover Black with Purple Print | Reaper Waffleknit Pullover Black with Purple | 7 | 0 |

| Reaper Waffleknit Pullover Grey with Beige Print | Reaper Waffleknit Pullover Grey with Beige | 7 | 0 |


### M-20: Print (4 products)

| Product | Proposed color | Variants | Images |

|---|---|---|---|

| Tombstone Waffleknit Pullover Black with Grey Print | Tombstone Waffleknit Pullover Black with Grey | 7 | 0 |

| Tombstone Waffleknit Pullover Black with Beige Print | Tombstone Waffleknit Pullover Black with Beige | 7 | 0 |

| Tombstone Waffleknit Pullover Black with Red Print | Tombstone Waffleknit Pullover Black with Red | 7 | 0 |

| Tombstone Waffleknit Pullover Grey with Beige Print | Tombstone Waffleknit Pullover Grey with Beige | 7 | 0 |


## LOW confidence (needs your grouping decision)

These 18 titles were fully consumed by color tokens leaving no stem. I can see subgroups but want your call:




### Possible manual subgroups I see

- **Cropped Pumpcover family**: Cropped Midnight Pumpcover, Cropped Blackout Pumpcover, Cropped Cool Grey Pumpcover

- **Butterfly Wide Leg Sweats family**: Black w/ White, Black w/ Blue, Beige w/ Black

- **Graffiti Pump Cover family**: Black w/ White, Black w/ Blue

- **Signature Leggings family**: Black, Royal Blue

- **Camo Pump Cover family**: Amethyst Camo, Arctic Camo (currently loner-like; may pair with Amethyst/Arctic solids)




### All 18 LOW products

| Product | Type |

|---|---|

| Signature Leggings Black | Sweatpants |

| Signature Leggings Royal Blue | Sweatpants |

| Black Liquid Pump Cover | Pump Cover |

| Amethyst Pump Cover | Pump Cover |

| Arctic Camo Pump Cover | Pump Cover |

| Cherry Blossom Heavyweight Sweats | Sweatpants |

| Dusk Blossom Tee | T-Shirts |

| Amethyst Camo Pump Cover | Pump Cover |

| Cropped Midnight Pumpcover | Pump Cover |

| Cropped Blackout Pumpcover | Pump Cover |

| Cropped Cool Grey Pumpcover | Pump Cover |

| Blood Red Pump Cover | Pump Cover |

| Black with White Butterfly Wide Leg Sweats | Sweatpants |

| Black with Blue Butterfly Wide Leg Sweats | Sweatpants |

| Beige with Black Butterfly Wide Leg Sweats | Sweatpants |

| Black with White Graffiti Pump Cover | Pump Cover |

| Black with Blue Graffiti Pump Cover | Pump Cover |

| Morph Wide Leg Sweats Grey | Sweatpants |


## LONERS (single-color styles, no proposed family)

These have a unique stem in the catalog. Most stay as-is. Scan for anything that should have color siblings I missed.



| Product | Type | Variants |

|---|---|---|

| Signature Shorts Royal Blue | Shorts | 5 |

| Beige Scorpion Acid Wash Stringer | Tank Tops | 7 |

| Army Green Iron Therapy Heavyweight Tank Top | Tank Tops | 7 |

| Onyx Black Track Pants | Tracksuit | 5 |

| Death Moth Tee | T-Shirts | 7 |

| White Stealth Beater | Beater | 7 |

| Reaper Tee | T-Shirts | 7 |

| Storm Tee | T-Shirts | 7 |

| OG Sky Blue Beaters | Beater | 7 |

| Desert Cola Pump Cover | Pump Cover | 7 |

| Golden Era Sunset Tee | T-Shirts | 7 |

| Raglan 3/4 Tee Desert Cola | T-Shirts | 7 |

| Raglan 3/4 Tee Midnight Dusk | T-Shirts | 7 |

| Desert Cola Stringer | Tank Tops | 7 |

| Cherry Blossom Sweat Shorts | Shorts | 7 |

| Flame Pump Cover | Pump Cover | 7 |

| Flame Sweatpants | Sweatpants | 7 |

| Camo Parachute Pants | Sweatpants | 7 |

| Leather Jacket | Leather Jacket | 7 |

| Cutoff Tank Top | Cutoff Tanktop | 7 |

| Waffle Flame Long Sleeve | Sweatshirts | 7 |

| Camo Jersey | T-Shirts | 7 |

| Samurai Pullover Heavyweight Hoodie | Hoodies | 7 |

| Controlled Insanity Gift Card | Gift Card | 6 |

| 3D shadow Heavyweight Sweatpants | Evergreen Sweats | 5 |

| Pup Cover | Pup Cover | 5 |

| Inferno Beanie | Accessories | 1 |

| Evergreen beanies | Accessories | 6 |

| Flame Beater 3 Pack | Beater 3-Pack | 7 |

| Sticker | Accessories | 1 |

| Test Pump Cover for reference | Pump Cover | 7 |

| Graffiti Beater Pack | Beater 3-Pack | 7 |

| Metamorphosis Flannel Plaid | Sweatshirts | 7 |

| Tonal Web Skull Beanie | Accessories | 1 |

| Collegiate Skull Beanie | Accessories | 1 |

| Arctic Camo Sweatpants Camo White with Grey EMB | Sweatpants | 5 |

| Signature Long Sleeve Compression Black with White Text | Shirts | 5 |

| Signature Short Sleeve Compression Black with White Text | Shirts | 5 |


## Things I want you to look at before we go to Phase 2

1. **Family H-7 "Pump Cover"** groups 8 pump covers (Blackout, UNC Blue, Cool Grey, Oreo, Midnight Black, Cherry Blossom, Navy, Gunmetal Grey) into one style. This uses the store's own `variant_products` links, so it reflects merchandising intent. Confirm this is right — 8 colors of one style is bigger than the others.



2. **Family H-12 "Iron Shell Skullie"** has a data-quality issue: `variant_products` lumps it with Black Digital Print Bandana, Butterfly Skullie Black, and Black Signature Hat. Those are unrelated accessories. I would split this — Iron Shell Skullie Off White + Iron Shell Skullie Dusk stay together, the other three become loners. Confirm.



3. **Family M-4 "Crewneck"** groups Forest Green, Black Forged in Failure, Orange Forged in Failure, Cherry Blossom. "Forged in Failure" is likely its own style (see H-3). I would split into: Forged in Failure Crewneck (Black + Orange + Brown + UNC Blue from H-3), plus two loners (Forest Green Crewneck, Cherry Blossom Crewneck). Confirm.



4. **Family M-6 "Heavyweight Sweatpants"** groups Amethyst, Amethyst Camo, Arctic Camo. These may all be one family (heavyweight sweats in various colorways) alongside H-6 (Gunmetal Gray, Faded Black, Navy, Forest Green, Washed Red, Heather Grey, Pitch Black). If yes, they should probably merge into ONE 10-color family. If Amethyst / Camo prints are distinct styles, split apart. Your call.



5. **Loners with 7 variants**: Death Moth Tee, Reaper Tee, Storm Tee, Beige Scorpion Acid Wash Stringer, and others. Seven size variants is unusual (typically 5-6). Check they're real sizes vs. duplicate entries.



6. **Test Pump Cover for reference** — appears to be a test/staging product. Should this be archived before migration?



7. **Wing Sweatpants (Copy)** — has "(Copy)" in the title, likely a working draft. Confirm status.


## Non-blocking observations for later phases

- **Review app: Loox.** Metafields `loox.review_feed`, `loox.num_reviews`, `loox.avg_rating`, `loox.reviews` present on products. Loox reviews are tied to the product handle. Loox supports migration via handle mapping in their bulk import — will detail in Phase 3.

- **Other apps referencing product IDs detected via metafields**: Globo Filter (product recommendations), ProductWiz (upsells), ecomposer (page builder), Shopify Search & Discovery (search boost, related products, complementary products), mm-google-shopping (Google Merchant Center via app), mc-facebook (Meta catalog).

- **Product-level metafields already populated (varies by product)**: SEO title/description, Shopify color-pattern, Shopify size, fabric, age-group, neckline, activity, sleeve length, pants length, top length, target gender, custom.family, custom.color, custom.variant_products, custom.size_chart, custom.size_guide.

- **Variant-level metafields**: All the mm-google-shopping.custom_label_0..4, size_system, size_type, MPN, gender, condition, age_group, plus harmonized_system_code.

- **Shopify Plus limits**: Products can have up to 3 options, 100 variants, and 100 images. Your largest proposed family (H-6, 7 sweatpants) at 6 sizes = 42 variants. Fine. Even H-7 at 8 colors x 6 sizes = 48 variants. Also fine. Nothing is near the ceiling.
