<template>
  <div v-if="episode" class="single-episode-page">
    <div class="container page-content">
      <!-- Breadcrumb -->
      <nav class="breadcrumb-nav">
        <NuxtLink to="/">{{ currentLang === 'bn' ? 'মূলপাতা' : 'Home' }}</NuxtLink>
        <span>/</span>
        <NuxtLink to="/episodes">{{ currentLang === 'bn' ? 'পর্বসমূহ' : 'Episodes' }}</NuxtLink>
        <span>/</span>
        <span class="active-crumb">{{ currentLang === 'bn' ? `পর্ব ${episode.episodeNumber}` : `EP ${episode.episodeNumber}` }}</span>
      </nav>

      <!-- Main Video Container -->
      <div class="video-hero-wrapper card-presidential">
        <div class="video-embed-frame">
          <iframe 
            :src="`https://www.youtube-nocookie.com/embed/${episode.youtubeId}?rel=0&autoplay=1`" 
            :title="currentLang === 'bn' && episode.titleBn ? episode.titleBn : episode.title"
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen
            class="iframe-video"
          ></iframe>
        </div>
      </div>

      <!-- Episode Header & Details -->
      <div class="episode-main-layout">
        <!-- Left Col: Content & Transcript Highlights -->
        <div class="episode-content-col">
          <div class="meta-row">
            <span class="ep-num-pill">{{ currentLang === 'bn' ? `পর্ব ${episode.episodeNumber}` : `Episode ${episode.episodeNumber}` }}</span>
            <span class="topic-tag">{{ currentLang === 'bn' ? (topicTranslations[episode.topic] || episode.topic) : episode.topic }}</span>
            <span class="air-date-badge">
              <Calendar :size="12" />
              <span>{{ currentLang === 'bn' && episode.airDateBn ? episode.airDateBn : episode.airDate }}</span>
            </span>
            <span class="duration-badge">
              <Clock :size="12" />
              <span>{{ episode.duration }}</span>
            </span>
          </div>

          <h1 class="episode-page-title">{{ currentLang === 'bn' && episode.titleBn ? episode.titleBn : episode.title }}</h1>

          <!-- Guest Callout Box -->
          <div class="guest-callout-card">
            <img :src="episode.guestPhoto" :alt="episode.guestName" class="callout-avatar" />
            <div class="callout-info">
              <h3 class="callout-name">{{ currentLang === 'bn' ? `রাষ্ট্রপতি ${episode.guestNameBn || episode.guestName}` : `President ${episode.guestName}` }}</h3>
              <p class="callout-role">{{ currentLang === 'bn' && episode.guestRoleBn ? episode.guestRoleBn : episode.guestRole }}</p>
              <p class="callout-quote">"{{ currentLang === 'bn' && episode.quoteBn ? episode.quoteBn : episode.quote }}"</p>
            </div>
          </div>

          <!-- Executive Summary -->
          <div class="article-section">
            <h2 class="section-heading">{{ currentLang === 'bn' ? 'জাতির উদ্দেশে ভাষণ: নির্বাহী সারসংক্ষেপ' : 'State of the Nation Address: Executive Summary' }}</h2>
            <p class="summary-text">{{ currentLang === 'bn' && episode.executiveSummaryBn ? episode.executiveSummaryBn : episode.executiveSummary }}</p>
          </div>

          <!-- Decrees Passed -->
          <div class="article-section decrees-box">
            <h2 class="section-heading gold-heading">{{ currentLang === 'bn' ? 'ঘোষিত প্রধান নির্বাহী আদেশসমূহ' : 'Official Presidential Decrees Enacted' }}</h2>
            <div class="decrees-list">
              <div v-for="(decree, idx) in (currentLang === 'bn' && episode.keyDecreesBn ? episode.keyDecreesBn : episode.keyDecrees)" :key="idx" class="decree-item">
                <span class="decree-badge">#{{ idx + 1 }}</span>
                <p class="decree-text">{{ decree }}</p>
              </div>
            </div>
          </div>

          <!-- Timestamped Highlights -->
          <div class="article-section">
            <h2 class="section-heading">{{ currentLang === 'bn' ? 'সম্প্রচারের প্রধান মুহূর্তসমূহ' : 'Broadcast Timestamp Highlights' }}</h2>
            <ul class="timestamp-list">
              <li class="ts-item">
                <span class="ts-time">00:00</span>
                <span class="ts-label">{{ currentLang === 'bn' ? 'তারুণ্যের রাষ্ট্রশাসন শপথ ও সূচনা' : 'Oath of Youth Governance & Introduction' }}</span>
              </li>
              <li class="ts-item">
                <span class="ts-time">03:45</span>
                <span class="ts-label">{{ currentLang === 'bn' ? 'মূল জাতীয় সংকটের বিশ্লেষণ' : 'Core Executive Diagnosis' }}</span>
              </li>
              <li class="ts-item">
                <span class="ts-time">12:20</span>
                <span class="ts-label">{{ currentLang === 'bn' ? 'সংস্কার ও নির্বাহী আদেশসমূহ উপস্থাপন' : 'Presentation of Policy Decrees' }}</span>
              </li>
              <li class="ts-item">
                <span class="ts-time">22:10</span>
                <span class="ts-label">{{ currentLang === 'bn' ? 'উন্মুক্ত প্রশ্নোত্তর ও নীতি প্রতিরক্ষা' : 'Unscripted Defense & Cross-Examination' }}</span>
              </li>
              <li class="ts-item">
                <span class="ts-time">28:30</span>
                <span class="ts-label">{{ currentLang === 'bn' ? 'উপসংহার ও আগামীর রূপরেখা' : 'Concluding Presidential Vision' }}</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- Right Col: Sidebar with Decrees, Share & Next President CTA -->
        <aside class="episode-sidebar-col">
          <!-- Share Card -->
          <div class="sidebar-card card-presidential">
            <h3 class="sidebar-title">{{ currentLang === 'bn' ? 'ভাষণটি শেয়ার করুন' : 'Disseminate Address' }}</h3>
            <div class="share-buttons-grid">
              <button @click="shareOnTwitter" class="share-btn twitter">
                <span>X / Twitter</span>
              </button>
              <button @click="shareOnFacebook" class="share-btn facebook">
                <span>Facebook</span>
              </button>
              <button @click="copyEpisodeLink" class="share-btn copy">
                <Share2 :size="13" />
                <span>{{ copied ? (currentLang === 'bn' ? 'লিংক কপি হয়েছে!' : 'Link Copied!') : (currentLang === 'bn' ? 'শেয়ার লিংক কপি করুন' : 'Copy Shareable Link') }}</span>
              </button>
            </div>
          </div>

          <!-- Apply CTA Card -->
          <div class="sidebar-card card-presidential apply-cta-card">
            <div class="cta-sidebar-icon">
              <Mic :size="20" class="text-gold" />
            </div>
            <h3 class="sidebar-title">{{ currentLang === 'bn' ? 'আপনার কাছে কি আরো ভালো পরিকল্পনা আছে?' : 'Think You Have Better Ideas?' }}</h3>
            <p class="sidebar-desc">{{ currentLang === 'bn' ? '৩০ মিনিটের জন্য আপনিও বসতে পারেন রাষ্ট্রপতির আসনে।' : 'Step into the presidential seat for your own 30 minutes in power.' }}</p>
            <NuxtLink to="/apply" class="btn btn-gold btn-sm w-full">
              <span>{{ currentLang === 'bn' ? 'প্রার্থিতার আবেদন করুন' : 'Submit Your Application' }}</span>
            </NuxtLink>
          </div>
        </aside>
      </div>

      <!-- Related Episodes Row -->
      <section class="related-episodes-section">
        <h2 class="section-title text-center">{{ currentLang === 'bn' ? 'আরও অন্যান্য রাষ্ট্রপতির ভাষণ' : 'More Presidential Addresses' }}</h2>
        <div class="grid-3 mt-6">
          <EpisodeCard 
            v-for="rel in relatedEpisodes" 
            :key="rel.id" 
            :episode="rel" 
          />
        </div>
      </section>
    </div>
  </div>

  <div v-else class="container not-found-wrapper text-center">
    <h2>{{ currentLang === 'bn' ? 'পর্বটি পাওয়া যায়নি' : 'Episode Not Found' }}</h2>
    <p>{{ currentLang === 'bn' ? 'আপনার অনুরোধকৃত রাষ্ট্রপতির ভাষণটি খুঁজে পাওয়া যায়নি।' : 'The presidential address you are looking for does not exist.' }}</p>
    <NuxtLink to="/episodes" class="btn btn-gold mt-4">
      <span>{{ currentLang === 'bn' ? 'আর্কাইভে ফিরে যান' : 'Return to Archive' }}</span>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useHead } from '#app'
