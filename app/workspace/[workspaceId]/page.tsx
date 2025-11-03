import { notFound } from "next/navigation"
import { workspaces } from "@/lib/mock-data"
import { Sidebar } from "@/components/sidebar"
import { AppHeader } from "@/components/app-header"
import { Search, Filter, ChevronDown, Users, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"

export default async function WorkspacePage({
  params,
}: {
  params: Promise<{ workspaceId: string }>
}) {
  const { workspaceId } = await params
  const workspace = workspaces.find((w) => w.id === workspaceId)

  if (!workspace) {
    notFound()
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AppHeader />

        {/* Workspace Header */}
        <div className="bg-card border-b border-border">
          <div className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-20 w-20 rounded-lg overflow-hidden ring-4 ring-purple-500/50">
                <img
                  src={workspace.image || "/placeholder.svg"}
                  alt={workspace.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h1 className="text-2xl font-bold text-foreground">{workspace.name}</h1>
                  <ChevronDown className="h-5 w-5 text-muted-foreground" />
                </div>
                <p className="text-sm text-muted-foreground">{workspace.description || "Add workspace description"}</p>
              </div>
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                <Users className="h-4 w-4 mr-2" />
                Members
              </Button>
              <Button variant="outline">
                <span className="text-sm">•••</span>
              </Button>
            </div>

            {/* Workspace Info */}
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>Created: {workspace.createdDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>Owner: {workspace.owner}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>{workspace.members.length} members</span>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-6 px-6 border-t border-border">
            <button className="px-4 py-3 text-sm font-medium border-b-2 border-purple-500 text-purple-400">
              Content
            </button>
            <button className="px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground">
              Recents
            </button>
            <button className="px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground">
              Permissions
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6">
            {/* Search and Filters */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 px-3 py-2 bg-secondary rounded-lg">
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search"
                    className="bg-transparent border-none outline-none text-sm w-64"
                  />
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">No cleanup suggestions found</span>
                <div className="flex items-center gap-2 px-3 py-2 border border-border rounded-lg">
                  <span className="text-sm">Cleanup mode</span>
                  <div className="w-10 h-5 bg-secondary rounded-full relative">
                    <div className="absolute left-1 top-1 h-3 w-3 bg-muted-foreground rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Boards Table */}
            <div className="bg-card rounded-lg border border-border overflow-hidden">
              <table className="w-full">
                <thead className="bg-secondary/30 border-b border-border">
                  <tr className="text-left text-xs font-medium text-muted-foreground">
                    <th className="py-3 px-4">
                      <input type="checkbox" className="rounded border-border" />
                    </th>
                    <th className="py-3 px-4">Asset name</th>
                    <th className="py-3 px-4">Description</th>
                    <th className="py-3 px-4">Creator</th>
                    <th className="py-3 px-4">Creation date</th>
                    <th className="py-3 px-4">Last modified</th>
                  </tr>
                </thead>
                <tbody>
                  {workspace.boards.map((board, idx) => (
                    <tr key={board.id} className="border-b border-border hover:bg-secondary/50 transition-colors">
                      <td className="py-3 px-4">
                        <input type="checkbox" className="rounded border-border" />
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded overflow-hidden ring-2 ring-cyan-500/50">
                            <img
                              src={board.image || "/placeholder.svg"}
                              alt={board.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <span className="text-sm font-medium">{board.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm text-muted-foreground">{board.description || "No description"}</span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="h-6 w-6 rounded-full bg-gradient-to-br from-orange-500 to-pink-500 flex items-center justify-center text-xs font-medium text-white ring-2 ring-orange-500/50">
                          {workspace.owner
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm">{workspace.createdDate}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm">{workspace.createdDate}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
