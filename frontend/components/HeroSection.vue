<template>
  <section class="hero-section">
    <!-- Ambient Backdrop Effects -->
    <div class="hero-ambient-glow"></div>
    <div class="hero-grid-pattern"></div>

    <div class="container hero-container">
      <div class="hero-content">
        <!-- Live Tag Badge -->
        <div class="hero-badge animate-fade-in-up">
          <span class="badge-dot"></span>
          <span>{{ t.hero.badge }}</span>
        </div>

        <!-- Main Presidential Headline -->
        <h1 class="hero-title animate-fade-in-up">
          <span class="title-block">{{ t.hero.titleLine1 }}</span>
          <span class="title-block gold-gradient-text">{{ t.hero.titleLine2 }}</span>
        </h1>

        <!-- Subtitle -->
        <p class="hero-subtitle animate-fade-in-up">
          {{ t.hero.subtitle }}
        </p>

        <!-- CTA Buttons -->
        <div class="hero-actions animate-fade-in-up">
          <NuxtLink to="/apply" class="btn btn-gold btn-lg apply-cta-btn">
            <Mic :size="16" />
            <span>{{ t.hero.ctaApply }}</span>
          </NuxtLink>

          <NuxtLink to="/episodes" class="btn btn-outline-gold btn-lg watch-cta-btn">
            <Play :size="15" />
            <span>{{ t.hero.ctaWatch }}</span>
          </NuxtLink>
        </div>

        <!-- Hero Social Proof / Quick Badges -->
        <div class="hero-trust-bar">
          <div class="trust-item">
            <Radio :size="14" class="trust-svg" />
            <span>30 Mins Uncut Broadcast</span>
          </div>
          <div class="trust-divider"></div>
          <div class="trust-item">
            <ScrollText :size="14" class="trust-svg" />
            <span>Executive Decrees Documented</span>
          </div>
          <div class="trust-divider"></div>
          <div class="trust-item">
            <Globe :size="14" class="trust-svg" />
            <span>Airing on ifiruled.world</span>
          </div>
        </div>
      </div>

      <!-- Hero Visual / Cinematic Studio Preview -->
      <div class="hero-visual">
        <div class="presidential-frame">
          <div class="frame-crown-top animate-crown">
            <img src="/logo-mark.png" alt="Rising Crown Globe" class="crown-mark-img" />
          </div>

          <div class="video-preview-card card-presidential">
            <div class="preview-media">
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80" 
                alt="President Samiul in the hot seat" 
                class="preview-img"
              />
              <div class="media-overlay">
                <NuxtLink to="/episodes/ep-12-samiul-alam-economy" class="play-trigger-btn" aria-label="Play Episode 12">
                  <span class="play-triangle">▶</span>
                </NuxtLink>
                <div class="media-badge">
                  <span class="badge-live-pulse"></span>
                  <span>EPISODE 12 FEATURED</span>
                </div>
              </div>
            </div>

            <div class="preview-details">
              <span class="topic-tag">Economy</span>
              <h3 class="preview-title">Abolishing Export Bureaucracy for Under-25 Founders</h3>
              <p class="preview-guest">President Samiul Alam • FinTech Builder</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Mic, Play, Radio, ScrollText, Globe } from 'lucide-vue-next'
import { useLanguage } from '~/composables/useLanguage'

const { t } = useLanguage()
</script>

<style scoped>
.hero-section {
  position: relative;
  min-height: calc(100vh - 80px);
  display: flex;
  align-items: center;
  padding-top: 8rem;
  padding-bottom: 5rem;
  overflow: hidden;
}

.hero-ambient-glow {
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translateX(-50%);
  width: 700px;
  height: 500px;
  background: radial-gradient(circle, rgba(212, 160, 45, 0.18) 0%, rgba(12, 24, 48, 0.4) 60%, transparent 80%);
  filter: blur(80px);
  pointer-events: none;
  z-index: 0;
}

