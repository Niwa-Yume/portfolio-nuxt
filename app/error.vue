<script setup lang="ts">
import type { NuxtError } from '#app'

defineProps({
  error: {
    type: Object as PropType<NuxtError>,
    required: true
  }
})

useHead({
  htmlAttrs: {
    lang: 'fr'
  }
})

useSeoMeta({
  title: 'Page introuvable',
  description: 'Désolé, cette page n’existe pas ou a été déplacée.'
})
</script>

<template>
  <div>
    <AppHeader :links="navLinks" />

    <UMain>
      <UContainer>
        <UPage>
          <UError
            :error="error"
            :clear="{ label: 'Retour à l’accueil' }"
          />
        </UPage>
      </UContainer>
    </UMain>

    <AppFooter />

    <UToaster />
  </div>
</template>
