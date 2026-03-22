import { Button } from './ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet'
import { Menu } from 'lucide-react'
import { cn } from '../lib/utils'
import { useState } from 'react'
import * as VisuallyHidden from '@radix-ui/react-visually-hidden'

import { navigationItems as sharedItems } from '../data/navigation-items'

const navigationItems = [{ name: 'Home', href: '/' }, ...sharedItems]

interface MobileMenuProps {
  currentPath: string
}

export function MobileMenu({ currentPath }: MobileMenuProps) {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" aria-label="Open mobile menu">
          <Menu className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <VisuallyHidden.Root>
          <SheetTitle>Mobile Menu</SheetTitle>
        </VisuallyHidden.Root>
        <VisuallyHidden.Root>
          <SheetDescription>
            Navegation bar turn to sheet for mobile devices
          </SheetDescription>
        </VisuallyHidden.Root>

        <div className="mt-5 flex flex-col space-y-1 px-2">
          {navigationItems.map((item, index) => {
            const isActive = currentPath === item.href
            return (
              <a
                key={index}
                href={item.href}
                aria-current={isActive ? 'page' : undefined}
                className={cn(
                  'group text-md flex items-center rounded-md px-2 py-2 font-semibold transition-colors',
                  isActive
                    ? 'bg-accent text-accent-foreground'
                    : 'text-foreground hover:bg-accent hover:text-accent-foreground',
                )}
              >
                {item.name}
              </a>
            )
          })}
        </div>

        <SheetFooter className="mt-5">
          <SheetClose asChild>
            <Button type="button">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
