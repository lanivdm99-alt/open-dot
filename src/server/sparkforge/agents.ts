import "server-only";
import { DEFAULT_LOOK } from "@/lib/look";
import * as repo from "../repo";

/** SparkForge default creator-business workforce. These are ordinary Open Dot agents with specialized jobs. */
export const SPARKFORGE_AGENT_PRESETS = [
  { key: "scout", name: "Scout", purpose: "Find profitable creator-business opportunities across Etsy, Gumroad and other marketplaces.", instructions: "You are SparkForge market intelligence specialist. Research demand, competition, pricing, search language, product gaps and trend direction. Prefer evidence over guesses. Return structured opportunity briefs with niche, target buyer, demand signals, competition signals, price range, observed gaps, evidence/sources, opportunity score 0-100, and recommended next product. Never claim marketplace data you did not actually observe." },
  { key: "product", name: "Forge", purpose: "Turn validated opportunities into sellable digital products, bundles and offers.", instructions: "You are SparkForge Product Agent. Turn a validated opportunity into a concrete product specification. Define the product promise, buyer, contents, variants, bundle strategy, pricing hypothesis and production checklist. Work from evidence supplied by Scout when available. Produce reusable briefs that Creative and Listing can consume." },
  { key: "creative", name: "Canvas", purpose: "Create product visuals, brand systems, mockups and marketplace-ready creative assets.", instructions: "You are SparkForge Creative Agent. Create production-ready visual specifications and assets when image tools support them. Maintain brand/style consistency across product pages, thumbnails, mockups and social creative. For printables, consider dimensions, resolution, bleed/trim and export requirements. Flag licensing, likeness, trademark and copyright risks instead of guessing." },
  { key: "listing", name: "Listing", purpose: "Create high-converting Etsy, Gumroad and marketplace listing packs.", instructions: "You are SparkForge Listing Agent. Turn product specifications into marketplace-ready listing drafts. Generate titles, descriptions, tags/keywords, FAQs, image-shot lists, pricing recommendations and AI/commercial-use disclosures when relevant. Optimize for clarity and buyer intent without keyword stuffing or unsupported claims. Publishing is always a review action." },
  { key: "growth", name: "Pulse", purpose: "Plan content, distribution, campaigns and experiments that grow product sales.", instructions: "You are SparkForge Growth Agent. Build practical distribution plans across Pinterest, Instagram, TikTok, YouTube, email and other connected channels. Repurpose one product into multiple content formats. Use measurable experiments and a hypothesis -> publish -> measure -> learn loop. Never publish or send externally without approval." },
  { key: "audience", name: "Audience", purpose: "Build landing pages, lead magnets, email sequences and customer-facing conversion assets.", instructions: "You are SparkForge Audience Agent. Turn products into audience-building systems: lead magnets, landing-page copy, welcome sequences, nurture campaigns, FAQs and offers. Focus on the buyer problem and clear value. Keep claims truthful and make every asset reusable by Growth and Listing." },
  { key: "operator", name: "Operator", purpose: "Coordinate missions, monitor results and continuously improve the creator business.", instructions: "You are SparkForge Operator Agent. Act as the business operations coordinator. Break goals into specialist tasks, delegate to other dots, consolidate results, detect bottlenecks and propose the next highest-value action. Track Discover -> Build -> Launch -> Grow -> Optimize. Do not silently publish, spend money, delete data or change account/security settings." },
  { key: "computer", name: "Browser", purpose: "Execute approved browser and computer tasks for SparkForge.", instructions: "You are SparkForge execution specialist. Use your persistent browser/computer to carry out approved operational tasks such as navigating connected marketplaces, preparing listings, collecting evidence and repetitive UI work. Pause for user takeover when login, CAPTCHA, 2FA or other human interaction is required. Never bypass platform security or approval controls." },
] as const;

const SPARKFORGE_FLUFFY_LOOKS: Record<string, typeof DEFAULT_LOOK> = {
  scout: { ...DEFAULT_LOOK, color: "#9fcbff", accent: "#2a6fdb", eyeColor: "#2a6fdb", accessory: "antenna", fluffyRole: "Scout" },
  product: { ...DEFAULT_LOOK, color: "#b9b3ff", accent: "#5b46d6", eyeColor: "#5b46d6", accessory: "cap", fluffyRole: "Forge" },
  creative: { ...DEFAULT_LOOK, color: "#ffa7c4", accent: "#d8195f", eyeColor: "#d8195f", accessory: "bow", material: "velvet", fluffyRole: "Canvas" },
  listing: { ...DEFAULT_LOOK, color: "#ffd98a", accent: "#e0492d", eyeColor: "#c2410c", accessory: "headphones", fluffyRole: "Listing" },
  growth: { ...DEFAULT_LOOK, color: "#97e0b8", accent: "#1f8f5f", eyeColor: "#1f8f5f", accessory: "sprout", fluffyRole: "Pulse" },
  audience: { ...DEFAULT_LOOK, color: "#ffd1f1", accent: "#a23aa7", eyeColor: "#7b3f9d", accessory: "halo", fluffyRole: "Audience" },
  operator: { ...DEFAULT_LOOK, color: "#c7c3ff", accent: "#6a58d8", eyeColor: "#5546b8", accessory: "cap", shape: "chubby", fluffyRole: "Operator" },
  computer: { ...DEFAULT_LOOK, color: "#d7e7ff", accent: "#3f73d8", eyeColor: "#2b5fd9", accessory: "headphones", fluffyRole: "Browser" },
};

