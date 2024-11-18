'use client'

import { Bell, MoreHorizontal } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {Link} from "react-router-dom"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface AppBarProps {
  showPublishButton?: boolean
  onPublish?: () => void
  userName?: string
  userImage?: string
}

export default function AppBar({ 
  showPublishButton = false, 
  onPublish, 
  userName = "User",
  userImage
}: AppBarProps) {
  return (
    <header className="border-b">
      <div className="container mx-auto flex h-16 items-center px-4">
        <div className="flex items-center gap-6 md:gap-8">
          <Link to="/" className="flex items-center space-x-2">
            <span className="font-semibold">{showPublishButton ? "Draft in Kirags" : "Medium"}</span>
          </Link>
          
        </div>
        <div className="ml-auto flex items-center gap-4">
          {showPublishButton ? (
            <Button 
              onClick={onPublish}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              Publish
            </Button>
          ) : (
            <Button 
              asChild
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <Link to="/publish">Create</Link>
            </Button>
          )}
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-red-600" />
          </Button>
          <Avatar className="h-8 w-8">
            <AvatarImage src={userImage} alt={userName} />
            <AvatarFallback>{userName[0]}</AvatarFallback>
          </Avatar>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}