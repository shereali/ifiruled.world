<template>
  <div class="admin-episodes-page">
    <div v-if="toastMessage" class="admin-toast">
      <CheckCircle2 :size="16" />
      <span>{{ toastMessage }}</span>
    </div>

    <div class="pane-header flex-between mb-6">
      <div>
        <h2 class="pane-title">Episodes CMS</h2>
        <span class="pane-subtitle">Manage broadcast archives, episode metadata, and policy decrees.</span>
      </div>
      <button @click="openNewEpisodeModal" class="btn btn-gold btn-sm add-btn">
        <Plus :size="15" />
        <span>New Episode</span>
      </button>
    </div>

    <!-- Search & Filter Row -->
    <div class="table-filter-bar mb-4">
      <div class="search-input-wrapper">
        <Search :size="15" class="search-icon" />
        <input 
          v-model="episodeSearch" 
          type="text" 
          placeholder="Search by president, title, or sector..." 
          class="form-control table-search-input"
        />
      </div>
    </div>

    <!-- Episodes Table -->
    <div class="table-container card-presidential">
      <table class="admin-table">
        <thead>
          <tr>
            <th>Episode</th>
            <th>Guest Speaker</th>
            <th>Title</th>
            <th>Sector</th>
            <th>Air Date</th>
            <th>Featured</th>
            <th class="text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="ep in filteredAdminEpisodes" :key="ep.id">
            <td><span class="ep-badge">EP {{ ep.episodeNumber }}</span></td>
            <td>
              <div class="table-user-cell">
                <img :src="ep.guestPhoto" :alt="ep.guestName" class="table-avatar" />
                <div>
                  <strong class="user-cell-name">{{ ep.guestName }}</strong>
                  <small class="user-cell-role">{{ ep.guestRole }}</small>
                </div>
              </div>
            </td>
            <td class="table-title-cell">{{ ep.title }}</td>
            <td><span class="topic-tag">{{ ep.topic }}</span></td>
            <td><span class="date-cell">{{ ep.airDate }}</span></td>
            <td>
              <button 
                @click="handleToggleFeatured(ep.id)" 
                :class="['feat-btn', { active: ep.featured }]"
              >
                <Star :size="12" :class="{ 'star-filled': ep.featured }" />
                <span>{{ ep.featured ? 'Featured' : 'Standard' }}</span>
              </button>
            </td>
            <td class="text-right">
              <div class="action-btn-group justify-end">
                <button @click="openEditEpisodeModal(ep)" class="icon-btn" title="Edit Episode">
                  <Edit3 :size="14" />
                </button>
                <button @click="handleDeleteEpisode(ep.id)" class="icon-btn delete" title="Delete Episode">
                  <Trash2 :size="14" />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal for Adding / Editing Episode -->
    <div v-if="showEpisodeModal" class="modal-backdrop" @click.self="showEpisodeModal = false">
      <div class="modal-card episode-modal-card">
        <div class="modal-header">
          <h3 class="modal-title">{{ editingEpisodeId ? 'Edit Episode Record' : 'Publish New Episode Record' }}</h3>
          <button @click="showEpisodeModal = false" class="modal-close-btn">
            <X :size="18" />
          </button>
        </div>

        <form @submit.prevent="saveEpisodeForm" class="modal-form">
          <div class="grid-2 form-row">
            <div class="form-group">
              <label class="form-label">Episode Number *</label>
              <input v-model="episodeForm.episodeNumber" type="number" required class="form-control" />
            </div>
            <div class="form-group">
              <label class="form-label">Sector Topic *</label>
              <select v-model="episodeForm.topic" required class="form-control">
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
            <label class="form-label">Address Title *</label>
            <input v-model="episodeForm.title" type="text" required placeholder="Abolishing Export Bureaucracy..." class="form-control" />
          </div>

          <div class="grid-2 form-row">
            <div class="form-group">
              <label class="form-label">President (Guest Name) *</label>
              <input v-model="episodeForm.guestName" type="text" required placeholder="Samiul Alam" class="form-control" />
            </div>
            <div class="form-group">
              <label class="form-label">Guest Role / Designation *</label>
              <input v-model="episodeForm.guestRole" type="text" required placeholder="FinTech Builder" class="form-control" />
            </div>
          </div>

          <div class="grid-2 form-row">
            <div class="form-group">
              <label class="form-label">Air Date *</label>
              <input v-model="episodeForm.airDate" type="text" required placeholder="September 3, 2026" class="form-control" />
            </div>
            <div class="form-group">
              <label class="form-label">Duration *</label>
              <input v-model="episodeForm.duration" type="text" required placeholder="31:45" class="form-control" />
            </div>
          </div>

          <div class="grid-2 form-row">
            <div class="form-group">
              <label class="form-label">YouTube Video ID *</label>
              <input v-model="episodeForm.youtubeId" type="text" required placeholder="dQw4w9WgXcQ" class="form-control" />
            </div>
            <div class="form-group">
              <label class="form-label">Guest Photo URL</label>
              <input v-model="episodeForm.guestPhoto" type="url" placeholder="https://images.unsplash.com/..." class="form-control" />
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Signature Quote *</label>
            <input v-model="episodeForm.quote" type="text" required placeholder="Key quote from the presidential address..." class="form-control" />
          </div>

          <div class="form-group">
            <label class="form-label">Executive Summary *</label>
            <textarea v-model="episodeForm.executiveSummary" required rows="3" class="form-control"></textarea>
          </div>

          <!-- Dynamic Key Decrees Builder -->
          <div class="form-group">
            <label class="form-label">Passed Executive Decrees</label>
            <div v-for="(dec, idx) in episodeForm.keyDecrees" :key="idx" class="decree-input-row mb-2">
              <input v-model="episodeForm.keyDecrees[idx]" type="text" class="form-control" placeholder="Executive Decree..." />
            </div>
            <button type="button" @click="episodeForm.keyDecrees.push('')" class="btn btn-glass btn-sm mt-2 decree-add-btn">
              <Plus :size="13" />
              <span>Add Decree</span>
            </button>
          </div>

          <div class="form-group">
            <label class="checkbox-label">
              <input v-model="episodeForm.featured" type="checkbox" />
              <span>Mark as Homepage Featured Address</span>
            </label>
          </div>

          <div class="modal-actions">
            <button type="button" @click="showEpisodeModal = false" class="btn btn-glass btn-sm">Cancel</button>
            <button type="submit" class="btn btn-gold btn-sm">
              <span>{{ editingEpisodeId ? 'Save Changes' : 'Publish Episode' }}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useHead } from '#app'
