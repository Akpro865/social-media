import { FiHome, FiSend, FiCompass, FiHeart, FiSun } from 'react-icons/fi'
import { RiArrowDownSFill } from 'react-icons/ri'
import '../index.css'
import '../styles.scss'
import profile from '../assets/profile.jpg'
import { HiMoon } from 'react-icons/hi'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logOut } from '../feature/authSlice'
import Search from './Search'

export default function Header(){	
	const [theme, setTheme] = useState("light")

  const dispatch = useDispatch()
	const { user } = useSelector(state=>state.auth)

	useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      localStorage.getItem("theme")
    );
    setTheme(localStorage.getItem("theme"));
  }, []);

	const switchTheme = () => {
      if (theme === "light") {
       saveTheme("dark");
      } else {
       saveTheme("light");
      }
     };

    const saveTheme = (theme) => {
     setTheme(theme);
     localStorage.setItem("theme", theme);
     document.documentElement.setAttribute("data-theme", theme);
    };
	return (
	 <header className='flex bgmain justify-between items-center py-4 sm:px-4'>
	  <Link to='/'>
	   <div className='logo'>
	   	<h1 className='text-3xl font-bold hover:text-pink-600 hover:cursor-default animation duration-200'>SocialPro</h1>	   
	   </div>
	  </Link>
	  
	  <Search />

	  <nav className='flex items-center text-2xl'>
	   <Link to='/' className='mx-1.5 hover:text-pink-500 hover:-translate-y-0.5 animation duration-200 cursor-default'>
	    <div > <FiHome /> </div>
	   </Link>
	   <Link to='/message' className='mx-1.5 hover:text-blue-500 hover:-translate-y-0.5 animation duration-200 cursor-default'>
	    <div> <FiSend /> </div>
	   </Link>
	   <Link to='/discover' className='mx-1.5 hover:text-green-500 hover:-translate-y-0.5 animation duration-200 cursor-default'>
	    <div> <FiCompass /> </div>
	   </Link>
	   <Link to='/notify' className='mx-1.5 hover:text-red-500 hover:-translate-y-0.5 animation duration-200 cursor-default'>
	    <div> <FiHeart /> </div>
	   </Link>
	   { (theme === 'light') ?
	   	 (<span onClick={switchTheme} className='mx-1.5 hover:-translate-y-0.5 animation duration-200'><HiMoon /></span>)	:
	   	 (<span onClick={switchTheme} className='mx-1.5 hover:-translate-y-0.5 animation duration-200'><FiSun /></span>)	   	
	   }	   
	   {user ? 
	    (	       
	      <div className='profile mx-1.5 flex items-center'>
	        <Link to={`/profile/${user._id}`} className='flex items-center'>
	         <img src={profile} alt='profileImg' className='w-10 h-10 rounded-full object-cover'/>
	    		 <RiArrowDownSFill className='text-[16px]'/>
	    		</Link>
	    		<div className='options shadow-2xl overflow-hidden text-[18px] right-[1px] lg:right-[160px]'>
	    			<span className='animation duration-300 hover:text-green-600 w-full h-full'>settings</span>
	    			<span className='animation duration-300 hover:text-green-600'>
	    			 <Link to={`/profile/${user._id}`}  >
	    			 profile
	    			 </Link>
	    			</span>
	    			<span onClick={() =>dispatch(logOut())} className='animation duration-300 hover:text-red-600 hover:bg-red-300'>Logout</span>
	    		</div>
    		</div>
    	)
        :( <div className='flex items-center mx-1.5'>
           <Link to='/login'>
            <button className='bg-blue-100 animation duration-300 px-4 py-1.5 font-semibold hover:bg-blue-200 hover:text-blue-600 rounded text-base text-blue-500'>Login</button>
           </Link>
          </div>
        )}
	  </nav>
	 </header>
	)
}