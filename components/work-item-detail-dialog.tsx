"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Link2,
  ImageIcon,
  Code,
  ChevronDown,
  Plus,
  ThumbsUp,
  Smile,
  Settings,
  Paperclip,
  FileText,
  X,
  User,
  Eye,
  EyeOff,
  Link,
} from "lucide-react"
import type { WorkItem } from "@/lib/mock-data"

interface Comment {
  id: string
  user: string
  userInitials: string
  content: string
  timestamp: string
  replies?: Comment[]
}

interface Attachment {
  id: string
  name: string
  type: string
  size: string
  uploadedBy: string
  uploadedAt: string
}

interface Note {
  id: string
  content: string
  createdBy: string
  createdAt: string
}

interface LinkedWorkItem {
  id: string
  title: string
  type: string
  status: string
}

interface HistoryEntry {
  id: string
  user: string
  userInitials: string
  action: string
  timestamp: string
  details?: string
}

const mockComments: Comment[] = [
  {
    id: "c1",
    user: "Camal Zeynalli",
    userInitials: "CZ",
    content: "Salam",
    timestamp: "13 minutes ago",
    replies: [
      {
        id: "c1-r1",
        user: "Camal Zeynalli",
        userInitials: "CZ",
        content: "@Camal Zeynalli aleykum salam",
        timestamp: "13 minutes ago",
      },
    ],
  },
]

const mockAttachments: Attachment[] = [
  {
    id: "a1",
    name: "design-mockup.fig",
    type: "Figma",
    size: "2.4 MB",
    uploadedBy: "Sarah Johnson",
    uploadedAt: "2025-01-15",
  },
  {
    id: "a2",
    name: "requirements.pdf",
    type: "PDF",
    size: "856 KB",
    uploadedBy: "Mike Chen",
    uploadedAt: "2025-01-14",
  },
]

const mockNotes: Note[] = [
  {
    id: "n1",
    content: "Need to coordinate with backend team for API changes",
    createdBy: "Emily Davis",
    createdAt: "2025-01-16",
  },
  {
    id: "n2",
    content: "Consider mobile responsiveness in the design",
    createdBy: "John Smith",
    createdAt: "2025-01-15",
  },
]

const mockLinkedItems: LinkedWorkItem[] = [
  {
    id: "WI-4521",
    title: "Update API documentation",
    type: "Task",
    status: "In Progress",
  },
  {
    id: "WI-4498",
    title: "Fix authentication bug",
    type: "Bug",
    status: "Done",
  },
  {
    id: "WI-4567",
    title: "Add unit tests for new features",
    type: "Task",
    status: "To Do",
  },
]

const mockHistory: HistoryEntry[] = [
  {
    id: "h1",
    user: "Sarah Johnson",
    userInitials: "SJ",
    action: "changed status from",
    timestamp: "2 hours ago",
    details: "To Do → In Progress",
  },
  {
    id: "h2",
    user: "Mike Chen",
    userInitials: "MC",
    action: "assigned to",
    timestamp: "5 hours ago",
    details: "Camal Zeynalli",
  },
  {
    id: "h3",
    user: "Emily Davis",
    userInitials: "ED",
    action: "changed priority from",
    timestamp: "1 day ago",
    details: "None → High",
  },
  {
    id: "h4",
    user: "John Smith",
    userInitials: "JS",
    action: "added tag",
    timestamp: "2 days ago",
    details: "Backend",
  },
  {
    id: "h5",
    user: "Camal Zeynalli",
    userInitials: "CZ",
    action: "created this work item",
    timestamp: "3 days ago",
  },
]

