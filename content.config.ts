import { defineCollection, defineContentConfig, z } from '@nuxt/content'

const createBaseSchema = () => z.object({
  title: z.string(),
  description: z.string()
})

const createButtonSchema = () => z.object({
  label: z.string(),
  icon: z.string().optional(),
  to: z.string().optional(),
  color: z.enum(['primary', 'neutral', 'success', 'warning', 'error', 'info']).optional(),
  size: z.enum(['xs', 'sm', 'md', 'lg', 'xl']).optional(),
  variant: z.enum(['solid', 'outline', 'subtle', 'soft', 'ghost', 'link']).optional(),
  target: z.enum(['_blank', '_self']).optional()
})

const createImageSchema = () => z.object({
  src: z.string().editor({ input: 'media' }),
  alt: z.string(),
  caption: z.string().optional()
})

const createAuthorSchema = () => z.object({
  name: z.string(),
  description: z.string().optional(),
  username: z.string().optional(),
  twitter: z.string().optional(),
  to: z.string().optional(),
  initials: z.string().optional()
})

const createFaqSchema = () => z.object({
  title: z.string(),
  description: z.string().optional(),
  categories: z.array(
    z.object({
      title: z.string().nonempty(),
      questions: z.array(
        z.object({
          label: z.string().nonempty(),
          content: z.string().nonempty()
        })
      )
    }))
})

const createTestimonialSchema = () => z.object({
  quote: z.string(),
  author: createAuthorSchema()
})

export default defineContentConfig({
  collections: {
    index: defineCollection({
      type: 'page',
      source: 'index.yml',
      schema: z.object({
        hero: z.object({
          location: z.string(),
          links: z.array(createButtonSchema())
        }),
        about: createBaseSchema(),
        experience: createBaseSchema().extend({
          items: z.array(z.object({
            // Texte libre (« Fév 2026 - Juil 2026 », « été 2025 »)
            date: z.string().optional(),
            position: z.string(),
            impact: z.string().optional(),
            metric: z.string().optional(),
            company: z.object({
              name: z.string(),
              url: z.string().optional(),
              logo: z.string().editor({ input: 'icon' }),
              color: z.string().optional()
            })
          }))
        }),
        testimonials: z.array(createTestimonialSchema()),
        projects: createBaseSchema(),
        faq: createFaqSchema()
      })
    }),
    projects: defineCollection({
      type: 'data',
      source: 'projects/*.yml',
      schema: z.object({
        title: z.string().nonempty(),
        description: z.string().nonempty(),
        category: z.enum(['produit', 'client', 'perso']),
        status: z.enum(['En ligne', 'En développement', 'Terminé']).optional(),
        role: z.string().optional(),
        metric: z.string().optional(),
        image: z.string().editor({ input: 'media' }).optional(),
        url: z.string().optional(),
        // Stack technique
        tags: z.array(z.string()),
        date: z.string().optional(),
        // Ordre d'affichage dans la section (croissant), puis date décroissante
        order: z.number().optional()
      })
    }),
    pages: defineCollection({
      type: 'page',
      source: 'projects.yml',
      schema: z.object({
        links: z.array(createButtonSchema())
      })
    }),
    offres: defineCollection({
      type: 'page',
      source: 'offres.yml',
      schema: z.object({
        links: z.array(createButtonSchema()),
        offers: z.array(z.object({
          title: z.string(),
          impact: z.string(),
          leverage: z.string(),
          description: z.string(),
          ctaLabel: z.string().optional()
        })),
        faq: createFaqSchema()
      })
    }),
    about: defineCollection({
      type: 'page',
      source: 'about.yml',
      schema: z.object({
        content: z.object({}),
        images: z.array(createImageSchema())
      })
    })
  }
})
