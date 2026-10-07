<template>
  <div class="admin-applications-page">
    <div v-if="toastMessage" class="admin-toast">
      <CheckCircle2 :size="16" />
      <span>{{ toastMessage }}</span>
    </div>

    <div class="pane-header flex-between mb-6">
      <div>
        <h2 class="pane-title">Candidate Pipeline</h2>
        <span class="pane-subtitle">Review applications for 30 minutes in the presidential chair.</span>
      </div>

      <!-- Status Filter Buttons -->
      <div class="filter-pills-row">
        <button 
          v-for="st in ['all', 'pending', 'shortlisted', 'scheduled', 'rejected']" 
          :key="st" 
          @click="applicationFilter = st"
          :class="['filter-pill', { active: applicationFilter === st }]"
        >
          {{ st.toUpperCase() }}
        </button>
      </div>
    </div>

    <!-- Applications List -->
    <div class="applications-list">
      <div v-for="app in filteredApplications" :key="app.id" class="candidate-card card-presidential">
        <div class="candidate-header">
          <div class="candidate-meta">
            <h3 class="candidate-name">{{ app.full_name }}</h3>
            <div class="candidate-sub-meta">
              <span>Age {{ app.age }}</span>
              <span>&bull;</span>
              <span>{{ app.location }}</span>
              <span>&bull;</span>
              <span>{{ app.email }}</span>
              <span>&bull;</span>
              <span>{{ app.phone }}</span>
            </div>
          </div>
          <span :class="['status-pill', app.status]">{{ app.status.toUpperCase() }}</span>
        </div>

        <div class="candidate-body">
          <div class="decree-highlight">
            <div class="decree-sector">{{ app.topic }} Sector</div>
            <h4 class="decree-title">{{ app.first_decree_title }}</h4>
            <p class="decree-manifesto">{{ app.manifesto }}</p>
          </div>

          <div class="candidate-links" v-if="app.pitch_url || app.linkedin || app.social_handle">
            <a v-if="app.pitch_url" :href="app.pitch_url" target="_blank" rel="noopener" class="link-tag video">
              <Video :size="12" />
              <span>Elevator Video Pitch</span>
            </a>
            <a v-if="app.linkedin" :href="app.linkedin" target="_blank" rel="noopener" class="link-tag">
              <ExternalLink :size="12" />
              <span>LinkedIn Profile</span>
            </a>
            <span v-if="app.social_handle" class="link-tag">
              @{{ app.social_handle }}
            </span>
          </div>
        </div>

        <div class="candidate-footer">
          <span class="submitted-date">Submitted on {{ app.created_at }}</span>
          <div class="status-actions">
            <button 
              @click="handleStatusChange(app.id, 'shortlisted')" 
              :class="['btn btn-xs', app.status === 'shortlisted' ? 'btn-gold' : 'btn-glass']"
            >
              <Check :size="12" />
              <span>Shortlist</span>
            </button>
            <button 
              @click="handleStatusChange(app.id, 'scheduled')" 
              :class="['btn btn-xs', app.status === 'scheduled' ? 'btn-gold' : 'btn-glass']"
            >
              <Mic :size="12" />
              <span>Schedule</span>
            </button>
            <button 
              @click="handleStatusChange(app.id, 'rejected')" 
              class="btn btn-glass btn-xs btn-reject"
            >
              <X :size="12" />
              <span>Reject</span>
            </button>
            <button @click="handleDeleteApp(app.id)" class="icon-btn delete" title="Delete Record">
              <Trash2 :size="13" />
            </button>
          </div>
        </div>
      </div>

      <div v-if="filteredApplications.length === 0" class="empty-tab text-center card-presidential">
        <p>No candidate records in this status filter.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useHead } from '#app'
import { 
  Check, 
  Mic, 
  X, 
  Trash2, 
  Video, 
  ExternalLink, 
  CheckCircle2 
} from 'lucide-vue-next'
import { useAdmin } from '~/composables/useAdmin'

definePageMeta({
  layout: 'admin',
  middleware: ['admin-auth']
})

useHead({
  title: 'Candidate Pipeline'
})

const toastMessage = ref('')
const showToast = (msg: string) => {
  toastMessage.value = msg
  setTimeout(() => { toastMessage.value = '' }, 3500)
}

