"use client"

import { cn } from "@/lib/utils"

import { useState } from "react"
import { ChevronDown, ChevronRight, Plus, MoreHorizontal } from "lucide-react"
import type { Board } from "@/lib/mock-data"
import { WorkItemRow } from "@/components/work-item-row"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BoardKanbanView } from "@/components/board-kanban-view"
import { BoardWorkItemsView } from "@/components/board-work-items-view"

interface BoardTableViewProps {
  board: Board
  showTags?: boolean
  showWorkItemType?: boolean
  showEmployeeName?: boolean
  showDueDate?: boolean
}

export function BoardTableView({
  board,
  showTags = true,
  showWorkItemType = true,
  showEmployeeName = false,
  showDueDate = false,
}: BoardTableViewProps) {
  const [view, setView] = useState<"table" | "kanban" | "workitems">("table")
  const [collapsedGroups, setCollapsedGroups] = useState<string[]>([])

  const toggleGroup = (groupId: string) => {
    setCollapsedGroups((prev) => (prev.includes(groupId) ? prev.filter((id) => id !== groupId) : [...prev, groupId]))
  }

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="p-6">
        <Tabs value={view} onValueChange={(v) => setView(v as "table" | "kanban" | "workitems")} className="mb-4">
          <TabsList className="bg-secondary">
            <TabsTrigger
              value="table"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white"
            >
              Table
            </TabsTrigger>
            <TabsTrigger
              value="kanban"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white"
            >
              Kanban
            </TabsTrigger>
            <TabsTrigger
              value="workitems"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-600 data-[state=active]:to-teal-600 data-[state=active]:text-white"
            >
              Work Items
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {view === "table" ? (
          <div className="space-y-6">
            {board.groups.map((group, groupIdx) => {
              const isCollapsed = collapsedGroups.includes(group.id)
              return (
                <div key={group.id} className="bg-card rounded-lg border border-border overflow-hidden">
                  <div
                    className={cn(
                      "flex items-center justify-between px-4 py-3 border-b border-border cursor-pointer",
                      groupIdx % 4 === 0 && "bg-blue-500/10 border-l-4 border-l-blue-500",
                      groupIdx % 4 === 1 && "bg-purple-500/10 border-l-4 border-l-purple-500",
                      groupIdx % 4 === 2 && "bg-teal-500/10 border-l-4 border-l-teal-500",
                      groupIdx % 4 === 3 && "bg-orange-500/10 border-l-4 border-l-orange-500",
                    )}
                    onClick={() => toggleGroup(group.id)}
                  >
                    <div className="flex items-center gap-2">
                      {isCollapsed ? (
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-muted-foreground" />
                      )}
                      <h3 className="font-semibold text-foreground">{group.name}</h3>
                      <span className="text-xs bg-purple-500/20 text-purple-400 px-2 py-0.5 rounded-full">
                        {group.workItems.length}
                      </span>
                    </div>
                    <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                      <Button variant="ghost" size="sm" className="hover:bg-purple-500/20">
                        <Plus className="h-4 w-4 mr-1" />
                        Add item
                      </Button>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {!isCollapsed && (
                    <table className="w-full">
                      <thead className="bg-secondary/30">
                        <tr className="text-left text-xs font-medium text-muted-foreground">
                          <th className="py-2 px-4">Item</th>
                          <th className="py-2 px-4">Person</th>
                          {showEmployeeName && <th className="py-2 px-4">Employee Name</th>}
                          {showWorkItemType && <th className="py-2 px-4">Type</th>}
                          {showTags && <th className="py-2 px-4">Tags</th>}
                          <th className="py-2 px-4">Status</th>
                          {showDueDate && <th className="py-2 px-4">Due Date</th>}
                          <th className="py-2 px-4">Comments</th>
                        </tr>
                      </thead>
                      <tbody>
                        {group.workItems.map((workItem) => (
                          <WorkItemRow
                            key={workItem.id}
                            workItem={workItem}
                            showTags={showTags}
                            showWorkItemType={showWorkItemType}
                            showEmployeeName={showEmployeeName}
                            showDueDate={showDueDate}
                          />
                        ))}
                        <tr className="border-b border-border">
                          <td colSpan={8} className="py-3 px-4">
                            <button className="text-sm text-muted-foreground hover:text-purple-400 flex items-center gap-2 transition-colors">
                              <Plus className="h-4 w-4" />
                              Add item
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  )}
                </div>
              )
            })}
          </div>
        ) : view === "kanban" ? (
          <BoardKanbanView
            board={board}
            showTags={showTags}
            showWorkItemType={showWorkItemType}
            showEmployeeName={showEmployeeName}
            showDueDate={showDueDate}
          />
        ) : (
          <BoardWorkItemsView />
        )}
      </div>
    </div>
  )
}
