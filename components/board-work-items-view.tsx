"use client"

import { useState } from "react"
import { MessageSquare, ChevronDown, X } from "lucide-react"
import type { WorkItem } from "@/lib/mock-data"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { WorkItemDetailDialog } from "@/components/work-item-detail-dialog"

type FilterType =
  | "following"
  | "mentioned"
  | "recently-viewed"
  | "recently-created"
  | "recently-updated"
  | "recently-completed"
  | "assigned-to-me"

const filterLabels: Record<FilterType, string> = {
  following: "Following",
  mentioned: "Mentioned",
  "recently-viewed": "Recently viewed",
  "recently-created": "Recently created",
  "recently-updated": "Recently updated",
  "recently-completed": "Recently completed",
  "assigned-to-me": "Assigned to me",
}

const mockWorkItemsByFilter: Record<FilterType, WorkItem[]> = {
  following: [
    {
      id: "52341",
      title: "Implement real-time collaboration features",
      assignedTo: ["Alex Thompson"],
      tags: ["feature", "realtime", "collaboration"],
      status: "active",
      commentsCount: 8,
      workItemType: "Feature",
      createdBy: "Sarah Mitchell",
      activityDate: "2025-01-15T14:30:00Z",
    },
    {
      id: "52298",
      title: "Optimize database query performance for reports",
      assignedTo: ["Jordan Lee"],
      tags: ["performance", "database", "optimization"],
      status: "active",
      commentsCount: 5,
      workItemType: "Task",
      createdBy: "Michael Chen",
      activityDate: "2025-01-14T09:15:00Z",
    },
    {
      id: "52187",
      title: "Fix memory leak in dashboard component",
      assignedTo: ["Emma Wilson"],
      tags: ["bugfix", "memory", "critical"],
      status: "stuck",
      commentsCount: 12,
      workItemType: "Bug",
      createdBy: "David Park",
      activityDate: "2025-01-13T16:45:00Z",
    },
    {
      id: "52045",
      title: "Add multi-language support for UI",
      assignedTo: ["Carlos Rodriguez"],
      tags: ["i18n", "localization", "UI"],
      status: "active",
      commentsCount: 3,
      workItemType: "Feature",
      createdBy: "Lisa Anderson",
      activityDate: "2025-01-12T11:20:00Z",
    },
    {
      id: "51923",
      title: "Update authentication flow with 2FA",
      assignedTo: ["Nina Patel"],
      tags: ["security", "auth", "2FA"],
      status: "done",
      commentsCount: 7,
      workItemType: "Feature",
      createdBy: "Robert Kim",
      activityDate: "2025-01-11T13:00:00Z",
    },
  ],
  mentioned: [
    {
      id: "52456",
      title: "Review API documentation for v3 release",
      assignedTo: ["Marcus Johnson"],
      tags: ["documentation", "API", "review"],
      status: "new",
      commentsCount: 2,
      workItemType: "Task",
      createdBy: "Jennifer White",
      activityDate: "2025-01-16T10:30:00Z",
    },
    {
      id: "52389",
      title: "Implement webhook notification system",
      assignedTo: ["Sophia Martinez"],
      tags: ["webhooks", "notifications", "backend"],
      status: "active",
      commentsCount: 6,
      workItemType: "Feature",
      createdBy: "Thomas Brown",
      activityDate: "2025-01-15T15:45:00Z",
    },
    {
      id: "52267",
      title: "Fix broken links in help documentation",
      assignedTo: ["Oliver Davis"],
      tags: ["documentation", "bugfix"],
      status: "done",
      commentsCount: 1,
      workItemType: "Bug",
      createdBy: "Amanda Garcia",
      activityDate: "2025-01-14T08:20:00Z",
    },
    {
      id: "52134",
      title: "Add export functionality for analytics data",
      assignedTo: ["Isabella Taylor"],
      tags: ["analytics", "export", "feature"],
      status: "active",
      commentsCount: 9,
      workItemType: "Feature",
      createdBy: "Kevin Zhang",
      activityDate: "2025-01-13T14:10:00Z",
    },
    {
      id: "52012",
      title: "Refactor user permissions module",
      assignedTo: ["Ethan Moore"],
      tags: ["refactoring", "permissions", "backend"],
      status: "active",
      commentsCount: 4,
      workItemType: "Task",
      createdBy: "Rachel Green",
      activityDate: "2025-01-12T09:55:00Z",
    },
  ],
  "recently-viewed": [
    {
      id: "52578",
      title: "Design new onboarding flow for mobile app",
      assignedTo: ["Ava Robinson"],
      tags: ["design", "mobile", "UX"],
      status: "active",
      commentsCount: 11,
      workItemType: "Feature",
      createdBy: "Daniel Scott",
      activityDate: "2025-01-17T11:25:00Z",
    },
    {
      id: "52501",
      title: "Investigate slow page load times",
      assignedTo: ["Liam Anderson"],
      tags: ["performance", "investigation"],
      status: "active",
      commentsCount: 7,
      workItemType: "Bug",
      createdBy: "Olivia Harris",
      activityDate: "2025-01-16T13:40:00Z",
    },
    {
      id: "52423",
      title: "Implement dark mode for settings page",
      assignedTo: ["Mia Thompson"],
      tags: ["UI", "dark-mode", "settings"],
      status: "done",
      commentsCount: 3,
      workItemType: "Feature",
      createdBy: "Noah Wilson",
      activityDate: "2025-01-15T10:15:00Z",
    },
    {
      id: "52345",
      title: "Add unit tests for payment processing",
      assignedTo: ["James Martinez"],
      tags: ["testing", "payments", "quality"],
      status: "active",
      commentsCount: 5,
      workItemType: "Task",
      createdBy: "Emma Johnson",
      activityDate: "2025-01-14T16:30:00Z",
    },
    {
      id: "52289",
      title: "Update third-party dependencies",
      assignedTo: ["Charlotte Lee"],
      tags: ["maintenance", "dependencies"],
      status: "new",
      commentsCount: 0,
      workItemType: "Task",
      createdBy: "William Brown",
      activityDate: "2025-01-13T12:05:00Z",
    },
  ],
  "recently-created": [
    {
      id: "52689",
      title: "Create admin dashboard for user management",
      assignedTo: ["Benjamin Clark"],
      tags: ["admin", "dashboard", "users"],
      status: "new",
      commentsCount: 0,
      workItemType: "Feature",
      createdBy: "Sophia Davis",
      activityDate: "2025-01-18T09:00:00Z",
    },
    {
      id: "52688",
      title: "Fix calendar sync issues with Google Calendar",
      assignedTo: ["Amelia Rodriguez"],
      tags: ["bugfix", "calendar", "integration"],
      status: "new",
      commentsCount: 1,
      workItemType: "Bug",
      createdBy: "Lucas Miller",
      activityDate: "2025-01-18T08:45:00Z",
    },
    {
      id: "52687",
      title: "Implement file upload with drag and drop",
      assignedTo: ["Harper Garcia"],
      tags: ["feature", "upload", "UI"],
      status: "new",
      commentsCount: 2,
      workItemType: "Feature",
      createdBy: "Mason Wilson",
      activityDate: "2025-01-18T08:30:00Z",
    },
    {
      id: "52686",
      title: "Add search filters for project list",
      assignedTo: ["Evelyn Martinez"],
      tags: ["search", "filters", "enhancement"],
      status: "new",
      commentsCount: 0,
      workItemType: "Task",
      createdBy: "Logan Anderson",
      activityDate: "2025-01-18T08:15:00Z",
    },
    {
      id: "52685",
      title: "Create API endpoint for bulk operations",
      assignedTo: ["Abigail Taylor"],
      tags: ["API", "backend", "bulk"],
      status: "new",
      commentsCount: 3,
      workItemType: "Feature",
      createdBy: "Jackson Thomas",
      activityDate: "2025-01-18T08:00:00Z",
    },
  ],
  "recently-updated": [
    {
      id: "52612",
      title: "Migrate legacy codebase to TypeScript",
      assignedTo: ["Sebastian Moore"],
      tags: ["migration", "typescript", "refactoring"],
      status: "active",
      commentsCount: 15,
      workItemType: "Task",
      createdBy: "Aria Jackson",
      activityDate: "2025-01-17T16:20:00Z",
    },
    {
      id: "52534",
      title: "Fix responsive layout issues on tablet",
      assignedTo: ["Henry White"],
      tags: ["bugfix", "responsive", "CSS"],
      status: "active",
      commentsCount: 8,
      workItemType: "Bug",
      createdBy: "Scarlett Harris",
      activityDate: "2025-01-17T14:50:00Z",
    },
    {
      id: "52467",
      title: "Add email notification preferences",
      assignedTo: ["Victoria Martin"],
      tags: ["notifications", "email", "settings"],
      status: "active",
      commentsCount: 6,
      workItemType: "Feature",
      createdBy: "Alexander Thompson",
      activityDate: "2025-01-17T12:35:00Z",
    },
    {
      id: "52398",
      title: "Optimize image compression pipeline",
      assignedTo: ["Grace Garcia"],
      tags: ["optimization", "images", "performance"],
      status: "stuck",
      commentsCount: 10,
      workItemType: "Task",
      createdBy: "Samuel Lee",
      activityDate: "2025-01-17T10:10:00Z",
    },
    {
      id: "52321",
      title: "Implement rate limiting for API endpoints",
      assignedTo: ["Chloe Rodriguez"],
      tags: ["security", "API", "rate-limiting"],
      status: "active",
      commentsCount: 4,
      workItemType: "Feature",
      createdBy: "Daniel Martinez",
      activityDate: "2025-01-16T17:45:00Z",
    },
  ],
  "recently-completed": [
    {
      id: "52256",
      title: "Setup CI/CD pipeline for staging environment",
      assignedTo: ["Matthew Wilson"],
      tags: ["DevOps", "CI/CD", "infrastructure"],
      status: "done",
      commentsCount: 9,
      workItemType: "Task",
      createdBy: "Zoe Anderson",
      activityDate: "2025-01-15T18:00:00Z",
    },
    {
      id: "52178",
      title: "Fix authentication token expiration bug",
      assignedTo: ["Ella Thomas"],
      tags: ["bugfix", "auth", "security"],
      status: "done",
      commentsCount: 6,
      workItemType: "Bug",
      createdBy: "Ryan Taylor",
      activityDate: "2025-01-14T15:30:00Z",
    },
    {
      id: "52089",
      title: "Add pagination to search results",
      assignedTo: ["Jack Moore"],
      tags: ["feature", "search", "pagination"],
      status: "done",
      commentsCount: 3,
      workItemType: "Feature",
      createdBy: "Hannah Jackson",
      activityDate: "2025-01-13T11:45:00Z",
    },
    {
      id: "51967",
      title: "Update privacy policy and terms of service",
      assignedTo: ["Lily White"],
      tags: ["legal", "documentation"],
      status: "done",
      commentsCount: 2,
      workItemType: "Task",
      createdBy: "Owen Harris",
      activityDate: "2025-01-12T14:20:00Z",
    },
    {
      id: "51845",
      title: "Implement password strength validator",
      assignedTo: ["Aiden Martin"],
      tags: ["security", "validation", "auth"],
      status: "done",
      commentsCount: 5,
      workItemType: "Feature",
      createdBy: "Nora Thompson",
      activityDate: "2025-01-11T09:30:00Z",
    },
  ],
  "assigned-to-me": [
    {
      id: "52701",
      title: "Review code changes for sprint 24",
      assignedTo: ["You"],
      tags: ["review", "code-review"],
      status: "active",
      commentsCount: 4,
      workItemType: "Task",
      createdBy: "Emily Garcia",
      activityDate: "2025-01-18T10:30:00Z",
    },
    {
      id: "52645",
      title: "Fix dropdown menu positioning bug",
      assignedTo: ["You"],
      tags: ["bugfix", "UI", "dropdown"],
      status: "active",
      commentsCount: 2,
      workItemType: "Bug",
      createdBy: "Christopher Lee",
      activityDate: "2025-01-17T13:15:00Z",
    },
    {
      id: "52589",
      title: "Implement user activity tracking",
      assignedTo: ["You"],
      tags: ["analytics", "tracking", "feature"],
      status: "new",
      commentsCount: 0,
      workItemType: "Feature",
      createdBy: "Madison Rodriguez",
      activityDate: "2025-01-16T11:50:00Z",
    },
    {
      id: "52512",
      title: "Update component library documentation",
      assignedTo: ["You"],
      tags: ["documentation", "components"],
      status: "active",
      commentsCount: 7,
      workItemType: "Task",
      createdBy: "Elijah Martinez",
      activityDate: "2025-01-15T09:25:00Z",
    },
    {
      id: "52434",
      title: "Optimize bundle size for production build",
      assignedTo: ["You"],
      tags: ["optimization", "performance", "build"],
      status: "stuck",
      commentsCount: 11,
      workItemType: "Task",
      createdBy: "Avery Wilson",
      activityDate: "2025-01-14T14:40:00Z",
    },
  ],
}

