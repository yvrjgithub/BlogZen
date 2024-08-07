import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Home from './Pages/Home';
import HomePosts from './components/HomePosts';
import Login from './Pages/Login';
import Register from './Pages/Register';
import PostDets from './Pages/PostDets';
import AddPost from './Pages/AddPost';
import EditPost from './Pages/EditPost';
import Profile from './Pages/Profile';
import MyProfile from './Pages/MyProfile'
import { UserContextProvider } from './context/userContext';

function App() {
  return (

      <UserContextProvider>
      <BrowserRouter>
      <Navbar/>
      <Routes>
      <Route exact path="/" element={<Home/>}/>
      <Route exact path="/login" element={<Login/>} clasName='login'/>
      <Route exact path="/register" element={<Register/>}/>
      <Route exact path="/posts/post/:id" element={<PostDets/>}/>
      <Route exact path="/write" element={<AddPost/>}/>
      <Route exact path="/edit/:id" element={<EditPost/>}/>
      <Route exact path="/profile/:id" element={<Profile/>}/>
      <Route exact path="/myposts" element={<MyProfile/>}/>
      </Routes>
      <Footer/>
      </BrowserRouter>
      </UserContextProvider>

  );
}

export default App;
