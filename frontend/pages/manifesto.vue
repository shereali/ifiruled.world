<template>
  <div class="manifesto-hub-page">
    <section class="manifesto-hero">
      <div class="container text-center">
        <span class="topic-tag">{{ t.manifestoPage.tag }}</span>
        <h1 class="manifesto-title">{{ t.manifestoPage.title }}</h1>
        <p class="manifesto-subtitle">
          {{ t.manifestoPage.subtitle }}
        </p>

        <!-- Submit CTA Button -->
        <button @click="showSubmitModal = true" class="btn btn-gold btn-lg mt-4 submit-policy-btn">
          <PenTool :size="15" />
          <span>{{ t.manifestoPage.submitBtn }}</span>
        </button>
      </div>
    </section>

    <div class="container main-hub-container">
      <!-- Sector Filter Row -->
      <div class="filter-row">
        <button 
          v-for="tTopic in ['All', 'Economy', 'Education', 'Security', 'Environment', 'Foreign Policy', 'Social Justice']" 
          :key="tTopic" 
          @click="filterTopic = tTopic"
          :class="['filter-tab-btn', { active: filterTopic === tTopic }]"
        >
          {{ tTopic }}
        </button>
      </div>

      <!-- Ideas Grid -->
      <div class="grid-2 mt-6">
        <IdeaCard 
          v-for="idea in filteredIdeas" 
          :key="idea.id" 
          :idea="idea" 
          @upvote="toggleUpvote"
        />
      </div>
    </div>

    <!-- Submission Modal -->
    <div v-if="showSubmitModal" class="modal-backdrop" @click.self="showSubmitModal = false">
      <div class="modal-card card-presidential">
        <div class="modal-header">
          <h3 class="modal-title">{{ t.manifestoPage.modalTitle }}</h3>
          <button @click="showSubmitModal = false" class="modal-close-btn">✕</button>
        </div>

        <form @submit.prevent="handleCreateIdea" class="modal-form">
          <div class="grid-2 form-row">
            <div class="form-group">
              <label class="form-label">{{ t.manifestoPage.authorName }}</label>
              <input v-model="newIdea.authorName" type="text" required placeholder="e.g. Abrar Fahad" class="form-control" />
            </div>
            <div class="form-group">
              <label class="form-label">{{ t.manifestoPage.authorRole }}</label>
              <input v-model="newIdea.authorRole" type="text" required placeholder="e.g. Urban Planner" class="form-control" />
            </div>
          </div>

          <div class="grid-2 form-row">
            <div class="form-group">
              <label class="form-label">{{ t.manifestoPage.location }}</label>
              <input v-model="newIdea.location" type="text" required placeholder="e.g. Khulna" class="form-control" />
            </div>
            <div class="form-group">
              <label class="form-label">{{ t.manifestoPage.topic }}</label>
              <select v-model="newIdea.topic" required class="form-control">
                <option value="Economy">Economy</option>
                <option value="Education">Education</option>
                <option value="Security">Security</option>
                <option value="Environment">Environment</option>
                <option value="Foreign Policy">Foreign Policy</option>
                <option value="Social Justice">Social Justice</option>
              </select>
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">{{ t.manifestoPage.proposalTitle }}</label>
            <input v-model="newIdea.title" type="text" required placeholder="e.g. Mandate Rooftop Rainwater Harvesting for All Commercial Towers" class="form-control" />
          </div>

          <div class="form-group">
            <label class="form-label">{{ t.manifestoPage.proposalDetails }}</label>
            <textarea v-model="newIdea.content" required rows="4" placeholder="Detail your solution, required enforcement, and projected impact on citizens..." class="form-control"></textarea>
          </div>

          <div class="modal-actions">
            <button type="button" @click="showSubmitModal = false" class="btn btn-glass btn-sm">{{ t.manifestoPage.cancelBtn }}</button>
            <button type="submit" class="btn btn-gold btn-sm">{{ t.manifestoPage.submitProposal }}</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useHead } from '#app'
import { PenTool } from 'lucide-vue-next'
import { useLanguage } from '~/composables/useLanguage'
import { useIdeas, type ManifestoIdea } from '~/composables/useIdeas'

const { t } = useLanguage()
const { filterTopic, filteredIdeas, toggleUpvote, submitIdea } = useIdeas()

const showSubmitModal = ref(false)

const newIdea = ref({
  authorName: '',
  authorRole: '',
  location: '',
  topic: 'Economy' as ManifestoIdea['topic'],
  title: '',
  content: ''
})

const handleCreateIdea = () => {
  submitIdea({
    authorName: newIdea.value.authorName,
    authorRole: newIdea.value.authorRole,
    location: newIdea.value.location,
    topic: newIdea.value.topic,
    title: newIdea.value.title,
    content: newIdea.value.content
  })

  newIdea.value = {
    authorName: '',
    authorRole: '',
    location: '',
    topic: 'Economy',
    title: '',
    content: ''
  }
  showSubmitModal.value = false
}

useHead({
  title: 'Manifesto Hub'
})
</script>

<style scoped>
.manifesto-hero {
  padding-top: 8rem;
  padding-bottom: 4rem;
  background: radial-gradient(circle at center top, rgba(12, 24, 48, 0.6) 0%, transparent 70%);
}

.manifesto-title {
  font-size: 2.75rem;
  color: var(--color-cream-50);
  margin-top: 0.5rem;
  margin-bottom: 1rem;
}

.manifesto-subtitle {
  color: var(--color-navy-200);
  font-size: 1.05rem;
  max-width: 650px;
  margin: 0 auto 1.5rem;
  line-height: 1.6;
}

.main-hub-container {
  padding-bottom: 5rem;
}

.filter-row {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 2rem;
}

.filter-tab-btn {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: var(--color-navy-200);
  padding: 0.45rem 1.15rem;
  border-radius: var(--radius-full);
  font-size: 0.82rem;
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.filter-tab-btn:hover {
  border-color: var(--color-gold-400);
  color: var(--color-cream-50);
}

.filter-tab-btn.active {
  background: rgba(212, 160, 45, 0.2);
  border-color: var(--color-gold-400);
  color: var(--color-gold-300);
  font-weight: 700;
}

.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(4, 8, 18, 0.85);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1.5rem;
}

.modal-card {
  max-width: 650px;
  width: 100%;
  padding: 2.5rem;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.modal-title {
  font-size: 1.35rem;
  color: var(--color-cream-50);
}

.modal-close-btn {
  background: none;
  border: none;
  color: var(--color-navy-300);
  font-size: 1.25rem;
  cursor: pointer;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1.5rem;
}
</style>
