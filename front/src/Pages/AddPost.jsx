import React, { useContext } from 'react';
import './css/AddPost.css';
import axios from 'axios';
import { URL ,IF} from '../url';
import { UserContext } from '../context/userContext';
import {Navigate,useNavigate} from "react-router-dom"



const AddPost = () => {
    const [cat,setCat] = React.useState();
    const[cats,setCats] = React.useState([]);
    const [title,setTitle]=React.useState("");
    const[description,setDesc]=React.useState("");
    const[file,setFile]=React.useState("");
    const {user}= useContext(UserContext)
    const navigate = useNavigate();
  

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
          username:user.username,
          userID:user._id,
          categories:cats
        }

        if(file){
          const data = new FormData();
          const filename = Date.now()+file.name
          data.append("img",filename)
          data.append("file",file)
          post.photo = filename
          try{
            const imgUpload =await axios.post(URL+"/api/upload",data);
            console.log(imgUpload.data);
          }
          catch(err){
            console.log(err.res.data);
          }
        }
        try{
          const res= await axios.post(URL+"/api/posts/create",post,{withCredentials:true});
          navigate('/posts/post/'+res.data._id)
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
        onChange={(e)=>setTitle(e.target.value)}/>
        <div className="fil">
        <input type="file" className="file text" onChange={(e)=>setFile(e.target.files[0])}/>
        </div>
        <div className="cat">
        <input type="text" className="category text" placeholder='Enter a category'
        value={cat} onChange={(e)=>setCat(e.target.value)}/>
        <button className=" text add2" onClick={addCategory}>Add</button>
        </div>
        <div className="catss">
            {components}
        </div>
        <textarea  rows={10} cols={30}name="" id="" className="description text"
        placeholder='Add description....' onChange={(e)=>setDesc(e.target.value)}></textarea>
        < div className="btn">
        <button className='create add2' onClick={handleClick}>
        Create
        </button>
        </div>
      </form>
    </div>
  );
}

export default AddPost;
