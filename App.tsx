import React, { useEffect, useState } from "react";
import { ArrowRight, ArrowUpRight, BookOpen, Check, ChevronRight, Clock, Copy, Eye, Flame, Layers, Lightbulb, Megaphone, PenLine, Shield, Sparkles, Target, TrendingUp, Zap, Quote, Users, Compass, FileText, Search, MessageSquare, HeartHandshake, Brain, Gauge } from "lucide-react";

const shellStyle: React.CSSProperties = { boxSizing: "border-box", paddingTop: "var(--safe-area-inset-top)" };

type Prompt = { id: string; title: string; body: string; tag: string };

const prompts: Prompt[] = [
  { id: "p1", title: "Prompt 1: The “Bleeding Neck” Language Extractor", tag: "Phase 1", body: "Act as a qualitative market researcher. Below are [10-15 raw posts/comments] from [target audience, e.g., newly promoted nursing managers / Series B SaaS sales directors]. Analyze this text and extract: 1. The top 3 recurring operational frustrations they face. 2. The exact emotional phrases, metaphors, and slang they use when complaining about these issues. 3. What they have already tried that failed. Present the output in a clean table so I can use their exact language in my workshop marketing." },
  { id: "p2", title: "Prompt 2: The Positioning Sharpener", tag: "Phase 1", body: "I am an independent corporate trainer positioning myself as: ‘[Insert current positioning statement]’. Critique this from the perspective of a busy VP of Learning & Development. Tell me: 1. Why this sounds too generic or ‘nice-to-have.’ 2. Three ways to narrow the target buyer and tie the training to a measurable business KPI (e.g., retention, cycle time, revenue, error reduction). 3. Five punchy, outcomes-focused headlines I could test on my LinkedIn profile." },
  { id: "p2b", title: "Prompt 2B: The Competitor Gap Finder (New)", tag: "Phase 1", body: "Here are 3 competitor trainer websites / LinkedIn bios in my niche: [Paste links or text]. Analyze what they all promise, what language they all use, and where they all sound identical. Then identify 3 positioning gaps they are ignoring that I could own, based on my background in [Insert your edge]." },
  { id: "p3", title: "Prompt 3: The Active-Learning Workshop Architect", tag: "Phase 2", body: "I am designing a [3-hour / full-day] interactive workshop on [Topic] for [Target Audience]. My proprietary framework has [3/4] steps: [Step 1], [Step 2], [Step 3]. Build a minute-by-minute facilitator agenda following a 20% concept / 60% hands-on practice / 20% debrief split. For every module, design a realistic, high-friction exercise or roleplay, no generic ‘turn to your neighbor and discuss’ prompts. Include exact facilitator debrief questions for each activity." },
  { id: "p4", title: "Prompt 4: The Industry-Specific Scenario Generator", tag: "Phase 2", body: "Write three realistic, high-stakes workplace scenarios for a training exercise on [Skill, e.g., pushing back on unrealistic stakeholder deadlines]. The participants are [Target Role] at a [Industry/Company Stage]. For each scenario, provide: Context: A 3-sentence background setup. The Trigger: The exact email or Slack message that sparks the conflict. Hidden Constraints: One political or operational constraint the participant must navigate without ruining the relationship." },
  { id: "p5", title: "Prompt 5: The Accordion Content Adapter", tag: "Phase 2", body: "Here is the full outline of my [4-hour] Signature Workshop: [Paste outline]. Condense this into a high-impact, 45-minute keynote or ‘lunch-and-learn’ talk. Keep only the single sharpest conceptual model and one 5-minute interactive audience exercise. Structure it with a gripping 2-minute opening hook and a natural closing transition that invites attendees to inquire about bringing the full workshop to their team." },
  { id: "p5b", title: "Prompt 5B: The Workbook & Takeaway Builder (New)", tag: "Phase 2", body: "Based on this workshop outline: [Paste outline], create a 1-page participant takeaway sheet. Include: 1) The framework visual described in words, 2) Three fill-in-the-blank scripts they can use on Monday, 3) A 7-day action checklist with one small behavior per day." },
  { id: "p6", title: "Prompt 6: The Content Waterfall Engine", tag: "Phase 3", body: "Below is a raw transcript of me talking for 5 minutes about [Topic] / an article I wrote: [Paste text]. Transform this single core insight into: 1. Two LinkedIn posts: One contrarian/myth-busting hook, and one tactical ‘how-to’ breakdown (under 220 words each, short paragraphs, zero corporate buzzwords). 2. One 60-second vertical video script: Structured as Hook (0-5s), Core Insight + Example (5-45s), Actionable Takeaway (45-60s). 3. One 3-sentence cold outreach angle I can send to [Target Buyer Title] referencing this exact insight." },
  { id: "p7", title: "Prompt 7: The Zero-Fluff “Lunch-and-Learn” Pitch", tag: "Phase 3", body: "Draft a cold outreach email (strictly under 120 words) to [Name], [Title] at [Company]. Context: I noticed [specific company trigger, e.g., they just closed a Series B / posted 5 roles for Team Leads / their CEO spoke on Podcast X about scaling culture]. Offer a complimentary, zero-pitch 30-minute interactive micro-workshop for their [Target Team] on solving [Specific Pain Point]. Keep the tone peer-to-peer, direct, and low-pressure, no exclamation points or ‘hope this email finds you well.’" },
  { id: "p7b", title: "Prompt 7B: The Podcast Pitch Engine (New)", tag: "Phase 3", body: "Draft a 150-word podcast pitch to [Host Name] of [Podcast Name]. My angle is [Insert contrarian take]. Include: Why their audience cares right now, 3 specific questions I can answer better than a generic guest, and one story I can tell that proves I have lived this. Tone: confident, specific, easy to say yes to." },
  { id: "p8", title: "Prompt 8: The Pre-Call Diagnostic Brief", tag: "Phase 4", body: "I have a discovery call tomorrow with [Name], [Title] at [Company]. Based on the company info and recent news pasted below [paste About page / recent news / job descriptions]: 1. Identify 3 likely internal growing pains their team is experiencing right now. 2. Give me 5 sharp, diagnostic questions I can ask on the call that demonstrate deep industry understanding and uncover the financial or operational cost of those pains. 3. List the top 2 objections they might raise about bringing in an external trainer, and how I should reframe each." },
  { id: "p9", title: "Prompt 9: The Cynical Buyer Proposal Audit", tag: "Phase 4", body: "Act as a skeptical, budget-conscious VP of People who receives ten training pitches a week. Review my draft proposal below: [Paste proposal]. Be ruthless: 1. Highlight every sentence that sounds vague, academic, or ‘fluffy.’ 2. Identify where the ROI or business impact feels weak. 3. List the top 3 reasons you would stall or ask for a 30% discount, and suggest specific edits to eliminate each risk signal." },
  { id: "p9b", title: "Prompt 9B: The Follow-Up That Does Not Beg (New)", tag: "Phase 4", body: "I sent this proposal 5 days ago and have not heard back: [Paste proposal summary]. Draft 3 follow-up messages: 1) A 2-sentence value-add nudge with a relevant article or insight, 2) A polite close-the-loop email that gives them an easy out, 3) A final breakup email that leaves the door open. Tone: calm, professional, zero desperation." },
  { id: "p10", title: "Prompt 10: The Rapid Statement of Work (SOW) Builder", tag: "Phase 5", body: "Turn these raw discovery call notes into a clean, formal 1-page Statement of Work (SOW): [Paste bullet points: client name, workshop title, format, dates, headcount, custom prep included, fee, and 50/50 payment schedule]. Organize it with clear headings: Project Objective, Scope of Deliverables, Client Responsibilities (e.g., room setup, participant roster), Timeline, and Investment & Terms. Keep the legal tone clean, plain-English, and professional." },
  { id: "p11", title: "Prompt 11: The Beta Cohort Pattern Decoder", tag: "Phase 5", body: "Analyze these raw post-workshop survey responses from my pilot cohort: [Paste feedback]. Give me: 1. The top 3 highest-leverage moments (what created the biggest ‘aha’ shifts). 2. The exact friction points where pacing dragged or instructions felt unclear. 3. Three concrete edits I should make to my slides or exercises before running this for a full-fee corporate client." },
  { id: "p11b", title: "Prompt 11B: The Testimonial Extractor (New)", tag: "Phase 5", body: "From these raw client quotes and survey responses: [Paste text], extract the 3 strongest testimonials I can use publicly. For each, rewrite it into a tight 2-sentence version that leads with the outcome, not the praise. Preserve their exact words for the outcome metric. Suggest where to use each: website, one-sheet, or LinkedIn." },
];

const nav = [
  { id: "top", label: "Overview", num: "00" },
  { id: "part1", label: "Part I · Roadmap", num: "I" },
  { id: "part2", label: "Part II · Mindset", num: "II" },
  { id: "part3", label: "Part III · Business", num: "III" },
  { id: "part4", label: "Part IV · Prompt Library", num: "IV" },
  { id: "sprint", label: "30-Day Sprint", num: "30" },
];

function SectionHead({ no, kicker, title, sub }: { no: string; kicker: string; title: string; sub?: string }) {
  return (
    <div className="mb-8 sm:mb-10">
      <div className="flex items-center gap-3 mb-4">
        <span className="bg-[var(--ink)] text-[var(--cream)] serif text-sm font-bold px-3 py-1.5 rounded-full">{no}</span>
        <span className="text-[11px] font-bold tracking-[0.22em] uppercase text-[var(--orange)]">{kicker}</span>
        <span className="h-px flex-1 bg-[var(--line)]" />
      </div>
      <h2 className="serif text-[clamp(2rem,5vw,3.6rem)] leading-[0.95] font-black tracking-[-0.02em] [overflow-wrap:anywhere]">{title}</h2>
      {sub && <p className="mt-4 text-base sm:text-lg leading-relaxed text-[var(--muted)] max-w-3xl [overflow-wrap:anywhere]">{sub}</p>}
    </div>
  );
}
function Callout({ icon, title, children, tone = "amber" }: { icon: React.ReactNode; title: string; children: React.ReactNode; tone?: "amber" | "teal" | "orange" }) {
  const styles = tone === "teal" ? "bg-[var(--teal-soft)] border-[var(--teal)]" : tone === "orange" ? "bg-[#FFF0E8] border-[var(--orange)]" : "bg-[var(--amber-soft)] border-[var(--amber)]";
  return (
    <aside className={`my-7 rounded-[22px] border-l-4 p-5 sm:p-6 ${styles}`}>
      <div className="flex items-center gap-2 mb-2"><span className="text-[var(--orange)]">{icon}</span><p className="text-[11px] font-black tracking-[0.18em] uppercase">{title}</p></div>
      <div className="text-[15px] leading-relaxed [overflow-wrap:anywhere]">{children}</div>
    </aside>
  );
}
function PullQuote({ children, cite }: { children: React.ReactNode; cite?: string }) {
  return (
    <blockquote className="my-9 relative rounded-[24px] bg-[var(--ink)] text-[var(--cream)] p-6 sm:p-9 overflow-hidden">
      <Quote className="absolute right-6 top-6 w-10 h-10 opacity-20" />
      <p className="serif text-[clamp(1.4rem,3.2vw,2.1rem)] leading-[1.15] font-semibold italic [overflow-wrap:anywhere]">“{children}”</p>
      {cite && <footer className="mt-4 text-xs tracking-[0.18em] uppercase opacity-70">{cite}</footer>}
    </blockquote>
  );
}

