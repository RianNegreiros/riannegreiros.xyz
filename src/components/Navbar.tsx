import { Link } from 'react-router-dom'
import { ModeToggle } from './ModeToggle'
import { MobileMenu } from './MobileMenu'
import { navigationItems } from '../data/navigation-items'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from './ui/navigation-menu'
import { navigationMenuTriggerStyle } from './ui/variants'

export function Navbar() {
  return (
    <nav
      className="bg-background shadow-sm print:hidden"
      aria-label="Main navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex-shrink-0 md:w-1/4">
            <h1 className="text-3xl whitespace-nowrap">
              <span className="text-primary font-bold">Rian</span>
              <span className="text-muted-foreground ml-2 opacity-50">
                Negreiros
              </span>
            </h1>
          </Link>

          <div className="hidden md:flex flex-1 justify-center">
            <NavigationMenu>
              <NavigationMenuList>
                {navigationItems.map((item, index) => (
                  <NavigationMenuItem key={index}>
                    <Link
                      to={item.href}
                      className={navigationMenuTriggerStyle()}>
                      {item.name}
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
