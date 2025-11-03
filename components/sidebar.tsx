"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, ChevronDown, ChevronRight, Plus, MoreHorizontal, Search, Eye, Grid3x3 } from "lucide-react"
import { workspaces } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { CreateWorkspaceModal } from "@/components/create-workspace-modal"
import { CreateBoardModal } from "@/components/create-board-modal"

export function Sidebar() {
  const pathname = usePathname()
  const [expandedWorkspaces, setExpandedWorkspaces] = useState<string[]>(["softdev"])
  const [showCreateDropdown, setShowCreateDropdown] = useState(false)
  const [showWorkspaceModal, setShowWorkspaceModal] = useState(false)
  const [showBoardModal, setShowBoardModal] = useState(false)
  const [showAppSwitcher, setShowAppSwitcher] = useState(false)
  const [currentApp, setCurrentApp] = useState("Project Management")

  const toggleWorkspace = (workspaceId: string) => {
    setExpandedWorkspaces((prev) =>
      prev.includes(workspaceId) ? prev.filter((id) => id !== workspaceId) : [...prev, workspaceId],
    )
  }

  const apps = [
    { id: "intranet", name: "Intranet", icon: "🏢" },
    { id: "project", name: "Project Management", icon: "📊" },
    { id: "ticket", name: "Ticket Management", icon: "🎫" },
  ]

  return (
    <>
      <div className="w-64 bg-card border-r border-border h-screen flex flex-col">
        <div className="p-4 border-b border-border">
          <div className="relative">
            <Button
              variant="ghost"
              onClick={() => setShowAppSwitcher(!showAppSwitcher)}
              className="w-full justify-between hover:bg-secondary"
            >
              <div className="flex items-center gap-2">
                <Grid3x3 className="h-4 w-4 text-purple-400" />
                <span className="text-sm font-medium">{currentApp}</span>
              </div>
              <ChevronDown className="h-4 w-4" />
            </Button>

            {showAppSwitcher && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-xl overflow-hidden z-50">
                {apps.map((app) => (
                  <button
                    key={app.id}
                    onClick={() => {
                      setCurrentApp(app.name)
                      setShowAppSwitcher(false)
                    }}
                    className={cn(
                      "w-full px-4 py-3 text-left text-sm hover:bg-secondary transition-colors flex items-center gap-3",
                      currentApp === app.name && "bg-gradient-to-r from-purple-600/20 to-pink-600/20",
                    )}
                  >
                    <span className="text-lg">{app.icon}</span>
                    <span>{app.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="p-4 border-b border-border">
          <Link
            href="/"
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
              pathname === "/"
                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                : "text-muted-foreground hover:bg-secondary",
            )}
          >
            <Home className="h-4 w-4" />
            Home
          </Link>
        </div>

        {/* Favorites */}
        <div className="px-4 py-3 border-b border-border">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground uppercase">Favorites</span>
            <ChevronRight className="h-3 w-3 text-muted-foreground" />
          </div>
        </div>

        {/* Workspaces */}
        <div className="flex-1 overflow-y-auto">
          <div className="px-4 py-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-muted-foreground uppercase">Workspaces</span>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <MoreHorizontal className="h-3 w-3" />
                </Button>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <Search className="h-3 w-3" />
                </Button>
              </div>
            </div>

            {workspaces.map((workspace) => {
              const isExpanded = expandedWorkspaces.includes(workspace.id)
              return (
                <div key={workspace.id} className="mb-1">
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => toggleWorkspace(workspace.id)}
                      className={cn(
                        "flex-1 flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                        pathname.includes(`/workspace/${workspace.id}`)
                          ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                          : "text-foreground hover:bg-secondary",
                      )}
                    >
                      {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                      <div className="h-6 w-6 rounded-md overflow-hidden ring-2 ring-purple-500/50">
                        <img
                          src={workspace.image || "/placeholder.svg"}
                          alt={workspace.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <span className="flex-1 text-left truncate">{workspace.name}</span>
                    </button>
                    <Link href={`/workspace/${workspace.id}`}>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 hover:bg-purple-500/20 hover:text-purple-400"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>

                  {isExpanded && (
                    <div className="ml-6 mt-1 space-y-1">
                      {workspace.boards.map((board) => (
                        <Link
                          key={board.id}
                          href={`/workspace/${workspace.id}/board/${board.id}`}
                          className={cn(
                            "flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-colors",
                            pathname === `/workspace/${workspace.id}/board/${board.id}`
                              ? "bg-gradient-to-r from-teal-600 to-cyan-600 text-white"
                              : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                          )}
                        >
                          <div className="h-5 w-5 rounded overflow-hidden ring-2 ring-cyan-500/50">
                            <img
                              src={board.image || "/placeholder.svg"}
                              alt={board.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <span className="truncate">{board.name}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        <div className="p-4 border-t border-border relative">
          <Button
            onClick={() => setShowCreateDropdown(!showCreateDropdown)}
            className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white shadow-lg"
            size="sm"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create
          </Button>

          {showCreateDropdown && (
            <div className="absolute bottom-full left-4 right-4 mb-2 bg-card border border-border rounded-lg shadow-xl overflow-hidden">
              <button
                onClick={() => {
                  setShowWorkspaceModal(true)
                  setShowCreateDropdown(false)
                }}
                className="w-full px-4 py-3 text-left text-sm hover:bg-secondary transition-colors flex items-center gap-2"
              >
                <Plus className="h-4 w-4 text-purple-400" />
                <span>New Workspace</span>
              </button>
              <button
                onClick={() => {
                  setShowBoardModal(true)
                  setShowCreateDropdown(false)
                }}
                className="w-full px-4 py-3 text-left text-sm hover:bg-secondary transition-colors flex items-center gap-2 border-t border-border"
              >
                <Plus className="h-4 w-4 text-cyan-400" />
                <span>New Board</span>
              </button>
            </div>
          )}
        </div>
      </div>

      <CreateWorkspaceModal isOpen={showWorkspaceModal} onClose={() => setShowWorkspaceModal(false)} />
      <CreateBoardModal isOpen={showBoardModal} onClose={() => setShowBoardModal(false)} />
    </>
  )
}
