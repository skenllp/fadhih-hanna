# Cover Invitation (extracted)

The loader + "Open Invitation" gate from the Afshan & Anjum Nikkah site.
Vanilla HTML/CSS/JS, no dependencies. Open `index.html` to preview.

```
index.html              demo page (markup to copy)
css/cover.css           tokens, loader, gate, pill button, ripple, responsive
js/cover.js             loader hide, scroll lock, open gate, ripple
images/floral-corner.svg  watercolour corner ornament (used twice, 2nd rotated 180°)
fonts/EdwardianScriptITC.*  script font for names/monogram
```

## Design summary

| Thing | Value |
|---|---|
| Background | ivory `#FBF7F0` |
| Primary | sage/forest green `#626D53` (names use deep `#404A35`) |
| Accent | warm gold `#C9A07A` (ampersand, borders), dark gold `#9A7040` (eyebrow, venue) |
| Names | Edwardian Script ITC (fallback Great Vibes), `clamp(3.8rem, 11vw, 6.2rem)`, 0.5px text-stroke to thicken the hairlines |
| Labels | Cinzel, uppercase, wide tracking (0.22–0.38em) |
| Body line | Cormorant Garamond italic |
| Arabic | Amiri (Bismillah at the top) |
| Order | Bismillah → eyebrow → names → invite line → date → venue → button → ❋ divider |
| Motion | each line fades up + un-blurs (staggered 0.1s → 1.3s); loader is a sweeping gold/green line; opening = the whole gate fades and blurs to 18px |
| Button | outlined gold pill; green gradient slides up on hover; click ripple |

## Re-theming

Change the `--cv-*` tokens at the top of `cover.css` (primary, gold, bg, fonts).
For a different palette also recolour `images/floral-corner.svg`
(its gradients use `#626D53`, `#8A9E78`, `#D4A373`, `#7A9E7E`, `#B8CCAA`).

## Using it in another project

1. Copy `css/cover.css`, `js/cover.js`, `images/floral-corner.svg`, `fonts/`.
2. Add the Google Fonts link from `index.html` (Amiri, Cinzel, Cormorant Garamond, Great Vibes).
3. Paste the `cv-loader` and `cv-gate` blocks right after `<body>` and edit the text.
4. Listen for the open event to start music / reveal animations:
   ```js
   document.addEventListener('invitation:opened', () => { /* play music, etc. */ });
   ```

### Next.js / React

Import `cover.css` globally (keep the `fonts/` path relative, or move fonts to
`/public/fonts` and change the `url()`s). Then:

```jsx
'use client';
import { useEffect, useState } from 'react';

export default function Cover({ onOpen }) {
  const [loaded, setLoaded] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 1600);
    document.body.style.overflow = open ? '' : 'hidden';
    return () => { clearTimeout(t); document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      <div className={`cv-loader ${loaded ? 'is-hidden' : ''}`} aria-hidden="true">
        <div className="cv-loader__monogram">A &amp; A</div>
        <div className="cv-loader__tagline">Nikkah Invitation</div>
        <div className="cv-loader__bar-wrap"><div className="cv-loader__bar" /></div>
      </div>

      <div className={`cv-gate ${open ? 'is-open' : ''}`} role="dialog" aria-label="Opening invitation">
        <div className="cv-gate__floral cv-gate__floral--tl" aria-hidden="true"><img src="/images/floral-corner.svg" alt="" /></div>
        <div className="cv-gate__floral cv-gate__floral--br" aria-hidden="true"><img src="/images/floral-corner.svg" alt="" /></div>
        <div className="cv-gate__inner">
          <p className="cv-gate__arabic" dir="rtl" lang="ar">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
          <p className="cv-gate__eyebrow">By the Grace of Allah</p>
          <h1 className="cv-gate__names">Name <span className="cv-gate__amp">&amp;</span> Name</h1>
          <p className="cv-gate__invite-text">Kindly request your company…</p>
          <p className="cv-gate__date">Saturday · August 15, 2026 · 3:30 PM</p>
          <div className="cv-gate__venue">Venue name</div>
          <button className="cv-btn cv-btn--gate" onClick={() => { setOpen(true); onOpen?.(); }}>
            <span className="cv-btn__icon">✦</span> Open Invitation
          </button>
        </div>
        <div className="cv-gate__divider" aria-hidden="true">
          <span /><span className="cv-gate__divider-glyph">❋</span><span />
        </div>
      </div>
    </>
  );
}
```

(The ripple is a nice-to-have; in React you can skip it or port it as an onClick that appends a span.)

## Notes

- The original stylesheet named the green tokens `--color-maroon*` (leftover from an earlier palette) and the button hover shadow still used a maroon `rgba(123,45,62,…)`. Here the shadow follows the green primary via `--cv-primary-rgb`.
- Edwardian Script ITC is a commercial font. If the project is client-facing, confirm you hold a web licence, or leave Great Vibes as the fallback (already in the stack).
- Not included: the full-photo hero that appears after the gate. It is a separate block (`.hero` in the original) and can be extracted the same way.
