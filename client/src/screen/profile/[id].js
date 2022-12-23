import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import UserDetails from './UserDetails'
import Posts from './Posts'
import EditProfile from './EditProfile'

export default function Profile(){  
 const [userData, setUserData] = useState({})
 const [edit, setEdit] = useState(false)
 
 const { user } = useSelector(state=>state.auth)
 
 useEffect(()=>{
    if (user) setUserData(user)          
 }, [user])

 return (
  <section className='relative'>
   { userData && userData.username ? (
      <>
       <UserDetails userData={userData} setEdit={setEdit} />
       <Posts />
      </>
    ): null }

    {
      edit ? (
       <EditProfile setEdit={setEdit} />
      ) : null
    }  
  </section>
 )
}