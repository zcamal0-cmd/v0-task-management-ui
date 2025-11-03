"use client"

import type React from "react"

import { useState } from "react"
import { X, Upload, Search, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface CreateBoardModalProps {
  isOpen: boolean
  onClose: () => void
}

const availableMembers = [
  "John Smith",
  "Sarah Johnson",
  "Mike Chen",
  "Emily Davis",
  "Lisa Anderson",
  "Tom Wilson",
  "Rachel Green",
  "Alex Thompson",
  "Jordan Lee",
  "Sam Martinez",
]

export function CreateBoardModal({ isOpen, onClose }: CreateBoardModalProps) {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [selectedMembers, setSelectedMembers] = useState<string[]>([])
  const [memberSearch, setMemberSearch] = useState("")
  const [showMemberDropdown, setShowMemberDropdown] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [groups, setGroups] = useState<string[]>([])
  const [groupInput, setGroupInput] = useState("")

  if (!isOpen) return null

  const filteredMembers = availableMembers.filter(
    (member) => member.toLowerCase().includes(memberSearch.toLowerCase()) && !selectedMembers.includes(member),
  )

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const addMember = (member: string) => {
    setSelectedMembers([...selectedMembers, member])
    setMemberSearch("")
    setShowMemberDropdown(false)
  }

  const removeMember = (member: string) => {
    setSelectedMembers(selectedMembers.filter((m) => m !== member))
  }

  const addGroup = () => {
    if (groupInput.trim() && !groups.includes(groupInput.trim())) {
      setGroups([...groups, groupInput.trim()])
      setGroupInput("")
    }
  }

  const removeGroup = (group: string) => {
    setGroups(groups.filter((g) => g !== group))
  }

  const handleCreate = () => {
    console.log("[v0] Creating board:", { name, description, selectedMembers, groups, imagePreview })
    // Reset form
    setName("")
    setDescription("")
    setSelectedMembers([])
    setGroups([])
    setImagePreview(null)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-card rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
            Create New Board
          </h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="p-6 space-y-4">
          {/* Name Input */}
          <div className="space-y-2">
            <Label htmlFor="board-name">Board Name</Label>
            <Input
              id="board-name"
              placeholder="Enter board name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-background"
            />
          </div>

          {/* Description Input */}
          <div className="space-y-2">
            <Label htmlFor="board-description">Description</Label>
            <Textarea
              id="board-description"
              placeholder="Enter board description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="bg-background min-h-[100px]"
            />
          </div>

          {/* Image Upload */}
          <div className="space-y-2">
            <Label htmlFor="board-image">Board Image</Label>
            <div className="flex items-center gap-4">
              {imagePreview && (
                <div className="h-16 w-16 rounded-lg overflow-hidden ring-2 ring-cyan-500/50">
                  <img src={imagePreview || "/placeholder.svg"} alt="Preview" className="h-full w-full object-cover" />
                </div>
              )}
              <label
                htmlFor="board-image"
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-cyan-500 transition-colors"
              >
                <Upload className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Upload Image</span>
                <input id="board-image" type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
              </label>
            </div>
          </div>

          {/* Add Members */}
          <div className="space-y-2">
            <Label htmlFor="board-members">Add Members</Label>
            <div className="relative">
              <div className="flex items-center gap-2 bg-background rounded-lg border border-border px-3 py-2">
                <Search className="h-4 w-4 text-muted-foreground" />
                <input
                  id="board-members"
                  type="text"
                  placeholder="Search members by name"
                  value={memberSearch}
                  onChange={(e) => setMemberSearch(e.target.value)}
                  onFocus={() => setShowMemberDropdown(true)}
                  className="flex-1 bg-transparent outline-none text-sm"
                />
              </div>

              {showMemberDropdown && filteredMembers.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-lg shadow-lg max-h-48 overflow-y-auto z-10">
                  {filteredMembers.map((member) => (
                    <button
                      key={member}
                      onClick={() => addMember(member)}
                      className="w-full px-4 py-2 text-left text-sm hover:bg-secondary transition-colors"
                    >
                      {member}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Selected Members */}
            {selectedMembers.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {selectedMembers.map((member) => (
                  <div
                    key={member}
                    className="flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-teal-500/20 to-cyan-500/20 rounded-full text-sm"
                  >
                    <span>{member}</span>
                    <button onClick={() => removeMember(member)} className="hover:text-red-400">
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Add Groups */}
          <div className="space-y-2">
            <Label htmlFor="board-groups">Add Groups</Label>
            <div className="flex items-center gap-2">
              <Input
                id="board-groups"
                placeholder="Enter group name"
                value={groupInput}
                onChange={(e) => setGroupInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && addGroup()}
                className="bg-background"
              />
              <Button
                type="button"
                onClick={addGroup}
                size="icon"
                className="bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            {/* Selected Groups */}
            {groups.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {groups.map((group) => (
                  <div
                    key={group}
                    className="flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-orange-500/20 to-pink-500/20 rounded-full text-sm"
                  >
                    <span>{group}</span>
                    <button onClick={() => removeGroup(group)} className="hover:text-red-400">
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 p-6 border-t border-border">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleCreate}
            disabled={!name.trim()}
            className="bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white"
          >
            Create Board
          </Button>
        </div>
      </div>
    </div>
  )
}
