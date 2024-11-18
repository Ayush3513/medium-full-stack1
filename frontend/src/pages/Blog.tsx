'use client'

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { BACKEND_URL } from "@/config"
import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

type BlogPost = {
  Post: {
    title: string
    content: string
    author: {
      name: string | null
    }
  }
}

export default function Blog() {
  const params = useParams()
  const id = params?.id as string

  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const token = localStorage.getItem("token")
        const response = await axios.get<BlogPost>(`${BACKEND_URL}/api/v1/blog/${id}`, {
          headers: {
            Authorization: token || ''
          }
        })
        setPost(response.data)
        setLoading(false)
      } catch (err) {
        console.error(err)
        setError("Failed to load blog post")
        setLoading(false)
      }
    }

    fetchPost()
  }, [id])

  if (error) {
    return <div className="h-screen w-screen flex items-center justify-center text-red-500">{error}</div>
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <article className="prose prose-gray max-w-none dark:prose-invert">
            {loading ? (
              <BlogPostSkeleton />
            ) : (
              <>
                <div className="space-y-2 not-prose">
                  <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl lg:leading-[3.5rem]">
                    {post?.Post.title}
                  </h1>
                  <p className="text-muted-foreground">Posted on August 24, 2023</p>
                </div>
                <div className="mt-8 space-y-6">
                  <p>{post?.Post.content}</p>
                </div>
                <div className="mt-12">
                  <h2 className="text-2xl font-semibold">Comments</h2>
                </div>
              </>
            )}
          </article>
        </div>
        <aside className="lg:col-span-1">
          <div className="sticky top-8">
            <h2 className="mb-4 text-lg font-semibold">Author</h2>
            {loading ? (
              <AuthorSkeleton />
            ) : (
              <div className="flex items-start gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarFallback>{post?.Post.author.name?.[0] || 'A'}</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <h3 className="font-semibold">{post?.Post.author.name || 'Anonymous'}</h3>
                  <p className="text-sm text-muted-foreground">
                    Master of mirth, purveyor of puns, and the funniest person in the kingdom.
                  </p>
                </div>
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  )
}

function BlogPostSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="space-y-2 not-prose">
        <div className="h-10 bg-gray-300 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 rounded w-1/4"></div>
      </div>
      <div className="mt-8 space-y-6">
        <div className="h-4 bg-gray-300 rounded w-full"></div>
        <div className="h-4 bg-gray-300 rounded w-full"></div>
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
      </div>
      <div className="mt-12">
        <div className="h-6 bg-gray-300 rounded w-1/4"></div>
      </div>
    </div>
  )
}

function AuthorSkeleton() {
  return (
    <div className="flex items-start gap-4 animate-pulse">
      <div className="h-12 w-12 bg-gray-300 rounded-full"></div>
      <div className="space-y-1 flex-1">
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        <div className="h-3 bg-gray-300 rounded w-full"></div>
        <div className="h-3 bg-gray-300 rounded w-3/4"></div>
      </div>
    </div>
  )
}