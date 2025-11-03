"use client"

import { useState } from "react"
import { MessageSquare, Calendar, Plus, ChevronDown } from "lucide-react"
import type { Board, WorkItem, WorkItemStatus } from "@/lib/mock-data"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface BoardKanbanViewProps {
  board: Board
  showTags?: boolean
  showWorkItemType?: boolean
  showEmployeeName?: boolean
  showDueDate?: boolean
}

const statusColumns: { status: WorkItemStatus; label: string; color: string }[] = [
  { status: "new", label: "New", color: "bg-gray-500/20 border-gray-500" },
  { status: "active", label: "Working on it", color: "bg-orange-500/20 border-orange-500" },
  { status: "stuck", label: "Stuck", color: "bg-red-500/20 border-red-500" },
  { status: "done", label: "Done", color: "bg-green-500/20 border-green-500" },
  { status: "cancelled", label: "Cancelled", color: "bg-gray-500/20 border-gray-500" },
]

const tagColors = [
  "bg-blue-500/20 text-blue-400 border-blue-500/30",
  "bg-purple-500/20 text-purple-400 border-purple-500/30",
  "bg-pink-500/20 text-pink-400 border-pink-500/30",
  "bg-teal-500/20 text-teal-400 border-teal-500/30",
  "bg-orange-500/20 text-orange-400 border-orange-500/30",
]

export function BoardKanbanView({
  board,
  showTags = true,
  showWorkItemType = true,
  showEmployeeName = false,
  showDueDate = false,
}: BoardKanbanViewProps) {
  const [draggedItem, setDraggedItem] = useState<WorkItem | null>(null)

  const allWorkItems = board.groups.flatMap((group) => group.workItems)

  const getItemsByStatus = (status: WorkItemStatus) => {
    return allWorkItems.filter((item) => item.status === status)
  }

  const handleDragStart = (item: WorkItem) => {
    setDraggedItem(item)
  }

  const handleDragEnd = () => {
    setDraggedItem(null)
  }

  return (
    <div className="flex gap-4 overflow-x-auto pb-4">
      {statusColumns.map((column) => {
        const items = getItemsByStatus(column.status)
        return (
          <div key={column.status} className="flex-shrink-0 w-80">
            <div className={cn("rounded-lg border-2 p-3 mb-3", column.color)}>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-sm">{column.label}</h3>
                <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">{items.length}</span>
              </div>
            </div>

            <div className="space-y-3">
              {items.map((item) => (
                <div
                  key={item.id}
                  draggable
                  onDragStart={() => handleDragStart(item)}
                  onDragEnd={handleDragEnd}
                  className={cn(
                    "bg-card border border-border rounded-lg p-4 cursor-move hover:shadow-lg transition-all",
                    draggedItem?.id === item.id && "opacity-50",
                    column.status === "active" && "hover:shadow-orange-500/20",
                    column.status === "stuck" && "hover:shadow-red-500/20",
                    column.status === "done" && "hover:shadow-green-500/20",
                  )}
                >
                  <div className="mb-3">
                    <h4 className="font-medium text-sm mb-1">{item.title}</h4>
                    <span className="text-xs text-cyan-400 font-medium">{item.id}</span>
                  </div>

                  {showTags && item.tags && item.tags.length > 0 && (
                    <div className="flex gap-1 flex-wrap mb-3">
                      {item.tags.map((tag, idx) => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className={cn("text-xs border", tagColors[idx % tagColors.length])}
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}

                  {showEmployeeName && item.employeeName && (
                    <div className="mb-2 text-sm text-muted-foreground">
                      <span className="font-medium text-purple-400">{item.employeeName}</span>
                    </div>
                  )}

                  {showWorkItemType && item.workItemType && (
                    <div className="mb-2">
                      <Badge variant="outline" className="text-xs border-purple-500/30 text-purple-400">
                        {item.workItemType}
                      </Badge>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {showDueDate && item.dueDate && (
                        <div className="flex items-center gap-1 text-xs text-orange-400">
                          <Calendar className="h-3 w-3" />
                          <span>{item.dueDate}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <MessageSquare className="h-3 w-3 text-cyan-400" />
                        <span>{item.commentsCount}</span>
                      </div>
                      {item.children && item.children.length > 0 && (
                        <div className="flex items-center gap-1 text-xs bg-purple-500/20 text-purple-400 px-1.5 py-0.5 rounded">
                          <ChevronDown className="h-3 w-3" />
                          <span>{item.children.length}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      {item.assignedTo.slice(0, 3).map((person, idx) => (
                        <div
                          key={idx}
                          className={cn(
                            "h-6 w-6 rounded-full flex items-center justify-center text-xs font-medium ring-2",
                            idx % 4 === 0 &&
                              "bg-gradient-to-br from-blue-500 to-purple-500 text-white ring-blue-500/50",
                            idx % 4 === 1 &&
                              "bg-gradient-to-br from-purple-500 to-pink-500 text-white ring-purple-500/50",
                            idx % 4 === 2 && "bg-gradient-to-br from-teal-500 to-cyan-500 text-white ring-teal-500/50",
                            idx % 4 === 3 &&
                              "bg-gradient-to-br from-orange-500 to-pink-500 text-white ring-orange-500/50",
                          )}
                          title={person}
                        >
                          {person
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}

              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start text-muted-foreground hover:text-purple-400"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add item
              </Button>
            </div>
          </div>
        )
      })}
    </div>
  )
}
