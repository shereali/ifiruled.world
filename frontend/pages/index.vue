<template>
  <div>
    <!-- Cinematic Hero Section -->
    <HeroSection />

    <!-- Live Episode Countdown Banner -->
    <LiveCountdown />

    <!-- Featured Episode Spotlight -->
    <section class="section featured-ep-section">
      <div class="container">
        <div class="section-header">
          <span class="topic-tag">{{ t.featured.tag }}</span>
          <h2 class="section-title">{{ t.featured.title }}</h2>
          <p class="section-subtitle">
            {{ t.featured.subtitle }}
          </p>
        </div>

        <div class="featured-media-card card-presidential">
          <div class="featured-grid">
            <div class="video-container">
              <iframe 
                class="video-frame"
                src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?rel=0" 
                title="If I Ruled Featured Episode"
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen
              ></iframe>
            </div>

            <div class="featured-info">
              <div class="featured-tags">
                <span class="ep-num-pill">{{ currentLang === 'bn' ? 'পর্ব ১২' : 'EP 12' }}</span>
                <span class="topic-tag">{{ currentLang === 'bn' ? 'অর্থনীতি' : 'Economy' }}</span>
                <span class="views-badge">
                  <Eye :size="12" />
                  <span>{{ currentLang === 'bn' ? '৪৮.২ হাজার ' + t.featured.views : '48.2K ' + t.featured.views }}</span>
                </span>
              </div>

              <h3 class="featured-title">
                {{ currentLang === 'bn' ? '২৫ বছরের কম বয়সী টেক উদ্যোক্তাদের জন্য রপ্তানি আমলাতন্ত্র বিলোপ ও ০% কর সুবিধা' : 'Abolishing Export Bureaucracy & 0% Tax for Tech Founders Under 25' }}
              </h3>

              <div class="featured-speaker">
                <img 
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80" 
                  alt="Samiul Alam" 
                  class="speaker-avatar"
                />
                <div>
                  <h4 class="speaker-name">{{ currentLang === 'bn' ? 'রাষ্ট্রপতি সামিউল আলম' : 'President Samiul Alam' }}</h4>
                  <p class="speaker-title">{{ currentLang === 'bn' ? 'ফিনটেক উদ্যোক্তা এবং তরুণ অর্থনৈতিক ফেলো' : 'FinTech Builder & Youth Economic Fellow' }}</p>
                </div>
              </div>

              <p class="featured-desc">
                {{ currentLang === 'bn' ? 'রাষ্ট্রপতি সামিউল তরুণদের স্টার্টআপ চালুর আমলাতান্ত্রিক জটিলতা নিরসনে মাত্র ১ দিনে স্বয়ংক্রিয় কোম্পানি নিবন্ধন আইন এবং সরকারি ভেঞ্চার গ্যারান্টি তহবিল ঘোষণা করেন।' : 'In this high-energy session, President Samiul tackles the slow paper licensing bottleneck that paralyzes youth entrepreneurs, proposing an instant 1-day automated charter and sovereign guarantee fund.' }}
              </p>

              <div class="decrees-preview">
                <h5 class="decrees-heading">{{ t.featured.decreesHeading }}</h5>
                <ul v-if="currentLang === 'bn'">
                  <li>৬০ মিনিটের মধ্যে একক উইন্ডো পেপারলেস রপ্তানি নিবন্ধন কার্যকরকরণ।</li>
                  <li>বিশ্ববিদ্যালয়ের শীর্ষ ১০০টি উদ্ভাবনের জন্য বার্ষিক সরকারি সিড তহবিল।</li>
                </ul>
                <ul v-else>
                  <li>Single-window paperless export registration under 60 mins.</li>
                  <li>Sovereign seed liquidity pool for top 100 student prototypes.</li>
                </ul>
              </div>

              <div class="featured-actions">
                <NuxtLink to="/episodes/ep-12-samiul-alam-economy" class="btn btn-gold">
                  <span>{{ t.featured.readBlueprint }}</span>
                  <ArrowRight :size="14" />
                </NuxtLink>
                <NuxtLink to="/episodes" class="btn btn-outline-gold">
                  <span>{{ t.featured.exploreAll }}</span>
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- How It Works (4 Steps) -->
    <HowItWorks />

    <!-- Impact Stats Bar -->
    <StatsBar />

    <!-- Guests Spotlight Carousel -->
    <GuestCarousel />

    <!-- Manifesto / Crowdsourced Ideas Preview -->
    <section class="section manifesto-preview-section">
      <div class="container">
        <div class="section-header">
          <span class="topic-tag">{{ t.manifestoSection.tag }}</span>
          <h2 class="section-title">{{ t.manifestoSection.title }}</h2>
          <p class="section-subtitle">
            {{ t.manifestoSection.subtitle }}
          </p>
        </div>

        <div class="grid-2">
          <IdeaCard 
            v-for="idea in ideas.slice(0, 2)" 
            :key="idea.id" 
            :idea="idea" 
            @upvote="toggleUpvote"
          />
        </div>

        <div class="text-center mt-8">
          <NuxtLink to="/manifesto" class="btn btn-gold btn-lg">
            <span>{{ t.manifestoSection.exploreAll }}</span>
            <ArrowRight :size="15" />
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Call to Action Banner -->
    <section class="section cta-banner-section">
      <div class="container">
        <div class="presidential-cta-box card-presidential">
          <div class="cta-badge-icon">
            <Mic :size="24" />
          </div>
          <h2 class="cta-heading">{{ t.ctaBanner.heading }}</h2>
          <p class="cta-paragraph">
            {{ t.ctaBanner.paragraph }}
          </p>
          <div class="cta-button-group">
            <NuxtLink to="/apply" class="btn btn-gold btn-lg">
              <span>{{ t.ctaBanner.applyBtn }}</span>
              <ArrowRight :size="15" />
            </NuxtLink>
            <NuxtLink to="/about" class="btn btn-outline-gold btn-lg">
              <span>{{ t.ctaBanner.learnBtn }}</span>
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useHead } from '#app'
import { Eye, Mic, ArrowRight } from 'lucide-vue-next'
import { useLanguage } from '~/composables/useLanguage'
import { useIdeas } from '~/composables/useIdeas'

