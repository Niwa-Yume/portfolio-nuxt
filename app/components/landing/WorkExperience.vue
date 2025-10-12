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
    :title="page.experience.title"
    :ui="{
      container: '!p-0 gap-4 sm:gap-4',
      title: 'text-left text-xl sm:text-xl lg:text-2xl font-medium',
      description: 'mt-2'
    }"
  >
    <template #description>
      <div class="flex flex-col gap-2">
        <Motion
          v-for="(experience, index) in page.experience.items"
          :key="index"
          :initial="{ opacity: 0, transform: 'translateY(20px)' }"
          :while-in-view="{ opacity: 1, transform: 'translateY(0)' }"
          :transition="{ delay: 0.4 + 0.2 * index }"
          :in-view-options="{ once: true }"
          class="text-muted flex items-center text-nowrap gap-2"
        >
          <p class="text-sm">
            {{ experience.date }}
          </p>
          <USeparator />
          <ULink
            class="flex items-center gap-1"
            :to="experience.company.url"
            target="_blank"
          >
            <span class="text-sm">
              {{ experience.position }}
            </span>
            <div
              class="inline-flex items-center gap-1"
              :style="{ color: experience.company.color }"
            >
              <span class="font-medium">{{ experience.company.name }}</span>
              <UIcon v-if="!isPath(experience.company.logo)" :name="experience.company.logo" />
              <img
                v-else
                :src="experience.company.logo"
                :alt="`${experience.company.name} logo`"
                width="20"
                height="20"
                style="display:inline-block;vertical-align:middle;"
              />
            </div>
          </ULink>
        </Motion>
      </div>
    </template>
  </UPageSection>
</template>

<style scoped>

</style>
