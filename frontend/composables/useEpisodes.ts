import { ref, computed } from 'vue'
import { apiRequest } from './useApi'
import { useLanguage } from './useLanguage'

export interface Episode {
  id: string
  slug: string
  episodeNumber: number
  title: string
  titleBn?: string
  guestName: string
  guestNameBn?: string
  guestRole: string
  guestRoleBn?: string
  guestPhoto: string
  airDate: string
  airDateBn?: string
  duration: string
  topic: 'Economy' | 'Security' | 'Education' | 'Environment' | 'Foreign Policy' | 'Social Justice'
  executiveSummary: string
  executiveSummaryBn?: string
  keyDecrees: string[]
  keyDecreesBn?: string[]
  youtubeId: string
  viewsCount: number
  featured?: boolean
  quote: string
  quoteBn?: string
}

export const topicTranslations: Record<string, string> = {
  'All': 'সকল খাত',
  'Economy': 'অর্থনীতি',
  'Education': 'শিক্ষা',
  'Security': 'নিরাপত্তা',
  'Environment': 'পরিবেশ ও জলবায়ু',
  'Foreign Policy': 'পররাষ্ট্রনীতি',
  'Social Justice': 'সামাজিক ন্যায়বিচার'
}

const mockEpisodes: Episode[] = [
  {
    id: '1',
    slug: 'ep-12-samiul-alam-economy',
    episodeNumber: 12,
    title: 'Abolishing Export Bureaucracy & 0% Tax for Tech Founders Under 25',
    titleBn: '২৫ বছরের কম বয়সী টেক উদ্যোক্তাদের জন্য রপ্তানি আমলাতন্ত্র বিলোপ ও ০% কর সুবিধা',
    guestName: 'Samiul Alam',
    guestNameBn: 'সামিউল আলম',
    guestRole: 'FinTech Builder & Youth Economic Fellow',
    guestRoleBn: 'ফিনটেক উদ্যোক্তা এবং তরুণ অর্থনৈতিক ফেলো',
    guestPhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    airDate: 'August 27, 2026',
    airDateBn: '২৭ আগস্ট, ২০২৬',
    duration: '32:15',
    topic: 'Economy',
    executiveSummary: 'President Samiul tackled the slow licensing pipeline for youth startups, presenting a radical 1-day automated company formation law and sovereign venture guarantees.',
    executiveSummaryBn: 'রাষ্ট্রপতি সামিউল তরুণদের স্টার্টআপ চালুর আমলাতান্ত্রিক জটিলতা নিরসনে মাত্র ১ দিনে স্বয়ংক্রিয় কোম্পানি নিবন্ধন আইন এবং সরকারি ভেঞ্চার গ্যারান্টি তহবিল ঘোষণা করেন।',
    keyDecrees: [
      'Single-window paperless export registration in under 60 minutes.',
      'Sovereign seed liquidity pool for top 100 university inventions yearly.',
      'Complete duty exemption on robotics and green hardware imports.'
    ],
    keyDecreesBn: [
      '৬০ মিনিটের মধ্যে একক উইন্ডো পেপারলেস রপ্তানি নিবন্ধন কার্যকরকরণ।',
      'বিশ্ববিদ্যালয়ের শীর্ষ ১০০টি উদ্ভাবনের জন্য বার্ষিক সরকারি সিড তহবিল।',
      'রোবোটিক্স ও পরিবেশবান্ধব হার্ডওয়্যার আমদানিতে শতভাগ শুল্কমুক্তি।'
    ],
    youtubeId: 'dQw4w9WgXcQ',
    viewsCount: 48200,
    featured: true,
    quote: 'If we make starting a business as simple as sending a text message, this generation will fund the nation’s next century.',
    quoteBn: 'যদি ব্যবসা শুরু করা একটি এসএমএস পাঠানোর মতো সহজ হয়, তবে এই তরুণ প্রজন্মই আগামী এক শতাব্দীর দেশের উন্নয়ন নিশ্চিত করবে।'
  },
  {
    id: '2',
    slug: 'ep-11-fariha-tasnim-education',
    episodeNumber: 11,
    title: 'Decentralizing University Curriculums & AI Tutors for 15,000 Rural Schools',
    titleBn: 'বিশ্ববিদ্যালয় পাঠ্যক্রম বিকেন্দ্রীকরণ ও ১৫,০০০ গ্রামীণ স্কুলে এআই টিউটর চালুকরণ',
    guestName: 'Fariha Tasnim',
    guestNameBn: 'ফারিহা তাসনিম',
    guestRole: 'AI Researcher & Rural Edu Advocate',
    guestRoleBn: 'এআই গবেষক ও শিক্ষা অধিকার কর্মী',
    guestPhoto: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    airDate: 'August 20, 2026',
    airDateBn: '২০ আগস্ট, ২০২৬',
    duration: '29:40',
    topic: 'Education',
    executiveSummary: 'President Fariha dismantled outdated national rote-learning curriculums, instituting real-world problem solving and multilingual AI tutors in remote districts.',
    executiveSummaryBn: 'রাষ্ট্রপতি ফারিহা মুখস্থনির্ভর শিক্ষাব্যবস্থা বাতিল করে ব্যবহারিক সমস্যা সমাধান এবং প্রত্যন্ত অঞ্চলে বহুভাষিক এআই টিউটর চালুর নির্দেশ দেন।',
    keyDecrees: [
      'Sovereign Open-Source AI Tutor deployed to all government primary classrooms.',
      'Mandatory 20% industry internship credits for every undergrad graduation.',
      'Doubling public teacher compensation indexed to student critical thinking milestones.'
    ],
    keyDecreesBn: [
      'সকল সরকারি প্রাথমিক বিদ্যালয়ে মুক্ত সোর্সের ন্যাশনাল এআই টিউটর সংযোজন।',
      'স্নাতক ডিগ্রির জন্য ২০% ইন্ডাস্ট্রি ইন্টার্নশিপ ক্রেডিট বাধ্যতামূলক করা।',
      'শিক্ষার্থীদের সৃজনশীল মূল্যায়নের ভিত্তিতে শিক্ষকদের বেতন ও প্রণোদনা দ্বিগুণ করা।'
    ],
    youtubeId: 'dQw4w9WgXcQ',
    viewsCount: 39500,
    featured: false,
    quote: 'A country where your geography dictates your intelligence access is a country with half its brain tied behind its back.',
    quoteBn: 'যে দেশে বাসস্থান দিয়ে কারো মেধার বিকাশ নির্ধারিত হয়, সে দেশ কখনোই নিজের পূর্ণ শক্তিতে মাথা তুলে দাঁড়াতে পারে না।'
  },
  {
    id: '3',
    slug: 'ep-10-rayhan-chowdhury-security',
    episodeNumber: 10,
    title: 'Digital Border Sovereignty & Judicial Automation for Instant Bail Decisions',
    titleBn: 'ডিজিটাল সীমান্ত নিরাপত্তা ও তাৎক্ষণিক জামিন নিষ্পত্তিতে বিচার ব্যবস্থার স্বয়ংক্রিয়করণ',
    guestName: 'Rayhan Chowdhury',
    guestNameBn: 'রায়হান চৌধুরী',
    guestRole: 'Cyber Defense Specialist',
    guestRoleBn: 'সাইবার ডিফেন্স বিশেষজ্ঞ',
    guestPhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    airDate: 'August 13, 2026',
    airDateBn: '১৩ আগস্ট, ২০২৬',
    duration: '31:05',
    topic: 'Security',
    executiveSummary: 'Rayhan used his 30 minutes to modernize homeland digital infrastructure and overhaul pre-trial incarceration with blockchain-verified bail protocols.',
    executiveSummaryBn: 'রায়হান জাতীয় সাইবার পরিকাঠামো আধুনিকীকরণ এবং ডিজিটাল যাচাই ব্যবস্থার মাধ্যমে বিচারাধীন কারাবাস কমানোর যুগান্তকারী নির্দেশ দেন।',
    keyDecrees: [
      'Establishment of the National Cyber Readiness Brigade with conscription exemptions for ethical hackers.',
      'Automated AI triage for minor civil and bail hearings within 48 hours.'
    ],
    keyDecreesBn: [
      'এথিক্যাল হ্যাকারদের সমন্বয়ে ন্যাশনাল সাইবার রেডিনেস ব্রিগেড গঠন।',
      '৪৮ ঘণ্টার মধ্যে ছোটখাটো দেওয়ানি ও জামিন শুনানির জন্য স্বয়ংক্রিয় ট্রায়াজ সিস্টেম।'
    ],
    youtubeId: 'dQw4w9WgXcQ',
    viewsCount: 52100,
    featured: false,
    quote: 'National security in 2026 is fought in fiber optics and court dockets, not just perimeter fences.',
    quoteBn: '২০২৬ সালে জাতীয় নিরাপত্তা শুধু কাঁটাতারে নয়, বরং অপটিক্যাল ফাইবার আর বিচারালয়ের দ্রুততম নিষ্পত্তিতে রক্ষিত হয়।'
  },
  {
    id: '4',
    slug: 'ep-09-anika-rahman-environment',
    episodeNumber: 9,
    title: 'The Delta Defense Pact: Solar Water Desalination & Urban Flood Corridors',
    titleBn: 'ডেল্টা প্রতিরক্ষা চুক্তি: সৌরচালিত পানি বিশুদ্ধকরণ ও নগর বন্যা প্রতিরোধ করিডোর',
    guestName: 'Anika Rahman',
    guestNameBn: 'আনিকা রহমান',
    guestRole: 'Climate Architect & Delta Fellow',
    guestRoleBn: 'জলবায়ু স্থপতি ও ডেল্টা ফেলো',
    guestPhoto: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80',
    airDate: 'August 6, 2026',
    airDateBn: '৬ আগস্ট, ২০২৬',
    duration: '33:12',
    topic: 'Environment',
    executiveSummary: 'Anika laid out a resilient 50-year master plan to transform coastal vulnerability into a clean energy generation hub.',
    executiveSummaryBn: 'আনিকা উপকূলীয় ঝুঁকি মোকাবেলা করে উপকূলকে সবুজ জ্বালানি ও সুপেয় পানির স্বয়ংসম্পূর্ণ অঞ্চলে রূপান্তরের ৫০ বছরের পরিকল্পনা দেন।',
    keyDecrees: [
      '100% solar desalination mandate for every coastal union parishad by 2028.',
      'Creation of urban wetland green corridors with strict criminal penalties for canal encroachment.'
    ],
    keyDecreesBn: [
      '২০২৮ সালের মধ্যে প্রতিটি উপকূলীয় ইউনিয়নে সৌরচালিত ডিস্যালিনেশন প্ল্যান্ট স্থাপন।',
      'খাল ও জলাশয় দখল প্রতিরোধে কঠোর আইনি সুরক্ষাসহ নগরে জলজ করিডোর তৈরি।'
    ],
    youtubeId: 'dQw4w9WgXcQ',
    viewsCount: 44300,
    featured: false,
    quote: 'The climate crisis will not wait for diplomatic summits. We either engineer our coastlines today, or surrender them tomorrow.',
    quoteBn: 'জলবায়ু সংকট কোনো আন্তর্জাতিক সম্মেলনের জন্য অপেক্ষা করবে না। হয় আজ আমাদের উপকূল পুনর্গঠন করতে হবে, নয়তো কাল তা হারাতে হবে।'
  }
]

