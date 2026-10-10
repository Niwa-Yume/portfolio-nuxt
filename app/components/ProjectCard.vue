<script setup lang="ts">
import type { ProjectsCollectionItem } from '@nuxt/content'

defineProps<{
  project: ProjectsCollectionItem
  reverse?: boolean
}>()

const statusColor = {
  'En ligne': 'success',
  'En développement': 'warning',
  'Terminé': 'neutral'
} as const
</script>

<template>
  <UPageCard
    :title="project.title"
    :description="project.description"
    :to="project.url"
    :target="project.url ? '_blank' : undefined"
    orientation="horizontal"
    variant="naked"
    :reverse="reverse"
    class="group"
    :ui="{
      wrapper: 'max-sm:order-last'
    }"
  >
    <template #leading>
      <div class="flex flex-wrap items-center gap-2 text-sm text-muted">
        <UBadge
          v-if="project.status"
          :color="statusColor[project.status]"
          variant="subtle"
          :label="project.status"
        />
        <span v-if="project.role">{{ project.role }}</span>
        <span v-if="project.date">{{ project.date }}</span>
      </div>
    </template>

    <template #footer>
      <div class="flex flex-col gap-2">
        <ul
          v-if="project.tags.length"
          class="flex flex-wrap gap-1"
          aria-label="Stack"
        >
          <li
            v-for="tag in project.tags"
            :key="tag"
          >
            <UBadge
              color="neutral"
              variant="outline"
              size="sm"
              :label="tag"
            />
          </li>
        </ul>
        <p
          v-if="project.metric"
          class="text-xs text-muted"
        >
          {{ project.metric }}
        </p>
        <span
          v-if="project.url"
          class="text-sm text-primary flex items-center"
        >
          Voir le projet
          <UIcon
            name="i-lucide-arrow-right"
            class="size-4 text-primary transition-all opacity-0 group-hover:translate-x-1 group-hover:opacity-100"
            aria-hidden="true"
          />
        </span>
      </div>
    </template>

    <!-- alt vide : le titre du projet est déjà le texte du lien de la carte -->
    <NuxtImg
      v-if="project.image"
      :src="project.image"
      alt=""
      width="400"
      height="192"
      densities="x1 x2"
      loading="lazy"
      class="object-cover w-full h-48 rounded-lg"
    />
  </UPageCard>
</template>
