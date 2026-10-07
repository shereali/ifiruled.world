<template>
  <section class="section guest-spotlight-section">
    <div class="container">
      <div class="section-header">
        <span class="topic-tag">{{ t.guestCarousel.tag }}</span>
        <h2 class="section-title">{{ t.guestCarousel.title }}</h2>
        <p class="section-subtitle">
          {{ t.guestCarousel.subtitle }}
        </p>
      </div>

      <div class="guests-grid">
        <div v-for="ep in episodes.slice(0, 4)" :key="ep.id" class="guest-card card-presidential">
          <div class="guest-avatar-box">
            <img :src="ep.guestPhoto" :alt="ep.guestName" class="guest-photo" />
            <span class="guest-badge-pill">{{ ep.topic }} {{ t.guestCarousel.presidentTag }}</span>
          </div>

          <div class="guest-meta">
            <h3 class="guest-title">{{ ep.guestName }}</h3>
            <p class="guest-subtitle">{{ ep.guestRole }}</p>

            <p class="guest-policy-quote">
              "{{ ep.quote }}"
            </p>

            <div class="guest-action">
              <NuxtLink :to="`/episodes/${ep.slug}`" class="btn btn-outline-gold btn-sm w-full">
                <span>{{ t.guestCarousel.viewDecrees }}</span>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useLanguage } from '~/composables/useLanguage'
import { useEpisodes } from '~/composables/useEpisodes'

const { t } = useLanguage()
const { episodes } = useEpisodes()
</script>

<style scoped>
.guests-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}

.guest-card {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.guest-avatar-box {
  position: relative;
  margin-bottom: 1.25rem;
}

.guest-photo {
  width: 96px;
  height: 96px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--color-gold-400);
}

.guest-badge-pill {
  position: absolute;
  bottom: -6px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--color-navy-950);
  border: 1px solid var(--border-gold-subtle);
  color: var(--color-gold-300);
  padding: 0.15rem 0.5rem;
  border-radius: var(--radius-full);
  font-size: 0.65rem;
  font-weight: 700;
  white-space: nowrap;
}

.guest-title {
  font-size: 1.15rem;
  color: var(--color-cream-50);
  margin-bottom: 0.25rem;
}

.guest-subtitle {
  color: var(--color-navy-300);
  font-size: 0.8rem;
  margin-bottom: 1rem;
}

.guest-policy-quote {
  color: var(--color-navy-100);
  font-size: 0.85rem;
  font-style: italic;
  line-height: 1.5;
  margin-bottom: 1.5rem;
  flex-grow: 1;
}

.guest-meta {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
}

@media (max-width: 960px) {
  .guests-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 580px) {
  .guests-grid {
    grid-template-columns: 1fr;
  }
}
</style>
