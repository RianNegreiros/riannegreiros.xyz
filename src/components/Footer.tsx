import { navigationItems } from '@/data/navigation-items'
import { RESUME_DATA } from '@/data/resume-data'

export default function Footer() {
  return (
    <footer className="mb-12 px-4 md:px-8 lg:px-10 xl:mb-8 print:hidden">
      <hr className="mb-4 border-gray-200 sm:mx-auto lg:my-8 dark:border-gray-700" />
      <div className="mx-auto max-w-7xl text-center">
        <ul className="mb-6 flex flex-wrap items-center justify-center text-gray-900 dark:text-white">
          {navigationItems.map((item, index) => (
            <li key={index}>
              <a className="mr-4 hover:underline md:mr-6" href={item.href}>
                {item.name}
              </a>
            </li>
          ))}
          <li>
            <a
              className="mr-4 hover:underline md:mr-6"
              href="/rss.xml"
              target="_blank"
            >
              RSS Feed
            </a>
          </li>
        </ul>
        <div className="px-4 py-6 md:flex md:items-center md:justify-between">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-300">
            © {new Date().getFullYear()}{' '}
            <a className="hover:underline" href="/">
              riannegreiros.com.br
            </a>
            . Todos os direitos reservados.
          </span>
          <div className="flex space-x-5 sm:justify-center md:mt-0 rtl:space-x-reverse">
            {RESUME_DATA.contact.social.map((social) => (
              <a
                href={social.url}
                key={social.name}
                className="text-gray-400 hover:text-gray-900 dark:hover:text-white"
                aria-label={social.name}
                target="_blank"
                rel="noopener noreferrer"
              >
                <social.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
