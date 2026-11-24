const PROMPTS = [
  {
    "id": "p1",
    "title": "Prompt 1: The \u201cBleeding Neck\u201d Language Extractor",
    "tag": "Phase 1",
    "body": "Act as a qualitative market researcher. Below are [10-15 raw posts/comments] from [target audience, e.g., newly promoted nursing managers / Series B SaaS sales directors]. Analyze this text and extract: 1. The top 3 recurring operational frustrations they face. 2. The exact emotional phrases, metaphors, and slang they use when complaining about these issues. 3. What they have already tried that failed. Present the output in a clean table so I can use their exact language in my workshop marketing."
  },
  {
    "id": "p2",
    "title": "Prompt 2: The Positioning Sharpener",
    "tag": "Phase 1",
    "body": "I am an independent corporate trainer positioning myself as: \u2018[Insert current positioning statement]\u2019. Critique this from the perspective of a busy VP of Learning & Development. Tell me: 1. Why this sounds too generic or \u2018nice-to-have.\u2019 2. Three ways to narrow the target buyer and tie the training to a measurable business KPI (e.g., retention, cycle time, revenue, error reduction). 3. Five punchy, outcomes-focused headlines I could test on my LinkedIn profile."
  },
  {
    "id": "p2b",
    "title": "Prompt 2B: The Competitor Gap Finder (New)",
    "tag": "Phase 1",
    "body": "Here are 3 competitor trainer websites / LinkedIn bios in my niche: [Paste links or text]. Analyze what they all promise, what language they all use, and where they all sound identical. Then identify 3 positioning gaps they are ignoring that I could own, based on my background in [Insert your edge]."
  },
  {
    "id": "p3",
    "title": "Prompt 3: The Active-Learning Workshop Architect",
    "tag": "Phase 2",
    "body": "I am designing a [3-hour / full-day] interactive workshop on [Topic] for [Target Audience]. My proprietary framework has [3/4] steps: [Step 1], [Step 2], [Step 3]. Build a minute-by-minute facilitator agenda following a 20% concept / 60% hands-on practice / 20% debrief split. For every module, design a realistic, high-friction exercise or roleplay, no generic \u2018turn to your neighbor and discuss\u2019 prompts. Include exact facilitator debrief questions for each activity."
  },
  {
    "id": "p4",
    "title": "Prompt 4: The Industry-Specific Scenario Generator",
    "tag": "Phase 2",
    "body": "Write three realistic, high-stakes workplace scenarios for a training exercise on [Skill, e.g., pushing back on unrealistic stakeholder deadlines]. The participants are [Target Role] at a [Industry/Company Stage]. For each scenario, provide: Context: A 3-sentence background setup. The Trigger: The exact email or Slack message that sparks the conflict. Hidden Constraints: One political or operational constraint the participant must navigate without ruining the relationship."
  },
  {
    "id": "p5",
    "title": "Prompt 5: The Accordion Content Adapter",
    "tag": "Phase 2",
    "body": "Here is the full outline of my [4-hour] Signature Workshop: [Paste outline]. Condense this into a high-impact, 45-minute keynote or \u2018lunch-and-learn\u2019 talk. Keep only the single sharpest conceptual model and one 5-minute interactive audience exercise. Structure it with a gripping 2-minute opening hook and a natural closing transition that invites attendees to inquire about bringing the full workshop to their team."
  },
  {
    "id": "p5b",
    "title": "Prompt 5B: The Workbook & Takeaway Builder (New)",
    "tag": "Phase 2",
    "body": "Based on this workshop outline: [Paste outline], create a 1-page participant takeaway sheet. Include: 1) The framework visual described in words, 2) Three fill-in-the-blank scripts they can use on Monday, 3) A 7-day action checklist with one small behavior per day."
  },
  {
    "id": "p6",
    "title": "Prompt 6: The Content Waterfall Engine",
    "tag": "Phase 3",
    "body": "Below is a raw transcript of me talking for 5 minutes about [Topic] / an article I wrote: [Paste text]. Transform this single core insight into: 1. Two LinkedIn posts: One contrarian/myth-busting hook, and one tactical \u2018how-to\u2019 breakdown (under 220 words each, short paragraphs, zero corporate buzzwords). 2. One 60-second vertical video script: Structured as Hook (0-5s), Core Insight + Example (5-45s), Actionable Takeaway (45-60s). 3. One 3-sentence cold outreach angle I can send to [Target Buyer Title] referencing this exact insight."
  },
  {
    "id": "p7",
    "title": "Prompt 7: The Zero-Fluff \u201cLunch-and-Learn\u201d Pitch",
    "tag": "Phase 3",
    "body": "Draft a cold outreach email (strictly under 120 words) to [Name], [Title] at [Company]. Context: I noticed [specific company trigger, e.g., they just closed a Series B / posted 5 roles for Team Leads / their CEO spoke on Podcast X about scaling culture]. Offer a complimentary, zero-pitch 30-minute interactive micro-workshop for their [Target Team] on solving [Specific Pain Point]. Keep the tone peer-to-peer, direct, and low-pressure, no exclamation points or \u2018hope this email finds you well.\u2019"
  },
  {
    "id": "p7b",
    "title": "Prompt 7B: The Podcast Pitch Engine (New)",
    "tag": "Phase 3",
    "body": "Draft a 150-word podcast pitch to [Host Name] of [Podcast Name]. My angle is [Insert contrarian take]. Include: Why their audience cares right now, 3 specific questions I can answer better than a generic guest, and one story I can tell that proves I have lived this. Tone: confident, specific, easy to say yes to."
  },
  {
    "id": "p8",
    "title": "Prompt 8: The Pre-Call Diagnostic Brief",
    "tag": "Phase 4",
    "body": "I have a discovery call tomorrow with [Name], [Title] at [Company]. Based on the company info and recent news pasted below [paste About page / recent news / job descriptions]: 1. Identify 3 likely internal growing pains their team is experiencing right now. 2. Give me 5 sharp, diagnostic questions I can ask on the call that demonstrate deep industry understanding and uncover the financial or operational cost of those pains. 3. List the top 2 objections they might raise about bringing in an external trainer, and how I should reframe each."
  },
  {
    "id": "p9",
    "title": "Prompt 9: The Cynical Buyer Proposal Audit",
    "tag": "Phase 4",
    "body": "Act as a skeptical, budget-conscious VP of People who receives ten training pitches a week. Review my draft proposal below: [Paste proposal]. Be ruthless: 1. Highlight every sentence that sounds vague, academic, or \u2018fluffy.\u2019 2. Identify where the ROI or business impact feels weak. 3. List the top 3 reasons you would stall or ask for a 30% discount, and suggest specific edits to eliminate each risk signal."
  },
  {
    "id": "p9b",
    "title": "Prompt 9B: The Follow-Up That Does Not Beg (New)",
    "tag": "Phase 4",
    "body": "I sent this proposal 5 days ago and have not heard back: [Paste proposal summary]. Draft 3 follow-up messages: 1) A 2-sentence value-add nudge with a relevant article or insight, 2) A polite close-the-loop email that gives them an easy out, 3) A final breakup email that leaves the door open. Tone: calm, professional, zero desperation."
  },
  {
    "id": "p10",
    "title": "Prompt 10: The Rapid Statement of Work (SOW) Builder",
    "tag": "Phase 5",
    "body": "Turn these raw discovery call notes into a clean, formal 1-page Statement of Work (SOW): [Paste bullet points: client name, workshop title, format, dates, headcount, custom prep included, fee, and 50/50 payment schedule]. Organize it with clear headings: Project Objective, Scope of Deliverables, Client Responsibilities (e.g., room setup, participant roster), Timeline, and Investment & Terms. Keep the legal tone clean, plain-English, and professional."
  },
  {
    "id": "p11",
    "title": "Prompt 11: The Beta Cohort Pattern Decoder",
    "tag": "Phase 5",
    "body": "Analyze these raw post-workshop survey responses from my pilot cohort: [Paste feedback]. Give me: 1. The top 3 highest-leverage moments (what created the biggest \u2018aha\u2019 shifts). 2. The exact friction points where pacing dragged or instructions felt unclear. 3. Three concrete edits I should make to my slides or exercises before running this for a full-fee corporate client."
  },
  {
    "id": "p11b",
    "title": "Prompt 11B: The Testimonial Extractor (New)",
    "tag": "Phase 5",
    "body": "From these raw client quotes and survey responses: [Paste text], extract the 3 strongest testimonials I can use publicly. For each, rewrite it into a tight 2-sentence version that leads with the outcome, not the praise. Preserve their exact words for the outcome metric. Suggest where to use each: website, one-sheet, or LinkedIn."
  }
];