import { 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  Star, 
  X, 
  CheckCircle2 
} from 'lucide-vue-next'
import { useAdmin } from '~/composables/useAdmin'
import type { Episode } from '~/composables/useEpisodes'

definePageMeta({
  layout: 'admin',
  middleware: ['admin-auth']
})

useHead({
  title: 'Episodes CMS'
})

const toastMessage = ref('')
const showToast = (msg: string) => {
  toastMessage.value = msg
  setTimeout(() => { toastMessage.value = '' }, 3500)
}

const {
  adminEpisodes,
  fetchAdminEpisodes,
  createEpisode,
  updateEpisode,
  toggleFeaturedEpisode,
  deleteEpisode
} = useAdmin()

onMounted(() => {
  fetchAdminEpisodes()
})

const episodeSearch = ref('')
const filteredAdminEpisodes = computed(() => {
  const q = episodeSearch.value.toLowerCase().trim()
  if (!q) return adminEpisodes.value
  return adminEpisodes.value.filter(e => 
    e.title.toLowerCase().includes(q) ||
    e.guestName.toLowerCase().includes(q) ||
    e.topic.toLowerCase().includes(q)
  )
})

const showEpisodeModal = ref(false)
const editingEpisodeId = ref<string | null>(null)

const episodeForm = ref({
  episodeNumber: 13,
  topic: 'Economy' as Episode['topic'],
  title: '',
  guestName: '',
  guestRole: '',
  guestPhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
  airDate: 'September 3, 2026',
  duration: '30:00',
  youtubeId: 'dQw4w9WgXcQ',
  quote: '',
  executiveSummary: '',
  featured: false,
  keyDecrees: ['Executive Decree 1: Rapid implementation directive.']
})

const openNewEpisodeModal = () => {
  editingEpisodeId.value = null
  episodeForm.value = {
    episodeNumber: adminEpisodes.value.length + 1,
    topic: 'Economy',
    title: '',
    guestName: '',
    guestRole: '',
    guestPhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    airDate: 'September 3, 2026',
    duration: '30:00',
    youtubeId: 'dQw4w9WgXcQ',
    quote: '',
    executiveSummary: '',
    featured: false,
    keyDecrees: ['Executive Decree 1: Single window paperless registration.']
  }
  showEpisodeModal.value = true
}

const openEditEpisodeModal = (ep: Episode) => {
  editingEpisodeId.value = ep.id
  episodeForm.value = {
    episodeNumber: ep.episodeNumber,
    topic: ep.topic,
    title: ep.title,
    guestName: ep.guestName,
    guestRole: ep.guestRole,
    guestPhoto: ep.guestPhoto,
    airDate: ep.airDate,
    duration: ep.duration,
    youtubeId: ep.youtubeId,
    quote: ep.quote,
    executiveSummary: ep.executiveSummary,
    featured: !!ep.featured,
    keyDecrees: ep.keyDecrees.length > 0 ? [...ep.keyDecrees] : ['Executive Decree 1: Directive.']
  }
  showEpisodeModal.value = true
}

