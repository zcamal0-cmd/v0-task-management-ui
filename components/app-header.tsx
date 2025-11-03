"use client"

import { useState } from "react"
import { Bell, User, ChevronDown, Search } from "lucide-react"
import { Button } from "@/components/ui/button"

export function AppHeader() {
  const [showNotifications, setShowNotifications] = useState(false)
  const [showProfile, setShowProfile] = useState(false)

  const notifications = [
    {
      id: 1,
      title: "New comment on VEIS-123",
      message: "Sarah mentioned you in a comment",
      time: "5 min ago",
      unread: true,
    },
    {
      id: 2,
      title: "Task assigned",
      message: "John assigned you to AzDoc-45",
      time: "1 hour ago",
      unread: true,
    },
    {
      id: 3,
      title: "Sprint completed",
      message: "Sprint 1 has been completed",
      time: "2 hours ago",
      unread: false,
    },
  ]

  const unreadCount = notifications.filter((n) => n.unread).length

  return (
    <header className="h-16 border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
      <div className="h-full px-6 flex items-center justify-between">
        {/* Search */}
        <div className="flex-1 max-w-xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search boards, tasks, workspaces..."
              className="w-full pl-10 pr-4 py-2 bg-secondary border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
            />
          </div>
        </div>

        {/* Right side - Notifications and Profile */}
        <div className="flex items-center gap-3">
          {/* Notifications */}
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative hover:bg-secondary"
            >
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 bg-gradient-to-r from-orange-500 to-pink-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </Button>

            {showNotifications && (
              <div className="absolute right-0 top-full mt-2 w-80 bg-card border border-border rounded-lg shadow-xl overflow-hidden">
                <div className="p-4 border-b border-border bg-gradient-to-r from-purple-600/10 to-pink-600/10">
                  <h3 className="font-semibold">Notifications</h3>
                  <p className="text-xs text-muted-foreground">{unreadCount} unread</p>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 border-b border-border hover:bg-secondary/50 cursor-pointer transition-colors ${
                        notification.unread ? "bg-purple-500/5" : ""
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        {notification.unread && (
                          <div className="h-2 w-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 mt-1.5" />
                        )}
                        <div className="flex-1">
                          <p className="font-medium text-sm">{notification.title}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">{notification.message}</p>
                          <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-3 border-t border-border text-center">
                  <button className="text-sm text-purple-400 hover:text-purple-300 font-medium">
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Profile */}
          <div className="relative">
            <Button
              variant="ghost"
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center gap-2 hover:bg-secondary"
            >
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold text-sm ring-2 ring-purple-500/50">
                JD
              </div>
              <span className="text-sm font-medium">John Doe</span>
              <ChevronDown className="h-4 w-4" />
            </Button>

            {showProfile && (
              <div className="absolute right-0 top-full mt-2 w-64 bg-card border border-border rounded-lg shadow-xl overflow-hidden">
                <div className="p-4 border-b border-border bg-gradient-to-r from-blue-600/10 to-purple-600/10">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold ring-2 ring-purple-500/50">
                      JD
                    </div>
                    <div>
                      <p className="font-semibold">John Doe</p>
                      <p className="text-xs text-muted-foreground">john.doe@company.com</p>
                    </div>
                  </div>
                </div>
                <div className="p-2">
                  <button className="w-full px-3 py-2 text-left text-sm hover:bg-secondary rounded transition-colors flex items-center gap-2">
                    <User className="h-4 w-4 text-blue-400" />
                    My Profile
                  </button>
                  <button className="w-full px-3 py-2 text-left text-sm hover:bg-secondary rounded transition-colors">
                    Settings
                  </button>
                  <button className="w-full px-3 py-2 text-left text-sm hover:bg-secondary rounded transition-colors">
                    Preferences
                  </button>
                </div>
                <div className="p-2 border-t border-border">
                  <button className="w-full px-3 py-2 text-left text-sm hover:bg-secondary rounded transition-colors text-red-400">
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
