<template>
  <div class="admin-portal-layout">
    <!-- Admin Top Navbar -->
    <header class="admin-topbar">
      <div class="admin-topbar-inner">
        <div class="brand-group">
          <NuxtLink to="/admin" class="brand-link">
            <img src="/logo-mark.png" alt="If I Ruled" class="topbar-logo-mark" />
            <div class="brand-text">
              <span class="topbar-title">IF I RULED</span>
              <span class="desk-tag">Studio Admin</span>
            </div>
          </NuxtLink>
        </div>

        <div class="topbar-actions">
          <NuxtLink to="/" target="_blank" class="btn btn-glass btn-sm action-link">
            <ExternalLink :size="14" class="icon-svg" />
            <span>Public Site</span>
          </NuxtLink>
          <div class="admin-user-pill" v-if="user">
            <span class="user-avatar-initial">{{ user.name ? user.name.charAt(0) : 'A' }}</span>
            <span class="user-name">{{ user.name }}</span>
          </div>
          <button @click="handleLogout" class="btn btn-outline-gold btn-sm logout-btn">
            <LogOut :size="14" class="icon-svg" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </header>

    <div class="admin-main-container">
      <!-- Admin Sidebar Navigation -->
      <aside class="admin-sidebar">
        <div class="sidebar-section-label">Management</div>
        <nav class="sidebar-nav">
          <NuxtLink to="/admin" exact-active-class="active" class="nav-btn">
            <LayoutDashboard :size="18" class="nav-icon" />
            <span>Overview</span>
          </NuxtLink>

          <NuxtLink to="/admin/episodes" active-class="active" class="nav-btn">
            <Video :size="18" class="nav-icon" />
            <span>Episodes</span>
          </NuxtLink>

          <NuxtLink to="/admin/applications" active-class="active" class="nav-btn">
            <Users :size="18" class="nav-icon" />
            <span>Candidates</span>
          </NuxtLink>

          <NuxtLink to="/admin/manifesto" active-class="active" class="nav-btn">
            <BookOpen :size="18" class="nav-icon" />
            <span>Manifesto</span>
          </NuxtLink>

          <NuxtLink to="/admin/subscribers" active-class="active" class="nav-btn">
            <Mail :size="18" class="nav-icon" />
            <span>Subscribers</span>
          </NuxtLink>

          <NuxtLink to="/admin/contacts" active-class="active" class="nav-btn">
            <MessageSquare :size="18" class="nav-icon" />
            <span>Inquiries</span>
          </NuxtLink>

          <NuxtLink to="/admin/broadcast" active-class="active" class="nav-btn">
            <Radio :size="18" class="nav-icon" />
            <span>Broadcast Control</span>
          </NuxtLink>
        </nav>
      </aside>

      <!-- Main Admin Content Area -->
      <main class="admin-content-pane">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { 
  LayoutDashboard, 
  Video, 
  Users, 
  BookOpen, 
  Mail, 
  MessageSquare, 
  Radio, 
  ExternalLink, 
  LogOut 
} from 'lucide-vue-next'
import { useAuth } from '~/composables/useAuth'

const { user, logout } = useAuth()

const handleLogout = async () => {
  await logout()
}
</script>

<style scoped>
.admin-portal-layout {
  min-height: 100vh;
  background: #060D1A;
  color: #E2E8F0;
  display: flex;
  flex-direction: column;
}

.admin-topbar {
  background: rgba(8, 17, 34, 0.95);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  position: sticky;
  top: 0;
  z-index: 50;
  backdrop-filter: blur(16px);
}

.admin-topbar-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.85rem 1.75rem;
}

.brand-link {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  text-decoration: none;
}

.topbar-logo-mark {
  height: 32px;
  width: auto;
}

.brand-text {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.topbar-title {
  font-size: 1.05rem;
  font-family: var(--font-heading);
  letter-spacing: 0.08em;
  font-weight: 800;
  color: #F8FAFC;
}

.desk-tag {
  font-size: 0.7rem;
  background: rgba(212, 160, 45, 0.15);
  color: var(--color-gold-300);
  border: 1px solid rgba(212, 160, 45, 0.3);
  padding: 0.15rem 0.45rem;
  border-radius: 4px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.topbar-actions {
  display: flex;
  align-items: center;
  gap: 0.85rem;
}

.action-link, .logout-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.8rem;
  padding: 0.4rem 0.75rem;
}

.admin-user-pill {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  padding: 0.3rem 0.75rem 0.3rem 0.35rem;
  border-radius: 9999px;
  font-size: 0.8rem;
  color: #CBD5E1;
  font-weight: 500;
}

.user-avatar-initial {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: var(--color-gold-500);
  color: #060D1A;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 800;
}

.admin-main-container {
  display: grid;
  grid-template-columns: 240px 1fr;
  flex: 1;
}

.admin-sidebar {
  background: #081122;
  border-right: 1px solid rgba(255, 255, 255, 0.06);
  padding: 1.75rem 0.85rem;
}

.sidebar-section-label {
  font-size: 0.68rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #64748B;
  padding: 0 0.75rem;
  margin-bottom: 0.75rem;
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.nav-btn {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  padding: 0.7rem 0.85rem;
  background: transparent;
  border: 1px solid transparent;
  border-radius: 6px;
  color: #94A3B8;
  font-family: var(--font-body);
  font-size: 0.85rem;
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;
  text-align: left;
  transition: all var(--transition-fast);
}

.nav-btn:hover {
  background: rgba(255, 255, 255, 0.04);
  color: #F8FAFC;
}

.nav-btn.active {
  background: rgba(212, 160, 45, 0.12);
  border-color: rgba(212, 160, 45, 0.25);
  color: var(--color-gold-300);
  font-weight: 600;
}

.nav-icon {
  flex-shrink: 0;
}

.admin-content-pane {
  padding: 2.25rem 2.75rem;
  position: relative;
  overflow-y: auto;
}

@media (max-width: 960px) {
  .admin-main-container {
    grid-template-columns: 1fr;
  }
  .admin-sidebar {
    border-right: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  }
  .admin-content-pane {
    padding: 1.5rem;
  }
}
</style>