.hero-grid-pattern {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    linear-gradient(rgba(212, 160, 45, 0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(212, 160, 45, 0.04) 1px, transparent 1px);
  background-size: 48px 48px;
  mask-image: radial-gradient(ellipse at center, black 40%, transparent 80%);
  -webkit-mask-image: radial-gradient(ellipse at center, black 40%, transparent 80%);
  pointer-events: none;
  z-index: 0;
}

.hero-container {
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: 4rem;
  align-items: center;
  position: relative;
  z-index: 1;
}

.hero-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.45rem 1.15rem;
  background: rgba(212, 160, 45, 0.12);
  border: 1px solid var(--border-gold-medium);
  border-radius: var(--radius-full);
  color: var(--color-gold-300);
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  margin-bottom: 1.75rem;
  box-shadow: 0 0 20px rgba(212, 160, 45, 0.15);
}

.badge-dot {
  width: 8px;
  height: 8px;
  background: var(--color-gold-400);
  border-radius: 50%;
  box-shadow: 0 0 10px var(--color-gold-400);
}

.hero-title {
  font-size: clamp(2.5rem, 5.5vw, 4.25rem);
  font-weight: 900;
  line-height: 1.1;
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.title-block {
  display: block;
}

.hero-subtitle {
  font-size: 1.2rem;
  color: #C6D2E2;
  line-height: 1.7;
  max-width: 580px;
  margin-bottom: 2.25rem;
}

.hero-actions {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  flex-wrap: wrap;
  margin-bottom: 3rem;
}

.hero-trust-bar {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  padding: 0.85rem 1.25rem;
  background: rgba(12, 24, 48, 0.6);
  border: 1px solid rgba(212, 160, 45, 0.15);
  border-radius: var(--radius-md);
  flex-wrap: wrap;
}

.trust-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  color: #CBD5E1;
  font-weight: 500;
}

.trust-divider {
  width: 1px;
  height: 16px;
  background: rgba(212, 160, 45, 0.25);
}

/* Presidential Visual Frame */
.hero-visual {
  position: relative;
}

.presidential-frame {
  position: relative;
}

.frame-crown-top {
  position: absolute;
  top: -35px;
  right: -20px;
  z-index: 5;
  width: 80px;
  height: 80px;
  filter: drop-shadow(0 0 15px rgba(212, 160, 45, 0.6));
}

.crown-mark-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.video-preview-card {
  padding: 1rem;
}

.preview-media {
  position: relative;
  border-radius: var(--radius-md);
  overflow: hidden;
  aspect-ratio: 16 / 10;
}

.preview-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition-slow);
}

.video-preview-card:hover .preview-img {
  transform: scale(1.05);
}

.media-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 40%, rgba(5, 11, 23, 0.9) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.play-trigger-btn {
  width: 68px;
  height: 68px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--color-gold-400), var(--color-gold-600));
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-navy-950);
  box-shadow: 0 0 30px rgba(212, 160, 45, 0.6);
  transition: all var(--transition-base);
}

.play-trigger-btn:hover {
  transform: scale(1.12);
  box-shadow: 0 0 45px rgba(212, 160, 45, 0.9);
}

.play-triangle {
  font-size: 1.5rem;
  margin-left: 4px;
}

.media-badge {
  position: absolute;
  top: 1rem;
  left: 1rem;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  background: rgba(5, 11, 23, 0.85);
  border: 1px solid var(--border-gold-subtle);
  border-radius: var(--radius-full);
  padding: 0.3rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--color-gold-300);
}

.badge-live-pulse {
  width: 6px;
  height: 6px;
  background: var(--color-gold-400);
  border-radius: 50%;
}

.preview-details {
  padding: 1.25rem 0.5rem 0.5rem 0.5rem;
}

.preview-title {
  font-size: 1.15rem;
  margin-top: 0.5rem;
  margin-bottom: 0.35rem;
  color: var(--color-cream-50);
}

.preview-guest {
  font-size: 0.85rem;
  color: var(--color-text-muted);
}

@media (max-width: 1024px) {
  .hero-container {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
  .hero-visual {
    max-width: 580px;
    margin: 0 auto;
    width: 100%;
  }
}
</style>
