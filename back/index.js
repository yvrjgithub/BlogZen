const express = require('express');
const mongoose= require('mongoose');
const app = express();
const AuthRoute = require('./routes/Auth')
const UserRoute = require('./routes/Users')
const PostRoute = require('./routes/Posts')
const CommentRoute = require('./routes/Comments')
const dotenv = require('dotenv')
const cookieParser = require("cookie-parser")
const cors = require('cors')
const multer = require('multer');
const path = require('path');



const connnectDB=async(req,res)=>{
    try{
      await mongoose.connect("mongodb+srv://yuvrajlovesgaming:clusterpassword@cluster0.q5su2gv.mongodb.net/blog?retryWrites=true&w=majority&appName=Cluster0");
     console.log("x")
    }
    catch(err){
        console.log(err);
    }

}
dotenv.config()
app.use(express.json());
app.use(cookieParser())
app.use('/images',express.static(path.join(__dirname,'/images')))
app.use(cors({origin:"http://localhost:3000",credentials:true}))
app.use('/api/auth',AuthRoute);
app.use('/api/users',UserRoute);
app.use('/api/posts',PostRoute);
app.use('/api/comments',CommentRoute);

const storage = multer.diskStorage({
    destination:(req,file,fn)=>{
        fn(null,"images")
    },
    filename:(req,file,fn)=>{
        fn(null,req.body.img)
    }
})

const upload = multer({storage:storage})
app.post("/api/upload",upload.single("file"),(req,res)=>{
    res.status(200).json("Image has been uploaded ")
})

app.listen(8080,()=>{
    connnectDB();
    console.log('server')
})