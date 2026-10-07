<template>
  <div class="about-page">
    <section class="about-hero">
      <div class="container text-center">
        <span class="topic-tag">{{ t.aboutPage.tag }}</span>
        <h1 class="about-title">{{ t.aboutPage.title }}</h1>
        <p class="about-subtitle">
          {{ t.aboutPage.subtitle }}
        </p>
      </div>
    </section>

    <div class="container about-content-container">
      <!-- Mission & Story -->
      <div class="about-story-grid">
        <div class="story-card card-presidential">
          <h2 class="card-title">{{ t.aboutPage.missionTitle }}</h2>
          <template v-if="currentLang === 'bn'">
            <p class="card-text">
              বহু দশক ধরে উন্নয়নশীল গণতান্ত্রিক দেশগুলোতে তরুণদের জাতীয় সিদ্ধান্তের মূলধারা থেকে দূরে রাখা হয়েছে—তাদের "আগামীর ভবিষ্যৎ" বলে বর্তমান নীতিনির্ধারণে কোণঠাসা করা হয়েছে।
            </p>
            <p class="card-text">
              <strong>"If I Ruled" (ifiruled.world)</strong> একটি ঐতিহাসিক ধারণার ওপর প্রতিষ্ঠিত: তরুণদের কাছে অভিযোগ জানতে না চেয়ে, যদি তাদের হাতেই দেশের সর্বোচ্চ রাষ্ট্রক্ষমতা ৩০ মিনিটের জন্য তুলে দেওয়া হয়—তবে তারা কীভাবে দেশ পরিচালনা করবেন?
            </p>
          </template>
          <template v-else>
            <p class="card-text">
              For decades, young people across developing democracies have been relegated to the sidelines of national decision-making—labeled "the future" while excluded from the present. 
            </p>
            <p class="card-text">
              <strong>"If I Ruled" (ifiruled.world)</strong> was born out of a radical premise: What happens when you stop asking young people what they complain about, and instead hand them the ultimate executive authority of the nation for 30 uninterrupted minutes?
            </p>
          </template>
        </div>

        <div class="story-card card-presidential">
          <h2 class="card-title">{{ t.aboutPage.formatTitle }}</h2>
          <ul class="pillars-list" v-if="currentLang === 'bn'">
            <li>
              <strong>১. শতভাগ স্ক্রিপ্টহীন বাস্তবতা:</strong> কোনো পূর্বনির্ধারিত রাজনৈতিক বুলি নয়। প্রতিটি তরুণ নেতা সরাসরি সম্প্রচারে তাদের সংস্কার ভাবনার জবাবদিহিতা নিশ্চিত করেন।
            </li>
            <li>
              <strong>২. কার্যকর নির্বাহী আদেশ:</strong> প্রতিটি সম্প্রচারের সমাপ্তি ঘটে সুনির্দিষ্ট পলিসি ডিক্রি পাসের মাধ্যমে, যা স্থায়ীভাবে জনগণের মেনিফেস্টো হাবে সংরক্ষিত হয়।
            </li>
            <li>
              <strong>৩. বৈশ্বিক মিডিয়া রূপান্তর:</strong> বাংলাদেশ থেকে শুরু করে বিশ্বজুড়ে তরুণ নেতৃত্ব ও কার্যকর রাষ্ট্রশাসনের বৈশ্বিক চ্যাপ্টার সম্প্রসারণ।
            </li>
          </ul>
          <ul class="pillars-list" v-else>
            <li>
              <strong>1. 100% Unscripted Reality:</strong> No pre-approved talking points or canned political rhetoric. Every guest defends their ideas on live television.
            </li>
            <li>
              <strong>2. Actionable Policy Decrees:</strong> Every broadcast culminates in documented executive decrees passed into the public Ideas Hub.
            </li>
            <li>
              <strong>3. Global Media Scaling:</strong> Expanding from Bangladesh to regional and international youth governance chapters worldwide.
            </li>
          </ul>
        </div>
      </div>

      <!-- Press Kit Download Section -->
      <section id="press" class="press-kit-section card-presidential mt-8">
        <div class="press-grid">
          <div>
            <span class="topic-tag">{{ currentLang === 'bn' ? 'মিডিয়া ও প্রেস রুম' : 'Media & Press Kit' }}</span>
            <h2 class="press-title">{{ currentLang === 'bn' ? 'অফিসিয়াল মিডিয়া রিসোর্স' : 'Official Media Resources' }}</h2>
            <p class="press-desc">
              {{ currentLang === 'bn' ? 'উচ্চ রেজ্যুলেশন লোগো প্যাকেজ, ব্র্যান্ড আইডেন্টিটি নির্দেশিকা, হোস্ট ও অতিথিদের বায়ো এবং সম্প্রচার প্রমোশনাল অ্যাসেট ডাউনলোড করুন।' : 'Download high-resolution navy and gold logo packages, official brand identity guidelines, host bios, and high-res broadcast promotional assets.' }}
            </p>
          </div>
          <div class="press-download-box">
            <a href="/logo-navy.png" download class="btn btn-gold">
              <span>{{ currentLang === 'bn' ? '📥 প্রেস কিট ডাউনলোড করুন (ZIP)' : '📥 Download Full Press Kit (ZIP)' }}</span>
            </a>
            <span class="kit-size-note">{{ currentLang === 'bn' ? 'ভেক্টর এসভিজি, পিএনজি এবং ওয়ান-পেজার গাইডলাইন অন্তর্ভুক্ত' : 'Includes Vector SVG, High-Res PNGs, Brand Kit & PDF One-Pager' }}</span>
          </div>
        </div>
      </section>

      <div class="text-center mt-8">
        <NuxtLink to="/apply" class="btn btn-gold btn-lg">
          <span>{{ t.aboutPage.applyCta }}</span>
          <span>→</span>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useHead } from '#app'
