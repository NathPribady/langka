"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabaseClient"
import { SearchField } from "@/components/search-field"
import { FeaturedBooks } from "@/components/featured-book"
import { BookGrid } from "@/components/book-grid"
import { CategoryCards } from "@/components/category-cards"
import { CampaignBanner } from "@/components/campaign-banner"
import { Skeleton } from "@/components/ui/skeleton"
import { MainNav } from "@/components/main-nav"
import { Sparkles, BookOpen, Library, Shuffle } from "lucide-react"

interface Book {
  id: number
  title: string
  author: string
  image_url: string
  reading_time_hours: number
  url: string
  category_id: string
  is_featured: boolean
  description: string
  category: string
  categoryColor: string
}

interface Category {
  id: string
  name: string
  color: string
  cover_urls: string[]
}

// Function to get daily random books
function getDailyRandomBooks(books: Book[], count = 3): Book[] {
  if (books.length === 0) return []

  // Use current date as seed for consistent daily randomization
  const today = new Date().toDateString()
  const seed = today.split("").reduce((a, b) => {
    a = (a << 5) - a + b.charCodeAt(0)
    return a & a
  }, 0)

  // Simple seeded random function
  let seedValue = Math.abs(seed)
  const seededRandom = () => {
    seedValue = (seedValue * 9301 + 49297) % 233280
    return seedValue / 233280
  }

  // Shuffle array with seeded random
  const shuffled = [...books].sort(() => seededRandom() - 0.5)
  return shuffled.slice(0, count)
}

// Function to shuffle all books daily
function getDailyShuffledBooks(books: Book[]): Book[] {
  if (books.length === 0) return []

  // Use current date as seed for consistent daily randomization
  const today = new Date().toDateString()
  const seed = today.split("").reduce((a, b) => {
    a = (a << 5) - a + b.charCodeAt(0)
    return a & a
  }, 0)

  // Simple seeded random function with different multiplier for different order
  let seedValue = Math.abs(seed * 1.5)
  const seededRandom = () => {
    seedValue = (seedValue * 16807 + 0) % 2147483647
    return seedValue / 2147483647
  }

  // Shuffle array with seeded random
  return [...books].sort(() => seededRandom() - 0.5)
}

