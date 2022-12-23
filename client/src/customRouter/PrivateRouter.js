import { Route, Navigate } from 'react-router-dom'

export default function PrivateRouter({props}){
    
 const loginUser = localStorage.getItem('userInfo')

 return loginUser ? <Route {...props} /> : <Navigate replace to='/' />
 
}