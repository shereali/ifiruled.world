<template>
  <div class="apply-page">
    <!-- Hero Header -->
    <section class="apply-hero">
      <div class="container text-center">
        <div class="hero-badge">
          <span class="badge-dot"></span>
          <span>{{ t.applyPage.tag }}</span>
        </div>
        <h1 class="apply-title">{{ t.applyPage.title }}</h1>
        <p class="apply-subtitle">
          {{ t.applyPage.subtitle }}
        </p>
      </div>
    </section>

    <div class="container main-apply-container">
      <div class="apply-grid">
        <!-- Left: Form -->
        <div class="form-container-card card-presidential">
          <h2 class="form-header-title">{{ t.applyPage.title }}</h2>
          <p class="form-header-sub">{{ t.applyPage.subtitle }}</p>

          <form @submit.prevent="handleSubmitApplication" class="presidential-form">
            <!-- Step Indicators -->
            <div class="form-steps-indicator">
              <span :class="['step-tab', { active: currentStep === 1 }]">{{ t.applyPage.step1Label }}</span>
              <span class="step-divider">→</span>
              <span :class="['step-tab', { active: currentStep === 2 }]">{{ t.applyPage.step2Label }}</span>
              <span class="step-divider">→</span>
              <span :class="['step-tab', { active: currentStep === 3 }]">{{ t.applyPage.step3Label }}</span>
            </div>

            <!-- STEP 1: Personal -->
            <div v-if="currentStep === 1" class="step-content">
              <div class="grid-2 form-row">
                <div class="form-group">
                  <label class="form-label">{{ t.applyPage.fullName }}</label>
                  <input v-model="form.fullName" type="text" required placeholder="e.g. Zillur Rahman" class="form-control" />
                </div>
                <div class="form-group">
                  <label class="form-label">{{ t.applyPage.age }}</label>
                  <input v-model="form.age" type="number" min="18" max="30" required placeholder="e.g. 23" class="form-control" />
                </div>
              </div>

              <div class="grid-2 form-row">
                <div class="form-group">
                  <label class="form-label">{{ t.applyPage.email }}</label>
                  <input v-model="form.email" type="email" required placeholder="you@example.com" class="form-control" />
                </div>
                <div class="form-group">
                  <label class="form-label">{{ t.applyPage.phone }}</label>
                  <input v-model="form.phone" type="tel" required placeholder="+880 1700 000000" class="form-control" />
                </div>
              </div>

              <div class="form-group">
                <label class="form-label">{{ t.applyPage.city }}</label>
                <input v-model="form.location" type="text" required placeholder="e.g. Dhaka, Bangladesh" class="form-control" />
              </div>

              <button type="button" @click="currentStep = 2" class="btn btn-gold w-full mt-4">
                <span>{{ t.applyPage.nextStep }}</span>
              </button>
            </div>

            <!-- STEP 2: Policy -->
            <div v-if="currentStep === 2" class="step-content">
              <div class="form-group">
                <label class="form-label">{{ t.applyPage.sector }}</label>
                <select v-model="form.topic" required class="form-control">
                  <option value="" disabled>Select primary focus</option>
                  <option value="Economy">Economy & Youth Entrepreneurship</option>
                  <option value="Education">Education & AI Transformation</option>
                  <option value="Security">National Defense & Cybersecurity</option>
                  <option value="Environment">Climate Delta & Clean Energy</option>
                  <option value="Foreign Policy">Foreign Policy & Global Trade</option>
                  <option value="Social Justice">Social Justice & Public Healthcare</option>
                </select>
              </div>

              <div class="form-group">
                <label class="form-label">{{ t.applyPage.decreeTitle }}</label>
                <input v-model="form.firstDecreeTitle" type="text" required placeholder="e.g. 100% Tax Exemption on Green Technologies" class="form-control" />
              </div>

              <div class="form-group">
                <label class="form-label">{{ t.applyPage.manifesto }}</label>
                <textarea 
                  v-model="form.manifesto" 
                  required 
                  placeholder="Explain exactly what problem exists, why previous administrations failed, and how your executive orders will solve it within 30 minutes of taking office..." 
                  class="form-control"
                  rows="5"
                ></textarea>
              </div>

              <div class="btn-group-row mt-4">
                <button type="button" @click="currentStep = 1" class="btn btn-glass">
                  <span>{{ t.applyPage.backStep }}</span>
                </button>
                <button type="button" @click="currentStep = 3" class="btn btn-gold">
                  <span>{{ t.applyPage.nextStep }}</span>
                </button>
              </div>
            </div>

            <!-- STEP 3: Video & Social -->
            <div v-if="currentStep === 3" class="step-content">
              <div class="form-group">
                <label class="form-label">{{ t.applyPage.videoUrl }}</label>
                <input v-model="form.pitchUrl" type="url" placeholder="https://youtu.be/... (1-min elevator pitch)" class="form-control" />
                <span class="input-hint">Candidates with short 60s video pitches have a 3x higher selection rate.</span>
              </div>

              <div class="grid-2 form-row">
                <div class="form-group">
                  <label class="form-label">{{ t.applyPage.linkedin }}</label>
                  <input v-model="form.linkedin" type="url" placeholder="https://linkedin.com/in/..." class="form-control" />
                </div>
                <div class="form-group">
                  <label class="form-label">{{ t.applyPage.social }}</label>
                  <input v-model="form.socialHandle" type="text" placeholder="@handle" class="form-control" />
                </div>
              </div>

              <div class="form-consent-box">
                <input v-model="form.agreed" type="checkbox" id="consent-check" required />
                <label for="consent-check" class="consent-label">
                  {{ t.applyPage.consent }}
                </label>
              </div>

              <div class="btn-group-row mt-4">
                <button type="button" @click="currentStep = 2" class="btn btn-glass">
                  <span>{{ t.applyPage.backStep }}</span>
                </button>
                <button type="submit" class="btn btn-gold submit-candidacy-btn" :disabled="isSubmitting">
                  <Send :size="14" />
                  <span>{{ isSubmitting ? t.applyPage.submittingBtn : t.applyPage.submitBtn }}</span>
                </button>
              </div>
            </div>
          </form>

          <!-- Success Alert -->
          <div v-if="submittedSuccess" class="submission-success-modal">
            <div class="success-box card-presidential text-center">
              <div class="success-icon-wrapper">
                <CheckCircle2 :size="40" class="text-gold" />
              </div>
              <h3 class="success-title">{{ t.applyPage.successTitle }}</h3>
              <p class="success-desc">
                {{ t.applyPage.successDesc }}
              </p>
              <NuxtLink to="/episodes" class="btn btn-gold mt-4">
                <span>{{ t.applyPage.exploreEpisodes }}</span>
              </NuxtLink>
            </div>
          </div>
        </div>

        <!-- Right: Timeline & Criteria -->
        <div class="info-sidebar">
          <!-- Timeline Card -->
          <div class="card-presidential timeline-card">
            <h3 class="card-heading">{{ currentLang === 'bn' ? 'বাছাই ও সম্প্রচার প্রক্রিয়া' : 'Selection Timeline' }}</h3>
            <div class="timeline-steps">
              <div class="tl-item">
                <div class="tl-dot">1</div>
                <div class="tl-text">
                  <h4>{{ currentLang === 'bn' ? 'আবেদন ও সংস্কার প্রস্তাব মূল্যায়ন' : 'Application & Idea Review' }}</h4>
                  <p>{{ currentLang === 'bn' ? 'আমাদের সম্পাদকীয় প্যানেল প্রতিটি পলিসি আইডিয়ার মৌলিকতা ও প্রয়োগযোগ্যতা যাচাই করে।' : 'Our editorial board evaluates policy originality and feasibility.' }}</p>
                </div>
              </div>
              <div class="tl-item">
                <div class="tl-dot">2</div>
                <div class="tl-text">
                  <h4>{{ currentLang === 'bn' ? '১৫ মিনিটের ভার্চুয়াল প্রাথমিক অডিশন' : '15-Min Screening Call' }}</h4>
                  <p>{{ currentLang === 'bn' ? 'প্রযোজনা দলের সাথে ক্যামেরার উপস্থিতি ও প্রশ্নোত্তর আত্মবিশ্বাস পর্যালোচনা।' : 'Prep conversation with show producers to test on-camera presence.' }}</p>
                </div>
              </div>
              <div class="tl-item">
                <div class="tl-dot active">3</div>
                <div class="tl-text">
                  <h4>{{ currentLang === 'bn' ? 'স্টুডিওতে সরাসরি সম্প্রচার সেশন' : 'Studio Broadcast Session' }}</h4>
                  <p>{{ currentLang === 'bn' ? '৩০ মিনিটের জন্য আপনি বসবেন সর্বোচ্চ রাষ্ট্রপতির আসনে, সম্পূর্ণ স্ক্রিপ্টহীনভাবে।' : 'You take the presidential seat live for 30 minutes unscripted.' }}</p>
                </div>
              </div>
              <div class="tl-item">
                <div class="tl-dot">4</div>
                <div class="tl-text">
                  <h4>{{ currentLang === 'bn' ? 'দেশব্যাপী প্রচার ও সংস্কার বাস্তবায়ন' : 'National Distribution' }}</h4>
                  <p>{{ currentLang === 'bn' ? 'YouTube, Facebook ও ifiruled.world-এ জাতীয় নীতিনির্ধারকদের সামনে প্রচার।' : 'Broadcast published across YouTube, Facebook, and ifiruled.world.' }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Eligibility Criteria Card -->
          <div class="card-presidential criteria-card">
            <h3 class="card-heading">{{ currentLang === 'bn' ? 'আবেদনের যোগ্যতা ও শর্তাবলী' : 'Eligibility Requirements' }}</h3>
            <ul class="criteria-list" v-if="currentLang === 'bn'">
              <li>✓ বয়স অবশ্যই ১৮ থেকে ৩০ বছরের মধ্যে হতে হবে।</li>
              <li>✓ দলীয় রাজনীতির ঊর্ধ্বে থেকে গঠনমূলক দেশ সংস্কার পরিকল্পনা উপস্থাপন করতে হবে।</li>
              <li>✓ লাইভ প্রশ্নোত্তর ও খোলামেলা বিতর্কে অংশ নেওয়ার মানসিকতা থাকতে হবে।</li>
              <li>✓ শিক্ষার্থী, গবেষক, তরুণ উদ্যোক্তা ও উদ্ভাবক সকলের জন্য উন্মুক্ত।</li>
            </ul>
            <ul class="criteria-list" v-else>
              <li>✓ Must be between 18 and 30 years of age.</li>
              <li>✓ Must present constructive, non-partisan governance ideas.</li>
              <li>✓ Must be comfortable with live, unscripted questioning.</li>
              <li>✓ Open to students, professionals, innovators, and activists.</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- FAQ Section -->
      <section class="faq-section">
        <h2 class="section-title text-center">{{ currentLang === 'bn' ? 'সাধারণ জিজ্ঞাসা (FAQ)' : 'Frequently Asked Questions' }}</h2>
        <div class="faq-accordion-grid">
          <div v-for="(faq, i) in displayedFaqs" :key="i" class="faq-item card-presidential" @click="faq.open = !faq.open">
            <div class="faq-question">
              <h4>{{ faq.q }}</h4>
              <span class="faq-toggle">{{ faq.open ? '−' : '+' }}</span>
            </div>
            <p v-if="faq.open" class="faq-answer">{{ faq.a }}</p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useHead } from '#app'
