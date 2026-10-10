<script setup lang="ts">
const colorMode = useColorMode()

const color = computed(() => colorMode.value === 'dark' ? '#020618' : 'white')

useHead({
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { key: 'theme-color', name: 'theme-color', content: color }
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico', sizes: '32x32' },
    { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' }
  ],
  htmlAttrs: {
    lang: 'fr'
  }
})

// Construit une URL absolue pour l’image d’aperçu (utile pour Discord/Twitter)
const requestUrl = useRequestURL()
const ogImageUrl = `${requestUrl.origin}/screen-site.png?v=20251117`

useSeoMeta({
  // Un titleTemplate sans %s écrasait le titre de toutes les pages
  titleTemplate: title => title?.includes('Julien Castro') ? title : `${title} · Julien Castro`,
  ogImage: ogImageUrl,
  twitterImage: ogImageUrl,
  twitterCard: 'summary_large_image'
})
</script>

<template>
  <UApp>
    <NuxtLayout>
      <UMain class="relative">
        <NuxtPage />
      </UMain>
    </NuxtLayout>
  </UApp>
</template>
