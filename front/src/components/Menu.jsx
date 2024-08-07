import React from 'react';
import PostDets from '../Pages/css/PostDets.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const Menu = ({user,logout}) => {
  const [prompt,setPrompt]=React.useState("");
  const navigate = useNavigate();
  return (
    <div className='outer'>
        <div class="relative mx-[4%]">
      <div class="absolute inset-y-0 start-0 flex items-center ps-3">
        <svg class="w-4 h-4 text-gray-500 dark:text-gray-400 cursor-pointer" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" onClick={()=>navigate(prompt?"?search="+prompt:navigate('/'))}>
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
        </svg>
        <span class="sr-only cursor-pointer">Search icon</span>
      </div>
      <input type="text" id="search-navbar" class=" p-2 ps-10 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[97%]" placeholder="Search..."
      onChange={(e)=>setPrompt(e.target.value)}
      />
    </div>
      {!user && <div className="inner">
        <Link to={'/register'}><p className="text" >Register</p></Link>
      </div>}
      {!user && <div className="inner">
        <Link to={'/login'}><p className="text">Login</p></Link>
      </div>}
      {user && <div className="inner">
        <Link to={'/write'}><p className="text">Write</p></Link>
      </div>}
      {user && <div className="inner">
        <Link to={'/profile/'+user._id}><p className="text">Profile</p></Link>
      </div>}
      {user && <div className="inner">
        <Link to={'/myposts'}><p className="text">My Blogs</p></Link>
      </div>}
      {user && <div className="inner">
        <p className="text" onClick={logout}>Logout</p>
      </div>}
    </div>
  );
}

export default Menu;