import { Send, CheckCircle2 } from 'lucide-vue-next'
import { useLanguage } from '~/composables/useLanguage'

const { t, currentLang } = useLanguage()
const currentStep = ref(1)
const isSubmitting = ref(false)
const submittedSuccess = ref(false)

const form = ref({
  fullName: '',
  age: '',
  email: '',
  phone: '',
  location: '',
  topic: '',
  firstDecreeTitle: '',
  manifesto: '',
  pitchUrl: '',
  linkedin: '',
  socialHandle: '',
  agreed: false
})

const faqsEn = [
  {
    q: 'Do I need prior political experience to apply?',
    a: 'Not at all! We want students, tech innovators, grassroots workers, designers, and thinkers who have clear problem-solving ideas. Formal political credentials are not required.',
    open: true
  },
  {
    q: 'Is the show scripted or rehearsed?',
    a: 'No. The 30 minutes in the presidential chair are 100% live and unscripted. You bring your core decrees, and the host/audience will challenge your ideas in real-time.',
    open: false
  },
  {
    q: 'Where does recording take place?',
    a: 'We record in our flagship studio in Dhaka, with high-definition remote studio connections available for international candidates.',
    open: false
  },
  {
    q: 'What happens to the policy ideas after the show?',
    a: 'All executive decrees and write-ups are cataloged in the public Ideas Hub on ifiruled.world and submitted to policy think-tanks and media partners.',
    open: false
  }
]

