import axios from 'axios';
import React, { useContext } from 'react';
import {Link,Navigate,useNavigate} from "react-router-dom"
import { URL } from '../url';
import { UserContext } from '../context/userContext';
import '../App.css'


const Login = () => {
    const {setUser} = useContext(UserContext)
    const [email,setEmail] = React.useState("");
    const [password,setPassword] = React.useState("");
    const [err,setErr] = React.useState(false);
    const navigate = useNavigate()
    const handleLogin=async()=>{
        try{
            const res = await axios.post(URL+"/api/auth/login",{email,password},{withCredentials:true});
            console.log("login succesful")
            setUser(res.data)
            navigate('/')
        }
        catch(err){
            setErr(true)
            console.log(err)
        }
    }
  return (
    <div className='login'>
      <section class="bg-gray-50 dark:bg-gray-900">
  <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white bg-blue">
                  Sign in to your account
              </h1>
                  <div>
                      <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                      <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" onChange={(e)=>setEmail(e.target.value)}/>
                  </div>
                  <div>
                      <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""
                      onChange={(e)=>setPassword(e.target.value)}/>
                  </div>
                  <div class="flex items-center justify-between">
                      <div class="flex items-start">   
                      </div>
                  </div>
                  <button type="submit" class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 bg-blue-950" onClick={handleLogin}>Sign in</button>
                  {err && <h3 class="text-red text text-sm">something went wrong</h3>}
                  <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                      Don’t have an account yet? <a href="#" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Register</a>
                  </p>
          </div>
      </div>
  </div>
</section>
    </div>
  );
}

export default Login;
