# Cavies Studio website: asset provenance

Every generated or third-party asset that ships has a row here. If it is not in this file, it does not ship.
<!-- Rules adapted from the studio art pipeline. Keep them in the file. -->

## Where the record really lives
This site shows art, audio and video made in other repositories. Their provenance records are the source of truth, not this file.
- `studio/docs/portfolio-sources.md` records, per portfolio case and per Oddly Orderly asset, which repository and commit the media came from and how it was prepared.
- For Oddly Orderly, that file says the painted scenes and the music are AI-generated "with a provenance record for every asset in the game's repository" (`meowttt7/oddly-orderly`, revision `a2a7d4aa` for the store screenshots, trailer, capsules and icon). It also says Oddly Orderly and Butterpaw include AI-assisted or generated artwork with source provenance, and that no hand-painted or hand-lettered authorship claim is made.
- The repo holds no sidecars (seed, model, prompt) for these files. Those are in the game repositories.

## Rules
- **Raw output stays out of the repo.** Generated images, audio and video live outside it, in the batch output folder. Only finished, edited assets go in the repo, each with a row below.
- **Sidecars.** Every generation records its models (name, version, hash, licence), seed, sampler, size, prompt and date. The row below points to that record.
- **Licences.** Use only models and tools whose licence allows commercial use. Check before the first render, not at release. Record the licence name in the row.
- **Prompts.** No artist names, real people, brands, other products' characters or show references.
- **Text.** Models cannot spell. Draw titles and words in code over the art.
- **Copyright.** Raw generated output is probably not protected, so anyone could reuse it. What makes an asset ours is the editing, compositing, lettering and the product around it. Record the edits.
- **Before shipping.** Check each image for stray text, extra limbs and likeness to an existing character or logo.
- **Decided by.** The owner or a named reviewer picks every shipped asset from a contact sheet. "Interim pick" is not a final state.
- **Disclosure.** Stores and platforms may require an AI disclosure. Keep this file complete so the answer is easy.

## Shipped generated assets
<!-- One row per file in the repo. Audio and video go in this table too. -->

| Asset path | Tool and model (licence) | Batch or prompt reference | Seed | Date | Edits | Decided by |
|---|---|---|---|---|---|---|
| No rows recorded yet; see `studio/docs/portfolio-sources.md` and the provenance records in `meowttt7/oddly-orderly` | | | | | | |

Files under `studio/public/games/oddly-orderly/` (screenshots, trailer, capsule, icon, wordmark) the Butterpaw artwork (its brand capsule and memory illustrations; the prototype frame is a capture), the All Brain No Luck island art (`all-brain-no-luck-*.webp`) and the Lantern Burst art (`playables-lantern-burst-*.webp`), all under `studio/public/work/`, are the ones that include generated art or music. `studio/docs/portfolio-sources.md` says which frames carry it. Rows for them should be added from the game repositories' records, not guessed.

## Sourced third-party assets
<!-- Fonts, sound libraries, icons, code snippets, photos. Include anything that needs a notice in the product. -->

| Name | Licence | URL | Where used |
|---|---|---|---|
| `@fontsource-variable/manrope` 5.3.0 | OFL-1.1 (from the package's `package.json`) | https://www.npmjs.com/package/@fontsource-variable/manrope | Loaded in `studio/app/layout.tsx`; installed from npm (`studio/package.json`) |
| `@fontsource/dm-serif-display` 5.3.0 | OFL-1.1 (from the package's `package.json`) | https://www.npmjs.com/package/@fontsource/dm-serif-display | Loaded in `studio/app/layout.tsx` (400 italic); installed from npm (`studio/package.json`) |

Portfolio captures of other products are recorded case by case in `studio/docs/portfolio-sources.md`.

## Notices
None recorded. Check each licence before adding an asset that requires attribution, and say here where the notice appears.
