<template>
  <header :class="['site-header', { 'is-scrolled': isScrolled }]">
    <div class="container header-inner">
      <!-- Brand Logo -->
      <NuxtLink to="/" class="brand-link" aria-label="If I Ruled Homepage">
        <img 
          src="/logo-navy.png" 
          alt="If I Ruled Logo" 
          class="brand-logo-img"
        />
      </NuxtLink>

      <!-- Desktop Nav -->
      <nav class="desktop-nav">
        <NuxtLink to="/" class="nav-item">{{ t.nav.home }}</NuxtLink>
        <NuxtLink to="/episodes" class="nav-item">{{ t.nav.episodes }}</NuxtLink>
        <NuxtLink to="/manifesto" class="nav-item">{{ t.nav.manifesto }}</NuxtLink>
        <NuxtLink to="/guests" class="nav-item">{{ t.nav.guests }}</NuxtLink>
        <NuxtLink to="/about" class="nav-item">{{ t.nav.about }}</NuxtLink>
        <NuxtLink to="/partners" class="nav-item">{{ t.nav.partners }}</NuxtLink>
        <NuxtLink to="/contact" class="nav-item">{{ t.nav.contact }}</NuxtLink>
      </nav>

      <!-- Header Actions -->
      <div class="header-actions">
        <!-- Language Switcher -->
        <button 
          @click="toggleLanguage" 
          class="lang-btn"
          :title="currentLang === 'en' ? 'বাংলা ভাষায় পরিবর্তন করুন' : 'Switch to English'"
        >
          <span :class="['lang-opt', { active: currentLang === 'en' }]">EN</span>
          <span class="lang-divider">/</span>
          <span :class="['lang-opt', { active: currentLang === 'bn' }]">বাংলা</span>
        </button>

        <!-- CTA Button -->
        <NuxtLink to="/apply" class="btn btn-gold btn-sm apply-nav-cta">
          <Mic :size="14" />
          <span>{{ t.nav.apply }}</span>
        </NuxtLink>

        <!-- Mobile Menu Toggle -->
        <button 
          @click="mobileMenuOpen = !mobileMenuOpen" 
          class="mobile-toggle" 
          aria-label="Toggle navigation menu"
        >
          <span :class="['hamburger', { open: mobileMenuOpen }]"></span>
        </button>
      </div>
    </div>

    <!-- Mobile Drawer -->
    <div :class="['mobile-drawer', { open: mobileMenuOpen }]">
      <div class="mobile-drawer-inner">
        <NuxtLink @click="mobileMenuOpen = false" to="/" class="mobile-nav-item">{{ t.nav.home }}</NuxtLink>
        <NuxtLink @click="mobileMenuOpen = false" to="/episodes" class="mobile-nav-item">{{ t.nav.episodes }}</NuxtLink>
        <NuxtLink @click="mobileMenuOpen = false" to="/manifesto" class="mobile-nav-item">{{ t.nav.manifesto }}</NuxtLink>
        <NuxtLink @click="mobileMenuOpen = false" to="/guests" class="mobile-nav-item">{{ t.nav.guests }}</NuxtLink>
        <NuxtLink @click="mobileMenuOpen = false" to="/about" class="mobile-nav-item">{{ t.nav.about }}</NuxtLink>
        <NuxtLink @click="mobileMenuOpen = false" to="/partners" class="mobile-nav-item">{{ t.nav.partners }}</NuxtLink>
        <NuxtLink @click="mobileMenuOpen = false" to="/contact" class="mobile-nav-item">{{ t.nav.contact }}</NuxtLink>
        
        <div class="mobile-drawer-footer">
          <NuxtLink @click="mobileMenuOpen = false" to="/apply" class="btn btn-gold w-full">
            <span>{{ t.nav.apply }}</span>
          </NuxtLink>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Mic } from 'lucide-vue-next'
import { useLanguage } from '~/composables/useLanguage'

const { currentLang, toggleLanguage, t } = useLanguage()
const isScrolled = ref(false)
const mobileMenuOpen = ref(false)

