import { RESUME_DATA } from '@/data/resume-data';
import Image from 'next/image';
import Link from 'next/link';

const navigationItems = [
  {
    name: 'Posts',
    href: '/',
  },
  {
    name: 'Projetos',
    href: '/projects',
  },
  {
    name: 'Currículo',
    href: '/resume',
  },
]

export default function Footer() {
  return (
    <footer className="p-4 md:p-8 lg:p-10">
      <hr className="my-3 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
      <div className="mx-auto max-w-screen-xl text-center">
        <Link href="/" className="flex justify-center items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <Image src="/favicon.ico" alt="Logo" className="mr-2 h-8" width={32} height={32} />
        </Link>
        <ul className="flex flex-wrap justify-center items-center mb-6 text-gray-900 dark:text-white">
          {navigationItems.map((item, index) => (
            <li key={index}>
              <Link className="mr-4 hover:underline md:mr-6" href={item.href}>
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
        <div className="px-4 py-6 md:flex md:items-center md:justify-between">
          <span className="text-sm text-gray-500 dark:text-gray-300 sm:text-center">© {new Date().getFullYear()} <Link href="https://www.riannegreiros.dev/">riannegreiros.dev</Link>. Todos os direitos reservados.
          </span>
          <div className="flex sm:justify-center md:mt-0 space-x-5 rtl:space-x-reverse">
            {RESUME_DATA.contact.social.map((social) => (
              <a href={social.url} className="text-gray-400 hover:text-gray-900 dark:hover:text-white">
                <social.icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
