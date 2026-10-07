// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },

  sourcemap: {
    server: false,
    client: false
  },

  experimental: {
    appManifest: false
  },

  css: [
    '~/assets/css/design-tokens.css',
    '~/assets/css/main.css',
    '~/assets/css/animations.css'
  ],

  app: {
    head: {
      title: 'If I Ruled — 30 minutes in power. A lifetime of ideas.',
      titleTemplate: '%s | If I Ruled (ifiruled.world)',
      htmlAttrs: {
        lang: 'en'
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content: 'A live, unscripted podcast where ambitious young people take 30 minutes in the presidential chair to share bold, real ideas on national development, security, unity, and progress.'
        },
        { name: 'theme-color', content: '#0C1830' },
        { property: 'og:site_name', content: 'If I Ruled' },
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: 'If I Ruled — 30 minutes in power. A lifetime of ideas.' },
        {
          property: 'og:description',
          content: 'Unscripted, live, and youth-driven. Watch past presidents or apply for 30 minutes in power.'
        },
        { property: 'og:image', content: '/logo-navy.png' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'If I Ruled — 30 minutes in power.' },
        { name: 'twitter:image', content: '/logo-navy.png' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon-180.png' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800;900&family=Hind+Siliguri:wght@400;600;700&family=Outfit:wght@300;400;500;600;700;800&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap'
        }
      ]
    }
  },

  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:8000/api'
    }
  }
})
