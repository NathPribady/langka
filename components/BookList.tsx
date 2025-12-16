"use client"

import { useState, useEffect } from "react"
import { createClient } from "@supabase/supabase-js"
import { Header } from "./header"
import { BookCard } from "./book-card"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables")
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

interface Book {
  id: number
  title: string
  author: string
  category: string
  image_url: string
  url: string
  status: "available" | "borrowed" | "hold"
  progress: number | null
}

export default function BookList() {
  const [books, setBooks] = useState<Book[]>([])
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([])
  const [searchQuery, setSearchQuery] = useState<string>("")

  useEffect(() => {
    fetchBooks()
  }, [])

  async function fetchBooks() {
    const { data, error } = await supabase.from("books").select("*")
    if (error) {
      console.error("Error fetching books:", error)
    } else {
      setBooks(data)
      setFilteredBooks(data)
    }
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    const filtered = books.filter(
      (book) =>
        book.title.toLowerCase().includes(query.toLowerCase()) ||
        book.author.toLowerCase().includes(query.toLowerCase()),
    )
    setFilteredBooks(filtered)
  }

  const handleBookClick = (url: string) => {
    window.location.href = url
  }

  return (
    <div className="min-h-screen bg-background">
      <Header onSearch={handleSearch} />
      <main className="container py-6">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {filteredBooks.map((book) => (
            <BookCard
              key={book.id}
              title={book.title}
              author={book.author}
              imageUrl={book.image_url}
              status={book.status}
              progress={book.progress || undefined}
              onClick={() => handleBookClick(book.url)}
            />
          ))}
        </div>
      </main>
    </div>
  )
}
