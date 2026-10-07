<template>
  <div class="admin-overview-page">
    <!-- Notification Toast -->
    <div v-if="toastMessage" class="admin-toast">
      <CheckCircle2 :size="16" />
      <span>{{ toastMessage }}</span>
    </div>

    <div class="pane-header flex-between mb-6">
      <div>
        <h2 class="pane-title">Executive Briefing</h2>
        <span class="pane-subtitle">Platform overview and real-time database metrics.</span>
      </div>

      <button @click="handleRefresh" class="btn btn-glass btn-sm sync-btn" :disabled="loading">
        <RefreshCw :size="14" :class="['icon-svg', { 'animate-spin': loading }]" />
        <span>{{ loading ? 'Syncing...' : 'Sync Metrics' }}</span>
      </button>
    </div>

    <!-- Stats Metric Cards Grid -->
    <div class="grid-4 metrics-grid mb-6">
      <NuxtLink to="/admin/episodes" class="metric-card card-presidential">
        <div class="metric-header">
          <span class="metric-label">Episodes</span>
          <Video :size="16" class="metric-icon-svg" />
        </div>
        <div class="metric-val">{{ stats.total_episodes }}</div>
        <span class="metric-footer">Published Broadcasts</span>
      </NuxtLink>

      <NuxtLink to="/admin/applications" class="metric-card card-presidential highlight-card">
        <div class="metric-header">
          <span class="metric-label">Candidates</span>
          <Users :size="16" class="metric-icon-svg" />
        </div>
        <div class="metric-val text-gold">{{ stats.pending_applications }}</div>
        <span class="metric-footer">Pending Review</span>
      </NuxtLink>

      <NuxtLink to="/admin/manifesto" class="metric-card card-presidential">
        <div class="metric-header">
          <span class="metric-label">Manifesto Ideas</span>
          <BookOpen :size="16" class="metric-icon-svg" />
        </div>
        <div class="metric-val">{{ stats.total_ideas }}</div>
        <span class="metric-footer">Citizen Proposals</span>
      </NuxtLink>

      <NuxtLink to="/admin/subscribers" class="metric-card card-presidential">
        <div class="metric-header">
          <span class="metric-label">Subscribers</span>
          <Mail :size="16" class="metric-icon-svg" />
        </div>
        <div class="metric-val">{{ stats.total_subscribers }}</div>
        <span class="metric-footer">Cabinet Audience</span>
      </NuxtLink>
    </div>

    <!-- Live Status Control Banner -->
    <div class="card-presidential live-signal-card mb-6">
      <div class="flex-between">
        <div class="signal-info">
          <div class="signal-badge-row">
            <span :class="['status-dot', stats.is_live ? 'dot-live' : 'dot-standby']"></span>
            <span class="signal-status-label">{{ stats.is_live ? 'Live Broadcast Active' : 'Broadcast Signal Offline' }}</span>
          </div>
          <p class="signal-notice-text">{{ stats.broadcast_notice }}</p>
        </div>
        <button 
          @click="handleToggleLiveQuick" 
          :class="['btn btn-sm', stats.is_live ? 'btn-danger' : 'btn-outline-gold']"
        >
          <Radio :size="14" class="icon-svg" />
          <span>{{ stats.is_live ? 'Deactivate Live Signal' : 'Activate Live Signal' }}</span>
        </button>
      </div>
    </div>

    <!-- Quick Directives Grid -->
    <div class="quick-nav-section">
      <div class="section-title">Quick Actions</div>
      <div class="grid-4 actions-grid">
        <NuxtLink to="/admin/episodes" class="action-card card-presidential">
          <div class="action-card-body">
            <h4>Manage Episodes</h4>
            <p>Publish or edit broadcast records and decrees.</p>
          </div>
          <ArrowRight :size="14" class="action-arrow" />
        </NuxtLink>

        <NuxtLink to="/admin/applications" class="action-card card-presidential">
          <div class="action-card-body">
            <h4>Review Candidates</h4>
            <p>Evaluate applications and shortlist guests.</p>
          </div>
          <ArrowRight :size="14" class="action-arrow" />
        </NuxtLink>

        <NuxtLink to="/admin/manifesto" class="action-card card-presidential">
          <div class="action-card-body">
            <h4>Moderate Wall</h4>
            <p>Review public citizen proposals.</p>
          </div>
          <ArrowRight :size="14" class="action-arrow" />
        </NuxtLink>

        <NuxtLink to="/admin/broadcast" class="action-card card-presidential">
          <div class="action-card-body">
            <h4>Broadcast Setup</h4>
            <p>Configure live stream links and schedule.</p>
          </div>
          <ArrowRight :size="14" class="action-arrow" />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useHead } from '#app'