const saveEpisodeForm = async () => {
  const cleanDecrees = episodeForm.value.keyDecrees.filter(d => d.trim() !== '')
  if (cleanDecrees.length === 0) {
    cleanDecrees.push('Executive Decree 1: General reform directive.')
  }

  if (editingEpisodeId.value) {
    await updateEpisode(editingEpisodeId.value, {
      ...episodeForm.value,
      keyDecrees: cleanDecrees
    })
    showToast('Episode updated successfully')
  } else {
    await createEpisode({
      ...episodeForm.value,
      keyDecrees: cleanDecrees
    })
    showToast('New episode published')
  }
  showEpisodeModal.value = false
}

const handleToggleFeatured = async (id: string | number) => {
  await toggleFeaturedEpisode(id)
  showToast('Featured status updated')
}

const handleDeleteEpisode = async (id: string | number) => {
  if (confirm('Delete this broadcast episode from database?')) {
    await deleteEpisode(id)
    showToast('Episode deleted')
  }
}
</script>

<style scoped>
.pane-title {
  font-size: 1.45rem;
  font-family: var(--font-heading);
  color: #F8FAFC;
  margin-bottom: 0.2rem;
}

.pane-subtitle {
  font-size: 0.85rem;
  color: #94A3B8;
}

.flex-between {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
}

.mb-6 {
  margin-bottom: 1.75rem;
}

.mb-4 {
  margin-bottom: 1.25rem;
}

.add-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
}

.search-input-wrapper {
  position: relative;
  max-width: 400px;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 0.85rem;
  color: #64748B;
  pointer-events: none;
}

.table-search-input {
  padding-left: 2.35rem;
}

.table-container {
  overflow-x: auto;
  background: rgba(8, 17, 34, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 8px;
  padding: 0.5rem;
}

.admin-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

.admin-table th {
  padding: 0.85rem 1rem;
  font-size: 0.72rem;
  color: #94A3B8;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  font-weight: 600;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.admin-table td {
  padding: 0.85rem 1rem;
  font-size: 0.85rem;
  color: #CBD5E1;
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
}

.text-right {
  text-align: right;
}

.justify-end {
  justify-content: flex-end;
}

.table-user-cell {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.table-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid rgba(212, 160, 45, 0.3);
}

.user-cell-name {
  color: #F8FAFC;
  display: block;
  font-size: 0.85rem;
}

.user-cell-role {
  color: #64748B;
  font-size: 0.75rem;
}

.table-title-cell {
  max-width: 260px;
  font-size: 0.85rem;
  color: #E2E8F0;
}

.date-cell {
  font-size: 0.8rem;
  color: #94A3B8;
}

.ep-badge {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: var(--color-gold-300);
  padding: 0.15rem 0.45rem;
  border-radius: 4px;
  font-weight: 700;
  font-size: 0.72rem;
}

.feat-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: #64748B;
  padding: 0.25rem 0.6rem;
  border-radius: 4px;
  font-size: 0.72rem;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.feat-btn.active {
  background: rgba(212, 160, 45, 0.12);
  border-color: rgba(212, 160, 45, 0.3);
  color: var(--color-gold-300);
  font-weight: 600;
}

.star-filled {
  color: var(--color-gold-400);
  fill: var(--color-gold-400);
}

.action-btn-group {
  display: flex;
  align-items: center;
  gap: 0.35rem;
}

.icon-btn {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: #94A3B8;
  padding: 0.35rem;
  border-radius: 4px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all var(--transition-fast);
}

.icon-btn:hover {
  border-color: rgba(212, 160, 45, 0.4);
  color: var(--color-gold-300);
}

.icon-btn.delete:hover {
  border-color: rgba(239, 68, 68, 0.4);
  color: #F87171;
}

.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(4, 8, 18, 0.85);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 1.5rem;
}

.modal-card {
  background: #081122;
  border: 1px solid rgba(212, 160, 45, 0.25);
  border-radius: 10px;
  padding: 2rem;
  width: 100%;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.8);
}

.episode-modal-card {
  max-width: 680px;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.25rem;
  padding-bottom: 0.85rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.modal-title {
  font-size: 1.15rem;
  font-family: var(--font-heading);
  color: #F8FAFC;
}

.modal-close-btn {
  background: transparent;
  border: none;
  color: #64748B;
  cursor: pointer;
}

.modal-close-btn:hover {
  color: #F8FAFC;
}

.decree-add-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.75rem;
}

.modal-actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.75rem;
  margin-top: 1.25rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.admin-toast {
  position: fixed;
  top: 80px;
  right: 2rem;
  background: #0B172E;
  border: 1px solid rgba(212, 160, 45, 0.3);
  color: var(--color-gold-300);
  padding: 0.75rem 1.25rem;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
  z-index: 200;
}
</style>
