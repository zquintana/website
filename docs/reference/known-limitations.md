# Known limitations

- Small question bank: 20 active/read-model questions, with uneven capability depth.
- Only three of 142 catalog capabilities have modules.
- Demonstration questions and weights have not been professionally validated.
- Answers are self-reported or manually selected evidence levels; no artifact or automated verification workflow exists.
- Applicability, business-service criticality, and industry tailoring are incomplete.
- No benchmark population exists.
- MVP success instrumentation for qualified consulting conversations, completion, booking, and conversion is not yet defined in the repository.
- No certification, compliance attestation, penetration test, legal advice, or guarantee is provided.
- Methodology hash is a placeholder; published immutable artifacts and historical loading are absent.
- Local persistence uses `mvp-1`, has no migrations/hash, stores respondent email, and has no server backup or multi-session support.
- A temporary flat read-model adapter and duplicated browser scoring runtime can drift from modular code.
- Modular finding conditions and category contribution metadata are validated but not fully executed.
- Standards mappings are broad in places and lack systematic source URLs/review dates.
- No dedicated lint/typecheck scripts, component tests, or end-to-end browser tests exist.
- `npx astro check` currently reports 23 existing diagnostics, including inline client-script typing and an import-extension diagnostic.
