<script setup lang="ts">
import type { IndexCollectionItem } from '@nuxt/content'

defineProps<{
  page: IndexCollectionItem
}>()

const { data: products } = await useProjects('produit')
</script>

<template>
  <UPageSection
    :title="page.projects.title"
    :description="page.projects.description"
    :ui="{
      container: '!p-0 gap-4 sm:gap-6',
      title: 'text-left text-xl sm:text-xl lg:text-2xl font-medium',
      description: 'text-left mt-2 text-sm text-muted'
    }"
  >
    <ProjectCard
      v-for="(project, index) in products"
      :key="project.id"
      :project="project"
      :reverse="index % 2 === 1"
    />
    <UButton
      to="/projects"
      label="Voir tous les projets"
      variant="link"
      trailing-icon="i-lucide-arrow-right"
      class="px-0 self-start"
    />
  </UPageSection>
</template>
