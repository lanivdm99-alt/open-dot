"use client";

import Link from "next/link";
import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { ArrowUp, ArrowUpRight, Plus } from "lucide-react";
import { startConversation, startSparkForgeBrand, startSparkForgeOpportunity } from "@/app/actions";
import { markRead, useStore } from "@/lib/store";
import { DEFAULT_LOOK } from "@/lib/look";
import { statusDot, statusLabel, timeAgo } from "@/lib/status";
import Dot3DLazy from "./Dot3DLazy";
import DotOrb from "./DotOrb";

export default function Home() {
  const router = useRouter();
  const dots = useStore((s) => s.dots);
  const loaded = useStore((s) => s.loaded);
  const messages = useStore((s) => s.messages);
  const opportunities = useStore((s) => s.opportunities);
  const productBlueprints = useStore((s) => s.productBlueprints);
  const listingPacks = useStore((s) => s.listingPacks);
  const brandProfiles = useStore((s) => s.brandProfiles);
  const [picked, setPicked] = useState<string | null>(null);
  const [text, setText] = useState("");
  const [pending, start] = useTransition();
  const [opportunity, setOpportunity] = useState("");
  const [missionPending, startMission] = useTransition();
  const [brandName, setBrandName] = useState("");
  const [brandAudience, setBrandAudience] = useState("");
  const [brandCategory, setBrandCategory] = useState("");
  const [brandPending, startBrandMission] = useTransition();

  const latest = useMemo(
    () => messages.filter((m) => !m.channelId && ((m.role === "dot" && m.text) || (m.role === "card" && m.card?.status === "pending"))).slice(-6).reverse(),
    [messages],
  );

  if (loaded && !dots.length) {
    return (
      <div className="flex-1 overflow-y-auto">
        <div className="rails mx-auto flex min-h-full max-w-[880px] flex-col items-center justify-center px-4 sm:px-8 py-16 text-center">
          <div className="dot-grid rounded-full">
            <Dot3DLazy look={DEFAULT_LOOK} size={240} stage />
          </div>
          <div className="eyebrow mt-6 text-brand-readable/80">Your Fluffies</div>
          <h1 className="text-display mt-3">Meet your Fluffies</h1>
          <p className="text-body-lg mt-4 max-w-[520px] text-foreground/60">
            Dots work on their own. Each one has its own computer and browser, remembers what matters, runs routines on a schedule, and knows when to ask for your approval.
          </p>
          <Link href="/new" className="btn-primary mt-8 h-10 px-5 text-[15px]">
            Create your first dot
          </Link>
        </div>
      </div>
    );
  }

  const target = dots.find((d) => d.id === picked) ?? dots.find((d) => d.name === "Chief of Staff") ?? dots[0];

  const submit = () => {
    const value = text.trim();
    if (!value || !target) return;
    start(async () => {
      const convId = await startConversation(target.id, value);
      markRead(target.id);
      router.push(`/dots/${target.id}?c=${convId}`);
    });
  };

  const runBrand = () => {
    if (!brandName.trim() || !brandAudience.trim() || !brandCategory.trim()) return;
    startBrandMission(async () => {
      const convId = await startSparkForgeBrand({ name: brandName, audience: brandAudience, category: brandCategory });
      if (convId) {
        setBrandName("");
        setBrandAudience("");
        setBrandCategory("");
        router.push(`/dots/${dots.find((d) => d.name === "Canvas")?.id}?c=${convId}`);
      }
    });
  };

  const runOpportunity = () => {
    const value = opportunity.trim();
    if (!value) return;
    startMission(async () => {
      const convId = await startSparkForgeOpportunity(value);
      if (convId) {
        setOpportunity("");
        router.push(`/dots/${dots.find((d) => d.name === "Scout")?.id}?c=${convId}`);
      }
    });
  };

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="rails mx-auto min-h-full max-w-[880px] px-4 sm:px-8 pb-16">
        <section className="pt-10 sm:pt-12">
          <div className="surface overflow-hidden border-brand/15 bg-gradient-to-br from-card via-card to-brand/[0.06]">
            <div className="flex flex-col gap-6 p-5 sm:flex-row sm:items-center sm:p-6">
              <div className="shrink-0">
                {dots.find((d) => d.name === "Scout") ? (
                  <Dot3DLazy
                    look={dots.find((d) => d.name === "Scout")!.look}
                    name="Scout"
                    status={dots.find((d) => d.name === "Scout")!.status}
                    size={112}
                  />
                ) : null}
              </div>
              <div className="min-w-0 flex-1">
                <div className="eyebrow text-brand-readable/80">SparkForge Opportunity Lab</div>
                <h1 className="text-h1 mt-2">Find something worth building.</h1>
                <p className="text-body-sm mt-2 max-w-[620px] text-foreground/55">
                  Scout researches current marketplace evidence, scores the opportunity, then hands the brief to Forge to turn it into a product.
                </p>
                <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                  <input
                    value={opportunity}
                    onChange={(e) => setOpportunity(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.nativeEvent.isComposing) {
                        e.preventDefault();
                        runOpportunity();
                      }
                    }}
                    placeholder="e.g. wedding planners for busy couples"
                    className="field h-10 flex-1"
                    aria-label="Opportunity research target"
                  />
                  <button
                    type="button"
                    className="btn-brand h-10 px-4"
                    disabled={missionPending || !opportunity.trim() || !dots.find((d) => d.name === "Scout")}
                    onClick={runOpportunity}
                  >
                    {missionPending ? "Scouting…" : "Find opportunity"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-6">
          <div className="surface overflow-hidden p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
              <div className="min-w-0 flex-1">
                <div className="eyebrow text-brand-readable">Brand Studio</div>
                <h2 className="text-h2 mt-1">Forge a brand people remember.</h2>
                <p className="text-body-sm mt-1 text-foreground/50">Canvas builds the canonical identity once, then every product and listing can reuse it.</p>
              </div>
              <span className="font-mono text-[10px] tracking-wider text-foreground/35 uppercase">One system · every asset</span>
            </div>
            <div className="mt-4 grid gap-2 sm:grid-cols-3">
              <input value={brandName} onChange={(e) => setBrandName(e.target.value)} placeholder="Brand name" className="field h-10" aria-label="Brand name" />
              <input value={brandAudience} onChange={(e) => setBrandAudience(e.target.value)} placeholder="Who is it for?" className="field h-10" aria-label="Brand audience" />
              <input
                value={brandCategory}
                onChange={(e) => setBrandCategory(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter" && !e.nativeEvent.isComposing) { e.preventDefault(); runBrand(); } }}
                placeholder="Category / niche"
                className="field h-10"
                aria-label="Brand category"
              />
            </div>
            <div className="mt-3 flex justify-end">
              <button type="button" className="btn-brand h-10 px-4" disabled={brandPending || !brandName.trim() || !brandAudience.trim() || !brandCategory.trim() || !dots.find((d) => d.name === "Canvas")} onClick={runBrand}>
                {brandPending ? "Forging brand…" : "Forge brand system"}
              </button>
            </div>
          </div>
        </section>

        {opportunities.length > 0 && (
          <section className="mt-6">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="eyebrow">Opportunity pipeline · {opportunities.length}</h2>
              <span className="font-mono text-[10px] tracking-wider text-foreground/35 uppercase">Evidence-backed</span>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {opportunities.slice(0, 4).map((opportunity) => (
                <Link
                  key={opportunity.id}
                  href={`/dots/${dots.find((d) => d.id === opportunity.dotId)?.id ?? ""}`}
                  className="surface group p-4 transition-[border-color,box-shadow] hover:border-black/15 hover:shadow-elevated"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="text-[15px] font-medium truncate">{opportunity.recommendation || opportunity.query}</div>
                      <div className="mt-1 text-body-sm text-foreground/50 truncate">{opportunity.targetBuyer || "Researching target buyer…"}</div>
                    </div>
                    <span className={`shrink-0 rounded-full px-2 py-1 font-mono text-[10px] tracking-wider uppercase ${
                      opportunity.score >= 75 ? "bg-success/10 text-success" : opportunity.score >= 55 ? "bg-warning/10 text-warning" : "bg-black/[0.05] text-foreground/45"
                    }`}>
                      {opportunity.score}/100
                    </span>
                  </div>
                  <div className="mt-3 flex items-center gap-2 font-mono text-[10px] tracking-wider text-foreground/40 uppercase">
                    <span>{opportunity.status}</span>
                    <span>·</span>
                    <span>{opportunity.competitors.length} competitors captured</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {productBlueprints.length > 0 && (
          <section className="mt-6">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="eyebrow">Product forge · {productBlueprints.length}</h2>
              <span className="font-mono text-[10px] tracking-wider text-brand-readable uppercase">Ready for creation</span>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {productBlueprints.slice(0, 4).map((product) => (
                <Link
                  key={product.id}
                  href={`/dots/${product.dotId}`}
                  className="surface group p-4 transition-[border-color,box-shadow] hover:border-black/15 hover:shadow-elevated"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="text-[15px] font-medium truncate">{product.name}</div>
                      <div className="mt-1 line-clamp-2 text-body-sm text-foreground/50">{product.promise}</div>
                    </div>
                    <span className="shrink-0 rounded-full bg-brand/10 px-2 py-1 font-mono text-[10px] tracking-wider text-brand-readable uppercase">{product.status}</span>
                  </div>
                  <div className="mt-3 text-body-sm text-foreground/55">{product.format} · {product.price}</div>
                </Link>
              ))}
            </div>
          </section>
        )}

        <section className="mt-6">
          <div className="mb-3 flex items-end justify-between">
            <div>
              <div className="eyebrow text-brand-readable">The Fluffy Crew</div>
              <h2 className="text-h2 mt-1">Every job has a Fluffy.</h2>
            </div>
            <span className="font-mono text-[10px] tracking-wider text-foreground/35 uppercase">SparkForge native</span>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {["Chief of Staff", "Scout", "Forge", "Canvas", "Listing", "Pulse", "Audience", "Operator", "Browser"].map((name) => {
              const dot = dots.find((d) => d.name === name);
              return dot ? (
                <Link key={name} href={`/dots/${dot.id}`} className="surface group flex items-center gap-3 p-3 transition-transform hover:-translate-y-0.5">
                  <Dot3DLazy look={dot.look} name={name} status={dot.status} size={54} />
                  <span className="min-w-0">
                    <span className="block truncate text-[13px] font-medium">{name}</span>
                    <span className="mt-0.5 block truncate font-mono text-[9px] tracking-wider text-foreground/40 uppercase">{dot.look.fluffyRole ?? "Fluffy"}</span>
                  </span>
                </Link>
              ) : null;
            })}
          </div>
        </section>

        {brandProfiles.length > 0 && (
          <section className="mt-6">
            <div className="surface overflow-hidden p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="eyebrow text-brand-readable">Brand system</div>
                  <h2 className="mt-1 text-h2">{brandProfiles[0].name}</h2>
                  <p className="mt-1 text-body-sm text-foreground/55">{brandProfiles[0].tagline}</p>
                </div>
                <span className="sparkforge-glow rounded-full bg-brand/10 px-2.5 py-1 font-mono text-[10px] tracking-wider text-brand-readable uppercase">{brandProfiles[0].status}</span>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {brandProfiles[0].colors.slice(0, 6).map((color) => (
                  <span key={color.hex} title={`${color.name} · ${color.hex}`} className="size-7 rounded-full border border-black/10" style={{ backgroundColor: color.hex }} />
                ))}
                <span className="ml-1 rounded-full border border-black/10 px-2.5 py-1 font-mono text-[10px] tracking-wider text-foreground/45 uppercase">{brandProfiles[0].voice.slice(0, 3).join(" · ")}</span>
              </div>
            </div>
          </section>
        )}

        {listingPacks.length > 0 && (
          <section className="mt-6">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="eyebrow">Listing pipeline · {listingPacks.length}</h2>
              <span className="font-mono text-[10px] tracking-wider text-foreground/40 uppercase">Approval required to publish</span>
            </div>
            <div className="surface p-4">
              {listingPacks.slice(0, 3).map((listing) => (
                <div key={listing.id} className="flex items-center gap-3 border-b border-black/[0.06] py-3 last:border-0 last:pb-0 first:pt-0">
                  <span className="rounded-md bg-brand/10 px-2 py-1 font-mono text-[10px] tracking-wider text-brand-readable uppercase">{listing.platform}</span>
                  <span className="min-w-0 flex-1 truncate text-[14px]">{listing.title}</span>
                  <span className="font-mono text-[10px] text-foreground/40 uppercase">{listing.status}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="flex flex-col items-center pt-12 pb-10 text-center">
          {target && (
            <div className="dot-grid rounded-full">
              <Dot3DLazy look={target.look} name={target.name} status={target.status} size={128} />
            </div>
          )}
          <div className="eyebrow mt-5 text-brand-readable/80">Hand off a task</div>
          <h1 className="text-display mt-3">What should {target?.name ?? "your dot"} do?</h1>
          <p className="text-body-lg mt-4 max-w-[520px] text-foreground/55">It works on its own and messages you when it&apos;s done.</p>

          <div className="mt-8 w-full max-w-[640px] text-left">
            <div className="rounded-2xl border border-black/10 bg-card/95 p-3 pl-5 shadow-[0_8px_32px_-12px_rgba(0,0,0,0.15)] transition-shadow focus-within:shadow-[0_12px_40px_-12px_rgba(0,0,0,0.2)]">
              <textarea
                autoFocus
                rows={2}
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
                    e.preventDefault();
                    submit();
                  }
                }}
                placeholder={target ? `Ask ${target.name} to research, browse, plan, or build something…` : "Loading…"}
                className="max-h-60 min-h-[72px] w-full resize-none bg-transparent py-1.5 text-[17px] leading-[1.45] tracking-default outline-none [field-sizing:content] placeholder:text-foreground/35"
              />
              <div className="flex items-center gap-2 pt-1">
                <div className="flex flex-1 flex-wrap gap-1.5">
                  {dots.map((d) => (
                    <button
                      key={d.id}
                      type="button"
                      onClick={() => setPicked(d.id)}
                      className={`flex h-7 items-center gap-1.5 rounded-md border pr-2.5 pl-1 text-[13px] transition-colors ${d.id === target?.id ? "border-foreground bg-foreground text-card" : "border-black/10 text-foreground/60 hover:border-black/20 hover:text-foreground"}`}
                    >
                      <DotOrb look={d.look} name={d.name} status={d.status} size={18} />
                      {d.name}
                    </button>
                  ))}
                </div>
                <button
                  className="flex size-10 shrink-0 items-center justify-center rounded-full bg-foreground text-card transition-opacity hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-25"
                  disabled={pending || !text.trim()}
                  onClick={submit}
                  aria-label="Send"
                >
                  <ArrowUp className="size-4" strokeWidth={2.25} />
                </button>
              </div>
            </div>
          </div>
        </section>

        <AppsStrip />

        <section className="border-t border-black/[0.06] pt-8">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="eyebrow">Your dots · {dots.length}</h2>
            <Link href="/new" className="btn-quiet">
              <Plus className="size-3.5" strokeWidth={1.75} /> New dot
            </Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {dots.map((d) => (
              <Link
                key={d.id}
                href={`/dots/${d.id}`}
                onClick={() => markRead(d.id)}
                className="surface group flex items-start gap-3.5 p-4 transition-[border-color,box-shadow] hover:border-black/15 hover:shadow-elevated"
              >
                <DotOrb look={d.look} name={d.name} status={d.status} size={40} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[15px] font-medium">{d.name}</span>
                    <ArrowUpRight className="size-4 text-foreground/30 transition-colors group-hover:text-foreground" strokeWidth={1.5} />
                  </div>
                  <p className="mt-0.5 line-clamp-2 text-body-sm text-foreground/55">{d.purpose || "General helper"}</p>
                  <div className="mt-2.5 flex items-center gap-1.5 font-mono text-[10px] tracking-wider text-foreground/45 uppercase">
                    <span className={`size-1.5 rounded-full ${statusDot(d)}`} />
                    {d.status === "working" ? d.activity ?? "Working" : statusLabel(d)}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {latest.length > 0 && (
          <section className="mt-10">
            <h2 className="eyebrow mb-3">Latest from your dots</h2>
            <div className="surface divide-y divide-black/[0.06]">
              {latest.map((m) => {
                const d = dots.find((x) => x.id === m.dotId);
                if (!d) return null;
                return (
                  <Link key={m.id} href={`/dots/${d.id}`} onClick={() => markRead(d.id)} className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-popover">
                    <DotOrb look={d.look} name={d.name} status={d.status} size={24} />
                    <span className="w-20 shrink-0 truncate text-[14px]">{d.name}</span>
                    {m.role === "card" && <span className="shrink-0 rounded-xs bg-warning/15 px-1.5 py-0.5 font-mono text-[10px] tracking-wider text-warning uppercase">Needs you</span>}
                    {m.title && <span className="shrink-0 rounded-xs bg-highlight px-1.5 py-0.5 font-mono text-[10px] tracking-wider uppercase">{m.title}</span>}
                    <span className="min-w-0 flex-1 truncate text-body-sm text-foreground/55">{m.role === "card" ? m.card?.title : m.text.replace(/[#*_`>|]/g, "").slice(0, 200)}</span>
                    <span className="shrink-0 font-mono text-[10px] tracking-wider text-foreground/35 uppercase">{timeAgo(m.createdAt)}</span>
                  </Link>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

/** Composio For You: which apps the dots can use, or a nudge to sign in. */
function AppsStrip() {
  const apps = useStore((s) => s.apps);
  const signedIn = useStore((s) => s.computer.composio);
  const connected = apps.filter((a) => a.connected);
  const logos = (slugs: string[]) =>
    slugs.slice(0, 8).map((slug) => (
      // eslint-disable-next-line @next/next/no-img-element
      <img key={slug} src={`https://logos.composio.dev/api/${slug}`} alt="" className="size-7 rounded-full border-2 border-card bg-card object-contain p-1 shadow-sm" />
    ));

  return (
    <Link
      href="/settings#apps"
      className="surface mx-auto -mt-2 mb-10 grid max-w-[640px] grid-cols-[1fr_auto] items-center gap-x-3 gap-y-2 px-4 py-2.5 sm:flex transition-[border-color,box-shadow] hover:border-black/15 hover:shadow-elevated"
    >
      <div className="flex -space-x-2">{logos(signedIn && connected.length ? connected.map((a) => a.slug) : ["gmail", "googlecalendar", "slack", "notion", "github"])}</div>
      <div className="col-span-2 row-start-2 min-w-0 flex-1 text-body-sm sm:row-auto">
        {signedIn ? (
          <>
            <span className="text-foreground">Your dots can use {connected.length || "your"} app{connected.length === 1 ? "" : "s"}</span>
            <span className="text-foreground/45"> · via Composio</span>
          </>
        ) : (
          <>
            <span className="text-foreground">Give your dots your apps</span>
            <span className="text-foreground/45"> · Gmail, Calendar, Slack, Notion and 500+ more</span>
          </>
        )}
      </div>
      <span className="font-mono text-[10px] tracking-wider text-brand-readable uppercase">{signedIn ? "Manage" : "Sign in with Composio"}</span>
    </Link>
  );
}
