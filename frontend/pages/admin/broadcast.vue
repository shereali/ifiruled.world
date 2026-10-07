<template>
  <div class="admin-broadcast-page">
    <div v-if="toastMessage" class="admin-toast">
      <CheckCircle2 :size="16" />
      <span>{{ toastMessage }}</span>
    </div>

    <div class="pane-header mb-6">
      <h2 class="pane-title">Live Broadcast Control</h2>
      <span class="pane-subtitle">Configure the public live broadcast banner, YouTube video stream link, and schedule timing.</span>
    </div>

    <div class="broadcast-control-card card-presidential">
      <div class="form-group toggle-group">
        <div>
          <h3 class="toggle-title">Live Signal Status</h3>
          <p class="toggle-desc">When active, a live badge and streaming player will be displayed on the homepage.</p>
        </div>
        <button 
          @click="broadcastForm.is_live = !broadcastForm.is_live" 
          :class="['btn btn-sm signal-toggle-btn', broadcastForm.is_live ? 'btn-danger' : 'btn-outline-gold']"
        >
          <Radio :size="14" />
          <span>{{ broadcastForm.is_live ? 'Signal is Live' : 'Signal is Offline' }}</span>
        </button>
      </div>

      <div class="form-group mt-6">
        <label class="form-label">Next Scheduled Live Airing (Date & Time)</label>
        <div class="input-with-icon">
          <Calendar :size="15" class="field-icon" />
          <input v-model="broadcastForm.next_broadcast_datetime" type="text" class="form-control with-icon" placeholder="2026-09-03 20:00:00" />
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">Live Stream URL / YouTube Embed</label>
        <div class="input-with-icon">
          <Video :size="15" class="field-icon" />
          <input v-model="broadcastForm.live_stream_url" type="text" class="form-control with-icon" placeholder="https://youtube.com/live/..." />
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">Broadcast Schedule Notice Text</label>
        <input v-model="broadcastForm.broadcast_notice" type="text" class="form-control" placeholder="Every Thursday • 8:00 PM BST" />
      </div>

      <button @click="handleSaveBroadcastSettings" class="btn btn-gold btn-sm mt-4 save-btn">
        <Save :size="14" />
        <span>Save Broadcast Settings</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useHead } from '#app'
import { 
  Radio, 
  Calendar, 
  Video, 
  Save, 
  CheckCircle2 
} from 'lucide-vue-next'
import { useAdmin } from '~/composables/useAdmin'

definePageMeta({
  layout: 'admin',
  middleware: ['admin-auth']
})

useHead({
  title: 'Broadcast Control'
})

const toastMessage = ref('')
const showToast = (msg: string) => {
  toastMessage.value = msg
  setTimeout(() => { toastMessage.value = '' }, 3500)
}

const { stats, fetchStats, updateBroadcastSettings } = useAdmin()

const broadcastForm = ref({
  is_live: false,
  live_stream_url: 'https://youtube.com/live/dQw4w9WgXcQ',
  next_broadcast_datetime: '2026-09-03 20:00:00',
  broadcast_notice: 'Every Thursday • 8:00 PM BST'
})

onMounted(async () => {
  await fetchStats()
  broadcastForm.value = {
    is_live: stats.value.is_live,
    live_stream_url: stats.value.live_stream_url,
    next_broadcast_datetime: stats.value.next_broadcast_datetime,
    broadcast_notice: stats.value.broadcast_notice
  }
})

const handleSaveBroadcastSettings = async () => {
  await updateBroadcastSettings(broadcastForm.value)
  showToast('Broadcast settings saved to database')
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

.mb-6 {
  margin-bottom: 1.75rem;
}

.broadcast-control-card {
  max-width: 640px;
  padding: 2rem;
  background: rgba(8, 17, 34, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 8px;
}

.toggle-group {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  padding-bottom: 1.25rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.toggle-title {
  font-size: 1rem;
  font-weight: 600;
  color: #F8FAFC;
  margin-bottom: 0.2rem;
}

.toggle-desc {
  font-size: 0.8rem;
  color: #94A3B8;
}

.signal-toggle-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  flex-shrink: 0;
}

.input-with-icon {
  position: relative;
  display: flex;
  align-items: center;
}

.field-icon {
  position: absolute;
  left: 0.85rem;
  color: #64748B;
  pointer-events: none;
}

.form-control.with-icon {
  padding-left: 2.35rem;
}

.save-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
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
</style>
