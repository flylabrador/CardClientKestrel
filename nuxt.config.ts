export default defineNuxtConfig({  
  css: ['vuetify/styles', '@mdi/font/css/materialdesignicons.css'], // 加入 Vuetify 和 mdi 圖標的樣式
  build: {
    transpile: ['vuetify'], // 確保編譯 Vuetify
  },
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE_URL || 'https://localhost:5000/api',
    },
  }
})
