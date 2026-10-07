<template>
  <div class="partners-page">
    <section class="partners-hero">
      <div class="container text-center">
        <span class="topic-tag">{{ t.partnersPage.tag }}</span>
        <h1 class="partners-title">{{ t.partnersPage.title }}</h1>
        <p class="partners-subtitle">
          {{ t.partnersPage.subtitle }}
        </p>
      </div>
    </section>

    <div class="container partners-container">
      <!-- Tier Grid -->
      <div class="grid-3">
        <!-- Tier 1 -->
        <div class="tier-card card-presidential">
          <span class="tier-tag">{{ currentLang === 'bn' ? 'সম্প্রচার অংশীদার' : 'Broadcast Partner' }}</span>
          <h3 class="tier-name">{{ currentLang === 'bn' ? 'টাইটেল স্পন্সর' : 'Title Sponsor' }}</h3>
          <p class="tier-price">{{ currentLang === 'bn' ? 'এক্সক্লুসিভ কো-ব্র্যান্ডিং' : 'Exclusive Co-Branding' }}</p>
          <ul class="tier-features" v-if="currentLang === 'bn'">
            <li>✓ প্রতিটি পর্বের সূচনা ও সমাপ্তিতে প্রধান উপস্থাপক হিসেবে ব্র্যান্ডিং</li>
            <li>✓ স্টুডিও ডিজিটাল ব্যাকড্রপ ও ডায়াসে লোগো সংযোজন</li>
            <li>✓ ৬০ সেকেন্ডের এক্সিকিউটিভ ব্র্যান্ড মেসেজ স্লট</li>
            <li>✓ ifiruled.world এবং সকল পর্বের ল্যান্ডিং পেজে শীর্ষস্থান</li>
          </ul>
          <ul class="tier-features" v-else>
            <li>✓ Co-presenter billing in all show opening intro stingers</li>
            <li>✓ Prominent studio digital wall backdrop integration</li>
            <li>✓ Dedicated 60s mid-roll executive brand message</li>
            <li>✓ Top billing on ifiruled.world and episode landing pages</li>
          </ul>
          <NuxtLink to="/contact" class="btn btn-gold w-full mt-auto">
            <span>{{ t.partnersPage.becomePartner }}</span>
          </NuxtLink>
        </div>

        <!-- Tier 2 -->
        <div class="tier-card card-presidential popular-tier">
          <span class="tier-tag gold-tag">{{ currentLang === 'bn' ? 'সর্বাধিক জনপ্রিয়' : 'Most Popular' }}</span>
          <h3 class="tier-name">{{ currentLang === 'bn' ? 'সেক্টর ক্যাটাগরি স্পন্সর' : 'Sector Category Sponsor' }}</h3>
          <p class="tier-price">{{ currentLang === 'bn' ? 'অর্থনীতি / প্রযুক্তি / জলবায়ু' : 'Economy / Tech / Climate' }}</p>
          <ul class="tier-features" v-if="currentLang === 'bn'">
            <li>✓ নির্দিষ্ট থিমযুক্ত পর্বের একক নেমিং রাইটস</li>
            <li>✓ পর্বের শুরুতে সঞ্চালক কর্তৃক ব্র্যান্ডের বিশেষ কৃতজ্ঞতা প্রকাশ</li>
            <li>✓ আইডিয়া হাবের সংশ্লিষ্ট সেক্টরে ডিজিটাল ব্যানার প্লেসমেন্ট</li>
            <li>✓ সামাজিক যোগাযোগ মাধ্যমে যৌথ প্রচারণার অধিকার</li>
          </ul>
          <ul class="tier-features" v-else>
            <li>✓ Exclusive naming rights for specific theme episodes</li>
            <li>✓ Custom brand mention by show host at start of address</li>
            <li>✓ Digital banner on relevant Ideas Hub sector category</li>
            <li>✓ Social media co-distribution rights</li>
          </ul>
          <NuxtLink to="/contact" class="btn btn-gold w-full mt-auto">
            <span>{{ t.partnersPage.becomePartner }}</span>
          </NuxtLink>
        </div>

        <!-- Tier 3 -->
        <div class="tier-card card-presidential">
          <span class="tier-tag">{{ currentLang === 'bn' ? 'উদ্ভাবন অংশীদার' : 'Innovation Partner' }}</span>
          <h3 class="tier-name">{{ currentLang === 'bn' ? 'ফেলোশিপ ও সিড গ্রান্ট পার্টনার' : 'Fellowship Grant Partner' }}</h3>
          <p class="tier-price">{{ currentLang === 'bn' ? 'তারুণ্যের প্রোটোটাইপ তহবিল' : 'Youth Seed Liquidity' }}</p>
          <ul class="tier-features" v-if="currentLang === 'bn'">
            <li>✓ নির্বাচিত সেরা পলিসি প্রোটোটাইপে সরাসরি সিড ফান্ড প্রদান</li>
            <li>✓ বিশ্ববিদ্যালয় ক্যাম্পাস অ্যাক্টিভেশন ও যৌথ প্রেস রিলিজ</li>
            <li>✓ ক্যান্ডিডেট ও অ্যালামনাই পোর্টালে পার্টনার লোগো উপস্থিতি</li>
            <li>✓ প্রাথমিক অডিশনে জুরি বোর্ডের সম্মানজনক আসন</li>
          </ul>
          <ul class="tier-features" v-else>
            <li>✓ Direct grant disbursement to top candidate policy decrees</li>
            <li>✓ Joint press releases and university campus activation</li>
            <li>✓ Logo placement across alumni and candidate registry</li>
            <li>✓ Executive jury seat during preliminary auditions</li>
          </ul>
          <NuxtLink to="/contact" class="btn btn-outline-gold w-full mt-auto">
            <span>{{ t.partnersPage.becomePartner }}</span>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useHead } from '#app'
import { useLanguage } from '~/composables/useLanguage'

const { t, currentLang } = useLanguage()

useHead({
  title: 'Brand & Corporate Partnerships'
})
</script>

<style scoped>
.partners-page {
  padding-top: 7rem;
  padding-bottom: 5rem;
}

.partners-hero {
  margin-bottom: 4rem;
}

.partners-title {
  font-size: 2.75rem;
  color: var(--color-cream-50);
  margin-top: 0.5rem;
  margin-bottom: 1rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.partners-subtitle {
  color: var(--color-navy-200);
  font-size: 1.05rem;
  max-width: 650px;
  margin: 0 auto;
  line-height: 1.6;
}

.tier-card {
  padding: 2.5rem 2rem;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.popular-tier {
  border-color: var(--color-gold-400);
  background: linear-gradient(135deg, rgba(17, 34, 68, 0.8) 0%, rgba(9, 18, 36, 0.95) 100%);
  transform: translateY(-8px);
}

.tier-tag {
  font-size: 0.75rem;
  color: var(--color-navy-300);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 0.5rem;
}

.gold-tag {
  color: var(--color-gold-400);
  font-weight: 700;
}

.tier-name {
  font-size: 1.35rem;
  color: var(--color-cream-50);
  margin-bottom: 0.25rem;
}

.tier-price {
  color: var(--color-gold-300);
  font-size: 0.95rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.tier-features {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  margin-bottom: 2rem;
}

.tier-features li {
  color: var(--color-navy-100);
  font-size: 0.88rem;
  line-height: 1.5;
}

@media (max-width: 960px) {
  .popular-tier {
    transform: none;
  }
}
</style>
