import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Clock } from "lucide-react"

interface BookCardProps {
  title: string
  author: string
  imageUrl: string
  status: "available" | "borrowed" | "hold"
  progress?: number
  onClick: () => void
  readingTimeHours: number
  createdAt: string
}

const BookCard = React.memo(
  ({ title, author, imageUrl, status, progress, onClick, readingTimeHours, createdAt }: BookCardProps) => {
    return (
      <Card className="group cursor-pointer transition-all hover:shadow-lg" onClick={onClick}>
        <CardContent className="p-0">
          <div className="relative">
            <img
              src={imageUrl || "/placeholder.svg"}
              alt={title}
              className="aspect-[2/3] w-full rounded-t-lg object-cover"
            />
            <div className="absolute right-2 top-2">
              <Badge variant={status === "available" ? "default" : status === "borrowed" ? "secondary" : "outline"}>
                {status === "available" ? "Available" : status === "borrowed" ? "Borrowed" : "On Hold"}
              </Badge>
            </div>
            {status === "borrowed" && progress !== undefined && (
              <div className="absolute bottom-0 left-0 w-full bg-background/80 p-2 backdrop-blur-sm">
                <Progress value={progress} className="h-1" />
              </div>
            )}
            <div className="absolute top-2 left-2 bg-black/75 backdrop-blur-sm px-2 py-1 rounded-md flex items-center gap-1">
              <Clock className="w-3 h-3 text-white/75" />
              <span className="text-[10px] sm:text-xs text-white/90">{readingTimeHours} JAM</span>
            </div>
          </div>
          <div className="p-4">
            <h3 className="font-semibold leading-none tracking-tight">{title}</h3>
            <p className="text-sm text-muted-foreground">{author}</p>
            <p className="text-xs text-muted-foreground mt-1">
              {new Date(createdAt).toLocaleDateString("id-ID", { year: "numeric", month: "long", day: "numeric" })}
            </p>
          </div>
        </CardContent>
      </Card>
    )
  },
)

BookCard.displayName = "BookCard"

export { BookCard }
