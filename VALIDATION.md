# Validation

Browser tested in the Codex Chromium preview:

| Viewport | Result |
| --- | --- |
| 320 × 740 | No horizontal page overflow; countdown and controls stay within the viewport; all images load. |
| 390 × 844 | Visual comparison with original: logo, name artwork, portrait, lace and first date have matching dimensions and vertical positions. |
| 768 × 1024 | No horizontal overflow; original location and credit destinations retained. |
| 1440 × 900 | Centered 480px invitation column; all artwork loads; desktop event controls and countdown scale correctly. |

Interaction checks: empty submission rejected; valid test wishes produce the local-save confirmation; close button dismisses; Escape dismisses and restores focus to the wishes trigger. Envelope reveals on scrolling into view. Countdown is clamped to zero after the event date.

All three external link URLs and new-tab behavior match the reference. No real wishes were sent to the original website.

The production build completed successfully. Reduced-motion rules are included; OS-level reduced-motion emulation was not separately tested. Animations reproduce the observed effect, with deterministic petal placement rather than the original random placement. The wishes backend is intentionally represented by browser-local persistence.
