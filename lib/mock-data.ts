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
  description: string
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

// Mock Workspaces
export const workspaces: Workspace[] = [
  {
    id: "softdev",
    name: "Softdev",
    image: "/software-development-icon.jpg",
    description: "Software development workspace for all engineering projects",
    createdDate: "2024-01-15",
    owner: "John Smith",
    members: ["John Smith", "Sarah Johnson", "Mike Chen", "Emily Davis"],
    boards: [],
  },
  {
    id: "hr",
    name: "HR",
    image: "/human-resources-icon.jpg",
    description: "Human Resources workspace for recruitment and onboarding",
    createdDate: "2024-02-01",
    owner: "Lisa Anderson",
    members: ["Lisa Anderson", "Tom Wilson", "Rachel Green"],
    boards: [],
  },
]

// Mock Boards for Softdev
const veisBoard: Board = {
  id: "veis",
  name: "VEIS",
  image: "/project-board.jpg",
  description: "Veteran Employment Information System - Main development board",
  workspaceId: "softdev",
  groups: [
    {
      id: "sprint1",
      name: "Sprint 1",
      workItems: [
        {
          id: "VEIS-101",
          title: "Implement user authentication",
          assignedTo: ["Sarah Johnson", "Mike Chen"],
          tags: ["backend", "security"],
          status: "active",
          commentsCount: 5,
          workItemType: "Feature",
          children: [
            {
              id: "VEIS-101-1",
              title: "Setup JWT tokens",
              assignedTo: ["Mike Chen"],
              tags: ["backend"],
              status: "done",
              commentsCount: 2,
              workItemType: "Task",
            },
            {
              id: "VEIS-101-2",
              title: "Create login API",
              assignedTo: ["Sarah Johnson"],
              tags: ["backend", "api"],
              status: "active",
              commentsCount: 1,
              workItemType: "Task",
            },
          ],
        },
        {
          id: "VEIS-102",
          title: "Design dashboard UI",
          assignedTo: ["Emily Davis"],
          tags: ["frontend", "ui"],
          status: "stuck",
          commentsCount: 3,
          workItemType: "Task",
        },
      ],
    },
    {
      id: "sprint2",
      name: "Sprint 2",
      workItems: [
        {
          id: "VEIS-201",
          title: "Add data export functionality",
          assignedTo: ["John Smith"],
          tags: ["feature", "backend"],
          status: "new",
          commentsCount: 1,
          workItemType: "Feature",
        },
        {
          id: "VEIS-202",
          title: "Optimize database queries",
          assignedTo: ["Mike Chen", "John Smith"],
          tags: ["performance", "backend"],
          status: "new",
          commentsCount: 0,
          workItemType: "Task",
        },
      ],
    },
    {
      id: "backlog",
      name: "Backlog",
      workItems: [
        {
          id: "VEIS-301",
          title: "Mobile app development",
          assignedTo: ["Sarah Johnson"],
          tags: ["mobile", "frontend"],
          status: "new",
          commentsCount: 2,
          workItemType: "Epic",
        },
        {
          id: "VEIS-302",
          title: "Integration with third-party APIs",
          assignedTo: [],
          tags: ["integration", "backend"],
          status: "new",
          commentsCount: 0,
          workItemType: "Feature",
        },
      ],
    },
  ],
}

const azdocBoard: Board = {
  id: "azdoc",
  name: "AzDoc",
  image: "/documentation-project.jpg",
  description: "Azure Documentation Portal - Technical documentation and guides",
  workspaceId: "softdev",
  groups: [
    {
      id: "mvp",
      name: "MVP",
      workItems: [
        {
          id: "AZDOC-101",
          title: "Create API documentation",
          assignedTo: ["Emily Davis"],
          tags: ["documentation", "api"],
          status: "active",
          commentsCount: 4,
          workItemType: "Task",
        },
        {
          id: "AZDOC-102",
          title: "Setup documentation portal",
          assignedTo: ["John Smith", "Emily Davis"],
          tags: ["infrastructure", "documentation"],
          status: "done",
          commentsCount: 7,
          workItemType: "Task",
        },
      ],
    },
    {
      id: "v1",
      name: "V1",
      workItems: [
        {
          id: "AZDOC-201",
          title: "Add code examples",
          assignedTo: ["Sarah Johnson"],
          tags: ["documentation", "examples"],
          status: "new",
          commentsCount: 1,
          workItemType: "Task",
        },
        {
          id: "AZDOC-202",
          title: "Create video tutorials",
          assignedTo: ["Mike Chen"],
          tags: ["documentation", "video"],
          status: "new",
          commentsCount: 0,
          workItemType: "Feature",
        },
      ],
    },
    {
      id: "v2",
      name: "V2",
      workItems: [
        {
          id: "AZDOC-301",
          title: "Implement search functionality",
          assignedTo: ["John Smith"],
          tags: ["feature", "search"],
          status: "new",
          commentsCount: 2,
          workItemType: "Feature",
        },
        {
          id: "AZDOC-302",
          title: "Add multilingual support",
          assignedTo: [],
          tags: ["feature", "i18n"],
          status: "new",
          commentsCount: 0,
          workItemType: "Feature",
        },
      ],
    },
  ],
}

