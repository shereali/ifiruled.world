<template>
  <div class="legal-page">
    <div class="container">
      <div class="legal-card card-presidential">
        <h1 class="legal-title">Community & Broadcast Guidelines</h1>
        <span class="last-updated">Last Updated: August 2026</span>

        <div class="legal-content">
          <h2>1. Purpose of the Platform</h2>
          <p>
            "If I Ruled" exists to empower bold, constructive solutions to national and global challenges. We encourage fearless thinking grounded in feasibility, ethics, and unity.
          </p>

          <h2>2. Standards for Presidential Decrees</h2>
          <ul>
            <li><strong>Clarity & Depth:</strong> Focus on concrete mechanisms (e.g. tax models, institutional restructuring, technological adoption) rather than vague aspirations.</li>
            <li><strong>Respectful Debate:</strong> Robust challenge is welcome; ad hominem attacks and character assassination are prohibited.</li>
            <li><strong>Originality:</strong> Present your authentic vision and reasoning.</li>
          </ul>

          <h2>3. Moderation & Editorial Discretion</h2>
          <p>
            The production editorial board reserves the right to moderate manifesto submissions and select studio candidates based on merit, vision, and diversity of thought.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useHead } from '#app'

useHead({
  title: 'Community & Broadcast Guidelines'
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
</style>
