import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { followUser, unFollowUser } from '../../feature/authSlice'

function FollowBtn(){
  const [follow, setFollow] = useState(false)

  const dispatch = useDispatch()
  const { user } = useSelector(state=>state.auth)
  const { users, searchedUser } = useSelector(state=>state.auth)

  useEffect(()=>{
    if(user.following.find(user => user._id === searchedUser._id)){
      setFollow(true)
    }
  }, [user.following, searchedUser._id])

  const handleFollow = ()=>{
  	setFollow(true)
  	dispatch(followUser({users, searchedUser, user}))
  }

  const handleUnFollow = ()=>{
  	setFollow(false)
    dispatch(unFollowUser({users, searchedUser, user}))
  }

  return (
   <div className='ml-4 flex justify-center items-center'>
  	{
  	  follow ? 
  	  <button onClick={handleUnFollow} className='px-12 py-2 rounded border-2 font-bold border-red-500 hover:bg-red-500 animation duration-100'>UnFollow</button> :
  	  <button onClick={handleFollow} className='px-12 py-2 border-2 rounded  font-bold border-blue-500 hover:bg-blue-500 animation duration-100'>Follow</button>
  	}    
   </div>
  )
}

export default FollowBtn