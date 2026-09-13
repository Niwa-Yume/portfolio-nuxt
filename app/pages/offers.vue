<script setup lang="ts">
const { data: page } = await useAsyncData('offers', () => {
  return queryCollection('offers').first()
})
if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found',
    fatal: true
  })
}
useSeoMeta({
  title: page.value?.seo?.title || page.value?.title,
  ogTitle: page.value?.seo?.title || page.value?.title,
  description: page.value?.seo?.description || page.value?.description,
  ogDescription: page.value?.seo?.description || page.value?.description
})

function triangleCardClass(index: number, total: number): string {
  if (total !== 3) return 'lg:col-span-3'
  if (index === 0) return 'lg:col-start-2 lg:col-span-4 lg:row-start-1'
  if (index === 1) return 'lg:col-start-1 lg:col-span-3 lg:row-start-2'
  if (index === 2) return 'lg:col-start-4 lg:col-span-3 lg:row-start-2'
  return 'lg:col-span-3'
}
</script>

<template>
  <UPage v-if="page">
    <UPageHero
      :title="page.title"
      :description="page.description"
      :ui="{
        container: 'relative py-16 sm:py-20 lg:py-18',
        title: '!mx-0 text-left max-w-3xl text-pretty',
        description: '!mx-0 mt-4 text-left max-w-2xl text-pretty leading-relaxed text-muted',
        links: 'justify-start pt-2'
      }"
    >
      <template #links>
        <UButton
          v-if="page.links?.[0]"
          to="/contact"
          :label="page.links[0].label"
          color="success"
          size="xl"
          trailing-icon="i-lucide-arrow-right"
        />
      </template>
    </UPageHero>

    <UPageSection
      :ui="{
        container: '!pt-0 space-y-8'
      }"
    >
      <div class="mx-auto w-full max-w-6xl grid grid-cols-1 lg:grid-cols-6 gap-6 lg:gap-x-8 lg:gap-y-7 items-stretch">
        <article
          v-for="(offer, index) in page.offers"
          :key="offer.title || index"
          :class="triangleCardClass(index, page.offers.length)"
          class="min-w-0 h-full rounded-2xl border border-default/70 bg-default/70 p-6 lg:p-7 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 flex flex-col gap-5"
        >
          <div class="flex items-center justify-between gap-3 min-w-0">
            <UBadge
              color="success"
              variant="soft"
              size="lg"
              class="max-w-full truncate"
            >
              {{ offer.impact }}
            </UBadge>
            <span class="shrink-0 text-xs font-medium text-muted">0{{ index + 1 }}</span>
          </div>

          <h2 class="text-2xl leading-tight font-semibold text-highlighted text-balance min-w-0">
            {{ offer.title }}
          </h2>

          <p class="text-base leading-relaxed text-toned min-w-0">
            {{ offer.description }}
          </p>

          <div class="rounded-xl border border-default/80 bg-elevated/40 p-4 min-w-0">
            <p class="text-xs uppercase tracking-[0.14em] text-muted">
              Pourquoi cette offre marche
            </p>
            <p class="mt-2 text-sm leading-relaxed text-muted">
              {{ offer.leverage }}
            </p>
          </div>

          <UButton
            :label="offer.ctaLabel || 'Me contacter'"
            to="/contact"
            color="success"
            variant="soft"
            trailing-icon="i-lucide-arrow-right"
            class="mt-auto w-full justify-center"
          />
        </article>
      </div>
    </UPageSection>
  </UPage>
</template>
