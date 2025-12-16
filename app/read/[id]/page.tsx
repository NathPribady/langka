"use client"

import { useParams } from "next/navigation"
import { GoogleDriveViewer } from "@/components/google-drive-viewer"
import { MainNav } from "@/components/main-nav"
import { useState, useEffect } from "react"
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Variabel lingkungan Supabase tidak ditemukan")
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default function ReadPage() {
  const params = useParams()
  const fileId = params.id as string
  const [categories, setCategories] = useState([])

  useEffect(() => {
    fetchCategories()
  }, [])

  async function fetchCategories() {
    try {
      const { data, error } = await supabase.from("categories").select("*")
      if (error) throw error
      setCategories(data || [])
    } catch (error) {
      console.error("Error fetching categories:", error)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <div className="relative z-50">
        <MainNav categories={categories} />
      </div>
      <main className="flex-1 relative">
        <div className="absolute inset-0">
          <GoogleDriveViewer fileId={fileId} />
        </div>
      </main>
    </div>
  )
}
