<template>
  <div class="admin-manifesto-page">
    <div v-if="toastMessage" class="admin-toast">
      <CheckCircle2 :size="16" />
      <span>{{ toastMessage }}</span>
    </div>

    <div class="pane-header mb-6">
      <h2 class="pane-title">Manifesto Wall Moderation</h2>
      <span class="pane-subtitle">Review and moderate citizen policy proposals submitted to ifiruled.world.</span>
    </div>

    <div class="grid-2">
      <div v-for="idea in adminIdeas" :key="idea.id" class="moderation-card card-presidential">
        <div class="mod-header">
          <div>
            <h4 class="mod-author">{{ idea.authorName }} <span class="mod-role">&bull; {{ idea.authorRole }}</span></h4>
            <span class="mod-loc">{{ idea.location }}</span>
          </div>
          <span class="topic-tag">{{ idea.topic }}</span>
        </div>

        <h3 class="mod-title">{{ idea.title }}</h3>
        <p class="mod-content">{{ idea.content }}</p>

        <div class="mod-footer">
          <div class="mod-votes">
            <ThumbsUp :size="13" />
            <span>{{ idea.upvotes }} Endorsements</span>
          </div>
          <div class="mod-actions">
            <button 
              @click="handleToggleApproval(idea.id)" 
              :class="['btn btn-xs', idea.isApproved ? 'btn-gold' : 'btn-outline-gold']"
            >
              <Check :size="12" v-if="idea.isApproved" />
              <EyeOff :size="12" v-else />
              <span>{{ idea.isApproved ? 'Approved on Wall' : 'Hidden from Wall' }}</span>
            </button>
            <button @click="handleDeleteIdea(idea.id)" class="icon-btn delete" title="Delete Idea">
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
  ThumbsUp, 
  Check, 
  EyeOff, 
  Trash2, 
  CheckCircle2 
} from 'lucide-vue-next'
import { useAdmin } from '~/composables/useAdmin'

definePageMeta({
  layout: 'admin',
  middleware: ['admin-auth']
})

useHead({
  title: 'Manifesto Moderation'
})

const toastMessage = ref('')
const showToast = (msg: string) => {
  toastMessage.value = msg
  setTimeout(() => { toastMessage.value = '' }, 3500)
}

const {
  adminIdeas,
  fetchAdminIdeas,
  toggleIdeaApproval,
  deleteIdea
} = useAdmin()

onMounted(() => {
  fetchAdminIdeas()
})

const handleToggleApproval = async (id: string | number) => {
  await toggleIdeaApproval(id)
  showToast('Policy idea visibility updated')
}

const handleDeleteIdea = async (id: string | number) => {
  if (confirm('Delete this policy proposal permanently?')) {
    await deleteIdea(id)
    showToast('Policy idea removed')
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

.moderation-card {
  padding: 1.5rem;
  background: rgba(8, 17, 34, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.mod-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 0.85rem;
}

.mod-author {
  font-size: 0.95rem;
  font-weight: 600;
  color: #F8FAFC;
}

.mod-role {
  color: #94A3B8;
  font-weight: 400;
  font-size: 0.8rem;
}

.mod-loc {
  font-size: 0.75rem;
  color: #64748B;
  display: block;
  margin-top: 0.1rem;
}

.mod-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-gold-300);
  margin-bottom: 0.5rem;
  line-height: 1.4;
}

.mod-content {
  font-size: 0.85rem;
  color: #94A3B8;
  line-height: 1.5;
  margin-bottom: 1.25rem;
}

.mod-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 0.85rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.mod-votes {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--color-gold-400);
}

.mod-actions {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.btn-xs {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
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
