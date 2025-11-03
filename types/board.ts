export type WorkItemStatus = "new" | "active" | "done" | "stuck" | "cancelled"
export type WorkItemType = "Task" | "Bug" | "Feature" | "Epic"

export interface WorkItem {
  id: string
  title: string
  assignedTo: string[]
  tags?: string[]
  status: WorkItemStatus
  commentsCount: number
  workItemType?: WorkItemType
  employeeName?: string
  dueDate?: string
  children?: WorkItem[]
}

export interface Group {
  id: string
  name: string
  workItems: WorkItem[]
}

export interface Board {
  id: string
  name: string
  image: string
  description?: string
  workspaceId: string
  groups: Group[]
}

export interface Workspace {
  id: string
  name: string
  image: string
  description: string
  createdDate: string
  owner: string
  members: string[]
  boards: Board[]
}

export interface FeedItem {
  id: string
  user: string
  userAvatar: string
  workItemId: string
  workItemName: string
  boardName: string
  comment: string
  date: string
}

export interface AssignedTask {
  id: string
  title: string
  assignedBy: string
  boardName: string
  dueDate?: string
}
