import '../styles.scss'
import google from '../assets/google.png'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { BiShow } from 'react-icons/bi'
import { registerUser } from '../feature/authSlice'
import { useDispatch, useSelector } from 'react-redux'

export default function Register(){
	const [show, setShow] = useState(false)
	const [details, setDetails] = useState({
		firstname: "",
		lastname: "",
		username: "",
		email: "",
		password: "",
		profile: " ",
		role: "user",
		gender: "male",
		phone: " ",
		address: " ",
		story: " ",
		website: " "
	})	 

	const navigate = useNavigate()
	const dispatch = useDispatch()
	const { message, isError, isSuccess, isLoading } = useSelector(state=>state.auth)
	
	useEffect(()=>{
	 if(isSuccess) navigate('/')

	}, [message, isError, isSuccess, isLoading, navigate])
	
	const handleChange = (e)=>{		
		setDetails(prev=>({
			...prev,
			[e.target.name]: e.target.value
		}))
	}

	const handleRegister = async(e)=>{
		try{
			e.preventDefault()
			await dispatch(registerUser(details))
		}catch(err){
			console.log(err)
		}
	}

	console.log(details)
	return(
	<div className='loginheight flex justify-center items-center'>
	  <form className='flex w-4/5 logincardheight rounded-2xl overflow-hidden bgcolor rounded-2xl shadow-xl'>   

	   <div className='w-3/5 flex items-center flex-col justify-center'>
	    {isError ? (<p className='px-10 py-2 rounded bg-red-200 text-red-600 flex justify-center'>{message}</p>) : null }
	    <h2 className='flex justify-center text-3xl my-3 text-cyan-400 font-bold'>Create New Account</h2>
	    <div className='flex justify-between w-4/5'>
	     <div className='flex flex-col'>
	      <label className='text-sm'>First Name</label>
	      <input onChange={handleChange} name='firstname' className='h-11 outline-none rounded pl-1 my-1.5 bgcolor2 border w-48'/>
	     </div>
	     <div className='flex flex-col'>
	      <label className='text-sm'>Last Name</label>
	      <input onChange={handleChange} name='lastname' className='h-11 outline-none rounded pl-1 my-1.5 bgcolor2 border w-48'/>
	     </div>
	    </div>

	    <div className='flex justify-center w-4/5 flex-col'>
	     <label className='text-sm'>Username</label>
	     <input onChange={handleChange} name='username' className='h-11 outline-none rounded pl-1 my-1.5 bgcolor2 border w-full'/>
	    </div>
	    <div className='flex justify-center w-4/5 flex-col'>
	     <label className='text-sm'>Email</label>
	     <input onChange={handleChange} name='email' className='h-11 outline-none rounded pl-1 my-2 bgcolor2 border w-full' type='email'/>
	    </div>

	    <div className='flex justify-center w-4/5 flex-col'>
	     <label className='text-sm'>Password</label>
	     <div className='relative'>
	      <input type={show ? 'text' : 'password'} onChange={handleChange} name='password' className='h-11 outline-none rounded pl-1 my-2 bgcolor2 border w-full'/>
	      <small onClick={()=>setShow(!show)} className='absolute bottom-5 right-3'><BiShow className='text-2xl'/></small>
	     </div>
	    </div>

	    <div className='flex justify-center'>
	     <button onClick={handleRegister} className='my-2 px-3 py-2.5 font-bold loginbg text-blue-700 rounded-full w-[180px]'>start now</button>
	    </div>
	    
	    <div className='flex items-center my-1.5 px-3 py-2.5 flex font-medium justify-center'>
	     <img src={google} alt='loginImg' className='h-8 w-8 object-cover cursor-pointer'/>	    
	     <div className='h-10 border rounded-full mx-3'></div>
	     <p className='flexpy-1.5 justify-center items-center'>Already have an a account ? 
         <Link to='/login'>
	      <span className='ml-1.5 text-sm text-orange-400 cursor-pointer'>Login</span>
	     </Link>
	     </p>
	    </div>

	   </div>

	   <div className='bg-green-500 w-2/5 flex justify-center items-center px-4'>
	   	<div className='text-white'>
	   	 <h2 className='text-4xl flex justify-center font-bold my-2'>Hello Friend!</h2>
	   	 <div className='w-[50px] flex mx-auto rounded-2xl my-2 border-[2px]'></div>
	   	 <p>Discover worlds best community, start your joyful journey here.</p>
	   	</div>

	   	<div>

	   	</div>
	   </div>
	  </form>
	</div>
	)
}