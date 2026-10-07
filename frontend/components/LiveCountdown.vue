<template>
  <div class="countdown-bar">
    <div class="container countdown-inner">
      <div class="countdown-label-group">
        <div class="live-status-tag">
          <span class="live-indicator"></span>
          <span class="live-tag-text">{{ t.hero.nextLive }}</span>
        </div>
        <div class="schedule-details">
          <span class="schedule-day">{{ t.countdown.everyThursday }}</span>
          <span class="tz-pill">Timezone: {{ userTimezone }}</span>
        </div>
      </div>

      <!-- Digits -->
      <div class="timer-digits-container">
        <div class="timer-unit">
          <span class="digit-value">{{ formatNum(timeLeft.days) }}</span>
          <span class="unit-label">{{ t.countdown.days }}</span>
        </div>
        <span class="timer-colon">:</span>
        <div class="timer-unit">
          <span class="digit-value">{{ formatNum(timeLeft.hours) }}</span>
          <span class="unit-label">{{ t.countdown.hours }}</span>
        </div>
        <span class="timer-colon">:</span>
        <div class="timer-unit">
          <span class="digit-value">{{ formatNum(timeLeft.minutes) }}</span>
          <span class="unit-label">{{ t.countdown.minutes }}</span>
        </div>
        <span class="timer-colon">:</span>
        <div class="timer-unit">
          <span class="digit-value">{{ formatNum(timeLeft.seconds) }}</span>
          <span class="unit-label">{{ t.countdown.seconds }}</span>
        </div>
      </div>

      <!-- Action Button -->
      <div class="countdown-cta">
        <button 
          @click="handleSetReminder" 
          :class="['btn', 'btn-sm', reminderSet ? 'btn-gold' : 'btn-outline-gold']"
        >
          <span>🔔 {{ reminderSet ? t.countdown.reminderSet : t.countdown.remindMe }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useLanguage } from '~/composables/useLanguage'

const { t } = useLanguage()

const userTimezone = ref('GMT+6 (BST)')
const reminderSet = ref(false)

const timeLeft = ref({
  days: 3,
  hours: 10,
  minutes: 24,
  seconds: 45
})

let timerInterval: any = null

const calculateNextThursday = () => {
  const now = new Date()
  const resultDate = new Date(now.getTime())
  
  // Thursday is day 4 in JS (Sunday=0, Thursday=4)
  const dayOfWeek = now.getDay()
  let daysUntilThursday = (4 - dayOfWeek + 7) % 7
  
  // Target 20:00 (8:00 PM) BST
  resultDate.setDate(now.getDate() + daysUntilThursday)
  resultDate.setHours(20, 0, 0, 0)
  
  if (resultDate.getTime() <= now.getTime()) {
    resultDate.setDate(resultDate.getDate() + 7)
  }
  
  const diffMs = resultDate.getTime() - now.getTime()
  
  const totalSeconds = Math.max(0, Math.floor(diffMs / 1000))
  timeLeft.value.days = Math.floor(totalSeconds / (3600 * 24))
  timeLeft.value.hours = Math.floor((totalSeconds % (3600 * 24)) / 3600)
  timeLeft.value.minutes = Math.floor((totalSeconds % 3600) / 60)
  timeLeft.value.seconds = totalSeconds % 60
}

const formatNum = (n: number) => {
  return n < 10 ? `0${n}` : `${n}`
}

const handleSetReminder = () => {
  reminderSet.value = true
  // Create Google Calendar event link or native calendar invite
  const eventTitle = encodeURIComponent('If I Ruled — Live Presidential Broadcast')
  const details = encodeURIComponent('Watch ambitious young leaders take 30 minutes in power unscripted on ifiruled.world')
  const gcalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${eventTitle}&details=${details}`
  
  if (typeof window !== 'undefined') {
    window.open(gcalUrl, '_blank')
  }
}

onMounted(() => {
  if (typeof Intl !== 'undefined' && Intl.DateTimeFormat) {
    try {
      userTimezone.value = Intl.DateTimeFormat().resolvedOptions().timeZone
    } catch (e) {}
  }
  calculateNextThursday()
  timerInterval = setInterval(calculateNextThursday, 1000)
})

onUnmounted(() => {
  if (timerInterval) clearInterval(timerInterval)
})
</script>

<style scoped>
.countdown-bar {
  background: linear-gradient(90deg, rgba(12, 24, 48, 0.95) 0%, rgba(20, 40, 80, 0.95) 50%, rgba(12, 24, 48, 0.95) 100%);
  border-top: 1px solid var(--border-gold-subtle);
  border-bottom: 1px solid var(--border-gold-subtle);
  padding: 1.25rem 0;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

.countdown-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.countdown-label-group {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.live-status-tag {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
}

.live-indicator {
  width: 8px;
  height: 8px;
  background: var(--color-live-red);
  border-radius: 50%;
  box-shadow: 0 0 10px var(--color-live-red);
}

.live-tag-text {
  font-size: 0.8rem;
  font-weight: 700;
  color: #F87171;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.schedule-details {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.schedule-day {
  font-size: 1rem;
  font-weight: 700;
  color: var(--color-cream-50);
}

.tz-pill {
  font-size: 0.75rem;
  padding: 0.15rem 0.5rem;
  background: rgba(255, 255, 255, 0.08);
  border-radius: var(--radius-full);
  color: var(--color-text-muted);
}

.timer-digits-container {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.timer-unit {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 48px;
}

.digit-value {
  font-family: var(--font-display);
  font-size: 1.75rem;
  font-weight: 800;
  color: var(--color-gold-400);
  line-height: 1;
  text-shadow: 0 0 15px rgba(212, 160, 45, 0.3);
}

.unit-label {
  font-size: 0.7rem;
  text-transform: uppercase;
  color: var(--color-text-muted);
  font-weight: 600;
  letter-spacing: 0.05em;
  margin-top: 0.25rem;
}

.timer-colon {
  font-size: 1.5rem;
  color: var(--color-gold-500);
  font-weight: 700;
  line-height: 1;
  margin-top: -10px;
}

@media (max-width: 860px) {
  .countdown-inner {
    justify-content: center;
    text-align: center;
  }
  .countdown-label-group {
    align-items: center;
  }
}
</style>
