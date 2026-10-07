import { ref, computed } from 'vue'
import { apiRequest } from './useApi'
import type { Episode } from './useEpisodes'
import type { ManifestoIdea } from './useIdeas'

export interface AdminStats {
  total_episodes: number
  total_applications: number
  pending_applications: number
  shortlisted_applications: number
  total_ideas: number
  pending_ideas: number
  total_subscribers: number
  total_contacts: number
  is_live: boolean
  live_stream_url: string
  next_broadcast_datetime: string
  broadcast_notice: string
}

export interface CandidateApplication {
  id: number
  full_name: string
  age: number
  email: string
  phone: string
  location: string
  topic: string
  first_decree_title: string
  manifesto: string
  pitch_url?: string
  linkedin?: string
  social_handle?: string
  status: 'pending' | 'shortlisted' | 'scheduled' | 'rejected'
  created_at: string
}

export interface SubscriberItem {
  id: number
  email: string
  is_active: boolean
  created_at: string
}

export interface ContactDispatch {
  id: number
  name: string
  email: string
  inquiry_type: string
  message: string
  created_at: string
}

export function useAdmin() {
  const loading = ref(false)
  const stats = ref<AdminStats>({
    total_episodes: 6,
    total_applications: 2,
    pending_applications: 1,
    shortlisted_applications: 1,
    total_ideas: 4,
    pending_ideas: 0,
    total_subscribers: 4,
    total_contacts: 2,
    is_live: false,
    live_stream_url: 'https://youtube.com/live/dQw4w9WgXcQ',
    next_broadcast_datetime: '2026-09-03 20:00:00',
    broadcast_notice: 'Every Thursday • 8:00 PM BST'
  })

  const adminEpisodes = ref<Episode[]>([])
  const applications = ref<CandidateApplication[]>([])
  const adminIdeas = ref<ManifestoIdea[]>([])
  const subscribers = ref<SubscriberItem[]>([])
  const contacts = ref<ContactDispatch[]>([])

  // Fetch Dashboard Metrics
  const fetchStats = async () => {
    const res = await apiRequest<AdminStats>('/admin/stats')
    if (res.success && res.data) {
      stats.value = res.data
    }
  }

  // Episodes CRUD
  const fetchAdminEpisodes = async () => {
    loading.value = true
    const res = await apiRequest<any[]>('/admin/episodes')
    if (res.success && res.data) {
      adminEpisodes.value = res.data.map(e => ({
        id: String(e.id),
        slug: e.slug,
        episodeNumber: e.episode_number,
        title: e.title,
        guestName: e.guest_name,
        guestRole: e.guest_role,
        guestPhoto: e.guest_photo || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
        airDate: e.air_date,
        duration: e.duration,
        topic: e.topic,
        executiveSummary: e.executive_summary,
        keyDecrees: Array.isArray(e.key_decrees) ? e.key_decrees : JSON.parse(e.key_decrees || '[]'),
        youtubeId: e.youtube_id,
        viewsCount: e.views_count,
        featured: !!e.featured,
        quote: e.quote
      }))
    }
    loading.value = false
  }

  const createEpisode = async (episodeData: any) => {
    const res = await apiRequest('/admin/episodes', {
      method: 'POST',
      body: JSON.stringify({
        title: episodeData.title,
        episode_number: episodeData.episodeNumber,
        guest_name: episodeData.guestName,
        guest_role: episodeData.guestRole,
        guest_photo: episodeData.guestPhoto,
        air_date: episodeData.airDate,
        duration: episodeData.duration,
        topic: episodeData.topic,
        executive_summary: episodeData.executiveSummary,
        key_decrees: episodeData.keyDecrees,
        youtube_id: episodeData.youtubeId,
        quote: episodeData.quote,
        featured: !!episodeData.featured
      })
    })
    if (res.success) {
      await fetchAdminEpisodes()
      await fetchStats()
    }
    return res
  }

  const updateEpisode = async (id: string | number, episodeData: any) => {
    const res = await apiRequest(`/admin/episodes/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        title: episodeData.title,
        episode_number: episodeData.episodeNumber,
        guest_name: episodeData.guestName,
        guest_role: episodeData.guestRole,
        guest_photo: episodeData.guestPhoto,
        air_date: episodeData.airDate,
        duration: episodeData.duration,
        topic: episodeData.topic,
        executive_summary: episodeData.executiveSummary,
        key_decrees: episodeData.keyDecrees,
        youtube_id: episodeData.youtubeId,
        quote: episodeData.quote,
        featured: !!episodeData.featured
      })
    })
    if (res.success) {
      await fetchAdminEpisodes()
    }
    return res
  }

  const toggleFeaturedEpisode = async (id: string | number) => {
    const res = await apiRequest(`/admin/episodes/${id}/toggle-featured`, {
      method: 'POST'
    })
    if (res.success) {
      await fetchAdminEpisodes()
    }
    return res
  }

  const deleteEpisode = async (id: string | number) => {
    const res = await apiRequest(`/admin/episodes/${id}`, {
      method: 'DELETE'
    })
    if (res.success) {
      await fetchAdminEpisodes()
      await fetchStats()
    }
    return res
  }

  // Applications
  const fetchApplications = async (status: string = 'all') => {
    loading.value = true
    const res = await apiRequest<CandidateApplication[]>(`/admin/applications${status !== 'all' ? `?status=${status}` : ''}`)
    if (res.success && res.data) {
      applications.value = res.data
    }
    loading.value = false
  }

  const updateApplicationStatus = async (id: number, status: string) => {
    const res = await apiRequest(`/admin/applications/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status })
    })
    if (res.success) {
      const app = applications.value.find(a => a.id === id)
      if (app) app.status = status as any
      await fetchStats()
    }
    return res
  }

  const deleteApplication = async (id: number) => {
    const res = await apiRequest(`/admin/applications/${id}`, {
      method: 'DELETE'
    })
    if (res.success) {
      applications.value = applications.value.filter(a => a.id !== id)
      await fetchStats()
    }
    return res
  }

  // Ideas Moderation
  const fetchAdminIdeas = async () => {
    loading.value = true
    const res = await apiRequest<any[]>('/admin/ideas')
    if (res.success && res.data) {
      adminIdeas.value = res.data.map(i => ({
        id: String(i.id),
        authorName: i.author_name,
        authorRole: i.author_role,
        location: i.location,
        topic: i.topic,
        title: i.title,
        content: i.content,
        upvotes: i.upvotes,
        submittedAt: new Date(i.created_at).toLocaleDateString(),
        isApproved: !!i.is_approved
      }))
    }
    loading.value = false
  }

  const toggleIdeaApproval = async (id: string | number) => {
    const res = await apiRequest(`/admin/ideas/${id}/toggle-approval`, {
      method: 'PUT'
    })
    if (res.success) {
      const idea = adminIdeas.value.find(i => i.id === String(id))
      if (idea) idea.isApproved = !idea.isApproved
      await fetchStats()
    }
    return res
  }

  const deleteIdea = async (id: string | number) => {
    const res = await apiRequest(`/admin/ideas/${id}`, {
      method: 'DELETE'
    })
    if (res.success) {
      adminIdeas.value = adminIdeas.value.filter(i => i.id !== String(id))
      await fetchStats()
    }
    return res
  }

  // Subscribers
  const fetchSubscribers = async () => {
    loading.value = true
    const res = await apiRequest<SubscriberItem[]>('/admin/subscribers')
    if (res.success && res.data) {
      subscribers.value = res.data
    }
    loading.value = false
  }

  const deleteSubscriber = async (id: number) => {
    const res = await apiRequest(`/admin/subscribers/${id}`, {
      method: 'DELETE'
    })
    if (res.success) {
      subscribers.value = subscribers.value.filter(s => s.id !== id)
      await fetchStats()
    }
    return res
  }

  // Contacts
  const fetchContacts = async () => {
    loading.value = true
    const res = await apiRequest<ContactDispatch[]>('/admin/contacts')
    if (res.success && res.data) {
      contacts.value = res.data
    }
    loading.value = false
  }

  const deleteContact = async (id: number) => {
    const res = await apiRequest(`/admin/contacts/${id}`, {
      method: 'DELETE'
    })
    if (res.success) {
      contacts.value = contacts.value.filter(c => c.id !== id)
      await fetchStats()
    }
    return res
  }

  // Settings
  const updateBroadcastSettings = async (settingsData: Partial<AdminStats>) => {
    const res = await apiRequest('/admin/settings', {
      method: 'POST',
      body: JSON.stringify({
        is_live: settingsData.is_live,
        live_stream_url: settingsData.live_stream_url,
        next_broadcast_datetime: settingsData.next_broadcast_datetime,
        broadcast_notice: settingsData.broadcast_notice
      })
    })
    if (res.success && res.data) {
      stats.value.is_live = res.data.is_live
      stats.value.live_stream_url = res.data.live_stream_url
      stats.value.next_broadcast_datetime = res.data.next_broadcast_datetime
      stats.value.broadcast_notice = res.data.broadcast_notice
    }
    return res
  }

  return {
    loading,
    stats,
    adminEpisodes,
    applications,
    adminIdeas,
    subscribers,
    contacts,
    fetchStats,
    fetchAdminEpisodes,
    createEpisode,
    updateEpisode,
    toggleFeaturedEpisode,
    deleteEpisode,
    fetchApplications,
    updateApplicationStatus,
    deleteApplication,
    fetchAdminIdeas,
    toggleIdeaApproval,
    deleteIdea,
    fetchSubscribers,
    deleteSubscriber,
    fetchContacts,
    deleteContact,
    updateBroadcastSettings
  }
}
