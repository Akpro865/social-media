import { useState } from 'react'
import profile from '../../assets/profile.jpg'
import { AiFillCloseCircle } from 'react-icons/ai'
import '../../styles.scss'
import { useSelector } from 'react-redux'
import { url } from '../../network'

export default function EditProfile({setEdit}){
  const { user } = useSelector(state=>state.auth)

  const [details, setDetails] = useState({
    firstname: user.firstname,
    lastname: user.lastname,
    username: user.username,
    email: user.email,
    profile: user.profile,
    role: user.role,
    gender: user.gender,
    phone: user.phone,
    address: user.address,
    story: user.story,
    website: user.website
  })

  const handleChange = (e)=>{   
    setDetails(prev=>({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleUpdate = async(e)=>{
    e.preventDefault()
    try {
      await url.put('api/auth/update', details, {
        headers: {
          Authorization: `${user.accessToken}`
        }
      })
    } catch(err) {
      console.log(err)
    }
  }
  console.log(details)
  return (
  	<form className='absolute top-0 left-[30%] bgeditProfile shadow my-2 mb-2 py-2 px-4 rounded-xl w-[450px]'>
  	 <div className='flex justify-center relative items-center m-2'>
  	  <img src={profile} alt='profile' className='h-32 w-32 object-cover rounded-full' />
  	 </div>
  	 <AiFillCloseCircle onClick={()=>setEdit(false)} className='absolute right-2 top-2 rounded-full text-4xl text-red-500 hover:text-red-600'/>
  	 <div className='my-1 flex flex-col w-full'>
  	  <label id='fullname' className='my-1 font-semibold'>Firstname</label>
  	  <input type='text' name='firstname' value={details.firstname} onChange={handleChange} className='w-full bgEditInput pl-1 outline-none h-10 rounded' autoComplete='off'/>
  	 </div>
  	 <div className='my-1 flex flex-col'>
  	  <label id='fullname' className='my-1 font-semibold'>Lastname</label>
  	  <input type='text' value={details.lastname} onChange={handleChange} name='lastname' className='w-full bgEditInput pl-1 outline-none h-10 rounded' autoComplete='off'/>
  	 </div>
  	 <div className='my-1 flex flex-col'>
  	  <label id='fullname' className='my-1 font-semibold'>Username</label>
  	  <input type='text' value={details.username} onChange={handleChange} name='username' className='w-full bgEditInput pl-1 outline-none h-10 rounded' autoComplete='off'/>
  	 </div>
  	 <div className='my-1 flex flex-col'>
  	  <label id='fullname' className='my-1 font-semibold'>E-mail</label>
  	  <input type='email' value={details.email} onChange={handleChange} name='email' className='w-full bgEditInput pl-1 outline-none h-10 rounded' autoComplete='off'/>
  	 </div>
  	 <div className='my-1 flex flex-col'>
  	  <label id='fullname' className='my-1 font-semibold'>Address</label>
  	  <input type='text' value={details.address} onChange={handleChange} name='address' className='w-full bgEditInput pl-1 outline-none h-10 rounded' autoComplete='off'/>
  	 </div>
  	 <div className='my-1 flex flex-col font-semibold'>
  	  <label id='fullname' className='my-1'>Website</label>
  	  <input type='text' value={details.website} onChange={handleChange} name='website' className='w-full bgEditInput pl-1 outline-none h-10 rounded' autoComplete='off'/>
  	 </div>
  	 <div className='my-1 flex flex-col'>
  	  <label id='fullname' className='my-1 font-semibold'>Story</label>
  	  <textarea rows='3' type='text' value={details.story} onChange={handleChange} name='story' className='w-full bgEditInput pl-1 outline-none py-1 rounded' autoComplete='off'/>
  	 </div>
  	 <div className='my-1 flex flex-col'>
  	  <label id='fullname' className='my-1 font-semibold'>Phone</label>
  	  <input type='text' value={details.phone} onChange={handleChange} name='phone' className='w-full bgEditInput pl-1 outline-none h-10 rounded' autoComplete='off'/>
  	 </div>
     <div className='my-1 flex flex-col'>
      <label id='gender' className='my-1 font-semibold'>Gender</label>
      <select htmlFor='gender'  name='gender' value={details.gender} onChange={handleChange} className='h-10 rounded outline-none bgEditInput'>
       <option value='male' className='py-1'>Male</option>
       <option value='female'>Female</option>
       <option value='transgender'>Transgender</option>
      </select>
     </div>
     <div className='flex justify-center my-3'>
      <input type='submit' onClick={handleUpdate} className='bg-blue-600 cursor-pointer font-bold animation duration-300 hover:bg-blue-700 px-10 py-2 rounded text-white'/>
     </div>
  	</form>
  )
}