const NAV_ITEMS = [
  { id: "top", label: "Overview", num: "00" },
  { id: "part1", label: "Part I · Roadmap", num: "I" },
  { id: "part2", label: "Part II · Mindset", num: "II" },
  { id: "part3", label: "Part III · Business", num: "III" },
  { id: "part4", label: "Part IV · Prompt Library", num: "IV" },
  { id: "sprint", label: "30-Day Sprint", num: "30" }
];

const PHASE_TITLES = {
  "Phase 1": "Phase 1: Niche & Market Intelligence",
  "Phase 2": "Phase 2: Signature Curriculum Design",
  "Phase 3": "Phase 3: Energy-Aligned Marketing & Outreach",
  "Phase 4": "Phase 4: High-Trust Sales & Packaging",
  "Phase 5": "Phase 5: Lean Operations & Iteration"
};

let currentFilter = "All";
let currentSearch = "";

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function copyPromptText(id, btnEl) {
  const item = PROMPTS.find(p => p.id === id);
  if (!item) return;
  const text = `${item.title}\n\n${item.body}`;

  const onSuccess = () => {
    if (!btnEl) return;
    const origHtml = btnEl.innerHTML;
    btnEl.className = "shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-black bg-emerald-600 text-white transition";
    btnEl.innerHTML = `<span>✓</span><span>Copied!</span>`;
    setTimeout(() => {
      btnEl.className = "shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-black bg-[var(--ink)] text-[var(--cream)] hover:opacity-90 transition cursor-pointer";
      btnEl.innerHTML = origHtml;
    }, 1800);
  };

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(onSuccess).catch(() => fallbackCopy(text, onSuccess));
  } else {
    fallbackCopy(text, onSuccess);
  }
}

