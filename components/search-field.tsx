"use client"

import type React from "react"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import type { FormEvent } from "react"
import { useState } from "react"

interface SearchFieldProps {
  onSearch: (query: string) => void
}

export function SearchField({ onSearch }: SearchFieldProps) {
  const [query, setQuery] = useState("")

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSearch(query)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)
    // Real-time search
    onSearch(value)
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-sm items-center space-x-2">
      <div className="relative flex-grow">
        <Input
          type="search"
          value={query}
          onChange={handleInputChange}
          placeholder="Cari buku..."
          className="w-full bg-white text-black placeholder-gray-500 border-gray-300 focus:border-black focus:ring-black"
        />
        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
      </div>
      <Button type="submit" className="bg-red-600 text-white hover:bg-red-700 transition-colors">
        Cari
      </Button>
    </form>
  )
}
