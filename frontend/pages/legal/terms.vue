<template>
  <div class="legal-page">
    <div class="container">
      <div class="legal-card card-presidential">
        <h1 class="legal-title">Terms of Broadcast & Participation</h1>
        <span class="last-updated">Last Updated: August 2026</span>

        <div class="legal-content">
          <h2>1. Agreement to Terms</h2>
          <p>
            By accessing <strong>ifiruled.world</strong> or submitting a presidential application, you agree to abide by these Terms of Service and all applicable broadcasting rules.
          </p>

          <h2>2. Non-Partisan Discourse & Community Standards</h2>
          <p>
            "If I Ruled" is an independent platform focused on innovative policy proposals, national development, and youth leadership. Content that constitutes hate speech, defamation, incitement to violence, or partisan slander will be disqualified and rejected.
          </p>

          <h2>3. Intellectual Property of Decrees</h2>
          <p>
            Ideas submitted to the Ideas Hub and manifesto wall are intended for public civil enrichment. By submitting, you grant If I Ruled the right to broadcast, distribute, and document your proposal across media formats.
          </p>

          <h2>4. Contact</h2>
          <p>
            For legal inquiries, contact <a href="mailto:legal@ifiruled.world" class="gold-link">legal@ifiruled.world</a>.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useHead } from '#app'

useHead({
  title: 'Terms of Broadcast & Participation'
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

.legal-content p {
  color: #CBD5E1;
  font-size: 0.95rem;
  line-height: 1.7;
  margin-bottom: 1rem;
}

.gold-link {
  color: var(--color-gold-400);
}
</style>