const handleScroll = () => {
  if (typeof window !== 'undefined') {
    isScrolled.value = window.scrollY > 20
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.site-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  background: rgba(7, 14, 29, 0.75);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  border-bottom: 1px solid rgba(212, 160, 45, 0.15);
  transition: all var(--transition-base);
}

.site-header.is-scrolled {
  background: rgba(5, 11, 23, 0.94);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  border-bottom-color: var(--border-gold-medium);
}

.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;
}

.brand-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.brand-logo-img {
  height: 48px;
  width: auto;
  object-fit: contain;
  transition: transform var(--transition-base);
}

.brand-link:hover .brand-logo-img {
  transform: scale(1.03);
}

.desktop-nav {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.nav-item {
  font-size: 0.925rem;
  font-weight: 500;
  color: #CBD5E1;
  padding: 0.4rem 0.6rem;
  position: relative;
  transition: color var(--transition-fast);
}

.nav-item:hover,
.nav-item.router-link-exact-active {
  color: var(--color-gold-400);
}

.nav-item.router-link-exact-active::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0.6rem;
  right: 0.6rem;
  height: 2px;
  background: var(--color-gold-400);
  border-radius: 2px;
  box-shadow: 0 0 8px var(--color-gold-400);
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.lang-btn {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid var(--border-gold-subtle);
  color: var(--color-cream-200);
  border-radius: var(--radius-full);
  padding: 0.35rem 0.8rem;
  font-size: 0.8rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  transition: all var(--transition-fast);
}

.lang-btn:hover {
  background: rgba(212, 160, 45, 0.15);
  border-color: var(--color-gold-400);
}

.lang-opt {
  opacity: 0.6;
  font-weight: 500;
}

.lang-opt.active {
  opacity: 1;
  color: var(--color-gold-400);
  font-weight: 700;
}

.lang-divider {
  opacity: 0.4;
}

.apply-nav-cta {
  display: inline-flex;
}

.mobile-toggle {
  display: none;
  background: transparent;
  border: none;
  width: 40px;
  height: 40px;
  cursor: pointer;
  position: relative;
  align-items: center;
  justify-content: center;
}

.hamburger {
  width: 22px;
  height: 2px;
  background: var(--color-cream-100);
  position: relative;
  transition: all 0.3s ease;
}

.hamburger::before,
.hamburger::after {
  content: '';
  position: absolute;
  width: 22px;
  height: 2px;
  background: var(--color-cream-100);
  transition: all 0.3s ease;
}

.hamburger::before {
  top: -7px;
}

.hamburger::after {
  top: 7px;
}

.hamburger.open {
  background: transparent;
}

.hamburger.open::before {
  top: 0;
  transform: rotate(45deg);
  background: var(--color-gold-400);
}

.hamburger.open::after {
  top: 0;
  transform: rotate(-45deg);
  background: var(--color-gold-400);
}

/* Mobile Drawer */
.mobile-drawer {
  position: fixed;
  top: 80px;
  left: 0;
  width: 100%;
  height: calc(100vh - 80px);
  background: rgba(7, 14, 29, 0.98);
  backdrop-filter: blur(24px);
  transform: translateY(-100%);
  opacity: 0;
  pointer-events: none;
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  overflow-y: auto;
  border-bottom: 2px solid var(--border-gold-medium);
}

.mobile-drawer.open {
  transform: translateY(0);
  opacity: 1;
  pointer-events: auto;
}

.mobile-drawer-inner {
  display: flex;
  flex-direction: column;
  padding: 2rem 1.5rem;
  gap: 1rem;
}

.mobile-nav-item {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-cream-100);
  padding: 0.75rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.mobile-nav-item:hover {
  color: var(--color-gold-400);
}

.mobile-drawer-footer {
  margin-top: 1.5rem;
}

.w-full {
  width: 100%;
}

@media (max-width: 960px) {
  .desktop-nav {
    display: none;
  }
  .mobile-toggle {
    display: flex;
  }
  .apply-nav-cta {
    display: none;
  }
}
</style>
