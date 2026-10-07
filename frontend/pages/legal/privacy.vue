<template>
  <div class="legal-page">
    <div class="container">
      <div class="legal-card card-presidential">
        <h1 class="legal-title">Privacy Policy</h1>
        <span class="last-updated">Last Updated: August 2026</span>

        <div class="legal-content">
          <h2>1. Overview</h2>
          <p>
            At <strong>If I Ruled</strong> (operating via <strong>ifiruled.world</strong>), we respect the privacy of candidates, visitors, and participants. This policy outlines how candidate applications, newsletter subscriptions, and audience manifesto submissions are collected, utilized, and safeguarded.
          </p>

          <h2>2. Information We Collect</h2>
          <ul>
            <li><strong>Candidate Applications:</strong> Name, age, contact details, policy pitches, video submissions, and social handles submitted via the presidential candidate registry.</li>
            <li><strong>Manifesto Hub Submissions:</strong> Public policy ideas, author names, and professions displayed on the community manifesto wall.</li>
            <li><strong>Cabinet Newsletter:</strong> Email addresses provided for weekly policy digests and show updates.</li>
          </ul>

          <h2>3. Data Protection & Security</h2>
          <p>
            Candidate submissions and confidential contact details are transmitted over encrypted HTTPS/SSL connections and stored in secure backend environments. We never sell or license personal identification to third-party data brokers.
          </p>

          <h2>4. Inquiries</h2>
          <p>
            For questions regarding privacy, please contact <a href="mailto:privacy@ifiruled.world" class="gold-link">privacy@ifiruled.world</a>.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useHead } from '#app'

useHead({
  title: 'Privacy Policy'
})
</script>

<style scoped>
.legal-page {
  padding-top: 8rem;
  padding-bottom: 5rem;
}

.legal-card {
  max-width: 850px;
  margin: 0 auto;
  padding: 3rem;
}

.legal-title {
  font-size: 2.25rem;
  color: var(--color-cream-50);
  margin-bottom: 0.5rem;
}

.last-updated {
  font-size: 0.85rem;
  color: var(--color-gold-400);
  display: block;
  margin-bottom: 2rem;
}

.legal-content h2 {
  font-size: 1.3rem;
  color: var(--color-gold-300);
  margin-top: 1.75rem;
  margin-bottom: 0.75rem;
}

.legal-content p,
.legal-content ul {
  color: #CBD5E1;
  font-size: 0.95rem;
  line-height: 1.7;
  margin-bottom: 1rem;
}

.legal-content ul {
  padding-left: 1.5rem;
}

.gold-link {
  color: var(--color-gold-400);
}
</style>
