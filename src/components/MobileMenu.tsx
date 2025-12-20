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
import { Link, useLocation } from 'react-router-dom'
import { cn } from '../lib/utils'
import { useState } from 'react'
import * as VisuallyHidden from '@radix-ui/react-visually-hidden'

const navigationItems = [
  { name: 'Home', href: '/' },
  { name: 'Blog', href: '/blog' },
  { name: 'Projects', href: '/projects' },
  { name: 'Resume', href: '/resume' },
]

export function MobileMenu() {
  const location = useLocation()
  const [open, setOpen] = useState(false)

  return (
    <Sheet
      key={location.pathname}
      open={open}
      onOpenChange={(state) => setOpen(state)}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
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
        <div className="mt-5 flex px-2 space-y-1 flex-col">
          {navigationItems.map((item, index) => (
            <Link
              key={index}
              to={item.href}
              className={cn(
                location.pathname === item.href
                  ? 'bg-muted'
                  : 'hover:bg-muted hover:bg-opacity-75',
                'group flex items-center px-2 py-2 text-md font-semibold rounded-md',
              )}>
              {item.name}
            </Link>
          ))}
        </div>

        <SheetFooter className="mt-5">
          <SheetClose asChild>
            <Button type="submit">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
