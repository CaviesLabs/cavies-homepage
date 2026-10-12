# Portfolio motion, scope builder, and enquiry ticket

Reviewed the 25-second reel in [D's 10 October 2026 post](https://x.com/domdosu/status/2108608112345100455) directly in the browser. It shows a Dream trading flow: each step's decision becomes a chip in a running sentence ("I think HYPE will be above $98 by Dec 11 with $140"), values settle letter by letter, dial-style selectors answer each choice with movement, and the flow ends with a ticket printed from a slot. The reference's finance controls, scenery, branded assets, and the trading metaphor are not copied.

Cavies applies three of its ideas: decisions become chips in a sentence, movement answers a decision, and the flow ends on one object the visitor can read back.

Keep the existing brand: paper `#f7f7f2`, ink `#39292d`, muted `#68615f`, wine `#69313e`, line `#deded5`, and lime `#dcf59b`; Manrope body text and the existing display typography. Game art supplies the additional color. Keep surrounding controls quiet; avoid a second animated hero, persistent particles, cursor replacement, forced scrolling, decorative counters, or device mockups that hide the interface.

## Selecting work and game screens

- Selected indicators move between controls. Arrow keys, Home, and End select without a mouse.
- Full images fit a stable 16:10 stage. Full-resolution files remain one click away; no content is cover-cropped.
- Image entrance follows user selection and loading. Movement is a few pixels with a short fade, not a zoom or rotation.
- The showcase caption, counter, and game captions settle into their new text with `MorphText` after a selection.
- No auto-advancing carousel or always-running animation is added. The reflective monogram retains its on-demand rendering.

## Scope builder (`/#scope`)

Under the monthly plans, three option rows (help with, stage, timing) compose "We need [a new business website], [starting as soon as possible]." Each row is a native radio group with a wine indicator that slides to the choice; the lime chips settle into the new phrase. The sentence is a polite live region, so the composed result is announced after each choice.

"Discuss this scope" links to `/contact?help=…&stage=…&timing=…`. Plan cards and the primary calls to action pass only `help`, which preselects the service. `lib/project-scope.ts` holds every option, phrase, and the mapping to the enquiry service allowlist; `tests/project-scope.test.mjs` checks the mapping, the sentences, and query parsing.

## Contact continuity and the ticket

A complete scope from the URL appears as a stub above the form, preselects the service radio group (the former select), and prefills the first line of the brief with the same sentence. The prefill is derived state until the visitor edits the brief or clears the form, so nothing is written to the URL or stored. Partial scopes only preselect the service. Unknown query values are ignored.

After the server confirms delivery, the status line is unchanged and an enquiry ticket feeds out from under an "Enquiry sent" slot: service, the scope sentence when present, name, reply-to address, website, the brief (without repeating the sentence), and the sending address. It is a summary of what the visitor typed, held in memory only. "New enquiry" clears the form. The email-draft path keeps its selectable textarea.

## Motion rules

- Transitions last 180–760 ms with the existing ease-out curve. The letter settle takes 220–460 ms depending on length.
- Reduced motion disables the sliding indicators, the letter settle, and the ticket feed; content appears immediately.
- `MorphText` renders the final text on the server, only animates after a user change, writes to the DOM inside animation frames, keeps the real text in a visually hidden span for assistive technology, and excludes that span from copy.
- Initial content and all links are server-rendered. Without JavaScript the builder's link still opens the contact page with the default scope.

See `portfolio-sources.md` for source revisions, development status, and artwork/prototype distinctions.
