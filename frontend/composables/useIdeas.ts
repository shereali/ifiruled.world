import { ref, computed } from 'vue'
import { apiRequest } from './useApi'
import { useLanguage } from './useLanguage'

export interface ManifestoIdea {
  id: string
  authorName: string
  authorNameBn?: string
  authorRole: string
  authorRoleBn?: string
  location: string
  locationBn?: string
  topic: 'Economy' | 'Security' | 'Education' | 'Environment' | 'Foreign Policy' | 'Social Justice'
  title: string
  titleBn?: string
  content: string
  contentBn?: string
  upvotes: number
  submittedAt: string
  submittedAtBn?: string
  isApproved: boolean
  hasUpvoted?: boolean
}

const mockIdeas: ManifestoIdea[] = [
  {
    id: '1',
    authorName: 'Tanzeem Hasan',
    authorNameBn: 'তানজীম হাসান',
    authorRole: 'Civil Engineering Student',
    authorRoleBn: 'পুরকৌশল শিক্ষার্থী',
    location: 'Chittagong',
    locationBn: 'চট্টগ্রাম',
    topic: 'Environment',
    title: 'Solar Highway Canopies to Power Public Transit Grids',
    titleBn: 'মহাসড়কে সৌর প্যানেল ছাউনি নির্মাণ করে গণপরিবহন গ্রিডে বিদ্যুৎ সরবরাহ',
    content: 'Cover high-capacity intercity expressways with arched solar panels. This generates over 450 MW of direct green electricity while reducing road surface heat and maintenance costs by 35%.',
    contentBn: 'আন্তঃজেলা এক্সপ্রেসওয়েগুলোর ওপর আর্চ সোলার প্যানেল স্থাপন করা। এর মাধ্যমে ৪৫০ মেগাওয়াটের বেশি পরিচ্ছন্ন বিদ্যুৎ উৎপাদনের পাশাপাশি রাস্তার তাপমাত্রা ও রক্ষণাবেক্ষণ খরচ ৩৫% কমিয়ে আনা সম্ভব।',
    upvotes: 418,
    submittedAt: '2 days ago',
    submittedAtBn: '২ দিন আগে',
    isApproved: true
  },
  {
    id: '2',
    authorName: 'Mehnaz Karim',
    authorNameBn: 'মেহনাজ করিম',
    authorRole: 'Software Developer',
    authorRoleBn: 'সফটওয়্যার প্রকৌশলী',
    location: 'Dhaka',
    locationBn: 'ঢাকা',
    topic: 'Economy',
    title: 'Zero Paperwork Freelancer Remittance Cards with Instant Cashbacks',
    titleBn: 'ফ্রিল্যান্সারদের জন্য পেপারলেস রেমিট্যান্স কার্ড ও তাৎক্ষণিক ক্যাশব্যাক ব্যবস্থা',
    content: 'Create a state-backed digital dollar debit card for tech freelancers with instant 4% export cashback and no manual bank clearance delays.',
    contentBn: 'প্রযুক্তি ফ্রিল্যান্সারদের জন্য সরকারি ডিজিটাল ডলার ডেবিট কার্ড চালু করা, যাতে ম্যানুয়াল ব্যাংকিং ছাড়পত্রের জটিলতা ছাড়াই তাৎক্ষণিক ৪% সরকারি ক্যাশব্যাক পাওয়া যায়।',
    upvotes: 382,
    submittedAt: '3 days ago',
    submittedAtBn: '৩ দিন আগে',
    isApproved: true
  },
  {
    id: '3',
    authorName: 'Farhan Kabir',
    authorNameBn: 'ফারহান কবির',
    authorRole: 'Legal Aid Volunteer',
    authorRoleBn: 'আইনি সহায়তা কর্মী',
    location: 'Sylhet',
    locationBn: 'সিলেট',
    topic: 'Social Justice',
    title: 'Public Right to Video Record Civil Services Without Harassment',
    titleBn: 'সরকারি সেবা ও কার্যালয়ে নাগরিকের ভিডিও ধারণের সাংবিধানিক অধিকার নিশ্চিতকরণ',
    content: 'Codify into constitutional law that any citizen has the indisputable right to livestream their interaction with public officials in municipal and law enforcement offices.',
    contentBn: 'পৌরসভা, থানা ও সরকারি দপ্তরে যেকোনো নাগরিকের সরকারি কর্মকর্তাদের সাথে কথোপকথন বা সেবাপ্রাপ্তি ভিডিও ধারণের অধিকারকে আইনি সুরক্ষা দেওয়া।',
    upvotes: 620,
    submittedAt: '4 days ago',
    submittedAtBn: '৪ দিন আগে',
    isApproved: true
  },
  {
    id: '4',
    authorName: 'Sadia Afroz',
    authorNameBn: 'সাদিয়া আফরোজ',
    authorRole: 'Medical Intern',
    authorRoleBn: 'শিক্ষানবিস চিকিৎসক',
    location: 'Rajshahi',
    locationBn: 'রাজশাহী',
    topic: 'Education',
    title: 'Free High-Speed Starlink/Fiber in Every Rural Health Clinic',
    titleBn: 'প্রতিটি গ্রামীণ স্বাস্থ্যকেন্দ্রে উচ্চগতির স্যাটেলাইট ইন্টারনেট ও জরুরি টেলিমেডিসিন',
    content: 'Equip every union parishad health sub-center with high-speed satellite uplink connected to tertiary specialist doctors in major teaching hospitals for instant emergency diagnosis.',
    contentBn: 'ইউনিয়ন স্বাস্থ্য কেন্দ্রগুলোকে বিশেষায়িত হাসপাতালের সাথে উচ্চগতির স্যাটেলাইট সংযোগে যুক্ত করা, যাতে জরুরি পরিস্থিতিতে তাৎক্ষণিক বিশেষজ্ঞ চিকিৎসকের পরামর্শ নিশ্চিত করা যায়।',
    upvotes: 295,
    submittedAt: '5 days ago',
    submittedAtBn: '৫ দিন আগে',
    isApproved: true
  }
]

