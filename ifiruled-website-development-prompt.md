# Website Development Prompt — ifiruled.world

Use this as a full brief/prompt for a developer, design agency, or AI website builder.

---

## PROMPT (copy everything below this line)

Build a premium, fully responsive website for **"If I Ruled"** (domain: **ifiruled.world**) — a live podcast where young people are invited to role-play as President of the country for 30 minutes, sharing bold, real ideas on national development, security, unity, and progress. The show is unscripted, live, and youth-driven, with a long-term goal of becoming an international media brand.

### 1. Brand & Visual Identity
- **Name:** If I Ruled
- **Tagline:** "30 minutes in power. A lifetime of ideas."
- **Color palette:** Deep presidential navy (#0C1830) as primary, gold (#D4A02D) as accent/authority color, cream/off-white (#F5F1E8) for contrast and readability, pure white for light sections.
- **Typography:** Bold geometric sans-serif for headings (Poppins/Montserrat style — confident, modern), clean sans-serif for body text.
- **Logo:** Globe-and-rising-crown mark (already designed — provided as SVG/PNG assets) paired with an "IF I RULED" wordmark.
- **Visual tone:** Premium, authoritative yet youthful — think "state media meets Gen Z creator energy." Use subtle gold accent lines, glassmorphism or soft-shadow cards, generous whitespace, large confident typography, and cinematic photography/video of guests "in the presidential chair."
- **Motion:** Subtle scroll-reveal animations, smooth hover states, and a short animated logo intro (crown rising from globe) usable as a site loader.

### 2. Target Audience
- Ambitious young people (18–30) — students, entrepreneurs, activists, content creators — who want to be heard and see themselves as future leaders.
- Older audience segment (30–55) who want to discover fresh, credible youth voices and gauge the next generation's thinking.
- International audience (as the brand scales) interested in youth leadership, governance, and social change content.

Design and copy should feel aspirational, energetic, and serious at once — never childish, never dry/bureaucratic.

### 3. Site Structure / Pages

**Home**
- Full-screen hero video/image loop of past "president" moments with a bold headline ("What would YOU do with 30 minutes in power?") and two CTAs: "Watch Latest Episode" and "Apply to Be President."
- Live/Next episode countdown banner (auto-updating; shows next Thursday 8:00 PM airtime with a "Set Reminder" button).
- Featured/latest episode embed (YouTube/Facebook live embed).
- "How It Works" — 3–4 step visual explainer (Apply → Get Selected → 30 Minutes in Power → Ideas Go Live).
- Guest highlight carousel — photo, name, one-line "policy" quote, link to their episode.
- Impact/stats bar — total episodes, total viewers, countries reached, ideas submitted (realistic placeholder numbers, editable via CMS).
- Social proof — embedded social posts, press mentions logo strip.
- Newsletter signup ("Join the Cabinet" — weekly digest of best ideas).

**Episodes / Archive**
- Filterable/searchable grid of all episodes (filter by topic: Economy, Security, Education, Environment, Foreign Policy, Social Justice).
- Each episode card: thumbnail, guest name/bio snippet, air date, topic tags, watch button, transcript/summary link.
- Individual episode page: embedded video, full write-up of the guest's key policy ideas, timestamped highlights, comment section, share buttons, related episodes.

**Apply to Be President**
- Application form: name, age, location, one paragraph "your first act as president," short video pitch upload (optional), social media handles.
- Eligibility/criteria section, FAQ accordion (age limits, selection process, what happens on the show).
- "Selection Timeline" visual (Apply → Review → Interview → Live Episode).

**Guests / Alumni Wall**
- Grid/wall of all past "Presidents" with photos, badges (e.g., "Economy President," "Green President"), and links to their episodes and social handles — builds prestige and a sense of an ongoing "cabinet" of alumni.

**About**
- Origin story of the show, mission statement, host bio, vision for becoming an international platform, founding team/production credits.
- Press kit download (logo files, one-pager PDF, media contact).

**Ideas Hub / Manifesto Wall**
- A crowdsourced, moderated wall where viewers can submit their own "if I ruled" one-liners or policy ideas, upvote others' ideas — turns passive viewers into contributors and generates community content.

**Partners / Sponsors**
- Logo grid of sponsors/media partners, sponsorship tiers and contact CTA for brands wanting to reach youth audiences.

**Contact / Press**
- Contact form, business inquiries, press/media contact, social links, physical/mailing info if applicable.

**Legal**
- Privacy Policy, Terms of Use, Content/Community Guidelines (important since it's live, user-submitted content).

### 4. Core Features (Functional Requirements)
- **Live status system:** Site automatically shows a "LIVE NOW" banner with a direct stream embed when the show is airing (manual toggle or scheduled via CMS).
- **Countdown timer** to the next live episode, timezone-aware (auto-detect visitor's timezone).
- **CMS-driven episode archive** (so non-technical team members can add episodes, guests, thumbnails without a developer).
- **Application form** with file/video upload, stored in a manageable backend (e.g., connected to Google Sheets, Airtable, or a simple admin dashboard) with email notification on submission.
- **Newsletter integration** (Mailchimp/ConvertKit or similar) with double opt-in.
- **Social embeds & auto-pull:** Latest Facebook/YouTube/Instagram posts pulled into a "Latest Buzz" section.
- **Idea submission wall** with moderation queue (basic profanity/spam filter), upvoting, and social share per idea.
- **Search + filter** across episodes by topic, guest name, or keyword.
- **Multi-language ready:** Bangla and English toggle, with content structured for easy translation/expansion to more languages later (international scaling goal).
- **SEO foundation:** Clean semantic HTML, meta tags, Open Graph/Twitter Card images per episode, sitemap.xml, schema markup for video content (VideoObject schema) to help episodes surface in search/AI answers.
- **Analytics:** Google Analytics / Meta Pixel integration, plus basic conversion tracking on "Apply" and "Newsletter" CTAs.
- **Accessibility:** WCAG 2.1 AA — proper contrast ratios (navy/gold/cream already chosen with contrast in mind), alt text, keyboard navigation, captions/subtitles on embedded videos.
- **Performance:** Lazy-loaded images/video, optimized for Core Web Vitals, target <2.5s LCP on mobile.
- **Admin dashboard:** Simple, secure login for the founder/team to manage episodes, applications, and idea-wall moderation without touching code.

### 5. Responsive & Technical Requirements
- Fully responsive across mobile (360px+), tablet, and desktop — mobile-first, since most youth traffic will come from phones and social referral links.
- Touch-friendly navigation (sticky bottom nav or hamburger menu on mobile) with large tap targets.
- Fast-loading video thumbnails with lazy playback (no autoplay with sound).
- Cross-browser tested (Chrome, Safari, Firefox, Edge) and cross-device tested (iOS/Android).
- Suggested stack: Next.js (React) or a modern CMS like Webflow/Framer for speed of iteration, headless CMS (Sanity/Contentful) for episode and guest content, hosted on Vercel/Netlify with a CDN, form backend via a service like Formspree/Airtable API, HTTPS/SSL by default on the ifiruled.world domain.

### 6. Content Tone & Copywriting Guidelines
- Bold, second-person, empowering language ("Your first act as president would be...", "The floor is yours.").
- Avoid overtly partisan or inflammatory language anywhere in site copy — the brand is about constructive ideas, not political attacks.
- Every guest/episode write-up should read like a mini "state address" — dignified, quotable, shareable.

### 7. Deliverables Expected
- Fully responsive, production-ready website matching the above pages/features.
- CMS setup with documentation so the team can add episodes/guests independently.
- SEO and performance audit passed before launch.
- Style guide/design system handoff (colors, type scale, components) matching the existing brand kit (logo, favicon, social assets already provided).

---

*Attach the existing brand kit (logo, favicon, color codes, social templates) when sharing this prompt with a developer or AI website builder so visual identity stays consistent.*
