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
  personalWebsiteUrl: 'riannegreiros.dev',
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
  // work: [
  //   {
  //     company: "",
  //     link: "",
  //     badges: [""],
  //     title: "",
  //     logo: ,
  //     start: "",
  //     end: null,
  //     description: ""
  //   },
  // ],
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
    'XP/Scrum',
  ],
  projects: [
    {
      title: 'riannegreiros.dev',
      techStack: ['Next.js', 'Sanity.io', 'Typescript', 'TailwindCSS'],
      description: 'Site e blog pessoal. Criado com Next.js e Sanity.io',
      link: {
        label: 'github.com/RianNegreiros/riannegreiros.dev',
        href: 'https://riannegreiros.dev',
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
        label: 'github.com/RianNegreiros/imersao14-aspnet-core',
        href: '',
      },
    },
    {
      title: 'Chat Bot Application',
      techStack: ['ASP.NET Core', 'Next.js', 'Typescript', 'TailwindCSS'],
      description:
        'Este é um aplicativo full stack criado com ASP.NET Core 8 e Next.js com TypeScript e TailwindCSS. O aplicativo é um bot de bate-papo alimentado pelo PaLM 2',
      link: {
        label: 'github.com/RianNegreiros/DotNetChatBot',
        href: '',
      },
    },
  ],
} as const