// Mock Boards for HR
const recruitmentBoard: Board = {
  id: "recruitment",
  name: "Recruitment",
  image: "/recruitment-hiring.jpg",
  description: "Candidate recruitment and interview tracking",
  workspaceId: "hr",
  groups: [
    {
      id: "interview",
      name: "Interview",
      workItems: [
        {
          id: "REC-101",
          title: "Senior Developer Interview",
          assignedTo: ["Lisa Anderson"],
          status: "active",
          commentsCount: 3,
          employeeName: "Alex Thompson",
          dueDate: "2025-11-10",
        },
        {
          id: "REC-102",
          title: "Product Manager Screening",
          assignedTo: ["Tom Wilson"],
          status: "active",
          commentsCount: 1,
          employeeName: "Jordan Lee",
          dueDate: "2025-11-08",
        },
      ],
    },
    {
      id: "offer-sent",
      name: "Offer sent",
      workItems: [
        {
          id: "REC-201",
          title: "UX Designer Offer",
          assignedTo: ["Lisa Anderson", "Rachel Green"],
          status: "stuck",
          commentsCount: 5,
          employeeName: "Sam Martinez",
          dueDate: "2025-11-15",
        },
        {
          id: "REC-202",
          title: "Data Analyst Offer",
          assignedTo: ["Tom Wilson"],
          status: "active",
          commentsCount: 2,
          employeeName: "Casey Brown",
          dueDate: "2025-11-12",
        },
      ],
    },
    {
      id: "hired",
      name: "Hired",
      workItems: [
        {
          id: "REC-301",
          title: "Frontend Developer",
          assignedTo: ["Rachel Green"],
          status: "done",
          commentsCount: 8,
          employeeName: "Morgan Taylor",
          dueDate: "2025-11-05",
        },
        {
          id: "REC-302",
          title: "DevOps Engineer",
          assignedTo: ["Lisa Anderson"],
          status: "done",
          commentsCount: 6,
          employeeName: "Riley Johnson",
          dueDate: "2025-11-03",
        },
      ],
    },
  ],
}

const onboardingBoard: Board = {
  id: "onboarding",
  name: "Onboarding",
  image: "/employee-onboarding.jpg",
  description: "New employee onboarding and setup process",
  workspaceId: "hr",
  groups: [
    {
      id: "it-setup",
      name: "IT setup",
      workItems: [
        {
          id: "ONB-101",
          title: "Setup laptop and accounts",
          assignedTo: ["Tom Wilson"],
          status: "active",
          commentsCount: 2,
          employeeName: "Morgan Taylor",
          dueDate: "2025-11-06",
        },
        {
          id: "ONB-102",
          title: "Configure development environment",
          assignedTo: ["Tom Wilson"],
          status: "new",
          commentsCount: 0,
          employeeName: "Riley Johnson",
          dueDate: "2025-11-07",
        },
      ],
    },
    {
      id: "orientation",
      name: "Orientation",
      workItems: [
        {
          id: "ONB-201",
          title: "Company culture presentation",
          assignedTo: ["Lisa Anderson"],
          status: "done",
          commentsCount: 4,
          employeeName: "Morgan Taylor",
          dueDate: "2025-11-04",
        },
        {
          id: "ONB-202",
          title: "Team introduction meeting",
          assignedTo: ["Rachel Green"],
          status: "active",
          commentsCount: 1,
          employeeName: "Riley Johnson",
          dueDate: "2025-11-05",
        },
      ],
    },
    {
      id: "setup",
      name: "Setup",
      workItems: [
        {
          id: "ONB-301",
          title: "Benefits enrollment",
          assignedTo: ["Rachel Green"],
          status: "new",
          commentsCount: 0,
          employeeName: "Morgan Taylor",
          dueDate: "2025-11-10",
        },
        {
          id: "ONB-302",
          title: "Complete HR paperwork",
          assignedTo: ["Lisa Anderson"],
          status: "new",
          commentsCount: 1,
          employeeName: "Riley Johnson",
          dueDate: "2025-11-08",
        },
      ],
    },
  ],
}

// Assign boards to workspaces
workspaces[0].boards = [azdocBoard, veisBoard]
workspaces[1].boards = [recruitmentBoard, onboardingBoard]

// Mock Feed Items
export const feedItems: FeedItem[] = [
  {
    id: "feed-1",
    user: "Roy Mann",
    userAvatar: "/diverse-user-avatars.png",
    workItemId: "VEIS-101",
    workItemName: "Implement user authentication",
    boardName: "VEIS",
    comment: "Great progress on the JWT implementation!",
    date: "2025-11-02",
  },
  {
    id: "feed-2",
    user: "Sarah Johnson",
    userAvatar: "/female-user-avatar.png",
    workItemId: "AZDOC-101",
    workItemName: "Create API documentation",
    boardName: "AzDoc",
    comment: "Can you review the API endpoints section?",
    date: "2025-11-01",
  },
]

// Mock Assigned Tasks for Today
export const assignedTasksToday: AssignedTask[] = [
  {
    id: "VEIS-102",
    title: "Design dashboard UI",
    assignedBy: "John Smith",
    boardName: "VEIS",
  },
  {
    id: "AZDOC-101",
    title: "Create API documentation",
    assignedBy: "Mike Chen",
    boardName: "AzDoc",
  },
  {
    id: "ONB-101",
    title: "Setup laptop and accounts",
    assignedBy: "Lisa Anderson",
    boardName: "Onboarding",
    dueDate: "2025-11-06",
  },
]

export { veisBoard, azdocBoard, recruitmentBoard, onboardingBoard }
