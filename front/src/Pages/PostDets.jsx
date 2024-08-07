import React, { useSyncExternalStore } from 'react';
import './css/PostDets.css'
import Comment from '../components/Comment';
import axios from 'axios';
import { URL,IF } from '../url';
import { useParams } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const PostDets = () => {
  const postID = useParams().id;
  const [post,setPost]=React.useState({})
  const [comments,setComments]= React.useState([])
  const [comment,setComment]= React.useState("");
  const navigate = useNavigate();
  const fetchPosts=async()=>{
    try{
      const res = await axios.get(URL+"/api/posts/"+postID);
      setPost(res.data);
    }
    catch(err){
      console.log(err)
    }
  }

  const fetchComments=async()=>{
    try{
      const res = await axios.get(URL+"/api/comments/post/"+postID,{withCredentials:true});
      setComments(res.data);
    }
    catch(err){
      console.log(err);
    }
  }

  const handleDelete=async()=>{
    try{
      const res = await axios.delete(URL+'/api/posts/'+postID,{withCredentials:true})
      navigate('/');
      console.log()
    }
    catch(err){
      console.log(err);
    }
  }

  const handleComment=async()=>{
    try{
      const res = await axios.post(URL+'/api/comments/write',{comment:comment,author:user.username,postID:postID,userID:user._id},{withCredentials:true})
      console.log(res);
      setComment("")
    }
    catch(err){
      console.log(err);
    }
  }

  React.useEffect(()=>{
    fetchPosts()
  },[postID])
  React.useEffect(()=>{
    fetchComments()
  },[postID,comments])


  const components = post.categories?.map((item,i) => (
    <div className="cats" key={i}>
    <p className="categ text">{item}</p>
    </div>
  ));
  const {user} = useContext(UserContext)

  return (
    <div className='blogcont'>
      <div className="title">
        <h3 className='titlee'>{post.title}</h3>
        {user?._id===post?.userID && 
        <div className="btns">
          <img src="https://img.icons8.com/?size=100&id=59770&format=png&color=ffffff" alt="" className='icon' onClick={()=>navigate('/edit/'+postID)}/>
          <img src="https://img.icons8.com/?size=100&id=67884&format=png&color=ffffff" alt="" className="icon" onClick={handleDelete} />
        </div>}
      </div>
      <div className='blogcont2'>
        <p className="username userp">@{post.username} <span className='username2'>(     {new Date(post.updatedAt).toString().slice(4,15)} | {new Date(post.updatedAt).toString().slice(16,21)})</span></p>
      </div>
      <div className="image">
          <img src={IF+post.photo} alt="" className='imgg' />
      </div>
      <br />
      <br />
      <div className="postdes">
        <p className="desc">
        {post.description}
        </p>
      </div>
      <br />
      <div className="catss">
      {components}
      </div>
      <br />
      <div className='ctit'>
      <p className='ctitle text'>
        Comments:
        </p>
      </div>
      <div className="txt">
          <input type="text" placeholder='add a comment' className='text txtbox'
          onChange={(e)=>setComment(e.target.value)}/>
          <button className='add' onClick={handleComment}>+</button>
        </div>
      {comments?.map((c)=>(
        <Comment key={c._id} c={c} post={post}/>
      ))}

    </div>
  );
}

export default PostDets;
