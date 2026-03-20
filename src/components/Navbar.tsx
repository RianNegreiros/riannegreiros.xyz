import { ModeToggle } from './ModeToggle'
import { navigationItems } from '../data/navigation-items'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from './ui/navigation-menu'
import { navigationMenuTriggerStyle } from './ui/variants'
import { lazy, Suspense } from 'react'
import { ThemeProvider } from '../contexts/ThemeContext'

const MobileMenu = lazy(() =>
  import('./MobileMenu').then((module) => ({ default: module.MobileMenu })),
)

function NavbarInner({ currentPath }: { currentPath: string }) {
  return (
    <nav
      className="bg-background shadow-sm print:hidden"
      aria-label="Main navigation"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <a href="/" className="flex-shrink-0 md:w-1/4">
            <h1 className="text-3xl whitespace-nowrap">
              <span className="text-primary font-bold">Rian</span>
              <span className="text-muted-foreground ml-2 opacity-75">
                Negreiros
              </span>
            </h1>
          </a>

          <div className="hidden flex-1 justify-center md:flex">
            <NavigationMenu>
              <NavigationMenuList>
                {navigationItems.map((item, index) => {
                  const isActive = currentPath === item.href
                  return (
                    <NavigationMenuItem key={index}>
                      <a
                        href={item.href}
                        aria-current={isActive ? 'page' : undefined}
                        className={navigationMenuTriggerStyle({
                          active: isActive,
                        })}
                      >
                        {item.name}
                      </a>
                    </NavigationMenuItem>
                  )
                })}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className="flex items-center justify-end space-x-4 md:w-1/4">
            <ModeToggle />
            <div className="md:hidden">
              <Suspense fallback={null}>
                <MobileMenu currentPath={currentPath} />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export function Navbar({ currentPath }: { currentPath: string }) {
  return (
    <ThemeProvider>
      <NavbarInner currentPath={currentPath} />
    </ThemeProvider>
  )
}
