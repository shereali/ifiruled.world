<template>
  <div class="stats-bar-section">
    <div class="container">
      <div class="stats-card-grid">
        <div class="stat-box">
          <div class="stat-icon-wrapper">
            <Video :size="20" class="stat-svg" />
          </div>
          <span class="stat-number">12+</span>
          <span class="stat-label">{{ t.stats.episodes }}</span>
        </div>

        <div class="stat-box">
          <div class="stat-icon-wrapper">
            <Users :size="20" class="stat-svg" />
          </div>
          <span class="stat-number">250K+</span>
          <span class="stat-label">{{ t.stats.viewers }}</span>
        </div>

        <div class="stat-box">
          <div class="stat-icon-wrapper">
            <Globe :size="20" class="stat-svg" />
          </div>
          <span class="stat-number">18</span>
          <span class="stat-label">{{ t.stats.countries }}</span>
        </div>

        <div class="stat-box">
          <div class="stat-icon-wrapper">
            <BookOpen :size="20" class="stat-svg" />
          </div>
          <span class="stat-number">1,420+</span>
          <span class="stat-label">{{ t.stats.ideas }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Video, Users, Globe, BookOpen } from 'lucide-vue-next'
import { useLanguage } from '~/composables/useLanguage'

const { t } = useLanguage()
</script>

<style scoped>
.stats-bar-section {
  padding: 2.5rem 0;
  position: relative;
}

.stats-card-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  background: rgba(8, 17, 34, 0.75);
  border: 1px solid rgba(212, 160, 45, 0.2);
  border-radius: var(--radius-lg);
  padding: 2rem 2.5rem;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4);
}

.stat-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.stat-icon-wrapper {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(212, 160, 45, 0.1);
  border: 1px solid rgba(212, 160, 45, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-gold-400);
  margin-bottom: 0.75rem;
}

.stat-number {
  font-family: var(--font-heading);
  font-size: 2.25rem;
  font-weight: 800;
  color: var(--color-gold-300);
  line-height: 1;
  margin-bottom: 0.35rem;
}

.stat-label {
  font-size: 0.85rem;
  color: #94A3B8;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

@media (max-width: 768px) {
  .stats-card-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem 1rem;
    padding: 1.75rem 1rem;
  }
}
</style>
