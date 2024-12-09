import { navigationItems } from '@/data/navigation-items'
import { RESUME_DATA } from '@/data/resume-data'
import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="px-4 md:px-8 lg:px-10 print:hidden">
      <hr className="mb-4 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
      <div className="mx-auto max-w-screen-xl text-center">
        <Link
          href="/"
          className="flex justify-center items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <Image
            src="/favicon.ico"
            alt="Site Logo"
            className="mr-2 h-8"
            width={32}
            height={32}
          />
        </Link>
        <ul className="flex flex-wrap justify-center items-center text-gray-900 dark:text-white">
          {navigationItems.map((item, index) => (
            <li key={index}>
              <Link className="mr-4 hover:underline md:mr-6" href={item.href}>
                {item.name}
              </Link>
            </li>
          ))}
          <li>
            <Link className="mr-4 hover:underline md:mr-6" href="/api/rss">
              RSS Feed
            </Link>
          </li>
        </ul>
        <div className="px-4 py-6 md:flex md:items-center md:justify-between">
          <span className="text-sm text-gray-500 dark:text-gray-300 sm:text-center">
            © {new Date().getFullYear()}{' '}
            <Link className="hover:underline" href={`${process.env.BASE_URL}`}>
              riannegreiros.dev
            </Link>
            . Todos os direitos reservados.
          </span>
          <div className="flex sm:justify-center md:mt-0 space-x-5 rtl:space-x-reverse">
            {RESUME_DATA.contact.social.map((social) => (
              <a
                href={social.url}
                key={social.name}
                className="text-gray-400 hover:text-gray-900 dark:hover:text-white"
                aria-label={social.name}
              >
                <social.icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
