<template>
  <footer class="site-footer">
    <!-- Ambient Gold Top Border -->
    <div class="footer-gold-line"></div>

    <div class="container footer-container">
      <!-- Newsletter Row / Join the Cabinet -->
      <div class="cabinet-signup-card">
        <div class="cabinet-signup-info">
          <span class="topic-tag">{{ t.newsletter.tag }}</span>
          <h3 class="cabinet-title">{{ t.newsletter.title }}</h3>
          <p class="cabinet-subtitle">{{ t.newsletter.subtitle }}</p>
        </div>

        <form @submit.prevent="handleSubscribe" class="cabinet-form">
          <div class="form-input-group">
            <input 
              v-model="emailInput" 
              type="email" 
              required 
              :placeholder="t.newsletter.placeholder" 
              class="cabinet-input"
            />
            <button type="submit" class="btn btn-gold" :disabled="isSubmitting">
              <span>{{ isSubmitting ? 'Joining...' : t.newsletter.button }}</span>
            </button>
          </div>
          <p v-if="subscribed" class="subscribed-feedback">
            ✓ {{ t.newsletter.success }}
          </p>
        </form>
      </div>

      <!-- Main Footer Links Grid -->
      <div class="footer-links-grid">
        <!-- Col 1: Brand & Tagline -->
        <div class="footer-col brand-col">
          <img src="/logo-navy.png" alt="If I Ruled Logo" class="footer-logo" />
          <p class="footer-tagline">
            "{{ t.footer.tagline }}"
          </p>
          <p class="footer-bio">
            {{ t.footer.bio }}
          </p>
          <!-- Social Icons -->
          <div class="footer-socials">
            <a href="https://youtube.com/@ifiruled" target="_blank" rel="noopener" class="social-badge" title="YouTube">
              <span>YouTube</span>
            </a>
            <a href="https://facebook.com/ifiruled" target="_blank" rel="noopener" class="social-badge" title="Facebook">
              <span>Facebook</span>
            </a>
            <a href="https://instagram.com/ifiruled" target="_blank" rel="noopener" class="social-badge" title="Instagram">
              <span>Instagram</span>
            </a>
            <a href="https://linkedin.com/company/ifiruled" target="_blank" rel="noopener" class="social-badge" title="LinkedIn">
              <span>LinkedIn</span>
            </a>
            <a href="https://x.com/ifiruled" target="_blank" rel="noopener" class="social-badge" title="X (Twitter)">
              <span>X</span>
            </a>
          </div>
        </div>

        <!-- Col 2: Show Navigation -->
        <div class="footer-col">
          <h4 class="col-title">{{ t.footer.navHeading }}</h4>
          <ul class="col-links">
            <li><NuxtLink to="/">{{ t.footer.homeLink }}</NuxtLink></li>
            <li><NuxtLink to="/episodes">{{ t.footer.episodesLink }}</NuxtLink></li>
            <li><NuxtLink to="/manifesto">{{ t.footer.manifestoLink }}</NuxtLink></li>
            <li><NuxtLink to="/guests">{{ t.footer.guestsLink }}</NuxtLink></li>
            <li><NuxtLink to="/apply">{{ t.footer.applyLink }}</NuxtLink></li>
          </ul>
        </div>

        <!-- Col 3: About & Network -->
        <div class="footer-col">
          <h4 class="col-title">{{ t.footer.orgHeading }}</h4>
          <ul class="col-links">
            <li><NuxtLink to="/about">{{ t.footer.aboutLink }}</NuxtLink></li>
            <li><NuxtLink to="/partners">{{ t.footer.partnersLink }}</NuxtLink></li>
            <li><NuxtLink to="/about#press">{{ t.footer.pressKitLink }}</NuxtLink></li>
            <li><NuxtLink to="/contact">{{ t.footer.mediaLink }}</NuxtLink></li>
            <li><NuxtLink to="/contact">{{ t.footer.feedbackLink }}</NuxtLink></li>
          </ul>
        </div>

        <!-- Col 4: Legal & Standards -->
        <div class="footer-col">
          <h4 class="col-title">{{ t.footer.legalHeading }}</h4>
          <ul class="col-links">
            <li><NuxtLink to="/legal/privacy">{{ t.footer.privacyLink }}</NuxtLink></li>
            <li><NuxtLink to="/legal/terms">{{ t.footer.termsLink }}</NuxtLink></li>
            <li><NuxtLink to="/legal/guidelines">{{ t.footer.guidelinesLink }}</NuxtLink></li>
            <li><NuxtLink to="/admin" class="gold-link">{{ t.footer.adminLink }}</NuxtLink></li>
            <li><span class="live-schedule-badge">{{ t.footer.broadcastSchedule }}</span></li>
          </ul>
        </div>
      </div>

      <!-- Bottom Copyright Bar -->
      <div class="footer-bottom-bar">
        <p class="copyright-text">
          &copy; {{ new Date().getFullYear() }} If I Ruled (ifiruled.world). {{ t.footer.copyright }}
        </p>
        <div class="footer-domain-badge">
          <span>{{ t.footer.officialDomain }}: <strong>ifiruled.world</strong></span>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useLanguage } from '~/composables/useLanguage'

