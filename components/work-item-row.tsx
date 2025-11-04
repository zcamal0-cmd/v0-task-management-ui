"use client"

import { useState } from "react"
import { ChevronRight, ChevronDown, MessageSquare } from "lucide-react"
import type { WorkItem } from "@/lib/mock-data"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

interface WorkItemRowProps {
  workItem: WorkItem
  showTags?: boolean
  showWorkItemType?: boolean
  showEmployeeName?: boolean
  showDueDate?: boolean
  level?: number
  onDoubleClick?: (workItem: WorkItem) => void
}

const typeColors: Record<string, string> = {
  Task: "text-blue-400",
  Bug: "text-red-400",
  Feature: "text-purple-400",
  Epic: "text-orange-400",
}

const tagColors = [
  "bg-blue-500/20 text-blue-400 border-blue-500/30",
  "bg-purple-500/20 text-purple-400 border-purple-500/30",
  "bg-pink-500/20 text-pink-400 border-pink-500/30",
  "bg-teal-500/20 text-teal-400 border-teal-500/30",
  "bg-orange-500/20 text-orange-400 border-orange-500/30",
]

export function WorkItemRow({
  workItem,
  showTags = true,
  showWorkItemType = true,
  showEmployeeName = false,
  showDueDate = false,
  level = 0,
  onDoubleClick,
}: WorkItemRowProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const hasChildren = workItem.children && workItem.children.length > 0

  return (
    <>
      <tr
        className="border-b border-border hover:bg-secondary/50 transition-colors cursor-pointer"
        onDoubleClick={() => onDoubleClick?.(workItem)}
      >
        <td className="py-3 px-4">
          <div className="flex items-center gap-2" style={{ paddingLeft: `${level * 24}px` }}>
            {hasChildren && (
              <button onClick={() => setIsExpanded(!isExpanded)} className="hover:bg-secondary rounded p-0.5">
                {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              </button>
            )}
            <input type="checkbox" className="rounded border-border" />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">{workItem.title}</span>
                {hasChildren && (
                  <span className="text-xs bg-purple-500/20 text-purple-400 px-1.5 py-0.5 rounded">
                    {workItem.children?.length}
                  </span>
                )}
              </div>
              <span className="text-xs text-cyan-400 font-medium">{workItem.id}</span>
            </div>
          </div>
        </td>
        <td className="py-3 px-4">
          <div className="flex items-center gap-1">
            {workItem.assignedTo.map((person, idx) => (
              <div
                key={idx}
                className={cn(
                  "h-6 w-6 rounded-full flex items-center justify-center text-xs font-medium ring-2",
                  idx % 4 === 0 && "bg-gradient-to-br from-blue-500 to-purple-500 text-white ring-blue-500/50",
                  idx % 4 === 1 && "bg-gradient-to-br from-purple-500 to-pink-500 text-white ring-purple-500/50",
                  idx % 4 === 2 && "bg-gradient-to-br from-teal-500 to-cyan-500 text-white ring-teal-500/50",
                  idx % 4 === 3 && "bg-gradient-to-br from-orange-500 to-pink-500 text-white ring-orange-500/50",
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
        </td>
        {showEmployeeName && (
          <td className="py-3 px-4">
            <span className="text-sm">{workItem.employeeName}</span>
          </td>
        )}
        {showWorkItemType && (
          <td className="py-3 px-4">
            <span className={cn("text-sm font-medium", typeColors[workItem.workItemType || "Task"])}>
              {workItem.workItemType}
            </span>
          </td>
        )}
        {showTags && (
          <td className="py-3 px-4">
            <div className="flex gap-1 flex-wrap">
              {workItem.tags?.map((tag, idx) => (
                <Badge key={tag} variant="outline" className={cn("text-xs border", tagColors[idx % tagColors.length])}>
                  {tag}
                </Badge>
              ))}
            </div>
          </td>
        )}
        <td className="py-3 px-4">
          <span className={cn("status-badge", `status-${workItem.status}`)}>{workItem.status}</span>
        </td>
        {showDueDate && (
          <td className="py-3 px-4">
            <span className="text-xs bg-orange-500/20 text-orange-400 px-2 py-1 rounded border border-orange-500/30">
              {workItem.dueDate}
            </span>
          </td>
        )}
        <td className="py-3 px-4">
          <div className="flex items-center gap-1 text-muted-foreground">
            <MessageSquare className="h-4 w-4 text-cyan-400" />
            <span className="text-sm">{workItem.commentsCount}</span>
          </div>
        </td>
      </tr>
      {isExpanded &&
        hasChildren &&
        workItem.children?.map((child) => (
          <WorkItemRow
            key={child.id}
            workItem={child}
            showTags={showTags}
            showWorkItemType={showWorkItemType}
            showEmployeeName={showEmployeeName}
            showDueDate={showDueDate}
            level={level + 1}
            onDoubleClick={onDoubleClick}
          />
        ))}
    </>
  )
}
