import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import UserDetails from './UserDetails'
import Posts from './Posts'
import { searchuser } from '../../feature/authSlice'

export default function SearchUser(){ 
 const { user } = useSelector(state=>state.auth)
 const { id } = useParams()
 const dispatch = useDispatch()
 const navigate = useNavigate()
 const { searchedUser, users } = useSelector(state=>state.auth)
 
 useEffect(()=>{
  if(user._id === id) navigate('/profile')            
      
  dispatch(searchuser({users, id, token: user.accessToken}))     
 }, [id, dispatch, user, navigate])

 return (
  <section className='relative'>
   {  searchedUser &&  searchedUser.username ? (
      <>
       <UserDetails userData={searchedUser} />
       <Posts />
      </>
    ): null } 
  </section>
 )
}