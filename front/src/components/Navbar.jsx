import React from 'react';
import Menu from './Menu';
import Register from '../Pages/Register';
import {Link, useNavigate} from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../context/userContext';
import '../App.css'
import { URL } from '../url';
import axios from 'axios';

const Navbar = () => {
    const {setUser}=useContext(UserContext);
    const {User}= useContext(UserContext);
    const[menu,setMenu] = React.useState(false);
    const [prompt,setPrompt]=React.useState("");
    const {user} = useContext(UserContext);
    const navigate = useNavigate();
    const showMenu=()=>{
      setMenu(!menu)
    }
    const HandleLogout = async()=>{
      try{
        const res = await axios.get(URL+'/api/auth/logout',{withCredentials:true})
        setUser(null)
        navigate('/login')
      }
      catch(err){
        console.log(err)
      }
    }
    
    const handleResize=()=>{
      if(window.innerWidth>768){
        setMenu(false);
      }
    }
    React.useEffect(() => {
      window.addEventListener('resize', handleResize);
      handleResize();
      return () => window.removeEventListener('resize', handleResize);
    }, [window.innerWidth]);

  return (
    <div>
<nav class="bg-white border-gray-200 dark:bg-gray-900">
  <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
  <Link to={'/'}>
  <a  class="flex items-center space-x-3 rtl:space-x-reverse">
      <img src="https://img.icons8.com/plasticine/100/blog.png" class="h-8" alt="Flowbite Logo" />
      <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Blogzen</span>
  </a>
  </Link>
  <div class="flex md:order-2" >
    
    <div class="relative hidden md:block">
      <div class="absolute inset-y-0 start-0 flex items-center ps-3 ">
        <svg class="w-4 h-4 text-gray-500 dark:text-gray-400 cursor-pointer" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" onClick={()=>navigate(prompt?"?search="+prompt:navigate('/'))}>
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
        </svg>
        <span class="sr-only cursor-pointer">Search icon</span>
      </div>
      <input type="text" id="search-navbar" class=" p-2 ps-10 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search..."
      onChange={(e)=>setPrompt(e.target.value)}
      />
    </div>
    <button data-collapse-toggle="navbar-search" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-search" aria-expanded="false" onClick={showMenu}>
        <span class="sr-only">Open main menu</span>
        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
    </button>
  </div>
    <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-search">
      <div class="relative mt-3 md:hidden">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
          </svg>
        </div>
        <input type="text" id="search-navbar" class="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search...."/>
      </div>
      <ul class="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
        <li>
        {user?
         <Link to={'/write'}><a href="#" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Write</a></Link>:
         <Link to={'/login'}><a href="#" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">LogIn</a></Link>}
        </li>
        <li>
        {user?
         <Link to={'/profile/'+user._id}><a href="#" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Profile</a></Link>:
         <Link to={'/register'}><a href="#" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Register</a></Link>  }
        </li>
        <li>
        {user &&
         <Link to={'/myposts'}><a href="#" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">My Blogs</a></Link>}
        </li>
        <li>
        {user &&
         <a href="#" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700" onClick={HandleLogout}>Logout</a>}
        </li>
      </ul>
    </div>
  </div>
</nav>
{menu && <Menu user={user} className="menu" logout={HandleLogout} />}
    </div>
  );
}

export default Navbar;
