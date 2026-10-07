# SparkForge Beta-First Development Protocol

## Rule
Every SparkForge feature is beta-tested as soon as a vertical slice exists. We do not wait for the whole platform.

## Test loop
1. Build the smallest usable slice.
2. Run type/lint/build checks.
3. Exercise the feature with realistic creator scenarios.
4. Record failures as issues with severity and reproduction steps.
5. Fix before expanding the slice.
6. Repeat.

## Beta tracks

### B0 — Kernel compatibility
- Existing Open Dot startup still works.
- Existing agent execution remains intact.
- Existing approval boundaries remain intact.
- Existing browser/computer functionality is not bypassed.

### B1 — Scout
Scenario: "Find a profitable Etsy/Gumroad opportunity for minimalist wedding printables."
Expected:
- structured opportunity
- demand/competition signals
- suggested product
- pricing hypothesis
- evidence/provenance fields

### B2 — Product
Scenario: turn one opportunity into a sellable product brief.
Expected:
- product spec
- bundle structure
- target customer
- pricing
- production checklist

### B3 — Creative
Scenario: generate a coherent visual set.
Expected:
- brand/style lock
- hero visual
- variants
- mockup jobs
- QA status
- export manifest

### B4 — Listing
Scenario: convert the product into marketplace assets.
Expected:
- title
- description
- tags/keywords
- image order
- compliance/disclosure notes

### B5 — Growth
Scenario: turn one product into a 7-day campaign.
Expected:
- channel plan
- platform-specific posts
- content calendar
- approval-required publishing actions

### B6 — Operator
Scenario: inspect performance and recommend the next action.
Expected:
- diagnosis
- confidence
- proposed experiment
- safe auto-actions
- review-required actions

## Human approval
The beta must never silently publish, send messages, spend money, delete assets, change credentials, or bypass platform approvals.

## Definition of beta-ready
A feature is beta-ready when:
- it has one complete user journey;
- its outputs are structured and reusable by another agent;
- failure states are visible;
- external actions have approval gates;
- it survives the relevant build/lint/type checks;
- at least one realistic creator scenario passes end-to-end.