import { Calendar, Clock, Share2, Mic } from 'lucide-vue-next'
import { useLanguage } from '~/composables/useLanguage'
import { useEpisodes, topicTranslations } from '~/composables/useEpisodes'

const { currentLang } = useLanguage()
const route = useRoute()
const slug = route.params.slug as string

const { episodes, getEpisodeBySlug } = useEpisodes()
const episode = getEpisodeBySlug(slug)

const copied = ref(false)

const relatedEpisodes = computed(() => {
  if (!episode) return []
  return episodes.value
    .filter(ep => ep.id !== episode.id)
    .slice(0, 3)
})

const copyEpisodeLink = () => {
  if (typeof window !== 'undefined') {
    navigator.clipboard.writeText(window.location.href)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2500)
  }
}

const shareOnTwitter = () => {
  if (typeof window !== 'undefined') {
    const text = encodeURIComponent(`Watch President ${episode?.guestName}'s 30-minute address on If I Ruled: "${episode?.title}"`)
    const url = encodeURIComponent(window.location.href)
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank')
  }
}

const shareOnFacebook = () => {
  if (typeof window !== 'undefined') {
    const url = encodeURIComponent(window.location.href)
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank')
  }
}

useHead({
  title: episode ? (currentLang.value === 'bn' && episode.titleBn ? `${episode.titleBn} | If I Ruled` : `${episode.title} | If I Ruled`) : 'Episode'
})
</script>

