<template>
  <div class="episodes-archive-page">
    <!-- Header Banner -->
    <section class="archive-hero-banner">
      <div class="container text-center">
        <span class="topic-tag">{{ t.episodesPage.tag }}</span>
        <h1 class="archive-title">{{ t.episodesPage.title }}</h1>
        <p class="archive-subtitle">
          {{ t.episodesPage.subtitle }}
        </p>

        <!-- Search & Filter Controls -->
        <div class="archive-filter-bar">
          <!-- Search Input -->
          <div class="search-box">
            <span class="search-icon">🔍</span>
            <input 
              v-model="searchQuery" 
              type="text" 
              :placeholder="t.episodesPage.searchPlaceholder" 
              class="search-input"
            />
            <button v-if="searchQuery" @click="searchQuery = ''" class="clear-search-btn">✕</button>
          </div>

          <!-- Sector Pill Filters -->
          <div class="topic-pills-row">
            <button 
              v-for="topic in topics" 
              :key="topic" 
              @click="selectedTopic = topic"
              :class="['topic-pill-btn', { active: selectedTopic === topic }]"
            >
              {{ topic }}
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Episodes Grid Section -->
    <section class="section episodes-list-section">
      <div class="container">
        <!-- Results Counter -->
        <div class="results-header">
          <p class="results-count">
            Showing <strong>{{ filteredEpisodes.length }}</strong> {{ filteredEpisodes.length === 1 ? 'Episode' : 'Episodes' }}
            <span v-if="selectedTopic !== 'All'"> in <strong>{{ selectedTopic }}</strong></span>
            <span v-if="searchQuery"> matching "<strong>{{ searchQuery }}</strong>"</span>
          </p>
        </div>

        <!-- Grid of Episode Cards -->
        <div v-if="filteredEpisodes.length > 0" class="grid-3">
          <EpisodeCard 
            v-for="ep in filteredEpisodes" 
            :key="ep.id" 
            :episode="ep" 
          />
        </div>

        <!-- Empty State -->
        <div v-else class="empty-state-box card-presidential text-center">
          <div class="empty-icon-wrapper">
            <VideoOff :size="36" class="text-gold" />
          </div>
          <h3 class="empty-title">{{ t.episodesPage.noEpisodes }}</h3>
          <p class="empty-desc">
            {{ t.episodesPage.noEpisodesDesc }}
          </p>
          <button @click="resetFilters" class="btn btn-gold btn-sm">
            <span>{{ t.episodesPage.resetFilters }}</span>
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useHead } from '#app'
import { VideoOff } from 'lucide-vue-next'
import { useLanguage } from '~/composables/useLanguage'
import { useEpisodes } from '~/composables/useEpisodes'

const { t } = useLanguage()
const { topics, selectedTopic, searchQuery, filteredEpisodes } = useEpisodes()

const resetFilters = () => {
  searchQuery.value = ''
  selectedTopic.value = 'All'
}

useHead({
  title: 'Episode Archive'
})
</script>

<style scoped>
.archive-hero-banner {
  padding-top: 8rem;
  padding-bottom: 3.5rem;
  background: radial-gradient(circle at center top, rgba(12, 24, 48, 0.6) 0%, transparent 70%);
}

.archive-title {
  font-size: 2.75rem;
  color: var(--color-cream-50);
  margin-top: 0.5rem;
  margin-bottom: 1rem;
}

.archive-subtitle {
  color: var(--color-navy-200);
  font-size: 1.05rem;
  max-width: 620px;
  margin: 0 auto 2.5rem;
  line-height: 1.6;
}

.archive-filter-bar {
  max-width: 750px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.search-box {
  position: relative;
  width: 100%;
}

.search-icon {
  position: absolute;
  left: 1.25rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--color-navy-400);
  font-size: 0.9rem;
}

.search-input {
  width: 100%;
  background: rgba(12, 24, 48, 0.7);
  border: 1px solid var(--border-gold-subtle);
  border-radius: var(--radius-full);
  padding: 0.9rem 2.75rem 0.9rem 3rem;
  color: var(--color-cream-50);
  font-family: var(--font-body);
  font-size: 0.95rem;
  backdrop-filter: blur(10px);
}

.search-input:focus {
  outline: none;
  border-color: var(--color-gold-400);
}

.clear-search-btn {
  position: absolute;
  right: 1.25rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: var(--color-navy-300);
  cursor: pointer;
  font-size: 0.9rem;
}

.topic-pills-row {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.topic-pill-btn {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: var(--color-navy-200);
  padding: 0.4rem 1rem;
  border-radius: var(--radius-full);
  font-size: 0.8rem;
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.topic-pill-btn:hover {
  border-color: var(--color-gold-400);
  color: var(--color-cream-50);
}

.topic-pill-btn.active {
  background: rgba(212, 160, 45, 0.2);
  border-color: var(--color-gold-400);
  color: var(--color-gold-300);
  font-weight: 700;
}

.episodes-list-section {
  padding-top: 2rem;
}

.results-header {
  margin-bottom: 2rem;
  color: var(--color-navy-300);
  font-size: 0.9rem;
}

.results-count strong {
  color: var(--color-gold-400);
}

.empty-state-box {
  padding: 4rem 2rem;
  max-width: 500px;
  margin: 3rem auto;
}

.empty-icon-wrapper {
  margin-bottom: 1rem;
}

.empty-title {
  color: var(--color-cream-50);
  font-size: 1.35rem;
  margin-bottom: 0.5rem;
}

.empty-desc {
  color: var(--color-navy-200);
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
  line-height: 1.6;
}
</style>
