<template>
  <div class="admin-contacts-page">
    <div v-if="toastMessage" class="admin-toast">
      <CheckCircle2 :size="16" />
      <span>{{ toastMessage }}</span>
    </div>

    <div class="pane-header mb-6">
      <h2 class="pane-title">Dispatches & Press Inquiries</h2>
      <span class="pane-subtitle">Direct inquiries, media requests, and studio partnership dispatches.</span>
    </div>

    <div class="grid-2">
      <div v-for="c in contacts" :key="c.id" class="dispatch-card card-presidential">
        <div class="dispatch-header">
          <div>
            <h3 class="dispatch-name">{{ c.name }}</h3>
            <span class="dispatch-email">{{ c.email }}</span>
          </div>
          <span class="topic-tag">{{ c.inquiry_type }}</span>
        </div>
        <p class="dispatch-msg">{{ c.message }}</p>
        <div class="dispatch-footer">
          <span class="submitted-date">Received: {{ c.created_at || 'Recent' }}</span>
          <div class="action-btn-group">
            <a :href="`mailto:${c.email}?subject=Re: If I Ruled Dispatch Response`" class="btn btn-outline-gold btn-xs reply-btn">
              <Mail :size="12" />
              <span>Reply via Email</span>
            </a>
            <button @click="handleDeleteContact(c.id)" class="icon-btn delete" title="Delete Dispatch">
              <Trash2 :size="13" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useHead } from '#app'
import { 
  Mail, 
  Trash2, 
  CheckCircle2 
} from 'lucide-vue-next'
import { useAdmin } from '~/composables/useAdmin'

definePageMeta({
  layout: 'admin',
  middleware: ['admin-auth']
})

useHead({
  title: 'Inquiries & Dispatches'
})

const toastMessage = ref('')
const showToast = (msg: string) => {
  toastMessage.value = msg
  setTimeout(() => { toastMessage.value = '' }, 3500)
}

const {
  contacts,
  fetchContacts,
  deleteContact
} = useAdmin()

onMounted(() => {
  fetchContacts()
})

const handleDeleteContact = async (id: number) => {
  if (confirm('Delete dispatch record?')) {
    await deleteContact(id)
    showToast('Dispatch record deleted')
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

.mb-6 {
  margin-bottom: 1.75rem;
}

.dispatch-card {
  padding: 1.5rem;
  background: rgba(8, 17, 34, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.dispatch-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 0.85rem;
}

.dispatch-name {
  font-size: 1.05rem;
  font-weight: 600;
  color: #F8FAFC;
}

.dispatch-email {
  font-size: 0.78rem;
  color: #64748B;
  display: block;
}

.dispatch-msg {
  font-size: 0.85rem;
  color: #94A3B8;
  line-height: 1.5;
  margin-bottom: 1.25rem;
}

.dispatch-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 0.85rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.submitted-date {
  font-size: 0.75rem;
  color: #64748B;
}

.action-btn-group {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.reply-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
}

.btn-xs {
  padding: 0.25rem 0.6rem;
  font-size: 0.72rem;
  border-radius: 4px;
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
