<template>
  <section class="section how-it-works-section">
    <div class="container">
      <div class="section-header">
        <span class="section-tag">{{ t.howItWorks.tag }}</span>
        <h2 class="section-title">{{ t.howItWorks.title }}</h2>
        <p class="section-subtitle">{{ t.howItWorks.subtitle }}</p>
      </div>

      <div class="steps-grid">
        <!-- Step 1 -->
        <div class="step-card card-presidential">
          <div class="step-header">
            <span class="step-num">01</span>
            <div class="step-icon-circle">
              <FileEdit :size="18" />
            </div>
          </div>
          <h3 class="step-title">{{ t.howItWorks.step1Title }}</h3>
          <p class="step-desc">{{ t.howItWorks.step1Desc }}</p>
          <div class="step-glow-line"></div>
        </div>

        <!-- Step 2 -->
        <div class="step-card card-presidential">
          <div class="step-header">
            <span class="step-num">02</span>
            <div class="step-icon-circle">
              <Scale :size="18" />
            </div>
          </div>
          <h3 class="step-title">{{ t.howItWorks.step2Title }}</h3>
          <p class="step-desc">{{ t.howItWorks.step2Desc }}</p>
          <div class="step-glow-line"></div>
        </div>

        <!-- Step 3 -->
        <div class="step-card card-presidential active-step">
          <div class="step-header">
            <span class="step-num gold">03</span>
            <div class="step-icon-circle gold">
              <Mic :size="18" />
            </div>
          </div>
          <h3 class="step-title">{{ t.howItWorks.step3Title }}</h3>
          <p class="step-desc">{{ t.howItWorks.step3Desc }}</p>
          <div class="step-glow-line"></div>
        </div>

        <!-- Step 4 -->
        <div class="step-card card-presidential">
          <div class="step-header">
            <span class="step-num">04</span>
            <div class="step-icon-circle">
              <ScrollText :size="18" />
            </div>
          </div>
          <h3 class="step-title">{{ t.howItWorks.step4Title }}</h3>
          <p class="step-desc">{{ t.howItWorks.step4Desc }}</p>
          <div class="step-glow-line"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { FileEdit, Scale, Mic, ScrollText } from 'lucide-vue-next'
import { useLanguage } from '~/composables/useLanguage'

const { t } = useLanguage()
</script>

<style scoped>
.how-it-works-section {
  position: relative;
  background: radial-gradient(circle at center top, rgba(12, 24, 48, 0.4) 0%, transparent 70%);
}

.steps-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  margin-top: 3.5rem;
}

.step-card {
  position: relative;
  padding: 2rem 1.5rem;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.step-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
}

.step-num {
  font-family: var(--font-heading);
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--color-navy-400);
}

.step-num.gold {
  color: var(--color-gold-400);
}

.step-icon-circle {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #94A3B8;
}

.step-icon-circle.gold {
  background: rgba(212, 160, 45, 0.15);
  border-color: var(--color-gold-400);
  color: var(--color-gold-300);
}

.step-title {
  font-size: 1.15rem;
  margin-bottom: 0.75rem;
  color: var(--color-cream-50);
}

.step-desc {
  font-size: 0.88rem;
  line-height: 1.6;
  color: var(--color-navy-200);
  margin-bottom: 1rem;
  flex-grow: 1;
}

.step-glow-line {
  height: 2px;
  width: 100%;
  background: linear-gradient(90deg, transparent, var(--border-gold-subtle), transparent);
  margin-top: auto;
}

.active-step {
  border-color: var(--color-gold-400);
}

@media (max-width: 960px) {
  .steps-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 580px) {
  .steps-grid {
    grid-template-columns: 1fr;
  }
}
</style>
