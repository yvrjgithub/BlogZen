import React, { useContext } from 'react';
import PostDets from '../Pages/css/PostDets.css';
import { UserContext } from '../context/userContext';
import axios from 'axios';
import { URL } from '../url';

const Comment = ({c,post}) => {
  const {user} = useContext(UserContext);
  const delComment=async()=>{
    try{
      const res = await axios.delete(URL+'/api/comments/'+c._id,{withCredentials:true})
      console.log(res);
    }
    catch(err){
      console.log(err);
    }
  }
  return (
    <div className="comments">
        <div className="comment">
          <p className="ctext text">@{c.author}</p>
          <div className="commleft">
          <p className="ctext text">{new Date(c.updatedAt).toString().slice(4,15)} |</p>
          {(user._id===post.userID||user._id===c.userID) && 
          <img src="https://img.icons8.com/?size=100&id=67884&format=png&color=ffffff" alt="" className="icon2" onClick={delComment}/>}
          </div>
        </div>
        <div className="comment">
          <p className="ctext2 text">{c.comment}</p>
        </div>
      </div>
  );
}

export default Comment;
