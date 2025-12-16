"use client"

import { useState, useEffect, Suspense } from "react"
import { getSupabaseBrowserClient } from "@/lib/supabaseClient"
import { BookGrid } from "@/components/book-grid"
import { SearchField } from "@/components/search-field"
import { Skeleton } from "@/components/ui/skeleton"
import { MainNav } from "@/components/main-nav"
import { FeaturedBooks } from "@/components/featured-book"
import useSWR from "swr"

function generateGradient(color: string): string {
  const r = Number.parseInt(color.slice(1, 3), 16)
  const g = Number.parseInt(color.slice(3, 5), 16)
  const b = Number.parseInt(color.slice(5, 7), 16)
  const lighterColor = `rgba(${r + (255 - r) * 0.6}, ${g + (255 - g) * 0.6}, ${b + (255 - b) * 0.6}, 0.8)`
  return `linear-gradient(135deg, ${color}, ${lighterColor})`
}

interface Book {
  id: number
  title: string
  author: string
  image_url: string
  reading_time_hours: number
  url: string
  is_featured: boolean
  description: string
  category: string
  categoryColor: string
}

interface Category {
  id: string
  name: string
  color: string
}

const fetcher = (...args: any) => fetch(...args).then((res) => res.json())

function CategoryPageContent({ params }: { params: { id: string } }) {
  const [books, setBooks] = useState<Book[]>([])
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([])
  const [featuredBooks, setFeaturedBooks] = useState<Book[]>([])
  const [category, setCategory] = useState<Category | null>(null)
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const { data: booksData, error: booksError } = useSWR(`/api/books?categoryId=${params.id}`, fetcher)

  useEffect(() => {
    fetchCategoryAndBooks()
    fetchCategories()
  }, [params.id])

  useEffect(() => {
    filterBooks()
  }, [booksData, searchQuery])

  async function fetchCategoryAndBooks() {
    try {
      setIsLoading(true)
      setError(null)

      const supabase = getSupabaseBrowserClient()
      const { data: categoryData, error: categoryError } = await supabase
        .from("categories")
        .select("id, name, color")
        .eq("id", params.id)
        .single()

      if (categoryError) throw new Error(categoryError.message)
      if (!categoryData) throw new Error("Kategori tidak ditemukan")

      setCategory(categoryData)
    } catch (err: any) {
      setError(err.message)
      console.error("Error mengambil data:", err)
    } finally {
      setIsLoading(false)
    }
  }

  async function fetchCategories() {
    try {
      const supabase = getSupabaseBrowserClient()
      const { data, error } = await supabase.from("categories").select("*")

      if (error) throw new Error(error.message)
      if (!data || data.length === 0) throw new Error("Tidak ada kategori yang ditemukan")

      setCategories(data)
    } catch (err) {
      console.error("Error mengambil data kategori:", err)
    }
  }

  useEffect(() => {
    if (booksData) {
      const booksWithCategory = booksData.map((book: any) => ({
        ...book,
        category: book.categories?.name || "Uncategorized",
        categoryColor: category?.color || book.categories?.color || "#000000",
      }))
      const featured = booksWithCategory.filter((book: any) => book.is_featured)
      setFeaturedBooks(featured.slice(0, 3))
      setBooks(booksWithCategory)
      setFilteredBooks(booksWithCategory)
    }
  }, [booksData, category])

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

  if (booksError) {
    return (
      <div className="min-h-screen bg-black text-white">
        <MainNav categories={categories} currentCategoryId={params.id} />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <h2 className="text-xl text-red-500 mb-2">Error memuat data</h2>
            <p className="text-gray-400">{booksError.message}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <MainNav categories={categories} currentCategoryId={params.id} />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 p-6 rounded-lg" style={{ background: generateGradient(category?.color || "#000000") }}>
          <h1 className="text-2xl font-medium text-white/80 mb-1">Kategori</h1>
          <h2 className="text-4xl font-bold text-white">{category?.name || "Memuat..."}</h2>
        </div>
        <div className="flex justify-end mb-6">
          <SearchField onSearch={handleSearch} />
        </div>
        {isLoading || !booksData ? (
          <div className="space-y-4">
            <div className="flex gap-4 overflow-x-auto pb-4">
              <Skeleton className="h-[180px] w-[280px] flex-shrink-0 bg-muted" />
              <Skeleton className="h-[180px] w-[280px] flex-shrink-0 bg-muted" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-6">
              {[...Array(10)].map((_, i) => (
                <Skeleton key={i} className="aspect-[2/3] w-full bg-muted" />
              ))}
            </div>
          </div>
        ) : (
          <>
            {featuredBooks.length > 0 && !searchQuery && (
              <FeaturedBooks
                books={featuredBooks.map((book) => ({
                  title: book.title,
                  author: book.author,
                  category: book.category,
                  categoryColor: book.categoryColor || category?.color || "#000000",
                  coverUrl: book.image_url,
                  description: book.description,
                  readingTimeHours: book.reading_time_hours,
                  url: book.url,
                }))}
              />
            )}

            <BookGrid books={filteredBooks} initialLimit={20} />
          </>
        )}
      </div>
    </div>
  )
}

export default function CategoryPage({ params }: { params: { id: string } }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CategoryPageContent params={params} />
    </Suspense>
  )
}