import { 
  Video, 
  Users, 
  BookOpen, 
  Mail, 
  RefreshCw, 
  Radio, 
  ArrowRight, 
  CheckCircle2 
} from 'lucide-vue-next'
import { useAdmin } from '~/composables/useAdmin'

definePageMeta({
  layout: 'admin',
  middleware: ['admin-auth']
})

useHead({
  title: 'Executive Overview'
})

const toastMessage = ref('')
const showToast = (msg: string) => {
  toastMessage.value = msg
  setTimeout(() => { toastMessage.value = '' }, 3500)
}

const { loading, stats, fetchStats, updateBroadcastSettings } = useAdmin()

const handleRefresh = async () => {
  await fetchStats()
  showToast('Database metrics synchronized')
}

const handleToggleLiveQuick = async () => {
  const newLiveState = !stats.value.is_live
  await updateBroadcastSettings({
    is_live: newLiveState,
    live_stream_url: stats.value.live_stream_url,
    next_broadcast_datetime: stats.value.next_broadcast_datetime,
    broadcast_notice: stats.value.broadcast_notice
  })
  showToast(newLiveState ? 'Broadcast signal activated' : 'Broadcast signal set to standby')
}

onMounted(() => {
  fetchStats()
})
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

.sync-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.8rem;
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.25rem;
}

.metric-card {
  padding: 1.5rem;
  background: rgba(8, 17, 34, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 8px;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  transition: all var(--transition-fast);
}

.metric-card:hover {
  border-color: rgba(212, 160, 45, 0.35);
  transform: translateY(-2px);
}

.highlight-card {
  border-color: rgba(212, 160, 45, 0.25);
  background: linear-gradient(135deg, rgba(212, 160, 45, 0.08) 0%, rgba(8, 17, 34, 0.9) 100%);
}

.metric-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.75rem;
}

.metric-label {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: #94A3B8;
  font-weight: 600;
}

.metric-icon-svg {
  color: #64748B;
}

.metric-val {
  font-family: var(--font-heading);
  font-size: 2rem;
  font-weight: 800;
  color: #F8FAFC;
  line-height: 1;
  margin-bottom: 0.5rem;
}

.text-gold {
  color: var(--color-gold-300);
}

.metric-footer {
  font-size: 0.75rem;
  color: #64748B;
}

.live-signal-card {
  padding: 1.25rem 1.5rem;
  background: rgba(8, 17, 34, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 8px;
}

.signal-badge-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.25rem;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.dot-live {
  background: #EF4444;
  box-shadow: 0 0 8px rgba(239, 68, 68, 0.8);
}

.dot-standby {
  background: #64748B;
}

.signal-status-label {
  font-size: 0.85rem;
  font-weight: 600;
  color: #F8FAFC;
}

.signal-notice-text {
  font-size: 0.8rem;
  color: #94A3B8;
}

.section-title {
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #64748B;
  font-weight: 700;
  margin-bottom: 0.85rem;
}

.actions-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.25rem;
}

.action-card {
  padding: 1.25rem;
  background: rgba(8, 17, 34, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all var(--transition-fast);
}

.action-card:hover {
  border-color: rgba(212, 160, 45, 0.3);
  background: rgba(8, 17, 34, 0.8);
}

.action-card-body h4 {
  font-size: 0.9rem;
  font-weight: 600;
  color: #F8FAFC;
  margin-bottom: 0.2rem;
}

.action-card-body p {
  font-size: 0.75rem;
  color: #64748B;
}

.action-arrow {
  color: #64748B;
  transition: transform var(--transition-fast);
}

.action-card:hover .action-arrow {
  color: var(--color-gold-300);
  transform: translateX(3px);
}

.btn-danger {
  background: rgba(239, 68, 68, 0.15);
  border: 1px solid rgba(239, 68, 68, 0.3);
  color: #FCA5A5;
}

.btn-danger:hover {
  background: rgba(239, 68, 68, 0.25);
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

@media (max-width: 1024px) {
  .metrics-grid, .actions-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
