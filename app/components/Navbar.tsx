'use client'

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ModeToggle } from './ModeToggle'
import { MobileMenu } from './MobileMenu'
import { navigationItems } from '@/data/navigation-items'
import SearchInput from '@/app/components/SearchInput'

export function Navbar() {
  const pathname = usePathname()
  return (
    <nav className="bg-background shadow-sm print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex-shrink-0">
            <h1 className="text-3xl font-semibold">
              Rian <span className="text-blue-500">Negreiros</span>
            </h1>
          </Link>
          <div className="hidden md:flex flex-1 justify-center items-center">
            <NavigationMenu>
              <NavigationMenuList>
                {navigationItems.map((item, index) => (
                  <NavigationMenuItem key={index}>
                    <Link href={item.href} legacyBehavior passHref>
                      <NavigationMenuLink
                        active={pathname === item.href}
                        className={navigationMenuTriggerStyle()}
                      >
                        {item.name}
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          <div className="flex items-center">
            <SearchInput />
            <div className="ml-4 flex items-center md:ml-6">
              <ModeToggle />
            </div>
            <div className="flex justify-end sm:hidden ml-4">
              <MobileMenu />
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
