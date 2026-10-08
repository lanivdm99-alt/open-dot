# SparkForge Fluffy Character System

SparkForge uses an original Fluffy character family as the visual identity for its agent workforce.

The project owner supplied the reference Fluffy artwork in the product-development conversation. SparkForge's implementation uses a new, original vector interpretation rather than copying the reference image.

## Core crew

| Agent | Character | Job |
| --- | --- | --- |
| Scout | Research-Fluffy | Marketplace research, trends and opportunity scoring |
| Forge | Product-Fluffy | Product concepts, bundles and production specifications |
| Canvas | Creative-Fluffy | Visual direction, product graphics and mockups |
| Listing | Listing-Fluffy | Marketplace listing packs and SEO |
| Pulse | Marketing-Fluffy | Distribution, social content and growth experiments |
| Audience | Audience-Fluffy | Lead magnets, landing pages and email conversion |
| Operator | CEO-Fluffy | Mission coordination and business operations |
| Browser | Action-Fluffy | Approved browser/computer execution |

## Design rules

- Soft, fuzzy, rounded silhouette with large expressive eyes.
- Strong role recognition through accessories.
- One consistent face language across the entire crew.
- Bright, premium colors with dark ink outlines.
- Small status signals for working, waiting and paused states.
- Characters must remain recognizable at tiny sidebar/chip sizes.
- Do not use generic AI avatars for SparkForge's specialist agents.
- External publishing, purchases, messages and account changes still require the existing approval system.

## Implementation

`src/components/SparkForgeFluffy.tsx` contains the original SVG character renderer. `DotOrb` and `Dot3DLazy` automatically switch SparkForge's eight named agents to their Fluffy characters while ordinary user-created dots keep the existing renderer.

This keeps the Open Dot runtime reusable while making SparkForge visually distinct.