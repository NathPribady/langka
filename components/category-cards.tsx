import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"

interface Category {
  id: string
  name: string
  color: string
  cover_urls: string[]
}

interface CategoryCardsProps {
  categories: Category[]
}

function generateGradient(color: string): string {
  // Convert hex to RGB
  const r = Number.parseInt(color.slice(1, 3), 16)
  const g = Number.parseInt(color.slice(3, 5), 16)
  const b = Number.parseInt(color.slice(5, 7), 16)

  // Generate a lighter version of the color
  const lighterColor = `rgba(${r + (255 - r) * 0.6}, ${g + (255 - g) * 0.6}, ${b + (255 - b) * 0.6}, 0.8)`

  return `linear-gradient(135deg, ${color}, ${lighterColor})`
}

export function CategoryCards({ categories }: CategoryCardsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {categories.map((category) => (
        <Link href={`/category/${category.id}`} key={category.id}>
          <Card className="overflow-hidden hover:shadow-lg transition-shadow">
            <CardContent className="p-4 aspect-[4/3] relative" style={{ background: generateGradient(category.color) }}>
              <h3 className="relative z-10 text-lg font-semibold mb-2 line-clamp-2 text-white drop-shadow-md">
                {category.name}
              </h3>
              <div className="absolute bottom-0 right-0 left-0 flex justify-end px-4 pb-4">
                <div className="flex -space-x-4">
                  {category.cover_urls.map((url, i) => (
                    <img
                      key={i}
                      src={url || "/placeholder.svg"}
                      alt=""
                      className="w-12 h-16 object-cover rounded shadow-lg transform last:rotate-0 rotate-[-8deg]"
                      style={{ zIndex: category.cover_urls.length - i }}
                    />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}
