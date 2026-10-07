<template>
  <div class="guests-wall-page">
    <section class="guests-hero">
      <div class="container text-center">
        <span class="topic-tag">{{ t.guestsPage.tag }}</span>
        <h1 class="guests-title">{{ t.guestsPage.title }}</h1>
        <p class="guests-subtitle">
          {{ t.guestsPage.subtitle }}
        </p>
      </div>
    </section>

    <div class="container main-cabinet-container">
      <div class="grid-3">
        <div v-for="ep in episodes" :key="ep.id" class="cabinet-member-card card-presidential">
          <div class="member-photo-box">
            <img :src="ep.guestPhoto" :alt="ep.guestName" class="member-img" />
            <span class="presidential-seal">EP {{ ep.episodeNumber }}</span>
          </div>

          <div class="member-info">
            <span class="topic-tag">{{ ep.topic }} {{ t.guestCarousel.presidentTag }}</span>
            <h3 class="member-name">{{ t.guestCarousel.presidentTag }} {{ ep.guestName }}</h3>
            <p class="member-role">{{ ep.guestRole }}</p>

            <blockquote class="member-quote">
              "{{ ep.quote }}"
            </blockquote>

            <div class="member-meta-bottom">
              <span class="air-badge">{{ ep.airDate }}</span>
              <NuxtLink :to="`/episodes/${ep.slug}`" class="btn btn-outline-gold btn-sm">
                <span>{{ t.guestsPage.viewFullAddress }}</span>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useHead } from '#app'
import { useLanguage } from '~/composables/useLanguage'
import { useEpisodes } from '~/composables/useEpisodes'

const { t } = useLanguage()
const { episodes } = useEpisodes()

useHead({
  title: 'Cabinet of Presidents (Alumni Wall)'
})
</script>

<style scoped>
.guests-wall-page {
  padding-top: 7rem;
  padding-bottom: 5rem;
}

.guests-hero {
  margin-bottom: 3.5rem;
}

.guests-title {
  font-size: 2.75rem;
  color: var(--color-cream-50);
  margin-top: 0.5rem;
  margin-bottom: 1rem;
}

.guests-subtitle {
  color: var(--color-navy-200);
  font-size: 1.05rem;
  max-width: 620px;
  margin: 0 auto;
  line-height: 1.6;
}

.cabinet-member-card {
  padding: 2rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.member-photo-box {
  position: relative;
  margin-bottom: 1.5rem;
}

.member-img {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--color-gold-400);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
}

.presidential-seal {
  position: absolute;
  bottom: -6px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--color-navy-950);
  border: 1px solid var(--border-gold-subtle);
  color: var(--color-gold-300);
  padding: 0.2rem 0.6rem;
  border-radius: var(--radius-full);
  font-size: 0.7rem;
  font-weight: 700;
  white-space: nowrap;
}

.member-info {
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.member-name {
  font-size: 1.25rem;
  color: var(--color-cream-50);
  margin-top: 0.5rem;
  margin-bottom: 0.25rem;
}

.member-role {
  color: var(--color-navy-300);
  font-size: 0.85rem;
  margin-bottom: 1rem;
}

.member-quote {
  color: var(--color-navy-100);
  font-size: 0.88rem;
  font-style: italic;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  flex-grow: 1;
}

.member-meta-bottom {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}

.air-badge {
  font-size: 0.75rem;
  color: var(--color-navy-400);
}
</style>
