/**
 * Unified API Client for If I Ruled (Frontend & Admin)
 * Targets Laravel 13 backend at http://127.0.0.1:8000/api
 */

export const API_BASE = 'http://127.0.0.1:8000/api'

export async function apiRequest<T = any>(endpoint: string, options: RequestInit = {}): Promise<{ success: boolean; data?: T; message?: string; token?: string; user?: any }> {
  const url = endpoint.startsWith('http') ? endpoint : `${API_BASE}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`

  const defaultHeaders: Record<string, string> = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }

  // Attach Sanctum Bearer Token from Cookie if present
  try {
    const adminToken = useCookie('ifiruled_admin_token').value
    if (adminToken) {
      defaultHeaders['Authorization'] = `Bearer ${adminToken}`
    }
  } catch (e) {
    // Non-Nuxt context fallback
  }

  try {
    const res = await fetch(url, {
      ...options,
      headers: {
        ...defaultHeaders,
        ...(options.headers || {})
      }
    })

    const json = await res.json()
    if (!res.ok) {
      return {
        success: false,
        message: json.message || `Request failed with status ${res.status}`
      }
    }
    return json
  } catch (error: any) {
    console.error(`[API Error] ${endpoint}:`, error)
    return {
      success: false,
      message: error.message || 'Network request failed'
    }
  }
}
