import { BACKEND_URL } from "@/config";
import AppBar from "@/page-compo/Appbar";
import { BlogSkeleton } from "@/page-compo/BlogSkeleton";
import axios from "axios";
import { BookmarkIcon, MinusCircleIcon, MoreHorizontalIcon, PlusIcon } from "lucide-react"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom"

type Author = {
  name: string | null
}

type BlogPost = {
  id: string
  title: string
  content: string
  author: Author
}

type ApiResponse = {
  Post: BlogPost[]
}

export default function Blogs() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    axios.get<ApiResponse>(`${BACKEND_URL}/api/v1/blog/bulk`, {
      headers: {
        Authorization: localStorage.getItem("token")
      }
    })
    .then(res => {
      setPosts(res.data.Post)
      setloading(false)
    })
    .catch(err => console.error(err))
  }, [])

  

  return (<>
    <AppBar userName="John" userImage="/path-to-image.jpg" />
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

      <nav className="border-b">
        <div className="flex items-center gap-4 sm:gap-8 py-3">
          <button className="p-2 rounded-full hover:bg-gray-100">
            <PlusIcon className="h-6 w-6" />
            <span className="sr-only">Add content</span>
          </button>
          <div className="flex gap-4 sm:gap-6">
            <Link
              to="#"
              className="text-sm font-medium text-gray-900 pb-3 border-b border-gray-900"
            >
              For you
            </Link>
            <Link
              to="#"
              className="text-sm font-medium text-gray-500 pb-3 hover:text-gray-900"
            >
              Following
            </Link>
          </div>
        </div>
      </nav>

      <div className="divide-y">
      {loading ? (
            Array.from({ length: 3 }).map((_, index) => (
              <BlogSkeleton  key={index} />
            ))
          ) : (
            posts.map((post) => (
              <Link to={`/blog/${post.id}`} key={post.id}>
                <article className="py-6">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <div className="w-7 h-7 bg-gray-300 rounded-full"></div>
                    <span className="text-sm">{post.author.name || 'Unknown Author'}</span>
                  </div>

                  <div className="grid sm:grid-cols-[1fr,200px] gap-4 sm:gap-8">
                    <div>
                      <h2 className="text-xl font-bold mb-2 line-clamp-2">
                        <span className="hover:underline">
                          {post.title}
                        </span>
                      </h2>
                      <p className="text-gray-600 line-clamp-3 mb-4">{post.content}</p>

                      <div className="flex flex-wrap items-center justify-between gap-y-2">
                        <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                          <span
                            className="text-sm text-gray-500 hover:text-gray-900 bg-gray-100 px-2 py-1 rounded-full"
                          >
                            Blog
                          </span>
                        </div>

                        <div className="flex items-center gap-2 sm:gap-4">
                          <button className="p-2 rounded-full hover:bg-gray-100">
                            <BookmarkIcon className="h-5 w-5" />
                            <span className="sr-only">Bookmark</span>
                          </button>
                          <button className="p-2 rounded-full hover:bg-gray-100">
                            <MinusCircleIcon className="h-5 w-5" />
                            <span className="sr-only">Hide</span>
                          </button>
                          <button className="p-2 rounded-full hover:bg-gray-100">
                            <MoreHorizontalIcon className="h-5 w-5" />
                            <span className="sr-only">More options</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="relative order-first sm:order-last">
                      <div className="w-full bg-gray-200 h-40 sm:h-full object-cover rounded-lg"></div>
                    </div>
                  </div>
                </article>
              </Link>
            ))
          )}
      </div>
    </div>
    </>
  )
}