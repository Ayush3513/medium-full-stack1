'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import AppBar from '@/page-compo/Appbar'
import axios from 'axios'
// import { BACKEND_URL } from '@/config'
import {useNavigate} from 'react-router-dom'

export default function Component() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const router = useNavigate()

  const handlePublish = async () => {
    try {
      const response = await axios.post("https://backend.ayushchavda2020.workers.dev/api/v1/blog", {
        title,
        content
      }, {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      })
      router(`/blog/${response.data.id}`)
    } catch (error) {
      console.error(error)
      alert('An error occurred while publishing the blog post.')
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <AppBar
        showPublishButton={true}
        onPublish={handlePublish}
        userName="John"
        userImage="/path-to-image.jpg"
      />
      {/* Editor */}
      <main className="mx-auto max-w-4xl px-4 pt-24">
        <div className="flex gap-4">
          <button className="mt-3 h-8 rounded-full p-1 hover:bg-accent">
            <Plus className="h-6 w-6" />
          </button>
          <div className="flex-1">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              className="w-full border-none bg-transparent text-5xl font-bold placeholder:text-muted-foreground/50 focus:outline-none"
            />
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Tell your story..."
              className="mt-8 w-full resize-none border-none bg-transparent text-xl leading-relaxed placeholder:text-muted-foreground/50 focus:outline-none"
              rows={20}
            />
          </div>
        </div>
      </main>
    </div>
  )
}