const episodes = ref<Episode[]>(mockEpisodes)
let episodesFetchDone = false

export function useEpisodes() {
  const { currentLang } = useLanguage()
  const selectedTopic = ref<string>('All')
  const searchQuery = ref<string>('')

  const topics = computed(() => {
    return ['All', 'Economy', 'Education', 'Security', 'Environment', 'Foreign Policy', 'Social Justice']
  })

  const loadEpisodesFromApi = async () => {
    try {
      const res = await apiRequest<any[]>('/episodes')
      if (res.success && res.data && res.data.length > 0) {
        episodes.value = res.data.map(e => ({
          id: String(e.id),
          slug: e.slug,
          episodeNumber: e.episode_number,
          title: e.title,
          guestName: e.guest_name,
          guestRole: e.guest_role,
          guestPhoto: e.guest_photo || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
          airDate: e.air_date ? new Date(e.air_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'Recent',
          duration: e.duration || '30:00',
          topic: e.topic,
          executiveSummary: e.executive_summary || '',
          keyDecrees: typeof e.key_decrees === 'string' ? JSON.parse(e.key_decrees || '[]') : (e.key_decrees || []),
          youtubeId: e.youtube_id || 'dQw4w9WgXcQ',
          viewsCount: e.views_count || 0,
          featured: Boolean(e.featured),
          quote: e.quote || ''
        }))
        episodesFetchDone = true
      }
    } catch (err) {
      console.warn('API episodes fallback to mock', err)
    }
  }

  if (!episodesFetchDone && process.client) {
    loadEpisodesFromApi()
  }

  const getEpisodeBySlug = (slug: string) => {
    return episodes.value.find(e => e.slug === slug)
  }

  const filteredEpisodes = computed(() => {
    return episodes.value.filter(ep => {
      const matchesTopic = selectedTopic.value === 'All' || ep.topic === selectedTopic.value
      const query = searchQuery.value.toLowerCase().trim()
      const titleMatch = (currentLang.value === 'bn' && ep.titleBn ? ep.titleBn : ep.title).toLowerCase().includes(query)
      const guestMatch = (currentLang.value === 'bn' && ep.guestNameBn ? ep.guestNameBn : ep.guestName).toLowerCase().includes(query)
      const topicMatch = ep.topic.toLowerCase().includes(query)

      const matchesSearch = !query || titleMatch || guestMatch || topicMatch
      return matchesTopic && matchesSearch
    })
  })

  return {
    episodes,
    topics,
    selectedTopic,
    searchQuery,
    filteredEpisodes,
    getEpisodeBySlug,
    topicTranslations
  }
}
