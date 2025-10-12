export default defineAppConfig({
  global: {
    picture: {
      dark: '/logo-juju-dev.png',
      light: '/logo-juju-dev.png',
      alt: 'Ma photo de profil'
    },
    meetingLink: 'https://cal.com/julien.castro/30min',
    email: 'julien.castro@protonmail.com',
    available: true
  },
  ui: {
    colors: {
      primary: 'blue',
      neutral: 'neutral'
    },
    pageHero: {
      slots: {
        container: 'py-18 sm:py-24 lg:py-32',
        title: 'mx-auto max-w-xl text-pretty text-3xl sm:text-4xl lg:text-5xl',
        description: 'mt-2 text-md mx-auto max-w-2xl text-pretty sm:text-md text-muted'
      }
    }
  },
  footer: {
    credits: `Built with Nuxt UI • © ${new Date().getFullYear()}`,
    colorMode: false,
    links: [
      { label: 'GitHub', to: 'https://github.com/Niwa-Yume', icon: 'i-simple-icons-github' },
      { label: 'Email', to: 'mailto:julien.castro@protonmail.com', icon: 'i-lucide-mail' }
    ]
  }
})
