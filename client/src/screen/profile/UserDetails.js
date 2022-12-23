import profile from '../../assets/profile.jpg'
import { RiSettings6Fill } from 'react-icons/ri'
import FollowBtn from './FollowBtn'
import { useSelector } from 'react-redux'

const UserDetails = ({userData, setEdit})=>{
 const { user } = useSelector(state=>state.auth)

 return (
  <div className='flex'>
    <div className='flex w-1/3 justify-center items-center'>    
     <img src={profile} alt='profile' className='h-36 w-36 object-cover rounded-full' />     
    </div>
    <div className='flex flex-col w-2/3'>
     <section className='flex my-1'>
      <h3 className='text-3xl font-semibold my-2 mr-7'>{userData.username}</h3>
      {
        (userData._id === user._id) ?
          (
           <>
            <span className='flex items-center justify-center'>
              <button onClick={()=>setEdit(true)} className='bg-blue-100 text-blue-600 hover:bg-blue-200 px-7 py-2.5 rounded font-medium'>Edit Profile</button>     
            </span>
            <span className='flex items-center justify-center ml-6'><RiSettings6Fill className='cursor-pointer text-2xl'/></span>
           </>
          ) : 
           <FollowBtn />
      }      
     </section>
     <section className='flex font-medium my-1.5'>
      <span><strong>74</strong> posts</span>
      <span className='mx-16'><strong>{userData.followers.length}</strong> followers</span>
      <span className=''><strong>{userData.following.length}</strong> following</span>
     </section>
     <section className='flex flex-col'>
      <h3 className='text-xl font-semibold mt-2'>{userData.firstname} {userData.lastname}</h3>
      <p className='font-medium text-blue-500 cursor-pointer'>{userData.email}</p>
      <div className='mt-2'>
       <p>jd is the culprit,</p>
       <p>Nature photogrpher</p>
      </div>
     </section>
    </div> 
   </div> 
 )
}

export default UserDetails