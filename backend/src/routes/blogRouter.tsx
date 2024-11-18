import { blogInpt, updateBlog } from "@ayush3513/med-common";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";


export const blogRouter = new Hono<{
    Bindings:{
        DATABASE_URL: string,
        JWT_SECRET: string
    },
    Variables:{
      authorId: string
    }
}>()

blogRouter.use("/*",async (c,next)=>{
  const token = c.req.header("Authorization") || "";
  const user = await verify(token,c.env.JWT_SECRET)
  if(user){
  
    c.set("authorId", String(user.id));
    await next()
  }else{
    c.status(403)
    return c.json({
      message:"You are not loggedin"
    })
  }
})

blogRouter.post("/",async (c)=>{

  const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate());
  const {title,content} = await c.req.json()
  const {success} = blogInpt.safeParse({title,content})
  if(!success){
    c.status(411)
    return c.json({error: "Invalid input"})
  }
  const authorId = c.get("authorId")
  try {
    const Post = await prisma.post.create({
      data:{
        title,
        content,
        authorId
      }
    })
  
      return c.json({
        id : Post.id
      })
  } catch (error) {
    c.status(403)
    return c.text("error while creating post")
  }

  })
  
  blogRouter.put("/", async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
  
    const { title, content, id, published } = await c.req.json()
    const { success } = updateBlog.safeParse({ title, content, id, published })
  
    if (!success) {
      c.status(411)
      return c.json({ error: "Invalid input" })
    }
  
    try {
      const post = await prisma.post.update({
        where: {
          id: id
        },
        data: {
          title,
          content,
          published // Update the published field
        }
      })
  
      return c.json({ message: "Blog updated successfully", post })
    } catch (error) {
      console.error(error)
      c.status(500)
      return c.json({ error: "Failed to update blog" })
    }
  })

  
  // add pagination
  blogRouter.get("/bulk", async (c)=>{
      
          
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
  
   try {
    const Post = await prisma.post.findMany({
      select:{
        content:true,
        title:true,
        id:true,
        author:{
          select:{
            name:true,
          }
        }
        
      }
    })
  
      return c.json({
       Post
      })
   } catch (error) {
    c.status(404)
    return c.text("post not found")
   }
  
        })
    
    
  
  blogRouter.get("/:id",async (c)=>{
       
  const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate());
  const id = c.req.param("id")

 try {
  const Post = await prisma.post.findFirst({
    where:{
      id : id
    },
    select:{
      title: true,
      content:true,
      author:{
        select:{
          name:true,
        }
      }
    }
  })

    return c.json({
      Post
    })
 } catch (error) {
  c.status(404)
  return c.text("bulk post not found")
 }

    })
  