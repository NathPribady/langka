import { NextResponse } from "next/server"
import { getSupabaseServerClient } from "@/lib/supabaseServer"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const page = Number.parseInt(searchParams.get("page") || "1")
  const limit = Number.parseInt(searchParams.get("limit") || "20")
  const categoryId = searchParams.get("categoryId")
  const sortBy = searchParams.get("sortBy") || "created_at"
  const sortOrder = searchParams.get("sortOrder") || "desc"

  const start = (page - 1) * limit
  const end = start + limit - 1

  try {
    const supabase = await getSupabaseServerClient()

    let query = supabase
      .from("books")
      .select(`
        *,
        categories (
          name,
          color
        )
      `)
      .order("id", { ascending: false })

    if (categoryId) {
      query = query.eq("category_id", categoryId)
    }

    const { data, error } = await query

    if (error) {
      throw error
    }

    const booksWithCategory = data.map((book) => ({
      ...book,
      category: book.categories.name,
    }))

    return NextResponse.json(booksWithCategory)
  } catch (error) {
    console.error("Error fetching books:", error)
    return NextResponse.json({ error: "An error occurred while fetching books" }, { status: 500 })
  }
}
