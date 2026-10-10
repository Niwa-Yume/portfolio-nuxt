<script setup lang="ts">
const { data: page } = await useAsyncData('index', () => {
  return queryCollection('index').first()
})
if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found',
    fatal: true
  })
}

useSeoMeta({
  title: page.value?.seo.title || page.value?.title,
  ogTitle: page.value?.seo.title || page.value?.title,
  description: page.value?.seo.description || page.value?.description,
  ogDescription: page.value?.seo.description || page.value?.description
})
</script>

<template>
  <UPage v-if="page">
    <LandingHero :page />
    <!-- Ordre pensé pour un recruteur : parcours, produits, puis le reste -->
    <UPageSection :ui="{ container: '!pt-0 gap-16 sm:gap-20' }">
      <LandingWorkExperience :page />
      <LandingProducts :page />
      <LandingAbout :page />
    </UPageSection>
    <LandingTestimonials :page />
    <LandingFAQ :faq="page.faq" />
  </UPage>
</template>
