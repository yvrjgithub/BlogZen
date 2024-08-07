const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const User = require('../models/User');
const Post = require('../models/Post');
const Comment = require('../models/Comment');
const mongoose = require('mongoose')
const verifyToken = require('../verifyToken')

const router = express.Router();

router.post('/create',verifyToken,async(req,res)=>{
    try{
        const newPost = new Post(req.body);
        const savedPost = await newPost.save();
        res.status(200).json(savedPost)
    }
    catch(err){
        res.status(500).json(err);
    }
})

router.put('/:id',verifyToken,async(req,res)=>{
    try{
        const updatedUser = await Post.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
        res.status(200).json(updatedUser)
    }
    catch(err){
        res.status(500).json(err);
    }
})

router.delete("/:id",verifyToken,async(req,res)=>{
    try{
       await Post.findByIdAndDelete(req.params.id);
       await Comment.deleteMany({postID:req.params.id})
       res.status(200).json("Post deleted")
    }
    catch(err){
        res.status(500).json(err);
    }
})

router.get('/:id',async(req,res)=>{
    try{
    const post1= await Post.findById(req.params.id);
       res.status(200).json(post1)
    }
    catch(err){
        res.status(500).json(err);
    }
})

router.get('/',async(req,res)=>{
   const query = req.query;
    try{
    const searchFilter = {
        title:{$regex:query.search,$options:"i"}
    }
    const post1= await Post.find(query.search?searchFilter:null);
       res.status(200).json(post1)
    }
    catch(err){
        res.status(500).json(err);
    }
})

router.get('/user/:userId',async(req,res)=>{
    try{
    const post1= await Post.find({userID:req.params.userId});
       res.status(200).json(post1)
    }
    catch(err){
        res.status(500).json(err);
    }
})

module.exports = router;