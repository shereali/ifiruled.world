<template>
  <div class="admin-login-screen">
    <div class="login-card card-presidential">
      <div class="login-header text-center">
        <img src="/logo-navy.png" alt="If I Ruled" class="admin-login-logo" />
        <div class="auth-security-badge">
          <ShieldCheck :size="13" />
          <span>Restricted Access</span>
        </div>
        <h2 class="login-title">Executive Desk Sign In</h2>
        <p class="login-sub">Enter verified administrative credentials to access the broadcast control center.</p>
      </div>

      <form @submit.prevent="handleLoginSubmit" class="login-form">
        <div class="form-group">
          <label class="form-label">Email or Account ID</label>
          <div class="input-with-icon">
            <Mail :size="16" class="field-icon" />
            <input 
              v-model="email" 
              type="text" 
              required 
              placeholder="admin@ifiruled.world" 
              class="form-control with-icon"
              :disabled="authLoading"
            />
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">Passkey</label>
          <div class="input-with-icon">
            <Lock :size="16" class="field-icon" />
            <input 
              v-model="password" 
              type="password" 
              required 
              placeholder="••••••••••••" 
              class="form-control with-icon"
              :disabled="authLoading"
            />
          </div>
        </div>

        <div v-if="authError" class="login-error-msg">
          <span>{{ authError }}</span>
        </div>

        <button type="submit" class="btn btn-gold w-full mt-4 submit-btn" :disabled="authLoading">
          <span>{{ authLoading ? 'Authenticating...' : 'Sign In to Dashboard' }}</span>
        </button>
      </form>

      <div class="demo-credentials-hint">
        <span class="hint-label">Default Credentials</span>
        <code>admin@ifiruled.world</code> &bull; <code>presidential2026</code>
      </div>

      <div class="back-home-link text-center">
        <NuxtLink to="/" class="return-link">
          <ArrowLeft :size="13" />
          <span>Return to public website</span>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useHead } from '#app'
import { ShieldCheck, Mail, Lock, ArrowLeft } from 'lucide-vue-next'
import { useAuth } from '~/composables/useAuth'

definePageMeta({
  layout: false,
  middleware: ['admin-guest']
})

useHead({
  title: 'Executive Sign In'
})

const email = ref('admin@ifiruled.world')
const password = ref('presidential2026')

const { authLoading, authError, login } = useAuth()

const handleLoginSubmit = async () => {
  await login(email.value, password.value)
}
</script>

<style scoped>
.admin-login-screen {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 1.5rem;
  background: radial-gradient(circle at center, #0B172E 0%, #040812 100%);
}

.login-card {
  max-width: 440px;
  width: 100%;
  padding: 2.75rem 2.5rem;
  background: rgba(8, 17, 34, 0.95);
  border: 1px solid rgba(212, 160, 45, 0.2);
  border-radius: 12px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6);
}

.admin-login-logo {
  height: 44px;
  width: auto;
  margin-bottom: 1.25rem;
}

.auth-security-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.25rem 0.65rem;
  background: rgba(212, 160, 45, 0.1);
  border: 1px solid rgba(212, 160, 45, 0.25);
  border-radius: 9999px;
  color: var(--color-gold-300);
  font-size: 0.72rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 0.85rem;
}

.login-title {
  font-size: 1.45rem;
  font-family: var(--font-heading);
  color: #F8FAFC;
  margin-bottom: 0.35rem;
}

.login-sub {
  font-size: 0.82rem;
  color: #94A3B8;
  line-height: 1.5;
  margin-bottom: 1.5rem;
}

.input-with-icon {
  position: relative;
  display: flex;
  align-items: center;
}

.field-icon {
  position: absolute;
  left: 0.9rem;
  color: #64748B;
  pointer-events: none;
}

.form-control.with-icon {
  padding-left: 2.6rem;
}

.submit-btn {
  padding: 0.8rem 1rem;
  font-size: 0.9rem;
  font-weight: 600;
  letter-spacing: 0.02em;
}

.login-error-msg {
  color: #F87171;
  font-size: 0.82rem;
  margin-top: 0.75rem;
  text-align: center;
  background: rgba(239, 68, 68, 0.08);
  border: 1px solid rgba(239, 68, 68, 0.2);
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
}

.demo-credentials-hint {
  margin-top: 1.75rem;
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 6px;
  font-size: 0.75rem;
  color: #94A3B8;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.hint-label {
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #64748B;
  font-weight: 600;
}

.demo-credentials-hint code {
  color: var(--color-gold-300);
  background: rgba(255, 255, 255, 0.05);
  padding: 0.15rem 0.35rem;
  border-radius: 4px;
}

.back-home-link {
  margin-top: 1.25rem;
}

.return-link {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  color: #64748B;
  font-size: 0.8rem;
  text-decoration: none;
  transition: color var(--transition-fast);
}

.return-link:hover {
  color: var(--color-gold-300);
}
</style>