import { useLanguage } from '~/composables/useLanguage'

const { t, currentLang } = useLanguage()

useHead({
  title: 'About the Show & Mission'
})
</script>

<style scoped>
.about-page {
  padding-top: 7rem;
  padding-bottom: 5rem;
}

.about-hero {
  margin-bottom: 4rem;
}

.about-title {
  font-size: 2.75rem;
  color: var(--color-cream-50);
  margin-top: 0.5rem;
  margin-bottom: 1rem;
  max-width: 850px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.25;
}

.about-subtitle {
  color: var(--color-navy-200);
  font-size: 1.1rem;
  max-width: 680px;
  margin: 0 auto;
  line-height: 1.6;
}

.about-story-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2.5rem;
}

.story-card {
  padding: 2.5rem;
}

.card-title {
  font-size: 1.45rem;
  color: var(--color-gold-300);
  margin-bottom: 1.25rem;
}

.card-text {
  color: var(--color-navy-100);
  font-size: 0.95rem;
  line-height: 1.7;
  margin-bottom: 1rem;
}

.pillars-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.pillars-list li {
  color: var(--color-navy-100);
  font-size: 0.9rem;
  line-height: 1.6;
  border-left: 2px solid var(--color-gold-400);
  padding-left: 1rem;
}

.pillars-list strong {
  color: var(--color-cream-50);
  display: block;
  margin-bottom: 0.25rem;
}

.press-kit-section {
  padding: 3rem;
  background: linear-gradient(135deg, rgba(17, 34, 68, 0.6) 0%, rgba(9, 18, 36, 0.9) 100%);
}

.press-grid {
  display: grid;
  grid-template-columns: 1.3fr 0.7fr;
  gap: 2.5rem;
  align-items: center;
}

.press-title {
  font-size: 1.65rem;
  color: var(--color-cream-50);
  margin-top: 0.4rem;
  margin-bottom: 0.75rem;
}

.press-desc {
  color: var(--color-navy-200);
  font-size: 0.95rem;
  line-height: 1.6;
}

.press-download-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
}

.kit-size-note {
  font-size: 0.75rem;
  color: var(--color-navy-400);
  text-align: center;
}

@media (max-width: 960px) {
  .about-story-grid, .press-grid {
    grid-template-columns: 1fr;
  }
}
</style>
