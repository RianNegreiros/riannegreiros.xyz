import { GitHubIcon, LinkedInIcon } from '@/components/icons'

export const RESUME_DATA = {
  name: 'Rian Negreiros Dos Santos',
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
      start: '08/2020',
      end: '12/2023',
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
      title: 'riannegreiros.xyz',
      techStack: ['Next.js', 'Sanity.io', 'Typescript', 'TailwindCSS'],
      description: 'Site e blog pessoal. Criado com Next.js e Sanity.io',
      link: {
        label: 'https://github.com/RianNegreiros/riannegreiros.xyz',
        href: 'https://riannegreiros.xyz',
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
} as const