function fallbackCopy(text, onSuccess) {
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.style.position = "fixed";
  ta.style.opacity = "0";
  document.body.appendChild(ta);
  ta.select();
  try {
    document.execCommand("copy");
    onSuccess();
  } catch (_) {}
  document.body.removeChild(ta);
}

function renderPrompts() {
  const container = document.getElementById("prompts-container");
  const countEl = document.getElementById("prompt-count");
  if (!container) return;

  const q = currentSearch.trim().toLowerCase();
  const filtered = PROMPTS.filter(p => {
    const matchesTag = currentFilter === "All" || p.tag === currentFilter;
    const matchesQuery = !q || p.title.toLowerCase().includes(q) || p.body.toLowerCase().includes(q) || p.tag.toLowerCase().includes(q);
    return matchesTag && matchesQuery;
  });

  if (countEl) {
    countEl.textContent = `Showing ${filtered.length} of ${PROMPTS.length} prompts · Click Copy prompt to copy any template.`;
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="rounded-[22px] bg-[var(--surface)] border border-[var(--line)] p-8 text-center">
        <p class="serif font-bold text-xl">No matching prompts found</p>
        <p class="text-sm text-[var(--muted)] mt-1">Try clearing your search or switching back to All 16 prompts.</p>
      </div>
    `;
    return;
  }

  const phases = ["Phase 1", "Phase 2", "Phase 3", "Phase 4", "Phase 5"];
  container.innerHTML = phases.map(phase => {
    const items = filtered.filter(p => p.tag === phase);
    if (!items.length) return "";
    const phaseNum = phase.split(" ")[1];
    return `
      <div class="mb-8">
        <h3 class="serif text-[clamp(1.4rem,3vw,2rem)] font-black mb-4 flex items-center gap-3">
          <span class="w-9 h-9 rounded-full bg-[var(--orange)] text-white grid place-items-center text-sm font-black shrink-0">${phaseNum}</span>
          <span>${escapeHtml(PHASE_TITLES[phase])}</span>
        </h3>
        <div class="space-y-4">
          ${items.map(p => `
            <article class="rounded-[22px] bg-[var(--surface)] border border-[var(--line)] overflow-hidden">
              <div class="flex items-start justify-between gap-3 p-5 pb-0">
                <div>
                  <span class="text-[11px] font-black tracking-[0.16em] uppercase text-[var(--teal)]">${escapeHtml(p.tag)} · Copy-ready</span>
                  <h4 class="font-black text-[17px] leading-tight mt-1 [overflow-wrap:anywhere]">${escapeHtml(p.title)}</h4>
                </div>
                <button type="button" onclick="copyPromptText('${p.id}', this)" class="shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-black bg-[var(--ink)] text-[var(--cream)] hover:opacity-90 transition cursor-pointer">
                  <span>⧉</span><span>Copy prompt</span>
                </button>
              </div>
              <p class="p-5 pt-3 text-[15px] leading-[1.8] text-[var(--charcoal)] [overflow-wrap:anywhere]">${escapeHtml(p.body)}</p>
              <div class="px-5 pb-4 flex flex-wrap gap-2">
                <span class="text-[11px] bg-[var(--cream-2)] px-2.5 py-1 rounded-full font-bold">Paste your real context in [brackets]</span>
                <span class="text-[11px] bg-[var(--amber-soft)] px-2.5 py-1 rounded-full font-bold">Edit with taste before sending</span>
              </div>
            </article>
          `).join("")}
        </div>
      </div>
    `;
  }).join("");
}

function setFilter(tag) {
  currentFilter = tag;
  document.querySelectorAll("[data-filter-btn]").forEach(btn => {
    const active = btn.getAttribute("data-filter-btn") === tag;
    btn.className = active
      ? "px-4 py-2 rounded-full text-sm font-bold border bg-[var(--ink)] text-[var(--cream)] border-[var(--ink)] cursor-pointer"
      : "px-4 py-2 rounded-full text-sm font-bold border bg-[var(--surface)] border-[var(--line)] hover:bg-[var(--cream-2)] cursor-pointer";
  });
  renderPrompts();
}

function updateActiveNav() {
  let currentId = "top";
  for (let i = NAV_ITEMS.length - 1; i >= 0; i--) {
    const el = document.getElementById(NAV_ITEMS[i].id);
    if (el && el.getBoundingClientRect().top < 220) {
      currentId = NAV_ITEMS[i].id;
      break;
    }
  }
  document.querySelectorAll("[data-nav-desktop]").forEach(a => {
    const match = a.getAttribute("data-nav-desktop") === currentId;
    a.className = match
      ? "px-3 py-2 rounded-full bg-[var(--ink)] text-[var(--cream)]"
      : "px-3 py-2 rounded-full hover:bg-[var(--cream-3)]";
  });
  document.querySelectorAll("[data-nav-sidebar]").forEach(a => {
    const match = a.getAttribute("data-nav-sidebar") === currentId;
    a.className = match
      ? "flex gap-3 items-start px-3 py-3 rounded-2xl border bg-[var(--ink)] text-[var(--cream)] border-[var(--ink)]"
      : "flex gap-3 items-start px-3 py-3 rounded-2xl border border-transparent hover:bg-[var(--cream-2)]";
  });
  document.querySelectorAll("[data-nav-mobile]").forEach(a => {
    const match = a.getAttribute("data-nav-mobile") === currentId;
    a.className = match
      ? "text-xs font-bold px-3 py-1.5 rounded-full border shrink-0 bg-[var(--ink)] text-[var(--cream)] border-[var(--ink)]"
      : "text-xs font-bold px-3 py-1.5 rounded-full border shrink-0 bg-white/60 border-[var(--line)]";
  });
}

function onScroll() {
  const h = document.documentElement;
  const max = h.scrollHeight - h.clientHeight;
  const pct = max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0;
  const bar = document.getElementById("reading-progress");
  if (bar) bar.style.width = `${pct}%`;
  updateActiveNav();
}

document.addEventListener("DOMContentLoaded", () => {
  renderPrompts();

  const searchInput = document.getElementById("prompt-search");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      currentSearch = e.target.value || "";
      renderPrompts();
    });
  }

  const noteBtn = document.getElementById("toggle-closing-note");
  const noteBox = document.getElementById("closing-note-box");
  if (noteBtn && noteBox) {
    noteBtn.addEventListener("click", () => {
      const isHidden = noteBox.classList.contains("hidden");
      noteBox.classList.toggle("hidden", !isHidden);
      noteBtn.textContent = isHidden ? "Hide the closing note" : "Show the closing note";
    });
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
});
