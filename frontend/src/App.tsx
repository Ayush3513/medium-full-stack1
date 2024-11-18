import { BrowserRouter, Route, Routes } from "react-router-dom"
import  Signup  from "./pages/Signup"
import SignIn from "./pages/SignIn"


function App() {

  return (
    <BrowserRouter>
      <Routes >
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/blog/:id" element={<Blog />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/publish" element={<Publish />} />

      </Routes>
      </BrowserRouter>
  
  )
}
import Blogs from "./pages/Blogs"
import Blog from "./pages/Blog"
import Publish from "./pages/Publish"

export default App