const {
  applications,
  fetchApplications,
  updateApplicationStatus,
  deleteApplication
} = useAdmin()

onMounted(() => {
  fetchApplications()
})

const applicationFilter = ref('all')
const filteredApplications = computed(() => {
  if (applicationFilter.value === 'all') return applications.value
  return applications.value.filter(a => a.status === applicationFilter.value)
})

const handleStatusChange = async (id: number, status: string) => {
  const res = await updateApplicationStatus(id, status)
  if (res.success) {
    showToast(`Candidate status changed to ${status.toUpperCase()}`)
  }
}

const handleDeleteApp = async (id: number) => {
  if (confirm('Delete candidate application record?')) {
    await deleteApplication(id)
    showToast('Candidate record deleted')
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

.filter-pills-row {
  display: flex;
  gap: 0.4rem;
  flex-wrap: wrap;
}

.filter-pill {
  padding: 0.3rem 0.75rem;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 4px;
  color: #94A3B8;
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.filter-pill.active {
  background: rgba(212, 160, 45, 0.15);
  color: var(--color-gold-300);
  border-color: rgba(212, 160, 45, 0.3);
}

.applications-list {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.candidate-card {
  padding: 1.5rem;
  background: rgba(8, 17, 34, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 8px;
}

.candidate-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.candidate-name {
  font-size: 1.15rem;
  font-family: var(--font-heading);
  color: #F8FAFC;
}

.candidate-sub-meta {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.78rem;
  color: #64748B;
  margin-top: 0.2rem;
  flex-wrap: wrap;
}

.status-pill {
  padding: 0.2rem 0.55rem;
  border-radius: 4px;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.04em;
}

.status-pill.pending {
  background: rgba(245, 158, 11, 0.1);
  border: 1px solid rgba(245, 158, 11, 0.25);
  color: #FBBF24;
}

.status-pill.shortlisted {
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.25);
  color: #34D399;
}

.status-pill.scheduled {
  background: rgba(59, 130, 246, 0.1);
  border: 1px solid rgba(59, 130, 246, 0.25);
  color: #60A5FA;
}

.status-pill.rejected {
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.25);
  color: #F87171;
}

.decree-highlight {
  background: rgba(4, 8, 18, 0.5);
  padding: 1rem;
  border-radius: 6px;
  border-left: 2px solid var(--color-gold-400);
  margin-bottom: 0.85rem;
}

.decree-sector {
  font-size: 0.7rem;
  font-weight: 700;
  color: var(--color-gold-400);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.decree-title {
  font-size: 0.95rem;
  color: #F8FAFC;
  margin-top: 0.2rem;
  margin-bottom: 0.4rem;
}

.decree-manifesto {
  font-size: 0.85rem;
  color: #94A3B8;
  line-height: 1.5;
}

.candidate-links {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.25rem;
  flex-wrap: wrap;
}

.link-tag {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.75rem;
  color: var(--color-gold-300);
  background: rgba(255, 255, 255, 0.03);
  padding: 0.25rem 0.55rem;
  border-radius: 4px;
  border: 1px solid rgba(255, 255, 255, 0.06);
  text-decoration: none;
}

.link-tag.video {
  color: #FCA5A5;
  border-color: rgba(239, 68, 68, 0.25);
}

.candidate-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 0.85rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  flex-wrap: wrap;
  gap: 0.75rem;
}

.submitted-date {
  font-size: 0.75rem;
  color: #64748B;
}

.status-actions {
  display: flex;
  align-items: center;
  gap: 0.35rem;
}

.btn-xs {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.25rem 0.55rem;
  font-size: 0.72rem;
  border-radius: 4px;
}

.btn-reject:hover {
  background: rgba(239, 68, 68, 0.15);
  border-color: rgba(239, 68, 68, 0.3);
  color: #F87171;
}

.icon-btn {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: #94A3B8;
  padding: 0.3rem;
  border-radius: 4px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.icon-btn.delete:hover {
  border-color: rgba(239, 68, 68, 0.4);
  color: #F87171;
}

.empty-tab {
  padding: 3rem;
  color: #64748B;
  font-size: 0.85rem;
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
