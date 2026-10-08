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

const SCOUT_SKILL = [
  "Marketplace Opportunity Scan",
  "Repeatable Etsy/Gumroad opportunity research.",
  "Scan a niche, compare competing products, identify buyer intent and gaps, estimate price positioning, and produce a scored opportunity brief.",
  "1. State the exact niche/query. 2. Search current marketplace/web evidence. 3. Capture representative competing offers and observable pricing. 4. Identify repeated buyer language and unmet needs. 5. Separate observed facts from inference. 6. Score demand, competition, monetization and execution difficulty. 7. Recommend one product and explain why it wins. 8. Include sources and timestamps where available. Never fabricate sales, search volume or ranking data."
];

export function ensureSparkForgeAgents() {
  const existing = repo.listDots();
  const hasSparkForge = existing.some((dot) => SPARKFORGE_AGENT_PRESETS.some((preset) => dot.name.toLowerCase() === preset.name.toLowerCase()));
  if (hasSparkForge) return [];

  const created: string[] = [];
  const dots: Record<string, string> = {};
  for (const preset of SPARKFORGE_AGENT_PRESETS) {
    const dot = repo.createDot({
      name: preset.name,
      purpose: preset.purpose,
      instructions: preset.instructions,
      look: existing[0]?.look ?? DEFAULT_LOOK,
    });
    dots[preset.key] = dot.id;
    repo.addMessage({
      dotId: dot.id,
      role: "dot",
      text: "SparkForge " + preset.name + " online. My job is " + preset.purpose.toLowerCase(),
    });
    created.push(dot.id);
  }

  repo.upsertSkill(dots.scout, SCOUT_SKILL[0], SCOUT_SKILL[1], SCOUT_SKILL[2] + "\n\n" + SCOUT_SKILL[3]);

  // Give the workforce a shared room. Operator leads; specialist dots can be mentioned or delegated.
  if (!repo.listChannels().some((c) => c.name.toLowerCase() === "sparkforge hq")) {
    repo.createChannel("SparkForge HQ", dots.operator, Object.values(dots));
  }

  return created;
}
