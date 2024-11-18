import { signinInput, signupInput } from "@ayush3513/med-common";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign } from "hono/jwt";


export const userRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string
    JWT_SECRET: string
	}
}>()

userRouter.post('/signup', async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate());
	const {email,password,name} = await c.req.json();
  const {success}  = signupInput.safeParse({email, password, name})
  if(!success){
    c.status(411)
    return c.json({error: "Invalid input"})
  }

try {
  
  const User = await prisma.user.create({
    data:{
      email,
      password,
      name
    }
  })
  const token = await sign({id : User.id},c.env.JWT_SECRET )
  return c.text(token)
} catch (e) {
  console.log(e)
  c.status(411)
  return c.text("error while signup")
}



})
userRouter.post("/signin",async (c)=>{
  const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate());
	const {email,password} = await c.req.json();
  const {success}  = signinInput.safeParse({email, password})
  if(!success){
    c.status(411)
    return c.json({error: "Invalid input"})
  }

try {
  
  const User = await prisma.user.findFirst({
    where:{
      email,
      password,
    }
  })
  
  if(!User){
    c.status(403)
    return c.text("Invalid credentials")
  }

  const token = await sign({id: User.id},c.env.JWT_SECRET )
  return c.text(token)
} catch (e) {
  c.status(411)
  return c.text("error while signup")
}



})
