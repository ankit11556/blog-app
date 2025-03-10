const express = require('express');
const Blog = require('../models/Blog');
const blogRoutes = express.Router()

//Create Blog
blogRoutes.post("/blogs", async (req,res) => {
  try {
    const {title,content,author} = req.body;
   const blog = new Blog({title,content,author});
   await blog.save();
   res.status(200).json({message: "Blog post successfully",blog})
  } catch (error) {
    res.status(404).json({message: "Blog not posted",error:error.message})
  }
});

//Get Blogs
blogRoutes.get("/blogs", async (req,res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json(blogs)
  } catch (error) {
    res.status(500).json({message: "Failed to fetch blogs",error:error.message})
  }
});

// Get single Blog
blogRoutes.get("/blogs/:id",async (req,res) => {
  try {
    const blog = await Blog.findById(req.params.id)
    if (!blog) {
      return res.status(404).json({message: "Blog not found"})
    }
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({message: "Error fetching blog",error: error.message})
  }
});

//Update blog
blogRoutes.put("/blogs/:id", async (req,res) => {
  try {
    const {title,content,author} = req.body;
    const updateBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      {title,content,author},
      {new: true,runValidators: true}
    );

    if (!updateBlog) {
      return res.status(404).json({message: "Blog not found"})
    }

    res.status(200).json({message: "Blog update successfull",blog:updateBlog})
  } catch (error) {
   res.status(500).json({message: "Error updating blog", error: error.message}) 
  }
});

//Delete Blog
blogRoutes.delete("/blogs/:id", async (req,res) => {
  try {
    const deleteBlog = await Blog.findByIdAndDelete(req.params.id);
    if (!deleteBlog) {
      return res.status(404).json({message: "Blog not found"})
    }
    res.status(200).json({message: "Blog delete successfully"})
  } catch (error) {
    res.status(500).json({message: "Error deleting blog",error: error.message})
  }
})

module.exports = blogRoutes