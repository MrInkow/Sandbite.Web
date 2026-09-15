# sandbite.com

The Sandbite marketing site. Plain HTML, CSS and JavaScript — no framework, no
build step. Open `index.html` in a browser and it works.

## What this version is

A full rebuild against **Brand Document V1**. The product is a **portable
crumble with a squeeze-on jam**, not an energy bar. Flavour 01 is **Coffee**.
Places inspire flavours but do not own the brand, so the island material lives
on the story page only.

Every photograph on the site is currently a **placeholder that briefs the shot
it is waiting for** — shot ID, what it has to show, aspect ratio and lighting.
Search the HTML for `class="shot"` to find them all.

## Files

```
index.html            Home
coffee.html           Flavour 01 Coffee: purchase block, then the detail
story.html            Origin: Hawaii, Grandma Sara, KTA, Ericeira
contact.html          Stockists, orders, everything else
404.html              Not-found page
robots.txt            Search engine rules
sitemap.xml           Search engine index
assets/
  css/site.css        The whole design system — every colour, size and rule
  js/site.js          Mobile menu, checkout links, scroll reveal, nav highlight
  js/checkout-config.js
                      Paste the Stripe Payment Link here when it is live
  favicon.svg         The symbol
  img/
    sandbite-wordmark.svg         Wordmark, asphalt — for light backgrounds
    sandbite-wordmark-canvas.svg  Wordmark, canvas — for dark backgrounds
    sandbite-symbol.svg           Symbol alone
    og-sandbite.png               Social preview card
    waipio-valley.jpg             Hawaii — story page
    ericeira-firefighter-sandbite.jpg
                                  Bombeiros Ericeira — story page
    bay-dawn.jpg, coast-sunset.jpg, crew-tower.jpg
                                  Unused; kept for reference
scripts/build-deploy.sh
                      Copies only public website files into dist/ for hosting
```

## Previewing it locally

Double-clicking `index.html` works. To see it exactly as a visitor will:

```bash
python3 -m http.server 8787
```

Then open <http://localhost:8787>.

## The design system

Everything is driven by custom properties at the top of `assets/css/site.css`.

| Token | Value | Use |
| --- | --- | --- |
| `--asphalt` | `#1B1C1A` | Type, structure, dark bands |
| `--paper` | `#F1ECE3` | Default page ground |
| `--canvas` | `#E7E0D3` | Alternate band |
| `--chore` | `#315E6B` | Workwear blue: the format band, one split per page |
| `--flavour` | `#BD5E23` | Worksite Orange, large marks and borders |
| `--flavour-pale` | `#E08A45` | Flat panels; carries near-black type at 6.4:1 |
| `--flavour-lift` | `#D4712F` | Orange on asphalt, 5.1:1 |
| `--flavour-deep` | `#9A4A18` | Small text and fill buttons on light, 4.9:1 |

Orange has four shades because one mid-tone cannot clear 4.5:1 on both a light
and a dark ground. Use `--flavour-deep` for anything small on light.

**Contextual colour is the last block in the stylesheet, on purpose.** Component
defaults like `.on-dark .shot__id` carry the same specificity as band overrides
like `.band--blue .shot__id`, so position decides the winner. A band override
placed anywhere above that block silently loses — this caused invisible text on
the blue band twice.

**Colour has roles, one each.** Off-white is the ground. Black carries
statements and the footer. Workwear blue carries the format band and one split
per page. Orange is reserved for the Coffee flavour and small accents: buttons,
eyebrows, crop marks. Adding a second orange panel is how this stops working.

**Adding a flavour** takes four values. Add a block next to
`[data-flavour="coffee"]` in the CSS, set the four `--flavour*` tokens, then put
`data-flavour="yourflavour"` on the `<html>` tag of its page. Eyebrows, muted
copy, callouts and stamps resolve from the band they sit on, so nothing else
needs touching.

**Type** is Anton for display, Roboto Condensed for nav, buttons and labels,
Roboto for running text, and Roboto Mono for data. Loaded from Google Fonts for
now — see "Still outstanding" below.

**Rules of the system:** no border radius, no shadows, no gradient fills. 2px
asphalt borders carry structure, 1px warm hairlines divide the inside of
panels. It has to survive a photocopier.

## Photography

The placeholders name the shots. Priority order:

1. **Tier B (B1–B4)** — tear, push, squeeze, bite. Four frames, tripod locked,
   identical framing and light. Without these there is no format section, and
   the format is the product's whole difference. These block the build.
2. **Tier D (D1–D4)** — the box of 3 on an asphalt ground under hard
   directional light. Replaces the deleted pack renders.
3. **Tier A (A1–A3)** — hands, jam, crumbs, mess. 80% of the site's imagery
   should be this.
4. **Tier C (C1, C4, C7)** — the break: tailgate, site at lunch, kitchen
   mid-batch. Documentary, available light.

Deliberately absent, per the brand document: beige wellness minimalism,
AI-generated food, perfectly placed crumbs, fake vintage grain, hard hats as
props, anything that looks untouched by a person.

## Putting it online with GitHub + Cloudflare Pages

Push to GitHub, then connect the repo in Cloudflare Pages:

```
Framework preset: None
Production branch: main
Build command: sh scripts/build-deploy.sh
Build output directory: dist
Root directory: leave blank
```

## Checkout

The site is wired for one Stripe Payment Link. Create it in Stripe for the
**box of 3 at €7**, collecting email, phone and shipping address, with your
shipping options configured there. Then paste it in:

```js
window.SANDBITE_CHECKOUT = {
  coffeeBag3: "https://buy.stripe.com/..."
};
```

Until that is a live `https://` link, every buy button falls back to Instagram
and the "card checkout is not switched on yet" note stays visible. Once it is
live, the buttons switch to Stripe and the note hides itself.

## Still outstanding

1. **The photography.** Everything above. Tier B blocks the most.
2. **The recipe.** Exact percentages, the jam composition, the nutrition panel
   and the final allergen declaration are deliberately not published. The site
   currently says "contains nuts" and nothing more specific. Do not publish the
   full panel until the printed label agrees with it — it is a legal
   declaration.
3. **Caffeine and energy claims.** Nothing is claimed yet, on purpose. Decide
   what is defensible once the finished recipe is measured.
4. **The packaging prototype.** The site describes a one-tear pack that opens
   both sections. That has to exist and be manufacturable before launch, and it
   gates Tiers B and D.
5. **Unit economics.** €7 for three is €2.33 each, against €2.99 sold singly. The old €0.65/bar cost
   assumption was for a single-component bar; two compartments and a jam sachet
   will move it. Finish the cost sheet before this price becomes a commitment.
6. **Legal pages.** EU distance selling needs terms, a 14-day withdrawal
   notice, shipping and returns, and a privacy page. None exist yet.
7. **Self-host the fonts.** Hotlinking Google Fonts has been found to breach
   GDPR in the EU. Subset Roboto Condensed, Roboto and Roboto Mono to WOFF2 and
   serve them from `assets/` — also faster.
8. **Wholesale page.** The channel plan is independents first, with a target of
   20 stockists. There is nothing on the site for a shop owner yet.
9. **Stockists are deliberately honest.** Vizinha, Ericeira. Do not add shops
   until they are actually selling it.
