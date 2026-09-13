<script setup lang="ts">
const { global } = useAppConfig()

useSeoMeta({
  title: 'Contact',
  ogTitle: 'Contact',
  description: 'Parlons de votre projet et de vos objectifs.',
  ogDescription: 'Parlons de votre projet et de vos objectifs.'
})
</script>

<template>
  <UPage>
    <UPageHero
      title="Parlons de votre projet"
      description="Dites-moi où vous voulez aller, je vous aide à construire une solution claire, rapide et durable."
      :ui="{
        title: '!mx-0 text-left',
        description: '!mx-0 text-left',
        links: 'justify-start'
      }"
    >
      <template #links>
        <div class="flex flex-wrap items-center gap-2">
          <UButton
            :to="`mailto:${global.email}`"
            label="M'envoyer un email"
            icon="i-lucide-mail"
          />
          <UButton
            :to="global.meetingLink"
            label="Réserver un appel"
            color="neutral"
            variant="subtle"
            target="_blank"
            icon="i-lucide-calendar"
          />
        </div>
      </template>
    </UPageHero>
  </UPage>
</template>
