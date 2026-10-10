<script setup lang="ts">
const { data: page } = await useAsyncData('offres', () => {
  return queryCollection('offres').first()
})
if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found',
    fatal: true
  })
}

const { data: clients } = await useProjects('client')

const { global } = useAppConfig()

useSeoMeta({
  title: page.value?.seo?.title || page.value?.title,
  ogTitle: page.value?.seo?.title || page.value?.title,
  description: page.value?.seo?.description || page.value?.description,
  ogDescription: page.value?.seo?.description || page.value?.description
})

const sectionUi = {
  container: '!pt-0 gap-8 sm:gap-10',
  title: 'text-left text-xl sm:text-2xl lg:text-3xl font-medium',
  description: 'text-left mt-2 text-sm sm:text-base text-muted'
}

const cardClass = 'rounded-2xl border border-default/70 bg-default/70 p-6 lg:p-7 shadow-sm'
</script>

<template>
  <UPage v-if="page">
    <!-- 1. Promesse -->
    <UPageHero
      :title="page.title"
      :description="page.description"
      :ui="{
        container: 'relative py-16 sm:py-20 lg:py-24',
        title: '!mx-0 text-left max-w-3xl text-pretty',
        description: '!mx-0 mt-4 text-left max-w-2xl text-pretty leading-relaxed text-muted',
        links: 'justify-start pt-2'
      }"
    >
      <template #links>
        <div class="flex flex-col items-start gap-4">
          <div class="flex flex-wrap items-center gap-2">
            <UButton
              v-for="(link, index) of page.links"
              :key="index"
              size="xl"
              v-bind="link"
            />
            <UButton
              to="#realisations"
              label="Voir les réalisations"
              color="neutral"
              variant="subtle"
              size="xl"
            />
          </div>
          <UButton
            :color="global.available ? 'success' : 'error'"
            variant="ghost"
            class="gap-2 px-0"
            :to="global.available ? global.meetingLink : undefined"
            target="_blank"
            :label="global.available ? 'Disponible pour un nouveau projet' : 'Pas disponible pour l\'instant'"
          >
            <template #leading>
              <span class="relative flex size-2">
                <span
                  class="absolute inline-flex size-full rounded-full opacity-75"
                  :class="global.available ? 'bg-success animate-ping' : 'bg-error'"
                />
                <span
                  class="relative inline-flex size-2 scale-90 rounded-full"
                  :class="global.available ? 'bg-success' : 'bg-error'"
                />
              </span>
            </template>
          </UButton>
          <p
            v-if="page.proof"
            class="text-sm text-muted"
          >
            {{ page.proof }}
          </p>
        </div>
      </template>
    </UPageHero>

    <!-- 2. Offres -->
    <UPageSection
      title="Ce que je propose"
      :ui="sectionUi"
    >
      <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
        <article
          v-for="(offer, index) in page.offers"
          :key="offer.title"
          :class="cardClass"
          class="min-w-0 flex flex-col gap-5 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
        >
          <div class="flex items-center justify-between gap-3">
            <UIcon
              :name="offer.icon"
              class="size-6 text-primary"
              aria-hidden="true"
            />
            <span class="text-xs font-medium text-muted">0{{ index + 1 }}</span>
          </div>

          <div class="flex flex-col gap-3">
            <UBadge
              color="success"
              variant="soft"
              size="lg"
              class="self-start max-w-full"
              :label="offer.impact"
            />
            <h3 class="text-2xl leading-tight font-semibold text-highlighted text-balance">
              {{ offer.title }}
            </h3>
            <p class="text-base leading-relaxed text-toned">
              {{ offer.description }}
            </p>
          </div>

          <div class="rounded-xl border border-default/80 bg-elevated/40 p-4">
            <p class="text-xs uppercase tracking-[0.14em] text-muted">
              Pourquoi ça marche
            </p>
            <p class="mt-2 text-sm leading-relaxed text-muted">
              {{ offer.leverage }}
            </p>
          </div>

          <div class="mt-auto flex flex-col gap-3">
            <p
              v-if="offer.reference"
              class="text-sm text-muted"
            >
              Exemple :
              <ULink
                :to="offer.reference.to"
                class="text-highlighted underline underline-offset-2"
              >{{ offer.reference.label }}</ULink>
            </p>
            <UButton
              :label="offer.ctaLabel || 'Me contacter'"
              to="/contact"
              color="success"
              variant="soft"
              trailing-icon="i-lucide-arrow-right"
              class="w-full justify-center"
            />
          </div>
        </article>
      </div>
    </UPageSection>

    <!-- 3. Réalisations clients -->
    <UPageSection
      id="realisations"
      title="Réalisations clients"
      description="Des sites réalisés ou maintenus pour des clients à Genève et en Suisse."
      :ui="{ ...sectionUi, root: 'scroll-mt-20' }"
    >
      <ul class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <li
          v-for="project in clients"
          :key="project.id"
        >
          <ULink
            :to="project.url"
            target="_blank"
            class="group flex h-full flex-col gap-3"
          >
            <NuxtImg
              v-if="project.image"
              :src="project.image"
              alt=""
              width="400"
              height="240"
              densities="x1 x2"
              loading="lazy"
              class="aspect-[5/3] w-full rounded-xl border border-default/70 object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            />
            <div class="flex flex-wrap items-center gap-2">
              <h3 class="text-base font-semibold text-highlighted">
                {{ project.title }}
              </h3>
              <UBadge
                v-if="project.status"
                color="warning"
                variant="subtle"
                size="sm"
                :label="project.status"
              />
            </div>
            <p class="text-sm text-muted">
              {{ project.description }}
            </p>
          </ULink>
        </li>
      </ul>
    </UPageSection>

    <!-- 4. Méthode -->
    <UPageSection
      :title="page.process.title"
      :description="page.process.description"
      :ui="sectionUi"
    >
      <ol class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <li
          v-for="(step, index) in page.process.steps"
          :key="step.title"
          class="flex flex-col gap-2"
        >
          <span
            class="flex size-8 items-center justify-center rounded-full border border-default text-sm font-medium text-primary"
            aria-hidden="true"
          >{{ index + 1 }}</span>
          <h3 class="text-base font-semibold text-highlighted">
            {{ step.title }}
          </h3>
          <p class="text-sm leading-relaxed text-muted">
            {{ step.description }}
          </p>
        </li>
      </ol>
    </UPageSection>

    <!-- 5. Tarifs -->
    <UPageSection
      :title="page.pricing.title"
      :description="page.pricing.description"
      :ui="sectionUi"
    >
      <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div
          v-for="item in page.pricing.items"
          :key="item.label"
          :class="cardClass"
          class="flex flex-col gap-2"
        >
          <h3 class="text-xs uppercase tracking-[0.14em] text-muted">
            {{ item.label }}
          </h3>
          <p class="text-2xl font-semibold text-highlighted">
            {{ item.value }}
          </p>
          <p class="text-sm text-muted">
            {{ item.note }}
          </p>
        </div>
      </div>
      <p class="inline-flex items-start gap-2 text-sm text-muted">
        <UIcon
          name="i-lucide-info"
          class="mt-0.5 size-4 shrink-0"
          aria-hidden="true"
        />
        {{ page.pricing.payment }}
      </p>
    </UPageSection>

    <!-- 6. Témoignages -->
    <LandingTestimonials :testimonials="page.testimonials" />

    <!-- 7. FAQ -->
    <UPageSection :ui="{ container: '!pt-0' }">
      <LandingFAQ :faq="page.faq" />
    </UPageSection>

    <!-- 8. Appel à l'action -->
    <UPageSection :ui="{ container: '!pt-0' }">
      <UPageCTA
        :title="page.cta.title"
        :description="page.cta.description"
        variant="subtle"
        :links="[
          { label: 'Discuter de votre projet', to: '/contact', color: 'primary', trailingIcon: 'i-lucide-arrow-right' },
          { label: 'Réserver un appel', to: global.meetingLink, target: '_blank', color: 'neutral', variant: 'subtle', icon: 'i-lucide-calendar' }
        ]"
      />
    </UPageSection>
  </UPage>
</template>
