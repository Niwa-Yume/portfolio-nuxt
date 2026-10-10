<script setup lang="ts">
const { data: page } = await useAsyncData('projects-page', () => {
  return queryCollection('pages').path('/projects').first()
})
if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found',
    fatal: true
  })
}

const [{ data: produits }, { data: clients }, { data: perso }] = await Promise.all([
  useProjects('produit'),
  useProjects('client'),
  useProjects('perso')
])

const sections = computed(() => [
  { id: 'produits', title: 'Produits', description: 'Ce que je construis et maintiens.', items: produits.value },
  { id: 'clients', title: 'Travail client', description: 'Sites réalisés ou maintenus pour des clients.', items: clients.value },
  { id: 'perso', title: 'Projets personnels & école', description: 'Expérimentations, projets entrepreneuriaux et projets réalisés pendant mes études.', items: perso.value }
])

const { global } = useAppConfig()

useSeoMeta({
  title: page.value?.seo?.title || page.value?.title,
  ogTitle: page.value?.seo?.title || page.value?.title,
  description: page.value?.seo?.description || page.value?.description,
  ogDescription: page.value?.seo?.description || page.value?.description
})
</script>

<template>
  <UPage v-if="page">
    <UPageHero
      :title="page.title"
      :description="page.description"
      :links="page.links"
      :ui="{
        title: '!mx-0 text-left',
        description: '!mx-0 text-left',
        links: 'justify-start'
      }"
    >
      <template #links>
        <div
          v-if="page.links"
          class="flex items-center gap-2"
        >
          <UButton
            :to="`mailto:${global.email}`"
            v-bind="page.links[0]"
          />
          <UButton
            to="/#parcours"
            v-bind="page.links[1]"
          />
        </div>
      </template>
    </UPageHero>
    <UPageSection
      v-for="section in sections"
      :id="section.id"
      :key="section.id"
      :title="section.title"
      :description="section.description"
      :ui="{
        container: '!pt-0',
        title: 'text-left text-xl sm:text-xl lg:text-2xl font-medium',
        description: 'text-left mt-2 text-sm text-muted'
      }"
    >
      <Motion
        v-for="(project, index) in section.items"
        :key="project.id"
        :initial="{ opacity: 0, transform: 'translateY(10px)' }"
        :while-in-view="{ opacity: 1, transform: 'translateY(0)' }"
        :transition="{ delay: 0.1 * index }"
        :in-view-options="{ once: true }"
      >
        <ProjectCard
          :project="project"
          :reverse="index % 2 === 1"
        />
      </Motion>
    </UPageSection>
  </UPage>
</template>