const tagColors = [
  "bg-blue-500/20 text-blue-400 border-blue-500/30",
  "bg-purple-500/20 text-purple-400 border-purple-500/30",
  "bg-pink-500/20 text-pink-400 border-pink-500/30",
  "bg-teal-500/20 text-teal-400 border-teal-500/30",
  "bg-orange-500/20 text-orange-400 border-orange-500/30",
]

const statusColors = {
  new: "bg-gray-500/20 text-gray-400",
  active: "bg-blue-500/20 text-blue-400",
  stuck: "bg-red-500/20 text-red-400",
  done: "bg-green-500/20 text-green-400",
  cancelled: "bg-gray-500/20 text-gray-400",
}

const statusLabels = {
  new: "New",
  active: "Active",
  stuck: "Stuck",
  done: "Resolved",
  cancelled: "Cancelled",
}

interface ColumnFilters {
  id: string
  title: string
  assignedTo: string
  state: string
  tags: string
  createdBy: string
}

export function BoardWorkItemsView() {
  const [selectedFilter, setSelectedFilter] = useState<FilterType>("recently-updated")
  const [columnFilters, setColumnFilters] = useState<ColumnFilters>({
    id: "",
    title: "",
    assignedTo: "",
    state: "",
    tags: "",
    createdBy: "",
  })
  const [selectedWorkItem, setSelectedWorkItem] = useState<WorkItem | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const workItems = mockWorkItemsByFilter[selectedFilter]

  const filteredWorkItems = workItems.filter((item) => {
    const matchesId = item.id.toLowerCase().includes(columnFilters.id.toLowerCase())
    const matchesTitle = item.title.toLowerCase().includes(columnFilters.title.toLowerCase())
    const matchesAssignedTo = item.assignedTo.some((person) =>
      person.toLowerCase().includes(columnFilters.assignedTo.toLowerCase()),
    )
    const matchesState = statusLabels[item.status].toLowerCase().includes(columnFilters.state.toLowerCase())
    const matchesTags = item.tags?.some((tag) => tag.toLowerCase().includes(columnFilters.tags.toLowerCase())) ?? true
    const matchesCreatedBy = (item.createdBy || "").toLowerCase().includes(columnFilters.createdBy.toLowerCase())

    return matchesId && matchesTitle && matchesAssignedTo && matchesState && matchesTags && matchesCreatedBy
  })

  const clearFilter = (column: keyof ColumnFilters) => {
    setColumnFilters((prev) => ({ ...prev, [column]: "" }))
  }

  const clearAllFilters = () => {
    setColumnFilters({
      id: "",
      title: "",
      assignedTo: "",
      state: "",
      tags: "",
      createdBy: "",
    })
  }

  const hasActiveFilters = Object.values(columnFilters).some((value) => value !== "")

  const handleRowDoubleClick = (item: WorkItem) => {
    setSelectedWorkItem(item)
    setIsDialogOpen(true)
  }

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex items-center gap-2 bg-secondary/30 p-3 rounded-lg border border-border">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="gap-2 hover:bg-secondary">
              {filterLabels[selectedFilter]}
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            {(Object.keys(filterLabels) as FilterType[]).map((filter) => (
              <DropdownMenuItem key={filter} onClick={() => setSelectedFilter(filter)}>
                {filterLabels[filter]}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {hasActiveFilters && (
          <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground" onClick={clearAllFilters}>
            <X className="h-4 w-4" />
            Clear all filters
          </Button>
        )}
      </div>

      {/* Work Items Grid */}
      <div className="bg-card rounded-lg border border-border overflow-hidden">
        <table className="w-full">
          <thead className="bg-secondary/30 border-b border-border">
            <tr className="text-left text-xs font-medium text-muted-foreground">
              <th className="py-3 px-4 w-20">ID</th>
              <th className="py-3 px-4">Title</th>
              <th className="py-3 px-4 w-48">Assigned To</th>
              <th className="py-3 px-4 w-32">State</th>
              <th className="py-3 px-4 w-64">Tags</th>
              <th className="py-3 px-4 w-40">Activity Date</th>
              <th className="py-3 px-4 w-48">Created By</th>
              <th className="py-3 px-4 w-24 text-center">Comments</th>
            </tr>
            <tr className="bg-secondary/20">
              <th className="py-2 px-4">
                <div className="relative">
                  <Input
                    placeholder="Filter..."
                    value={columnFilters.id}
                    onChange={(e) => setColumnFilters((prev) => ({ ...prev, id: e.target.value }))}
                    className="h-7 text-xs bg-background/50"
                  />
                  {columnFilters.id && (
                    <button
                      onClick={() => clearFilter("id")}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  )}
                </div>
              </th>
              <th className="py-2 px-4">
                <div className="relative">
                  <Input
                    placeholder="Filter..."
                    value={columnFilters.title}
                    onChange={(e) => setColumnFilters((prev) => ({ ...prev, title: e.target.value }))}
                    className="h-7 text-xs bg-background/50"
                  />
                  {columnFilters.title && (
                    <button
                      onClick={() => clearFilter("title")}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  )}
                </div>
              </th>
              <th className="py-2 px-4">
                <div className="relative">
                  <Input
                    placeholder="Filter..."
                    value={columnFilters.assignedTo}
                    onChange={(e) => setColumnFilters((prev) => ({ ...prev, assignedTo: e.target.value }))}
                    className="h-7 text-xs bg-background/50"
                  />
                  {columnFilters.assignedTo && (
                    <button
                      onClick={() => clearFilter("assignedTo")}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  )}
                </div>
              </th>
              <th className="py-2 px-4">
                <div className="relative">
                  <Input
                    placeholder="Filter..."
                    value={columnFilters.state}
                    onChange={(e) => setColumnFilters((prev) => ({ ...prev, state: e.target.value }))}
                    className="h-7 text-xs bg-background/50"
                  />
                  {columnFilters.state && (
                    <button
                      onClick={() => clearFilter("state")}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  )}
                </div>
              </th>
              <th className="py-2 px-4">
                <div className="relative">
                  <Input
                    placeholder="Filter..."
                    value={columnFilters.tags}
                    onChange={(e) => setColumnFilters((prev) => ({ ...prev, tags: e.target.value }))}
                    className="h-7 text-xs bg-background/50"
                  />
                  {columnFilters.tags && (
                    <button
                      onClick={() => clearFilter("tags")}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  )}
                </div>
              </th>
              <th className="py-2 px-4">{/* Activity Date doesn't need filter */}</th>
              <th className="py-2 px-4">
                <div className="relative">
                  <Input
                    placeholder="Filter..."
                    value={columnFilters.createdBy}
                    onChange={(e) => setColumnFilters((prev) => ({ ...prev, createdBy: e.target.value }))}
                    className="h-7 text-xs bg-background/50"
                  />
                  {columnFilters.createdBy && (
                    <button
                      onClick={() => clearFilter("createdBy")}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  )}
                </div>
              </th>
              <th className="py-2 px-4">{/* Comments doesn't need filter */}</th>
            </tr>
          </thead>
          <tbody>
            {filteredWorkItems.map((item, idx) => (
              <tr
                key={item.id}
                className="border-b border-border hover:bg-secondary/20 transition-colors cursor-pointer"
                onDoubleClick={() => handleRowDoubleClick(item)}
              >
                <td className="py-3 px-4">
                  <span className="text-sm font-medium text-cyan-400">{item.id}</span>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    {item.workItemType && <span className="text-blue-400 text-sm">■</span>}
                    <span className="text-sm text-foreground">{item.title}</span>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    {item.assignedTo.length > 0 && (
                      <>
                        <div
                          className={cn(
                            "h-6 w-6 rounded-full flex items-center justify-center text-xs font-medium",
                            idx % 4 === 0 && "bg-gradient-to-br from-blue-500 to-purple-500 text-white",
                            idx % 4 === 1 && "bg-gradient-to-br from-purple-500 to-pink-500 text-white",
                            idx % 4 === 2 && "bg-gradient-to-br from-teal-500 to-cyan-500 text-white",
                            idx % 4 === 3 && "bg-gradient-to-br from-orange-500 to-pink-500 text-white",
                          )}
                        >
                          {item.assignedTo[0]
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <span className="text-sm text-foreground">{item.assignedTo[0]}</span>
                      </>
                    )}
                  </div>
                </td>
                <td className="py-3 px-4">
                  <Badge variant="outline" className={cn("text-xs border", statusColors[item.status])}>
                    {statusLabels[item.status]}
                  </Badge>
                </td>
                <td className="py-3 px-4">
                  <div className="flex gap-1 flex-wrap">
                    {item.tags?.map((tag, tagIdx) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className={cn("text-xs border", tagColors[tagIdx % tagColors.length])}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </td>
                <td className="py-3 px-4">
                  <span className="text-sm text-muted-foreground">
                    {new Date(item.activityDate || Date.now()).toLocaleDateString("en-US", {
                      month: "numeric",
                      day: "numeric",
                      year: "numeric",
                      hour: "numeric",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <div
                      className={cn(
                        "h-6 w-6 rounded-full flex items-center justify-center text-xs font-medium",
                        idx % 3 === 0 && "bg-gradient-to-br from-purple-500 to-pink-500 text-white",
                        idx % 3 === 1 && "bg-gradient-to-br from-teal-500 to-cyan-500 text-white",
                        idx % 3 === 2 && "bg-gradient-to-br from-orange-500 to-pink-500 text-white",
                      )}
                    >
                      {item.createdBy
                        ?.split(" ")
                        .map((n) => n[0])
                        .join("") || "U"}
                    </div>
                    <span className="text-sm text-foreground">{item.createdBy || "Unassigned"}</span>
                  </div>
                </td>
                <td className="py-3 px-4 text-center">
                  <div className="flex items-center justify-center gap-1">
                    <MessageSquare className="h-4 w-4 text-cyan-400" />
                    <span className="text-sm text-foreground">{item.commentsCount}</span>
                  </div>
                </td>
              </tr>
            ))}
            {filteredWorkItems.length === 0 && (
              <tr>
                <td colSpan={8} className="py-12 text-center text-muted-foreground">
                  No work items found matching your filters
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Work Item Detail Dialog */}
      <WorkItemDetailDialog workItem={selectedWorkItem} open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </div>
  )
}