<style scoped>
.single-episode-page {
  padding-top: 6rem;
  padding-bottom: 6rem;
}

.breadcrumb-nav {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.82rem;
  color: var(--color-navy-300);
  margin-bottom: 1.5rem;
}

.breadcrumb-nav a {
  color: var(--color-navy-300);
  text-decoration: none;
  transition: color var(--transition-fast);
}

.breadcrumb-nav a:hover {
  color: var(--color-gold-400);
}

.active-crumb {
  color: var(--color-gold-400);
  font-weight: 600;
}

.video-hero-wrapper {
  padding: 1rem;
  margin-bottom: 3rem;
  background: #000;
}

.video-embed-frame {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: var(--radius-md);
  overflow: hidden;
}

.iframe-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.episode-main-layout {
  display: grid;
  grid-template-columns: 1.35fr 0.65fr;
  gap: 3.5rem;
}

.meta-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
  margin-bottom: 1.25rem;
}

.air-date-badge, .duration-badge {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  color: var(--color-navy-300);
  font-size: 0.8rem;
  background: rgba(255, 255, 255, 0.04);
  padding: 0.2rem 0.6rem;
  border-radius: var(--radius-full);
}

.episode-page-title {
  font-size: 2.25rem;
  color: var(--color-cream-50);
  line-height: 1.3;
  margin-bottom: 2rem;
}

.guest-callout-card {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  background: linear-gradient(135deg, rgba(17, 34, 68, 0.7) 0%, rgba(9, 18, 36, 0.9) 100%);
  border: 1px solid var(--border-gold-medium);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  margin-bottom: 2.5rem;
}

.callout-avatar {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--color-gold-400);
  flex-shrink: 0;
}

.callout-name {
  font-size: 1.2rem;
  color: var(--color-gold-300);
  margin-bottom: 0.2rem;
}

.callout-role {
  font-size: 0.82rem;
  color: var(--color-navy-300);
  margin-bottom: 0.5rem;
}

.callout-quote {
  font-size: 0.9rem;
  color: var(--color-cream-100);
  font-style: italic;
  line-height: 1.5;
}

.article-section {
  margin-bottom: 2.5rem;
}

.section-heading {
  font-size: 1.25rem;
  color: var(--color-cream-50);
  margin-bottom: 1rem;
}

.gold-heading {
  color: var(--color-gold-300);
}

.summary-text {
  color: var(--color-navy-100);
  font-size: 0.95rem;
  line-height: 1.7;
}

.decrees-box {
  background: rgba(5, 11, 23, 0.6);
  border: 1px solid var(--border-gold-subtle);
  border-radius: var(--radius-md);
  padding: 1.5rem;
}

.decrees-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.decree-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.decree-badge {
  background: rgba(212, 160, 45, 0.2);
  border: 1px solid var(--color-gold-400);
  color: var(--color-gold-300);
  font-weight: 700;
  font-size: 0.75rem;
  padding: 0.2rem 0.5rem;
  border-radius: var(--radius-sm);
  flex-shrink: 0;
}

.decree-text {
  color: var(--color-cream-100);
  font-size: 0.92rem;
  line-height: 1.5;
}

.timestamp-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.ts-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.6rem 0.8rem;
  background: rgba(255, 255, 255, 0.03);
  border-radius: var(--radius-sm);
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.ts-time {
  font-family: monospace;
  font-weight: 700;
  color: var(--color-gold-400);
  font-size: 0.85rem;
}

.ts-label {
  color: var(--color-cream-100);
  font-size: 0.88rem;
}

.episode-sidebar-col {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.sidebar-card {
  padding: 2rem;
}

.sidebar-title {
  font-size: 1.15rem;
  color: var(--color-cream-50);
  margin-bottom: 1.25rem;
}

.share-buttons-grid {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.share-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.65rem 1rem;
  border-radius: var(--radius-sm);
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.04);
  color: var(--color-cream-50);
  font-size: 0.82rem;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.share-btn:hover {
  background: rgba(212, 160, 45, 0.15);
  border-color: var(--color-gold-400);
  color: var(--color-gold-300);
}

.apply-cta-card {
  text-align: center;
  background: linear-gradient(135deg, rgba(17, 34, 68, 0.7) 0%, rgba(9, 18, 36, 0.9) 100%);
}

.cta-sidebar-icon {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: rgba(212, 160, 45, 0.15);
  border: 1px solid var(--color-gold-400);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
}

.sidebar-desc {
  color: var(--color-navy-200);
  font-size: 0.88rem;
  margin-bottom: 1.5rem;
  line-height: 1.5;
}

.related-episodes-section {
  margin-top: 6rem;
  padding-top: 4rem;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

@media (max-width: 960px) {
  .episode-main-layout {
    grid-template-columns: 1fr;
  }
}
</style>
