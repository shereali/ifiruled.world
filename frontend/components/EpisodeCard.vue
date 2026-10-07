<template>
  <div class="episode-card card-presidential">
    <!-- Thumbnail & Media Area -->
    <div class="card-media-wrapper">
      <img :src="episode.guestPhoto" :alt="episode.guestName" class="guest-img" />
      <div class="media-overlay-gradient"></div>
      
      <!-- Top Badges -->
      <div class="media-top-tags">
        <span class="ep-num-pill">{{ currentLang === 'bn' ? `পর্ব ${episode.episodeNumber}` : `EP ${episode.episodeNumber}` }}</span>
        <span class="topic-tag">{{ currentLang === 'bn' ? (topicTranslations[episode.topic] || episode.topic) : episode.topic }}</span>
      </div>

      <!-- Duration Pill -->
      <div class="media-duration">
        <Clock :size="11" />
        <span>{{ episode.duration }}</span>
      </div>

      <!-- Quick Play Button -->
      <NuxtLink :to="`/episodes/${episode.slug}`" class="card-play-btn" aria-label="Watch Episode">
        <Play :size="14" />
      </NuxtLink>
    </div>

    <!-- Content Details -->
    <div class="card-body">
      <div class="guest-identity">
        <h4 class="guest-name">{{ currentLang === 'bn' ? `রাষ্ট্রপতি ${episode.guestNameBn || episode.guestName}` : `President ${episode.guestName}` }}</h4>
        <span class="guest-role">{{ currentLang === 'bn' && episode.guestRoleBn ? episode.guestRoleBn : episode.guestRole }}</span>
      </div>

      <h3 class="ep-title">
        <NuxtLink :to="`/episodes/${episode.slug}`">
          {{ currentLang === 'bn' && episode.titleBn ? episode.titleBn : episode.title }}
        </NuxtLink>
      </h3>

      <!-- Quote snippet -->
      <blockquote class="ep-quote">
        "{{ currentLang === 'bn' && episode.quoteBn ? episode.quoteBn : episode.quote }}"
      </blockquote>

      <!-- Card Footer -->
      <div class="card-footer">
        <span class="air-date">{{ currentLang === 'bn' && episode.airDateBn ? episode.airDateBn : episode.airDate }}</span>
        <NuxtLink :to="`/episodes/${episode.slug}`" class="watch-link">
          <span>{{ currentLang === 'bn' ? 'পর্বটি দেখুন' : 'Watch Address' }}</span>
          <ArrowRight :size="13" />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Clock, Play, ArrowRight } from 'lucide-vue-next'
import { useLanguage } from '~/composables/useLanguage'
import { topicTranslations, type Episode } from '~/composables/useEpisodes'

const { currentLang } = useLanguage()

defineProps<{
  episode: Episode
}>()
</script>

<style scoped>
.episode-card {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 0;
  overflow: hidden;
  border-radius: var(--radius-lg);
  transition: transform var(--transition-normal), border-color var(--transition-normal), box-shadow var(--transition-normal);
}

.episode-card:hover {
  transform: translateY(-6px);
  border-color: var(--color-gold-400);
  box-shadow: 0 16px 32px rgba(0, 0, 0, 0.6), 0 0 20px rgba(212, 160, 45, 0.15);
}

.card-media-wrapper {
  position: relative;
  width: 100%;
  height: 210px;
  overflow: hidden;
  background: var(--color-navy-950);
}

.guest-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition-slow);
}

.episode-card:hover .guest-img {
  transform: scale(1.05);
}

.media-overlay-gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(5, 11, 23, 0.2) 0%, rgba(5, 11, 23, 0.85) 100%);
}

.media-top-tags {
  position: absolute;
  top: 1rem;
  left: 1rem;
  right: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 2;
}

.media-duration {
  position: absolute;
  bottom: 0.85rem;
  left: 1rem;
  background: rgba(5, 11, 23, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 0.2rem 0.55rem;
  border-radius: var(--radius-full);
  font-size: 0.72rem;
  color: var(--color-cream-100);
  display: flex;
  align-items: center;
  gap: 0.35rem;
  backdrop-filter: blur(4px);
  z-index: 2;
}

.card-play-btn {
  position: absolute;
  bottom: 0.85rem;
  right: 1rem;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--color-gold-400);
  color: var(--color-navy-950);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(212, 160, 45, 0.4);
  transition: transform var(--transition-fast), background-color var(--transition-fast);
  z-index: 2;
}

.episode-card:hover .card-play-btn {
  transform: scale(1.15);
  background: var(--color-gold-300);
}

.card-body {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.guest-identity {
  margin-bottom: 0.75rem;
}

.guest-name {
  font-size: 1.05rem;
  color: var(--color-gold-300);
  margin-bottom: 0.15rem;
}

.guest-role {
  font-size: 0.78rem;
  color: var(--color-navy-300);
  display: block;
}

.ep-title {
  font-size: 1.15rem;
  line-height: 1.4;
  margin-bottom: 1rem;
}

.ep-title a {
  color: var(--color-cream-50);
  text-decoration: none;
  transition: color var(--transition-fast);
}

.ep-title a:hover {
  color: var(--color-gold-400);
}

.ep-quote {
  font-size: 0.85rem;
  color: var(--color-navy-100);
  font-style: italic;
  line-height: 1.5;
  margin-bottom: 1.5rem;
  flex-grow: 1;
  border-left: 2px solid var(--border-gold-subtle);
  padding-left: 0.75rem;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  font-size: 0.8rem;
}

.air-date {
  color: var(--color-navy-400);
}

.watch-link {
  color: var(--color-gold-400);
  font-weight: 600;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  transition: gap var(--transition-fast);
}

.watch-link:hover {
  gap: 0.6rem;
}
</style>