const faqsBn = [
  {
    q: 'আবেদন করার জন্য কি রাজনৈতিক পূর্ব অভিজ্ঞতা প্রয়োজন?',
    a: 'একদমই না! আমরা খুঁজছি শিক্ষার্থী, প্রযুক্তিবিদ, উদ্ভাবক এবং সচেতন তরুণদের যাদের দেশ গড়ার বাস্তবসম্মত পরিকল্পনা আছে। কোনো রাজনৈতিক পদমর্যাদা বা দলের পরিচয় প্রয়োজন নেই।',
    open: true
  },
  {
    q: 'অনুষ্ঠানটি কি স্ক্রিপ্ট করা থাকে নাকি সম্পূর্ণ তাৎক্ষণিক?',
    a: 'সম্পূর্ণ স্ক্রিপ্টহীন! রাষ্ট্রপতির চেয়ারে কাটানো ৩০ মিনিট শতভাগ লাইভ ও তাৎক্ষণিক। আপনি আপনার সংস্কার প্রস্তাব আনবেন, এবং উপস্থাপক ও দর্শকরা সরাসরি সে বিষয়ে প্রশ্ন করবেন।',
    open: false
  },
  {
    q: 'অনুষ্ঠানের রেকর্ডিং কোথায় হয়?',
    a: 'আমাদের প্রধান স্টুডিও ঢাকায় অবস্থিত। এছাড়া প্রবাসী ও দূরবর্তী জেলার তরুণদের জন্য হাই-ডেফিনিশন রিমোট সম্প্রচারের ব্যবস্থা রয়েছে।',
    open: false
  },
  {
    q: 'অনুষ্ঠানের পর আমার প্রস্তাবনাগুলোর কী হবে?',
    a: 'সকল ঘোষিত নির্বাহী আদেশ এবং সংস্কার পরিকল্পনা ifiruled.world-এর পাবলিক আইডিয়া হাবে স্থায়ীভাবে সংরক্ষণ করা হয় এবং জাতীয় নীতিনির্ধারণী ফোরামে উপস্থাপন করা হয়।',
    open: false
  }
]