const ideas = ref<ManifestoIdea[]>(mockIdeas)
let ideasFetchDone = false

export function useIdeas() {
  const { currentLang } = useLanguage()
  const filterTopic = ref<string>('All')
  const userUpvotes = ref<Set<string>>(new Set())

  // Load stored upvotes on client
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem('ifiruled_upvotes')
      if (stored) {
        userUpvotes.value = new Set(JSON.parse(stored))
      }
    } catch (e) {
      console.warn('Failed to load upvotes from storage', e)
    }
  }

  const loadIdeasFromApi = async () => {
    try {
      const res = await apiRequest<any[]>('/ideas')
      if (res.success && res.data && res.data.length > 0) {
        ideas.value = res.data.map(i => ({
          id: String(i.id),
          authorName: i.author_name,
          authorRole: i.author_role,
          location: i.location,
          topic: i.topic,
          title: i.title,
          content: i.content,
          upvotes: i.upvotes,
          submittedAt: 'Recent',
          isApproved: Boolean(i.is_approved)
        }))
        ideasFetchDone = true
      }
    } catch (err) {
      console.warn('API ideas fallback to mock', err)
    }
  }

  if (!ideasFetchDone && process.client) {
    loadIdeasFromApi()
  }

  const filteredIdeas = computed(() => {
    const list = ideas.value.filter(i => i.isApproved)
    if (filterTopic.value === 'All') return list
    return list.filter(i => i.topic === filterTopic.value)
  })

  const toggleUpvote = async (id: string) => {
    const idea = ideas.value.find(i => i.id === id)
    if (!idea) return

    const hasVoted = userUpvotes.value.has(id)
    if (hasVoted) {
      idea.upvotes--
      idea.hasUpvoted = false
      userUpvotes.value.delete(id)
    } else {
      idea.upvotes++
      idea.hasUpvoted = true
      userUpvotes.value.add(id)
      
      // Try sending to API
      try {
        await apiRequest(`/ideas/${id}/upvote`, { method: 'POST' })
      } catch (e) {
        console.warn('API upvote error', e)
      }
    }

    if (typeof window !== 'undefined') {
      localStorage.setItem('ifiruled_upvotes', JSON.stringify(Array.from(userUpvotes.value)))
    }
  }

  const submitIdea = async (newIdea: { authorName: string; authorRole: string; location: string; topic: ManifestoIdea['topic']; title: string; content: string }) => {
    try {
      const res = await apiRequest<any>('/ideas', {
        method: 'POST',
        body: {
          author_name: newIdea.authorName,
          author_role: newIdea.authorRole,
          location: newIdea.location,
          topic: newIdea.topic,
          title: newIdea.title,
          content: newIdea.content
        }
      })
      if (res.success && res.data) {
        ideas.value.unshift({
          id: String(res.data.id),
          authorName: res.data.author_name,
          authorRole: res.data.author_role,
          location: res.data.location,
          topic: res.data.topic,
          title: res.data.title,
          content: res.data.content,
          upvotes: res.data.upvotes || 0,
          submittedAt: 'Just now',
          submittedAtBn: 'মাত্র এখন',
          isApproved: true
        })
        return
      }
    } catch (e) {
      console.warn('API submission failed, submitting locally', e)
    }

    // Local fallback
    ideas.value.unshift({
      id: String(Date.now()),
      ...newIdea,
      upvotes: 1,
      submittedAt: 'Just now',
      submittedAtBn: 'মাত্র এখন',
      isApproved: true,
      hasUpvoted: true
    })
  }

  return {
    ideas,
    filterTopic,
    filteredIdeas,
    toggleUpvote,
    submitIdea
  }
}
