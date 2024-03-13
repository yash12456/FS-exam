const express=require("express")
const Blog = require("../model/laptop")
const { v4: uuidv4 } = require('uuid');
const router=express.Router()


router.post("/addblog", async (req, res) => {
    const { name, Class, blog } = req.body
    const obj = {
      name: name,
      Class: Class,
      blog: blog,
      blogId: uuidv4()
    }
  
    await Blog.create(obj)
  
    res.redirect('/getblog')
  })
  
  router.get("/getblog", async (req, res) => {
    let blogs = await Blog.find()
    res.render("blogpage", {
      blogs: blogs
    })
  })
  
  router.get("/delete/:blogId", async (req, res) => {
    let blogId = req.params.blogId
    await Blog.deleteOne({ blogId })
    res.redirect("/getblog")
  })
  
  router.get("/update/:blogId", async (req, res) => {
    let blogId = req.params.blogId
    let updateblog = await Blog.findOne({ blogId })
    res.render("updateblog", {
      updateblog
    })
  })
  
  router.post("/updateblog",async (req, res) => {
    const { name, Class, blog, blogId } = req.body
    const newObj = {
      name,
      Class,
      blog,
      blogId
    }
  
    await Blog.updateOne({blogId},newObj)
  
  
    res.redirect("/getblog")
  })

  module.exports=router