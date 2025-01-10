'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ModeToggle } from './ModeToggle'
import { MobileMenu } from './MobileMenu'
import { navigationItems } from '@/data/navigation-items'
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu'

export function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="bg-background shadow-sm" aria-label="Main navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex-shrink-0 md:w-1/4">
            <h1 className="text-3xl font-semibold whitespace-nowrap">
              Rian <span className="text-primary">Negreiros</span>
            </h1>
          </Link>
          <div className="hidden md:flex flex-1 justify-center">
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
          <div className="flex items-center space-x-4 md:w-1/4 justify-end">
            <ModeToggle />
            <div className="md:hidden">
              <MobileMenu />
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
