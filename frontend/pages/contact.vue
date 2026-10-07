<template>
  <div class="contact-page">
    <section class="contact-hero">
      <div class="container text-center">
        <span class="topic-tag">{{ t.contactPage.tag }}</span>
        <h1 class="contact-title">{{ t.contactPage.title }}</h1>
        <p class="contact-subtitle">
          {{ t.contactPage.subtitle }}
        </p>
      </div>
    </section>

    <div class="container contact-container">
      <div class="contact-grid">
        <!-- Contact Form -->
        <div class="contact-form-card card-presidential">
          <h2 class="card-title">{{ t.contactPage.sendBtn }}</h2>
          
          <form @submit.prevent="handleSendMessage" class="contact-form">
            <div class="grid-2 form-row">
              <div class="form-group">
                <label class="form-label">{{ t.contactPage.fullName }}</label>
                <input v-model="contactForm.name" type="text" required :placeholder="currentLang === 'bn' ? 'যেমন: তানভীর চৌধুরী' : 'e.g. Tanvir Chowdhury'" class="form-control" />
              </div>
              <div class="form-group">
                <label class="form-label">{{ t.contactPage.email }}</label>
                <input v-model="contactForm.email" type="email" required placeholder="tanvir@company.com" class="form-control" />
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">{{ t.contactPage.inquiryType }}</label>
              <select v-model="contactForm.inquiryType" required class="form-control">
                <option value="Sponsorship">{{ currentLang === 'bn' ? 'ব্র্যান্ড পার্টনারশিপ ও স্পন্সরশিপ' : 'Brand Partnership & Sponsorship' }}</option>
                <option value="Press">{{ currentLang === 'bn' ? 'মিডিয়া ও প্রেস সাক্ষাৎকার অনুরোধ' : 'Media & Press Interview Request' }}</option>
                <option value="Nomination">{{ currentLang === 'bn' ? 'ভবিষ্যৎ রাষ্ট্রপতি প্রার্থী মনোনয়ন' : 'Nominate a Future President' }}</option>
                <option value="General">{{ currentLang === 'bn' ? 'সাধারণ মতামত ও জিজ্ঞাসা' : 'General Feedback & Questions' }}</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label">{{ t.contactPage.message }}</label>
              <textarea v-model="contactForm.message" required rows="5" :placeholder="currentLang === 'bn' ? 'আপনার অনুসন্ধানের বিষয়টি স্পষ্টভাবে তুলে ধরুন...' : 'State your inquiry clearly...'" class="form-control"></textarea>
            </div>

            <button type="submit" class="btn btn-gold w-full transmit-btn" :disabled="sending">
              <Send :size="14" />
              <span>{{ sending ? t.contactPage.sendingBtn : t.contactPage.sendBtn }}</span>
            </button>

            <p v-if="sent" class="sent-success-msg">
              ✓ {{ t.contactPage.successMsg }}
            </p>
          </form>
        </div>

        <!-- Direct Contact Info -->
        <div class="contact-info-col">
          <div class="info-card card-presidential">
            <h3 class="info-card-title">{{ currentLang === 'bn' ? 'স্টুডিও ও কার্যালয়' : 'Studio & Office' }}</h3>
            <p class="info-line"><strong>{{ currentLang === 'bn' ? 'প্রোডাকশন স্টুডিও:' : 'Production Studio:' }}</strong> Gulshan 2, Dhaka, Bangladesh</p>
            <p class="info-line"><strong>{{ currentLang === 'bn' ? 'অফিসিয়াল ডোমেইন:' : 'Official Domain:' }}</strong> <a href="https://ifiruled.world" class="gold-link">ifiruled.world</a></p>
            <p class="info-line"><strong>{{ currentLang === 'bn' ? 'সম্পাদকীয় অনুসন্ধান:' : 'Editorial Inquiries:' }}</strong> press@ifiruled.world</p>
            <p class="info-line"><strong>{{ currentLang === 'bn' ? 'অংশীদারিত্ব ডেস্ক:' : 'Partnership Desk:' }}</strong> partner@ifiruled.world</p>
          </div>

          <div class="info-card card-presidential mt-4">
            <h3 class="info-card-title">{{ currentLang === 'bn' ? 'লাইভ সম্প্রচার শিডিউল' : 'Live Broadcast Signal' }}</h3>
            <p class="info-line"><strong>{{ currentLang === 'bn' ? 'সম্প্রচারের সময়:' : 'Air Time:' }}</strong> {{ currentLang === 'bn' ? 'প্রতি বৃহস্পতিবার রাত ৮:০০ টা' : 'Every Thursday, 8:00 PM BST' }}</p>
            <p class="info-line"><strong>{{ currentLang === 'bn' ? 'সম্প্রচার মাধ্যম:' : 'Distribution:' }}</strong> YouTube, Facebook, and Web</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useHead } from '#app'
import { Send } from 'lucide-vue-next'
import { useLanguage } from '~/composables/useLanguage'

const { t, currentLang } = useLanguage()
const sending = ref(false)
const sent = ref(false)

const contactForm = ref({
  name: '',
  email: '',
  inquiryType: 'Sponsorship',
  message: ''
})

const handleSendMessage = () => {
  sending.value = true
  setTimeout(() => {
    sending.value = false
    sent.value = true
    contactForm.value = {
      name: '',
      email: '',
      inquiryType: 'Sponsorship',
      message: ''
    }
  }, 800)
}

useHead({
  title: 'Contact the Executive Desk'
})
</script>

<style scoped>
.contact-page {
  padding-top: 7rem;
  padding-bottom: 5rem;
}

.contact-hero {
  margin-bottom: 3.5rem;
}

.contact-title {
  font-size: 2.75rem;
  color: var(--color-cream-50);
  margin-top: 0.5rem;
  margin-bottom: 1rem;
}

.contact-subtitle {
  color: var(--color-navy-200);
  font-size: 1.05rem;
  max-width: 650px;
  margin: 0 auto;
  line-height: 1.6;
}

.contact-grid {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 3rem;
}

.contact-form-card {
  padding: 2.5rem;
}

.card-title {
  font-size: 1.35rem;
  color: var(--color-cream-50);
  margin-bottom: 1.5rem;
}

.sent-success-msg {
  color: #10B981;
  font-size: 0.85rem;
  margin-top: 1rem;
  padding: 0.75rem;
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.3);
  border-radius: var(--radius-sm);
}

.transmit-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.info-card {
  padding: 2rem;
}

.info-card-title {
  font-size: 1.15rem;
  color: var(--color-gold-400);
  margin-bottom: 1rem;
}

.info-line {
  color: var(--color-navy-200);
  font-size: 0.9rem;
  margin-bottom: 0.75rem;
}

.info-line strong {
  color: var(--color-cream-50);
}

@media (max-width: 960px) {
  .contact-grid {
    grid-template-columns: 1fr;
  }
}
</style>
