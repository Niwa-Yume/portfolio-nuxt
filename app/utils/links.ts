import type { NavigationMenuItem } from '@nuxt/ui'

export const navLinks: NavigationMenuItem[] = [{
  label: 'Accueil',
  icon: 'i-lucide-home',
  to: '/'
}, {
  label: 'Projets',
  icon: 'i-lucide-folder',
  to: '/projects'
}, {
  label: 'Offres',
  icon: 'i-lucide-briefcase',
  to: '/offers'
}, {
  label: 'Blog',
  icon: 'i-lucide-file-text',
  to: '/blog'
}, {
  label: 'à propos de moi',
  icon: 'i-lucide-user',
  to: '/about'
}]