const { t } = useLanguage()
const { ideas, toggleUpvote } = useIdeas()

useHead({
  title: 'Home'
})
</script>

<style scoped>
.featured-ep-section {
  padding-top: 5rem;
}

.featured-media-card {
  padding: 2rem;
}

.featured-grid {
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: 2.5rem;
  align-items: center;
}

.video-container {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: var(--radius-md);
  overflow: hidden;
  border: 1px solid var(--border-gold-subtle);
  background: #000;
}

.video-frame {
  width: 100%;
  height: 100%;
}

.featured-tags {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  margin-bottom: 0.75rem;
}

.views-badge {
  font-size: 0.75rem;
  color: var(--color-navy-200);
  background: rgba(255, 255, 255, 0.05);
  padding: 0.2rem 0.5rem;
  border-radius: var(--radius-full);
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
}

.featured-title {
  font-size: 1.5rem;
  color: var(--color-cream-50);
  margin-bottom: 1.25rem;
  line-height: 1.35;
}

.featured-speaker {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.25rem;
}

.speaker-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--color-gold-400);
}

.speaker-name {
  font-size: 1.05rem;
  color: var(--color-gold-300);
  margin-bottom: 0.15rem;
}

.speaker-title {
  font-size: 0.8rem;
  color: var(--color-navy-300);
}

.featured-desc {
  font-size: 0.9rem;
  color: var(--color-navy-100);
  line-height: 1.6;
  margin-bottom: 1.25rem;
}

.decrees-preview {
  background: rgba(5, 11, 23, 0.6);
  border-left: 2px solid var(--color-gold-400);
  padding: 0.85rem 1.25rem;
  border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
  margin-bottom: 1.75rem;
}

.decrees-heading {
  font-size: 0.85rem;
  color: var(--color-gold-400);
  margin-bottom: 0.4rem;
  font-family: var(--font-heading);
}

.decrees-preview ul {
  padding-left: 1.25rem;
  font-size: 0.85rem;
  color: var(--color-cream-100);
}

.decrees-preview li {
  margin-bottom: 0.3rem;
}

.featured-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.manifesto-preview-section {
  background: radial-gradient(circle at center, rgba(12, 24, 48, 0.5) 0%, transparent 70%);
}

.cta-banner-section {
  padding: 6rem 0;
}

.presidential-cta-box {
  background: linear-gradient(135deg, rgba(17, 34, 68, 0.85) 0%, rgba(9, 18, 36, 0.95) 100%);
  border: 1px solid var(--border-gold-medium);
  border-radius: var(--radius-xl);
  padding: 4.5rem 3rem;
  text-align: center;
  position: relative;
  overflow: hidden;
  box-shadow: var(--shadow-presidential);
}

.cta-badge-icon {
  width: 54px;
  height: 54px;
  border-radius: 50%;
  background: rgba(212, 160, 45, 0.15);
  border: 1px solid var(--color-gold-400);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--color-gold-300);
  margin-bottom: 1.25rem;
}

.cta-heading {
  font-size: 2.25rem;
  color: var(--color-cream-50);
  margin-bottom: 1rem;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
}

.cta-paragraph {
  color: var(--color-navy-200);
  font-size: 1.05rem;
  max-width: 650px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 2.5rem;
  line-height: 1.6;
}

.cta-button-group {
  display: flex;
  justify-content: center;
  gap: 1.25rem;
  flex-wrap: wrap;
}

@media (max-width: 960px) {
  .featured-grid {
    grid-template-columns: 1fr;
  }
}
</style>
