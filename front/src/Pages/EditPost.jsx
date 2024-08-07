import React, { useEffect } from 'react';
import './css/AddPost.css';
import axios from 'axios';
import { URL ,IF} from '../url';
import { UserContext} from '../context/userContext';
import { useContext } from 'react';
import {Navigate, useParams,useNavigate} from "react-router-dom"

const EditPost = () => {
  const postID = useParams().id;
    const [cat,setCat] = React.useState();
    const[cats,setCats] = React.useState([]);
    const [title,setTitle]=React.useState("");
    const[description,setDesc]=React.useState("");
    const[file,setFile]=React.useState("");
    const [photo,setPhoto]=React.useState("");
    const {user}= useContext(UserContext)
    const navigate = useNavigate()
  
    const fetchPosts=async()=>{
      try{
        const res = await axios.get(URL+'/api/posts/'+postID)
        setTitle(res.data.title)
        setDesc(res.data.description)
        setFile(res.data.photo)
        setCats(res.data.categories)
        setPhoto(res.data.photo)
        console.log(res.data.photo);
      }
      catch(err){
        console.log(err);
      }
    }

    useEffect(()=>{
      fetchPosts();
    },[postID])

    const addCategory=(event)=>{
        event.preventDefault();
        let newcats = [...cats];
        newcats.push(cat)
        setCat("")
        setCats(newcats)
    }

    const deleteCategory=(i)=>{
        let newcats = [...cats];
        newcats.pop(i)
        setCats(newcats)
    }

    const components = cats.map((item,i) => (
        <div className="cats" key={i}>
        <p className="categ text">{item}</p>
        <p className="cross text" onClick={deleteCategory}>X</p>
        </div>
      ));

      const handleClick=async(e)=>{
        e.preventDefault()
        const post={
          title,
          description,
          photo,
          username:user.username,
          userID:user._id,
          categories:cats
        }

        try{
          const res= await axios.put(URL+"/api/posts/"+postID,post,{withCredentials:true});
          console.log(res.data);
          navigate('/')
        }
        catch(err){
          console.log(err);
        }
      }
    
  return (
    <div className='createpost'>
      <div className="title">
        <p className="titlee text">Create a Blog:</p>
      </div>
      <form action="">
        <input type="text" className="head text" placeholder='Add a title'
        onChange={(e)=>setTitle(e.target.value)} value={title}/>
        <div className="fil">
        </div>
        <div className="cat">
        <input type="text" className="category text" placeholder='Enter a category'
        value={cat} onChange={(e)=>setCat(e.target.value)}/>
        <button className="add text add2" onClick={addCategory}>Add</button>
        </div>
        <div className="catss">
            {components}
        </div>
        <textarea  rows={10} cols={30}name="" id="" className="description text"
        placeholder='Add description....' onChange={(e)=>setDesc(e.target.value)}
        value={description}></textarea>
        < div className="btn">
        <button className='create add' onClick={handleClick}>
        Update
        </button>
        </div>
      </form>
    </div>
  );
}

export default EditPost;
