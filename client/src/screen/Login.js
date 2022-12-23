import '../styles.scss'
import login from '../assets/login1.webp'
import google from '../assets/google.png'
import { Link, useNavigate } from 'react-router-dom'
import { BiShow } from 'react-icons/bi'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../feature/authSlice'

export default function Login(){
	const [show, setShow] = useState(false)
	const [details, setDetails] = useState({
		email: "",
		password: ""
	})	

	const navigate = useNavigate()
	const dispatch = useDispatch()
	const { message, isError, isSuccess, isLoading, user } = useSelector(state=>state.auth)
	
	useEffect(()=>{
	 if(user) navigate('/')
	 if(isSuccess) navigate('/')

	}, [message, isError, isSuccess, isLoading, user, navigate])
	
	const handleChange = (e)=>{		
		setDetails(prev=>({
			...prev,
			[e.target.name]: e.target.value
		}))
	}

	const handleLogin = async(e)=>{
		try{
			e.preventDefault()			
			await dispatch(loginUser(details))			
		}catch(err){
			console.log(err)
		}
	}
	
	return(
	<div className='loginheight flex justify-center items-center'>
	  <form className='flex w-3/5 h-4/5 rounded-2xl overflow-hidden bgcolor shadow-xl'>
	  
	   <img src={login} className='object-cover w-1/2 overflow-hidden rounded-l-2xl' alt='login-img'/>	   

	   <div className='w-1/2 flex items-center flex-col justify-center'>
	    {isError ? (<p className='px-10 py-2 rounded bg-red-200 text-red-600 flex justify-center'>{message}</p>) : null }
	    <h2 className='flex justify-center text-3xl my-3 text-cyan-400 font-bold'>Login</h2>
	    <div className='flex justify-center'>
	     <input onChange={handleChange} name='email' required className='h-12 outline-none rounded pl-1 my-1.5 bgcolor2 border' placeholder='email'/>
	    </div>
	    <div className='flex justify-center'>
	     <div className='relative'>
	      <input type={show ? 'text' : 'password'} required onChange={handleChange} name='password' className='h-12 outline-none rounded pl-1 my-2 bgcolor2 border' placeholder='password'/>
	      <small onClick={()=>setShow(!show)} className='absolute bottom-5 right-3'><BiShow className='text-2xl'/></small>
	     </div>
	    </div>
	    
	    <div className='flex justify-center'>
	     <button onClick={handleLogin} className='my-2 px-12 py-2.5 font-bold loginbg text-blue-700 rounded-full'>continue</button>
	    </div>
	    <p className='my-2 py-2 flex justify-center'>OR</p>
	    <div className='w-[250px] my-1.5 px-3 py-2 border-2 border-blue-200 flex font-medium py-2 my-2 justify-center mx-auto rounded cursor-pointer'>
	     <img alt='googleLoginImg' src={google} className='h-6 w-6 object-cover mr-2'/>
	     Login with Google
	    </div>
	    <p className='flex mt-3 py-2 justify-center items-center'>Don't have an a account ? 
	     <Link to='/register'>
	      <span className='ml-1.5 text-sm text-orange-400 cursor-pointer'>Sign up</span>
	     </Link>
	    </p>
	   </div>
	  </form>
	</div>
	)
}