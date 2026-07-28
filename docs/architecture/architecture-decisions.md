# Architecture decisions

Detailed records are in [`decisions/`](decisions/).

- Capabilities are the primary methodology unit.
- Report categories are separate aggregation/presentation constructs.
- Health, risk, and confidence are separate concepts.
- Published methodology versions must be immutable.
- TypeScript modules are authored source with runtime validation.
- Cross-category relationships do not duplicate capability scoring.
- Legacy flat structures are exposed through an adapter when needed.

