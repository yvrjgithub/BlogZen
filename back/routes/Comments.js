const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const User = require('../models/User');
const Post = require('../models/Post');
const Comment = require('../models/Comment');
const mongoose = require('mongoose')
const verifyToken = require('../verifyToken')

const router = express.Router();

router.post('/write',verifyToken,async(req,res)=>{
    try{
        const newComment = new Comment(req.body);
        const savedComment = await newComment.save();
        res.status(200).json(savedComment)
    }
    catch(err){
        res.status(500).json(err);
    }
})

router.put('/:id',verifyToken,async(req,res)=>{
    try{
        const updatedComment = await Comment.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
        res.status(200).json(updatedComment)
    }
    catch(err){
        res.status(500).json(err);
    }
})

router.delete("/:id",verifyToken,async(req,res)=>{
    try{
       await Comment.findByIdAndDelete(req.params.id);
       res.status(200).json("comment deleted")
    }
    catch(err){
        res.status(500).json(err);
    }
})



router.get('/post/:postID',verifyToken,async(req,res)=>{
    try{
    const com1= await Comment.find({postID:req.params.postID});
       res.status(200).json(com1)
    }
    catch(err){
        res.status(500).json(err);
    }
})

module.exports = router;