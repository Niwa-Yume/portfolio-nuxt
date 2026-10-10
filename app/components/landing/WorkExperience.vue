<script setup lang="ts">
import type { IndexCollectionItem } from '@nuxt/content'

defineProps<{
  page: IndexCollectionItem
}>()

function isPath(v?: string) {
  return !!v && (v.startsWith('/') || v.startsWith('http') || v.endsWith('.svg'))
}
</script>

<template>
  <UPageSection
    id="parcours"
    :title="page.experience.title"
    :ui="{
      root: 'scroll-mt-20',
      container: '!p-0 gap-4 sm:gap-6',
      title: 'text-left text-xl sm:text-xl lg:text-2xl font-medium'
    }"
  >
    <ol class="flex flex-col divide-y divide-default">
      <Motion
        v-for="(experience, index) in page.experience.items"
        :key="index"
        as="li"
        :initial="{ opacity: 0, transform: 'translateY(20px)' }"
        :while-in-view="{ opacity: 1, transform: 'translateY(0)' }"
        :transition="{ delay: 0.1 * index }"
        :in-view-options="{ once: true }"
        class="flex gap-3 py-4 first:pt-0"
      >
        <!-- Logo décoratif : le nom de l'entreprise est écrit juste à côté -->
        <div class="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-md bg-elevated">
          <UIcon
            v-if="!isPath(experience.company.logo)"
            :name="experience.company.logo"
            class="size-5 text-muted"
            aria-hidden="true"
          />
          <NuxtImg
            v-else
            :src="experience.company.logo"
            alt=""
            width="20"
            height="20"
            densities="x1 x2"
            loading="lazy"
            class="size-5 object-contain"
          />
        </div>

        <div class="min-w-0 flex-1">
          <div class="flex flex-col gap-x-3 sm:flex-row sm:items-baseline sm:justify-between">
            <h3 class="text-base font-medium text-highlighted">
              <ULink
                v-if="experience.company.url"
                :to="experience.company.url"
                target="_blank"
                :style="{ color: experience.company.color }"
                class="hover:underline underline-offset-2"
              >{{ experience.company.name }}</ULink>
              <span
                v-else
                :style="{ color: experience.company.color }"
              >{{ experience.company.name }}</span>
              <span class="text-muted font-normal"> · {{ experience.position }}</span>
            </h3>
            <p
              v-if="experience.date"
              class="shrink-0 text-sm text-muted"
            >
              {{ experience.date }}
            </p>
          </div>
          <p
            v-if="experience.impact"
            class="mt-1 text-sm text-toned"
          >
            {{ experience.impact }}
          </p>
          <p
            v-if="experience.metric"
            class="mt-1 text-xs text-muted"
          >
            {{ experience.metric }}
          </p>
        </div>
      </Motion>
    </ol>
  </UPageSection>
</template>
