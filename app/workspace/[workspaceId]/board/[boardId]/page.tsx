import { Sidebar } from "@/components/sidebar"
import { AppHeader } from "@/components/app-header"
import { BoardHeader } from "@/components/board-header"
import { BoardTableView } from "@/components/board-table-view"
import { workspaces } from "@/lib/mock-data"
import { notFound } from "next/navigation"

export default async function BoardPage({
  params,
}: {
  params: Promise<{ workspaceId: string; boardId: string }>
}) {
  const { workspaceId, boardId } = await params

  const workspace = workspaces.find((w) => w.id === workspaceId)
  if (!workspace) notFound()

  const board = workspace.boards.find((b) => b.id === boardId)
  if (!board) notFound()

  const showTags = workspaceId === "softdev"
  const showWorkItemType = workspaceId === "softdev"
  const showEmployeeName = workspaceId === "hr"
  const showDueDate = workspaceId === "hr"

  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 overflow-hidden flex flex-col">
        <AppHeader />
        <BoardHeader boardName={board.name} workspaceName={workspace.name} workspaceImage={workspace.image} />
        <BoardTableView
          board={board}
          showTags={showTags}
          showWorkItemType={showWorkItemType}
          showEmployeeName={showEmployeeName}
          showDueDate={showDueDate}
        />
      </main>
    </div>
  )
}