export default function Home() {
  const [books, setBooks] = useState<Book[]>([])
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [featuredBooks, setFeaturedBooks] = useState<Book[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [initialLimit, setInitialLimit] = useState(20)

  useEffect(() => {
    fetchBooks()
    fetchCategories()
    setInitialBookLimit()
  }, [])

  useEffect(() => {
    filterBooks()
  }, [searchQuery, books])

  const setInitialBookLimit = () => {
    const handleResize = () => {
      setInitialLimit(window.innerWidth < 640 ? 12 : 20)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }

  async function fetchBooks() {
    try {
      setIsLoading(true)
      setError(null)

      let query = supabase.from("books").select(`
        *,
        categories (
          name,
          color
        )
      `)

      query = query.order("id", { ascending: false })

      const { data, error: supabaseError } = await query

      if (supabaseError) {
        throw new Error(supabaseError.message)
      }

      if (!data || data.length === 0) {
        throw new Error("Tidak ada buku yang ditemukan")
      }

      const booksWithCategory = data.map((book) => ({
        ...book,
        category: book.categories?.name || "Uncategorized",
        categoryColor: book.categories?.color || "#000000",
      }))

      // Get daily random featured books
      const dailyFeatured = getDailyRandomBooks(booksWithCategory, 3)
      setFeaturedBooks(dailyFeatured)

      // Shuffle all books daily
      const shuffledBooks = getDailyShuffledBooks(booksWithCategory)
      setBooks(shuffledBooks)
      setFilteredBooks(shuffledBooks)
    } catch (err) {
      setError(err.message)
      console.error("Error mengambil data buku:", err)
    } finally {
      setIsLoading(false)
    }
  }

  async function fetchCategories() {
    try {
      const { data, error } = await supabase.from("categories").select("*")

      if (error) {
        throw new Error(error.message)
      }

      if (!data || data.length === 0) {
        throw new Error("Tidak ada kategori yang ditemukan")
      }

      setCategories(data)
    } catch (err) {
      console.error("Error mengambil data kategori:", err)
    }
  }

  function filterBooks() {
    if (!searchQuery) {
      setFilteredBooks(books)
    } else {
      const filtered = books.filter(
        (book) =>
          book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          book.author.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      setFilteredBooks(filtered)
    }
  }

  function handleSearch(query: string) {
    setSearchQuery(query)
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <MainNav categories={categories} />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <h2 className="text-xl text-destructive mb-2">Error memuat buku</h2>
            <p className="text-muted-foreground">{error}</p>
            <button
              onClick={fetchBooks}
              className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-full hover:bg-primary/90"
            >
              Coba Lagi
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <MainNav categories={categories} />

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="absolute inset-0 bg-[url('/abstract-book-pattern.png')] opacity-10"></div>
        <div className="relative container mx-auto px-4 py-12 sm:py-16 lg:py-24">
          <div className="text-center space-y-4 sm:space-y-6">
            <div className="flex items-center justify-center gap-2 mb-2 sm:mb-4">
              <Sparkles className="h-4 w-4 sm:h-6 sm:w-6 text-yellow-400" />
              <span className="text-yellow-400 font-medium text-sm sm:text-base">Koleksi Hari Ini</span>
              <Sparkles className="h-4 w-4 sm:h-6 sm:w-6 text-yellow-400" />
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white leading-tight">
              Selamat datang di
              <span className="block bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent">
                Buku Langka 🇮🇩
              </span>
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed px-4">
              Temukan harta karun intelektual Indonesia yang hampir hilang. Koleksi buku langka yang dipilih khusus.
            </p>
            <div className="flex justify-center pt-2 sm:pt-4 px-4">
              <div className="w-full max-w-md">
                <SearchField onSearch={handleSearch} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 sm:py-8 lg:py-12">
        {isLoading ? (
          <div className="space-y-6 sm:space-y-8">
            <div className="text-center">
              <Skeleton className="h-6 sm:h-8 w-48 sm:w-64 mx-auto mb-2 sm:mb-4" />
              <Skeleton className="h-3 sm:h-4 w-64 sm:w-96 mx-auto" />
            </div>
            <div className="flex gap-3 sm:gap-4 overflow-x-auto pb-4">
              <Skeleton className="h-[180px] sm:h-[200px] w-[280px] sm:w-[320px] flex-shrink-0" />
              <Skeleton className="h-[180px] sm:h-[200px] w-[280px] sm:w-[320px] flex-shrink-0" />
              <Skeleton className="h-[180px] sm:h-[200px] w-[280px] sm:w-[320px] flex-shrink-0 hidden sm:block" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-6">
              {[...Array(10)].map((_, i) => (
                <Skeleton key={i} className="aspect-[2/3] w-full" />
              ))}
            </div>
          </div>
        ) : (
          <>
            {featuredBooks.length > 0 && !searchQuery && (
              <div className="mb-8 sm:mb-12">
                <div className="text-center mb-6 sm:mb-8">
                  <div className="flex items-center justify-center gap-2 mb-2 sm:mb-3">
                    <BookOpen className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                    <span className="text-xs sm:text-sm font-medium text-primary uppercase tracking-wider">
                      Pilihan Hari Ini
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold mb-2">Buku Terpilih</h2>
                  <p className="text-sm sm:text-base text-muted-foreground px-4">
                    Koleksi spesial yang berubah setiap hari
                  </p>
                </div>
                <FeaturedBooks
                  books={featuredBooks.map((book) => ({
                    title: book.title,
                    author: book.author,
                    category: book.category,
                    categoryColor: book.categoryColor,
                    coverUrl: book.image_url,
                    description: book.description,
                    readingTimeHours: book.reading_time_hours,
                    url: book.url,
                  }))}
                />
              </div>
            )}

            <div className="mb-8 sm:mb-12">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 px-3 py-1.5 rounded-full border border-blue-500/20">
                    <Shuffle className="h-4 w-4 text-blue-500" />
                    <span className="text-xs font-medium text-blue-500 uppercase tracking-wider">Acak Harian</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl sm:text-2xl font-bold">Semua Buku</h3>
                  <span className="text-xs sm:text-sm text-muted-foreground bg-muted px-2 py-1 rounded-full">
                    600+ buku
                  </span>
                </div>
              </div>
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-xl p-4 sm:p-6 mb-6">
                <div className="flex items-start gap-3">
                  <Library className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-1 text-sm sm:text-base">
                      Urutan Berubah Setiap Hari
                    </h4>
                    <p className="text-xs sm:text-sm text-blue-700 dark:text-blue-300 leading-relaxed">
                      Koleksi buku di bawah ini disusun secara acak setiap hari untuk memberikan saran buku-buku menarik
                      yang mungkin terlewat!
                    </p>
                  </div>
                </div>
              </div>
              <BookGrid books={filteredBooks} initialLimit={initialLimit} />
            </div>
          </>
        )}

        <div className="mb-6 sm:mb-8 lg:mb-12">
          <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Jelajahi Kategori</h3>
          <CategoryCards categories={categories} />
        </div>

        <CampaignBanner />
      </div>
    </div>
  )
}