const { t } = useLanguage()
const emailInput = ref('')
const isSubmitting = ref(false)
const subscribed = ref(false)

const handleSubscribe = () => {
  if (!emailInput.value) return
  isSubmitting.value = true
  setTimeout(() => {
    isSubmitting.value = false
    subscribed.value = true
    emailInput.value = ''
  }, 600)
}
</script>

<style scoped>
.site-footer {
  background: #050B17;
  position: relative;
  margin-top: 5rem;
  border-top: 1px solid var(--border-gold-subtle);
  padding-bottom: 2.5rem;
}

.footer-gold-line {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--color-gold-400), transparent);
}

.footer-container {
  padding-top: 4rem;
}

.cabinet-signup-card {
  background: linear-gradient(135deg, rgba(17, 34, 68, 0.6) 0%, rgba(8, 17, 34, 0.9) 100%);
  border: 1px solid var(--border-gold-medium);
  border-radius: var(--radius-lg);
  padding: 2.5rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;
  margin-bottom: 4rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
}

.cabinet-title {
  font-size: 1.5rem;
  color: var(--color-cream-50);
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}

.cabinet-subtitle {
  color: var(--color-navy-200);
  font-size: 0.9rem;
}

.form-input-group {
  display: flex;
  gap: 0.75rem;
}

.cabinet-input {
  flex-grow: 1;
  background: rgba(5, 11, 23, 0.8);
  border: 1px solid var(--border-gold-subtle);
  border-radius: var(--radius-sm);
  padding: 0.8rem 1.25rem;
  color: var(--color-cream-50);
  font-family: var(--font-body);
}

.cabinet-input:focus {
  outline: none;
  border-color: var(--color-gold-400);
}

.subscribed-feedback {
  color: #10B981;
  font-size: 0.85rem;
  margin-top: 0.5rem;
}

.footer-links-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 3rem;
  padding-bottom: 3.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.brand-col {
  padding-right: 1.5rem;
}

.footer-logo {
  height: 38px;
  width: auto;
  margin-bottom: 1.25rem;
}

.footer-tagline {
  font-family: var(--font-heading);
  color: var(--color-gold-400);
  font-size: 0.95rem;
  font-style: italic;
  margin-bottom: 0.75rem;
}

.footer-bio {
  color: var(--color-navy-300);
  font-size: 0.85rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.footer-socials {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.social-badge {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: var(--color-navy-200);
  padding: 0.35rem 0.75rem;
  border-radius: var(--radius-full);
  font-size: 0.75rem;
  text-decoration: none;
  transition: all var(--transition-fast);
}

.social-badge:hover {
  background: rgba(212, 160, 45, 0.15);
  border-color: var(--color-gold-400);
  color: var(--color-gold-300);
}

.col-title {
  font-family: var(--font-heading);
  font-size: 1rem;
  color: var(--color-cream-50);
  margin-bottom: 1.25rem;
  letter-spacing: 0.05em;
}

.col-links {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
}

.col-links a {
  color: var(--color-navy-300);
  text-decoration: none;
  font-size: 0.85rem;
  transition: color var(--transition-fast);
}

.col-links a:hover {
  color: var(--color-gold-400);
}

.gold-link {
  color: var(--color-gold-400) !important;
  font-weight: 600;
}

.live-schedule-badge {
  display: inline-block;
  background: rgba(239, 68, 68, 0.12);
  border: 1px solid rgba(239, 68, 68, 0.3);
  color: #FCA5A5;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.72rem;
  font-weight: 600;
  margin-top: 0.5rem;
}

.footer-bottom-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 2rem;
  font-size: 0.8rem;
  color: var(--color-navy-400);
}

.footer-domain-badge {
  color: var(--color-gold-400);
}

@media (max-width: 960px) {
  .cabinet-signup-card {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .footer-links-grid {
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }
  
  .brand-col {
    grid-column: span 2;
  }
}

@media (max-width: 600px) {
  .footer-links-grid {
    grid-template-columns: 1fr;
  }
  
  .brand-col {
    grid-column: span 1;
  }
  
  .form-input-group {
    flex-direction: column;
  }
  
  .footer-bottom-bar {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
}
</style>