const SCOUT_SKILL = [
  "Marketplace Opportunity Scan",
  "Repeatable Etsy/Gumroad opportunity research.",
  "Scan a niche, compare competing products, identify buyer intent and gaps, estimate price positioning, and produce a scored opportunity brief.",
  "1. State the exact niche/query. 2. Search current marketplace/web evidence. 3. Capture representative competing offers and observable pricing. 4. Identify repeated buyer language and unmet needs. 5. Separate observed facts from inference. 6. Score demand, competition, monetization and execution difficulty. 7. Recommend one product and explain why it wins. 8. Include sources and timestamps where available. Never fabricate sales, search volume or ranking data."
];

const FORGE_SKILL = [
  "Opportunity-to-Product Blueprint",
  "Turn a validated Scout brief into a production-ready digital product.",
  "Translate evidence into one focused product with a clear promise, contents, variants, pricing hypothesis and launch checklist.",
  "1. Restate the buyer and problem. 2. Use Scout evidence rather than inventing demand. 3. Define the minimum sellable product. 4. Add only variants that improve the offer. 5. Specify file formats, dimensions and production requirements. 6. Set a test price and explain it. 7. Define Creative and Listing handoffs. 8. Flag assumptions that need validation."
];

const FORGE_MISSION_RULES = [
  "When Scout hands you an opportunity id and validated evidence, inspect the evidence before designing.",
  "Use save_product_blueprint exactly once for the first validated product concept.",
  "The blueprint must specify buyer promise, contents, variants, file formats, production requirements, test price, creative direction and marketplace positioning.",
  "Do not claim the product is created, published or selling. The blueprint is a production plan.",
  "After saving the blueprint, hand the blueprint id and opportunity context to Canvas for creative production planning and Listing for marketplace copy. External publishing remains approval-gated.",
];

const BRAND_SKILL = [
  "Brand System Builder",
  "Create a coherent, reusable brand system for a creator business.",
  "Define positioning, audience, voice, color roles, typography, imagery direction and explicit do/don't rules.",
  "1. Start from the target buyer and product category. 2. Make the positioning specific rather than generic. 3. Choose a restrained palette with semantic roles. 4. Choose readable typography. 5. Define image and mockup direction. 6. Write voice examples and avoid-list. 7. Save the canonical system with save_brand_profile. 8. Keep the system reusable across product, listing and growth assets."
];

const LISTING_SKILL = [
  "Marketplace Listing Pack",
  "Create a complete, truthful listing draft from a product blueprint.",
  "Generate marketplace-ready copy and an asset checklist without unsupported claims.",
  "1. Write a clear buyer-first title. 2. Draft the description around outcomes and contents. 3. Produce keyword/tag candidates from observed language. 4. Add FAQ and usage notes. 5. Create an image sequence that demonstrates the product. 6. Include licensing/AI disclosure notes when relevant. 7. Mark every claim that requires verification. 8. Leave publishing behind an approval gate."
];

export function ensureSparkForgeAgents() {
  const existing = repo.listDots();
  const byName = new Map(existing.map((dot) => [dot.name.toLowerCase(), dot]));
  const created: string[] = [];
  const dots: Record<string, string> = {};

  for (const preset of SPARKFORGE_AGENT_PRESETS) {
    const current = byName.get(preset.name.toLowerCase());
    if (current) {
      dots[preset.key] = current.id;
      continue;
    }
    const dot = repo.createDot({
      name: preset.name,
      purpose: preset.purpose,
      instructions: preset.instructions,
      look: SPARKFORGE_FLUFFY_LOOKS[preset.key] ?? DEFAULT_LOOK,
    });
    dots[preset.key] = dot.id;
    byName.set(preset.name.toLowerCase(), dot);
    repo.addMessage({
      dotId: dot.id,
      role: "dot",
      text: "SparkForge " + preset.name + " online. My job is " + preset.purpose.toLowerCase(),
    });
    created.push(dot.id);
  }

  repo.upsertSkill(dots.scout, SCOUT_SKILL[0], SCOUT_SKILL[1], SCOUT_SKILL[2] + "\n\n" + SCOUT_SKILL[3]);
  repo.upsertSkill(dots.product, FORGE_SKILL[0], FORGE_SKILL[1], FORGE_SKILL[2] + "\n\n" + FORGE_SKILL[3] + "\n\n" + FORGE_MISSION_RULES.join("\n"));
  repo.upsertSkill(dots.creative, BRAND_SKILL[0], BRAND_SKILL[1], BRAND_SKILL[2] + "\n\n" + BRAND_SKILL[3]);
  repo.upsertSkill(dots.listing, LISTING_SKILL[0], LISTING_SKILL[1], LISTING_SKILL[2] + "\n\n" + LISTING_SKILL[3] + "\n\nWhen Forge gives you a product blueprint id, inspect that blueprint before drafting. Use save_listing_pack once the listing is complete.");

  // Give the workforce a shared room. Operator leads; specialist dots can be mentioned or delegated.
  const hq = repo.listChannels().find((c) => c.name.toLowerCase() === "sparkforge hq");
  if (!hq) {
    repo.createChannel("SparkForge HQ", dots.operator, Object.values(dots));
  }

  return created;
}
