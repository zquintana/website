# Assessment Content

This folder now contains compatibility adapters for the current assessment UI.

The active methodology source of truth lives in:
- `../methodology/`

`assessment.v1.json` is retained as the original MVP manifest and conversion fixture. It should not be treated as the long-term editable source of truth.

The current adapters export:
- `assessmentCategories`
- `assessmentQuestions`
- `assessmentQuestionSetLabel`

Those exports are now produced from the versioned methodology read model so existing scoring and UI code can continue to work while the methodology is migrated capability by capability.

When refining the assessment with another agent, pass it:
- `../methodology/README.md`
- the relevant folder in `../methodology/capabilities/`
- `../methodology/types.ts`
- `../methodology/read-model.ts` if UI compatibility context is needed

Keep category weights totaling `100`.
