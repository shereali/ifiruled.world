import { ref, computed } from 'vue'
import { apiRequest } from './useApi'

export interface AdminUser {
  id: number
  name: string
  email: string
}

export function useAuth() {
  // SSR-Compatible Cookies (7-day persistence, no page reload flicker)
  const token = useCookie<string | null>('ifiruled_admin_token', {
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
    sameSite: 'lax'
  })

  const user = useCookie<AdminUser | null>('ifiruled_admin_user', {
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
    sameSite: 'lax'
  })

  const authLoading = ref(false)
  const authError = ref('')

  const isAuthenticated = computed(() => {
    return !!token.value
  })

  const login = async (email: string, pass: string) => {
    authLoading.value = true
    authError.value = ''

    try {
      const res = await apiRequest<{ token: string; user: AdminUser }>('/auth/login', {
        method: 'POST',
        body: JSON.stringify({
          email: email.trim(),
          password: pass
        })
      })

      const tokenVal = (res as any).token || res.data?.token
      const userVal = (res as any).user || res.data?.user

      if (res.success && tokenVal) {
        token.value = tokenVal
        user.value = userVal || { id: 1, name: 'Executive Administrator', email: email.trim() }
        
        if (typeof document !== 'undefined') {
          document.cookie = `ifiruled_admin_token=${tokenVal}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`
        }

        authLoading.value = false
        
        if (typeof window !== 'undefined') {
          window.location.href = '/admin'
        } else {
          await navigateTo('/admin')
        }
        return { success: true }
      } else {
        authError.value = res.message || 'Invalid presidential credentials.'
        authLoading.value = false
        return { success: false, message: authError.value }
      }
    } catch (err: any) {
      authError.value = err.message || 'Connection error with authentication server.'
      authLoading.value = false
      return { success: false, message: authError.value }
    }
  }

  const logout = async () => {
    const currentToken = token.value

    // 1. Immediately delete from browser document.cookie
    if (typeof document !== 'undefined') {
      document.cookie = 'ifiruled_admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; Max-Age=0; SameSite=Lax'
      document.cookie = 'ifiruled_admin_user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; Max-Age=0; SameSite=Lax'
      try {
        localStorage.removeItem('ifiruled_admin_auth')
      } catch (e) {}
    }

    // 2. Clear reactive Nuxt cookies
    token.value = null
    user.value = null

    // 3. Notify backend Sanctum to revoke token (non-blocking)
    if (currentToken) {
      apiRequest('/auth/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${currentToken}`
        }
      }).catch(() => {})
    }

    // 4. Force clean page reload to /admin/login
    if (typeof window !== 'undefined') {
      window.location.href = '/admin/login'
    } else {
      await navigateTo('/admin/login')
    }
  }

  return {
    token,
    user,
    isAuthenticated,
    authLoading,
    authError,
    login,
    logout
  }
}
