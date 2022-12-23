import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Login from './screen/Login'
import Home from './screen/Home'
import Register from './screen/Register'
import Message from './screen/Message'
import Notify from './screen/Notify'
import Discover from './screen/Discover'
import Profile from './screen/profile/[id]'
import SearchUser from './screen/profile/SearchUser'

import { refreshToken } from './feature/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import PageRender from './customRouter/PageRender'

function App() {

  const dispatch = useDispatch()
  const { user } = useSelector(state=>state.auth)

  useEffect(()=>{
    if(user) dispatch(refreshToken({ rf_token: user.refreshToken }))
  }, [dispatch])

  return (
    <div className="lg:mx-[170px]">
      <Header />
      <Routes>
       <Route path='/' exact element={user && user.accessToken ? <Home /> : <Login />} />
       <Route path='/login' element={<Login />} />
       <Route path='/register' element={<Register />} />
       <Route path='/message' element={<Message />} />
       <Route path='/discover' element={<Discover />} />
       <Route path='/notify' element={<Notify />} />
       <Route path='/profile' element={<Profile />} />
       <Route path='/profile/:id' element={<SearchUser />} />
      </Routes>
    </div>
  );
}

export default App;
