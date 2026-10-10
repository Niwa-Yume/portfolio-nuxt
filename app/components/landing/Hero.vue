<script setup lang="ts">
import type { IndexCollectionItem } from '@nuxt/content'

const { footer, global } = useAppConfig()

defineProps<{
  page: IndexCollectionItem
}>()

// Même animation d'entrée qu'avant, factorisée ; seul le délai varie
const reveal = (delay: number) => ({
  initial: { scale: 1.1, opacity: 0, filter: 'blur(20px)' },
  animate: { scale: 1, opacity: 1, filter: 'blur(0px)' },
  transition: { duration: 0.6, delay }
})
</script>

<template>
  <UPageHero
    :ui="{
      headline: 'flex items-center justify-center',
      title: 'text-shadow-md max-w-lg mx-auto',
      links: 'mt-4 flex-col justify-center items-center'
    }"
  >
    <template #headline>
      <Motion v-bind="reveal(0.1)">
        <UColorModeAvatar
          class="size-18 ring ring-default ring-offset-3 ring-offset-(--ui-bg)"
          :light="global.picture?.light!"
          :dark="global.picture?.dark!"
          :alt="global.picture?.alt!"
          width="72"
          height="72"
        />
      </Motion>
    </template>

    <template #title>
      <Motion v-bind="reveal(0.1)">
        {{ page.title }}
      </Motion>
    </template>

    <template #description>
      <Motion v-bind="reveal(0.3)">
        <p class="inline-flex items-center gap-1 text-sm text-muted">
          <UIcon
            name="i-lucide-map-pin"
            class="size-4"
            aria-hidden="true"
          />
          {{ page.hero.location }}
        </p>
        <p class="mt-2">
          {{ page.description }}
        </p>
      </Motion>
    </template>

    <template #links>
      <Motion v-bind="reveal(0.5)">
        <div class="flex flex-wrap items-center justify-center gap-2">
          <UButton
            v-for="(link, index) of page.hero.links"
            :key="index"
            v-bind="link"
          />
        </div>
      </Motion>

      <div class="gap-x-4 inline-flex mt-4">
        <Motion
          v-for="(link, index) of footer?.links"
          :key="index"
          v-bind="reveal(0.5 + index * 0.1)"
        >
          <UButton
            v-bind="{ size: 'md', color: 'neutral', variant: 'ghost', ...link }"
          />
        </Motion>
      </div>
    </template>
  </UPageHero>
</template>
