// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@formkit/nuxt','@nuxtjs/tailwindcss','@nuxtjs/supabase'],
  formkit: {
    // Experimental support for auto loading (see note):
    autoImport: true
  },
  publicRuntimeConfig: {
    apiKey: process.env.OPENAI_API_KEY
  },
  privateRuntimeConfig: {
    apiSecret: '', // can be overridden by NUXT_API_SECRET environment variable
  },
  supabase: {
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_KEY,
    serviceKey: process.env.SUPABASE_SERVICE_KEY,
    redirect: true,
    redirectOptions: {
      login: '/login',
      callback: '/',
      include: [],
      exclude: ['/signup'],
      cookieRedirect: false,
    }
  },
})
