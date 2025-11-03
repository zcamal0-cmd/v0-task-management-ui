import { cn } from "@/lib/utils"
import { Sidebar } from "@/components/sidebar"
import { AppHeader } from "@/components/app-header"
import { feedItems, assignedTasksToday, workspaces } from "@/lib/mock-data"
import { Card } from "@/components/ui/card"
import { MessageSquare, Star } from "lucide-react"

export default function HomePage() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AppHeader />
        <main className="flex-1 overflow-y-auto bg-background">
          <div className="p-8">
            {/* Welcome Section */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Good evening, User!
              </h1>
              <p className="text-muted-foreground">Quickly access your recent boards, Inbox and workspaces</p>
            </div>

            {/* My Boards */}
            <section className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <h2 className="text-xl font-semibold">My Boards</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {workspaces
                  .flatMap((ws) => ws.boards)
                  .slice(0, 3)
                  .map((board, index) => (
                    <Card
                      key={board.id}
                      className={cn(
                        "p-4 hover:border-accent transition-all cursor-pointer group hover:shadow-lg",
                        index === 0 && "hover:shadow-blue-500/20",
                        index === 1 && "hover:shadow-purple-500/20",
                        index === 2 && "hover:shadow-pink-500/20",
                      )}
                    >
                      <div className="aspect-video bg-secondary rounded-lg mb-3 overflow-hidden relative ring-2 ring-purple-500/30">
                        <img
                          src={board.image || "/placeholder.svg"}
                          alt={board.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold mb-1">{board.name}</h3>
                          <p className="text-xs text-muted-foreground">
                            {workspaces.find((ws) => ws.id === board.workspaceId)?.name}
                          </p>
                        </div>
                        <Star className="h-4 w-4 text-muted-foreground group-hover:text-yellow-400 transition-colors" />
                      </div>
                    </Card>
                  ))}
              </div>
            </section>

            {/* My Workspaces */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">My Workspaces</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {workspaces.map((workspace, index) => (
                  <Card
                    key={workspace.id}
                    className={cn(
                      "p-4 hover:border-accent transition-all cursor-pointer hover:shadow-lg",
                      index === 0 && "hover:shadow-teal-500/20",
                      index === 1 && "hover:shadow-orange-500/20",
                    )}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className={cn(
                          "h-12 w-12 rounded-lg overflow-hidden ring-2",
                          index === 0 ? "ring-teal-500/50" : "ring-orange-500/50",
                        )}
                      >
                        <img
                          src={workspace.image || "/placeholder.svg"}
                          alt={workspace.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold">{workspace.name}</h3>
                        <p className="text-xs text-muted-foreground">{workspace.boards.length} boards</p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">{workspace.description}</p>
                  </Card>
                ))}
              </div>
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Feed (Inbox) */}
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <h2 className="text-xl font-semibold">Feed (My Inbox)</h2>
                  <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                    {feedItems.length}
                  </span>
                </div>
                <div className="space-y-3">
                  {feedItems.map((item) => (
                    <Card key={item.id} className="p-4 hover:border-purple-500/50 transition-colors">
                      <div className="flex gap-3">
                        <div className="h-10 w-10 rounded-full overflow-hidden ring-2 ring-purple-500/50">
                          <img
                            src={item.userAvatar || "/placeholder.svg"}
                            alt={item.user}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-1">
                            <p className="font-semibold text-sm">{item.user}</p>
                            <span className="text-xs text-muted-foreground">{item.date}</span>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            mentioned you in <span className="text-blue-400 font-medium">{item.workItemId}</span> -{" "}
                            {item.workItemName}
                          </p>
                          <p className="text-sm mb-2">{item.comment}</p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <MessageSquare className="h-3 w-3 text-cyan-400" />
                            <span>{item.boardName}</span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </section>

              {/* Tasks Assigned Today */}
              <section>
                <h2 className="text-xl font-semibold mb-4">Tasks Assigned to Me Today</h2>
                <div className="space-y-3">
                  {assignedTasksToday.map((task, index) => (
                    <Card
                      key={task.id}
                      className={cn(
                        "p-4 hover:border-accent transition-colors border-l-4",
                        index === 0 && "border-l-orange-500",
                        index === 1 && "border-l-teal-500",
                        index === 2 && "border-l-pink-500",
                      )}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-semibold text-sm mb-1">
                            <span className="text-purple-400">{task.id}</span> - {task.title}
                          </p>
                          <p className="text-xs text-muted-foreground">Assigned by {task.assignedBy}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">{task.boardName}</span>
                        {task.dueDate && (
                          <span className="text-xs bg-orange-500/20 text-orange-400 px-2 py-0.5 rounded">
                            Due: {task.dueDate}
                          </span>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
