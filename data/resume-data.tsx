import { GitHubIcon, LinkedInIcon } from '@/components/icons'
import { SITE_CONFIG } from '@/lib/constants'

export const RESUME_DATA = {
  name: SITE_CONFIG.author,
  initials: 'RN',
  location: 'São João de Meriti, Rio de Janeiro',
  locationLink:
    'https://www.google.com/maps/place/S%C3%A3o+Jo%C3%A3o+de+Meriti',
  about: 'Desenvolvedor Back-end',
  summary:
    'Sou um Desenvolvedor Backend do Rio de Janeiro. Iniciei minha jornada na adolescência, configurando servidores e mods para o jogo DayZ usando Batchfile, Linguagem C, XML e JSON. Mas só após terminar o ensino médio, por influência do meu irmão mais velho, que já trabalhava na área, me guiou a escolha de ingressar na faculdade, dedicando-me integralmente a essa carreira, Tenho com experiência em Java, C# e Golang.Tenho foco de trabalhar em projetos de grandes empresas, por isso estudo as tecnologias e frameworks mais utilizados no mercado, como Spring e ASP.NET Core. Além disso, sou apaixonado por Golang, uma linguagem que me ajudou a aprender muito sobre desenvolvimento de software. Adoro que a maioria das coisas são feitas sem a abstração de um framework, o que me deu uma visão mais profunda de como os sistemas funcionam.',
  personalWebsiteUrl: process.env.NEXT_PUBLIC_BASE_URL,
  contact: {
    email: 'riannegreiros@gmail.com',
    tel: '+5521996538256',
    social: [
      {
        name: 'GitHub',
        url: 'https://github.com/riannegreiros',
        icon: GitHubIcon,
      },
      {
        name: 'LinkedIn',
        url: 'https://www.linkedin.com/in/riannegreiros/',
        icon: LinkedInIcon,
      },
    ],
  },
  education: [
    {
      school: 'Estácio de Sá',
      degree: 'Graduação Tecnológica - Análise e Desenvolvimento de Sistemas',
    },
  ],
  skills: [
    'C#/ASP.NET Core',
    'Java/Spring',
    'PostgreSQL',
    'MongoDB',
    'Redis',
    'Docker',
    'DevOps(CI/CD)',
    'Azure',
    'AWS',
    'GCP',
  ],
  projects: [
    {
      title: 'riannegreiros.com.br',
      techStack: ['Next.js', 'Sanity.io', 'Typescript', 'TailwindCSS'],
      description: 'Site e blog pessoal. Criado com Next.js e Sanity.io',
      link: {
        label: 'https://github.com/RianNegreiros/riannegreiros.com.br',
        href: 'https://riannegreiros.com.br',
      },
    },
    {
      title: 'Sistema de rastreamento de veículos',
      techStack: [
        'ASP.NET Core',
        'Golang',
        'Next.js',
        'Redis',
        'MongoDB',
        'Kafka',
      ],
      description:
        'Projeto feito durante a imersão Fullcycle 14, mas usando ASP.NET Core no lugar do NestJS',
      link: {
        label: 'https://github.com/RianNegreiros/imersao14-aspnet-core',
        href: '',
      },
    },
    {
      title: 'Chat Bot Application',
      techStack: ['ASP.NET Core', 'Next.js', 'Typescript', 'TailwindCSS'],
      description:
        'Aplicação Full Stack de um bot de bate-papo alimentado pelo Google Gemini',
      link: {
        label: 'https://github.com/RianNegreiros/DotNetChatBot',
        href: '',
      },
    },
    {
      title: 'Gerador de vídeos de curtos com IA',
      techStack: [
        'ASP.NET Core 9',
        'Next.js 15',
        'Typescript',
        'TailwindCSS',
        'PostgreSQL',
        'Google Cloud Text-to-Speech',
        'Google Gemini',
        'Cloudflare Workers AI',
        'AWS Lambda',
        'AWS S3',
      ],
      description:
        'Aplicação Full Stack para criar vídeos curtos gerados por IA com legendas.',
      link: {
        label: 'https://github.com/RianNegreiros/AiShortsVideosGenerator',
        href: '',
      },
    },
  ],
  courses: [
    {
      title: 'Imersão Fullcycle 14',
      platform: 'Fullcycle',
      description:
        'Evento de desenvolvimento com NestJS, React e microsserviços',
      link: {
        label: 'https://imersaofc.fullcycle.com.br',
        href: 'https://imersaofc.fullcycle.com.br',
      },
    },
    {
      title: 'NLW Journey - Trilha Java',
      platform: 'Rocketseat',
      description: 'Evento de desenvolvimento com Java, Spring Boot',
      link: {
        label:
          'https://rocketseat.com.br/blog/artigos/post/por-que-nlw-e-especial',
        href: 'https://rocketseat.com.br/blog/artigos/post/por-que-nlw-e-especial',
      },
    },
    {
      title: 'Especialista Java',
      platform: 'Algaworks',
      description: 'Curso de especialização em Java e Spring Boot',
      link: {
        label:
          'https://lp.algaworks.com/wp-content/uploads/2025/10/EJ-Brochura-e-ofertas.pdf',
        href: 'https://lp.algaworks.com/wp-content/uploads/2025/10/EJ-Brochura-e-ofertas.pdf',
      },
    },
    {
      title: 'Full Stack Ruby On Rails',
      platform: 'The Odin Project',
      description: 'Curso de desenvolvimento com Ruby on Rails',
      link: {
        label: 'https://www.theodinproject.com/paths/full-stack-ruby-on-rails',
        href: 'https://www.theodinproject.com/paths/full-stack-ruby-on-rails',
      },
    },
    {
      title: 'Curso de JavaScript e TypeScript do básico ao avançado JS/TS',
      platform: 'Udemy',
      description: 'Curso de desenvolvimento com Ruby on Rails',
      link: {
        label:
          'https://www.udemy.com/course/curso-de-javascript-moderno-do-basico-ao-avancado',
        href: 'https://www.udemy.com/course/curso-de-javascript-moderno-do-basico-ao-avancado',
      },
    },
  ],
} as const
