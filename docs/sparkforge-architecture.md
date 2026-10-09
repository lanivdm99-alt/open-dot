# SparkForge Architecture

SparkForge is an AI workforce for creator businesses. The existing Open Dot runtime is retained as the execution kernel; SparkForge adds the creator-business operating system above it.

## Layers

1. **Execution kernel**
   - agent runtime and tool loop
   - persistent browser/computer
   - approvals and action rules
   - memory and reusable skills
   - schedules and triggers
   - Composio connectors
   - isolated workspaces

2. **SparkForge business layer**
   - brands
   - products
   - opportunities
   - listings
   - content assets
   - missions
   - agent runs
   - performance signals

3. **Creator agents**
   - Scout: demand, competition, pricing and opportunity gaps
   - Product: product structure, bundles, pricing and offers
   - Creative: product artwork, mockups, thumbnails and brand consistency
   - Listing: marketplace-ready listing packs and SEO
   - Growth: campaigns, repurposing and distribution
   - Audience: landing pages, lead magnets and email sequences
   - Operator: monitor, diagnose, test and re-optimize
   - Computer: execute browser/desktop work through the existing computer kernel

## Business loop

Discover -> Build -> Launch -> Grow -> Optimize -> Discover

Every agent should produce structured artifacts that can be consumed by another agent. Avoid isolated mini-tools that cannot participate in the loop.

## Mission mode

A mission is a business goal such as:

> Make $500 this month selling digital products.

The orchestrator decomposes that goal into agent runs. Agents share the same brand/product/business memory and use the existing approval system for actions that affect external systems.

## Safety boundary

The existing Open Dot approval mechanism remains authoritative. SparkForge should classify actions rather than bypass approvals:

- Auto: research, drafting, analysis, generation and preparation.
- Review: publishing, scheduling, sending, replying and edits to live listings.
- Locked: deletion, purchases, payments, account/security changes and passwords.

## Product image pipeline

Creative Agent should eventually implement:

niche -> brand/style lock -> generation -> variation -> visual QA -> compliance QA -> export

Supported output targets include print-ready 300 DPI assets, bleed/trim-aware PDFs, PNG/JPG/SVG, lifestyle mockups, listing thumbnails and platform-specific variants.

## Model routing

Keep the runtime model-independent. SparkForge should expose a task router rather than hard-code one model:

- general planning / orchestration
- fast worker tasks
- vision/design QA
- image generation
- later omni-modal voice/video

The first self-hosted workhorse can be Qwen-family infrastructure, while cloud models remain optional fallbacks.

## Implementation rule

Do not rebuild computer use, browser persistence, approvals, memory, skills or schedules unless the existing kernel cannot support the requirement. Add domain adapters and structured business state first.
