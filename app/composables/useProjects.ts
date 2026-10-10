import type { ProjectsCollectionItem } from '@nuxt/content'

export type ProjectCategory = ProjectsCollectionItem['category']

// Tri : `order` croissant d'abord, puis date décroissante (les projets sans date à la fin)
function compare(a: ProjectsCollectionItem, b: ProjectsCollectionItem) {
  const orderA = a.order ?? Number.POSITIVE_INFINITY
  const orderB = b.order ?? Number.POSITIVE_INFINITY
  if (orderA !== orderB) return orderA - orderB
  return Number(b.date ?? 0) - Number(a.date ?? 0)
}

export function useProjects(category?: ProjectCategory) {
  return useAsyncData(`projects-${category ?? 'all'}`, async () => {
    const query = queryCollection('projects')
    const list = category ? await query.where('category', '=', category).all() : await query.all()
    return list.sort(compare)
  }, { default: () => [] })
}
