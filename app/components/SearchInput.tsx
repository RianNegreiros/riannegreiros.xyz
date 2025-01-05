'use client'

import { Input } from '@/components/ui/Input'
import React, { useEffect, useRef, useState } from 'react'
import { client } from '@/app/lib/sanity'
import { post } from '@/app/lib/interface'
import { File, Menu, Search } from 'lucide-react'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

async function getData(searchParam: string): Promise<post[]> {
  const query = `*[_type == 'post' && (title match '${searchParam}*' || content match '${searchParam}*')]{
    title,
    _id,
    overview,
    "slug": slug.current
  }`
  return await client.fetch(query)
}

export default function SearchInput() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<post[]>([])
  const searchInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [isSearchOpen])

  useEffect(() => {
    const fetchResults = async () => {
      if (searchQuery) {
        const results = await getData(searchQuery)
        setSearchResults(results)
      } else {
        setSearchResults([])
      }
    }
    fetchResults()
  }, [searchQuery])

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  return (
      <div className="relative">
        <Input
          type="search"
          placeholder="Search..."
          className="w-64 cursor-pointer hidden md:block"
          value={searchQuery}
          onChange={handleSearchInput}
          onFocus={() => setIsSearchOpen(true)}
        />

        <Button variant="outline" size="icon"
        onClick={() => setIsSearchOpen(true)}
                className='flex md:hidden items-center justify-center'
                aria-label="Open search"
        >
          <Search className="h-4 w-4" />
        </Button>

        <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
          <DialogContent className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto p-4 sm:p-6">
            <DialogTitle className="sr-only">Search Results</DialogTitle>
            <div className="mt-6">
              <Input
                ref={searchInputRef}
                type="search"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearchInput}
                className="w-full"
              />
            </div>
            <ScrollArea className="h-[300px] w-full rounded-md border p-4">
              {searchResults.length > 0 ? (
                <div className="space-y-4">
                  {searchResults.map((item) => (
                    <Link
                      key={item._id}
                      href={`/posts/${item.slug}`}
                      className="block p-3 hover:bg-accent rounded-lg transition-colors"
                      onClick={() => setIsSearchOpen(false)}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                          <File className="h-4 w-4" />
                        </span>
                        <div className="flex-grow min-w-0">
                          <h3 className="text-sm font-medium text-foreground truncate">
                            {item.title}
                          </h3>
                          <p className="text-xs text-muted-foreground truncate">
                            {item.overview}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : searchQuery ? (
                <p className="text-center text-muted-foreground">
                  No results found
                </p>
              ) : null}
            </ScrollArea>
          </DialogContent>
        </Dialog>
      </div>
  )
}