const displayedFaqs = computed(() => {
  return currentLang.value === 'bn' ? faqsBn : faqsEn
})

const handleSubmitApplication = () => {
  isSubmitting.value = true
  setTimeout(() => {
    isSubmitting.value = false
    submittedSuccess.value = true
  }, 1000)
}

useHead({
  title: 'Apply to be President'
})
</script>

<style scoped>
.apply-page {
  padding-top: 7rem;
  padding-bottom: 5rem;
}

.apply-hero {
  padding-bottom: 3rem;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 1rem;
  background: rgba(212, 160, 45, 0.1);
  border: 1px solid var(--border-gold-subtle);
  border-radius: var(--radius-full);
  color: var(--color-gold-400);
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.badge-dot {
  width: 8px;
  height: 8px;
  background: var(--color-gold-400);
  border-radius: 50%;
}

.apply-title {
  font-size: clamp(2.25rem, 4.5vw, 3.5rem);
  color: var(--color-cream-50);
  margin-bottom: 1rem;
}

.apply-subtitle {
  font-size: 1.15rem;
  color: #94A3B8;
  max-width: 650px;
  margin: 0 auto;
  line-height: 1.6;
}

.main-apply-container {
  margin-top: 2rem;
}

.apply-grid {
  display: grid;
  grid-template-columns: 1.3fr 0.7fr;
  gap: 2.5rem;
}

.form-container-card {
  padding: 2.5rem;
  position: relative;
}

.form-header-title {
  font-size: 1.5rem;
  color: var(--color-cream-50);
  margin-bottom: 0.35rem;
}

.form-header-sub {
  font-size: 0.9rem;
  color: #94A3B8;
  margin-bottom: 2rem;
}

.form-steps-indicator {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  background: rgba(5, 11, 23, 0.6);
  border-radius: var(--radius-md);
  margin-bottom: 2rem;
  border: 1px solid var(--border-gold-subtle);
  overflow-x: auto;
}

.step-tab {
  font-size: 0.85rem;
  color: #64748B;
  font-weight: 600;
  white-space: nowrap;
}

.step-tab.active {
  color: var(--color-gold-400);
}

.step-divider {
  color: #475569;
}

.form-row {
  margin-bottom: 0;
}

.input-hint {
  font-size: 0.75rem;
  color: #94A3B8;
  margin-top: 0.35rem;
  display: block;
}

.form-consent-box {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  margin-top: 1.5rem;
  padding: 1rem;
  background: rgba(5, 11, 23, 0.4);
  border-radius: var(--radius-sm);
}

.consent-label {
  font-size: 0.85rem;
  color: #CBD5E1;
  line-height: 1.4;
  cursor: pointer;
}

.btn-group-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.w-full {
  width: 100%;
}

.mt-4 {
  margin-top: 1.5rem;
}

/* Timeline & Criteria */
.info-sidebar {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.card-heading {
  font-size: 1.25rem;
  color: var(--color-cream-50);
  margin-bottom: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  padding-bottom: 0.75rem;
}

.timeline-steps {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.tl-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.tl-dot {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--color-navy-800);
  border: 1px solid var(--border-gold-subtle);
  color: var(--color-cream-100);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.85rem;
  font-weight: 700;
  flex-shrink: 0;
}

.tl-dot.active {
  background: var(--color-gold-500);
  color: var(--color-navy-950);
  border-color: var(--color-gold-400);
}

.tl-text h4 {
  font-size: 0.95rem;
  color: var(--color-gold-300);
  margin-bottom: 0.2rem;
}

.tl-text p {
  font-size: 0.8rem;
  color: #94A3B8;
  line-height: 1.4;
}

.criteria-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.criteria-list li {
  font-size: 0.9rem;
  color: #CBD5E1;
  line-height: 1.4;
}

/* Success Modal */
.submission-success-modal {
  position: absolute;
  inset: 0;
  background: rgba(7, 14, 29, 0.95);
  backdrop-filter: blur(16px);
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  z-index: 10;
}

.success-crown {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.success-title {
  font-size: 1.75rem;
  color: var(--color-gold-400);
  margin-bottom: 0.75rem;
}

.success-desc {
  color: #CBD5E1;
  font-size: 0.95rem;
  line-height: 1.6;
}

/* FAQ Section */
.faq-section {
  margin-top: 5rem;
}

.faq-accordion-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.25rem;
  margin-top: 2rem;
}

.faq-item {
  padding: 1.5rem;
  cursor: pointer;
}

.faq-question {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.faq-question h4 {
  font-size: 1.05rem;
  color: var(--color-cream-50);
}

.faq-toggle {
  font-size: 1.25rem;
  color: var(--color-gold-400);
  font-weight: 700;
}

.faq-answer {
  margin-top: 0.75rem;
  font-size: 0.9rem;
  color: #94A3B8;
  line-height: 1.5;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  padding-top: 0.75rem;
}

@media (max-width: 960px) {
  .apply-grid {
    grid-template-columns: 1fr;
  }
  .faq-accordion-grid {
    grid-template-columns: 1fr;
  }
}
</style>
