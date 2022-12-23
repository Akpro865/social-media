import { Link } from 'react-router-dom'
import profile from '../assets/profile.jpg'

function UserCard({searchUser}){
  return (
   <Link to={`/profile/${searchUser._id}`} className='flex p-1'>
    <div className='py-1 px-2'>               
     <img src={profile} alt='profile' className='h-10 w-10 rounded-full object-cover'/>    
    </div>
    <div className='flex flex-col ml-2'>
      <span className='font-semibold'>{searchUser.username}</span> 
      <span>{searchUser.firstname}&nbsp;{searchUser.lastname}</span>         
    </div>         
   </Link>
  )
}

export default UserCard