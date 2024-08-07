import React, { useContext } from 'react';
import HomePosts from '../components/HomePosts';
import '../App.css'
import axios from 'axios';
import { URL } from '../url';
import { Link, useLocation } from 'react-router-dom';
import { UserContext } from '../context/userContext';


const Home = () => {
  const [posts,setPosts] = React.useState([])
  const {user} = useContext(UserContext);
  const fetchPosts = async()=>{
    try{
      const res = await axios.get(URL+'/api/posts/user/'+user._id)
        setPosts(res.data)
    }
    catch(err){
      console.log(err)
    }
  }
  React.useEffect(()=>{
    fetchPosts()
  },[user])
  return (
    <div>
      <div className="blogspace">
      {posts.map((posts)=>(
        <Link to={user?`posts/post/${posts._id}`:"/login"}>
        <HomePosts key={posts._id} post={posts}/>
        </Link>
      ))}
      </div>
    </div>
  );
}

export default Home;
