<template>
  <div class="admin-subscribers-page">
    <div v-if="toastMessage" class="admin-toast">
      <CheckCircle2 :size="16" />
      <span>{{ toastMessage }}</span>
    </div>

    <div class="pane-header flex-between mb-6">
      <div>
        <h2 class="pane-title">Cabinet Subscribers</h2>
        <span class="pane-subtitle">Audience members enrolled in weekly policy digests.</span>
      </div>
      <div class="btn-group-row">
        <button @click="exportSubscribersCSV" class="btn btn-glass btn-sm export-btn">
          <Download :size="14" />
          <span>Export CSV</span>
        </button>
        <button @click="copyAllSubscribers" class="btn btn-gold btn-sm copy-btn">
          <Copy :size="14" />
          <span>Copy All Emails</span>
        </button>
      </div>
    </div>

    <div class="table-container card-presidential">
      <table class="admin-table">
        <thead>
          <tr>
            <th style="width: 60px;">#</th>
            <th>Email Address</th>
            <th>Status</th>
            <th>Subscribed At</th>
            <th class="text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(sub, i) in subscribers" :key="sub.id || i">
            <td class="text-muted">{{ i + 1 }}</td>
            <td><strong class="email-text">{{ sub.email }}</strong></td>
            <td><span class="status-pill active">Active</span></td>
            <td class="text-muted">{{ sub.created_at || 'Recent' }}</td>
            <td class="text-right">
              <button @click="handleDeleteSubscriber(sub.id)" class="icon-btn delete" title="Delete Subscriber">
                <Trash2 :size="13" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useHead } from '#app'
import { 
  Download, 
  Copy, 
  Trash2, 
  CheckCircle2 
} from 'lucide-vue-next'
import { useAdmin } from '~/composables/useAdmin'

definePageMeta({
  layout: 'admin',
  middleware: ['admin-auth']
})

useHead({
  title: 'Cabinet Subscribers'
})

const toastMessage = ref('')
const showToast = (msg: string) => {
  toastMessage.value = msg
  setTimeout(() => { toastMessage.value = '' }, 3500)
}

const {
  subscribers,
  fetchSubscribers,
  deleteSubscriber
} = useAdmin()

onMounted(() => {
  fetchSubscribers()
})

const copyAllSubscribers = () => {
  const emails = subscribers.value.map(s => s.email).join(', ')
  if (typeof window !== 'undefined') {
    navigator.clipboard.writeText(emails)
    showToast('Subscriber emails copied to clipboard')
  }
}

const exportSubscribersCSV = () => {
  const csvContent = 'data:text/csv;charset=utf-8,Email,SubscribedAt\n' +
    subscribers.value.map(s => `"${s.email}","${s.created_at}"`).join('\n')
  const encodedUri = encodeURI(csvContent)
  const link = document.createElement('a')
  link.setAttribute('href', encodedUri)
  link.setAttribute('download', 'ifiruled_cabinet_subscribers.csv')
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

const handleDeleteSubscriber = async (id: number) => {
  if (confirm('Remove subscriber record?')) {
    await deleteSubscriber(id)
    showToast('Subscriber removed')
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

.btn-group-row {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.export-btn, .copy-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
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

.text-muted {
  color: #64748B;
  font-size: 0.8rem;
}

.email-text {
  color: #F8FAFC;
  font-weight: 500;
}

.status-pill.active {
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.25);
  color: #34D399;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-size: 0.72rem;
  font-weight: 600;
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
