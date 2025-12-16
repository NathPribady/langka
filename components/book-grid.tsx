"use client"

import { useState } from "react"
import { Clock, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { track } from "@vercel/analytics"
import { Card, CardContent } from "@/components/ui/card"

interface Book {
  id: number
  title: string
  author: string
  image_url: string
  reading_time_hours: number
  url: string
  created_at: string
}

interface BookGridProps {
  books: Book[]
  initialLimit: number
}

export function BookGrid({ books, initialLimit }: BookGridProps) {
  const [limit, setLimit] = useState(initialLimit)

  const loadMore = () => {
    setLimit((prevLimit) => prevLimit + initialLimit)
  }

  const extractGoogleDriveId = (url: string): string | null => {
    const match = url.match(/\/d\/(.+?)\//)
    return match ? match[1] : null
  }

  const handleReadNow = (book: Book) => {
    track("book_read_click", {
      bookTitle: book.title,
      bookAuthor: book.author,
    })
    const fileId = extractGoogleDriveId(book.url)
    if (fileId) {
      window.open(`/read/${fileId}`, "_blank")
    } else {
      console.error("Invalid Google Drive URL")
    }
  }

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 lg:gap-6">
        {books.slice(0, limit).map((book, index) => (
          <Card
            key={book.id}
            className="group overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 border-0 shadow-md"
          >
            <CardContent className="p-0">
              <div className="relative aspect-[2/3] overflow-hidden">
                <img
                  src={book.image_url || "/placeholder.svg"}
                  alt={book.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Reading time badge */}
                <div className="absolute top-2 left-2 bg-black/75 backdrop-blur-sm px-2 py-1 rounded-md flex items-center gap-1">
                  <Clock className="w-3 h-3 text-white/75" />
                  <span className="text-[10px] sm:text-xs text-white/90 font-medium">
                    {book.reading_time_hours} JAM
                  </span>
                </div>

                {/* Hover overlay with read button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <Button
                    onClick={() => handleReadNow(book)}
                    size="sm"
                    className="bg-white text-black hover:bg-white/90 font-semibold px-3 sm:px-4 py-2 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
                  >
                    <Eye className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                    <span className="text-xs sm:text-sm">Baca</span>
                  </Button>
                </div>

                {/* Daily pick indicator for first few books */}
                {index < 3 && (
                  <div className="absolute top-2 right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-[8px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">
                    HARI INI
                  </div>
                )}
              </div>

              <div className="p-3 sm:p-4">
                <h3 className="font-semibold text-xs sm:text-sm leading-tight line-clamp-2 mb-1 sm:mb-2 group-hover:text-primary transition-colors">
                  {book.title}
                </h3>
                <p className="text-[10px] sm:text-xs text-muted-foreground line-clamp-1 mb-2 sm:mb-3">{book.author}</p>

                {/* Mobile read button */}
                <Button
                  onClick={() => handleReadNow(book)}
                  className="w-full bg-primary text-primary-foreground text-[10px] sm:text-xs font-medium px-2 sm:px-3 py-1 sm:py-1.5 rounded-full hover:bg-primary/90 transition-colors sm:hidden"
                >
                  Baca Sekarang
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {limit < books.length && (
        <div className="mt-8 sm:mt-12 text-center">
          <div className="inline-flex flex-col items-center gap-3">
            <p className="text-xs sm:text-sm text-muted-foreground">
              Menampilkan {limit} dari 600+ buku
            </p>
            <Button
              onClick={loadMore}
              variant="outline"
              className="px-6 sm:px-8 py-2 sm:py-3 bg-white text-black hover:bg-white/90 border-2 border-gray-200 hover:border-gray-300 font-semibold rounded-full transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <span className="text-sm sm:text-base">Lihat Lebih Banyak</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
