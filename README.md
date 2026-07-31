# sandbite.com

The Sandbite marketing site. Plain HTML, CSS and JavaScript — no build step, no
dependencies, no framework. Open `index.html` in a browser and it works.

## Files

```
index.html            Home
kona.html             Chapter 01 — Kona (live)
piha.html             Chapter 02 — Piha (in development)
404.html              Not-found page
robots.txt            Search engine rules
sitemap.xml           Search engine index
assets/
  css/site.css        The whole design system — every colour, size and layout rule
  js/checkout-config.js
                      Paste Stripe Payment Links here when checkout is live
  js/site.js          Mobile menu, checkout links, scroll reveal, nav highlighting
  favicon.svg         Browser tab icon (the landscape mark)
  apple-touch-icon.png
  img/                Photography and pack shots
  video/              Short looping video assets
_source/              Original brand handoff files. Not used by the site.
```

## Previewing it locally

Double-clicking `index.html` works fine. To see it exactly as a visitor will:

```bash
python3 -m http.server 8787
```

Then open <http://localhost:8787>.

## Putting it online at sandbite.com

Any static host will serve this. The simplest option, free, no account juggling:

1. Go to <https://app.netlify.com/drop>
2. Drag this whole folder onto the page.
3. It gives you a temporary URL immediately.
4. In **Site settings → Domain management**, add `sandbite.com`, then follow the
   DNS instructions it gives you at your domain registrar.

Cloudflare Pages and Vercel work the same way. If you would rather use hosting
you already pay for, upload the folder contents to the web root over FTP — there
is nothing to compile.

Netlify and Cloudflare both strip `.html` automatically, so `sandbite.com/kona`
will work once it is live. The links in the site use `kona.html` so that opening
the files directly from your Desktop also works.

## Changing things

**Prices, ingredients, allergens** — these are written directly into `kona.html`.
Search for the number you want to change.

**The colours** — top of `assets/css/site.css`, under `:root`. Change a value
there and it updates everywhere on every page.

**A new bar** — copy `piha.html`, change the copy, and add its landscape colours
as a new `[data-bar="..."]` block in the CSS. Each bar's mountain ridge is an SVG
path in the `<svg class="sprite">` block near the top of each page.

**Photos** — drop a new file into `assets/img/` and point the `<img src="...">`
at it. Keep images under about 1600px wide so pages stay fast.

**Stripe Payment Links** — create two live links in Stripe: one for the Kona
12-pack and one for Kona single bars. In Stripe, collect customer email, phone
and shipping address, and add your shipping/pickup options there. Paste the two
URLs into `assets/js/checkout-config.js`:

```js
window.SANDBITE_CHECKOUT = {
  konaBox: "https://buy.stripe.com/...",
  konaSingle: "https://buy.stripe.com/..."
};
```

Once both values are live `https://` links, the site switches the Kona buttons
from the Instagram fallback to direct Stripe checkout links automatically.

## Things still outstanding

1. **Four Kona ingredients are missing.** The brand doc only documents seven of
   the eleven: oats 20.1%, coffee 14.7%, roasted macadamia 12.6%, macadamia
   butter 12.6%, dates 10.7%, honey 8.8%, coconut flakes 8.8%. The remaining
   11.7% is shown on `kona.html` as a combined row for peanut butter, almonds,
   cashews, cacao, sea salt and butter. Send the final ingredient percentages
   and that row gets replaced.
2. **Your printed back label and site still need one final legal pass.** The
   site now declares peanuts, cashews, almonds, macadamia and butter as
   allergens. Make sure the final ingredient list, pack photography and printed
   label all agree before launch — this is an allergen declaration, so it
   matters more than anything else on this list.
3. **Stripe Payment Links still need to be created.** The site is wired for
   them, but `assets/js/checkout-config.js` is intentionally blank until the
   live links exist. Instagram remains the fallback.
4. **Instagram is the whole mailing list.** There is no email capture and no
   list provider, as agreed. If you want one later, the "Follow the batch"
   blocks are where the form would go.
5. **`hello@sandbite.com` needs to exist.** It is linked from every page. Set up
   the mailbox at your registrar before you point the domain at the site.
6. **The crew photo is the AI placeholder.** `assets/img/crew-tower.jpg` is the
   stock/AI lifeguard image from the handoff — the uniforms are Australian surf
   lifesaving, not Ericeira. It is the weakest thing on the site. Replace it
   with a real crew shot when you have one.
7. **Kona's photography is thin.** The chapter page reuses home-page photos.
   Kitchen and process shots would help most: coffee being brewed into the mix,
   the tray before it is cut, a bar in a hand.
8. **Stockists are deliberately honest.** Only Vizinha and direct ordering are
   named. Do not add shops here until they are actually selling it.

## Things I added beyond the copy you supplied

- **`piha.html`** — a full chapter page for Piha, using the Piha story from your
  brand document. The "still in the kitchen" card links to it. Delete the file
  and change that card from `<a>` to `<div>` if you would rather it stay a
  non-interactive card.
- **`404.html`** — so a wrong URL still looks like Sandbite.
- **"Made to move."** under the hero headline, from your packaging and the
  handoff's hero spec. It was not in the copy you pasted; remove the line in
  `index.html` if it was not meant to be there.
