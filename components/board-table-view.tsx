"use client"

import { cn } from "@/lib/utils"

import { useState } from "react"
import { ChevronDown, ChevronRight, Plus, MoreHorizontal, X } from "lucide-react"
import type { Board, WorkItem } from "@/lib/mock-data"
import { WorkItemRow } from "@/components/work-item-row"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BoardKanbanView } from "@/components/board-kanban-view"
import { BoardWorkItemsView } from "@/components/board-work-items-view"
import { WorkItemDetailDialog } from "@/components/work-item-detail-dialog"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

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
  const [selectedWorkItem, setSelectedWorkItem] = useState<WorkItem | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [creatingInGroup, setCreatingInGroup] = useState<string | null>(null)
  const [newItemName, setNewItemName] = useState("")
  const [newItemType, setNewItemType] = useState<"Task" | "Bug" | "Feature" | "Epic">("Task")

  const toggleGroup = (groupId: string) => {
    setCollapsedGroups((prev) => (prev.includes(groupId) ? prev.filter((id) => id !== groupId) : [...prev, groupId]))
  }

  const handleWorkItemDoubleClick = (workItem: WorkItem) => {
    setSelectedWorkItem(workItem)
    setIsDialogOpen(true)
  }

  const handleAddItem = (groupId: string) => {
    setCreatingInGroup(groupId)
    setNewItemName("")
    setNewItemType("Task")
  }

  const handleSaveNewItem = () => {
    if (newItemName.trim()) {
      // In a real app, this would save to the backend
      console.log("[v0] Creating new work item:", { name: newItemName, type: newItemType, group: creatingInGroup })
      setCreatingInGroup(null)
      setNewItemName("")
    }
  }

  const handleCancelNewItem = () => {
    setCreatingInGroup(null)
    setNewItemName("")
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
                      <Button
                        variant="ghost"
                        size="sm"
                        className="hover:bg-purple-500/20"
                        onClick={() => handleAddItem(group.id)}
                      >
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
                            onDoubleClick={handleWorkItemDoubleClick}
                          />
                        ))}
                        {creatingInGroup === group.id ? (
                          <tr className="border-b border-border bg-secondary/20">
                            <td colSpan={8} className="py-3 px-4">
                              <div className="flex items-center gap-2">
                                <Input
                                  placeholder="Enter work item name..."
                                  value={newItemName}
                                  onChange={(e) => setNewItemName(e.target.value)}
                                  onKeyDown={(e) => {
                                    if (e.key === "Enter") handleSaveNewItem()
                                    if (e.key === "Escape") handleCancelNewItem()
                                  }}
                                  className="flex-1 h-9"
                                  autoFocus
                                />
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                                      {newItemType}
                                      <ChevronDown className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent>
                                    <DropdownMenuItem onClick={() => setNewItemType("Task")}>Task</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setNewItemType("Bug")}>Bug</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setNewItemType("Feature")}>
                                      Feature
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setNewItemType("Epic")}>Epic</DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                                <Button
                                  size="sm"
                                  onClick={handleSaveNewItem}
                                  className="bg-purple-600 hover:bg-purple-700"
                                >
                                  Save
                                </Button>
                                <Button size="sm" variant="ghost" onClick={handleCancelNewItem}>
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ) : (
                          <tr className="border-b border-border">
                            <td colSpan={8} className="py-3 px-4">
                              <button
                                onClick={() => handleAddItem(group.id)}
                                className="text-sm text-muted-foreground hover:text-purple-400 flex items-center gap-2 transition-colors"
                              >
                                <Plus className="h-4 w-4" />
                                Add item
                              </button>
                            </td>
                          </tr>
                        )}
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

      <WorkItemDetailDialog workItem={selectedWorkItem} open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </div>
  )
}
