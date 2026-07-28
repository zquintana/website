# Business goals

This document records the product direction supplied by the business owner. It is the authoritative reference for mission, target market, personas, positioning, and long-term product direction. It does not override executable methodology behavior; current implementation status remains documented in [the active methodology version](../reference/active-methodology-version.md) and [known limitations](../reference/known-limitations.md).

## Mission

Help growing businesses understand, measure, and continuously improve the health of their technology.

The platform provides an objective Technology Maturity Assessment that identifies operational risk, security gaps, documentation issues, vendor dependencies, infrastructure weaknesses, and opportunities for modernization and AI adoption. It translates technology into business priorities so owners can make informed decisions and use the assessment as the foundation for ongoing technology advisory services.

## Long-term vision

Become the trusted system of record for measuring and improving technology maturity in small and medium-sized businesses.

The long-term product should evolve from a one-time assessment into a continuous technology operating platform that helps businesses monitor, benchmark, and improve technology over time. Benchmarking and continuous monitoring are future capabilities, not claims made by the current MVP.

## Target customer

The primary market is small and medium-sized businesses with approximately 10–250 employees that depend heavily on technology but do not have a dedicated CIO, CTO, or mature internal IT department.

Relevant industries include construction, manufacturing, professional services, engineering, healthcare, accounting, legal, logistics, commercial real estate, and multi-location retail or service businesses.

Common characteristics include Microsoft 365 or Google Workspace, cloud-based software, an MSP or small internal IT team, multiple technology vendors, limited strategic technology planning, and concern about cybersecurity, business continuity, operational efficiency, and growth readiness.

## Personas

| Persona | Primary goals | Typical pain |
| --- | --- | --- |
| Business owner / CEO — primary buyer | Reduce risk, grow, make informed investments, ensure technology supports the business | Cannot tell whether IT is performing well; wants understandable advice and a trusted advisor |
| COO / operations director | Improve efficiency, reduce downtime, standardize processes, improve continuity | Technology bottlenecks, poor vendor coordination, wasted employee time, incomplete continuity planning |
| CFO / controller | Reduce unnecessary spend, improve budgeting, understand financial risk | Unknown subscriptions, unclear cloud spend, duplicate software, uncertain investment value |
| IT manager / internal IT | Validate infrastructure, prioritize improvements, gain executive support, build a roadmap | Difficulty communicating technical risk and obtaining strategic support |
| Managed service provider | Differentiate, communicate business value, provide standardized assessments and roadmaps, retain customers | Help-desk work is hard to connect to business value; limited assessment tooling |
| Private equity / business buyer — future market | Evaluate risk, estimate modernization cost, identify liabilities, prioritize post-acquisition work | Limited diligence visibility and no standardized technology maturity framework |

The MSP is a potential channel, partner, or customer persona. The product is not intended to become an MSP remote-management or help-desk platform.

## Core value proposition

Give business leaders the clarity and confidence to make better technology decisions. The platform measures technology maturity, identifies the highest business risks, prioritizes improvements, and creates a practical roadmap for a more secure, resilient, and efficient organization.

## Product direction decisions

### Commercial motion

The long-term business is a recurring Technology Maturity Platform. The initial commercial motion is consulting lead generation. The assessment must provide enough standalone value to establish credibility, while primarily generating qualified consulting engagements and recurring Fractional Technology Partner relationships. The software should evolve toward subscription use without requiring a redesign.

### Primary user experience

The first release is optimized for business owners, CEOs, COOs, and other executives. Reports must answer: What are our biggest risks? Why do they matter? What should we do next? Technical evidence, implementation details, and IT/MSP-specific information are supporting layers, not prerequisites for understanding the result. IT-manager and MSP-specific workflows are later iterations.

### Meaning of objective

Objective means standardized, repeatable, and informed by recognized industry frameworks—not necessarily independently verified in every MVP assessment. Findings should use objective evidence whenever practical, including configuration reviews, documentation, screenshots, integrations, and interviews. Subjective opinions should be minimized and clearly distinguished from evidence.

The target finding confidence vocabulary is:

| Confidence | Meaning |
| --- | --- |
| Verified | Confirmed through an integration or strong evidence source |
| Observed | Confirmed during manual review |
| Reported | Based on customer interview or questionnaire response |

The current code uses lower-level evidence identifiers (`self-reported`, `documentation-reviewed`, `manually-verified`, and a hidden `automatically-verified` level). These are implementation terms that must eventually map to the executive-facing vocabulary above.

### Assessment lifecycle

The data model must support repeat assessments from the beginning. The MVP should focus on an excellent baseline assessment; trend analysis, historical comparison, benchmarking, and continuous monitoring are planned capabilities that must not delay the initial release. A future session model should identify the customer, assessment instance, methodology version, assessment date, and prior-assessment relationship without changing historical results.

### Success metrics

The primary MVP success metric is qualified consulting conversations generated from completed assessments. Secondary metrics are assessment completion rate, consultation booking rate, and consulting conversion rate. Long term, the most important product metric becomes measurable improvement in customer Technology Maturity over time.

## Guiding principle

The assessment is the technology equivalent of a financial health assessment: it gives business leaders an objective understanding of technology health, risk, resilience, and strategic readiness. Every product decision should prioritize executive clarity while retaining enough technical depth to support implementation.

## Positioning

The platform is a Technology Maturity Platform—not a managed IT provider, help desk, cybersecurity scanner, generic IT audit, or compliance checklist. It is intended to function like a technology equivalent of a financial health check: a business-focused view of current health, future readiness, and practical improvement steps.

## Product success direction

The business goal implies these future outcomes:

- Leaders understand technology risk without needing to interpret specialist language.
- Assessments produce comparable maturity measurements over time.
- Findings connect to business services, impact, and investment decisions.
- Recommendations become an actionable, prioritized improvement roadmap.
- Advisory engagements can use the platform as a repeatable system of record.
- The platform eventually supports trustworthy benchmarking and continuous measurement.

The repository does not yet define numeric business KPIs such as completion rate, qualified consultations, conversion, retention, or customer maturity improvement. Those should be defined before optimizing the product funnel or claiming product-market success.

## Elevator pitch

Technology is one of every business’s most important assets, yet few growing businesses have an objective way to measure its health. This platform helps them assess, benchmark, and improve technology maturity through standardized assessments, business-focused reporting, and actionable roadmaps based on industry best practices—leading to better decisions, lower risk, improved resilience, and technology that becomes a competitive advantage rather than a liability.
