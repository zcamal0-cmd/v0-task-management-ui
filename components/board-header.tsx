"use client"

import { Search, Filter, SlidersHorizontal, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface BoardHeaderProps {
  boardName: string
  workspaceName: string
  workspaceImage: string
}

export function BoardHeader({ boardName, workspaceName, workspaceImage }: BoardHeaderProps) {
  return (
    <div className="border-b border-border bg-card">
      <div className="px-6 py-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-12 w-12 rounded-lg overflow-hidden ring-2 ring-purple-500/50">
            <img
              src={workspaceImage || "/placeholder.svg"}
              alt={workspaceName}
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              {boardName}
            </h1>
            <p className="text-sm text-muted-foreground">{workspaceName}</p>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="outline" size="sm" className="border-purple-500/50 hover:bg-purple-500/10 bg-transparent">
              Members
            </Button>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search" className="pl-9" />
          </div>
          <Button variant="outline" size="sm" className="border-blue-500/50 hover:bg-blue-500/10 bg-transparent">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          <Button variant="outline" size="sm" className="border-cyan-500/50 hover:bg-cyan-500/10 bg-transparent">
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            Sort
          </Button>
        </div>
      </div>
    </div>
  )
}
