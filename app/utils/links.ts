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
  to: '/offres'
}, {
  label: 'À propos',
  icon: 'i-lucide-user',
  to: '/about'
}]
