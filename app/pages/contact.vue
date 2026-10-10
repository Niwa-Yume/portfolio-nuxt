<script setup lang="ts">
const { global, footer } = useAppConfig()

const linkedin = footer.links.find(link => link.label === 'LinkedIn')

useSeoMeta({
  title: 'Contact',
  ogTitle: 'Contact',
  description: 'Un poste, un projet ou une question : écrivez-moi par email ou sur LinkedIn.',
  ogDescription: 'Un poste, un projet ou une question : écrivez-moi par email ou sur LinkedIn.'
})
</script>

<template>
  <UPage>
    <UPageHero
      title="Me contacter"
      description="Un poste, un projet ou une question : écrivez-moi par email ou sur LinkedIn. Pour un projet freelance, vous pouvez aussi réserver un appel."
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
            v-if="linkedin"
            :to="linkedin.to"
            label="LinkedIn"
            color="neutral"
            variant="subtle"
            target="_blank"
            :icon="linkedin.icon"
          />
          <UButton
            :to="global.meetingLink"
            label="Réserver un appel"
            color="neutral"
            variant="ghost"
            target="_blank"
            icon="i-lucide-calendar"
          />
        </div>
      </template>
    </UPageHero>
  </UPage>
</template>
