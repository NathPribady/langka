"use client"

import Link from "next/link"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { track } from "@vercel/analytics"

interface Category {
  id: string
  name: string
}

interface MainNavProps {
  categories: Category[]
  currentCategoryId?: string
}

export function MainNav({ categories, currentCategoryId }: MainNavProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleTentangClick = () => {
    track("tentang_click")
  }

  const handleDukungKamiClick = () => {
    track("dukung_kami_click")
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex items-center h-16 px-4">
        <div className="flex items-center gap-6 flex-1">
          <Link
            href="/"
            className="text-2xl font-bold text-primary hover:text-primary/80 transition-colors relative z-10"
          >
            Langka
          </Link>
          <nav className="hidden md:flex items-center space-x-6 text-sm">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/category/${category.id}`}
                className={`transition-colors hover:text-primary ${
                  currentCategoryId === category.id ? "text-primary font-medium" : "text-muted-foreground"
                }`}
              >
                {category.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-2 ml-auto">
          <div className="hidden md:flex items-center gap-2">
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="font-semibold px-4 py-2 rounded-full transition-colors duration-200 bg-white text-black hover:bg-white/90"
            >
              <Link href="/tentang" onClick={handleTentangClick}>
                Tentang
              </Link>
            </Button>
            <Button
              asChild
              variant="default"
              size="sm"
              className="font-semibold px-4 py-2 rounded-full transition-colors duration-200 bg-white text-black hover:bg-white/90"
            >
              <Link href="/dukung-kami" onClick={handleDukungKamiClick}>
                Dukung
              </Link>
            </Button>
          </div>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden relative z-10" onClick={() => setIsOpen(true)}>
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-4 mt-8">
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    href={`/category/${category.id}`}
                    className={`text-lg transition-colors hover:text-primary ${
                      currentCategoryId === category.id ? "text-primary font-medium" : "text-muted-foreground"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {category.name}
                  </Link>
                ))}
                <Link
                  href="/tentang"
                  className="text-lg text-muted-foreground hover:text-primary transition-colors"
                  onClick={() => {
                    handleTentangClick()
                    setIsOpen(false)
                  }}
                >
                  Tentang
                </Link>
                <Link
                  href="/dukung-kami"
                  className="text-lg text-primary hover:text-primary/80 transition-colors"
                  onClick={() => {
                    handleDukungKamiClick()
                    setIsOpen(false)
                  }}
                >
                  Dukung Kami
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
