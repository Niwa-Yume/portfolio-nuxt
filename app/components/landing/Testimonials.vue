<script setup lang="ts">
import type { IndexCollectionItem } from '@nuxt/content'

type Testimonial = IndexCollectionItem['testimonials'][number]
type Author = Testimonial['author']

// Utilisé sur la home et sur /offres
defineProps<{
  testimonials: Testimonial[]
}>()

// Pas de photo inventée : initiales dérivées du nom (ou forcées via `initials`)
function initialsOf(author: Author) {
  return author.initials ?? author.name.split(/\s+/).map(word => word[0]).join('').slice(0, 2).toUpperCase()
}
</script>

<template>
  <UPageSection
    :ui="{
      container: 'px-0 !pt-0'
    }"
  >
    <UCarousel
      v-slot="{ item }"
      :items="testimonials"
      :autoplay="{ delay: 4000 }"
      loop
      dots
      :ui="{
        viewport: '-mx-4 sm:-mx-12 lg:-mx-16 bg-elevated/50 max-w-(--ui-container)'
      }"
    >
      <UPageCTA
        :description="item.quote"
        variant="naked"
        class="rounded-none"
        :ui="{
          container: 'sm:py-12 lg:py-12 sm:gap-8',
          description: '!text-base text-balance before:content-[open-quote] before:text-5xl lg:before:text-7xl before:inline-block before:text-dimmed before:absolute before:-ml-6 lg:before:-ml-10 before:-mt-2 lg:before:-mt-4 after:content-[close-quote] after:text-5xl lg:after:text-7xl after:inline-block after:text-dimmed after:absolute after:mt-1 lg:after:mt-0 after:ml-1 lg:after:ml-2'
        }"
      >
        <UUser
          :name="item.author.name"
          :description="item.author.description"
          :avatar="{ 'text': initialsOf(item.author), 'aria-hidden': 'true' }"
          size="xl"
          class="justify-center"
        />
      </UPageCTA>
    </UCarousel>
  </UPageSection>
</template>
