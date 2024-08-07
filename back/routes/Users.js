const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const User = require('../models/User');
const Post = require('../models/Post');
const Comment = require('../models/Comment');
const mongoose = require('mongoose')
const verifyToken = require('../verifyToken')

const router = express.Router();

router.put('/:id',verifyToken,async(req,res)=>{
    try{
        if(req.body.password){
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hashSync(req.body.password,salt)
        }
        const updatedUser = await User.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
        res.status(200).json(updatedUser)
    }
    catch(err){
        res.status(500).json(err);
    }
})

router.delete("/:id",verifyToken,async(req,res)=>{
    try{
       await User.findByIdAndDelete(req.params.id);
       Comment.deleteMany({userID:req.params.id})
       Post.deleteMany({userID:req.params.id})
       res.status(200).json("user deleted")
    }
    catch(err){
        res.status(500).json(err);
    }
})

router.get('/:id',async(req,res)=>{
    try{
    const User1 = await User.findById(req.params.id);
    const{password,...info} = User1._doc
       res.status(200).json(info)
    }
    catch(err){
        res.status(500).json(err);
    }
})

module.exports = router;