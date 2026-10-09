# SparkForge end-to-end beta scenario

Use this checklist for every vertical slice. Run with a non-sensitive niche and a configured model provider. Do not publish or purchase anything during this test.

## Scenario: marketplace idea to sellable listing draft

### 0. Chief of Staff — coordinate the mission
- Start from the home-screen chat with Chief of Staff and give it the desired business outcome and constraints.
- Confirm it turns the goal into ordered stages, names the specialist owner for each stage, and defines concrete acceptance criteria.
- Confirm it delegates bounded research/build tasks rather than claiming it completed them itself.
- Confirm it can read canonical opportunity briefs, product blueprints and brand profiles using the relevant read tools.
- Confirm its summary separates completed artifacts from proposed work, records blockers/risks and names the next action.
- Confirm it asks the founder only when a judgment or consequential approval is genuinely required.

### 1. Scout — research
- Enter a concrete niche in SparkForge Opportunity Lab (for example, printable onboarding kits for freelance designers).
- Confirm Scout states the exact query and distinguishes observed evidence from inference.
- Confirm competitor entries include real URLs and observable prices where available.
- Confirm sources and observation timestamps are included where available.
- Confirm the score includes a rationale and does not pretend to know private sales/search-volume data.
- Confirm Scout saves an opportunity brief and hands its id plus evidence to Forge.

### 2. Forge — product blueprint
- Confirm Forge reads the saved opportunity brief using `get_opportunity_brief`.
- Confirm Forge creates one focused product with a clear buyer promise, contents, file formats, production requirements, test price and listing angle.
- Confirm the product blueprint is persisted and linked to the opportunity.
- Confirm Forge hands the blueprint id and opportunity context to Canvas and Listing.

### 3. Canvas — creative direction
- Confirm Canvas reads the canonical product blueprint and linked opportunity brief.
- Confirm the creative brief respects SparkForge's Fluffy identity and any user-provided artwork as the source of truth.
- Confirm asset specifications include dimensions, formats, composition and intended use.
- Confirm copyright, trademark, licensing and likeness uncertainties are flagged instead of guessed.

### 4. Listing — listing pack
- Confirm Listing reads the canonical blueprint and opportunity evidence before writing.
- Confirm the title, description, tags, FAQs and image plan match the actual deliverable.
- Confirm unsupported sales, ranking, scarcity and outcome claims are removed.
- Confirm AI/licensing disclosures are flagged where relevant.
- Confirm `save_listing_pack` persists the draft and status is not `published`.

### 5. Safety and recovery
- Verify no marketplace listing is published, no post/email is sent, no purchase is made, and no credentials/settings are changed without an explicit approval gate.
- Interrupt a run and resume it; verify the saved artifacts remain available.
- Submit a deliberately vague niche; verify the agent asks a clarifying question or labels assumptions rather than inventing evidence.
- Simulate a failed web lookup; verify the final brief reports the gap and does not fabricate a source.

## Beta record

For each run, record:
- Date/time and model/provider
- Niche/query
- Whether each stage completed (Scout / Forge / Canvas / Listing)
- Artifact ids created
- Unsupported claims found
- Broken links or missing sources
- Latency and provider errors
- Human approvals requested and whether they were appropriate
- Fixes required before expanding the workflow

## Release gate

A run is beta-ready only when one realistic journey completes end-to-end, saved artifacts are reusable by downstream agents, failures are visible, external actions remain approval-gated, and no fabricated marketplace metrics or sources are present.