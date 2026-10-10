export default defineAppConfig({
  global: {
    picture: {
      dark: '/portrait.png',
      light: '/portrait.png',
      alt: 'Portrait de Julien Castro'
    },
    meetingLink: 'https://cal.com/julien.castro/30min',
    email: 'julien.castro@protonmail.com',
    available: true
  },
  ui: {
    colors: {
      primary: 'green',
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
    credits: `© ${new Date().getFullYear()} Julien Castro`,
    colorMode: false,
    links: [
      { label: 'GitHub', to: 'https://github.com/Niwa-Yume', icon: 'i-simple-icons-github', target: '_blank' },
      { label: 'LinkedIn', to: 'https://www.linkedin.com/in/julien-castro/', icon: 'i-simple-icons-linkedin', target: '_blank' },
      { label: 'Email', to: 'mailto:julien.castro@protonmail.com', icon: 'i-lucide-mail' }
    ],
    // Bloc « Par le même auteur »
    sameAuthor: { label: 'GVA Watchmaking Guide', to: 'https://gvawatchguide.ch' }
  }
})
