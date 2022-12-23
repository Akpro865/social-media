import { FiSearch } from 'react-icons/fi'
import { AiFillCloseCircle } from 'react-icons/ai'
import { useState } from 'react'
import { url } from '../network'
import { useSelector } from 'react-redux'
import '../styles.scss'
import UserCard from './UserCard'

export default function Search(){
 const [search, setSearch] = useState('')
 const [searchUsers, setSearchUsers] = useState([])

 const { user } = useSelector(state=>state.auth)
 
 const handleSearch = async(e)=>{
   e.preventDefault()
   if(search){
 	 await url.get(`/api/search?username=${search}`, {
      headers: {
         Authorization: `Bearer ${user.accessToken}`
      }
    }).then(res=>{
    setSearchUsers(res.data)
    })
    
   }
 }
 
 const handleClose = ()=>{
 	setSearch('')
 	setSearchUsers([])
 }

 return (
   <div className='relative'>
    <form className='hidden md:flex items-center bgcolor2 rounded-xl overflow-hidden px-1'>	   
	   <input value={search} type='text' name='search' id='search' onChange={e=>setSearch(e.target.value.toLowerCase().replace(/ /g, ''))} placeholder='search' className='outline-none h-10 overflow-hidden bgcolor2' autoComplete='off'/>
      { search ? 
        <span onClick={handleClose} className='flex items-center bg-transprent absolute top-2 right-8'><AiFillCloseCircle className='text-2xl text-red-300'/></span> : null
      }
	   <button onClick={e=>handleSearch(e)}><FiSearch className='text-2xl px-1 hover:text-pink-400'/></button>
      <div className='absolute bgcolor top-10 w-full z-50 rounded-xl shadow-xl'>
       {
         searchUsers ? searchUsers.map((searchUser, i)=>(
          <div key={searchUser._id} className='flex flex-col'>
           <UserCard searchUser={searchUser} />
          </div>
         )) : null
       }
      </div>  
    </form>
   </div>
 )
}