<template>
  <div class="site-layout">
    <Header />
    <main class="site-main">
      <slot />
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
// Default Public Website Layout
</script>

<style scoped>
.site-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.site-main {
  flex: 1;
}
</style>
