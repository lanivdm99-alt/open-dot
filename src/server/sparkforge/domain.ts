import "server-only";

/**
 * SparkForge creator-business domain model.
 *
 * The Open Dot runtime remains the execution kernel (agent loop, computer,
 * approvals, memory, skills, schedules and connectors). These types describe
 * the business layer that sits above that kernel.
 */

export const SPARKFORGE_AGENTS = [
  "scout",
  "product",
  "creative",
  "listing",
  "growth",
  "audience",
  "operator",
  "computer",
] as const;

export type SparkForgeAgent = (typeof SPARKFORGE_AGENTS)[number];

export const BUSINESS_STAGES = [
  "discover",
  "build",
  "launch",
  "grow",
  "optimize",
] as const;

export type BusinessStage = (typeof BUSINESS_STAGES)[number];

export type Channel =
  | "etsy"
  | "gumroad"
  | "shopify"
  | "kdp"
  | "pinterest"
  | "instagram"
  | "tiktok"
  | "facebook"
  | "youtube"
  | "email";

export type ProductKind =
  | "printable"
  | "planner"
  | "guide"
  | "toolkit"
  | "prompt-pack"
  | "template"
  | "wall-art"
  | "sticker-pack"
  | "coloring"
  | "pod"
  | "kdp";

export type ApprovalLevel = "auto" | "review" | "locked";

export type BrandProfile = {
  id: string;
  name: string;
  audience: string;
  positioning: string;
  voice: string;
  colors: string[];
  fonts: string[];
  visualStyle: string;
  contentPillars: string[];
  preferredChannels: Channel[];
  complianceNotes: string[];
  createdAt: number;
  updatedAt: number;
};

export type Product = {
  id: string;
  brandId: string;
  name: string;
  kind: ProductKind;
  description: string;
  status: "idea" | "draft" | "ready" | "launched" | "refresh";
  priceCents: number | null;
  currency: string;
  files: string[];
  listingIds: string[];
  createdAt: number;
  updatedAt: number;
};

export type Opportunity = {
  id: string;
  query: string;
  niche: string;
  audience: string;
  score: number;
  demandSignal: string;
  competitionSignal: string;
  priceSignal: string;
  gap: string;
  evidence: string[];
  status: "new" | "selected" | "rejected" | "converted";
  createdAt: number;
};

export type ListingDraft = {
  id: string;
  productId: string;
  channel: Channel;
  title: string;
  description: string;
  keywords: string[];
  tags: string[];
  faq: string[];
  disclosure: string | null;
  status: "draft" | "review" | "approved" | "published";
  createdAt: number;
  updatedAt: number;
};

export type ContentAsset = {
  id: string;
  brandId: string;
  productId: string | null;
  channel: Channel;
  kind: "post" | "carousel" | "pin" | "video-script" | "email" | "lead-magnet" | "landing-page";
  title: string;
  body: string;
  mediaFiles: string[];
  status: "draft" | "review" | "scheduled" | "published";
  scheduledFor: number | null;
  createdAt: number;
  updatedAt: number;
};

export type Mission = {
  id: string;
  brandId: string | null;
  goal: string;
  targetValue: number | null;
  targetCurrency: string | null;
  stage: BusinessStage;
  status: "planning" | "running" | "waiting" | "completed" | "paused";
  agentIds: string[];
  progress: number;
  createdAt: number;
  updatedAt: number;
};

export type AgentRun = {
  id: string;
  missionId: string | null;
  agent: SparkForgeAgent;
  task: string;
  stage: BusinessStage;
  status: "queued" | "running" | "waiting" | "completed" | "failed";
  result: string | null;
  createdAt: number;
  completedAt: number | null;
};

export const APPROVAL_POLICY: Record<ApprovalLevel, string[]> = {
  auto: [
    "research",
    "draft",
    "classify",
    "analyze",
    "generate",
    "prepare",
  ],
  review: [
    "publish",
    "schedule",
    "send",
    "reply",
    "edit-live-listing",
  ],
  locked: [
    "delete",
    "purchase",
    "payment",
    "account-settings",
    "password",
    "security",
  ],
};
