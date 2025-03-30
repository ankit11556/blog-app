
import { useEffect, useState } from "react";
import BlogCard from "../components/Blog/BlogCard";

const Home = () => {
  const [blogs,setBlogs] = useState([]);

const dataFetch = async () => {
  try {
    const data = await fetch("http://localhost:5500/blogs")
    const blog = await data.json()
    setBlogs(blog)
    
  } catch (error) {
    console.log(error);
  }
}

  useEffect(()=>{
   dataFetch()
  },[])

  return (
    
    <div className="max-w-screen-lg mx-auto my-16">
      <h2 className="text-3xl font-bold text-center">Latest Blogs</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
    {blogs.map((blog) => (
      <BlogCard 
        key={blog.id} 
        id={blog.id} 
        title={blog.title} 
        content={blog.content} 
        author={blog.author} 
      />
    ))}
    </div>
    </div>
  );
};

export default Home;
