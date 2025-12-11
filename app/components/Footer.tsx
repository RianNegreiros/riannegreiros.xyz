import { navigationItems } from '@/data/navigation-items'
import { RESUME_DATA } from '@/data/resume-data'
import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="px-4 md:px-8 lg:px-10 print:hidden">
      <hr className="mb-4 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
      <div className="mx-auto max-w-7xl text-center p-2 py-4">
        <Link href="/" className="inline-block mb-4">
          <Image src="/favicon.png" alt="Site Logo" width={32} height={32} />
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
            <Link
              className="mr-4 hover:underline md:mr-6"
              href="/api/rss"
              target="_blank"
            >
              RSS Feed
            </Link>
          </li>
        </ul>
        <div className="px-4 py-6 md:flex md:items-center md:justify-between">
          <span className="text-sm text-gray-500 dark:text-gray-300 sm:text-center">
            © {new Date().getFullYear()}{' '}
            <Link
              className="hover:underline"
              href={`${process.env.NEXT_PUBLIC_BASE_URL}`}
            >
              riannegreiros.com.br
            </Link>
            . Todos os direitos reservados.
          </span>
          <div className="flex sm:justify-center md:mt-0 space-x-5 rtl:space-x-reverse">
            {RESUME_DATA.contact.social.map((social) => (
              <Link
                href={social.url}
                key={social.name}
                className="text-gray-400 hover:text-gray-900 dark:hover:text-white"
                aria-label={social.name}
                target="_blank"
              >
                <social.icon className="w-4 h-4" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
