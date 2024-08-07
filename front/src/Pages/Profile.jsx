import React, { useEffect } from 'react';
import "./css/Profile.css"
import HomePosts from '../components/HomePosts';
import axios from 'axios';
import { URL } from '../url';
import { UserContext } from '../context/userContext';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const Profile = () => {
  const param = useParams().id
  const {user,setUser} = useContext(UserContext)
  const [username,setUsername] = React.useState("");
  const [email,setEmail] = React.useState("");
  const [password,setPassword] = React.useState("");
  const [posts,setPosts] = React.useState([]);
  const navigate = useNavigate()
  const fetchProfile=async()=>{
    try{
      const res = await axios.get(URL+"/api/users/"+user._id)
      setEmail(res.data.email)
      setUsername(res.data.username)
      setPassword('')
    }
    catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    fetchProfile()
  },[param])
  

  const handleUpdate=async()=>{
    try{  
      const res = await axios.put(URL+"/api/users/"+user._id,{username,email,password},{withCredentials:true})
      console.log(res.data)
      navigate('/profile/'+user._id)
    }
    catch(err){
      console.log(err);
    }
  }

  const handleDelete=async()=>{
    try{  
      const res = await axios.delete(URL+"/api/users/"+user._id,{withCredentials:true})
      console.log(res.data)
      setUser(null)
      navigate('/login')
    }
    catch(err){
      console.log(err);
    }
  }

  return (
    <div >
      <div className="profile">
        <h1 className="your text">Your profile:</h1>
      </div>
      <div className="texts">
        <input type="text" className="username text" placeholder='your username' value={username} onChange={(e)=>setUsername(e.target.value)}/>
        <input type="text" className="email text" placeholder='your e-mail' value={email} onChange={(e)=>setEmail(e.target.value)}/>
        <div className="btn">
          <button className='bttn text' onClick={handleUpdate}>Update</button>
          <button className='bttn text' onClick={handleDelete}>Delete</button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