export default function App() {
  const [progress, setProgress] = useState(0);
  const [copied, setCopied] = useState<string | null>(null);
  const [filter, setFilter] = useState("All");
  const [active, setActive] = useState("top");
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setProgress(max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0);
      // simple active detection
      for (const item of [...nav].reverse()) {
        const el = document.getElementById(item.id);
        if (el && el.getBoundingClientRect().top < 220) { setActive(item.id); break; }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const copyText = (text: string, id: string) => {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed"; ta.style.opacity = "0";
    document.body.appendChild(ta); ta.select();
    try { document.execCommand("copy"); setCopied(id); setTimeout(() => setCopied(null), 1800); } catch { /* no-op */ }
    document.body.removeChild(ta);
  };

  const filtered = filter === "All" ? prompts : prompts.filter(p => p.tag === filter);

  return (
    <div data-safe-area-inset-root style={shellStyle} className="min-h-screen bg-[var(--cream)] text-[var(--ink)] overflow-x-clip paper-texture">
      {/* Progress */}
      <div className="fixed left-0 right-0 top-0 h-[4px] bg-[var(--line)] z-[60]"><div className="h-full bg-[var(--orange)] transition-[width] duration-150" style={{ width: `${progress}%` }} /></div>

      {/* Top bar */}
      <header data-safe-area-sticky-top style={{ top: "var(--safe-area-inset-top)" }} className="sticky z-50 bg-[var(--cream)]/95 backdrop-blur border-b border-[var(--line)]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-[62px] flex items-center justify-between gap-3">
          <a href="#top" className="flex items-center gap-2.5 min-w-0">
            <span className="w-9 h-9 rounded-full bg-[var(--orange)] text-white grid place-items-center font-black serif shrink-0">A</span>
            <span className="leading-none min-w-0"><span className="block serif font-black text-[15px] sm:text-lg truncate">The AI-Augmented Trainer</span><span className="block text-[10px] tracking-[0.2em] uppercase text-[var(--muted)]">Complete Playbook · Editorial Edition</span></span>
          </a>
          <nav className="hidden lg:flex items-center gap-1 text-[13px] font-semibold">
            {nav.slice(1).map(n => <a key={n.id} href={`#${n.id}`} className={`px-3 py-2 rounded-full ${active === n.id ? "bg-[var(--ink)] text-[var(--cream)]" : "hover:bg-[var(--cream-3)]"}`}>{n.label}</a>)}
          </nav>
          <a href="#part4" className="shrink-0 bg-[var(--ink)] text-[var(--cream)] text-xs sm:text-sm font-bold px-3.5 sm:px-4 py-2.5 rounded-full flex items-center gap-1.5">16 Prompts <ArrowUpRight className="w-4 h-4" /></a>
        </div>
        <div className="lg:hidden overflow-x-auto whitespace-nowrap px-4 pb-2 flex gap-2 [scrollbar-width:none]">
          {nav.map(n => <a key={n.id} href={`#${n.id}`} className={`text-xs font-bold px-3 py-1.5 rounded-full border shrink-0 ${active === n.id ? "bg-[var(--ink)] text-[var(--cream)] border-[var(--ink)]" : "bg-white/60 border-[var(--line)]"}`}>{n.label}</a>)}
        </div>
      </header>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-[248px_1fr] lg:gap-10 xl:gap-12">
          {/* Sticky left nav desktop */}
          <aside className="hidden lg:block">
            <div className="sticky top-[110px] pt-8 pb-8">
              <p className="text-[11px] font-black tracking-[0.22em] uppercase text-[var(--muted)] mb-4">Contents</p>
              <nav className="space-y-1">
                {nav.map(n => (
                  <a key={n.id} href={`#${n.id}`} className={`flex gap-3 items-start px-3 py-3 rounded-2xl border ${active === n.id ? "bg-[var(--ink)] text-[var(--cream)] border-[var(--ink)]" : "border-transparent hover:bg-[var(--cream-2)]"}`}>
                    <span className="serif font-black text-sm w-6 shrink-0 opacity-70">{n.num}</span>
                    <span className="text-[13px] font-bold leading-tight">{n.label}</span>
                  </a>
                ))}
              </nav>
              <div className="mt-6 rounded-[20px] bg-[var(--teal)] text-white p-5">
                <p className="serif font-bold text-lg leading-tight">One niche. One framework. One channel.</p>
                <p className="text-[13px] leading-relaxed mt-2 opacity-90">One circle. One price you state without flinching. That is the whole business.</p>
                <a href="#sprint" className="mt-4 inline-flex items-center gap-1 bg-white text-black text-xs font-black px-3 py-2 rounded-full">Start the sprint <ArrowRight className="w-3.5 h-3.5" /></a>
              </div>
              <p className="mt-5 text-xs leading-relaxed text-[var(--muted)]">Reading time · Long-form playbook<br />Best read in one focused sitting.</p>
            </div>
          </aside>

          <main id="top" className="min-w-0 pt-6 sm:pt-9 pb-16">
            {/* HERO */}
            <section className="reveal">
              <div className="flex flex-wrap gap-2 mb-5">
                <span className="text-[11px] font-black tracking-[0.16em] uppercase bg-[var(--amber-soft)] border border-[var(--amber)] px-3 py-1.5 rounded-full">Freelance Training · AI Operating System</span>
                <span className="text-[11px] font-black tracking-[0.16em] uppercase bg-white border border-[var(--line)] px-3 py-1.5 rounded-full flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500 pulse-dot" /> From blank slate to five-figure engagements</span>
              </div>
              <h1 className="serif font-black leading-[0.88] tracking-[-0.03em] text-[clamp(2.9rem,8.2vw,6.8rem)] [overflow-wrap:anywhere]">
                The AI-Augmented<br />
                <span className="italic font-semibold text-[var(--orange)]">Freelance Trainer</span><br />
                <span className="text-[clamp(1.55rem,3.8vw,3.2rem)] leading-[1.05] block mt-3 font-bold">The Complete Playbook for Paid Bookings, Premium Pricing, and Unshakeable Confidence</span>
              </h1>
              <div className="mt-7 grid lg:grid-cols-[1.15fr_0.85fr] gap-5 items-stretch">
                <div className="bg-[var(--surface)] border border-[var(--line)] rounded-[26px] p-5 sm:p-7 shadow-[0_18px_40px_rgba(30,27,22,0.08)]">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-[var(--teal)] text-white grid place-items-center serif font-black text-xl">✦</div>
                    <div><p className="text-[11px] tracking-[0.18em] uppercase font-black text-[var(--orange)]">Author-style intro</p><p className="font-bold text-sm">A tight, repeatable operating manual — not another hustle list.</p></div>
                  </div>
                  <p className="mt-4 text-[15px] sm:text-[16px] leading-[1.75] [overflow-wrap:anywhere]">Most freelance trainers do not fail because they lack talent. They fail because they confuse motion with traction.</p>
                  <p className="mt-3 text-[15px] sm:text-[16px] leading-[1.75] [overflow-wrap:anywhere]">They spend months perfecting a logo, researching business structures, and posting on four platforms. It feels like building a business. It is actually sophisticated procrastination: busywork that keeps you safe from rejection and comfortably invisible.</p>
                  <p className="mt-3 text-[15px] sm:text-[16px] leading-[1.75] [overflow-wrap:anywhere]">A sustainable solo training practice does not require an agency&apos;s infrastructure. It requires a tight, repeatable flywheel:</p>
                  <div className="mt-4 flex flex-wrap gap-1.5 text-[12px] font-bold">
                    {["Isolate an acute problem", "Package proprietary IP", "Demonstrate low-risk authority", "Convert high-ticket bookings", "Deliver so well they refer you", "Repeat"].map((t, i) => (
                      <span key={t} className="flex items-center gap-1.5"><span className="bg-[var(--ink)] text-[var(--cream)] px-2.5 py-1.5 rounded-full">{t}</span>{i < 5 && <ChevronRight className="w-3.5 h-3.5 text-[var(--orange)]" />}</span>
                    ))}
                  </div>
                  <p className="mt-4 text-[15px] sm:text-[16px] leading-[1.75] [overflow-wrap:anywhere]">Pair that flywheel with AI as a tireless chief of staff, and weeks of guesswork compress into afternoon sprints. AI does not replace your stories, judgment, or presence. It handles structure, pattern recognition, and rapid prototyping so you can show up sharper, faster, and more human.</p>
                  <p className="mt-3 font-bold">This is the complete operating manual, from blank slate to five-figure engagements.</p>
                  <div className="mt-5 pt-5 border-t border-dashed border-[var(--line)] flex flex-wrap gap-2">
                    <a href="#part1" className="bg-[var(--orange)] text-white px-4 py-2.5 rounded-full text-sm font-bold flex items-center gap-1.5">Begin Part I <ArrowRight className="w-4 h-4" /></a>
                    <a href="#part4" className="bg-[var(--cream-2)] px-4 py-2.5 rounded-full text-sm font-bold">Jump to Prompt Library</a>
                    <a href="#sprint" className="border border-[var(--line)] px-4 py-2.5 rounded-full text-sm font-bold">30-Day Sprint ↓</a>
                  </div>
                </div>

                {/* Flywheel diagram */}
                <div className="relative rounded-[26px] overflow-hidden bg-[var(--ink)] text-[var(--cream)] p-5 sm:p-6 flex flex-col">
                  <div className="flex justify-between items-start"><div><p className="text-[11px] tracking-[0.2em] uppercase font-black text-[var(--amber)]">Animated Diagram · 01</p><h3 className="serif text-2xl font-black leading-tight mt-1">The Paid-Bookings<br />Flywheel</h3></div><span className="bg-white/10 px-2.5 py-1 rounded-full text-[11px] font-bold">REPEAT → COMPOUND</span></div>
                  <div className="relative mx-auto my-6 w-[240px] h-[240px] sm:w-[270px] sm:h-[270px] shrink-0">
                    <div className="absolute inset-0 rounded-full border border-dashed border-white/30 flywheel-spin">
                      {["ISOLATE","PACKAGE","DEMONSTRATE","CONVERT","DELIVER","REPEAT"].map((label, i) => {
                        const angle = (i * 60) - 90; const rad = (angle * Math.PI) / 180;
                        const x = 50 + 42 * Math.cos(rad); const y = 50 + 42 * Math.sin(rad);
                        return <span key={label} className="absolute -translate-x-1/2 -translate-y-1/2 bg-[var(--amber)] text-black text-[9px] font-black px-2 py-1 rounded-full whitespace-nowrap" style={{ left: `${x}%`, top: `${y}%` }}>{label}</span>;
                      })}
                    </div>
                    <div className="absolute inset-[62px] rounded-full bg-[var(--orange)] grid place-items-center text-center p-3"><div><p className="serif font-black text-2xl leading-none">Traction</p><p className="text-[11px] mt-1 opacity-90">Not motion.<br />Momentum.</p></div></div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 mt-auto">
                    {[{ k: "6", v: "Flywheel steps" }, { k: "16", v: "Copy-ready prompts" }, { k: "30", v: "Days to launch" }].map(s => <div key={s.v} className="bg-white/10 rounded-2xl p-3 text-center"><p className="serif text-2xl font-black">{s.k}</p><p className="text-[11px] opacity-80">{s.v}</p></div>)}
                  </div>
                </div>
              </div>

              <div className="mt-5 rounded-[20px] border border-[var(--line)] bg-[var(--surface)] px-4 py-3">
                <div className="flex flex-wrap justify-center gap-x-6 gap-y-1.5 text-[11px] sm:text-[12px] font-black tracking-[0.14em] uppercase text-center">
                  <span>Diagnose before you prescribe ✦</span><span>Never discount the fee — flex the scope ✦</span><span>AI cleans the signal. Humans supply belief ✦</span><span>Stop lowering your price. Start raising your clarity</span>
                </div>
              </div>
            </section>

            {/* PART I */}
            <section id="part1" className="pt-14 sm:pt-20 scroll-mt-28">
              <SectionHead no="PART I" kicker="The Roadmap to Paid Bookings" title="From blank slate to booked." sub="Six moves, in order. No skipping ahead to the logo." />
              {/* Roadmap diagram */}
              <div className="rounded-[24px] bg-[var(--surface)] border border-[var(--line)] p-4 sm:p-5 mb-8 overflow-x-auto">
                <p className="text-[11px] font-black tracking-[0.18em] uppercase text-[var(--muted)] mb-3">The roadmap · Follow left to right</p>
                <div className="flex min-w-[720px] items-center gap-1">
                  {["1 · Niche", "2 · Signature IP", "3 · Keynote Engine", "4 · Channel", "5 · Founding Circle", "6 · Lean Ops"].map((s, i) => (
                    <React.Fragment key={s}><span className={`flex-1 text-center text-[12px] font-black px-2 py-3 rounded-xl ${i === 0 ? "bg-[var(--orange)] text-white" : "bg-[var(--cream-2)]"}`}>{s}</span>{i < 5 && <ArrowRight className="w-4 h-4 shrink-0 text-[var(--orange)]" />}</React.Fragment>
                  ))}
                </div>
                <p className="text-center font-mono text-[13px] mt-3 text-[var(--muted)]">[1. Niche] ---&gt; [2. Signature IP] ---&gt; [3. Keynote Engine] ---&gt; [4. Channel] ---&gt; [5. Founding Circle] ---&gt; [6. Lean Ops]</p>
              </div>

              <div className="space-y-12">
                <article>
                  <div className="flex gap-4 items-baseline"><span className="serif text-5xl font-black text-[var(--orange)]">1</span><h3 className="serif text-[clamp(1.7rem,4vw,2.5rem)] font-black leading-none [overflow-wrap:anywhere]">Isolate the “Bleeding Neck” Problem</h3></div>
                  <p className="mt-4 leading-[1.8] [overflow-wrap:anywhere]">Corporate Learning &amp; Development leaders rarely have leftover budget for “nice-to-have” enrichment. They have urgent budget for fires they need to put out before the next quarterly review.</p>
                  <p className="mt-3 leading-[1.8] [overflow-wrap:anywhere]">Early on, I pitched myself as a “Communication Skills Trainer.” The response was polite nods and zero contracts. Everything shifted when I narrowed to a specific, costly bottleneck: “Helping newly promoted engineering managers run high-stakes technical reviews without micromanaging their teams.”</p>
                  <p className="mt-3 leading-[1.8] [overflow-wrap:anywhere]">When your niche is that sharp, two things happen: buyers immediately self-select, and your curriculum practically writes itself.</p>
                  <div className="grid sm:grid-cols-3 gap-3 my-6">
                    {[{ t: "Urgent", d: "It is costing money, time, or reputation right now.", i: <Flame className="w-5 h-5" /> }, { t: "Visible to leadership", d: "A VP can see it in a dashboard, attrition report, or missed deadline.", i: <Eye className="w-5 h-5" /> }, { t: "Expensive to ignore", d: "The cost of inaction is larger than your fee.", i: <TrendingUp className="w-5 h-5" /> }].map(c => (
                      <div key={c.t} className="rounded-[20px] border border-[var(--line)] bg-[var(--surface)] p-5"><span className="text-[var(--orange)]">{c.i}</span><h4 className="font-black mt-2">{c.t}</h4><p className="text-sm leading-relaxed text-[var(--muted)] mt-1">A bleeding neck problem has three traits: {c.d}</p></div>
                    ))}
                  </div>
                  <p className="leading-[1.8] [overflow-wrap:anywhere]">A bleeding neck problem has three traits:</p>
                  <ol className="list-decimal ml-5 mt-2 space-y-1 leading-[1.8]"><li><strong>Urgent:</strong> It is costing money, time, or reputation right now.</li><li><strong>Visible to leadership:</strong> A VP can see it in a dashboard, attrition report, or missed deadline.</li><li><strong>Expensive to ignore:</strong> The cost of inaction is larger than your fee.</li></ol>
                  <PullQuote>Test your niche with this sentence: “I help [specific buyer] solve [specific costly problem] so they get [measurable outcome] in [timeframe].” <span className="block text-base not-italic font-sans font-normal mt-2 opacity-80">If you cannot fill in every blank with precision, you are still too generic.</span></PullQuote>
                  <p className="leading-[1.8]">Test your niche with this sentence: “I help [specific buyer] solve [specific costly problem] so they get [measurable outcome] in [timeframe].”</p>
                  <p className="mt-2 leading-[1.8]">If you cannot fill in every blank with precision, you are still too generic.</p>
                  {/* Table */}
                  <div className="overflow-x-auto my-6 rounded-[20px] border border-[var(--line)] bg-[var(--surface)]">
                    <table className="w-full min-w-[620px] text-left text-sm">
                      <thead><tr className="bg-[var(--ink)] text-[var(--cream)]"><th className="p-4">Positioning Dimension</th><th className="p-4">Generic (“Vitamin”)</th><th className="p-4 bg-[var(--teal)]">Specific (“Painkiller”)</th></tr></thead>
                      <tbody className="[&>tr]:border-t [&>tr]:border-[var(--line)]">
                        <tr><td className="p-4 font-bold">Title</td><td className="p-4">Leadership &amp; Communication Coach</td><td className="p-4 font-bold">Technical Transition Specialist for Senior Engineers</td></tr>
                        <tr><td className="p-4 font-bold">Core Promise</td><td className="p-4">“Improve team collaboration and morale”</td><td className="p-4 font-bold">“Cut code-review bottlenecks by 40% in 60 days”</td></tr>
                        <tr><td className="p-4 font-bold">Buyer Reaction</td><td className="p-4">“Send me your brochure; we&apos;ll keep you in mind.”</td><td className="p-4 font-bold">“When are you free to talk to our VP of Engineering?”</td></tr>
                        <tr><td className="p-4 font-bold">Competition</td><td className="p-4">Everyone</td><td className="p-4 font-bold">Almost no one</td></tr>
                        <tr><td className="p-4 font-bold">Price Anchor</td><td className="p-4">Compared to other trainers</td><td className="p-4 font-bold">Compared to cost of churn, delay, and rework</td></tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="leading-[1.8]"><strong>Table: Positioning Dimension | Generic (“Vitamin”) | Specific (“Painkiller”)</strong> — Title | Leadership &amp; Communication Coach | Technical Transition Specialist for Senior Engineers · Core Promise | “Improve team collaboration and morale” | “Cut code-review bottlenecks by 40% in 60 days” · Buyer Reaction | “Send me your brochure; we&apos;ll keep you in mind.” | “When are you free to talk to our VP of Engineering?” · Competition | Everyone | Almost no one · Price Anchor | Compared to other trainers | Compared to cost of churn, delay, and rework</p>
                  <p className="mt-3 leading-[1.8]">Where to find the pain: Look for trigger events. A company that just raised a Series B, doubled headcount, launched a new product line, had a public outage, or posted five roles for team leads is not buying “leadership development.” They are buying a solution to scaling pain.</p>
                  <Callout icon={<Search className="w-5 h-5" />} title="AI Accelerator · Voice-of-Customer Mining"><p>Scrape 15 to 20 raw posts from niche subreddits, Blind threads, or LinkedIn comment sections where your target audience vents. Feed them into an LLM to extract their exact vocabulary, the phrases they use at 11 PM when they are frustrated. Using their words in your outreach makes them feel like you have been reading their internal Slack channels. Do not invent the language. Borrow it, then mirror it back with precision.</p></Callout>
                </article>

                <article>
                  <div className="flex gap-4 items-baseline"><span className="serif text-5xl font-black text-[var(--orange)]">2</span><h3 className="serif text-[clamp(1.7rem,4vw,2.5rem)] font-black leading-none">Architect Your Signature Program</h3></div>
                  <p className="mt-4 leading-[1.8]">Once the problem is locked in, resist the urge to build ten different workshops. Build one Signature Program: a proprietary, repeatable methodology that takes a client from Point A (the acute pain) to Point B (the measurable outcome).</p>
                  {/* 20/60/20 */}
                  <div className="my-7 rounded-[22px] bg-[var(--surface)] border border-[var(--line)] p-5 sm:p-6">
                    <div className="flex justify-between flex-wrap gap-2"><p className="text-[11px] font-black tracking-[0.18em] uppercase">The 20 / 60 / 20 Facilitation Ratio</p><span className="text-xs font-bold bg-[var(--amber-soft)] px-2 py-1 rounded-full">Friction → Application → Commitment</span></div>
                    <div className="mt-4 flex flex-col sm:flex-row sm:h-[110px] rounded-2xl overflow-hidden text-white text-center">
                      <div className="w-full sm:w-[20%] bg-[var(--teal)] flex sm:flex-col flex-row items-center sm:justify-center justify-between gap-2 px-3 py-3"><span className="serif text-2xl sm:text-3xl font-black shrink-0">20%</span><span className="text-[11px] font-bold leading-tight [overflow-wrap:anywhere] text-left sm:text-center">Tight Conceptual Framing</span></div>
                      <div className="w-full sm:w-[60%] bg-[var(--orange)] flex sm:flex-col flex-row items-center sm:justify-center justify-between gap-2 px-3 py-3"><span className="serif text-2xl sm:text-3xl font-black shrink-0">60%</span><span className="text-[11px] font-bold leading-tight [overflow-wrap:anywhere] text-left sm:text-center">Hands-On Simulation, Roleplay &amp; Real Client Scenarios</span></div>
                      <div className="w-full sm:w-[20%] bg-[var(--amber)] text-black flex sm:flex-col flex-row items-center sm:justify-center justify-between gap-2 px-3 py-3"><span className="serif text-2xl sm:text-3xl font-black shrink-0">20%</span><span className="text-[11px] font-bold leading-tight [overflow-wrap:anywhere] text-left sm:text-center">Structured Group Debrief &amp; Action Commitment</span></div>
                    </div>
                    <p className="text-sm mt-3 leading-relaxed"><strong>THE 20 / 60 / 20 FACILITATION RATIO:</strong> 20% Tight Conceptual Framing (The Mental Model), 60% Hands-On Simulation, Roleplay &amp; Real Client Scenarios, 20% Structured Group Debrief &amp; Action Commitment</p>
                  </div>
                  <ul className="space-y-3 leading-[1.8]">
                    <li className="flex gap-3"><Check className="w-5 h-5 mt-1 shrink-0 text-[var(--teal)]" /><span><strong>Name your framework:</strong> Give your 3 to 5 step process a sticky, proprietary name (e.g., The Clarity Loop or The 4-Gate Review). Naming transforms “good advice” into intellectual property that only you can teach. A named framework is memorable, referable, and defensible. It also makes your proposal feel like a product, not hours.</span></li>
                    <li className="flex gap-3"><Check className="w-5 h-5 mt-1 shrink-0 text-[var(--teal)]" /><span><strong>Respect adult learning mechanics:</strong> Professionals do not learn through passive lectures; they learn through friction and application. Follow the 20/60/20 rule: 20% tight conceptual framing, 60% hands-on simulation and roleplay using their real workplace scenarios, and 20% structured debriefing and commitment.</span></li>
                    <li className="flex gap-3"><Check className="w-5 h-5 mt-1 shrink-0 text-[var(--teal)]" /><span><strong>Design for transfer, not applause:</strong> A great workshop is not measured by smile sheets. It is measured by what changes on Monday morning. Every exercise should end with: What will you do differently, with whom, by when, and how will you know it worked?</span></li>
                    <li className="flex gap-3"><Check className="w-5 h-5 mt-1 shrink-0 text-[var(--teal)]" /><span><strong>Engineer it like an accordion:</strong> Build your core modules so they expand or contract without losing structural integrity. The exact same IP should power a 60-minute keynote, a 3-hour executive intensive, and a 6-week cohort.</span></li>
                  </ul>
                  <div className="my-6 grid sm:grid-cols-3 gap-3">
                    {[{ t: "60-Min Keynote", d: "Compact / One model, one tool / Inspire + diagnose" }, { t: "3-Hour Executive Intensive", d: "Standard Core / Full framework + practice / Practice + feedback" }, { t: "6-Week Cohort", d: "Expanded / Full framework + coaching / Practice + accountability" }].map((c, i) => (
                      <div key={c.t} className={`rounded-[20px] p-5 border ${i === 1 ? "bg-[var(--ink)] text-[var(--cream)]" : "bg-[var(--surface)] border-[var(--line)]"}`}><p className="text-[11px] tracking-[0.18em] uppercase font-black text-[var(--orange)]">{i === 0 ? "◀ Compact" : i === 1 ? "◆ Standard Core" : "▶ Expanded"}</p><h4 className="serif font-black text-lg mt-2 leading-tight">{c.t}</h4><p className="text-sm mt-1 opacity-80">{c.d}</p></div>
                    ))}
                  </div>
                  <p className="leading-[1.8]">[60-Min Keynote] &lt;===&gt; [3-Hour Executive Intensive] &lt;===&gt; [6-Week Cohort] — Compact / One model, one tool / Inspire + diagnose — Standard Core / Full framework + practice / Practice + feedback — Expanded / Full framework + coaching / Practice + accountability</p>
                  <div className="mt-5 rounded-[22px] bg-[var(--cream-2)] border border-[var(--line)] p-5 sm:p-6">
                    <h4 className="serif font-black text-xl">The Signature Program Blueprint:</h4>
                    <ol className="mt-3 space-y-2 list-decimal ml-5 leading-[1.8]"><li><strong>Diagnostic:</strong> How you assess the team&apos;s current state before day one</li><li><strong>Core Framework:</strong> Your 3 to 5 step model, taught with stories and examples</li><li><strong>Practice Lab:</strong> Real scenarios from their world, with live coaching</li><li><strong>Action Protocol:</strong> Checklists, scripts, and decision tools they take back to work</li><li><strong>Follow-up Loop:</strong> A 30-day check-in that locks in behavior change and creates your next testimonial</li></ol>
                  </div>
                  <Callout icon={<Layers className="w-5 h-5" />} title="AI Accelerator · Curriculum & Scenario Engine"><p>Feed your core 4-step methodology into an LLM and ask it to generate minute-by-minute facilitator run-of-show guides, participant workbook prompts, and edge-case roleplay scenarios tailored to the client&apos;s industry. Translate the same conflict-resolution exercise for fintech versus healthcare versus manufacturing. AI is unmatched at structural scaffolding. You supply the point of view, the stories, and the final judgment on what is actually usable in a real room.</p></Callout>
                </article>

                <article>
                  <div className="flex gap-4 items-baseline"><span className="serif text-5xl font-black text-[var(--orange)]">3</span><h3 className="serif text-[clamp(1.7rem,4vw,2.5rem)] font-black leading-none">Weaponize Your Signature Presentation</h3></div>
                  <p className="mt-4 leading-[1.8]">Your Signature Presentation is not just a deliverable. It is your highest-converting sales asset. Whether delivered at an industry conference, a podcast interview, or a complimentary 45-minute corporate “lunch-and-learn,” this talk must deliver a genuine breakthrough while making the audience realize they need your full program to sustain it.</p>
                  <div className="my-6 grid sm:grid-cols-4 gap-2">
                    {[{ n: "1", t: "Visceral Pain", s: "No bio fluff" }, { n: "2", t: "Named Framework", s: "The missing lens" }, { n: "3", t: "Quick Win Tool", s: "Immediate value" }, { n: "4", t: "Seamless Bridge", s: "Invite to full IP" }].map((s, i) => (
                      <div key={s.t} className="relative rounded-[18px] bg-[var(--surface)] border border-[var(--line)] p-4"><span className="serif text-3xl font-black text-[var(--orange)]">{s.n}</span><p className="font-black leading-tight mt-1">{s.t}</p><p className="text-xs text-[var(--muted)]">{s.s}</p>{i < 3 && <ArrowRight className="absolute -right-2.5 top-1/2 w-5 h-5 text-[var(--orange)] bg-[var(--cream)] rounded-full hidden sm:block" />}</div>
                    ))}
                  </div>
                  <p className="leading-[1.8]">[1. Visceral Pain] ---&gt; [2. Named Framework] ---&gt; [3. Quick Win Tool] ---&gt; [4. Seamless Bridge] (No bio fluff) (The missing lens) (Immediate value) (Invite to full IP)</p>
                  <ul className="mt-4 space-y-3 leading-[1.8] list-disc ml-5">
                    <li><strong>Follow the Diagnosis-First Arc:</strong> Open with a visceral, recognizable failure mode from their world. No biographical throat-clearing, no “I&apos;m so excited to be here.” Introduce your named framework as the missing mental model. Walk them through one immediately usable tool so they get a quick win in the room. Close with a frictionless bridge to working together: “If you want your team to run this live, with your real cases, that&apos;s what the full intensive is for.”</li>
                    <li><strong>Design slides as billboards, not teleprompters:</strong> If your audience is reading a wall of bullet points, they are not listening to you. One idea per slide, bold typography, clean conceptual diagrams. Your slides should make sense in 3 seconds and be useless without you.</li>
                    <li><strong>Capture a 3-minute sizzle reel:</strong> Corporate buyers are risk-averse; they will not put you in front of their executives without seeing how you command a room. Record every talk, even small ones, and edit together 180 seconds of your sharpest stories, room energy, and audience reactions. One great reel is worth 50 cold emails.</li>
                    <li><strong>Build the talk to be invited back:</strong> End with a question the audience cannot answer alone. That unresolved tension is what creates inbound inquiries.</li>
                  </ul>
                  <Callout icon={<Sparkles className="w-5 h-5" />} title="AI Accelerator · Narrative Stress-Testing & Delivery Audit"><p>Before stepping on stage, paste your talk outline into an LLM and prompt it to act as a distracted audience member, flagging every spot where attention might drift. Afterward, drop the transcript of your recorded talk into AI to spot verbal crutches (“um,” “sort of,” “right?”) and identify where your pacing rushed through key punchlines. Use AI to tighten the talk. Use humans to test whether it lands.</p></Callout>
                </article>

                <article>
                  <div className="flex gap-4 items-baseline"><span className="serif text-5xl font-black text-[var(--orange)]">4</span><h3 className="serif text-[clamp(1.7rem,4vw,2.5rem)] font-black leading-none">Pick One Energy-Aligned Marketing Engine</h3></div>
                  <p className="mt-4 leading-[1.8]">Consistency beats ubiquity. Trying to be everywhere guarantees you will burn out in six weeks. Choose one primary distribution channel that matches how you naturally think and communicate, and commit to it for 90 days:</p>
                  <div className="grid sm:grid-cols-3 gap-3 my-5">
                    {[{ icon: <PenLine className="w-5 h-5" />, t: "If you think best on paper", d: "Publish one deeply practical, zero-fluff breakdown per week on LinkedIn or Substack dissecting a specific problem in your niche." }, { icon: <Megaphone className="w-5 h-5" />, t: "If you think best out loud", d: "Pitch yourself to 20 niche industry podcasts. Podcast hosts are constantly starving for articulate guests with fresh frameworks, and a 40-minute interview builds deeper trust than 100 tweets." }, { icon: <Users className="w-5 h-5" />, t: "If you thrive in 1-on-1 conversations", d: "Run a direct, warm outreach campaign to former colleagues, managers, and L&D leads offering a no-pitch, 30-minute diagnostic workshop for their team." }].map(c => <div key={c.t} className="rounded-[20px] bg-[var(--surface)] border border-[var(--line)] p-5"><span className="text-[var(--orange)]">{c.icon}</span><h4 className="font-black mt-2 leading-tight">{c.t}</h4><p className="text-sm leading-relaxed mt-1 text-[var(--muted)]">{c.d}</p></div>)}
                  </div>
                  <ul className="list-disc ml-5 space-y-2 leading-[1.8]"><li>If you think best on paper: Publish one deeply practical, zero-fluff breakdown per week on LinkedIn or Substack dissecting a specific problem in your niche.</li><li>If you think best out loud: Pitch yourself to 20 niche industry podcasts. Podcast hosts are constantly starving for articulate guests with fresh frameworks, and a 40-minute interview builds deeper trust than 100 tweets.</li><li>If you thrive in 1-on-1 conversations: Run a direct, warm outreach campaign to former colleagues, managers, and L&amp;D leads offering a no-pitch, 30-minute diagnostic workshop for their team.</li></ul>
                  <p className="mt-3 leading-[1.8]">The 90-day rule matters. Most trainers quit a channel at day 21, right before compounding starts. Give one channel a full quarter before you judge it.</p>
                  {/* Waterfall */}
                  <div className="my-6 rounded-[22px] bg-[var(--ink)] text-[var(--cream)] p-5 sm:p-6">
                    <p className="text-[11px] tracking-[0.18em] uppercase font-black text-[var(--amber)]">The weekly waterfall · One asset → a week of proof</p>
                    <div className="mt-4 grid sm:grid-cols-[1fr_auto_1fr] gap-3 items-center">
                      <div className="bg-white/10 rounded-2xl p-4"><p className="font-black">1 CORE WEEKLY ASSET</p><p className="text-sm opacity-80">Newsletter OR Podcast Talk</p></div>
                      <ArrowRight className="w-6 h-6 mx-auto text-[var(--amber)] rotate-90 sm:rotate-0" />
                      <div className="space-y-2">
                        <div className="bg-[var(--orange)] rounded-xl px-3 py-2 text-sm font-bold">5 LinkedIn Posts — Varied Hook Angles</div>
                        <div className="bg-[var(--teal)] rounded-xl px-3 py-2 text-sm font-bold">2 Short Video Clips — 60-Sec Vertical Insights</div>
                        <div className="bg-[var(--amber)] text-black rounded-xl px-3 py-2 text-sm font-bold">1 Cold Outreach Hook — 3-Sentence Prospect Note</div>
                      </div>
                    </div>
                    <p className="text-sm mt-3 opacity-90">[1 CORE WEEKLY ASSET] Newsletter OR Podcast Talk -&gt; [5 LinkedIn Posts] Varied Hook Angles, [2 Short Video Clips] 60-Sec Vertical Insights, [1 Cold Outreach Hook] 3-Sentence Prospect Note</p>
                  </div>
                  <p className="font-bold">The weekly cadence that actually works:</p>
                  <ul className="list-disc ml-5 mt-2 space-y-1 leading-[1.8]"><li>Monday: Publish the core asset</li><li>Tuesday to Friday: Repurpose one angle per day, respond to every comment, and send one warm outreach message</li><li>Friday: Review what resonated, save the best language, feed it back into next week&apos;s asset</li></ul>
                  <p className="mt-3 leading-[1.8]">You do not need viral. You need 200 of the right people seeing you solve their exact problem, repeatedly.</p>
                  <Callout icon={<Zap className="w-5 h-5" />} title="AI Accelerator · The Content Waterfall"><p>One core asset fuels your entire week. After you publish a 1,000-word newsletter or finish a podcast interview, feed the text or transcript into AI to fracture it into five distinct LinkedIn posts (each testing a different hook), two short-form video scripts, and a three-sentence outreach angle for prospects. You write once. AI repurposes. You edit with taste.</p></Callout>
                </article>

                <article>
                  <div className="flex gap-4 items-baseline"><span className="serif text-5xl font-black text-[var(--orange)]">5</span><h3 className="serif text-[clamp(1.7rem,4vw,2.5rem)] font-black leading-none">Build a “Founding Circle” Before Scaling</h3></div>
                  <p className="mt-4 leading-[1.8]">You do not need a massive email list to land your first five paid clients; you need ten evangelists who have experienced your work firsthand.</p>
                  <ul className="list-disc ml-5 mt-3 space-y-3 leading-[1.8]">
                    <li><strong>Launch a paid Beta Cohort:</strong> Invite 6 to 10 ideal buyers into a pilot run of your Signature Program at 50% off your target rate. In exchange for the discount, require three things upfront: brutal feedback after every module, a specific case-study metric at the end, and a video testimonial if you deliver results. Paid beta is critical. Free participants do not show up, do not do the work, and do not give honest feedback.</li>
                    <li><strong>Form a Peer Alliance:</strong> Identify 3 to 5 non-competing consultants who serve your exact buyer (e.g., if you teach technical leadership, partner with an executive recruiter, a fractional CTO, and an agile coach). Meet monthly to trade market intelligence and warm introductions. One warm intro from a trusted peer is worth 100 cold emails.</li>
                    <li><strong>Turn every delivery into an asset:</strong> Every workshop should produce at least one testimonial, one case-study metric, one referral, and one piece of content. If it does not, you left value on the table.</li>
                  </ul>
                  <Callout icon={<HeartHandshake className="w-5 h-5" />} title="AI Accelerator · Feedback Synthesis & Warm Outreach"><p>After a beta cohort, dump all raw survey responses and chat logs into an LLM to cluster patterns, separating polite praise from the exact moments participants felt lost. For partner outreach, use AI to summarize a potential partner&apos;s recent podcast appearance or article so your introduction email proves you actually pay attention to their work.</p></Callout>
                </article>

                <article>
                  <div className="flex gap-4 items-baseline"><span className="serif text-5xl font-black text-[var(--orange)]">6</span><h3 className="serif text-[clamp(1.7rem,4vw,2.5rem)] font-black leading-none">Keep Operational Infrastructure Paper-Thin</h3></div>
                  <p className="mt-4 leading-[1.8]">Until you cross six figures, complex tech stacks are just expensive distractions. You need three things to look legitimate and close deals fast:</p>
                  <ol className="list-decimal ml-5 mt-3 space-y-3 leading-[1.8]">
                    <li><strong>A high-converting one-sheet (PDF + simple landing page):</strong> Clear headline stating who you help and the outcome, a visual breakdown of your Signature Program modules, three concrete learning outcomes, and two sharp testimonials. If a buyer cannot understand what you do in 10 seconds, your one-sheet is too clever.</li>
                    <li><strong>A frictionless booking link:</strong> Eliminate the 6-email scheduling dance. One link for discovery calls, one link for paid bookings.</li>
                    <li><strong>A modular Statement of Work (SOW):</strong> A clean two-page agreement outlining scope, deliverables, dates, and payment terms (always 50% upfront to reserve dates, 50% upon delivery) that you can customize and send within two hours of a discovery call. Speed is a trust signal. A proposal sent in two hours feels premium. A proposal sent in two weeks feels forgettable.</li>
                  </ol>
                  <div className="mt-5 rounded-[20px] border-2 border-dashed border-[var(--orange)] bg-[#FFF0E8] p-5"><p className="font-black">What you do NOT need yet:</p><p className="mt-1 leading-[1.8]">A fancy CRM, a course platform, a logo suite, an LLC debate, or a 12-page website. Those are Phase 2 problems.</p></div>
                </article>
              </div>
            </section>

            {/* PART II */}
            <section id="part2" className="pt-16 sm:pt-20 scroll-mt-28">
              <SectionHead no="PART II" kicker="The Mindset" title="You can’t gaslight yourself into confidence." sub="Confidence is not generated in isolation — it is reflected, borrowed, and stress-tested in community." />
              <p className="leading-[1.8]">Somewhere between building my curriculum and pitching my first $10,000 corporate engagement, I hit a wall that no productivity hack could fix.</p>
              <p className="mt-3 leading-[1.8]">Modern solopreneur advice pushes a quiet lie: that confidence is an internal battery you charge alone in a room through morning affirmations, cold plunges, and sheer willpower.</p>
              <p className="mt-3 leading-[1.8]">It does not work. Humans are wired for social calibration, and confidence is not generated in isolation, it is reflected, borrowed, and stress-tested in community. When you are staring at three unanswered proposals and questioning whether you belong in the room, trying to “manifest” belief feels like trying to lift yourself off the floor by pulling on your own shoelaces.</p>

              {/* Pyramid */}
              <div className="my-8 rounded-[24px] bg-[var(--surface)] border border-[var(--line)] p-5 sm:p-7">
                <p className="text-[11px] font-black tracking-[0.18em] uppercase text-center text-[var(--muted)]">Diagram · The Architecture of Resilience</p>
                <h3 className="serif text-2xl font-black text-center mt-1">Built bottom-up. Powered top-down.</h3>
                <div className="max-w-[560px] mx-auto mt-6 space-y-2 text-center">
                  <div className="mx-auto w-[92%] sm:w-[52%] bg-[var(--orange)] text-white rounded-t-[18px] px-4 py-4"><p className="text-[11px] tracking-[0.16em] uppercase font-black">Relational Momentum · The Engine</p><p className="text-sm font-bold mt-1">Peers who reflect your strengths &amp; hold the line</p></div>
                  <div className="mx-auto w-[92%] sm:w-[72%] bg-[var(--amber)] text-black px-4 py-4"><p className="text-[11px] tracking-[0.16em] uppercase font-black">Borrowed Conviction · The Bridge</p><p className="text-sm font-bold mt-1">External belief that carries you through dips</p></div>
                  <div className="mx-auto w-[92%] bg-[var(--teal)] text-white rounded-b-[18px] px-4 py-4"><p className="text-[11px] tracking-[0.16em] uppercase font-black">Self-Worth · The Floor</p><p className="text-sm font-bold mt-1">Prevents self-sabotage &amp; underpricing</p></div>
                </div>
                <p className="text-center text-sm mt-4 text-[var(--muted)]">THE ARCHITECTURE OF RESILIENCE: RELATIONAL MOMENTUM (THE ENGINE) — Peers who reflect your strengths &amp; hold the line, BORROWED CONVICTION (THE BRIDGE) — External belief that carries you through dips, SELF-WORTH (THE FLOOR) — Prevents self-sabotage &amp; underpricing</p>
              </div>

              <h3 className="serif text-2xl font-black">Why a Circle of Believers Outperforms Solo Grit</h3>
              <ol className="list-decimal ml-5 mt-4 space-y-4 leading-[1.8]">
                <li><strong>Borrowed conviction bridges the valley of death</strong> — Every independent trainer hits seasons where self-doubt spikes, usually right after a tough room, a lost bid, or a bold price increase. During those dips, you do not need self-help quotes; you need a peer who has seen your work look you in the eye and say, “I&apos;ve watched you facilitate. You&apos;re underselling this by half.” You borrow their certainty until yours grows back.</li>
                <li><strong>Accurate mirrors correct negativity bias</strong> — Left alone in your own head, your brain acts like a funhouse mirror, magnifying every awkward pause in a workshop while erasing the three executives who asked for your card afterward. Trusted peers act as objective historians, holding up receipts of your actual competence when imposter syndrome tries to rewrite your track record.</li>
                <li><strong>Shared visibility turns paralysis into momentum</strong> — Working solo makes it dangerously easy to hide behind “research” and “tweaking slides.” When two or three fellow builders know what you committed to shipping by Friday, reluctance turns into execution. Accountability does not just make the work lighter; it makes finishing feel inevitable.</li>
                <li><strong>Normalization kills shame</strong> — Solo trainers think everyone else is closing deals effortlessly. In a real peer circle, you learn that everyone gets ghosted, everyone has a bad room, everyone fears raising prices. That normalization is not comforting fluff. It is data that keeps you from quitting on a normal bad week.</li>
              </ol>
              <Callout icon={<Brain className="w-5 h-5" />} title="AI Accelerator · The Cognitive De-Escalator" tone="teal"><p>AI can never replace human empathy, so I do not ask it for pep talks. Instead, I use it as an emotional filter before I call a mentor. When I am spiraling over a rejection, I brain-dump my messy, irrational fears into an LLM and ask it to separate objective facts from catastrophic assumptions. It clears the static so I can bring a sharp, grounded question to my human circle rather than raw panic. AI cleans the signal. Humans supply the belief.</p></Callout>
              <h3 className="serif text-2xl font-black mt-8">The Nuance Nobody Mentions</h3>
              <p className="mt-3 leading-[1.8]">Self-worth still matters, but it functions as a floor, not an engine. High self-worth stops you from accepting disrespectful clients, tolerating scope creep, or slashing your rates out of desperation. It prevents self-sabotage.</p>
              <p className="mt-3 leading-[1.8]">What actually propels you across the finish line into rooms you have never been in before is relational momentum, being surrounded by people who refuse to let you shrink when things get uncomfortable.</p>
              <div className="grid sm:grid-cols-3 gap-3 my-6">
                {[{ n: "1", t: "Mentor", d: "Someone 2 to 3 steps ahead who has sold what you want to sell" }, { n: "2–3", t: "Peers", d: "Fellow trainers or consultants at your level, meeting weekly or biweekly" }, { n: "1", t: "Truth-teller", d: "Someone who will tell you when your talk is flat or your price is too low, without softening it" }].map(c => <div key={c.t} className="rounded-[20px] bg-[var(--surface)] border border-[var(--line)] p-5"><p className="serif text-3xl font-black text-[var(--orange)]">{c.n}</p><h4 className="font-black mt-1">{c.t}</h4><p className="text-sm leading-relaxed text-[var(--muted)] mt-1">{c.d}</p></div>)}
              </div>
              <p className="font-bold">Build your circle intentionally:</p>
              <ul className="list-disc ml-5 mt-2 space-y-1 leading-[1.8]"><li><strong>1 Mentor:</strong> Someone 2 to 3 steps ahead who has sold what you want to sell</li><li><strong>2 to 3 Peers:</strong> Fellow trainers or consultants at your level, meeting weekly or biweekly</li><li><strong>1 Truth-teller:</strong> Someone who will tell you when your talk is flat or your price is too low, without softening it</li></ul>
              <div className="mt-6 rounded-[22px] bg-[var(--amber-soft)] border border-[var(--amber)] p-5 sm:p-6">
                <p className="text-[11px] font-black tracking-[0.18em] uppercase">A 60-Second Reality Check</p>
                <p className="mt-2 font-bold">Whenever you feel stalled on a big leap, ask yourself:</p>
                <ul className="list-disc ml-5 mt-2 space-y-1 leading-[1.8]"><li>Who in my life knows the unedited reality of what I am trying to build right now?</li><li>Who has witnessed my best work and would remind me of it in thirty seconds if I asked?</li><li>Am I waiting to “feel ready” before reaching out, when reaching out is the exact thing that creates readiness?</li></ul>
                <p className="mt-3 leading-[1.8]">If you cannot answer the first two questions, your next business task is not a new funnel. It is finding your people.</p>
              </div>
            </section>

            {/* PART III */}
            <section id="part3" className="pt-16 sm:pt-20 scroll-mt-28">
              <SectionHead no="PART III" kicker="The Business" title="Your price is set before you say a number." sub="Buyers do not purchase effort; they purchase certainty." />
              <p className="leading-[1.8]">Early in my practice, I treated pricing like a math problem: estimate the prep hours, add the delivery hours, multiply by a respectable hourly rate, and hope the client did not flinch.</p>
              <p className="mt-3 leading-[1.8]">Then I lost a bid to a consultant charging three times my quote, for half the workshop days.</p>
              <p className="mt-3 leading-[1.8]">That loss taught me a fundamental law of B2B services: buyers do not purchase effort; they purchase certainty. And their perception of your certainty is locked in long before you ever mention a dollar figure. Nobody emails you to say, “Your discovery call felt unfocused and your proposal had formatting inconsistencies, so I mentally discounted your value by 40%.” They simply say, “We decided to go in another direction,” or vanish into silence.</p>

              {/* Risk tax diagram */}
              <div className="my-7 grid md:grid-cols-2 gap-3">
                <div className="rounded-[22px] bg-[#FFF0E8] border border-[var(--orange)] p-5"><p className="text-[11px] font-black tracking-[0.16em] uppercase text-[var(--orange)]">Path A · High risk</p><p className="font-black mt-2">[SLOPPY PRESENTATION] ---&gt; Buyer Senses High Risk ---&gt; Silent 40% Mental Discount</p><p className="text-sm mt-2 leading-relaxed">Vague outcomes, rambling explanations, hesitant language make a $1,500 fee feel like a gamble.</p></div>
                <div className="rounded-[22px] bg-[var(--teal-soft)] border border-[var(--teal)] p-5"><p className="text-[11px] font-black tracking-[0.16em] uppercase text-[var(--teal)]">Path B · Certainty</p><p className="font-black mt-2">[SHARP DIAGNOSIS] ---&gt; Buyer Senses Certainty ---&gt; Premium Fee Feels Like Insurance</p><p className="text-sm mt-2 leading-relaxed">Prompt follow-ups, sharp questions, zero jargon, clear deliverables make $12,000 feel like insurance.</p></div>
              </div>

              <h3 className="serif text-2xl font-black">The Invisible Risk Tax</h3>
              <p className="mt-3 leading-[1.8]">When a VP of L&amp;D looks at your proposal, they are not calculating your hourly wage. They are running a silent risk assessment: If I put my reputation on the line to bring this person in front of 40 senior leaders, what are the odds I look like a hero versus the odds I have to clean up a mess?</p>
              <ul className="list-disc ml-5 mt-3 space-y-2 leading-[1.8]"><li><strong>Precision signals safety:</strong> Prompt follow-ups, sharp diagnostic questions, zero jargon, and crystal-clear deliverables make a $12,000 fee feel like insurance against failure.</li><li><strong>Friction signals risk:</strong> Vague outcomes, rambling explanations, or hesitant language make a $1,500 fee feel like a gamble.</li></ul>
              <PullQuote>When you under-present, you under-price. The discount never appears as a line item on your invoice — it gets deducted silently inside the buyer’s mind.</PullQuote>
              <p className="leading-[1.8]">When you under-present, you under-price. The discount never appears as a line item on your invoice, it gets deducted silently inside the buyer&apos;s mind.</p>

              <h3 className="serif text-2xl font-black mt-10">Three Levers That Command Premium Fees</h3>
              <div className="mt-5 space-y-6">
                <div className="rounded-[22px] bg-[var(--surface)] border border-[var(--line)] p-5 sm:p-6"><div className="flex gap-3"><span className="w-9 h-9 shrink-0 rounded-full bg-[var(--ink)] text-[var(--cream)] grid place-items-center font-black">1</span><div><h4 className="font-black text-lg leading-tight">Diagnose Before You Prescribe</h4><p className="mt-2 leading-[1.8] text-[15px]">Vendors lead with their catalog (“Here are the 12 workshops I offer”). Strategic partners lead with a diagnosis so sharp the buyer feels relieved just hearing it articulated. When you accurately name the downstream cost of their team&apos;s current bottleneck, missed deadlines, engineering churn, stalled initiatives, your fee stops being compared to a training budget and starts being compared to the cost of inaction.</p><p className="mt-3 leading-[1.8]"><strong>Use this discovery formula: Symptom &gt; Cost &gt; Cause &gt; Consequence &gt; Commitment.</strong> Ask: What is happening? What is it costing you? Why do you think it keeps happening? What happens if it continues for another quarter? What would solving it be worth?</p><Callout icon={<Compass className="w-5 h-5" />} title="AI Accelerator · Pre-Call Intelligence Briefing"><p>Thirty minutes before any discovery call, feed the company&apos;s annual report, recent press releases, job postings (which reveal what skills they are struggling to hire for), and the buyer&apos;s LinkedIn profile into AI. Ask it to generate three sharp hypotheses about internal friction points. Asking “I noticed you&apos;re scaling your backend team by 30% this quarter, how are your senior ICs handling the sudden jump in code-review load?” immediately separates you from 99% of trainers.</p></Callout></div></div></div>
                <div className="rounded-[22px] bg-[var(--surface)] border border-[var(--line)] p-5 sm:p-6"><div className="flex gap-3"><span className="w-9 h-9 shrink-0 rounded-full bg-[var(--ink)] text-[var(--cream)] grid place-items-center font-black">2</span><div><h4 className="font-black text-lg leading-tight">Eliminate Every Millimeter of Ambiguity</h4><p className="mt-2 leading-[1.8] text-[15px]">Confusion kills deals faster than high prices. If a buyer has to squint to understand who attends, what pre-work is required, how success is measured, or what happens after the session, they stall. Ambiguity creates internal friction when your champion tries to get budget approval from finance.</p><p className="mt-3 leading-[1.8]">Your proposal should answer, in one page: Who is this for, what problem does it solve, what exactly happens, what do they walk away with, how will we measure success, and what is the investment.</p><Callout icon={<Gauge className="w-5 h-5" />} title="AI Accelerator · The Friction Audit"><p>Before sending any proposal, run it through an LLM with explicit instructions to highlight every vague phrase (“ongoing support,” “tailored modules,” “improved alignment”) and force you to replace it with concrete, observable deliverables. If AI cannot picture what you mean, neither can your buyer.</p></Callout></div></div></div>
                <div className="rounded-[22px] bg-[var(--surface)] border border-[var(--line)] p-5 sm:p-6"><div className="flex gap-3"><span className="w-9 h-9 shrink-0 rounded-full bg-[var(--ink)] text-[var(--cream)] grid place-items-center font-black">3</span><div><h4 className="font-black text-lg leading-tight">State Your Fee Like a Weather Report</h4><p className="mt-2 leading-[1.8] text-[15px]">Apologetic phrasing destroys authority in half a second. Compare these two deliveries:</p>
                  <div className="grid sm:grid-cols-2 gap-3 my-4">
                    <div className="rounded-2xl bg-[#FFF0E8] border border-[var(--orange)] p-4"><p className="text-xs font-black text-[var(--orange)]">❌ THE SELF-DISCOUNT</p><p className="text-sm leading-relaxed mt-2">“For a two-day offsite like this, I usually charge around $8,500, though I know budgets are tight right now so we can definitely play around with the numbers if that feels steep.” (You just signaled that your price is arbitrary and you do not fully believe in it.)</p></div>
                    <div className="rounded-2xl bg-[var(--teal-soft)] border border-[var(--teal)] p-4"><p className="text-xs font-black text-[var(--teal)]">✅ THE ANCHOR</p><p className="text-sm leading-relaxed mt-2">“The investment for the full two-day Leadership Intensive, including the pre-workshop team diagnostic, custom simulations, and the 30-day manager follow-up lab, is $8,500.” (Stop talking. Hold eye contact or stay silent on the line.)</p></div>
                  </div>
                  <p className="leading-[1.8]">Silence after stating a price is not awkward; it is the sound of a buyer doing the math and respecting your composure.</p>
                  <p className="mt-3 font-bold">Pricing architecture that works:</p>
                  <ul className="list-disc ml-5 mt-2 space-y-1 leading-[1.8]"><li><strong>Single-day workshop:</strong> Entry point, but never your only offer</li><li><strong>Intensive + Follow-up:</strong> Your core, premium offer. The follow-up is what creates lasting change and justifies the fee</li><li><strong>Cohort / Retainer:</strong> Recurring revenue, deeper transformation, and the easiest upsell because trust is already built</li></ul>
                  <p className="mt-3 leading-[1.8] font-bold">Never discount the fee. If you must flex, flex the scope, not the price. Remove the follow-up lab, shorten the cohort, or reduce headcount, but keep your rate intact. Discounting trains buyers to negotiate. Scoping trains them to respect your structure.</p>
                </div></div></div>
              </div>

              <div className="mt-8">
                <h3 className="serif text-2xl font-black">The 5-Point Packaging Audit</h3>
                <p className="mt-2 leading-[1.8]">Before you ever lower a rate, run your sales process through these five filters:</p>
                <div className="overflow-x-auto my-5 rounded-[20px] border border-[var(--line)] bg-[var(--surface)]">
                  <table className="w-full min-w-[680px] text-left text-sm">
                    <thead><tr className="bg-[var(--ink)] text-[var(--cream)]"><th className="p-4">Audit Checkpoint</th><th className="p-4">Low-Trust Signal (Commodity)</th><th className="p-4 bg-[var(--teal)]">High-Trust Signal (Partner)</th></tr></thead>
                    <tbody className="[&>tr]:border-t [&>tr]:border-[var(--line)]">
                      <tr><td className="p-4 font-bold">1. The Opening</td><td className="p-4">Starts with your bio, credentials, and logo</td><td className="p-4">Starts with their acute problem and desired state</td></tr>
                      <tr><td className="p-4 font-bold">2. Discovery Call</td><td className="p-4">Asks basic questions found on their website</td><td className="p-4">Brings hypotheses based on hiring &amp; market signals</td></tr>
                      <tr><td className="p-4 font-bold">3. The Framing</td><td className="p-4">“Cost for 1 day of facilitation”</td><td className="p-4">“Investment in the 90-Day Technical Lead Accelerator”</td></tr>
                      <tr><td className="p-4 font-bold">4. Verbal Leaks</td><td className="p-4">Uses “just,” “roughly,” “try to,” “if that&apos;s okay”</td><td className="p-4">Direct, declarative statements without hedges</td></tr>
                      <tr><td className="p-4 font-bold">5. The Mirror Test</td><td className="p-4">Dense text walls with vague outcomes</td><td className="p-4">Scannable deliverables, clear timeline, defined ROI</td></tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-sm leading-relaxed text-[var(--muted)]">Table: Audit Checkpoint | Low-Trust Signal (Commodity) | High-Trust Signal (Partner) — 1. The Opening | Starts with your bio, credentials, and logo | Starts with their acute problem and desired state · 2. Discovery Call | Asks basic questions found on their website | Brings hypotheses based on hiring &amp; market signals · 3. The Framing | “Cost for 1 day of facilitation” | “Investment in the 90-Day Technical Lead Accelerator” · 4. Verbal Leaks | Uses “just,” “roughly,” “try to,” “if that&apos;s okay” | Direct, declarative statements without hedges · 5. The Mirror Test | Dense text walls with vague outcomes | Scannable deliverables, clear timeline, defined ROI</p>
                <Callout icon={<Shield className="w-5 h-5" />} title="AI Accelerator · The Red-Team Buyer Simulation"><p>Paste your finished proposal into an LLM and tell it to roleplay a cynical CFO or time-starved VP of HR looking for reasons to say no. Fixing the three objections it surfaces before the client sees the document routinely saves deals.</p></Callout>
              </div>

              <div className="mt-8 rounded-[22px] bg-[var(--ink)] text-[var(--cream)] p-5 sm:p-7">
                <p className="text-[11px] tracking-[0.18em] uppercase font-black text-[var(--amber)]">The Non-Negotiable Caveat</p>
                <p className="mt-3 leading-[1.8]">Sharp packaging elevates your ceiling, but delivery determines whether you stay there. High-gloss marketing wrapped around mediocre facilitation is just an accelerated path to burning your reputation. The sequence is absolute: build real mastery first, then make that mastery legible. Most independent trainers are not under-skilled, they are simply under-translated.</p>
                <p className="serif text-2xl font-black mt-4">Stop lowering your price. Start raising your clarity.</p>
              </div>
            </section>

            {/* PART IV */}
            <section id="part4" className="pt-16 sm:pt-20 scroll-mt-28">
              <SectionHead no="PART IV" kicker="The AI Operating System" title="My Master Prompt Library" sub="I do not use AI to replace my expertise, stories, or facilitation instincts. I treat it like a sharp, hyper-literate chief of staff: I supply the strategy, raw insights, and final judgment; it handles structural heavy lifting, pattern recognition, and rapid prototyping." />
              <p className="leading-[1.8]">Copy, customize, and save these prompts as reusable templates across every stage of your practice. For each one, paste your real context in brackets. The more specific your input, the less generic the output.</p>

              <div className="my-6 flex flex-wrap gap-2">
                {["All", "Phase 1", "Phase 2", "Phase 3", "Phase 4", "Phase 5"].map(f => (
                  <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 rounded-full text-sm font-bold border ${filter === f ? "bg-[var(--ink)] text-[var(--cream)] border-[var(--ink)]" : "bg-[var(--surface)] border-[var(--line)]"}`}>{f === "All" ? "All 16 prompts" : f}</button>
                ))}
              </div>
              <p className="text-sm text-[var(--muted)] mb-4">Showing {filtered.length} of 16 prompts · Select any prompt text below and use the Copy control to copy it.</p>

              {/* Phase headings + prompts */}
              {(["Phase 1", "Phase 2", "Phase 3", "Phase 4", "Phase 5"] as const).map(phase => {
                const items = filtered.filter(p => p.tag === phase);
                if (!items.length) return null;
                const titles: Record<string, string> = { "Phase 1": "Phase 1: Niche & Market Intelligence", "Phase 2": "Phase 2: Signature Curriculum Design", "Phase 3": "Phase 3: Energy-Aligned Marketing & Outreach", "Phase 4": "Phase 4: High-Trust Sales & Packaging", "Phase 5": "Phase 5: Lean Operations & Iteration" };
                return (
                  <div key={phase} className="mb-8">
                    <h3 className="serif text-[clamp(1.4rem,3vw,2rem)] font-black mb-4 flex items-center gap-3"><span className="w-9 h-9 rounded-full bg-[var(--orange)] text-white grid place-items-center text-sm font-black shrink-0">{phase.split(" ")[1]}</span>{titles[phase]}</h3>
                    <div className="space-y-4">
                      {items.map(p => (
                        <article key={p.id} className="rounded-[22px] bg-[var(--surface)] border border-[var(--line)] overflow-hidden">
                          <div className="flex items-start justify-between gap-3 p-5 pb-0"><div><span className="text-[11px] font-black tracking-[0.16em] uppercase text-[var(--teal)]">{p.tag} · Copy-ready</span><h4 className="font-black text-[17px] leading-tight mt-1 [overflow-wrap:anywhere]">{p.title}</h4></div><button onClick={() => copyText(`${p.title}\n\n${p.body}`, p.id)} className={`shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-black ${copied === p.id ? "bg-emerald-600 text-white" : "bg-[var(--ink)] text-[var(--cream)]"}`}>{copied === p.id ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}{copied === p.id ? "Copied!" : "Copy prompt"}</button></div>
                          <p className="p-5 pt-3 text-[15px] leading-[1.8] text-[var(--charcoal)] [overflow-wrap:anywhere]">{p.body}</p>
                          <div className="px-5 pb-4 flex gap-2"><span className="text-[11px] bg-[var(--cream-2)] px-2.5 py-1 rounded-full font-bold">Paste your real context in [brackets]</span><span className="text-[11px] bg-[var(--amber-soft)] px-2.5 py-1 rounded-full font-bold">Edit with taste before sending</span></div>
                        </article>
                      ))}
                    </div>
                  </div>
                );
              })}

              {/* Guardrails */}
              <div className="mt-10 rounded-[26px] bg-[var(--ink)] text-[var(--cream)] p-5 sm:p-7">
                <div className="flex items-center gap-2"><Shield className="w-5 h-5 text-[var(--amber)]" /><p className="text-[11px] font-black tracking-[0.2em] uppercase">My 3 Guardrails for AI-Augmented Trainers</p></div>
                <h3 className="serif text-2xl sm:text-3xl font-black mt-3">THE HUMAN-AI DIVISION OF LABOR</h3>
                <div className="grid sm:grid-cols-2 gap-3 mt-5">
                  <div className="rounded-[18px] bg-white/10 p-5"><p className="font-black text-[var(--amber)]">AI OWNS (Structure &amp; Speed)</p><ul className="mt-2 space-y-1.5 text-sm leading-relaxed"><li>• Raw pattern clustering</li><li>• Agenda timing &amp; scaffolding</li><li>• Proposal friction audits</li><li>• Content format repurposing</li></ul></div>
                  <div className="rounded-[18px] bg-[var(--orange)] p-5"><p className="font-black">YOU OWN (Soul &amp; Judgment)</p><ul className="mt-2 space-y-1.5 text-sm leading-relaxed"><li>• Lived stories &amp; scars</li><li>• Contrarian points of view</li><li>• Live room reading &amp; presence</li><li>• Final editorial taste</li></ul></div>
                </div>
                <p className="text-sm mt-4 opacity-80">THE HUMAN-AI DIVISION OF LABOR: AI OWNS (Structure &amp; Speed) - Raw pattern clustering, Agenda timing &amp; scaffolding, Proposal friction audits, Content format repurposing | YOU OWN (Soul &amp; Judgment) - Lived stories &amp; scars, Contrarian points of view, Live room reading &amp; presence, Final editorial taste</p>
                <ol className="list-decimal ml-5 mt-5 space-y-3 leading-[1.8]">
                  <li><strong>Never outsource your point of view:</strong> If you ask AI to “write a workshop on leadership,” it will hand you sanitized, Wikipedia-level clichés that any participant could generate themselves in ten seconds. Feed AI your frameworks, your contrarian opinions, and your messy real-world stories first, then let it organize and expand them.</li>
                  <li><strong>Hunt and destroy “AI tells”:</strong> Before anything reaches a client or LinkedIn feed, strip out robotic transitions and overused LLM filler (“delve,” “tapestry,” “testament to,” “in today&apos;s fast-paced landscape,” “unlock your potential”). If you would not say a sentence out loud over coffee with a peer, cut it.</li>
                  <li><strong>Keep the human moments sacred:</strong> AI builds the architecture, sharpens the pitch, and clears the admin queue so that when you step into the room, or onto the call, you are 100% present, unhurried, and deeply human. That presence is the one thing no algorithm can ever commoditize.</li>
                </ol>
              </div>
            </section>

            {/* SPRINT */}
            <section id="sprint" className="pt-16 sm:pt-20 scroll-mt-28">
              <SectionHead no="30-DAY SPRINT" kicker="Your 30-Day Launch Sprint" title="If you are starting from zero, do not try to do everything. Do this:" />
              <div className="relative">
                <div className="absolute left-[19px] sm:left-[27px] top-2 bottom-2 w-px bg-[var(--line)]" />
                <div className="space-y-4">
                  {[
                    { w: "Week 1: Clarity", d: "Pick your bleeding neck problem. Interview 5 ideal buyers. Extract their language with Prompt 1.", icon: <Search className="w-5 h-5" />, color: "bg-[var(--teal)]" },
                    { w: "Week 2: Build", d: "Name your framework. Build the accordion version: keynote, intensive, cohort. Use Prompts 3, 4, and 5.", icon: <Layers className="w-5 h-5" />, color: "bg-[var(--orange)]" },
                    { w: "Week 3: Prove", d: "Run one free lunch-and-learn or podcast. Record it. Cut your sizzle reel. Use Prompts 6 and 7.", icon: <Megaphone className="w-5 h-5" />, color: "bg-[var(--amber)] text-black" },
                    { w: "Week 4: Sell", d: "Pitch your paid beta cohort to 10 warm contacts. Send 10 outreach emails. Use Prompts 8, 9, and 10.", icon: <TrendingUp className="w-5 h-5" />, color: "bg-[var(--ink)] text-[var(--cream)]" },
                  ].map(s => (
                    <div key={s.w} className="relative pl-[52px] sm:pl-[68px]">
                      <span className={`absolute left-0 top-0 w-10 h-10 sm:w-14 sm:h-14 rounded-full grid place-items-center text-white ${s.color} shadow-lg`}>{s.icon}</span>
                      <div className="rounded-[20px] bg-[var(--surface)] border border-[var(--line)] p-5"><h4 className="serif font-black text-xl">{s.w}</h4><p className="mt-1 leading-[1.8]">{s.d}</p></div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-8 rounded-[24px] bg-[var(--orange)] text-white p-6 sm:p-8 text-center">
                <p className="serif text-[clamp(1.5rem,3.5vw,2.4rem)] font-black leading-tight">One niche. One framework. One channel. One circle. One price you state without flinching.</p>
                <p className="mt-3 text-lg font-bold">That is the whole business.</p>
                <div className="mt-5 flex flex-wrap justify-center gap-2">
                  <a href="#part1" className="bg-white text-black px-4 py-2.5 rounded-full text-sm font-black">Re-read Part I</a>
                  <a href="#part4" className="bg-black/25 px-4 py-2.5 rounded-full text-sm font-black">Open Prompt Library</a>
                  <button onClick={() => setShowAll(v => !v)} className="bg-black/25 px-4 py-2.5 rounded-full text-sm font-black">{showAll ? "Hide the closing note" : "Show the closing note"}</button>
                </div>
                {showAll && <p className="mt-5 text-sm leading-relaxed bg-black/20 rounded-2xl p-4 max-w-2xl mx-auto">You now have the flywheel, the pricing architecture, the resilience system, and 16 copy-ready prompts. Start with Week 1 — one sharp problem, five real conversations, and language borrowed from the people you want to serve.</p>}
              </div>
              <div className="mt-8 h-px bg-gradient-to-r from-transparent via-[var(--orange)] to-transparent" />
              <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-xs text-[var(--muted)]">
                <p className="flex items-center gap-1.5"><BookOpen className="w-4 h-4" /> The AI-Augmented Freelance Trainer · Complete Playbook</p>
                <p className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> Read · Build · Prove · Sell — in 30 days</p>
                <a href="#top" className="font-bold text-[var(--ink)]">Back to top ↑</a>
              </div>
              <div className="mt-4 flex flex-wrap gap-2 text-[11px] font-bold">
                <span className="bg-[var(--cream-2)] px-3 py-1.5 rounded-full flex items-center gap-1"><Flame className="w-3.5 h-3.5 text-[var(--orange)]" /> Bleeding-neck focus</span>
                <span className="bg-[var(--cream-2)] px-3 py-1.5 rounded-full flex items-center gap-1"><Lightbulb className="w-3.5 h-3.5 text-[var(--orange)]" /> Named IP</span>
                <span className="bg-[var(--cream-2)] px-3 py-1.5 rounded-full flex items-center gap-1"><MessageSquare className="w-3.5 h-3.5 text-[var(--orange)]" /> Diagnosis-first selling</span>
                <span className="bg-[var(--cream-2)] px-3 py-1.5 rounded-full flex items-center gap-1"><FileText className="w-3.5 h-3.5 text-[var(--orange)]" /> 16 prompts included</span>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
