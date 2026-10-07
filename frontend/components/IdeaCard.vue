<template>
  <div class="idea-card card-presidential">
    <div class="idea-header">
      <div class="author-meta">
        <div class="author-avatar">{{ (currentLang === 'bn' && idea.authorNameBn ? idea.authorNameBn : idea.authorName).charAt(0) }}</div>
        <div>
          <h4 class="author-name">{{ currentLang === 'bn' && idea.authorNameBn ? idea.authorNameBn : idea.authorName }}</h4>
          <p class="author-sub">{{ currentLang === 'bn' && idea.authorRoleBn ? idea.authorRoleBn : idea.authorRole }} • {{ currentLang === 'bn' && idea.locationBn ? idea.locationBn : idea.location }}</p>
        </div>
      </div>

      <span class="topic-tag">{{ currentLang === 'bn' ? (topicTranslations[idea.topic] || idea.topic) : idea.topic }}</span>
    </div>

    <h3 class="idea-title">{{ currentLang === 'bn' && idea.titleBn ? idea.titleBn : idea.title }}</h3>
    <p class="idea-content">{{ currentLang === 'bn' && idea.contentBn ? idea.contentBn : idea.content }}</p>

    <div class="idea-footer">
      <button 
        @click="$emit('upvote', idea.id)" 
        :class="['upvote-btn', { active: idea.hasUpvoted }]"
        :title="idea.hasUpvoted ? (currentLang === 'bn' ? 'সমর্থন প্রত্যাহার' : 'Remove upvote') : (currentLang === 'bn' ? 'এই সংস্কার ভাবনায় সমর্থন দিন' : 'Endorse this policy idea')"
      >
        <span class="upvote-arrow">▲</span>
        <span class="upvote-count">{{ idea.upvotes }}</span>
        <span class="upvote-label">{{ idea.hasUpvoted ? (currentLang === 'bn' ? 'সমর্থিত' : 'Endorsed') : (currentLang === 'bn' ? 'সমর্থন দিন' : 'Endorse') }}</span>
      </button>

      <span class="submitted-time">{{ currentLang === 'bn' && idea.submittedAtBn ? idea.submittedAtBn : idea.submittedAt }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useLanguage } from '~/composables/useLanguage'
import { topicTranslations } from '~/composables/useEpisodes'
import type { ManifestoIdea } from '~/composables/useIdeas'

const { currentLang } = useLanguage()

defineProps<{
  idea: ManifestoIdea
}>()

defineEmits<{
  (e: 'upvote', id: string): void
}>()
</script>

<style scoped>
.idea-card {
  display: flex;
  flex-direction: column;
  padding: 1.75rem;
}

.idea-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.25rem;
  gap: 1rem;
}

.author-meta {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.author-avatar {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: rgba(212, 160, 45, 0.15);
  border: 1px solid var(--color-gold-400);
  color: var(--color-gold-300);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.9rem;
}

.author-name {
  font-size: 0.95rem;
  color: var(--color-cream-50);
  margin-bottom: 0.1rem;
}

.author-sub {
  font-size: 0.75rem;
  color: var(--color-navy-300);
}

.idea-title {
  font-size: 1.15rem;
  color: var(--color-gold-300);
  margin-bottom: 0.75rem;
  line-height: 1.4;
}

.idea-content {
  color: var(--color-navy-100);
  font-size: 0.9rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  flex-grow: 1;
}

.idea-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}

.upvote-btn {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: var(--color-cream-100);
  padding: 0.4rem 0.85rem;
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: 600;
  transition: all var(--transition-fast);
}

.upvote-btn:hover {
  background: rgba(212, 160, 45, 0.15);
  border-color: var(--color-gold-400);
  color: var(--color-gold-300);
}

.upvote-btn.active {
  background: var(--color-gold-400);
  border-color: var(--color-gold-400);
  color: var(--color-navy-950);
}

.upvote-arrow {
  font-size: 0.65rem;
}

.submitted-time {
  color: var(--color-navy-400);
  font-size: 0.75rem;
}
</style>