interface WorkItemDetailDialogProps {
  workItem: WorkItem | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function WorkItemDetailDialog({ workItem, open, onOpenChange }: WorkItemDetailDialogProps) {
  const [description, setDescription] = useState("Implement a feature for users to view their donation history.")
  const [comments, setComments] = useState<Comment[]>(mockComments)
  const [newComment, setNewComment] = useState("")
  const [attachments] = useState<Attachment[]>(mockAttachments)
  const [notes] = useState<Note[]>(mockNotes)
  const [activeTab, setActiveTab] = useState("comments")
  const [isFollowing, setIsFollowing] = useState(false)
  const [linkedItems] = useState<LinkedWorkItem[]>(mockLinkedItems)
  const [history] = useState<HistoryEntry[]>(mockHistory)

  if (!workItem) return null

  const handleAddComment = () => {
    if (!newComment.trim()) return

    const comment: Comment = {
      id: `c${comments.length + 1}`,
      user: "You",
      userInitials: "YO",
      content: newComment,
      timestamp: "Just now",
    }

    setComments([...comments, comment])
    setNewComment("")
  }

  const handleReply = (commentId: string, replyText: string) => {
    // Implementation for replying to comments
    console.log("[v0] Reply to comment:", commentId, replyText)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[1400px] h-[90vh] p-0 gap-0">
        <div className="flex h-full">
          {/* Left side - Main content */}
          <div className="flex-1 flex flex-col overflow-hidden border-r border-border">
            {/* Header */}
            <DialogHeader className="p-6 pb-4 border-b border-border">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="icon" className="h-8 w-8 shrink-0 bg-transparent">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                      <DropdownMenuItem>Create copy of work item</DropdownMenuItem>
                      <DropdownMenuItem>Create linked work item</DropdownMenuItem>
                      <DropdownMenuItem>Create sub work item</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <DialogTitle className="text-xl font-normal">{workItem.title}</DialogTitle>
                </div>
                <Button variant="outline" size="sm" onClick={() => setIsFollowing(!isFollowing)} className="gap-2">
                  {isFollowing ? (
                    <>
                      <EyeOff className="h-4 w-4" />
                      Following
                    </>
                  ) : (
                    <>
                      <Eye className="h-4 w-4" />
                      Follow
                    </>
                  )}
                </Button>
              </div>
            </DialogHeader>

            {/* Content area with scroll */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Description */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Description</Label>
                <div className="border border-border rounded-lg">
                  {/* Rich text editor toolbar */}
                  <div className="flex items-center gap-1 p-2 border-b border-border bg-secondary/30">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Bold className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Italic className="h-4 w-4" />
                    </Button>
                    <div className="w-px h-6 bg-border mx-1" />
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <List className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <ListOrdered className="h-4 w-4" />
                    </Button>
                    <div className="w-px h-6 bg-border mx-1" />
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Link2 className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <ImageIcon className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Code className="h-4 w-4" />
                    </Button>
                  </div>
                  <Textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="min-h-[120px] border-0 focus-visible:ring-0 resize-none"
                    placeholder="Add a description..."
                  />
                </div>
                <div className="flex gap-2">
                  <Button size="sm">Save</Button>
                  <Button size="sm" variant="ghost">
                    Cancel
                  </Button>
                </div>
              </div>

              {/* Activity section */}
              <div className="space-y-4">
                <Label className="text-sm font-medium">Activity</Label>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList>
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="comments">Comments</TabsTrigger>
                    <TabsTrigger value="history">History</TabsTrigger>
                    <TabsTrigger value="attachments">Attachments</TabsTrigger>
                  </TabsList>

                  <TabsContent value="all" className="space-y-4 mt-4">
                    <div className="text-sm text-muted-foreground">All activity will be shown here</div>
                  </TabsContent>

                  <TabsContent value="comments" className="space-y-4 mt-4">
                    {/* Comment input */}
                    <div className="space-y-2">
                      <div className="flex gap-3">
                        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center text-white text-sm font-medium shrink-0">
                          CZ
                        </div>
                        <div className="flex-1 space-y-2">
                          <Textarea
                            placeholder="Add a comment..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            className="min-h-[80px] resize-none"
                          />
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" className="text-xs bg-transparent">
                              <br />
                            </Button>
                            <Button size="sm" variant="outline" className="text-xs bg-transparent">
                              <br />
                            </Button>
                            <Button size="sm" variant="outline" className="text-xs bg-transparent">
                              <br />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Comments list */}
                    <div className="space-y-4">
                      {comments.map((comment) => (
                        <div key={comment.id} className="space-y-3 my-3">
                          <div className="flex gap-3">
                            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center text-white text-sm font-medium shrink-0">
                              {comment.userInitials}
                            </div>
                            <div className="flex-1 space-y-2">
                              <div>
                                <div className="font-medium text-sm">{comment.user}</div>
                                <div className="text-xs text-muted-foreground">{comment.timestamp}</div>
                              </div>
                              <div className="text-sm">{comment.content}</div>
                              <div className="flex items-center gap-3">
                                <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="lucide lucide-thumbs-up h-3 w-3 mr-1"
                                  >
                                    <path d="M7 10v12"></path>
                                    <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z"></path>
                                  </svg>
                                  <path d="M7 10v12"></path>
                                  <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z"></path>
                                </Button>
                                <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
                                  <br />
                                </Button>
                                <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
                                  Reply
                                </Button>
                                <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
                                  Edit
                                </Button>
                                <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
                                  Delete
                                </Button>
                              </div>
                            </div>
                          </div>

                          {/* Replies */}
                          {comment.replies && comment.replies.length > 0 && (
                            <div className="ml-11 space-y-3">
                              {comment.replies.map((reply) => (
                                <div key={reply.id} className="flex gap-3 bg-card">
                                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-sm font-medium shrink-0">
                                    {reply.userInitials}
                                  </div>
                                  <div className="flex-1 space-y-2">
                                    <div>
                                      <div className="font-medium text-sm">{reply.user}</div>
                                      <div className="text-xs text-muted-foreground">{reply.timestamp}</div>
                                    </div>
                                    <div className="text-sm">
                                      <span className="text-blue-500">@Camal Zeynalli</span>{" "}
                                      {reply.content.replace("@Camal Zeynalli ", "")}
                                    </div>
                                    <div className="flex items-center gap-3">
                                      <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
                                        <ThumbsUp className="h-3 w-3 mr-1" />
                                        Like
                                      </Button>
                                      <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
                                        <Smile className="h-3 w-3 mr-1" />
                                        React
                                      </Button>
                                      <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
                                        Reply
                                      </Button>
                                      <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
                                        Edit
                                      </Button>
                                      <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
                                        Delete
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="history" className="space-y-4 mt-4">
                    <div className="space-y-3">
                      {history.map((entry) => (
                        <div key={entry.id} className="flex gap-3 pb-3 border-b border-border last:border-0">
                          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white text-xs font-medium shrink-0">
                            {entry.userInitials}
                          </div>
                          <div className="flex-1">
                            <div className="text-sm">
                              <span className="font-medium">{entry.user}</span>{" "}
                              <span className="text-muted-foreground">{entry.action}</span>
                              {entry.details && <span className="font-medium"> {entry.details}</span>}
                            </div>
                            <div className="text-xs text-muted-foreground mt-1">{entry.timestamp}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="attachments" className="space-y-6 mt-4">
                    {/* Attachments */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium">Attachments</h4>
                        <Button size="sm" variant="outline">
                          <Paperclip className="h-4 w-4 mr-2" />
                          Add attachment
                        </Button>
                      </div>
                      <div className="space-y-2">
                        {attachments.map((attachment) => (
                          <div
                            key={attachment.id}
                            className="flex items-center gap-3 p-3 border border-border rounded-lg hover:bg-secondary/20 transition-colors"
                          >
                            <FileText className="h-5 w-5 text-blue-500" />
                            <div className="flex-1">
                              <div className="text-sm font-medium">{attachment.name}</div>
                              <div className="text-xs text-muted-foreground">
                                {attachment.size} • Uploaded by {attachment.uploadedBy} on {attachment.uploadedAt}
                              </div>
                            </div>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Notes */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium">Notes</h4>
                        <Button size="sm" variant="outline">
                          <Plus className="h-4 w-4 mr-2" />
                          Add note
                        </Button>
                      </div>
                      <div className="space-y-2">
                        {notes.map((note) => (
                          <div key={note.id} className="p-3 border border-border rounded-lg bg-secondary/10">
                            <div className="text-sm mb-2">{note.content}</div>
                            <div className="text-xs text-muted-foreground">
                              By {note.createdBy} on {note.createdAt}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>

          {/* Right side - Details panel */}
          <div className="w-[380px] overflow-y-auto bg-secondary/10">
            <div className="p-4 space-y-4 bg-white">
              {/* Status dropdown */}
              <div className="flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="gap-2 bg-transparent">
                      To Do
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>To Do</DropdownMenuItem>
                    <DropdownMenuItem>In Progress</DropdownMenuItem>
                    <DropdownMenuItem>Done</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button variant="outline" size="icon">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>

              {/* Details section */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-sm">Details</h3>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>

                {/* Assignee */}
                <div className="space-y-1.5">
                  <Label className="text-xs text-muted-foreground">Assignee</Label>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Unassigned</span>
                  </div>
                  <Button variant="link" className="h-auto p-0 text-blue-500 text-xs">
                    Assign to me
                  </Button>
                </div>

                {/* Priority */}
                <div className="space-y-1.5">
                  <Label className="text-xs text-muted-foreground">Priority</Label>
                  <div className="text-sm">None</div>
                </div>

                {/* Parent */}
                <div className="space-y-1.5">
                  <Label className="text-xs text-muted-foreground">Parent</Label>
                  <div className="text-sm text-purple-500">DP-2 (Sample) Donation Mana...</div>
                </div>

                {/* Due date */}
                <div className="space-y-1.5">
                  <Label className="text-xs text-muted-foreground">Due date</Label>
                  <Button variant="link" className="h-auto p-0 text-sm text-muted-foreground">
                    Add due date
                  </Button>
                </div>

                {/* Labels */}
                <div className="space-y-1.5">
                  <Label className="text-xs text-muted-foreground">Tags</Label>
                  <Button variant="link" className="h-auto p-0 text-sm text-muted-foreground">
                    Add labels
                  </Button>
                </div>

                {/* Start date */}
                <div className="space-y-1.5">
                  <Label className="text-xs text-muted-foreground">Start date</Label>
                  <Button variant="link" className="h-auto p-0 text-sm text-muted-foreground">
                    Add date
                  </Button>
                </div>

                {/* Reporter */}
                <div className="space-y-1.5">
                  <Label className="text-xs text-muted-foreground">Reporter</Label>
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center text-white text-xs font-medium">
                      CZ
                    </div>
                    <span className="text-sm">Camal Zeynalli</span>
                  </div>
                </div>

                {/* Timestamps */}
                <div className="pt-3 border-t border-border space-y-1">
                  <div className="text-xs text-muted-foreground">Created 25 minutes ago</div>
                  <div className="text-xs text-muted-foreground">Updated 3 minutes ago</div>
                </div>
              </div>

              <div className="space-y-3 pt-3 border-t border-border">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-sm">Linked items</h3>
                  <Button variant="ghost" size="icon" className="h-7 w-7">
                    <Plus className="h-3.5 w-3.5" />
                  </Button>
                </div>

                <div className="space-y-2">
                  {linkedItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-start gap-2 p-2 border border-border rounded-md hover:bg-secondary/20 transition-colors cursor-pointer"
                    >
                      <Link className="h-3.5 w-3.5 text-muted-foreground mt-0.5 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-xs font-mono text-muted-foreground">{item.id}</span>
                          <span
                            className={`text-xs px-1.5 py-0.5 rounded ${
                              item.status === "Done"
                                ? "bg-green-500/20 text-green-700 dark:text-green-400"
                                : item.status === "In Progress"
                                  ? "bg-blue-500/20 text-blue-700 dark:text-blue-400"
                                  : "bg-gray-500/20 text-gray-700 dark:text-gray-400"
                            }`}
                          >
                            {item.status}
                          </span>
                        </div>
                        <div className="text-xs mt-1 line-clamp-2">{item.title}</div>
                        <div className="text-xs text-muted-foreground mt-0.5">{item.type}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <Button variant="outline" size="sm" className="w-full bg-transparent">
                  <Link className="h-3.5 w-3.5 mr-2" />
                  Link work item
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
